import React,{ useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import Button from 'react-bootstrap/Button';
import './Home.css'
import axios from 'axios'
//import {FileUploader} from './components/HandleFile'

function Home(this: any) {
  const [file, setFile] = useState(null);
  const imagesArray = [];

  const fileChangeHandler = (e) => {
    setFile(e.target.files[0]);
    imagesArray.push(e.target.files[0]);
    console.log(file)
  }

  const UploadFile = (e) => {

    const formData = new FormData();
    formData.append("files[]", imagesArray[0])
    axios.post("http://127.0.0.1:5000/upload", formData)
    .then((response) => {
        console.log(response)
        document.querySelector("#imageForm")
    })
  }

  return (
    <div className="Home">
        <h1>HURRICANE ML</h1>

        <input type='file' id='up' accept='.jpg, .png, .jpeg' onChange={fileChangeHandler}></input>    
        <form encType="multipart/form-data" id="imageForm" onSubmit={UploadFile}>
            <button id='uploadbox' className='btn w-100 btn-primary' type='submit'>
                <span id='label'>Upload file</span>
            </button>
        </form>
        
        <span>* Accepted file type: .jpg, .png, .jpeg</span>
    </div>
  );

}

export default Home
