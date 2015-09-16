$(function() {

  //click video/pause button;
  var video = $('video')[0];

  $("#progress").slider({
    range: "min",
    slide: function(event, ui){
      //update movie
      var duration = video.duration;
      var sliderPercentage = ui.value/100;
      video.currentTime = sliderPercentage * duration;
    }
  });

  $("#volume-control .slider").slider({
    range: "min",
    value: "60",
    orientation: "vertical",
    slide: function(event, ui) {
      volume = video.volume = ui.value / 100

      var selector = $('#volume i');

      if (volume == 0) {
        selector.removeClass('fa-volume-up')
          .addClass('fa-volume-off');
      } else {
        selector.removeClass('fa-volume-off')
          .addClass('fa-volume-up');
      }
    },
  });

  $('a#playPause').click(function(e) {
    if (video.paused) {
      $(this).children('i').removeClass('fa-play');
      $(this).children('i').addClass('fa-pause');
      video.play();
    } else {
      $(this).children('i').removeClass('fa-pause');
      $(this).children('i').addClass('fa-play');
      video.pause();
    }
  });


  //update clock

  video.onloadstart = function(){
    video.ontimeupdate = function(){
    var currentTime = video.currentTime;

      if (!duration){
        var duration = video.duration;
        var durationFormatted = getFormatedTime(duration);
        $("#time .duration").text(" / "+durationFormatted);
      }

      //update clock
      updateClock(currentTime);
      //update slider
      var percentage = 100 * currentTime/duration;
      $( "#progress" ).slider( "value", percentage );
    }
  }



  //volume
  $("#volume").click(function(event) {
    event.preventDefault();
    event.stopPropagation();

    iconPosition = {
      left: $('#volume').position().left,
      right: $('#volume').position().left + $('#volume').width(),
      top: $('#volume').position().top,
      bottom: $('#volume').position().top + $('#volume').height()
    }

    averageX = (iconPosition.left + iconPosition.right) / 2;

    $("#volume-control").toggleClass('show-flex');
    $('#volume-control').css({
      "left": averageX,
      "transform": "translate(-50%,0)",
      "bottom": "5vh"
    })
  })

  $(window).click(function(event) {
    $("#volume-control").removeClass('show-flex')
  })





});
