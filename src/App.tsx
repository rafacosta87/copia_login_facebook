import PaginaLogin from './paginas/PaginaLogin.tsx'
import PaginaCadastro from './paginas/PaginaCadastro.tsx'
import PaginaLogado from './paginas/PaginaLogado.tsx'
import PaginaRecuperarSenha from './paginas/PaginaRecuperarSenha.tsx'
import IdiomaProvedor from './components/IdiomaProvedor'
import PaginaRedefinirSenha from './paginas/PaginaRedefinirSenha.tsx'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {


  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={
            <IdiomaProvedor>
              <PaginaLogin />
            </IdiomaProvedor>
          } />
          <Route path='/cadastro' element={
            <IdiomaProvedor>
              <PaginaCadastro />
            </IdiomaProvedor>
          } />
          <Route path='/logado' element={
            <IdiomaProvedor>
              <PaginaLogado />
            </IdiomaProvedor>
          } />
          <Route path='/recuperar/senha' element={
            <IdiomaProvedor>
              <PaginaRecuperarSenha />
            </IdiomaProvedor>
          } />
          <Route path='/redefinir/senha' element={
            <IdiomaProvedor>
              <PaginaRedefinirSenha />
            </IdiomaProvedor>
          } />
        </Routes>
      </Router>
    </>
  )
}

export default App
