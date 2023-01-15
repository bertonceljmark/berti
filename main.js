let stevecSlika = 0;
let playing = false;
let currentTrack = 0;
let trackPlaying = "";
let audio = "";
let ran1 = 0;
let index = 0;
let discoFlag = 0;

const toTop = document.querySelector(".to-top");

const button = document.getElementById("music-button");
const playButton = document.querySelector(".fondo");

const aboutImg = document.getElementById("picture-about");
const aboutField = document.getElementById("container-about");
const logo = document.querySelectorAll("#logo path");
const playIcon = document.querySelectorAll(".part");
const star = document.querySelectorAll("#disco-ball .star");
let tracks = document.querySelectorAll(".song-snippet");
let players = [];

let discoBall = document.getElementById("disco-ball");
let discoBallRect = discoBall.getBoundingClientRect();

const musicContent = document.getElementById("music-content");

const lineEvents = document.getElementById("line-events");
const lineMusic = document.getElementById("line-music");
const lineSplitter = document.getElementById("line-splitter");
const lineLawaai = document.getElementById("line-lawaai");

const containerIntro = document.getElementById("container-1");
const rectIntro = containerIntro.getBoundingClientRect();

const containerAbout = document.getElementById("container-about");
const rectAbout = containerAbout.getBoundingClientRect();

const containerSplitter = document.getElementById("container-splitter");
const rectSplitter = containerSplitter.getBoundingClientRect();

const containerMusic = document.getElementById("container-music");
const rectMusic = containerMusic.getBoundingClientRect();

const containerEvents = document.getElementById("container-events");
const rectEvents = containerEvents.getBoundingClientRect();

const containerLawaai = document.getElementById("container-lawaai");
const rectLawaai = containerLawaai.getBoundingClientRect();

const guideLinePlay = document.getElementById("guide-line-play");
const textPlay = document.getElementById("text-play");
const musicPlay = document.getElementById("music-play");

const guideLineLike = document.getElementById("guide-line-like");
const textLike = document.getElementById("text-like");
const musicLike = document.getElementById("music-like");

const guideLineSpotify = document.getElementById("guide-line-spotify");
const textSpotify = document.getElementById("text-spotify");
const musicSpotify = document.getElementById("spotify-frame");

const menuMobile = document.getElementById("menu-mobile");
const menuMobileCheckbox = document.getElementById("menu-open");
const menuMobileItems = document.querySelectorAll(".menu-item");

const videoCount = document.getElementById("video-count");
const viewCount = document.getElementById("view-count");
const subscriberCount = document.getElementById("subscriber-count");
const latestVideo = document.getElementById("latest-video");

const youtubeKey = "AIzaSyBsenFWyPcIIxRVEUKEciHhJY1FMGXX1ug";
const youtubeUser = "UC00lJqDVwTInoiIsx2t1GrA";

const youtubeCards = document.querySelectorAll(".statistics-card");
const youtubeData = document.getElementById("youtube-data");
const youtubeVideo = document.getElementById("latest-video");

const setupSvg = document.getElementById("setup-svg");
const setupComp = document.querySelectorAll("svg g.setup");
const setupTxt = document.querySelectorAll(".svg-txt");
let tooltipBox;

function init() {
  $(".js-input").keyup(function () {
    if ($(this).val()) {
      $(this).addClass("not-empty");
    } else {
      $(this).removeClass("not-empty");
    }
  });

  window.addEventListener("resize", setLine);
  setLine();
  getData();
  getLatestVideo();
  window.addEventListener("scroll", scrollEvents);
  window.onload = addTracks();
  setTimeout(() => {
    unlock();
  }, 2500);
}

/* function showTooltip(evt, text) {
  let tooltip = document.getElementById("tooltip");
  if (tooltip.getBoundingClientRect().width != 0) {
    tooltipBox = tooltip.getBoundingClientRect();
  }

  tooltip.innerHTML = text;
  tooltip.style.display = "block";
  tooltip.style.left = evt.clientX + 10 + "px";
  tooltip.style.top = evt.clientY + 10 + "px";
  if (evt.clientX + tooltipBox.width + 10 > window.visualViewport.width) {
    tooltip.style.left = evt.clientX - 10 - tooltipBox.width + "px";
  }
} */

