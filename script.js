
/* =========================================================
   JARVIS 2050
   FUTURISTIC AI SYSTEM
   ========================================================= */

"use strict";


/* ================= ELEMENTS ================= */

const clock = document.getElementById("clock");
const dateElement = document.getElementById("date");
const footerTime = document.getElementById("footerTime");

const particlesContainer = document.getElementById("particles");

const commandForm = document.getElementById("commandForm");
const commandInput = document.getElementById("commandInput");

const voiceButton = document.getElementById("voiceButton");
const voiceState = document.getElementById("voiceState");

const responsePanel = document.getElementById("responsePanel");
const responseContent = document.getElementById("responseContent");
const closeResponse = document.getElementById("closeResponse");

const clearButton = document.getElementById("clearButton");

const dataStream = document.getElementById("dataStream");

const neuralLoad = document.getElementById("neuralLoad");
const processing = document.getElementById("processing");
const memory = document.getElementById("memory");

const neuralMeter = document.getElementById("neuralMeter");
const processingMeter = document.getElementById("processingMeter");
const memoryMeter = document.getElementById("memoryMeter");

const networkValue = document.getElementById("networkValue");


/* ================= CLOCK ================= */

function updateClock() {

  const now = new Date();

  const time = now.toLocaleTimeString("en-IN", {
    hour12: false
  });

  const date = now.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  });

  clock.textContent = time;
  dateElement.textContent = date.toUpperCase();
  footerTime.textContent = "SYSTEM TIME " + time;
}

setInterval(updateClock, 1000);
updateClock();


/* ================= PARTICLES ================= */

function createParticles() {

  if (!particlesContainer) return;

  particlesContainer.innerHTML = "";

  const total = window.innerWidth < 600 ? 90 : 180;

  for (let i = 0; i < total; i++) {

    const particle = document.createElement("span");

    particle.className = "particle";

    const angle = Math.random() * Math.PI * 2;
    const radius = 8 + Math.random() * 42;

    const x =
      50 +
      Math.cos(angle) * radius;

    const y =
      50 +
      Math.sin(angle) * radius;

    particle.style.left = x + "%";
    particle.style.top = y + "%";

    const size = Math.random() * 2.5 + 1;

    particle.style.width = size + "px";
    particle.style.height = size + "px";

    particle.style.opacity =
      (Math.random() * 0.75 + 0.25).toFixed(2);

    particle.style.animationDelay =
      Math.random() * -5 + "s";

    particlesContainer.appendChild(particle);
  }
}

createParticles();

window.addEventListener("resize", createParticles);


/* ================= RANDOM TELEMETRY ================= */

function randomNumber(min, max) {
  return Math.floor(
    Math.random() * (max - min + 1) + min
  );
}


function updateTelemetry() {

  const neural = randomNumber(65, 96);
  const process = randomNumber(82, 99);
  const mem = randomNumber(48, 82);

  neuralLoad.textContent = neural + "%";
  processing.textContent = process + "%";
  memory.textContent = mem + "%";

  neuralMeter.style.width = neural + "%";
  processingMeter.style.width = process + "%";
  memoryMeter.style.width = mem + "%";

  networkValue.textContent =
    (99 + Math.random()).toFixed(1) + "%";
}

setInterval(updateTelemetry, 1800);
updateTelemetry();


/* ================= LIVE DATA ================= */

const dataMessages = [
  "NEURAL PATHWAY SYNCHRONIZED",
  "QUANTUM NODE ACTIVE",
  "PATTERN RECOGNITION RUNNING",
  "ENVIRONMENTAL SCAN UPDATED",
  "PREDICTION MATRIX RECALCULATED",
  "SECURITY LAYER VERIFIED",
  "COGNITIVE NETWORK OPTIMIZED",
  "DATA STREAM ENCRYPTED",
  "AI DECISION TREE UPDATED",
  "VOICE INTERFACE STANDBY",
  "MEMORY SYNAPSES SYNCHRONIZED",
  "SPATIAL MODEL UPDATED",
  "THREAT ANALYSIS COMPLETE",
  "CORE ENERGY STABLE"
];


function addDataMessage() {

  const message =
    dataMessages[
      Math.floor(Math.random() * dataMessages.length)
    ];

  const line = document.createElement("div");

  const time = new Date().toLocaleTimeString(
    "en-IN",
    { hour12: false }
  );

  line.textContent =
    "> [" + time + "] " + message;

  dataStream.appendChild(line);

  while (dataStream.children.length > 8) {
    dataStream.removeChild(
      dataStream.firstElementChild
    );
  }

  dataStream.scrollTop = dataStream.scrollHeight;
}

setInterval(addDataMessage, 1100);


/* ================= RESPONSE ================= */

function showResponse(text) {

  responseContent.textContent = text;

  responsePanel.classList.add("show");

  voiceState.textContent = "JARVIS RESPONDING";

  setTimeout(() => {
    voiceState.textContent = "JARVIS READY";
  }, 2500);
}


function closeResponsePanel() {
  responsePanel.classList.remove("show");
}

closeResponse.addEventListener(
  "click",
  closeResponsePanel
);


/* ================= JARVIS BRAIN ================= */

