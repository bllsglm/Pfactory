import React from 'react';
import ReactDOM from "react-dom/client";
import { createBrowserRouter, createRoutesFromElements , Route, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import store  from './store';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './index.css';
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import GoalForm from './components/GoalForm';

const router = createBrowserRouter(createRoutesFromElements(
  <Route path='/' element={<App/>}>
    <Route index={true} path='/' element={<Dashboard/>}/>
    <Route path='/register' element={<Register/>}/>
    <Route path='/login' element={<Login/>}/>
    <Route path='/search/:keyword' element={<GoalForm/>}/>

  </Route>
));

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
