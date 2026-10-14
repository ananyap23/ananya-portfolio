/**
 * ANANYA PANDEY PORTFOLIO INTERACTIVE SCRIPT
 * Features:
 * - Tabbed Section View & Page Controller (Squarespace Inspired)
 * - Live AI Agent Terminal Loop Simulator (Perceive -> Think -> Plan -> Execute)
 * - Dynamic Case Study Modal Renderer
 * - Full Interactive Resume Modal Viewer
 * - Contact Form Handler with simulated notification
 * - Responsive Mobile Drawer & Smooth Scroll
 */

document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================
       1. TABBED SECTION VIEW CONTROLLER
       ========================================== */
    const tabButtons = document.querySelectorAll('.page-tab-btn, .hero-pill-tab, [data-tab]');
    const pageSections = document.querySelectorAll('.page-section');

    function activateTab(tabTarget) {
        // Update active class on all matching tab buttons
        tabButtons.forEach(btn => {
            if (btn.getAttribute('data-tab') === tabTarget) {
                btn.classList.add('active');
            } else if (btn.tagName === 'BUTTON') {
                btn.classList.remove('active');
            }
        });

        if (tabTarget === 'all') {
            // Show all sections with smooth scroll capability
            pageSections.forEach(section => {
                section.classList.remove('hidden-section');
                section.classList.add('fade-in');
            });
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            // Single Page Tab View Mode: show Hero + target section or focus on target section
            pageSections.forEach(section => {
                const secId = section.getAttribute('id');
                if (secId === tabTarget || secId === 'hero') {
                    section.classList.remove('hidden-section');
                    section.classList.add('fade-in');
                } else {
                    section.classList.add('hidden-section');
                }
            });

            // Scroll directly to target section
            const targetEl = document.getElementById(tabTarget);
            if (targetEl) {
                targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    }

    tabButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const tabTarget = btn.getAttribute('data-tab');
            if (tabTarget) {
                activateTab(tabTarget);
            }
        });
    });

    /* ==========================================
       2. HERO SECTION: LIVE AI TERMINAL SIMULATION
       ========================================== */
    const terminalOutput = document.getElementById('heroTerminalOutput');
    const loopSteps = document.querySelectorAll('.agent-loop-diagram .loop-step');

    const terminalLogs = [
        { text: '// System initialized. Voice engine listening...', class: 'comment', step: 0 },
        { text: '$ user_voice: "Open VS Code and initialize EVA repository"', class: '', step: 0 },
        { text: '✓ Speech-To-Text (Whisper): Transcribed with 99.4% accuracy', class: 'success', step: 0 },
        { text: '⚡ Vision Engine: Capturing active desktop screen buffer (1920x1080)', class: 'info', step: 1 },
        { text: '🧠 Gemini 1.5 Computer Use API: Planning 3-step action sequence', class: 'accent', step: 1 },
        { text: '➔ Step 1: Locate VS Code icon at [X: 420, Y: 850]', class: '', step: 2 },
        { text: '➔ Step 2: Trigger double-click mouse action via robotjs', class: '', step: 2 },
        { text: '➔ Step 3: Open terminal and type `git status`', class: '', step: 2 },
        { text: '🛡️ Safety Prompt: Action requires terminal execution permission. Allowed.', class: 'info', step: 3 },
        { text: '✓ Action Executed successfully in 120ms via tRPC RPC channel.', class: 'success', step: 3 }
    ];

    let logIndex = 0;

    function renderNextLog() {
        if (!terminalOutput) return;

        // Reset if we reached end
        if (logIndex >= terminalLogs.length) {
            logIndex = 0;
            terminalOutput.innerHTML = `
                <div class="terminal-line comment">// AI Agent Runtime Initialized</div>
                <div class="terminal-line"><span class="prompt">$</span> eva --task "Analyze screen & execute automation"</div>
            `;
        }

        const log = terminalLogs[logIndex];
        
        // Highlight active step in agent loop diagram
        loopSteps.forEach((stepEl, idx) => {
            if (idx === log.step) {
                stepEl.classList.add('active');
            } else {
                stepEl.classList.remove('active');
            }
        });

        // Append log line
        const line = document.createElement('div');
        line.className = `terminal-line ${log.class}`;
        line.innerHTML = log.text;
        terminalOutput.appendChild(line);
        terminalOutput.scrollTop = terminalOutput.scrollHeight;

        logIndex++;
    }

    // Run terminal simulation every 2.5 seconds
    setInterval(renderNextLog, 2500);

    /* ==========================================
       3. MODAL CONTROLS (RESUME & CASE STUDY)
       ========================================== */
    const resumeModal = document.getElementById('resumeModal');
    const openResumeBtn = document.getElementById('openResumeBtn');
    const heroResumeBtn = document.getElementById('heroResumeBtn');
    const closeResumeBtn = document.getElementById('closeResumeBtn');
    const downloadResumeFileBtn = document.getElementById('downloadResumeFileBtn');

    function toggleModal(modal, show) {
        if (!modal) return;
        if (show) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        } else {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    }

    if (openResumeBtn) openResumeBtn.addEventListener('click', () => toggleModal(resumeModal, true));
    if (heroResumeBtn) heroResumeBtn.addEventListener('click', () => toggleModal(resumeModal, true));
    if (closeResumeBtn) closeResumeBtn.addEventListener('click', () => toggleModal(resumeModal, false));

    // Close on backdrop click
    window.addEventListener('click', (e) => {
        if (e.target === resumeModal) toggleModal(resumeModal, false);
        if (e.target === caseStudyModal) toggleModal(caseStudyModal, false);
    });

    // Simulated Download Action
    if (downloadResumeFileBtn) {
        downloadResumeFileBtn.addEventListener('click', () => {
            alert('Downloading Ananya_Pandey_Resume.pdf ...');
        });
    }

    /* ==========================================
       4. CASE STUDY DATA & RENDERER
       ========================================== */
    const caseStudyModal = document.getElementById('caseStudyModal');
    const closeCaseStudyBtn = document.getElementById('closeCaseStudyBtn');
    const caseStudyContent = document.getElementById('caseStudyContent');

    if (closeCaseStudyBtn) closeCaseStudyBtn.addEventListener('click', () => toggleModal(caseStudyModal, false));

    const caseStudiesData = {
        eva01: {
            title: "EVA-01 — AI Desktop Agent",
            subtitle: "COMPUTER-USE AI AGENT • VOICE AI • ELECTRON • tRPC",
            year: "2026",
            problem: "Traditional desktop automation tools require fragile, pre-scripted coordinate macros that fail whenever UI elements change. Users need an autonomous assistant that can visually comprehend desktop applications, accept natural voice commands, and execute complex multi-step tasks across multi-monitor setups.",
            solution: "Built EVA-01, an intelligent desktop agent that combines computer vision, voice recognition, and LLM task planning. EVA-01 visually analyzes the user's screen in real time, generates structured action blueprints (mouse movement, clicks, keyboard input, terminal commands), and safely executes them via a typed tRPC bridge in an Electron container.",
            architecture: `┌─────────────────────────────────────────────────────────────┐
│                       USER INTERACTION                       │
│    Voice (Whisper/Vosk)  │  Text Command  │  Wake-Word      │
└─────────────────────────────┬───────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                      EVA-01 REASONING                       │
│   • Screen Perception (Gemini Computer Use API)              │
│   • Multi-Step Task Planning & Persona Memory                │
│   • Gemini Context Caching & Safety Gatekeeper               │
└─────────────────────────────┬───────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                     ELECTRON SYSTEM BRIDGE                   │
│   Typed tRPC API ➔ Mouse / Keyboard / Terminal Execution    │
└─────────────────────────────┬───────────────────────────────┘`,
            tech: ["Gemini Computer Use API", "OpenAI GPT-4o API", "Electron", "tRPC", "Whisper STT", "Vosk Offline STT", "ElevenLabs TTS", "Local LLMs", "Node.js"],
            features: [
                "Perceives full desktop screen and active windows across multi-monitor setups.",
                "Executes mouse clicks, keystrokes, application launches, and terminal commands automatically.",
                "Integrated offline voice activation (Vosk/Whisper) with streaming ElevenLabs speech synthesis.",
                "Built-in safety gatekeeper prompting explicit user approval before executing high-risk system commands.",
                "Gemini context caching for fast multi-turn conversational memory and low latency."
            ],
            results: "Successfully created an end-to-end desktop assistant capable of completing multi-application workflows (e.g., searching web, opening VS Code, creating folder structures) automatically from simple natural language commands."
        },

        complaint: {
            title: "AI Complaint Management System for College",
            subtitle: "GENERATIVE AI • JAVA • SPRING BOOT • JPA • MYSQL",
            year: "2026",
            problem: "College administration offices process hundreds of student complaints daily regarding facilities, academics, and infrastructure. Manual triaging leads to delayed response times, incorrect department routing, unaddressed urgent issues, and duplicated work.",
            solution: "Developed a full-stack automated complaint resolution system that integrates OpenAI GPT API with a Java & Spring Boot backend. The system automatically ingests student complaints, classifies them into relevant departments, performs sentiment analysis to flag high-urgency issues, predicts priority levels, and detects duplicate complaints.",
            architecture: `[Student Complaint Input]
          │
          ▼
┌─────────────────────────────────────────────────────────────┐
│                    SPRING BOOT REST API                     │
│  Controllers ➔ Service Layer ➔ Spring Data JPA (MySQL)      │
└─────────────────────────────┬───────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                     OPENAI GPT ENGINE                       │
│  • Category Classifier   • Sentiment Analysis               │
│  • Priority Prediction   • Duplicate Detector               │
└─────────────────────────────┬───────────────────────────────┘
                              │
                              ▼
[Automated Category Tagging, Priority Queue & Admin Dashboard]`,
            tech: ["Java", "Spring Boot", "Spring Data JPA", "Hibernate", "MySQL", "OpenAI GPT API", "REST APIs", "Maven"],
            features: [
                "Automated Complaint Categorization (Infrastructure, Academics, Hostel, Maintenance).",
                "Sentiment Analysis & Urgency Prediction to elevate critical safety/infrastructure issues.",
                "Duplicate Complaint Detection comparing incoming texts against existing database logs.",
                "Robust RESTful backend with clean layered architecture, validation, and relational persistence in MySQL."
            ],
            results: "Reduced complaint processing overhead and turnaround time while ensuring urgent issues receive immediate automated priority escalation."
        },

        youtube: {
            title: "YouTube Video Summarizer",
            subtitle: "NLP • WHISPER • LLM CHUNKING • STRUCTURED OUTPUT",
            year: "Sep 2025",
            problem: "Long educational lectures, tutorials, and podcasts on YouTube often span hours, making it time-consuming for students and developers to extract specific key insights and takeaways.",
            solution: "Engineered a Python-based NLP pipeline that downloads YouTube audio, transcribes audio to text using OpenAI Whisper, splits long transcripts into logical chunks, and generates structured executive summaries using OpenAI and Gemini LLM APIs.",
            architecture: `[ YouTube Video URL ]
          │
          ▼
[ Audio Extraction ] ➔ [ OpenAI Whisper Speech-To-Text ]
          │
          ▼
[ Smart Transcript Chunking (Tokens Limit Optimization) ]
          │
          ▼
[ LLM Summarization (OpenAI / Gemini API) ]
          │
          ▼
[ Structured Output: Key Points, Timeline & Bullet Takeaways ]`,
            tech: ["Python", "OpenAI Whisper", "OpenAI API", "Gemini API", "NLP Chunking", "Structured JSON Prompts"],
            features: [
                "Automated audio stream extraction and high-fidelity speech recognition via Whisper.",
                "Algorithmic transcript chunking to stay within LLM context window limits without losing context.",
                "Custom prompt engineering returning structured summaries with key takeaways, action items, and topic breakdowns.",
                "Fast, clean markdown output generation."
            ],
            results: "Provides accurate 2-minute readable summaries for multi-hour YouTube videos, accelerating research and learning workflows."
        }
    };

    const caseStudyBtns = document.querySelectorAll('.open-case-study');
    caseStudyBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const projectKey = btn.getAttribute('data-project');
            const data = caseStudiesData[projectKey];

            if (!data) return;

            caseStudyContent.innerHTML = `
                <div class="case-study-view">
                    <div class="cs-header">
                        <span class="cs-number">CASE STUDY // ${data.year}</span>
                        <h2 class="cs-title">${data.title}</h2>
                        <span class="cs-subtitle">${data.subtitle}</span>
                    </div>

                    <div class="cs-section">
                        <h3><i class="fa-solid fa-triangle-exclamation"></i> 01 — The Problem</h3>
                        <p>${data.problem}</p>
                    </div>

                    <div class="cs-section">
                        <h3><i class="fa-solid fa-lightbulb"></i> 02 — The Solution</h3>
                        <p>${data.solution}</p>
                    </div>

                    <div class="cs-section">
                        <h3><i class="fa-solid fa-sitemap"></i> 03 — System Architecture</h3>
                        <div class="cs-diagram-box">${data.architecture}</div>
                    </div>

                    <div class="cs-section">
                        <h3><i class="fa-solid fa-list-check"></i> 04 — Key Features & Capabilities</h3>
                        <ul class="cs-list">
                            ${data.features.map(f => `<li><i class="fa-solid fa-check"></i> ${f}</li>`).join('')}
                        </ul>
                    </div>

                    <div class="cs-section">
                        <h3><i class="fa-solid fa-gears"></i> 05 — Tech Stack Used</h3>
                        <div class="project-tech-stack" style="margin-top: 10px;">
                            ${data.tech.map(t => `<span>${t}</span>`).join('')}
                        </div>
                    </div>

                    <div class="cs-section">
                        <h3><i class="fa-solid fa-trophy"></i> 06 — Impact & Results</h3>
                        <p>${data.results}</p>
                    </div>

                    <div style="margin-top: 32px; display: flex; gap: 16px;">
                        <a href="https://github.com/ananyap23" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm">
                            <i class="fa-brands fa-github"></i> View Repository
                        </a>
                        <button class="btn btn-secondary btn-sm" onclick="document.getElementById('caseStudyModal').classList.remove('active'); document.body.style.overflow='auto';">
                            Close Case Study
                        </button>
                    </div>
                </div>
            `;

            toggleModal(caseStudyModal, true);
        });
    });

    /* ==========================================
       5. CONTACT FORM SUBMISSION
       ========================================== */
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const senderName = document.getElementById('senderName').value;

            formStatus.className = 'form-status success';
            formStatus.innerHTML = `<i class="fa-solid fa-circle-check"></i> Thank you, ${senderName}! Your message has been sent to Ananya.`;

            contactForm.reset();

            setTimeout(() => {
                formStatus.innerHTML = '';
            }, 6000);
        });
    }

    /* ==========================================
       6. MOBILE MENU TOGGLE
       ========================================== */
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            const navPill = document.querySelector('.floating-pill-nav');
            if (navPill) {
                if (navPill.style.display === 'flex') {
                    navPill.style.display = 'none';
                } else {
                    navPill.style.display = 'flex';
                    navPill.style.position = 'absolute';
                    navPill.style.top = '100%';
                    navPill.style.left = '5%';
                    navPill.style.right = '5%';
                    navPill.style.justifyContent = 'center';
                    navPill.style.padding = '10px';
                    navPill.style.background = '#0d0f18';
                    navPill.style.borderRadius = '12px';
                }
            }
        });
    }
});
