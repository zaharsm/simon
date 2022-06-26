var buttonColour = ["red","blue","green","yellow"];

var gameStart = [];
var userChoosenColour = [];
var started =false;
var level = 0;

$("body").on("keypress touchstart",function(){
    if(!started){
        $("#title").text("Level " +level);
        nextSequence();
        started = true;
    }
})

function nextSequence(){
    userChoosenColour = [];
    level++;

    $("#title").text("Level "+level);
    var randomNumber =Math.floor(Math.random()*4);
    var randomColor =buttonColour[randomNumber];

    gameStart.push(randomColor);

    $("#"+randomColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomColor);

}

function playSound(choosenColor){
    var audio = new Audio("sounds/" +choosenColor+ ".mp3");
    audio.play();
}


$(".btn").on("click",function(){

    var storedValue = $(this).attr("id");
    userChoosenColour.push(storedValue);

    playSound(storedValue);
    animateButton(storedValue);

    
    checkAnswer(userChoosenColour.length-1);
})


function animateButton(currentColor){
    $("#"+currentColor).addClass("pressed");

    setTimeout(function(){
        $("#"+currentColor).removeClass("pressed");
    },100);
}


function checkAnswer(currentLevel){
    if(gameStart[currentLevel] === userChoosenColour[currentLevel]){
        if(userChoosenColour.length === gameStart.length){

            setTimeout(function(){
                nextSequence();
            },1000);
   
        }
    }
      else{
        playSound("wrong");
        $("body").addClass("game-over");

        $("#title").text("Game Over! Restart again");

        setTimeout(function(){
            $("body").removeClass("game-over")
        },200)
        startAgain();
    }

    

}

function startAgain(){
    gameStart=[];
    level=0;
    
    started= false;

}
