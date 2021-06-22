import SongContainer from "./js/components/SongContainer.js";
import SongList from "./js/components/SongList.js";
import PlayerTool from "./js/components/Player.js";
import {songs} from "./js/data.js"



$(document).on("click", "ul li", function () {
  $(this).addClass("active").siblings().removeClass("active");
});

$(document).on("click", "ul li", function () {
  $(this).addClass("active").siblings().removeClass("active");
});

var moreextend = document.getElementById("more-extend");
var morenarrow = document.getElementById("more-narrow");
var sidebar = document.getElementById("sidebar");
var logotext = document.getElementById("logotext");
var logoimage = document.getElementById("logoimage");
var menutext = document.getElementsByClassName("menu-item-text");
var social = document.getElementById("social");

moreextend.addEventListener("click", function (e) {
  if (e.target) {
    sidebar.style.width = "240px";
    sidebar.style.transition = "width 1s";
    moreextend.style.display = "none";
    morenarrow.style.display = "block";
    logoimage.style.display = "none";
    logotext.style.display = "block";
    social.style.display = "block";

    Array.from(menutext).forEach(function (item) {
      item.style.display = "inline-block";
    });
  }
});

morenarrow.addEventListener("click", function (e) {
  if (e.target) {
    sidebar.style.width = "70px";
    sidebar.style.transition = "width 1s";
    moreextend.style.display = "flex";
    morenarrow.style.display = "none";
    logoimage.style.display = "block";
    logotext.style.display = "none";
    social.style.display = "none";

    Array.from(menutext).forEach(function (item) {
      item.style.display = "none";
    });
  }
});

var swiper = new Swiper(".mySwiper", {
  effect: "coverflow",
  grabCursor: true,
  centeredSlides: true,
  slidesPerView: "auto",
  coverflowEffect: {
    rotate: 30,
    stretch: 0,
    depth: 80,
    modifier: 1,
    slideShadows: true,
  },
  pagination: {
    el: ".swiper-pagination",
  },
  autoplay: {
    delay: 2000,
    reverseDirection: false,
  },
  // onSlideChangeStart: function (s) {
  //   if (s.activeIndex === 3) {
  //     // do something here, 4th slide is active now and so on
  //     console.log("hi! Try to reach 4th slides");
  //     s.startAutoplay(); // calling autoplay on 4th slides.
  //   }
  // },
});


$("#home").click(function () {
  setTimeout(location.reload.bind(location), 800);
  $("#boxhome").slideDown ();
  $("#boxchart").hide();
  $("#boxvideo").hide();
  $("#boxsinger").hide();
});

$("#chart").click(function () {
  $("#boxchart").slideDown ();
  $("#boxhome").hide();
  $("#boxvideo").hide();
  $("#boxsinger").hide();
});

$("#video").click(function () {
  $("#boxvideo").slideDown ();
  $("#boxchart").hide();
  $("#boxhome").hide();
  $("#boxsinger").hide();
});

$("#boxsinger").click(function () {
  $("#boxsinger").slideDown ();
  $("#boxchart").hide();
  $("#boxvideo").hide();
  $("#boxhome").hide();
});

$("#sign-up").click(function () {
  $("#id01").show();
  // $("#main").hide();
  // $("#sidebar").hide();
});

$("#login").click(function () {
  $("#id02").show();
  // $("#main").hide();
  // $("#sidebar").hide();
});


//=====================================================================//

let $songList = document.getElementById('my-list');
$songList.setAttribute('songs', JSON.stringify(songs));

//=== Search function=====//

let $searchInput = document.getElementById('myInput');
let $songContainer = $songList.getElementsByTagName('song-container');
console.log($songContainer);
 function searching() {
  // console.log($searchInput);
  let $searchValue = $searchInput.value.toUpperCase();
  // console.log($searchValue);
  for(let i = 0; i < $songContainer.length; i++) {
    let songName = $songContainer[i].getElementsByTagName('h4')[0];
    // console.log(songName);
    let textValue = songName.textContent || songName.innerText;
    // console.log(textValue);
    if(textValue.toUpperCase().indexOf($searchValue) > -1) {
      $songContainer[i].style.display = "";
  
    } else {
      $songContainer[i].style.display = "none"
    } 
  }
}

$searchInput.addEventListener("keyup", searching);

let remove_song = document.getElementsByClassName("song-remove");
for (let i = 0; i < remove_song.length; i++) {
  let $removeBtn = remove_song[i];
  $removeBtn.addEventListener('click', function() {
    let button_remove = event.target;
    button_remove.parentElement.remove()
  })
}

let $favSongs = document.getElementById('fav-songs');
let add_song = document.getElementsByClassName('song-love');
console.log(add_song);
for (let i = 0; i < add_song.length; i++) {
  let $addBtn = add_song[i];
  $addBtn.addEventListener('click', function(event) {
    let button_add =  event.target;
    $favSongs.appendChild(button_add.parentElement);
  })
}






