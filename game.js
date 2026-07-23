(() => {
  "use strict";

  const $ = (id) => document.getElementById(id);

  const stage = $("stage");
  const menuCard = $("menuCard");
  const finalCard = $("finalCard");
  const praiseCard = $("praiseCard");
  const praiseTitle = $("praiseTitle");
  const praiseText = $("praiseText");
  const continueButton = $("continueButton");
  const lessonGrid = $("lessonGrid");
  const playAllButton = $("playAllButton");
  const backToMenuButton = $("backToMenuButton");
  const menuButton = $("menuButton");
  const restartButton = $("restartButton");
  const repeatButton = $("repeatButton");
  const fullscreenButton = $("fullscreenButton");
  const continuePortraitButton = $("continuePortraitButton");
  const lessonIcon = $("lessonIcon");
  const lessonNumber = $("lessonNumber");
  const lessonTitle = $("lessonTitle");
  const progress = $("progress");
  const prompt = $("prompt");
  const matveySpeech = $("matveySpeech");
  const matveySpeechText = $("matveySpeechText");
  const buranSpeech = $("buranSpeech");
  const buranSpeechText = $("buranSpeechText");
  const buran = $("buran");
  const objectLayer = $("objectLayer");
  const mouthTarget = $("mouthTarget");
  const bodyTarget = $("bodyTarget");
  const taskPanel = $("taskPanel");
  const taskEyebrow = $("taskEyebrow");
  const taskTitle = $("taskTitle");
  const taskText = $("taskText");
  const choiceActions = $("choiceActions");
  const sayActions = $("sayActions");
  const sayPhrase = $("sayPhrase");
  const micButton = $("micButton");
  const micMeter = $("micMeter");
  const micHint = $("micHint");
  const saidButton = $("saidButton");
  const selectActions = $("selectActions");
  const brushProgress = $("brushProgress");
  const brushProgressFill = $("brushProgressFill");
  const confettiLayer = $("confettiLayer");

  const ITEM_DATA = {
    apple: { label: "ЯБЛОКО", src: "assets/apple.svg" },
    carrot: { label: "МОРКОВКА", src: "assets/carrot.svg" },
    water: { label: "ВОДА", src: "assets/bucket.svg" },
    brush: { label: "ЩЁТКА", src: "assets/brush.svg" },
    ball: { label: "МЯЧ", src: "assets/ball.svg" },
    bag: { label: "СУМКА", src: "assets/bag.svg" }
  };

  const lessons = [
    {
      id: "apple",
      icon: "🍎",
      title: "Яблоко туда и обратно",
      note: "Просим «дай», отдаём «на»",
      steps: [
        { type: "speech", actor: "matvey", text: "Привет! У меня есть яблоко.", item: ["apple", "matvey"] },
        { type: "say", phrase: "Дай яблоко", title: "Попроси яблоко", text: "Когда хочешь получить предмет, скажи: «Дай».", successSpeech: ["matvey", "На, яблоко!"], move: ["apple", "child"], praise: "Отлично! Ты попросил яблоко словом «дай»." },
        { type: "speech", actor: "buran", text: "Я тоже хочу яблоко!" },
        { type: "choice", correct: "НА", title: "Что сказать, когда отдаёшь?", text: "Ты хочешь отдать яблоко Бурану.", praise: "Правильно! Когда отдаём, говорим «на»." },
        { type: "drag", item: "apple", target: "mouth", title: "Отдай яблоко Бурану", text: "Перетащи яблоко к мордочке Бурана.", sayBefore: ["matvey", "На, Буран, яблоко!"], successSpeech: ["buran", "Спасибо! М-м-м, вкусно!"], consume: true },
        { type: "finish", text: "Ты попросил яблоко словом «дай» и отдал его словом «на»." }
      ]
    },
    {
      id: "carrot",
      icon: "🥕",
      title: "Морковка для Бурана",
      note: "Выбираем и произносим слова",
      steps: [
        { type: "speech", actor: "matvey", text: "Смотри, у меня есть морковка.", item: ["carrot", "matvey"] },
        { type: "choice", correct: "ДАЙ", title: "Как попросить морковку?", text: "Выбери нужное слово.", move: ["carrot", "child"], response: ["matvey", "На, морковка!"], praise: "Да! Когда просим, говорим «дай»." },
        { type: "speech", actor: "buran", text: "Я люблю морковку!" },
        { type: "say", phrase: "На, Буран, морковку", title: "Отдай морковку", text: "Нажми на микрофон и произнеси фразу.", praise: "Здорово! Ты сказал «на» и отдал морковку." },
        { type: "drag", item: "carrot", target: "mouth", title: "Покорми Бурана", text: "Перетащи морковку к Бурану.", successSpeech: ["buran", "Спасибо! Хрум-хрум!"], consume: true },
        { type: "finish", text: "Ты правильно попросил и отдал морковку." }
      ]
    },
    {
      id: "water",
      icon: "💧",
      title: "Буран хочет пить",
      note: "Учимся предлагать воду",
      steps: [
        { type: "speech", actor: "buran", text: "Я хочу пить. У меня нет воды.", item: ["water", "child"] },
        { type: "choice", correct: "НА", title: "Что сказать Бурану?", text: "Ты отдаёшь Бурану воду.", praise: "Верно! Когда отдаём, говорим «на»." },
        { type: "say", phrase: "На, Буран, воду", title: "Скажи фразу", text: "Предложи воду Бурану.", praise: "Молодец! Ты предложил воду." },
        { type: "drag", item: "water", target: "mouth", title: "Напои Бурана", text: "Поднеси ведёрко к мордочке.", successSpeech: ["buran", "Спасибо! Я пью воду."], consume: false, moveAfter: ["water", "buran"] },
        { type: "finish", text: "Ты помог Бурану и сказал слово «на»." }
      ]
    },
    {
      id: "brush",
      icon: "🪮",
      title: "Чистим Бурана",
      note: "Просим щётку и возвращаем её",
      steps: [
        { type: "speech", actor: "matvey", text: "Бурану нужно почистить шерсть. Щётка у меня.", item: ["brush", "matvey"] },
        { type: "say", phrase: "Дай щётку", title: "Попроси щётку", text: "Скажи Матвею: «Дай щётку».", move: ["brush", "child"], successSpeech: ["matvey", "На, щётка!"], praise: "Отлично! Ты попросил щётку." },
        { type: "brush", item: "brush", title: "Почисти Бурана", text: "Проводи щёткой по боку Бурана.", successSpeech: ["buran", "Как приятно! Я стал чистым."], praise: "Замечательно! Буран теперь чистый." },
        { type: "choice", correct: "НА", title: "Верни щётку Матвею", text: "Что сказать, когда отдаёшь щётку?", move: ["brush", "matvey"], response: ["matvey", "Спасибо!"], praise: "Правильно! Ты отдал щётку словом «на»." },
        { type: "finish", text: "Ты попросил щётку словом «дай» и вернул её словом «на»." }
      ]
    },
    {
      id: "ball",
      icon: "⚽",
      title: "Игра с мячом",
      note: "Передаём предмет туда и обратно",
      steps: [
        { type: "speech", actor: "matvey", text: "Давай играть! Мяч сейчас у меня.", item: ["ball", "matvey"] },
        { type: "say", phrase: "Дай мяч", title: "Попроси мяч", text: "Нажми на микрофон и попроси мяч.", move: ["ball", "child"], successSpeech: ["matvey", "На, мяч!"], praise: "Супер! Ты попросил мяч." },
        { type: "choice", correct: "НА", title: "Передай мяч Бурану", text: "Какое слово нужно сказать?", praise: "Правильно! Скажи «на», когда отдаёшь." },
        { type: "drag", item: "ball", target: "mouth", title: "Брось мяч Бурану", text: "Перетащи мяч к Бурану.", sayBefore: ["matvey", "На, Буран, мяч!"], successSpeech: ["buran", "Лови обратно!"], moveAfter: ["ball", "buran"] },
        { type: "choice", correct: "ДАЙ", title: "Попроси мяч обратно", text: "Мяч у Бурана. Что нужно сказать?", move: ["ball", "child"], response: ["buran", "На, мяч!"], praise: "Да! Когда просим, говорим «дай»." },
        { type: "finish", text: "Ты передавал мяч и правильно использовал оба слова." }
      ]
    },
    {
      id: "packing",
      icon: "🎒",
      title: "Собираемся в дорогу",
      note: "Слушаем просьбу и выбираем предмет",
      steps: [
        { type: "speech", actor: "matvey", text: "Нам пора в дорогу. Помоги собрать сумку.", item: ["bag", "matvey"] },
        { type: "select", correct: "brush", options: ["brush", "ball", "carrot"], title: "Матвей просит: «Дай щётку»", text: "Выбери щётку среди предметов.", addSelected: ["brush", "child"], praise: "Верно! Ты нашёл щётку." },
        { type: "say", phrase: "На, щётку", title: "Передай щётку Матвею", text: "Произнеси короткую фразу.", move: ["brush", "matvey"], praise: "Молодец! Ты сказал «на»." },
        { type: "select", correct: "water", options: ["apple", "water", "ball"], title: "Матвей просит: «Дай воду»", text: "Выбери ведёрко с водой.", addSelected: ["water", "child"], praise: "Правильно! Это вода." },
        { type: "choice", correct: "НА", title: "Передай воду Матвею", text: "Что сказать, когда отдаёшь?", move: ["water", "matvey"], response: ["matvey", "Спасибо!"], praise: "Отлично! Ты сказал «на»." },
        { type: "select", correct: "carrot", options: ["carrot", "brush", "apple"], title: "Буран просит: «Дай морковку»", text: "Выбери морковку.", addSelected: ["carrot", "child"], praise: "Да, это морковка!" },
        { type: "say", phrase: "На, Буран, морковку", title: "Отдай морковку Бурану", text: "Скажи фразу и помоги Бурану.", move: ["carrot", "buran"], successSpeech: ["buran", "Спасибо! Теперь можно ехать."], praise: "Прекрасно! Ты помог собрать всё нужное." },
        { type: "finish", text: "Ты слушал просьбы, выбирал предметы и говорил «на»." }
      ]
    }
  ];

  const speechSupported = "speechSynthesis" in window && "SpeechSynthesisUtterance" in window;
  const synth = speechSupported ? window.speechSynthesis : null;
  let voices = [];
  let currentLessonIndex = -1;
  let currentStepIndex = 0;
  let playAllMode = false;
  let runToken = 0;
  let currentPhrase = "";
  let currentActor = "matvey";
  let pendingContinue = null;
  let currentTaskCleanup = null;
  let audioContext = null;
  let micStream = null;
  let dragState = null;
  let brushDistance = 0;

  function loadVoices() {
    if (!speechSupported) return;
    voices = synth.getVoices();
  }
  loadVoices();
  if (speechSupported) {
    synth.addEventListener?.("voiceschanged", loadVoices);
    synth.onvoiceschanged = loadVoices;
  }

  function chooseRussianMaleVoice() {
    const list = synth?.getVoices?.() || voices;
    if (list.length) voices = list;
    const russian = voices.filter(v => /^ru([-_]|$)/i.test(v.lang));
    const male = /male|муж|yuri|yury|pavel|dmitr|alex|aleksei|maxim|nikolai|mikhail|sergei|artem|anton|ivan|vladimir|denis|kirill|boris|vsevolod/i;
    const female = /female|жен|milena|irina|alena|svetlana|tatyana|elena|katya|ekaterina|marina|olga|anna/i;
    return russian.find(v => male.test(v.name))
      || russian.find(v => !female.test(v.name))
      || russian[0]
      || voices.find(v => male.test(v.name))
      || voices[0]
      || null;
  }

  function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  function speak(text, actor = "matvey") {
    currentPhrase = text || "";
    currentActor = actor;
    if (!speechSupported || !text) return Promise.resolve();

    synth.cancel();
    return new Promise(resolve => {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "ru-RU";
      utterance.voice = chooseRussianMaleVoice();
      utterance.rate = actor === "buran" ? .72 : .8;
      utterance.pitch = actor === "buran" ? .52 : .72;
      utterance.volume = 1;

      let done = false;
      const finish = () => {
        if (done) return;
        done = true;
        resolve();
      };
      utterance.onend = finish;
      utterance.onerror = finish;
      synth.speak(utterance);
      setTimeout(finish, Math.max(2200, text.length * 120 + 1300));
    });
  }

  async function unlockAudio() {
    try {
      const Context = window.AudioContext || window.webkitAudioContext;
      if (!Context) return;
      audioContext = audioContext || new Context();
      if (audioContext.state === "suspended") await audioContext.resume();
    } catch {}
  }

  function tone(freq, duration, delay = 0, type = "sine", volume = .075) {
    if (!audioContext) return;
    const osc = audioContext.createOscillator();
    const gain = audioContext.createGain();
    const start = audioContext.currentTime + delay;
    osc.type = type;
    osc.frequency.setValueAtTime(freq, start);
    gain.gain.setValueAtTime(.0001, start);
    gain.gain.exponentialRampToValueAtTime(volume, start + .02);
    gain.gain.exponentialRampToValueAtTime(.0001, start + duration);
    osc.connect(gain);
    gain.connect(audioContext.destination);
    osc.start(start);
    osc.stop(start + duration + .04);
  }

  function successSound() {
    tone(523.25, .22, 0);
    tone(659.25, .24, .14);
    tone(783.99, .34, .28);
  }

  function crunchSound() {
    if (!audioContext) return;
    const duration = .2;
    const buffer = audioContext.createBuffer(1, audioContext.sampleRate * duration, audioContext.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < data.length; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / data.length, 2.2);
    }
    const source = audioContext.createBufferSource();
    const filter = audioContext.createBiquadFilter();
    const gain = audioContext.createGain();
    filter.type = "bandpass";
    filter.frequency.value = 1100;
    filter.Q.value = .7;
    gain.gain.value = .15;
    source.buffer = buffer;
    source.connect(filter);
    filter.connect(gain);
    gain.connect(audioContext.destination);
    source.start();
  }

  function showPrompt(text) {
    prompt.textContent = text;
    prompt.classList.remove("is-bouncing");
    void prompt.offsetWidth;
    prompt.classList.add("is-bouncing");
  }

  function hideSpeech() {
    matveySpeech.hidden = true;
    buranSpeech.hidden = true;
  }

  function showSpeech(actor, text) {
    hideSpeech();
    if (actor === "buran") {
      buranSpeechText.textContent = text;
      buranSpeech.hidden = false;
    } else {
      matveySpeechText.textContent = text;
      matveySpeech.hidden = false;
    }
  }

  async function say(actor, text) {
    showSpeech(actor, text);
    await speak(text, actor);
  }

  function makeConfetti(count = 34) {
    const colors = ["#ffcf35","#ef4c3d","#45ae61","#4a9fe8","#9c66d7","#ff8f4c"];
    confettiLayer.replaceChildren();
    for (let i = 0; i < count; i++) {
      const part = document.createElement("i");
      part.className = "confetti";
      part.style.setProperty("--x", `${Math.random() * 100}%`);
      part.style.setProperty("--c", colors[i % colors.length]);
      part.style.setProperty("--d", `${1.8 + Math.random() * 1.5}s`);
      part.style.setProperty("--delay", `${Math.random() * .35}s`);
      part.style.setProperty("--drift", `${-90 + Math.random() * 180}px`);
      part.style.setProperty("--rot", `${280 + Math.random() * 900}deg`);
      confettiLayer.appendChild(part);
    }
  }

  function createObject(type, slot = "center") {
    removeObject(type);
    const data = ITEM_DATA[type];
    const button = document.createElement("button");
    button.type = "button";
    button.className = `game-object slot-${slot}`;
    button.dataset.item = type;
    button.setAttribute("aria-label", data.label.toLowerCase());
    button.innerHTML = `<img src="${data.src}" alt=""><span>${data.label}</span>`;
    objectLayer.appendChild(button);
    return button;
  }

  function getObject(type) {
    return objectLayer.querySelector(`[data-item="${type}"]`);
  }

  function removeObject(type) {
    getObject(type)?.remove();
  }

  function moveObject(type, slot) {
    let object = getObject(type);
    if (!object) object = createObject(type, slot);
    [...object.classList].filter(c => c.startsWith("slot-")).forEach(c => object.classList.remove(c));
    object.classList.add(`slot-${slot}`);
    object.style.removeProperty("--x");
    object.style.removeProperty("--y");
    return object;
  }

  function resetWorld() {
    runToken++;
    synth?.cancel();
    stopMic();
    currentTaskCleanup?.();
    currentTaskCleanup = null;
    pendingContinue = null;
    dragState = null;
    brushDistance = 0;
    objectLayer.replaceChildren();
    confettiLayer.replaceChildren();
    hideSpeech();
    hideTask();
    praiseCard.hidden = true;
    finalCard.hidden = true;
    stage.classList.remove("target-mouth","target-body","show-child-zone");
    buran.classList.remove("is-happy","is-eating");
  }

  function setLessonHeader() {
    const lesson = lessons[currentLessonIndex];
    lessonIcon.textContent = lesson.icon;
    lessonNumber.textContent = `История ${currentLessonIndex + 1} из ${lessons.length}`;
    lessonTitle.textContent = lesson.title;
  }

  function renderProgress() {
    const lesson = lessons[currentLessonIndex];
    progress.replaceChildren();
    if (!lesson) return;
    lesson.steps.forEach((_, index) => {
      const dot = document.createElement("i");
      if (index < currentStepIndex) dot.classList.add("is-done");
      if (index === currentStepIndex) dot.classList.add("is-current");
      progress.appendChild(dot);
    });
  }

  function showTask({ eyebrow = "Задание", title, text }) {
    taskEyebrow.textContent = eyebrow;
    taskTitle.textContent = title;
    taskText.textContent = text || "";
    taskPanel.hidden = false;
  }

  function hideTask() {
    taskPanel.hidden = true;
    choiceActions.hidden = true;
    sayActions.hidden = true;
    selectActions.hidden = true;
    brushProgress.hidden = true;
    micButton.classList.remove("is-listening");
    micMeter.style.width = "0%";
  }

  function showPraise(title, text, buttonText = "Дальше") {
    hideTask();
    hideSpeech();
    praiseTitle.textContent = title;
    praiseText.textContent = text;
    continueButton.textContent = buttonText;
    praiseCard.hidden = false;
    makeConfetti(26);
    successSound();
    return new Promise(resolve => {
      pendingContinue = () => {
        praiseCard.hidden = true;
        confettiLayer.replaceChildren();
        pendingContinue = null;
        resolve();
      };
    });
  }

  async function friendlyWrong(correct) {
    showPrompt(correct === "НА" ? "Когда отдаём — говорим «НА»" : "Когда просим — говорим «ДАЙ»");
    await say("matvey", correct === "НА"
      ? "Почти! Когда отдаём, говорим: на."
      : "Почти! Когда просим, говорим: дай.");
  }

  async function applyStepEffects(step) {
    if (step.item) createObject(step.item[0], step.item[1]);
    if (step.addSelected) createObject(step.addSelected[0], step.addSelected[1]);
    if (step.move) moveObject(step.move[0], step.move[1]);
    if (step.moveAfter) moveObject(step.moveAfter[0], step.moveAfter[1]);
    if (step.response) await say(step.response[0], step.response[1]);
    if (step.successSpeech) await say(step.successSpeech[0], step.successSpeech[1]);
  }

  async function runCurrentStep() {
    const token = runToken;
    const lesson = lessons[currentLessonIndex];
    const step = lesson.steps[currentStepIndex];
    if (!step || token !== runToken) return;

    renderProgress();
    hideTask();
    hideSpeech();
    stage.classList.remove("target-mouth","target-body","show-child-zone");

    if (step.type === "speech") {
      showPrompt("Послушай");
      if (step.item) createObject(step.item[0], step.item[1]);
      await say(step.actor, step.text);
      if (token !== runToken) return;
      await wait(350);
      nextStep();
      return;
    }

    if (step.type === "choice") {
      runChoiceStep(step);
      return;
    }

    if (step.type === "say") {
      runSayStep(step);
      return;
    }

    if (step.type === "drag") {
      runDragStep(step);
      return;
    }

    if (step.type === "brush") {
      runBrushStep(step);
      return;
    }

    if (step.type === "select") {
      runSelectStep(step);
      return;
    }

    if (step.type === "finish") {
      await showPraise("История пройдена!", step.text, playAllMode && currentLessonIndex < lessons.length - 1 ? "Следующая история" : "В меню");
      if (token !== runToken) return;
      if (playAllMode && currentLessonIndex < lessons.length - 1) {
        startLesson(currentLessonIndex + 1, true);
      } else if (playAllMode && currentLessonIndex === lessons.length - 1) {
        showFinal();
      } else {
        openMenu();
      }
    }
  }

  function nextStep() {
    currentStepIndex++;
    runCurrentStep();
  }

  function runChoiceStep(step) {
    showPrompt("Выбери правильное слово");
    showTask({ eyebrow: "Выбери", title: step.title, text: step.text });
    choiceActions.hidden = false;

    const onChoice = async event => {
      const button = event.target.closest("[data-answer]");
      if (!button) return;
      const answer = button.dataset.answer;

      if (answer !== step.correct) {
        button.classList.add("is-wrong");
        setTimeout(() => button.classList.remove("is-wrong"), 450);
        await friendlyWrong(step.correct);
        return;
      }

      choiceActions.removeEventListener("click", onChoice);
      await applyStepEffects(step);
      await showPraise("Правильно!", step.praise || `Ты выбрал слово «${step.correct.toLowerCase()}».`);
      nextStep();
    };

    choiceActions.addEventListener("click", onChoice);
    currentTaskCleanup = () => choiceActions.removeEventListener("click", onChoice);
  }

  function runSayStep(step) {
    showPrompt("Скажи фразу");
    showTask({ eyebrow: "Скажи", title: step.title, text: step.text });
    sayPhrase.textContent = step.phrase.toUpperCase();
    sayActions.hidden = false;
    micHint.textContent = "Игра слушает только громкость голоса, а не распознаёт слова";
    micButton.querySelector(".mic-button__text").textContent = "Нажми и скажи";

    let completed = false;

    const complete = async () => {
      if (completed) return;
      completed = true;
      micButton.removeEventListener("click", listen);
      saidButton.removeEventListener("click", complete);
      stopMic();
      await applyStepEffects(step);
      await showPraise("Отлично сказано!", step.praise || `Ты сказал: «${step.phrase}».`);
      nextStep();
    };

    const listen = async () => {
      await unlockAudio();
      const heard = await listenForVoice();
      if (heard) {
        complete();
      } else {
        micHint.textContent = "Я не услышал голос. Попробуй ещё или нажми «Я сказал!»";
        micButton.querySelector(".mic-button__text").textContent = "Попробовать ещё";
      }
    };

    micButton.addEventListener("click", listen);
    saidButton.addEventListener("click", complete);
    currentTaskCleanup = () => {
      micButton.removeEventListener("click", listen);
      saidButton.removeEventListener("click", complete);
      stopMic();
    };
  }

  async function listenForVoice() {
    synth?.cancel();
    micButton.classList.add("is-listening");
    micButton.querySelector(".mic-button__text").textContent = "Говори…";
    micHint.textContent = "Скажи фразу громко и спокойно";

    if (!navigator.mediaDevices?.getUserMedia || !window.isSecureContext) {
      await wait(950);
      micButton.classList.remove("is-listening");
      micMeter.style.width = "100%";
      return true;
    }

    try {
      micStream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const Context = window.AudioContext || window.webkitAudioContext;
      audioContext = audioContext || new Context();
      if (audioContext.state === "suspended") await audioContext.resume();

      const source = audioContext.createMediaStreamSource(micStream);
      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 1024;
      source.connect(analyser);
      const data = new Uint8Array(analyser.fftSize);
      const start = performance.now();
      let loudFrames = 0;

      return await new Promise(resolve => {
        const check = () => {
          analyser.getByteTimeDomainData(data);
          let sum = 0;
          for (let i = 0; i < data.length; i++) {
            const value = (data[i] - 128) / 128;
            sum += value * value;
          }
          const rms = Math.sqrt(sum / data.length);
          const level = Math.min(100, Math.max(4, rms * 900));
          micMeter.style.width = `${level}%`;

          if (rms > .035) loudFrames++;
          else loudFrames = Math.max(0, loudFrames - 1);

          if (loudFrames >= 5) {
            setTimeout(() => {
              stopMic();
              micButton.classList.remove("is-listening");
              resolve(true);
            }, 450);
            return;
          }

          if (performance.now() - start > 3500) {
            stopMic();
            micButton.classList.remove("is-listening");
            micMeter.style.width = "0%";
            resolve(false);
            return;
          }

          requestAnimationFrame(check);
        };
        check();
      });
    } catch {
      stopMic();
      micButton.classList.remove("is-listening");
      micMeter.style.width = "0%";
      return false;
    }
  }

  function stopMic() {
    if (micStream) {
      micStream.getTracks().forEach(track => track.stop());
      micStream = null;
    }
  }

  function runDragStep(step) {
    const object = moveObject(step.item, getObject(step.item)?.classList.contains("slot-buran") ? "buran" : "child");
    object.classList.add("is-ready");
    stage.classList.add(step.target === "body" ? "target-body" : "target-mouth", "show-child-zone");
    showPrompt(step.title);
    showTask({ eyebrow: "Подвигай предмет", title: step.title, text: step.text });
    taskPanel.hidden = false;

    const target = step.target === "body" ? bodyTarget : mouthTarget;

    const down = event => {
      event.preventDefault();
      const rect = object.getBoundingClientRect();
      dragState = {
        pointerId: event.pointerId,
        startX: event.clientX,
        startY: event.clientY,
        baseX: parseFloat(getComputedStyle(object).getPropertyValue("--x")) || 0,
        baseY: parseFloat(getComputedStyle(object).getPropertyValue("--y")) || 0,
        rect
      };
      object.setPointerCapture?.(event.pointerId);
      object.classList.add("is-dragging");
    };

    const move = event => {
      if (!dragState || event.pointerId !== dragState.pointerId) return;
      event.preventDefault();
      object.style.setProperty("--x", `${dragState.baseX + event.clientX - dragState.startX}px`);
      object.style.setProperty("--y", `${dragState.baseY + event.clientY - dragState.startY}px`);
    };

    const up = async event => {
      if (!dragState || event.pointerId !== dragState.pointerId) return;
      event.preventDefault();
      object.releasePointerCapture?.(event.pointerId);
      object.classList.remove("is-dragging");
      dragState = null;

      const a = object.getBoundingClientRect();
      const t = target.getBoundingClientRect();
      const distance = Math.hypot(a.left + a.width/2 - (t.left+t.width/2), a.top + a.height/2 - (t.top+t.height/2));

      if (distance > Math.max(a.width, t.width) * .9) {
        object.style.setProperty("--x", "0px");
        object.style.setProperty("--y", "0px");
        showPrompt("Почти! Поднеси предмет к Бурану");
        return;
      }

      cleanup();
      object.classList.remove("is-ready");
      stage.classList.remove("target-mouth","target-body","show-child-zone");
      hideTask();

      if (step.sayBefore) await say(step.sayBefore[0], step.sayBefore[1]);
      if (step.consume) {
        crunchSound();
        buran.classList.add("is-eating");
        object.classList.add("is-hidden");
        setTimeout(() => buran.classList.remove("is-eating"), 1800);
      } else {
        buran.classList.add("is-happy");
        setTimeout(() => buran.classList.remove("is-happy"), 1500);
      }
      if (step.moveAfter) moveObject(step.moveAfter[0], step.moveAfter[1]);
      if (step.successSpeech) await say(step.successSpeech[0], step.successSpeech[1]);
      nextStep();
    };

    function cleanup() {
      object.removeEventListener("pointerdown", down);
      object.removeEventListener("pointermove", move);
      object.removeEventListener("pointerup", up);
      object.removeEventListener("pointercancel", up);
    }

    object.addEventListener("pointerdown", down);
    object.addEventListener("pointermove", move);
    object.addEventListener("pointerup", up);
    object.addEventListener("pointercancel", up);
    currentTaskCleanup = cleanup;
  }

  function runBrushStep(step) {
    const object = moveObject(step.item, "child");
    object.classList.add("is-ready");
    stage.classList.add("target-body");
    brushDistance = 0;
    showPrompt("Проведи щёткой по Бурану");
    showTask({ eyebrow: "Двигай щётку", title: step.title, text: step.text });
    brushProgress.hidden = false;
    brushProgressFill.style.width = "0%";

    let lastPoint = null;
    let finished = false;

    const down = event => {
      event.preventDefault();
      object.setPointerCapture?.(event.pointerId);
      dragState = {
        pointerId: event.pointerId,
        startX: event.clientX,
        startY: event.clientY,
        baseX: parseFloat(getComputedStyle(object).getPropertyValue("--x")) || 0,
        baseY: parseFloat(getComputedStyle(object).getPropertyValue("--y")) || 0
      };
      lastPoint = { x: event.clientX, y: event.clientY };
      object.classList.add("is-dragging");
    };

    const move = event => {
      if (!dragState || event.pointerId !== dragState.pointerId || finished) return;
      event.preventDefault();
      object.style.setProperty("--x", `${dragState.baseX + event.clientX - dragState.startX}px`);
      object.style.setProperty("--y", `${dragState.baseY + event.clientY - dragState.startY}px`);

      const body = bodyTarget.getBoundingClientRect();
      const inside = event.clientX >= body.left && event.clientX <= body.right && event.clientY >= body.top && event.clientY <= body.bottom;
      if (inside && lastPoint) {
        brushDistance += Math.hypot(event.clientX - lastPoint.x, event.clientY - lastPoint.y);
        const needed = stage.getBoundingClientRect().width * 1.25;
        const percent = Math.min(100, brushDistance / needed * 100);
        brushProgressFill.style.width = `${percent}%`;
        if (percent >= 100) finish();
      }
      lastPoint = { x: event.clientX, y: event.clientY };
    };

    const up = event => {
      if (!dragState || event.pointerId !== dragState.pointerId) return;
      object.releasePointerCapture?.(event.pointerId);
      object.classList.remove("is-dragging");
      dragState = null;
      lastPoint = null;
    };

    const finish = async () => {
      if (finished) return;
      finished = true;
      cleanup();
      object.classList.remove("is-ready","is-dragging");
      stage.classList.remove("target-body");
      hideTask();
      buran.classList.add("is-happy");
      setTimeout(() => buran.classList.remove("is-happy"), 1700);
      if (step.successSpeech) await say(step.successSpeech[0], step.successSpeech[1]);
      await showPraise("Чисто и красиво!", step.praise);
      nextStep();
    };

    function cleanup() {
      object.removeEventListener("pointerdown", down);
      object.removeEventListener("pointermove", move);
      object.removeEventListener("pointerup", up);
      object.removeEventListener("pointercancel", up);
    }

    object.addEventListener("pointerdown", down);
    object.addEventListener("pointermove", move);
    object.addEventListener("pointerup", up);
    object.addEventListener("pointercancel", up);
    currentTaskCleanup = cleanup;
  }

  function runSelectStep(step) {
    showPrompt("Выбери нужный предмет");
    showTask({ eyebrow: "Найди предмет", title: step.title, text: step.text });
    selectActions.hidden = false;
    selectActions.replaceChildren();

    step.options.forEach(type => {
      const data = ITEM_DATA[type];
      const button = document.createElement("button");
      button.type = "button";
      button.className = "select-object";
      button.dataset.itemChoice = type;
      button.innerHTML = `<img src="${data.src}" alt=""><span>${data.label}</span>`;
      selectActions.appendChild(button);
    });

    const onSelect = async event => {
      const button = event.target.closest("[data-item-choice]");
      if (!button) return;
      const answer = button.dataset.itemChoice;

      if (answer !== step.correct) {
        button.classList.add("is-wrong");
        setTimeout(() => button.classList.remove("is-wrong"), 450);
        const wrongName = ITEM_DATA[answer].label.toLowerCase();
        const rightName = ITEM_DATA[step.correct].label.toLowerCase();
        showPrompt(`Это ${wrongName}. Найди: ${rightName}`);
        await say("matvey", `Это ${wrongName}. Нам нужна ${rightName}.`);
        return;
      }

      selectActions.removeEventListener("click", onSelect);
      if (step.addSelected) createObject(step.addSelected[0], step.addSelected[1]);
      await showPraise("Верно!", step.praise);
      nextStep();
    };

    selectActions.addEventListener("click", onSelect);
    currentTaskCleanup = () => selectActions.removeEventListener("click", onSelect);
  }

  function startLesson(index, allMode = false) {
    resetWorld();
    currentLessonIndex = index;
    currentStepIndex = 0;
    playAllMode = allMode;
    menuCard.hidden = true;
    finalCard.hidden = true;
    setLessonHeader();
    renderProgress();
    showPrompt("Начинаем историю");
    runCurrentStep();
  }

  function openMenu() {
    resetWorld();
    currentLessonIndex = -1;
    currentStepIndex = 0;
    playAllMode = false;
    lessonIcon.textContent = "🐴";
    lessonNumber.textContent = "Речевая игра";
    lessonTitle.textContent = "Матвей и Буран";
    progress.replaceChildren();
    showPrompt("Выбери историю");
    menuCard.hidden = false;
  }

  function showFinal() {
    resetWorld();
    menuCard.hidden = true;
    finalCard.hidden = false;
    lessonIcon.textContent = "🏅";
    lessonNumber.textContent = "Готово";
    lessonTitle.textContent = "Все истории пройдены";
    showPrompt("Ты большой молодец!");
    makeConfetti(48);
    successSound();
    say("matvey", "Ты большой молодец! На — когда отдаём. Дай — когда просим.");
  }

  function renderMenu() {
    lessonGrid.replaceChildren();
    lessons.forEach((lesson, index) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "lesson-card";
      button.dataset.lesson = index;
      button.innerHTML = `
        <span class="lesson-card__icon">${lesson.icon}</span>
        <span><strong>${index + 1}. ${lesson.title}</strong><small>${lesson.note}</small></span>
      `;
      lessonGrid.appendChild(button);
    });
  }

  lessonGrid.addEventListener("click", async event => {
    const button = event.target.closest("[data-lesson]");
    if (!button) return;
    await unlockAudio();
    startLesson(Number(button.dataset.lesson), false);
  });

  playAllButton.addEventListener("click", async () => {
    await unlockAudio();
    startLesson(0, true);
  });

  continueButton.addEventListener("click", () => pendingContinue?.());
  backToMenuButton.addEventListener("click", openMenu);
  menuButton.addEventListener("click", openMenu);

  restartButton.addEventListener("click", async () => {
    await unlockAudio();
    if (currentLessonIndex >= 0) startLesson(currentLessonIndex, playAllMode);
    else openMenu();
  });

  repeatButton.addEventListener("click", async () => {
    await unlockAudio();
    if (currentPhrase) speak(currentPhrase, currentActor);
    else speak("На — когда отдаём. Дай — когда просим.", "matvey");
  });

  fullscreenButton.addEventListener("click", async () => {
    try {
      if (!document.fullscreenElement) await document.documentElement.requestFullscreen?.();
      else await document.exitFullscreen?.();
    } catch {}
  });

  continuePortraitButton.addEventListener("click", () => stage.classList.add("portrait-dismissed"));
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      synth?.cancel();
      stopMic();
    }
  });

  renderMenu();
  openMenu();
})();