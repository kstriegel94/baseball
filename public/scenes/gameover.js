Crafty.defineScene('GameOver', function(attrs) {

//Crafty.audio.add('ballgame', 'sounds/Ballgame.mp3');
//Crafty.audio.play('ballgame',-1);

  Crafty.e('2D, Canvas, Color')
    .color('#0D6522')
    .attr({w: 900, h: 800});

  Crafty.sprite('img/gameover.png', {logo:[0,0,2500,1250]});
  Crafty.e('2D, Canvas, DOM, logo').attr({x: 150, y:0, w:625, h:312});

  Crafty.sprite('img/replay_button.png', {replay_button:[0,0,320,320]});

  /*var title = Crafty.e('Canvas, Text')
    .text('Game Over')
    .textFont({
      family: 'Arial',
      size: '42px',
      weight: 'bold'
    });*/

  var score_text = Crafty.e('Canvas, Text')
    .text('Final Score: ' + hit)
    .textColor('white')
    .textFont({
      family: 'Adidas Half Block 2016',
      size: '42px',
    });

  //title.attr({x: (Crafty.viewport._width - title.w) / 2});
  score_text.attr({x: (Crafty.viewport._width-score_text.w) / 2, y: 300});

  var replay_button = Crafty.e('Button, replay_button, Canvas')
    .attr({x: 0, y: 400, w:150, h:150})
    .bind('Click', function() {
        Crafty.enterScene('Play');
        hit = 0;
    });

  replay_button.attr({x: (Crafty.viewport._width - replay_button.w) / 2});
});