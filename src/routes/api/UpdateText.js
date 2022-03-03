    const express = require('express');
    const router = express.Router();
    const Text = require('../../Modules/Text');
    
    // @route Put 
    // update the text
    // @access Public
    router.put('/:textId', (req, res) => {
        const textId = req.params.textId;

        Text.exists({ _id: textId })
            .then((found) => {
                if (!found) {
                    res.status(400).json({ message: "Text ID doesn't exist" });
                    return;
                }
    
                const updatedText = {
                    version: {
                        en: req.body.en || '',
                        fr: req.body.fr || '',
                        ar: req.body.ar || '',
                    },
                };
    
                Text.updateOne({ _id: textId }, { $set: updatedText }).then((text) => {
                    res.json(text);
                });
            })
            .catch((err) => {
                res.status(500).json({ message: 'error has occured : ' + err });
            });
    });
    
    module.exports = router;