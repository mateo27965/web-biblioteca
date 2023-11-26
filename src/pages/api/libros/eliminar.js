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

    // Formar body
    const tmp = JSON.stringify(req.body).replace("'",'"')
    const body = JSON.parse(tmp)

    var BreakException = {};
    let idx = 0
    try{
        libros.forEach(item=>{
            if( parseInt(item["id"]) == parseInt(body["id"]) ) throw BreakException
            idx++
        })
    }catch(e){
        if (e !== BreakException) throw e;
    }

    libros.splice(idx,1)
    
    // Escribir json
    let filePath = 'src/json/libros.json'
    let ruta = path.join( process.cwd() , filePath )
    await fsPromises.writeFile(ruta , JSON.stringify(libros, null, '\t'))
    res.status(200).json(libros)
    
    // Eliminar todas las reservas con ese libro
    // TODO
}