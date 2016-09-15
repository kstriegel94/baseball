Crafty.defineScene('Play', function() {

var bounds_width = 600;
var bounds_height = 500;
var padding = 150;
var speed = 4;
var max_baseball_size = 50;

var miss = 0;
var hit = 0;

var hit_score = Crafty.e('2D, DOM, Text').attr({x:100, y:50}).text('Hits: ' + hit);
var miss_score = Crafty.e('2D, DOM, Text').attr({x:200, y:50}).text('Strikes: ' + miss);

var speedx = Crafty.math.randomNumber(300,400); //speedx
var neg_speedx = Crafty.math.randomNumber(-400,-300);
var speedy = Crafty.math.randomNumber(300,400); //speedy
var neg_speedy = Crafty.math.randomNumber(-400,-300);
var posx = Crafty.math.randomNumber(150,750); //posX
var posy = Crafty.math.randomNumber(150,650); //posY

var frame = 0;

function choose_speed(x, y)
{
	if(Math.random() < 0.5)
	{
		return x;
	}

	return y;
}

baseball.initialize();
baseball.addBaseball('baseball', choose_speed(speedx, neg_speedx), choose_speed(speedy, neg_speedy), posx, posy);


function hit_ball()
{
	if(crosshair_entity.hit('baseball'))
	{
		frame = 0;
		console.log('entered in checkhits');
		hit++;
		baseball.destroy();
		hit_score.text('Hits: ' + hit);
		baseball.addBaseball('baseball', choose_speed(speedx, neg_speedx), choose_speed(speedy, neg_speedy), posx, posy);
	}
	else
	{
		frame = 0;
		miss++;
		miss_score.text('Strikes: ' + miss);
		baseball.destroy();
		baseball.addBaseball('baseball', choose_speed(speedx, neg_speedx), choose_speed(speedy, neg_speedy), posx, posy);
	}	
}

Crafty.background('grey');

Crafty.e('2D, Canvas, Color')
  .attr({x:padding, y:padding, w:bounds_width, h:bounds_height})
  .color('white');

Crafty.sprite('img/crosshair.png', {crosshair:[0,0,192,192]});


Crafty.e('2D, Canvas, wall_left, Color')
	.attr({x: padding, y: padding - 1, w: 0, h: bounds_height})
	.color('red');
Crafty.e('2D, Canvas, wall_right, Color')
	.attr({x: padding+bounds_width + 2, y: padding, w: 0, h: bounds_height})
	.color('red');
Crafty.e('2D, Canvas, wall_bottom, Color')
	.attr({x: padding, y: padding+bounds_height, w: bounds_width, h: 0})
	.color('red');
Crafty.e('2D, Canvas, wall_top, Color')
	.attr({x: padding, y: padding, w: bounds_width, h: 0})
	.color('red');

var target1 = Crafty.e('2D, Canvas, Color, target1, Fourway, Collision')
	.attr({x:605, y:505, z:5, w:0.1, h:0.1})
	.color('red');

var target = new Crafty.circle(625,525,1);


var crosshair_entity = Crafty.e('2D, DOM, crosshair, Fourway, Collision, Keyboard, Motion')
	.attr({x:412.5,y:362.5, z:2, w:75, h:75})
	//.fourway([200])
	.multiway(200, {UP_ARROW: Crafty.math.randomNumber(0,89), DOWN_ARROW: Crafty.math.randomNumber(-1,-89), RIGHT_ARROW: Crafty.math.randomNumber(-90,-179), LEFT_ARROW: Crafty.math.randomNumber(90,179)})
	.collision()
	.onHit('wall_left', function() {
		this.x += -this.dx;
	})
	.onHit('wall_right', function() {
		this.x += -this.dx;
	})
	.onHit('wall_top', function() {
		this.y += -this.dy;
	})
	.onHit('wall_bottom', function() {
		this.y += -this.dy;
	})
	.bind('KeyDown', function(e) {
		if(e.key == Crafty.keys.SPACE){
			console.log('hit');
			hit_ball();
		}
	});

var ch_vel = crosshair_entity.velocity();

function is_game_over() {
	return miss == 3;
}


function run(ts) {
	frame += 1;

  	speedx = Crafty.math.randomNumber(300,400); //speedx
  	speedy = Crafty.math.randomNumber(300,400); //speedy
  	posx = Crafty.math.randomNumber(150,750); //posX
  	posy = Crafty.math.randomNumber(150,650); //posY
  	neg_speedx = Crafty.math.randomNumber(-400,-300);
  	neg_speedy = Crafty.math.randomNumber(-400,-300);

	//baseball.check_size();
	//baseball.reflect_baseball(4,4);

	if(is_game_over()) {
		Crafty.enterScene('GameOver');
	}
	else {
		
		if (frame == 400)
		{
			frame = 0;
			console.log('time');
			miss++;
			miss_score.text('Strikes: ' + miss);
			baseball.destroy();
			baseball.addBaseball('baseball', choose_speed(speedx, neg_speedx), choose_speed(speedy, neg_speedy), posx, posy);
		}
		window.requestAnimationFrame(run);
	}
}

window.requestAnimationFrame(run);

});