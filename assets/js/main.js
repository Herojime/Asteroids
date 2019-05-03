/**
 * //phaser.io/sandbox/YBsxulxf
 *
 * This source requires Phaser 2.6.2
 */
//var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update, render: render });
var game = new Phaser.Game(1280, 720, Phaser.CANVAS, 'asteroids', { preload: preload, create: create, update: update, render: render });

/** SETS SPRITES */
function preload() {
    game.load.image('bullet', 'assets/sprites/bullet.png');
    game.load.image('ship', 'assets/sprites/ship.png');
    game.load.image('asteroidRL', 'assets/sprites/asteroidRL.png');
    game.load.image('asteroidRM', 'assets/sprites/asteroidRM.png');
    game.load.image('asteroidRS', 'assets/sprites/asteroidRS.png');
    game.load.image('asteroidBL', 'assets/sprites/asteroidBL.png');
    game.load.image('asteroidBM', 'assets/sprites/asteroidBM.png');
    game.load.image('asteroidBS', 'assets/sprites/asteroidBS.png');
}

/** FUNCTIONS AND CREATE */
var sprite;
var weapon;
var cursors;
var fireButton;
var asteroid;
var scoreString = '';
var scoreText;
var lives;

function create() {
/** WEAPON */
    //  Creates 30 bullets, using the 'bullet' graphic
    weapon = game.add.weapon(30, 'bullet');

    //  The bullets will be automatically killed when they are 2000ms old
    weapon.bulletKillType = Phaser.Weapon.KILL_LIFESPAN;
    weapon.bulletLifespan = 2000;

    //  The speed at which the bullet is fired
    weapon.bulletSpeed = 400;

    //  Speed-up the rate of fire, allowing them to shoot 1 bullet every 60ms
    weapon.fireRate = 100;

    //  Wrap bullets around the world bounds to the opposite side
    weapon.bulletWorldWrap = true;

/** SHIP */    
    sprite = this.add.sprite(400, 300, 'ship');
    // The scale that the sprite is set from the original
    sprite.scale.set(0.15);
    sprite.anchor.set(0.5);

    game.physics.arcade.enable(sprite);

    sprite.body.drag.set(70);
    sprite.body.maxVelocity.set(200);

/** FIRE WEAPON */
    //  Tell the Weapon to track the 'player' Sprite
    //  With no offsets from the position
    //  But the 'true' argument tells the weapon to track sprite rotation
    weapon.trackSprite(sprite, 30, 0.9, true);

    cursors = this.input.keyboard.createCursorKeys();

    fireButton = this.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);

/** ASTEROIDS */
    asteroid = game.add.group();
    asteroid.enableBody = true;
    asteroid.physicsBodyType = Phaser.Physics.ARCADE;
    createAsteroids();
    // asteroid = this.add.sprite(400, 300, 'asteroid');
    // asteroid.anchor.set(1);
    // game.physics.arcade.enable(sprite);
    // asteroid.body.drag.set(150);
    // asteroid.body.maxVelocity.set(150);

/** SCORE */
    scoreString = 'Score : ';
    scoreText = game.add.text(10, 10, scoreString + score, { font: '34px Arial', fill: '#fff' });

/** LIVES */
    lives = game.add.group();
    game.add.text(game.world.width - 100, 10, 'Lives : ', { font: '34px Arial', fill: '#fff' });
}

// /** TESTING */
// function createAsteroids(){
//     var randomx = game.rnd.integerInRange(50, 1230);
//     var randomy = game.rnd.integerInRange(50, 670);

//     var enemy = enemy.create(randomx, randomy, 'asteroid');
//     //     for (var y = 0; y < 4; y++)
//     // {
//     //     for (var x = 0; x < 10; x++)
//     //     {
//     //         var alien = aliens.create(x * 48, y * 50, 'invader');
//     //         alien.anchor.setTo(0.5, 0.5);
//     //         alien.animations.add('fly', [ 0, 1, 2, 3 ], 20, true);
//     //         alien.play('fly');
//     //         alien.body.moves = false;
//     //     }
//     // }

//     // aliens.x = 100;
//     // aliens.y = 50;

//     // //  All this does is basically start the invaders moving. Notice we're moving the Group they belong to, rather than the invaders directly.
//     // var tween = game.add.tween(aliens).to( { x: 200 }, 2000, Phaser.Easing.Linear.None, true, 0, 1000, true);

//     // //  When the tween loops it calls descend
//     // tween.onLoop.add(descend, this);
// }

