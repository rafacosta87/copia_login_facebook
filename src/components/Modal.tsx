/*Função 594 a 512 primeira parte ele esta mapeando length 4 , onde esse id que esta em map , ira contar de 0 a 3 , esse id sera passado na linha 500, onde idiomas.slice pegara id(0) idiomas.length dividido por 4 até id(1) idiomas.length dividido por 4. Ai depois repete a operação, id(1) idiomas.length dividido por 4 até id(2) idiomas.length dividido por 4. Array.from fara esse loop até chegar em length: 4(l 496) ou seja id= 3, fatiando o array em quatro colunas iguais, essas colunas serão impressas no return(l 504)*/
/*Função useMemo, o uso do include é pq cateforia é um array, caso contrario não precisaria */
/*Pergunta na linha 518 . Perguntar a questão do margin-rigth na tag span. Tem pergunta no arquivo idiomaContexto.Se vai fazer o loading ao abrir o modal  */
/* Vai implatar mais tipagens no projeto. Passar esses array de idiomas e cateorias para um arquivo . Passar focu para div password*/

import { createPortal } from "react-dom"
import "./Modal.css"
import { useContext, useEffect, useMemo, useState } from "react"
import { IdiomaContexto } from "./IdiomaContexto"
import { idiomas, categorias, idiomasSugeridos } from './DadosIdiomas';
import { Loader2 } from "lucide-react";

type ModalProps = {
    onClose: () => void
}

