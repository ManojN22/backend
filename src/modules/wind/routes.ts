import {Router} from "express";
import multer  from "multer";
const windRouter:Router = Router();

var upload = multer();

//generics route
import {oneData} from "./controllers/oneData"

import {particleData} from "./controllers/particleData"

import {timeFilter} from "./controllers/timeFilter"

import {csvToData} from "./controllers/csvToData"

const BASE_ROUTE: string =""
//generics route goes here
windRouter.get(BASE_ROUTE+"/:device", oneData.get);

windRouter.post(BASE_ROUTE+"/particle", particleData.post);

windRouter.post(BASE_ROUTE+"/time", timeFilter.post);

// windRouter.post(BASE_ROUTE+"/csv-input", csvToData.post);

windRouter.post('/handleFile',upload.single('uploadCsv'),csvToData.post);


export {windRouter}
