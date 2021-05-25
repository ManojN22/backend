import { wind } from "../models/rawData"
import { Request, Response } from 'express';

const particleData = {
    post: async (req: Request, res: Response) => {
try{
        const device = req.body.device;

        await wind.aggregate([{
            $match: {
                device: { $in: device }
            }
        },
        {
            $sort: {
                t: 1
            }
        }, {
            $group: {
                _id: "$device",
                data: {
                    $push: {
                    p1:"$p1",
                    p25:"$p25",
                    p10:"$p10",
                    }
                }
            }
        },
        {
            $project:{
                device:"$_id",
                data:"$data"
            }
        }
    
    ])
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
        catch(error:any)
        {
            console.error(error);
            res.status(500).send("some error");
        }
    }
}

export { particleData };
