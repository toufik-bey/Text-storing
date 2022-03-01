const express = require('express'); 
const router = express.Router(); 
const Text = require('../../Modules/Text'); 





//word Count  function
function wordCount(str) { 
    return str.split(" ").length;
  }
  
  router.get('/:textId/count', async(req, res) => {
	const textId = req.params.textId;

	try {
        
         await Text.findById(textId)
            .exec((text) => {
                const wordCountAll = {
                    wordCountEn: wordCount(text.version.en),
                    wordCountFr: wordCount(text.version.fr),
                    wordCountAr: wordCount(text.version.ar),
                };
                res.json(wordCountAll);
            })
          

    } catch (error) {
        res.status(500).json({ message: 'error has occured : ' + err });
    }
});

module.exports = router;