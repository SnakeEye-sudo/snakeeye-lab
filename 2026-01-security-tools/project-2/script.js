// ====== THREAT MODELER: Advanced Attack Surface Explorer ======
// This tool enables interactive threat modeling & STRIDE-based security analysis

class ThreatModeler {
    constructor() {
        this.nodes = [];
        this.edges = [];
        this.canvas = document.getElementById('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.selectedNode = null;
        this.draggedNode = null;
        this.dragOffset = {x: 0, y: 0};
        this.threatLibrary = this.initThreatLibrary();
        this.presets = this.initPresets();
        this.init();
    }

    init() {
        this.setupCanvas();
        this.setupEventListeners();
        this.attachDragAndDrop();
        this.attachTabNavigation();
        this.render();
    }

    setupCanvas() {
        const container = document.querySelector('.canvas-container');
        this.canvas.width = container.clientWidth;
        this.canvas.height = container.clientHeight;
    }

    initThreatLibrary() {
        return {
            client: [
                {name: 'XSS Attack', severity: 'HIGH', desc: 'Client-side script injection via DOM', mitigations: ['CSP headers', 'Input validation']},
                {name: 'CSRF', severity: 'HIGH', desc: 'Cross-site request forgery', mitigations: ['CSRF tokens', 'SameSite cookies']}
            ],
            auth: [
                {name: 'Brute Force', severity: 'HIGH', desc: 'Password guessing attacks', mitigations: ['Rate limiting', 'MFA']},
                {name: 'Token Theft', severity: 'CRITICAL', desc: 'Auth tokens compromised', mitigations: ['Short expiry', 'HTTPS only']}
            ],
            api: [
                {name: 'SQL Injection', severity: 'CRITICAL', desc: 'Database injection', mitigations: ['Parameterized queries', 'Input validation']},
                {name: 'API Enumeration', severity: 'MEDIUM', desc: 'Endpoint discovery', mitigations: ['Rate limiting', 'Auth']}
            ],
            database: [
                {name: 'Data Breach', severity: 'CRITICAL', desc: 'Unauthorized DB access', mitigations: ['Encryption', 'Access control']}
            ],
            logs: [
                {name: 'PII Exposure', severity: 'CRITICAL', desc: 'Sensitive data logged', mitigations: ['Redaction', 'Encryption']}
            ]
        };
    }

    initPresets() {
        return {saas: [{type: 'client', name: 'Web Browser', x: 100, y: 100}]};
    }

    addNode(type, name, x, y) {
        const node = {id: Math.random().toString(36).substr(2, 9), type, name, x, y, radius: 40};
        this.nodes.push(node);
        return node;
    }

    analyzeThreats() {
        const threatsList = document.getElementById('threatsList');
        threatsList.innerHTML = '';
        const detected = new Set();
        for (let node of this.nodes) {
            const threats = this.threatLibrary[node.type] || [];
            threats.forEach(threat => {
                if (!detected.has(threat.name)) {
                    const el = document.createElement('div');
                    el.className = `threat-card ${threat.severity.toLowerCase()}`;
                    el.innerHTML = `<h4>${threat.name}</h4><span class="threat-badge ${threat.severity.toLowerCase()}">${threat.severity}</span><p>${threat.desc}</p>`;
                    threatsList.appendChild(el);
                    detected.add(threat.name);
                }
            });
        }
        if (detected.size === 0) threatsList.innerHTML = '<p class="placeholder">Analyze your system</p>';
    }

    exportAsMarkdown() {
        let md = '# Threat Model Report\n\n';
        md += `Generated: ${new Date().toISOString()}\n\n## Components\n\n`;
        this.nodes.forEach(node => md += `- ${node.name} (${node.type})\n`);
        const blob = new Blob([md], {type: 'text/markdown'});
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `threat-model-${Date.now()}.md`;
        a.click();
        URL.revokeObjectURL(url);
    }

    exportAsJSON() {
        const data = {timestamp: new Date().toISOString(), nodes: this.nodes};
        const blob = new Blob([JSON.stringify(data, null, 2)], {type: 'application/json'});
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `threat-model-${Date.now()}.json`;
        a.click();
        URL.revokeObjectURL(url);
    }

    render() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.fillStyle = '#ffffff';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.nodes.forEach(node => {
            this.ctx.fillStyle = '#0066cc';
            this.ctx.beginPath();
            this.ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
            this.ctx.fill();
            this.ctx.fillStyle = '#fff';
            this.ctx.font = 'bold 12px sans-serif';
            this.ctx.textAlign = 'center';
            this.ctx.fillText(node.name.split(' ')[0], node.x, node.y);
        });
        requestAnimationFrame(() => this.render());
    }

    setupEventListeners() {
        document.getElementById('btnAnalyze').addEventListener('click', () => this.analyzeThreats());
        document.getElementById('btnExportMD').addEventListener('click', () => this.exportAsMarkdown());
        document.getElementById('btnExportJSON').addEventListener('click', () => this.exportAsJSON());
        document.getElementById('btnClearAll').addEventListener('click', () => {this.nodes = [];});
        document.getElementById('btnNewSystem').addEventListener('click', () => this.addNode('api', 'New Component', 300, 200));
    }

    attachDragAndDrop() {
        const palette = document.querySelector('.component-palette');
        palette.querySelectorAll('.component-item').forEach(item => {
            item.addEventListener('dragstart', (e) => {
                e.dataTransfer.effectAllowed = 'move';
                e.dataTransfer.setData('type', item.dataset.type);
            });
        });
        this.canvas.addEventListener('dragover', (e) => {e.preventDefault();});
        this.canvas.addEventListener('drop', (e) => {
            e.preventDefault();
            const type = e.dataTransfer.getData('type');
            const rect = this.canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            this.addNode(type, type.charAt(0).toUpperCase() + type.slice(1), x, y);
        });
    }

    attachTabNavigation() {
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
                document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
                e.target.classList.add('active');
                document.getElementById(`${e.target.dataset.tab}Panel`).classList.add('active');
            });
        });
    }
}

const app = new ThreatModeler();
