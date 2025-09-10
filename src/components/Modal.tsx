import { createPortal } from "react-dom"

import "./Modal.css"

type ModalProps = {
    onClose: () => void
}

function Modal({ onClose }: ModalProps) {

    return (
        createPortal(
            <div id="modalBackground">
                <div id="modalConteudo">
                    <div id="modalCabecalho">
                        <div id="modalTitulo">Selecione seu idioma</div>
                    </div>
                    <div id="modalCentro">
                        <div id="idiomasSugeridos">
                            <span>Idiomas sugeridos</span>
                            <p>Português (Brasil)</p>
                            <p>English (US)</p>
                            <p>Español </p>
                            <p>Français (France)</p>
                        </div>
                        <div id="todosIdiomas">

                        </div>
                    </div>
                    <div id="modalRodape">
                        <button onClick={onClose}>Fechar</button>
                    </div>


                </div>
            </div>
            , document.body
        )
    )

}
export default Modal