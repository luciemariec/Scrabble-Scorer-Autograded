// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system. 

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = "";
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
		 }
 
	  }
	}
	return letterPoints;
 }
//Function to prompt the user to enter a word. Return the entered word.
function initialPrompt() {
   let word = input.question("Let's play some scrabble! Enter a word:");
   return word;
};
//Function to score a word using a simple scoring method; calculate score based on word length
function simpleScorer(word) {
   word = word.toLowerCase();
   let letterPoints = word.length;
   return letterPoints;
   };
//Function to score a word using a vowel bonus scoring method; loops through each letter in the word; if vowel 3 points, otherwise 1 point
function vowelBonusScorer(word) {
   const vowels = ['a', 'e', 'i', 'o', 'u'];
    let score = 0
    for (let i of word.toLowerCase()) {
        if (vowels.includes(i)) {
            score += 3;
        } else {
            score++;
        }
    }
    return score;
};
//Function to score a word using the new Scrabble scoring method; loops through each letter in the word and adds the corresponding score from the new point structure
function scrabbleScorer(word) {
   word = word.toLowerCase();
   let score = 0;
   for (let i = 0; i < word.length; i++) {
      let letter = word[i];
      score += newPointStructure[letter];
   }
   return score;
}
//Array of scoring methods
const scoringAlgorithms = [
   {
   name: "Simple Score",
   description: "Each letter is worth 1 point.",
   scorerFunction: simpleScorer
   },
   {
   name: "Bonus Vowels",
   description: "Vowels are 3 pts, consonants are 1 pt.",
   scorerFunction: vowelBonusScorer
   },
   {
   name: "Scrabble",
   description: "The traditional scoring algorithm.",
   scorerFunction: scrabbleScorer
}
];

//Function to prompt the user to select a scoring method
function scorerPrompt() {
   let scoreMethod = input.question("Which scoring algorithm would you like to use?\n 0 - Simple: One point per character\n 1 - Vowel Bonus: Vowels are worth 3 points\n 2 - Scrabble: Uses traditional scoring system\n");
   if (scoreMethod === '0') {
       return scoringAlgorithms[0];//Returns the simple scoring method
   } else if (scoreMethod === '1') {
       return scoringAlgorithms[1];//Returns the vowel bonus scoring method
   } else if (scoreMethod === '2') {
       return scoringAlgorithms[2];//Returns the Scrabble scoring method
   } else {
       return "Invalid scoring algorithm selected.";//Returns an error message for invalid user input
   }
}

   //Function to transform the old Scrabble scoring system to the new Scrabble scoring system
function transform (oldPointStructure) {
   let newPointStructure = {};//initialize an empty object to hold the new point structure
   for (let newPts in oldPointStructure) { //loop through each key (point value) in the old point structure
      for (let letter in oldPointStructure[newPts]) { //loop through each letter corresponding to the current point value
         newPointStructure[oldPointStructure[newPts] //assign the corresponding point value to that letter in the new structure
         [letter].toLowerCase()] = Number(newPts);
      }
   }
   return newPointStructure;
}

let newPointStructure = transform(oldPointStructure); //creates the new point structure

//Function to run the program
function runProgram() {
   let word = initialPrompt();
   let selectedScorer = scorerPrompt();
   let score = selectedScorer.scorerFunction(word);
   console.log(`Your word '${word}' scored ${score} points using ${selectedScorer.name}.`);
}

module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScorer: simpleScorer,
   vowelBonusScorer: vowelBonusScorer,
   scrabbleScorer: scrabbleScorer,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};
