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
    const request = await fetch( process.env.URL + '/api/cuentas/leer', opciones)
    let cuentas = await request.json()

    // Agregar al json
    const tmp = JSON.stringify(req.body).replace("'",'"')
    const body = JSON.parse(tmp)

    let idx = 0
    cuentas.forEach((item)=>{
        if(parseInt(item["id"]) > idx) idx = parseInt(item["id"])
    })
    idx = idx + 1

    body["id"] = idx.toString()
    cuentas.push(body)

    // Escribir json
    let filePath = 'src/json/cuentas.json'
    let ruta = path.join( process.cwd() , filePath )
    await fsPromises.writeFile(ruta, JSON.stringify(cuentas, null, '\t'))
    res.status(200).json(cuentas)

}