/*
Esta API lee el archivo pero retorna una pagina de datos
La invocacion deber ser:
http://localhost:3000/api/archivos3/leeArchivo?page=xxxxx
*/

import fsPromises from 'fs/promises'
import path from 'path'
import process from 'process'

export default async function leer(req, res) {
    let page = parseInt(req.query.page) // de mi req llamos a despues del "?"
    let pageSize = 2

    // Necesito saber desde donde inicia la pagina y donde 
    let start= (page -1)* pageSize // algoritmo para saber el punto de inicio
    let end = start + pageSize

    let filePath = 'src/json/masPedidos.json'
    let ruta = path.join( process.cwd() , filePath )

    // lectura
    try {
        let data = await fsPromises.readFile( ruta )
        console.log(data)
        /* Buscar la pagina solicitada */
        const totalItems = JSON.parse(data).length
        // Cuantas paginas hay
        const totalPages1 = Math.ceil(totalItems / pageSize) // cantidad de paginas que existen
        //obtener la pagina de datos
        let item = JSON.parse(data)
        let itemsAPaginar = item.slice(start,end)
        // Convertir a JSON
        itemsAPaginar = JSON.stringify(itemsAPaginar)

        return res.status(200).json( {
            page,
            totalPages1,
            pageSize,
            totalItems,
            items: JSON.parse(itemsAPaginar)
            }
        )

    } catch( error) {
        console.log("Ocurrio un error al leer ")
    }

}