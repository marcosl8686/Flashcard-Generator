//initialize variables
var inquirer = require('inquirer');
var fs = require('fs');
var count = 0;
var numb = 0;
var correctAnswers = 0;
var incorrectAnswers = 0;
var Constructor = require("./constructor.js").QuestionCreator;
var clozeCard = require("./ClozeCard.js");
var fs = require('fs');
var answerList = require("./constructor.js").answerArr;
var questionList = require("./constructor.js").questionArr;
//list of questions
var initial = [{
    type: 'rawlist',
    name: 'choices',
    message: 'Create or Use?',
    choices: ['Create', 'Use']
}, ];
var qty = [{
    type: 'input',
    name: 'Qty',
    message: 'How many cards?'
}];
var Questions = [{
    type: 'input',
    name: 'textInput',
    message: 'Please input the text for your Flashcard'
}, {
    type: 'input',
    name: 'answerInput',
    message: 'word to be clozed?'
}];
//ask user if they want to create or run flashcard
inquirer.prompt(initial).then(function(answer) {
    //if user chooses create, prompt how flashcard quantity.
    if (answer.choices === 'Create') {
        fs.unlinkSync("question.txt");
        inquirer.prompt(qty).then(function(answer) {
            var num = answer.Qty;
            //based on the inputed qty, inquire the total text of the flashcard and the word that needs to be clozed;
            var askQuestions = function() {
                if (count < num) {
                    inquirer.prompt(Questions).then(function(answer) {

                            var newQuestion = new Constructor(answer.textInput, answer.answerInput);
                            newQuestion.store();
                            count++;
                            askQuestions();
                        })
                        //after user finishes inputting all the text and selects the clozed word, start the test.
                } else {
                    //run the useCard function.
                    clozeCard.clozeCards();
                    var renderQuestion = function() {
                        if (numb < num) {
                            inquirer.prompt(clozeCard.clozedQuestions[numb]).then(function(answer) {
                                //if user answer correct, increase correct answer by 1
                                if (answer.clozed === answerList[numb]) {

                                    correctAnswers++;
                                    console.log("Correct!");
                                    numb++;

                                    renderQuestion();
                                } else {
                                    // if user answer incorrect, increase incorrect answer by 1  

                                    incorrectAnswers++;
                                    console.log("Incorrect!, the Correct Answer is : " + questionList[numb]);
                                    numb++;

                                    renderQuestion();

                                }

                            })
                        } else {
                            console.log("You got " + correctAnswers + " correct answers");
                            console.log("and " + incorrectAnswers + " incorrect answers");
                        }
                    }
                    renderQuestion();
                }

            }
            askQuestions();
        })
    } else {
        //run the useCard function.
        clozeCard.savedClozedCards();
        // var renderSaved = function() {
        //     var savedAnswer = require("./ClozeCard.js").answerList;
        //     var savedQuestion = require("./ClozeCard.js").questionList;
        //     var num = savedQuestion.length;
        //     console.log(savedAnswer);
        //     console.log(savedQuestion);
        //     console.log(num);
        //     if (numb < num) {
        //         inquirer.prompt(clozeCard.clozedQuestions[numb]).then(function(answer) {
        //             //if user answer correct, increase correct answer by 1
        //             if (answer.clozed === savedAnswer[numb]) {

        //                 correctAnswers++;
        //                 console.log("Correct!");
        //                 numb++;

        //                 renderSaved();
        //             } else {
        //                 // if user answer incorrect, increase incorrect answer by 1  

        //                 incorrectAnswers++;
        //                 console.log("Incorrect!, the Correct Answer is : " + savedQuestion[numb]);
        //                 numb++;

        //                 renderSaved();

        //             }

        //         })
        //     }
        // }
        // renderSaved();

    }
})
