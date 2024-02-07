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
// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt() {
   let word = input.question("Let's play some scrabble! Enter a word:");
   // let score = oldScrabbleScorer(word);
   // console.log(score);
   return word;
};

function simpleScorer(word) {
   word = word.toLowerCase();
   let letterPoints = word.length;
   return letterPoints;
   };

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

function scrabbleScorer(word) {
   word = word.toLowerCase();
   let score = 0;
   for (let i = 0; i < word.length; i++) {
      let letter = word[i];
      score += newPointStructure[letter];
   }
   return score;
}

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


function scorerPrompt() {
   let scoreMethod = input.question("Which scoring algorithm would you like to use?\n 0 - Simple: One point per character\n 1 - Vowel Bonus: Vowels are worth 3 points\n 2 - Scrabble: Uses traditional scoring system\n");
   if (scoreMethod === '0') {
       return scoringAlgorithms[0];
   } else if (scoreMethod === '1') {
       return scoringAlgorithms[1];
   } else if (scoreMethod === '2') {
       return scoringAlgorithms[2];
   } else {
       return "Invalid scoring algorithm selected.";
   }
}

   
function transform (oldPointStructure) {
   let newPointStructure = {};
   for (let newPts in oldPointStructure) {
      for (let letter in oldPointStructure[newPts]) {
         newPointStructure[oldPointStructure[newPts]
         [letter].toLowerCase()] = Number(newPts);
      }
   }
   return newPointStructure;
}

let newPointStructure = transform(oldPointStructure);


function runProgram() {
   let word = initialPrompt();
   let selectedScorer = scorerPrompt();
   let score = selectedScorer.scoringFunction(word);
   console.log(`Your word '${word}' scored ${score} points using ${selectedScorer.name}.`);
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
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
