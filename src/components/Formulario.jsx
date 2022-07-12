import { useState, useEffect } from "react"
import Alerta from "./Alerta"
import usePacientes from "../hooks/usePacientes"
//nota: siempre crea tu state con el mismo nombre que creaste en tu modelo este caso paciente.js
const Formulario = () => {
    const [nombre, setNombre] = useState('')
    const [propietario, setPropietario] = useState('')
    const [email, setEmail] = useState('')
    const [fecha, setFecha] = useState('')
    const [sintomas, setSintomas] = useState('')
    const [id, setId] = useState(null)

    const [alerta, setAlerta] = useState({})

    //extraes es state de pacienteProvider
    const {guardarPaciente, paciente} = usePacientes()

    useEffect(() => {
      
        if(paciente?.nombre) {
            setNombre(paciente.nombre)
            setPropietario(paciente.propietario)
            setEmail(paciente.email)
            setFecha(paciente.fecha)
            setSintomas(paciente.sintomas)
            setId(paciente._id)
        }
    }, [paciente])
    
    
    

    const handleSubmit = e => {
        e.preventDefault()

        //validar form
        if([nombre, propietario, email, fecha, sintomas].includes('')) {
            setAlerta({
                msg: 'Todos los campos son obligatorios',
                error: true
            })
            return;
        }

        guardarPaciente({nombre, propietario, email, fecha, sintomas, id})
        //en caso que pase la validacion, se elimina esa alerta 
        //y guardamos en un onjeto la info que escribio en el form
        setAlerta({
            msg: 'Guardado Correctamente'
        })

        //reiniciamos los input al luego que se edito y se guardo cambios
        setNombre('')
        setPropietario('')
        setEmail('')
        setFecha('')
        setSintomas('')
        setId('')
    }

    const {msg} = alerta

  return (
        <>
            <h2 className="font-black text-3xl text-center">Administrador de Pacientes</h2>

            <p className="text-xl mt-5 text-center mb-10">
                Añade tus pacientes y {''} <span className="text-indigo-600 font-bold">Administralos</span>
            </p>

            <form className="bg-white py-10 px-5 xl:ml-10 mb-10 lg:mb-5 shadow-md rounded-md"
                onSubmit={handleSubmit}
            >
                <div className="mb-5">
                    <label 
                    htmlFor="nombre"
                    className="text-gray-700 uppercase font-bold"
                    > Nombre Mascota</label>
                    <input 
                    id="nombre"
                    type="text"
                    placeholder="Nombre de la mascota"
                    className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                    value={nombre}
                    onChange={e => setNombre(e.target.value)}
                    />
                </div>

                <div className="mb-5">
                    <label 
                    htmlFor="propietario"
                    className="text-gray-700 uppercase font-bold"
                    >Nombre Propietario</label>
                    <input 
                    id="propietario"
                    type="text"
                    placeholder="Nombre del Propietario"
                    className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                    value={propietario}
                    onChange={e => setPropietario(e.target.value)}
                    />
                </div>

                <div className="mb-5">
                    <label 
                    htmlFor="email"
                    className="text-gray-700 uppercase font-bold"
                    >Email</label>
                    <input 
                    id="email"
                    type="email"
                    placeholder="Correo Electronico"
                    className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    />
                </div>

                <div className="mb-5">
                    <label 
                    htmlFor="fecha"
                    className="text-gray-700 uppercase font-bold"
                    >Fecha</label>
                    <input 
                    id="fecha"
                    type="date"
                    className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                    value={fecha}
                    onChange={e => setFecha(e.target.value)}
                    />
                </div>

                <div className="mb-5">
                    <label 
                    htmlFor="sintomas"
                    className="text-gray-700 uppercase font-bold"
                    >Sintomas</label>
                    <textarea 
                    id="sintomas"
                    placeholder="Describe los Síntomas"
                    className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                    value={sintomas}
                    onChange={e => setSintomas(e.target.value)}
                    />
                </div>

                <input 
                    type="submit"
                    className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-colors"
                    value={id ? 'Guardar Cambios' : 'Agregar'} 
                />
            </form>

            {msg && <Alerta alerta={alerta}/>}
        </>
    )
}

export default Formulario