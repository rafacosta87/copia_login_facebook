

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
    const idiomaSelecionado = contexto?.idiomaSelecionado
    const setIdiomaSelecionado = contexto?.setIdiomaSelecionado
    const [carregando, setCarregando] = useState(true)
    const [categoriaSelecionada, setCategoriaSelecionada] = useState("Todos os idiomas")

    const idiomasFiltrados = useMemo(() => {
        return idiomas.filter((idioma) => categoriaSelecionada == "Todos os idiomas" || idioma.categoria.includes(categoriaSelecionada))
    }, [categoriaSelecionada]
    )

      useEffect(() => {
        const timeout = setTimeout(() => setCarregando(false), 1500);
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
                                                    if (setIdiomaSelecionado)
                                                        setIdiomaSelecionado(idioma)
                                                }
                                            }
                                        >
                                            {idioma}
                                            {idioma == idiomaSelecionado && <b id="checkIdiomaSelecionado"> ✓ </b>}
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
                                                                e.preventDefault()
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
                                                                (idiomasFiltrados.length % 4 != 0 && id == 3) && <li>
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