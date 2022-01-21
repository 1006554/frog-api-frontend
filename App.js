import './css/styles.css';
import { render } from "react-dom";
import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from "react-router-dom";
import { FrogInfo } from "./frog.js";
import { Create } from "./Create"
import { useEffect, useState } from "react";

export function App() {

  const [frogs, setFrogs] = useState([])
  const [page, setPage] = useState(0);

  //GET request

  const myHeadersGET = new Headers();
  myHeadersGET.append('Accept', 'application/json');

  const myInitGET = {
  	method: 'GET',
  	headers: myHeadersGET
  };
  
  const loadJSON = () => fetch(`http://145.24.222.48:8080/api/frogs/`, myInitGET)
  	.then(response => response.json())
  	.then(data => setFrogs(data.items))
  	.catch(err => console.log(err))

      //Delete request
      const myHeadersDELETE = new Headers();
      myHeadersDELETE.append('Accept', 'application/json');

      const myInitDELETE = {
      method: 'DELETE',
      headers: myHeadersDELETE
    };

    const deleteFrog = (uri) => fetch(uri, myInitDELETE)
    .then(response => { loadJSON() })
    .catch(err => console.log(err))

     const components = frogs.map((frog, index) => {
      return (
    
         
         <li key={index}>
          <h2><Link to={`/detail/${frog._id}`}>{frog.name}</Link></h2>
          <button>Update</button>
          <button onClick={() => deleteFrog(frog._links.self.href)}>Delete</button>
        </li>
      )
  });

  const footer = () => {
    return(
      <div>
         <h3>Page {page}</h3>
            <button onClick={() => setPage(page - 1)}>Previous page</button>
            <button onClick={() => setPage(page + 1)}>Next page</button> 
            <br></br> 
            <img src='https://web.archive.org/web/20091019134830/http://mx.geocities.com/karim_sol93/images/frog_croaking_md_clr.gif' alt="Hop frog"></img>
      </div>
     ) 
  }


useEffect(() => loadJSON(), [])


  return (
    <BrowserRouter>
      <div className="App">
        <img src="https://web.archive.org/web/20091027143603/http://geocities.com/Colosseum/Base/6364/frog.gif" alt="frog"></img>
        <h1><Link to={''}>Frog Api 🐸</Link></h1>
         <Routes>
            <Route path="" element={<Create/>}></Route>
          <Route path="detail/:frogId" element={<FrogInfo/>} ></Route>
        </Routes>
        {components}
        {footer()}
     </div>
    </BrowserRouter>
  );
}
