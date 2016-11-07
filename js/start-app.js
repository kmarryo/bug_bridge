$("#start").click(function () {
    if($("#chars img").hasClass("clicked")) {
        $("#chars, #start").fadeOut("slow");
        setTimeout(function(){
            $("#game").load("game.html");
        }, 1000);
        $("#chars").attr('clicked', '')
    } else {
        $("#chars").not('[clicked]').attr('clicked', '').append("<h3>Please choose your character.</h3>");
    }
});
var chars = {
    boy: 'images/char-boy.png',
    catGirl: 'images/char-cat-girl.png',
    hornGirl: 'images/char-horn-girl.png',
    pinkGirl: 'images/char-pink-girl.png',
    princessGirl: 'images/char-princess-girl.png'
}
var chooseChar;


$("#chars img").click(function () {
    $(this).addClass("clicked");
    var _char = $(this).data("char");
    if (_char === "boy") {
        chooseChar = chars.boy;
    } else if (_char === "cat-girl") {
        chooseChar = chars.catGirl;
    } else if(_char === "horn-girl") {
        console.log('horn-girl');

        chooseChar = chars.hornGirl;
    } else if(_char === "pink-girl") {
        chooseChar = chars.pinkGirl;
    } else {
        chooseChar = chars.princessGirl;
    }
});