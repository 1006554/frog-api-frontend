import "./css/styles.css";
import { render } from "react-dom";
import {
    BrowserRouter,
    Routes,
    Route,
    Link
} from "react-router-dom"
import { Button, Form, TextArea } from 'semantic-ui-react'
import React, { useEffect, useState } from "react";

export function Create(){


    const [frogName, setFrogName] = useState('');
    const [frogBody, setFrogBody] = useState('');
    const [frogAuthor, setFrogAuthor] = useState('');

    const myHeadersPOST = new Headers();
    myHeadersPOST.append('Accept', 'application/json');
    myHeadersPOST.append('Content-Type', 'application/json')

  
  const sendJSON = () => {
        const myInitPOST = {
            method: 'POST',
            headers: myHeadersPOST,
            body: JSON.stringify({name : `${frogName}`, body : `${frogBody}`, author: `${frogAuthor}`})
        };
      console.log(myInitPOST)
      fetch("http://145.24.222.48:8080/api/frogs/", myInitPOST)
      	.then(response => console.log(response))
    	.then(() => console.log("POST WORKED"))
   	    .catch(err => console.log(err))
    }

       return (
          
        <div className="create-form">
            <h2>Create a new frog for this list?</h2>
            
            <label>Frog </label>
            <input placeholder='name' onChange={(e) => setFrogName(e.target.value)}  value={frogName}/>
     
            <label>Description </label>
            <textarea placeholder='description' onChange={(e) => setFrogBody(e.target.value)} value={frogBody}/>
    
            <label>Author </label>
            <input placeholder='author' onChange={(e) => setFrogAuthor(e.target.value) } value={frogAuthor}/>

        <button onClick={() => sendJSON()}>Submit</button>
     </div>
       )
}