import * types from './actionTypes';

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.UPDATE_BASIC_INFO: {
      return {
        ...state,
        [field.name]: field.value
      };
    }
    default:
      return state;
  }
};
