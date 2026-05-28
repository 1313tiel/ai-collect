const toolList = document.querySelector("#toolList");
const toolSearch = document.querySelector("#toolSearch");
const form = document.querySelector("#editorForm");
const saveStatus = document.querySelector("#saveStatus");
const previewLink = document.querySelector("#previewLink");
const logoPreview = document.querySelector("#logoPreview");

let tools = [];
let currentTool = null;

const fields = {
  id: document.querySelector("#id"),
  name: document.querySelector("#name"),
  desc: document.querySelector("#desc"),
  categoryTitle: document.querySelector("#categoryTitle"),
  tag: document.querySelector("#tag"),
  officialUrl: document.querySelector("#officialUrl"),
  logoText: document.querySelector("#logoText"),
  tags: document.querySelector("#tags"),
  intro: document.querySelector("#intro"),
  features: document.querySelector("#features"),
  scenarios: document.querySelector("#scenarios"),
  howTo: document.querySelector("#howTo"),
  faq: document.querySelector("#faq"),
  relatedIds: document.querySelector("#relatedIds")
};

function lineJoin(items) {
  return (items || []).join("\n");
}

function splitLines(value) {
  return String(value || "")
    .split(/\r?\n/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function featuresToText(features) {
  return (features || []).map((item) => `${item.title || ""}｜${item.text || ""}`).join("\n");
}

function textToFeatures(value) {
  return splitLines(value).map((line) => {
    const parts = line.split("｜");
    return {
      title: (parts.shift() || "").trim(),
      text: parts.join("｜").trim()
    };
  });
}

function faqToText(faq) {
  return (faq || []).map((item) => `${item.question || ""}｜${item.answer || ""}`).join("\n");
}

function textToFaq(value) {
  return splitLines(value).map((line) => {
    const parts = line.split("｜");
    return {
      question: (parts.shift() || "").trim(),
      answer: parts.join("｜").trim()
    };
  });
}

function setStatus(text, isError) {
  saveStatus.textContent = text;
  saveStatus.style.color = isError ? "#d33855" : "";
}

function selectTool(id) {
  currentTool = tools.find((tool) => tool.id === id) || tools[0];
  if (!currentTool) return;

  fields.id.value = currentTool.id;
  fields.name.value = currentTool.name || "";
  fields.desc.value = currentTool.desc || "";
  fields.categoryTitle.value = currentTool.categoryTitle || "";
  fields.tag.value = currentTool.tag || "";
  fields.officialUrl.value = currentTool.officialUrl || "";
  fields.logoText.value = currentTool.logoText || "";
  fields.tags.value = lineJoin(currentTool.tags);
  fields.intro.value = lineJoin(currentTool.intro);
  fields.features.value = featuresToText(currentTool.features);
  fields.scenarios.value = lineJoin(currentTool.scenarios);
  fields.howTo.value = lineJoin(currentTool.howTo);
  fields.faq.value = faqToText(currentTool.faq);
  fields.relatedIds.value = lineJoin(currentTool.relatedIds);
  logoPreview.textContent = currentTool.logoText || currentTool.name.slice(0, 2);
  previewLink.href = `./sites/detail.html?id=${encodeURIComponent(currentTool.id)}`;
  setStatus(`正在编辑：${currentTool.name}`);
  renderToolList();
}

function renderToolList() {
  const query = toolSearch.value.trim().toLowerCase();
  const matched = tools.filter((tool) => {
    const text = `${tool.name} ${tool.desc} ${tool.categoryTitle} ${tool.id}`.toLowerCase();
    return !query || text.includes(query);
  });

  toolList.innerHTML = matched
    .map(
      (tool) => `
        <button class="${currentTool && currentTool.id === tool.id ? "active" : ""}" type="button" data-id="${tool.id}">
          <strong>${tool.name}</strong>
          <small>${tool.categoryTitle} · ${tool.id}</small>
        </button>
      `
    )
    .join("");
}

function collectFormData() {
  return {
    id: currentTool.id,
    name: fields.name.value.trim() || currentTool.name,
    categoryId: currentTool.categoryId,
    categoryTitle: currentTool.categoryTitle,
    desc: fields.desc.value.trim(),
    tag: fields.tag.value.trim(),
    officialUrl: fields.officialUrl.value.trim(),
    logoText: fields.logoText.value.trim() || currentTool.logoText,
    tags: splitLines(fields.tags.value),
    intro: splitLines(fields.intro.value),
    features: textToFeatures(fields.features.value),
    scenarios: splitLines(fields.scenarios.value),
    howTo: splitLines(fields.howTo.value),
    faq: textToFaq(fields.faq.value),
    relatedIds: splitLines(fields.relatedIds.value)
  };
}

async function loadTools() {
  const response = await fetch("./api/tools");
  if (!response.ok) throw new Error("load failed");
  const data = await response.json();
  tools = data.tools || [];
  const params = new URLSearchParams(window.location.search);
  selectTool(params.get("id") || (tools[0] && tools[0].id));
}

toolList.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-id]");
  if (!button) return;
  selectTool(button.dataset.id);
});

toolSearch.addEventListener("input", renderToolList);
fields.logoText.addEventListener("input", () => {
  logoPreview.textContent = fields.logoText.value.trim() || fields.name.value.trim().slice(0, 2) || "AI";
});

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (!currentTool) return;

  const payload = collectFormData();
  setStatus("正在保存...");

  try {
    const response = await fetch(`./api/tools/${encodeURIComponent(currentTool.id)}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: "保存失败" }));
      throw new Error(error.message || "保存失败");
    }

    const saved = await response.json();
    currentTool = saved.tool;
    tools = tools.map((tool) => (tool.id === currentTool.id ? currentTool : tool));
    selectTool(currentTool.id);
    setStatus(`已保存：${currentTool.name}`);
  } catch (error) {
    setStatus(error.message || "保存失败", true);
  }
});

loadTools().catch(() => {
  setStatus("无法加载 data/tools.json，请确认通过 node server.mjs 访问。", true);
});
