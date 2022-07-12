//este componente sirve para que puedes usar otra pagina es esta y se muestre
//todas las page quedan como un espacio reservado para el contenido de cada uno de los diferentes componentes
import { Outlet } from "react-router-dom"
const AuthLayout = () => {
  return (
    <>
        <main className="container mx-auto md:grid md:grid-cols-2 mt-12 gap-10 p-10 items-center">
          <Outlet/>
        </main>
    </>
  )
}

export default AuthLayout