//passar todas as palavras para portugues ou ingles para manter um padrão
import "./PaginaLogin.css";
import { useState } from "react";
import IconeOlho from "../components/IconeOlho";
import IconeOlhoFechado from "../components/IconeOlhoFechado";
import Rodape from "../components/Rodape";
import { useNavigate, Link } from "react-router-dom";


function PaginaLogin() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [mostrarSenha, setMostrarSenha] = useState(false)
    const [isLoading, setIsLoading] = useState(false);
    // Estado de erro centralizado
    const [errors, setErrors] = useState({ email: "", password: "" });

    const navigate = useNavigate();

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            handleLogin();
        }
    };

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
                localStorage.setItem("usuario_id", data.id); // Salva a sessão
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
        <div>

            <div id="containerConteudo">
                <div id="container">
                    <div id="containerLogo" >
                        <img id="logo" src="https://static.xx.fbcdn.net/rsrc.php/y1/r/4lCu2zih0ca.svg" alt="Facebook"></img>
                        <h2>O Facebook ajuda você a se conectar e compartilhar com as pessoas que fazem parte da sua vida.</h2>
                    </div>
                    <div id="containerLogin">
                        <div id="login">
                            <div className="loginInputEErro">
                                <input
                                    type="text"
                                    className={`inputTextEmail ${errors.email ? "input-error-login" : ""}`}
                                    name="email"
                                    id="email"
                                    placeholder="Email ou telefone"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    disabled={isLoading}
                                />
                                <div className={`bordaInputPassword ${errors.password ? "input-error-login" : ""}`} >
                                    <input
                                        type={mostrarSenha ? "text" : "password"}
                                        className="inputText"
                                        name="pass"
                                        id="pass"
                                        placeholder="Senha"
                                        aria-label="Senha"
                                        value={password}
                                        onChange={e => setPassword(e.target.value)}
                                        onKeyDown={handleKeyDown}
                                        disabled={isLoading}
                                    />
                                    {password != "" &&
                                        <div id="iconeOlho" onClick={() => setMostrarSenha((prev) => !prev)}>
                                            {mostrarSenha ? <IconeOlho /> : <IconeOlhoFechado />}
                                        </div>
                                    }
                                </div>
                                {errors.email && <span className="loginErros">{errors.email}</span>}
                                {errors.password && <span className="loginErros">{errors.password}</span>}
                            </div>
                            <button
                                className="buttonEntrar"
                                type="submit"
                                onClick={handleLogin}
                                disabled={isLoading}
                            >
                                {isLoading ? "Entrando..." : "Entrar"}
                            </button>
                            <Link className="novaSenha" to="/recuperar/senha">
                                Esqueceu a senha?
                            </Link>
                            <hr id="borderTopButton" />
                            <button
                                className="buttonConta"
                                type="button"
                                onClick={() => navigate("/cadastro")}
                            >
                                Criar nova conta
                            </button>
                        </div>
                        <div id="msgContainer"> <a href="https://www.facebook.com/pages/create/?ref_type=registration_form">Crie uma Página </a>para uma celebridade, uma marca ou uma empresa.</div>
                    </div>
                </div>
            </div>
            <Rodape />
        </div>
    )
}

export default PaginaLogin