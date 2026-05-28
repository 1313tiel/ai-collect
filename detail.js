const menuButton = document.querySelector("#menuButton");
const root = document.querySelector("#detailRoot");
const sideNav = document.querySelector("#detailSideNav");

function escapeHtml(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function getToolId() {
  const params = new URLSearchParams(window.location.search);
  return params.get("id") || "doubao";
}

function getOffset() {
  const topbar = document.querySelector(".topbar");
  return (topbar ? topbar.offsetHeight : 0) + 16;
}

function scrollToTarget(id) {
  const target = document.querySelector(id);
  if (!target) return;
  const y = target.getBoundingClientRect().top + window.pageYOffset - getOffset();
  window.scrollTo({ top: Math.max(0, y), behavior: "smooth" });
}

function uniqueCategories(tools) {
  const seen = new Set();
  return tools.filter((tool) => {
    if (seen.has(tool.categoryId)) return false;
    seen.add(tool.categoryId);
    return true;
  });
}

function placeholderText(tool) {
  return `${tool.name} 的完整详情还没有填写。你可以在本地内容编辑页补充介绍、功能、场景、使用方法和常见问题。`;
}

function renderList(items, emptyText) {
  const list = items && items.length ? items : [emptyText];
  return list.map((item) => `<li>${escapeHtml(item)}</li>`).join("");
}

function renderFeatures(tool) {
  if (!tool.features || !tool.features.length) {
    return `
      <div class="empty-detail-block">
        <strong>内容待补充</strong>
        <p>${escapeHtml(placeholderText(tool))}</p>
      </div>
    `;
  }

  return `
    <div class="feature-grid">
      ${tool.features
        .map(
          (feature) => `
            <div>
              <h3>${escapeHtml(feature.title)}</h3>
              <p>${escapeHtml(feature.text)}</p>
            </div>
          `
        )
        .join("")}
    </div>
  `;
}

function renderFaq(tool) {
  if (!tool.faq || !tool.faq.length) {
    return `
      <details open>
        <summary>这个工具的详情为什么较少？</summary>
        <p>${escapeHtml(placeholderText(tool))}</p>
      </details>
    `;
  }

  return tool.faq
    .map(
      (item, index) => `
        <details ${index === 0 ? "open" : ""}>
          <summary>${escapeHtml(item.question)}</summary>
          <p>${escapeHtml(item.answer)}</p>
        </details>
      `
    )
    .join("");
}

function renderRelated(tool, tools) {
  const byId = new Map(tools.map((item) => [item.id, item]));
  const related = (tool.relatedIds || []).map((id) => byId.get(id)).filter(Boolean);
  const fallback = tools.filter((item) => item.categoryId === tool.categoryId && item.id !== tool.id).slice(0, 4);
  const list = related.length ? related : fallback;

  if (!list.length) {
    return `<p class="muted-text">暂无相关推荐。</p>`;
  }

  return list
    .slice(0, 4)
    .map(
      (item) => `
        <a href="./detail.html?id=${encodeURIComponent(item.id)}">
          <span>${escapeHtml(item.logoText || item.name.slice(0, 2))}</span>
          <strong>${escapeHtml(item.name)}</strong>
        </a>
      `
    )
    .join("");
}

function renderSideNav(tools, activeCategoryId) {
  const categories = uniqueCategories(tools);
  sideNav.innerHTML = categories
    .map(
      (item, index) => `
        <a class="${item.categoryId === activeCategoryId ? "active" : ""}" href="../index.html#${escapeHtml(item.categoryId)}">
          <span>${String(index + 1).padStart(2, "0")}</span>${escapeHtml(item.categoryTitle)}
        </a>
      `
    )
    .join("");
}

function renderMissing(id, tools) {
  renderSideNav(tools, "");
  document.title = "未找到工具 | AI工具集";
  root.innerHTML = `
    <section class="hero-card detail-empty">
      <div class="tool-logo">?</div>
      <div class="hero-main">
        <div class="eyebrow">工具详情</div>
        <h1>未找到对应工具</h1>
        <p>当前地址中的工具 ID 为 ${escapeHtml(id)}，但本地数据文件里没有找到对应内容。</p>
      </div>
      <div class="hero-actions">
        <a class="primary-button" href="../index.html">返回首页</a>
        <a class="secondary-button" href="../index.html#hot">浏览工具</a>
      </div>
    </section>
  `;
}

function renderTool(tool, tools) {
  renderSideNav(tools, tool.categoryId);
  document.title = `${tool.name} - AI工具详情 | AI工具集`;

  const tags = tool.tags && tool.tags.length ? tool.tags : [tool.categoryTitle];
  const intro = tool.intro && tool.intro.length ? tool.intro : [tool.desc, placeholderText(tool)];
  const officialButton = tool.officialUrl
    ? `<a class="primary-button" href="${escapeHtml(tool.officialUrl)}" target="_blank" rel="noreferrer">访问官网</a>`
    : `<span class="primary-button disabled-button" aria-disabled="true">暂无官网</span>`;
  const officialCard = tool.officialUrl
    ? `
      <a href="${escapeHtml(tool.officialUrl)}" target="_blank" rel="noreferrer">
        <strong>访问官网</strong>
        <span>打开 ${escapeHtml(tool.name)} 官方网站</span>
      </a>
    `
    : `
      <div class="download-card disabled-card">
        <strong>暂无官网</strong>
        <span>当前还没有填写官网地址，请从首页继续浏览其他工具。</span>
      </div>
    `;

  root.innerHTML = `
    <div class="breadcrumb">
      <a href="../index.html">首页</a>
      <span>/</span>
      <a href="../index.html#${escapeHtml(tool.categoryId)}">${escapeHtml(tool.categoryTitle)}</a>
      <span>/</span>
      <strong>${escapeHtml(tool.name)}</strong>
    </div>

    <section class="hero-card">
      <div class="tool-logo">${escapeHtml(tool.logoText || tool.name.slice(0, 2))}</div>
      <div class="hero-main">
        <div class="eyebrow">${escapeHtml(tool.categoryTitle)} · 本地详情</div>
        <h1>${escapeHtml(tool.name)}</h1>
        <p>${escapeHtml(tool.desc)}</p>
        <div class="tag-row">
          ${tags.map((tag) => `<span>${escapeHtml(tag)}</span>`).join("")}
        </div>
      </div>
      <div class="hero-actions">
        ${officialButton}
        <a class="secondary-button" href="#intro">查看介绍</a>
      </div>
    </section>

    <div class="detail-layout">
      <article class="content-column">
        <section class="content-card" id="intro">
          <h2>${escapeHtml(tool.name)}是什么？</h2>
          ${intro.map((item) => `<p>${escapeHtml(item)}</p>`).join("")}
        </section>

        <section class="content-card" id="features">
          <h2>主要功能</h2>
          ${renderFeatures(tool)}
        </section>

        <section class="content-card" id="usage">
          <h2>适合哪些场景？</h2>
          <ul class="check-list">${renderList(tool.scenarios, "内容待补充：请在编辑页填写适用场景。")}</ul>
        </section>

        <section class="content-card" id="howto">
          <h2>如何使用？</h2>
          <ol class="step-list">${renderList(tool.howTo, "内容待补充：请在编辑页填写使用方法。")}</ol>
        </section>

        <section class="content-card" id="download">
          <h2>访问入口</h2>
          <div class="download-grid">
            ${officialCard}
            <a href="../index.html#${escapeHtml(tool.categoryId)}">
              <strong>返回分类</strong>
              <span>回到首页中的 ${escapeHtml(tool.categoryTitle)} 模块</span>
            </a>
            <a href="../index.html">
              <strong>返回首页</strong>
              <span>继续浏览 AI工具集 中的其他工具</span>
            </a>
          </div>
        </section>

        <section class="content-card" id="faq">
          <h2>常见问题</h2>
          ${renderFaq(tool)}
        </section>
      </article>

      <aside class="right-column">
        <div class="sticky-panel">
          <section class="side-card toc">
            <h2>目录</h2>
            <a href="#intro">工具介绍</a>
            <a href="#features">主要功能</a>
            <a href="#usage">适用场景</a>
            <a href="#howto">使用方法</a>
            <a href="#download">访问入口</a>
            <a href="#faq">常见问题</a>
          </section>

          <section class="side-card">
            <h2>工具信息</h2>
            <dl class="info-list">
              <div><dt>ID</dt><dd>${escapeHtml(tool.id)}</dd></div>
              <div><dt>名称</dt><dd>${escapeHtml(tool.name)}</dd></div>
              <div><dt>分类</dt><dd>${escapeHtml(tool.categoryTitle)}</dd></div>
              <div><dt>标签</dt><dd>${escapeHtml(tool.tag || "常规")}</dd></div>
            </dl>
          </section>

          <section class="side-card">
            <h2>相似工具</h2>
            <div class="related-list">${renderRelated(tool, tools)}</div>
          </section>
        </div>
      </aside>
    </div>
  `;
}

async function loadDetail() {
  try {
    const response = await fetch("../data/tools.json?v=20260526-dynamic-detail");
    if (!response.ok) throw new Error("tools json load failed");
    const data = await response.json();
    const tools = data.tools || [];
    const id = getToolId();
    const tool = tools.find((item) => item.id === id);
    if (!tool) {
      renderMissing(id, tools);
      return;
    }
    renderTool(tool, tools);
    updateToc();
  } catch (error) {
    root.innerHTML = `
      <section class="hero-card detail-empty">
        <div class="tool-logo">!</div>
        <div class="hero-main">
          <div class="eyebrow">加载失败</div>
          <h1>无法读取本地数据</h1>
          <p>请确认 data/tools.json 存在，并通过 node server.mjs 访问页面。</p>
        </div>
      </section>
    `;
  }
}

function updateToc() {
  const tocLinks = Array.from(document.querySelectorAll(".toc a"));
  const current = tocLinks
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean)
    .map((target) => ({
      id: target.id,
      distance: Math.abs(target.getBoundingClientRect().top - getOffset())
    }))
    .sort((a, b) => a.distance - b.distance)[0];

  if (!current) return;
  tocLinks.forEach((link) => {
    link.classList.toggle("active", link.getAttribute("href") === `#${current.id}`);
  });
}

menuButton.addEventListener("click", () => {
  document.body.classList.toggle("nav-open");
});

document.addEventListener("click", (event) => {
  const link = event.target.closest('a[href^="#"]');
  if (!link) return;
  const href = link.getAttribute("href");
  const target = document.querySelector(href);
  if (!target) return;
  event.preventDefault();
  scrollToTarget(href);
  history.replaceState(null, "", href);
});

document.addEventListener("click", (event) => {
  if (!event.target.closest(".side-nav a")) return;
  document.body.classList.remove("nav-open");
});

window.addEventListener("scroll", updateToc, { passive: true });
loadDetail();
