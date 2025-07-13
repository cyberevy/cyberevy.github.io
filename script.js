// script.js
const bootLines = [
  "booting cyberevy://_system",
  "> Initializing terminal...",
  "> Establishing uplink...",
  "> Access granted [OK]",
  "> Loading interface ███████████████ 100%",
  "\nSystem ready. Press any key to enter..."
];

const bootTextEl = document.getElementById('boot-text');
const cursor = document.getElementById('cursor');
const beep = document.getElementById('beep');
const bootSound = document.getElementById('boot-sound');

let line = 0;
let char = 0;

function typeLine() {
  if (line < bootLines.length) {
    if (char < bootLines[line].length) {
      bootTextEl.innerHTML += bootLines[line][char++];
      beep.currentTime = 0;
      beep.play();
      setTimeout(typeLine, 20);
    } else {
      bootTextEl.innerHTML += '\n';
      line++;
      char = 0;
      setTimeout(typeLine, 400);
    }
  }
}

function showMain() {
  document.getElementById('boot').style.display = 'none';
  const main = document.getElementById('main');
  main.classList.add('fade-in');
  bootSound.play();

  const titleEl = document.getElementById("title");
  titleEl.classList.add("glitch");

  typeDynamic("cyberevy", "title", 100, () => {
    typeDynamic("ethical hacker, i break systems for fun, legally!", "subtitle", 30, () => {
      typeDynamic("cyberevy@core:~$", "prompt", 50);
    });
  });
}

function typeDynamic(text, targetId, speed, callback) {
  const el = document.getElementById(targetId);
  let i = 0;
  el.innerHTML = '';
  function type() {
    if (i < text.length) {
      el.innerHTML += text[i++];
      setTimeout(type, speed);
    } else if (callback) {
      callback();
    }
  }
  type();
}

typeLine();

document.addEventListener('keydown', function handleKey(e) {
  document.removeEventListener('keydown', handleKey);
  showMain();
});
