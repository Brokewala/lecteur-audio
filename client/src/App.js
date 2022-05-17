import {BrowserRouter,Routes,Route } from "react-router-dom";
import React,{ useState ,useEffect } from 'react';
import { getUser } from "./Actions/user-action";
import { UidContext } from './app/AppContext';
import { useDispatch } from "react-redux";
import Bodyadd from "./components/BodyAdd/BodyAdd";
import Notfound from './components/404/NotFound';
import Auth from "./pages/Auth/Auth";
import Home from './pages/Home/Home';
import axios from "axios";
import Profil from "./pages/Profil/Profil";
import Updatemusic from "./components/UpdateMusic/UpdateMusic"

function App() {
  const [uid,setUid]=useState(null);
  const [update,setUpdate]=useState(null);
  const [ActiveUpdate,setActiveUpdate]=useState(false);
  const dispatch=useDispatch();

  useEffect(() => {
    const fetchToken=async ()=>{
      await axios({
        method:"get",
        url:"http://localhost:5000/jwtid",
        withCredentials:true
      }).then(res=>{
        setUid(res.data)
      }).catch(err=>{
        console.log("no token App");
      });

    }
    fetchToken();

    if(uid) dispatch(getUser(uid));

  }, [uid,dispatch]);

  return (
    <UidContext.Provider value={{uid,update,setUpdate,ActiveUpdate,setActiveUpdate}}>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Auth />}  />
          <Route exact path="/home" element={<Home setUpdate={setUpdate} />}  />
          <Route exact path="/profil" element={<Profil />}  />
          <Route exact path="/ajoute" element={<Bodyadd />}  />
          <Route exact path="/update" element={<Updatemusic/>}  />
          <Route exact path="*" element={<Notfound />}  />
        </Routes>
    </BrowserRouter>
    </UidContext.Provider>
  );
}

export default App;
