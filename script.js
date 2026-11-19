/* ============================================================
   CONFIG — edit this part to personalise your portfolio
   ============================================================ */
const CONFIG = {
  // Version label shown on the start screen and next to your name.
  version: "Beta 1",
  // Your GitHub username. Leave empty to auto-detect it from the
  // address when hosted at https://<username>.github.io
  username: "HarryMAnd",
  // Your name. Used if GitHub cannot be reached; otherwise the name on your GitHub profile is shown.
  name: "Harry Andrews",
  // Short role lines (kept for later use).
  roles: ["Cybersecurity & networking", "CompTIA Security+ & Network+ certified", "Python developer", "AV & network technician"],
  // Repo names to always show first (optional), e.g. ["my-best-app"].
  featured: [],
  // Repo names to hide (optional).
  hidden: ["Harry.M.Andrews.github.io"], // the portfolio site itself
  // Contact e-mail shown in the contact section (optional).
  email: "Harry.morgane.andrews@gmail.com",
  // Your photo. Put the image file next to index.html and write its name here,
  // e.g. "photo.jpg". Leave empty to use your GitHub profile picture.
  photo: "",
  // Profile screen: a short headline, an "about me" paragraph and a few highlights.
  headline: "Cybersecurity & IT networking",
  about: "I am technically minded and adaptable, with hands-on experience in AV and networking systems, structured cabling and smart lighting. I have specialised in cybersecurity and IT networking, supported by CompTIA Security+ and Network+ certifications. I enjoy solving technical problems and bring a strong work ethic and customer service skills.",
  highlights: ["CompTIA Security+", "CompTIA Network+", "English · French · Portuguese"],
  // LinkedIn profile link shown in the contact section (optional).
  linkedin: "https://www.linkedin.com/in/harryandrews",

  // Education — newest first.
  education: [
    { title: "Cybersecurity Bootcamp", place: "Ironhack (remote)", when: "2025", note: "Three-month full-time bootcamp: network security, digital forensics, ethical hacking, incident response and a capstone project." },
    { title: "AS Level", place: "Aprendizes International School, Lisbon", when: "2024 – 2025", note: "Information Technology, Business Studies, Mathematics" },
    { title: "Python Pro Course", place: "Algorithmic International School of Programming, Lisbon", when: "2023 – 2024", note: "Front-end and back-end Python development, building applications and games." },
    { title: "IGCSE", place: "Brave Generation Academy, Lisbon", when: "2022 – 2024", note: "Mathematics, English, French, Geography" },
  ],
  // Certifications. "url" is optional (link to the certificate).
  certifications: [
    { title: "Security+ (SY0-701)", place: "CompTIA", when: "2026", url: "" },
    { title: "Network+", place: "CompTIA", when: "2026", url: "" },
    { title: "Bluewater Crew Training (STCW)", place: "Antibes, France", when: "2024", note: "STCW, RYA Powerboat Level 2, Personal Watercraft Certificate of Proficiency" },
  ],
  // Work history for the experience room, newest first. "color" matches that job's corner of the room.
  experience: [
    { title: "AV Junior Technician", place: "Lundin Technologies, Lisbon", when: "July 2025 – present", color: "#8dff6a",
      note: "Installing, terminating and testing speaker cabling, RJ45 and AV network systems, including Ubiquiti equipment; configuring AV and network infrastructure." },
    { title: "Deck Hand", place: "Ocean-going yachts · Cannes, Monaco, Lisbon", when: "Summers 2024 & 2025", color: "#4fe3ff",
      note: "General deck operations, safety and security on board." },
    { title: "Builder Apprentice", place: "L Teck, Lisbon", when: "", color: "#ff6b5a",
      note: "Residential building work: smart lighting installs, painting, plastering, and running data and low-voltage cabling." },
    { title: "Bartender", place: "K Bueno Steakhouse, Lisbon", when: "", color: "#ffb84f",
      note: "Structured bar training in a fast-paced, customer-facing restaurant; strong communication skills." },
    { title: "Bartender (freelance)", place: "Private parties & events, Lisbon", when: "2023 – present", color: "#ffb84f",
      note: "Bartending for private parties and events." },
    { title: "Logistics Assistant", place: "Hikma Pharmaceuticals", when: "Summer 2022", color: "#a98bff",
      note: "Supported logistics and supply chain at a large pharmaceutical company." },
  ],
  // Skills / tools shown on the skills screen (repo topics are added automatically).
  skills: [
    "Network security", "Ethical hacking", "Digital forensics", "Incident response (Splunk)", "Malware analysis",
    "Firewalls & IDS", "Access controls", "TCP/IP", "DNS", "VLANs", "Routing protocols", "Traffic analysis",
    "Cryptography", "Virtual machines", "Python", "JavaScript (moderate)", "English (native)", "French (fluent)", "Portuguese (conversational)",
  ],
};
/* ============================================================ */

import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/addons/postprocessing/UnrealBloomPass.js";
import { OutputPass } from "three/addons/postprocessing/OutputPass.js";
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";

