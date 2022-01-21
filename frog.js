import "./css/styles.css";
import { render } from "react-dom";
import {
  useParams
} from "react-router-dom"
import { useEffect, useState } from "react";


export function FrogInfo() {

  const [frog, setFrog] = useState([])

  let { frogId } = useParams();

 const [frogName, updateFrogName] = useState(frog.name);
 const [frogBody, updateFrogBody] = useState(frog.body);
 const [frogAuthor, updateFrogAuthor] = useState(frog.author);
  //GET request

  const myHeadersGET = new Headers();
  myHeadersGET.append('Accept', 'application/json');

  const myInitGET = {
  	method: 'GET',
  	headers: myHeadersGET
  };
  
  const loadJSON = () => fetch(`http://145.24.222.48:8080/api/frogs/${frogId}`, myInitGET)
  	.then(response => response.json())
  	.then(data => updateFrog(data))
  	.catch(err => console.log(err))

 function updateFrog(frog){
   setFrog(frog)
 }

 //put request

 const myHeadersPUT = new Headers();
 myHeadersPUT.append('Accept', 'application/json');
 myHeadersPUT.append('Content-Type', 'application/json')


const updateJSON = () => {
     const myInitPUT = {
         method: 'PUT',
         headers: myHeadersPUT,
         body: JSON.stringify({name : `${frogName}`, body : `${frogBody}`, author: `${frogAuthor}`})
     };
   console.log(myInitPUT)
   fetch(`http://145.24.222.48:8080/api/frogs/${frogId}`, myInitPUT)
     .then(response => console.log(response))
     .then(() => console.log("UPDATED"))
     .catch(err => console.log(err))
 }

  useEffect(() => { loadJSON(), []})

  return (
    <div>

    <div className="frog-article">
      <h1>{frog.name}</h1>
      <h3>{frog.author}</h3>
      <p>{frog.body}</p>
    </div>

    <div className="update-form">
      <h3>Update this article?</h3>
    <label>Frog </label>
    <input placeholder={frog.name} onChange={(e) => updateFrogName(e.target.value)}  value={frogName}/>
    <label>Description </label>
    <textarea placeholder={frog.body} onChange={(e) => updateFrogBody(e.target.value)} value={frogBody}/>

    <label>Author </label>
    <input placeholder={frog.author} onChange={(e) => updateFrogAuthor(e.target.value) } value={frogAuthor} />
    <button onClick={() => updateJSON()}>Submit</button>
    </div>

    </div>
  );
}
