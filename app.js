const playButton = document.querySelector("#play-btn");
const backButton = document.querySelector("#back-btn");
const formationButton = document.querySelector("#formation-btn");
const formationBackButton = document.querySelector("#formation-back");
const homeScreen = document.querySelector("#home-screen");
const playScreen = document.querySelector("#play-screen");
const formationScreen = document.querySelector("#formation-screen");
const winPanel = document.querySelector("#result-win");
const drawPanel = document.querySelector("#result-draw");
const losePanel = document.querySelector("#result-lose");
const resultCloseButtons = document.querySelectorAll(".result-close");
const rivalCards = document.querySelectorAll(".rival-card");
const coinAmount = document.querySelector("#coin-amount");
const coinDelta = document.querySelector("#coin-delta");
const formationButtons = document.querySelectorAll(".formation-btn");
const formationNote = document.querySelector("#formation-note");
const clubButton = document.querySelector("#club-btn");
const clubBackButton = document.querySelector("#club-back");
const clubScreen = document.querySelector("#club-screen");
const clubList = document.querySelector("#club-list");
const marketButton = document.querySelector("#market-btn");
const marketBackButton = document.querySelector("#market-back");
const marketScreen = document.querySelector("#market-screen");
const marketList = document.querySelector("#market-list");
const marketNote = document.querySelector("#market-note");
const marketSortButtons = document.querySelectorAll(".market-sort");
const marketInputName = document.querySelector("#market-input-name");
const marketInputClub = document.querySelector("#market-input-club");
const marketInputPos = document.querySelector("#market-input-pos");

const showScreen = (screenToShow, screenToHide) => {
  screenToHide.classList.add("screen-hidden");
  screenToShow.classList.remove("screen-hidden");
  window.scrollTo({ top: 0, behavior: "smooth" });
};

playButton?.addEventListener("click", (event) => {
  event.preventDefault();
  showScreen(playScreen, homeScreen);
});

backButton?.addEventListener("click", (event) => {
  event.preventDefault();
  showScreen(homeScreen, playScreen);
});

formationButton?.addEventListener("click", (event) => {
  event.preventDefault();
  showScreen(formationScreen, homeScreen);
});

formationBackButton?.addEventListener("click", (event) => {
  event.preventDefault();
  showScreen(homeScreen, formationScreen);
});

clubButton?.addEventListener("click", (event) => {
  event.preventDefault();
  showScreen(clubScreen, homeScreen);
});

clubBackButton?.addEventListener("click", (event) => {
  event.preventDefault();
  showScreen(homeScreen, clubScreen);
});

marketButton?.addEventListener("click", (event) => {
  event.preventDefault();
  showScreen(marketScreen, homeScreen);
});

marketBackButton?.addEventListener("click", (event) => {
  event.preventDefault();
  showScreen(homeScreen, marketScreen);
});

document.addEventListener("click", (event) => {
  const playTarget = event.target.closest("#play-btn");
  const backTarget = event.target.closest("#back-btn");
  const formationTarget = event.target.closest("#formation-btn");
  const formationBackTarget = event.target.closest("#formation-back");
  const clubTarget = event.target.closest("#club-btn");
  const clubBackTarget = event.target.closest("#club-back");
  const marketTarget = event.target.closest("#market-btn");
  const marketBackTarget = event.target.closest("#market-back");
  const rivalTarget = event.target.closest(".rival-card");
  const formationPick = event.target.closest(".formation-btn");
  const marketSort = event.target.closest(".market-sort");
  if (!playTarget && !backTarget && !formationTarget && !formationBackTarget && !clubTarget && !clubBackTarget && !marketTarget && !marketBackTarget && !rivalTarget && !formationPick && !marketSort) return;
  const home = document.querySelector("#home-screen");
  const play = document.querySelector("#play-screen");
  const formation = document.querySelector("#formation-screen");
  const club = document.querySelector("#club-screen");
  const market = document.querySelector("#market-screen");
  if (!home || !play || !formation || !club || !market) return;
  if (playTarget) showScreen(play, home);
  if (backTarget) showScreen(home, play);
  if (formationTarget) showScreen(formation, home);
  if (formationBackTarget) showScreen(home, formation);
  if (clubTarget) showScreen(club, home);
  if (clubBackTarget) showScreen(home, club);
  if (marketTarget) showScreen(market, home);
  if (marketBackTarget) showScreen(home, market);
  if (rivalTarget) {
    const rivalName = rivalTarget.getAttribute("data-name") || "Rival";
    const difficulty = rivalTarget.getAttribute("data-difficulty") || "medium";
    const rivalRating = rivalTarget.getAttribute("data-rating");
    const winCoins = Number(rivalTarget.getAttribute("data-coins") || "0");
    openResult(rivalName, difficulty, rivalRating, winCoins);
  }
  if (formationPick) {
    const formationKey = formationPick.getAttribute("data-formation");
    applyFormation(formationKey);
  }
  if (marketSort) {
    const key = marketSort.getAttribute("data-sort");
    showMarketInput(key);
  }
});

