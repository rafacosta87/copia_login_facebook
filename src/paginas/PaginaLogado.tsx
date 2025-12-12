/* eslint-disable @typescript-eslint/no-unused-vars */
import LogoCabecalho from '../components/LogoCabecalho'
import './PaginaLogado.css'
import { PersonStanding, User, Mail, Lock, Pencil, LogOut, Calendar, Check, X, CircleX, UserRoundX, UserRound } from "lucide-react"
import Rodape from "../components/Rodape"
import { useSearchParams } from 'react-router-dom'
import { useEffect, useState, useRef, type ChangeEvent } from 'react'
import * as yup from 'yup';
import { parse, isDate, differenceInYears } from 'date-fns';

interface Usuario {
    nome: string | null;
    sobrenome: string;
    email: string;
    genero: 'masculino' | 'feminino' | 'personalizado';
    imagem: string; // Opcional
    data_nascimento: string;
    senha: string;
}

// const schema = yup.object().shape({
//     nome: yup.string().required("O nome é obrigatório"),
//     sobrenome: yup.string().required("O sobrenome é obrigatório"),
//     email: yup.string().email("Digite um email válido").required("O email é obrigatório"),
//     senha: yup.string().min(6, 'A senha deve ter pelo menos 6 caracteres').required('Senha é obrigatória'),
//     dataNascimento: yup
//         .string()
//         .required('Data é obrigatória')
//         // Teste 1: Formato dd/mm/aaaa (Regex simples que não valida se a data é real)
//         .matches(
//             /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/,
//             'Formato de data inválido (esperado: dd/mm/aaaa)'
//         )
//         // Teste 2: Data real e válida, maior que 5 anos atrás
//         .test(
//             'data-valida-idade',
//             'Data inválida ou a pessoa deve ter mais de 5 anos',
//             (value) => {
//                 // Se o formato regex passou, tentamos analisar a data.
//                 if (!value) return false;

//                 // Análise da data no formato dd/mm/aaaa
//                 const parsedDate = parse(value, 'dd/MM/yyyy', new Date());

//                 // Verifica se a data é válida e não é "Invalid Date"
//                 if (!isDate(parsedDate) || isNaN(parsedDate.getTime())) {
//                     return false;
//                 }

//                 // Verifica se a data é maior que 5 anos atrás
//                 const fiveYearsAgo = new Date();
//                 fiveYearsAgo.setFullYear(fiveYearsAgo.getFullYear() - 5);

