
// You can write more code here

/* START OF COMPILED CODE */

/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class EnemyBullet extends Phaser.Physics.Arcade.Sprite {

	constructor(scene, x, y, texture, frame) {
		super(scene, x ?? 420, y ?? 230, texture || "tiles", frame ?? 0);

		this.flipY = true;
		scene.physics.add.existing(this, false);
		this.body.setSize(16, 20, false);

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	/* START-USER-CODE */

	power;

	setPower(power) {

		this.power = power;

		this.setVelocity(200 * power * 0.5);
	}

	getPower() {

		return this.power;
	}

	preUpdate(time, delta) {

		super.preUpdate(time, delta);

		this.checkWorldBounds();
	}

	// is this bullet below the screen?
	checkWorldBounds() {

		if (this.y > this.scene.scale.height) {

			this.die();
		}
	}

	die() {

		this.scene.removeEnemyBullet(this);
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
