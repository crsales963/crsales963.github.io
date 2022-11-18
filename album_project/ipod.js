// Create your global variables below:
var tracklist = ["Let's Go Up", "Shield", "Not Alone", "Concrete Evidence", "Freedom", "Brave", "A Root out of Dry Ground", "Lawgiver", "Disciples", "A Tender Plant"];
var volLevels = [];
var volLevelsColored = 0;
var paused = true;
var playInterval;
var trackListIndex = 0;
const DEFAULT_COLOR = 'rgb(95, 147, 154)'

//Retrieve element nodes from DOM
var switchBtn = document.getElementById('switch-btn');
var prevBtn = document.getElementById('prev-btn');
var nextBtn = document.getElementById('next-btn');
var volumeUpBtn = document.getElementById('volume-up');
var volumeDownBtn = document.getElementById('volume-down');

function init() {
	// Your code goes here
  // loop through each volume bar
  for (var i = 0; i < 6; i++) {
    let volumeBarID = "vl" + i;
    let volumeBar = document.getElementById(volumeBarID);

    // add each volume bar to volLevels
    volLevels.push(volumeBar);

    // for first 3 volume bars, color background
    if (i < 3){
      volumeBar.style.backgroundColor = "#5F939A";
      volLevelsColored++;
    }
  }
};

function volUp() {
	// Your code goes here
  // checks if volume is already at its max
  if(volLevelsColored < 6) {
    // colors next volume bar
    let volumeBarIncrease = volLevels[volLevelsColored];
    volumeBarIncrease.style.backgroundColor = "#5F939A";

    // increases count of how many volume bars are colored
    volLevelsColored++;
  }
}

function volDown() {
	// Your code goes here
  // checks if volume is already at its min
  if(volLevelsColored > 0) {
    // decolors current volume bar
    let volumeBarDecrease = volLevels[volLevelsColored - 1];
    volumeBarDecrease.style.backgroundColor = "white";

    // decreaes count of how many volume bars are colored
    volLevelsColored--;
  }
}

function switchPlay() {
	// Your code goes here
  let pausePlayBtn = document.getElementById("switch-btn");

  // checks if button is currently paused
  if (paused) {
    // indicate that song is being played
    paused = false;

    // changes icon to pause icon
    let playContent = `<i class="material-icons">pause</i>`;
    pausePlayBtn.innerHTML = playContent;

    // simlating playback of music
    playInterval = setInterval(updateTimeElapsed, 1000);
  } else {
    // indicate that song is being paused
    paused = true;

    // changes icon to play icon
    let pauseContent = `<i class="material-icons">play_arrow</i>`;
    pausePlayBtn.innerHTML = pauseContent;

    // stops playback of music
    clearInterval(playInterval);
  }
}

function updateTimeElapsed() {
  // retrieve element nodes from DOM
  let range = document.getElementById("player-time");
  let rangeValue = range.getAttribute("value");
  let timeElapsed = document.getElementById("time-elapsed");

  // increments current value of range by 1
  let newRangeValue = Number(rangeValue) + 1;

  // if incremented value is at its max, go to next song on track
  if (newRangeValue > 180) {
    nextSong();
  } else {
    // updates time on player if value is not at max
    let newtimeElapsed = secondsToMs(newRangeValue);
    timeElapsed.innerHTML = newtimeElapsed;
    range.setAttribute("value", newRangeValue);
  }

}

function resetRangeTime() {
  // retrieve element nodes from DOM
  let timeElapsed = document.getElementById("time-elapsed");
  let range = document.getElementById("player-time");

  // resets time on player to 0
  let resetTime = `0:00`
  timeElapsed.innerHTML = resetTime;

  // resets value of range to 0
  range.setAttribute("value", "0");
}

function nextSong() {
	// Your code goes here
  resetRangeTime();

  // increase track index
  trackListIndex++;

  // if track index is beyond its length then change to 0
  if (trackListIndex > 9){
    trackListIndex = 0;
  }

  // change song being played to corresponding song on track list with the track index
  let songName = document.getElementById("player-song-name");
  songName.innerHTML = tracklist[trackListIndex];
}

function prevSong() {
  // Your code goes here
  resetRangeTime();

  // decrease track index
  trackListIndex--;

  // if track index is below 0 then change to 9 (max)
  if (trackListIndex < 0){
    trackListIndex = 9;
  }

  // change song being played to corresponding song on track list with the track index
  let songName = document.getElementById("player-song-name");
  songName.innerHTML = tracklist[trackListIndex];
}

function secondsToMs(d) {
    // convert number to m:ss
    d = Number(d);

    var min = Math.floor(d / 60);
    var sec = Math.floor(d % 60);
    console.log(`00${sec}`);

    return `0${min}`.slice(-1) + ":" + `00${sec}`.slice(-2);
}

// add event listeners
switchBtn.addEventListener('click', switchPlay);
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
volumeUpBtn.addEventListener('click', volUp);
volumeDownBtn.addEventListener('click', volDown);

// call initializer
init();
