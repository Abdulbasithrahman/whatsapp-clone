import Image from "next/image";
import React, { useEffect, useState } from "react";
import {FaCamera} from 'react-icons/fa'
import ContextMenu from "./ContextMenu";
import PhotoPicker from "./PhotoPicker";
import PhotoLibrary from "./PhotoLibrary";
import CapturePhoto from "./CapturePhoto";

function Avatar({type,image,setImage}) {
  const[hover,setHover] = useState(false)
  const[isContextMenuVisible,setIsContextMenuVisible] = useState(false)
  const[contextMenuCordinate, setContextMenuCordinates] = useState({
    x:0,
    y:0
  })

  const[grabPhoto,setGrabPhoto] = useState(false)
  const[showPhotoLibrary,setShowPhotoLibrary] = useState(false)
  const[showCapturePhoto,setShowCapturePhoto] = useState(false)

  const showContextMenu = (e)=>{
    e.preventDefault();
    
    setContextMenuCordinates({x: e.pageX, y: e.pageY})
    setIsContextMenuVisible(true)
  }

  useEffect(()=>{
    if(grabPhoto){
      const data = document.getElementById('photo-picker')
      data.click()
      document.body.onfocus = (e)=>{
        setTimeout(() => {
          setGrabPhoto(false)
        },1000);
      }
    }
  },[grabPhoto])

  const contextMenuOptions = [
    {name:"Take Photo",callback:() => {
      setShowCapturePhoto(true)
    }},
    {name:"Choose From Library",callback:() => {
       setShowPhotoLibrary(true)
    }},
    {name:"Upload photo",callback:() => {
      setGrabPhoto(true)
    }},
    {name:"Remove Photo",callback:() => {
      setImage("/default_avatar.png")
    }}
  ]

  const photoPickerChange = (e)=>{
    const file = e.target.files[0];
    const reader = new FileReader();
    const data = document.createElement("img")
    reader.onload = function (e){
      data.src = e.target.result;
      data.setAttribute("data-src",e.target.result)
    };
    reader.readAsDataURL(file);
    setTimeout(() => {
      setImage(data.src)
    }, 500);
  }

  return <>
    <div className="flex items-center justify-center">
      {
        type ==="sm" && (
          <div className="relative w-10 h-10">
           <Image src={image} alt="avatar" className="rounded-full" fill/>
         </div>
      )}
      {
        type ==="lg" && (
          <div className="relative w-14 h-14">
           <Image src={image} alt="avatar" className="rounded-full" fill/>
         </div>
      )}
      {
        type ==="xl" && (
          <div className="relative cursor-pointer z-0"
          onMouseEnter={()=>setHover(true)}
          onMouseLeave={()=>setHover(false)}
          >
            <div id="context-opener" className={`z-10 h-60 w-60 bg-photopicker-overlay-background absolute top-0 left-0 flex items-center rounded-full justify-center flex-col text-center gap-2
            ${hover ? "visible" : "hidden"}
            `}
            onClick={(e)=>showContextMenu(e)}
            >
              <FaCamera className='text-2xl' id="context-opener" onClick={(e)=>showContextMenu(e)}/>
              <span id="context-opener" onClick={(e)=>showContextMenu(e)} >Change <br/> profile <br /> photo</span>
            </div>
            <div className="flex items-center justify-center w-60 h-60">
           <Image src={image} alt="avatar" className="rounded-full" fill/>
           </div>
         </div>
      )}
    </div>
    {isContextMenuVisible && (
      <ContextMenu
         options={contextMenuOptions}
         cordinates={contextMenuCordinate}
         contextMenu={isContextMenuVisible}
         setContextMenu={setIsContextMenuVisible}
      />
    )}
    {showCapturePhoto && <CapturePhoto setImage={setImage} hide= {setShowCapturePhoto} />}
    {showPhotoLibrary && <PhotoLibrary setImage={setImage} hidePhotoLibrary={setShowPhotoLibrary} />}
    {grabPhoto && <PhotoPicker onChange={photoPickerChange} />}
  </>;
}

export default Avatar;
