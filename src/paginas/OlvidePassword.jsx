import { useState } from "react"
import { Link } from "react-router-dom"
import Alerta from "../components/Alerta"
import clienteAxios from "../config/axios"

const OlvidePassword = () => {
  const [email, setEmail] = useState('')
  const [alerta, setAlerta] = useState({})

  //cuando haga submit en el form
  const handleSubmit = async e => {
    e.preventDefault()

    //validacion
    if(email === '' || email.length < 6) {
      setAlerta({msg: 'El email es obligatorio', error: true})
      return;
    }

    //
    try {
      const {data} = await clienteAxios.post('/veterinarios/olvide-password', {email})
      setAlerta({msg: data.msg})

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
            Recupera tu Acceso y <hr className="border-0"/>no pierdas tus <hr className="border-0"/>
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
                <label className="uppercase text-gray-600 block text-xl font-bold">Email</label>
                <input type="email"
                  placeholder="Email"
                  className="border md:w-11/12 w-full p-3 mt-3 bg-gray-50 rounded-xl" 
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  />
            </div>

            <input type="submit"
             value="Enviar"
             className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto"
             />

          </form>

          <nav className="mt-10 lg:flex lg:justify-between">
            <Link 
              className="block text-center my-5 hover:text-gray-400 "
              to="/" >??Ya tienes una cuenta? Inicia Sesi??n</Link>
            <Link 
              className="block text-center my-5 hover:text-gray-400 "
              to="/registrar" >??No tienes una cuenta? Reg??strate</Link>
          </nav>
        </div>
    </>
  )
}

export default OlvidePassword