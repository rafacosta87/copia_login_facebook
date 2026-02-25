import { Loader2 } from "lucide-react"
import IconeCabecalho from "./IconeCabecalho"
import { useNavigate, Link } from "react-router-dom"
import { useState } from "react";
import './CabecalhoRecuperar.css'
import { API_URL } from "../utils/config.ts";

const CabecalhoRecuperar = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({ email: "", password: "" });
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            handleLogin();
        }
    };
    const navigate = useNavigate();

    const handleLogin = async () => {
        // Resetar estados antes da tentativa
        setErrors({ email: "", password: "" });
        setIsLoading(true);
        await new Promise(resolve => setTimeout(resolve, 1500));
        try {
            const response = await fetch(`${API_URL}/login`, {
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

    return (
        <div className="containerCabecalhoForm">
            <Link to="/" className='iconeCabecalho' title="Facebook">
                <IconeCabecalho />
            </Link>

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
    )
}
export default CabecalhoRecuperar
