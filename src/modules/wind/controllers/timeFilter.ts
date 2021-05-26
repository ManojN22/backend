import { wind } from "../models/rawData"
import { Request, Response } from 'express';

const timeFilter = {
    post: async (req: Request, res: Response) => {
        try {
            const timeStart = new Date(req.body.from);// getting time range from body
            const timeEnd = new Date(req.body.to);
            
            await wind.aggregate([{
                $match: {
                    t: {
                        $gte: timeStart, // filtering the data
                        $lt: timeEnd
                    }
                }
            }])
                .then((data: any) => {

                    if (data.length == 0) {
                        res.status(404); // meaning there is no data 
                    }
                    res.send(data) //  it can be avoided but the frontend for loop would give error requiring another if statement 

                })
                .catch((error: any) => {
                    throw error;

                });
        }
        catch (error: any) {
            console.error(error); 
            res.status(500).send("some error");
        }

    }
}

export { timeFilter };
