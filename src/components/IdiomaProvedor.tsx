import { useState, type ReactNode } from "react";
import { IdiomaContexto } from "./IdiomaContexto";

function IdiomaProvedor({ children }: { children: ReactNode }) {
    const [idiomaSelecionado, setIdiomaSelecionado] = useState("Português (Brasil)")
return (
    <IdiomaContexto.Provider value={{idiomaSelecionado, setIdiomaSelecionado}}>
        {children}
    </IdiomaContexto.Provider>
)
}
export default IdiomaProvedor