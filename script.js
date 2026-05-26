const palette = ["#2f74ff", "#23b384", "#ff9f1a", "#7b61ff", "#e64f71", "#20a4f3", "#10a37f", "#f05a28"];

const quickLinks = ["Kimi", "豆包", "DeepSeek", "即梦AI", "通义千问", "腾讯元宝", "秘塔AI", "可灵AI", "ChatGPT", "Claude"];

const sections = [
  {
    id: "hot",
    title: "热门AI工具",
    tools: [
      ["Kimi", "月之暗面推出的智能助手，支持长文本阅读、联网搜索和文件解析", "hot"],
      ["豆包", "字节跳动推出的AI智能助手，覆盖写作、问答、图像和办公场景", "hot"],
      ["DeepSeek", "深度求索推出的高性能大语言模型和AI助手", "hot"],
      ["ChatGPT", "OpenAI推出的对话式AI助手，适合写作、编程、分析和创意任务", "hot"],
      ["Claude", "Anthropic推出的AI助手，擅长长文档理解、推理和写作", "hot"],
      ["通义千问", "阿里云推出的大模型助手，支持聊天、写作、代码和多模态创作", "hot"],
      ["腾讯元宝", "腾讯推出的AI助手，整合搜索、文档、问答和创作能力", "hot"],
      ["秘塔AI搜索", "AI搜索与研究助手，支持总结网页、追问和结构化答案", "hot"],
      ["Midjourney", "知名AI图像生成工具，可通过文本提示生成高质量视觉作品", "hot"],
      ["可灵AI", "快手推出的视频生成与创意影像平台", "hot"],
      ["即梦AI", "剪映旗下AI创作平台，支持文生图、图生视频和智能画布", "hot"],
      ["LiblibAI", "国内AI图像模型与创作社区，支持在线生图和模型资源", "hot"]
    ]
  },
  {
    id: "latest",
    title: "最新收录",
    tools: [
      ["Seedance", "字节跳动推出的视频生成模型，适合短片、广告和创意素材制作", "new"],
      ["Lovart", "面向设计任务的AI智能体，可生成品牌、海报和视觉方案", "new"],
      ["Trickle AI", "自然语言创建应用、网站和页面的AI构建工具", "new"],
      ["Same.new", "输入网址即可复刻前端页面的AI网页生成工具", "new"],
      ["Dia Browser", "The Browser Company推出的AI浏览器，内置智能辅助能力", "new"],
      ["Genspark AI Sheets", "支持AI处理数据、生成表格和自动化研究的智能表格工具", "new"],
      ["Seko", "AI视频创作工具，支持创意脚本和影像生成", "new"],
      ["Trae 2.0", "字节跳动旗下AI编程工具，支持项目级代码理解与生成", "new"]
    ]
  },
  {
    id: "writing",
    title: "AI写作工具",
    tools: [
      ["Notion AI", "嵌入Notion工作区的写作、总结和知识管理助手"],
      ["Jasper", "营销文案、品牌内容和长文写作AI平台"],
      ["Copy.ai", "用于广告、邮件、社媒和销售文案的AI写作工具"],
      ["Grammarly", "英文写作润色、语法检查和语气优化助手"],
      ["QuillBot", "英文改写、摘要、引用和语法辅助工具"],
      ["Writesonic", "面向博客、广告和SEO内容生产的AI写作平台"],
      ["火山写作", "中文写作润色、校对、扩写和风格转换工具"],
      ["新华妙笔", "面向公文、新闻和政企场景的中文智能写作平台"]
    ]
  },
  {
    id: "image",
    title: "AI图像工具",
    tools: [
      ["Midjourney", "文本生成图像工具，适合插画、概念图和商业视觉"],
      ["Stable Diffusion", "开源AI绘画模型生态，可本地部署和深度定制"],
      ["DALL·E", "OpenAI图像生成与编辑模型，可生成多风格图像"],
      ["Adobe Firefly", "Adobe推出的生成式图像、填充和设计素材工具"],
      ["Leonardo.Ai", "游戏、产品、角色和插画方向的AI图像创作平台"],
      ["稿定AI", "在线设计平台内置AI图片、海报和营销素材生成能力"],
      ["文心一格", "百度推出的AI艺术和图像生成平台"],
      ["美图WHEE", "美图推出的AI视觉创作工具，适合图片和设计生成"]
    ]
  },
  {
    id: "video",
    title: "AI视频工具",
    tools: [
      ["Runway", "AI视频生成、编辑、抠像和视觉特效创作平台"],
      ["Pika", "通过文本或图片生成短视频的AI创作工具"],
      ["Luma Dream Machine", "高质量文生视频和图生视频模型"],
      ["可灵AI", "中文场景常用AI视频生成工具，支持图生视频和镜头控制"],
      ["即梦AI", "字节旗下创意视频和AI视觉生成平台"],
      ["海螺AI视频", "MiniMax推出的AI视频生成工具"],
      ["HeyGen", "AI数字人视频、口播和多语言翻译工具"],
      ["剪映AI", "剪映内置的智能剪辑、字幕、脚本和视频生成能力"]
    ]
  },
  {
    id: "office",
    title: "AI办公工具",
    tools: [
      ["Microsoft Copilot", "微软Office、Windows和企业应用中的AI助手"],
      ["飞书妙记", "会议录音转写、总结和待办提取工具"],
      ["Gamma", "AI生成演示文稿、网页和文档的办公创作工具"],
      ["Tome", "基于AI生成故事化演示文稿和视觉页面"],
      ["WPS AI", "WPS办公套件中的写作、表格和PPT助手"],
      ["钉钉AI助理", "面向组织协同、会议和知识库的办公AI助手"],
      ["夸克扫描王AI", "文档扫描、识别、总结和格式转换工具"],
      ["ChatPDF", "上传PDF后进行问答、摘要和引用定位的AI工具"]
    ]
  },
  {
    id: "chat",
    title: "AI聊天助手",
    tools: [
      ["ChatGPT", "通用对话、分析、写作和编程AI助手"],
      ["Claude", "长文本理解和高质量写作推理助手"],
      ["Gemini", "Google推出的多模态AI助手"],
      ["Poe", "聚合多种AI模型的问答和机器人平台"],
      ["Perplexity", "带来源引用的AI答案引擎和研究助手"],
      ["天工AI", "昆仑万维推出的AI助手，覆盖搜索、写作和音乐等能力"],
      ["文心一言", "百度推出的中文大模型聊天助手"],
      ["讯飞星火", "科大讯飞推出的认知大模型助手"]
    ]
  },
  {
    id: "agent",
    title: "AI智能体",
    tools: [
      ["Coze", "字节跳动推出的AI Bot与智能体搭建平台"],
      ["Dify", "开源LLM应用开发平台，支持工作流、RAG和Agent"],
      ["扣子", "面向国内用户的AI智能体创建和发布平台"],
      ["AutoGPT", "开源自治智能体项目，可分解任务并调用工具执行"],
      ["Manus", "通用AI智能体产品，面向复杂任务执行和自动化"],
      ["Flowith", "节点式AI工作流和知识协作平台"],
      ["Genspark", "面向研究、搜索和自动生成页面的AI智能体平台"],
      ["LangGraph", "用于构建可控Agent工作流的开发框架"]
    ]
  },
  {
    id: "coding",
    title: "AI编程工具",
    tools: [
      ["GitHub Copilot", "主流AI代码补全、解释和编程助手"],
      ["Cursor", "内置AI Agent的代码编辑器，支持项目级理解和修改"],
      ["Trae", "字节跳动推出的AI原生IDE和编程助手"],
      ["Codeium", "代码补全、聊天和企业级AI编程工具"],
      ["Tabnine", "面向团队的AI代码补全和私有化编程助手"],
      ["Replit Agent", "从自然语言生成、运行和部署应用的AI开发工具"],
      ["Bolt.new", "浏览器内生成并运行Web应用的AI编程工具"],
      ["Lovable", "通过对话生成全栈应用和前端界面的AI构建平台"]
    ]
  },
  {
    id: "dev",
    title: "AI开发平台",
    tools: [
      ["OpenAI Platform", "OpenAI模型API、工具调用、向量存储和应用开发平台"],
      ["Anthropic Console", "Claude模型API、提示调试和应用开发控制台"],
      ["Google AI Studio", "Gemini模型的原型开发和API管理平台"],
      ["阿里云百炼", "通义大模型开发、评测、RAG和应用构建平台"],
      ["火山方舟", "字节跳动旗下大模型服务和AI应用开发平台"],
      ["百度千帆", "企业级大模型开发、精调和部署平台"],
      ["硅基流动", "国内模型API聚合、推理加速和开发平台"],
      ["Hugging Face", "模型、数据集、Spaces和开源AI社区平台"]
    ]
  },
  {
    id: "design",
    title: "AI设计工具",
    tools: [
      ["Figma AI", "Figma内置的设计生成、内容替换和工作流辅助能力"],
      ["Canva AI", "在线设计平台内置的AI图片、文案和版式工具"],
      ["Uizard", "从草图或文本生成UI界面的AI设计工具"],
      ["Galileo AI", "通过文本生成移动端和Web界面设计稿"],
      ["Motiff", "面向UI设计协作的工具，集成AI生成与编辑能力"],
      ["MasterGo AI", "国产在线设计协作平台的AI设计助手"],
      ["即时设计AI", "中文设计协作平台中的AI生成和插件能力"],
      ["稿定设计", "营销图、电商图和海报在线设计平台"]
    ]
  },
  {
    id: "audio",
    title: "AI音频工具",
    tools: [
      ["Suno", "通过文本生成歌曲和音乐作品的AI音乐平台"],
      ["Udio", "AI音乐生成工具，支持多种风格歌曲创作"],
      ["ElevenLabs", "高质量AI语音合成、克隆和多语言配音平台"],
      ["Resemble AI", "语音克隆、配音和品牌声音生成工具"],
      ["Adobe Podcast", "AI音频增强、降噪和播客制作工具"],
      ["讯飞配音", "中文AI配音、主播音色和有声内容制作平台"],
      ["网易天音", "网易推出的AI音乐创作平台"],
      ["Mubert", "生成背景音乐、循环音乐和商用音频素材的AI工具"]
    ]
  },
  {
    id: "search",
    title: "AI搜索引擎",
    tools: [
      ["Perplexity", "基于来源引用的AI搜索和研究助手"],
      ["秘塔AI搜索", "中文AI搜索，支持学术、网页和文档问答"],
      ["Google AI Mode", "Google搜索中的AI答案和探索体验"],
      ["Bing Copilot", "微软搜索与AI助手结合的问答搜索工具"],
      ["Komo Search", "AI搜索、探索和信息整理工具"],
      ["Felo", "支持多语言搜索、总结和思维导图生成的AI搜索引擎"],
      ["天工AI搜索", "中文AI搜索与智能问答产品"],
      ["Consensus", "面向论文和研究结论的AI学术搜索引擎"]
    ]
  },
  {
    id: "learn",
    title: "AI学习网站",
    tools: [
      ["DeepLearning.AI", "吴恩达团队推出的AI课程和实践学习平台"],
      ["OpenAI Cookbook", "OpenAI API示例、模式和工程实践集合"],
      ["Hugging Face Learn", "模型、Transformers和开源AI生态学习资源"],
      ["Kaggle Learn", "机器学习、数据科学和AI实践课程"],
      ["Coursera AI", "系统化AI、机器学习和深度学习在线课程"],
      ["动手学深度学习", "开源中文深度学习教材和代码实践"],
      ["机器之心SOTA模型", "AI论文、模型和行业资讯学习入口"],
      ["AI研习社", "中文AI课程、技术社区和学习资源"]
    ]
  },
  {
    id: "model",
    title: "AI训练模型",
    tools: [
      ["GPT-4o", "OpenAI多模态模型，支持文本、图像和实时交互能力"],
      ["Claude Sonnet", "Anthropic高性能模型，擅长写作、推理和代码"],
      ["Gemini", "Google多模态模型系列，覆盖文本、图像和视频能力"],
      ["DeepSeek-R1", "开源推理模型，适合复杂推理与数学代码任务"],
      ["Qwen", "阿里通义千问开源模型系列"],
      ["Llama", "Meta开源大语言模型系列"],
      ["Mistral", "欧洲AI公司推出的开源和商业模型系列"],
      ["Stable Diffusion XL", "高质量开源图像生成模型"]
    ]
  },
  {
    id: "detect",
    title: "AI内容检测",
    tools: [
      ["GPTZero", "面向教育和写作场景的AI文本检测工具"],
      ["Originality.ai", "AI内容检测、抄袭检测和事实核查工具"],
      ["ZeroGPT", "检测文本是否由AI生成的在线工具"],
      ["Copyleaks", "AI文本检测、代码和论文相似度检测平台"],
      ["Turnitin AI", "面向教育机构的AI写作检测能力"],
      ["Winston AI", "AI内容检测和可读性分析工具"],
      ["Hive Moderation", "AI图像、文本和内容安全检测API"],
      ["Content at Scale", "AI写作检测和内容评估工具"]
    ]
  },
  {
    id: "prompt",
    title: "AI提示指令",
    tools: [
      ["PromptHero", "AI绘画提示词社区，覆盖Midjourney和Stable Diffusion"],
      ["FlowGPT", "提示词分享、AI角色和工作流社区"],
      ["Snack Prompt", "ChatGPT提示词社区和收藏工具"],
      ["AIPRM", "浏览器扩展形式的提示词模板库"],
      ["LangGPT", "结构化中文提示词方法和模板项目"],
      ["PromptBase", "提示词交易与模板市场"],
      ["提示工程指南", "系统介绍提示工程技巧、模式和案例的开源教程"],
      ["Awesome ChatGPT Prompts", "常用ChatGPT角色提示词开源集合"]
    ]
  }
];