function Modal({ onClose }: ModalProps) {
    const contexto = useContext(IdiomaContexto)
    const idiomaSelecionado = contexto?.idiomaSelecionado                                                                                      //esse "?" é pq a variavel pode ser undefined
    const setIdiomaSelecionado = contexto?.setIdiomaSelecionado
    const [carregando, setCarregando] = useState(true)
    const [categoriaSelecionada, setCategoriaSelecionada] = useState("Todos os idiomas")

    // const [idiomasFiltrados, setIdiomasFiltrados] = useState([])
    // useEffect(() => {
    //  const selecao = idiomas.filter((idioma) => categoriaSelecionada == "Todos os idiomas" || idioma.categoria.includes(categoriaSelecionada))
    //  setIdiomasFiltrados(selecao)
    // },[categoriaSelecionada])

    const idiomasFiltrados = useMemo(() => {
        return idiomas.filter((idioma) => categoriaSelecionada == "Todos os idiomas" || idioma.categoria.includes(categoriaSelecionada))
    }, [categoriaSelecionada]
    )

      useEffect(() => {
        const timeout = setTimeout(() => setCarregando(false), 1500);
        // Fecha ao apertar ESC
        const handleEsc = (e: KeyboardEvent) => e.key === "Escape" && onClose();
        window.addEventListener("keydown", handleEsc);

        return () => {
            clearTimeout(timeout);
            window.removeEventListener("keydown", handleEsc);
        };
    }, [onClose]);

    return (
        createPortal(
            <div id="modalBackground" onClick={onClose}>
                    {
                        carregando?
                      <div id="carregamentoModal">
                <Loader2 className="animate-spin spinner-loading"  />
            </div>
                    :
                    <>
                <div id="modalConteudo" onClick={(e) => e.stopPropagation()}>
                        <div id="modalCabecalho">
                            <div id="">Selecione seu idioma</div>
                        </div>
                        <div id="modalCentro">
                            <div id="idiomasSugeridos">
                                <span id="">Idiomas sugeridos</span>
                                <div id="containerIdiomasSugeridos">
                                    {idiomasSugeridos.map((idioma, idx) =>
                                        <div id={idiomaSelecionado == idioma ? "idiomaSugeridoSelecionado" : ""} className="idiomaSugerido" key={idx}
                                            onClick={
                                                () => {
                                                    if (setIdiomaSelecionado)                                                                       /*Aqui ś o equivalente, se setIdiomaSeeleciona receber valor executa o código abaixo, que é passar o valor para idiomaSelecionado. Em quais situações ele sera undefined? */
                                                        setIdiomaSelecionado(idioma)
                                                }
                                            }
                                        >
                                            {idioma}
                                            {idioma == idiomaSelecionado && <b id="checkIdiomaSelecionado"> ✓ </b>}                                 {/*passara esse icone para o idioma selecionado */}
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div id="containerIdiomas">
                                <div id="todosIdiomas">
                                    <ul id="">
                                        {categorias.map(
                                            (categoria, idx) =>
                                                <li key={idx} className="">
                                                    <a
                                                        onClick={
                                                            (e) => {
                                                                e.preventDefault()                                                                  /*é para evitar o evento padrão, por ser uma tag a , ao click ela atualiza pagina, e não queremos isso  */
                                                                setCategoriaSelecionada(categoria)
                                                            }
                                                        }
                                                        className={categoriaSelecionada == categoria ? "categoriaSelecionada " : "listaContinentes"}
                                                        href="#"
                                                        role="button" >
                                                        {categoria}
                                                    </a>
                                                </li>
                                        )}
                                    </ul>
                                </div>
                                <table id="tabela"  >
                                    <tr className="containerColunas">
                                        {
                                            Array.from({ length: 4 }, (_, i) => i).map((id) => {
                                                return (
                                                    <td key={id} className="colunaTabela">


                                                        <ul className="dadosTabela">
                                                            {
                                                                idiomasFiltrados
                                                                    .slice(id * Math.round(idiomasFiltrados.length / 4), (id + 1) * Math.round(idiomasFiltrados.length / 4))
                                                                    .map((idioma, idx) => {

                                                                        return (
                                                                            <li key={`${(id + 1)}-${(idx + 1)}`}>

                                                                                <a className={
                                                                                    idiomaSelecionado == idioma.nome ? "idiomaSelecionado" : "listaPaises"
                                                                                }
                                                                                    onClick={(e) => {
                                                                                        e.preventDefault()
                                                                                        if (setIdiomaSelecionado)
                                                                                            setIdiomaSelecionado(idioma.nome)
                                                                                    }}
                                                                                    href="#" role="button"
                                                                                >
                                                                                    {idioma.nome}
                                                                                </a>

                                                                            </li>
                                                                        )
                                                                    })
                                                            }
                                                            {
                                                                (idiomasFiltrados.length % 4 != 0 && id == 3) && <li>                                                   {/*Aqui é o seguinte caso a ultima coluna(coluna 4 que o id é 3) não tiver a mesma quantidade de idiomas que as outras , adicionara um caractere invisivel para deixar essa coluna alinhada ao topo igualmente as outras, se não fizer isso, ela ficara uma linha a baixo. A logica é a seguinte, são 4 colunas, se o numero de idiomas não for divisel po 4 , o resto sera diferente de zero na ultima coluna, ai adicionara um caractere invisivel nesta coluna*/}
                                                                    <a href="" className="listaPaises">
                                                                        &#65279;
                                                                    </a>
                                                                </li>
                                                            }
                                                        </ul>

                                                    </td>
                                                )
                                            })
                                        }
                                    </tr>
                                    {/* <tr className="containerColunas">
                                    <td className="colunaTabela">

                                        <ul className="dadosTabela">
                                            {
                                                idiomas.slice(0, idiomas.length / 4).map((idioma, idx) => {

                                                    return (
                                                        <li><div><a className="listaPaises" href="#" role="button"   >{idioma.nome}</a></div></li>
                                                    )
                                                })
                                            }
                                        </ul>
                                    </td>
                                    <td className="colunaTabela">

                                        <ul className="dadosTabela">
                                            {
                                                idiomas.slice(idiomas.length / 4, idiomas.length / 2).map((idioma, idx) => {

                                                    return (
                                                        <li><div><a className="listaPaises" href="#" role="button"   >{idioma.nome}</a></div></li>
                                                    )
                                                })
                                            }
                                        </ul>
                                    </td>
                                    <td className="colunaTabela">

                                        <ul className="dadosTabela">
                                            {
                                                idiomas.slice(idiomas.length * 2 / 4, idiomas.length * 3 / 4).map((idioma, idx) => {        

                                                    return (
                                                        <li><div><a className="listaPaises" href="#" role="button"   >{idioma.nome}</a></div></li>
                                                    )
                                                })
                                            }
                                        </ul>
                                    </td>
                                    <td className="colunaTabela">

                                        <ul className="dadosTabela">
                                            {
                                                idiomas.slice(idiomas.length * 3 / 4, idiomas.length).map((idioma, idx) => {

                                                    return (
                                                        <li><div><a className="listaPaises" href="#" role="button"   >{idioma.nome}</a></div></li>
                                                    )
                                                })
                                            }
                                        </ul>
                                    </td>
                                </tr> */}
                                </table>
                            </div>
                        </div>
                        <div id="bordaTopRodape">
                        </div>
                        <div id="modalRodape">
                            <button onClick={onClose}>Fechar</button>
                        </div>

                </div>
                    </>
                    }
            </div >
            , document.body
        )
    )

}
export default Modal