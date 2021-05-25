import {Router} from "express";
const windRouter:Router = Router();

//generics route
import {oneData} from "./controllers/oneData"
import {particleData} from "./controllers/particleData"

const BASE_ROUTE: string =""
//generics route goes here
windRouter.get(BASE_ROUTE+"/:device", oneData.get);

windRouter.get(BASE_ROUTE+"/particle", particleData.get);

export {windRouter}
