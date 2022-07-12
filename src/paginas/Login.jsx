import { useState } from "react" 
import { Link, useNavigate } from "react-router-dom"//esto nos permitira elimnar ese mini spinner de carga predeterminado
//useNavigate es el hook que vas a utilizar para redireccionar al usuario
import Alerta from "../components/Alerta"
import useAuth from "../hooks/useAuth"//recuerda que solo este useAuth usaste el useContext para extraer los datos del provider que es un objeto
import clienteAxios from "../config/axios"

const Login = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [alerta, setAlerta] = useState({})

  //este es importante paRA QUE TOMe la autenticacion de perfil
  const {setAuth} = useAuth()

  const navigate = useNavigate()

  //validacion y autenticacion
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if([email, password].includes('')) {
      setAlerta({
        msg: 'Todos los campos son obligatorios',
        error: true
      });

      return
    }

    try {
      const {data} = await clienteAxios.post('/veterinarios/login', {email, password})
      localStorage.setItem('token', data.token)

      setAuth(data)
      //aqui mandamos a la area privada al usuario, lo manda a la area de admin
      navigate('/admin')
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true
      })
    }
  }

  const {msg} = alerta

  return (
    <>
        <div>
          <h1 className="text-indigo-600 text-6xl font-bold md:ml-2">
            Inicia Sesión y <hr className="border-0"/>Administra tus <hr className="border-0"/>
            <span className="text-black"> Pacientes</span> 
          </h1>
        </div>

        <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
          { 
            msg && <Alerta
              alerta={alerta}
            />
          }
          <form onSubmit={handleSubmit}>
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
              <label className="uppercase text-gray-600 block text-xl font-bold">Contraseña</label>
              <input type="password"
                placeholder="Introduce tu contraseña"
                className="border md:w-11/12 w-full p-3 mt-3 bg-gray-50 rounded-xl"
                value={password} 
                onChange={e => setPassword(e.target.value)}
                />
            </div>

            <input type="submit"
             value="Inicia Sesión"
             className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto"
             />
          </form>

          <nav className="mt-10 lg:flex lg:justify-between">
            <Link 
              className="block text-center my-5 hover:text-gray-400 "
              to="/registrar" >¿No tienes una cuenta? Regístrate</Link>
            <Link 
              className="block text-center my-5 hover:text-gray-400"
              to="/olvide-password" >Olvide mi Password</Link>
          </nav>
        </div>
    </>
  )
}

export default Login