import { model, Schema} from 'mongoose';


const wingSchema: Schema = new Schema({
  device: { type: String, required: true },
  t : { type : Date, default: Date.now },
  w: { type: Number, required: true },
  h: { type: String, required: true },
  p1: { type: Number, required: true },
  p25: { type: Number, required: true },
  p10: { type: Number, required: true },
});

const wind =  model("wind",wingSchema,"wind");

export {wind}
