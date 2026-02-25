/* eslint-disable @typescript-eslint/no-unused-vars */
import { useContext, useState } from "react"
import "./Rodape.css"
import Modal from "./Modal.tsx"
import { IdiomaContexto } from "./IdiomaContexto"
import { idiomasRodape } from "./DadosIdiomas.tsx"

function Rodape() {
    const contexto = useContext(IdiomaContexto)
    const [openModal, setOpenModal] = useState(false)
    const idiomaSelecionado = contexto?.idiomaSelecionado                          
    const setIdiomaSelecionado = contexto?.setIdiomaSelecionado
    const anoAtual = new Date().getFullYear();

    return (
        <>
            <footer id="main">
                {
                    openModal &&
                    <Modal onClose={() => setOpenModal(false)} />
                }
                <div id="conteudo" >
                    <ul className="primeiraLista" data-nocookies="1">
                        {idiomasRodape.map((idioma, idx) => {
                            return <li><a
                                className="linksListaUm"
                                title={idioma}
                                id={idiomaSelecionado == idioma ? "idiomaRodapeSelecionado" : ""}
                                onClick={(e) => {
                                    e.preventDefault()
                                    if (setIdiomaSelecionado)
                                        setIdiomaSelecionado(idioma)
                                }}
                            >{idioma}</a>
                            </li>
                        })}
                        <li><a role="button" className="" rel="dialog" href="#" title="Mostrar mais idiomas" onClick={() => setOpenModal(true)}>
                            <i id="buttonMais" className="" ><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M5 12h14" />
                                <path d="M12 5v14" />
                            </svg>
                            </i>
                        </a>
                        </li>
                    </ul>
                    <div id="borda"></div>
                    <div id="conteinerListaDois" role="contentinfo" aria-label="Links de site do Facebook">
                        <ul className="segundaLista">
                            <li><a className="linksListaDois" href="/cadastro" title="Cadastre-se no Facebook">Cadastre-se</a></li>
                            <li><a className="linksListaDois" href="/" title="Entrar no Facebook">Entrar</a></li>
                            <li><a className="linksListaDois" href="https://messenger.com/" title="Confira o Messenger.">Messenger</a></li>
                            <li><a className="linksListaDois" href="https://www.facebook.com/lite/" title="Facebook Lite para Android.">Facebook Lite</a></li>
                            <li><a className="linksListaDois" href="https://www.facebook.com/watch/" title="Explorar a aba Vídeo">Vídeo</a></li>
                            <li><a className="linksListaDois" href="https://about.meta.com/technologies/meta-pay" title="Saiba mais sobre o Meta Pay" target="_blank">Meta Pay</a></li>
                            <li><a className="linksListaDois" href="https://www.meta.com/" title="Finalizar a compra com a Meta" target="_blank">Meta Store</a></li>
                            <li><a className="linksListaDois" href="https://www.meta.com/quest/" title="Saiba mais sobre o Meta Quest" target="_blank">Meta Quest</a></li>
                            <li><a className="linksListaDois" href="https://www.meta.com/smart-glasses/" title="Saiba mais sobre o Ray-Ban Meta" target="_blank">Ray-Ban Meta</a></li>
                            <li><a className="linksListaDois" href="https://www.meta.ai/" title="Meta AI">Meta AI</a></li>
                            <li><a className="linksListaDois" href="https://www.meta.ai/pages/what-is-labubu/?utm_source=foa_web_footer" title="Mais conteúdo da Meta AI">Mais conteúdo da Meta AI</a></li>
                            <li><a className="linksListaDois" href="https://www.instagram.com/" title="Confira o Instagram" target="_blank" rel="noreferrer nofollow" data-lynx-mode="asynclazy">Instagram</a></li>
                            <li><a className="linksListaDois" href="https://www.threads.com/" title="Confira o Threads">Threads</a></li>
                            <li><a className="linksListaDois" href="/votinginformationcenter/?entry_point=c2l0ZQ%3D%3D" title="Veja a Central de Informações de Votação.">Central de Informações de Votação</a></li>
                            <li><a className="linksListaDois" href="https://www.facebook.com/privacy/policy/?entry_point=facebook_page_footer" title="Saiba como coletamos, usamos e compartilhamos informações para apoiar o Facebook.">Política de Privacidade</a></li>
                            <li><a className="linksListaDois" href="https://www.facebook.com/privacy/center/?entry_point=facebook_page_footer" title="Saiba como gerenciar e controlar sua privacidade no Facebook.">Central de Privacidade</a></li>
                            <li><a className="linksListaDois" href="https://about.meta.com/" /*accesskey="8"*/ title="Leia nosso blog, descubra a central de recursos e encontre oportunidades de trabalho.">Sobre</a></li>
                            <li><a className="linksListaDois" href="https://www.facebook.com/login.php?next=https%3A%2F%2Fwww.facebook.com%2Fads%2Fcreate%2F%3Fnav_source%3Dunknown%26campaign_id%3D402047449186%26placement%3Dpflo%26extra_1%3Dnot-admgr-user&campaign_id=402047449186" title="Anuncie no Facebook.">Criar anúncio</a></li>
                            <li><a className="linksListaDois" href="https://www.facebook.com/pages/create/?ref_type=site_footer" title="Criar uma Página">Criar Página</a></li>
                            <li><a className="linksListaDois" href="https://developers.facebook.com/?ref=pf" title="Desenvolver em nossa plataforma.">Desenvolvedores</a></li>
                            <li><a className="linksListaDois" href="https://www.metacareers.com/" title="Dê um passo adiante na sua carreira em nossa incrível empresa.">Carreiras</a></li>
                            <li><a className="linksListaDois" href="https://www.facebook.com/privacy/policies/cookies/?entry_point=cookie_policy_redirect&entry=0" title="Saiba mais sobre cookies e o Facebook" data-nocookies="1">Cookies</a></li>
                            <li><a className="linksListaDois" data-nocookies="1" href="https://www.facebook.com/help/568137493302217" title="Saiba mais sobre as escolhas para anúncios.">Escolhas para anúncios </a></li>
                            <li><a className="linksListaDois" data-nocookies="1" href="https://www.facebook.com/policies_center/" /*accesskey="9"*/ title="Leia os nossos termos e políticas.">Termos</a></li>
                            <li><a className="linksListaDois" href="https://www.facebook.com/help/?ref=pf" /*accesskey="0"*/ title="Acesse nossa Central de Ajuda.">Ajuda</a></li>
                            <li><a className="linksListaDois" href="https://www.facebook.com/help/637205020878504" title="Acesse nosso aviso de carregamento de contatos e não usuários.">Upload de contatos e não usuários</a></li>
                            {/*<li><a accesskey="6" className="accessible_elem" href="/settings" title="Visualize e edite suas configurações do Facebook.">Configurações</a></li>*/}
                            {/*<li><a accesskey="7" className="accessible_elem" href="/allactivity?privacy_source=activity_log_top_menu" title="Ver registro de atividades">Registro de atividades</a></li>*/}
                        </ul>
                    </div>

                    <div className="mvl copyright">
                        <div>
                            <span> Meta © {anoAtual}</span>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    )
}

export default Rodape