function processCommand(command) {

  const text = command
    .toLowerCase()
    .trim();

  if (!text) return;


  /* Greeting */

  if (
    text.includes("hello") ||
    text.includes("hi") ||
    text.includes("hey") ||
    text.includes("jarvis")
  ) {

    showResponse(
      "Good to see you. All JARVIS 2050 systems are operational. Neural core, security layer and cognitive engine are online."
    );

    return;
  }


  /* Status */

  if (
    text.includes("status") ||
    text.includes("system")
  ) {

    showResponse(
      "SYSTEM STATUS: ONLINE\n\n" +
      "Neural Network: ACTIVE\n" +
      "Quantum Core: ONLINE\n" +
      "Security: PROTECTED\n" +
      "Prediction Engine: ACTIVE\n" +
      "Environment Scanner: RUNNING"
    );

    return;
  }


  /* Time */

  if (text.includes("time")) {

    const now = new Date();

    showResponse(
      "Current system time is " +
      now.toLocaleTimeString("en-IN")
    );

    return;
  }


  /* Date */

  if (
    text.includes("date") ||
    text.includes("today")
  ) {

    const now = new Date();

    showResponse(
      "Today's date is " +
      now.toLocaleDateString("en-IN", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric"
      })
    );

    return;
  }


  /* Clear */

  if (
    text === "clear" ||
    text.includes("clear screen")
  ) {

    dataStream.innerHTML = "";

    showResponse(
      "Visual data stream cleared. JARVIS interface remains operational."
    );

    return;
  }


  /* Help */

  if (
    text.includes("help") ||
    text.includes("commands")
  ) {

    showResponse(
      "AVAILABLE COMMANDS\n\n" +
      "• status\n" +
      "• system status\n" +
      "• time\n" +
      "• date\n" +
      "• clear\n" +
      "• hello jarvis\n\n" +
      "Voice input is also available."
    );

    return;
  }


  /* Generic AI response */

  showResponse(
    "Command received: \"" +
    command +
    "\"\n\n" +
    "JARVIS neural engine has analyzed the request. " +
    "The frontend intelligence layer is operational."
  );
}


/* ================= COMMAND FORM ================= */

commandForm.addEventListener(
  "submit",
  function(event) {

    event.preventDefault();

    const command = commandInput.value.trim();

    if (!command) return;

    processCommand(command);

    commandInput.value = "";
  }
);


/* ================= CLEAR BUTTON ================= */

clearButton.addEventListener(
  "click",
  function() {

    commandInput.value = "";

    dataStream.innerHTML =
      "<div>> DATA STREAM CLEARED</div>" +
      "<div>> JARVIS READY</div>";

    closeResponsePanel();
  }
);


/* ================= VOICE RECOGNITION ================= */

let recognition = null;

const SpeechRecognition =
  window.SpeechRecognition ||
  window.webkitSpeechRecognition;


if (SpeechRecognition) {

  recognition = new SpeechRecognition();

  recognition.continuous = false;
  recognition.interimResults = false;
  recognition.lang = "en-IN";


  recognition.onstart = function() {

    voiceState.textContent =
      "JARVIS LISTENING...";

    voiceButton.classList.add("listening");
  };


  recognition.onresult = function(event) {

    const transcript =
      event.results[0][0].transcript;

    commandInput.value = transcript;

    processCommand(transcript);
  };


  recognition.onerror = function() {

    voiceState.textContent =
      "VOICE ERROR";

    setTimeout(() => {
      voiceState.textContent =
        "JARVIS READY";
    }, 1500);
  };


  recognition.onend = function() {

    voiceButton.classList.remove(
      "listening"
    );

    setTimeout(() => {
      voiceState.textContent =
        "JARVIS READY";
    }, 500);
  };


  voiceButton.addEventListener(
    "click",
    function() {

      try {
        recognition.start();
      } catch (error) {
        console.log(error);
      }

    }
  );

} else {

  voiceButton.addEventListener(
    "click",
    function() {

      showResponse(
        "Voice recognition is not supported by this browser. Please use a browser with Web Speech API support."
      );

    }
  );
}


/* ================= KEYBOARD SHORTCUT ================= */

document.addEventListener(
  "keydown",
  function(event) {

    if (
      event.key === "/" &&
      document.activeElement !== commandInput
    ) {

      event.preventDefault();

      commandInput.focus();
    }

    if (event.key === "Escape") {
      closeResponsePanel();
    }

  }
);


/* ================= STARTUP SEQUENCE ================= */

function startupSequence() {

  const messages = [
    "BOOTING JARVIS 2050...",
    "LOADING NEURAL ARCHITECTURE...",
    "INITIALIZING QUANTUM CORE...",
    "ESTABLISHING SECURE LINK...",
    "CALIBRATING SENSOR ARRAY...",
    "ACTIVATING COGNITIVE ENGINE...",
    "JARVIS SYSTEM ONLINE"
  ];

  let index = 0;

  const startup = setInterval(() => {

    if (index >= messages.length) {

      clearInterval(startup);

      voiceState.textContent =
        "JARVIS READY";

      return;
    }

    addStartupMessage(messages[index]);

    index++;

  }, 550);
}


function addStartupMessage(message) {

  const line = document.createElement("div");

  const time =
    new Date().toLocaleTimeString(
      "en-IN",
      { hour12: false }
    );

  line.textContent =
    "> [" + time + "] " + message;

  dataStream.appendChild(line);

  while (dataStream.children.length > 8) {
    dataStream.removeChild(
      dataStream.firstElementChild
    );
  }
}


/* ================= INITIALIZE ================= */

window.addEventListener(
  "load",
  function() {

    startupSequence();

    setTimeout(() => {

      showResponse(
        "JARVIS 2050 initialized successfully. Neural core is online and awaiting your command."
      );

    }, 4500);

  }
);
