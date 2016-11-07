$(".overlay").hide();

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

/*****************************
 ******************************
 CONSTRUCTOR FUNCTIONS
 *****************************
 *****************************/

/**************************
 ENEMIES
 **************************/


// Enemies our player must avoid
var Enemy = function (y) {
    this.x = Math.floor(Math.random() * -500 - 50);
    this.y = y;
    this.sprite = 'images/enemy-bug.png';
    this.speed = Math.floor(Math.random() * 85 + 25);
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
    this.x += this.speed * dt;
    // Sets enemies back at random position when they are out of sight
    if (this.x > 500) {
        this.x = Math.floor(Math.random() * -500 - 50);
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/*****************************
 PLAYER
 *****************************/

var Player = function (x, y) {
    this.x = x;
    this.y = y;
    this.sprite = chooseChar;
    console.log('this.sprite', this.sprite);

    this.score = 0;
};

var hitCounter = 0;

Player.prototype.update = function () {
    // Sets player back to starting point when he reaches the water
    if (this.y <= 0) {
        this.x = 200;
        this.y = 400;
        this.score += 200;
        // Adds 1 Gem to the screen when no other gem already exists
        if (gem.length === 0) {
            gem.push(new Gem());
        }
    }
    // diff_x = distance between bug and player
    var hit = false, hit_x, hit_y, diff_x;
    for (var i = 0; i < allEnemies.length; i++) {
        diff_x = this.x - allEnemies[i].x;
        hit_x = allEnemies[i].x > 0 && diff_x < 60 && diff_x > -45;
        hit_y = allEnemies[i].y > 0 && this.y == allEnemies[i].y;

        if (hit_x && hit_y) {
            hit = true;
            break;
        }
    }
    // Formats the player score
    var _playerScore = numeral(player.score).format('0,0');
    $("#score").text('Score: ' + _playerScore);

    // Sets player back when he is hit by a bug
    if (hit) {
        this.x = 200;
        this.y = 400;
        console.log(hit, 'hit');
        hitCounter++;
        console.log('hitCounter', hitCounter);

        console.log(hitCounter);
        var gameOver = hitCounter > 2;
        // Shows Overlay and total score when player died
        if (gameOver) {
            console.log('game over');
            $(".overlay").show();
            $("#score-total").html("Your total score: " + _playerScore)
        }
    }
};

Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function (key) {
    // Moves the player on keyboard input
    if (key === 'left') {
        if (this.x > 0) {
            this.x -= 100;
        }
    } else if (key === 'up') {
        if (this.y > 0) {
            this.y -= 85;
        }
    } else if (key === 'right') {
        if (this.x < 400) {
            this.x += 100;
        }
    } else if (key === 'down') {
        if (this.y < 400) {
            this.y += 85;
        }
    }
};


/*****************************
 GEMS
 *****************************/

var Gem = function () {
    // Generates Gem at random position on the stone blocks.
    this.x = Math.floor(Math.random() * (400 + 1));
    this.y = Math.floor(Math.random() * (230 - 60 + 1)) + 60;
    this.sprite = pickColor();
};

Gem.prototype.update = function () {
    var diff_x = this.x - player.x;
    var diff_y = this.y - player.y;
    if (diff_x < 60 && diff_x > -45 && diff_y < 60 && diff_y > -45) {
        player.score += 250;
        if (gem.length > 0) {
            gem.pop();
        }
    }
};

Gem.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Function for creating random colored gems
function pickColor() {
    // Object with all gem colors
    var gemColors = {
        "blue": "images/Gem Blue.png",
        "green": "images/Gem Green.png",
        "orange": "images/Gem Orange.png"
    }
    // Creates an array of keys from the gemColors object
    var colorArray = Object.keys(gemColors);
    // Picks random one key of the array
    var randomColor = colorArray[Math.floor(Math.random() * colorArray.length)];
    return gemColors[randomColor];
}

var gem = [new Gem()];

var allEnemies = [new Enemy(60), new Enemy(60), new Enemy(145), new Enemy(230)];
var player = new Player(200, 400);

document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});