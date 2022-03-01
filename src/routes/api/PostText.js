const express = require('express');
const router = express.Router(); 

// @route Post
// add text to the database 
// @access Public
router.post('/', async (req, res) => {
    const text = new Text({
        Status:{
            Draft: true,
            Submited: false,
            Rejected: false,
            Approved: false,
        },
        Version:{
            en:req.body.Version.en || '',
            fr:req.body.Version.fr || '',
            ar:req.body.Version.ar || ''
        },
        text:req.body.text 
        
    });
    try {
        await text.save();
        res.status(201).send(text);
    } catch (err) {
        res.status(500).json({ message: 'error has occured : ' + err });
    }
}); 

module.exports = router;