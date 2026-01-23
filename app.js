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
const teamRating = document.querySelector("#team-rating");
const formationButtons = document.querySelectorAll(".formation-btn");
const formationNote = document.querySelector("#formation-note");
const clubButton = document.querySelector("#club-btn");
const clubBackButton = document.querySelector("#club-back");
const clubScreen = document.querySelector("#club-screen");
const clubList = document.querySelector("#club-list");
const clubPlantillaButton = document.querySelector("#club-plantilla");
const clubNote = document.querySelector("#club-note");
const storeButton = document.querySelector("#store-btn");
const storeBackButton = document.querySelector("#store-back");
const storeScreen = document.querySelector("#store-screen");
const storeList = document.querySelector("#store-list");
const storeNote = document.querySelector("#store-note");
const storeResultCard = document.querySelector("#store-result-card");
const storeResultName = document.querySelector("#store-result-name");
const storeResultMeta = document.querySelector("#store-result-meta");
const storeResultRating = document.querySelector("#store-result-rating");
const dorsalButton = document.querySelector("#dorsal-btn");
const dorsalBackButton = document.querySelector("#dorsal-back");
const dorsalScreen = document.querySelector("#dorsal-screen");
const dorsalList = document.querySelector("#dorsal-list");
const dorsalNote = document.querySelector("#dorsal-note");
const plantillaButton = document.querySelector("#plantilla-btn");
const plantillaBackButton = document.querySelector("#plantilla-back");
const plantillaScreen = document.querySelector("#plantilla-screen");
const plantillaHomeButton = document.querySelector("#plantilla-home");
const plantillaClubButton = document.querySelector("#plantilla-club");
const plantillaMarketButton = document.querySelector("#plantilla-market");
const plantillaBench = document.querySelector("#plantilla-bench");
const plantillaNote = document.querySelector("#plantilla-note");
const plantillaSearchInput = document.querySelector("#plantilla-search");
const plantillaPosButton = document.querySelector("#plantilla-pos-btn");
const plantillaPosInput = document.querySelector("#plantilla-pos-input");
const marketButton = document.querySelector("#market-btn");
const marketBackButton = document.querySelector("#market-back");
const marketScreen = document.querySelector("#market-screen");
const marketList = document.querySelector("#market-list");
const marketNote = document.querySelector("#market-note");
const marketSortButtons = document.querySelectorAll(".market-sort");
const marketInputName = document.querySelector("#market-input-name");
const marketInputClub = document.querySelector("#market-input-club");
const marketInputPos = document.querySelector("#market-input-pos");

const ratingMismatchPenalty = 5;

const initSlotPositions = () => {
  document.querySelectorAll(".player[data-player]").forEach((card) => {
    if (!card.dataset.slotPos) {
      const posEl = card.querySelector(".pos-text");
      if (posEl) card.dataset.slotPos = posEl.textContent.trim();
    }
    if (!card.querySelector(".pos-warning")) {
      const warning = document.createElement("span");
      warning.className = "pos-warning";
      warning.textContent = "!";
      warning.setAttribute("aria-hidden", "true");
      card.appendChild(warning);
    }
  });
};

const isPositionMismatch = (player, slotPos) => {
  if (!player?.pos || !slotPos) return false;
  return player.pos !== slotPos;
};

const getAdjustedRating = (player, slotPos) => {
  const base = Number(player?.rating) || 0;
  if (!isPositionMismatch(player, slotPos)) return base;
  return Math.max(0, base - ratingMismatchPenalty);
};

const getSlotPosForPlayer = (playerId) => {
  const card = document.querySelector(`[data-player="${playerId}"]`);
  return card?.dataset.slotPos?.trim() || "";
};

const clearSwapSelection = () => {
  selectedSwap = null;
  updateSelectedSlotUI();
};

const setSwapSelection = (selection) => {
  selectedSwap = selection;
  updateSelectedSlotUI();
};

const togglePlantillaPosInput = () => {
  if (!plantillaPosInput) return;
  const isHidden = plantillaPosInput.classList.contains("screen-hidden");
  plantillaPosInput.classList.toggle("screen-hidden", !isHidden);
  if (isHidden) {
    plantillaPosInput.value = "";
    plantillaPosInput.focus();
    plantillaPosQuery = "";
    renderPlantillaBench();
  } else {
    plantillaPosInput.value = "";
    plantillaPosQuery = "";
    renderPlantillaBench();
  }
};

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

clubPlantillaButton?.addEventListener("click", (event) => {
  event.preventDefault();
  showScreen(plantillaScreen, clubScreen);
});

storeButton?.addEventListener("click", (event) => {
  event.preventDefault();
  showScreen(storeScreen, homeScreen);
});

