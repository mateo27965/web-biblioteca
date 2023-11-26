import fsPromises from 'fs/promises'
import path from 'path'
import process from 'process'

export default async function leerBusqueda (req, res) {
    let filePath = 'src/json/busqueda.json'
    let ruta = path.join(process.cwd(), filePath)

    try{
        let tmp = JSON.stringify(req.body)
        console.log(tmp)
        await fsPromises.writeFile(ruta,tmp)
        return res.status(200).json({"rpta":"Todo correcto"})
    } catch(error){
        console.log("Ocurrio un error al escribir",{error})
    }
}