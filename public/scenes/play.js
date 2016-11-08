var hit = 0;

Crafty.defineScene('Play', function() {

var bounds_width = 600;
var bounds_height = 500;
var padding = 150;
var speed = 4;
var max_baseball_size = 50;

var miss = 0;

var hit_digit = Crafty.e('2D, DOM, Text')
	.attr({x:165, y:53})
	.text(hit)
	.textColor('orange')
	.textFont({
		family: 'Digital-7',
		size: '30px',
	});

var hit_score = Crafty.e('2D, DOM, Text')
	.attr({x:100, y:50})
	.text('Hits: ')
	.textColor('white')
	.textFont({
		family: 'Adidas Half Block 2016',
		size: '30px',
	});

var miss_digit = Crafty.e('2D, DOM, Text')
	.attr({x: 310, y: 53})
	.text(miss)
	.textColor('orange')
	.textFont({
		family: 'Digital-7',
		size: '30px',
	})

var miss_score = Crafty.e('2D, DOM, Text')
	.attr({x:200, y:50})
	.text('Strikes: ')
	.textColor('white')
	.textFont({
		family: 'Adidas Half Block 2016',
		size: '30px',
	});

var speedx = Crafty.math.randomInt(500 ,550); //speedx
var neg_speedx = Crafty.math.randomInt(-550,-500);
var speedy = Crafty.math.randomInt(500,550); //speedy
var neg_speedy = Crafty.math.randomInt(-550,-500);

var posx = Crafty.math.randomInt(300,600); //posX
var posy = Crafty.math.randomInt(300,500); //posY

var info = document.getElementById('info');

var frame = 0;

Crafty.audio.add('hit_sound', 'sounds/hitcrowdcheer.mp3');

function random_key()
{
	return Crafty.math.randomInt(65, 90);
}

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
		if(Crafty.audio.isPlaying('hit_sound'))
		{
			Crafty.audio.remove('hit_sound');
		}
		frame = 0;
		hit++;
		baseball.destroy();
		Crafty.audio.play('hit_sound');
		hit_score.text('Hits: ');
		hit_digit.text(hit);
		baseball.addBaseball('baseball', choose_speed(speedx, neg_speedx), choose_speed(speedy, neg_speedy), posx, posy);
	}
	else
	{
		frame = 0;
		miss++;
		miss_score.text('Strikes: ');
		miss_digit.text(miss);
		baseball.destroy();
		baseball.addBaseball('baseball', choose_speed(speedx, neg_speedx), choose_speed(speedy, neg_speedy), posx, posy);
	}	
}

Crafty.background('#0D6522');

var bg = Crafty.e('2D, DOM, Image')
	.image('img/field.png')
	.attr({x:150, y:150});

Crafty.e('2D, Canvas, Color')
  .attr({x:padding, y:padding, w:bounds_width, h:bounds_height})
  .color('white');

Crafty.sprite('img/crosshair.png', {crosshair:[0,0,192,192]});


Crafty.e('2D, Canvas, wall_left, Color, Collision, Solid')
	.attr({x: padding-100, y: padding - 1, w: 100, h: bounds_height})

Crafty.e('2D, Canvas, wall_right, Color, Collision, Solid')
	.attr({x: padding+bounds_width + 2, y: padding, w: 200, h: bounds_height})

Crafty.e('2D, Canvas, wall_bottom, Color, Collision, Solid')
	.attr({x: padding, y: padding+bounds_height, w: bounds_width, h: 200})

Crafty.e('2D, Canvas, wall_top, Color, Collision, Solid')
	.attr({x: padding, y: padding - 100, w: bounds_width, h: 100})

var crosshair_entity = Crafty.e('2D, DOM, crosshair, Fourway, Collision, Keyboard, Motion, Mouse')
	.attr({x:412.5,y:362.5, z:2, w:75, h:75})
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
	/*.bind('Click', function(MouseEvent){
		hit_ball();
		console.log('click');
	})*/
	.bind('KeyDown', function(e) {
		if(e.key == Crafty.keys.SPACE){
			hit_ball();
		}
	});

/*function calculateDist(mouseX, mouseY) {
	return Math.floor(Math.sqrt(Math.pow(mouseX - 450, 2)) + Math.pow(mouseY - 400, 2));
}

function tellPos(p){
	info.innerHTML = 'Pos X: ' + p.pageX + '<br />Pos Y: ' + p.pageY;

	crosshair_entity.x = p.pageX - crosshair_entity.w/2;
	crosshair_entity.y = p.pageY - crosshair_entity.h/2;

	distance = calculateDist(p.pageX, p.pageY);
	//console.log(distance);
}*/

var ch_vel = crosshair_entity.velocity();

function is_game_over() {
	return miss == 3;
}


function run(ts) {
	frame += 1;

	//addEventListener('mousemove', tellPos, false);

 	speedx = Crafty.math.randomInt(500,550); //speedx
 	neg_speedx = Crafty.math.randomInt(-550,-500);
 	speedy = Crafty.math.randomInt(500,550); //speedy
 	neg_speedy = Crafty.math.randomInt(-550,-500);
 	posx = Crafty.math.randomInt(300,600); //posX
 	posy = Crafty.math.randomInt(300,500); //posY

	if(is_game_over()) {
		Crafty.enterScene('GameOver');
		hit = 0;
	}
	else {
		
		if (frame == 300)
		{
			frame = 0;
			miss++;
			miss_score.text('Strikes: ');
			miss_digit.text(miss);
			baseball.destroy();
			baseball.addBaseball('baseball', choose_speed(speedx, neg_speedx), choose_speed(speedy, neg_speedy), posx, posy);			
		}
		window.requestAnimationFrame(run);
	}
}

window.requestAnimationFrame(run);

});