const $ = (s) => document.querySelector(s);
const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const safeUrl = (u) => { try { const x = new URL(/^https?:\/\//i.test(u) ? u : "https://" + u); return /^https?:$/.test(x.protocol) ? x.href : ""; } catch { return ""; } };
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const REDUCED = matchMedia("(prefers-reduced-motion: reduce)").matches;

const LANG_COLORS = {
  JavaScript: "#f1e05a", TypeScript: "#3178c6", Python: "#3572A5", HTML: "#e34c26", CSS: "#663399",
  Java: "#b07219", "C++": "#f34b7d", C: "#555555", "C#": "#178600", Go: "#00ADD8", Rust: "#dea584",
  PHP: "#4F5D95", Ruby: "#701516", Swift: "#F05138", Kotlin: "#A97BFF", Dart: "#00B4AB", Shell: "#89e051",
  Vue: "#41b883", "Jupyter Notebook": "#DA5B0B", PowerShell: "#012456", Other: "#8d9bbd",
};
const langColor = (l) => LANG_COLORS[l] || `hsl(${[...String(l)].reduce((a, c) => a + c.charCodeAt(0), 0) * 47 % 360} 60% 55%)`;

// The places you can visit. "home" is the wide view of the whole scene.
const SECTIONS = {
  // kind = what the content is drawn on; W = the width (px) its layout is designed for
  profile:   { title: "profile",   color: "#ff4fa8", blurb: "who I am",                     heading: "About me",                   kind: "billboard", W: 760 },
  projects:  { title: "projects",  color: "#8dff6a", blurb: "things I have built",          heading: "Projects",                   kind: "explorer",  W: 760 },
  education: { title: "education", color: "#a98bff", blurb: "my education & certificates",  heading: "Education & certifications", kind: "book",      W: 860 },
  skills:    { title: "skills",    color: "#4fe3ff", blurb: "tools & languages I use",      heading: "Skills",                     kind: "laptop",    W: 720 },
  experience: { title: "experience", color: "#ffb84f", blurb: "where I have worked",        heading: "Work experience",            kind: "board",     W: 980 },
  contact:   { title: "contact",   color: "#ffb84f", blurb: "how to reach me",              heading: "",                           kind: "letter",    W: 430 },
};

const state = { user: null, repos: [], lang: "All", query: "", sort: "updated", forks: false, at: "home" };

/* ---------- GitHub data (15-minute cache) ---------- */
function resolveUsername() {
  const param = new URLSearchParams(location.search).get("user");
  if (param) return param.trim();
  if (CONFIG.username) return CONFIG.username.trim();
  const m = location.hostname.match(/^([a-z0-9-]+)\.github\.io$/i);
  return m ? m[1] : "";
}
async function gh(path) {
  const key = "gh:" + path;
  try {
    const hit = JSON.parse(sessionStorage.getItem(key) || "null");
    if (hit && Date.now() - hit.t < 15 * 60e3) return hit.d;
  } catch {}
  const res = await fetch("https://api.github.com" + path, { headers: { Accept: "application/vnd.github+json" } });
  if (!res.ok) {
    if (res.status === 404) throw new Error("GitHub user not found.");
    if (res.status === 403 || res.status === 429) throw new Error("GitHub API rate limit reached — try again in a little while.");
    throw new Error("GitHub API error (" + res.status + ").");
  }
  const d = await res.json();
  try { sessionStorage.setItem(key, JSON.stringify({ t: Date.now(), d })); } catch {}
  return d;
}
async function loadAll(username) {
  const u = encodeURIComponent(username);
  const user = await gh(`/users/${u}`);
  const repos = [];
  for (let page = 1; page <= 3; page++) {
    const batch = await gh(`/users/${u}/repos?per_page=100&sort=updated&page=${page}`);
    repos.push(...batch);
    if (batch.length < 100) break;
  }
  return { user, repos };
}

/* ============================================================
   Section content (the "screens")
   ============================================================ */
const ICONS = {
  github: "M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12",
  gmail: "M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z",
  linkedin: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
};
const displayName = () => state.user.name || state.user.login;
const photoUrl = () => CONFIG.photo || state.user.avatar_url;
// Outside links, used by both the contact screen and the terminal.
function links() {
  const out = { github: state.user.html_url };
  const email = CONFIG.email || state.user.email;
  if (email) out.email = "mailto:" + email;
  const li = CONFIG.linkedin && safeUrl(CONFIG.linkedin);
  if (li) out.linkedin = li;
  return out;
}

function renderProfile() {
  const name = displayName();
  document.title = `${name} — Portfolio`;
  $("#brand-name").textContent = state.user.login;
  $("#version").textContent = CONFIG.version;
  $("#photo").hidden = !photoUrl();
  if (photoUrl()) $("#photo").src = photoUrl();
  $("#photo").alt = name;
  $("#profile-name").textContent = name;
  $("#profile-headline").textContent = CONFIG.headline;
  $("#about").textContent = CONFIG.about || state.user.bio || "";
  $("#letter-name").textContent = name;
  $("#highlights").innerHTML = CONFIG.highlights.map((t) => `<span class="tag">${esc(t)}</span>`).join("");

  const l = links();
  const btn = (kind, label, href, newTab = true) =>
    `<a class="blink ${kind}" href="${esc(href)}"${newTab ? ' target="_blank" rel="noopener"' : ""}><svg viewBox="0 0 24 24" aria-hidden="true"><path d="${ICONS[kind]}"/></svg><span>${label}<small>${esc(href.replace(/^mailto:|^https?:\/\/(www\.)?/g, "").replace(/\/$/, ""))}</small></span></a>`;
  $("#contact-links").innerHTML = [
    btn("github", "GitHub", l.github),
    l.email ? btn("gmail", "Email", l.email, false) : "",
    l.linkedin ? btn("linkedin", "LinkedIn", l.linkedin) : "",
  ].join("");
}

function barHTML(entries) {
  const total = entries.reduce((a, [, n]) => a + n, 0) || 1;
  return {
    bar: entries.map(([l, n]) => `<span data-lang="${esc(l)}" data-w="${(n / total * 100).toFixed(2)}" style="background:${langColor(l)}" title="${esc(l)} ${(n / total * 100).toFixed(1)}%"></span>`).join(""),
    legend: entries.map(([l, n]) => `<li><i class="dot" style="background:${langColor(l)}"></i>${esc(l)} <b>${(n / total * 100).toFixed(1)}%</b></li>`).join(""),
  };
}
const growBars = (root) => requestAnimationFrame(() => requestAnimationFrame(() => root.querySelectorAll("span[data-w]").forEach((s) => (s.style.width = s.dataset.w + "%"))));
// repos named something.github.io are the website itself, so they are never listed as projects
const visibleBase = () => state.repos.filter((r) => (state.forks || !r.fork) && !CONFIG.hidden.includes(r.name) && !/\.github\.io$/i.test(r.name));
const skillList = () => [...new Set([...CONFIG.skills, ...visibleBase().flatMap((r) => r.topics || [])])];

function renderLanguages() {
  const counts = {};
  visibleBase().forEach((r) => { if (r.language) counts[r.language] = (counts[r.language] || 0) + 1; });
  const entries = Object.entries(counts).sort((a, b) => b[1] - a[1]);
  const top = entries.slice(0, 8);
  const rest = entries.slice(8).reduce((a, [, n]) => a + n, 0);
  if (rest) top.push(["Other", rest]);
  const { bar, legend } = barHTML(top);
  $("#lang-bar").innerHTML = bar;
  $("#lang-legend").innerHTML = legend;
  $("#skill-tags").innerHTML = skillList().map((t) => `<span class="tag">${esc(t)}</span>`).join("");
  $("#chips").innerHTML = ["All", ...entries.map(([l]) => l)]
    .map((l) => `<button class="chip${l === state.lang ? " active" : ""}" data-lang="${esc(l)}">${esc(l)}</button>`).join("");
}

function filtered() {
  const q = state.query.toLowerCase();
  const list = visibleBase().filter((r) =>
    (state.lang === "All" || r.language === state.lang) &&
    (!q || [r.name, r.description, r.language, ...(r.topics || [])].join(" ").toLowerCase().includes(q)));
  const by = {
    stars: (a, b) => b.stargazers_count - a.stargazers_count || new Date(b.pushed_at) - new Date(a.pushed_at),
    updated: (a, b) => new Date(b.pushed_at) - new Date(a.pushed_at),
    name: (a, b) => a.name.localeCompare(b.name),
  }[state.sort];
  const feat = (r) => { const i = CONFIG.featured.indexOf(r.name); return i < 0 ? Infinity : i; };
  return list.sort((a, b) => feat(a) - feat(b) || by(a, b));
}
const ago = (d) => {
  const days = Math.floor((Date.now() - new Date(d)) / 864e5);
  if (days < 1) return "today";
  if (days < 30) return `${days}d ago`;
  if (days < 365) return `${Math.floor(days / 30)}mo ago`;
  return `${Math.floor(days / 365)}y ago`;
};
function renderGrid() {
  const list = filtered();
  $("#count").textContent = `${list.length} project${list.length === 1 ? "" : "s"}`;
  $("#grid").innerHTML = list.length
    ? list.map((r) => `
      <button class="card" data-id="${r.id}">
        <h3>${CONFIG.featured.includes(r.name) ? "★ " : ""}${esc(r.name)}</h3>
        <p>${esc(r.description || "No description yet.")}</p>
        ${(r.topics || []).length ? `<div class="tags">${r.topics.slice(0, 4).map((t) => `<span class="tag">${esc(t)}</span>`).join("")}</div>` : ""}
        <div class="meta">
          ${r.language ? `<span><i class="dot" style="background:${langColor(r.language)}"></i>${esc(r.language)}</span>` : ""}
          <span>★ ${r.stargazers_count}</span><span>${ago(r.pushed_at)}</span>
        </div>
      </button>`).join("")
    : `<p class="empty">No projects match — try clearing the filters.</p>`;
}

function renderExperience() {
  $("#jobs").innerHTML = (CONFIG.experience || []).map((j) => `
    <article class="job" style="--jc:${esc(j.color || "#ffb84f")}">
      ${j.when ? `<span class="when">${esc(j.when)}</span>` : ""}
      <b>${esc(j.title)}</b>
      <span class="place">${esc(j.place)}</span>
      ${j.note ? `<p>${esc(j.note)}</p>` : ""}
    </article>`).join("");
}
function renderEducation() {
  const item = (e) => {
    const url = e.url && safeUrl(e.url);
    return `<li>
      <span class="when">${esc(e.when)}</span>
      <b>${esc(e.title)}</b>
      <span>${esc(e.place)}</span>
      ${e.note ? `<span>${esc(e.note)}</span>` : ""}
      ${url ? `<a href="${esc(url)}" target="_blank" rel="noopener">View certificate ↗</a>` : ""}
    </li>`;
  };
  $("#education").innerHTML = CONFIG.education.map(item).join("");
  $("#certs").innerHTML = CONFIG.certifications.map(item).join("");
}

/* ---------- Project details pop-up ---------- */
let lastFocus = null;
async function openModal(repo) {
  lastFocus = document.activeElement;
  const home = repo.homepage && safeUrl(repo.homepage);
  $("#modal-body").innerHTML = `
    <h3 id="modal-title">${esc(repo.name)}</h3>
    <p>${esc(repo.description || "No description yet.")}</p>
    ${(repo.topics || []).length ? `<div class="tags">${repo.topics.map((t) => `<span class="tag">${esc(t)}</span>`).join("")}</div>` : ""}
    <div class="kv">
      <div><b>★ ${repo.stargazers_count}</b>Stars</div>
      <div><b>${new Date(repo.created_at).getFullYear()}</b>Created</div>
      <div><b>${ago(repo.pushed_at)}</b>Last push</div>
      ${repo.license?.spdx_id && repo.license.spdx_id !== "NOASSERTION" ? `<div><b>${esc(repo.license.spdx_id)}</b>License</div>` : ""}
    </div>
    <div id="modal-langs"></div>
    <div class="actions">
      <a class="btn primary" href="${esc(repo.html_url)}" target="_blank" rel="noopener">View code ↗</a>
      ${home ? `<a class="btn" href="${esc(home)}" target="_blank" rel="noopener">Live demo ↗</a>` : ""}
    </div>`;
  $("#modal").hidden = false;
  $(".modal-close").focus();
  try {
    const langs = Object.entries(await gh(`/repos/${repo.full_name}/languages`)).sort((a, b) => b[1] - a[1]);
    const box = $("#modal-langs");
    if (!langs.length || $("#modal-title")?.textContent !== repo.name) return;
    const { bar, legend } = barHTML(langs);
    box.innerHTML = `<div class="lang-bar">${bar}</div><ul class="lang-legend">${legend}</ul>`;
    growBars(box);
  } catch {}
}
function closeModal() {
  if ($("#modal").hidden) return false;
  $("#modal").hidden = true;
  lastFocus?.focus();
  return true;
}

// The content box follows a flat surface in the scene (the monitor's screen, the
// open book, the letter…): each frame its four corners are projected to the page.
let tracked = null;
const _corner = new THREE.Vector3();
function trackPanel() {
  if (!tracked) return;
  const { mesh, w, h, W } = tracked;
  let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
  for (const [sx, sy] of [[-1, -1], [1, -1], [-1, 1], [1, 1]]) {
    mesh.localToWorld(_corner.set((sx * w) / 2, (sy * h) / 2, 0)).project(world3d.camera);
    const px = ((_corner.x + 1) / 2) * innerWidth, py = ((1 - _corner.y) / 2) * innerHeight;
    x0 = Math.min(x0, px); x1 = Math.max(x1, px); y0 = Math.min(y0, py); y1 = Math.max(y1, py);
  }
  const key = [x0, y0, x1, y1].map(Math.round).join();
  if (key === tracked.key) return;
  tracked.key = key;
  const rw = x1 - x0, rh = y1 - y0;
  const dw = Math.max(Math.min(W, Math.max(rw, 400)), rw / 1.5);   // layout width; then scaled to fit
  const sc = rw / dw, st = $("#panel").style;
  st.left = x0 + "px"; st.top = y0 + "px";
  st.width = dw + "px"; st.height = rh / sc + "px";
  st.transform = `scale(${sc})`;
}
function showPanel(name) {
  const panel = $("#panel");
  tracked = null;
  if (!SECTIONS[name]) { panel.hidden = true; return; }
  const sec = SECTIONS[name];
  document.querySelectorAll(".pane").forEach((p) => p.classList.toggle("on", p.dataset.pane === name));
  $("#panel-title").textContent = sec.heading;
  panel.className = "panel kind-" + sec.kind;
  panel.style.setProperty("--pc", sec.color);
  tracked = { ...world3d.surf[name], W: sec.W };
  world3d.scene.updateMatrixWorld();
  trackPanel();
  panel.hidden = true; void panel.offsetWidth; panel.hidden = false;   // replay the fade-in
  $(".panel-body").scrollTop = 0;
  $("#term-out").hidden = true;          // fold the console away so it does not cover the content
  if (name === "skills") growBars($("#lang-bar"));
  if (name === "projects") renderExplorer();
  if (name === "skills") skillsCli();
}

/* ---------- The skills screen: a Linux terminal filling the laptop screen ----------
   It types real-looking commands ("tree skills/", "languages -v") and prints the answers. */
const cli = { run: 0 };
async function skillsCli() {
  const id = ++cli.run, el = $("#cli"), alive = () => id === cli.run && state.at === "skills";
  const prompt = `<span class="u">${esc(term.user)}@portfolio</span>:<span class="p">~</span>$ `;
  el.innerHTML = "";
  let skip = REDUCED;                                        // click or press a key to skip the typing
  el.onpointerdown = () => (skip = true);
  const wait = (ms) => (skip ? Promise.resolve() : sleep(ms));
  const out = (html = "") => { const d = document.createElement("div"); d.innerHTML = html || "&nbsp;"; el.append(d); el.scrollTop = el.scrollHeight; return d; };
  // type a command after the prompt, one letter at a time; false if the visitor has left
  const type = async (cmd) => {
    const row = out(prompt + '<span class="w"></span><span class="cur">█</span>');
    await wait(300);
    for (const ch of cmd) { if (!alive()) return false; row.querySelector(".w").textContent += ch; await wait(38); }
    row.querySelector(".cur").remove();
    await wait(140);
    return alive();
  };

  // sort the skills into folders by topic, for a "tree" listing
  const TOPICS = [
    ["security", /security|hacking|forensic|incident|malware|firewall|access|crypt/i],
    ["networking", /tcp|dns|vlan|routing|traffic|network/i],
    ["programming", /python|javascript|typescript|java\b|c\+\+|c#|html|css|sql|bash|powershell|php|go\b|rust/i],
    ["spoken-languages", /english|french|portuguese|spanish|german|italian/i],
    ["systems", /virtual|linux|windows|server|cloud|docker/i],
  ];
  const groups = new Map(TOPICS.map(([n]) => [n, []]));
  groups.set("other", []);
  for (const sk of skillList()) groups.get((TOPICS.find(([, re]) => re.test(sk)) || ["other"])[0]).push(sk);
  const folders = [...groups].filter(([, list]) => list.length);

  out(prompt);
  if (!(await type("tree skills/"))) return;
  out('<span class="d">skills/</span>');
  for (const [fi, [folder, list]] of folders.entries()) {
    const lastFolder = fi === folders.length - 1;
    out(`${lastFolder ? "└──" : "├──"} <span class="d">${folder}/</span>`);
    await wait(60);
    for (const [i, sk] of list.entries()) {
      if (!alive()) return;
      out(`${lastFolder ? "    " : "│   "}${i === list.length - 1 ? "└──" : "├──"} ${esc(sk)}`);
      await wait(35);
    }
  }
  out(); out(`${folders.length} directories, ${skillList().length} skills`);

  // programming languages, measured from the GitHub projects
  const counts = {};
  visibleBase().forEach((r) => { if (r.language) counts[r.language] = (counts[r.language] || 0) + 1; });
  const langs = Object.entries(counts).sort((a, b) => b[1] - a[1]), total = langs.reduce((n, [, v]) => n + v, 0);
  if (langs.length) {
    if (!(await type("languages -v"))) return;
    const w = Math.max(...langs.map(([l]) => l.length));
    for (const [l, v] of langs) {
      const full = Math.round((v / total) * 20);
      out(`${esc(l.padEnd(w))}  [${"#".repeat(full)}${".".repeat(20 - full)}] ${((v / total) * 100).toFixed(1)}%`);
      await wait(60);
    }
    out("Measured from the projects on my GitHub.");
  }
  out(prompt + '<span class="cur">█</span>');
}

/* ---------- The projects screen: an old-style desktop file explorer ----------
   One folder per project. Click a folder to see its details on the left;
   double-click it (or use "Open on GitHub") to open the code. */
const FOLDER = '<svg viewBox="0 0 48 40" aria-hidden="true"><path d="M2 8a3 3 0 0 1 3-3h13l4 5h21a3 3 0 0 1 3 3v22a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3z" fill="#e8b93a" stroke="#a87b0c"/><path d="M2 15h44v20a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3z" fill="#ffdf82" stroke="#a87b0c"/></svg>';
const xp = { list: [], sel: -1 };
function renderExplorer() {
  xp.list = filtered(); xp.sel = -1;
  const who = esc(displayName().split(" ")[0]);
  $("#explorer").innerHTML = `
    <div class="xp">
      <div class="xp-title">${FOLDER}<span>My Projects</span><div class="xp-ctl"><i>_</i><i>□</i><button data-go="home" aria-label="Close" title="Close">✕</button></div></div>
      <div class="xp-menu"><span>File</span><span>Edit</span><span>View</span><span>Favorites</span><span>Tools</span><span>Help</span></div>
      <div class="xp-tools">
        <button class="xp-tool" data-go="home"><b>←</b> Back</button><span class="xp-tool off"><b>→</b></span><span class="xp-sep"></span>
        <span class="xp-tool off">Search</span><span class="xp-tool off">Folders</span>
      </div>
      <div class="xp-addr">Address <div class="xp-path">${FOLDER} C:\\Documents and Settings\\${who}\\My Projects</div></div>
      <div class="xp-body">
        <aside class="xp-side">
          <section class="xp-box"><h4>Project Tasks</h4><div id="xp-tasks"></div></section>
          <section class="xp-box"><h4>Details</h4><div id="xp-details"></div></section>
          <section class="xp-box"><h4>Other Places</h4><div>
            <a href="${esc(links().github)}" target="_blank" rel="noopener">My GitHub</a>
            <button data-go="skills">My Skills</button><button data-go="education">My Education</button><button data-go="profile">About Me</button><button data-go="contact">Contact Me</button>
          </div></section>
        </aside>
        <div class="xp-files" id="xp-files">${xp.list.length
          ? xp.list.map((r, i) => `<button class="xp-item" data-i="${i}" title="${esc(r.description || r.name)}">${FOLDER}<span>${esc(r.name)}</span></button>`).join("")
          : '<p class="xp-empty">This folder is empty.</p>'}</div>
      </div>
      <div class="xp-status"><span id="xp-count"></span><span>My Computer</span></div>
    </div>`;
  xpSelect(-1);
}
function xpSelect(i) {
  xp.sel = i;
  const r = xp.list[i];
  document.querySelectorAll(".xp-item").forEach((b) => b.classList.toggle("sel", +b.dataset.i === i));
  $("#xp-count").textContent = r ? "1 object selected" : `${xp.list.length} object${xp.list.length === 1 ? "" : "s"}`;
  const home = r && r.homepage && safeUrl(r.homepage);
  $("#xp-tasks").innerHTML = r
    ? `<a href="${esc(r.html_url)}" target="_blank" rel="noopener">Open on GitHub</a>${home ? `<a href="${esc(home)}" target="_blank" rel="noopener">View live demo</a>` : ""}<button data-xp-clear>Clear selection</button>`
    : "<p>Click a folder to select it.</p><p>Double-click to open it on GitHub.</p>";
  $("#xp-details").innerHTML = r
    ? `<p><b>${esc(r.name)}</b></p><small>File Folder</small><p>${esc(r.description || "No description yet.")}</p>
       ${r.language ? `<small>Language: ${esc(r.language)}</small>` : ""}<small>Date modified: ${esc(new Date(r.pushed_at).toLocaleDateString())}</small><small>Stars: ${r.stargazers_count}</small>`
    : `<p><b>My Projects</b></p><small>File Folder</small><small>${xp.list.length} project${xp.list.length === 1 ? "" : "s"} from GitHub</small>`;
}
function initCli() {
  const ex = $("#explorer");
  ex.addEventListener("click", (e) => {
    if (e.target.closest("[data-xp-clear]")) return xpSelect(-1);
    const item = e.target.closest(".xp-item");
    if (item) xpSelect(+item.dataset.i);
    else if (e.target.closest(".xp-files")) xpSelect(-1);
  });
  ex.addEventListener("dblclick", (e) => {
    const item = e.target.closest(".xp-item"), r = item && xp.list[+item.dataset.i];
    if (r) window.open(r.html_url, "_blank", "noopener");
  });
  document.addEventListener("keydown", (e) => {
    if ($("#panel").hidden || /INPUT|TEXTAREA|SELECT/.test(document.activeElement.tagName)) return;
    if (state.at === "skills") return void $("#cli").onpointerdown?.();                 // any key skips the loading
    if (state.at !== "projects" || !xp.list.length) return;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") { e.preventDefault(); xpSelect((xp.sel + 1) % xp.list.length); }
    else if (e.key === "ArrowLeft" || e.key === "ArrowUp") { e.preventDefault(); xpSelect((xp.sel + xp.list.length - 1) % xp.list.length); }
    else if (e.key === "Enter" && xp.list[xp.sel]) window.open(xp.list[xp.sel].html_url, "_blank", "noopener");
  });
}

/* ============================================================
   The 3D scene
   ============================================================ */
const world3d = { surf: {}, groups: {} };   // filled by buildScene()

const NEON = { pink: 0xff3fa4, cyan: 0x3fe8ff, lime: 0x8dff6a, amber: 0xffb84f, violet: 0x9b7bff, red: 0xff3b4e };
const neon = (hex, k = 2.4) => new THREE.MeshBasicMaterial({ color: new THREE.Color(hex).multiplyScalar(k) });
// Smooth shading everywhere (no faceted look), and every block gets softly rounded edges
// and corners, like real furniture and machines. Shapes of the same size share one geometry.
const solid = (hex, o = {}) => new THREE.MeshStandardMaterial({ color: hex, roughness: 0.65, metalness: 0.1, flatShading: false, ...o });
const boxGeos = new Map();
const boxGeo = (w, h, d) => {
  const key = `${w.toFixed(4)},${h.toFixed(4)},${d.toFixed(4)}`;
  if (!boxGeos.has(key)) {
    const r = Math.min(0.025, Math.min(w, h, d) * 0.2);                 // a bevel of up to 2.5 cm, less on thin parts
    boxGeos.set(key, r < 0.003 ? new THREE.BoxGeometry(w, h, d) : new RoundedBoxGeometry(w, h, d, 2, r));
  }
  return boxGeos.get(key);
};
const box = (w, h, d, m, x = 0, y = 0, z = 0) => { const o = new THREE.Mesh(boxGeo(w, h, d), m); o.position.set(x, y, z); return o; };
const cyl = (rt, rb, h, m, x = 0, y = 0, z = 0, seg = 32) => { const o = new THREE.Mesh(new THREE.CylinderGeometry(rt, rb, h, Math.max(seg, 24)), m); o.position.set(x, y, z); return o; };
const plane = (w, h, m, x = 0, y = 0, z = 0) => { const o = new THREE.Mesh(new THREE.PlaneGeometry(w, h), m); o.position.set(x, y, z); return o; };

function canvasTex(w, h, draw) {
  const c = document.createElement("canvas");
  c.width = w; c.height = h;
  draw(c.getContext("2d"), w, h);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 8;
  return t;
}
// A flat card of text, e.g. a sign or a framed certificate.
function textTex(lines, { w = 512, h = 256, bg = "#000", fg = "#fff", font = "bold 56px monospace", sub = "", lh = 1.25 } = {}) {
  return canvasTex(w, h, (x) => {
    x.fillStyle = bg; x.fillRect(0, 0, w, h);
    x.fillStyle = fg; x.textAlign = "center"; x.textBaseline = "middle"; x.font = font;
    const size = parseInt(font.match(/(\d+)px/)[1], 10) * lh;
    const y0 = h / 2 - ((lines.length - 1) * size) / 2 - (sub ? size * 0.3 : 0);
    lines.forEach((l, i) => x.fillText(l, w / 2, y0 + i * size, w - 30));
    if (sub) { x.font = `${Math.round(size * 0.42)}px monospace`; x.fillText(sub, w / 2, y0 + lines.length * size * 0.92, w - 30); }
  });
}
// Floating neon tag above each place you can click.
function tag(text, css) {
  const t = canvasTex(512, 128, (x, w, h) => {
    x.fillStyle = "rgba(6,8,18,.88)"; x.strokeStyle = css; x.lineWidth = 8;
    x.beginPath(); x.roundRect(6, 6, w - 12, h - 12, 26); x.fill(); x.stroke();
    x.fillStyle = css; x.font = "bold 56px monospace"; x.textAlign = "center"; x.textBaseline = "middle";
    x.fillText("> " + text, w / 2, h / 2 + 4);
  });
  const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: t, transparent: true }));
  s.material.color.multiplyScalar(1.7);
  s.scale.set(1.9, 0.475, 1);
  return s;
}

// A name plate fixed flat to a wall. Unlike the floating tags it stays put, so it
// reads as part of the room. w / h are its real size in metres.
function poster(text, css) {
  const t = canvasTex(768, 192, (x, w, h) => {
    x.fillStyle = "rgba(6,8,18,.94)"; x.strokeStyle = css; x.lineWidth = 10;
    x.beginPath(); x.roundRect(8, 8, w - 16, h - 16, 22); x.fill(); x.stroke();
    x.fillStyle = css; x.font = "bold 92px monospace"; x.textAlign = "center"; x.textBaseline = "middle";
    x.fillText(text.toUpperCase().split("").join(" "), w / 2, h / 2 + 6, w - 70);
  });
  const m = plane(1, 1, new THREE.MeshBasicMaterial({ map: t, transparent: true }));
  m.material.color.multiplyScalar(1.6);
  m.userData.w = 2.4; m.userData.h = 0.6;
  m.scale.set(2.4, 0.6, 1);
  return m;
}

/* ----- Props ----- */
function phoneBox() {
  const g = new THREE.Group(), red = solid(0xc8102e, { roughness: 0.4 });
  g.add(box(1.2, 0.12, 1.2, solid(0x15161c), 0, 0.06, 0), box(1, 2.3, 1, red, 0, 1.27, 0));
  const glass = new THREE.MeshBasicMaterial({
    map: canvasTex(256, 512, (x, w, h) => {
      const gr = x.createLinearGradient(0, 0, 0, h);
      gr.addColorStop(0, "#ffe9a8"); gr.addColorStop(0.55, "#e0a23c"); gr.addColorStop(1, "#5a3716");
      x.fillStyle = gr; x.fillRect(0, 0, w, h);
      x.fillStyle = "#c8102e";
      for (let i = 0; i <= 3; i++) x.fillRect(Math.min(w - 10, (i * w) / 3 - 5), 0, 10, h);
      for (let j = 0; j <= 6; j++) x.fillRect(0, Math.min(h - 10, (j * h) / 6 - 5), w, 10);
    }),
  });
  glass.color.multiplyScalar(1.5);
  const sign = new THREE.MeshBasicMaterial({ map: textTex(["CONTACT"], { w: 512, h: 96, bg: "#f6f1e4", fg: "#15151a", font: "bold 64px Georgia, serif" }) });
  for (let i = 0; i < 4; i++) {
    const a = (i * Math.PI) / 2, sx = Math.sin(a), cz = Math.cos(a);
    const p = plane(0.78, 1.5, glass, sx * 0.505, 1.1, cz * 0.505); p.rotation.y = a;
    const s = plane(0.8, 0.15, sign, sx * 0.506, 2.2, cz * 0.506); s.rotation.y = a;
    g.add(p, s);
  }
  g.add(box(1.08, 0.1, 1.08, red, 0, 2.47, 0));
  const dome = new THREE.Mesh(new THREE.SphereGeometry(0.62, 20, 8, 0, Math.PI * 2, 0, Math.PI / 2), red);
  dome.scale.y = 0.38; dome.position.y = 2.52;
  g.add(dome);
  return g;
}
function pillarBox() {
  const g = new THREE.Group(), red = solid(0xc8102e, { roughness: 0.4, flatShading: false });
  g.add(cyl(0.36, 0.36, 0.24, solid(0x121318), 0, 0.12, 0), cyl(0.32, 0.32, 1.15, red, 0, 0.8, 0), cyl(0.38, 0.38, 0.08, red, 0, 1.4, 0));
  const top = new THREE.Mesh(new THREE.SphereGeometry(0.36, 20, 8, 0, Math.PI * 2, 0, Math.PI / 2), red);
  top.scale.y = 0.45; top.position.y = 1.44;
  g.add(top, box(0.3, 0.045, 0.03, solid(0x0a0a0d), 0, 1.15, 0.315), plane(0.22, 0.26, new THREE.MeshBasicMaterial({ map: textTex(["POST"], { w: 128, h: 150, bg: "#f6f1e4", fg: "#15151a", font: "bold 40px Georgia, serif" }) }), 0, 0.82, 0.325));
  return g;
}
function envelope() {
  const g = new THREE.Group();
  g.add(box(0.46, 0.3, 0.02, new THREE.MeshStandardMaterial({ color: 0xf7f2e6, roughness: 0.8 })));
  const flap = new THREE.Mesh(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(-0.23, 0.15, 0.012), new THREE.Vector3(0, -0.02, 0.012), new THREE.Vector3(0.23, 0.15, 0.012)]), new THREE.MeshBasicMaterial({ color: 0xcfc5ae, side: THREE.DoubleSide }));
  const seal = new THREE.Mesh(new THREE.CircleGeometry(0.04, 16), new THREE.MeshBasicMaterial({ color: 0xc8102e }));
  seal.position.set(0, -0.02, 0.014);
  g.add(flap, seal);
  return g;
}
// The letter that comes to you: same envelope, but the flap is hinged along the top
// edge so it can open, and a sheet of paper is tucked inside.
function letterEnvelope() {
  const g = new THREE.Group(), paper = new THREE.MeshStandardMaterial({ color: 0xf7f2e6, roughness: 0.8 });
  g.add(box(0.46, 0.3, 0.02, paper));
  const flap = new THREE.Group();
  flap.position.set(0, 0.15, -0.03);                                   // the hinge: top edge, on the back of the envelope
  const tri = new THREE.Mesh(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(-0.23, 0, 0), new THREE.Vector3(0, -0.17, 0), new THREE.Vector3(0.23, 0, 0)]), new THREE.MeshBasicMaterial({ color: 0xcfc5ae, side: THREE.DoubleSide }));
  const seal = new THREE.Mesh(new THREE.CircleGeometry(0.04, 16), new THREE.MeshBasicMaterial({ color: 0xc8102e, side: THREE.DoubleSide }));
  seal.position.set(0, -0.02, 0.012);                                  // wax seal on the front
  flap.add(tri);
  g.add(flap, seal);
  g.userData.flap = flap;
  return g;
}
function workstation(repos) {
  const g = new THREE.Group(), dark = solid(0x14151d), wood = solid(0x3b2b4d);
  g.add(box(2.5, 0.08, 1.15, wood, 0, 0.9, 0));
  for (const [x, z] of [[-1.15, -0.5], [1.15, -0.5], [-1.15, 0.5], [1.15, 0.5]]) g.add(box(0.08, 0.86, 0.08, dark, x, 0.43, z));
  g.add(box(0.5, 0.03, 0.3, dark, 0, 0.955, -0.3), box(0.08, 0.34, 0.06, dark, 0, 1.12, -0.32), box(1.76, 1.0, 0.07, dark, 0, 1.75, -0.3));
  const screenTex = canvasTex(1024, 560, () => {});
  const screen = plane(1.66, 0.9, new THREE.MeshBasicMaterial({ map: screenTex }), 0, 1.75, -0.262);
  screen.material.color.multiplyScalar(1.35);
  g.add(screen);
  world3d.surf.projects = { mesh: screen, w: 1.66, h: 0.9 };
  g.add(box(0.72, 0.03, 0.24, dark, -0.1, 0.955, 0.22), box(0.72, 0.012, 0.02, neon(NEON.lime, 1.8), -0.1, 0.962, 0.345), box(0.12, 0.03, 0.18, dark, 0.5, 0.955, 0.24));
  g.add(cyl(0.06, 0.05, 0.13, solid(0xe8e2d0, { flatShading: false }), 0.95, 1.005, 0.1));
  g.add(box(0.36, 0.72, 0.72, dark, 0.86, 0.36, -0.1), box(0.02, 0.56, 0.02, neon(NEON.lime), 0.67, 0.36, 0.2), box(0.02, 0.56, 0.02, neon(NEON.pink), 0.67, 0.36, 0.1));
  // chair
  g.add(box(0.6, 0.08, 0.6, solid(0x2a2c3d), -0.1, 0.55, 1.0), box(0.6, 0.75, 0.08, solid(0x2a2c3d), -0.1, 1.0, 1.28), cyl(0.04, 0.04, 0.5, dark, -0.1, 0.27, 1.0), cyl(0.3, 0.3, 0.04, dark, -0.1, 0.03, 1.0));
  // what the monitor shows: a terminal listing the real repos
  const x = screenTex.image.getContext("2d");
  x.fillStyle = "#030805"; x.fillRect(0, 0, 1024, 560);
  x.font = "bold 36px monospace"; x.textBaseline = "top";
  const row = (i, parts) => { let px = 36; for (const [txt, col] of parts) { x.fillStyle = col; x.fillText(txt, px, 34 + i * 50); px += x.measureText(txt).width; } };
  row(0, [["harry@portfolio", "#7dffa0"], [":", "#fff"], ["~/projects", "#6cb8ff"], ["$ ls -l", "#fff"]]);
  repos.slice(0, 7).forEach((r, i) => row(i + 1, [["drwxr-xr-x  ", "#5fae78"], [r.name, "#6cb8ff"], [r.language ? "   " + r.language : "", "#8d9bbd"]]));
  row(Math.min(repos.length, 7) + 2, [["harry@portfolio", "#7dffa0"], [":", "#fff"], ["~/projects", "#6cb8ff"], ["$ ", "#fff"], ["█", "#7dffa0"]]);
  screenTex.needsUpdate = true;
  return g;
}
const ledFor = (i, j, seed) => world3d.leds[(i * 7 + j * 13 + seed * 29 + i * j * 3) % world3d.leds.length].mat;
function serverRack() {
  const g = new THREE.Group();
  g.add(box(0.98, 2.3, 0.98, solid(0x101117), 0, 1.15, 0));
  // thirty separate lights, each with its own colour, speed and rhythm, so no two racks blink together
  const ledHex = [NEON.lime, NEON.cyan, NEON.amber, NEON.red, NEON.lime, NEON.cyan];
  world3d.leds = Array.from({ length: 30 }, (_, k) => ({
    mat: neon(ledHex[k % 6]), hex: ledHex[k % 6],
    speed: 0.12 + (((k * 37) % 17) / 17) * 1.1, phase: ((k * 53) % 29) / 29, duty: 0.4 + (((k * 11) % 7) / 7) * 0.5,
  }));
  for (let i = 0; i < 9; i++) {
    const y = 0.26 + i * 0.235;
    if (i === 6) continue;               // this slot holds the slide-out drawer (below)
    g.add(box(0.82, 0.19, 0.03, solid(0x23242f), 0, y, 0.485));
    for (let j = 0; j < 4; j++) g.add(box(0.045, 0.045, 0.02, ledFor(i, j, 0), -0.3 + j * 0.09, y, 0.505));
    g.add(box(0.3, 0.02, 0.02, solid(0x3a3c4d), 0.2, y, 0.505));
  }
  // slide-out drawer: a tray with a lid that folds up like a laptop
  const drawer = new THREE.Group();
  drawer.position.set(0, 0.26 + 6 * 0.235, 0);
  drawer.add(box(0.8, 0.05, 1.0, solid(0x1a1b25), 0, -0.065, -0.02), box(0.82, 0.19, 0.03, solid(0x2d2f3f), 0, 0, 0.485),
    box(0.34, 0.02, 0.02, neon(NEON.cyan, 1.8), 0, 0, 0.505), box(0.62, 0.008, 0.24, solid(0x2a2c3d), 0, -0.036, 0.22));
  const lid = new THREE.Group();
  lid.position.set(0, -0.025, -0.05);
  lid.add(box(0.76, 0.018, 0.48, solid(0x12131a), 0, 0, 0.24));
  const lcd = plane(0.72, 0.44, new THREE.MeshBasicMaterial({ color: 0x0a2a3c }), 0, -0.0095, 0.24);
  lcd.rotation.x = Math.PI / 2;
  lid.add(lcd);
  drawer.add(lid);
  g.add(drawer);
  world3d.surf.skills = { mesh: lcd, w: 0.72, h: 0.44 };
  world3d.drawerK = 0;
  world3d.setDrawer = (k) => { world3d.drawerK = k; drawer.position.z = 0.62 * k; lid.rotation.x = -1.71 * k; };

  return g;
}
function studyWall() {
  const g = new THREE.Group();
  g.add(box(3.3, 2.5, 0.14, solid(0x221a38), 0, 1.3, 0), box(3.3, 0.05, 0.05, neon(NEON.violet), 0, 2.58, 0.06));
  const certs = [...CONFIG.certifications.slice(0, 2), CONFIG.education[0]].filter(Boolean);
  certs.forEach((c, i) => {
    const x = (i - (certs.length - 1) / 2) * 1.02;
    const words = c.title.replace(/\s*\(.*?\)/, "").split(" ");
    const lines = words.length > 1 ? [words.slice(0, Math.ceil(words.length / 2)).join(" "), words.slice(Math.ceil(words.length / 2)).join(" ")] : words;
    g.add(box(0.92, 0.7, 0.04, solid(0xc9a24d, { metalness: 0.6, roughness: 0.3 }), x, 1.85, 0.08));
    g.add(plane(0.82, 0.6, new THREE.MeshBasicMaterial({ map: textTex(lines, { w: 512, h: 376, bg: "#f4eedd", fg: "#1d1b2a", font: "bold 60px Georgia, serif", sub: c.place.split(",")[0] + " · " + c.when }) }), x, 1.85, 0.105));
  });
  g.add(box(2.7, 0.06, 0.32, solid(0x3b2b4d), 0, 0.98, 0.2));
  const cols = [0xff4fa8, 0x4fe3ff, 0x8dff6a, 0xffb84f, 0xa98bff, 0xe8e2d0, 0xff6b5a, 0x4f8cff];
  let bx = -1.25;
  for (let i = 0; i < 13; i++) {
    const w = 0.07 + ((i * 37) % 5) * 0.012, h = 0.3 + ((i * 53) % 6) * 0.03;
    g.add(box(w, h, 0.22, solid(cols[i % cols.length]), bx + w / 2, 1.01 + h / 2, 0.2));
    bx += w + 0.012;
  }
  // graduation cap
  g.add(box(0.26, 0.12, 0.26, solid(0x101117), 0.95, 1.07, 0.2), box(0.46, 0.025, 0.46, solid(0x101117), 0.95, 1.145, 0.2).rotateY(0.5), box(0.02, 0.2, 0.02, neon(NEON.amber, 1.8), 1.14, 1.05, 0.34));
  return g;
}
function billboard() {
  const g = new THREE.Group(), dark = solid(0x101117), BW = 4.6, BH = 2.0, y = 3.45;
  g.add(box(BW, BH, 0.14, dark, 0, y, 0));   // wall-mounted board
  const pink = neon(NEON.pink);
  g.add(box(BW, 0.05, 0.05, pink, 0, y + BH / 2, 0.08), box(BW, 0.05, 0.05, pink, 0, y - BH / 2, 0.08), box(0.05, BH, 0.05, pink, -BW / 2, y, 0.08), box(0.05, BH, 0.05, pink, BW / 2, y, 0.08));
  const face = new THREE.MeshBasicMaterial({ color: 0x222233 });
  g.add(plane(1.5, 1.5, face, -1.4, y, 0.08));
  if (photoUrl()) new THREE.TextureLoader().setCrossOrigin("anonymous").load(photoUrl(), (t) => { t.colorSpace = THREE.SRGBColorSpace; face.map = t; face.color.set(0xffffff); face.needsUpdate = true; });
  // the whole name on one line, with the headline underneath
  const txt = plane(2.6, 1.5, new THREE.MeshBasicMaterial({ map: textTex([displayName().toUpperCase()], { w: 1040, h: 600, bg: "#0b0714", fg: "#ff6dbb", font: "bold 132px monospace", sub: CONFIG.headline }) }), 0.8, y, 0.08);
  txt.material.color.multiplyScalar(1.6);
  g.add(txt);
  const face3 = plane(BW - 0.15, BH - 0.15, new THREE.MeshBasicMaterial({ visible: false }), 0, y, 0.1);
  g.add(face3);
  world3d.surf.profile = { mesh: face3, w: BW - 0.15, h: BH - 0.15 };
  return g;
}
function streetLamp() {
  const g = new THREE.Group(), iron = solid(0x0e0f14);
  g.add(cyl(0.12, 0.16, 0.3, iron, 0, 0.15, 0), cyl(0.045, 0.06, 3.1, iron, 0, 1.85, 0), box(0.34, 0.42, 0.34, neon(NEON.amber, 2.8), 0, 3.6, 0), box(0.4, 0.04, 0.4, iron, 0, 3.38, 0));
  const cap = new THREE.Mesh(new THREE.ConeGeometry(0.33, 0.24, 4), iron);
  cap.position.y = 3.93; cap.rotation.y = Math.PI / 4;
  g.add(cap);
  return g;
}

