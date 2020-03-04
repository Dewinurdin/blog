export default (state=[], action) => {
  switch (action.type){
    case 'FETCH_USER':
    // in state array, create another array from action.payload
      return [...state, action.payload];
    default: 
      return state;
  }
};