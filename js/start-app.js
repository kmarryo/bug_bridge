// This hides the overlays for losing or winning the game from the beginning
$(".overlay").hide();
$(".overlay-congrats").hide();

// After the player chose a character and hits play, the game will load via ajax
$.ajaxPrefilter(function (options) {
    options.async = true;
});

$("#chars img").click(function () {
    $("#chars img.active").removeClass("active");
    $(this).addClass("active clicked");
    var _char = $(this).data("char");
    if (_char === "boy") {
        chooseChar = chars.boy;
    } else if (_char === "cat-girl") {
        chooseChar = chars.catGirl;
    } else if (_char === "horn-girl") {
        chooseChar = chars.hornGirl;
    } else if (_char === "pink-girl") {
        chooseChar = chars.pinkGirl;
    } else {
        chooseChar = chars.princessGirl;
    }
});

$(".start").click(function () {
    if ($("#chars img").hasClass("clicked")) {
        $("#chars, .start, .instructions, .jumbotron").fadeOut("slow");
        $("body").css("background-color", "#739cff");
        setTimeout(function () {
            $("#game").load("game.html");
        }, 1000);
        $("#chars").attr('clicked', '')
    } else {
        $("#chars").not('[clicked]').attr('clicked', '').append("<h3>Please choose your character.</h3>");
    }
});

// Object of different characters choosable for the game
var chars = {
    boy: 'images/char-boy.png',
    catGirl: 'images/char-cat-girl.png',
    hornGirl: 'images/char-horn-girl.png',
    pinkGirl: 'images/char-pink-girl.png',
    princessGirl: 'images/char-princess-girl.png'
};
var chooseChar;