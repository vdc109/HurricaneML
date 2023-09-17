import React,{ useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import Button from 'react-bootstrap/Button';
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Result from './pages/Result';
//import {FileUploader} from './components/HandleFile'

function App() {
  return (
    <div>
        <BrowserRouter>
            <Routes>
              <Route index element={<Home/>}/>
              <Route path='/result' element={<Result/>}/>
            </Routes>
        </BrowserRouter>
    </div>
  )
}

export default App
