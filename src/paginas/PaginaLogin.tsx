/* eslint-disable @typescript-eslint/no-unused-vars */
//implementar melhor o tipyscript
//implementar erro se usuario não digitar um dos campos no login e no cadastro
import "./PaginaLogin.css";
import { useState } from "react";
import IconeOlho from "../components/IconeOlho";
import IconeOlhoFechado from "../components/IconeOlhoFechado";
import Rodape from "../components/Rodape";

function PaginaLogin() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [mostrarSenha, setMostrarSenha] = useState(false)
    const [emailError, setEmailError] = useState("")
    const [passwordError, setPasswordError] = useState("")
    // const [emailObrigatorio, setEmailObrigatorio] = useState("")
    // const [passwordObrigatorio, setPasswordObrigatorio] = useState("")

    async function requestLogin() {
        const response = await fetch("http://localhost:3000/login", {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ "email": email, "senha": password })
        }).then(async response => {

            if (response.status == 400) {
                return setEmailError("Email é Obrigatorio"), setPasswordError("")
            }
            if (response.status == 402) {
                return setPasswordError("Senha é Obrigatoria"), setEmailError("")
            }
            if (response.status == 404) {
                return setEmailError("Email não existe"), setPasswordError("")
            }
            if (response.status == 401) {
                return setPasswordError("Senha incorreta"), setEmailError("")
            }
            if (response.status == 200) {
                const result = await response.json()                                                                                                //transformando os dados de response(l 22) em json
                const id = result?.id
                window.location.href = `/logado?u=${id}`
                return
            }
        })
    }

    function login() {
        requestLogin()
    }

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
                            <input
                                type="text"
                                className={`input-field ${emailError ? 'inputTextEmailErro' : 'inputTextEmail'}`}
                                name="email"
                                id="email"
                                placeholder="Email ou telefone"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.code == "Enter") {
                                        login()
                                    }
                                }} />
                            <div className={`input-field ${passwordError ? 'bordaInputPasswordErro' : 'bordaInputPassword'}`} >
                                <input
                                    type={mostrarSenha ? "text" : "password"}
                                    className="inputText"
                                    name="pass"
                                    id="pass"
                                    placeholder="Senha"
                                    aria-label="Senha"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.code == "Enter") {
                                            login()
                                        }
                                    }}
                                />
                                {password != "" &&
                                    <div id="iconeOlho" onClick={() => setMostrarSenha((prev) => !prev)}>
                                        {mostrarSenha ? <IconeOlho /> : <IconeOlhoFechado />}
                                    </div>
                                }
                            </div>
                            {passwordError && <span className="loginErros">{passwordError}</span>}
                            {emailError && <span className="loginErros">{emailError}</span>}
                            <button
                                className="buttonEntrar"
                                type="submit"
                                onClick={() => {
                                    login()
                                }}
                            >
                                Entrar
                            </button>
                            <a className="novaSenha" href="https://www.facebook.com/recover/initiate/?privacy_mutation_token=eyJ0eXBlIjowLCJjcmVhdGlvbl90aW1lIjoxNzU4MzM1ODY0LCJjYWxsc2l0ZV9pZCI6MzgxMjI5MDc5NTc1OTQ2fQ%3D%3D&amp;ars=facebook_login&amp;next">Esqueceu a senha?</a>
                            <hr id="borderTopButton" />
                            <a href="/cadastro">
                                <button className="buttonConta" type="submit" >Criar nova conta</button>
                            </a>
                        </div>
                        <div id="msgContainer"> <a href="/pages/create/?ref_type=registration_form">Crie uma Página </a>para uma celebridade, uma marca ou uma empresa.</div>
                    </div>
                </div>
            </div>
            <Rodape />
        </div>
    )
}

export default PaginaLogin