import { createContext, useContext, useState } from 'react'

const Context = createContext()

export function MiProvider(  {children}  ){

    // Valores iniciales de una cuenta de invitado
    const [cuenta, setCuenta] = useState({
        "id": "-1",
        "tipo": "guest",
        "nombres": "invitado",
        "apellidos": "",
        "tipo_documento" : "",
        "nro_documento" : "",
        "correo" : "",
        "contrasenha" : "",
        "foto" : "/boton_perfil.png"
    }) 

    return (
        <Context.Provider value={[cuenta, setCuenta]}>
            {children}
        </Context.Provider>
    )
}

export function useMiProvider(){
    return useContext(Context)
}