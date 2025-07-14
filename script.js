// script.js
const skipBoot = window.location.hash === "#terminal" && document.referrer.includes("html");

let vantaEffect = null;

window.addEventListener('DOMContentLoaded', () => {
  vantaEffect = VANTA.HALO({
    el: "#boot",
    mouseControls: true,
    touchControls: true,
    gyroControls: false,
    minHeight: 200.00,
    minWidth: 200.00,
    baseColor: 0x330059,
    backgroundColor: 0x000000,
    amplitudeFactor: 1.0,
    xOffset: 0.0,
    yOffset: 0.0,
    size: 1.0,
    speed: 1.0,
    scale: 1.0,
    scaleMobile: 1.0
  });

  if (skipBoot) {
    showMain();
  } else {
    typeLine();

    document.addEventListener('keydown', function handleKey(e) {
      document.removeEventListener('keydown', handleKey);
      showMain();
    });
  }
});

const bootLines = [
  "booting sh3h4cks://_system",
  "> Initializing terminal...",
  "> Establishing uplink...",
  "> Access granted [OK]",
  "> Loading interface ██████████████████████████████ 100%",
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
  if (vantaEffect && typeof vantaEffect.destroy === 'function') {
    vantaEffect.destroy();
  }
  document.getElementById('boot').style.display = 'none';
  const main = document.getElementById('main');
  main.classList.add('fade-in');
  bootSound.play().catch(() => {});

  const titleEl = document.getElementById("title");
  titleEl.classList.add("glitch");

  typeDynamic("sh3h4cks", "title", 100, () => {
    typeDynamic("ethical hacker, I break systems for fun, legally!", "subtitle", 30, () => {
      const prompt = document.getElementById("prompt");
      prompt.innerHTML = 'sh3h4cks@core:~$ <input id="terminal-input" type="text" autocomplete="off">';
      setupTerminalInput();
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

function setupTerminalInput() {
  const input = document.getElementById("terminal-input");
  const prompt = document.getElementById("prompt");
  input.focus();
  input.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      const cmd = input.value.trim().toLowerCase();
      const output = document.createElement('div');
      output.className = 'terminal-output';
      if (["about", "projects", "contact"].includes(cmd)) {
        window.location.href = cmd + ".html";
      } else if (cmd !== '') {
        output.innerText = `sh3h4cks@core:~$ ${cmd}\nCommand not found: ${cmd}`;
        prompt.parentNode.insertBefore(output, prompt);
        input.value = '';
      }
    }
  });
}