// Where each prop stands: [x, z], its turn, the point the camera looks at
// (in the prop's own space), how far back the camera sits, where its tag floats
// and the size/centre of its invisible click box.
// ---- The house ----
// A square house you walk around. Each side shows something different:
//   side 1 (front): profile upstairs, education downstairs
//   side 2 (left):  projects upstairs, skills downstairs
//   side 3 (far):   contact downstairs, a spare room upstairs
//   side 4 (right): the back of the house, closed, with the lights on
// Every room runs the full width of its side of the house, with square corners.
// All walls are straight. The left rooms (skills, projects) run the full width of the
// house. The front and far rooms start at the wall they share with those rooms and run
// all the way to the back of the house. Where the two meet, the left rooms step in
// (they are shallower at their two ends) so the wall between them is short.
// Each side is built in the same "local" space (opening at z = +HALF) and then turned.
const HOUSE = { S: 14, D: 3.4, H: 3.6, T: 0.2 }, F0 = 0.1, F1 = F0 + HOUSE.H + HOUSE.T, TOP = F1 + HOUSE.H + HOUSE.T;
const HALF = HOUSE.S / 2, CORE = HALF - HOUSE.D;     // CORE = where each room's back wall stands; rooms run from x = -CORE to +CORE
const STEP = HOUSE.D / 2;                             // how far the left rooms step in at each end
const SIDE = { front: 0, left: -Math.PI / 2, far: Math.PI, back: Math.PI / 2 };
// turn a point given in a side's local space into a place in the world
const sidePos = (a, x, y, z) => new THREE.Vector3(x * Math.cos(a) + z * Math.sin(a), y, -x * Math.sin(a) + z * Math.cos(a));
const spot = (a, x, y, z, r, rest) => { const v = sidePos(a, x, y, z); return { p: [v.x, v.z], y: v.y, r: a + r, ...rest }; };

const SPOTS = {
  profile:   spot(SIDE.front, 0, F1 - 1.75, CORE + 0.15, 0, { focus: [0, 3.45, 0.1],  dist: 4.2, up: 0.2,  tag: [0, 4.85, 0.2], hit: [4.7, 2.2, 0.5, 0, 3.45, 0] }),
  education: spot(SIDE.front, 0, F0,        CORE + 0.12, 0, { focus: [0, 1.55, 0.1],  dist: 4.0, up: 0.2,  tag: [0, 3.0, 0.2], hit: [3.4, 2.7, 0.9, 0, 1.3, 0.15] }),
  projects:  spot(SIDE.left,  0, F1,        CORE + 1.0,  0, { focus: [0, 1.7, -0.26], dist: 3.1, up: 0.15, tag: [0, 2.6, 0],   hit: [2.6, 2.4, 2.0, 0, 1.2, 0.3] }),
  skills:    spot(SIDE.left,  0, F0,        CORE + 1.9,  0, { focus: [0, 1.95, 0.5],  dist: 4.6, up: 0.3,  tag: [0, 2.8, 0.9], hit: [1.1, 3.4, 1.1, 0, 1.7, 0] }),
  // the work experience room (upstairs, above contact): click anywhere in it
  experience: spot(SIDE.far, -0.75, F1,     CORE,        0, { focus: [0, 1.75, 0.9],  dist: 6.0, up: 0.2,  tag: [0, 0, 0],     hit: [12.0, 3.4, 3.2, 0, 1.7, 1.7] }),
  contact:   spot(SIDE.far,  -0.6, F0,      CORE + 1.5,  0.3, { focus: [0.5, 1.45, 0], dist: 5.0, up: 0.3, tag: [0, 3.3, 0],   hit: [1.3, 2.8, 1.3, 0, 1.35, 0] }),
};

// One room's floor: the full width of the side at the front. At a corner shared with a
// neighbouring room the edge runs along the diagonal; at a walled corner it is square.
// where the wall name plates hang: [side of the house, how far along the wall, height,
// how far out from the wall, width]
const POSTERS = {
  profile:   [SIDE.front, 0, F1 + 3.15, 0.06, 2.4],
  education: [SIDE.front, 0, F0 + 2.4, 0.23, 1.8],      // on the study wall, above the certificates
};
// Projects: a film-poster style sign (yellow outline lettering on a starfield).
function starPoster(names) {
  const t = canvasTex(512, 720, (x, w, h) => {
    x.fillStyle = "#000"; x.fillRect(0, 0, w, h);
    for (let i = 0; i < 260; i++) { x.fillStyle = `rgba(255,255,255,${0.3 + ((i * 37) % 70) / 100})`; x.fillRect((i * 193) % w, (i * 331) % h, 1 + (i % 3 === 0), 1 + (i % 3 === 0)); }
    x.textAlign = "center"; x.textBaseline = "middle";
    x.fillStyle = "#4bd5ee"; x.font = "26px Georgia, serif";
    x.fillText("Not so long ago, on a desk", w / 2, 70); x.fillText("not far away....", w / 2, 104);
    // the title: heavy, wide, hollow yellow letters
    x.lineJoin = "round"; x.strokeStyle = "#ffe81f"; x.lineWidth = 6; x.font = "900 112px Impact, 'Arial Black', sans-serif";
    x.strokeText("PROJECTS", w / 2, 290, w - 60);
    // the crawl: project names, growing as they come towards you
    x.fillStyle = "#ffe81f";
    names.slice(0, 5).forEach((n, i) => { const size = 22 + i * 7; x.font = `bold ${size}px Arial, sans-serif`; x.fillText(n, w / 2, 470 + i * (30 + i * 5), 150 + i * 80); });
    x.strokeStyle = "#ffe81f"; x.lineWidth = 6; x.strokeRect(10, 10, w - 20, h - 20);
  });
  const m = plane(1, 1, new THREE.MeshBasicMaterial({ map: t }));
  m.material.color.multiplyScalar(1.25);
  m.userData.w = 1.35; m.userData.h = 1.9; m.scale.set(1.35, 1.9, 1);
  return m;
}
// Skills: a mat on the server-room floor.
function floorMat(text, css) {
  const t = canvasTex(768, 288, (x, w, h) => {
    x.fillStyle = "#0b0f14"; x.beginPath(); x.roundRect(4, 4, w - 8, h - 8, 26); x.fill();
    x.strokeStyle = css; x.lineWidth = 10; x.beginPath(); x.roundRect(22, 22, w - 44, h - 44, 16); x.stroke();
    x.fillStyle = css; x.font = "900 150px Impact, 'Arial Black', sans-serif"; x.textAlign = "center"; x.textBaseline = "middle";
    x.fillText(text.toUpperCase().split("").join(" "), w / 2, h / 2 + 8, w - 110);
  });
  const m = plane(1, 1, new THREE.MeshBasicMaterial({ map: t }));
  m.material.color.multiplyScalar(1.3);
  m.rotation.x = -Math.PI / 2;                      // lying flat, readable from the open side of the room
  m.userData.w = 2.6; m.userData.h = 0.98; m.scale.set(2.6, 0.98, 1);
  return m;
}

