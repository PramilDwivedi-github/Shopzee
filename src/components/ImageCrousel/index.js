import * as React from 'react';
import "./style.css"
import RemoveIcon from '@mui/icons-material/Remove';
import { red } from '@mui/material/colors';
// import ImageList from '@mui/material/ImageList';
// import ImageListItem from '@mui/material/ImageListItem';

const defaultActiveSlideIndex = 1;

export default function ImageCrousal({images,onImageDelete,dynamicUrlKey}) {

  const [activeSlideIndex,setActiveSlideIndex] = React.useState(defaultActiveSlideIndex);


  const getClasses = (index)=>{
    return index + 1 === activeSlideIndex ? "slide active fade" : "slide fade";
  }


  const handlePrevClick = ()=>{
    setActiveSlideIndex(prevIndex=> prevIndex - 1 < defaultActiveSlideIndex ? images.length : prevIndex - 1 );
  }

  const handleNextClick = ()=>{
    setActiveSlideIndex(prevIndex=> prevIndex + 1 > images.length ? defaultActiveSlideIndex : prevIndex + 1 );
  }




  return (
    <div className="crousel-container">

      {
        images && images.map((image,index)=>{
          return <div  className={getClasses(index)} key={index}>
            <img
              src={dynamicUrlKey ? image[dynamicUrlKey] :image.url}
              // src={URL.createObjectURL(image.content)}
              width={"75%"}
              height={"100%"}
              style={{objectFit:"contain"}}
              alt={image.title}
            />
            {onImageDelete && <div className='deleteIcon' onClick={()=>onImageDelete(image,index)}><RemoveIcon  sx={{color:red[400]}}/></div>}
          </div>
        })        
      }

  {images.length > 1? <><span class="prev"  onClick={handlePrevClick}>&#10094;</span>
  <span class="next"  onClick={handleNextClick}>&#10095;</span></>:null}
      
  </div>
  );
}

