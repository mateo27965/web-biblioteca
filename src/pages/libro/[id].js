import Link from "next/link"
import Head from 'next/head'
import Image from 'next/image'
import Layout from '../components/Layout.js'
import {useMiProvider} from '../context/contexto'
import {useRouter} from 'next/router'
import {useState, useEffect} from 'react'
import Script from "next/script.js"
import Modal from "../modal.js"


const detalleLibro = () => {

    // para deshabilitar el boton "recargar al reservar"
    const router = useRouter()
    const [cuenta, setCuenta] = useMiProvider()

    const [libro, setLibro] = useState([]);

    const [yaActualizado, setYaActualizado] = useState(false)

    const id = router.query.id

    console.log("RENDER con id: ", id)

    async function leer() {
        console.log("LEYENDO EL ID: ", id)
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
        setYaActualizado(true);
    }


    if(id){
        if (yaActualizado == false) {
            leer()
        }
    }else{
        console.log("noexiste id ;c")
    }




    // Eliminar
    async function handleEliminar() {
        try {
            const peticion = await fetch(
                `/api/libros/eliminar?id=${id}`,
                {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            )
            const data = await peticion.json()
            alert("libro eliminado")
            router.push('/busqueda')

        } catch (err) {
            console.log(err)
        }

    }




    const [isModal2Open, setIsModal2Open] = useState(false);
    // Modal
    const openModal2 = () => {
        setIsModal2Open(true);
    };
    const closeModal2 = () => {
        setIsModal2Open(false);
    };

    function handleChange(event) {
        const fecha = event.target.value;
        setFechaSeleccionada(fecha)
    }

    const [fechaSeleccionada, setFechaSeleccionada] = useState(obtenerFechaFutura())
    function handleChange(event) {
        const fecha = event.target.value;
        setFechaSeleccionada(fecha)
    }

    function obtenerFechaActual() {
        const hoy = new Date();
        const year = hoy.getFullYear();
        const mes = String(hoy.getMonth() + 1).padStart(2, '0');
        const dia = String(hoy.getDate()).padStart(2, '0');
        return `${year}-${mes}-${dia}`;
    }

    async function reservar(libro) {
        // Generar nuevo objeto JSON
        let obj = {
            "persona_id": cuenta.id,
            "libro_id": libro.id,
            "fecha_inicio": obtenerFechaActual(),
            "fecha_final": fechaSeleccionada
        }
        // Llamar a reservar
        const opciones = {
            method: 'POST',
            body: JSON.stringify(obj),
            headers: {
                "Content-Type": "application/json"
            }
        }

        const request = await fetch('/api/reservas/reservar', opciones)
        let data = await request.json()
        console.log(data)


        // Volver a realizar consulta de libros y disponibilidad
        setYaActualizado(false)

    }

     /*
    async function escribir_reserva() {
        let data = await leer_reserva1()
        
        // Generar nuevo objeto JSON
        let obj = { 
            "cuenta" : cuenta,
            "libro" : p,
            "fecha_inicio" : obtenerFechaActual(),
            "fecha_final" : fechaSeleccionada
        }

        // Agregar al arreglo JSON
        data.push( obj)

        console.log( JSON.stringify(data))
        // Llamar a escribir
        const opciones = {
            method : 'POST',
            body : JSON.stringify( data ),
            headers : {
                "Content-Type" : "application/json"
            }
        }

        const request = await fetch( '../api/reservas/escribir', opciones)
        data = await request.json()
        console.log( data)
        setRecargarDatos(true);
    }
    */

    return <Layout content={
        <>
        
            <Head>
                <title>Citas</title>
            </Head>
            <div id="cuerpo_citas">

                <div id="contendor_ListItem">
                    <div id="contenedor_cita">
                        <h1 id="citas">Citas</h1>
                    </div>
                    <Image src="/full-width.png" width={1800} height={1} alt="fullwith"></Image>
                    <div id="state-layer-tituloLibro">
                        <div id="circuloConInicial">
                            <div id="BuildingblockeCircular">
                                <p id="nombre-dl">{obtenerIniciales(libro.titulo)}</p>
                            </div>
                        </div>
                        <div id="content_libro_dl">
                            <h1 id="titulo_libro_dl" >{libro.titulo}</h1>
                            <p id="autor_libro_dl">{libro.autor}</p>
                        </div>
                    </div>
                    <div id="cont_libr_dl" class="">
                        <Image src={libro.imagen} width={184} height={151} alt="imagenLib"  id="imglibro" class="w-120 h-40"></Image>
                    </div>
                    <div id="contenedor_texto-dl">
                        <p id="texto-dl">{libro.descripcion}</p>
                    </div>
                    <div id="todo-edit">
                        <div id="contenedor_editorial-dl">
                            <p id="editorial-dl-text">Editorial</p>
                            <p id="editorial-name-dl">{libro.editorial}</p>
                        </div>
                    </div>

                    <div id="text-topicos">
                        <p id="topi">Tópicos</p>
                    </div>

                    <div id="todosTopicos">                        
                        {Object.entries(libro.topicos?libro.topicos.split(','):[]).map( (value,index) => {
                            return (
                            <div id="contenedor_topi1" key={index}>
                                <div class="topi-stateLayer">
                                    <p id="top1">{value[1]}</p>
                                </div>
                            </div>
                            )
                        })}                        
                    </div>

                    
                    <div id="dispo-nodispo">
                        <p id="dispoNodispo">{libro.disponible?"Disponible":cuenta.tipo=='admin'?libro.ultimo_reservante:"No Disponible"}</p>
                    </div>

                </div>
                {cuenta.tipo == 'user' && libro.disponible && (
                <form action="reservarLibroDatos" onSubmit={hacernada}>
                    <div id="total-reserva">
                        <div id="contenedor_reserva-dl">
                            <h1 id="reservar-dl">Reservar</h1>
                        </div>
                        <Image src="/full-width.png" width={1800} height={1} alt="fullwith"></Image>
                        <div id="text_field_fecha-dl">
                            <div class="text_field">
                                <div class="state_layer">
                                    <div class="content">
                                        <div id="text_usuario">
                                            <p>Ingrese una Fecha limite</p>
                                        </div>
                                        <div id="input_text_usuario">
                                            <input type='date' id="inputDate" defaultValue={obtenerFechaFutura()} min={obtenerFechaActual()} max={obtenerFechaFutura()} onChange={handleChange} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="supporting-text">
                                <p id="ddmmyyyy"> DD/MM/YYYY</p>
                            </div>
                        </div>
                        {libro.disponible==true && (
                        <div id="contenedor_breservar">
                            <button id="bReserv" onClick={()=>{reservar(libro); openModal2();}} >Reservar</button>
                        </div>
                        )}

                    </div>
                </form>
                )}


                {cuenta.tipo == 'admin' && (
                    <div>
                        <br/>
                        <button id="boton_eliminar" onClick={handleEliminar}>Eliminar</button>
                    </div>
                )}

                <Modal isOpen={isModal2Open} onClose={closeModal2} id="modal2">
                    <p>Reserva realizada</p>
                    <button class="flex transition ease-in-out delay-150 bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300" onClick={closeModal2}>Cerrar</button>
                </Modal>



            </div>
            
                    
        </>

    }
    
    ></Layout>

}

export default detalleLibro


function obtenerFechaActual() {
    const hoy = new Date();
    const year = hoy.getFullYear();
    const mes = String(hoy.getMonth() + 1).padStart(2, '0');
    const dia = String(hoy.getDate()).padStart(2, '0');
    console.log(`${year}-${mes}-${dia}`)
    return `${year}-${mes}-${dia}`;
}
function obtenerFechaFutura() {
    let treintaDias = new Date();
    treintaDias.setDate(treintaDias.getDate() + 30)
    const year = treintaDias.getFullYear();
    const mes = String(treintaDias.getMonth() + 1).padStart(2, '0');
    const dia = String(treintaDias.getDate()).padStart(2, '0');
    console.log(`${year}-${mes}-${dia}`)
    return `${year}-${mes}-${dia}`;
}

function hacernada(e){
    e.preventDefault()
}


function obtenerIniciales(titulo) {
    if(!titulo) return "";
    const palabras = titulo.split(" ");
    const iniciales = palabras
      .slice(0, 2) 
      .map((palabra) => palabra[0].toUpperCase());
    return iniciales.join("");
  }



/*
function reservardl() {
    const inputDate = document.getElementById("inputDate");
    const fechaParrafo = document.querySelector("#modalReser-dl p");
    const openModal = document.getElementById("bReserv");
    const modalReserva = document.getElementById("modalReser-dl");
    const closeModal = document.getElementById("close-dl");

    openModal.onclick = function () {
        modalReserva.style.visibility = "visible";
        const fechaSeleccionada = inputDate.value;
        fechaParrafo.textContent = `La reserva del recurso se ha realizado con éxito. Este debe ser devuelto hasta el día ${fechaSeleccionada}`;
    }

    closeModal.onclick = function () {
        modalReserva.style.visibility = "hidden";
    }
    // cerrar en ventana
    modalReserva.onclick = function () {
        modalReserva.style.visibility = "hidden";
    }

    // Aquí puedes realizar cualquier otra acción relacionada con la reserva
    
}
*/


