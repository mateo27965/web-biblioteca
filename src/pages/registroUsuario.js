import Head from 'next/head'
import Link from 'next/link'
import {useState, useEffect} from 'react'
import {useRouter} from 'next/router'

const registroUsuario = () => {

    /*
    // ANTIGUO Leer cuentas
    
    const [cuentas, setCuentas] = useState([]);
    async function leer() {
        const opciones = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        };
        const request = await fetch("/api/cuentas/leer", opciones);
        const data = await request.json();
        console.log(data);
        setCuentas(data);
    }
    useEffect(() => {
        leer();
    }, []);
    */

    const router = useRouter()

    // Valores por defecto de un nuevo usuario
    const [nuevo, setNuevo] = useState({
        "tipo": "user",
        "nombres": "",
        "apellidos": "",
        "tipo_documento" : "",
        "nro_documento" : "",
        "correo" : "",
        "contrasenha" : "",
        "foto" : "/boton_perfil.png"
    })

    function registrarCambio(e){
        setNuevo({...nuevo, [e.target.name]:e.target.value})
    }
    
    const escribirJSON = async () =>{

        if(document.getElementById("password").value != document.getElementById("nuevaPass").value){
            alert("Las contraseñas no coinciden")
            return
        }
        
        const params = JSON.stringify(nuevo)
        try {
            const peticion = await fetch (
                '/api/personas/registrar',
                {
                    method : 'POST',
                    body : params,
                    headers : {
                        'Content-Type' : 'application/json'
                    }
                }
            )

            const data = await peticion.json()
            router.push('/login')

        } catch (err) {
            console.log(err)
        }
  
    }

    return(
    <>
        <Head>
            <title>Registro usuario</title>
        </Head>
        <div id="cuerpo_registro">
            <div id="titulo_registro1">
                <div id="titulo_registro">
                    <p><b>Sistema de reserva de libros</b></p>
                </div>
            </div>
            <div id="subtitulo_registro1">
                <div id="subtitulo_registro">
                    <p><b>Registro de usuario</b></p>
                </div>
            </div>

            <form action=""  onSubmit={(e)=>e.preventDefault()} method='get' id="formulario_registro">

                <div id="todo_datPers">
                    <div id="text_datosPersonales">
                        <p>Datos Personales</p>
                    </div>
                    <div id="text_field_usuario">
                        <div class="text_field">
                            <div class="state_layer">
                                <div class="content">
                                    <div id="text_usuario">
                                        <p>Nombres</p>
                                    </div>
                                    <div id="input_text_usuario">
                                        <input type='text'  id="nombres" name="nombres" onChange={registrarCambio}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="supporting-text">
                            <p></p>
                        </div> 
                    </div>
                    <div id="text_field_usuario">
                        <div class="text_field">
                            <div class="state_layer">
                                <div class="content">
                                    <div id="text_usuario">
                                        <p>Apellidos</p>
                                    </div>
                                    <div id="input_text_usuario">
                                        <input type='text'  id="apellidos" name="apellidos" onChange={registrarCambio}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="supporting-text">
                            <p></p>
                        </div> 
                    </div>
                    <div id="text_field_usuario">
                        <div class="text_field">
                            <div class="state_layer">
                                <div class="content">
                                    <div id="text_usuario">
                                        <p>Tipo de Documento</p>
                                    </div>
                                    <div id="input_text_usuario">
                                        <input type='text'  id="tipoDoc" name="tipo_documento" onChange={registrarCambio}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="supporting-text">
                            <p></p>
                        </div> 
                    </div>

                    <div id="text_field_usuario">
                        <div class="text_field">
                            <div class="state_layer">
                                <div class="content">
                                    <div id="text_usuario">
                                        <p>Nro Documento</p>
                                    </div>
                                    <div id="input_text_usuario">
                                        <input type='text'  id="nroDoc" name="nro_documento" onChange={registrarCambio}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="supporting-text">
                            <p></p>
                        </div> 
                    </div>
                </div>
                <div id="todo_datCuenta">
                    <div id="text_datosCuenta">
                        <p>Datos de la cuenta</p>
                    </div>
                    
                    <div id="text_field_usuario">
                        <div class="text_field">
                            <div class="state_layer">
                                <div class="content">
                                    <div id="text_usuario">
                                        <p>Correo Electrónico</p>
                                    </div>
                                    <div id="input_text_usuario">
                                        <input type='email'  id="email" name="correo" onChange={registrarCambio}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="supporting-text">
                            <p></p>
                        </div> 
                    </div>

                    <div id="text_field_usuario">
                        <div class="text_field">
                            <div class="state_layer">
                                <div class="content">
                                    <div id="text_usuario">
                                        <p>Password</p>
                                    </div>
                                    <div id="input_text_usuario">
                                        <input type='password'  id="password" name="contrasenha" onChange={registrarCambio}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="supporting-text">
                            <p></p>
                        </div> 
                    </div>

                    <div id="text_field_usuario">
                        <div class="text_field">
                            <div class="state_layer">
                                <div class="content">
                                    <div id="text_usuario">
                                        <p>Ingrese Password nuevamente</p>
                                    </div>
                                    <div id="input_text_usuario">
                                        <input type='password'  id="nuevaPass"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="supporting-text">
                            <p></p>
                        </div> 
                    </div>
                    
                    <div id="alinearBoton">
                        <button id="bReg" onClick={escribirJSON}>Registrar</button>
                    </div>
                </div>
            </form>
            

        </div>
    </>
)}

export default registroUsuario

