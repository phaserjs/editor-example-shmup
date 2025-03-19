
// You can write more code here

/* START OF COMPILED CODE */

/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class EnemyFlying extends Phaser.Physics.Arcade.Sprite {

	constructor(scene, x, y, texture, frame) {
		super(scene, x ?? 626, y ?? 494, texture || "ships", frame ?? 12);

		this.flipY = true;
		scene.physics.add.existing(this, false);
		this.body.setSize(64, 64, false);

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	/* START-USER-CODE */

	// path coordinates for enemy to follow
	paths = [
		[[200, -50], [1080, 160], [200, 340], [1080, 520], [200, 700], [1080, 780]],
		[[-50, 200], [1330, 200], [1330, 400], [-50, 400], [-50, 600], [1330, 600]],
		[[-50, 360], [640, 50], [1180, 360], [640, 670], [50, 360], [640, 50], [1180, 360], [640, 670], [-50, 360]],
		[[1330, 360], [640, 50], [50, 360], [640, 670], [1180, 360], [640, 50], [50, 360], [640, 670], [1330, 360]],
	]

	// enemy health
	health = 1;

	// minimum fire rate
    fireCounterMin = 100;

	// maximum fire rate 
    fireCounterMax = 300;

    fireCounter;

	// enemy strength
    power = 1;

	initEnemy(pathId, speed, power) {

		this.power = power;

		this.fireCounter = Phaser.Math.RND.between(this.fireCounterMin, this.fireCounterMax); // random firing interval

		this.initPath(pathId, speed); // choose path to follow
	}

	preUpdate(time, delta) {

		super.preUpdate(time, delta);

		if (this.pathIndex > 1) {

			return; // stop updating if reached end of path
		}

		// get current coordinate based on percentage moved
		this.path.getPoint(this.pathIndex, this.pathVector);

		// set position of this enemy
		this.setPosition(this.pathVector.x, this.pathVector.y);

		// increment percentage moved by pathSpeed
		this.pathIndex += this.pathSpeed;

		if (this.pathIndex > 1) {

			this.die();
		}

		// update firing interval
		if (this.fireCounter > 0) {

			this.fireCounter--;

		} else {

			this.fire();
		}
	}

	hit(damage) {

		this.health -= damage;

		console.log("Enemy hit! Health: " + this.health);

		if (this.health <= 0) {

			this.die();
		}
	}

	die() {

		this.scene.addExplosion(this.x, this.y);

		this.scene.removeEnemy(this);
	}

	fire() {

		this.fireCounter = Phaser.Math.RND.between(this.fireCounterMin, this.fireCounterMax);

		this.scene.fireEnemyBullet(this.x, this.y, this.power);
	}

	initPath(pathId, speed) {

		const points = this.paths[pathId];

		this.path = new Phaser.Curves.Spline(points);

		// current coordinates along path in pixels
		this.pathVector = new Phaser.Math.Vector2();

		// percentage of position moved along path, 0 = beginning, 1 = end
		this.pathIndex = 0;

		// speed of movement
		this.pathSpeed = speed;

		this.path.getPoint(0, this.pathVector); // get coordinates based on pathIndex

		this.setPosition(this.pathVector.x, this.pathVector.y);
	}

	getPower() {

		return this.power;
	}

	remove() {

		this.scene.removeEnemy(this);
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
