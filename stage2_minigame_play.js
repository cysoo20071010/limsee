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
    scene: [MenuScene, GameScene]
};

const game = new Phaser.Game(config);

class MenuScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MenuScene' });
    }

    preload() {
        this.load.image('menuBg', 'menu_background.png');
        this.load.image('unix', 'Unix.png');
        this.load.image('linux', 'Linux.png');
    }

    create() {
        this.add.image(400, 300, 'menuBg');
        this.add.text(300, 100, 'Choose Your OS', { fontSize: '32px', fill: '#FFF' });

        const unixButton = this.add.image(300, 300, 'unix').setInteractive().setScale(0.5);
        const linuxButton = this.add.image(500, 300, 'linux').setInteractive().setScale(0.5);

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
        this.selectedOS = data.os;
    }

    preload() {
        this.load.image('background', 'stage2_minigame_background.png');
        this.load.image('player', 'Player.png');
        this.load.image('enemy', 'Enemy.png');
        this.load.image('bullet', 'bullet.png');
    }

    create() {
        this.add.image(400, 300, 'background');

        // 플레이어 설정
        this.player = this.physics.add.sprite(400, 500, 'player').setScale(0.5);
        this.player.setCollideWorldBounds(true);

        // 적 그룹 생성
        this.enemies = this.physics.add.group();

        // 총알 그룹 생성
        this.bullets = this.physics.add.group();

        // 키 입력 설정
        this.cursors = this.input.keyboard.createCursorKeys();
        this.spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        // UI 설정
        this.health = 3; // 플레이어 체력
        this.score = 0; // 점수
        this.scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '20px', fill: '#FFF' });
        this.healthText = this.add.text(16, 40, 'Health: 3', { fontSize: '20px', fill: '#FFF' });

        // 적 생성 타이머
        this.time.addEvent({
            delay: 1000,
            callback: this.spawnEnemy,
            callbackScope: this,
            loop: true
        });

        // 충돌 설정
        this.physics.add.collider(this.bullets, this.enemies, this.hitEnemy, null, this);
        this.physics.add.collider(this.player, this.enemies, this.hitPlayer, null, this);
    }

    update() {
        // 플레이어 이동
        this.player.setVelocity(0);
        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-200);
        } else if (this.cursors.right.isDown) {
            this.player.setVelocityX(200);
        }
        if (this.cursors.up.isDown) {
            this.player.setVelocityY(-200);
        } else if (this.cursors.down.isDown) {
            this.player.setVelocityY(200);
        }

        // 총알 발사
        if (Phaser.Input.Keyboard.JustDown(this.spaceBar)) {
            this.shootBullet();
        }
    }

    spawnEnemy() {
        const x = Phaser.Math.Between(50, 750);
        const y = Phaser.Math.Between(50, 100);
        const enemy = this.enemies.create(x, y, 'enemy').setScale(0.5);
        enemy.setVelocity(Phaser.Math.Between(-100, 100), 100);
        enemy.setCollideWorldBounds(true);
        enemy.setBounce(1);
    }

    shootBullet() {
        const bullet = this.bullets.create(this.player.x, this.player.y, 'bullet').setScale(0.3);
        bullet.setVelocityY(-300);
        bullet.setCollideWorldBounds(true);
        bullet.on('worldbounds', () => {
            bullet.destroy();
        });
    }

    hitEnemy(bullet, enemy) {
        bullet.destroy();
        enemy.destroy();
        this.score += 10;
        this.scoreText.setText('Score: ' + this.score);
    }

    hitPlayer(player, enemy) {
        enemy.destroy();
        this.health -= 1;
        this.healthText.setText('Health: ' + this.health);

        if (this.health <= 0) {
            this.scene.start('MenuScene');
        }
    }
}
