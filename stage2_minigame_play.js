const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: '#222',
    physics: {
      default: 'arcade',
      arcade: {
        debug: false,
      },
    },
    scene: {
      preload,
      create,
      update,
    },
  };
  
  const game = new Phaser.Game(config);
  
  let player;
  let cursors;
  let bullets;
  let enemies;
  let lastFired = 0;
  
  function preload() {
    // No assets to preload since we are using simple shapes
  }
  
  function create() {
    // Create player as a rectangle
    player = this.add.rectangle(400, 550, 50, 20, 0x00ff00);
    this.physics.add.existing(player);
    player.body.setCollideWorldBounds(true);
  
    // Group for bullets
    bullets = this.physics.add.group();
  
    // Create enemies as rectangles
    enemies = this.physics.add.group();
    for (let i = 0; i < 10; i++) {
      let enemy = this.add.rectangle(100 + i * 60, 100, 40, 20, 0xff0000);
      this.physics.add.existing(enemy);
      enemies.add(enemy);
    }
  
    // Add keyboard input
    cursors = this.input.keyboard.createCursorKeys();
  
    // Collision detection between bullets and enemies
    this.physics.add.overlap(bullets, enemies, (bullet, enemy) => {
      bullet.destroy();
      enemy.destroy();
    });
  }
  
  function update(time) {
    // Player movement
    if (cursors.left.isDown) {
      player.body.setVelocityX(-300);
    } else if (cursors.right.isDown) {
      player.body.setVelocityX(300);
    } else {
      player.body.setVelocityX(0);
    }
  
    // Shooting bullets
    if (cursors.space.isDown && time > lastFired) {
      const bullet = this.add.rectangle(player.x, player.y - 20, 5, 10, 0xffff00);
      this.physics.add.existing(bullet);
      bullet.body.setVelocityY(-400);
      bullets.add(bullet);
  
      lastFired = time + 300; // Fire rate
    }
  
    // Enemy movement (simple oscillation)
    enemies.children.iterate((enemy) => {
      enemy.x += Math.sin(time / 500) * 2; // Oscillating movement
    });
  }
  