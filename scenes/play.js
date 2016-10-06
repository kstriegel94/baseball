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

var speedx = Crafty.math.randomInt(500 ,550); //speedx
var neg_speedx = Crafty.math.randomInt(-550,-500);
var speedy = Crafty.math.randomInt(500,550); //speedy
var neg_speedy = Crafty.math.randomInt(-550,-500);


var posx = Crafty.math.randomInt(300,600); //posX
var posy = Crafty.math.randomInt(300,500); //posY

var dir_w = Crafty.math.randomInt(65,90);
var dir_n = Crafty.math.randomInt(65,90);
var dir_e = Crafty.math.randomInt(65,90);
var dir_s = Crafty.math.randomInt(65,90);

var text_w = Crafty.e('2D, DOM, Text').attr({x:250, y:50}).text('West: ' + dir_w);
var text_n = Crafty.e('2D, DOM, Text').attr({x:300, y:50}).text('North: ' + dir_n);
var text_e = Crafty.e('2D, DOM, Text').attr({x:400, y:50}).text('East: ' + dir_e);
var text_s = Crafty.e('2D, DOM, Text').attr({x:450, y:50}).text('South: ' + dir_s);

var frame = 0;

function random_key()
{
	return Crafty.math.randomInt(65, 90);
}

function choose_speed(x, y)
{
	if(Math.random() < 0.5)
	{
		console.log('speed: ' + x)
		return x;
	}

	console.log('speed: ' + y);
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

var bg = Crafty.e('2D, DOM, Image')
	.image('img/field.png')
	.attr({x:150, y:150});

Crafty.e('2D, Canvas, Color')
  .attr({x:padding, y:padding, w:bounds_width, h:bounds_height})
  .color('white');

Crafty.sprite('img/crosshair.png', {crosshair:[0,0,192,192]});


Crafty.e('2D, Canvas, wall_left, Color, Collision, Solid')
	.attr({x: padding-100, y: padding - 1, w: 100, h: bounds_height})
	.color('red');
Crafty.e('2D, Canvas, wall_right, Color, Collision, Solid')
	.attr({x: padding+bounds_width + 2, y: padding, w: 200, h: bounds_height})
	.color('red');
Crafty.e('2D, Canvas, wall_bottom, Color, Collision, Solid')
	.attr({x: padding, y: padding+bounds_height, w: bounds_width, h: 200})
	.color('red');
Crafty.e('2D, Canvas, wall_top, Color, Collision, Solid')
	.attr({x: padding, y: padding - 100, w: bounds_width, h: 100})
	.color('red');

var target1 = Crafty.e('2D, Canvas, Color, target1, Fourway, Collision')
	.attr({x:605, y:505, z:5, w:0.1, h:0.1})
	.color('red');

var target = new Crafty.circle(625,525,1);


var crosshair_entity = Crafty.e('2D, DOM, crosshair, Fourway, Collision, Keyboard, Motion')
	.attr({x:412.5,y:362.5, z:2, w:75, h:75})
	//.fourway([200])
	.multiway(200, {UP_ARROW: Crafty.math.randomNumber(0,89), DOWN_ARROW: Crafty.math.randomNumber(-1,-89), RIGHT_ARROW: Crafty.math.randomNumber(-90,-179), LEFT_ARROW: Crafty.math.randomNumber(90,179)})
	//.multiway(200, {north: -90, dir_s: 90, dir_w: 180, dir_e: 0})
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
		//console.log(e.key);
		if(e.key == Crafty.keys.SPACE){
			console.log('hit');
			hit_ball();
		}
		else if (e.key == dir_s){
			console.log('in south');
			this.y = this.y + 1;
			//this.speed = ({x: 10, y: 10})
		}
		else if (e.key == dir_e){
			this.x = this.x + 1;
			console.log('in east');
		}
		else if (e.key == dir_n){
			this.y = this.y - 1;
			console.log('in north');
		}
		else if (e.key == dir_w){
			this.x = this.x - 1;
			console.log('in west');
		}
		
	});

var ch_vel = crosshair_entity.velocity();

function is_game_over() {
	return miss == 3;
}


function run(ts) {
	frame += 1;
	//Crafty.trigger('scale_up');

 	speedx = Crafty.math.randomInt(500,550); //speedx
 	neg_speedx = Crafty.math.randomInt(-550,-500);
 	speedy = Crafty.math.randomInt(500,550); //speedy
 	neg_speedy = Crafty.math.randomInt(-550,-500);
 	posx = Crafty.math.randomInt(300,600); //posX
 	posy = Crafty.math.randomInt(300,500); //posY

	//baseball.check_size();
	//baseball.reflect_baseball(4,4);

	if(is_game_over()) {
		Crafty.enterScene('Play');
	}
	else {
		
		if (frame == 300)
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