//                 return parsedDate <= fiveYearsAgo;
//             }
//         ),
//     genero: yup.string().oneOf(['masculino', 'feminino', 'personalizado'], 'Gênero inválido').required('Gênero é obrigatório'),
// });

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
    const [erroEmail, setErroEmail] = useState("")
    const [erroSenha, setErroSenha] = useState("")
    const [erroData, setErroData] = useState("")
    const [erroGenero, setErroGenero] = useState("")
    // const [nome, setNome] = useState<string | null>(null)
    // const [sobrenome, setSobrenome] = useState<string | null>(null)
    // const [genero, setGenero] = useState<string | null>(null)
    // const [email, setEmail] = useState<string | null>(null)
    // const [dataNascimento, setDataNascimento] = useState<string | null>(null)
    // const [senha, setSenha] = useState<string | null>(null)
    const [imagem, setImagem] = useState<string | null>(null)
    const [formData, setFormData] = useState({
        nome: null,
        sobrenome: null,
        genero: null,
        email: null,
        dataNascimento: null,
        senha: null,
    })

    // const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    }

    // const handleSubmit = async (e) => {
    //     console.log(e)
    //     try {
    //         // Limpa erros anteriores
    //         setErrors({});
    //         // Valida os dados com o schema Yup
    //         await schema.validate(formData, { abortEarly: false });
    //         console.log('Dados do formulário válidos:', formData);
    //         alert('Formulário enviado com sucesso!');
    //     } catch (err) {
    //         // Se a validação falhar, define os erros
    //         const newErrors = {};
    //         err.inner.forEach((error) => {
    //             newErrors[error.path] = error.message;
    //         });
    //         setErrors(newErrors);
    //     }
    // };

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
                    "email": formData.email,
                    "senha": formData.senha,
                    "nome": formData.nome,
                    "sobrenome": formData.sobrenome,
                    "genero": formData.genero,
                    "data_nascimento": formData.dataNascimento,
                    "imagem": img ?? imagem
                })
        })

        if (!response.ok) {
            const errorData = await response.json()

            console.error(errorData.errors[0])
            if (errorData.errors[0].path === "email") {
                setErroEmail(errorData.errors[0].message)
                return
            }
            if (errorData.errors[0].path === "senha") {
                setErroSenha(errorData.errors[0].message)
                return
            }
            if (errorData.errors[0].path === "data_nascimento") {
                setErroData(errorData.errors[0].message)
                return
            }
            if (errorData.errors[0].path === "genero") {
                setErroGenero(errorData.errors[0].message)
                return
            }
        }
        fetchData()
        setAtualizarNome(false)
        setAtualizarSenha(false)
        setAtualizarEmail(false)
        setAtualizarGenero(false)
        setAtualizarDataNascimento(false)
        setErroEmail("")
        setErroData("")
        setErroGenero("")
        setErroSenha("")
        setFormData({
            ...formData,
            nome: null,
            sobrenome: null,
            genero: null,
            email: null,
            dataNascimento: null,
            senha: null,
        })
    }

    return (
        <div>
            <div id="containerPrincipalLogado">
                <LogoCabecalho />
                <div id="imagemUsuario" onClick={() => inputFileRef.current?.click()} title='Alterar imagem'>
                    <label htmlFor='inputImagem' id='hoverImagemUsuario'></label>
                    <input type="file" id='inputImagem' hidden accept='image/*' onChange={carregaImagem} />
                    <img src={dadosUsuario?.imagem} alt="Imagem" />
                </div>
                <div id="containerDadosUsuario">
                    <div className="dadosUsuario">
                        <div className="containerIconeEDados">
                            <div title='Nome'>
                                <UserRound />
                            </div>
                            {atualizarNome ?
                                <div className='containerAtualizarDados'>
                                    <input type="text" className='inputAtualizarDados' placeholder='Digite o novo nome' value={formData.nome ?? ""} name='nome' onChange={handleChange} />
                                    {formData.nome &&
                                        <div className='containerLinksAtualizacao'>

                                            <div title='Atualizar' className="iconeLapis" onClick={() => { atualizarDados(); setFormData({ ...formData, nome: null, }); }} > <Check /></div>
                                        </div>
                                    }
                                    <div title='Cancelar' className="iconeLapis" onClick={() => { setAtualizarNome(false); setFormData({ ...formData, nome: null, }) }} ><X /></div>
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
                        {
                            <span className='erroDeAtualizacao'></span>
                        }
                    </div>
                    <div className="dadosUsuario">
                        <div className="containerIconeEDados">
                            <div title='Gênero'>
                                <PersonStanding />
                            </div>
                            {atualizarGenero ?
                                <div className='containerAtualizarDados'>
                                    <input type="text" className='inputAtualizarDados' placeholder='Digite o novo gênero' name='genero' value={formData.genero ?? ""} onChange={handleChange} />
                                    {formData.genero &&
                                        <div className='containerLinksAtualizacao'>
                                            <div title='Atualizar' className="iconeLapis" onClick={() => { atualizarDados(); }} > <Check /></div>
                                        </div>
                                    }
                                    <div title='Cancelar' className="iconeLapis" onClick={() => { setAtualizarGenero(false); setFormData({ ...formData, genero: null, }); setErroGenero("") }} ><X /></div>
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
                        {erroGenero && atualizarGenero &&
                            <span className='erroDeAtualizacao'>{erroGenero}</span>
                        }
                    </div>
                    <div className="dadosUsuario">
                        <div className="containerIconeEDados">
                            <div title='Data de nascimento'>
                                <Calendar />
                            </div>
                            {atualizarDataNascimento ?
                                <div className='containerAtualizarDados'>
                                    <input type="text" className='inputAtualizarDados' placeholder='Digite a nova data' name='dataNascimento' value={formData.dataNascimento ?? ""} onChange={handleChange} />
                                    {formData.dataNascimento != null &&
                                        <div className='containerLinksAtualizacao'>
                                            <div title='Atualizar' className="iconeLapis" onClick={() => { atualizarDados(); }} > <Check /></div>
                                        </div>
                                    }
                                    <div title='Cancelar' className="iconeLapis" onClick={() => { setAtualizarDataNascimento(false); setFormData({ ...formData, dataNascimento: null, }); setErroData("") }}><X /></div>
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
                        {erroData && atualizarDataNascimento &&
                            <span className='erroDeAtualizacao'>{erroData}</span>
                        }
                    </div>
                    <div className="dadosUsuario">
                        <div className="containerIconeEDados">
                            <div title='Email'>
                                <Mail />
                            </div>
                            {atualizarEmail ?
                                <div className='containerAtualizarDados'>
                                    <input type="text" className='inputAtualizarDados' placeholder='Digite o novo email' name='email' value={formData.email ?? ""} onChange={handleChange} />
                                    {formData.email != null &&
                                        <div className='containerLinksAtualizacao'>
                                            <div title='Atualizar' className="iconeLapis" onClick={() => { atualizarDados(); }} > <Check /></div>
                                        </div>
                                    }
                                    <div title='Cancelar' className="iconeLapis" onClick={() => { setAtualizarEmail(false); setFormData({ ...formData, email: null, }); setErroEmail("")}} ><X /></div>
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
                        {erroEmail && atualizarEmail &&
                            <span className='erroDeAtualizacao'>{erroEmail}</span>
                        }
                    </div>
                    <div id="dadoSenha" className="dadosUsuario">
                        <div className="containerIconeEDados">
                            <div title='Senha'>
                                <Lock />
                            </div>
                            {atualizarSenha ?
                                <div className='containerAtualizarDados'>
                                    <input type="text" className='inputAtualizarDados' placeholder='Digite a nova senha' name='senha' value={formData.senha ?? ""} onChange={handleChange} />
                                    {formData.senha != null &&
                                        <div className='containerLinksAtualizacao'>
                                            <div title='Atualizar' className="iconeLapis" onClick={() => { atualizarDados(); }}> <Check /></div>
                                        </div>
                                    }
                                    <div title='Cancelar' className="iconeLapis" onClick={() => { setAtualizarSenha(false); setFormData({ ...formData, senha: null, }); setErroSenha("")}} ><X /></div>
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
                        {erroSenha && atualizarSenha &&
                            <span className='erroDeAtualizacao'>{erroSenha}</span>
                        }
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

