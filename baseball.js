Crafty.sprite('img/baseball.png', {baseball:[0,0,512,512]});

/*(function() {

	var required = ['2D', 'DOM', 'Fourway', 'Collision', 'Motion', 'Tween', 'Ball'];

	Crafty.c('Baseball', {
		required: required.join(','),

		events: {
			'KeyDown': 'on_key_down',
			'HitOn': 'on_hit_on',
		},

		init: function() {
			this.attr({x:})
		}


	})	
}*/

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

	addBaseball: function(sprite, speedx, speedy, posX, posY) {
		var baseball_entity = Crafty.e('2D, DOM, Fourway, Collision, Motion, Tween, ' + sprite)
		.attr({x:posX, y:posY, z:1, w:20, h:20})
		.attr({rotation:0})
		//.attr({alpha: 1.0})
		//.tween({rotation:2160, w:75, h:75}, 10000) 
		.tween({w:75, h:75}, 5000)
		.checkHits('Solid')
		.collision()
		.onHit('wall_left', function() {
		vel.x = -vel.x;
		})
		.onHit('wall_right', function() {
		vel.x = -vel.x;
		})
		.onHit('wall_top', function() {
		vel.y = -vel.y;
		})
		.onHit('wall_bottom', function() {
		vel.y = -vel.y;
		})
		.bind('scale_up', function() {
			this.w+=.2;
			this.h+=.2;
		})

		var vel = baseball_entity.velocity();
		vel.x = speedx;
		vel.y = speedy;

		this._elements.push(baseball_entity);

		return baseball_entity;
		}
};