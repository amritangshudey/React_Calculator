import React,{useReducer} from "react";
import './App.css';

const ACTIONS = {
  ADD_DIGIT:"add-digit",
  ADD_OPERAND:"add-operand",
  CLEAR:"clear",
  DELETE:"delete",
  EVALUATE:"evaluate"
}

function evaluate(curr,prev,op)
{
  switch(op)
  {
    case '+': 
    return (parseFloat(curr)+parseFloat(prev));
    case '-': 
    return (parseFloat(prev)-parseFloat(curr));
    case '*': 
    return (parseFloat(prev)*parseFloat(curr));
    case '/': 
    return (parseFloat(prev)/parseFloat(curr));
  }
}

function reducer (state,{type,payload}){

  switch (type)
  {
    case ACTIONS.ADD_DIGIT: 

    if (state.overwrite)
    return {
      ...state,
      currentOutput:payload,
      previouOutput:null,
      overwrite:false
    }
    if (state.currentOutput === '0' && payload === '0') return state

    if (String(state.currentOutput).includes('.') && payload === '.' ) return state

    return {
        ...state,
        currentOutput:`${state.currentOutput || ""}${payload}`
    }

    case ACTIONS.ADD_OPERAND: 
    
    if (state.currentOutput === null && state.previouOutput != null && state.operand != null)
    return {
      ...state,
      operand:payload,
      currentOutput:null
    }
    else if (state.currentOutput != null && state.previouOutput != null && state.operand != null )
      return {
        ...state,
        previouOutput: evaluate(state.currentOutput,state.previouOutput,state.operand),
        operand:payload,
        currentOutput:null
      }
    else
    return {
      ...state,
      overwrite:false,
      previouOutput:state.currentOutput,
      operand:payload,
      currentOutput:null
    }

    case ACTIONS.CLEAR: return {}

    case ACTIONS.EVALUATE:

    if (state.currentOutput === null || state.previouOutput === null)
      return state
    else
      return {
        ...state,
        overwrite:true,
        currentOutput:evaluate(state.currentOutput,state.previouOutput,state.operand),
        previouOutput:null,
        operand:null
        
      }

      case ACTIONS.DELETE:
        if (state.currentOutput == null && state.operand == null && state.previouOutput == null)
          return {}
        else if (state.currentOutput == null && state.operand != null && state.previouOutput != null)
          return {
            ...state,
            currentOutput:state.previouOutput,
            previouOutput:null,
            operand:null
          }
        else
        return  {
          ...state,
            currentOutput:String(state.currentOutput).slice(0,-1)

        }
  }

}

 const App = () =>{
  const [{currentOutput,previouOutput,operand},dispatch] =useReducer(reducer,{})

 

  return (
    
      <div className="calculator-grid">
        <div className="outputbox">
          <div className="previosOutput">{previouOutput}{operand}</div>
          <div className="currentOutput">{currentOutput}</div>
        </div>
       
          <button className="span-2" onClick={()=>dispatch({type:ACTIONS.CLEAR})}>AC</button>
          <button onClick={()=>dispatch({type:ACTIONS.DELETE})}>DEL</button>
          <button onClick={()=>dispatch({type:ACTIONS.ADD_OPERAND,payload:'/'})}>/</button>
          <button onClick={()=>dispatch({type:ACTIONS.ADD_DIGIT,payload:'9'})}>9</button>
          <button onClick={()=>dispatch({type:ACTIONS.ADD_DIGIT,payload:'8'})}>8</button>
          <button onClick={()=>dispatch({type:ACTIONS.ADD_DIGIT,payload:'7'})}>7</button>
          <button onClick={()=>dispatch({type:ACTIONS.ADD_OPERAND,payload:'*'})}>*</button>
          <button onClick={()=>dispatch({type:ACTIONS.ADD_DIGIT,payload:'6'})}>6</button>
          <button onClick={()=>dispatch({type:ACTIONS.ADD_DIGIT,payload:'5'})}>5</button>
          <button onClick={()=>dispatch({type:ACTIONS.ADD_DIGIT,payload:'4'})}>4</button>
          <button onClick={()=>dispatch({type:ACTIONS.ADD_OPERAND,payload:'+'})}>+</button>
          <button onClick={()=>dispatch({type:ACTIONS.ADD_DIGIT,payload:'3'})}>3</button>
          <button onClick={()=>dispatch({type:ACTIONS.ADD_DIGIT,payload:'2'})}>2</button>
          <button onClick={()=>dispatch({type:ACTIONS.ADD_DIGIT,payload:'1'})}>1</button>
          <button onClick={()=>dispatch({type:ACTIONS.ADD_OPERAND,payload:'-'})}>-</button>
          <button onClick={()=>dispatch({type:ACTIONS.ADD_DIGIT,payload:'.'})}>.</button>
          <button onClick={()=>dispatch({type:ACTIONS.ADD_DIGIT,payload:'0'})}>0</button>
          <button className="span-2"onClick={()=>dispatch({type:ACTIONS.EVALUATE})}>=</button>
      
      </div>
    
  )
}

export default App