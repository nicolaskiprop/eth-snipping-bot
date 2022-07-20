import dotenv from 'dotenv'
import { streamData } from './streaming';

//get variables
dotenv.config()

const start = async()=> {
    ///check for variables
    if(!process.env.WSS_URI) {
        throw new Error('please provide node in the .env file')
    }
    await streamData(process.env.WSS_URI!);
}

start();