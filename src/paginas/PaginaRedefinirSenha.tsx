import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import './PaginaRedefinirSenha.css'
import LogoCabecalho from '../components/LogoCabecalho';
import Rodape from '../components/Rodape';
import PaginaErro from './PaginaErro';
import { API_URL } from '../utils/config.ts';

const PaginaRedefinirSenha = () => {
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");
    const [novaSenha, setNovaSenha] = useState("");
    const [confirmarSenha, setConfirmarSenha] = useState("");
    const [erro, setErro] = useState(""); // Estado para erros (vazio, < 6, etc)
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        document.title = "Redefinir senha";
    }, []);

    if (!token) {
        return (
            <PaginaErro
                titulo="Link de Redefinição Inválido"
                mensagem="Este link expirou ou já foi utilizado. Por favor, solicite uma nova recuperação de senha."
                textoBotao="Solicitar Nova Senha"
                destinoBotao="/recuperar/senha"
            />
        );
    }

    const handleRedefinir = async (e: React.FormEvent) => {
        e.preventDefault();
        setErro(""); // Limpa erros anteriores
        // Validação básica no front antes de enviar
        setIsLoading(true);
        await new Promise(resolve => setTimeout(resolve, 1500));
        try {
            if (!novaSenha || !confirmarSenha) {
                setErro("Preencha todos os campos.");
                return;
            }

            if (novaSenha !== confirmarSenha) {
                setErro("As senhas não coincidem.");
                return;
            }
            const response = await fetch(`${API_URL}/redefinir-senha`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ token, novaSenha }),
            });

            const data = await response.json();

            if (response.ok) {
                alert("Senha alterada com sucesso!");
                navigate("/");
            } else {
                // Pega o erro do Yup ou do banco vindo do backend
                setErro(data.message || data.error);
            }
        } catch (err) {
            console.log(err)
            setErro("Erro de conexão com o servidor.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className='containerRecuoerarSenha'>
            <LogoCabecalho />
            <div className='conteudoRedefinirSenha'>
                <form className='formRedefinirSenha' onSubmit={handleRedefinir} >
                    <h2 className="tituloForm">Escolha uma nova senha</h2>

                    <div className='conteudoFormRedefinir' >
                        <p className='textoForm'>Crie uma senha forte com pelo menos 6 caracteres.</p>

                        <input
                            type="password"
                            className='inputFormRedefinir'
                            placeholder='Nova senha'
                            value={novaSenha}
                            onChange={(e) => setNovaSenha(e.target.value)}
                        />

                        <input
                            type="password"
                            className='inputFormRedefinir'
                            placeholder='Confirme a nova senha'
                            value={confirmarSenha}
                            onChange={(e) => setConfirmarSenha(e.target.value)}
                        />

                        {/* Mensagem de Erro Posicionada */}
                        {erro && (
                            <span className="erroRedefinirForm" >
                                {erro}
                            </span>
                        )}
                    </div>

                    <div className='containerBotoesForm'>
                        <button type="submit" className='botaoRedefinirForm' disabled={isLoading}>
                            {isLoading ? "Alterando..." : "Redefinir Senha"}
                        </button>
                    </div>
                </form>
            </div>
            <Rodape />
        </div>
    );
};
export default PaginaRedefinirSenha;