import PaginaLogin from './components/PaginaLogin.tsx'
import PaginaCadastro from './components/PaginaCadastro'

import IdiomaProvedor from './components/IdiomaProvedor'
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
        </Routes>
      </Router>
    </>
  )
}

export default App
