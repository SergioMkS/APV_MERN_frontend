import { useState } from "react"
import { Link } from "react-router-dom"
//import axios from "axios" porque voy hacer una peticion hacia esa url
import Alerta from "../components/Alerta"
import clienteAxios from "../config/axios"

const Registrar = () => {
  //definiendo el state de cada uno de los inputs
  // uno es la variable lo usas= value{} y el segundo es la funcion para modificar le state on change
  const [ nombre, setNombre ] = useState('')
  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ repetirPassword, setRepetirPassword ] = useState('')

  //este lo creamos para pasarle un objeto con las propiedades de msg y error
  const [alerta, setAlerta] = useState({})

  const handleSubmit = async (e) => {
    e.preventDefault();
    if([nombre, email, password, repetirPassword].includes('')) {
      setAlerta({msg:'Hay campos vacios', error: true})
      return;
    }
    
    if(password !== repetirPassword) {
      setAlerta({msg:'Las contrasenas no coinciden', error: true})
      return;
    }

    if(password.length < 6) {
      setAlerta({msg:'El password es muy corto', error: true})
    }

    //si no hay ningun error reiniciamos la alerta o en el caso que el usu corrija su error
    setAlerta({})


    //Crear un usuario en la api, si pones axios('') el metod http por default es get
    try {
      //axios.post(url: string,  datos: que vas a enviar, config )
      //ese objeto son los datos de los input que son esos datos que quieres leer y pasarlos como un objeto
      //import.meta.varible de entorno esa en la forma en vite
      await clienteAxios.post('/veterinarios', {nombre, email, password})
      //aqui le pasas el mensaje de la alerta exitosa
      setAlerta({
        msg: 'Creado correctamente, revisa tu email',
        error: false
      })
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true
      })
    }
  }
  //extraemos msg y le decimos que es = alerta para darle su valor
  //que son us mensaje para cada input y abajo le pasamos el diseno de la alerta
  //linea 66
  const {msg} = alerta

  return (
    <>
        <div>
          <h1 className="text-indigo-600 text-6xl font-bold md:ml-2">
            Crea tu cuenta y <hr className="border-0"/>Administra tus <hr className="border-0"/>
            <span className="text-black"> Pacientes</span> 
          </h1>
        </div>

        <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
          { 
            msg && <Alerta
            alerta={alerta}
          />
          }
          <form 
            onSubmit={handleSubmit}
          >

            <div className="my-5">
              <label className="uppercase text-gray-600 block text-xl font-bold">Nombre</label>
              <input type="text"
                placeholder="Nombre"
                className="border md:w-11/12 w-full p-3 mt-3 bg-gray-50 rounded-xl" 
                value={nombre}
                onChange={e => setNombre(e.target.value)}
                />
            </div>

            <div className="my-5">
              <label className="uppercase text-gray-600 block text-xl font-bold">Email</label>
              <input type="email"
                placeholder="Email"
                className="border md:w-11/12 w-full p-3 mt-3 bg-gray-50 rounded-xl" 
                value={email}
                onChange={e => setEmail(e.target.value)}
                />
            </div>

            <div className="my-5">
              <label className="uppercase text-gray-600 block text-xl font-bold">Password</label>
              <input type="password"
                placeholder="Password"
                className="border md:w-11/12 w-full p-3 mt-3 bg-gray-50 rounded-xl" 
                value={password}
                onChange={e => setPassword(e.target.value)}
                />
            </div>

            <div className="my-5">
              <label className="uppercase text-gray-600 block text-xl font-bold">Repite tu Contraseña</label>
              <input type="password"
                placeholder="Repite tu Password"
                className="border md:w-11/12 w-full p-3 mt-3 bg-gray-50 rounded-xl" 
                value={repetirPassword}
                onChange={e => setRepetirPassword(e.target.value)}
                />
            </div>

            <input type="submit"
             value="Crear Cuenta"
             className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto"
             />
          </form>

          <nav className="mt-10 lg:flex lg:justify-between">
            <Link 
              className="block text-center my-5 hover:text-gray-400 "
              to="/" >¿Ya tienes una cuenta? Inicia Sesión</Link>
            <Link 
              className="block text-center my-5 hover:text-gray-400"
              to="/olvide-password" >Olvide mi Password</Link>
          </nav>
        </div>
    </>
  )
}

export default Registrar