const TEAM_RATING = 30;

const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

const getChances = (difficulty, rivalRating) => {
  let baseWin = 0.55;
  if (difficulty === "easy") baseWin = 0.8;
  if (difficulty === "hard") baseWin = 0.3;

  const ratingDiff = TEAM_RATING - (Number(rivalRating) || 80);
  const adjustedWin = clamp(baseWin + ratingDiff * 0.01, 0.05, 0.9);
  const draw = 0.1;
  const win = Math.min(adjustedWin, 0.9 - draw);

  return { win, draw };
};

const addCoins = (amount) => {
  const current = Number(coinAmount?.textContent || "0");
  const total = current + amount;
  if (coinAmount) coinAmount.textContent = String(total);
  if (coinDelta) coinDelta.textContent = `+${amount}`;
};

const hidePanels = () => {
  winPanel?.classList.add("screen-hidden");
  drawPanel?.classList.add("screen-hidden");
  losePanel?.classList.add("screen-hidden");
};

const setPanel = (panel, suffix, rivalName, left, right, reward) => {
  if (!panel) return;
  const rivalEl = panel.querySelector(`#${suffix}-rival`);
  const leftEl = panel.querySelector(`#${suffix}-left`);
  const rightEl = panel.querySelector(`#${suffix}-right`);
  const rewardEl = panel.querySelector(`#${suffix}-reward`);
  if (!rivalEl || !leftEl || !rightEl || !rewardEl) return;
  rivalEl.textContent = rivalName;
  leftEl.textContent = `${left}%`;
  rightEl.textContent = `${right}%`;
  rewardEl.textContent = `Premio: ${reward} monedas`;
  panel.classList.remove("screen-hidden");
};

const openResult = (rivalName, difficulty, rivalRating, winCoins) => {
  const { win, draw } = getChances(difficulty, rivalRating);
  const lose = 1 - win - draw;
  const roll = Math.random();
  let left = 50;
  let right = 50;
  let reward = 0;

  hidePanels();

  if (roll < win) {
    left = Math.floor(51 + Math.random() * 30);
    right = 100 - left;
    reward = winCoins;
    setPanel(winPanel, "win", rivalName, left, right, reward);
  } else if (roll < win + draw) {
    left = 50;
    right = 50;
    reward = 500;
    setPanel(drawPanel, "draw", rivalName, left, right, reward);
  } else if (roll < win + draw + lose) {
    right = Math.floor(51 + Math.random() * 30);
    left = 100 - right;
    reward = 200;
    setPanel(losePanel, "lose", rivalName, left, right, reward);
  }
  addCoins(reward);
};

rivalCards.forEach((card) => {
  card.addEventListener("click", () => {
    const rivalName = card.getAttribute("data-name") || "Rival";
    const difficulty = card.getAttribute("data-difficulty") || "medium";
    const rivalRating = card.getAttribute("data-rating");
    const winCoins = Number(card.getAttribute("data-coins") || "0");
    openResult(rivalName, difficulty, rivalRating, winCoins);
  });
});

resultCloseButtons.forEach((button) => {
  button.addEventListener("click", hidePanels);
});

