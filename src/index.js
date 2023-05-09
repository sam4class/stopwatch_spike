import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { combineReducers, createStore, applyMiddleware } from 'redux';

import createSagaMiddleware from 'redux-saga';
import { takeEvery, put } from 'redux-saga/effects';
import axios from 'axios';

const sagaMiddleware = createSagaMiddleware();

function* postTimerOutput(action){
  console.log('this is in our saga', action.payload)
  try{
    const timer = yield axios.post('api/time', action.payload)
    yield put({type: 'POST_TIME', payload: timer.data})
  }catch (err){
    console.log('error in POST saga', err)
  }
}

function* rootSaga(){
  console.log('inside rootSaga()')
  yield takeEvery('POST_TIME', postTimerOutput)
  
}

const store = createStore(
  combineReducers({}),
  applyMiddleware(sagaMiddleware)
)

sagaMiddleware.run(rootSaga);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
    <App />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
