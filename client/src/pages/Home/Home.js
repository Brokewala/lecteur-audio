import React, {useState, useEffect ,useRef, useCallback, useMemo } from 'react'
import Body from '../../components/Body/Body';
import "./Home.scss";
import { useSelector } from 'react-redux';
import { getAllUser } from '../../features/users/userSlice';
import NavBar from '../../components/NavBar/NavBar';
import { HomeContext } from "../../app/AppContext"; 
import Audiofooter from '../../components/AudioFooter/AudioFooter';
import Bodyadd from '../../components/BodyAdd/BodyAdd';
import Profil from '../Profil/Profil';
import Updatemusic from '../../components/UpdateMusic/UpdateMusic';

export default function Home(props) {
  const [activeCurrent,setActiveCurrent]=useState(false);
  const [audioName,setAudioName]=useState("Play List");
  const [Homepage,setHomepage]=useState("body");
  const [indexMusic,setIndexMusic]=useState(0);
  const [audio,setAudio]=useState(null);
  const user=useSelector(getAllUser);
  const [img,setImg]=useState(null);
  const AudioRef=useRef(null)
  const album=user.album;

  // audio current 
  const AudioCurrent=useMemo(() => AudioRef.current, [AudioRef]);

  useEffect(() => {
    return () => {
      if(user._id===undefined){
        // window.location="/"
      }
    };
  }, [user]);
  
  // lire le music
  const handleSearchPlay=useCallback(
    (item)=>{
    setActiveCurrent(true)
    setAudioName(item.name)
    setAudio(item.audio)
    setImg(item.img)
    handlePlay()
  },[setAudioName,setAudio,setImg,setActiveCurrent])

  const handlePlay=useCallback(()=>{
    if(activeCurrent===true){
      if(AudioCurrent.currentTime!==null){
        console.log("yes");
        if(AudioCurrent.currentTime===AudioCurrent.duration){
          setTimeout(() => {
            handlePlayAuto()
          }, AudioCurrent.duration);
          }
      }
    }

  },[activeCurrent,AudioCurrent])


  // play automatique
  const handlePlayAuto=useCallback(() => {
    console.log("auto");
      const albumLength=album.length
          if(albumLength!==0){
            if(indexMusic===0){
              const autoIndex=albumLength+1;
              const lireMusic=album[autoIndex];
              handleSearchPlay(lireMusic)
              setIndexMusic(autoIndex);
            }else{
              const autoIndex=indexMusic+1;
              const lireMusic=album[autoIndex];
              handleSearchPlay(lireMusic)
              setIndexMusic(autoIndex)
            }
          }else{
            alert("no music in play list")
          }
    },[album,handleSearchPlay,setIndexMusic,indexMusic],)
  

  // next
  const handleNext=()=>{
    const albumLenght=album.length;
    if(album.length!==0){
      album.forEach((element,index) => {
        if(indexMusic===albumLenght-1 && index===0){
          setIndexMusic(index);
          handleSearchPlay(element)
        }else if(indexMusic!==index && index===indexMusic+1){
          handleSearchPlay(element)
          setIndexMusic(indexMusic+1)
        }
      });
    }else{
      alert("aucune music")
    }
   }

  // preve
  const handlePrev=()=>{
    const albumLength=album.length

    if(albumLength!==0){
      if(indexMusic===0){
        const preIndex=albumLength-1;
        const lireMusic=album[preIndex];
        handleSearchPlay(lireMusic)
        setIndexMusic(preIndex);
      }else{
        const preIndex=indexMusic-1;
        const lireMusic=album[preIndex];
        handleSearchPlay(lireMusic)
        setIndexMusic(preIndex)
      }
    }else{
      alert("no music in play list")
    }
  }

  // aleatoire
  const handleAleatoire=()=>{}

  // aleatoire
  const handleReboucle=()=>{}


  return (
    <HomeContext.Provider value={{
      handleSearchPlay,
      audio,
      img,
      audioName,
      handlePrev,
      handleNext,
      handleAleatoire,
      handleReboucle,
      AudioRef,
      setIndexMusic,
      setHomepage
      }}>

      <div className="Home">
        <NavBar setHomepage={setHomepage}/>
        <div className="Body" id="body">
          {Homepage==="body" &&  <Body />}
          {Homepage==="profil" &&  <Profil />}
          {Homepage==="ajoute" &&  <Bodyadd />}
          {Homepage==="update" &&  <Updatemusic />}
        </div>
       <Audiofooter audio={audio}/>
      </div>
    </HomeContext.Provider>
  )
}
