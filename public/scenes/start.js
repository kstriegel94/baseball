Crafty.defineScene('Start', function(attrs) {
  Crafty.e('2D, Canvas, Color')
    .color('white')
    .attr({w: 900, h: 800});

  var title = Crafty.e('Canvas, Text')
    .text('TIM TEBALL')
    .textFont({
      family: 'Arial',
      size: '42px',
      weight: 'bold'
    });

  var direction = Crafty.e('Canvas, Text')
    .text('Use directional keys to move crosshair')
    .textFont({
      family: 'Arial',
      size: '20px',
      weight: 'bold'
    });

  var direction2 = Crafty.e('Canvas, Text')
    .text('Use spacebar to hit ball')
    .textFont({
      family: 'Arial',
      size: '20px',
      weight: 'bold'
    });

  var direction3 = Crafty.e('Canvas, Text')
    .text('Three strikes and you lose')
    .textFont({
      family: 'Arial',
      size: '20px',
      weight: 'bold'
    });

  title.attr({x: (Crafty.viewport._width - title.w) / 2});
  direction.attr({x: (Crafty.viewport._width - direction.w) / 2, y: 150});
  direction2.attr({x: (Crafty.viewport._width - direction2.w) / 2, y: 200});
  direction3.attr({x: (Crafty.viewport._width - direction3.w) / 2, y: 250});

  var start_button = Crafty.e('Button, Text, Canvas')
    .attr({x: 0, y: 100})
    .text('START')
    .bind('Click', function() {
      //Crafty.audio.play('nav');
      setTimeout(function() {
        Crafty.enterScene('Play');
      }, 500);
    });

  start_button.attr({x: (Crafty.viewport._width - start_button.w) / 2});
});