const formations = {
  "433": {
    p1: { left: 50, top: 82 },
    p2: { left: 18, top: 68 },
    p3: { left: 38, top: 66 },
    p4: { left: 62, top: 66 },
    p5: { left: 82, top: 68 },
    p6: { left: 50, top: 53 },
    p7: { left: 30, top: 45 },
    p8: { left: 70, top: 45 },
    p9: { left: 20, top: 28 },
    p10: { left: 50, top: 22 },
    p11: { left: 80, top: 28 },
  },
  "442": {
    p1: { left: 50, top: 82 },
    p2: { left: 18, top: 68 },
    p3: { left: 38, top: 66 },
    p4: { left: 62, top: 66 },
    p5: { left: 82, top: 68 },
    p6: { left: 22, top: 50 },
    p7: { left: 45, top: 50 },
    p8: { left: 68, top: 50 },
    p9: { left: 20, top: 28 },
    p10: { left: 55, top: 28 },
    p11: { left: 80, top: 50 },
  },
  "352": {
    p1: { left: 50, top: 82 },
    p2: { left: 28, top: 66 },
    p3: { left: 50, top: 66 },
    p4: { left: 72, top: 66 },
    p5: { left: 10, top: 46 },
    p6: { left: 30, top: 50 },
    p7: { left: 50, top: 52 },
    p8: { left: 70, top: 50 },
    p9: { left: 90, top: 46 },
    p10: { left: 40, top: 26 },
    p11: { left: 60, top: 26 },
  },
};

const applyFormation = (key) => {
  const formation = formations[key];
  if (!formation) return;
  Object.entries(formation).forEach(([id, pos]) => {
    const players = document.querySelectorAll(`[data-player="${id}"]`);
    if (!players.length) return;
    players.forEach((player) => {
      player.style.left = `${pos.left}%`;
      player.style.top = `${pos.top}%`;
      player.style.transform = "translate(-50%, -50%)";
    });
  });
  if (formationNote) formationNote.textContent = `Formacion ${key} aplicada.`;
};

formationButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const key = button.getAttribute("data-formation");
    applyFormation(key);
  });
});

const players = [
  { id: "p1", name: "Portero Max", pos: "POR", rating: 83, inLineup: true },
  { id: "p2", name: "Lateral Leo", pos: "LI", rating: 81, inLineup: true },
  { id: "p3", name: "Muro Nico", pos: "DFC", rating: 84, inLineup: true },
  { id: "p4", name: "Roca Dani", pos: "DFC", rating: 82, inLineup: true },
  { id: "p5", name: "Rayo Alex", pos: "LD", rating: 80, inLineup: true },
  { id: "p6", name: "Cerebro Emi", pos: "MCD", rating: 85, inLineup: true },
  { id: "p7", name: "Pase Lucho", pos: "MC", rating: 86, inLineup: true },
  { id: "p8", name: "Mago Rui", pos: "MCO", rating: 87, inLineup: true },
  { id: "p9", name: "Turbo Sol", pos: "EI", rating: 88, inLineup: true },
  { id: "p10", name: "Gol Nico", pos: "DC", rating: 90, inLineup: true },
  { id: "p11", name: "Finta Max", pos: "ED", rating: 88, inLineup: true },
  { id: "c1", name: "Sombra Paz", pos: "DFC", rating: 78, inLineup: false },
  { id: "c2", name: "Veloz Tomi", pos: "EI", rating: 79, inLineup: false },
  { id: "c3", name: "Zurda Teo", pos: "MC", rating: 77, inLineup: false },
  { id: "c4", name: "Gigante Axel", pos: "POR", rating: 75, inLineup: false },
  { id: "c5", name: "Puntero Zoe", pos: "ED", rating: 80, inLineup: false },
];

const renderClub = () => {
  if (!clubList) return;
  const clubPlayers = players.filter((player) => !player.inLineup);
  clubList.innerHTML = clubPlayers
    .map(
      (player) => `
        <div class="club-card">
          <div class="player-tag">${player.pos}</div>
          <div class="player-info">
            <div class="player-name">${player.name}</div>
            <div class="player-pos">${player.pos}</div>
          </div>
          <div class="player-rating">${player.rating}</div>
        </div>
      `
    )
    .join("");
};

renderClub();

let marketPlayers = [
  { id: "m7", name: "Erling Haaland", club: "Manchester City", pos: "DC", rating: 100 },
  { id: "m1", name: "Brillo Sami", club: "Solar FC", pos: "DC", rating: 95 },
  { id: "m2", name: "Muro Axel", club: "Titanes", pos: "DFC", rating: 88 },
  { id: "m3", name: "Turbo Luna", club: "Cometas", pos: "ED", rating: 92 },
  { id: "m4", name: "Lince Hugo", club: "Bosque", pos: "MC", rating: 80 },
  { id: "m5", name: "Rayo Nia", club: "Tormenta", pos: "EI", rating: 99 },
  { id: "m6", name: "Cerro Pablo", club: "Montanas", pos: "POR", rating: 76 },
];

