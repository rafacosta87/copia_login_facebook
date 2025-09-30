//pq quando usamos o console , imprimi 2 vezes os dados no terminal
import LogoCabecalho from '../components/LogoCabecalho'
import './PaginaLogado.css'
import { PersonStanding, User, Mail, Lock, Pencil, LogOut, Calendar } from "lucide-react"
import "../components/avatar.png"
import Rodape from "../components/Rodape"
import { useSearchParams } from 'react-router-dom'
import { useEffect, useState } from 'react'

interface Usuario {
    nome: string;
    sobrenome: string;
    email: string; // Opcional
    genero: string;
    imagem?: string;
    data_nascimento: string;
    senha: string;
}

function PaginaLogado() {
    const [searchParams, setSearchParams] = useSearchParams()
    const [dadosUsuario, setDadosUsuario] = useState<Usuario | undefined>()
    console.log(dadosUsuario)

    const idUsuario = searchParams.get("u")

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch(`http://localhost:3000/usuario/${idUsuario}`, {
                method: "get",
                headers: { "Content-Type": "application/json" }
            })

            const json = await res.json()
            setDadosUsuario(json)
        }
        fetchData()
    }, [idUsuario])
    return (
        <div>

            <div id="containerPrincipalLogado">
                <LogoCabecalho />

                <div id="imagemUsuario">
                    <img src={dadosUsuario?.imagem} alt="Imagem" />
                </div>

                <div id="containerDadosUsuario">
                    <div className="dadosUsuario">
                        <div className="containerIconeEDados">
                            <div title='Nome'>
                                <User />
                            </div>
                            <p className="dados" >{dadosUsuario?.nome}</p>
                        </div>
                        <div className="iconeLapis" title='Alterar nome'>
                            <Pencil />
                        </div>
                    </div>
                    <div className="dadosUsuario">
                        <div className="containerIconeEDados">
                            <div title='Gênero'>
                                <PersonStanding />
                            </div>
                            <p className="dados">{dadosUsuario?.genero}</p>
                        </div>
                        <div className="iconeLapis" title='Alterar gênero'>
                            <Pencil />
                        </div>
                    </div>
                    <div className="dadosUsuario">
                        <div className="containerIconeEDados">
                            <div title='Data de nascimento'>
                                <Calendar />
                            </div>
                            <p className="dados">{dadosUsuario?.data_nascimento}</p>
                        </div>
                        <div className="iconeLapis" title='Alterar data'>
                            <Pencil />
                        </div>
                    </div>
                    <div className="dadosUsuario">
                        <div className="containerIconeEDados">
                            <div title='Email'>
                                <Mail />
                            </div>
                            <p className="dados">{dadosUsuario?.email}</p>
                        </div>
                        <div className="iconeLapis" title='Alterar email'>
                            <Pencil />
                        </div>
                    </div>
                    <div id="dadoSenha" className="dadosUsuario">
                        <div className="containerIconeEDados">
                            <div title='Senha'>
                                <Lock />
                            </div>
                            <p className="dados">{dadosUsuario?.senha}</p>
                        </div>
                        <div className="iconeLapis" title='Alterar senha'>
                            <Pencil />
                        </div>
                    </div>
                    <div id="containerSair" title='Sair'>
                        <LogOut />
                        <a href="/" id="linkSair">Sair</a>
                    </div>
                </div>
            </div>
            <Rodape />
        </div>
    )
}
export default PaginaLogado

