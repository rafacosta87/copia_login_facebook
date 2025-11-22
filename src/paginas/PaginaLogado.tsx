/* eslint-disable @typescript-eslint/no-unused-vars */
//pq quando usamos o console , imprimi 2 vezes os dados no terminal

import LogoCabecalho from '../components/LogoCabecalho'
import './PaginaLogado.css'
import { PersonStanding, User, Mail, Lock, Pencil, LogOut, Calendar, Check, X, CircleX, UserRoundX, UserRound } from "lucide-react"
import Rodape from "../components/Rodape"
import { useSearchParams } from 'react-router-dom'
import { useEffect, useState, useRef, type ChangeEvent } from 'react'

interface Usuario {
    nome: string;
    sobrenome: string;
    email: string;
    genero: string;
    imagem: string; // Opcional
    data_nascimento: string;
    senha: string;
}

function PaginaLogado() {
    const inputFileRef = useRef<HTMLInputElement | undefined>(undefined)
    const [searchParams, setSearchParams] = useSearchParams()
    const [dadosUsuario, setDadosUsuario] = useState<Usuario | undefined>()
    const idUsuario = searchParams.get("u")
    const [atualizarNome, setAtualizarNome] = useState(false)
    const [atualizarSenha, setAtualizarSenha] = useState(false)
    const [atualizarEmail, setAtualizarEmail] = useState(false)
    const [atualizarGenero, setAtualizarGenero] = useState(false)
    const [atualizarDataNascimento, setAtualizarDataNascimento] = useState(false)
    const [nome, setNome] = useState<string | null>(null)
    const [sobrenome, setSobrenome] = useState<string | null>(null)
    const [genero, setGenero] = useState<string | null>(null)
    const [email, setEmail] = useState<string | null>(null)
    const [dataNascimento, setDataNascimento] = useState<string | null>(null)
    const [senha, setSenha] = useState<string | null>(null)
    const [imagem, setImagem] = useState<string | null>(null)

    const fetchData = async () => {
        const res = await fetch(`http://localhost:3000/usuario/${idUsuario}`, {
            method: "get",
            headers: { "Content-Type": "application/json" }
        })
        const json = await res.json()
        setDadosUsuario(json)
    }


    const handleDelete = async () => {
        // Exibe o alerta nativo do navegador
        if (window.confirm(`Tem certeza que deseja excluir a conta?`)) {
            const res = await fetch(`http://localhost:3000/usuario/${idUsuario}`, {
                method: "delete",
                headers: { "Content-Type": "application/json" }
            })
            window.location.href = "/"
        }
    }

    // const deletarConta = async () => {
    //     const res = await fetch(`http://localhost:3000/usuario/${idUsuario}`, {
    //         method: "delete",
    //         headers: { "Content-Type": "application/json" }
    //     })
    //     window.location.href = "/"   
    // }

    useEffect(() => {
        fetchData()
    }, [idUsuario])

    function carregaImagem(e: ChangeEvent<HTMLInputElement>) {
        const arquivoImagem = e.target.files?.[0]
        if (!arquivoImagem) {
            return
        }
        const reader = new FileReader()
        reader.readAsDataURL(arquivoImagem)
        reader.onload = () => {
            setImagem(reader.result as string)
            atualizarDados(reader.result as string)
        }
    }

    async function atualizarDados(img: string | null = null) {
        const response = await fetch(`http://localhost:3000/atualizar/${idUsuario}`, {
            method: "put",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(
                {
                    "email": email,
                    "senha": senha,
                    "nome": nome,
                    "sobrenome": sobrenome,
                    "genero": genero,
                    "data_nascimento": dataNascimento,
                    "imagem": img ?? imagem
                })
        })
        fetchData()
        setAtualizarNome(false)
        setAtualizarSenha(false)
        setAtualizarEmail(false)
        setAtualizarGenero(false)
        setAtualizarDataNascimento(false)
        if (!response.ok) {
            console.error("Erro na requisição")
        }
    }

    return (
        <div>

            <div id="containerPrincipalLogado">
                <LogoCabecalho />

                <div id="imagemUsuario" onClick={() => inputFileRef.current?.click()} title='Alterar imagem'>
                    <label htmlFor='inputImagem' id='hoverImagemUsuario'></label>
                    <input type="file" id='inputImagem' hidden accept='image/*' onChange={carregaImagem} />
                    <img src={ dadosUsuario?.imagem} alt="Imagem" />
                </div>
                <div id="containerDadosUsuario">
                    <div className="dadosUsuario">
                        <div className="containerIconeEDados">
                            <div title='Nome'>
                                <UserRound />
                            </div>
                            {atualizarNome ?
                                <div className='containerAtualizarDados'>
                                    <input type="text" className='inputAtualizarDados' placeholder='Digite o novo nome' value={nome ?? ""} onChange={e => setNome(e.target.value)} />
                                    {nome != null &&
                                        <div className='containerLinksAtualizacao'>
                                            <div title='Cancelar' className="iconeLapis" onClick={() => setAtualizarNome(false)} ><X /></div>
                                            <div title='Atualizar' className="iconeLapis" onClick={() => atualizarDados()}> <Check /></div>
                                        </div>
                                    }
                                </div>
                                :
                                <div className='containerAtualizarDados' >
                                    <p className="dados" >{dadosUsuario?.nome}</p>
                                    <div className="iconeLapis" title='Alterar nome' onClick={() => setAtualizarNome(true)}>
                                        <Pencil />
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                    <div className="dadosUsuario">
                        <div className="containerIconeEDados">
                            <div title='Gênero'>
                                <PersonStanding />
                            </div>
                            {atualizarGenero ?
                                <div className='containerAtualizarDados'>
                                    <input type="text" className='inputAtualizarDados' placeholder='Digite o novo gênero' value={genero ?? ""} onChange={e => setGenero(e.target.value)} />
                                    {genero != null &&
                                        <div className='containerLinksAtualizacao'>
                                            <div title='Cancelar' className="iconeLapis" onClick={() => setAtualizarGenero(false)} ><X /></div>
                                            <div title='Atualizar' className="iconeLapis" onClick={() => atualizarDados()}> <Check /></div>
                                        </div>
                                    }
                                </div>
                                :
                                <div className='containerAtualizarDados' >
                                    <p className="dados" >{dadosUsuario?.genero}</p>
                                    <div className="iconeLapis" title='Alterar gênero' onClick={() => setAtualizarGenero(true)}>
                                        <Pencil />
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                    <div className="dadosUsuario">
                        <div className="containerIconeEDados">
                            <div title='Data de nascimento'>
                                <Calendar />
                            </div>
                            {atualizarDataNascimento ?
                                <div className='containerAtualizarDados'>
                                    <input type="text" className='inputAtualizarDados' placeholder='Digite a nova data' value={dataNascimento ?? ""} onChange={e => setDataNascimento(e.target.value)} />
                                    {dataNascimento != null &&
                                        <div className='containerLinksAtualizacao'>
                                            <div title='Cancelar' className="iconeLapis" onClick={() => setAtualizarDataNascimento(false)} ><X /></div>
                                            <div title='Atualizar' className="iconeLapis" onClick={() => atualizarDados()}> <Check /></div>
                                        </div>
                                    }
                                </div>
                                :
                                <div className='containerAtualizarDados' >
                                    <p className="dados" >{dadosUsuario?.data_nascimento}</p>
                                    <div className="iconeLapis" title='Alterar data' onClick={() => setAtualizarDataNascimento(true)}>
                                        <Pencil />
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                    <div className="dadosUsuario">
                        <div className="containerIconeEDados">
                            <div title='Email'>
                                <Mail />
                            </div>
                            {atualizarEmail ?
                                <div className='containerAtualizarDados'>
                                    <input type="text" className='inputAtualizarDados' placeholder='Digite o novo email' value={email ?? ""} onChange={e => setEmail(e.target.value)} />
                                    {email != null &&
                                        <div className='containerLinksAtualizacao'>
                                            <div title='Cancelar' className="iconeLapis" onClick={() => setAtualizarEmail(false)} ><X /></div>
                                            <div title='Atualizar' className="iconeLapis" onClick={() => atualizarDados()}> <Check /></div>
                                        </div>
                                    }
                                </div>
                                :
                                <div className='containerAtualizarDados' >
                                    <p className="dados" >{dadosUsuario?.email}</p>
                                    <div className="iconeLapis" title='Alterar email' onClick={() => setAtualizarEmail(true)}>
                                        <Pencil />
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                    <div id="dadoSenha" className="dadosUsuario">
                        <div className="containerIconeEDados">
                            <div title='Senha'>
                                <Lock />
                            </div>
                            {atualizarSenha ?
                                <div className='containerAtualizarDados'>
                                    <input type="text" className='inputAtualizarDados' placeholder='Digite a nova senha' value={senha ?? ""} onChange={e => setSenha(e.target.value)} />
                                    {senha != null &&
                                        <div className='containerLinksAtualizacao'>
                                            <div title='Cancelar' className="iconeLapis" onClick={() => setAtualizarSenha(false)} ><X /></div>
                                            <div title='Atualizar' className="iconeLapis" onClick={() => atualizarDados()}> <Check /></div>
                                        </div>
                                    }
                                </div>
                                :
                                <div className='containerAtualizarDados' >
                                    <p className="dados" >{dadosUsuario?.senha}</p>
                                    <div className="iconeLapis" title='Alterar senha' onClick={() => setAtualizarSenha(true)}>
                                        <Pencil />
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                    <div className="dadosUsuario">
                        <div className="containerIconeEDados">
                            <div title='Deletar conta' id='iconeCircleX'>
                                <UserRoundX />
                            </div>
                            <a id="linkSair" onClick={handleDelete}>Deletar Conta </a>
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

