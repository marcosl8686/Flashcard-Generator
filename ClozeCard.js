var Constructor = require("./constructor.js");
var questions = Constructor.questionArr;
var answer = Constructor.answerArr;
var clozedQuestions = [];
function clozeCards() {
	for(var i = 0; i < questions.length; i++){
		var newTxt = questions[i].replace(answer[i], "_____");
		var newObj = {
			type: "input",
			name: "clozed",
			message: newTxt
		}
		clozedQuestions.push(newObj);
	}
}

module.exports = {
	clozeCards,
	clozedQuestions
};