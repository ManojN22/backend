import {wind} from "../models/rawData"
import { Request, Response} from 'express';

import moment from 'moment'


const csvToData ={
   post:async(req:Request,res:Response)=>{
       try{
        
        const data =req.file.buffer.toString('utf-8')// getting the csv in string format
     
        var jsonToBeInserted = [];
        var rows=data.split("\r")
        var eachRow;
        var column = rows[0].split(","); 
      
        rows.shift();
        var tempR="";
        for(var i in rows)
        {                                            // my own adapter for parsing the data in json format
            rows[i]=rows[i].replace(/[\"\n]/g,"");
            eachRow = rows[i].split(",");
           
            try{
            // if(Number.isNaN(Number(eachRow[3])))
            // {
            //     console.log(i,eachRow)              for checking of missing dates
            // }
            if(eachRow.length==8)        //when date is present 
            {jsonToBeInserted.push({
               
                device:eachRow[0],
               t:moment(`${eachRow[1]}T${eachRow[2]}`, 'YYYY-MM-DDTHH:mm:ss').toDate(),
               w:Number(eachRow[3]),
               h:eachRow[4],
               p1:Number(eachRow[5]),
               p25:Number(eachRow[6]),
               p10:Number(eachRow[7]),

             })}
             else if(eachRow.length==7){  // when date is not present 
                jsonToBeInserted.push({
               
                    device:eachRow[0],
                   t:Date.now(),
                   w:Number(eachRow[2]),
                   h:eachRow[3],
                   p1:Number(eachRow[4]),
                   p25:Number(eachRow[5]),
                   p10:Number(eachRow[6]),
                 })
             }
            }
            catch(error:any){
                console.log(error);

            }

        }
      await wind.insertMany(jsonToBeInserted);
      res.send("successfull");
    
 
    }

   catch(error:any)
   {
        console.error(error);
       res.status(500).send("some error");
   }
  
   }
}


export {csvToData};
