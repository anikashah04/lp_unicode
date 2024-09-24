const uploadMiddlware= async(req,res,next)=>{
    try{
        if(!req.file){
            return res.status(400).send('No file Uploaded')
        }
        const allowed=['image/png', 'image/jpg', 'image/jpeg','application/pdf']
        if(!allowed.includes(req.file.mimetype)){
                //mimetype is  basically for extension like pdg,jpeg 
                return res.send(400).send('Invalid file')
        }
        if(req.file.size>1000000){
            return res.send(400).send('Invalid File size')
        }
        next()
    }catch(error)
    {
        res.status(404).send(error)
        console.log(error)
    }
}

export default uploadMiddlware