import React, { useReducer, createContext } from "react";
import { reducer } from "./reducer";



export const Context = createContext();

const initialState = {
  loading: false,
  data_user: "",
  selected_company:{},
  variant_dooh:"",
  product_id:null,
  data_input_tvc:null,
  current_campaign:{},
  content:{},
  data_event:null
}


const Provider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, { ...initialState })


  return (
    <Context.Provider value={{ ...state, dispatch }}>
      {children}
    </Context.Provider>
  )
}

export default Provider