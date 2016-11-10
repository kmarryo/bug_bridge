/*****************************
 ******************************
 CONSTRUCTOR FUNCTIONS
 *****************************
 *
 *
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
    this.hitCounter = 0;
    this.score = 0;
    this.level = 1;
};

//var hitCounter = 0;

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
        this.spawnBug();
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
    var _playerScore = numeral(this.score).format('0,0');
    $("#score").text('Score: ' + _playerScore);

    // Sets player back when he is hit by a bug
    if (hit) {
        this.x = 200;
        this.y = 400;
        console.log(hit, 'hit');
        this.hitCounter++;
        console.log('hitCounter', this.hitCounter);

        var gameOver = this.hitCounter > 2;
        // Shows Overlay and total score when player died
        if (gameOver) {
            console.log('game over');
            $(".overlay").show();
            $("#score-total").html("Your total score: " + _playerScore)
        }
    }
};


Player.prototype.spawnBug = function () {
    if(this.level === 2 && enemyCount === allEnemies.length) {
        allEnemies.push(new Enemy(60));
    } else if(this.level === 3 && (enemyCount + 1) === allEnemies.length) {
        allEnemies.push(new Enemy(145));
    } else if(this.level === 4 && (enemyCount + 2) === allEnemies.length) {
        allEnemies.push(new Enemy(230));
    } else if(this.level === 5 && (enemyCount + 3) === allEnemies.length) {
        allEnemies.push(new Enemy(145));
    } else if(this.level === 6 && (enemyCount + 4) === allEnemies.length) {
        allEnemies.push(new Enemy(230));
    } else if(this.level === 7 && (enemyCount + 5) === allEnemies.length) {
        allEnemies.push(new Enemy(60));
    } else if(this.level === 8 && (enemyCount + 6) === allEnemies.length) {
        allEnemies.push(new Enemy(145));
    } else if(this.level === 9 && (enemyCount + 7) === allEnemies.length) {
        allEnemies.push(new Enemy(60));
        allEnemies.push(new Enemy(145));
        allEnemies.push(new Enemy(230));
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

Player.prototype.setLevel = function () {
    this.level = 1;
    /// ADDS LEVEL
    if (this.score > 1000 && this.score < 2500) {
        this.level = 2;
    } else if (this.score > 2500 && this.score < 5000) {
        this.level = 3;
    } else if (this.score > 5000 && this.score < 8000) {
        this.level = 4;
    } else if (this.score > 8000 && this.score < 12000) {
        this.level = 5;
    } else if (this.score > 12000 && this.score < 17000) {
        this.level = 6;
    } else if (this.score > 17000 && this.score < 22000) {
        this.level = 7;
    } else if (this.score > 22000 && this.score < 30000) {
        this.level = 8;
    } else if (this.score > 30000 && this.score < 40000) {
        this.level = 9;
    } else if (this.score > 40000) {
        this.level = 10;
    }
    $("#level").text('Level: ' + this.level);
}

/*****************************
 GEMS
 *****************************/

var Gem = function () {
    // Generates Gem at random position on the stone blocks.
    this.x = Math.floor(Math.random() * (400 + 1));
    this.y = Math.floor(Math.random() * (230 - 60 + 1)) + 60;
    this.sprite = this.pickColor();
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
Gem.prototype.pickColor = function () {
    // Object with all gem colors
    var gemColors = {
        blue: "images/Gem Blue.png",
        green: "images/Gem Green.png",
        orange: "images/Gem Orange.png"
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
console.log('player', player);

var enemyCount = allEnemies.length;
console.log('allEnemies.length', allEnemies.length);
