//como estamos pegando o id na linha 42 , se "result" é igual a "reponse.json" , e "response" é os dados que mandamos(post) para o banco. E o id é criado no banco, como que estamos pegando esse id , se não fizemos um get no banco? 
import { useState, useRef } from 'react'
import './PaginaCadastro.css'
import Rodape from '../components/Rodape'
import LogoCabecalho from '../components/LogoCabecalho'
import { Camera } from 'lucide-react'

interface Erros {
    error: Dados;
}

interface Dados {
    nome: Erro
    sobrenome: Erro
    email: Erro
    genero: Erro
    imagem?: Erro
    data_nascimento: Erro
    senha: Erro
}

interface Erro {
    _errors: number[]
}

function PaginaCadastro() {
    const inputFileRef = useRef<HTMLInputElement | undefined>(undefined)                                                                      //criando a referencia , para passar para o input(l 87), para que possamos executar a função carregaImagem
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [nome, setNome] = useState("")
    const [sobrenome, setSobrenome] = useState("")
    const dataAtual = new Date();
    const [dia, setDia] = useState(dataAtual.getDate());
    const [mes, setMes] = useState(dataAtual.getMonth() + 1); // getMonth() retorna 0-11, então adicionamos 1
    const [ano, setAno] = useState(dataAtual.getFullYear());
    const [genero, setGenero] = useState("")
    const [imagem, setImagem] = useState<string | null>(null)
    const [erros, setErros] = useState<Erros | undefined>()

    console.log(mes)

    const meses = [
        'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun',
        'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'
    ]

    const renderMeses = () => {
        return meses.map((nome, index) => (
            <option key={index} value={index + 1}>{nome}</option>
        ));
    };

    const renderDias = () => {
        const opcoes = [];
        for (let i = 1; i <= 31; i++) {
            opcoes.push(<option key={i} value={i}>{i}</option>);
        }
        return opcoes;
    }

    const renderAnos = () => {
        const opcoes = [];
        const anoAtual = new Date().getFullYear();
        for (let i = anoAtual; i >= 1905; i--) {
            opcoes.push(<option key={i} value={i}>{i}</option>);
        }
        return opcoes;
    };

    async function requestCadastro(e) {
        e.preventDefault()
        const response = await fetch("http://localhost:3000/usuario", {                                                                        //aqui estamos passando dados para nosso backend, metodo post. No headers o tipo de conteuudo sera aplication/json. Mas abaixo estamos passando na requisição body os dados. Primeiramente passamos o nome da variavel como definimos no backend e a frente passamos o nome que definimos aqui(frontend). Para que o valor chegue na variavel respectiva do backend
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(
                {
                    "email": email,
                    "senha": password,
                    "nome": nome,
                    "sobrenome": sobrenome,
                    "genero": genero,
                    "data_nascimento": `${dia}/${mes}/${ano}`,
                    "imagem": imagem
                })
        })
        if (!response.ok) {
            const json = await response.json()
            setErros(json)
            return
        }
        window.location.href = "/"                                                                                                              //direcionando para a pagina logado, ao final da função , se tudo der certo , passando o id na url
    }

    function carregaImagem(e) {                                                                                                                 //função de carregamento da imagem , usamos essa mesma função no projeto google, na parte do cabeçalho
        const arquivoImagem = e.target.files[0]
        if (!arquivoImagem) {
            return
        }
        const reader = new FileReader()
        reader.readAsDataURL(arquivoImagem)
        reader.onload = () => {
            setImagem(reader.result as string)
        }
    }

    return (
        <div>

            <div id="containerPrincipalCadastro">
                <LogoCabecalho />
                <div id="containerCadastro">
                    <div id="cabecalhoCadastro">
                        <div id='tituloCadastro'>Criar uma nova conta</div>
                        <div id='subTituloCadastro'>É rápido e fácil.</div>
                        <div id='containerLinhaDivisoria'>
                            <hr id='linhaDivisoria' />
                        </div>
                        <form id="formulario" action="">
                            <div id='cadastroNome'>
                                <div className='inputEError'>
                                    <input
                                        className="inputCadastroNome"
                                        type="text"
                                        placeholder='Nome'
                                        value={nome}
                                        onChange={e => setNome(e.target.value)} />
                                    {erros?.error.nome &&
                                        <span className='mensagemError'>{erros.error.nome._errors[0]}</span>
                                    }
                                </div>
                                <div>
                                    <div className='inputEError'>
                                        <input
                                            className="inputCadastroNome"
                                            type="text"
                                            placeholder='Sobrenome'
                                            value={sobrenome}
                                            onChange={e => setSobrenome(e.target.value)} />
                                        {erros?.error.sobrenome &&
                                            <span className='mensagemError'>{erros.error.sobrenome._errors[0]}</span>
                                        }
                                    </div>
                                </div>
                                <div id='iconeCamera' title='Adicionar foto de Perfil' onClick={() => inputFileRef.current?.click()}>
                                    <input type="file" hidden ref={inputFileRef} accept='image/*' onChange={carregaImagem} />
                                    {imagem ? <img id="imagemCadastro" src={imagem} /> : <Camera />}
                                </div>
                            </div>
                            <div id='containerPrincipalData'>
                                <div id='tituloData'>Data de nascimento
                                    <a id="birthday-help" href="#" title="Clique para obter mais informações" role="button"><i></i></a>
                                </div>
                                <div >
                                    <span id="containerData" data-type="selectors" data-name="birthday_wrapper" aria-describedby="birthday-error-message" >

                                        <select className="seletores" aria-label="Dia" id="day" title="Dia" value={dia} onChange={(e) => setDia(parseInt(e.target.value))}>
                                            {renderDias()}
                                        </select>
                                        <select className="seletores" aria-label="Mês" id="month" title="Mês"
                                            value={mes} onChange={(e) => setMes(parseInt(e.target.value))} >
                                            {renderMeses()}
                                        </select>
                                        <select className="seletores" aria-label="Ano" id="year" title="Ano"
                                            value={ano} onChange={(e) => setAno(parseInt(e.target.value))}>
                                            {renderAnos()}
                                        </select>
                                    </span>
                                </div>
                                {erros?.error.sobrenome &&
                                    <span style={{ color: "red", position: "absolute", marginTop: "-2px" }}>{erros.error.sobrenome._errors[0]}</span>
                                }
                                <div id="containerPrincipalGenero">
                                    <div id="tituloGenero">Gênero
                                        <a title="Clique para obter mais informações" href="#" role="button">
                                            <i > </i>
                                        </a>
                                    </div>
                                    <span id="containerGenero" data-type="radio" data-name="gender_wrapper" aria-describedby="gender-error-message" >
                                        <span className='opcoesGenero' >
                                            <label className='genero'>Feminino
                                                <input className="radio" type="radio" id="sex" name="sex" value="1" aria-describedby="gender-error-message"
                                                    onClick={() => setGenero("feminino")} />
                                            </label>
                                        </span>
                                        <span className='opcoesGenero'>
                                            <label className='genero'>Masculino
                                                <input className="radio" type="radio" id="sex" name="sex" value="2" aria-describedby="gender-error-message" onClick={() => setGenero("masculino")} />
                                            </label>
                                        </span>
                                        <span className='opcoesGenero'>
                                            <label className='genero'>Personalizado
                                                <input className="radio" type="radio" id="sex" name="sex" value="-1" aria-describedby="gender-error-message" onClick={() => setGenero("personalizado")} />
                                            </label>
                                        </span>
                                    </span>
                                    {erros?.error.genero &&
                                        <span style={{ color: "red", position: "absolute", marginTop: "-2px" }}>{erros.error.genero._errors[0]}</span>
                                    }
                                </div>
                                <div id='containerEmailESenha'>
                                    <div className='inputEError'>
                                        <input className="inputEmailESenha" type="text" placeholder='Celular ou email'
                                            value={email}
                                            onChange={e => setEmail(e.target.value)} />
                                        {erros?.error.email &&
                                            <span className='mensagemError'>{erros.error.email._errors[0]}</span>
                                        }
                                    </div>
                                    <div className='inputEError'>
                                        <input className="inputEmailESenha" type="text" placeholder='Nova senha'
                                            value={password}
                                            onChange={e => setPassword(e.target.value)} />
                                        {erros?.error.senha &&
                                            <span className='mensagemError'>{erros.error.senha._errors[0]}</span>
                                        }
                                    </div>
                                </div>
                                <p className='textoInformativo'>As pessoas que usam nosso serviço podem ter carregado suas informações de contato no Facebook.
                                    <a className="linkDoTexto" href="/help/637205020878504" role="link" target="_blank" >Saiba mais</a>.
                                </p>
                                <p className='textoInformativo'>Ao clicar em Cadastre-se, você concorda com nossos
                                    <a className="linkDoTexto" href="/legal/terms/update" target="_blank">Termos</a>, <a className="linkDoTexto" href="/about/privacy/update" target="_blank">Política de Privacidade</a> e <a className="linkDoTexto" href="/policies/cookies/" target="_blank">Política de Cookies</a>. Você poderá receber notificações por SMS e cancelar isso quando quiser.</p>
                                <div id='containerBotaoELink'>

                                    <button id='botaoCadastrar' onClick={(e) => requestCadastro(e)}>
                                        Cadastre-se
                                    </button>
                                    <a id='linkConta' href="/" aria-label="Já tem uma conta?" >Já tem uma conta?</a>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <Rodape />
        </div>
    )
}
export default PaginaCadastro

