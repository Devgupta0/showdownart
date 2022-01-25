import React,{useState,useEffect} from "react";
import "./App.css";




function Section(props){
   
    const [show1,setShow1] = useState('block');
    const [show2,setShow2] = useState('none');
    
   
    const [formValues, setFormValues] = useState([{ email: "", username: "",fullname:"" }]);

    let handleChange = (i, e) => {
       
            let newFormValues = [...formValues];
        
            newFormValues[i][e.target.name] = e.target.value;
            
            setFormValues(newFormValues);

        
    };

    let addFormFields = () => {
        setFormValues([...formValues, {email: "", username: "",fullname:""  }]);
    };

    let removeFormFields = (i) => {
        let newFormValues = [...formValues];
        newFormValues.splice(i, 1);
        setFormValues(newFormValues);
    };

    let handleSubmit = async (event) => {
        event.preventDefault();
        
        for(let i=0;i<formValues.length;i++){
            var Email = formValues[i].email;
            var UserName = formValues[i].username;
            var FullName = formValues[i].fullname;
            await fetch("https://showdownart-backend.herokuapp.com/showdownuser", {
            method: "POST",
            body: JSON.stringify({Email,UserName,FullName}),
            headers:{
              "Content-Type": "application/json",
            },
            credentials:"include"})
            .then((r)=>r.json())
            .then((arr)=>{
                
                if(arr.msg === "Success"){
                    setShow1("block")
                    setShow2("none")
                    setFormValues([{ email: "", username: "",fullname:"" }])
                
                }else{
                    setShow1("none")
                    setShow2("block")
                }
                
                
            }
            )
        }
    };
    

    const [list,setList] = useState([]);
    
    
    useEffect(() =>{
      
        return fetch("https://showdownart-backend.herokuapp.com/getshowdownuser", {credentials:"include"})
        .then((r)=>r.json())
        .then((arr)=>{
            
            if(arr.msg === "success" && arr.result.length>0){
                setList(arr.result);
            
            }else{
                setShow1("none")
                setShow2("block")
            }
            
            
        }
        )
    },[list]); 
    
    return (
        <>
            {/* Form 1 Code Start From Here */}
            <div className="section1 table-wrapper-scroll-y my-custom-scrollbar" style={{display:show2}}>
                <div className="container con" >
                <form onSubmit={handleSubmit}>
                    {formValues.map((element, index) => (
                        <div className="form-inline" key={index}>
                        <label>Email</label>
                        <input
                            type="email"
                            name="email"
                            value={element.email || ""}
                            onChange={(e) => handleChange(index, e)}
                        />
                        <label>User Name</label>
                        <input
                            type="text"
                            name="username"
                            value={element.username || ""}
                            onChange={(e) => handleChange(index, e)}
                        />
                         <label>Full Name</label>
                        <input
                            type="text"
                            name="fullname"
                            value={element.fullname || ""}
                            onChange={(e) => handleChange(index, e)}
                        />
                        {index ? (
                            <button
                            type="button"
                            className="button1 remove"
                            onClick={() => removeFormFields(index)}
                            >
                            Remove
                            </button>
                        ) : null}
                        </div>
                    ))}
                    <div className="button-section">
                        
                        <button className="button submit"   type="submit">
                        Submit
                        </button>
                        <button
                        style={{float:"right"}}
                        className="button add"
                        type="button"
                        onClick={() => addFormFields()}
                        >
                        Add More +
                        </button>
                    </div>
                    </form>
                </div>
               
            </div>

            {/* Form 1 Code End Here */}

            

            {/* My User Listing Code Start From Here  */}

            <div className="section" style={{display:show1}} >
                
               <button type="button" className="button3" onClick={()=>{setShow1("none");setShow2("block")}}>Add User</button>
                <div className="table table-wrapper-scroll-y my-custom-scrollbar">
                <table className="table">
                        <thead>
                            <tr>
                                <th>Sr.no</th>
                                <th>Email</th>
                                <th>User Name</th>
                                <th>Full Name</th>
                            </tr>
                        </thead>
                        <tbody>
                        {list.length>0 && list.map((val,i)=>(
                            
                        <tr key ={val._id} style={{paddingBottom:"-50px"}}> 
                            <th scope="row">{i+1}</th>
                            <td>{val.Email}</td>
                            <td>{val.UserName}</td>
                            <td>{val.FullName}</td>
                             </tr>
                        ))}
                        
                        
                        </tbody>
                    </table>

                </div>
            </div>
            {/*  My User Listing Code End Here */}

             
        </>
    );
}
export default Section;