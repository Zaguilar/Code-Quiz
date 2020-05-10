//set score to zero
function Quiz(questions) {
    this.score = 0;
    this.questions = questions;
    this.questionIndex = 0;
}
 
Quiz.prototype.getQuestionIndex = function() {
    return this.questions[this.questionIndex];
}
 
Quiz.prototype.guess = function(answer) {
    if(this.getQuestionIndex().isCorrectAnswer(answer)) {
        this.score++;
    }

    this.questionIndex++;
}
 
Quiz.prototype.isEnded = function() {
    return this.questionIndex === this.questions.length;
}
 
 
function Question(text, choices, answer) {
    this.text = text;
    this.choices = choices;
    this.answer = answer;
}


Question.prototype.isCorrectAnswer = function(choice) {
    return this.answer === choice;
}
 
 
function populate() {
    if (quiz.isEnded()) {
        showScores();
    }
    else {
        // show question
        var element = document.getElementById("question");
        element.innerHTML = quiz.getQuestionIndex().text;
 
        // show options
        var choices = quiz.getQuestionIndex().choices;
        for(var i = 0; i < choices.length; i++) {
            var element = document.getElementById("choice" + i);
            element.innerHTML = choices[i];
            guess("btn" + i, choices[i]);
        }
 
        showProgress();
    }

};
 
function guess(id, guess) {
    var button = document.getElementById(id);
    button.onclick = function() {
        quiz.guess(guess);
        populate();
    }
};
 
 //code to show which question you're on
function showProgress() {
    var currentQuestionNumber = quiz.questionIndex + 1;
    var element = document.getElementById("progress");
    element.innerHTML = "Question " + currentQuestionNumber + " of " + quiz.questions.length;
};
 //code displaying scores if quiz is over
function showScores() {
    var gameOverHTML = "<h1>Result</h1>";
    gameOverHTML += "<h2 id='score'> Your scores: " + quiz.score + "</h2>";
    var element = document.getElementById("quiz");
    element.innerHTML = gameOverHTML;
};
// Code for timer
var time=45;
var x =setInterval(function(){
    document.getElementById("displayTimer").innerHTML= " "+time+" seconds"
    time=time-1;

    if(time < 0){
        clearInterval(x); 
        
    }
}, 1000);
 
// create questions here
var questions = [
    new Question("Who invented Javascript?", ["Brendan Frasier", "John Paul Gotti","Lucas Simms", "Brendan Eich"], "Brendan Eich"),
    new Question("How do you declare a variable in Javascript?", ["//var", "(var)", "var", "var="], "var"),
    new Question("Which is not a JavaScript Framework?", ["Python Script", "JQuery","Django", "NodeJS"], "Django"),
    new Question("Which is used to connect to a database?", ["PHP", "HTML", "JS", "All of the above"], "PHP"),
    new Question("Should you learn Javascript?", ["yes", "yes please", "oui", "All of the above"], "All of the above")
];
 
// create quiz
var quiz = new Quiz(questions);
 
// display quiz
populate();