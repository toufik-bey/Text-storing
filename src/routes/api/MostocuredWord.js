const wordMap = require('../../Utilities/WordMap'); 
const express = require('express'); 
const router = express.Router(); 
const Text = require('../../Modules/Text'); 
const { populate } = require('../../Modules/Text');
let JsLingua = require('jslingua');

//@rout GET 
//get the most occured in the DB 
//Public

router.get('/', async(req,res)=>{
     try {
         await Text.find.exec((texts)=>{
             const mostOccuredWrold = getMostoccuredWorldDB(texts); 
             res.send(mostOccuredWrold); 
         })
     } catch (error) {
         res.status(500).json({message : 'error has occured'+ error})
     }
})

module.exports = router; 

function getMostoccuredWorldDB(texts) {

    const EngWordsMap = new wordMap(); 
    const FraWordsMap = new wordMap(); 
    const ArabWordsMap = new wordMap(); 

   

    texts.forEach((text) => {
		populateEngWordsMap(text, EngWordsMap);
		populateFraWordsMap(text, FraWordsMap);
		populateAraWordsMap(text, ArabWordsMap);
	});

	const topWordsLanguages = {
		mostOccurrentEnglishWords: EngWordsMap.getMostOccurentWords(),
		mostOccurrentFrenchWords: FraWordsMap.getMostOccurentWords(),
		mostOccurrentArabicWords: ArabWordsMap.getMostOccurentWords(),
	};

	const maxOccurenceInDatabaseCount = Math.max(
		EngWordsMap.getMostOccurentWordCount(),
		FraWordsMap.getMostOccurentWordCount(),
		ArabWordsMap.getMostOccurentWordCount()
	);

	let mostOccurentWordsInDatabase = getMostOccurentWordsFromTopWordsLanguages(
		topWordsLanguages,
		maxOccurenceInDatabaseCount
	);

	return mostOccurentWordsInDatabase;

}
function populateEngWordsMap(text, EngWordsMap) {
	const englishTextLowerCased = text.version.en.toLowerCase();

	
	const getEnglishWords = gwords(englishTextLowerCased);

	
    getEnglishWords.forEach((word) => {
		if (EngWordsMap.wordExist(word)) EngWordsMap.incrementWordCount(word);
		else EngWordsMap.initWordCount(word);
	});
}
function populateFraWordsMap(text, FraWordsMap) {
	const FrenchTextLowerCased = text.version.fr.toLowerCase();
    
	
	const getFrenchhWords = gwords(FrenchTextLowerCased);

	
    getFrenchhWords.forEach((word) => {
		if (FraWordsMap.wordExist(word)) FraWordsMap.incrementWordCount(word);
		else FraWordsMap.initWordCount(word);
	});
}
function populateFraWordsMap(text, ArabWordsMap) {
	const ArabTextLowerCased = text.version.ar.toLowerCase();
    
	
	const getArabhWords = gwords(ArabTextLowerCased);

	
    getArabhWords.forEach((word) => {
		if (ArabWordsMap.wordExist(word)) ArabWordsMap.incrementWordCount(word);
		else ArabWordsMap.initWordCount(word);
	});
}
function getMostOccurentWordsFromTopWordsLanguages(
	topWordsLanguages,
	maxOccurenceInDatabaseCount
) {
	let mostOccurentWordsInDatabase = [];

	for (const language in topWordsLanguages) {
		if (topWordsLanguages[language].count === maxOccurenceInDatabaseCount)
			mostOccurentWordsInDatabase.push({
				[language]: topWordsLanguages[language].words,
			});
	}

	return mostOccurentWordsInDatabase;
}
