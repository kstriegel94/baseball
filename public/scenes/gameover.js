Crafty.defineScene('GameOver', function(attrs) {

  Crafty.e('2D, Canvas, Color')
    .color('white')
    .attr({w: 900, h: 800});

  var title = Crafty.e('Canvas, Text')
    .text('Game Over')
    .textFont({
      family: 'Arial',
      size: '42px',
      weight: 'bold'
    });

  title.attr({x: (Crafty.viewport._width - title.w) / 2});

  var button = Crafty.e('Button, Text, Canvas')
    .attr({x: 0, y: 100})
    .text('RESTART')
    .bind('Click', function() {
        Crafty.enterScene('Play');
    });

  button.attr({x: (Crafty.viewport._width - button.w) / 2});
});