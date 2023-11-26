import Head from 'next/head'
import Link from 'next/link'
import {useRouter} from 'next/router'
import {useState, useEffect} from 'react'
import { useMiProvider } from './context/contexto'

const login = () => {
    const router = useRouter()
    const [cuenta, setCuenta] = useMiProvider()

    // Credenciales para logearse correctamente
    const [credenciales, setCredenciales] = useMiProvider(
        {
            "correo" : "",
            "contrasenha" : ""
        }
    )
    function registrarCambio(e){
        setCredenciales({...credenciales, [e.target.name]:e.target.value})
    }

    async function handleLogin() {
        // Query buscando correo y contrasenha
        let params = JSON.stringify(credenciales)
        const opciones = {
            method: "POST",
            body : params,
            headers: {
                "Content-Type": "application/json",
            },
        };
        const request = await fetch("/api/personas/validar", opciones);
        const data = await request.json();

        // Eatablece el estado segun la cuenta ingresada 
        if(!data) {
            alert("Datos incorrectos")
            return;
        }

        if(data.tipo == "admin"){
            console.log("administrador")
            document.querySelector(':root').style.setProperty('--color-primario', data.color)
            document.querySelector(':root').style.setProperty('--color-secundario', newShade(data.color, 100))
        }
        else if(data.tipo == "user"){
            console.log("usuario")
        }

        setCuenta(data);
        router.push('/')
    }

    return(
    <>
        <Head>
            <title>Login</title>
        </Head>
        <div id="cuerpo_login">
            <div id="titulo_login1">
                <div id="titulo_login">
                    <p><b>Sistema de reserva de libros</b></p>
                </div>
            </div>

            <form action="" onSubmit={(e)=>e.preventDefault()} method='get'>
            <div id="text_field_usuario">
                <div class="text_field">
                    <div class="state_layer">
                        <div class="content">
                            <div id="text_usuario">
                                <p>Usuario o Correo</p>
                            </div>
                            <div id="input_text_usuario">
                                <input type='text' placeholder='Ingrese usuario o correo' id="inputUsu" name="correo" onChange={registrarCambio}/>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="supporting-text">
                    <p></p>
                </div> 
            </div>
            <div id="text_field_password">
                <div class="text_field">
                    <div class="state_layer">
                        <div class="content">
                            <div id="text_contraseña">
                                <p>Contraseña</p>
                            </div>
                            <div id="input_text_contraseña">
                                <input type='password' placeholder='Ingrese contraseña' id="inputContr" name="contrasenha" onChange={registrarCambio}/>
                            </div>

                        </div>
                    </div>
                </div>
                
            </div>

            <div id="contenedorContra">
                <div id="OlvideContra">
                    <p class="olvC">Olvidé mi contraseña</p>
                </div>
            </div>


            <div id="alinearBotones">
            
            
            <div id="buttonRegis">
                <div id="slayer-regis">
                    <Link href="/registroUsuario" class="regis">Registro usuario</Link>
                </div>
            </div>
            <button id="bIngre" onClick={handleLogin}>Ingresar</button>
            </div>
            </form>
            

        </div>
    </>
)}


export default login

const newShade = (hexColor, magnitude) => {
    hexColor = hexColor.replace(`#`, ``);
    if (hexColor.length === 6) {
        const decimalColor = parseInt(hexColor, 16);
        let r = (decimalColor >> 16) + magnitude;
        r > 255 && (r = 255);
        r < 0 && (r = 0);
        let g = (decimalColor & 0x0000ff) + magnitude;
        g > 255 && (g = 255);
        g < 0 && (g = 0);
        let b = ((decimalColor >> 8) & 0x00ff) + magnitude;
        b > 255 && (b = 255);
        b < 0 && (b = 0);
        return `#${(g | (b << 8) | (r << 16)).toString(16)}`;
    } else {
        return hexColor;
    }
};