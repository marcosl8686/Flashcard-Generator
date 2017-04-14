var questionArr = [];
var answerArr = [];
function QuestionCreator(question, answer) {
	this.question = question;
	this.answer = answer;
	this.store = function() {
		questionArr.push(this.question);
		answerArr.push(this.answer);
		console.log(questionArr);
		console.log(answerArr);
	}

}
module.exports = {
	QuestionCreator,
	questionArr,
	answerArr
};
