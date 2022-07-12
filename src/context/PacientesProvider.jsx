import { createContext, useState, useEffect } from "react";
import clienteAxios from "../config/axios"

//creando el context
const PacientesContext = createContext()


//el del provider, y children son todos los componetes hijos
const PacientesProvider = ({children}) => {

    const [pacientes, setPacientes] = useState([])//lo guardamos en un arreglo pq son varios obj que se almacenaran de los pacientes

    const [paciente, setPaciente] = useState({})

    useEffect(() => {
        const obtenerPacientes = async () => {

            try {
                const token = localStorage.getItem('token')
                if(!token) return

                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }

                const {data} = await clienteAxios('/pacientes', config)
                setPacientes(data)

            } catch (error) {
                console.log(error)
            }
        }

        obtenerPacientes()
    }, [])

    const guardarPaciente = async (paciente) => {
        

        const token = localStorage.getItem('token')
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }
        
        if(paciente.id) {
            try {
                const {data} = await clienteAxios.put(`/pacientes/${paciente.id}`, paciente, config)
                
                const pacienteActualizado = pacientes.map( pacienteState => pacienteState._id === data._id ? data : pacienteState)

                setPacientes(pacienteActualizado)

            } catch (error) {
                console.log(error)
            }
        }else {

            try {
                
                const {data} = await clienteAxios.post('/pacientes', paciente, config)
    
                //cosas que no quiero y las saco de esta forma
                const {createdAt, updatedAt, __v, ...pacienteAlmacenado} = data
    
                setPacientes([pacienteAlmacenado, ...pacientes])
            } catch (error) {
                console.log(error.response.data.msg)
            }
        }

        

        
    }

    //edición de Pacientes
    const setEdicion = (paciente) => {
        setPaciente(paciente)
    }

    const eliminarPaciente = async id => {
        const confirmar = confirm('¿Confirmas que Deseas eliminar?') 
        
        if( confirmar) {
            try {
                const token = localStorage.getItem('token')
                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }

                const { data } = await clienteAxios.delete(`/pacientes/${id}`, config)
                const pacientesActualizado = pacientes.filter(pacientesState => pacientesState._id !== id)

                setPacientes(pacientesActualizado)
            } catch (error) {
                console.log(error)
            }
        }
    }


    //aqui definimos el provider del context
    //recuerda que para usarlos debes crear el custom hook 
    return(
        <PacientesContext.Provider 
            value={{
                pacientes,
                guardarPaciente,
                setEdicion,
                paciente,
                eliminarPaciente
            }}
        >
            {children}
        </PacientesContext.Provider>
    )
}

export {
    PacientesProvider
}

export default PacientesContext;