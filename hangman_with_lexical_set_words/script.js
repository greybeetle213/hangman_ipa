firstRound = true // makes the game run extra lines to start with
function init(){ // run when the body loads
    // the variables in this area can be edited to change certain aspects of the game:
    // if (window.innerHeight < window.innerWidth){
    //     multiplier = window.innerHeight*0.6
    // }else{
    //     multiplier = window.innerWidth*0.8
    // }
    document.getElementById("vowelCanvas").width = window.innerWidth*0.32 // size the canvas based on the size of the window
    document.getElementById("vowelCanvas").height = window.innerWidth*0.25 // size the canvas based on the size of the window
    vowelCanvas = document.getElementById("vowelCanvas")
    ctxvowels = document.getElementById("vowelCanvas").getContext("2d") // get the context of the canvas
    canvasScaleVowels = document.getElementById("vowelCanvas").width/130 // create a unit equal to 1/100 of the canvas
    ctxvowels.font = Math.round(canvasScaleVowels*5)+"px Georgia"
    vowels = new Image()
    vowels.src = "../New_Zealand_English_monophthong_chart.png"
    vowelText = [["ʉː", "u", 41, 10],["e", "E", 31, 23], ["ɵː","3",53,34], ["ʊ", "U", 87, 25], ["ə","@",84,52], ["ɘ","I",79,40], ["oː", "$",100, 32], ["ɛ", "{", 53, 64], ["ɒ","Q",115, 60], ["ɐː", "#", 97, 96],["iː", "i", 28, 14], ["ɐ", "V", 73, 96]]
    vowelSetWords = [[" ɢᴏᴏsᴇ", "u", 41, 10],["ᴅʀᴇss", "E", 31, 23], [" ɴᴜʀsᴇ","3",53,34], ["ғᴏᴏᴛ", "U", 87, 25], ["ᴄᴏᴍᴍᴀ","@",84,52], ["ᴋɪᴛ","I",79,40], [" ᴛʜᴏᴜɢʜᴛ", "$",100, 32], ["ᴛʀᴀᴘ", "{", 53, 64], ["ʟᴏᴛ","Q",115, 60], [" sᴛᴀʀᴛ", "#", 97, 96],[" ғʟᴇᴇᴄᴇ", "i", 28, 14], ["sᴛʀᴜᴛ", "V", 73, 96]]
    vowels.onload = function(){
        ctxvowels.drawImage(vowels,0,0,131*canvasScaleVowels, 100*canvasScaleVowels)
        vowelText.forEach((letter)=>{
            ctxvowels.fillText(letter[0],(letter[2])*canvasScaleVowels,letter[3]*canvasScaleVowels)
        })
        vowelSetWords.forEach((word)=>{
            ctxvowels.fillText(word[0],(word[2]+5)*canvasScaleVowels,word[3]*canvasScaleVowels)
        })
        ctxvowels.fontVariantCaps = "normal"
    }
    // diphthongs = new Image()
    // diphthongs.src = "diphthongs_all.png"
    // diphthongs.onload = function(){
    //     ctxvowels.drawImage(diphthongs,125*canvasScaleVowels,0,130*canvasScaleVowels, 100*canvasScaleVowels)
    // }
    vowelCanvas.addEventListener("click", function(event){
        x = event.offsetX/canvasScaleVowels
        y = event.offsetY/canvasScaleVowels
        // console.log(x,y)
        // ctxvowels.fillText("i͡a",x*canvasScaleVowels,y*canvasScaleVowels)
        for(i = 0; i<vowelText.length; i++){
            if(vowelText[i][2]>x-5 && vowelText[i][2]<x+5 && vowelText[i][3]>y-5 && vowelText[i][3]<y+5){
                console.log(vowelText[i])
                main(vowelText[i][1], vowelText[i])
                vowelText.splice(i,1)
                break
            }
        }
    })
    multiplier = window.innerHeight*0.8
    document.getElementById("hangmanCanvas").width = multiplier // size the canvas based on the size of the window
    document.getElementById("hangmanCanvas").height = multiplier // size the canvas based on the size of the window
    ctx = document.getElementById("hangmanCanvas").getContext("2d") // get the context of the canvas
    canvasScale = document.getElementById("hangmanCanvas").width/100 // create a unit equal to 1/100 of the canvas
    ctx.lineWidth = 10 // makes the lines on the hangman drawing thicker.
    hangmanDrawing = [[5,95,30,95],[17,95,17,20],[17,20,83,20],[17,30,37,20],[83,20,83,30],['circle',83,40,10], [83,50,83,70], [83,50,73,60], [83,50,93,60], [83,70,73,85], [83,70,93,85]] // the positions for all the lines in the hangman
    acceptableCharacters = 'abcdefghijklmnopqrstuvwxyz' // characters that can be put in the input box
    acceptableCharacters = acceptableCharacters.split('') //make the accectaple characters a list
    valueIsUneccepable = false //will stop the character from regestering
    maxNameLength = 20 // make the most charaters you can put in the players name be 20
    if (firstRound == true){   // if the game is on the first round
        wins = 0 // define wins as 0
        losses = 0 // define losses as 0
        // var xhttp = new XMLHttpRequest() // create a XMLHttpRequest called xhhtp
        // xhttp.onreadystatechange = function() { // when the XMLHttpRequest becomes ready (the file with the words in it is loaded) run a function
        //     if (this.readyState == 4 && this.status == 200) {
        //         allWords = xhttp.responseText // set wordToGuess to be the contense of the file
        //         allWords = allWords.split("\n") // turn the file into a list where the delimters are where there were origanaly line breaks
        //         randomizeWord() // randomize the word
        //         gameOver = false // define gameOver. when it is true most of main  will not run
        //     }
        // }
        randomizeWord()
        gameOver = false 
        // xhttp.open("GET", "WordList.csv", true) // set the XMLHttpRequest to be get WordList.csv (a long list of words)
        // xhttp.send() // send the request
        document.getElementById("name").innerHTML = "win-loss ratio: " // display player's win-loss ratio: before the players score
    } else { // if it is not the first round
        randomizeWord() // randomize what the word is and do other setup
    }

}
function main(inputedLetter, vowel = []){ // The main functoin. Triggered when a key is pressed in the input box.
    if (wordToGuess.includes(inputedLetter)){ // If the letter in the input box is in the word that is being guessed
            var indexesToChange = [] // This will be the indexes of the word that the guessed letter is in
        for (counter = 0; counter < wordToGuess.length; counter ++){ // For every letter in the word to be guessed
            if (wordToGuess[counter] == inputedLetter){ // If the letter is the guessed letter
                indexesToChange.push(counter) // add its index to the end of indexesToChange
                if(vowel.length == 0){ // if the letter is not a vowel
                    document.getElementById(inputedLetter+"Button").disabled = true
                    document.getElementById(inputedLetter+"Button").style.color = "#00FF00"
                } else {
                    ctxvowels.fillStyle = "#00FF00"
                    ctxvowels.fillText(vowel[0], (vowel[2])*canvasScaleVowels, vowel[3]*canvasScaleVowels)
                }
            }
        }
        var oldletters = document.getElementById("word").innerHTML.split(" ") // Split the word being desplayed (including the _s) so that each character is a separate item in the list
        for (counter = 0; counter < indexesToChange.length; counter ++){ // for every item in indexesToChange
            oldletters[indexesToChange[counter]] = key[inputedLetter] // set the corrisponding item in the duplacate of the deplayed text which will be _ to the inputed letter
        }
        document.getElementById("word").innerHTML = oldletters.join(" ") // set the actual display to the duplacate display converted to a string
        if (oldletters.includes("_") == false){ // if the are no underscores (unguessed letters) in the duplacate display
            gameOver = true // end the game
            wins ++ // add one to wins
            document.getElementById("winLossRatio").innerHTML = wins + "-" + losses // display the new win-loss ratio
            document.getElementById("word").style.color = "green" // set the guessed word to green
            document.getElementById("reload").style.display = "initial"
        }
    } else { // if the word does not include the guessed letter
        if(vowel.length == 0){ // if the letter is not a vowel
            document.getElementById(inputedLetter+"Button").disabled = true
            document.getElementById(inputedLetter+"Button").style.color = "#FF0000"
        }else{
            ctxvowels.fillStyle = "#FF0000"
            ctxvowels.fillText(vowel[0], (vowel[2])*canvasScaleVowels, vowel[3]*canvasScaleVowels)
        }
        //document.getElementById("wrongLetters").innerHTML += inputedLetter + " " // add the guessed letter to the line of crossed out letters at the bottom of the page followed by a space
        wrongGuesses ++ // add one to the number of wrong guesses made
        ctx.beginPath() // start a drawn path (for another line in the hangman)
        if (hangmanDrawing[wrongGuesses][0] != "circle"){ // if the first item of list inside of hangmanDrawing whichs index relates to the number of wrong guesses you have made is not circle
            ctx.moveTo(hangmanDrawing[wrongGuesses][0]*canvasScale, hangmanDrawing[wrongGuesses][1]*canvasScale) // to the posstion dictated by the list
            ctx.lineTo(hangmanDrawing[wrongGuesses][2]*canvasScale, hangmanDrawing[wrongGuesses][3]*canvasScale) // set the thing to be drawn to be a line whichs position is dictated by hangmanDrawing
        } else { // if the first item of the list is circle
            ctx.arc(hangmanDrawing[wrongGuesses][1]*canvasScale, hangmanDrawing[wrongGuesses][2]*canvasScale, hangmanDrawing[wrongGuesses][3]*canvasScale, 0, 2*Math.PI) // set the thing to be drawn to be a circle whichs position is dictated by hangmanDrawing
        }
        ctx.stroke() // draw the things set by lineTo and arc
        if(wrongGuesses == hangmanDrawing.length-1){ // if ten wrong guesses have been made and therefore the hangman been fully drawn
            gameOver = true // end the game
            losses ++ // add one to losses
            document.getElementById("winLossRatio").innerHTML = wins + "-" + losses // display the new win-loss ratio
            for(i=0; i<wordToGuess.length;i++){
                wordToGuess[i] = key[wordToGuess[i]]
            }
            document.getElementById("word").innerHTML = wordToGuess.join(" ") // set the guessed word to the correct word revealing it
            document.getElementById("word").style.color = "red" // set the guessed words color (now the correct word) to be red
            document.getElementById("reload").style.display = "initial" // make it so you can press the Play Again button

        }
    }
}
function randomizeWord() { // this randomizis which word is chosen
    wordToGuess = allWords[Math.floor(Math.random()*allWords.length)] // set the word that will be guessed to a random item in the file
    wordToGuess = wordToGuess.split("") // make each letter in the word a difarant item in a list
    document.getElementById("word").innerHTML = '' // clear all letters prior in the guessable word
    for (counter = 0; counter < wordToGuess.length; counter ++){ // for every letter in the chosen word
        if(wordToGuess[counter] == "'"){
            document.getElementById("word").innerHTML += "' " // add an underscore to the visible word (which was origanlay blank)
        }else if(wordToGuess[counter] == "\""){
            document.getElementById("word").innerHTML += "\" " // add an underscore to the visible word (which was origanlay blank)
        } else if (wordToGuess[counter] == "-"){
            document.getElementById("word").innerHTML += ". "
        }else{
            document.getElementById("word").innerHTML += "_ " // add an underscore to the visible word (which was origanlay blank)
        }
    }
    //document.getElementById("wrongLetters").innerHTML = '' // remove all wrong letters that were displayed prior
    wrongGuesses = -1 // set the number of wrong guesses to -1 so when 1 is added it becomes 0 whitch is the first element of a list
}

function replay(){ // activated if the play again button is pressed. the button is hidded until the game is over
    "26415789NJ_SZrTDwtjpsdfghklzvbnm".split("").forEach((letter)=>{document.getElementById(letter+"Button").disabled = false;document.getElementById(letter+"Button").style.color = "#000000";})
    firstRound = false // let the game know a round has passed
    gameOver = false // unfrese the game
    document.getElementById("reload").style.display = "none" // make it so you cannot press the Play Again button
    document.getElementById("word").style.color = "black" // make the word black rather than the red or green in was prior
    init() // start a new round
}
