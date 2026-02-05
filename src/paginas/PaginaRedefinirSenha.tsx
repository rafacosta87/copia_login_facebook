import { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import './PaginaRedifinirSenha.css'
import LogoCabecalho from '../components/LogoCabecalho';
import Rodape from '../components/Rodape';

const PaginaRedefinirSenha = () => {
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");
    const [novaSenha, setNovaSenha] = useState("");
    const [confirmarSenha, setConfirmarSenha] = useState("");
    const [erro, setErro] = useState(""); // Estado para erros (vazio, < 6, etc)
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();


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
            const response = await fetch("http://localhost:3000/redefinir-senha", {
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
                <form className='formRedefinirSenha' onSubmit={handleRedefinir} style={{ paddingBottom: '20px' }}>
                    <h2 className="tituloForm">Escolha uma nova senha</h2>

                    <div className='containerConteudoForm' style={{ position: 'relative', paddingBottom: '30px' }}>
                        <p className='textoForm'>Crie uma senha forte com pelo menos 6 caracteres.</p>

                        <input
                            type="password"
                            className='inputForm'
                            placeholder='Nova senha'
                            value={novaSenha}
                            onChange={(e) => setNovaSenha(e.target.value)}
                            style={{ marginBottom: '15px' }}
                        />

                        <input
                            type="password"
                            className='inputForm'
                            placeholder='Confirme a nova senha'
                            value={confirmarSenha}
                            onChange={(e) => setConfirmarSenha(e.target.value)}
                        />

                        {/* Mensagem de Erro Posicionada */}
                        {erro && (
                            <span className="erroBuscaForm" style={{ bottom: '15px' }}>
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