function house() {
  const g = new THREE.Group(), { S, D, H, T } = HOUSE, tall = TOP - 0.1, mid = (TOP + 0.1) / 2, zc = HALF - D / 2;
  const shell = solid(0x3a3d66), trim = solid(0x4a4d78), frame = solid(0x0e0f16);
  g.add(box(S + 1.4, 0.1, S + 1.4, trim, 0, 0.05, 0), box(S, T, S, trim, 0, TOP - T / 2, 0));   // ground slab, ceiling
  g.add(box(2 * CORE, tall, 2 * CORE, shell, 0, mid, 0));                                       // the solid middle of the house

  // a lit window on an outside wall (the wall is at local z = HALF). It glows in the
  // colour of the room behind it, with a soft halo and a slow pulse.
  const haloTex = canvasTex(128, 128, (c) => { const gr = c.createRadialGradient(64, 64, 0, 64, 64, 64); gr.addColorStop(0, "rgba(255,255,255,.9)"); gr.addColorStop(0.4, "rgba(255,255,255,.28)"); gr.addColorStop(1, "rgba(255,255,255,0)"); c.fillStyle = gr; c.fillRect(0, 0, 128, 128); });
  world3d.windows = [];
  const addWindow = (grp, x, y, hex, size = 1.6) => {
    const mat = new THREE.MeshBasicMaterial({ color: new THREE.Color(hex).multiplyScalar(1.6) });
    world3d.windows.push({ mat, hex, ph: world3d.windows.length * 1.9 });
    const halo = new THREE.Sprite(new THREE.SpriteMaterial({ map: haloTex, color: hex, transparent: true, opacity: 0.22, depthWrite: false, blending: THREE.AdditiveBlending }));
    halo.position.set(x, y, HALF + 0.35); halo.scale.setScalar(size * 2.9);
    grp.add(plane(size, size, mat, x, y, HALF + 0.01), halo, box(size + 0.2, 0.1, 0.06, frame, x, y, HALF + 0.03), box(0.1, size + 0.2, 0.06, frame, x, y, HALF + 0.03), box(size + 0.4, 0.12, 0.16, trim, x, y - size / 2 - 0.12, HALF + 0.06));
  };

  // One open side of the house.
  // rooms: [floor height, room height, wall colour, floor colour, neon colour]
  // wide: the big left rooms. They run the full width of the house, full depth in the
  //       middle and stepping in (shallower by STEP) at their two ends.
  // shared: for the other sides, the end (-1 or +1) that borders the left rooms. The
  //         rooms start STEP past the middle there and run to the back of the house.
  const LEFT_LIGHTS = [0x9dff7a, 0x4fe3ff];
  const side = (a, rooms, { wide = false, shared = 0 } = {}) => {
    const sg = new THREE.Group(), END = HALF - T, IN = CORE + STEP;      // END: inside of the outer wall; IN: where the step is
    sg.rotation.y = a;
    sg.add(box(2 * CORE, tall, T, shell, 0, mid, CORE - T / 2));                                  // back wall
    if (wide) {
      for (const [y, h, wall, floor, glow] of rooms) {
        const paint = solid(wall, { roughness: 0.9 }), lay = solid(floor, { roughness: 1 });
        sg.add(box(2 * CORE - 2 * T, h, 0.04, paint, 0, y + h / 2, CORE + 0.02));                 // back wall of the deep middle part
        sg.add(box(2 * CORE, 0.03, D, lay, 0, y + 0.005, zc));
        if (y > F0) sg.add(box(2 * CORE, T, D, trim, 0, y - T / 2 - 0.01, zc), box(2 * END, 0.05, 0.05, neon(glow, 2), 0, y - T / 2, HALF));
        for (const sx of [-1, 1]) {
          const xm = (sx * (CORE + END)) / 2, ww = END - CORE, zz = (IN + T + HALF) / 2, dd = HALF - IN - T;   // one shallow end
          sg.add(box(ww, h, 0.04, paint, xm, y + h / 2, IN + T + 0.02));                          // its back wall
          sg.add(box(0.04, h, STEP + T, paint, sx * (CORE - T - 0.02), y + h / 2, CORE + (STEP + T) / 2));   // the side of the step
          sg.add(box(0.04, h, dd, paint, sx * (END - 0.02), y + h / 2, zz));                      // the end wall
          sg.add(box(ww, 0.03, dd, lay, xm, y + 0.005, zz));
          if (y > F0) sg.add(box(ww, T, dd, trim, xm, y - T / 2 - 0.01, zz));
        }
      }
      g.add(sg);
      return;
    }
    const e0 = shared === 1 ? -END : -IN, e1 = shared === -1 ? END : IN, w = e1 - e0, xc = (e0 + e1) / 2, open = -shared;
    const short = HALF - IN, sxm = (shared * (IN + HALF)) / 2;                                    // the short wall beside these rooms
    sg.add(box(T, tall, D, shell, shared * (IN + T / 2), mid, zc));                               // wall between these rooms and the left rooms
    sg.add(box(STEP, tall, T, shell, shared * (CORE + STEP / 2), mid, CORE - T / 2));             // back wall carried along to it
    sg.add(box(short, tall, T, shell, sxm, mid, HALF - T / 2));                                   // the (now short) end wall of the left rooms…
    addWindow(sg, sxm, F1 + 1.9, LEFT_LIGHTS[0], 1.0); addWindow(sg, sxm, F0 + 1.9, LEFT_LIGHTS[1], 1.0);   // …with a small window on each floor
    sg.add(box(D, tall, T, shell, (open * (CORE + HALF)) / 2, mid, CORE - T / 2));                // back wall carried on to the back of the house
    for (const [y, h, wall, floor, glow] of rooms) {
      const paint = solid(wall, { roughness: 0.9 });
      sg.add(box(w, h, 0.04, paint, xc, y + h / 2, CORE + 0.02));                                 // back wall, in the room's colour
      sg.add(box(0.04, h, D, paint, e0 + 0.02, y + h / 2, zc), box(0.04, h, D, paint, e1 - 0.02, y + h / 2, zc));   // both end walls to match
      if (y > F0) sg.add(box(w, T, D, trim, xc, y - T / 2 - 0.01, zc), box(w, 0.05, 0.05, neon(glow, 2), xc, y - T / 2, HALF));
      sg.add(box(w, 0.03, D, solid(floor, { roughness: 1 }), xc, y + 0.005, zc));                 // the whole floor, in the room's colour
    }
    g.add(sg);
  };
  side(SIDE.front, [[F0, H, 0x2c2050, 0x3d2c78, NEON.violet], [F1, H, 0x40183a, 0x66245a, NEON.pink]], { shared: -1 });   // education, profile
  side(SIDE.far,   [[F0, H, 0x4a2c16, 0x6a401e, NEON.amber],  [F1, H, 0x3a2418, 0x5a3a26, NEON.amber]], { shared: 1 });    // contact, work experience
  side(SIDE.left,  [[F0, H, 0x0f2c3a, 0x143f54, NEON.cyan],   [F1, H, 0x12351f, 0x1a4a2c, NEON.lime]], { wide: true });   // skills, projects (the big rooms)

  // the back of the house: one closed wall right across, four square windows, door in the middle
  const b = new THREE.Group(), z = HALF;
  b.rotation.y = SIDE.back;
  b.add(box(S, tall, T, shell, 0, mid, z - T / 2));
  // the left pair is next to the front rooms, the right pair next to the far rooms
  addWindow(b, -3.6, F1 + 1.9, 0xff5fb0); addWindow(b, -3.6, F0 + 1.9, 0xa98bff);
  addWindow(b, 3.6, F1 + 1.9, 0xff6b5a);  addWindow(b, 3.6, F0 + 1.9, 0xffb84f);
  b.add(box(1.4, 2.6, 0.1, solid(0x5a1820, { roughness: 0.5 }), 0, F0 + 1.3, z + 0.04), cyl(0.06, 0.06, 0.06, solid(0xe9c46a, { metalness: 0.8, roughness: 0.3 }), 0.5, F0 + 1.25, z + 0.11).rotateX(Math.PI / 2));
  b.add(box(0.3, 0.22, 0.2, neon(NEON.amber, 2.6), 0, F0 + 3.05, z + 0.12), box(2.2, 0.12, 0.8, trim, 0, F0 + 0.06, z + 0.45));
  g.add(b);

  // roof: four tiled slopes meeting at a point, plus a chimney
  const tiles = canvasTex(256, 256, (x) => {
    x.fillStyle = "#3a1733"; x.fillRect(0, 0, 256, 256);
    for (let r = 0; r < 4; r++) for (let c = -1; c < 4; c++) {
      const tx = c * 64 + (r % 2 ? 32 : 0), ty = r * 64, shade = 0.86 + ((r * 7 + c * 13) % 5) * 0.045;
      x.fillStyle = `rgb(${Math.round(150 * shade)},${Math.round(62 * shade)},${Math.round(128 * shade)})`;
      x.beginPath(); x.roundRect(tx + 3, ty + 2, 58, 56, [4, 4, 22, 22]); x.fill();
      x.fillStyle = "rgba(255,255,255,.14)"; x.fillRect(tx + 6, ty + 4, 52, 6);
    }
  });
  tiles.wrapS = tiles.wrapT = THREE.RepeatWrapping;
  const hb = HALF * 1.12, rh = 4.6, slope = Math.hypot(hb, rh), across = 11, rows = Math.round((across * slope) / (2 * hb));
  const pos = [], uv = [];
  for (let i = 0; i < 4; i++) {
    const a = (i * Math.PI) / 2, pt = (x, y, zz) => { const v = sidePos(a, x, y, zz); pos.push(v.x, v.y, v.z); };
    pt(-hb, 0, hb); pt(hb, 0, hb); pt(0, rh, 0);
    uv.push(0, 0, across, 0, across / 2, rows);
  }
  const rg = new THREE.BufferGeometry();
  rg.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
  rg.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));
  rg.computeVertexNormals();
  const roof = new THREE.Mesh(rg, new THREE.MeshStandardMaterial({ map: tiles, bumpMap: tiles, bumpScale: 1.2, roughness: 0.75, side: THREE.DoubleSide }));
  roof.position.y = TOP;
  g.add(roof, box(S * 1.12, 0.14, S * 1.12, trim, 0, TOP + 0.02, 0), box(0.9, 2.4, 0.9, shell, 3.2, TOP + 2.2, -2.2), box(1.1, 0.14, 1.1, trim, 3.2, TOP + 3.42, -2.2));
  return g;
}

/* ----- Furniture, pets and extra kit that make the rooms feel lived in ----- */
function rackSimple(seed = 0) {
  const g = new THREE.Group();
  g.add(box(0.98, 2.3, 0.98, solid(0x101117), 0, 1.15, 0));
  for (let i = 0; i < 9; i++) {
    const y = 0.26 + i * 0.235;
    g.add(box(0.82, 0.19, 0.03, solid(0x23242f), 0, y, 0.485), box(0.3, 0.02, 0.02, solid(0x3a3c4d), 0.2, y, 0.505));
    for (let j = 0; j < 4; j++) g.add(box(0.045, 0.045, 0.02, ledFor(i, j, seed + 1), -0.3 + j * 0.09, y, 0.505));
  }
  return g;
}
function bookcase(w = 2.4) {
  const g = new THREE.Group(), wood = solid(0x3b2b4d);
  g.add(box(w, 2.7, 0.3, wood, 0, 1.35, 0));
  const cols = [0xff4fa8, 0x4fe3ff, 0x8dff6a, 0xffb84f, 0xa98bff, 0xe8e2d0, 0xff6b5a, 0x4f8cff, 0x7a1420, 0x2f6f5e];
  for (let r = 0; r < 4; r++) {
    const y = 0.2 + r * 0.62;
    g.add(box(w, 0.05, 0.42, wood, 0, y, 0.06));
    for (let x = -w / 2 + 0.1, i = r * 5; x < w / 2 - 0.16; i++) {
      const bw = 0.07 + ((i * 37) % 5) * 0.013, bh = 0.32 + ((i * 53) % 6) * 0.035;
      g.add(box(bw, bh, 0.22, solid(cols[(i * 7 + r) % cols.length]), x + bw / 2, y + 0.025 + bh / 2, 0.14));
      x += bw + 0.012;
    }
  }
  return g;
}
function beanBag(hex) {
  const g = new THREE.Group(), m = solid(hex, { roughness: 1, flatShading: false });
  const body = new THREE.Mesh(new THREE.SphereGeometry(0.55, 18, 12), m); body.scale.set(1, 0.62, 1); body.position.y = 0.33;
  const top = new THREE.Mesh(new THREE.SphereGeometry(0.36, 16, 10), m); top.scale.set(1, 0.7, 1); top.position.set(0, 0.55, -0.12);
  g.add(body, top);
  return g;
}
function bed() {
  const g = new THREE.Group(), wood = solid(0x4a3320);
  g.add(box(1.5, 0.3, 2.2, wood, 0, 0.2, 0), box(1.5, 0.95, 0.12, wood, 0, 0.55, -1.1), box(1.4, 0.2, 2.1, solid(0xf2efe6, { roughness: 1 }), 0, 0.45, 0));
  g.add(box(1.0, 0.13, 0.42, solid(0xffffff, { roughness: 1 }), 0, 0.61, -0.78), box(1.44, 0.1, 1.3, solid(0x2f8f5a, { roughness: 1 }), 0, 0.58, 0.38));
  return g;
}
function catTree() {
  const g = new THREE.Group(), carpet = solid(0xcdbb9a, { roughness: 1 }), rope = solid(0xa8854f, { roughness: 1, flatShading: false });
  g.add(box(0.8, 0.06, 0.8, carpet, 0, 0.03, 0), box(0.5, 0.42, 0.5, carpet, -0.12, 0.27, -0.12), cyl(0.07, 0.07, 1.6, rope, 0.22, 0.85, 0.22, 12));
  g.add(box(0.62, 0.05, 0.62, carpet, 0.1, 0.9, 0.1), box(0.6, 0.06, 0.6, carpet, 0.22, 1.66, 0.22), cyl(0.05, 0.05, 0.5, rope, -0.12, 0.72, -0.12, 10));
  return g;
}
function cat(hex = 0xe08a3c) {
  const g = new THREE.Group(), fur = solid(hex, { roughness: 1 }), dark = solid(0x1a1a1a);
  g.add(box(0.2, 0.2, 0.4, fur, 0, 0.14, 0), box(0.19, 0.17, 0.17, fur, 0, 0.3, 0.2), box(0.06, 0.06, 0.03, solid(0xf7c9a0), 0, 0.27, 0.29));
  for (const sx of [-1, 1]) {
    const ear = new THREE.Mesh(new THREE.ConeGeometry(0.045, 0.09, 4), fur); ear.position.set(sx * 0.06, 0.42, 0.2);
    g.add(ear, box(0.025, 0.03, 0.01, dark, sx * 0.05, 0.32, 0.287), box(0.05, 0.12, 0.06, fur, sx * 0.06, 0.06, 0.14));
  }
  // tail: hinged where it meets the back of the body, so it is always joined on
  const tail = new THREE.Group();
  tail.position.set(0, 0.2, -0.19);
  tail.add(box(0.045, 0.045, 0.32, fur, 0, 0, -0.15));
  tail.rotation.x = 1.0;
  g.add(tail);
  return g;
}
function dog(hex = 0xc9973f) {
  const g = new THREE.Group(), fur = solid(hex, { roughness: 1 }), dark = solid(0x3a2a18, { roughness: 1 }), black = solid(0x111111);
  g.add(box(0.3, 0.24, 0.62, fur, 0, 0.14, 0), box(0.24, 0.22, 0.24, fur, 0, 0.24, 0.42), box(0.14, 0.11, 0.14, fur, 0, 0.19, 0.58), box(0.05, 0.04, 0.03, black, 0, 0.22, 0.655));
  for (const sx of [-1, 1]) g.add(box(0.06, 0.16, 0.1, dark, sx * 0.14, 0.26, 0.4), box(0.02, 0.03, 0.01, black, sx * 0.06, 0.29, 0.545), box(0.08, 0.06, 0.24, fur, sx * 0.13, 0.04, 0.34), box(0.08, 0.06, 0.2, fur, sx * 0.16, 0.04, -0.22));
  const tail = new THREE.Group();
  tail.position.set(0, 0.2, -0.3);
  tail.add(box(0.05, 0.05, 0.28, fur, 0, 0, -0.13));
  tail.rotation.set(0.5, 0.5, 0);
  g.add(tail);
  return g;
}
function dogBed() {
  const g = new THREE.Group();
  g.add(cyl(0.62, 0.66, 0.16, solid(0x6b4a2f, { roughness: 1, flatShading: false }), 0, 0.08, 0, 24), cyl(0.5, 0.5, 0.17, solid(0xd9c7a3, { roughness: 1, flatShading: false }), 0, 0.085, 0, 24));
  const d = dog(); d.position.y = 0.16; d.rotation.y = 0.5;
  g.add(d);
  return g;
}
function sofa(hex) {
  const g = new THREE.Group(), m = solid(hex, { roughness: 1 });
  g.add(box(2.4, 0.45, 0.95, m, 0, 0.3, 0), box(2.4, 0.75, 0.25, m, 0, 0.85, -0.4), box(0.25, 0.7, 0.95, m, -1.2, 0.45, 0), box(0.25, 0.7, 0.95, m, 1.2, 0.45, 0));
  return g;
}
function floorLamp(hex) {
  const g = new THREE.Group(), iron = solid(0x14151d);
  g.add(cyl(0.18, 0.2, 0.04, iron, 0, 0.02, 0, 16), cyl(0.025, 0.025, 1.7, iron, 0, 0.87, 0, 8), cyl(0.18, 0.26, 0.34, neon(hex, 2.2), 0, 1.85, 0, 16));
  return g;
}
function plant() {   // a pot of tulips, stems straight up
  const g = new THREE.Group(), green = solid(0x2f8f5a, { roughness: 1, flatShading: false, emissive: 0x1f7a3c, emissiveIntensity: 0.7 });   // glows a little so it stays green under coloured light
  g.add(cyl(0.24, 0.18, 0.36, solid(0xb5651d, { roughness: 1 }), 0, 0.18, 0, 14), cyl(0.22, 0.22, 0.03, solid(0x3a2a18, { roughness: 1 }), 0, 0.35, 0, 14));
  const blooms = [0xff4f7d, 0xffc14d, 0xff6b5a, 0xf7f2e6, 0xb46bff];
  [[0, 0, 0.78], [0.11, 0.05, 0.62], [-0.1, 0.07, 0.68], [0.04, -0.11, 0.56], [-0.07, -0.08, 0.72]].forEach(([x, z, h], i) => {
    const petal = solid(blooms[i], { roughness: 0.8, flatShading: false, emissive: blooms[i], emissiveIntensity: 0.45 });
    g.add(cyl(0.012, 0.014, h, green, x, 0.36 + h / 2, z, 6));                        // stem
    g.add(cyl(0.062, 0.03, 0.12, petal, x, 0.36 + h + 0.05, z, 8));                    // cup of the flower
    const tip = new THREE.Mesh(new THREE.ConeGeometry(0.062, 0.07, 8), petal); tip.position.set(x, 0.36 + h + 0.145, z); g.add(tip);
    const leaf = box(0.045, h * 0.42, 0.012, green, x + 0.028, 0.36 + h * 0.21, z); leaf.rotation.y = i * 1.3; g.add(leaf);
  });
  return g;
}
// Rooms are HOUSE.S wide. In a side's local space x runs -HALF…HALF along the room and
// z runs from CORE (back wall) to HALF (the open front).
/* ----- Work experience: one little scene per job on the CV ----- */
const wood = (hex = 0x6b4a2f) => solid(hex, { roughness: 0.85 });
const metal = (hex = 0xb8c0cc) => solid(hex, { metalness: 0.7, roughness: 0.35, flatShading: false });

