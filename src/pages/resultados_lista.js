import React from 'react';
import Link from "next/link"
import Head from 'next/head'
import Image from 'next/image'
import Layout from './components/Layout.js'
import { useMiProvider } from './context/contexto'
import { useEffect, useState } from "react"; // Importa useEffect y useState
import { useRouter } from "next/router";
import Modal from "./modal.js"
import { useSearchParams } from 'next/navigation';


const Resultados_lista = () => {
    

    console.log("RENDER")

    // Utilidades
    const [cuenta, setCuenta] = useMiProvider();
    const router = useRouter()

    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)

    // Parametros de la URL
    const searchParams = useSearchParams()
    let keyword = searchParams.get('keyword')
    let type = searchParams.get('type')
    let filters = searchParams.get('filters')
    // SI QUIERO OBTENER EL VALOR DESDE LA URL -> IR A busqueda.js
    //let page1 = parseInt(searchParams.get('page'))
    

    // Acutalizar tabla
    const [yaActualizado, setYaActualizado] = useState(false)
    const [resultados, setResultados] = useState([]);
    const [libroselec, setlibroselec] = useState([]);

    // Actualizar tabla cuando hayan filtros: en el 3er render
    if (keyword || type || filters) {
        console.log("existen los filtros")
        if (yaActualizado == false) {
            leer()
        }
    }
    else {  
        console.log("sin filtros")
    }

    // Leer datos de libros
    async function leer() {

        if (keyword==null && type==null && filters==null){
            console.log("query invalido: ", { keyword, type, filters })
            return
        }

        console.log("buscando: ", { keyword, type, filters })

        const opciones = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        };

        const request = await fetch(`/api/libros/busqueda?keyword=${keyword}&type=${type}&filters=${filters}&page=${page}`, opciones); //  Primera prueba de conexion con backend
        const data = await request.json();
        console.log(data);

        // Actualiza el estado con los resultados de la API
        setResultados(data.items);
        setYaActualizado(true);
        setTotalPages(data.totalPages)
    }

    // Paginacion
    function retroceder() {
        if (page > 1) {
            setPage(page - 1)
        }
    }
    function avanzar() {
        if (page < totalPages) {
            setPage(page + 1)
        }
    }
    useEffect(() => {
        leer()
    }, [page])

    // Controlar Modal
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModal2Open, setIsModal2Open] = useState(false);
    const openModal1 = () => {
        setIsModalOpen(true);
    };
    const closeModal1 = () => {
        setIsModalOpen(false);
    };
    const openModal2 = () => {
        setIsModal2Open(true);
    };
    const closeModal2 = () => {
        setIsModal2Open(false);
    };

    // Controlar fecha y reserva
    const [fechaSeleccionada, setFechaSeleccionada] = useState(obtenerFechaFutura())
    function handleChange(event) {
        const fecha = event.target.value;
        setFechaSeleccionada(fecha)
    }

    // Obtener fechas
    function obtenerFechaActual() {
        const hoy = new Date();
        const year = hoy.getFullYear();
        const mes = String(hoy.getMonth() + 1).padStart(2, '0');
        const dia = String(hoy.getDate()).padStart(2, '0');
        return `${year}-${mes}-${dia}`;
    }
    function obtenerFechaFutura() {
        let treintaDias = new Date();
        treintaDias.setDate(treintaDias.getDate() + 30)
        const year = treintaDias.getFullYear();
        const mes = String(treintaDias.getMonth() + 1).padStart(2, '0');
        const dia = String(treintaDias.getDate()).padStart(2, '0');
        return `${year}-${mes}-${dia}`;
    }

    // Enviar nueva reserva
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

        const request = await fetch('api/reservas/reservar', opciones)
        let data = await request.json()
        console.log(data)

        // Volver a realizar consulta de libros y disponibilidad
        setYaActualizado(false)

    }

    return (
        <>
            <div class="flex flex-wrap shrink-0 gap-3 bg-white p-6 rounded-md shadow-md w-12/12 h-full justify-center">
                {Object.entries(resultados).map((value, index) => {
                    const palabras = value[1]?.titulo?.split(' ') || [];
                    const tituloIniciales = palabras
                        .slice(0, 2)
                        .map(word => word[0].toUpperCase())
                        .join('');
                    return (

                        <div class="w-80 h-96 border-2 rounded-lg color_borde_primario" key={value[1].id}>
                            <div class="cursor-pointer" onClick={() => {
                                router.push('/libro/' + value[1].id)
                            }}>
                                <div class="h-18 flex justify-between items-center">
                                    <div class="w-10 h-10 inline-flex m-4 bg-purple-primary text-purple-bg justify-center items-center text-center rounded-full color_letra_blanco color_fondo_primario">{tituloIniciales}</div>
                                    <div class="w-60 h-18 line-clamp-3 text-purple-primary text-left items-center align-middle color_letra_primario">{value[1].titulo}</div>
                                </div>
                                <div class="flex bg-purple-bg mx-auto justify-center items-center color_fondo_secundario">
                                    <Image src={value[1].imagen} height={10000} width={10000} alt="libro_imagen" class="h-36 w-auto" ></Image>
                                </div>
                                <div class="py-2 px-4 text-purple-primary color_letra_primario">
                                    <div class="font-bold">ISBN: {value[1].isbn}</div>
                                    <div>Autor: {value[1].autor}</div>
                                    <div>Editorial: {value[1].editorial}</div>
                                </div>
                            </div>
                            {cuenta.tipo != 'guest' && (
                                <div class="h-16 flex justify-center items-center">
                                    {cuenta.tipo == 'admin' && (
                                        <button type="button"
                                            class="bg-purple-primary text-purple-bg border px-4 py-2 hover:bg-blue-600 rounded-full color_fondo_primario color_letra_blanco"
                                            onClick={() => {
                                                router.push('/modificar/' + value[1].id)
                                            }}
                                        >Modificar</button>
                                    )}
                                    {cuenta.tipo == 'user' && (
                                        value[1].disponible && (
                                            <button type="button" disabled={!value[1].disponible}
                                                class="bg-purple-primary text-purple-bg border px-4 py-2 hover:bg-blue-600 rounded-full color_fondo_primario color_letra_blanco"
                                                onClick={() => {
                                                    setlibroselec(value[1])
                                                    openModal1()
                                                }}
                                            >Reservar</button>
                                        )
                                        ||
                                        !value[1].disponible && (
                                            <h1>No disponible</h1>
                                        )
                                    )}
                                </div>
                            )}

                        </div>
                    )
                }
                )}
                


                <Modal isOpen={isModalOpen} onClose={closeModal1} id="modal">
                    <p>Ingrese la Fecha de devolucion:</p>
                    <br></br>
                    <input type='date' id="inputDate" defaultValue={obtenerFechaFutura()} min={obtenerFechaActual()} max={obtenerFechaFutura()} onChange={handleChange} />
                    <br></br>
                    <button class="flex transition ease-in-out delay-150 bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300" onClick={() => { reservar(libroselec); closeModal1(); openModal2() }}>Confirmar</button>
                    <button class="flex transition ease-in-out delay-150 bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300" onClick={closeModal1}>Cerrar</button>
                </Modal>
                <Modal isOpen={isModal2Open} onClose={closeModal2} id="modal2">
                    <p>Reserva realizada</p>
                    <button class="flex transition ease-in-out delay-150 bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300" onClick={closeModal2}>Cerrar</button>
                </Modal>

            </div>
            <div id="cont-result" >
                    <div id="cont2-masrecientes">
                        <button onClick={retroceder} disabled={page === 1} id="retro" class="text-white border border-white rounded-md px-4 py-2 text-base cursor-pointer transition duration-300 ease-in-out hover:bg-white hover:text-black">Anterior</button>
                        <button onClick={avanzar} disabled={page === totalPages} id="avanzar">Siguiente</button>
                    </div>
                    <div id="cont-resultados">
                        <p id="total1">Página {page} de {totalPages}</p>
                    </div>

                </div>
        </>
    );
};



export default Resultados_lista;

