export const selectedWork = [
  {
    slug: 'sellnaija',
    index: '01',
    title: 'SellNaija',
    role: 'CTO / Software Engineer',
    summary: 'A Nigerian commerce PWA built around plug-and-play storefronts, subscription billing, merchant operations, customer checkout, campaign tooling, and multi-role administration.',
    meta: 'Commerce PWA · Paystack subscriptions · Merchant/admin workflows',
    href: '/work#sellnaija',
    kind: 'Latest product build',
    status: 'Active build',
    challenge: 'Create a commerce platform that non-technical merchants can launch and operate without sacrificing the control expected from a serious business system.',
    contribution: [
      'Designed the product model around Starter, Business, and Pro storefronts with role-based merchant and administration workflows.',
      'Built subscription-first payments with Paystack while keeping merchant order revenue separate from platform subscription revenue.',
      'Shaped the storefront, campaign, communications, checkout, review, notification, and PWA experience across desktop and mobile.',
    ],
    stack: ['PWA', 'PostgreSQL', 'Paystack', 'Role-based access', 'Commerce systems'],
  },
  {
    slug: 'friendra',
    index: '02',
    title: 'Friendra',
    role: 'CTO / Server Administrator',
    summary: 'A privacy-first social platform designed, deployed, and operated end-to-end, including infrastructure, PostgreSQL, Nginx, Cloudflare, monitoring, and incident response.',
    meta: 'Production systems · 2,000+ users',
    href: 'https://www.friendra.com',
    kind: 'Production platform',
    status: 'Live system',
    challenge: 'Run a real social platform reliably without hiding operational complexity behind a managed platform abstraction.',
    contribution: [
      'Designed the deployment architecture around Ubuntu, Nginx, PostgreSQL, SSL, and Cloudflare.',
      'Owned backup strategy, monitoring, incident response, server hardening, and deployment operations.',
      'Operated a live platform for 2,000+ users while handling day-to-day reliability work.',
    ],
    stack: ['Linux', 'Nginx', 'PostgreSQL', 'Cloudflare', 'Ruby on Rails', 'React'],
  },
  {
    slug: 'code-model-behavior',
    index: '03',
    title: 'Do Code Models Follow Program Behavior?',
    href: '/research#code-model-behavior',
    anonymous: true,
  },
  {
    slug: 'pairwise-bug-verification',
    index: '04',
    title: 'What Drives Neural Pairwise Bug Verification? A Multilingual Empirical Study of Evaluation Leakage, Representation Learning, and Graph Structure',
    href: '/research#pairwise-bug-verification',
    anonymous: true,
  },
  {
    slug: 'entity-level-leakage',
    index: '05',
    title: 'Entity-Level Leakage in Code Intelligence Benchmarks: Predicting, Measuring, and Correcting Contamination in Derived-Example Datasets',
    href: '/research#entity-level-leakage',
    anonymous: true,
  },
  {
    slug: 'graphcodebert-gat',
    index: '06',
    title: 'GraphCodeBERT-GAT',
    role: 'Research Engineer',
    summary: 'Hierarchical graph attention for explainable neural code retrieval, combining pretrained code representations with program structure.',
    meta: 'Explainable code retrieval · GNNs',
    href: '/research#graphcodebert-gat',
    kind: 'Published research system',
    status: 'Published / accepted',
    challenge: 'Improve neural code retrieval while preserving a useful connection between model predictions and program structure.',
    contribution: [
      'Built a graph-based retrieval pipeline around pretrained code representations and hierarchical graph attention.',
      'Focused the model design on program dependencies rather than purely token-level similarity.',
      'Turned the research implementation into an auditable experimental system rather than a demo-only prototype.',
    ],
    stack: ['Python', 'PyTorch Geometric', 'GraphCodeBERT', 'Program graphs'],
  },
];

