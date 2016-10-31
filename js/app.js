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
};

Player.prototype.update = function () {
    // Sets player back to starting point when he reaches the water
    if (this.y <= 0) {
        this.y = 400;
    }
    // diff_x = distance between bug and player
    var hit = false, hit_x, hit_y, diff_x;
    for (var i = 0; i < allEnemies.length; i++) {
        diff_x = this.x - allEnemies[i].x;
        hit_x = allEnemies[i].x > 0 && diff_x < 60 && diff_x > -45;
        hit_y= allEnemies[i].y > 0 && this.y == allEnemies[i].y;

        if (hit_x && hit_y) {
            hit = true;
            break;
        }

    }
    // Sets player back when he is hit by a bug
    if (hit) {
        this.x = 200;
        this.y = 400;
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

