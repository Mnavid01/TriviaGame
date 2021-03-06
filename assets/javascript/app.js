$(document).ready(function() {
    // console.log( "ready!" );

    // track which question we are on
    var questionCounter = 0;
    // initial time of 15 seconds for each question
    var time = 15;
    // will keep tally of right guesses for end game
    var correctGuesses = 0;
    //will keep tally of wrong guesses for end game
    var incorrectGuesses = 0;

    // question & answer array
    var questions = [
      {
	    question: "Who is the main character of The Vampire Diaries?",
	    choices: ["Katherine Pierce", "Damon", "Stefan", "Elena"],
	    correctAnswer: "Elena",
	    image: "<img src='assets/images/ElenaGilbert.jpeg' class='img-circle shadow'>"
	  }, 
	  {
	    question: "In Twilight, who is the main female protagonist?",
	    choices: ["Bella", "Renaesme", "Alice", "Victoria"],
	    correctAnswer: "Bella",
	    image: "<img src='assets/images/BellaSwan.jpeg' class='img-circle shadow'>"
	  }, 
	  {
	    question: "In Underworld, who is the arch-rival of the vampire coven?",
	    choices: ["Vampire Hunters", "Werewolves", "Vampires", "demons"],
	    correctAnswer: "Werewolves",
	    image: "<img src='assets/images/werewolves.jpeg' class='img-circle shadow'>"
	  }, 
	  {
	    question: "Who played Lestat in Interview With a Vampire?",
	    choices: ["Leonardo DiCaprio", "John Travolta", "Tom Cruise", "Trump"],
	    correctAnswer: "Tom Cruise",
	    image: "<img src='assets/images/TomCruise.jpeg' class='img-circle shadow'>"
	  }, 
	  {
	    question: "Who was the actress that passed away, but played in Queen of the Damned?",
	    choices: ["Aaliyah", "Natalie Portman", "Rachel Weiss", "Jennifer Love Hewitt"],
	    correctAnswer: "Aaliyah",
	    image: "<img src='assets/images/Aaliyah.jpeg' class='img-circle shadow'>"
	  },
	  {
	    question: "Who was the youngest actress to play vampire?",
	    choices: ["Kirsten Dunst", "Drew Barrymore", "Meryl Streep", "Lucy Lu"],
	    correctAnswer: "Kirsten Dunst",
	    image: "<img src='assets/images/KirstenDunst.jpeg' class='img-circle shadow'>"
	  },
	  {
	    question: "Vampires lust for",
	    choices: ["Sex", "Love", "Blood", "Marriage"],
	    correctAnswer: "Blood",
	    image: "<img src='assets/images/Blood.jpeg' class='img-circle shadow'>"
	  },
	  {
	    question: "The oldest Vampire is...",
	    choices: ["Unknown", "Darius", "Salamence", "Dracula"],
	    correctAnswer: "Dracula",
	    image: "<img src='assets/images/Dracula.jpeg' class='img-circle shadow'>"
	  }];
	  

	// create question contents according to question count
	function questionContent() {
		// a for loop would be cool here...
    	$("#gameScreen").append("<p><strong>" + 
    		questions[questionCounter].question + 
    		"</p><p class='choices'>" + 
    		questions[questionCounter].choices[0] + 
    		"</p><p class='choices'>" + 
    		questions[questionCounter].choices[1] + 
    		"</p><p class='choices'>" + 
    		questions[questionCounter].choices[2] + 
    		"</p><p class='choices'>" + 
    		questions[questionCounter].choices[3] + 
    		"</strong></p>");
	}

	// user guessed correctly
	function userWin() {
		$("#gameScreen").html("<p>You got it right!</p>");
		correctGuesses++;
		var correctAnswer = questions[questionCounter].correctAnswer;
		$("#gameScreen").append("<p>The answer was <span class='answer'>" + 
			correctAnswer + 
			"</span></p>" + 
			questions[questionCounter].image);
		setTimeout(nextQuestion, 4000);
		questionCounter++;
	}

	// user guessed incorrectly
	function userLoss() {
		$("#gameScreen").html("<p>Nope, that's not it!</p>");
		incorrectGuesses++;
		var correctAnswer = questions[questionCounter].correctAnswer;
		$("#gameScreen").append("<p>The answer was <span class='answer'>" + 
			correctAnswer + 
			"</span></p>" + 
			questions[questionCounter].image);
		setTimeout(nextQuestion, 4000);
		questionCounter++;
	}

	// user ran out of time
	function userTimeout() {
		if (time === 0) {
			$("#gameScreen").html("<p>You ran out of time!</p>");
			incorrectGuesses++;
			var correctAnswer = questions[questionCounter].correctAnswer;
			$("#gameScreen").append("<p>The answer was <span class='answer'>" + 
				correctAnswer + 
				"</span></p>" + 
				questions[questionCounter].image);
			setTimeout(nextQuestion, 4000);
			questionCounter++;
		}
	}

	// screen that shows final score and nice message :)
	function resultsScreen() {
		if (correctGuesses === questions.length) {
			var endMessage = "Perfection! Eternal life is yours, but you still lose...";
			var bottomText = "The End";
		}
		else if (correctGuesses > incorrectGuesses) {
			var endMessage = "Good work! But do better you can...";
			var bottomText = "Eternal Life is almost yours....";
		}
		else {
			var endMessage = "Who's standing behind you...";
			var bottomText = "cover your neck....";
		}
		$("#gameScreen").html("<p>" + endMessage + "</p>" + "<p>You got <strong>" + 
			correctGuesses + "</strong> right.</p>" + 
			"<p>You got <strong>" + incorrectGuesses + "</strong> wrong.</p>");
		$("#gameScreen").append("<h1 id='start'>Start Over?</h1>");
		$("#bottomText").html(bottomText);
		gameReset();
		$("#start").click(nextQuestion);
	}

	// game clock currently set to 15 seconds
	function timer() {
		clock = setInterval(countDown, 1000);
		function countDown() {
			if (time < 1) {
				clearInterval(clock);
				userTimeout();
			}
			if (time > 0) {
				time--;
			}
			$("#timer").html("<strong>" + time + "</strong>");
		}
	}

	// moves question counter forward to show next question
	function nextQuestion() {
		if (questionCounter < questions.length) {
			time = 15;
			$("#gameScreen").html("<p>You have <span id='timer'>" + time + "</span> seconds left!</p>");
			questionContent();
			timer();
			userTimeout();
		}
		else {
			resultsScreen();
		}
	// console.log(questionCounter);
	// console.log(questions[questionCounter].correctAnswer);
	}

	// reset score and counter parameters on restart
	function gameReset() {
		questionCounter = 0;
		correctGuesses = 0;
		incorrectGuesses = 0;
	}

    function startGame() {
    	$("#gameScreen").html("<p>You have <span id='timer'>" + time + "</span> seconds left!</p>");
    	$("#start").hide();
    	// $("#gameScreen").append("<div id='question'>");
    	// var nextQuestion = questionContent(questionCounter);
    	// $("#gameScreen").append(nextQuestion);

		// $("#gameScreen").append("<p>" + questions[questionCounter].question + "</p><p>" + questions[questionCounter].choices[0] + "</p><p>" + questions[questionCounter].choices[1] + "</p><p>" + questions[questionCounter].choices[2] + "</p><p>" + questions[questionCounter].choices[3] + "</p>");
		// questionCounter++;
		questionContent();
    	timer();
    	userTimeout();
    }

    // this starts the game
    $("#start").click(nextQuestion);

    // click function to trigger right or wrong screen
	$("#gameScreen").on("click", ".choices", (function() {
		// alert("clicked!");
		var userGuess = $(this).text();
		if (userGuess === questions[questionCounter].correctAnswer) {
			clearInterval(clock);
			userWin();
		}
		else {
			clearInterval(clock);
			userLoss();
		}
	}));
});