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

  var score_text = Crafty.e('Canvas, Text')
    .text('Final Score: ' + hit)
    .textFont({
      family: 'Arial',
      size: '42px',
      weight: 'bold'
    });

  title.attr({x: (Crafty.viewport._width - title.w) / 2});
  score_text.attr({x: (Crafty.viewport._width-score_text.w) / 2, y: 200});

  var button = Crafty.e('Button, Text, Canvas')
    .attr({x: 0, y: 100})
    .text('RESTART')
    .bind('Click', function() {
        Crafty.enterScene('Play');
        hit = 0;
    });

  button.attr({x: (Crafty.viewport._width - button.w) / 2});
});