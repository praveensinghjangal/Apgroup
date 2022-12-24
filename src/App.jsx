import React, {useState} from 'react'
import Login from './login'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import Company from './company'



function App() {
 
  return (
  <div> 
<Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Company" element={<Company />} />
        </Routes>
        </Router>

  </div>
  )
}

export default App