export const researchItems = [
  {
    slug: 'code-model-behavior',
    title: 'Do Code Models Follow Program Behavior?',
    anonymous: true,
  },
  {
    slug: 'pairwise-bug-verification',
    title: 'What Drives Neural Pairwise Bug Verification? A Multilingual Empirical Study of Evaluation Leakage, Representation Learning, and Graph Structure',
    anonymous: true,
  },
  {
    slug: 'entity-level-leakage',
    title: 'Entity-Level Leakage in Code Intelligence Benchmarks: Predicting, Measuring, and Correcting Contamination in Derived-Example Datasets',
    anonymous: true,
  },
  {
    slug: 'cafa',
    title: 'Capability Attribution via Functional ANOVA (CAFA): A Validated Perturbation Framework for Explaining Software Engineering AI Generalization',
    venue: 'Software engineering AI generalization',
    status: 'Ongoing research',
    focus: 'A validated perturbation framework for separating and attributing the mechanisms behind measured generalization in software engineering AI systems.',
  },
  {
    slug: 'graphcodebert-gat',
    title: 'GraphCodeBERT-GAT: Hierarchical Graph Attention Networks for Explainable Neural Code Retrieval',
    venue: 'ICCWAMTIP 2025',
    status: 'Published / accepted',
    focus: 'Explainable neural code retrieval with graph attention over program structure.',
  },
];

export const appliedProjects = [
  {
    title: 'Neuro-Symbolic Program Verification',
    description: 'Hybrid verification work combining formal methods with graph-based neural representations for reasoning about generated program behavior.',
    stack: 'Neuro-symbolic · Program analysis · GNNs · Siamese networks',
  },
  {
    title: 'Restaurant Ordering System',
    description: 'Full-stack ordering and kitchen-display system with real-time order management.',
    stack: 'C++ · Qt5 · Crow · MongoDB',
    href: 'https://github.com/xohdik/Restaurant-Ordering-system',
  },
  {
    title: 'E-Health Management',
    description: 'Appointment scheduling and medical-record management with role-based access.',
    stack: 'Node.js · MongoDB · React',
    href: 'https://github.com/xohdik/E-Health-Management-System',
  },
  {
    title: 'Delay Encryption / Blockchain',
    description: 'VDF-based blockchain consensus and delay-encryption experiments for security protocols.',
    stack: 'Blockchain · Cryptography · VDF',
  },
  {
    title: 'Protein Interaction (STRING)',
    description: 'Deep learning over protein-protein interaction graphs using graph neural networks.',
    stack: 'PyTorch Geometric · Bioinformatics · GNNs',
  },
  {
    title: 'Dual-Function Radar-Communication Design',
    description: 'Joint radar-communication system design for spectrum sharing, target detection, and data transmission.',
    stack: 'Deep learning · Signal processing · MIMO',
  },
  {
    title: 'Industrial Park Detection with YOLO',
    description: 'Real-time object detection for industrial environments and safety monitoring.',
    stack: 'YOLOv8 · Computer vision · Object detection',
  },
  {
    title: 'Scalable Program Graph Extraction for Large Codebases',
    description: 'High-performance extraction and analysis of control-flow and data-flow graphs from multi-language repositories.',
    stack: 'Static analysis · Systems · Program graphs · Tooling',
  },
  {
    title: 'Integrated Chip Defect Detection',
    description: 'Automated visual inspection for micro-defects on integrated circuit chips.',
    stack: 'Halcon · Machine vision · Defect detection · QC automation',
  },
];

export const experience = [
  ['2026 — NOW', 'CTO & Software Engineer', 'SellNaija', 'Product architecture and engineering for a Nigerian commerce PWA spanning storefronts, subscriptions, merchant operations, campaigns, checkout, and platform administration.'],
  ['2023 — NOW', 'CTO & Server Administrator', 'Friendra', 'Production infrastructure, deployment, databases, monitoring, security, and platform reliability.'],
  ['2024 — 2026', 'Graduate Software Engineer', 'UESTC', 'Research and engineering across AI for software engineering, code intelligence, program analysis, and full-stack systems.'],
  ['2021 — 2023', 'Data Engineer', 'Fidelity Pension Managers', 'Python automation, SQL optimization, data transformation, reporting, and operational data systems.'],
  ['2020 — 2021', 'Technical Support', 'Tekniteed Nigeria Limited', 'Enterprise troubleshooting across software, hardware, and network infrastructure.'],
];

export const capabilities = [
  'Software verification', 'Programming languages', 'Formal analysis', 'Program graphs', 'Neuro-symbolic reasoning', 'Code intelligence',
  'Software architecture', 'Product engineering', 'Production systems', 'Python', 'TypeScript / JavaScript', 'React',
  'PostgreSQL', 'Linux / Nginx', 'Docker', 'Experimental design', 'Benchmark auditing', 'Graph neural networks', 'PyTorch',
];
