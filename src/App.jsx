import {BrowserRouter,  Routes, Route,} from 'react-router-dom';//todo debe estar rodeado por le browserrouter, Routes te permite agrupar diferentes rutas, Route es para una ruta en especifico
//esto se llaman componentes
import AuthLayout from './layout/AuthLayout';
import RutaProtegida from './layout/RutaProtegida';

import Login from './paginas/Login';
import Registrar from './paginas/Registrar';
import OlvidePassword from './paginas/OlvidePassword'
import ConfirmarCuenta from './paginas/ConfirmarCuenta'
import NuevoPassword from './paginas/NuevoPassword';

import AdministrarPacientes from './paginas/AdministrarPacientes';
import EditarPerfil from './paginas/EditarPerfil';
import CambiarPassword from './paginas/CambiarPassword';

import { AuthProvider } from './context/AuthProvider'
import { PacientesProvider } from './context/PacientesProvider'

/*
<Route index eso hace referencia que es este elemento es el indice de esta ruta padre que es la de arriba
<Route path="/" element={ <AuthLayout/> }> ---> este element seria el master page o diseno principal, esto solo es el layout
          <Route index element={ <Login/> }/> --> pero tienes que definir una ruta como la principal para eso es este index
          <Route path='registrar' element={ <Registrar/> }/> --> pero si quieres crear mas rutas debes agregarle un path


Nuestro provider rodea toda nuestra aplicacion, por lo tanto todo el stage que este definido es alli, estara disponible para todo los hijos

Como sabe ese provider cuales son sus hijos?
bueno en el archivo debe extraer un props que se llama children
*/

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <PacientesProvider>
          <Routes>
            <Route path="/" element={ <AuthLayout/> }>
              <Route index element={ <Login/> }/>
              <Route path='registrar' element={ <Registrar/> }/>
              <Route path='olvide-password' element={ <OlvidePassword/> }/>
              <Route path='olvide-password/:token' element={ <NuevoPassword/> }/>
              <Route path='confirmar/:id' element={ <ConfirmarCuenta/> }/>
            </Route>


            <Route path="/admin" element={<RutaProtegida/>}>
              <Route index element={<AdministrarPacientes/>}/>
              <Route path='perfil' element={<EditarPerfil/>}/>
              <Route path='cambiar-password' element={<CambiarPassword/>}/>

            </Route>
          </Routes>
        </PacientesProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
