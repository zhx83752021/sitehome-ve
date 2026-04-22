/**
 * 作品展示索引页 — 主脚本
 * 数据驱动渲染，新增项目只需修改 PROJECTS 数组
 */

// ================================================================
// 作品数据（新增项目在这里添加即可）
// ================================================================
const PROJECTS = [
    {
        name: '美妆电商',
        url: 'https://cosmetics.supperai.top/',
        screenshot: 'assets/cosmetics.png',
        tag: '电商',
        desc: '给化妆品做的门面',
        descLine2: '支持在线浏览和下单',
    },
    {
        name: '宠物社区',
        url: 'https://pet.supperai.top/',
        screenshot: 'assets/pet.png',
        tag: '社区',
        desc: '铲屎官的线上聚集地',
        descLine2: '晒萌宠、找同好、聊养护',
    },
    {
        name: '企业门户',
        url: 'https://portal.supperai.top/',
        screenshot: 'assets/portal.png',
        tag: '门户',
        desc: '拒绝刻板，重塑品牌温度',
        descLine2: '动态叙事，全端自适应响应',
    },
    {
        name: '在线商城',
        url: 'https://shop.supperai.top/',
        screenshot: 'assets/shop.png',
        tag: '商城',
        desc: '买买买的标准流程',
        descLine2: '商品、购物车、订单全闭环',
    },
    {
        name: '社区团购',
        url: 'https://group.supperai.top/',
        screenshot: 'assets/group.png',
        tag: '团购',
        desc: '邻里之间的拼团神器',
        descLine2: '低价好货，人多更便宜',
    },
    {
        name: '医院驾驶舱',
        url: 'https://hospital.supperai.top/',
        screenshot: 'assets/hospital.png',
        tag: '数据',
        desc: '医院数据一目了然',
        descLine2: '运营、质量、绩效全盘掌握',
    },
];

// ================================================================
// 每种 tag 对应的 SVG 图标（右上角标签）
// ================================================================
const TAG_ICONS = {
    '电商': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>',
    '社区': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>',
    '门户': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>',
    '商城': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"/></svg>',
    '团购': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>',
    '数据': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>',
};

// ================================================================
// 创建单张作品卡片 — 大图 + 标题链接 + 双行描述
// ================================================================
function createCard(project, index) {
    const card = document.createElement('div');
    card.className = 'work-card';

    // 入场动画交错延迟
    card.style.transitionDelay = `${index * 0.09}s`;

    // 获取 tag 对应图标，默认用门户图标
    const tagIcon = TAG_ICONS[project.tag] || TAG_ICONS['门户'];

    // 卡片 HTML 结构：大图 + 标题 + 描述
    card.innerHTML = `
        <a class="card-thumb" href="${project.url}" target="_blank" rel="noopener noreferrer">
            <div class="card-thumb-skeleton" id="skeleton-${index}"></div>
            <img
                src="${project.screenshot}"
                alt="${project.name} 网站截图"
                loading="lazy"
                id="img-${index}"
            >
            <span class="card-thumb-tag">
                ${tagIcon}
                ${project.tag}
            </span>
        </a>
        <div class="card-info">
            <h2 class="card-title">
                <a href="${project.url}" target="_blank" rel="noopener noreferrer">${project.name}</a>
            </h2>
            <p class="card-desc">
                <span class="card-desc-line">${project.desc}</span>
                <span class="card-desc-line">${project.descLine2 || ''}</span>
            </p>
        </div>
    `;

    // 截图加载完成 → 隐藏骨架屏
    const img = card.querySelector(`#img-${index}`);
    const skeleton = card.querySelector(`#skeleton-${index}`);

    img.addEventListener('load', () => {
        skeleton.style.display = 'none';
    });

    // 截图加载失败 → 显示备用样式
    img.addEventListener('error', () => {
        img.style.display = 'none';
        skeleton.classList.add('is-fallback');
        skeleton.innerHTML = `<span class="skeleton-fallback-text">${project.name}</span>`;
    });

    // 超时保护：10秒未加载完则显示备用
    setTimeout(() => {
        if (!img.complete || img.naturalWidth === 0) {
            img.style.display = 'none';
            skeleton.classList.add('is-fallback');
            skeleton.innerHTML = `<span class="skeleton-fallback-text">${project.name}</span>`;
        }
    }, 10000);

    return card;
}

// ================================================================
// 渲染整个网格
// ================================================================
function renderGrid() {
    const grid = document.getElementById('worksGrid');
    if (!grid) return;

    PROJECTS.forEach((project, i) => {
        grid.appendChild(createCard(project, i));
    });

    // 更新右上角计数
    const countEl = document.getElementById('projectCount');
    if (countEl) {
        countEl.textContent = String(PROJECTS.length).padStart(2, '0');
    }
}

// ================================================================
// 滚动入场动画 — Intersection Observer
// ================================================================
function initScrollReveal() {
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.12,
            rootMargin: '0px 0px -50px 0px',
        }
    );

    document.querySelectorAll('.work-card').forEach((card) => {
        observer.observe(card);
    });
}

// ================================================================
// 鼠标光晕跟踪
// ================================================================
function initCursorGlow() {
    // 检查是否尊重减弱动效偏好
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const glow = document.createElement('div');
    glow.className = 'cursor-glow';
    glow.setAttribute('aria-hidden', 'true');
    document.body.appendChild(glow);

    let mouseX = -500;
    let mouseY = -500;
    let glowX = -500;
    let glowY = -500;
    const halfSize = 210;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        if (!glow.classList.contains('is-active')) {
            glow.classList.add('is-active');
        }
    });

    // requestAnimationFrame 平滑插值跟踪
    function tick() {
        glowX += (mouseX - glowX) * 0.07;
        glowY += (mouseY - glowY) * 0.07;
        glow.style.transform = `translate(${glowX - halfSize}px, ${glowY - halfSize}px)`;
        requestAnimationFrame(tick);
    }
    tick();
}