/* function hideTooltip() {
  let tooltip = document.getElementById("tooltip");
  tooltip.style.display = "none";
} */

function unlock() {
  $("html, body").css({
    overflow: "auto",
    height: "auto",
  });
}

function getData() {
  let storedVideoCount = localStorage.getItem("videoCount");
  let storedSubscriberCount = localStorage.getItem("subscriberCount");
  let storedViewCount = localStorage.getItem("viewCount");
  let dateSaved = localStorage.getItem("dateSaved");

  let dateNow = new Date();
  dateNow.setDate(dateNow.getDate() - 7);
  if (
    (!!storedVideoCount && !!storedSubscriberCount && !!storedViewCount) ||
    (!!dateSaved && dateNow.getTime() > dateSaved)
  ) {
    videoCount.innerText = +storedVideoCount;
    viewCount.innerText = Math.round(storedViewCount / 10000) / 100 + " m";
    subscriberCount.innerText = storedSubscriberCount;

    return;
  }

  fetch(
    "https://www.googleapis.com/youtube/v3/channels?part=statistics&id=" +
      youtubeUser +
      "&key=" +
      youtubeKey
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      try {
        videoCount.innerText = +data.items[0].statistics.videoCount;
        viewCount.innerText =
          Math.round(data.items[0].statistics.viewCount / 10000) / 100 + " m";
        subscriberCount.innerText = data.items[0].statistics.subscriberCount;

        localStorage.setItem("videoCount", data.items[0].statistics.videoCount);
        localStorage.setItem("viewCount", data.items[0].statistics.viewCount);
        localStorage.setItem(
          "subscriberCount",
          data.items[0].statistics.subscriberCount
        );
        localStorage.setItem("dateSaved", Date.now());
      } catch (error) {
        videoCount.innerText = "> 25";
        viewCount.innerText = "> 1.4 m";
        subscriberCount.innerText = "> 5220";
      }
    });
}

function getLatestVideo() {
  fetch(
    "https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=" +
      youtubeUser +
      "&maxResults=1&order=date&type=video&key=" +
      youtubeKey
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      try {
        latestVideo.innerHTML =
          '<iframe  title="Latest youtube video" src="https://www.youtube.com/embed/' +
          data.items[0].id.videoId +
          '?rel=0&modestbranding=1&autohide=1&showinfo=0&controls=1" frameborder="0" allowfullscreen></iframe>';
      } catch (err) {
        latestVideo.innerHTML =
          '<iframe title="Latest youtube video" src="https://www.youtube.com/embed/uNvpaTwqXgU?rel=0&modestbranding=1&autohide=1&showinfo=0&controls=1" frameborder="0" allowfullscreen></iframe>';
      }
    });
}

function centerMenu() {
  if (menuMobileCheckbox.checked == true) {
    menuMobile.classList.add("move-center");
  } else {
    menuMobile.classList.remove("move-center");
  }
}

function closeMenu() {
  menuMobile.classList.remove("move-center");
  menuMobileCheckbox.checked = false;
}

function blinkingStars() {
  for (let i = 0; i < star.length; i++) {
    let ran = Math.floor(Math.random() * 10);

    if (star[i].state === 1 && ran > 1) {
      star[i].state = 0;
      star[i].classList.remove("star-on");
      star[i].classList.add("star-off");
    } else if (star[i].state === 0 && ran < 8) {
      star[i].state = 1;
      star[i].classList.remove("star-off");
      star[i].classList.add("star-on");
    }
  }
}

