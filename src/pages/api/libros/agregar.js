import fsPromises from 'fs/promises'
import path from 'path'
import process from 'process'

export default async function registoAPI (req, res) {

    // Leer json
    const opciones = {
        method : 'GET',
        headers : {
            "Content-Type" : "application/json"
        }
    }
    const request = await fetch( process.env.URL + '/api/libros/leer', opciones)
    let libros = await request.json()
    console.log(libros)

    // Agregar al json
    const tmp = JSON.stringify(req.body).replace("'",'"')
    const body = JSON.parse(tmp)

    let idx = 0
    libros.forEach((item)=>{
        if(parseInt(item["id"]) > idx) idx = parseInt(item["id"])
    })
    idx = idx + 1

    body["id"] = idx.toString()
    libros.push(body)

    // Escribir el json
    let filePath = 'src/json/libros.json'
    let ruta = path.join( process.cwd() , filePath )
    await fsPromises.writeFile(ruta, JSON.stringify(libros, null, '\t'))
    res.status(200).json(libros)
    
}