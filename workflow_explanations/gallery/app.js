"use strict";

const DATA_URL = "../experiments/results.json";
const TOPICS = {
  tcp: { en: "TCP", zh: "TCP" },
  cache: { en: "Redis / Memcached", zh: "Redis / Memcached" },
  git: { en: "Git merge / rebase", zh: "Git merge / rebase" }
};
const SECTION_IDS = new Set(["top", "main", "latest", "batch", "single", "video", "method", "limitations"]);
const state = { lang: "en", topic: "tcp", section: "batch", data: null };
const formatter = () => new Intl.NumberFormat(state.lang === "zh-CN" ? "zh-CN" : "en-US");

function topicName(topic, lang = state.lang) {
  const entry = TOPICS[topic];
  if (!entry) throw new Error("Unknown experiment topic: " + topic);
  return entry[lang === "zh-CN" ? "zh" : "en"];
}

function setText(element, en, zh) {
  element.textContent = state.lang === "zh-CN" ? zh : en;
}

function formatTokens(value) {
  return formatter().format(Math.round(value));
}

function formatUsd(value) {
  return "$" + new Intl.NumberFormat(state.lang === "zh-CN" ? "zh-CN" : "en-US", {
    minimumFractionDigits: 6,
    maximumFractionDigits: 6
  }).format(value);
}

function formatSeconds(milliseconds) {
  return new Intl.NumberFormat(state.lang === "zh-CN" ? "zh-CN" : "en-US", {
    minimumFractionDigits: 3,
    maximumFractionDigits: 3
  }).format(milliseconds / 1000);
}

