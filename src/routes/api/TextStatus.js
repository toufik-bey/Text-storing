
const express = require('express');
const router = express.Router();
const Text = require('../../Modules/Text');

// @route Post
// submmit the text 
// @access Public

router.put('/:textId', async (req, res) => {
    try {
         const text = await Text.findById(req.params.textId);

         // if the text don't exist 
         if(!text){
             return res.status(404).json({message: 'text not found'});
         }
        
         // if the text is a draft and submited
         if(text.Status.Draft === true){
           if(req.body.status.submited ===true){
               text.Status.Submited = true;
               text.Status.Draft = false;
               await text.save();
               res.status(200).json(text);
           }
         }; 

        
            // if the text is a submited and approved
          if(text.Status.Submited === true){
                if(req.body.status.approved ===true){
                    text.Status.Approved = true;
                    text.Status.Submited = false;
                    text.Status.Rejected = false;
                    await text.save();
                    res.status(200).json(text);
                }else if (req.body.status.rejected ===true){
                    text.Status.Rejected = true;
                    text.Status.Submited = true;
                    text.Status.Approved = false;
                    await text.save();
                    res.status(200).json(text);
                } 
                     }
            }


     catch (error) {
        res.status(500).json({ message: 'error has occured : ' + error });
    }
        

});

module.exports = router; 