// Deck hand on ocean-going yachts: ship's wheel, life ring, anchor, coiled rope
function deckHand() {
  const g = new THREE.Group(), brass = metal(0xc9a24d), teak = wood(0x8a5a2b);
  const wheel = new THREE.Group();
  wheel.add(new THREE.Mesh(new THREE.TorusGeometry(0.42, 0.045, 8, 28), teak), cyl(0.09, 0.09, 0.09, brass, 0, 0, 0, 14).rotateX(Math.PI / 2));
  for (let i = 0; i < 8; i++) { const sp = box(0.04, 1.12, 0.04, teak); sp.rotation.z = (i * Math.PI) / 8; wheel.add(sp); }
  wheel.position.set(-0.55, 2.05, 0.09);
  const ring = new THREE.Group();
  for (let i = 0; i < 8; i++) { const seg = new THREE.Mesh(new THREE.TorusGeometry(0.28, 0.085, 10, 8, Math.PI / 4), solid(i % 2 ? 0xf2efe6 : 0xd6281e, { flatShading: false })); seg.rotation.z = (i * Math.PI) / 4; ring.add(seg); }
  ring.position.set(0.55, 2.0, 0.1);
  const anchor = new THREE.Group(), iron = metal(0x3a3f4a);
  anchor.add(box(0.08, 0.95, 0.08, iron, 0, 0.6, 0), box(0.55, 0.06, 0.06, iron, 0, 0.98, 0));
  const top = new THREE.Mesh(new THREE.TorusGeometry(0.09, 0.025, 6, 14), iron); top.position.y = 1.15;
  const arms = new THREE.Mesh(new THREE.TorusGeometry(0.32, 0.04, 6, 18, Math.PI), iron); arms.rotation.z = Math.PI; arms.position.y = 0.42;
  anchor.add(top, arms);
  for (const sx of [-1, 1]) { const f = new THREE.Mesh(new THREE.ConeGeometry(0.07, 0.18, 4), iron); f.position.set(sx * 0.32, 0.48, 0); anchor.add(f); }
  anchor.position.set(-0.4, 0, 0.55); anchor.rotation.y = 0.4;
  const rope = new THREE.Group(), hemp = solid(0xc8a878, { roughness: 1, flatShading: false });
  for (let i = 0; i < 4; i++) { const t = new THREE.Mesh(new THREE.TorusGeometry(0.26 - i * 0.03, 0.035, 6, 20), hemp); t.rotation.x = Math.PI / 2; t.position.y = 0.04 + i * 0.065; rope.add(t); }
  rope.position.set(0.55, 0, 0.75);
  g.add(wheel, ring, anchor, rope);
  return g;
}
// A Boston shaker: a big brushed-steel tin that narrows towards its base, with a
// smaller tin pushed into its mouth at a slight angle. Built along its own y axis,
// base at y = 0, about 28 cm tall.
function bostonShaker() {
  const g = new THREE.Group(), steel = new THREE.MeshStandardMaterial({ color: 0xc9cdd3, metalness: 0.85, roughness: 0.32 });
  g.add(new THREE.Mesh(new THREE.CylinderGeometry(0.058, 0.044, 0.19, 28), steel).translateY(0.095));      // big tin
  const small = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.052, 0.12, 28), steel);                   // small tin, set in at an angle
  small.position.set(0.004, 0.235, 0); small.rotation.z = -0.07;
  g.add(small, new THREE.Mesh(new THREE.TorusGeometry(0.057, 0.003, 6, 28), steel).rotateX(Math.PI / 2).translateZ(-0.19));   // rim of the big tin
  return g;
}

// The bartender: a simple blocky figure (like the cat and dog) in a white shirt and black
// waistcoat with a red bow tie, shaking the Boston shaker over the bar. Faces +z.
function bartender() {
  const g = new THREE.Group(), skin = solid(0xe0b48f, { roughness: 0.8 }), shirt = solid(0xf2f2f5), black = solid(0x17181d), hair = solid(0x3a2614, { roughness: 1 });
  for (const sx of [-1, 1]) g.add(box(0.13, 0.86, 0.15, black, sx * 0.08, 0.43, 0), box(0.14, 0.06, 0.22, solid(0x0b0b0d), sx * 0.08, 0.03, 0.03));   // legs, shoes
  g.add(box(0.38, 0.56, 0.22, shirt, 0, 1.14, 0));                                         // shirt
  g.add(box(0.36, 0.5, 0.02, black, 0, 1.12, 0.112), box(0.11, 0.22, 0.021, shirt, 0, 1.28, 0.113));   // waistcoat with the shirt showing at the neck
  for (let i = 0; i < 3; i++) g.add(box(0.018, 0.018, 0.01, solid(0xc9a24d), 0, 1.13 - i * 0.09, 0.124));   // waistcoat buttons
  g.add(box(0.1, 0.035, 0.02, solid(0xc8102e), 0, 1.385, 0.12));                          // bow tie
  g.add(cyl(0.05, 0.055, 0.07, skin, 0, 1.45, 0, 10), box(0.2, 0.24, 0.21, skin, 0, 1.6, 0));   // neck, head
  g.add(box(0.215, 0.07, 0.225, hair, 0, 1.73, -0.005), box(0.215, 0.16, 0.05, hair, 0, 1.64, -0.09));   // hair
  for (const sx of [-1, 1]) g.add(box(0.03, 0.025, 0.01, solid(0x1a1a1a), sx * 0.05, 1.62, 0.106));       // eyes
  g.add(box(0.07, 0.015, 0.01, solid(0xa0574a), 0, 1.53, 0.106));                          // a little smile

  // the shaker, two hands and two arms (each arm a sleeve stretched from shoulder to hand every frame)
  const shaker = bostonShaker();
  const hands = [0, 1].map(() => new THREE.Mesh(new THREE.SphereGeometry(0.042, 10, 8), skin));
  const arms = [0, 1].map(() => new THREE.Mesh(new THREE.BoxGeometry(0.085, 0.085, 1), shirt));
  g.add(shaker, ...hands, ...arms);
  const shoulders = [new THREE.Vector3(-0.21, 1.37, 0), new THREE.Vector3(0.21, 1.37, 0)];   // his right, his left
  const axis = new THREE.Vector3(0.5, 0.82, 0.28).normalize(), up = new THREE.Vector3(0, 1, 0), fwd = new THREE.Vector3(0, 0, 1);
  const centre = new THREE.Vector3(), handPos = [new THREE.Vector3(), new THREE.Vector3()], dir = new THREE.Vector3();
  const tilt = new THREE.Quaternion().setFromUnitVectors(up, axis), wobble = new THREE.Quaternion(), side = new THREE.Vector3(1, 0, -0.4).normalize();
  g.userData.update = (t) => {
    const k = Math.sin(t * 15);                                                            // a brisk shake, back and forth
    centre.set(0.02, 1.36, 0.3).addScaledVector(axis, k * 0.07).add(dir.set(0, Math.abs(k) * 0.015, 0));
    wobble.setFromAxisAngle(side, k * 0.12);
    shaker.quaternion.copy(wobble).multiply(tilt);
    const a = up.clone().applyQuaternion(shaker.quaternion);
    shaker.position.copy(centre).addScaledVector(a, -0.13);
    handPos[0].copy(centre).addScaledVector(a, -0.07);                                     // right hand round the big tin
    handPos[1].copy(centre).addScaledVector(a, 0.13);                                      // left hand over the small tin
    hands.forEach((h, i) => h.position.copy(handPos[i]));
    arms.forEach((arm, i) => {
      dir.subVectors(handPos[i], shoulders[i]);
      const len = dir.length();
      arm.position.copy(shoulders[i]).addScaledVector(dir, 0.5);
      arm.quaternion.setFromUnitVectors(fwd, dir.normalize());
      arm.scale.set(1, 1, len);
    });
  };
  g.userData.update(0);
  world3d.bartender = g;
  return g;
}

// Bartender (steakhouse and freelance events): bar counter, bottles, glasses, shaker, stools
function barStation() {
  const g = new THREE.Group(), bottle = (hex, x, y, z, h = 0.3) => {
    // a real bottle shape (turned on a lathe): straight body, rounded shoulder, long neck, a lip and a cap
    const m = new THREE.MeshStandardMaterial({ color: hex, roughness: 0.12, metalness: 0, transparent: true, opacity: 0.82 });
    const body = h * 0.62, pts = [[0, 0], [0.046, 0], [0.05, 0.01], [0.05, body], [0.044, body + 0.03], [0.026, body + 0.06], [0.017, body + 0.085], [0.016, h + 0.06], [0.019, h + 0.065], [0.019, h + 0.075], [0, h + 0.075]];
    const b = new THREE.Mesh(new THREE.LatheGeometry(pts.map(([r, yy]) => new THREE.Vector2(r, yy)), 28), m);
    b.position.set(x, y, z);
    g.add(b, cyl(0.02, 0.02, 0.03, solid(0x2a2a2f, { metalness: 0.6, roughness: 0.4 }), x, y + h + 0.085, z));          // cap
    g.add(box(0.06, h * 0.28, 0.005, solid(0xf2ead8), x, y + body * 0.55, z + 0.049));                                // label
  };
  g.add(box(2.0, 0.08, 0.3, wood(0x3b2a1e), 0, 1.35, 0.15), box(2.0, 0.08, 0.3, wood(0x3b2a1e), 0, 1.85, 0.15));   // shelves on the wall
  [0x2f8f5a, 0xc9a24d, 0x7a1420, 0xe8e2d0, 0x4f8cff, 0xffb84f, 0x2f8f5a].forEach((hex, i) => bottle(hex, -0.85 + i * 0.28, 1.39, 0.15, 0.24 + (i % 3) * 0.05));
  [0xd6281e, 0xffe08a, 0x6b4a2f, 0x9dd3ff, 0xb46bff].forEach((hex, i) => bottle(hex, -0.7 + i * 0.35, 1.89, 0.15));
  g.add(box(2.1, 1.0, 0.55, wood(0x4a2f1c), 0, 0.5, 0.95), box(2.25, 0.07, 0.7, wood(0x2a1a10), 0, 1.03, 0.95), box(2.1, 0.03, 0.02, neon(NEON.amber, 1.6), 0, 0.15, 1.23));
  const glass = new THREE.MeshStandardMaterial({ color: 0xdff4ff, transparent: true, opacity: 0.45, roughness: 0.1 });
  for (const x of [-0.6, -0.4]) g.add(cyl(0.05, 0.04, 0.13, glass, x, 1.13, 0.95, 12));
  // a whiskey old fashioned: short heavy glass, whiskey, one big ice cube, orange peel and a cherry
  const ofx = 0.15, ofz = 0.95, top = 1.068;
  const whiskey = new THREE.MeshStandardMaterial({ color: 0xd0761e, emissive: 0xa0500a, emissiveIntensity: 0.9, roughness: 0.2 });
  const rocks = new THREE.MeshStandardMaterial({ color: 0xffffff, transparent: true, opacity: 0.18, roughness: 0.05, depthWrite: false });   // clear glass, so the whiskey shows
  const ice = new THREE.MeshStandardMaterial({ color: 0xe8f6ff, roughness: 0.1, transparent: true, opacity: 0.7 });
  g.add(cyl(0.068, 0.068, 0.018, rocks, ofx, top + 0.009, ofz, 18));                         // thick base
  g.add(cyl(0.06, 0.06, 0.055, whiskey, ofx, top + 0.045, ofz, 18));                         // the whiskey
  g.add(box(0.05, 0.05, 0.05, ice, ofx, top + 0.085, ofz).rotateY(0.4));                  // big ice cube
  g.add(cyl(0.07, 0.068, 0.105, rocks, ofx, top + 0.0525, ofz, 18));                         // the glass
  const peel = box(0.11, 0.012, 0.026, solid(0xff8a1e, { roughness: 0.6 }), ofx + 0.035, top + 0.11, ofz + 0.01);
  peel.rotation.set(0.2, 0.5, -0.5);                                                         // orange peel resting on the rim
  const cherry = new THREE.Mesh(new THREE.SphereGeometry(0.018, 10, 8), solid(0x8a0a1a, { roughness: 0.3, flatShading: false }));
  cherry.position.set(ofx - 0.02, top + 0.09, ofz + 0.01);
  g.add(peel, cherry);
  const barman = bartender();                                                                // the bartender, shaking a cocktail behind the bar
  barman.position.set(0.3, 0, 0.4);
  g.add(barman);
  for (const x of [-0.6, 0.6]) g.add(cyl(0.2, 0.2, 0.06, solid(0x7a1420), x, 0.78, 1.55, 16), cyl(0.03, 0.03, 0.75, metal(0x2a2a2f), x, 0.38, 1.55, 8), cyl(0.18, 0.18, 0.02, metal(0x2a2a2f), x, 0.01, 1.55, 14));
  return g;
}
// A Cisco Catalyst 3750-48TS: 1U, rack-mountable, 48 x 10/100 ports + 4 SFP slots.
// The front panel is drawn on a canvas (logo, port blocks, SFP cages) and its port
// lights are redrawn every tenth of a second so they blink like a live switch.
// y = height of its middle, z = how far it sits from the wall.
function ciscoSwitch(y, z) {
  const g = new THREE.Group(), W = 0.88, H = 0.08, D = 0.42, CW = 1100, CH = 100;
  const canvas = document.createElement("canvas");
  canvas.width = CW; canvas.height = CH;
  const c = canvas.getContext("2d"), tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace; tex.anisotropy = 8;
  // the 48 copper ports: 4 blocks of 12 (6 across, 2 high), then 4 SFP cages
  const ports = [];
  for (let blk = 0; blk < 4; blk++) for (let col = 0; col < 6; col++) for (let row = 0; row < 2; row++) {
    const n = ports.length;
    ports.push({ x: 222 + blk * 182 + col * 28, y: row ? 56 : 16, used: (n * 7) % 9 < 5,   /* a little over half the ports are in use */ speed: 1.5 + ((n * 37) % 11) / 3, phase: ((n * 53) % 17) / 17 });
  }
  const sfps = [[960, 18], [1022, 18], [960, 56], [1022, 56]];
  const draw = (t) => {
    const gr = c.createLinearGradient(0, 0, 0, CH); gr.addColorStop(0, "#5a646d"); gr.addColorStop(0.5, "#3d454c"); gr.addColorStop(1, "#2b3136");
    c.fillStyle = gr; c.fillRect(0, 0, CW, CH);
    c.fillStyle = "rgba(255,255,255,.18)"; c.fillRect(0, 0, CW, 2); c.fillStyle = "rgba(0,0,0,.45)"; c.fillRect(0, CH - 2, CW, 2);
    // the Cisco bridge logo and the model name
    c.fillStyle = "#e9eef2";
    [5, 9, 13, 9, 5, 9, 13, 9, 5].forEach((h, i) => c.fillRect(22 + i * 6, 24 - h, 3, h));
    c.font = "bold 20px Arial, sans-serif"; c.fillText("cisco", 22, 46);
    c.font = "11px Arial, sans-serif"; c.fillStyle = "#cfd6dc"; c.fillText("Catalyst 3750 Series", 22, 62);
    c.font = "9px Arial, sans-serif"; c.fillStyle = "#aab3ba"; c.fillText("WS-C3750-48TS", 22, 75);
    // status lights (SYST, RPS, MASTR, STAT, DUPLX, SPEED, STACK) and the MODE button
    ["#5dff6a", "#2a2f33", "#5dff6a", "#5dff6a", "#2a2f33", "#2a2f33", "#5dff6a"].forEach((col, i) => { c.fillStyle = col; c.fillRect(124 + (i % 4) * 14, 30 + Math.floor(i / 4) * 16, 7, 4); });
    c.fillStyle = "#1c2024"; c.beginPath(); c.arc(184, 78, 7, 0, 7); c.fill(); c.strokeStyle = "#8a949c"; c.lineWidth = 1.5; c.stroke();
    // copper ports, each with its link light
    for (const pt of ports) {
      c.fillStyle = "#9aa3ab"; c.fillRect(pt.x - 1, pt.y - 1, 24, 26);
      c.fillStyle = "#0c0e10"; c.fillRect(pt.x, pt.y, 22, 24);
      c.fillStyle = "#23282c"; c.fillRect(pt.x + 7, pt.row ? pt.y + 18 : pt.y + 18, 8, 5);   // the clip notch
      const on = pt.used && (t * pt.speed + pt.phase) % 1 < 0.72;
      c.fillStyle = !pt.used ? "#2a2f33" : on ? "#6dff70" : "#1f4a24";
      c.fillRect(pt.x + 2, pt.y + 2, 5, 3);
    }
    for (let b = 1; b < 4; b++) { c.fillStyle = "rgba(255,255,255,.12)"; c.fillRect(209 + b * 182, 12, 1, 74); }
    c.font = "9px Arial, sans-serif"; c.fillStyle = "#cfd6dc";
    [1, 13, 25, 37].forEach((n, b) => c.fillText(`${n}X`, 222 + b * 182, 11));
    // the four SFP cages on the right
    sfps.forEach(([x, yy], i) => {
      c.fillStyle = "#b8c0c7"; c.fillRect(x - 2, yy - 2, 52, 28);
      c.fillStyle = "#0c0e10"; c.fillRect(x, yy, 48, 24);
      c.fillStyle = "#3a4045"; c.fillRect(x + 4, yy + 8, 40, 8);
      c.fillStyle = i < 2 && (t * 2.3 + i * 0.4) % 1 < 0.8 ? "#6dff70" : "#2a2f33"; c.fillRect(x + 20, yy + 2, 8, 3);
    });
    c.fillStyle = "#cfd6dc"; c.fillText("1", 948, 32); c.fillText("2", 1078, 32); c.fillText("3", 948, 70); c.fillText("4", 1078, 70);
    tex.needsUpdate = true;
  };
  draw(0);
  world3d.cisco = { draw, next: 0 };

  const chassis = solid(0x3b4248, { metalness: 0.5, roughness: 0.45 });
  g.add(box(W, H, D, chassis, 0, y, z));
  g.add(plane(W, H, new THREE.MeshBasicMaterial({ map: tex }), 0, y, z + D / 2 + 0.002));
  for (const sx of [-1, 1]) g.add(box(0.04, H, 0.004, metal(0x8f979e), sx * (W / 2 + 0.02), y, z + D / 2 + 0.002));   // rack-mount ears
  // RJ45 plugs (male) in every port that is in use: a clear plug with a coloured boot, no cable
  const toLocal = (px, py) => [(px / CW - 0.5) * W, y + (0.5 - py / CH) * H];
  const clearPlug = new THREE.MeshStandardMaterial({ color: 0xe8f4ff, roughness: 0.15, transparent: true, opacity: 0.75 });
  const boots = [0x2f6fd6, 0x2f6fd6, 0xffd23f, 0x2f6fd6, 0xd6281e, 0x8a8f96].map((hex) => solid(hex, { roughness: 0.6 }));
  ports.forEach((pt, i) => {
    if (!pt.used) return;
    const [x, yy] = toLocal(pt.x + 11, pt.y + 13), front = z + D / 2;
    g.add(box(0.016, 0.0125, 0.022, clearPlug, x, yy, front + 0.011), box(0.019, 0.016, 0.026, boots[(i * 5) % boots.length], x, yy, front + 0.034));
  });
  return g;
}

