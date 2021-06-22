// import {songs} from "../data.js";
import PlayerTool from "./Player.js"
const $template = document.createElement("template");
$template.innerHTML = `
<li class="song">
  <span class="song-index">01</span>
  <img
    src="https://cdn.dribbble.com/users/3960463/screenshots/13952774/media/1083c2b91054c7d7ee7c0bd47d60d5e0.png?compress=1&resize=800x600"
    alt=""
    class="song-image"
  />
  <i class="fa fa-play song-play"></i>
  <h4 class="song-title">ABC</h4>
  <h5 class="song-singer">abc</h5>
    <i class="fa fa-heart song-love"></i>
  </li>
      
`;

export default class SongContainer extends HTMLElement {
  constructor() {
    super();
    this.appendChild($template.content.cloneNode(true));

    this.$index = this.querySelector(".song-index");
    this.$image = this.querySelector(".song-image");
    this.$name = this.querySelector(".song-title");
    this.$singer = this.querySelector(".song-singer");
    this.$playBtn = this.querySelector(".song-play");
    this.$likeBtn = this.querySelector(".song-love");
    this.$audio = document.createElement("audio");
  }

  static get observedAttributes() {
    return ["index", "image", "name", "singer", "path", "on"];
  }

  attributeChangedCallback(attrName, oldValue, newValue) {
    // console.log(newValue);
    if(attrName == 'index') {
      this.$index.innerHTML = newValue;
    } else if (attrName == "name") {
      this.$name.innerHTML = newValue;
    } else if (attrName == "singer") {
      this.$singer.innerHTML = newValue;
    } else if (attrName == "path") {
      this.$audio.src = `${newValue}`;
      // console.log(this.$audio);
    } else if (attrName == 'image') {
      this.$image.src = `${newValue}`;
    } else if (attrName == 'on') {
      this.$likeBtn.style.color = 'crimson';
    }
  }

  connectedCallback() {
    let isPlaying = false;
    let songIndex = 0;
    let isLike = false;
    let _this = this;
    // function loadSongs() {
    //   _this.$songTitle.innerHTML = songs[songIndex].name;
    //   _this.$songArtist.innerHTML = songs[songIndex].singer;
    //   _this.$thumbnail.src = songs[songIndex].image;
    //   _this.$song.src = songs[songIndex].path;
    //   // updateProgressValue();
    // }
    // loadSongs();

    this.$playBtn.onclick = function () {
      // _this.$song.play()
      if (isPlaying) {
        pauseSong();
      } else {
        playSong();
      }
    };
    function playSong() {
      _this.$audio.play();
      isPlaying = true;
      // _this.$player.classList.add("playing");
      // PlayerTool.$thumbnail.classList.add("is-playing");
    }

    function pauseSong() {
      _this.$audio.pause();
      isPlaying = false;
      _this.$player.classList.remove("playing");
      _this.$thumbnail.classList.remove("is-playing");
    }

    this.$likeBtn.onclick = function () {
      isLike = !isLike;
      _this.$likeBtn.classList.toggle("on", isLike);
    };
  }
}

window.customElements.define("song-container", SongContainer);
