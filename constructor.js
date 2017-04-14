var questionArr = [];
var answerArr = [];
var fs = require('fs');

function QuestionCreator(question, answer) {
    this.question = question;
    this.answer = answer;
    this.store = function() {
        questionArr.push(this.question);
        answerArr.push(this.answer);
        fs.writeFile("question.txt", questionArr + "//" + answerArr, function(err) {

            if (err) {
                return console.log(err);
            }
        });
    }

}
module.exports = {
    QuestionCreator,
    questionArr,
    answerArr
};
