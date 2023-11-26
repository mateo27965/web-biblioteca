import Link from "next/link"
import Head from 'next/head'
import Image from 'next/image'
import Layout from './components/Layout.js'
import {useMiProvider} from './context/contexto'
import { useEffect, useState } from "react"; // Importa useEffect y useState
import { useRouter } from "next/router";
import Modal from "./modal.js"
import { useSearchParams } from 'next/navigation';
import Resultados_lista from "./resultados_lista.js"


const Resultados = (parametros) => {
    const [cuenta, setCuenta] = useMiProvider();
    const router = useRouter();

    return (
        <Layout content={
        <>
            <Head>
                <title>Busqueda</title>
            </Head>

            <div class="flex justify-between">
                <h1 class="text-2xl font-semibold mb-4">Búsqueda</h1>
                <button type="button" class="bg-purple-primary text-purple-bg px-4 py-2 hover:bg-blue-600 border rounded-full color_fondo_primario color_letra_blanco"
                onClick={()=>{router.push('/busqueda')}}>Volver a buscar</button>
            </div>

            <Image src="/divider.png" width={1088} height={1} class="py-4" alt="imagenDefault"></Image>

            <div class="flex justify-between">
                <h1 class="text-1xl font-semibold mb-4">Resultados de la busqueda</h1>
                {cuenta.tipo == 'user' && (
                    <button type="button" class="bg-purple-bg text-purple-primary px-4 py-2 hover:bg-blue-600 border rounded-full color_letra_primario color_fondo_secundario"
                    onClick={()=>{router.push('/historial')}}>Ver mis reservas</button>
                )}
            </div>
            

            <Resultados_lista></Resultados_lista>


        </>
        }
        ></Layout>
    )
}

export default Resultados
