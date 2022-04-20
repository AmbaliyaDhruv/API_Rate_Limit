
const express=require("express");
const port=process.env.PORT || 3050;
const app=express();
const cors=require("cors");
app.use(express.json());
app.use(cors({origin:"*"}));
 
let arr={}


app.get("/api",(req,res)=>{
    const ip=req.ip
    // first request timer is set to 10sec in this 10 sec only make 10request from same ip
     if(arr[ip]==undefined){
         arr[ip]=1;
         arr["status"+ip]=true;
        setTimeout(()=>{
        
             delete arr["status"+ip];
            delete arr[ip];
         },10000);
    
     }
     else{
        if(arr[ip]>=10 && arr["status"+ip]===true){
         return res.send("You have exceeded the limit");
        }
         arr[ip]=arr[ip]+1;
       
     }
    
    return res.send(`success  ${arr[ip]}`);
})

app.listen(port,()=>{
    console.log(`http://localhost:${port}`)
})