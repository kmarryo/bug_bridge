// Enemies our player must avoid
var Enemy = function(x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    (this.x++)*dt;
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function(name, x, y, char) {
    this.name = name;
    this.x = x;
    this.y = y;
    this.char = char;
    this.sprite = 'images/char-boy.png';
};

Player.prototype.update = function() {
    if(this.y === -25) {
        this.y = 400;
    }
};

Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function (key) {
    if(key === 'left') {
        if(this.x > 0) {
            this.x -= 100;
        }
    } else if (key === 'up') {
        if(this.y > 0) {
            this.y -= 85;
        }
    } else if(key === 'right') {
        if(this.x < 400) {
            this.x += 100;
        }
    } else if(key === 'down') {
        if(this.y < 400) {
            this.y += 85;
        }
    }
};



//var playerName = prompt("Hi! How is your name?");

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [new Enemy(0, 60), new Enemy(0, 140), new Enemy(0, 225)];
var player = new Player("Mario", 200, 400);
console.log('player', player);


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});



//// TODO:
//// - Bugs müssen von links nach rechts auf das Spielfeld laufen
//// - Bei Kontakt des Spielers mit den Bugs muss er auf die Startposition zurück gesetzt werden

