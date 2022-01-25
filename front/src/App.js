
import './App.css';
import Navbar from './Navbar';
import Section from "./Section";

import {Switch,Route} from "react-router-dom";
function App() {
  const addJoining=(title,location,skill,mode,stipend,date,duration,description)=>{
    fetch('https://cuvettebackend.herokuapp.com/Job',{
      method: "POST",
      body: JSON.stringify({title,location,skill,mode,stipend,date,duration,description}),
      headers:{
        "Content-Type": "application/json",
      },
      credentials: "include"
    }).then((r)=>{
      if(r.ok){
        return {success:true};
      }else{
        return r.json();
      }
    }).then((r)=>{
      if(r.success === true){
        console.log("Job Added Successfully");
      }else{
        console.log("Job Not Added Successfully");
      }
    });
  }
  return (
    <div className="App">
      <Navbar/>
      <Switch>
        <Route exact path="/">
        <Section addJoining={addJoining}/>
          
        </Route>
       
        
      </Switch>
      
      
    </div>
  );
}

export default App;