const content = document.querySelector("#content");
const sideNav = document.querySelector("#sideNav");
const quickLinksWrap = document.querySelector("#quickLinks");
const menuButton = document.querySelector("#menuButton");
const searchInput = document.querySelector("#searchInput");
const searchForm = document.querySelector("#searchForm");
const searchStatus = document.querySelector("#searchStatus");
const clearSearch = document.querySelector("#clearSearch");
let lockedNavTarget = "";
let lockedNavTimer = 0;
let lastSidebarTarget = "";
let lastSidebarTime = 0;
let activeScrollToken = 0;

function initials(name) {
  const clean = name.replace(/[·. -]/g, "");
  if (/^[a-z0-9]/i.test(clean)) return clean.slice(0, 2).toUpperCase();
  return clean.slice(0, 2);
}

function sectionMatches(section, query) {
  if (!query) return section.tools;
  return section.tools.filter(([name, desc]) => {
    const text = `${section.title} ${name} ${desc}`.toLowerCase();
    return text.includes(query);
  });
}

function setActiveNav(id) {
  document.querySelectorAll(".side-nav a").forEach((link) => {
    link.classList.toggle("active", link.dataset.target === id);
  });
}

function flashSection(target) {
  target.classList.remove("is-located");
  requestAnimationFrame(() => {
    target.classList.add("is-located");
    window.setTimeout(() => target.classList.remove("is-located"), 1800);
  });
}