const getCoins = () => Number(coinAmount?.textContent || "0");

const setCoins = (value, delta = 0) => {
  if (coinAmount) coinAmount.textContent = String(value);
  if (coinDelta) coinDelta.textContent = delta ? `${delta > 0 ? "+" : ""}${delta}` : "";
};

const clampValue = (value, min, max) => Math.max(min, Math.min(max, value));

const calcPrice = (rating) => {
  const minRating = 55;
  const maxRating = 115;
  const minPrice = 1000;
  const maxPrice = 1000000000;
  const clamped = clampValue(rating, minRating, maxRating);
  const ratio = (clamped - minRating) / (maxRating - minRating);
  return Math.round(minPrice + ratio * (maxPrice - minPrice));
};

const renderMarket = (list = marketPlayers) => {
  if (!marketList) return;
  marketList.innerHTML = list
    .map((player) => {
      const price = calcPrice(player.rating);
      return `
        <div class="market-card">
          <div class="market-info">
            <div class="market-name">${player.name}</div>
            <div class="market-meta">${player.club} | ${player.pos} | ${player.rating}</div>
            <div class="market-price">Precio: ${price}</div>
          </div>
          <div class="market-action">
            <button class="menu-btn small buy-btn" data-id="${player.id}">Comprar</button>
          </div>
        </div>
      `;
    })
    .join("");
  if (marketNote) marketNote.textContent = "Toca Comprar para enviar al club.";
};

const buyPlayer = (playerId) => {
  const playerIndex = marketPlayers.findIndex((player) => player.id === playerId);
  if (playerIndex === -1) return;
  const player = marketPlayers[playerIndex];
  const price = calcPrice(player.rating);
  const coins = getCoins();
  if (coins < price) {
    if (marketNote) marketNote.textContent = "No tienes suficientes monedas.";
    return;
  }
  const newCoins = coins - price;
  setCoins(newCoins, -price);
  players.push({
    id: player.id,
    name: player.name,
    pos: player.pos,
    rating: player.rating,
    inLineup: false,
  });
  marketPlayers = marketPlayers.filter((item) => item.id !== player.id);
  renderMarket();
  renderClub();
  if (marketNote) marketNote.textContent = `Compraste a ${player.name}.`;
};

const showMarketInput = (key) => {
  const inputs = [
    { key: "name", el: marketInputName },
    { key: "club", el: marketInputClub },
    { key: "pos", el: marketInputPos },
  ];
  inputs.forEach(({ key: inputKey, el }) => {
    if (!el) return;
    el.classList.toggle("screen-hidden", inputKey !== key);
    if (inputKey === key) {
      el.value = "";
      el.focus();
    }
  });
  renderMarket();
};

const filterMarket = (key, value) => {
  const query = value.trim().toLowerCase();
  if (!query) {
    renderMarket();
    return;
  }
  const filtered = marketPlayers.filter((player) => {
    if (key === "name") return player.name.toLowerCase().includes(query);
    if (key === "club") return player.club.toLowerCase().includes(query);
    if (key === "pos") return player.pos.toLowerCase().includes(query);
    return false;
  });
  renderMarket(filtered);
};

document.addEventListener("click", (event) => {
  const buyTarget = event.target.closest(".buy-btn");
  if (!buyTarget) return;
  const playerId = buyTarget.getAttribute("data-id");
  buyPlayer(playerId);
});

marketInputName?.addEventListener("input", (event) => {
  filterMarket("name", event.target.value);
});

marketInputClub?.addEventListener("input", (event) => {
  filterMarket("club", event.target.value);
});

marketInputPos?.addEventListener("input", (event) => {
  filterMarket("pos", event.target.value);
});

renderMarket();

let activeDrag = null;

