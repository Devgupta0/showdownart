var express = require("express");
var cors = require("cors");
var dbutil = require("./connection");

var user = require("./models/user");

const app = express();
app.use(express.json());
app.use(cors({
    credentials: true,
    origin: "https://showdownart.herokuapp.com"
}));
app.set('trust proxy',1);


app.get("/showdown",async function(req,res){
    res.send({msg:"working"})
})

app.get("/getshowdownuser",async function(req,res){
    await user.find({}).then((result)=>{
        if(result){
            res.send({msg:"success",result})
        }else{
            res.send({msg:"Failed"})
        }
    })
})

app.post("/showdownuser",async function(req,res){
    var Email = req.body.Email;
    var UserName = req.body.UserName;
    var FullName = req.body.FullName;
    await user.findOneAndUpdate({Email:Email},{$set:{UserName:UserName,FullName:FullName}}).then((result)=>{
        if(result){
            res.send({msg:"Success",result})
        }else{
            new user({
                Email:Email,
                UserName:UserName,
                FullName:FullName
            }).save(function(err,data){
                if(err){
                    res.send({msg:"Failed"})
                }else{
                    res.send({msg:"Success",data})
                }
            })
        }
    })

})



const port =  process.env.PORT||8080;



dbutil.connectToServer(function(err){
    if(err){
        console.log("Mongo db error " + err);
    }else{
        
        app.listen(port,()=>{
            console.log(`Server started on port ${port}`);
        });
        
    }
})