// AV junior technician: speakers, a network switch, a ceiling access point, a cable reel
function avTech() {
  const g = new THREE.Group(), black = solid(0x15161c), cone = solid(0x2a2b33, { flatShading: false });
  world3d.woofers = [];
  const speaker = (x, r) => {
    const sp = new THREE.Group(), woofer = cyl(0.15, 0.15, 0.03, cone, 0, 0.35, 0.215, 18).rotateX(Math.PI / 2);
    sp.add(box(0.5, 0.95, 0.42, black, 0, 0.475, 0), woofer, cyl(0.07, 0.07, 0.03, cone, 0, 0.75, 0.215, 14).rotateX(Math.PI / 2));
    sp.position.set(x, 0, 0.45); sp.rotation.y = r; g.add(sp);
    world3d.woofers.push(woofer);                                                               // pumps in time with the music
  };
  speaker(-0.75, 0.25); speaker(0.75, -0.25);
  g.add(box(1.0, 0.75, 0.5, solid(0x23242f), 0, 0.375, 0.3));                                   // small cabinet
  g.add(ciscoSwitch(0.79, 0.3));                                                               // Cisco Catalyst 3750-48TS on the cabinet
  const ap = new THREE.Group();                                                                 // wifi access point on the wall
  ap.add(cyl(0.22, 0.22, 0.05, solid(0xf2f2f5, { flatShading: false }), 0, 0, 0, 24), new THREE.Mesh(new THREE.TorusGeometry(0.17, 0.012, 6, 30), neon(NEON.cyan, 2.2)).translateY(0.03).rotateX(Math.PI / 2));
  ap.rotation.x = Math.PI / 2; ap.position.set(-0.95, 2.3, 0.05); g.add(ap);

  // a TV on the wall between the speakers, showing a music visualiser (redrawn every frame)
  const tvCanvas = document.createElement("canvas");
  tvCanvas.width = 256; tvCanvas.height = 144;
  const tvTex = new THREE.CanvasTexture(tvCanvas);
  tvTex.colorSpace = THREE.SRGBColorSpace;
  g.add(box(1.18, 0.7, 0.06, black, 0, 1.5, 0.05), box(0.3, 0.04, 0.04, black, 0, 1.13, 0.03));
  const tvScreen = plane(1.1, 0.62, new THREE.MeshBasicMaterial({ map: tvTex }), 0, 1.5, 0.085);
  tvScreen.material.color.multiplyScalar(1.15);
  g.add(tvScreen);
  world3d.tv = { ctx: tvCanvas.getContext("2d"), tex: tvTex, w: 256, h: 144 };

  // music notes that float up out of the speakers, sway, and fade away
  const noteTex = (ch) => canvasTex(64, 64, (x) => { x.fillStyle = "#fff"; x.font = "bold 50px Georgia, serif"; x.textAlign = "center"; x.textBaseline = "middle"; x.fillText(ch, 32, 34); });
  const shapes = [noteTex("\u266A"), noteTex("\u266B")], tints = [NEON.cyan, NEON.pink, NEON.lime, NEON.amber];
  world3d.notes = [];
  for (const sx of [-1, 1]) for (let i = 0; i < 4; i++) {
    const sp = new THREE.Sprite(new THREE.SpriteMaterial({ map: shapes[(i + (sx > 0)) % 2], color: new THREE.Color(tints[(i + (sx > 0 ? 2 : 0)) % 4]).multiplyScalar(1.3), transparent: true, depthWrite: false, opacity: 0 }));
    sp.userData = { x0: sx * 0.72, ph: i / 4 + (sx > 0 ? 0.13 : 0), sway: sx };
    sp.scale.setScalar(0.2);
    g.add(sp);
    world3d.notes.push(sp);
  }
  const reel = new THREE.Group(), blue = solid(0x2f6fd6, { flatShading: false });
  reel.add(cyl(0.26, 0.26, 0.03, wood(0xb98a54), 0, 0, -0.16, 20), cyl(0.26, 0.26, 0.03, wood(0xb98a54), 0, 0, 0.16, 20), cyl(0.18, 0.18, 0.3, blue, 0, 0, 0, 20));
  reel.children.forEach((c) => c.rotateX(Math.PI / 2));
  reel.rotation.y = Math.PI / 2; reel.position.set(0.15, 0.26, 1.05); g.add(reel);
  return g;
}
// Builder apprentice: step ladder, paint tin and roller, toolbox, a smart bulb
function builder() {
  const g = new THREE.Group(), alu = metal(0xc8ccd4);
  const ladder = new THREE.Group();
  for (const sz of [-1, 1]) for (const sx of [-1, 1]) { const rail = box(0.05, 1.7, 0.05, alu, sx * 0.25, 0.82, sz * 0.22); rail.rotation.x = sz * -0.17; ladder.add(rail); }
  for (let i = 0; i < 4; i++) ladder.add(box(0.5, 0.03, 0.14, alu, 0, 0.3 + i * 0.4, 0.24 - i * 0.055));
  ladder.add(box(0.56, 0.05, 0.22, solid(0xd6281e), 0, 1.66, 0));
  ladder.position.set(-0.6, 0, 0.55); ladder.rotation.y = 0.35; g.add(ladder);
  g.add(cyl(0.13, 0.13, 0.2, metal(0xd0d4da), 0.35, 0.1, 0.9, 16), cyl(0.12, 0.12, 0.01, solid(0x4fe3ff, { flatShading: false }), 0.35, 0.205, 0.9, 16));   // paint tin
  const roller = new THREE.Group();
  roller.add(cyl(0.05, 0.05, 0.24, solid(0x4fe3ff, { flatShading: false }), 0, 0, 0, 12).rotateZ(Math.PI / 2), box(0.02, 0.3, 0.02, metal(), 0.13, -0.15, 0), box(0.04, 0.16, 0.04, solid(0x2a2a2f), 0.13, -0.36, 0));
  roller.position.set(0.7, 0.4, 0.75); roller.rotation.set(0, 0.5, 1.35); g.add(roller);
  const tools = new THREE.Group();
  tools.add(box(0.55, 0.26, 0.25, solid(0xd6281e), 0, 0.13, 0), box(0.4, 0.04, 0.04, solid(0x15161c), 0, 0.31, 0), box(0.04, 0.06, 0.04, solid(0x15161c), -0.18, 0.28, 0), box(0.04, 0.06, 0.04, solid(0x15161c), 0.18, 0.28, 0));
  tools.position.set(0.55, 0, 0.3); g.add(tools);
  g.add(cyl(0.008, 0.008, 0.55, solid(0x15161c), 0.15, 2.5, 0.6, 6));                          // smart bulb hanging from the ceiling
  const bulb = new THREE.Mesh(new THREE.SphereGeometry(0.1, 16, 12), neon(0xb46bff, 2.6)); bulb.position.set(0.15, 2.17, 0.6); g.add(bulb);
  return g;
}
// Logistics assistant at a pharmaceutical company: pallet of boxes, medicine boxes, pill bottles
function logistics() {
  const g = new THREE.Group(), pine = wood(0xc9a46a), card = solid(0xb98a54, { roughness: 1 });
  for (const x of [-0.5, 0, 0.5]) g.add(box(0.12, 0.1, 1.0, pine, x, 0.05, 0.75));
  for (let i = 0; i < 5; i++) g.add(box(1.2, 0.03, 0.14, pine, 0, 0.115, 0.33 + i * 0.21));
  [[-0.3, 0.13, 0.55], [0.3, 0.13, 0.55], [-0.3, 0.13, 0.98], [0.3, 0.13, 0.98], [0, 0.53, 0.75]].forEach(([x, y, z], i) => g.add(box(0.55, 0.4, 0.4, card, x, y + 0.2, z), box(0.56, 0.41, 0.06, solid(0xe8e2d0), x, y + 0.2, z).rotateY(i % 2 ? 0 : Math.PI / 2)));
  const med = new THREE.Group();                                                               // a medicine box with a green cross
  med.add(box(0.5, 0.35, 0.3, solid(0xf2efe6), 0, 0.175, 0), box(0.2, 0.06, 0.01, neon(NEON.lime, 1.8), 0, 0.2, 0.155), box(0.06, 0.2, 0.01, neon(NEON.lime, 1.8), 0, 0.2, 0.156));
  med.position.set(0, 0.93, 0.75); g.add(med);
  g.add(box(1.2, 0.05, 0.3, wood(0x3b2a1e), 0, 1.6, 0.15));                                     // shelf of pill bottles on the wall
  [0xff8a3c, 0xf2efe6, 0xff8a3c, 0x4fe3ff, 0xf2efe6].forEach((hex, i) => g.add(cyl(0.06, 0.06, 0.16, solid(hex, { flatShading: false }), -0.45 + i * 0.22, 1.705, 0.15, 12), cyl(0.065, 0.065, 0.04, solid(0xf2f2f5, { flatShading: false }), -0.45 + i * 0.22, 1.8, 0.15, 12)));
  return g;
}

function furnish() {
  const g = new THREE.Group(), B = CORE + 0.05, WALL = CORE - 0.02;      // B: just in front of a back wall; WALL: side wall of a left room
  const put = (a, obj, x, y, z, r = 0) => { obj.position.copy(sidePos(a, x, y, z)); obj.rotation.y = a + r; g.add(obj); return obj; };
  const faceIn = (sx) => (sx < 0 ? Math.PI / 2 : -Math.PI / 2);          // turn something on a side wall to face the room

  // -- server room (skills, left side downstairs): deep in the middle, shallower at the two ends --
  const dark = solid(0x14151d), END = HALF - HOUSE.T - 0.02, B2 = CORE + STEP + HOUSE.T + 0.05;   // END: end wall; B2: back wall of the shallow ends
  [-2.75, -1.65, -0.55, 0.55, 1.65, 2.75].forEach((x, i) => put(SIDE.left, rackSimple(i), x, F0, B + 0.53));
  for (const sx of [-1, 1]) {
    [4.2, 5.25, 6.28].forEach((x, i) => put(SIDE.left, rackSimple(i + 2), sx * x, F0, B2 + 0.5));           // racks along the back of each end
    put(SIDE.left, box(0.03, 0.02, 2.4, neon(NEON.cyan, 1.4)), sx * 1.7, F0 + 0.045, HALF - 1.25);
  }
  put(SIDE.left, box(6.8, 0.08, 0.4, dark), 0, F0 + 3.2, CORE + 1.6); put(SIDE.left, box(6.8, 0.03, 0.05, neon(NEON.cyan, 1.8)), 0, F0 + 3.14, CORE + 1.82);
  const cool = new THREE.Group();
  cool.add(box(1.0, 1.5, 0.7, solid(0x2d2f3f), 0, 0.75, 0), box(0.8, 0.5, 0.02, solid(0x101117), 0, 1.05, 0.36), box(0.6, 0.03, 0.02, neon(NEON.lime, 1.8), 0, 0.5, 0.36));
  put(SIDE.left, cool, 2.9, F0, HALF - 0.9, -0.25);
  put(SIDE.left, box(0.9, 0.7, 0.6, solid(0x2d2f3f)), -2.9, F0 + 0.35, HALF - 0.9, 0.3);                           // crate of spares

  // -- bedroom office (projects, left side upstairs) --
  put(SIDE.left, bed(), -5.25, F1, B2 + 0.72, Math.PI / 2);                                                       // bed along the wall at one end, under the poster
  put(SIDE.left, bookcase(2.2), -2.4, F1, B + 0.17); put(SIDE.left, plant(), 2.2, F1, B + 0.4);
  put(SIDE.left, sofa(0x2f8f5a), 4.75, F1, B2 + 0.55); put(SIDE.left, floorLamp(NEON.lime), 3.2, F1, B + 0.4);
  put(SIDE.left, catTree(), END - 0.55, F1, B2 + 0.5);
  put(SIDE.left, cat(), END - 0.33, F1 + 1.69, B2 + 0.72, -0.9);
  put(SIDE.left, dogBed(), 2.9, F1, HALF - 1.0, -0.3);
  put(SIDE.left, beanBag(0xffb84f), -2.9, F1, HALF - 1.1, 0.5);
  put(SIDE.left, box(2.0, 0.02, 0.8, solid(0xc9a24d, { roughness: 1 })), -0.2, F1 + 0.04, HALF - 0.6);            // rug, clear of the chair

  // The front and far rooms run from the shared wall (SHARED past the middle) out to the back of the house.
  const SHARED = CORE + STEP - 0.02;
  // FAR_END is that new end wall, in front-side terms (+x); the far side mirrors it (-x).
  const FAR_END = HALF - HOUSE.T - 0.02;

  // -- library (education, front downstairs) --
  put(SIDE.front, bookcase(2.8), -(SHARED - 0.19), F0, CORE + 1.75, faceIn(-1));                          // on the wall shared with the server room
  put(SIDE.front, bookcase(2.8), FAR_END - 0.19, F0, CORE + 1.75, faceIn(1));                           // on the new end wall
  put(SIDE.front, bookcase(2.2), 3.0, F0, B + 0.17); put(SIDE.front, bookcase(2.2), 5.3, F0, B + 0.17);
  put(SIDE.front, floorLamp(NEON.violet), -2.4, F0, B + 0.4); put(SIDE.front, floorLamp(NEON.violet), 5.9, F0, HALF - 1.0);
  [[-3.9, 1.2, 0xff6b9a, 0.9], [-2.2, 1.5, 0xff4fa8, 0.6], [-0.9, 0.8, 0xffb84f, 0.2], [1.0, 0.75, 0x8dff6a, -0.2], [2.3, 1.45, 0x4fe3ff, -0.7], [4.3, 1.1, 0xa98bff, -0.4], [5.4, 2.0, 0xff6b5a, -1.0]]
    .forEach(([x, back, hex, r]) => put(SIDE.front, beanBag(hex), x, F0, HALF - back, r));
  const table = new THREE.Group();
  table.add(cyl(0.38, 0.38, 0.05, solid(0x3b2b4d), 0, 0.42, 0, 20), cyl(0.05, 0.08, 0.42, solid(0x3b2b4d), 0, 0.21, 0, 10), box(0.26, 0.05, 0.2, solid(0x7a1420), -0.05, 0.47, 0), box(0.24, 0.04, 0.18, solid(0x4f8cff), -0.03, 0.515, 0.02), cyl(0.07, 0.1, 0.16, neon(NEON.amber, 2), 0.2, 0.53, -0.1, 12));
  put(SIDE.front, table, 0.05, F0, HALF - 1.7);

  // -- gallery (profile, front upstairs) --
  put(SIDE.front, sofa(0x7a2c6c), -(SHARED - 0.55), F1, CORE + 2.0, faceIn(-1));
  put(SIDE.front, sofa(0x7a2c6c), FAR_END - 0.55, F1, CORE + 2.0, faceIn(1));
  put(SIDE.front, sofa(0x7a2c6c), 4.5, F1, B + 0.75); put(SIDE.front, floorLamp(NEON.pink), 2.95, F1, B + 0.4);
  put(SIDE.front, plant(), -3.05, F1, B + 0.45); put(SIDE.front, plant(), 6.1, F1, B + 0.45);
  put(SIDE.front, box(3.0, 0.02, 1.6, solid(0x8a3a7a, { roughness: 1 })), 0, F1 + 0.04, HALF - 1.4);
  put(SIDE.front, box(2.2, 0.02, 1.3, solid(0x8a3a7a, { roughness: 1 })), 4.6, F1 + 0.04, HALF - 1.3);

  // -- post room (contact, far side downstairs). Its opened end is on this side's -x. --
  const parcel = (w, h, d2) => { const q = new THREE.Group(); q.add(box(w, h, d2, solid(0xb98a54, { roughness: 1 }), 0, h / 2, 0), box(w + 0.01, h + 0.01, 0.06, solid(0xe8e2d0), 0, h / 2, 0)); return q; };
  put(SIDE.far, parcel(0.9, 0.7, 0.7), 4.3, F0, B + 0.7, -0.2); put(SIDE.far, parcel(0.6, 0.45, 0.5), 4.2, F0 + 0.7, B + 0.7, 0.3); put(SIDE.far, parcel(0.8, 0.6, 0.7), 4.4, F0, HALF - 1.2, 0.4);
  put(SIDE.far, parcel(0.8, 0.6, 0.7), -2.9, F0, B + 0.7, 0.2); put(SIDE.far, parcel(0.7, 0.5, 0.6), -4.4, F0, HALF - 1.0, 0.5);
  put(SIDE.far, bookcase(2.6), -5.0, F0, B + 0.17);                                                    // pigeon-holes for sorted post
  put(SIDE.far, parcel(1.0, 0.8, 0.8), -(FAR_END - 0.7), F0, CORE + 2.2, 0.1); put(SIDE.far, parcel(0.7, 0.55, 0.6), -(FAR_END - 0.7), F0 + 0.8, CORE + 2.2, -0.4);
  put(SIDE.far, floorLamp(NEON.amber), -1.9, F0, B + 0.4); put(SIDE.far, floorLamp(NEON.amber), 1.2, F0, B + 0.4); put(SIDE.far, floorLamp(NEON.amber), -6.2, F0, HALF - 1.0);

  // -- work experience (far side upstairs, the room above the post room): one corner per job on the CV --
  // The room runs from x = -(FAR_END) to about +5.3 along this side; each job gets a slot of the back wall with a name plate above it.
  [
    [deckHand(), -5.5, "DECK HAND", "#4fe3ff"],
    [barStation(), -3.05, "BARTENDER", "#ffb84f"],
    [avTech(), -0.6, "AV TECHNICIAN", "#8dff6a"],
    [builder(), 1.75, "BUILDER", "#ff6b5a"],
    [logistics(), 4.05, "LOGISTICS", "#a98bff"],
  ].forEach(([obj, x, label, css]) => {
    put(SIDE.far, obj, x, F1, B + 0.05);
    const plate = poster(label, css);
    plate.scale.set(1.7, 0.425, 1);
    put(SIDE.far, plate, x, F1 + 2.95, B + 0.02);
  });
  return g;
}

const HOME = { pos: new THREE.Vector3(), target: new THREE.Vector3(0, 4.8, 0) };
// The wide view backs off further on narrow / tall screens so the whole scene fits.
function setHome() {
  const k = THREE.MathUtils.clamp(1.4 / (innerWidth / innerHeight), 1, 2.2);
  HOME.pos.set(-12.5, 4.6, 24).multiplyScalar(k).add(HOME.target);   // front-left: you see side 1 and side 2
}

