/* eslint-disable @typescript-eslint/no-unused-vars */
/*função 594 a 512 confirmar se é isso que entendemos. Primeira parte ele esta mapeando length 4 , onde esse id que esta em map , ira contar de 0 a 3 , esse id sera passado na linha 500, onde idiomas.slice pegara id(0) idiomas.length dividido por 4 até id(1) idiomas.length dividido por 4. Ai depois repete a operação, id(1) idiomas.length dividido por 4 até id(2) idiomas.length dividido por 4. Array.from fara esse loop até chegar em length: 4(l 496) ou seja id= 3, fatiando o array em quatro colunas iguais, essas colunas serão impressas no return(l 504)*/
/*qual é o papel de "idiomasSugeridos${idx}" dentro da função linha 499, elle é a segunda condição */
/*função  idiomasFiltrados, perguntar como reconhece que a string "Todos os idiomas" é a que contém todos idiomas. E o uso do include é pq cateforia é um array, caso contrario não precisaria dela(include)*/
/*qual utilidade da div que esta envolvendo a tag "a", na função que coloca os idiomas nas colunas */
import { createPortal } from "react-dom"

import "./Modal.css"
import { useEffect, useMemo, useState } from "react"

type ModalProps = {
    onClose: () => void
}

const idiomas = [
    {
        nome: 'Af-Soomaali',
        categoria: ["África e Oriente Médio"]
    },
    {
        nome: 'Afrikaans',
        categoria: ["África e Oriente Médio"]
    },
    {
        nome: 'Azərbaycan dili',
        categoria: ["Ásia-Pacífico", "Europa Oriental"]
    },
    {
        nome: 'Bahasa Indonesia',
        categoria: ["Ásia-Pacífico"]
    },
    {
        nome: 'Bahasa Melayu',
        categoria: ["Ásia-Pacífico"]
    },
    {
        nome: 'Basa Jawa',
        categoria: ["Ásia-Pacífico"]
    },
    {
        nome: 'Bisaya',
        categoria: ["Ásia-Pacífico"]
    },
    {
        nome: 'Bosanski',
        categoria: ["Europa Ocidental"]
    },
    {
        nome: 'Brezhoneg',
        categoria: ["Europa Ocidental"]
    },
    {
        nome: 'Català',
        categoria: ["Europa Ocidental"]
    },
    {
        nome: 'Corsu',
        categoria: ["Europa Ocidental"]
    },
    {
        nome: 'Cymraeg',
        categoria: ["Europa Ocidental"]
    },
    {
        nome: 'Dansk',
        categoria: ["Europa Ocidental"]
    },
    {
        nome: 'Deutsch',
        categoria: ["Europa Ocidental"]
    },
    {
        nome: 'Eesti',
        categoria: ["Europa Ocidental"]
    },
    {
        nome: 'English (UK)',
        categoria: ["Europa Ocidental"]
    },
    {
        nome: 'English (US)',
        categoria: ["Américas"]
    },
    {
        nome: 'Español',
        categoria: ["Américas"]
    },
    {
        nome: 'Español (España)',
        categoria: ["Europa Ocidental"]
    },
    {
        nome: 'Euskara',
        categoria: ["Europa Ocidental"]
    },
    {
        nome: 'Filipino',
        categoria: ["Ásia-Pacífico"]
    },
    {
        nome: 'Français (Canada)',
        categoria: ["Américas"]
    },
    {
        nome: 'Français (France)',
        categoria: ["Europa Ocidental"]
    },
    {
        nome: 'Frysk',
        categoria: ["Europa Ocidental"]
    },
    {
        nome: 'Fula',
        categoria: ["África e Oriente Médio"]
    },
    {
        nome: 'Furlan',
        categoria: ["Europa Ocidental"]
    },
    {
        nome: 'Føroyskt',
        categoria: ["Europa Ocidental"]
    },
    {
        nome: 'Gaeilge',
        categoria: ["Europa Ocidental"]
    },
    {
        nome: 'Galego',
        categoria: ["Europa Ocidental"]
    },
    {
        nome: 'Guarani',
        categoria: ["Américas"]
    },
    {
        nome: 'Hausa',
        categoria: ["África e Oriente Médio"]
    },
    {
        nome: 'Hrvatski',
        categoria: ["Europa Ocidental"]
    },
    {
        nome: 'Ikinyarwanda',
        categoria: ["África e Oriente Médio"]
    },
    {
        nome: 'Inuktitut',
        categoria: ["Américas"]
    },
    {
        nome: 'Italiano',
        categoria: ["Europa Ocidental"]
    },
    {
        nome: 'Iñupiatun',
        categoria: ["Américas"]
    },
    {
        nome: 'Kiswahili',
        categoria: ["África e Oriente Médio"]
    },
    {
        nome: 'Kreyòl Ayisyen',
        categoria: ["Américas"]
    },
    {
        nome: 'Kurdî (Kurmancî)',
        categoria: ["África e Oriente Médio"]
    },
    {
        nome: 'Latviešu',
        categoria: ["Europa Ocidental"]
    },
    {
        nome: 'Lietuvių',
        categoria: ["Europa Ocidental"]
    },
    {
        nome: 'Magyar',
        categoria: ["Europa Oriental"]
    },
    {
        nome: 'Malagasy',
        categoria: ["África e Oriente Médio"]
    },
    {
        nome: 'Malti',
        categoria: ["Europa Ocidental"]
    },
    {
        nome: 'Nederlands',
        categoria: ["Europa Ocidental"]
    },
    {
        nome: 'Norsk (bokmål)',
        categoria: ["Europa Ocidental"]
    },
    {
        nome: 'Norsk (nynorsk)',
        categoria: ["Europa Ocidental"]
    },
    {
        nome: "O'zbek",
        categoria: ["Ásia-Pacífico"]
    },
    {
        nome: 'Polski',
        categoria: ["Europa Oriental"]
    },
    {
        nome: 'Português (Brasil)',
        categoria: ["Américas"]
    },
    {
        nome: 'Português (Portugal)',
        categoria: ["Europa Ocidental"]
    },
    {
        nome: 'Română',
        categoria: ["Europa Oriental"]
    },
    {
        nome: 'Sardu',
        categoria: ["Europa Ocidental"]
    },
    {
        nome: 'Shona',
        categoria: ["África e Oriente Médio"]
    },
    {
        nome: 'Shqip',
        categoria: ["Europa Ocidental"]
    },
    {
        nome: 'Slovenčina',
        categoria: ["Europa Oriental"]
    },
    {
        nome: 'Slovenščina',
        categoria: ["Europa Oriental"]
    },
    {
        nome: 'Suomi',
        categoria: ["Europa Ocidental"]
    },
    {
        nome: 'Svenska',
        categoria: ["Europa Ocidental"]
    },
    {
        nome: 'Tiếng Việt',
        categoria: ["Ásia-Pacífico"]
    },
    {
        nome: 'Türkçe',
        categoria: ["África e Oriente Médio"]
    },
    {
        nome: 'Vlaams',
        categoria: ["Europa Ocidental"]
    },
    {
        nome: 'Zaza',
        categoria: ["África e Oriente Médio"]
    },
    {
        nome: 'Íslenska',
        categoria: ["Europa Ocidental"]
    },
    {
        nome: 'Čeština',
        categoria: ["Europa Oriental"]
    },
    {
        nome: 'ślōnskŏ gŏdka',
        categoria: ["Europa Oriental"]
    },
    {
        nome: 'Ελληνικά',
        categoria: ["Europa Ocidental"]
    },
    {
        nome: 'Беларуская',
        categoria: ["Europa Oriental"]
    },
    {
        nome: 'Български',
        categoria: ["Europa Oriental"]
    },
    {
        nome: 'Македонски',
        categoria: ["Europa Ocidental"]
    },
    {
        nome: 'Монгол',
        categoria: ["Ásia-Pacífico"]
    },
    {
        nome: 'Русский',
        categoria: ["Europa Oriental"]
    },
    {
        nome: 'Српски',
        categoria: ["Europa Ocidental"]
    },
    {
        nome: 'Татарча',
        categoria: ["Ásia-Pacífico", "Europa Oriental"]
    },
    {
        nome: 'Тоҷикӣ',
        categoria: ["Ásia-Pacífico"]
    },
    {
        nome: 'Українська',
        categoria: ["Europa Oriental"]
    },
    {
        nome: 'кыргызча',
        categoria: ["Ásia-Pacífico"]
    },
    {
        nome: 'Қазақша',
        categoria: ["Ásia-Pacífico", "Europa Oriental"]
    },
    {
        nome: 'Հայերեն',
        categoria: ["Europa Oriental", "Ásia-Pacífico"]
    },
    {
        nome: 'עברית',
        categoria: ["África e Oriente Médio"]
    },
    {
        nome: 'اردو',
        categoria: ["Ásia-Pacífico"]
    },
    {
        nome: 'العربية',
        categoria: ["África e Oriente Médio"]
    },
    {
        nome: 'فارسی',
        categoria: ["África e Oriente Médio"]
    },
    {
        nome: 'پښتو',
        categoria: ["África e Oriente Médio", "Ásia-Pacífico"]
    },
    {
        nome: 'کوردیی ناوەندی',
        categoria: ["África e Oriente Médio"]
    },
    {
        nome: 'ܣܘܪܝܝܐ',
        categoria: ["África e Oriente Médio"]
    },
    {
        nome: 'नेपाली',
        categoria: ["Ásia-Pacífico"]
    },
    {
        nome: 'मराठी',
        categoria: ["Ásia-Pacífico"]
    },
    {
        nome: 'हिन्दी',
        categoria: ["Ásia-Pacífico"]
    },
    {
        nome: 'অসমীয়া',
        categoria: ["Ásia-Pacífico"]
    },
    {
        nome: 'বাংলা',
        categoria: ["Ásia-Pacífico"]
    },
    {
        nome: 'ਪੰਜਾਬੀ',
        categoria: ["Ásia-Pacífico"]
    },
    {
        nome: 'ગુજરાતી',
        categoria: ["África e Oriente Médio", "Ásia-Pacífico"]
    },
    {
        nome: 'ଓଡ଼ିଆ',
        categoria: ["Ásia-Pacífico"]
    },
    {
        nome: 'தமிழ்',
        categoria: ["Ásia-Pacífico"]
    },
    {
        nome: 'తెలుగు',
        categoria: ["Ásia-Pacífico"]
    },
    {
        nome: 'ಕನ್ನಡ',
        categoria: ["Ásia-Pacífico"]
    },
    {
        nome: 'മലയാളം',
        categoria: ["Ásia-Pacífico"]
    },
    {
        nome: 'සිංහල',
        categoria: ["Ásia-Pacífico"]
    },
    {
        nome: 'ภาษาไทย',
        categoria: ["Ásia-Pacífico"]
    },
    {
        nome: 'ພາສາລາວ',
        categoria: ["Ásia-Pacífico"]
    },
    {
        nome: 'မြန်မာဘာသာ',
        categoria: ["Ásia-Pacífico"]
    },
    {
        nome: 'ქართული',
        categoria: ["Europa Oriental", "Ásia-Pacífico"]
    },
    {
        nome: 'አማርኛ',
        categoria: ["África e Oriente Médio"]
    },
    {
        nome: 'ភាសាខ្មែរ',
        categoria: ["Ásia-Pacífico"]
    },
    {
        nome: 'ⵜⴰⵎⴰⵣⵉⵖⵜ',
        categoria: ["África e Oriente Médio"]
    },
    {
        nome: '中文(台灣)',
        categoria: ["Ásia-Pacífico"]
    },
    {
        nome: '中文(简体)',
        categoria: ["Ásia-Pacífico"]
    },
    {
        nome: '中文(香港)',
        categoria: ["Ásia-Pacífico"]
    },
    {
        nome: '日本語',
        categoria: ["Ásia-Pacífico"]
    },
    {
        nome: '日本語(関西)',
        categoria: ["Ásia-Pacífico"]
    },
    {
        nome: '한국어',
        categoria: ["Ásia-Pacífico"]
    },
]

