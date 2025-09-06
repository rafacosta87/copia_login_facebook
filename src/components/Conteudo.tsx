import "./Conteudo.css"; 

function Conteudo() {



    return (
    <div id="pai">

    <div id="containerLogo" >

    <img id="logo" src="https://static.xx.fbcdn.net/rsrc.php/y1/r/4lCu2zih0ca.svg" alt="Facebook"></img>
    <h2>O Facebook ajuda você a se conectar e compartilhar com as pessoas que fazem parte da sua vida.</h2>
    </div>
    <div id="containerLogin">   
    <div id="login">
    <input type="text" className="inputText" name="email" id="email" placeholder="Email ou telefone" aria-label="Email ou telefone"/>
    <input type="text" className="inputText" name="pass" id="pass" placeholder="Senha" aria-label="Senha"/>
    <button className="buttonEntrar" type="submit">Entrar</button>
    <a className="novaSenha" href="">Esqueceu a senha?</a>
    <hr />
    <button className="buttonConta" type="submit">Criar nova conta</button>
    </div>
    <div id="msgContainer"> <a href="">Crie uma Página </a>para uma celebridade, uma marca ou uma empresa.</div>
    </div>
    </div>
)}
export default Conteudo