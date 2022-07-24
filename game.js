var userClickedPattern = [];
var gamePattern = [];
var buttonColours = ["maroon", "blue", "purple", "cream"];
var level = 0;
var started = false;


// Makes the game start with a keypress. It only works on first keypress
$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

// What is expected to happen when user clicks a button
$(".btn").click(function () {
  var userChosenColour = this.id;
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);
  //checks the index of the last button pressed
  checkAnswer(userClickedPattern.length-1);
})

// Randomly genrates a sequence of buttons clicked
function nextSequence() {
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];

  gamePattern.push(randomChosenColour);

// fade in fade out to signify button to click
  $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);

  $("#level-title").html("Level " + level);
  level++;

  userClickedPattern = [];
};

// Audio section
function playSound(name) {
  var audio = new Audio ("sounds/" + name + ".mp3");
  audio.play();
}

// Animations to simulate button press
function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");

  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
  }, 100);

};

function checkAnswer(currentLevel) {
  // This checks to make sure the index of last button corresponds
  // with that of the game pattern
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    console.log("success");

    // If it does then this checks to make sure user has completed previous
    // sequence of buttons
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }

// If user fails to complete sequence this happens
  } else {
    console.log("wrong");

    playSound("wrong");

    $("body").addClass("game-over");

    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").html("Game Over, Press Any Key to Restart");
    startOver();
  };

}

// To restart game
function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
