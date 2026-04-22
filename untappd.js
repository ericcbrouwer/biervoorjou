const UNTAPPD_CLIENT_ID = 'YOUR_CLIENT_ID';
const UNTAPPD_CLIENT_SECRET = 'YOUR_CLIENT_SECRET';
const API_BASE = 'https://api.untappd.com/v4';

const form = document.getElementById('untappd-form');
const usernameInput = document.getElementById('untappd-username');
const errorMsg = document.getElementById('untappd-error');
const searchSection = document.getElementById('untappd-search');
const profileSection = document.getElementById('untappd-profile');
const resetBtn = document.getElementById('untappd-reset-btn');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const username = usernameInput.value.trim();
  if (!username) return;
  await loadProfile(username);
});

resetBtn.addEventListener('click', () => {
  profileSection.classList.add('hidden');
  searchSection.classList.remove('hidden');
  usernameInput.value = '';
  showError('');
});

async function loadProfile(username) {
  showError('');
  const submitBtn = form.querySelector('button[type="submit"]');
  submitBtn.textContent = 'Laden…';
  submitBtn.disabled = true;

  try {
    const [userInfo, checkins] = await Promise.all([
      apiFetch(`/user/info/${username}`),
      apiFetch(`/user/checkins/${username}?limit=25`),
    ]);

    renderProfile(userInfo.response.user, checkins.response.checkins.items);
  } catch (err) {
    showError(err.message);
  } finally {
    submitBtn.textContent = 'Laad profiel';
    submitBtn.disabled = false;
  }
}

async function apiFetch(path) {
  const url = `${API_BASE}${path}${path.includes('?') ? '&' : '?'}client_id=${UNTAPPD_CLIENT_ID}&client_secret=${UNTAPPD_CLIENT_SECRET}`;
  const res = await fetch(url);
  const data = await res.json();

  if (!res.ok || data.meta?.code !== 200) {
    const msg = data.meta?.error_detail || 'Er is iets misgegaan.';
    if (res.status === 404) throw new Error('Gebruiker niet gevonden.');
    if (res.status === 429) throw new Error('Te veel verzoeken. Probeer het later opnieuw.');
    throw new Error(msg);
  }

  return data;
}

function renderProfile(user, checkins) {
  document.getElementById('profile-avatar').src = user.user_avatar;
  document.getElementById('profile-name').textContent =
    `${user.first_name} ${user.last_name}`.trim() || user.user_name;
  document.getElementById('profile-stats').textContent =
    `${user.stats.total_beers} bieren geproefd · ${user.stats.total_checkins} check-ins`;

  renderStyles(checkins);
  renderCheckins(checkins);

  searchSection.classList.add('hidden');
  profileSection.classList.remove('hidden');
}

function renderStyles(checkins) {
  const counts = {};
  checkins.forEach((c) => {
    const style = c.beer.beer_style;
    if (style) counts[style] = (counts[style] || 0) + 1;
  });

  const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 6);
  const max = sorted[0]?.[1] || 1;
  const list = document.getElementById('styles-list');
  list.innerHTML = '';

  sorted.forEach(([style, count]) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <span>${style}</span>
      <div class="style-bar-wrap"><div class="style-bar" style="width:${(count / max) * 100}%"></div></div>
      <span class="style-count">${count}x</span>
    `;
    list.appendChild(li);
  });
}

function renderCheckins(checkins) {
  const list = document.getElementById('recents-list');
  list.innerHTML = '';

  checkins.slice(0, 8).forEach((c) => {
    const li = document.createElement('li');
    const rating = c.rating_score > 0 ? `★ ${c.rating_score.toFixed(1)}` : '';
    li.innerHTML = `
      <span class="checkin-beer">${c.beer.beer_name} <span style="font-weight:400;color:var(--gray)">— ${c.brewery.brewery_name}</span></span>
      <span class="checkin-rating">${rating}</span>
    `;
    list.appendChild(li);
  });
}

function showError(msg) {
  errorMsg.textContent = msg;
  errorMsg.classList.toggle('hidden', !msg);
}

// Nav switching
document.querySelectorAll('.nav-btn').forEach((btn) => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.nav-btn').forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');

    const target = btn.dataset.target;
    document.getElementById('quiz-flow').classList.toggle('hidden', target !== 'quiz-flow');
    document.getElementById('untappd-flow').classList.toggle('hidden', target !== 'untappd-flow');
  });
});
