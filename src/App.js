import React,{useState,useEffect} from 'react';
import Formulario from './components/Formulario';
import ListadoImagenes from './components/ListadoImagenes';
import styled from '@emotion/styled';


function App() {
  //state de la app:
  const [busqueda,guardarBusqueda]=useState('');
  const [imagenes,guardarImagenes]=useState([]);
  const [paginaactual,guardarPaginaActual]=useState(1);
  const [totalpaginas, guardarTotalPaginas]=useState(1);
  //cambios
  useEffect(()=>{

    const consultarApi=async()=>{
          //valida vacio o no
          if(busqueda==='') return;
    
          const imagenesPorPagina=30;
          const key='16362995-62c0c2e559d626100a28cdf5d';
          const url=`https://pixabay.com/api/?key=${key}&q=${busqueda}&per_page=${imagenesPorPagina}&page=${paginaactual}`;
    
          const respuesta=await fetch(url);
          const resultado=await respuesta.json();
          //guardarBusqueda(resultado);
          guardarImagenes(resultado.hits);
          //calculo paginas
          const calcularTotalPaginas=Math.ceil(resultado.totalHits/imagenesPorPagina);
          guardarTotalPaginas(calcularTotalPaginas);

          //movelpantalla arriba
          const jumbotron=document.querySelector('.jumbotron');
          jumbotron.scrollIntoView({behavior:'smooth'})
    }
    consultarApi();
  },[busqueda,paginaactual])

  //defino pagina anterior
  const paginaAnterior=()=>{
    const nuevaPaginaActual=paginaactual-1;

    if(nuevaPaginaActual===0) return;

    guardarPaginaActual(nuevaPaginaActual);
  }
  //defino pagina siguiente:
  const paginaSiguiente=()=>{
    const nuevaPaginaActual=paginaactual+1;

    if(nuevaPaginaActual>totalpaginas) return;

    guardarPaginaActual(nuevaPaginaActual);
  }


  const Titulo=styled.h1`
    font-size:40px !important;
  `;

 const Margendiv=styled.div`
  margin-top:.5rem;
  margin-bottom:10px;
  display: block;
 `;
  return (
    <div className="container">
      <div className="jumbotron">
        <Titulo className="lead text-center">Buscador de Imágenes</Titulo>

        <Formulario
        guardarBusqueda={guardarBusqueda}
        />
      </div>
      <div className="row justify-content-center">

      {(paginaactual===1)?null
        :
        (<button
        type="button"
        className="btn btn-info mr-1"
        onClick={paginaAnterior}
        >&laquo; Anterior</button>)}

        
        {(paginaactual===totalpaginas)?null:
        (<button
        type="button"
        className="btn btn-info"
        onClick={paginaSiguiente}
        >Siguiente &raquo;</button>)}

        <Margendiv className="col-12">

        </Margendiv>

        <ListadoImagenes
        imagenes={imagenes}
        />
        {(paginaactual===1)?null
        :
        (<button
        type="button"
        className="btn btn-info mr-1"
        onClick={paginaAnterior}
        >&laquo; Anterior</button>)}

        
        {(paginaactual===totalpaginas)?null:
        (<button
        type="button"
        className="btn btn-info"
        onClick={paginaSiguiente}
        >Siguiente &raquo;</button>)}

      </div>
    </div>
  );
}

export default App;
