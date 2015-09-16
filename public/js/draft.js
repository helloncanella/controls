//get duration of movie
var duration = getFormatedTime(video.duration);
$("#time .duration").text("/"+duration);

video.ontimeupdate = function(){
  var currentTime = video.currentTime;

  //update clock
  updateClock(currentTime);

  //update slider
  var percentage = 100 * currentTime/duration;
  $( "#progress" ).slider( "value", percentage );
}

//on slide
$("#progress").slider({
  range: "min",
  slide: function(event, ui){
    //update movie
    var duration = video.duration;
    var sliderPercentage = ui.value/100;
    video.currentTime = sliderPercentage * duration;
  }
});
