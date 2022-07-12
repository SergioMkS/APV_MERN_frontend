//aqui vamos a extraer los datos de provider
//useContext es como podemos extraer los datos del context
import { useContext } from "react";
import AuthContext from "../context/AuthProvider";


const useAuth = () => {
    return useContext(AuthContext)//recuerda que esto es para hacer disponible los datos de la funcion provider
}

export default useAuth