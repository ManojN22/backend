import express ,{Application, Request, Response, NextFunction, json,urlencoded} from 'express';

import {mongooseConnection} from './mongoConfig'

import cors from 'cors';






// ROUTERS

import {windRouter} from "./modules/wind/routes"

const app : Application = express();

mongooseConnection();

app.use(json());

app.use(urlencoded({ extended: true }));

app.use(cors());

app.use("/",windRouter)

app.listen(8080,() => {console.log('server is running at http://localhost:8080/')})