const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

const game = new Phaser.Game(config);
let player;
let cursors;
let enemies;
let score = 0;
let scoreText;

function preload() {
    this.load.image('background', 'assets/background.png');
    this.load.image('player', 'assets/player.png');
    this.load.image('enemy', 'assets/enemy.png');
}

function create() {
    this.add.image(400, 300, 'background');

    player = this.physics.add.sprite(400, 500, 'player');
    player.setCollideWorldBounds(true);

    cursors = this.input.keyboard.createCursorKeys();

    enemies = this.physics.add.group({
        key: 'enemy',
        repeat: 5,
        setXY: { x: 100, y: 100, stepX: 120 }
    });

    enemies.children.iterate(function (enemy) {
        enemy.setVelocity(Phaser.Math.Between(-200, 200), 20);
        enemy.setCollideWorldBounds(true);
        enemy.setBounce(1);
    });

    this.physics.add.collider(player, enemies, hitEnemy, null, this);

    scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#FFF' });
}

function update() {
    player.setVelocity(0);

    if (cursors.left.isDown) {
        player.setVelocityX(-300);
    } else if (cursors.right.isDown) {
        player.setVelocityX(300);
    }

    if (cursors.up.isDown) {
        player.setVelocityY(-300);
    } else if (cursors.down.isDown) {
        player.setVelocityY(300);
    }
}

function hitEnemy(player, enemy) {
    enemy.disableBody(true, true);
    score += 10;
    scoreText.setText('Score: ' + score);
}
