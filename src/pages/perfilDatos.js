import Link from "next/link"
import Head from 'next/head'
import Image from 'next/image'
import Layout from './components/Layout.js'
import { useMiProvider } from './context/contexto'

const Perfil = () => {

    const [cuenta, setCuenta] = useMiProvider()

    let cuenta_modificada = {...cuenta}

    function registrarCambio(e){
        cuenta_modificada[e.target.name] = e.target.value
    }
    
    const escribirEnBD = async () => {
        try {
            const peticion = await fetch(`/api/personas/modificar?id=${cuenta.id}`, {
                method: 'PUT',  // o 'POST' dependiendo de tu API
                body: JSON.stringify(cuenta_modificada),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            setCuenta(cuenta_modificada)
            alert("Datos actualizados correctamente.")
            
        } catch (err) {
            console.error(err);
            alert("Error al modificar la persona.");
        }
    };

    return (



<Layout content={
<>
    <Head>
        <title>Perfil</title>
    </Head>
    <div id="tituloP">
            <p>Hola, {cuenta.nombres}</p>
            <Image src="/divider.png" width={1088} height={1} alt="divider"></Image>
    </div>
    <div id="form_perfil">
        <div id="barra_perfil">
            <div id="barra_texto_selected" className="selected">
                <Link href="/perfilDatos">DATOS PERSONALES</Link>
            </div>
            <div id="barra_texto_notselected">
                <Link href="/perfilCuenta">CUENTA</Link>
            </div>
            <div id="barra_texto_notselected">
                <Link href="/perfilPref">PREFERENCIAS</Link>
            </div>
        </div>
        
        <div class="grid grid-cols-2 gap-4">
            <div class="col-span-1">
                <div id="imagen_perfil">
                    <Image src={cuenta.foto} class="foto_perfil"  width={279} height={253} alt="foto"></Image>
                </div>
            </div>
            <div class="col-span-1">
            <div id="cuadro_texto_nombre">
                <div class="borde_text_field">
                    <div class="state_layer">
                        <div class="content_perfil">
                            <div id="text_perfil">
                                <p>Nombres</p>
                            </div>
                            <div id="input_text_nombre">
                                <input type='text' placeholder='Ingrese nombre' id="inputNombre" name="nombres" defaultValue={cuenta.nombres} onBlur={registrarCambio}/>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="supporting-text">
                    <p></p>
                </div> 
            </div>
            
            <div id="cuadro_texto_tipo">
                <div class="borde_text_field">
                    <div class="state_layer">
                        <div class="content_perfil">
                            <div id="text_perfil">
                                <p>Tipo de Documento</p>
                            </div>
                            <div id="input_text_tipo">
                                <input type='text' placeholder='Ingrese documento' id="inputTipo" name="tipo_documento" defaultValue={cuenta.tipo_documento} onBlur={registrarCambio}/>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="supporting-text">
                    <p></p>
                </div> 
            </div>


            <div id="cuadro_texto_ape">
                <div class="borde_text_field">
                    <div class="state_layer">
                        <div class="content_perfil">
                            <div id="text_perfil">
                                <p>Apellidos</p>
                            </div>
                            <div id="input_text_ape">
                                <input type='text' placeholder='Ingrese apellidos' id="inputApe" name="apeliidos" defaultValue={cuenta.apellidos} onBlur={registrarCambio} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="supporting-text">
                        <p></p>
                    </div>
                </div>

                        <div id="cuadro_texto_nro">
                            <div class="borde_text_field">
                                <div class="state_layer">
                                    <div class="content_perfil">
                                        <div id="text_perfil">
                                            <p>Nro de documento</p>
                                        </div>
                                        <div id="input_text_nro">
                                            <input type='text' placeholder='Ingrese número' id="inputNro" name="nro_documento" defaultValue={cuenta.nro_documento} onBlur={registrarCambio}/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="supporting-text">
                                <p></p>
                            </div>
                        </div>

                        <button type="button" class="guardar" onClick={escribirEnBD}>Guardar</button>

                    </div>
                    {/* Aquí termina la columna*/}

                </div>
            </div>   

</>
}
></Layout>
    )
}
export default Perfil