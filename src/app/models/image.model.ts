import { ObjectId } from "mongoose";

export class Image{
    _id !: ObjectId ;
    image !: Buffer;
}