function getHeaderOffset() {
  const topbar = document.querySelector(".topbar");
  return (topbar ? topbar.offsetHeight : 0) + 20;
}

function lockNavTarget(id) {
  lockedNavTarget = id;
  window.clearTimeout(lockedNavTimer);
  lockedNavTimer = window.setTimeout(() => {
    lockedNavTarget = "";
    updateActiveByScroll();
  }, 1200);
}

function nowTime() {
  if (window.performance && typeof window.performance.now === "function") {
    return window.performance.now();
  }
  return Date.now();
}

function smoothScrollTo(targetY, instant, done) {
  activeScrollToken += 1;
  const scrollToken = activeScrollToken;
  const html = document.documentElement;
  const body = document.body;
  const previousHtmlScrollBehavior = html.style.scrollBehavior;
  const previousBodyScrollBehavior = body.style.scrollBehavior;
  const startY = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
  const distance = targetY - startY;
  const duration = instant ? 0 : 520;
  const startTime = nowTime();
  const raf = window.requestAnimationFrame || function (callback) {
    return window.setTimeout(callback, 16);
  };

  html.style.scrollBehavior = "auto";
  body.style.scrollBehavior = "auto";

  function finish() {
    window.scrollTo(0, targetY);
    html.style.scrollBehavior = previousHtmlScrollBehavior;
    body.style.scrollBehavior = previousBodyScrollBehavior;
    if (typeof done === "function") done();
  }

  if (!duration || !raf) {
    finish();
    return;
  }

  function step() {
    if (scrollToken !== activeScrollToken) return;

    const elapsed = nowTime() - startTime;
    let progress = Math.min(1, elapsed / duration);
    if (progress > 0 && progress < 0.02) progress = 0.02;
    const nextY = startY + distance * progress;
    window.scrollTo(0, nextY);
    if (progress < 1) {
      raf(step);
    } else {
      finish();
    }
  }

  step();
}

