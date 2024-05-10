import Header from "./components/Header";
import { Outlet } from "react-router-dom";
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <div className="container">
        <Header/>
        <Outlet/>
      </div>
      <ToastContainer/>
    </>
  );
}

export default App;
