var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

var started = false;
var level = 0;

$(document).keypress(function() {
	if (!started) {
		console.log("key has been pressed lmao");
		nextSequence();
		started = true;
	}
});

$(".btn").click(function() {
	var userChosenColor = this.id;
	userClickedPattern.push(userChosenColor);
	console.log(userClickedPattern);
	playSound(userChosenColor);
	animatePress(userChosenColor);

	checkAnswer(userClickedPattern.length-1);
});

function nextSequence() {
	userClickedPattern = [];
	$("h1").text("Level " + level);
	var randomNumber = Math.floor(Math.random() * 4);
	var randomChosenColour = buttonColours[randomNumber];
	gamePattern.push(randomChosenColour);

	//1. Use jQuery to select the button with the same id as the randomChosenColour
	//2. Use Google/Stackoverflow to figure out how you can use jQuery to animate a flash to the button selected in step 1.
	$("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

	//3. Use Google/Stackoverflow to figure out how you can use Javascript to play the sound for the button colour selected in step 1.
	playSound(randomChosenColour);
	level++;
}

function playSound(id) {
	var audio = new Audio("sounds/" + id + ".mp3");
	audio.play();
}

function animatePress(currentColor) {
	$("#" + currentColor).addClass('pressed');
	setTimeout(function() {
		$("#" + currentColor).removeClass('pressed');
	}, 100);
}

function checkAnswer(currentLevel) {
	if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

		console.log("success");
  
		//4. If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
		if (userClickedPattern.length === gamePattern.length){
  
		  //5. Call nextSequence() after a 1000 millisecond delay.
		  setTimeout(function () {
			nextSequence();
		  }, 1000);
  
		}
  
	  } else {
  
		console.log("wrong");
		playSound("wrong");
		$("body").addClass('game-over');
		setTimeout(function() {
			$("body").removeClass('game-over');
		}, 200);
		started = false;
		level = 0;
		$("h1").text("Game Over, Press Any Key to Restart");
		gamePattern = [];
		userClickedPattern = [];
	  }
}