const updatePlayerPosition = (playerId, pitchRect, cardRect, clientX, clientY) => {
  const minX = pitchRect.left + cardRect.width / 2;
  const maxX = pitchRect.right - cardRect.width / 2;
  const minY = pitchRect.top + cardRect.height / 2;
  const maxY = pitchRect.bottom - cardRect.height / 2;
  const clampedX = clampValue(clientX, minX, maxX);
  const clampedY = clampValue(clientY, minY, maxY);
  const leftPercent = ((clampedX - pitchRect.left) / pitchRect.width) * 100;
  const topPercent = ((clampedY - pitchRect.top) / pitchRect.height) * 100;
  document.querySelectorAll(`[data-player="${playerId}"]`).forEach((player) => {
    player.style.left = `${leftPercent}%`;
    player.style.top = `${topPercent}%`;
    player.style.transform = "translate(-50%, -50%)";
  });
  return topPercent;
};

const getRoleForPosition = (leftPercent, topPercent) => {
  if (topPercent < 25) {
    if (leftPercent < 35) return "EI";
    if (leftPercent > 65) return "ED";
    return "DC";
  }
  if (topPercent < 55) {
    if (leftPercent < 35) return "MI";
    if (leftPercent > 65) return "MD";
    return "MC";
  }
  if (topPercent < 80) {
    if (leftPercent < 35) return "LI";
    if (leftPercent > 65) return "LD";
    return "DFC";
  }
  return "POR";
};

const updatePlayerRole = (playerId, leftPercent, topPercent) => {
  const role = getRoleForPosition(leftPercent, topPercent);
  document.querySelectorAll(`[data-player="${playerId}"]`).forEach((player) => {
    const roleEl = player.querySelector(".pos-text");
    if (roleEl) roleEl.textContent = role;
  });
};

const setDragging = (state) => {
  document.body.classList.toggle("dragging", state);
};

const startDrag = (event, target) => {
  if (!formationScreen || formationScreen.classList.contains("screen-hidden")) return;
  if (!target) return;
  const pitch = target.closest(".pitch");
  if (!pitch) return;
  activeDrag = {
    playerId: target.getAttribute("data-player"),
    pitch,
    card: target,
  };
  setDragging(true);
};

const moveDrag = (clientX, clientY) => {
  if (!activeDrag) return;
  const { playerId, pitch, card } = activeDrag;
  const pitchRect = pitch.getBoundingClientRect();
  if (!card) return;
  const cardRect = card.getBoundingClientRect();
  const topPercent = updatePlayerPosition(playerId, pitchRect, cardRect, clientX, clientY);
  const leftPercent = parseFloat(card.style.left) || 50;
  activeDrag.lastTopPercent = topPercent;
  activeDrag.lastLeftPercent = leftPercent;
};

const endDrag = () => {
  if (activeDrag?.lastTopPercent !== undefined && activeDrag?.lastLeftPercent !== undefined) {
    updatePlayerRole(activeDrag.playerId, activeDrag.lastLeftPercent, activeDrag.lastTopPercent);
  }
  activeDrag = null;
  setDragging(false);
};

document.addEventListener("pointerdown", (event) => {
  const target = event.target.closest(".player");
  if (!target) return;
  event.preventDefault();
  startDrag(event, target);
});

document.addEventListener("pointermove", (event) => {
  if (!activeDrag) return;
  event.preventDefault();
  moveDrag(event.clientX, event.clientY);
});

document.addEventListener("pointerup", endDrag);
document.addEventListener("pointercancel", endDrag);

document.addEventListener("mousedown", (event) => {
  const target = event.target.closest(".player");
  if (!target) return;
  event.preventDefault();
  startDrag(event, target);
});

document.addEventListener("dragstart", (event) => {
  if (event.target.closest(".player")) event.preventDefault();
});

document.addEventListener("mousemove", (event) => {
  if (!activeDrag) return;
  event.preventDefault();
  moveDrag(event.clientX, event.clientY);
});

document.addEventListener("mouseup", endDrag);

window.addEventListener("mousemove", (event) => {
  if (!activeDrag) return;
  moveDrag(event.clientX, event.clientY);
});

window.addEventListener("mouseup", endDrag);

document.addEventListener("touchstart", (event) => {
  const target = event.target.closest(".player");
  if (!target) return;
  event.preventDefault();
  const touch = event.touches[0];
  startDrag(event, target);
  moveDrag(touch.clientX, touch.clientY);
}, { passive: false });

document.addEventListener("touchmove", (event) => {
  if (!activeDrag) return;
  event.preventDefault();
  const touch = event.touches[0];
  moveDrag(touch.clientX, touch.clientY);
}, { passive: false });

document.addEventListener("touchend", endDrag);