function formatPercent(value) {
  return new Intl.NumberFormat(state.lang === "zh-CN" ? "zh-CN" : "en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(Math.abs(value)) + "%";
}

function requiredRecord(record, label) {
  if (!record || !record.usage) throw new Error("Missing experiment record: " + label);
  for (const key of ["input_tokens", "cached_input_tokens", "output_tokens"]) {
    if (!Number.isFinite(record.usage[key])) throw new Error("Invalid " + label + ".usage." + key);
  }
  for (const key of ["cost_usd", "wall_ms"]) {
    if (!Number.isFinite(record[key])) throw new Error("Invalid " + label + "." + key);
  }
}

function validateData(data) {
  if (!data || data.format !== "workflow.comparison.summary") {
    throw new Error("Unexpected results.json format");
  }
  const batch = data.three_html_one_conversation;
  if (!batch || !batch.pricing_usd_per_million) throw new Error("Missing three_html_one_conversation data");
  requiredRecord(batch.skill, "three_html_one_conversation.skill");
  requiredRecord(batch.workflow, "three_html_one_conversation.workflow");
  const latest = data.html_052_single;
  if (!latest || !Array.isArray(latest.workflow_phases)) throw new Error("Missing 0.5.2 comparison data");
  requiredRecord(latest.skill, "html_052_single.skill");
  requiredRecord(latest.workflow, "html_052_single.workflow");

  const single = data.single_html;
  if (!single || !single.baseline || !Array.isArray(single.workflow_samples)) {
    throw new Error("Missing single_html data");
  }
  for (const topic of Object.keys(TOPICS)) {
    requiredRecord(single.baseline[topic], "single_html.baseline." + topic);
    const samples = single.workflow_samples.filter((sample) => sample.topic === topic);
    if (samples.length !== 3) throw new Error("Expected three Workflow samples for topic " + topic);
    samples.forEach((sample, index) => requiredRecord(sample, "single_html.workflow_samples." + topic + "." + (index + 1)));
  }

  if (!data.video || !data.video.pricing_usd_per_million) throw new Error("Missing video data");
  for (const stage of ["reuse", "text"]) {
    if (!data.video[stage]) throw new Error("Missing video." + stage + " data");
    requiredRecord(data.video[stage].skill, "video." + stage + ".skill");
    requiredRecord(data.video[stage].workflow, "video." + stage + ".workflow");
  }
}

function makeCell(text, header = false) {
  const cell = document.createElement(header ? "th" : "td");
  if (header) cell.scope = "row";
  cell.textContent = text;
  return cell;
}

function appendMetricCells(row, record) {
  const usage = record.usage;
  row.append(
    makeCell(formatTokens(usage.input_tokens)),
    makeCell(formatTokens(usage.cached_input_tokens) + (Number.isFinite(usage.cache_hit_percent) ? " · " + usage.cache_hit_percent.toFixed(2) + "%" : "")),
    makeCell(formatTokens(usage.output_tokens)),
    makeCell(formatUsd(record.cost_usd)),
    makeCell(formatSeconds(record.wall_ms))
  );
}

function appendMethodRow(tbody, label, record, sublabel) {
  const row = document.createElement("tr");
  const method = makeCell(label, true);
  if (sublabel) {
    const sub = document.createElement("span");
    sub.className = "subcell";
    sub.textContent = sublabel;
    method.append(sub);
  }
  row.append(method);
  appendMetricCells(row, record);
  tbody.append(row);
}

function mean(values) {
  if (!values.length) throw new Error("Cannot calculate a mean without samples");
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

function meanRecords(records) {
  return {
    cost_usd: mean(records.map((record) => record.cost_usd)),
    wall_ms: mean(records.map((record) => record.wall_ms)),
    usage: {
      input_tokens: mean(records.map((record) => record.usage.input_tokens)),
      cached_input_tokens: mean(records.map((record) => record.usage.cached_input_tokens)),
      output_tokens: mean(records.map((record) => record.usage.output_tokens))
    }
  };
}

function reductionPercent(baseline, comparison) {
  return ((baseline - comparison) / baseline) * 100;
}

function describeComparison(enLabel, zhLabel, baseline, comparison) {
  const change = reductionPercent(baseline, comparison);
  if (Math.abs(change) < 0.005) {
    return state.lang === "zh-CN" ? zhLabel + "持平" : enLabel + " was unchanged";
  }
  if (change > 0) {
    return state.lang === "zh-CN"
      ? zhLabel + "减少 " + formatPercent(change)
      : enLabel + " was " + formatPercent(change) + " lower";
  }
  return state.lang === "zh-CN"
    ? zhLabel + "增加 " + formatPercent(change)
    : enLabel + " was " + formatPercent(change) + " higher";
}

function renderLatest() {
  const latest = state.data.html_052_single;
  const tbody = document.getElementById("latest-rows");
  tbody.replaceChildren();
  appendMethodRow(tbody, "Skill", latest.skill);
  appendMethodRow(tbody, "Workflow", latest.workflow);
  const input = describeComparison("input-token count", "输入 token 数", latest.skill.usage.input_tokens, latest.workflow.usage.input_tokens);
  const cost = describeComparison("cost", "成本", latest.skill.cost_usd, latest.workflow.cost_usd);
  const time = describeComparison("time", "耗时", latest.skill.wall_ms, latest.workflow.wall_ms);
  setText(document.getElementById("latest-delta"), "In this sample, Workflow's " + input + ", " + cost + ", and " + time + ".",
    "本样本中，Workflow 的" + input + "、" + cost + "、" + time + "。");
  const main = latest.workflow_components.find(item => item.name === "initiating_main");
  const worker = latest.workflow_components.find(item => item.name === "sdk_main_worker");
  const gap = latest.cache_cost_gap;
  setText(document.getElementById("latest-cost"),
    "SDK worker: " + formatUsd(worker.cost_usd) + "; initiating Main: " + formatUsd(main.cost_usd) + ". Uncached input: Workflow " + formatTokens(gap.workflow_uncached_input) + ", Skill " + formatTokens(gap.skill_uncached_input) + ". Net cost difference: +" + formatUsd(gap.net_difference_usd) + ".",
    "SDK worker：" + formatUsd(worker.cost_usd) + "；发起 Main：" + formatUsd(main.cost_usd) + "。未缓存输入：Workflow " + formatTokens(gap.workflow_uncached_input) + "，Skill " + formatTokens(gap.skill_uncached_input) + "。净成本差额：+" + formatUsd(gap.net_difference_usd) + "。");
  const phases = Object.fromEntries(latest.workflow_phases.map(item => [item.name, item.wall_ms]));
  setText(document.getElementById("latest-time"),
    "Startup and routing: " + formatSeconds(phases.startup_and_routing) + " s; SDK production: " + formatSeconds(phases.sdk_production) + " s; Host observation, semantic acceptance and recording: " + formatSeconds(phases.host_observation_semantic_acceptance_and_recording) + " s; final reply: " + formatSeconds(phases.final_reply) + " s.",
    "启动与路线选择：" + formatSeconds(phases.startup_and_routing) + " 秒；SDK 制作：" + formatSeconds(phases.sdk_production) + " 秒；Host 观察、语义验收与记录：" + formatSeconds(phases.host_observation_semantic_acceptance_and_recording) + " 秒；最后回复：" + formatSeconds(phases.final_reply) + " 秒。");
}

function renderBatch() {
  const batch = state.data.three_html_one_conversation;
  const tbody = document.getElementById("batch-rows");
  tbody.replaceChildren();
  const skillLabel = state.lang === "zh-CN" ? "Skill · 1 次运行" : "Skill · 1 trial";
  const workflowLabel = state.lang === "zh-CN" ? "Codex Workflow · 1 次运行" : "Codex Workflow · 1 trial";
  appendMethodRow(tbody, skillLabel, batch.skill);
  appendMethodRow(tbody, workflowLabel, batch.workflow);

  const inputChange = describeComparison("input-token count", "输入 token 数", batch.skill.usage.input_tokens, batch.workflow.usage.input_tokens);
  const costChange = describeComparison("API-equivalent cost", "API 等价成本", batch.skill.cost_usd, batch.workflow.cost_usd);
  const timeChange = describeComparison("full-delivery time", "完整交付耗时", batch.skill.wall_ms, batch.workflow.wall_ms);
  setText(
    document.getElementById("batch-delta"),
    "In this one batch comparison (one three-page delivery per method), Workflow's " + inputChange + ", its " + costChange + ", and its " + timeChange + ". This describes these two runs only.",
    "在这一次批量对照中（每种方法各交付三页），Workflow 的" + inputChange + "、" + costChange + "、" + timeChange + "。结论仅描述这两次运行。"
  );
}

function renderSingle() {
  const topic = state.topic;
  const baseline = state.data.single_html.baseline[topic];
  const samples = state.data.single_html.workflow_samples
    .filter((sample) => sample.topic === topic)
    .sort((left, right) => left.repetition - right.repetition);
  const workflowMean = meanRecords(samples);
  const summary = document.getElementById("single-summary-rows");
  summary.replaceChildren();
  appendMethodRow(
    summary,
    state.lang === "zh-CN" ? "Skill · 固定基线" : "Skill · fixed baseline",
    baseline,
    state.lang === "zh-CN" ? "1 次运行" : "1 trial"
  );
  appendMethodRow(
    summary,
    state.lang === "zh-CN" ? "Workflow · 运行均值" : "Workflow · run mean",
    workflowMean,
    state.lang === "zh-CN" ? samples.length + " 次运行" : samples.length + " runs"
  );

  const runRows = document.getElementById("single-run-rows");
  runRows.replaceChildren();
  appendMethodRow(
    runRows,
    state.lang === "zh-CN" ? "Skill · 固定基线" : "Skill · fixed baseline",
    baseline,
    state.lang === "zh-CN" ? "1 次运行" : "1 trial"
  );
  samples.forEach((sample) => {
    const row = document.createElement("tr");
    const method = makeCell(
      state.lang === "zh-CN" ? "Workflow · 第 " + sample.repetition + " 次" : "Workflow · run " + sample.repetition,
      true
    );
    row.append(method);
    appendMetricCells(row, sample);
    runRows.append(row);
  });

  const topicEn = topicName(topic, "en");
  const topicZh = topicName(topic, "zh-CN");
  const condition = document.querySelector("#single-condition span");
  setText(
    condition,
    topicEn + " · Skill 1 fixed trial vs Workflow " + samples.length + "-run mean",
    topicZh + " · Skill 固定样本 1 次，对比 Workflow " + samples.length + " 次均值"
  );
  const caption = document.getElementById("run-caption");
  setText(
    caption,
    topicEn + " · one fixed Skill baseline and " + samples.length + " Workflow runs.",
    topicZh + " · Skill 固定基线一次，Workflow 运行 " + samples.length + " 次。"
  );
  document.getElementById("run-count").textContent = state.lang === "zh-CN"
    ? "共 " + (samples.length + 1) + " 条记录"
    : (samples.length + 1) + " records";

  const inputChange = describeComparison("input-token count", "输入 token 数", baseline.usage.input_tokens, workflowMean.usage.input_tokens);
  const costChange = describeComparison("API-equivalent cost", "API 等价成本", baseline.cost_usd, workflowMean.cost_usd);
  const timeChange = describeComparison("full-delivery time", "完整交付耗时", baseline.wall_ms, workflowMean.wall_ms);
  setText(
    document.getElementById("single-delta"),
    "For " + topicEn + ", compared with the one fixed Skill trial, Workflow's three-run mean: " + inputChange + "; " + costChange + "; " + timeChange + ". These are descriptive sample comparisons.",
    topicZh + "主题中，Workflow 三次运行均值的" + inputChange + "、" + costChange + "、" + timeChange + "（对比一次固定 Skill 基线）。这些数字仅描述本组样本。"
  );
}

function renderVideo() {
  const tbody = document.getElementById("video-rows");
  tbody.replaceChildren();
  const stages = [
    { id: "reuse", en: "Reuse same supplied assets", zh: "复用相同已有素材" },
    { id: "text", en: "Manuscript only", zh: "仅重写稿件" }
  ];
  for (const stage of stages) {
    const rows = state.data.video[stage.id];
    for (const method of ["skill", "workflow"]) {
      const row = document.createElement("tr");
      const stageText = state.lang === "zh-CN" ? stage.zh + " · 1 次/方法" : stage.en + " · 1 trial/method";
      row.append(makeCell(stageText, true));
      row.append(makeCell(method === "skill" ? "Skill" : "Workflow"));
      appendMetricCells(row, rows[method]);
      tbody.append(row);
    }
  }

  const reuseCost = describeComparison("API-equivalent cost", "API 等价成本", state.data.video.reuse.skill.cost_usd, state.data.video.reuse.workflow.cost_usd);
  const reuseTime = describeComparison("full-delivery time", "完整交付耗时", state.data.video.reuse.skill.wall_ms, state.data.video.reuse.workflow.wall_ms);
  const textCost = describeComparison("API-equivalent cost", "API 等价成本", state.data.video.text.skill.cost_usd, state.data.video.text.workflow.cost_usd);
  const textTime = describeComparison("full-delivery time", "完整交付耗时", state.data.video.text.skill.wall_ms, state.data.video.text.workflow.wall_ms);
  setText(
    document.getElementById("video-delta"),
    "For the single reuse trials, Workflow's " + reuseCost + " and its " + reuseTime + ". For the single manuscript-only trials, Workflow's " + textCost + " and its " + textTime + ".",
    "在各一次的素材复用样本中，Workflow 的" + reuseCost + "、" + reuseTime + "；在各一次的仅重写稿件样本中，Workflow 的" + textCost + "、" + textTime + "。"
  );
}

function renderPricing() {
  const batch = state.data.three_html_one_conversation.pricing_usd_per_million;
  const video = state.data.video.pricing_usd_per_million;
  const fresh = state.data.single_html.pricing_usd_per_million;
  const reasoningIncluded = state.data.single_html.pricing_usd_per_million.reasoning_already_in_output;
  const batchPricesEn = "$" + batch.input + " fresh input / $" + batch.cached_input + " cached input / $" + batch.output + " output";
  const batchPricesZh = "未缓存输入 $" + batch.input + " / 缓存输入 $" + batch.cached_input + " / 输出 $" + batch.output;
  const htmlPricesEn = "$" + fresh.fresh_input_per_million + " fresh input / $" + fresh.cached_input_per_million + " cached input / $" + fresh.output_per_million + " output";
  const htmlPricesZh = "未缓存输入 $" + fresh.fresh_input_per_million + " / 缓存输入 $" + fresh.cached_input_per_million + " / 输出 $" + fresh.output_per_million;
  const videoPricesEn = "$" + video.input + " fresh input / $" + video.cached_input + " cached input / $" + video.output + " output";
  const videoPricesZh = "未缓存输入 $" + video.input + " / 缓存输入 $" + video.cached_input + " / 输出 $" + video.output;
  setText(
    document.getElementById("pricing-note"),
    "Luna batch: " + batchPricesEn + ". Historical Sol single-page HTML: " + htmlPricesEn + ". Video and text: " + videoPricesEn + ". Reasoning tokens are " + (reasoningIncluded ? "included" : "not included") + " in output.",
    "Luna 三页批量：" + batchPricesZh + "。历史 Sol 单页 HTML：" + htmlPricesZh + "。视频与文本：" + videoPricesZh + "。推理 token " + (reasoningIncluded ? "已计入" : "未计入") + "输出。"
  );
}

function renderArtifacts() {
  const topic = state.topic;
  for (const arm of ["skill", "workflow", "pi"]) {
    const matches = state.data.three_html_one_conversation.artifacts.filter(record => record.topic === topic && record.arm === arm);
    if (matches.length !== 1) throw new Error("Expected one measured artifact for " + topic + "/" + arm);
    const artifact = matches[0];
    if (typeof artifact.path !== "string" || !/^[a-f0-9]{64}$/.test(artifact.sha256)) throw new Error("Missing artifact path or content version");
    const url = artifact.path + "?v=" + artifact.sha256;
    const method = {skill:"Skill",workflow:"Codex Workflow",pi:"Pi Workflow"}[arm];
    const title = state.lang === "zh-CN"
      ? "三页批量实验中的 " + method + " " + topicName(topic) + " 讲解页"
      : method + " " + topicName(topic) + " explainer from the three-page batch experiment";
    const frame = document.getElementById(arm + "-preview");
    if (frame.getAttribute("src") !== url) {
      // Initial TCP navigation and a later deep-link/topic navigation must not
      // race in the same browsing context. Keep a frame only for identical bytes.
      const next = frame.cloneNode(false);
      next.src = url;
      next.title = title;
      next.setAttribute("loading", "eager");
      frame.replaceWith(next);
    } else frame.title = title;
    const link = document.getElementById(arm + "-artifact-link");
    link.href = url;
    link.removeAttribute("aria-disabled");
  }

  const caption = document.getElementById("artifact-caption");
  setText(
    caption,
    topicName(topic, "en") + " · from the three-page batch conversation",
    topicName(topic, "zh-CN") + " · 来自三页批量对话"
  );

  document.querySelectorAll(".topic-button").forEach((button) => {
    button.setAttribute("aria-pressed", button.dataset.topic === topic ? "true" : "false");
  });
}

function renderLanguage() {
  document.documentElement.lang = state.lang;
  document.querySelectorAll("[data-en][data-zh]").forEach((element) => {
    element.textContent = element.dataset[state.lang === "zh-CN" ? "zh" : "en"];
  });
  const toggle = document.getElementById("language-toggle");
  toggle.setAttribute("aria-label", state.lang === "zh-CN" ? "Switch language to English" : "切换为中文");
  document.querySelector(".primary-nav").setAttribute("aria-label", state.lang === "zh-CN" ? "主导航" : "Primary navigation");
  document.getElementById("batch-topic-picker").setAttribute("aria-label", state.lang === "zh-CN" ? "选择实验主题" : "Choose an experiment topic");
  document.getElementById("single-topic-picker").setAttribute("aria-labelledby", "single-topic-label");
  document.getElementById("data-error").querySelectorAll("[data-en][data-zh]").forEach((element) => {
    element.textContent = element.dataset[state.lang === "zh-CN" ? "zh" : "en"];
  });
}

function renderAll() {
  renderLanguage();
  if (!state.data) return;
  renderArtifacts();
  renderLatest();
  renderBatch();
  renderSingle();
  renderVideo();
  renderPricing();
}

function parseLocationHash() {
  const raw = window.location.hash.slice(1);
  if (!raw) return {};
  const parts = raw.split("?");
  const section = decodeURIComponent(parts[0]);
  const params = new URLSearchParams(parts.slice(1).join("?"));
  const parsed = {};
  if (SECTION_IDS.has(section)) parsed.section = section;
  const topic = params.get("topic");
  if (topic && Object.hasOwn(TOPICS, topic)) parsed.topic = topic;
  const lang = params.get("lang");
  if (lang === "en" || lang === "zh-CN") parsed.lang = lang;
  return parsed;
}

function applyLocationHash(shouldScroll) {
  const parsed = parseLocationHash();
  if (parsed.section) state.section = parsed.section;
  if (parsed.topic) state.topic = parsed.topic;
  if (parsed.lang) state.lang = parsed.lang;
  renderAll();
  if (shouldScroll && parsed.section) {
    const target = document.getElementById(parsed.section);
    if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

function writeLocationHash() {
  const hash = "#" + encodeURIComponent(state.section) +
    "?topic=" + encodeURIComponent(state.topic) +
    "&lang=" + encodeURIComponent(state.lang);
  if (window.location.hash !== hash) window.history.pushState(null, "", hash);
}

document.getElementById("language-toggle").addEventListener("click", () => {
  state.lang = state.lang === "en" ? "zh-CN" : "en";
  renderAll();
  writeLocationHash();
});

document.querySelectorAll(".topic-picker").forEach((picker) => {
  const section = picker.id === "single-topic-picker" ? "single" : "batch";
  picker.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-topic]");
    if (!button) return;
    state.topic = button.dataset.topic;
    state.section = section;
    renderAll();
    writeLocationHash();
  });
});

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    const id = link.getAttribute("href").slice(1);
    if (!SECTION_IDS.has(id)) return;
    event.preventDefault();
    state.section = id;
    writeLocationHash();
    const target = document.getElementById(id);
    if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

window.addEventListener("popstate", () => applyLocationHash(true));
window.addEventListener("hashchange", () => applyLocationHash(true));

async function loadExperimentData() {
  try {
    const response = await fetch(DATA_URL, { cache: "no-cache" });
    if (!response.ok) throw new Error("HTTP " + response.status + " while fetching " + DATA_URL);
    const data = await response.json();
    validateData(data);
    state.data = data;
    document.getElementById("data-error").hidden = true;
    renderAll();
    const locationSection = parseLocationHash().section;
    if (locationSection) document.getElementById(locationSection)?.scrollIntoView({ block: "start" });
  } catch (error) {
    console.error("Unable to load the experiment gallery data from " + DATA_URL, error);
    document.getElementById("data-error").hidden = false;
    renderLanguage();
  }
}

applyLocationHash(false);
loadExperimentData();
