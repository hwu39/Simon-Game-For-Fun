var btnColors = ["red", "blue", "green", "yellow"];
var gamePattern = [], userPattern = [];
var started = false, level = 0;

$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Level\t" + level);
  }
  nextSequence();
  started = true;
});

$(".btn").click(function() {
  var userColor = $(this).attr("id");
  userPattern.push(userColor);
  playSound(userColor);
  animatePress(userColor);
  checkAnswer(userPattern.length - 1);
});

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userPattern[currentLevel]) {
    if (userPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 2000);
    }
  }
  else {
    playSound("wrong");

    $("body").addClass("restarting");
    $("#level-title").text("Push any key to restart.");

    setTimeout(function() {
      $("body").removeClass("restarting");
    }, 500);
    startOver();
  }
}

function nextSequence() {
  userPattern = [];
  level += 1;
  $("#level-title").text("Level\t" + level);
  var randNum = Math.floor(Math.random() * 4);
  var randChosenColor = btnColors[randNum];
  gamePattern.push(randChosenColor);

  $("#" + randChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randChosenColor);

}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
