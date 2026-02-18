import './PaginaRecuperarSenha.css'
import Rodape from '../components/Rodape'
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import CabecalhoRecuperar from '../components/CabecalhoRecuperar';

const PaginaRecuperarSenha = () => {

    const [isSearching, setIsSearching] = useState(false);
    // Estado de erro centralizado
    const navigate = useNavigate();
    const [emailRecuperacao, setEmailRecuperacao] = useState("");
    const [erroBusca, setErroBusca] = useState("")

    useEffect(() => {
        document.title = "Esqueci a senha | Não consigo entrar | Facebook";
    }, []);

    const handleSolicitarSenha = async (e: React.FormEvent) => {
        e.preventDefault();
        setErroBusca(""); // Limpa erros antigos ao tentar de novo

        // VALIDAÇÃO NO FRONT
        if (!emailRecuperacao.trim()) {
            setErroBusca("E-mail é obrigatório.");
            return; // Para a execução aqui
        }


        setIsSearching(true);
        await new Promise(resolve => setTimeout(resolve, 1500));
        try {
            const response = await fetch("http://localhost:3000/esqueceu-senha", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: emailRecuperacao }),
            });
            const data = await response.json();
            if (response.ok) {
                // EXIBIÇÃO POR ALERT
                alert("E-mail enviado! Verifique sua caixa de entrada para redefinir a senha.");
                setEmailRecuperacao(""); // Limpa o campo após o sucesso
            } else {
                // Se não for OK (400 ou 404), exibe a mensagem no estado erroBusca
                setErroBusca(data.message || "Ocorreu um erro inesperado.");
            }
        } catch (err) {
            setErroBusca("Erro de conexão com o servidor.");
            console.log(err)
        } finally {
            setIsSearching(false);
        }
    };

    return (
        <div className='containerRecuoerarSenha'>
            <CabecalhoRecuperar />
            <div className='conteudoRecuperarSenha'>

                <form className='formRecuperarSenha' onSubmit={handleSolicitarSenha}>
                    <h2 className="tituloForm" >Encontre sua conta</h2>
                    <div className='containerConteudoForm'>
                        <p className='textoForm'>
                            Insira seu email ou número de celular para redifinir sua senha.
                        </p>
                        <input
                            type="text"
                            className='inputForm'
                            placeholder='Email ou número de celular'
                            value={emailRecuperacao}
                            onChange={(e) => setEmailRecuperacao(e.target.value)}
                        />
                        {erroBusca && (
                            <span className='erroBuscaForm'>
                                {erroBusca}
                            </span>
                        )}
                    </div>

                    <div className='containerBotoesForm'>
                        <button
                            type="button"
                            className='botaoCancelarForm'
                            onClick={() => navigate('/')}
                        >
                            Cancelar
                        </button>
                        <button type="submit" className='botaoPesquisarForm' disabled={isSearching}>
                            {isSearching ? "Enviando..." : "Pesquisar"}
                        </button>
                    </div>
                </form>
            </div>
            <Rodape />
        </div>
    )

}
export default PaginaRecuperarSenha