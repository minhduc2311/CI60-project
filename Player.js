import { songs } from "./js/data.js";

const $template = document.createElement("template");
$template.innerHTML = `
<div class="player">
  <div class="player-box">
    <div class="player-media">
      <img src="https://cdn.dribbble.com/users/3960463/screenshots/14630140/media/c79331860d7ca1b97430a4888617f428.png?compress=1&resize=800x600" alt=""
        class="player-image" />
    </div>
    <h3 class="player-title title">AmpyX Holo</h3>
    <span class="player-author author">Pop King</span>       
    <input type="range" id="progress-bar" min="0" max="" value="0" class="bar" />
    <audio src="" id="song"></audio>
    <div class="player-number">
      <span class="player-remaining">0:00</span>
      <span class="player-duration">0:00</span>             
    </div>
  </div>
  <div class="player-tool">
    <i class="fas fa-redo-alt player-repeat"></i>
    <i class="fa fa-backward player-prev"></i>
    <div class="play-button">
      <i class="fa fa-play player-play"></i>
      <i class="fas fa-pause player-pause"></i>
    </div>
    <i class="fa fa-forward player-next"></i>
    <i class="fas fa-random player-shuffle"></i>
  </div>   
  <div class="player-volume">    
    <i class="fas fa-volume-up "></i>
    <input type="range" id="volume-bar" min="0" max="" class="bar" />    
  </div>   
</div>
              
            
`;

export default class PlayerTool extends HTMLElement {
  constructor() {
    super();
    this.appendChild($template.content.cloneNode(true));

    this.$playButton = document.querySelector(".play-button");
    this.$nextButton = document.querySelector(".player-next");
    this.$prevButton = document.querySelector(".player-prev");
    this.$shuffleButton = document.querySelector(".player-shuffle");
    this.$repeatButton = document.querySelector(".player-repeat");
    this.$volumeBar = document.querySelector("#volume-bar");
    this.$thumbnail = document.querySelector(".player-image");
    this.$song = document.querySelector("#song");
    this.$songList = document.querySelectorAll(".song");
    this.$songArtist = document.querySelector(".player-author");
    this.$songTitle = document.querySelector(".player-title");
    this.$progressBar = document.querySelector("#progress-bar");
    this.$playerRemaining = document.querySelector(".player-remaining");
    this.$playerDuration = document.querySelector(".player-duration");
    this.$playList = document.querySelector(".song-list");
    this.$player = document.querySelector(".player");
    this.$volumeBtn = document.querySelector(".fa-volume-up")
  }

  connectedCallback() {
    let songIndex = 0;
    let isPlaying = false;
    let isRandom = false;
    let isRepeat = false;
    let _this = this;

    function loadSongs() {
      _this.$songTitle.innerHTML = songs[songIndex].name;
      _this.$songArtist.innerHTML = songs[songIndex].singer;
      _this.$thumbnail.src = songs[songIndex].image;
      _this.$song.src = songs[songIndex].path;
      // updateProgressValue();
    }
    loadSongs();

    this.$playButton.onclick = function () {
      // _this.$song.play()
      if (isPlaying) {
        pauseSong();
      } else {
        playSong();
      }
    };
    function playSong() {
      _this.$song.play();
      isPlaying = true;
      _this.$player.classList.add("playing");
      _this.$thumbnail.classList.add("is-playing");
    }

    function pauseSong() {
      _this.$song.pause();
      isPlaying = false;
      _this.$player.classList.remove("playing");
      _this.$thumbnail.classList.remove("is-playing");
    }

    this.$nextButton.onclick = function () {
      if (isRandom) {
        shuffleSong();
      } else {
        nextSong();
      }
      _this.$song.play();
    };

    this.$prevButton.onclick = function () {
      if (isRandom) {
        shuffleSong();
      } else {
        preSong();
      }
      _this.$song.play();
    };

    this.$shuffleButton.onclick = function () {
      isRandom = !isRandom;
      _this.$shuffleButton.classList.toggle("on", isRandom);
    };

    this.$repeatButton.onclick = function () {
      isRepeat = !isRepeat;
      _this.$repeatButton.classList.toggle("on", isRepeat);
    };

    this.$song.onended = function () {
      if (isRepeat) {
        _this.$song.play();
      } else {
        _this.$nextButton.click();
      }
    };

    function nextSong() {
      songIndex++;
      if (songIndex >= songs.length) {
        songIndex = 0;
      }
      loadSongs();
    }

    function preSong() {
      songIndex--;
      if (songIndex < 0) {
        songIndex = songs.length - 1;
      }
      loadSongs();
    }

    function shuffleSong() {
      let newSongIndex;
      do {
        newSongIndex = Math.floor(Math.random() * songs.length);
      } while (newSongIndex === songIndex);
      songIndex = newSongIndex;
      loadSongs();
    }

    this.$song.ontimeupdate = function () {
      // if (_this.$song.duration) {
        // _this.$progressBar.max = _this.$song.duration;
        // _this.$progressBar.value = _this.$song.currentTime;
        // const progressPercent = Math.floor(
        //   (_this.$song.currentTime / _this.$song.duration) * 100
        // );
        _this.$progressBar.value = _this.$song.currentTime;
        updateProgressValue();
      // }
    };

    function updateProgressValue() {
      _this.$progressBar.max = _this.$song.duration;
      _this.$progressBar.value = _this.$song.currentTime;
      _this.$playerRemaining.innerHTML = formatTime(
        Math.floor(_this.$song.currentTime)
      );
      if (_this.$playerDuration.innerHTML === "NaN:NaN") {
        _this.$playerDuration.innerHTML = "0:00";
      } else {
        _this.$playerDuration.innerHTML = formatTime(
          Math.floor(_this.$song.duration)
        );
      }
    }

    function formatTime(seconds) {
      let min = Math.floor(seconds / 60);
      let sec = Math.floor(seconds - min * 60);
      if (sec < 10) {
        sec = `0${sec}`;
      }
      return `${min}:${sec}`;
    }

    this.$progressBar.onchange = function() {
      _this.$song.currentTime = _this.$progressBar.value;
    }

    this.$volumeBar.onchange = function() {
      _this.$song.volume = _this.$volumeBar.value/100;
    }

    // this.$volumeBtn.onclick = function() {
    //   loadSongs();
    //   playSong();
    // }
  }
}

window.customElements.define("player-tool", PlayerTool);
