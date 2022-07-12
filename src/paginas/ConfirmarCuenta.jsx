import { useEffect, useState } from 'react';
import {useParams, Link} from 'react-router-dom';//permite leer los parametros de la url
import clienteAxios from '../config/axios'
//import axios from 'axios';// porque voy hacer una peticion hacia esa url
import Alerta from '../components/Alerta';//recuerda que esto es un div que con sus clases

const ConfirmarCuenta = () => {
  const [cuentaConfirmada, setCuentaConfirmada] = useState(false)
  const [cargando, setCargando] = useState(true)
  const [alerta, setAlerta] = useState({})//obj vacio porque se va a llenar con la respuesta de confirmar cuenta

  const params = useParams();//lee los parametros de la url es similar al backend como req.params es igual
  const {id} = params;//de esta forma extraes el valor del id de la url osea el token
  
  useEffect(() => {
    const ConfirmarCuenta = async () => {
      try {
        //comunicamos el backend con el frontend
        const url = `/veterinarios/confirmar/${id}`
        //data siempre sera la respuesta que nos da axios
        const {data} = await clienteAxios(url)//te daras cuneta que confirma el usuario de una porque esta dentro del useEffect

        //si esta linea se ejecu
        setCuentaConfirmada(true)
        //se cominica con el backend
        setAlerta({
          msg: data.msg
        });
        
      } catch (error) {
        setAlerta({
          msg: error.response.data.msg,
          error: true
        });//con el response se comunica con el backend y le manda la respuesta definida de alla
      }

      setCargando(false)//esperamos a que busque, lo encuentre y listo
    }
    ConfirmarCuenta();

  }, [])//el arreglo vacio es para que se ejecute una sola vez


  return (
    <>
        <div>
          <h1 className="text-indigo-600 text-6xl font-bold md:ml-2">
            Confirma tu cuenta y <hr className="border-0"/> a Administra <hr className="border-0"/>
            <span className="text-black">tus Pacientes</span> 
          </h1>
        </div>

        <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
          {!cargando && <Alerta
            alerta={alerta}
            />
          }

          {cuentaConfirmada && (
            <Link 
              className="block text-center my-5 hover:text-gray-400 "
              to="/" >Iniciar Sesión</Link>
          )}
        </div>
    </>
  )
}

export default ConfirmarCuenta