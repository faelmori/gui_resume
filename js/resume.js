(function($) {
  "use strict";

  // Smooth scrolling using jQuery easing
  $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function(e) {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        var offsetTop = target.offset().top;
        // On mobile, offset by navbar height
        if ($(window).width() < 992) {
          offsetTop -= 64;
        }
        $('html, body').stop().animate({
          scrollTop: offsetTop
        }, 800, "easeInOutExpo");
        return false;
      }
    }
  });

  // Closes responsive menu when a scroll trigger link is clicked
  $('.js-scroll-trigger').click(function() {
    $('.navbar-collapse').collapse('hide');
  });

  // Activate scrollspy to add active class to navbar items on scroll
  $('body').scrollspy({
    target: '#sideNav',
    offset: 120
  });

  // ==========================================================================
  // Pixel Dino Runner Animation (HUB Futuro AI Easter Egg 🦖)
  // ==========================================================================
  function initDinoRunner() {
    var canvas = document.getElementById('dinoCanvas');
    if (!canvas) return;

    var ctx = canvas.getContext('2d');
    if (!ctx) return;

    var upperBody = [
      '..............*.......',
      '.............***......',
      '..............*.......',
      '...........########...',
      '..........##O########.',
      '..........###########.',
      '..........###########.',
      '..........######......',
      '..........#########...',
      '#........######.......',
      '#.......#######.......',
      '##.....##########.....',
      '###...#########.##....',
      '##############........',
      '.############.........',
      '..##########..........',
      '...########...........',
    ];

    var legs0 = [
      '....###..##...........',
      '....##....#...........',
      '....###...##..........',
    ];

    var legs1 = [
      '....##...###..........',
      '....#.....##..........',
      '....##...###..........',
    ];

    var frame = 0;
    var jumpY = 0;
    var jumpVelocity = 0;
    var isJumping = false;
    var cellSize = 2; // 22 * 2 = 44px wide, 20 * 2 = 40px high

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (isJumping) {
        jumpY += jumpVelocity;
        jumpVelocity += 0.4; // gravity
        if (jumpY >= 0) {
          jumpY = 0;
          jumpVelocity = 0;
          isJumping = false;
        }
      }

      var currentRows = upperBody.concat(frame === 0 ? legs0 : legs1);

      for (var y = 0; y < currentRows.length; y++) {
        var row = currentRows[y];
        for (var x = 0; x < row.length; x++) {
          var char = row[x];
          var color = null;
          if (char === '#') color = '#F26B1D';
          else if (char === 'O') color = '#FAF9F5';
          else if (char === '*') color = '#FF8A3D';

          if (color) {
            ctx.fillStyle = color;
            ctx.fillRect(x * cellSize, y * cellSize + jumpY, cellSize, cellSize);
          }
        }
      }
    }

    setInterval(function() {
      if (!isJumping) {
        frame = frame === 0 ? 1 : 0;
      }
      draw();
    }, 130);

    canvas.addEventListener('click', function() {
      if (!isJumping) {
        isJumping = true;
        jumpVelocity = -5;
      }
    });

    draw();
  }

  $(document).ready(function() {
    initDinoRunner();
  });

})(jQuery);
