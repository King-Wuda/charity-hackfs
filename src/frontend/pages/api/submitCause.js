import { Web3Storage } from 'web3.storage'
const web3Storage = new Web3Storage({ token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweEZBQzlEOTU1MTlkNDNEODI4QjNFOUM4YzcyYWNGMTAwMzZDQmI2NzIiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NTg1NzM5MDI4MzMsIm5hbWUiOiJyYXplbW9uZXkifQ.-t2MaQWF0WEh711BGU8Z9Cx7s5rTYw7B1Ho4Xg9iANQ' })

function handler(req,res){
    // extract data from incoming request
    const {name,description,amountRequired,files} = JSON.parse(req.body);

    web3Storage.put(files)
    .then(res=>console.log(res))
    .catch(err=>console.log(err))

    res.status(200).json({message:name})
}

export default handler;