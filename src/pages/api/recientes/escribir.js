import fsPromises from 'fs/promises'
import path from 'path'
import process from 'process'

export default async function leer(req, res) {
    let filePath = 'src/json/recientes.json'
    let ruta = path.join( process.cwd() , filePath )

    let filePathDatos = '/src/json/reservas.json'
    let rutaDatos = path.join( process.cwd() , filePathDatos )

    // lectura datos
    let data
    try {
        data = await fsPromises.readFile( rutaDatos )
        data=JSON.parse(data)

    } catch( error) {
        console.log("Ocurrio un error al leer ")
    }
    //Modificar data
    let resultado=[]
    const tmp = JSON.stringify(req.body).replace("'",'"')
    const body = JSON.parse(tmp)
    data.forEach(element => {
        if (body.tipo == "admin") {
            let aux = {}
            aux['libro_id'] = element.libro.id
            aux['titulo'] = element.libro.titulo
            aux['imagen'] = element.libro.imagen
            aux['fecha_inicio'] = element.fecha_inicio
            resultado.push(aux)
        }else{
            if (element.cuenta.id == body.id) {
                let aux = {}
                aux['libro_id'] = element.libro.id
                aux['titulo'] = element.libro.titulo
                aux['imagen'] = element.libro.imagen
                aux['fecha_inicio'] = element.fecha_inicio
                resultado.push(aux)
            }
        }
    });
    resultado.reverse()
    resultado.sort((a,b) => new Date(b.fecha_inicio).getTime() - new Date(a.fecha_inicio).getTime())
        
    // Escritura
    try {
        let tmp = JSON.stringify(resultado,null,'\t')

        await fsPromises.writeFile( ruta, tmp )
        console.log("terminao recientes")
        return res.status(200).json( { "rpta" : "Se grabo OK"} )

    } catch( error) {
        console.log("Ocurrio un error al Escribir ", {error})
    }
}
