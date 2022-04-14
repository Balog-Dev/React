import {ACTIONS} from './App'
import React, { Component }  from 'react';
export default function OperationButton( {dispatch, Operation}){
    return (
         <button
     onClick={() => dispatch({type: ACTIONS.CHOOSE_OPERATION, payload: {Operation} })}>
         {Operation}
         </button>
    )
    }