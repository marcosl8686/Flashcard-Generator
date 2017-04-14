var Constructor = require("./constructor.js");
var questions = Constructor.questionArr;
var answer = Constructor.answerArr;
var clozedQuestions = [];
var fs = require('fs');
var questionList = [];
var answerList = [];
var numb = 0;
var inquirer = require('inquirer');
var correctAnswers = 0;
var incorrectAnswers = 0;

function clozeCards() {
    for (var i = 0; i < questions.length; i++) {
        var newTxt = questions[i].replace(answer[i], "_____");
        var newObj = {
            type: "input",
            name: "clozed",
            message: newTxt
        }
        clozedQuestions.push(newObj);
    }
}

function savedQuestion() {
    for (var i = 0; i < questionList.length; i++) {
        var newTxt = questionList[i].replace(answerList[i], "_____");
        var newObj = {
            type: "input",
            name: "clozed",
            message: newTxt
        }
        clozedQuestions.push(newObj);
    }
    renderSaved();
}

function savedClozedCards() {
    fs.readFile("question.txt", "utf8", function(error, data) {

        var savedTxt = data.split("//");
        questionList = savedTxt[0].split(",");
        answerList = savedTxt[1].split(",");
        savedQuestion();
    });
}
var renderSaved = function() {
    var num = questionList.length;
    if (numb < num) {
        inquirer.prompt(clozedQuestions[numb]).then(function(answer) {
            //if user answer correct, increase correct answer by 1
            if (answer.clozed === answerList[numb]) {

                correctAnswers++;
                console.log("Correct!");
                numb++;

                renderSaved();
            } else {
                // if user answer incorrect, increase incorrect answer by 1  

                incorrectAnswers++;
                console.log("Incorrect!, the Correct Answer is : " + questionList[numb]);
                numb++;

                renderSaved();

            }

        })
    } else {
        console.log("You got " + correctAnswers + " correct answers");
        console.log("and " + incorrectAnswers + " incorrect answers");
    }

}

module.exports = {
    clozeCards,
    clozedQuestions,
    answerList,
    questionList,
    savedClozedCards,
    renderSaved
};
