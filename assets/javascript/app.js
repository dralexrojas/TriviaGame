$( document ).ready(function(){
    
var panel = $('#quiz-area');
var countStartNumber = 10;

$(document).on('click', '#start-over', function(e) {
  game.reset();
});

$(document).on('click', '.answer-button', function(e) {
  game.clicked(e);
});

$(document).on('click', '#start', function(e) {
  $('#subwrapper').prepend('<h2>Time Remaining: <span id="counter-number">10</span> Seconds</h2>');
  game.loadQuestion();
});


var questions = [{
  question: "What is the best song by The Smiths?",
  answers: ["There is a Light That Never Goes Out", "Suedehead", "Ask", "Unloveable"],
  correctAnswer: "There is a Light That Never Goes Out",
  image:"assets/images/thereisalight.gif"
}, {
  question: "Where is the panic?",
  answers: ["New York", "On the streets of London", "The pubs of Birmingham", "The palace"],
  correctAnswer: "On the streets of London",
  image:"assets/images/panic.gif"
}, {
  question: "What isn't funny anymore?",
  answers: ["The queen is dead", "That joke", "Driving your girlfriend home", "Mr. Shankley"],
  correctAnswer: "That joke",
  image:"assets/images/jokeisntfunny.gif"
}, {
  question: "Why did I call?",
  answers: ["To say hello", "To wish you an unhappy birthday", "To say goodbye", "To ask you out"],
  correctAnswer: "To wish you an unhappy birthday",
  image:"assets/images/unhappybday.gif"
}, {
  question: "Where will I meet you?",
  answers: ["The vicar's house", "The fountain", "The cemetary gates", "Piccadilly Square"],
  correctAnswer: "The cemetary gates",
  image:"assets/images/cemetrygates.gif"
}, {
  question: "Who is on fire?",
  answers: ["Hairdresser", "Your girlfriend", "Tony the Pony", "Bengali"],
  correctAnswer: "Hairdresser",
  image:"assets/images/hairdresser.gif"
}];

var game = {
  questions:questions,
  currentQuestion:0,
  counter:countStartNumber,
  correct:0,
  incorrect:0,
  countdown: function(){
    game.counter--;
    $('#counter-number').html(game.counter);

    if (game.counter === 0){
      console.log('TIME UP');
      game.timeUp();
    }
  },
  loadQuestion: function(){
    timer = setInterval(game.countdown, 1000);
    panel.html('<h2>' + questions[this.currentQuestion].question + '</h2>' );
    for (var i = 0; i<questions[this.currentQuestion].answers.length; i++){
      panel.append('<button class="answer-button" id="button"' + 'data-name="' + questions[this.currentQuestion].answers[i] + '">' + questions[this.currentQuestion].answers[i]+ '</button>');
    }
  },
  nextQuestion: function(){
    game.counter = countStartNumber;
    $('#counter-number').html(game.counter);
    game.currentQuestion++;
    game.loadQuestion();
  },
  timeUp: function (){
    clearInterval(timer);
    $('#counter-number').html(game.counter);

    panel.html('<h2>Time is Up!</h2');
    panel.append('<h3>The Correct Answer was: ' + questions[this.currentQuestion].correctAnswer);
    panel.append('<img src="' + questions[this.currentQuestion].image + '" />');

    if (game.currentQuestion === questions.length - 1){
      setTimeout(game.results, 3 * 1000);
    } else {
      setTimeout(game.nextQuestion, 3 * 1000);
    }
  },
  results: function() {
    clearInterval(timer);

    panel.html('<h2>Quiz is done, here is your score!</h2>');
    $('#counter-number').html(game.counter);
    panel.append('<h3>Correct Answers: ' + game.correct + '</h3>');
    panel.append('<h3>Incorrect Answers: ' + game.incorrect + '</h3>');
    panel.append('<h3>Unanswered: ' + (questions.length - (game.incorrect + game.correct)) + '</h3>');
    panel.append('<br><button id="start-over">Start Over</button>');
  },
  clicked: function(e) {
    clearInterval(timer);

    if ($(e.target).data("name") === questions[this.currentQuestion].correctAnswer){
      this.answeredCorrectly();
    } else {
      this.answeredIncorrectly();
    }
  },
  answeredIncorrectly: function() {
    game.incorrect++;
    clearInterval(timer);
    panel.html('<h2>Incorrect!</h2>');
    panel.append('<h3>The Correct Answer was: ' + questions[game.currentQuestion].correctAnswer + '</h3>');
    panel.append('<img src="' + questions[game.currentQuestion].image + '" />');

    if (game.currentQuestion === questions.length - 1){
      setTimeout(game.results, 3 * 1000);
    } else {
      setTimeout(game.nextQuestion, 3 * 1000);
    }
  },
  answeredCorrectly: function(){
    clearInterval(timer);
    game.correct++;
    panel.html('<h2>Correct!</h2>');
    panel.append('<img src="' + questions[game.currentQuestion].image + '" />');

    if (game.currentQuestion === questions.length - 1){
      setTimeout(game.results, 3 * 1000);
    } else {
      setTimeout(game.nextQuestion, 3 * 1000);
    }
  },
  reset: function(){
    this.currentQuestion = 0;
    this.counter = countStartNumber;
    this.correct = 0;
    this.incorrect = 0;
    this.loadQuestion();
  }
  };

});
