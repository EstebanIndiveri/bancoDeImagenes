import React from 'react'
import styled from '@emotion/styled'

const Parrafo=styled.p`
    background-color:#9A3B2A;
    border-radius:10px;
`;

const Error = ({mensaje}) => {
    return ( 
        <Parrafo className="my-3 p-4 text-center text-white alert">{mensaje}</Parrafo>
     );
}
 
export default Error;