const express = require('express'); 
const router = express.Router();
const Text = require('../../Modules/Text'); 


//@route Get  
//Get the text to a certain limite and pages 
//Public 

router.get('/',async(req,res)=>{

    const count= await Text.countDocuments(); 
    try {

        const {page,limit}=req.query;
        if(!page){
            page=1;
        }
        if(!limit){
            limit=count;
        }; 

        const size = parseInt(limit);
        const pageSize = parseInt(page);
        // the pages to skip 
        const skip = (pageSize - 1) * size;
        // show only  the text between the page and the limit
        await Text.find().limit(size).skip(skip); 
        
    } catch (error) {
        res.status(500).json({ message: 'error has occured : ' + err });
    }
}); 

module.exports = router; 