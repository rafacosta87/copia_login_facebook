import { createContext } from "react";
//aqui estamos criando um tipo para uasr na linha 5 , no jsx não precisaria?
type IdiomaContextoType = { idiomaSelecionado: string, setIdiomaSelecionado: ( valor: string) => void }

export const IdiomaContexto = createContext<IdiomaContextoType | undefined>(undefined)