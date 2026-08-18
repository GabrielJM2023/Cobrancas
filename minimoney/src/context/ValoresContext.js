import { createContext, useContext, useState } from "react";

const ValoresContext = createContext();

export function ValoresProvider({ children }) {
    const [valoresVisiveis, setValoresVisiveis] = useState(true);

    const alternarValores = () => {
        setValoresVisiveis(valor => !valor);
    };

    return (
        <ValoresContext.Provider
            value={{
                valoresVisiveis,
                alternarValores
            }}
        >
            {children}
        </ValoresContext.Provider>
    );
}

export function useValores() {
    const context = useContext(ValoresContext);

    if (!context) {
        throw new Error(
            "useValores deve ser usado dentro de ValoresProvider"
        );
    }

    return context;
}