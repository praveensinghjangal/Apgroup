import React from 'react';
import { useEffect, useState } from 'react'
import {Link} from "react-router-dom"
import axios from "axios"




const Company = () => {
  const[allcompany, setallcompany] = useState([])
  const token = localStorage.getItem('token')


  const companyData = async()=>{
    try{
      const res =  await axios.get("http://localhost:3000/getallcompany",{ headers: { 'x-api-key': token } })
      let companydata = res.data.data;
       setallcompany([...companydata])
    }
    catch(err){
      alert(err.response.data.message)
    }
  }

        useEffect(() =>{
          companyData()
        },[])   


  return (

    <div>
      <h1>Company</h1>

      {allcompany.map(ele =>
        <Link>
        <h2>{ele.Name}</h2>
        <h3>{ele.website}</h3>
        <h4>{ele.email}</h4>
        </Link>
    )}
    </div>
  )
}

export default Company