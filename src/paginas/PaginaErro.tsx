import { useNavigate } from 'react-router-dom';
import LogoCabecalho from '../components/LogoCabecalho';
import Rodape from '../components/Rodape';
import './PaginaErro.css'; // Importando o novo CSS
import { useEffect } from 'react';

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

    useEffect(() => {
        document.title = "Página não encontrada";
    }, []);

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