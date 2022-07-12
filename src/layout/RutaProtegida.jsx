//todas las page quedan como un espacio reservado para el contenido de cada uno de los diferentes componentes
import { Outlet, Navigate } from "react-router-dom"
//recuerda que para sacar la info del context tenemos que creamos 
import Header from "../components/Header"
import Footer from "../components/Footer"
import useAuth from "../hooks/useAuth"

/*{auth ? <Outlet/> : Navigate} si usuario esta autenticado ? tendra permitido los Outlet de todas las rutas priv sino esta autenticado Navigate lo lleva a login. Esto ifica ?._id eso revisa que auth tenga algo 
 */

const RutaProtegida = () => {

    const {auth, cargando} = useAuth()
    if(cargando) return 'Cargando...'

  return (
    <>
        <Header/>
          {auth?._id ? (
            <main className="container mx-auto mt-10">
              <Outlet/> 
            </main> 
          ): <Navigate to='/' />}
        <Footer/>
    </>
  )
}

export default RutaProtegida