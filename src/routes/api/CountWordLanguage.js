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
                let responseMessage;
                let statusCode = 200;
                switch (language) {
                    case 'en':
                        responseMessage = { wordCountEn: wordCount(text.version.en) };
                        break;
                    case 'fr':
                        responseMessage = { wordCountFr: wordCount(text.version.fr) };
                        break;
                    case 'ar':
                        responseMessage = { wordCountAr: wordCount(text.version.ar) };
                        break;
                    default:
                        responseMessage = {
                            message: 'language code not supported!',
                        };
                        statusCode = 400;
                }
                res.status(statusCode).json(responseMessage);
            })
          

    } catch (error) {
        res.status(500).json({ message: 'error has occured : ' + err });
    }
});

module.exports = router;