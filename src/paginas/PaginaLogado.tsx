import { useEffect, useState, useRef, type ChangeEvent } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { PersonStanding, UserRound, Mail, Lock, LogOut, Calendar, UserRoundX } from "lucide-react";
import LogoCabecalho from '../components/LogoCabecalho';
import Rodape from "../components/Rodape";
import { CampoPerfil } from '../components/CampoPerfil';
import './PaginaLogado.css';

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
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const idUsuario = searchParams.get("u");
    const inputFileRef = useRef<HTMLInputElement>(null);
    const [dadosUsuario, setDadosUsuario] = useState<Usuario | undefined>();
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
        try {
            const res = await fetch(`http://localhost:3000/usuario/${idUsuario}`);
            const json = await res.json();
            setDadosUsuario(json);
        } catch (err) {
            console.error("Erro ao carregar dados", err);
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
        await delay(1500);
        const corpoRequisicao = {
            ...dadosUsuario,
            ...formData,
            // Se for troca de imagem, usa imgOverride, senão usa o que já tinha
            imagem: imgOverride ?? dadosUsuario?.imagem,
            // Mapeamento específico caso o nome do campo no banco seja diferente do formData
        };
        try {
            const res = await fetch(`http://localhost:3000/atualizar/${idUsuario}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(corpoRequisicao)
            });

            if (!res.ok) {
                const errorData = await res.json();

                // Verifica se o array de erros existe e tem pelo menos um item
                if (errorData.errors && errorData.errors.length > 0) {
                    const primeiroErro = errorData.errors[0]; // Pega apenas o primeiro
                    const novosErros: Record<string, string> = {
                        [primeiroErro.path]: primeiroErro.message
                    };
                    console.log(novosErros)
                    setErros(novosErros);
                }

                return false;
            }

            await fetchData();
            setErros({});

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
            await fetch(`http://localhost:3000/usuario/${idUsuario}`, { method: "DELETE" });
            navigate("/");
        }
    };

    return (
        <div>
            <div id="containerPrincipalLogado">
                <LogoCabecalho />

                <div id="imagemUsuario" onClick={() => inputFileRef.current?.click()} title='Alterar imagem'>
                    <div id='hoverImagemUsuario'>Clique para alterar</div>
                    <input type="file" ref={inputFileRef} hidden accept='image/*' onChange={handleCarregaImagem} />
                    <img src={dadosUsuario?.imagem || "/default-avatar.png"} alt="Perfil" />
                </div>

                <div id="containerDadosUsuario">
                    <CampoPerfil
                        icone={<UserRound />}
                        titulo="Nome"
                        valorExibido={dadosUsuario?.nome}
                        nomeCampo="nome"
                        erro={erros.nome}
                        onChange={handleChange}
                        onSalvar={atualizarDados}
                        onCancelar={() => { setFormData({ ...formData, nome: null }); setErros({}) }}
                    />

                    <CampoPerfil
                        icone={<PersonStanding />}
                        titulo="Gênero"
                        valorExibido={dadosUsuario?.genero}
                        nomeCampo="genero"
                        erro={erros.genero}
                        onChange={handleChange}
                        onSalvar={atualizarDados}
                        onCancelar={() => { setFormData({ ...formData, genero: null }); setErros({}) }}
                    />

                    <CampoPerfil
                        icone={<Calendar />}
                        titulo="Data de nascimento"
                        valorExibido={dadosUsuario?.data_nascimento}
                        nomeCampo="data_nascimento"
                        tipoInput="text"
                        erro={erros.data_nascimento}
                        onChange={handleChange}
                        onSalvar={atualizarDados}
                        onCancelar={() => { setFormData({ ...formData, data_nascimento: null }); setErros({}) }}
                    />

                    <CampoPerfil
                        icone={<Mail />}
                        titulo="Email"
                        valorExibido={dadosUsuario?.email}
                        nomeCampo="email"
                        tipoInput="email"
                        erro={erros.email}
                        onChange={handleChange}
                        onSalvar={atualizarDados}
                        onCancelar={() => { setFormData({ ...formData, email: null }); setErros({}) }}
                    />

                    <CampoPerfil
                        icone={<Lock />}
                        titulo="Senha"
                        valorExibido="*******"
                        nomeCampo="senha"
                        tipoInput="text"
                        erro={erros.senha}
                        onChange={handleChange}
                        onSalvar={atualizarDados}
                        onCancelar={() => { setFormData({ ...formData, senha: null }); setErros({}) }}
                    />

                    <div className="dadosUsuario">
                        <div className="containerIconeEDados" onClick={handleDelete}>
                            <div id='iconeCircleX'><UserRoundX /></div>
                            <a id="linkSair">Deletar Conta</a>
                        </div>
                    </div>

                    <div id="containerSair" title='Sair'>
                        <LogOut />
                        <a id='linkSair' onClick={() => navigate("/")}>Sair</a>
                    </div>
                </div>
            </div>
            <Rodape />
        </div>
    );
}

export default PaginaLogado;