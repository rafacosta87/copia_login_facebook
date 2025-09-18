
import Conteudo from './components/Conteudo.tsx'

import Rodape from './components/Rodape.tsx'
import IdiomaProvedor from './components/IdiomaProvedor'

function App() {


  return (
    <>
      <IdiomaProvedor>
        <Conteudo />
        <Rodape />
      </IdiomaProvedor>
    </>
  )
}

export default App
