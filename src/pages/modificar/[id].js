import Link from "next/link"
import Head from 'next/head'
import Image from 'next/image'
import Layout from '../components/Layout'
import {useMiProvider} from '../context/contexto.js'
import {useState, useEffect} from 'react'
import {useRouter} from 'next/router'
import { useSearchParams } from 'next/navigation';

const ModificarLibro = () => {

    const router = useRouter()
    const [cuenta, setCuenta] = useMiProvider()
    // para traer el id del URL
    const id = router.query.id
    const [libro, setLibro] = useState([]);
    console.log("id: ", id)

    async function leer() {
        if(id == null){
            console.log("query invalido")
            return
        }
        const opciones = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        };
            const request = await fetch(`/api/libros/leer?id=${id}`, opciones);
            const data = await request.json();
            console.log(data);
            setLibro(data);
    }

    useEffect(() => {
        leer();
    }, []); // en caso quiera ver el libro aun cuando refresco la pagina poner [id]


    let libroModificado = {...libro}
    
    function registrarCambio(e){
        libroModificado[e.target.name] = e.target.value
    }

    // CAMBIAR ESTO DE ESCRIBIR JSON para que escriba en la base de datos
    const escribirEnBD = async () => {
        try {
            const peticion = await fetch(`/api/libros/modificar?id=${id}`, {
                method: 'PUT',  // o 'POST' dependiendo de tu API
                body: JSON.stringify(libroModificado),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            alert("Se actualizó los datos correctamente.")
            
        } catch (err) {
            console.error(err);
            alert("Error al modificar el libro");
        }
    };
    

    return (<Layout content={
        <>
            <Head>
                <title>Perfil</title>
            </Head>
            <div id="tituloP2">
                <p>Hola, {cuenta.nombres}</p>
                <Image src="/divider.png" width={1088} height={1} alt="imagen de libro"></Image>
            </div>
            <div id="form_perfil2">
                <div id="barra_perfil">
                    <div id="barra_texto_notselected" class="selected2">
                        <p id="txt_insertar">MODIFICAR LIBRO</p>
                    </div>
                </div>

                <div class="grid grid-cols-2 gap-4">
                    <div class="col-span-1">
                        <div id="imagen_perfil2">
                            <Image src="/Rectangle 5.png" width={279} height={253} alt="rectangulo"></Image>
                        </div>
                    </div>
                    <form action="registrarLibro" onSubmit={(e)=>{e.preventDefault()}}>
                        <div class="col-span-1">
                            <div id="cuadro_texto_idioma">
                                <div class="borde_text_field">
                                    <div class="state_layer">
                                        <div class="content_perfil">
                                            <div id="text_perfil">
                                                <p>TÍTULO</p>
                                            </div>
                                            <div id="input_text_idioma">
                                                <input type='text' id="inputTituloLibro" name="titulo" onChange={registrarCambio} defaultValue={libroModificado.titulo}/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="supporting-text">
                                    <p></p>
                                </div>
                            </div>

                            <div id="cuadro_texto_prefijo">
                                <div class="borde_text_field">
                                    <div class="state_layer">
                                        <div class="content_perfil">
                                            <div id="text_perfil">
                                                <p>Autor,autores</p>
                                            </div>
                                            <div id="input_text_prefijo">
                                                <input type='text' id="inputAutorLibro" name="autor" onChange={registrarCambio} defaultValue={libroModificado.autor}/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="supporting-text">
                                    <p></p>
                                </div>
                            </div>

                            <div id="cuadro_texto_color">
                                <div class="borde_text_field">
                                    <div class="state_layer">
                                        <div class="content_perfil">
                                            <div id="text_perfil">
                                                <p>ISBN</p>
                                            </div>
                                            <div id="input_text_color">
                                                <input type='text' id="inputisbn" name="isbn" onChange={registrarCambio} defaultValue={libroModificado.isbn}/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="supporting-text">
                                    <p></p>
                                </div>
                            </div>
                            <div id="cuadro_texto_color">
                                <div class="borde_text_field">
                                    <div class="state_layer">
                                        <div class="content_perfil">
                                            <div id="text_perfil">
                                                <p>Serie, tipo</p>
                                            </div>
                                            <div id="input_text_color">
                                                <input type='text' id="inputSerie" name="genero" onChange={registrarCambio} defaultValue={libroModificado.tipo}/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="supporting-text">
                                    <p></p>
                                </div>
                            </div>
                            <div id="cuadro_texto_color">
                                <div class="borde_text_field">
                                    <div class="state_layer">
                                        <div class="content_perfil">
                                            <div id="text_perfil">
                                                <p>Descripcion</p>
                                            </div>
                                            <div id="input_text_color">
                                                <input type='text' id="inputDescripcion" name="descripcion" onChange={registrarCambio} defaultValue={libroModificado.descripcion}/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="supporting-text">
                                    <p></p>
                                </div>
                            </div>

                            <div id="cuadro_texto_color">
                                <div class="borde_text_field">
                                    <div class="state_layer">
                                        <div class="content_perfil">
                                            <div id="text_perfil">
                                                <p>Editorial</p>
                                            </div>
                                            <div id="input_text_color">
                                                <input type='text' id="inputtopico" name="editorial" onChange={registrarCambio} defaultValue={libroModificado.editorial}/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="supporting-text">
                                    <p></p>
                                </div>
                            </div>


                            <button id="GuardarLibro" class="guardar" onClick={escribirEnBD}>Guardar</button>

                        </div>
                        {/* Aquí termina la columna*/}
                    </form>
                </div>
                
            </div>

        </>
    }
    ></Layout>
    )
}
export default ModificarLibro
