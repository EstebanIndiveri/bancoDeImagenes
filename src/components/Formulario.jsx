import React,{useState} from 'react';
import Error from './Error';
const Formulario = ({guardarBusqueda}) => {

    const[termino,guardarTermino]=useState('');
    const[error,guardarError]=useState(false);
    const buscarImagenes=e=>{
        e.preventDefault();

        //vallido
        if(termino.trim()===''){
            guardarError(true);
            return;
        }
            guardarError(false);
            guardarBusqueda(termino);
        //envio el temino de bvusqueda hacia el componente principal
    }

    return ( 
        <form
        onSubmit={buscarImagenes}
        >
        <div className="row">
            <div className="form-gruop col-md-8">
                <input
                type="text"
                className="form-control form-control-lg"
                placeholder="Busca una imagen, ejemplo: café, playa, etc"
                onChange={e=>guardarTermino(e.target.value)}
                />
            </div>

            <div className="form-gruop col-md-4">
                <input
                type="submit"
                className="btn btn-lg btn-secondary btn-block"
                value="Buscar"
                />
            </div>

        </div>
        {error? <Error mensaje="Agrega una palabra para buscar"/>:null}
        </form>
     );
}
 
export default Formulario;