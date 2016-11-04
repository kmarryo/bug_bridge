var hitCounter = 0;
// Enemies our player must avoid
var Enemy = function (x, y) {
    this.x = x;
    this.y = y;
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
    (this.x++) * dt;
    // Sets enemies back when they are out of sight
    if (this.x > 500) {
        this.x = -100;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var Player = function (x, y) {
    this.x = x;
    this.y = y;
    this.sprite = 'images/char-boy.png';
    this.score = 0;
};


Player.prototype.update = function () {
    // Sets player back to starting point when he reaches the water
    if (this.y <= 0) {
        this.x = 200;
        this.y = 400;
        this.score += 200;
        // Adds 1 Gem to the screen when no other gem already exists
        if(gem.length === 0) {
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
    // Sets player back when he is hit by a bug
    if (hit) {
        this.x = 200;
        this.y = 400;
        console.log(hit, 'hit');
        hitCounter++;
        console.log(hitCounter);
        var gameOver = hitCounter > 2;
        if (gameOver) {
            console.log('game over');
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
        if(gem.length > 0) {
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
    var randomColor = colorArray[ Math.floor(Math.random()*colorArray.length) ];
    return gemColors[randomColor];
}

var gem = [new Gem()];

var allEnemies = [new Enemy(-50, 60), new Enemy(-900, 60), new Enemy(-720, 145), new Enemy(-375, 145), new Enemy(-100, 230)];
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

