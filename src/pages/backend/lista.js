import { useEffect, useState  } from 'react'


const MiLista = ( flagCambio ) => {
    const [datos, setDatos] = useState( [] )


    /* Esta funcion es de la clase anterior del dia MArtes */
    async function leer() {
        const opciones = {
            method : 'GET',
            headers : {
                "Content-Type" : "application/json"
            }
        }
        const request = await fetch( '/api/prueba/libros', opciones)
        let data = await request.json()
        console.log( data)
    
        /* MAnejar el estado */
        setDatos(data)
    }


    /* Usar efectos*/
    useEffect( () => {
        leer()
    } , [flagCambio]  )


    /* Esta es la parte que se renderiza*/
    return(
            <>
                <ul>
                    {
                        datos.map(  (dato,idx) => (
                            <li key={idx}>
                                {JSON.stringify(dato)}
                            </li>
                        ))
                    }
                </ul>         
            </>
    )
}


export default MiLista
