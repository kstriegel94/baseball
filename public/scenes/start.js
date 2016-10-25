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

  title.attr({x: (Crafty.viewport._width - title.w) / 2});

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