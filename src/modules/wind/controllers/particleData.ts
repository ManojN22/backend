import { wind } from "../models/rawData"
import { Request, Response } from 'express';

const particleData = {
    post: async (req: Request, res: Response) => {
        try {
            const device = req.body.device; // getting device name from body

            await wind.aggregate([{
                $match: {
                    device: { $in: device } // filtering by device name
                }
            },
            {
                $sort: {
                    t: 1             // sorting by timestamp "t"
                }
            },
            // point A               // assuming that the data of device need to grouped by its name  removing 
            {                        // from point A to point B will give you the normal results
                $group: {            
                    _id: "$device",  // grouping by device name and pushing all data
                    data: {
                        $push: {
                            p1: "$p1",
                            p25: "$p25",
                            p10: "$p10",
                        }
                    }
                }
            },
            {                       
                $project: {
                    device: "$_id",   // renaming the field "_id" to original name "device"
                    data: "$data"
                }
            }
            // point B
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
        catch (error: any) {  
            console.error(error); // handling all error
            res.status(500).send("some error");
        }
    }
}

export { particleData };