function scrollToSection(id, options = {}) {
  const target = document.getElementById(id);
  if (!target) return;

  const headingTarget = target.querySelector(".section-head") || target;
  const currentY = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
  const y = Math.max(0, headingTarget.getBoundingClientRect().top + currentY - getHeaderOffset());
  lockNavTarget(id);
  setActiveNav(id);
  smoothScrollTo(y, options.instant, () => {
    history.replaceState(null, "", `#${id}`);
    setActiveNav(id);
    flashSection(target);
  });
}

function locateSection(id) {
  if (!document.getElementById(id)) {
    searchInput.value = "";
    renderSections();
  }
  scrollToSection(id);
}

function renderNav() {
  sideNav.innerHTML = sections
    .map(
      (section, index) => `
        <a href="#${section.id}" data-target="${section.id}" title="点击滚动到：${section.title}">
          <span class="nav-index">${String(index + 1).padStart(2, "0")}</span>
          <span class="nav-name">${section.title}</span>
        </a>
      `
    )
    .join("");

  sideNav.querySelectorAll("a[data-target]").forEach((link) => {
    link.addEventListener("click", handleSidebarNavigation);
  });
}

function closestSidebarLink(node) {
  while (node && node !== document) {
    if (node.getAttribute && node.getAttribute("data-target") && node.parentNode === sideNav) {
      return node;
    }
    node = node.parentNode;
  }
  return null;
}

