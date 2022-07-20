import fs  from "fs"
import { ethers } from "ethers"


// get abis instance 

const getABI =  new ethers.utils.Interface(fs.readFileSync(`${__dirname}/../abis/uniswap.json`, `utf8`));


// check for method

const findByMethodName =  (name:  string) => {
    return ["addLiquidity", "addLiquidityETH"].includes(name);
}

export const streamData  =  async (wssURI:  string) => {
    const  provider =  new ethers.providers.WebSocketProvider(wssURI);
    provider.on("pending", async (txHash:  string) => {
        try {
            const transaction  =    await provider.getTransaction(txHash)
            // console.log(transaction);

            // checks
            if(transaction?.data.length < 75) {
                return ;
            }


            // decode the data

            const decodeData  =  getABI.parseTransaction({data:  transaction?.data});

            
            if(findByMethodName(decodeData.name) || ["0xf305d719"].includes(decodeData.sighash)) {
                console.log(decodeData);
            }

        } catch (error: any) {
            // console.log(error);
            
        }
    })
}


// export {streamData};
