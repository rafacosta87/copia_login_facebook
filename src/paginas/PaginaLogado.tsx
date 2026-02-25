import { useEffect, useState, useRef, type ChangeEvent } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { PersonStanding, UserRound, Mail, Lock, LogOut, Calendar, UserRoundX } from "lucide-react";
import LogoCabecalho from '../components/LogoCabecalho';
import Rodape from "../components/Rodape";
import { CampoPerfil } from '../components/CampoPerfil';
import './PaginaLogado.css';
import PaginaErro from './PaginaErro';
import { API_URL } from '../utils/config.ts';

interface Usuario {
    nome: string;
    sobrenome: string;
    email: string;
    genero: string;
    imagem: string;
    data_nascimento: string;
    senha?: string;
}

function PaginaLogado() {
    const [erroFatal, setErroFatal] = useState(false);
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const idUsuario = searchParams.get("u");
    const inputFileRef = useRef<HTMLInputElement>(null);
    const [dadosUsuario, setDadosUsuario] = useState<Usuario | undefined>();

    const [campoEmEdicao, setCampoEmEdicao] = useState<string | null>(null);

    const [formData, setFormData] = useState({
        nome: null,
        sobrenome: null,
        genero: null,
        email: null,
        data_nascimento: null,
        senha: null,
    });
    const [erros, setErros] = useState<Record<string, string>>({});

    const fetchData = async () => {
        if (!idUsuario || idUsuario === "") {
            setErroFatal(true);
            return;
        }
        try {
            const res = await fetch(`${API_URL}/usuario/${idUsuario}`);
            if (res.status === 404) {
                setErroFatal(true);
                return;
            }
            const json = await res.json();
            setDadosUsuario(json);
            setErroFatal(false);
        } catch (err) {
            console.error("Erro ao carregar dados", err);
            setErroFatal(true);
        }
    };

    useEffect(() => {
        if (idUsuario) fetchData();
    }, [idUsuario]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

    const atualizarDados = async (imgOverride?: string): Promise<boolean> => {
        if (!imgOverride) await delay(1500);

        const corpoRequisicao = {
            ...dadosUsuario,
            ...formData,
            imagem: imgOverride ?? dadosUsuario?.imagem,
        };

        try {
            const res = await fetch(`${API_URL}/atualizar/${idUsuario}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(corpoRequisicao)
            });

            if (!res.ok) {
                const errorData = await res.json();
                if (errorData.errors && errorData.errors.length > 0) {
                    const primeiroErro = errorData.errors[0];
                    setErros({ [primeiroErro.path]: primeiroErro.message });
                }
                return false;
            }

            await fetchData();
            setErros({});
            setCampoEmEdicao(null);
            return true;
        } catch (error) {
            console.error("Erro na conexão", error);
            return false;
        }
    };

    const handleCarregaImagem = (e: ChangeEvent<HTMLInputElement>) => {
        const arquivo = e.target.files?.[0];
        if (arquivo) {
            const reader = new FileReader();
            reader.readAsDataURL(arquivo);
            reader.onload = () => atualizarDados(reader.result as string);
        }
    };

    const handleDelete = async () => {
        if (window.confirm("Tem certeza que deseja excluir a conta?")) {

            try {
                const response = await fetch(`${API_URL}/usuario/${idUsuario}`, { method: "DELETE" });
                if (response.ok) {
                    navigate("/");
                } else {

                    alert("Não foi possível excluir a conta. Tente novamente.");
                }
            } catch (error) {

                console.error("Erro ao excluir", error);
                alert("Erro de conexão ao tentar excluir a conta.");
            }
        }
    };

    if (erroFatal || !idUsuario || idUsuario === "") {
        return (
            <PaginaErro
                titulo="Perfil não encontrado"
                mensagem="Não conseguimos localizar as informações deste usuário em nosso sistema."
                textoBotao="Voltar para o Login"
                destinoBotao="/"
            />
        );
    }

    return (
        <div>
            <div id="containerPrincipalLogado">
                <LogoCabecalho />

                <div id="imagemUsuario" onClick={() => inputFileRef.current?.click()} title='Alterar imagem'>
                    <div id='hoverImagemUsuario'></div>
                    <input type="file" ref={inputFileRef} hidden accept='image/*' onChange={handleCarregaImagem} />
                    <img src={dadosUsuario?.imagem || "/default-avatar.png"} alt="Perfil" />
                </div>

                <div id="containerDadosUsuario">
                    <CampoPerfil
                        icone={<UserRound />}
                        titulo="Nome"
                        valorExibido={dadosUsuario?.nome}
                        nomeCampo="nome"
                        estaEditando={campoEmEdicao === "nome"}
                        onAbrir={() => { setCampoEmEdicao("nome"); setErros({}); }}
                        erro={erros.nome}
                        onChange={handleChange}
                        onSalvar={atualizarDados}
                        onCancelar={() => { setFormData({ ...formData, nome: null }); setErros({}); setCampoEmEdicao(null); }}
                    />

                    <CampoPerfil
                        icone={<PersonStanding />}
                        titulo="Gênero"
                        valorExibido={dadosUsuario?.genero}
                        nomeCampo="genero"
                        estaEditando={campoEmEdicao === "genero"}
                        onAbrir={() => { setCampoEmEdicao("genero"); setErros({}); }}
                        erro={erros.genero}
                        onChange={handleChange}
                        onSalvar={atualizarDados}
                        onCancelar={() => { setFormData({ ...formData, genero: null }); setErros({}); setCampoEmEdicao(null); }}
                    />

                    <CampoPerfil
                        icone={<Calendar />}
                        titulo="Data de nascimento"
                        valorExibido={dadosUsuario?.data_nascimento}
                        nomeCampo="data_nascimento"
                        estaEditando={campoEmEdicao === "data_nascimento"}
                        onAbrir={() => { setCampoEmEdicao("data_nascimento"); setErros({}); }}
                        erro={erros.data_nascimento}
                        onChange={handleChange}
                        onSalvar={atualizarDados}
                        onCancelar={() => { setFormData({ ...formData, data_nascimento: null }); setErros({}); setCampoEmEdicao(null); }}
                    />

                    <CampoPerfil
                        icone={<Mail />}
                        titulo="Email"
                        valorExibido={dadosUsuario?.email}
                        nomeCampo="email"
                        estaEditando={campoEmEdicao === "email"}
                        onAbrir={() => { setCampoEmEdicao("email"); setErros({}); }}
                        erro={erros.email}
                        onChange={handleChange}
                        onSalvar={atualizarDados}
                        onCancelar={() => { setFormData({ ...formData, email: null }); setErros({}); setCampoEmEdicao(null); }}
                    />

                    <CampoPerfil
                        icone={<Lock />}
                        titulo="Senha"
                        valorExibido="*******"
                        nomeCampo="senha"
                        estaEditando={campoEmEdicao === "senha"}
                        onAbrir={() => { setCampoEmEdicao("senha"); setErros({}); }}
                        erro={erros.senha}
                        onChange={handleChange}
                        onSalvar={atualizarDados}
                        onCancelar={() => { setFormData({ ...formData, senha: null }); setErros({}); setCampoEmEdicao(null); }}
                    />

                    <div className="dadosUsuario">
                        <div className="containerIconeEDados" onClick={handleDelete} style={{ cursor: 'pointer' }}>
                            <div id='iconeCircleX'><UserRoundX /></div>
                            <span id="linkSair">Deletar Conta</span>
                        </div>
                    </div>

                    <div id="containerSair" title='Sair' onClick={() => navigate("/")} style={{ cursor: 'pointer' }}>
                        <LogOut />
                        <span id='linkSair'>Sair</span>
                    </div>
                </div>
            </div>
            <Rodape />
        </div>
    );
}

export default PaginaLogado;