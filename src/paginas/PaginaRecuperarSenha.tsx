import './PaginaRecuperarSenha.css'
import IconeCabecalho from '../components/IconeCabecalho'
import Rodape from '../components/Rodape'
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Loader2 } from 'lucide-react';

const PaginaRecuperarSenha = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isLoading, setIsLoading] = useState(false);
    const [isSearching, setIsSearching] = useState(false);
    // Estado de erro centralizado
    const [errors, setErrors] = useState({ email: "", password: "" });
    const navigate = useNavigate();
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            handleLogin();
        }
    };
    const [emailRecuperacao, setEmailRecuperacao] = useState("");
    const [erroBusca, setErroBusca] = useState("")

    const handleLogin = async () => {
        // Resetar estados antes da tentativa
        setErrors({ email: "", password: "" });
        setIsLoading(true);
        await new Promise(resolve => setTimeout(resolve, 1500));
        try {
            const response = await fetch("http://localhost:3000/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, senha: password }),
            });
            const data = await response.json();
            if (response.status === 200) {
                navigate(`/logado?u=${data?.id}`);
            } else {
                const errorMap: { [key: number]: { email?: string; password?: string } } = {
                    400: { email: "Email é obrigatório" },
                    402: { password: "Senha é obrigatória" },
                    404: { email: "Email não cadastrado" },
                    401: { password: "Senha incorreta" },
                };
                // Verificamos se o status retornado existe no nosso mapa
                const errorData = errorMap[response.status];
                console.log(errorMap)
                if (errorData) {
                    // Atualiza apenas os campos que vieram no erro (usando spread para manter os outros como "")
                    setErrors(prev => ({ ...prev, ...errorData }));
                } else {
                    setErrors({ email: "Erro ao entrar. Tente novamente.", password: "" });
                }
            }
        } catch (err) {
            console.error("Erro de conexão:", err);
            setErrors({ email: "Erro de conexão com o servidor.", password: "" });
        } finally {
            setIsLoading(false);
        }
    };

    const handleSolicitarSenha = async (e: React.FormEvent) => {
        e.preventDefault();
        setErroBusca(""); // Limpa erros antigos ao tentar de novo

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
            <div className="containerCabecalhoForm">
                <div className='iconeCabecalho'>< IconeCabecalho /></div>

                <div className='inputsELinks'>
                    <div className='grupoInput'>
                        <input
                            className="inputRecuperarSenha"
                            placeholder="Email ou telefone"
                            aria-label="Email ou telefone"
                            type="email"
                            value={email}
                            name="email"
                            onChange={e => setEmail(e.target.value)}
                            onKeyDown={handleKeyDown}
                            disabled={isLoading}
                        />
                        {errors.email && <span className="mensagemErro">{errors.email}</span>}
                    </div>
                    <div className='grupoInput'>
                        <input
                            className="inputRecuperarSenha"
                            placeholder="Senha"
                            aria-label="Senha"
                            type="password"
                            value={password}
                            name="senha"
                            onChange={e => setPassword(e.target.value)}
                            onKeyDown={handleKeyDown}
                            disabled={isLoading}
                        />
                        {errors.password && <span className="mensagemErro">{errors.password}</span>}
                    </div>
                    <button
                        className='botaoCabecalho'
                        onClick={handleLogin}
                        disabled={isLoading}
                    >
                        {isLoading ? <Loader2 className="animate-spin" color='white' /> : "Entrar"}
                    </button>
                    <a className="linkCabecalho" href="/recuperar/senha" target="_blank">Esqueceu a conta?</a>
                </div>
            </div>

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
                        <button type="submit"  className='botaoPesquisarForm' disabled={isSearching}>
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