function scrollEvents() {
  closeMenu();
  let scrollPosition = window.scrollY + (window.innerHeight * 3) / 4;

  if (getTop(setupSvg) < scrollPosition) {
    for (let i = 0; i < setupComp.length; i++) {
      setupComp[i].classList.add("show");
    }
  }

  if (getTop(youtubeData) < scrollPosition) {
    for (let i = 0; i < youtubeCards.length; i++) {
      youtubeCards[i].classList.add("show");
    }
    youtubeVideo.classList.add("visible");
  }

  if (getTop(musicPlay) < scrollPosition) {
    guideLinePlay.classList.add("load-guide-line");
    textPlay.classList.add("visible");
  }

  if (getTop(musicLike) < scrollPosition) {
    guideLineLike.classList.add("load-guide-line");
    textLike.classList.add("visible");
  }

  if (getTop(musicSpotify) < scrollPosition) {
    guideLineSpotify.classList.add("load-guide-line");
    textSpotify.classList.add("visible");
  }

  if (getTop(musicContent) < scrollPosition) {
    musicContent.classList.add("liquid");
    lineMusic.classList.add("filled-line-music");
    playIcon[0].classList.add("play-icon-to-light");
    playIcon[1].classList.add("play-icon-to-light");
    playButton.classList.add("play-button-to-dark");
  }

  if (getTop(containerLawaai) < scrollPosition && discoFlag === 0) {
    lineLawaai.classList.add("filled-line-lawaai");
    setTimeout(() => {
      setInterval(blinkingStars, 1000);
      for (let i = 0; i < star.length; i++) {
        star[i].classList.add("star-on");
        star[i].state = 1;
      }
    }, 1000);

    discoFlag = 1;
  } else if (discoFlag === 0) {
    if (
      getTop(containerMusic) < scrollPosition &&
      getBot(containerMusic) > scrollPosition
    ) {
      let percentageMusic = scale(
        scrollPosition,
        getTop(containerMusic),
        getBot(containerMusic),
        0,
        100
      );
      fillLine(lineMusic, percentageMusic);
    }

    if (
      getTop(containerEvents) < scrollPosition &&
      getBot(containerEvents) > scrollPosition
    ) {
      let percentageEvents = scale(
        scrollPosition,
        getTop(containerEvents),
        getBot(containerEvents),
        0,
        100
      );

      fillLine(lineEvents, percentageEvents);
    }

    if (
      getTop(containerLawaai) < scrollPosition &&
      getBot(containerLawaai) > scrollPosition
    ) {
      let percentageLawaai = scale(
        scrollPosition,
        getTop(containerLawaai),
        getBot(containerLawaai),
        0,
        100
      );
      fillLine(lineLawaai, percentageLawaai);
    }
  } else {
    lineEvents.classList.add("filled-line");
    lineLawaai.classList.add("filled-line-lawaai");
  }
}

function fillLine(el, percentage) {
  if (percentage < 1) {
    el.style.height = "0%";
  } else if (percentage < 99.5) {
    el.style.height = percentage + "%";
  }
}

function setLine() {
  let lineSvg = document.getElementById("line-svg");
  let lineSvgRect = lineSvg.getBoundingClientRect();

  lineSplitter.style.width = lineSvgRect.width + "px";
  lineEvents.style.width = lineSvgRect.width + "px";
  lineMusic.style.width = lineSvgRect.width + "px";
  lineLawaai.style.width = lineSvgRect.width + "px";
}

function scale(number, inMin, inMax, outMin, outMax) {
  return ((number - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
}

function getTop(el) {
  const rect = el.getBoundingClientRect();
  return rect.top + window.scrollY;
}

function getBot(el) {
  const rect = el.getBoundingClientRect();
  return rect.top + window.scrollY + rect.height;
}

function addTracks() {
  for (let i = 0; i < tracks.length; i++) {
    tracks[i].addEventListener("ended", function () {
      button.classList.toggle("active");
      playing = false;
    });
  }
}

function play() {
  if (playing == false) {
    while (ran1 == currentTrack) {
      ran1 = Math.floor(Math.random() * 5) + 1;
    }

    let audioString = "audio" + ran1;
    let audio = document.getElementById(audioString);
    audio.play();
    trackPlaying = audio;
    currentTrack = ran1;
    playing = true;
  } else {
    trackPlaying.pause();
    trackPlaying.currentTime = 0;
    playing = false;
  }
}

init();
