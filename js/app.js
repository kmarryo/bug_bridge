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
        if(rock.length === 1) {
            rock.pop();
            rock.push(new Rock());
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
        function removeHearts(life) {
            $(life).fadeOut(1000);
        }
        if(this.hitCounter === 1) {
            removeHearts(".third");
        } else if (this.hitCounter === 2) {
            removeHearts(".second");
        }         // Shows Overlay and total score when player died
        else if(gameOver) {
            removeHearts(".third");
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
        if(star.length === 0) {
            star.push(new Star());
        }
    } else if(this.level === 5 && (enemyCount + 3) === allEnemies.length) {
        allEnemies.push(new Enemy(145));
    } else if(this.level === 6 && (enemyCount + 4) === allEnemies.length) {
        allEnemies.push(new Enemy(230));
        if(star.length === 0) {
            star.push(new Star());
        }
    } else if(this.level === 7 && (enemyCount + 5) === allEnemies.length) {
        allEnemies.push(new Enemy(60));
    } else if(this.level === 8 && (enemyCount + 6) === allEnemies.length) {
        allEnemies.push(new Enemy(145));
        if(star.length === 0) {
            star.push(new Star());
        }
    } else if(this.level === 9 && (enemyCount + 7) === allEnemies.length) {
        allEnemies.push(new Enemy(60));
        allEnemies.push(new Enemy(145));
        allEnemies.push(new Enemy(230));
        if(star.length === 0) {
            star.push(new Star());
        }
    }
};


Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function (key) {
    for(var i=0; i<rock.length; i++) {
        var distanceX = rock[i].x - this.x;
        var distanceY = rock[i].y - this.y;
        var sameLine = distanceY === 0;
        var noRight = distanceX === 100 && sameLine;
        var noLeft = distanceX === -100 && sameLine;
        var noUp = distanceX === 0 && distanceY === -85;
        var noDown = distanceX === 0 && distanceY === 85;
        // Moves the player on keyboard input
        if (key === 'left' && !noLeft) {
            if (this.x > 0) {
                this.x -= 100;
            }
        } else if (key === 'up' && !noUp) {
            if (this.y > 0) {
                this.y -= 85;
            }
        } else if (key === 'right' && !noRight) {
            if (this.x < 400 ) {
                this.x += 100;
            }
        } else if (key === 'down' && !noDown) {
            if (this.y < 400) {
                this.y += 85;
            }
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
        star.push(new Star());
    } else if (this.score > 30000 && this.score < 40000) {
        this.level = 9;
    } else if (this.score > 40000) {
        this.level = 10;
    }
    $("#level").text('Level: ' + this.level);
};

/*****************************
 GEMS
 *****************************/

var Gem = function () {
    // Generates Gem at random position on the stone blocks.
    this.set_random_x_y();
    this.sprite = this.pickColor();
};

Gem.prototype.update = function () {
    if(this.x === player.x && this.y === player.y) {
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
    };
    // Creates an array of keys from the gemColors object
    var colorArray = Object.keys(gemColors);
    // Picks random one key of the array
    var randomColor = colorArray[Math.floor(Math.random() * colorArray.length)];
    return gemColors[randomColor];
};

Gem.prototype.set_random_x_y = function () {
    set_random_x_y(this);
};
var set_random_x_y = function (obj, array_x, array_y){
    if(typeof array_x == 'undefined') {
        array_x = [0, 100, 200, 300, 400];
    }
    if(typeof array_y == 'undefined') {
        array_y = [60, 145, 230];
    }
    obj.x = random(array_x);
    obj.y = random(array_y);
    function random(arr){
        return arr[Math.floor(Math.random() * arr.length)];
    }
};



/*****************************
 Rock
 *****************************/

var Rock = function () {
    this.sprite = 'images/Rock.png';
    this.set_random_x_y();
};

Rock.prototype.update = function () {
    // If rock and gem are in the exact same position, rock will get a new position
    for(var i=0; i<gem.length; i++) {
        if (this.x === gem[i].x && this.y === gem[i].y) {
            set_random_x_y(this);
        }
    }
};

Rock.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Rock.prototype.set_random_x_y = function () {
    set_random_x_y(this);
};


/*****************************
 Star
 *****************************/


var Star = function () {
    this.sprite = 'images/Star.png';
    this.set_random_x_y();
};

Star.prototype.update = function () {
    for(var i=0; i<rock.length; i++) {
        if (this.x === rock[i].x && this.y === rock[i].y) {
            set_random_x_y(this);
        }
    }
    if(this.x === player.x && this.y === player.y) {
        player.score += 700;
        if (star.length > 0) {
            star.pop();
        }
    }
};

Star.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Star.prototype.set_random_x_y = function () {
    set_random_x_y(this);
};

var gem = [new Gem()];
var allEnemies = [new Enemy(60), new Enemy(60), new Enemy(145), new Enemy(230)];
var player = new Player(200, 400);
var rock = [new Rock()];
var star = [new Star()];

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
$("#hearts").append('<img class="hearts-img first" src="images/Heart.png" alt="hearts">', '<img class="hearts-img second" src="images/Heart.png" alt="hearts">', '<img class="hearts-img third" src="images/Heart.png" alt="hearts">');


