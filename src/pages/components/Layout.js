import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import {useMiProvider} from '../context/contexto'
import {useRouter} from 'next/router'

export default props => {

    const router = useRouter()

    const [cuenta, setCuenta] = useMiProvider()
    let titulo = ''
    let segundo_link_mostrar = false
    let tercer_link_titulo = ''
    let tercer_link_href = ''
    let foto_src = ''
    let foto_href = ''

    if (cuenta.tipo == 'admin') {
        titulo = 'Administracion de bibliotecas'
        segundo_link_mostrar = true
        tercer_link_titulo = 'Bibliotecas'
        tercer_link_href = '/busqueda'
        foto_src = cuenta.foto
        foto_href = '/perfilDatos'
    }
    else if (cuenta.tipo == 'user') {
        titulo = 'Sistema de bibliotecas'
        segundo_link_mostrar = true
        tercer_link_titulo = 'Prestamos'
        tercer_link_href = '/busqueda'
        foto_src = cuenta.foto
        foto_href = '/perfilDatosUsu'
    }
    else { // Sin haberse logeado (invitado) (guest)
        titulo = 'Biblioteca'
        segundo_link_mostrar = false
        tercer_link_titulo = 'Buscar'
        tercer_link_href = '/busqueda'
        foto_src = '/login.svg'
        foto_href = '/login'
    }

    return (
    <>
        <div id='todo'>
            <header>
                <div class="flex p-8">
                    <button class="" onClick={toggleNav}>
                        <div class="w-48px h-48px items-center justify-center gap-10">
                            <Image src="/boton_nav.png" width={24} height={24} alt='imagen de nav'></Image>
                        </div>
                    </button>
                </div>
                
                <p id="titulo">{titulo}</p>

                <div class="flex p-8">
                    <Link class="" href={foto_href}>
                        <div class="w-48px h-48px items-center justify-center gap-10">
                            <Image src={foto_src} width={24} height={24} alt='imagen de perfil'></Image>
                        </div>  
                    </Link>
                </div>
            </header>

            <nav id="nav">
                <ul>
                    <li><Link href="/">Inicio</Link></li>
                    {segundo_link_mostrar && (
                        <li><Link href={foto_href}>Perfil</Link></li>
                    )}
                    <li><Link href={tercer_link_href}>{tercer_link_titulo}</Link></li>
                    {cuenta.tipo != 'guest' && (<li><Link href="/login">Logout</Link></li>)}
                </ul>
            </nav>



            <main id="main">
                {props.content}
            </main>
            
            <footer id="footer">
                <p>Biblio v1.01-alpha</p>
            </footer>
        </div>
        </>
    )
}

function toggleNav(){
    let navUl = document.getElementById("nav")
    let foot = document.getElementById("footer")
    console.log(navUl.style.display)
    if(navUl.style.display=="block" || navUl.style.display==""){
        document.getElementById("main").style.marginLeft = "0px"
        navUl.style.display="none";
        foot.style.display="none";
    }else{
        document.getElementById("main").style.marginLeft = "166px"
        navUl.style.display="block";
        foot.style.display="block";
    }
    console.log(navUl.style.display)
}
