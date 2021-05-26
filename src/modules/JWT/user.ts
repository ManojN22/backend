import {Router, Request, Response, NextFunction} from 'express';
import jwt from "jsonwebtoken"
const userRouter:Router = Router();


const BASE_ROUTE: string =""
//generics route goes here
userRouter.post(BASE_ROUTE+"/login",(req,res)=>{
    const user={
        id:1,
        username:req.body.username,
        email:req.body.email
    };
    jwt.sign({user:user},"secretkey",(err:any,token:any)=>{
    res.json({
        token,
    })
    })


});
function verifyToken(req:any,res:Response,next:NextFunction){
const bearerHeader = req.headers['authorization']
if(typeof bearerHeader !== 'undefined')
{
    const bearerToken = bearerHeader.split(' ')[1]
     
    jwt.verify(bearerToken,"secretkey",(err:any,authData:any)=>{
        if(err){
            res.sendStatus(403)

        }
        else{
            next();
        }
    })

}
else{
    res.sendStatus(403)
}
}


export {userRouter,verifyToken}
