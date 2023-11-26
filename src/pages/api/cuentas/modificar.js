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

    // Obtener body
    const tmp = JSON.stringify(req.body).replace("'",'"')
    const body = JSON.parse(tmp)
    
    cuentas.forEach((element,index) => {
        if(element["id"] == body["id"]) cuentas[index] = body
    });

    // Escribir
    let filePath = 'src/json/cuentas.json'
    let ruta = path.join( process.cwd() , filePath )
    await fsPromises.writeFile(ruta, JSON.stringify(cuentas, null, '\t'))
    res.status(200).json(cuentas)

    
}