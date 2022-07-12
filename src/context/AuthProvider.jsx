//Context es como redux, sirve para hacer un state global, en lo otros ejemplos hemos hecho state locales
//createContext, nos va a poder permitir acceder al stage de forma global en la =s diferentes partes de esta aplicacion

import { useState, useEffect, createContext } from "react";
import clienteAxios from "../config/axios";

//aqui definiste como llamaras a este provider
//esto tiene la sintaxis de un componente
const AuthContext = createContext()

//lo que hace este AuthProvider es retornar el context,este es el conteniene los datos
//el AuthProvider rodea toda la aplicacion ya que para que el usuario ingrese se necesita todos esos datos
//si ese obj esta lleno con la informacion del usuario desde la api signf que el usu esta autenticado
const AuthProvider = ({children}) => {
    //Aqui puedes definir el Stage globalmente
    //Debemos Crear un custom hook para acceder a los datos del context(es donde viven los datos)
    const [cargando, setCargando] = useState(true)
    const [auth, setAuth] = useState({})

    //como neustro provider rodea toda la aplicacion usaremos un useEffect para que cuando cargue la app
    //entoces revise si el usuario esta autenyicado o no
    useEffect(() => {
        const autenticarUsuario = async () => {
            //revisar el token
            const token = localStorage.getItem('token')
            
            if(!token) {
                setCargando(false)
                return
            }

            const config = {
                //estos headers se envian antes de toda la peticion
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            try {
                const { data } = await clienteAxios('/veterinarios/perfil', config)

                setAuth(data)
            } catch (error) {
                console.log(error.response.data.msg)
                setAuth({})
            }
            //una vez que revisa todo, pasa a false
            setCargando(false)
        }

        autenticarUsuario()
    }, [])

    const cerrarSesion = () => {
        localStorage.removeItem('token')
        setAuth({})
    }

    const actualizarPerfil = async datos => {
        const token = localStorage.getItem('token')
            
        if(!token) {
            setCargando(false)
            return
        }

        const config = {
            //estos headers se envian antes de toda la peticion
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        try {
            const url = `/veterinarios/perfil/${datos._id}`
            const {data} = await clienteAxios.put(url, datos, config)

            return {
                msg: 'Almacenado Correctamente'
            }
        } catch (error) {
            return {
                msg: error.response.data.msg,
                error: true
            }
        }
    }

    const guardarPassword = async (datos) => {
        const token = localStorage.getItem('token')
            
        if(!token) {
            setCargando(false)
            return
        }
        const config = {
            //estos headers se envian antes de toda la peticion
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        try {
            const url = '/veterinarios/actualizar-password'
            const {data} = await clienteAxios.put(url, datos, config)
            console.log(data)

            return {
                msg: data.msg
            }
        } catch (error) {
            return {
                msg: error.response.data.msg,
                error: true
            }
        }
    }

    
    //aqui debes retornar el AuthContext, es value es obligatorio
    //en ese value pondras todos los valores que quieras usar, cuando llames el useAuth en login
    return(
        <AuthContext.Provider value={{auth, setAuth, cargando, cerrarSesion, actualizarPerfil, guardarPassword}}>
            {children}
        </AuthContext.Provider>
    )
}

//este se exporta con llaves{}
export {
    AuthProvider
}
//no se requiere llaves
export default AuthContext
