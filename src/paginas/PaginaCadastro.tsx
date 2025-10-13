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
    const [dia, setDia] = useState("1")
    const [mes, setMes] = useState("1")
    const [ano, setAno] = useState("2025")
    const [genero, setGenero] = useState("")
    const [imagem, setImagem] = useState<string | null>(null)
    const [erros, setErros] = useState<Erros | undefined>()

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

                                        <select className="seletores" aria-label="Dia" aria-describedby="birthday-error-message" name="birthday_day" id="day" title="Dia"
                                            onChange={(e) => setDia(e.target.value)}>
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                            <option value="5">5</option>
                                            <option value="6">6</option>
                                            <option value="7">7</option>
                                            <option value="8">8</option>
                                            <option value="9">9</option>
                                            <option value="10">10</option>
                                            <option value="11">11</option>
                                            <option value="12">12</option>
                                            <option value="13">13</option>
                                            <option value="14">14</option>
                                            <option value="15">15</option>
                                            <option value="16">16</option>
                                            <option value="17">17</option>
                                            <option value="18">18</option>
                                            <option value="19">19</option>
                                            <option value="20">20</option>
                                            <option value="21">21</option>
                                            <option value="22" /*selected="1"*/>22</option>
                                            <option value="23">23</option>
                                            <option value="24">24</option>
                                            <option value="25">25</option>
                                            <option value="26">26</option>
                                            <option value="27">27</option>
                                            <option value="28">28</option>
                                            <option value="29">29</option>
                                            <option value="30">30</option>
                                            <option value="31">31</option>
                                        </select>
                                        <select className="seletores" aria-label="Mês" aria-describedby="birthday-error-message" name="birthday_month" id="month" title="Mês"
                                            onChange={(e) => setMes(e.target.value)} >
                                            <option value="1">jan</option>
                                            <option value="2">fev</option>
                                            <option value="3">mar</option>
                                            <option value="4">abr</option>
                                            <option value="5">mai</option>
                                            <option value="6">jun</option>
                                            <option value="7">jul</option>
                                            <option value="8">ago</option>
                                            <option value="9" /*selected="1"*/>set</option>
                                            <option value="10">out</option>
                                            <option value="11">nov</option>
                                            <option value="12">dez</option>
                                        </select>
                                        <select className="seletores" aria-label="Ano" aria-describedby="birthday-error-message" name="birthday_year" id="year" title="Ano"
                                            onChange={(e) => setAno(e.target.value)}>
                                            <option value="2025" /*selected="1"*/>2025</option>
                                            <option value="2024">2024</option>
                                            <option value="2023">2023</option>
                                            <option value="2022">2022</option>
                                            <option value="2021">2021</option>
                                            <option value="2020">2020</option>
                                            <option value="2019">2019</option>
                                            <option value="2018">2018</option>
                                            <option value="2017">2017</option>
                                            <option value="2016">2016</option>
                                            <option value="2015">2015</option>
                                            <option value="2014">2014</option>
                                            <option value="2013">2013</option>
                                            <option value="2012">2012</option>
                                            <option value="2011">2011</option>
                                            <option value="2010">2010</option>
                                            <option value="2009">2009</option>
                                            <option value="2008">2008</option>
                                            <option value="2007">2007</option>
                                            <option value="2006">2006</option>
                                            <option value="2005">2005</option>
                                            <option value="2004">2004</option>
                                            <option value="2003">2003</option>
                                            <option value="2002">2002</option>
                                            <option value="2001">2001</option>
                                            <option value="2000">2000</option>
                                            <option value="1999">1999</option>
                                            <option value="1998">1998</option>
                                            <option value="1997">1997</option>
                                            <option value="1996">1996</option>
                                            <option value="1995">1995</option>
                                            <option value="1994">1994</option>
                                            <option value="1993">1993</option>
                                            <option value="1992">1992</option>
                                            <option value="1991">1991</option>
                                            <option value="1990">1990</option>
                                            <option value="1989">1989</option>
                                            <option value="1988">1988</option>
                                            <option value="1987">1987</option>
                                            <option value="1986">1986</option>
                                            <option value="1985">1985</option>
                                            <option value="1984">1984</option>
                                            <option value="1983">1983</option>
                                            <option value="1982">1982</option>
                                            <option value="1981">1981</option>
                                            <option value="1980">1980</option>
                                            <option value="1979">1979</option>
                                            <option value="1978">1978</option>
                                            <option value="1977">1977</option>
                                            <option value="1976">1976</option>
                                            <option value="1975">1975</option>
                                            <option value="1974">1974</option>
                                            <option value="1973">1973</option>
                                            <option value="1972">1972</option>
                                            <option value="1971">1971</option>
                                            <option value="1970">1970</option>
                                            <option value="1969">1969</option>
                                            <option value="1968">1968</option>
                                            <option value="1967">1967</option>
                                            <option value="1966">1966</option>
                                            <option value="1965">1965</option>
                                            <option value="1964">1964</option>
                                            <option value="1963">1963</option>
                                            <option value="1962">1962</option>
                                            <option value="1961">1961</option>
                                            <option value="1960">1960</option>
                                            <option value="1959">1959</option>
                                            <option value="1958">1958</option>
                                            <option value="1957">1957</option>
                                            <option value="1956">1956</option>
                                            <option value="1955">1955</option>
                                            <option value="1954">1954</option>
                                            <option value="1953">1953</option>
                                            <option value="1952">1952</option>
                                            <option value="1951">1951</option>
                                            <option value="1950">1950</option>
                                            <option value="1949">1949</option>
                                            <option value="1948">1948</option>
                                            <option value="1947">1947</option>
                                            <option value="1946">1946</option>
                                            <option value="1945">1945</option>
                                            <option value="1944">1944</option>
                                            <option value="1943">1943</option>
                                            <option value="1942">1942</option>
                                            <option value="1941">1941</option>
                                            <option value="1940">1940</option>
                                            <option value="1939">1939</option>
                                            <option value="1938">1938</option>
                                            <option value="1937">1937</option>
                                            <option value="1936">1936</option>
                                            <option value="1935">1935</option>
                                            <option value="1934">1934</option>
                                            <option value="1933">1933</option>
                                            <option value="1932">1932</option>
                                            <option value="1931">1931</option>
                                            <option value="1930">1930</option>
                                            <option value="1929">1929</option>
                                            <option value="1928">1928</option>
                                            <option value="1927">1927</option>
                                            <option value="1926">1926</option>
                                            <option value="1925">1925</option>
                                            <option value="1924">1924</option>
                                            <option value="1923">1923</option>
                                            <option value="1922">1922</option>
                                            <option value="1921">1921</option>
                                            <option value="1920">1920</option>
                                            <option value="1919">1919</option>
                                            <option value="1918">1918</option>
                                            <option value="1917">1917</option>
                                            <option value="1916">1916</option>
                                            <option value="1915">1915</option>
                                            <option value="1914">1914</option>
                                            <option value="1913">1913</option>
                                            <option value="1912">1912</option>
                                            <option value="1911">1911</option>
                                            <option value="1910">1910</option>
                                            <option value="1909">1909</option>
                                            <option value="1908">1908</option>
                                            <option value="1907">1907</option>
                                            <option value="1906">1906</option>
                                            <option value="1905">1905</option>
                                        </select>
                                    </span>
                                </div>
                                {erros?.error.sobrenome &&
                                            <span style={{color: "red"}}>{erros.error.sobrenome._errors[0]}</span>
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
                                        <span style={{color: "red"}}>{erros.error.genero._errors[0]}</span>
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

