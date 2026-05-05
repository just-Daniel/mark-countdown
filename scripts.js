/* ===== Config ===== */
const countDownDate = new Date("July 9, 2031 00:00:01").getTime();
const startDate = new Date("2024-01-01").getTime(); // approximate start

/* ===== State ===== */
let showElapsed = false;
let soundEnabled = false;
let clickCount = 0;
let gameCompleted = false;
let konamiProgress = 0;
const konamiCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // ↑↑↓↓←→←→BA

/* ===== Quotes ===== */
const quotes = [
  "Терпіння — найкраща зброя воїна кохання 💪",
  "Марку, використай цей час щоб стати найкращою версією себе!",
  "Кожна секунда наближає тебе до щастя... або до ще одного мему",
  "Поки чекаєш — прокачай скіли. Дівчата люблять розумних 🧠",
  "2031 рік буде легендарним. Марк, тримайся!",
  "Факт: 73% стосунків починаються після довгого очікування (не факт)",
  "Марк у спортзалі прокачується, поки таймер тікає ⏳",
  "Хтось колись сказав: 'Хто чекає, той дочекається'. Мабуть це був Марк.",
  "Залишилось зовсім трохи... відносно віку Всесвіту 🌌",
  "Марк, не забудь підготувати пікап-лайни до 2031!",
  "Краще пізно, ніж ніколи. Але краще вчасно, ніж пізно.",
  "Це не просто таймер — це епічний зворотній відлік до нової ери!",
  "Марк медитує... або просто чекає. Одне й те саме.",
  "Кажуть, Марк вже тренується говорити 'Привіт' перед дзеркалом 🪞",
  "Час летить, коли весело. А коли чекаєш — повзе.",
];

/* ===== Fun facts ===== */
const allFacts = [
  "🎬 Подивитись 2,190 фільмів (по одному на день)",
  "📚 Прочитати 365 книг (по одній на тиждень)",
  "🏋️ Зробити 6,570,000 віджимань (по 3000 на день... ну або ні)",
  "🌍 Обійти Землю пішки 4 рази",
  "🎮 Пройти 1,825 відеоігор",
  "☕ Випити 13,140 чашок кави",
  "🍕 З'їсти 5,475 піц (це не рекомендація, це мрія)",
  "🧑‍💻 Написати 10 мільйонів рядків коду",
  "🎸 Навчитись грати на 5 музичних інструментах",
  "🗣️ Вивчити 3 нові мови",
  "🚀 SpaceX встигне запустити ~50 ракет",
  "🐱 Кіт встигне поспати 35,000 годин",
  "📱 Вийде ще 6 нових iPhone",
  "🏃 Пробігти 39,420 км (це як з Києва до Сіднея і назад)",
  "🎂 Відсвяткувати ще 6 днів народження",
  "🌱 Виростити дерево з насінини до 2 метрів",
  "✈️ Відвідати 50 країн (по одній на місяць)",
  "🧘 Провести 4,380 годин в медитації",
];

/* ===== Chatbot responses ===== */
const chatbotResponses = {
  default: [
    "Хм, цікаве питання! Але я з майбутнього і не можу розказати все 😏",
    "У 2031 все буде добре, повір мені!",
    "Не хвилюйся, Марк з майбутнього все тримає під контролем 💪",
    "Це секретна інформація з майбутнього. Не можу розказати!",
    "О, це цікаво! Але спойлерів не буде 🤐",
  ],
  greetings: [
    "Привіт з 2031! Тут все круто, повір 😎",
    "Здоровенькі були! Марк з майбутнього вітає тебе!",
    "Йо! Що нового в минулому? 😄",
  ],
  girls: [
    "О так, у 2031 Марк — справжній серцеїд! Серйозно! 😍",
    "Скажу тільки одне: все буде НАБАГАТО краще ніж ти думаєш 🔥",
    "Дівчата у 2031 самі підходять до Марка. Правда-правда!",
    "Без спойлерів, але... у Марка буде дуже цікаве особисте життя 💕",
  ],
  future: [
    "У 2031 машини літають! Жартую... але майже 🚗",
    "Технології вражають, але Марк ще більше!",
    "У майбутньому все добре. Особливо для Марка 😉",
  ],
  mark: [
    "Марк у 2031 — просто легенда. Більше сказати не можу!",
    "Він виріс, помудрішав і став справжнім красенем 💅",
    "Марк? О, ви про того самого Марка? Він зірка!",
  ],
};

