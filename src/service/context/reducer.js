


export const reducer = (state, action) => {
  switch (action.type) {
    case "LOADING":
      return {
        ...state,
        loading: action.loading
      }
    case "DATA_USER":
      return {
        ...state,
        data_user: action.data_user
      }
    case "SELECTED_COMPANY":
      return {
        ...state,
        selected_company : action.selected_company
      }
    case "SET_DOOH_VARIANT":
      return {
        ...state,
        variant_dooh : action.variant_dooh
      }
    case "SET_PRODUCT_ID":
      return {
        ...state,
        product_id : action.product_id
      }
    case "SET_DATA_INPUT_TVC":
      return {
        ...state,
        data_input_tvc : action.data_input_tvc
      }
    case "SET_CURRENT_CAMPAIGN":
      return {
        ...state,
        current_campaign : action.current_campaign
      }
    case "SET_CONTENT":
      return {
        ...state,
        content : action.content
      }
    case "SET_DATA_EVENT":
      return {
        ...state,
        data_event : action.data
      }
    default:
      break;
  }
}