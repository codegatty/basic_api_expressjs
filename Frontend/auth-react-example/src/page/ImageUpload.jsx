import { useState,useEffect } from "react"
import axios from "axios"

function ImageUpload() {
const [image,setImage]=useState();
const [upImages,setUpImages]=useState([]);

function changeHandler(e){
  console.log(e.target.files[0])
  setImage(e.target.files[0])
}

useEffect(()=>{
 async  function getImage(){
    try{
      const response = await axios.get("http://localhost:5000/api/image")
      
       setUpImages(response.data)
       console.log(upImages)

      }catch(e){
        console.log(e)
      }
  }
  getImage()

},[upImages])

async function submitHandler(e){
  e.preventDefault();
  console.log(image)

  const finalData=new FormData();
  finalData.append("image",image)

  try{
    const response = await axios.post("http://localhost:5000/api/image",finalData)
    console.log(response.data)

  }catch(e){
    console.log(e)
  }
  
}
  return (
    <div>
      <form onSubmit={submitHandler} encType="multipart/form-data">
        <div className='m-10 p-10 border border-md'> 
        <input type="file" accept='image/*'  onChange={changeHandler}/>
        <button className='bg-red-400 p-3 hover:bg-red-600 text-white font-bold'>Submit</button>
        </div>
      </form>
      {
        // upImages.map((ele,index)=>{
        //   return(
        //     <img src={`http://localhost:5000/uploads/${ele.image}`} alt="image" key={index}/>
        //   )
        // })
      
      }
    </div>
  )
}

export default ImageUpload