/* ===== DOM Elements ===== */
const $ = (id) => document.getElementById(id);

/* ===== Countdown ===== */
function updateCountdown() {
  const now = Date.now();
  const distance = countDownDate - now;

  if (distance < 0) {
    $("countdown").innerHTML =
      '<h2 style="font-size:2rem;">🎉 Марк можеш починати, час вийшов!</h2>';
    $("main-heading").textContent = "Час настав!";
    $("mode-hint").style.display = "none";
    return false;
  }

  const elapsed = now - startDate;
  const total = countDownDate - startDate;
  const progress = Math.min((elapsed / total) * 100, 100);
  $("progress-fill").style.width = progress.toFixed(2) + "%";
  $("progress-text").textContent = progress.toFixed(2) + "% пройшло";

  let targetDistance = showElapsed ? elapsed : distance;

  const days = Math.floor(targetDistance / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (targetDistance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
  );
  const minutes = Math.floor((targetDistance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((targetDistance % (1000 * 60)) / 1000);

  animateValue("days", days);
  animateValue("hours", hours);
  animateValue("minutes", minutes);
  animateValue("seconds", seconds);

  // Confetti when < 100 days
  if (days < 100 && !showElapsed && !window._confettiTriggered) {
    window._confettiTriggered = true;
    launchConfetti();
  }

  return true;
}

function animateValue(id, value) {
  const el = $(id);
  const strVal = String(value);
  if (el.textContent !== strVal) {
    el.textContent = strVal;
    el.classList.remove("flip");
    void el.offsetWidth; // force reflow
    el.classList.add("flip");
  }
}

/* ===== Tick Sound ===== */
let tickAudioCtx = null;

function playTick() {
  if (!soundEnabled) return;
  if (!tickAudioCtx)
    tickAudioCtx = new (window.AudioContext || window.webkitAudioContext)();
  const osc = tickAudioCtx.createOscillator();
  const gain = tickAudioCtx.createGain();
  osc.connect(gain);
  gain.connect(tickAudioCtx.destination);
  osc.frequency.value = 800;
  osc.type = "sine";
  gain.gain.value = 0.05;
  gain.gain.exponentialRampToValueAtTime(
    0.001,
    tickAudioCtx.currentTime + 0.08,
  );
  osc.start(tickAudioCtx.currentTime);
  osc.stop(tickAudioCtx.currentTime + 0.08);
}

/* ===== Quotes rotation ===== */
let quoteIndex = 0;
function rotateQuote() {
  const box = $("quote-box");
  const text = $("quote-text");
  box.style.opacity = 0;
  setTimeout(() => {
    quoteIndex = (quoteIndex + 1) % quotes.length;
    text.textContent = `"${quotes[quoteIndex]}"`;
    box.style.opacity = 1;
  }, 400);
}

/* ===== Facts ===== */
function showFacts() {
  const list = $("facts-list");
  list.innerHTML = "";
  const shuffled = [...allFacts].sort(() => Math.random() - 0.5);
  const selected = shuffled.slice(0, 5);
  selected.forEach((fact) => {
    const div = document.createElement("div");
    div.className = "fact-item";
    div.textContent = fact;
    list.appendChild(div);
  });
}

/* ===== Mini Game ===== */
function handleGameClick() {
  if (gameCompleted) return;
  clickCount++;
  $("click-count").textContent = clickCount;
  $("game-progress-fill").style.width = (clickCount / 1000) * 100 + "%";

  if (clickCount >= 1000) {
    gameCompleted = true;
    const btn = $("speed-btn");
    btn.classList.add("done");
    btn.textContent = "✅ Готово!";
    $("game-msg").textContent =
      "Ой... нічого не сталось 😅 Час не можна прискорити, але Марк цінує твої старання!";
    launchConfetti();
  } else if (clickCount === 500) {
    $("game-msg").textContent = "Половина! Ти серйозно?! Продовжуй! 😤";
  } else if (clickCount === 100) {
    $("game-msg").textContent = "Непогано! Ще 900 залишилось 💪";
  } else if (clickCount === 750) {
    $("game-msg").textContent = "Майже! Не здавайся! 🔥";
  }
}

/* ===== Chatbot ===== */
function getChatbotResponse(msg) {
  const lower = msg.toLowerCase();
  if (/привіт|здоров|хай|йо|hello|hi/.test(lower)) {
    return pick(chatbotResponses.greetings);
  }
  if (/дівч|кохан|стосунк|любов|серц/.test(lower)) {
    return pick(chatbotResponses.girls);
  }
  if (/майбутн|2031|буде|коли|час/.test(lower)) {
    return pick(chatbotResponses.future);
  }
  if (/марк/.test(lower)) {
    return pick(chatbotResponses.mark);
  }
  return pick(chatbotResponses.default);
}

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function addChatMessage(text, isUser) {
  const container = $("chatbot-messages");
  const div = document.createElement("div");
  div.className = isUser ? "user-msg" : "bot-msg";
  div.textContent = text;
  container.appendChild(div);
  container.scrollTop = container.scrollHeight;
}

function handleChatSend() {
  const input = $("chatbot-input");
  const text = input.value.trim();
  if (!text) return;
  addChatMessage(text, true);
  input.value = "";
  setTimeout(
    () => {
      addChatMessage(getChatbotResponse(text), false);
    },
    500 + Math.random() * 1000,
  );
}

/* ===== Hearts Canvas ===== */
function isMobile() {
  return window.innerWidth <= 768;
}

function initHearts() {
  const canvas = $("hearts-canvas");
  const ctx = canvas.getContext("2d");
  let hearts = [];
  let dpr = Math.min(window.devicePixelRatio || 1, 2);
  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    canvas.style.width = window.innerWidth + "px";
    canvas.style.height = window.innerHeight + "px";
    ctx.scale(dpr, dpr);
  }
  resize();

  let resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(resize, 150);
  });

  // Fewer hearts on mobile for battery/performance
  const heartCount = isMobile() ? 8 : 15;

  function createHeart() {
    return {
      x: Math.random() * window.innerWidth,
      y: window.innerHeight + 20,
      size: isMobile() ? 8 + Math.random() * 12 : 10 + Math.random() * 18,
      speed: 0.5 + Math.random() * 1.5,
      wobble: Math.random() * Math.PI * 2,
      wobbleSpeed: 0.01 + Math.random() * 0.03,
      opacity: 0.2 + Math.random() * 0.4,
    };
  }

  for (let i = 0; i < heartCount; i++) {
    const h = createHeart();
    h.y = Math.random() * window.innerHeight;
    hearts.push(h);
  }

  function drawHeart(x, y, size, opacity) {
    ctx.save();
    ctx.globalAlpha = opacity;
    ctx.fillStyle = getComputedStyle(document.documentElement)
      .getPropertyValue("--accent")
      .trim();
    ctx.beginPath();
    const topY = y - size / 2;
    ctx.moveTo(x, topY + size / 4);
    ctx.bezierCurveTo(
      x,
      topY,
      x - size / 2,
      topY,
      x - size / 2,
      topY + size / 4,
    );
    ctx.bezierCurveTo(
      x - size / 2,
      topY + size / 2,
      x,
      topY + size * 0.65,
      x,
      topY + size,
    );
    ctx.bezierCurveTo(
      x,
      topY + size * 0.65,
      x + size / 2,
      topY + size / 2,
      x + size / 2,
      topY + size / 4,
    );
    ctx.bezierCurveTo(x + size / 2, topY, x, topY, x, topY + size / 4);
    ctx.fill();
    ctx.restore();
  }

  function animate() {
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    hearts.forEach((h) => {
      h.y -= h.speed;
      h.wobble += h.wobbleSpeed;
      const wobbleAmp = isMobile() ? 20 : 30;
      const wx = h.x + Math.sin(h.wobble) * wobbleAmp;
      drawHeart(wx, h.y, h.size, h.opacity);
      if (h.y < -30) {
        Object.assign(h, createHeart());
      }
    });
    requestAnimationFrame(animate);
  }
  animate();
}