function buildScene() {
  const canvas = $("#gl");
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
  renderer.setPixelRatio(Math.min(devicePixelRatio || 1, 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 0.9;

  const scene = new THREE.Scene();
  const pmrem = new THREE.PMREMGenerator(renderer);
  scene.environment = pmrem.fromScene(new RoomEnvironment(renderer), 0.04).texture;
  scene.background = new THREE.Color(0x04050d);
  scene.fog = new THREE.Fog(0x04050d, 56, 150);
  const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 400);
  camera.position.set(-34, 22, 68);

  // ---- galaxy: slow stars + soft nebula clouds (nothing reacts to the mouse) ----
  const starPos = [], starCol = [], tint = new THREE.Color();
  for (let i = 0; i < 2600; i++) {
    const v = new THREE.Vector3().randomDirection().multiplyScalar(110 + Math.random() * 90);
    starPos.push(v.x, v.y, v.z);
    tint.setHSL(0.55 + Math.random() * 0.2, 0.5, 0.75 + Math.random() * 0.25);
    starCol.push(tint.r, tint.g, tint.b);
  }
  const sg = new THREE.BufferGeometry();
  sg.setAttribute("position", new THREE.Float32BufferAttribute(starPos, 3));
  sg.setAttribute("color", new THREE.Float32BufferAttribute(starCol, 3));
  const stars = new THREE.Points(sg, new THREE.PointsMaterial({ size: 0.7, vertexColors: true, fog: false, transparent: true, opacity: 0.9 }));
  scene.add(stars);
  const cloud = (css, x, y, z, s) => {
    const t = canvasTex(256, 256, (c) => {
      const g = c.createRadialGradient(128, 128, 0, 128, 128, 128);
      g.addColorStop(0, css); g.addColorStop(1, "rgba(0,0,0,0)");
      c.fillStyle = g; c.fillRect(0, 0, 256, 256);
    });
    const sp = new THREE.Sprite(new THREE.SpriteMaterial({ map: t, fog: false, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending }));
    sp.position.set(x, y, z); sp.scale.setScalar(s);
    scene.add(sp);
  };
  cloud("rgba(110,70,220,.34)", -90, 55, -150, 190);
  cloud("rgba(30,120,200,.26)", 110, 35, -140, 170);
  cloud("rgba(210,70,150,.18)", 20, 90, -170, 150);
  cloud("rgba(60,90,220,.2)", -150, 40, 60, 170);
  cloud("rgba(150,60,200,.18)", 150, 70, 90, 160);

  // ---- lights ----
  scene.add(new THREE.AmbientLight(0x8088c8, 0.55), new THREE.HemisphereLight(0x8fa0ff, 0x140a20, 0.7));
  const light = (hex, i, x, y, z, d = 22) => { const l = new THREE.PointLight(hex, i, d, 1.6); l.position.set(x, y, z); scene.add(l); return l; };
  const { H } = HOUSE;
  const roomLight = (a, y, hex, i) => { const v = sidePos(a, 0, y + H - 0.6, HALF - 1.3); light(hex, i * 0.85, v.x, v.y, v.z, 15); };   // softer room lights: less glare
  roomLight(SIDE.front, F0, 0x9b7bff, 50);   // library (education)
  roomLight(SIDE.front, F1, 0xff3fa4, 50);   // gallery (profile)
  roomLight(SIDE.left, F0, 0x3fe8ff, 50);    // server room (skills)
  roomLight(SIDE.left, F1, 0xbfffa0, 42);    // bedroom office (projects)
  roomLight(SIDE.far, F0, 0xffb060, 48);     // post room (contact)
  roomLight(SIDE.far, F1, 0xffc98a, 46);     // work experience room
  { const v = sidePos(SIDE.back, 0, 3.4, HALF + 2.4); light(0xffd98a, 26, v.x, v.y, v.z, 12); }   // glow outside the back door
  light(0x8fa4ff, 420, -18, 17, 26, 85); light(0x8fa4ff, 360, 20, 17, -26, 85); light(0xb58cff, 260, -26, 13, -18, 85); light(0xb58cff, 260, 26, 13, 18, 85);

  // ---- the house and everything in it ----
  const world = new THREE.Group();
  world.add(house());

  const props = new THREE.Group();
  world.add(props);
  // the experience screen hangs in front of the room's back wall, like a big glass notice board
  const experienceBoard = () => {
    const g = new THREE.Group(), face = plane(8.0, 3.1, new THREE.MeshBasicMaterial({ visible: false }), 0, 1.75, 0.9);
    g.add(face);
    world3d.surf.experience = { mesh: face, w: 8.0, h: 3.1 };
    return g;
  };
  const builders = { experience: experienceBoard, profile: billboard, projects: () => workstation(visibleBase()), education: studyWall, skills: serverRack, contact: phoneBox };
  const hot = [];
  world3d.tags = {}; world3d.views = {};
  for (const [name, s] of Object.entries(SPOTS)) {
    const g = builders[name]();
    g.position.set(s.p[0], s.y, s.p[1]); g.rotation.y = s.r;
    // how the room is named: a wall plate, a film-style poster, a floor mat, or (contact) the phone box's own sign
    let t = null;
    if (POSTERS[name]) {
      const [pa, px, py, out, pw] = POSTERS[name];
      t = poster(SECTIONS[name].title, SECTIONS[name].color);
      t.userData.w = pw; t.userData.h = pw / 4; t.scale.set(pw, pw / 4, 1);
      t.position.copy(sidePos(pa, px, py, CORE + out)); t.rotation.y = pa;
      world.add(t);
    } else if (name === "projects") {
      t = starPoster(visibleBase().map((r) => r.name));
      t.position.copy(sidePos(SIDE.left, -5.25, F1 + 2.3, CORE + STEP + HOUSE.T + 0.06)); t.rotation.y = SIDE.left;   // on the wall above the bed
      world.add(t);
    } else if (name === "skills") {
      t = floorMat(SECTIONS[name].title, SECTIONS[name].color);
      const holder = new THREE.Group();                                   // the holder turns it to face the open side of the room
      holder.position.copy(sidePos(SIDE.left, 0, F0 + 0.07, HALF - 0.75)); holder.rotation.y = SIDE.left;
      holder.add(t);
      world.add(holder);
    }
    const hit = box(s.hit[0], s.hit[1], s.hit[2], new THREE.MeshBasicMaterial({ visible: false }), s.hit[3], s.hit[4], s.hit[5]);
    hit.userData.section = name;
    g.add(hit);
    props.add(g);
    world3d.groups[name] = g;
    hot.push(hit);
    if (t) { t.userData.section = name; hot.push(t); world3d.tags[name] = t; }
    // camera position for this place: straight in front of it, a little above,
    // standing further back on narrow screens so the whole thing stays in view
    world3d.views[name] = () => {
      g.updateWorldMatrix(true, false);
      const k = THREE.MathUtils.clamp(1.3 / (innerWidth / innerHeight), 1, 1.8);
      return {
        target: g.localToWorld(new THREE.Vector3(...s.focus)),
        pos: g.localToWorld(new THREE.Vector3(s.focus[0], s.focus[1] + s.up, s.focus[2] + s.dist * k)),
      };
    };
  }
  const post = pillarBox(); post.position.copy(sidePos(SIDE.far, 1.9, F0, HALF - 1.2)); post.rotation.y = SIDE.far - 0.3;
  const lamp = streetLamp(); lamp.position.copy(sidePos(SIDE.back, -2.2, 0, HALF + 1.6));   // outside, beside the back door
  props.add(post, lamp);
  world.add(furnish());
  scene.add(world);

  // glossy floor: the island is copied upside-down underneath a see-through floor
  const mirror = world.clone(true);
  mirror.scale.y = -1;
  scene.add(mirror);
  const floor = new THREE.Mesh(new THREE.CircleGeometry(90, 64), new THREE.MeshStandardMaterial({ color: 0x070814, roughness: 0.35, metalness: 0.4, transparent: true, opacity: 0.8 }));
  floor.rotation.x = -Math.PI / 2;
  scene.add(floor);

  // floating mail around the telephone box
  // letters drifting about the tall post room (positions are in that side's local space)
  const mail = [[-1.7, 2.3, 5.9], [2.4, 2.9, 5.5], [-0.7, 3.1, 5.0], [2.9, 2.2, 6.3], [0.6, 2.7, 5.6]].map((q) => sidePos(SIDE.far, ...q).toArray()).map(([x, y, z], i) => {
    const e = envelope();
    e.position.set(x, y, z); e.rotation.set(0.2 * i, 0.6 + i * 0.9, 0.25 - i * 0.15);
    e.userData.y = y; e.userData.ph = i * 1.7;
    scene.add(e);
    return e;
  });

  // -- smoke drifting up from the chimney --
  const puff = canvasTex(64, 64, (c) => { const gr = c.createRadialGradient(32, 32, 0, 32, 32, 32); gr.addColorStop(0, "rgba(225,225,240,.85)"); gr.addColorStop(1, "rgba(225,225,240,0)"); c.fillStyle = gr; c.fillRect(0, 0, 64, 64); });
  world3d.smoke = Array.from({ length: 9 }, (_, i) => {
    const sp = new THREE.Sprite(new THREE.SpriteMaterial({ map: puff, transparent: true, depthWrite: false, opacity: 0 }));
    sp.userData.ph = i / 9;
    scene.add(sp);
    return sp;
  });

  // -- the letter: one envelope flies to you and a sheet of paper rises out of it --
  // the letter that comes to you starts inside the red post box and slides out of its slot
  const env = letterEnvelope(), SLOT_SIZE = 0.6;       // it is small enough to fit the slot, and grows as it flies to you
  post.updateWorldMatrix(true, false);
  // lying flat, long edge along the slot, exactly as you would post it
  const slotQuat = post.getWorldQuaternion(new THREE.Quaternion()).multiply(new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(1, 0, 0), -Math.PI / 2));
  const slotIn = post.localToWorld(new THREE.Vector3(0, 1.15, 0.2)), slotOut = post.localToWorld(new THREE.Vector3(0, 1.15, 0.62));
  env.position.copy(slotIn); env.quaternion.copy(slotQuat); env.scale.setScalar(SLOT_SIZE);
  env.visible = false;
  scene.add(env);
  const setFlap = (k) => { env.userData.flap.rotation.x = 2.9 * k; };    // 0 = shut (tucked behind), 1 = standing open behind the paper

  // The letter inside: one sheet folded in three, the way a real letter is. The middle
  // third is the base; the top and bottom thirds are hinged to it and fold over its front.
  const LW = 0.62, LH = 0.8, LP = LH / 3;
  const paperMat = new THREE.MeshStandardMaterial({
    roughness: 0.9, side: THREE.DoubleSide, emissive: 0xefe4ca, emissiveIntensity: 0.55,   // keeps it cream under the coloured room lights
    map: canvasTex(256, 110, (x, w, h) => {
      const gr = x.createLinearGradient(0, 0, 0, h); gr.addColorStop(0, "#fbf6e9"); gr.addColorStop(1, "#ece0c4");
      x.fillStyle = gr; x.fillRect(0, 0, w, h);
      x.fillStyle = "rgba(107,20,32,.16)";                                      // faint lines of handwriting
      for (let i = 0; i < 5; i++) x.fillRect(28, 22 + i * 15, w - 56 - (i === 4 ? 90 : (i * 23) % 40), 3);
    }),
  });
  const letter = new THREE.Group(), topFold = new THREE.Group(), bottomFold = new THREE.Group();
  topFold.position.y = LP / 2; bottomFold.position.y = -LP / 2;               // the two creases
  topFold.add(plane(LW, LP, paperMat, 0, LP / 2, 0));
  bottomFold.add(plane(LW, LP, paperMat, 0, -LP / 2, 0));
  const face = plane(LW, LH, new THREE.MeshBasicMaterial({ visible: false }), 0, 0, 0.004);   // where the writing appears once it is open
  letter.add(plane(LW, LP, paperMat), topFold, bottomFold, face);
  letter.visible = false;
  env.add(letter);
  world3d.surf.contact = { mesh: face, w: LW, h: LH };
  const smooth = (t) => t * t * (3 - 2 * t), part = (k, a, b) => smooth(THREE.MathUtils.clamp((k - a) / (b - a), 0, 1));
  // 0 = folded in three, tucked inside the envelope; 1 = pulled out above it and opened flat.
  // In between: it slides up out of the envelope, then the top third opens, then the bottom third.
  const setSheet = (k) => {
    letter.visible = k > 0.001;
    const out = part(k, 0, 0.38);
    letter.position.set(0, -0.02 + 0.57 * out, 0);
    letter.scale.setScalar(0.7 + 0.3 * out);                                     // folded small enough to fit inside
    letter.rotation.x = -0.12 * Math.sin(Math.PI * out);                         // tips back a little as it is drawn out
    topFold.rotation.x = (Math.PI - 0.1) * (1 - part(k, 0.38, 0.7));             // outermost fold opens first…
    bottomFold.rotation.x = -(Math.PI - 0.05) * (1 - part(k, 0.66, 1));          // …then the one beneath it
  };
  setSheet(0);
  world3d.debugLetter = setSheet;                                                 // for testing

  // -- the CV book: sits on the shelf, flies out and opens --
  const PW = 0.3, PH = 0.44;
  const book = new THREE.Group(), coverMat = solid(0x7a1420, { roughness: 0.5 }), pageMat = new THREE.MeshStandardMaterial({ color: 0xf3e9d2, roughness: 0.9 });
  const halves = [1, -1].map((side) => {
    const half = new THREE.Group();
    half.position.x = 0.04 * side;
    half.add(box(PW, PH, 0.012, coverMat, (side * PW) / 2, 0, 0), box(PW - 0.02, PH - 0.03, 0.03, pageMat, (side * (PW - 0.02)) / 2, 0, 0.021));
    book.add(half);
    return half;
  });
  book.add(box(0.092, PH, 0.012, coverMat, 0, 0, -0.004), box(0.07, PH - 0.03, 0.02, pageMat, 0, 0, 0.012));
  const spineText = plane(0.07, 0.3, new THREE.MeshBasicMaterial({ map: canvasTex(64, 256, (x) => { x.fillStyle = "#7a1420"; x.fillRect(0, 0, 64, 256); x.fillStyle = "#e9c46a"; x.font = "bold 44px Georgia, serif"; x.textAlign = "center"; x.fillText("C", 32, 110); x.fillText("V", 32, 165); }) }), 0, 0, -0.0105);
  spineText.rotation.y = Math.PI;
  const spread = plane(0.66, 0.42, new THREE.MeshBasicMaterial({ visible: false }), 0, 0, 0.04);
  book.add(spineText, spread);
  world3d.surf.education = { mesh: spread, w: 0.66, h: 0.42 };
  const setBook = (k) => { halves[0].rotation.y = (-Math.PI / 2) * (1 - k); halves[1].rotation.y = (Math.PI / 2) * (1 - k); };
  const wall = world3d.groups.education;
  wall.updateWorldMatrix(true, false);
  const shelfPose = {
    pos: wall.localToWorld(new THREE.Vector3(0.42, 1.01 + PH / 2, 0.35)),
    quat: wall.getWorldQuaternion(new THREE.Quaternion()).multiply(new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 1, 0), Math.PI)),
  };
  book.position.copy(shelfPose.pos); book.quaternion.copy(shelfPose.quat);
  setBook(0);
  scene.add(book);

  // ---- camera control: you move it; it never moves by itself ----
  const controls = new OrbitControls(camera, canvas);
  controls.enableDamping = true; controls.dampingFactor = 0.08;
  controls.enablePan = false;
  controls.minDistance = 2.2;            // zoom-in limit
  controls.maxDistance = 100;             // zoom-out limit
  controls.maxPolarAngle = Math.PI / 2 - 0.05;   // never go under the floor
  controls.target.copy(HOME.target);

  const composer = new EffectComposer(renderer);
  composer.addPass(new RenderPass(scene, camera));
  const bloom = new UnrealBloomPass(new THREE.Vector2(1, 1), 0.28, 0.45, 1.0);   // gentle glow on the neon only
  composer.addPass(bloom);
  composer.addPass(new OutputPass());

  const resize = () => {
    const w = innerWidth, h = innerHeight;
    renderer.setSize(w, h, false); composer.setSize(w, h);
    camera.aspect = w / h;
    camera.fov = w < h ? 58 : 42;        // wider lens on tall phone screens
    camera.updateProjectionMatrix();
    setHome();
  };
  addEventListener("resize", resize);
  resize();

  // ---- flying the camera between places ----
  let flight = null;
  const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
  world3d.fly = (view, secs = 1.5) => new Promise((done) => {
    if (REDUCED) secs = 0.01;
    controls.minDistance = 0.05;         // let the camera get right up to a screen
    flight = { p0: camera.position.clone(), t0: controls.target.clone(), p1: view.pos, t1: view.target, t: 0, secs, done };
    controls.enabled = false;
  });
  world3d.dolly = (k) => {   // k < 1 zooms in, k > 1 zooms out, within the limits
    const off = camera.position.clone().sub(controls.target);
    off.setLength(THREE.MathUtils.clamp(off.length() * k, controls.minDistance, controls.maxDistance));
    camera.position.copy(controls.target).add(off);
  };

  // ---- clicking and hovering ----
  const ray = new THREE.Raycaster(), ptr = new THREE.Vector2();
  const pick = (e) => {
    const r = canvas.getBoundingClientRect();
    ptr.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
    ray.setFromCamera(ptr, camera);
    return ray.intersectObjects(hot, false)[0]?.object.userData.section || null;
  };
  let down = null, hover = null;
  canvas.addEventListener("pointerdown", (e) => { down = [e.clientX, e.clientY]; });
  canvas.addEventListener("pointerup", (e) => {
    if (!down || Math.hypot(e.clientX - down[0], e.clientY - down[1]) > 6) return;   // that was a drag
    const s = pick(e);
    if (s) goTo(s);
  });
  canvas.addEventListener("pointermove", (e) => {
    if (e.pointerType === "touch") return;
    hover = pick(e);
    canvas.classList.toggle("hot", !!hover);
  });

  // ---- frame loop ----
  const clock = new THREE.Clock();
  const frame = (fixedDt) => {
    const dt = fixedDt ?? Math.min(clock.getDelta(), 0.05), t = clock.elapsedTime;
    if (flight) {
      flight.t = Math.min(1, flight.t + dt / flight.secs);
      const k = ease(flight.t);
      // swing around the house (which stands at the centre) rather than through it
      const { p0, p1 } = flight, a0 = Math.atan2(p0.x, p0.z);
      let da = Math.atan2(p1.x, p1.z) - a0;
      da = Math.atan2(Math.sin(da), Math.cos(da));
      const r0 = Math.hypot(p0.x, p0.z), r1 = Math.hypot(p1.x, p1.z);
      const r = r0 + (r1 - r0) * k + Math.sin(Math.PI * k) * Math.abs(da) * 4.5, ang = a0 + da * k;
      camera.position.set(Math.sin(ang) * r, p0.y + (p1.y - p0.y) * k, Math.cos(ang) * r);
      controls.target.lerpVectors(flight.t0, flight.t1, k);
      if (flight.t >= 1) { const f = flight; flight = null; controls.enabled = state.at === "home"; if (controls.enabled) controls.minDistance = 2.2; f.done(); }
    }
    controls.update();
    if (!REDUCED) {
      world3d.windows.forEach((w) => w.mat.color.setHex(w.hex).multiplyScalar(1.6 + 0.25 * Math.sin(t * 0.9 + w.ph) + 0.06 * Math.sin(t * 7.3 + w.ph * 3)));   // lived-in glow
      world3d.notes?.forEach((sp) => {                                  // music notes rise out of the speakers
        const { x0, ph, sway } = sp.userData, k = (t * 0.32 + ph) % 1;
        sp.position.set(x0 + Math.sin(k * 7 + ph * 9) * 0.1 + sway * k * 0.25, 1.0 + k * 1.3, 0.55 + k * 0.2);
        sp.material.opacity = Math.sin(Math.PI * k) * 0.95;
        sp.material.rotation = Math.sin(k * 6 + ph * 4) * 0.35;
      });
      world3d.woofers?.forEach((w, i) => { const s = 1 + 0.1 * Math.max(0, Math.sin(t * 8.4 + i * 0.6)); w.scale.set(s, 1, s); });
      world3d.bartender?.userData.update(t);                             // the bartender shakes the cocktail
      if (world3d.cisco && world3d.cisco.next < t) { world3d.cisco.draw(t); world3d.cisco.next = t + 0.1; }   // switch port lights
      if (world3d.tv) {                                                  // the TV: a bouncing equaliser
        const { ctx: c, tex, w, h } = world3d.tv, bars = 18;
        const bg = c.createLinearGradient(0, 0, 0, h); bg.addColorStop(0, "#1a0b2e"); bg.addColorStop(1, "#05030c");
        c.fillStyle = bg; c.fillRect(0, 0, w, h);
        c.fillStyle = "rgba(255,255,255,.75)"; c.font = "bold 13px monospace"; c.fillText("\u266B NOW PLAYING", 10, 18);
        for (let b = 0; b < bars; b++) {
          const v = 0.25 + 0.75 * Math.abs(Math.sin(t * (2.1 + (b % 5) * 0.37) + b * 0.9) * Math.sin(t * 1.3 + b * 0.4) * 0.6 + 0.4 * Math.abs(Math.sin(t * 8.4 + b * 0.25)));
          const bh = v * (h - 40), x = 10 + b * ((w - 20) / bars);
          c.fillStyle = `hsl(${180 + b * 9}, 90%, 60%)`;
          c.fillRect(x, h - 10 - bh, (w - 20) / bars - 3, bh);
        }
        tex.needsUpdate = true;
      }
      world3d.smoke.forEach((sp) => {                                   // each puff rises, spreads and fades, then starts again
        const k = (t * 0.11 + sp.userData.ph) % 1;
        sp.position.set(3.2 + Math.sin(k * 5 + sp.userData.ph * 9) * 0.35 * k + k * 0.9, TOP + 3.6 + k * 4.2, -2.2 + Math.cos(k * 4 + sp.userData.ph * 7) * 0.25 * k);
        sp.scale.setScalar(0.7 + k * 2.2);
        sp.material.opacity = 0.42 * Math.sin(Math.PI * Math.min(1, k * 1.15)) * (1 - k * 0.5);
      });
      stars.rotation.y = t * 0.004;                                   // barely-there drift
      mail.forEach((m) => { if (!m.userData.busy) m.position.y = m.userData.y + Math.sin(t * 0.8 + m.userData.ph) * 0.09; });
      world3d.leds.forEach((l) => l.mat.color.setHex(l.hex).multiplyScalar((t * l.speed + l.phase) % 1 < l.duty ? 2.4 : 0.2));
    }
    for (const [name, tg] of Object.entries(world3d.tags)) {     // the name plate grows a touch when you point at its room
      const k = THREE.MathUtils.lerp(tg.scale.x / tg.userData.w, hover === name ? 1.1 : 1, 0.2);
      tg.scale.set(tg.userData.w * k, tg.userData.h * k, 1);
    }
    for (const [key, tw] of tweens) {
      tw.t = Math.min(1, tw.t + dt / tw.secs);
      tw.step(ease(tw.t));
      if (tw.t >= 1) { tweens.delete(key); tw.done(); }
    }
    trackPanel();
    composer.render();
  };
  renderer.setAnimationLoop(() => frame());
  window.portfolioDebug = { step: (n = 60) => { for (let i = 0; i < n; i++) frame(0.05); }, look: (x, y, z) => { camera.position.set(x, y, z); frame(0.05); }, letter: (k) => { world3d.debugLetter(k); composer.render(); } };   // for testing: advance the animation by hand
  world3d.camera = camera; world3d.controls = controls; world3d.scene = scene;
  // how much each surface reflects its surroundings: metal and glass clearly, everything else only a hint
  scene.traverse((o) => {
    const m = o.material;
    if (m && m.isMeshStandardMaterial) m.envMapIntensity = m.metalness > 0.5 ? 0.8 : m.transparent ? 0.6 : 0.18;
  });
  floor.material.envMapIntensity = 0;                                 // the glossy ground keeps reflecting only the house and the night sky

  // ---- small animations (one per key; starting a new one replaces the old) ----
  const tweens = new Map();
  const tween = (key, secs, step) => new Promise((done) => {
    tweens.get(key)?.done();
    tweens.set(key, { t: 0, secs: REDUCED ? 0.01 : secs, step, done });
  });
  const moveTo = (key, obj, pos, quat, secs) => {
    const p0 = obj.position.clone(), q0 = obj.quaternion.clone();
    return tween(key, secs, (k) => { obj.position.lerpVectors(p0, pos, k); obj.quaternion.slerpQuaternions(q0, quat, k); });
  };
  const fade = (key, from, to, secs, set) => tween(key, secs, (k) => set(from + (to - from) * k));

  // how far back the camera must be for a w × h surface to fill the view
  const fitDist = (w, h, fill = 0.86) => {
    const t = Math.tan(THREE.MathUtils.degToRad(camera.fov / 2));
    return Math.max(h / (2 * t * fill), w / (2 * t * camera.aspect * fill));
  };
  // a camera position looking straight at a surface
  const faceOn = ({ mesh, w, h }, fill) => {
    mesh.updateWorldMatrix(true, false);
    const target = mesh.getWorldPosition(new THREE.Vector3());
    const n = new THREE.Vector3(0, 0, 1).transformDirection(mesh.matrixWorld);
    return { target, pos: target.clone().addScaledVector(n, fitDist(w, h, fill)) };
  };
  // a point straight ahead of the camera, dist away, raised by up
  const ahead = (dist, up = 0) => camera.position.clone()
    .addScaledVector(camera.getWorldDirection(new THREE.Vector3()), dist)
    .addScaledVector(new THREE.Vector3(0, 1, 0).applyQuaternion(camera.quaternion), up);

  // What happens at each place. view = where the camera goes; arrive = what plays
  // once it gets there (alive() turns false if the visitor has already moved on).
  let bookK = 0, sheetK = 0, flapK = 0;
  world3d.acts = {
    profile:  { view: () => faceOn(world3d.surf.profile, 0.9) },
    projects: { view: () => faceOn(world3d.surf.projects, 0.92) },
    skills: {
      view: () => { const k = world3d.drawerK; world3d.setDrawer(1); const v = faceOn(world3d.surf.skills, 0.9); world3d.setDrawer(k); return v; },
      enter: () => fade("drawer", world3d.drawerK, 1, 1.3, world3d.setDrawer),
      leave: () => fade("drawer", world3d.drawerK, 0, 0.8, world3d.setDrawer),
    },
    education: {
      view: () => world3d.views.education(),
      arrive: async (alive) => {
        const d = fitDist(0.66, 0.42, 0.9);
        await moveTo("book", book, ahead(d), camera.quaternion.clone(), 1.0);
        if (!alive()) return;
        await fade("bookOpen", bookK, 1, 0.8, (k) => setBook((bookK = k)));
      },
      leave: () => { fade("bookOpen", bookK, 0, 0.4, (k) => setBook((bookK = k))); moveTo("book", book, shelfPose.pos, shelfPose.quat, 0.9); },
    },
    experience: { view: () => faceOn(world3d.surf.experience, 0.94) },
    contact: {
      view: () => world3d.views.contact(),
      arrive: async (alive) => {
        // 1. the letter slides out of the post box slot, edge first: posting a letter, in reverse
        env.visible = true;
        await moveTo("env", env, slotOut, slotQuat, 1.0);
        if (!alive()) return;
        // 2. it lifts away and flies to you, turning to face you and growing to full size
        const d = fitDist(0.62, 0.8, 0.8);
        fade("envSize", env.scale.x, 1, 1.1, (k) => env.scale.setScalar(k));
        await moveTo("env", env, ahead(d, 0.05 * d - 0.55), camera.quaternion.clone(), 1.2);
        if (!alive()) return;
        // 3. the flap opens
        await fade("flap", flapK, 1, 0.7, (k) => setFlap((flapK = k)));
        if (!alive()) return;
        // 4. the folded letter is drawn out and opened one third at a time; only then does the writing appear
        await fade("sheet", sheetK, 1, 2.0, (k) => setSheet((sheetK = k)));
      },
      leave: () => {
        fade("sheet", sheetK, 0, 0.5, (k) => setSheet((sheetK = k)));
        fade("flap", flapK, 0, 0.3, (k) => setFlap((flapK = k)));
        fade("envSize", env.scale.x, SLOT_SIZE, 0.9, (k) => env.scale.setScalar(k));
        moveTo("env", env, slotIn, slotQuat, 0.9).then(() => { if (state.at !== "contact") env.visible = false; });
      },
    },
  };
}

