import { Pencil, Check, X, Loader2 } from "lucide-react";
import { useState, type ReactNode, type ChangeEvent, type KeyboardEvent } from 'react';
import "./CampoPerfil.css"

interface CampoPerfilProps {
    icone: ReactNode;
    titulo: string;
    valorExibido?: string | null;
    nomeCampo: string;
    // --- MUDANÇAS AQUI ---
    estaEditando: boolean;  // Recebe do pai
    onAbrir: () => void;    // Avisa o pai que quer abrir
    // ---------------------
    tipoInput?: string;
    erro?: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    onSalvar: () => Promise<boolean | void>;
    onCancelar: () => void;
}

export function CampoPerfil({
    icone,
    titulo,
    valorExibido,
    nomeCampo,
    estaEditando, // Propriedade nova
    onAbrir,      // Propriedade nova
    tipoInput = "text",
    erro,
    onChange,
    onSalvar,
    onCancelar
}: CampoPerfilProps) {
    // Removemos o useState(false) de estaEditando pois ele vem via Props agora
    const [carregando, setCarregando] = useState(false);
    const [valorInputLocal, setValorInputLocal] = useState<string>("");

    const handleSalvar = async () => {
        setCarregando(true);
        await onSalvar();
        setCarregando(false);
        // Não precisamos setEstaEditando(false), o pai fará isso ao atualizar os dados
    };

    const handleCancelar = () => {
        onCancelar();
        // Não precisamos setEstaEditando(false), o pai fará isso no setCampoEmEdicao(null)
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') handleSalvar();
        if (e.key === 'Escape') handleCancelar();
    };

    const iniciarEdicao = () => {
        const valorInicial = nomeCampo === "senha" ? "" : (valorExibido ?? "");
        setValorInputLocal(valorInicial ?? "");
        onAbrir(); // Chama a função que vem do pai para abrir ESTE campo
    };

    return (
        <div className="dadosUsuario">
            <div className="containerIconeEDados">
                <div title={titulo}>{icone}</div>
                {estaEditando ? (
                    <div className='containerAtualizarDados'>
                        <input
                            autoFocus
                            type={tipoInput}
                            className='inputAtualizarDados'
                            placeholder={`Digite novo(a) ${titulo.toLowerCase()}`}
                            name={nomeCampo}
                            value={valorInputLocal}
                            disabled={carregando}
                            onChange={(e) => {
                                setValorInputLocal(e.target.value);
                                onChange(e);
                            }}
                            onKeyDown={handleKeyDown}
                        />
                        {valorInputLocal && (
                            <div
                                className="containerLinksAtualizacao"
                                onClick={handleSalvar}
                                title="Confirmar"
                            >
                                {carregando ? (
                                    <div className="iconeLapis"> <Loader2 className="animate-spin" /> </div>
                                ) : (
                                    <div className="iconeLapis"> <Check /> </div>
                                )}
                            </div>
                        )}
                        <div
                            className="iconeLapis"
                            onClick={handleCancelar}
                            title="Cancelar"
                        >
                            <X />
                        </div>
                    </div>
                ) : (
                    <div className='containerAtualizarDados'>
                        <p className="dados" >{valorExibido || "Não informado"}</p>
                        <div
                            className="iconeLapis"
                            title={`Alterar ${titulo.toLowerCase()}`}
                            onClick={iniciarEdicao}
                        >
                            <Pencil />
                        </div>
                    </div>
                )}
            </div>
            {erro && estaEditando && (
                <span className='erroDeAtualizacao'>{erro}</span>
            )}
        </div>
    );
}