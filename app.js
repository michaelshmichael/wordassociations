const searchButton = document.getElementById('inputDivSearchButton')
searchButton.addEventListener('click', setAssociations)
const userInput = document.getElementById('inputDivUserInput')
userInput.addEventListener('keypress', (e) => {
    if (e.keyCode == 13) {
        setAssociations()
    }
});

class synonym {
    constructor(meaning, partOfSpeech, weight){
        this.meaning = meaning
        this.partOfSpeech = partOfSpeech;
        this.weight = weight;
    }
}

async function _getAssociations () {
    let userInput = document.getElementById('inputDivUserInput').value
    try {
        console.log('go')
        let data = await fetch(`https://api.wordassociations.net/associations/v1.0/json/search?apikey=5b4acb51-a76e-4d05-9349-8044794dea94&text=${userInput}&lang=ru&limit=10`, {mode: 'cors'})
        let words = await data.json()
        return words
    } catch {
        console.log('error')
    }
}

async function setAssociations () {
    let newResult = new synonym
    let data = await _getAssociations()
    let array = []

    newResult.meaning = data.response[0].items[0].item
    newResult.partOfSpeech = data.response[0].items[0].pos
    newResult.weight = data.response[0].items[0].weight
    
    array.push(newResult)

    console.log(data)
    console.log(array)
}