function findSidebarLinkFromEvent(event) {
  const directLink = closestSidebarLink(event.target);
  if (directLink) return directLink;

  const x = event.clientX;
  const y = event.clientY;
  if (!Number.isFinite(x) || !Number.isFinite(y)) return null;

  const links = sideNav.querySelectorAll("a[data-target]");
  for (let i = 0; i < links.length; i += 1) {
    const link = links[i];
    const rect = link.getBoundingClientRect();
    if (x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom) {
      return link;
    }
  }

  return null;
}

function handleSidebarNavigation(event) {
  const matchedLink = findSidebarLinkFromEvent(event);
  if (!matchedLink) return;

  event.preventDefault();
  event.stopPropagation();

  const targetId = matchedLink.dataset.target;
  const now = Date.now();
  if (targetId === lastSidebarTarget && now - lastSidebarTime < 250) {
    return;
  }

  lastSidebarTarget = targetId;
  lastSidebarTime = now;
  document.body.classList.remove("nav-open");
  locateSection(targetId);
}

function bindSidebarCoordinateNavigation() {
  document.addEventListener("mousedown", handleSidebarNavigation, true);
  document.addEventListener("click", handleSidebarNavigation, true);

  if ("onpointerdown" in window) {
    document.addEventListener("pointerdown", handleSidebarNavigation, true);
  }
}

