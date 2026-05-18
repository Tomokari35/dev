const cursor = document.querySelector(".cursor");

document.addEventListener("mousemove", (e) => {
  cursor.style.left = e.clientX + "px";
  cursor.style.top = e.clientY + "px";
});

// Scroll progress bar
const scrollBar = document.getElementById("scrollBar");

window.addEventListener("scroll", () => {
  const height = document.documentElement.scrollHeight - window.innerHeight;
  const scroll = (window.scrollY / height) * 100;
  if(scrollBar) scrollBar.style.width = scroll + "%";
});

// Reveal animation on scroll
const reveals = document.querySelectorAll("[data-reveal]");

const revealOnScroll = () => {
  reveals.forEach(el => {
    const top = el.getBoundingClientRect().top;
    if(top < window.innerHeight - 50){
      el.style.opacity = 1;
      el.style.transform = "translateY(0)";
    }
  });
};

window.addEventListener("scroll", revealOnScroll);
revealOnScroll();


const projects = [
{
title:"Stradaz Cafe and Bakery",
img:"https://tr.rbxcdn.com/180DAY-7e25317f6175dd6e6d5106658e01def0/768/432/Image/Webp/noFilter",
desc:"Manage Game and secure script. New Gui !",
tech:"LuaU / Model3d / Ui/UX",
date:"2026",
role:"Head Developper",
link:"https://www.roblox.com/fr/games/7968913182/Stradaz-Cafe-Bakery"
},
];

function openProject(i){
const p = projects[i];

document.getElementById("pTitle").innerText = p.title;
document.getElementById("pImg").src = p.img;
document.getElementById("pDesc").innerText = p.desc;
document.getElementById("pTech").innerText = p.tech;
document.getElementById("pDate").innerText = p.date;
document.getElementById("pRole").innerText = p.role;
document.getElementById("pLink").href = p.link;

document.getElementById("panel").classList.add("active");

document.getElementById("panel").scrollIntoView({
behavior:"smooth"
});
}

const data = {
script: {
title: "Script Projects",
images: [

]
},

model: {
title: "3D Models",
images: [
"https://imgur.com/lgUF3D8.png", //Arrosoir
"https://imgur.com/YdbgYsG.png", //Casier
"https://imgur.com/1JjaHEr.png", //Poubelle
"https://i.imgur.com/UH9M4wM.png", //Banc
"https://i.imgur.com/HsKF9Oo.png", //BancCouleur
"https://i.imgur.com/E8fV190.png", //Tv
"https://i.imgur.com/261yp0t.png", //Ordi
"https://i.imgur.com/1idlRvC.png", //MaisonNaruto
"https://i.imgur.com/x6lfGVl.png", //Bureau Silent Point
"https://i.imgur.com/tpsXKO3.png", //MachineElectricité
"https://i.imgur.com/ElIXCu7.png", //Poste Appel Telephone
"https://i.imgur.com/pVOIRFg.png", //Set Epée
"https://i.imgur.com/MBDw8qa.png", //Set Guns
]
},

ui: {
title: "UI Designs",
images: [
"https://i.imgur.com/T6dfyrd.png", //NamePlate
"https://i.imgur.com/6DdSfL0.png", //Overhead GUI
"https://i.imgur.com/5AkSuz5.png", //Menu
"https://i.imgur.com/gSKp1UU.png", //Menu SilentPoint1
"https://i.imgur.com/baICXYP.png", //Menu SilentPoint2
"https://i.imgur.com/p7XIBhy.png", //Menu SilentPoint3
"https://i.imgur.com/Ng2Jp08.png", //Menu SilentPoint4
"https://i.imgur.com/asI96Kx.png", //Menu SilentPoint5
]
}
};

function openCategory(cat){

const section = data[cat];

document.getElementById("galleryTitle").innerText = section.title;

const grid = document.getElementById("galleryGrid");
grid.innerHTML = "";

section.images.forEach(img => {
const el = document.createElement("img");
el.src = img;
grid.appendChild(el);
});

document.getElementById("gallery").scrollIntoView({
behavior:"smooth"
});
}

const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

const music = document.getElementById("music");
const btn = document.getElementById("musicToggle");
const slider = document.getElementById("volumeSlider");

const title = document.querySelector(".music-title");
const status = document.querySelector(".music-status");

// état sauvegardé
let isPlaying = localStorage.getItem("musicPlaying") === "true";
let volume = localStorage.getItem("musicVolume");

music.volume = volume !== null ? volume : 0.1;

const playlist = [
  { name: "Tomokari Sound 1", src: "music1.mp3" },
  { name: "Tomokari Sound 2", src: "music2.mp3" },
  { name: "Tomokari Sound 3", src: "music3.mp3" },
  { name: "Tomokari Sound 4", src: "music4.mp3" },
];

let index = 0;
loadTrack(index);
function loadTrack(i) {
  music.src = playlist[i].src;
  title.innerText = playlist[i].name;
}

function nextTrack() {
  index = (index + 1) % playlist.length;
  loadTrack(index);
  music.play();
  updateUI();
}

function prevTrack() {
  index = (index - 1 + playlist.length) % playlist.length;
  loadTrack(index);
  music.play();
  updateUI();
}

prevBtn.onclick = () => {
  prevTrack();
  isPlaying = true;
  localStorage.setItem("musicPlaying", "true");
};

nextBtn.onclick = () => {
  nextTrack();
  isPlaying = true;
  localStorage.setItem("musicPlaying", "true");
};

// 🎧 update UI function (IMPORTANT)
function updateUI() {
  if (music.paused) {
    status.innerText = "Paused";
    btn.innerText = "▶";
  } else {
    status.innerText = "Now Playing";
    btn.innerText = "⏸";
  }
}

// autoplay safe
window.addEventListener("load", () => {
  music.muted = true;

  if (isPlaying) {
    music.play().catch(() => {});
  }

  updateUI();
});

// premier clic = active son
// document.addEventListener("click", () => {
  // if (music.muted) {
    // music.muted = false;
    // music.play().catch(() => {});
    // localStorage.setItem("musicPlaying", "true");
    // updateUI();
  // }
// });

// bouton play/pause
btn.onclick = () => {
  if (music.paused) {
    music.play();
    isPlaying = true;
  } else {
    music.pause();
    isPlaying = false;
  }

  localStorage.setItem("musicPlaying", isPlaying);
  updateUI();
};

// volume
slider.addEventListener("input", () => {
  music.volume = slider.value;
  localStorage.setItem("musicVolume", slider.value);
});
