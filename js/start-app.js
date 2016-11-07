
$("#start").click(function () {
    $("#chars, #start").fadeOut("slow");
    setTimeout(function(){
        $("#game").load("game.html");
    }, 1000);
});


