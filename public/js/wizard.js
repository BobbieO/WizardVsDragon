(function(){ 
    "use strict";
        
    var userInput = [];

    // to play success sound
    function playSound() {
        $("#metroid")[0].play();
    }

    var index = 0;

    $(document).keydown(function(event){

        // var to store Konami code
        var codeArray = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65, 13];

        // for Konami entry fail notice
        if (codeArray[index] == event.keyCode) {
            index++;
        } else {
            $(".leftText").text("Nope! Try again.");
            index = 0;
        }

        // click listener and to renew start again
        $("#reset").click(function(event) {
            location.reload();
        });
        
        // to change intro screen to game screen upon successful entry
        if (index == codeArray.length) {
            index = 0;
            playSound();
            $("body").css("background", "url(/img/fantasyForest.png) no-repeat center fixed").css("background-size", "cover");
            $(".leftText").text("Use a-d to move").css("font-size", "2.5em");
            $(".rightText").text("Use spacebar to shoot").css(
                {
                    "font-size": "2.5em",
                    "font-family": "Monofett",
                    "display": "inline-block"
                });
            $(".dragon").html("<img src='/img/purpleDragon.png'>");
            $(".wizard").html("<img src='/img/wizard-icon.png'>");
            $("#reset").css("background-color", "#00683f");
            $(document).off("keydown");
            $(document).keydown(movements);
        }; 
     });

    //var and fxn to check for movements, used in animation below
    var isMoving = false;

    function movements(event) {
        if (isMoving) {
            return;
        }; 

        // var to store user input, 'concatenated' 
        userInput.push(event.keyCode);

        //var for randomizer
        var randomNum = Math.floor((Math.random() * 100) + 1);

        //var target wizFire
        var fireballMove = document.getElementById("wizFire");

        if (event.keyCode=='65') {

            //to find character position, check for mvt, animate it.
            //isMoving prevents user from triggering mvt too fast for animation to complete
            if( parseInt($(".wizard img").css("margin-left")) >= 0 ) {
                isMoving = true;
                $(".wizard img").animate({"margin-left": "-=90px"});
                isMoving = false;
            };
        };

        if (event.keyCode=='68') {
            if( parseInt($(".wizard img").css("margin-left")) <= 380 ) {
                isMoving = true;
                $(".wizard img").animate({"margin-left": "+=90px"});
                isMoving = false;
            };
        };

        //for "fighting"
        if (event.keyCode=='32') {
            if(randomNum % 2 == 0) {
                $(document).off("keydown");
                $("#wizFire").css("opacity", "1").animate({"margin-left":"+=300px"}, function() {
                    $(".dragon").html("<img src='/img/explode.png'>"); 
                    $("#wizFire").css("opacity", "0");    
                });
            } else {
                $(document).off("keydown");
                $("#dragonFire").css("opacity", "1").animate({"margin-right":"+=300px"}, function() {
                    $(".wizard").html("<img src='/img/explode.png'>");
                    $("#dragonFire").css("opacity", "0");
                });
            };
        };
    };       
})();

// up arrow: 38;
// down arrow: 40;
// left arrow: 37;
// right arrow: 39;
// b: 66;
// a: 65;
// enter: 13;

// Konami Code: 38 38 40 40 37 39 37 39 66 65 13