const categorias = [
    "Todos os idiomas",
    "África e Oriente Médio",
    "Américas",
    "Ásia-Pacífico",
    "Europa Oriental",
    "Europa Ocidental",
]

const idiomasSugeridos = [
    "Português (Brasil)",
    "English (US)",
    "Español",
    "Français (France)",
]

function Modal({ onClose }: ModalProps) {
    const [idiomaSelecionado, setIdiomaSelecionado] = useState("Português (Brasil)")
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

    return (
        createPortal(
            <div id="modalBackground">
                <div id="modalConteudo">
                    <div id="modalCabecalho">
                        <div id="">Selecione seu idioma</div>
                    </div>
                    <div id="modalCentro">
                        <div id="idiomasSugeridos">
                            <span id="">Idiomas sugeridos</span>
                            <div id="containerIdiomasSugeridos">
                                {idiomasSugeridos.map((idioma, idx) =>
                                    <div id={idiomaSelecionado == idioma ? "idiomaSugeridoSelecionado" : `idiomaSugerido`} key={idx}
                                        onClick={
                                            () => {
                                                
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
                                                                            <div>
                                                                                <a className={
                                                                                    idiomaSelecionado == idioma.nome ? "idiomaSelecionado" : "listaPaises"
                                                                                }
                                                                                    onClick={(e) => {
                                                                                        e.preventDefault()
                                                                                        setIdiomaSelecionado(idioma.nome)
                                                                                    }}
                                                                                    href="#" role="button"
                                                                                >
                                                                                    {idioma.nome}
                                                                                </a>
                                                                            </div>
                                                                        </li>
                                                                    )
                                                                })
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
            </div >
            , document.body
        )
    )

}
export default Modal