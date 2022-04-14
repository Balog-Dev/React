import React, { useReducer } from 'react'
import './App.css';
import DigitButton from './components/DigitButton';
import OperationButton from './components/Operation';



// function App() {
   
//   // const showNumber= () =>{
//   //      console.log("it works");
//   // }

//   // Arrow function when passing a parameter
//   const showNumber= (value) =>{
//        console.log(value);
//   }
//   const desc = " Hello world.... My first React Project";


  
//   return (
//  <div className="App">
//   <nav style={{backgroundColor: "black", color: "white"}} className="d-flex justify-content-between pt-2">
//        <div>    
//          <h3 style={{marginLeft: "20px"}}>SOLANA</h3>
//       </div>

//          <div className="d-flex justify-content-between">
//             <h6 style={{marginRight: "50px"}}>Developers</h6>
//            <h6 style={{marginRight: "50px"}}>Network</h6>
//            <h6 style={{marginRight: "50px"}}>Validators</h6>
//            <h6 style={{marginRight: "50px"}}>Community</h6>
//            <h6 style={{marginRight: "50px"}}>EcoSystem</h6>

//        </div>
//    </nav>

//    <div className= "d-flex">
//      <div>
//        <h1 style={{color: "white", marginTop: "90px", marginLeft: "50px", fontSize: "80px"}}>Powerful for <br /> developers. <br /> Fast for <br /> everyone.</h1>
//      </div>
//      <div>

//      </div>

//      {/* inteculation */}
//      <p style={{color: "red"}}>{desc}</p>
//    </div>

// <span>
//   {/* <button onClick={showNumber} className='btn btn-success'>START BUILDING</button> */}

// {/* Arrow function when passing a parameter */}
//   <button onClick={()=> showNumber("Ridwan Balogun")} className='btn btn-success'>START BUILDING</button>
 
//   <button className='btn btn-light'>BUILD DOCUMENTATION</button>
// </span>
//     </div>

    
//   );
// }

// export default App;

// ASSIGNMENT......... READ ABOUT USE STATE


export const ACTIONS = {
    ADD_DIGIT: 'add-digit',
    CLEAR: 'clear',
    DELETE_DIGIT: 'delete-digit',
    CHOOSE_OPERATION: 'choose-operation',
    EVALUATE: 'evaluate'
}


function reducer(state, {type, payload}) {
    switch(type) {
        case ACTIONS.ADD_DIGIT:
            if (state.overwrite) {
                return{
                    ...state,
                    currentOperand: payload.digit,
                    overwrite : false
                }
            }
            if (payload.digit ===  "0" && state.currentOperand === "0" ){
                return state                     

            }
            if (payload.digit ===  "." && state.currentOperand.includes(".")){
                return state                     

            }
            return {
                ...state,
                currentOperand: `${currentOperand || ""}${payload.digit}`,
            }
            case ACTIONS.CHOOSE_OPERATION:
                if (state.currentOperand == null && state.previousOperand == null) {
                    return state
                }
                if (state.currentOperand == null){
                    return{
                        ...state,
                        operation: payload.operation,
                    }
                }
                if (state.previousOperand == null ) {
                    return{
                        ...state,
                        operation: payload.operation,
                        previousOperand: state.currentOperand,
                        currentOperand: null
                    }
                }
                return {
                    ...state,
                    previousOperand: evaluate(state),
                    operation: payload.operation,
                    currentOperand: null
                }


            case ACTIONS.CLEAR:
                return {}
                case ACTIONS.DELETE_DIGIT:
                    if (state.overwrite)
                     return {
                         ...state,
                         overwrite: false,
                        currentOperand: null
                    }


                case ACTIONS.EVALUATE:
                    if (state.operation == null || state.currentOperand == null || state.previousOperand == null ) {
                        return state
                    }
                    return{
                        ...state,
                        overwrite: true,
                        previousOperand: null,
                        operation: null,
                        currentOperand: (evaluate.state)
                    }
            
    }
    if (state.currentOperand == null) return state
    if (state.currentOperand.lenght === 1) {
        return{...state, currentOperand: null }
     
    }
    return {
        ...state,
        currentOperand: state.currentOperand.slice(0, -1)
    }
     
}

const INTEGER_FORMATER = new Intl.NumberFormat("en-us", {
    minimumFractionDigits: 0
})
function formatOperand(operand) {
    if (operand == null) return 
    const [integer, decimal ] = operand.split(".")
    if (decimal == null) return INTEGER_FORMATER.format(integer)
        return `${INTEGER_FORMATER.format(integer)}.${decimal}`
    
        
   
}

function evaluate({currentOperand, previousOperand, operation}) {
    const prev = parseFloat(previousOperand)
    const current = parseFloat(currentOperand)
    if (isNaN(prev) || isNaN(current)) return " "
    let computation = " "
    switch (operation) {
        case "+":
            computation = prev + current
            
            break;
    
        case "-":
            computation = prev - current
            break;

        case "-":
            computation = prev * current
            break;
            
        case "-":
            computation = prev / current
            break;
    }
       return computation.toString()
        

}

function App() {

  const [{currentOperand, previousOperand, operation}, dispatch] = useReducer(
      reducer,
     {}
     )
  
  
({type: ACTIONS.ADD_DIGIT, payload: {digit: 1}})
return(

    <div className="calculator-grid">
        <div className="output">
            <div className="previous-operand">{formatOperand(previousOperand)} {operation} </div>
            <div className="current-operand">{formatOperand(currentOperand)} </div>
        </div>


         <button className='span-two' onClick={()=> dispatch({type: ACTIONS.CLEAR})}>AC</button>
        <button  onClick={()=> dispatch({type: ACTIONS.DELETE_DIGIT})}>DEL</button>
        <OperationDigitButton operation = "/" dispatch={dispatch}/>
        <DigitButton digit = "1" dispatch={dispatch}/>
        <DigitButton digit = "2" dispatch={dispatch}/>
        <DigitButton digit = "3" dispatch={dispatch}/>
        <OperationDigitButton operation = "*" dispatch={dispatch}/>
        <DigitButton digit = "4" dispatch={dispatch}/>
        <DigitButton digit = "5" dispatch={dispatch}/>
        <DigitButton digit = "6" dispatch={dispatch}/>
        <OperationDigitButton operation= "+" dispatch={dispatch}/>
        <DigitButton digit = "7" dispatch={dispatch}/>
        <DigitButton digit = "8" dispatch={dispatch}/>
        <DigitButton digit = "9" dispatch={dispatch}/>
        <OperationDigitButton operation= "-" dispatch={dispatch}/>
        <DigitButton digit = "." dispatch={dispatch}/>
        <DigitButton digit = "0" dispatch={dispatch}/>
        <button className='span-two'  onClick={()=> dispatch({type: ACTIONS.EVALUATE})}>=</button>

    </div>
);
  

  

}
export default App;

