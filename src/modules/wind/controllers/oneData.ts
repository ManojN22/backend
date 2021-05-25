 import {wind} from "../models/rawData"
 import {Request, Response} from 'express';

const oneData ={
    get:async(req:Request,res:Response)=>{
        
        const device : string = req.params.device;

        await wind.find({
            device:device // filtering using device name to get all data of the specific device
        })
        .then((data:any)=>{
            
          if(data.length==0){
              res.status(404); // meaning there is no data 
          }
          res.send(data) //  it can be avoided but the frontend for loop would give error requiring another if statement 
        
        })
        .catch((error:any)=>{
            console.error(error);
            res.status(500).send("some error");
        });
   
    }
}

export {oneData};
 