function renderSections(filter = "") {
  const query = filter.trim().toLowerCase();
  let matchedCardCount = 0;
  let matchedSectionCount = 0;
  content.innerHTML = "";

  sections.forEach((section, sectionIndex) => {
    const tools = sectionMatches(section, query);
    if (!tools.length) return;

    matchedSectionCount += 1;
    matchedCardCount += tools.length;

    const el = document.createElement("section");
    el.className = "section";
    el.id = section.id;
    el.dataset.title = section.title;
    el.innerHTML = `
      <div class="section-anchor">已定位到：${section.title}</div>
      <div class="section-head">
        <div>
          <div class="section-kicker">菜单 ${String(sectionIndex + 1).padStart(2, "0")} · ${tools.length} 个工具</div>
          <h2 class="section-title">${section.title}</h2>
        </div>
        <button class="more-link" type="button" data-jump="${section.id}">查看本模块</button>
      </div>
      <div class="tool-grid">
        ${tools
          .map(([name, desc, tag], index) => {
            const color = palette[(index + section.title.length) % palette.length];
            const label = tag ? `<span class="tag ${tag === "hot" ? "hot" : ""}">${tag === "hot" ? "热门" : "新"}</span>` : "";
            return `
              <a class="tool-card" href="#" aria-label="${name}">
                <span class="tool-icon" style="background:${color}">${initials(name)}</span>
                <span class="tool-body">
                  <h3 class="tool-title">${name}${label}</h3>
                  <p class="tool-desc">${desc}</p>
                </span>
              </a>
            `;
          })
          .join("")}
      </div>
    `;
    content.appendChild(el);
  });

  if (!matchedCardCount) {
    content.innerHTML = `
      <section class="empty-state">
        <h2>没有找到对应内容</h2>
        <p>换一个关键词，或点击“清空搜索”恢复全部分类。</p>
      </section>
    `;
  }

  searchStatus.textContent = query
    ? `已匹配 ${matchedSectionCount} 个分类、${matchedCardCount} 个工具。清空关键词可恢复完整导航。`
    : `当前展示 ${sections.length} 个分类、${sections.reduce((sum, section) => sum + section.tools.length, 0)} 个工具。`;
}

function updateActiveByScroll() {
  if (lockedNavTarget) {
    setActiveNav(lockedNavTarget);
    return;
  }

  const visibleSections = sections
    .map((section) => document.getElementById(section.id))
    .filter(Boolean)
    .map((el) => ({ id: el.id, top: Math.abs(el.getBoundingClientRect().top - 90) }))
    .sort((a, b) => a.top - b.top);

  if (visibleSections[0]) setActiveNav(visibleSections[0].id);
}

quickLinksWrap.innerHTML = quickLinks.map((item) => `<button type="button">${item}</button>`).join("");
quickLinksWrap.addEventListener("click", (event) => {
  if (event.target.tagName !== "BUTTON") return;
  searchInput.value = event.target.textContent;
  renderSections(searchInput.value);
  const firstMatchedSection = document.querySelector(".section");
  scrollToSection(firstMatchedSection ? firstMatchedSection.id : "content");
});

searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  renderSections(searchInput.value);
  const firstSection = document.querySelector(".section");
  if (firstSection) scrollToSection(firstSection.id);
});

searchInput.addEventListener("input", () => renderSections(searchInput.value));

clearSearch.addEventListener("click", () => {
  searchInput.value = "";
  renderSections();
  scrollToSection("hot");
});

menuButton.addEventListener("click", () => {
  document.body.classList.toggle("nav-open");
});

document.querySelector("#content").addEventListener("click", (event) => {
  const button = event.target.closest("[data-jump]");
  if (!button) return;
  scrollToSection(button.dataset.jump);
});

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  if (link.closest("#sideNav")) return;
  link.addEventListener("click", (event) => {
    const id = link.getAttribute("href").slice(1);
    if (!id) return;
    const target = document.getElementById(id);
    if (!target) return;
    event.preventDefault();
    scrollToSection(id);
    history.replaceState(null, "", `#${id}`);
  });
});

window.addEventListener("scroll", updateActiveByScroll, { passive: true });

renderNav();
bindSidebarCoordinateNavigation();
renderSections();
setActiveNav("hot");

if (location.hash) {
  requestAnimationFrame(() => scrollToSection(location.hash.slice(1)));
}
