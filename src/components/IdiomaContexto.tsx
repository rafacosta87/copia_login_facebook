import { createContext } from "react";
type IdiomaContextoType = { idiomaSelecionado: string, setIdiomaSelecionado: ( valor: string) => void }

export const IdiomaContexto = createContext<IdiomaContextoType | undefined>(undefined)