//COUNTDOWN
window.onload = function() {
    countUpFromTime("August 4, 2018 1:00:00", 'countup1');
  };
  function countUpFromTime(countFrom, id) {
    countFrom = new Date(countFrom).getTime();
    var now = new Date(),
        countFrom = new Date(countFrom),
        timeDifference = (now - countFrom);
      
    var secondsInADay = 60 * 60 * 1000 * 24,
        secondsInAHour = 60 * 60 * 1000;
      
    days = Math.floor(timeDifference / (secondsInADay) * 1);
    months = Math.floor(timeDifference / (secondsInADay) * 1 / 30);
    hours = Math.floor((timeDifference % (secondsInADay)) / (secondsInAHour) * 1);
    mins = Math.floor(((timeDifference % (secondsInADay)) % (secondsInAHour)) / (60 * 1000) * 1);
    secs = Math.floor((((timeDifference % (secondsInADay)) % (secondsInAHour)) % (60 * 1000)) / 1000 * 1);
  
    var idEl = document.getElementById(id);
    idEl.getElementsByClassName('days')[0].innerHTML = days;
    idEl.getElementsByClassName('months')[0].innerHTML = months;
    idEl.getElementsByClassName('hours')[0].innerHTML = hours;
    idEl.getElementsByClassName('minutes')[0].innerHTML = mins;
    idEl.getElementsByClassName('seconds')[0].innerHTML = secs;
  
    clearTimeout(countUpFromTime.interval);
    countUpFromTime.interval = setTimeout(function(){ countUpFromTime(countFrom, id); }, 1000);
  }



  //PRELOADER
  $('body, html').addClass('preloader-running');
  $('#mastwrap').css('visibility', 'hidden');
  $(window).load(function() {
      $("#status").fadeOut();
      $("#preloader").delay(1000).fadeOut(1000);
      $('body, html').removeClass('preloader-running');
      $('body, html').addClass('preloader-done');
      $("#mastwrap").delay(1000).css('visibility',
          'visible');
  });