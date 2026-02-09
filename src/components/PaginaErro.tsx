import { useNavigate } from 'react-router-dom';
import LogoCabecalho from './LogoCabecalho';
import Rodape from './Rodape';
import './PaginaErro.css'; // Importando o novo CSS

interface PaginaErroProps {
    titulo?: string;
    mensagem?: string;
    textoBotao?: string;
    destinoBotao?: string;
}

const PaginaErro = ({ 
    titulo = "Página não encontrada", 
    mensagem = "O conteúdo que você procura não existe ou foi removido.",
    textoBotao = "Ir para a página inicial",
    destinoBotao = "/" 
}: PaginaErroProps) => {
    const navigate = useNavigate();

    return (
        <div className='containerErro'>
            <LogoCabecalho />
            
            <main className='conteudoErro'>
                <div className='cardErro'>
                    <h1 className="tituloErro">{titulo}</h1>
                    <p className='textoErro'>{mensagem}</p>
                    
                    <button 
                        className='botaoErro' 
                        onClick={() => navigate(destinoBotao)}
                    >
                        {textoBotao}
                    </button>

                </div>
            </main>

            <Rodape />
        </div>
    );
};

export default PaginaErro;