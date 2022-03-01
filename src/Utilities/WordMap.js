class wordMap {
    constructor(){
        this.wordMap = new Map()
    }

    getWordCount(word){
        this.wordMap.get(word)
    }

    initWordCount(word){
        this.wordMap.set(word,1)
    }

    increamentWordCount(word){
        const wordcount = this.getWordCount(wrod); 
        this.wordMap.set(word, wordcount+1)
    }

    wordExist(word) {
		return this.wordsMap.has(word);
	}

    getMostOccurentWords() {
		// get the max value in the whole map
		const maxOccurence = Math.max(...this.wordsMap.values());

		// find all keys having that max value
		const wordsMostOccured = [];
		for (let [key, value] of this.wordsMap.entries()) {
			if (value === maxOccurence) wordsMostOccured.push(key);
		}

		return {
			count: maxOccurence,
			words: wordsMostOccured,
		};
	}

	getMostOccurentWordCount() {
		const maxValue = Math.max(...this.wordsMap.values());
		return maxValue;
	}
}

module.exports = wordMap;