storeBackButton?.addEventListener("click", (event) => {
  event.preventDefault();
  showScreen(homeScreen, storeScreen);
});

dorsalButton?.addEventListener("click", (event) => {
  event.preventDefault();
  showScreen(dorsalScreen, homeScreen);
});

dorsalBackButton?.addEventListener("click", (event) => {
  event.preventDefault();
  showScreen(homeScreen, dorsalScreen);
});

plantillaButton?.addEventListener("click", (event) => {
  event.preventDefault();
  showScreen(plantillaScreen, homeScreen);
});

plantillaBackButton?.addEventListener("click", (event) => {
  event.preventDefault();
  showScreen(homeScreen, plantillaScreen);
});

plantillaHomeButton?.addEventListener("click", (event) => {
  event.preventDefault();
  showScreen(plantillaScreen, plantillaScreen);
});

plantillaClubButton?.addEventListener("click", (event) => {
  event.preventDefault();
  showScreen(clubScreen, plantillaScreen);
});

plantillaMarketButton?.addEventListener("click", (event) => {
  event.preventDefault();
  showScreen(marketScreen, plantillaScreen);
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
  const clubPlantillaTarget = event.target.closest("#club-plantilla");
  const storeTarget = event.target.closest("#store-btn");
  const storeBackTarget = event.target.closest("#store-back");
  const dorsalTarget = event.target.closest("#dorsal-btn");
  const dorsalBackTarget = event.target.closest("#dorsal-back");
  const plantillaTarget = event.target.closest("#plantilla-btn");
  const plantillaBackTarget = event.target.closest("#plantilla-back");
  const plantillaHomeTarget = event.target.closest("#plantilla-home");
  const plantillaClubTarget = event.target.closest("#plantilla-club");
  const plantillaMarketTarget = event.target.closest("#plantilla-market");
  const marketTarget = event.target.closest("#market-btn");
  const marketBackTarget = event.target.closest("#market-back");
  const rivalTarget = event.target.closest(".rival-card");
  const formationPick = event.target.closest(".formation-btn");
  const marketSort = event.target.closest(".market-sort");
  if (!playTarget && !backTarget && !formationTarget && !formationBackTarget && !clubTarget && !clubBackTarget && !clubPlantillaTarget && !storeTarget && !storeBackTarget && !dorsalTarget && !dorsalBackTarget && !plantillaTarget && !plantillaBackTarget && !plantillaHomeTarget && !plantillaClubTarget && !plantillaMarketTarget && !marketTarget && !marketBackTarget && !rivalTarget && !formationPick && !marketSort) return;
  const home = document.querySelector("#home-screen");
  const play = document.querySelector("#play-screen");
  const formation = document.querySelector("#formation-screen");
  const club = document.querySelector("#club-screen");
  const store = document.querySelector("#store-screen");
  const dorsal = document.querySelector("#dorsal-screen");
  const plantilla = document.querySelector("#plantilla-screen");
  const market = document.querySelector("#market-screen");
  if (!home || !play || !formation || !club || !store || !dorsal || !plantilla || !market) return;
  if (playTarget) showScreen(play, home);
  if (backTarget) showScreen(home, play);
  if (formationTarget) showScreen(formation, home);
  if (formationBackTarget) showScreen(home, formation);
  if (clubTarget) showScreen(club, home);
  if (clubBackTarget) showScreen(home, club);
  if (clubPlantillaTarget) showScreen(plantilla, club);
  if (storeTarget) showScreen(store, home);
  if (storeBackTarget) showScreen(home, store);
  if (dorsalTarget) showScreen(dorsal, home);
  if (dorsalBackTarget) showScreen(home, dorsal);
  if (plantillaTarget) showScreen(plantilla, home);
  if (plantillaBackTarget) showScreen(home, plantilla);
  if (plantillaHomeTarget) showScreen(plantilla, plantilla);
  if (plantillaClubTarget) showScreen(club, plantilla);
  if (plantillaMarketTarget) showScreen(market, plantilla);
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

document.addEventListener("dragstart", (event) => {
  const benchTarget = event.target.closest(".plantilla-bench-card");
  const clubTarget = event.target.closest(".club-card");
  const target = benchTarget || clubTarget;
  if (!target) return;
  const playerId = target.getAttribute("data-id");
  if (!playerId) return;
  draggedBenchId = playerId;
  event.dataTransfer?.setData("text/plain", playerId);
});

document.addEventListener("dragend", () => {
  draggedBenchId = null;
});

document.addEventListener("dragover", (event) => {
  const pitchTarget = event.target.closest("#plantilla-screen .player");
  if (!pitchTarget || !draggedBenchId) return;
  event.preventDefault();
});

document.addEventListener("drop", (event) => {
  const pitchTarget = event.target.closest("#plantilla-screen .player");
  if (!pitchTarget || !draggedBenchId) return;
  event.preventDefault();
  const slotId = pitchTarget.getAttribute("data-player");
  if (!slotId) return;
  const swapped = swapIntoLineup(draggedBenchId, slotId);
  if (!swapped && plantillaNote) {
    plantillaNote.textContent = "No se pudo cambiar el jugador.";
  }
  draggedBenchId = null;
});

document.addEventListener("input", (event) => {
  const input = event.target.closest(".dorsal-input");
  if (!input) return;
  const playerId = input.getAttribute("data-id");
  if (!playerId) return;
  const player = players.find((item) => item.id === playerId);
  if (!player) return;
  if (!input.value.trim()) {
    player.number = null;
    updateDorsalDisplay(player.id, "");
    persistState();
    return;
  }
  const raw = Number(input.value);
  if (!Number.isFinite(raw)) return;
  const normalized = Math.max(1, Math.min(99, Math.round(raw)));
  player.number = normalized;
  input.value = String(normalized);
  updateDorsalDisplay(player.id, normalized);
  persistState();
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

let databasePlayers = [];
let players = [];
let marketPlayers = [];
let selectedSwap = null;
let draggedBenchId = null;
let plantillaSearchQuery = "";
let plantillaPosQuery = "";

const defaultNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
const storageKey = "fc-players-state";
const clubSize = Number.MAX_SAFE_INTEGER;

const positionMap = {
  portero: "POR",
  "defensa central": "DFC",
  "lateral izquierdo": "LI",
  "lateral derecho": "LD",
  "centrocampista": "MC",
  "centrocampista defensivo": "MCD",
  "mediocampista ofensivo": "MCO",
  "delantero": "DC",
  "extremo izquierdo": "EI",
  "extremo derecho": "ED",
  "extremo": "ED",
};

const mapPosition = (raw) => {
  if (!raw) return "MC";
  const key = raw.trim().toLowerCase();
  return positionMap[key] || "MC";
};

const getSurname = (name) => {
  if (!name) return "";
  const parts = name.trim().split(/\s+/);
  return parts[parts.length - 1] || name;
};

const getClubAbbr = (club) => {
  if (!club) return "";
  const skip = new Set(["de", "del", "la", "el", "los", "las", "cf", "fc"]);
  const words = club
    .trim()
    .split(/\s+/)
    .filter((word) => word && !skip.has(word.toLowerCase()));
  if (!words.length) return club.slice(0, 2).toUpperCase();
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return `${words[0][0]}${words[1][0]}`.toUpperCase();
};

const toPlayerRecord = (raw, index) => ({
  id: `db${index + 1}`,
  dbId: `db${index + 1}`,
  name: raw.nombre,
  pos: mapPosition(raw.posicion),
  posFull: raw.posicion,
  rating: raw.valoracion,
  club: raw.equipo,
  inLineup: false,
  number: null,
});

const persistState = () => {
  try {
    const payload = {
      players: players.map(({ dbId, id, inLineup, number }) => ({
        dbId,
        inLineup,
        number,
        slot: inLineup && id.startsWith("p") ? Number(id.slice(1)) : null,
      })),
    };
    localStorage.setItem(storageKey, JSON.stringify(payload));
  } catch (error) {
    console.error(error);
  }
};

const restoreState = (records) => {
  try {
    const raw = localStorage.getItem(storageKey);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || !Array.isArray(parsed.players)) return null;
    const byId = new Map(records.map((player) => [player.dbId, player]));
    const restored = parsed.players
      .map((item) => {
        const base = byId.get(item.dbId);
        if (!base) return null;
        return {
          ...base,
          inLineup: Boolean(item.inLineup),
          number: Number.isFinite(Number(item.number)) ? Number(item.number) : null,
          slot: Number.isFinite(Number(item.slot)) ? Number(item.slot) : null,
        };
      })
      .filter(Boolean);
    return restored.length ? restored : null;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const syncLineupCards = () => {
  players
    .filter((player) => player.inLineup)
    .forEach((player) => {
      const cards = document.querySelectorAll(`[data-player="${player.id}"]`);
      if (!cards.length) return;
      cards.forEach((card) => {
        card.classList.remove("tier-collision", "tier-mystic", "tier-future");
        const posEl = card.querySelector(".pos-text");
        const nameEl = card.querySelector(".player-name");
        const ratingEl = card.querySelector("small");
        const isHome = Boolean(card.closest("#home-screen"));
        const slotPos = card.dataset.slotPos?.trim() || "";
        const mismatch = isPositionMismatch(player, slotPos);
        const adjustedRating = getAdjustedRating(player, slotPos);
        if (posEl) posEl.textContent = player.pos;
        if (nameEl) nameEl.textContent = isHome ? getSurname(player.name) : player.name;
        if (ratingEl) ratingEl.textContent = String(adjustedRating);
        card.setAttribute("data-rating", String(adjustedRating));
        card.classList.toggle("pos-mismatch", mismatch);
        const tier = getTierByRating(adjustedRating);
        if (tier) card.classList.add(tier);
      });
    });
};

const updateTeamRating = () => {
  if (!teamRating) return;
  const lineupPlayers = players.filter((player) => player.inLineup);
  if (!lineupPlayers.length) {
    teamRating.textContent = "0";
    return;
  }
  const total = lineupPlayers.reduce((sum, player) => {
    const slotPos = getSlotPosForPlayer(player.id);
    return sum + getAdjustedRating(player, slotPos);
  }, 0);
  teamRating.textContent = String(Math.round(total / lineupPlayers.length));
};

const updateSelectedSlotUI = () => {
  document
    .querySelectorAll("#plantilla-screen .player, #plantilla-screen .plantilla-bench-card, #club-screen .club-card")
    .forEach((card) => {
      card.classList.remove("selected");
    });
  if (!selectedSwap) return;
  if (selectedSwap.scope === "plantilla") {
    if (selectedSwap.type === "lineup") {
      const card = document.querySelector(`#plantilla-screen .player[data-player="${selectedSwap.id}"]`);
      if (card) card.classList.add("selected");
    } else {
      const card = document.querySelector(`#plantilla-screen .plantilla-bench-card[data-id="${selectedSwap.id}"]`);
      if (card) card.classList.add("selected");
    }
  }
  if (selectedSwap.scope === "club") {
    const card = document.querySelector(`#club-screen .club-card[data-id="${selectedSwap.id}"]`);
    if (card) card.classList.add("selected");
  }
};

const shuffle = (list) => {
  const array = [...list];
  for (let i = array.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const getTierByRating = (rating) => {
  const value = Number(rating) || 0;
  if (value >= 95) return "tier-future";
  if (value >= 90) return "tier-mystic";
  if (value >= 85) return "tier-collision";
  return null;
};

const initPlayersFromDatabase = (data) => {
  databasePlayers = data.map(toPlayerRecord);
  let restored = restoreState(databasePlayers);
  if (restored) {
    const requiredClub = Math.min(clubSize, databasePlayers.length);
    const requiredLineup = Math.min(11, requiredClub);
    const lineup = restored
      .filter((player) => player.inLineup && player.slot)
      .sort((a, b) => a.slot - b.slot);
    if (lineup.length < requiredLineup || restored.length < requiredClub) restored = null;
  }
  if (restored) {
    const totalClub = Math.min(clubSize, databasePlayers.length);
    const lineupLimit = Math.min(11, totalClub);
    const club = [];
    const used = new Set();
    const addPlayer = (player, inLineup = false, slot = null) => {
      if (!player || club.length >= totalClub || used.has(player.dbId)) return;
      club.push({
        ...player,
        inLineup,
        slot: inLineup ? slot : null,
        number: inLineup ? player.number ?? defaultNumbers[(slot ?? 1) - 1] ?? null : player.number ?? null,
      });
      used.add(player.dbId);
    };
    const lineup = restored
      .filter((player) => player.inLineup && player.slot)
      .sort((a, b) => a.slot - b.slot);
    lineup.forEach((player) => addPlayer(player, true, player.slot));
    restored.forEach((player) => addPlayer(player, false, null));
    if (club.length < totalClub) {
      shuffle(databasePlayers).forEach((player) => addPlayer(player, false, null));
    }
    let currentLineup = club.filter((player) => player.inLineup).length;
    if (currentLineup < lineupLimit) {
      club
        .filter((player) => !player.inLineup)
        .slice(0, lineupLimit - currentLineup)
        .forEach((player, index) => {
          const slot = currentLineup + index + 1;
          player.inLineup = true;
          player.slot = slot;
          if (!player.number) player.number = defaultNumbers[slot - 1] ?? null;
        });
    }
    club
      .filter((player) => player.inLineup)
      .sort((a, b) => (a.slot ?? 0) - (b.slot ?? 0))
      .forEach((player, index) => {
        player.slot = index + 1;
        if (!player.number) player.number = defaultNumbers[index] ?? null;
      });
    players = club.map((player) => ({
      ...player,
      id: player.inLineup ? `p${player.slot}` : player.dbId,
      dbId: player.dbId,
    }));
  } else {
    const totalClub = Math.min(clubSize, databasePlayers.length);
    const lineupCount = Math.min(11, totalClub);
    const shuffled = shuffle(databasePlayers);
    const clubPool = shuffled.slice(0, totalClub);
    const lineupOrder = shuffle(clubPool).slice(0, lineupCount);
    const slotMap = new Map(lineupOrder.map((player, index) => [player.dbId, index + 1]));
    players = clubPool.map((player) => {
      const slot = slotMap.get(player.dbId);
      if (slot) {
        return {
          ...player,
          id: `p${slot}`,
          dbId: player.dbId,
          inLineup: true,
          slot,
          number: defaultNumbers[slot - 1] ?? null,
        };
      }
      return { ...player, id: player.dbId, dbId: player.dbId, inLineup: false };
    });
  }
  marketPlayers = databasePlayers.filter((player) => !players.some((item) => item.dbId === player.dbId));
  syncLineupCards();
  players.filter((player) => player.inLineup).forEach((player) => {
    updateDorsalDisplay(player.id, player.number);
  });
  renderClub();
  renderDorsalList();
  renderPlantillaBench();
  renderMarket();
  updateTeamRating();
  persistState();
};

const renderClub = () => {
  if (!clubList) return;
  const clubPlayers = players;
  clubList.innerHTML = clubPlayers
    .map(
      (player) => `
        <div class="club-card ${player.inLineup ? "lineup" : ""} ${getTierByRating(player.rating) ?? ""}" data-id="${player.dbId}">
          <div class="player-tag">${player.inLineup ? "XI" : player.pos}</div>
          <div class="player-info">
            <div class="player-name">${player.name}</div>
            <div class="player-pos">${player.posFull ?? player.pos}</div>
            <div class="player-rating-small">Media ${player.rating}</div>
          </div>
          <div class="player-rating">${player.rating}</div>
        </div>
      `
    )
    .join("");
  if (clubNote) clubNote.textContent = "Ve a Plantilla para arrastrar jugadores al XI.";
};

const updateDorsalDisplay = (playerId, number) => {
  document.querySelectorAll(`[data-player="${playerId}"]`).forEach((player) => {
    const dorsalEl = player.querySelector(".dorsal-text");
    if (dorsalEl) dorsalEl.textContent = number ? String(number) : "";
  });
};

const renderDorsalList = () => {
  if (!dorsalList) return;
  const lineupPlayers = players.filter((player) => player.inLineup);
  dorsalList.innerHTML = lineupPlayers
    .map(
      (player) => `
        <div class="dorsal-card">
          <div class="dorsal-info">
            <div class="dorsal-name">${player.name}</div>
            <div class="dorsal-meta">${player.pos} | ${player.rating}</div>
          </div>
          <input class="dorsal-input" type="number" min="1" max="99" value="${player.number ?? ""}" data-id="${player.id}" />
        </div>
      `
    )
    .join("");
  if (dorsalNote) dorsalNote.textContent = "Asigna un numero a cada jugador titular.";
};

const getFilteredBenchPlayers = () => {
  const benchPlayers = players.filter((player) => !player.inLineup);
  const query = plantillaSearchQuery.trim().toLowerCase();
  const posQuery = plantillaPosQuery.trim().toLowerCase();
  return benchPlayers.filter((player) => {
    const values = [player.name, player.club, player.pos, player.posFull]
      .filter(Boolean)
      .map((value) => String(value).toLowerCase());
    const matchesText = !query || values.some((value) => value.includes(query));
    const matchesPos =
      !posQuery ||
      [player.pos, player.posFull]
        .filter(Boolean)
        .map((value) => String(value).toLowerCase())
        .some((value) => value.includes(posQuery));
    return matchesText && matchesPos;
  });
};

const renderPlantillaBench = () => {
  if (!plantillaBench) return;
  const benchPlayers = getFilteredBenchPlayers();
  plantillaBench.innerHTML = benchPlayers
    .map(
      (player) => `
        <div class="plantilla-bench-card ${getTierByRating(player.rating) ?? ""}" data-id="${player.dbId}" draggable="true">
          <div class="bench-tag">
            <span class="bench-pos">${player.pos}</span>
            <span class="bench-rating">${player.rating}</span>
          </div>
          <div class="bench-info">
            <div class="bench-name">${player.name}</div>
            <div class="bench-rating-small">Media ${player.rating}</div>
          </div>
        </div>
      `
    )
    .join("");
  if (plantillaNote) {
    if ((plantillaSearchQuery.trim() || plantillaPosQuery.trim()) && !benchPlayers.length) {
      plantillaNote.textContent = "No hay resultados para ese filtro.";
    } else {
      plantillaNote.textContent = "Arrastra un jugador del club hacia una posicion del XI.";
    }
  }
};

const swapIntoLineup = (benchDbId, forcedSlotId = null) => {
  const bench = players.find((player) => player.dbId === benchDbId);
  if (!bench || bench.inLineup) return false;
  const slotSource = forcedSlotId;
  const slot = slotSource ? Number(slotSource.slice(1)) : null;
  const lineupPlayers = players.filter((player) => player.inLineup);
  let lineupTarget = null;
  if (slot) {
    lineupTarget = lineupPlayers.find((player) => player.slot === slot);
  }
  if (!lineupTarget) {
    lineupTarget = lineupPlayers.sort((a, b) => a.rating - b.rating)[0];
  }
  if (!lineupTarget) return false;
  const targetSlot = lineupTarget.slot ?? Number(lineupTarget.id.slice(1));
  lineupTarget.inLineup = false;
  lineupTarget.slot = null;
  lineupTarget.id = lineupTarget.dbId;
  bench.inLineup = true;
  bench.slot = targetSlot;
  bench.id = `p${targetSlot}`;
  if (!bench.number) bench.number = defaultNumbers[targetSlot - 1] ?? null;
  clearSwapSelection();
  syncLineupCards();
  players.filter((player) => player.inLineup).forEach((player) => {
    updateDorsalDisplay(player.id, player.number);
  });
  renderClub();
  renderPlantillaBench();
  updateSelectedSlotUI();
  updateTeamRating();
  persistState();
  return true;
};

const swapLineupSlots = (slotIdA, slotIdB) => {
  if (!slotIdA || !slotIdB || slotIdA === slotIdB) return false;
  const playerA = players.find((player) => player.inLineup && player.id === slotIdA);
  const playerB = players.find((player) => player.inLineup && player.id === slotIdB);
  if (!playerA || !playerB) return false;
  const slotA = playerA.slot ?? Number(slotIdA.slice(1));
  const slotB = playerB.slot ?? Number(slotIdB.slice(1));
  playerA.slot = slotB;
  playerB.slot = slotA;
  playerA.id = `p${slotB}`;
  playerB.id = `p${slotA}`;
  syncLineupCards();
  players.filter((player) => player.inLineup).forEach((player) => {
    updateDorsalDisplay(player.id, player.number);
  });
  renderClub();
  renderDorsalList();
  renderPlantillaBench();
  updateSelectedSlotUI();
  updateTeamRating();
  persistState();
  return true;
};

const swapBenchOrder = (benchIdA, benchIdB) => {
  if (!benchIdA || !benchIdB || benchIdA === benchIdB) return false;
  const indexA = players.findIndex((player) => player.dbId === benchIdA);
  const indexB = players.findIndex((player) => player.dbId === benchIdB);
  if (indexA < 0 || indexB < 0) return false;
  [players[indexA], players[indexB]] = [players[indexB], players[indexA]];
  renderClub();
  renderPlantillaBench();
  persistState();
  return true;
};

const handlePlantillaSwapClick = (event) => {
  if (!plantillaScreen || plantillaScreen.classList.contains("screen-hidden")) return;
  const pitchTarget = event.target.closest("#plantilla-screen .player");
  const benchTarget = event.target.closest("#plantilla-screen .plantilla-bench-card");
  if (!pitchTarget && !benchTarget) return;
  const selection = pitchTarget
    ? { scope: "plantilla", type: "lineup", id: pitchTarget.getAttribute("data-player") }
    : { scope: "plantilla", type: "bench", id: benchTarget.getAttribute("data-id") };
  if (!selection.id) return;
  if (!selectedSwap || selectedSwap.scope !== "plantilla") {
    setSwapSelection(selection);
    return;
  }
  if (selectedSwap.type === selection.type && selectedSwap.id === selection.id) {
    clearSwapSelection();
    return;
  }
  let swapped = false;
  if (selectedSwap.type === "lineup" && selection.type === "lineup") {
    swapped = swapLineupSlots(selectedSwap.id, selection.id);
  } else if (selectedSwap.type === "bench" && selection.type === "bench") {
    swapped = swapBenchOrder(selectedSwap.id, selection.id);
  } else {
    const benchId = selectedSwap.type === "bench" ? selectedSwap.id : selection.id;
    const slotId = selectedSwap.type === "lineup" ? selectedSwap.id : selection.id;
    swapped = swapIntoLineup(benchId, slotId);
  }
  if (!swapped && plantillaNote) {
    plantillaNote.textContent = "No se pudo cambiar el jugador.";
  }
  clearSwapSelection();
};

const handleClubSwapClick = (event) => {
  if (!clubScreen || clubScreen.classList.contains("screen-hidden")) return;
  const clubTarget = event.target.closest("#club-screen .club-card");
  if (!clubTarget) return;
  const playerId = clubTarget.getAttribute("data-id");
  if (!playerId) return;
  const player = players.find((item) => item.dbId === playerId);
  if (!player) return;
  const selection = {
    scope: "club",
    type: player.inLineup ? "lineup" : "bench",
    id: player.dbId,
  };
  if (!selectedSwap || selectedSwap.scope !== "club") {
    setSwapSelection(selection);
    if (clubNote && player?.name) {
      clubNote.textContent = `Seleccionado ${player.name}. Elige otro para cambiar.`;
    }
    return;
  }
  if (selectedSwap.id === selection.id) {
    clearSwapSelection();
    return;
  }
  const first = players.find((item) => item.dbId === selectedSwap.id);
  const second = players.find((item) => item.dbId === selection.id);
  if (!first || !second) {
    clearSwapSelection();
    return;
  }
  let swapped = false;
  if (first.inLineup && second.inLineup) {
    swapped = swapLineupSlots(first.id, second.id);
  } else if (first.inLineup || second.inLineup) {
    const lineupPlayer = first.inLineup ? first : second;
    const benchPlayer = first.inLineup ? second : first;
    swapped = swapIntoLineup(benchPlayer.dbId, lineupPlayer.id);
  } else {
    swapped = swapBenchOrder(first.dbId, second.dbId);
  }
  if (swapped) {
    if (clubNote) clubNote.textContent = "Intercambio realizado.";
    clearSwapSelection();
  } else {
    if (clubNote) clubNote.textContent = "No se pudo cambiar el jugador.";
  }
};

document.addEventListener("click", (event) => {
  handlePlantillaSwapClick(event);
  handleClubSwapClick(event);
});


const storePacks = [
  {
    id: "bronze",
    name: "Sobre Bronce",
    price: 1200,
    tier: "bronze",
    odds: { common: 0.78, rare: 0.18, epic: 0.04 },
  },
  {
    id: "silver",
    name: "Sobre Plata",
    price: 3200,
    tier: "silver",
    odds: { common: 0.58, rare: 0.32, epic: 0.1 },
  },
  {
    id: "gold",
    name: "Sobre Oro",
    price: 6500,
    tier: "gold",
    odds: { common: 0.4, rare: 0.42, epic: 0.18 },
  },
  {
    id: "collision",
    name: "Sobre Colision",
    price: 14000,
    tier: "collision",
    odds: { common: 0.2, rare: 0.45, epic: 0.35 },
  },
  {
    id: "mystic",
    name: "Sobre Mistico",
    price: 17000,
    tier: "mystic",
    odds: { common: 0.15, rare: 0.45, epic: 0.4 },
  },
  {
    id: "future",
    name: "Sobre Futurista",
    price: 20000,
    tier: "future",
    odds: { common: 0.12, rare: 0.44, epic: 0.44 },
  },
  {
    id: "legend",
    name: "Sobre Leyendas",
    price: 30000,
    tier: "legend",
    odds: { legend: 0.25, epic: 0.45, rare: 0.3 },
  },
];

const ratingRanges = {
  common: [70, 84],
  rare: [85, 92],
  epic: [93, 99],
  legend: [95, 99],
};

const rarityLabels = {
  common: "Comun",
  rare: "Raro",
  epic: "Estrella",
  legend: "Leyenda",
};

const rollRarity = (odds) => {
  const roll = Math.random();
  const legend = Number(odds.legend) || 0;
  const epic = Number(odds.epic) || 0;
  const rare = Number(odds.rare) || 0;
  if (roll < legend) return "legend";
  if (roll < legend + epic) return "epic";
  if (roll < legend + epic + rare) return "rare";
  return "common";
};

const pickPackPlayer = (rarity) => {
  const [minRating, maxRating] = ratingRanges[rarity];
  const filtered = marketPlayers.filter((player) => player.rating >= minRating && player.rating <= maxRating);
  const pool = filtered.length ? filtered : marketPlayers;
  if (!pool.length) return null;
  return pool[Math.floor(Math.random() * pool.length)];
};

const formatOdds = (odds) => {
  const legend = Number(odds.legend) || 0;
  const epic = Number(odds.epic) || 0;
  const rare = Number(odds.rare) || 0;
  if (legend > 0) {
    return `Leyenda ${(legend * 100).toFixed(0)}% | Estrella ${(epic * 100).toFixed(0)}% | Raro ${(rare * 100).toFixed(0)}%`;
  }
  return `Estrella ${(epic * 100).toFixed(0)}% | Raro ${(rare * 100).toFixed(0)}%`;
};

const renderStore = () => {
  if (!storeList) return;
  storeList.innerHTML = storePacks
    .map(
      (pack) => `
        <div class="pack-card ${pack.tier}">
          <div class="pack-visual" aria-hidden="true"></div>
          <div class="pack-top">
            <div class="pack-title">${pack.name}</div>
            <div class="pack-price">Precio: ${pack.price}</div>
          </div>
          <div class="pack-odds">${formatOdds(pack.odds)}</div>
          <button class="menu-btn small pack-open" data-pack="${pack.id}">Abrir</button>
        </div>
      `
    )
    .join("");
  if (storeNote) {
    storeNote.textContent = "Bronce, plata, oro o especiales: mientras mas lujoso el sobre, mejor promedio.";
  }
};

const showStoreResult = (player) => {
  if (!storeResultCard || !storeResultName || !storeResultMeta || !storeResultRating) return;
  storeResultName.textContent = player.name;
  storeResultMeta.textContent = `${player.posFull ?? player.pos} | ${rarityLabels[player.rarity]}`;
  storeResultRating.textContent = `Media ${player.rating}`;
  storeResultCard.className = `store-result-card ${player.rarity}`;
  storeResultCard.classList.remove("screen-hidden");
};

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
  if (!list.length) {
    marketList.innerHTML = "";
    if (marketNote) marketNote.textContent = "No hay jugadores disponibles.";
    return;
  }
  marketList.innerHTML = list
    .map((player) => {
      const price = calcPrice(player.rating);
      return `
        <div class="market-card">
          <div class="market-info">
            <div class="market-name">${player.name}</div>
            <div class="market-meta">${player.posFull ?? player.pos} | Media ${player.rating}</div>
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
    dbId: player.dbId ?? player.id,
    name: player.name,
    pos: player.pos,
    posFull: player.posFull,
    rating: player.rating,
    club: player.club,
    inLineup: false,
    number: null,
  });
  marketPlayers = marketPlayers.filter((item) => item.id !== player.id);
  renderMarket();
  renderClub();
  if (marketNote) marketNote.textContent = `Compraste a ${player.name}.`;
  persistState();
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
    if (key === "pos") return player.pos.toLowerCase().includes(query) || player.posFull.toLowerCase().includes(query);
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

document.addEventListener("click", (event) => {
  const packTarget = event.target.closest(".pack-open");
  if (!packTarget) return;
  const packId = packTarget.getAttribute("data-pack");
  const pack = storePacks.find((item) => item.id === packId);
  if (!pack) return;
  const coins = getCoins();
  if (coins < pack.price) {
    if (storeNote) storeNote.textContent = "No tienes suficientes monedas.";
    return;
  }
  setCoins(coins - pack.price, -pack.price);
  const rarity = rollRarity(pack.odds);
  const player = pickPackPlayer(rarity);
  if (!player) {
    if (storeNote) storeNote.textContent = "No quedan jugadores disponibles.";
    return;
  }
  players.push({
    id: player.id,
    dbId: player.dbId ?? player.id,
    name: player.name,
    pos: player.pos,
    posFull: player.posFull,
    rating: player.rating,
    club: player.club,
    inLineup: false,
    number: null,
    rarity,
  });
  marketPlayers = marketPlayers.filter((item) => item.id !== player.id);
  renderClub();
  renderMarket();
  showStoreResult({ ...player, rarity });
  if (storeNote) storeNote.textContent = `Te salio ${player.name}.`;
  persistState();
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

plantillaSearchInput?.addEventListener("input", (event) => {
  plantillaSearchQuery = event.target.value;
  renderPlantillaBench();
});

plantillaPosButton?.addEventListener("click", (event) => {
  event.preventDefault();
  togglePlantillaPosInput();
});

plantillaPosInput?.addEventListener("input", (event) => {
  plantillaPosQuery = event.target.value;
  renderPlantillaBench();
});

const loadDatabase = async () => {
  try {
    const response = await fetch("players.json");
    if (!response.ok) throw new Error("players.json no disponible");
    const data = await response.json();
    if (!Array.isArray(data)) throw new Error("Formato invalido de players.json");
    initPlayersFromDatabase(data);
  } catch (error) {
    console.error(error);
    if (marketNote) marketNote.textContent = "No se pudo cargar players.json.";
    if (clubList) clubList.innerHTML = "";
  }
};

initSlotPositions();
loadDatabase();
renderStore();

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