/* ===== Confetti ===== */
function launchConfetti() {
  const canvas = $("confetti-canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const particles = [];
  const colors = [
    "#f857a6",
    "#ff5858",
    "#00b894",
    "#ffeaa7",
    "#74b9ff",
    "#a29bfe",
    "#fd79a8",
  ];

  for (let i = 0; i < 150; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: -10 - Math.random() * canvas.height * 0.5,
      w: 4 + Math.random() * 8,
      h: 4 + Math.random() * 8,
      color: colors[Math.floor(Math.random() * colors.length)],
      speed: 2 + Math.random() * 4,
      wobble: Math.random() * 10,
      wobbleSpeed: 0.05 + Math.random() * 0.1,
      rotation: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.1,
    });
  }

  let frame = 0;
  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let alive = false;
    particles.forEach((p) => {
      p.y += p.speed;
      p.wobble += p.wobbleSpeed;
      p.rotation += p.rotSpeed;
      const wx = p.x + Math.sin(p.wobble) * 20;
      if (p.y < canvas.height + 20) alive = true;
      ctx.save();
      ctx.translate(wx, p.y);
      ctx.rotate(p.rotation);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      ctx.restore();
    });
    frame++;
    if (alive && frame < 300) {
      requestAnimationFrame(draw);
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }
  draw();
}

