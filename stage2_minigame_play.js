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
    scene: [MenuScene, GameScene] // 메인 메뉴와 게임 장면 포함
};

const game = new Phaser.Game(config);

class MenuScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MenuScene' });
    }

    preload() {
        this.load.image('menuBg', 'menu_background.png');
        this.load.image('unix', 'assets/unix.png');
        this.load.image('linux', 'assets/linux.png');
    }

    create() {
        this.add.image(400, 300, 'menuBg');
        this.add.text(300, 100, 'Choose Your OS', { fontSize: '32px', fill: '#FFF' });

        const unixButton = this.add.image(300, 300, 'unix').setInteractive();
        const linuxButton = this.add.image(500, 300, 'linux').setInteractive();

        unixButton.on('pointerdown', () => {
            this.startGame('Unix');
        });
        linuxButton.on('pointerdown', () => {
            this.startGame('Linux');
        });
    }

    startGame(os) {
        this.scene.start('GameScene', { os: os });
    }
}

class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' });
    }

    init(data) {
        this.selectedOS = data.os; // Unix 또는 Linux 정보 전달받음
    }

    preload() {
        this.load.image('background', 'assets/background.png');
        this.load.image('player', 'assets/player.png');
        this.load.image('enemy', 'assets/enemy.png');
    }

    create() {
        this.add.image(400, 300, 'background');
        this.player = this.physics.add.sprite(400, 500, 'player');
        this.player.setCollideWorldBounds(true);

        this.cursors = this.input.keyboard.createCursorKeys();

        this.enemies = this.physics.add.group({
            key: 'enemy',
            repeat: 5,
            setXY: { x: 100, y: 100, stepX: 120 }
        });

        this.enemies.children.iterate((enemy) => {
            enemy.setVelocity(Phaser.Math.Between(-200, 200), 20);
            enemy.setCollideWorldBounds(true);
            enemy.setBounce(1);
        });

        this.physics.add.collider(this.player, this.enemies, this.hitEnemy, null, this);

        this.score = 0;
        this.scoreText = this.add.text(16, 16, `Score: 0`, { fontSize: '32px', fill: '#FFF' });

        this.osAbilities();
    }

    update() {
        this.player.setVelocity(0);

        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-300);
        } else if (this.cursors.right.isDown) {
            this.player.setVelocityX(300);
        }

        if (this.cursors.up.isDown) {
            this.player.setVelocityY(-300);
        } else if (this.cursors.down.isDown) {
            this.player.setVelocityY(300);
        }
    }

    hitEnemy(player, enemy) {
        enemy.disableBody(true, true);
        this.score += 10;
        this.scoreText.setText(`Score: ${this.score}`);
    }

    osAbilities() {
        if (this.selectedOS === 'Unix') {
            this.player.setScale(1.5); // Unix: 크고 튼튼
        } else if (this.selectedOS === 'Linux') {
            this.player.setScale(0.8); // Linux: 작지만 빠름
            this.player.setVelocity(400);
        }
    }
}