// ================================================================
// Hero 文字入场动画
// ================================================================
function initHeroAnimation() {
    const lines = document.querySelectorAll('.hero-line');
    const desc = document.querySelector('.hero-desc');

    requestAnimationFrame(() => {
        lines.forEach((line, i) => {
            line.style.transition = `opacity 0.8s ${0.15 + i * 0.18}s var(--ease-expo), transform 0.8s ${0.15 + i * 0.18}s var(--ease-expo)`;
            line.style.opacity = '1';
            line.style.transform = 'translateY(0)';
        });

        if (desc) {
            desc.style.transition = 'opacity 0.8s 0.55s var(--ease-expo), transform 0.8s 0.55s var(--ease-expo)';
            desc.style.opacity = '1';
            desc.style.transform = 'translateY(0)';
        }
    });
}

// ================================================================
// Hero Canvas — 粒子星座动画
// ================================================================
function initHeroCanvas() {
    const canvas = document.getElementById('heroCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    // 粒子参数
    const PARTICLE_COUNT = 70;
    const CONNECT_DIST = 140;       // 连线距离阈值
    const MOUSE_RADIUS = 180;       // 鼠标影响半径
    const ACCENT = { r: 255, g: 79, b: 0 };    // #FF4F00 电光橙
    const CYAN = { r: 51, g: 51, b: 51 };    // #333333 深灰

    let width, height;
    let mouse = { x: -9999, y: -9999 };
    let particles = [];
    let animId;

    // 自适应画布尺寸
    function resize() {
        const rect = canvas.parentElement.getBoundingClientRect();
        width = rect.width;
        height = rect.height;
        canvas.width = width * devicePixelRatio;
        canvas.height = height * devicePixelRatio;
        canvas.style.width = width + 'px';
        canvas.style.height = height + 'px';
        ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
    }

    // 单个粒子
    class Particle {
        constructor() {
            this.reset();
        }
        reset() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.vx = (Math.random() - 0.5) * 0.5;
            this.vy = (Math.random() - 0.5) * 0.5;
            this.radius = Math.random() * 2 + 0.8;
            // 随机选取强调色或青色
            this.color = Math.random() > 0.3 ? ACCENT : CYAN;
            this.baseAlpha = Math.random() * 0.4 + 0.2;
            this.alpha = this.baseAlpha;
        }
        update() {
            // 基础运动
            this.x += this.vx;
            this.y += this.vy;

            // 边界反弹
            if (this.x < 0 || this.x > width) this.vx *= -1;
            if (this.y < 0 || this.y > height) this.vy *= -1;

            // 鼠标交互：靠近时增亮 + 微排斥
            const dx = this.x - mouse.x;
            const dy = this.y - mouse.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < MOUSE_RADIUS) {
                const force = (MOUSE_RADIUS - dist) / MOUSE_RADIUS;
                this.alpha = this.baseAlpha + force * 0.5;
                // 微排斥力
                this.x += dx * force * 0.02;
                this.y += dy * force * 0.02;
            } else {
                this.alpha += (this.baseAlpha - this.alpha) * 0.05;
            }
        }
        draw() {
            const { r, g, b } = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${r},${g},${b},${this.alpha})`;
            ctx.fill();

            // 粒子发光
            if (this.alpha > 0.35) {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius * 3, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(${r},${g},${b},${this.alpha * 0.15})`;
                ctx.fill();
            }
        }
    }

    // 初始化粒子
    function initParticles() {
        particles = [];
        for (let i = 0; i < PARTICLE_COUNT; i++) {
            particles.push(new Particle());
        }
    }

    // 绘制粒子间连线
    function drawConnections() {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < CONNECT_DIST) {
                    const opacity = (1 - dist / CONNECT_DIST) * 0.15;
                    const { r, g, b } = particles[i].color;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(${r},${g},${b},${opacity})`;
                    ctx.lineWidth = 0.6;
                    ctx.stroke();
                }
            }
        }
    }

    // 主渲染循环
    function frame() {
        ctx.clearRect(0, 0, width, height);
        particles.forEach(p => { p.update(); p.draw(); });
        drawConnections();
        animId = requestAnimationFrame(frame);
    }

    // 鼠标追踪（相对 hero 区域）
    const heroEl = canvas.parentElement;
    heroEl.addEventListener('mousemove', (e) => {
        const rect = heroEl.getBoundingClientRect();
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;
    });
    heroEl.addEventListener('mouseleave', () => {
        mouse.x = -9999;
        mouse.y = -9999;
    });

    // 启动
    resize();
    initParticles();
    frame();

    // 窗口大小变化时重置
    window.addEventListener('resize', () => {
        resize();
        initParticles();
    });
}

// ================================================================
// 初始化入口
// ================================================================
document.addEventListener('DOMContentLoaded', () => {
    renderGrid();
    initScrollReveal();
    initHeroAnimation();

    // 仅在非减弱动效模式下启用粒子动画
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        initHeroCanvas();
    }

    // 仅在有鼠标悬停能力的设备启用光晕
    if (window.matchMedia('(hover: hover)').matches) {
        initCursorGlow();
    }

});
