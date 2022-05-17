import React,{useContext, useState} from 'react';
import Search from '../Search/search';
import "./NavBar.scss";
import { getAllUser } from '../../features/users/userSlice';
import { useSelector } from 'react-redux';
import { HomeContext } from '../../app/AppContext';
import Navigates from './Navigates';


export default function NavBar({setHomepage}) {
  const { handleSearchPlay }=useContext(HomeContext);
  const [searchValue,setSearchValue]=useState(String);
  const [resultSearch,setrRsultSearch]=useState([]);
  const user=useSelector(getAllUser);
  const album=user.album;
  const noSearch=document.querySelector("#noSearch");

  const handleSearch=()=>{
    if(searchValue!==""){
      const newAlbum=[...album];
      const TrueData=[];
      newAlbum.forEach(element => {
          if (element) {
            const name=element.name.toLowerCase( )
            const rlt=name.search(searchValue.toLowerCase( ))
            if(rlt!==-1){
              TrueData.push(element)
            }else{
              if(noSearch!==null){
                setrRsultSearch([])
                noSearch.className="noSearch"
                noSearch.innerHTML="No resultat!"
              }
            }
          }
        });
        setrRsultSearch(TrueData)
    }else{
      if(noSearch!==null){
        setrRsultSearch([])
        noSearch.className="noSearch"
        noSearch.innerHTML="Empty Input!"
      }else{
        setrRsultSearch([])
      }
    }
  }

  const ChangePage=(page)=>{
    setHomepage(page)
  }

  return (
    <div className="NavBar" id="nav">
      <div className="NavBar-header">
        <h1>Broke Music</h1>
      </div>
      <Navigates ChangePage={ChangePage}/>
      <div className="search-container">
        <div className="search-Navbar">
          <Search 
            setSearchValue={setSearchValue} 
            searchValue={searchValue} 
            handleSearch={handleSearch}
            />
        </div>
        <div className="result-search">
          {
            resultSearch.length!==0?(
              <>
              {
                resultSearch.map((item,index)=>(
                  <div 
                    onClick={()=>handleSearchPlay(item)}
                    key={index} 
                    className="searchBar">
                      {item.name}
                  </div>
                ))
              }
              </>
            ):(
              <div>
                  <p id="noSearch"></p>
              </div>
            )
          }
        </div>
      </div>
    </div>
  )
}