/* ---------- Going places ---------- */
let trip = 0;
async function goTo(name) {
  if (name !== "home" && !SECTIONS[name]) return;
  if (name === state.at && name !== "home") return;
  const id = ++trip, alive = () => id === trip, prev = world3d.acts[state.at];
  state.at = name;
  showPanel(null);
  setPrompt();
  history.replaceState(null, "", name === "home" ? location.pathname + location.search : "#" + name);
  prev?.leave?.();
  if (name === "home") return world3d.fly(HOME, 1.3);
  const act = world3d.acts[name];
  act.enter?.();
  await world3d.fly(act.view(), 1.6);
  if (!alive()) return;
  await act.arrive?.(alive);
  if (alive()) showPanel(name);            // the content appears on the object itself
}

/* ============================================================
   The console (this is the menu). It looks like a terminal but
   understands plain words: "projects", "show me your skills", "back"…
   ============================================================ */
const term = { hist: [], hi: 0, user: "guest" };
const promptHTML = () => `${esc(term.user)}@portfolio${state.at === "home" ? "" : ` <b>${state.at}</b>`} &gt;`;
function setPrompt() { $("#term-prompt").innerHTML = promptHTML(); }
function print(html, cls = "") {
  const out = $("#term-out");
  out.hidden = false;
  const d = document.createElement("div");
  if (cls) d.className = cls;
  d.innerHTML = html;
  out.append(d);
  out.scrollTop = out.scrollHeight;
}

// every word the console understands, and what it means
const WORDS = {
  projects: "projects", project: "projects", built: "projects", portfolio: "projects",
  experience: "experience", work: "experience", jobs: "experience", job: "experience", career: "experience", employment: "experience", history: "experience",
  education: "education", cv: "education", resume: "education", certifications: "education", certificates: "education", certs: "education", qualifications: "education", school: "education",
  skills: "skills", skill: "skills", tools: "skills", languages: "skills",
  contact: "contact", letter: "contact", reach: "contact", hire: "contact",
  profile: "profile", about: "profile", who: "profile", whoami: "profile", bio: "profile",
  back: "home", home: "home", exit: "home", close: "home", leave: "home", overview: "home", "..": "home",
  help: "help", "?": "help", menu: "help", commands: "help", options: "help", ls: "help",
  email: "email", mail: "email", github: "github", linkedin: "linkedin",
  clear: "clear", cls: "clear",
};
const ACTIONS = {
  help: () => print(
`You can type any of these words and press Enter, or click the buttons below.

${Object.entries(SECTIONS).map(([k, v]) => `  <span class="cmd">${k.padEnd(10)}</span> ${v.blurb}`).join("\n")}
  <span class="cmd">${"back".padEnd(10)}</span> return to the full view

  <span class="cmd">email</span>, <span class="cmd">github</span>, <span class="cmd">linkedin</span>   open my links
  <span class="cmd">zoom in</span>, <span class="cmd">zoom out</span>            move closer or further away
  <span class="cmd">clear</span>                        tidy this console`),
  home: () => { print(state.at === "home" ? "You are already at the full view." : "Going back to the full view.", "dim"); goTo("home"); },
  github: () => { print("Opening GitHub in a new tab.", "dim"); window.open(links().github, "_blank", "noopener"); },
  linkedin: () => links().linkedin ? (print("Opening LinkedIn in a new tab.", "dim"), window.open(links().linkedin, "_blank", "noopener")) : print("There is no LinkedIn link yet.", "err"),
  email: () => links().email ? (print("Opening your email app.", "dim"), (location.href = links().email)) : print("There is no email address yet.", "err"),
  clear: () => { $("#term-out").innerHTML = ""; $("#term-out").hidden = true; },
};

function run(line) {
  line = line.trim();
  print(`${promptHTML()} <span class="cmd">${esc(line)}</span>`);
  if (!line) return;
  term.hist.push(line); term.hi = term.hist.length;
  const lower = line.toLowerCase(), words = lower.split(/[^a-z0-9.?+\-_]+/).filter(Boolean);

  if (words.includes("zoom") || words.includes("closer") || words.includes("further")) {
    if (state.at !== "home") return print("Zoom works in the full view. Type back first.", "err");
    const out = /out|further|away|-/.test(lower.replace("zoom", ""));
    world3d.dolly(out ? 1.4 : 0.7);
    return print(out ? "Zooming out." : "Zooming in.", "dim");
  }
  const repo = visibleBase().find((r) => lower.includes(r.name.toLowerCase()));
  if (repo) { print(`Opening the project ${esc(repo.name)}.`, "dim"); return openModal(repo); }

  const hit = words.map((w) => WORDS[w]).find(Boolean);
  if (!hit) return print(`Sorry, I don't know “${esc(line)}”. Type <span class="cmd">help</span> to see what I can do.`, "err");
  if (SECTIONS[hit]) { print(`Taking you to ${hit}: ${SECTIONS[hit].blurb}.`, "dim"); return goTo(hit); }
  ACTIONS[hit]();
}
function complete(input) {
  const typed = input.value.toLowerCase();
  if (!typed) return;
  const pool = [...Object.keys(SECTIONS), "back", "help", "email", "github", "linkedin", "zoom in", "zoom out", "clear", ...visibleBase().map((r) => r.name)];
  const hits = pool.filter((p) => p.toLowerCase().startsWith(typed));
  if (hits.length === 1) input.value = hits[0];
  else if (hits.length > 1) print(hits.map(esc).join("   "), "dim");
}
function initTerminal() {
  const input = $("#term-in"), box = $("#term");
  term.user = (displayName().split(" ")[0] || "guest").toLowerCase().replace(/[^a-z0-9]/g, "") || "guest";
  setPrompt();
  $("#term-form").addEventListener("submit", (e) => { e.preventDefault(); const v = input.value; input.value = ""; run(v); });
  input.addEventListener("keydown", (e) => {
    if (e.key === "Tab") { e.preventDefault(); complete(input); }
    else if (e.key === "ArrowUp") { e.preventDefault(); if (term.hi > 0) input.value = term.hist[--term.hi]; }
    else if (e.key === "ArrowDown") { e.preventDefault(); input.value = term.hi < term.hist.length - 1 ? term.hist[++term.hi] : ((term.hi = term.hist.length), ""); }
    else if (e.key === "Escape") input.blur();
  });
  input.addEventListener("focus", () => { box.classList.add("focus"); if ($("#term-out").childElementCount) $("#term-out").hidden = false; });
  // clicking anywhere outside the console folds it down to the small bar
  document.addEventListener("pointerdown", (e) => { if (!e.target.closest("#term, #term-btn")) $("#term-out").hidden = true; });
  input.addEventListener("blur", () => box.classList.remove("focus"));
  $("#term-chips").addEventListener("click", (e) => { const b = e.target.closest("[data-cmd]"); if (b) run(b.dataset.cmd); });
  box.addEventListener("click", (e) => { if (!e.target.closest("a, button") && !getSelection().toString()) input.focus(); });
  $("#term-btn").addEventListener("click", () => { input.focus(); if ($("#term-out").hidden) ACTIONS.help(); });
}

/* ---------- Other page events ---------- */
function bindEvents() {
  $("#search").addEventListener("input", (e) => { state.query = e.target.value; renderGrid(); });
  $("#sort").addEventListener("change", (e) => { state.sort = e.target.value; renderGrid(); });
  $("#forks").addEventListener("change", (e) => { state.forks = e.target.checked; renderLanguages(); renderGrid(); });
  const pickLang = (l) => {
    state.lang = l;
    document.querySelectorAll(".chip").forEach((c) => c.classList.toggle("active", c.dataset.lang === l));
    renderGrid();
  };
  $("#chips").addEventListener("click", (e) => { const c = e.target.closest(".chip"); if (c) pickLang(c.dataset.lang); });
  $("#lang-bar").addEventListener("click", (e) => { const l = e.target.dataset.lang; if (l && l !== "Other") { pickLang(l); goTo("projects"); } });
  $("#grid").addEventListener("click", (e) => {
    const card = e.target.closest(".card");
    if (card) openModal(state.repos.find((r) => String(r.id) === card.dataset.id));
  });
  $("#grid").addEventListener("pointermove", (e) => {
    const card = e.target.closest(".card");
    if (!card) return;
    const r = card.getBoundingClientRect();
    card.style.setProperty("--mx", ((e.clientX - r.left) / r.width) * 100 + "%");
    card.style.setProperty("--my", ((e.clientY - r.top) / r.height) * 100 + "%");
  });
  $("#modal").addEventListener("click", (e) => { if (e.target.closest("[data-close]")) closeModal(); });
  document.addEventListener("click", (e) => { const go = e.target.closest("[data-go]"); if (go) goTo(go.dataset.go); });
  document.addEventListener("keydown", (e) => {
    const typing = /INPUT|TEXTAREA|SELECT/.test(document.activeElement.tagName);
    if (e.key === "Escape" && !typing) { if (!closeModal() && state.at !== "home") goTo("home"); }
    else if ((e.key === "/" || e.key === "`") && !typing && !$("#term").hidden) { e.preventDefault(); $("#term-in").focus(); }
  });
}

/* ---------- Boot ---------- */
async function boot() {
  const log = $("#boot-log");
  const say = async (t, ms = 260) => { log.textContent += t + "\n"; await sleep(REDUCED ? 0 : ms); };
  await say(`portfolio — version ${CONFIG.version}`, 350);
  await say("[ ok ] mounting /home");
  const username = resolveUsername();
  await say(`[ .. ] fetching projects for ${username || "?"} from GitHub`);
  try {
    if (!username) throw new Error("No GitHub username set — add it to CONFIG.username in script.js.");
    try {
      Object.assign(state, await loadAll(username));
      await say(`[ ok ] ${visibleBase().length} projects loaded`);
    } catch (err) {
      // GitHub is unreachable or the account was not found: carry on without live data
      console.warn(err);
      await say(`[warn] ${err.message} Carrying on without live GitHub data.`);
      state.user = { login: username, name: CONFIG.name || username, html_url: "https://github.com/" + username, avatar_url: "", bio: "" };
      state.repos = [];
    }
    renderProfile(); renderLanguages(); renderGrid(); renderEducation(); renderExperience();
    bindEvents();
    await say("[ .. ] building 3D scene");
    buildScene();
    initTerminal();
    initCli();
    await say("[ ok ] scene ready");
    await say(`\nWelcome. This is ${displayName()}'s portfolio.`, 200);
  } catch (err) {
    console.error(err);
    await say("[fail] " + err.message);
    return;
  }

  const startBtn = $("#boot-start");
  startBtn.hidden = false;
  startBtn.focus();
  const start = () => {
    removeEventListener("keydown", onKey);
    $("#boot").classList.add("done");
    setTimeout(() => ($("#boot").hidden = true), 900);
    ["#nav", "#term", "#hint"].forEach((s) => ($(s).hidden = false));
    const hash = location.hash.slice(1);
    world3d.fly(HOME, 2.6).then(() => { if (SECTIONS[hash]) goTo(hash); });   // fly in from far away
  };
  const onKey = (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); start(); } };
  startBtn.addEventListener("click", start, { once: true });
  addEventListener("keydown", onKey);
}
boot();