/* ===== Konami Code ===== */
document.addEventListener("keydown", (e) => {
  if (e.keyCode === konamiCode[konamiProgress]) {
    konamiProgress++;
    if (konamiProgress === konamiCode.length) {
      konamiProgress = 0;
      $("easter-egg").classList.add("active");
      launchConfetti();
    }
  } else {
    konamiProgress = 0;
  }
});

/* ===== Theme Toggle ===== */
function initTheme() {
  const saved = localStorage.getItem("mark-theme");
  if (saved === "light") {
    document.body.classList.add("light-theme");
    $("theme-toggle").textContent = "☀️";
  }

  $("theme-toggle").addEventListener("click", () => {
    document.body.classList.toggle("light-theme");
    const isLight = document.body.classList.contains("light-theme");
    $("theme-toggle").textContent = isLight ? "☀️" : "🌙";
    localStorage.setItem("mark-theme", isLight ? "light" : "dark");
  });
}

/* ===== Sound Toggle ===== */
function initSound() {
  $("sound-toggle").addEventListener("click", () => {
    soundEnabled = !soundEnabled;
    $("sound-toggle").textContent = soundEnabled ? "🔊" : "🔇";
    if (soundEnabled) playTick(); // test sound
  });
}

/* ===== Share ===== */
function initShare() {
  $("share-btn").addEventListener("click", async () => {
    const text = `Марк почне спілкуватись з дівчатами через ${$("days").textContent} днів! 😱`;
    if (navigator.share) {
      try {
        await navigator.share({ title: "Правда про стосунки Марка: ", text });
      } catch {}
    } else {
      await navigator.clipboard.writeText(text);
      const toast = $("toast");
      toast.classList.add("show");
      setTimeout(() => toast.classList.remove("show"), 2000);
    }
  });
}

/* ===== Elapsed Toggle ===== */
function initElapsedToggle() {
  $("click-toggle-elapsed").addEventListener("click", () => {
    showElapsed = !showElapsed;
    $("main-heading").textContent = showElapsed
      ? "Марк вже чекає:"
      : "Марк почне спілкуватись з дівчатами через:";
    $("mode-hint").textContent = showElapsed
      ? "Натисни щоб побачити скільки залишилось"
      : "Натисни на таймер щоб побачити скільки вже пройшло";
    updateCountdown();
  });
}

/* ===== Chatbot Init ===== */
function initChatbot() {
  const chatbot = $("chatbot");
  chatbot.classList.add("minimized");

  $("chatbot-toggle").addEventListener("click", () => {
    chatbot.classList.toggle("minimized");
  });

  $("chatbot-send").addEventListener("click", handleChatSend);
  $("chatbot-input").addEventListener("keydown", (e) => {
    if (e.key === "Enter") handleChatSend();
  });
}

/* ===== Init ===== */
document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  initSound();
  initShare();
  initElapsedToggle();
  initChatbot();
  initHearts();
  showFacts();

  // Set initial quote
  $("quote-text").textContent = `"${quotes[0]}"`;

  // Countdown loop
  updateCountdown();
  setInterval(() => {
    updateCountdown();
    playTick();
  }, 1000);

  // Rotate quotes every 10 seconds
  setInterval(rotateQuote, 10000);

  // Mini game
  $("speed-btn").addEventListener("click", handleGameClick);

  // Refresh facts
  $("refresh-facts").addEventListener("click", showFacts);
});
