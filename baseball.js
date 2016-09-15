Crafty.sprite('img/baseball.png', {baseball:[0,0,512,512]});

var baseball = {

	vx: 2,
	vy: 2,

	initialize: function() {
		this._elements = [];
	},

	destroy: function() {
	for(var i = 0; i < this._elements.length; i++) {
     	 this._elements[i].destroy();
    	}
	},

	reflect_baseball: function(speedx, speedy) {
		for(var i = 0; i < this._elements.length; i++)
		{
			if(this._elements[i].x - 10 + this.vx < 150 || this._elements[i].x + 10 + this.vx > 750)
			{
				this.vx = -this.vx;
			}

			if(this._elements[i].y - 10 < 150 || this._elements[i].y + 10 > 650)
			{
				this.vy = -this.vy;
			}

			this._elements[i].x += this.vx;
			this._elements[i].y += this.vy;
		}
	},

	addBaseball: function(sprite, speedx, speedy, posX, posY) {
		var baseball_entity = Crafty.e('2D, DOM, Fourway, Collision, Motion, Tween, ' + sprite)
		.attr({x:posX, y:posY, z:1, w:20, h:20})
		//.attr({rotation:0})
		.attr({alpha: 1.0})
		//.tween({rotation:2160, w:75, h:75}, 10000, "smootherStep")
		//.tween({w:75, h:75}, 10000)
		.collision()
		.onHit('wall_left', function() {
		//vel.x = -vel.x;
		//vel.vx = -vel.vx;
		})
		.onHit('wall_right', function() {
		//vel.x = -vel.x;
		//this.x += -this.dx;
		})
		.onHit('wall_top', function() {
		//vel.y = -vel.y;
		//this.y += -this.dy;
		})
		.onHit('wall_bottom', function() {
		//vel.y = -vel.y;
		//this.y += -this.dy;
		})

		//var vel = baseball_entity.velocity();
		//vel.x = speedx;
		//vel.y = speedy;

		this._elements.push(baseball_entity);

		return baseball_entity;
		}
};