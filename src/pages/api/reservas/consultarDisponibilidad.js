import fsPromises from 'fs/promises'
import path from 'path'
import process from 'process'
import Leer from '../reservas/leer'

export default async function consultarDisponibilidad (req, res) {

    // Leer el json reservas
    const opciones = {method : 'GET', headers : {"Content-Type" : "application/json"}}
    const request = await fetch( process.env.URL + '/api/reservas/leer', opciones)
    let reservas = await request.json()

    // Leer el json cuentas
    const opciones2 = {method : 'GET', headers : {"Content-Type" : "application/json"}}
    const request2 = await fetch( process.env.URL + '/api/cuentas/leer', opciones)
    let cuentas = await request.json()

    // Leer body
    const libro = JSON.parse(req.body)
    let disponibilidad = ''
    reservas.filter((element)=>{
        return (element["libro_id"] == libro["id"])
    })[0]

    let retorno = {"res": "Disponible"}

    let filePath = 'src/json/busqueda.json'
    let ruta = path.join(process.cwd(), filePath)
    try{
        let tmp = JSON.stringify(req.body)
        console.log(tmp)
        await fsPromises.writeFile(ruta,tmp)
        return res.status(200).json(retorno)
    } catch(error){
        console.log("Ocurrio un error al escribir",{error})
    }

}


