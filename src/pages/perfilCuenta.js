import Link from "next/link"
import Head from 'next/head'
import Image from 'next/image'
import Layout from './components/Layout.js'
import { useMiProvider } from './context/contexto'
import { useState } from 'react'

const Perfil = () => {

    const [cuenta, setCuenta] = useMiProvider()

    let cuenta_modificada = { ...cuenta }

    function registrarCambio(e) {
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

    function handleImagenSeleccionada(e) {
        const nuevaImagen = e.target.files[0];
      
        if (nuevaImagen) {
          const reader = new FileReader();
          reader.onload = function (event) {
            const nuevaURLImagen = event.target.result;
            cuenta_modificada.foto = nuevaURLImagen;
          };
          reader.readAsDataURL(nuevaImagen);
        }
      }
    function handleGuardar() {
        // Realiza cualquier validación o procesamiento adicional aquí si es necesario
      
        escribirEnBD(); // Llama a tu función para enviar los datos al servidor
    }

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
                    <div id="barra_texto_notselected">
                        <Link href="/perfilDatos">DATOS PERSONALES</Link>
                    </div>
                    <div id="barra_texto_selected" className="selected">
                        <Link href="/perfilCuenta">CUENTA</Link>
                    </div>
                    <div id="barra_texto_notselected">
                        <Link href="/perfilPref">PREFERENCIAS</Link>
                    </div>
                </div>
                
                <div class="grid grid-cols-2 gap-4">
                    <div class="col-span-1">
                        <div id="imagen_perfil">
                            <form encType="multipart/form-data" >
                                    <Image src={cuenta.foto} class="foto_perfil" width={279} height={253} alt="foto" onChange={registrarCambio}/>
                                <input
                                    type="file"
                                    class="text_foto"
                                    id="myfile"
                                    name="myfile"
                                    accept="image/*"
                                    onChange={handleImagenSeleccionada}
                                />
                                <button type="button" className="guardar_foto" onClick={handleGuardar}>Guardar</button>
                            </form>
                        </div>
                    </div>
                    <form class="col-span-1" onSubmit={(e)=>e.preventDefault()}>
                    <div id="cuadro_texto_correo">
                        <div class="borde_text_field">
                            <div class="state_layer">
                                <div class="content_perfil">
                                    <div id="text_perfil">
                                        <p>Correo</p>
                                    </div>
                                    <div id="input_text_correo">
                                        <input type='email' placeholder='Ingrese correo' id="inputCorreo" name="correo" defaultValue={cuenta.correo} onBlur={registrarCambio}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="supporting-text">
                            <p></p>
                        </div> 
                    </div>
                    
                    <div id="cuadro_texto_contra">
                        <div class="borde_text_field">
                            <div class="state_layer">
                                <div class="content_perfil">
                                    <div id="text_perfil">
                                        <p>Contraseña</p>
                                    </div>
                                    <div id="input_text_contra">
                                        <input type='password' placeholder='Ingrese contraseña' id="inputContra" name="contrasenha" defaultValue={cuenta.contrasenha} onBlur={registrarCambio}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="supporting-text">
                            <p></p>
                        </div> 
                    </div>

                    <button type="button" class="guardar" onClick={escribirEnBD}>Guardar</button>

                    </form>
                    {/* Aquí termina la columna*/}
                
                </div>
            </div>

        </>
        }
        ></Layout>
    )
}
export default Perfil