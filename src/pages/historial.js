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


const Historial = () => {
    
    // Utilidades
    const [cuenta, setCuenta] = useMiProvider();
    const router = useRouter()

    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [resultados, setResultados] = useState([]);

    async function leer() {

        const opciones = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        };

        const request = await fetch(`/api/reservas/persona?id=${cuenta.id}&page=${page}`, opciones); //  Primera prueba de conexion con backend
        const data = await request.json();
        
        // Actualiza el estado con los resultados de la API
        setResultados(data.items);
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
    

    
    return (
        <Layout content={
        <>
            <Head>
                <title>Historial</title>
            </Head>

            <div class="flex justify-between">
                <h1 class="text-2xl font-semibold mb-4">Historial</h1>
            </div>

            <Image src="/divider.png" width={1088} height={1} class="py-4" alt="imagenDefault"></Image>
            

            <div class="flex flex-wrap shrink-0 gap-3 bg-white p-6 rounded-md shadow-md w-12/12 h-full justify-center">
                {Object.entries(resultados).map((value, index) => {
                    const palabras = value[1]?.reservado.titulo?.split(' ') || [];
                    const tituloIniciales = palabras
                        .slice(0, 2)
                        .map(word => word[0].toUpperCase())
                        .join('');
                    return (

                        <div class="w-80 h-96 border-2 rounded-lg color_borde_primario" key={value[1].id}>
                            <div class="cursor-pointer" onClick={() => {
                                router.push('/libro/' + value[1].reservado.id)
                            }}>
                                <div class="h-18 flex justify-between items-center">
                                    <div class="w-10 h-10 inline-flex m-4 bg-purple-primary text-purple-bg justify-center items-center text-center rounded-full color_letra_blanco color_fondo_primario">{tituloIniciales}</div>
                                    <div class="w-60 h-18 line-clamp-3 text-purple-primary text-left items-center align-middle color_letra_primario">{value[1].reservado.titulo}</div>
                                </div>
                                <div class="flex bg-purple-bg mx-auto justify-center items-center color_fondo_secundario">
                                    <Image src={value[1].reservado.imagen} height={10000} width={10000} alt="libro_imagen" class="h-36 w-auto" ></Image>
                                </div>
                                <div class="py-2 px-4 text-purple-primary color_letra_primario">
                                    <div class="font-bold">ISBN: {value[1].reservado.isbn}</div>
                                    <div>Autor: {value[1].reservado.autor}</div>
                                    <div>Editorial: {value[1].reservado.editorial}</div>
                                    <div>Fecha de reserva: {new Date(value[1].fecha_inicio).toISOString().split('T')[0]}</div>
                                    <div>Fecha limite: {new Date(value[1].fecha_final).toISOString().split('T')[0]}</div>
                                </div>

                            </div>
                            

                        </div>
                    )
                }
                )}
                

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
        }
        ></Layout>
    )
};



export default Historial;

