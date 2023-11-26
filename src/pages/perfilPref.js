import Link from "next/link"
import Head from 'next/head'
import Image from 'next/image'
import Layout from './components/Layout.js'
import { useMiProvider } from './context/contexto'

const Perfil = () => {

    const [cuenta, setCuenta] = useMiProvider()

    let cuenta_modificada = {...cuenta}

    function registrarCambio(e){
        cuenta_modificada[e.target.name] = e.target.value
    }

    const escribirEnBD = async () => {
        try {
            const peticion = await fetch(`/api/personas/modificar?id=${cuenta.id}`, {
                method: 'PUT',  // o 'POST' dependiendo de tu API
                body: JSON.stringify(cuenta_modificada),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            setCuenta(cuenta_modificada)
            document.querySelector(':root').style.setProperty('--color-primario', cuenta_modificada.color)
            document.querySelector(':root').style.setProperty('--color-secundario', newShade(cuenta_modificada.color, 100))
            alert("Datos actualizados correctamente.")
            
        } catch (err) {
            console.error(err);
            alert("Error al modificar la persona.");
        }
    };


    return (

<Layout content={
<>
    <Head>
        <title>Perfil</title>
    </Head>
    <div id="tituloP">
            <p>Hola, {cuenta.nombres}</p>
            <Image src="/divider.png" width={1088} height={1} alt="divider"></Image>
    </div>
    <div id="form_perfil">
        <div id="barra_perfil">
            <div id="barra_texto_notselected">
                <Link href="/perfilDatos">DATOS PERSONALES</Link>
            </div>
            <div id="barra_texto_notselected">
                <Link href="/perfilCuenta">CUENTA</Link>
            </div>
            <div id="barra_texto_selected" className="selected">
                <Link href="/perfilPref">PREFERENCIAS</Link>
            </div>
        </div>
        
        <div class="grid grid-cols-2 gap-4">
            <div class="col-span-1">
                <div id="imagen_perfil">
                    <Image src={cuenta.foto} class="foto_perfil" width={279} height={253} alt="divider"></Image>
                </div>
            </div>
            <div class="col-span-1">
            <div id="cuadro_texto_idioma">
                <div class="borde_text_field">
                    <div class="state_layer">
                        <div class="content_perfil">
                            <div id="text_perfil">
                                <p>Idioma</p>
                            </div>
                            <div id="input_text_idioma">
                                <input type='text' placeholder='Ingrese idioma' id="inputIdioma" name="idioma" defaultValue={cuenta.idioma} onBlur={registrarCambio}/>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="supporting-text">
                    <p></p>
                </div> 
            </div>
            
            <div id="cuadro_texto_prefijo">
                <div class="borde_text_field">
                    <div class="state_layer">
                        <div class="content_perfil">
                            <div id="text_perfil">
                                <p>Prefijo</p>
                            </div>
                            <div id="input_text_prefijo">
                                <input type='text' placeholder='Ingrese prefijo' id="inputPrefijo" name="prefijo" defaultValue={cuenta.prefijo} onBlur={registrarCambio}/>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="supporting-text">
                    <p></p>
                </div>
            </div>

            <div id="cuadro_texto_color">
                <div class="borde_text_field">
                    <div class="state_layer">
                        <div class="content_perfil">
                            <div id="text_perfil">
                                <p>Color</p>
                            </div>
                            <div id="input_text_color">
                                <input type='color' id="inputColor" name="color" defaultValue={cuenta.color} onBlur={registrarCambio}/>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="supporting-text">
                    <p></p>
                </div>
            </div>


            <button type="button" class="guardar" onClick={escribirEnBD}>Guardar</button>

            </div>
            {/* Aquí termina la columna*/}

        </div>
    </div>

</>
}
></Layout>
    )
}
export default Perfil

const newShade = (hexColor, magnitude) => {
    hexColor = hexColor.replace(`#`, ``);
    if (hexColor.length === 6) {
        const decimalColor = parseInt(hexColor, 16);
        let r = (decimalColor >> 16) + magnitude;
        r > 255 && (r = 255);
        r < 0 && (r = 0);
        let g = (decimalColor & 0x0000ff) + magnitude;
        g > 255 && (g = 255);
        g < 0 && (g = 0);
        let b = ((decimalColor >> 8) & 0x00ff) + magnitude;
        b > 255 && (b = 255);
        b < 0 && (b = 0);
        return `#${(g | (b << 8) | (r << 16)).toString(16)}`;
    } else {
        return hexColor;
    }
};