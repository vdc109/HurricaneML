import React,{ useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import Button from 'react-bootstrap/Button';
import './Home.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
//import {FileUploader} from './components/HandleFile'

function Home(this: any) {
  const [file, setFile] = useState('');
  const nav = useNavigate();

  const fileChangeHandler = (e) => {
    setFile(e.target.files[0]);
    console.log(e.target.files[0])
  }

  const UploadFile = (e) => {

    const formData = new FormData();
    formData.append('file', file) 
    axios.post("http://127.0.0.1:5000/upload", formData)
    .then((response) => {
        console.log(response.data)
        nav("/Result", {state: {filename: response.data[0], result: response.data[1]}})
    })
  }

  return (
    <div className="Home">
        <h1>HURRICANE ML</h1>
        
        <input type='file' id='up' accept='.jpg, .png, .jpeg' onChange={fileChangeHandler}></input>    
        <button id='uploadbox' className='btn w-100 btn-primary' type='submit' onClick={UploadFile}>
            <span id='label'>Upload file</span>
        </button>
        
        <span>* Accepted file type: .jpg, .png, .jpeg</span>

        
    </div>
  );

}

export default Home
