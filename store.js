import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import axios from 'axios'
import thunkMiddleware from 'redux-thunk'

const initialState = {
  weather: {}
}

export const actionTypes = {
  REQUEST_WEATHER: 'REQUEST_WEATHER',
  RECEIVE_WEATHER: 'RECEIVE_WEATHER'
}

// ACTIONS
export const requestWeather = () => {
  return ({
    type: actionTypes.REQUEST_WEATHER
  })
}

export const receiveWeather = (json) => {
  return ({
    type: actionTypes.RECEIVE_WEATHER,
    weather: json.data
  })
}

export function fetchWeather () {
  return function (dispatch) {
    dispatch(requestWeather())

    return axios.get('https://api.coindesk.com/v1/bpi/historical/close.json').then(response => {
      dispatch(receiveWeather(response))
    }, error => console.log('An error occurred.', error))
  }
}

export function initializeStore (initialState) {
  return createStore(reducer, initialState, composeWithDevTools(applyMiddleware(thunkMiddleware)))
}

// REDUCERS
export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.REQUEST_WEATHER:
      return Object.assign({}, state, {loading: true})
    case actionTypes.RECEIVE_WEATHER:
      return Object.assign({}, state, {loading: false, weather: action.weather})
    default: return state
  }
}