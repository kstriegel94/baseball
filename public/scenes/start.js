Crafty.defineScene('Start', function(attrs) {
Crafty.audio.add('ballgame', 'sounds/Ballgame.mp3');
Crafty.audio.play('ballgame',-1);
  
  Crafty.e('2D, Canvas, Color')
    .color('#0D6522')
    .attr({w: 900, h: 800});

Crafty.sprite('img/baseball_home_logo.png', {logo:[0,0,608,311]});
Crafty.e('2D, Canvas, DOM, logo').attr({x: 150, y:50});

Crafty.sprite('img/play_button.png', {play_button:[0,0,322,342]});

  var direction = Crafty.e('Canvas, Text')
    .text('Use directional keys to move crosshair')
    .textColor('white')
    .textFont({
      family: 'Adidas Half Block 2016',
      size: '30px',
    });

  var direction2 = Crafty.e('Canvas, Text')
    .text('Use spacebar to hit the ball')
    .textColor('white')
    .textFont({
      family: 'Adidas Half Block 2016',
      size: '30px',
    });

  var direction3 = Crafty.e('Canvas, Text')
    .text('Three strikes and you lose')
    .textColor('white')
    .textFont({
      family: 'Adidas Half Block 2016',
      size: '30px',
    });

  direction.attr({x: (Crafty.viewport._width - direction.w) / 2, y: 275});
  direction2.attr({x: (Crafty.viewport._width - direction2.w) / 2, y: 325});
  direction3.attr({x: (Crafty.viewport._width - direction3.w) / 2, y: 375});

  var start_button = Crafty.e('Button, play_button, Canvas')
    .attr({x: 0, y: 450, w:150, h:150})
    .bind('Click', function() {
      setTimeout(function() {
        Crafty.enterScene('Play');
      }, 500);
    });

  start_button.attr({x: (Crafty.viewport._width - start_button.w) / 2});
});