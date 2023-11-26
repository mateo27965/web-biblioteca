import fsPromises from 'fs/promises'
import path from 'path'
import process from 'process'

export default async function leer(req, res) {
    let filePath = 'src/json/masPedidos.json'
    let ruta = path.join( process.cwd() , filePath )

    let filePathDatos = '/src/json/reservas.json'
    let rutaDatos = path.join( process.cwd() , filePathDatos )
    // lectura datos
    let data
    try {
        data = await fsPromises.readFile( rutaDatos )
        console.log(data)
        console.log("lectura datos")
        data=JSON.parse(data)

    } catch( error) {
        console.log("Ocurrio un error al leer", error)
    }
    //Modificar data
    let resultado=[]
    data.forEach(element => {
        if (resultado.length<1) {
            let aux = {}
                aux['libro'] = element.libro
                aux['cantidad'] = 1
                resultado.push(aux)
        }else{
            let encontrado = false
            for (let i = 0; i < resultado.length; i++) {
                if (element.libro.id == resultado[i].libro.id) {
                    resultado[i].cantidad++
                    encontrado = true
                } 
            }if (encontrado == false) {
                let aux = {}
                aux['libro'] = element.libro
                aux['cantidad'] = 1
                resultado.push(aux)
            }
        } 
    });
    resultado.sort((a,b) => b.cantidad - a.cantidad)
    console.log(resultado)
        
    // Escritura
    try {
        let tmp = JSON.stringify(resultado,null,'\t')
        console.log( tmp )

        await fsPromises.writeFile( ruta, tmp )
        console.log("terminado proximos")
        return res.status(200).json( { "rpta" : "Se grabo OK"} )

    } catch( error) {
        console.log("Ocurrio un error al Escribir ", {error})
    }
}