// function setupInvader (invader) {

//     invader.anchor.x = 0.5;
//     invader.anchor.y = 0.5;
//     invader.animations.add('kaboom');

// }

// function descend() {
//     aliens.y += 10;
// }

/** PHYSICS */
function update() {

    if (cursors.up.isDown)
    {
        game.physics.arcade.accelerationFromRotation(sprite.rotation, 300, sprite.body.acceleration);
    }
    else
    {
        sprite.body.acceleration.set(0);
    }

    if (cursors.left.isDown)
    {
        sprite.body.angularVelocity = -300;
    }
    else if (cursors.right.isDown)
    {
        sprite.body.angularVelocity = 300;
    }
    else
    {
        sprite.body.angularVelocity = 0;
    }

    if (fireButton.isDown)
    {
        weapon.fire();
    }

    game.world.wrap(sprite, 16);
    
    //  Run collision
    // game.physics.arcade.overlap(bullets, aliens, collisionHandler, null, this);
    // game.physics.arcade.overlap(enemyBullets, player, enemyHitsPlayer, null, this);
}

function render() {
    game.debug.text('Disparar: Spacebar', 10, 75);
    game.debug.text('Pausar: Tab', 10, 95);
    weapon.debug();
}


// /** MORE TESTING */
// function collisionHandler (bullet, alien) {

//     //  When a bullet hits an alien we kill them both
//     bullet.kill();
//     alien.kill();

//     //  Increase the score
//     score += 20;
//     scoreText.text = scoreString + score;

//     //  And create an explosion :)
//     var explosion = explosions.getFirstExists(false);
//     explosion.reset(alien.body.x, alien.body.y);
//     explosion.play('kaboom', 30, false, true);

//     if (aliens.countLiving() == 0)
//     {
//         score += 1000;
//         scoreText.text = scoreString + score;

//         enemyBullets.callAll('kill',this);
//         stateText.text = " You Won, \n Click to restart";
//         stateText.visible = true;

//         //the "click to restart" handler
//         game.input.onTap.addOnce(restart,this);
//     }
// }

// function enemyHitsPlayer (player,bullet) {
    
//     bullet.kill();

//     live = lives.getFirstAlive();

//     if (live)
//     {
//         live.kill();
//     }

//     //  And create an explosion :)
//     var explosion = explosions.getFirstExists(false);
//     explosion.reset(player.body.x, player.body.y);
//     explosion.play('kaboom', 30, false, true);

//     // When the player dies
//     if (lives.countLiving() < 1)
//     {
//         player.kill();
//         enemyBullets.callAll('kill');

//         stateText.text=" GAME OVER \n Click to restart";
//         stateText.visible = true;

//         //the "click to restart" handler
//         game.input.onTap.addOnce(restart,this);
//     }
// }

// function enemyFires () {

//     //  Grab the first bullet we can from the pool
//     enemyBullet = enemyBullets.getFirstExists(false);

//     livingEnemies.length=0;

//     aliens.forEachAlive(function(alien){

//         // put every living enemy in an array
//         livingEnemies.push(alien);
//     });


//     if (enemyBullet && livingEnemies.length > 0)
//     {
        
//         var random=game.rnd.integerInRange(0,livingEnemies.length-1);

//         // randomly select one of them
//         var shooter=livingEnemies[random];
//         // And fire the bullet from this enemy
//         enemyBullet.reset(shooter.body.x, shooter.body.y);

//         game.physics.arcade.moveToObject(enemyBullet,player,120);
//         firingTimer = game.time.now + 2000;
//     }

// }

// function fireBullet () {

//     //  To avoid them being allowed to fire too fast we set a time limit
//     if (game.time.now > bulletTime)
//     {
//         //  Grab the first bullet we can from the pool
//         bullet = bullets.getFirstExists(false);

//         if (bullet)
//         {
//             //  And fire it
//             bullet.reset(player.x, player.y + 8);
//             bullet.body.velocity.y = -400;
//             bulletTime = game.time.now + 200;
//         }
//     }
// }

// function resetBullet (bullet) {

//     //  Called if the bullet goes out of the screen
//     bullet.kill();
// }

// function restart () {
//     //  A new level starts
    
//     //resets the life count
//     lives.callAll('revive');
//     //  And brings the aliens back from the dead :)
//     aliens.removeAll();
//     createAliens();

//     //revives the player
//     player.revive();
//     //hides the text
//     stateText.visible = false;
// }
