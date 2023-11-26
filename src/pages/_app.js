import '../styles/style_layout.css'
import '../styles/style_login.css'
import '../styles/style_perfiles.css'
import '../styles/style_registroUsuario.css'
import '../styles/style_page.css'
import '../styles/globals.css'
import '../styles/style_detalleLibro.css'
import '../styles/modal.css'
import '../styles/style_agregarLibroadm.css'
import '../styles/style_colores_adicionales.css'
import '../styles/index.css'


import { AppProps } from 'next/app'
import { MiProvider } from './context/contexto'

export default function MyApp( {Component, pageProps}) {
    return (
        <MiProvider>
            <Component { ...pageProps} />
        </MiProvider>
    )
}

// Generador de datos de libros: https://www.mockaroo.com/schemas/clone?clone=1696350881709