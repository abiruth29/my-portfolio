export const resumeData = {
    personalInfo: {
        name: "Abiruth S",
        role: "Software Developer",
        taglines: [
            "Building scalable distributed systems",
            "Crafting cloud-native backends",
            "Architecting AI-powered applications",
            "Shipping from design to deployment"
        ],
        shortSummary: "CS undergraduate with hands-on experience building scalable distributed systems, cloud-native backends, and AI-powered applications.",
        location: "Coimbatore, India",
        email: "abiruths29@gmail.com",
        phone: "+91 9042385250",
        linkedin: "https://linkedin.com/in/abiruth-s",
        github: "https://github.com/abiruth29",
        summary: "CS undergraduate with hands-on experience building scalable distributed systems, cloud-native backends, and AI-powered applications. Proven ability to own the full software development lifecycle — from design to deployment — across Python, C++, Java, and TypeScript."
    },
    education: [
        {
            degree: "B.Tech – CSE (Artificial Intelligence)",
            school: "Amrita School of AI, Amrita Vishwa Vidyapeetham",
            duration: "2023 – Expected 2027",
            grade: "",
            coursework: [
                "Data Structures & Algorithms",
                "Object-Oriented Design",
                "ML, DL & NLP",
                "Database Systems (SQL & NoSQL)",
                "Cloud Computing",
                "Cybersecurity"
            ]
        }
    ],
    experience: [
        {
            role: "Software Developer Intern",
            company: "OPTIVERSE Enterprise Pvt. Ltd.",
            location: "Chennai, India",
            duration: "May 2025 – Aug 2025",
            points: [
                "Designed and built a full-stack operational dashboard for Ramco Cements using modular, component-driven architecture following OOP and SOLID design principles.",
                "Developed RESTful backend services handling real-time analytics and monitoring data, ensuring clean separation of concerns and maintainability.",
                "Practiced agile workflows with iterative sprint cycles, code reviews, and version-controlled delivery via Git.",
                "Collaborated with stakeholders to translate manufacturing domain requirements into software specifications and shipped functional deliverables end-to-end."
            ]
        }
    ],
    projects: [
        {
            id: 1,
            slug: "specsync",
            title: "SpecSync: AI-Powered Engineering Operations Platform",
            shortTitle: "SpecSync",
            category: "Systems & AI",
            featured: true,
            tech: "Python, FastAPI, PostgreSQL, Redis, Docker, CI/CD",
            oneLiner: "Microservice platform automating engineering issue triage across Slack, GitHub & Jira.",
            description: "Architected a microservice-based production platform automating engineering issue detection and assignment across Slack, GitHub, Jira, and meeting summaries.",
            githubUrl: "https://github.com/abiruth29",
            liveUrl: "",
            highlight: "50% reduction in manual triage time",
            points: [
                "Implemented asynchronous REST APIs with Redis-backed context memory for low-latency, fault-tolerant performance under concurrent load.",
                "Designed scalable data models for issue history, employee assignments, and cross-service state; containerized with Docker and deployed via CI/CD pipelines.",
                "Achieved 50% reduction in manual triage time through a multi-agent AI consensus system for cross-functional issue prioritization."
            ]
        },
        {
            id: 2,
            slug: "raseed-financial-literacy",
            title: "Raseed: AI-Powered Financial Literacy Platform",
            shortTitle: "Raseed",
            category: "Mobile & AI",
            featured: true,
            tech: "Flutter, Python, FastAPI, Firebase (NoSQL), Google Wallet API",
            oneLiner: "Cross-platform FinTech app with AI coach + Google Wallet integration.",
            description: "A FinTech application with a clean layered architecture separating UI, business logic, and cloud data services.",
            githubUrl: "https://github.com/abiruth29",
            liveUrl: "",
            highlight: "🏆 Google Agentic AI Hackathon Winner",
            badge: "Breakthrough Concept Award",
            points: [
                "Built a cross-platform FinTech application with a clean layered architecture separating UI, business logic, and cloud data services.",
                "Designed secure auth and payment workflows using Firebase (NoSQL) and Google Wallet APIs.",
                "Awarded the Breakthrough Concept Award at the Google Agentic AI Hackathon 2025."
            ]
        },
        {
            id: 3,
            slug: "health-materials-rag-system",
            title: "Health Materials RAG System",
            shortTitle: "Health RAG",
            category: "NLP & RAG",
            featured: true,
            tech: "Python, FastAPI, FAISS, spaCy, Sentence-BERT, PostgreSQL",
            oneLiner: "End-to-end RAG over 10,000+ biomedical papers with sub-10ms retrieval.",
            description: "Scalable end-to-end RAG system over 10,000+ biomedical papers with a knowledge graph for materials–disease–protein reasoning.",
            githubUrl: "https://github.com/abiruth29/health-materials-rag-system",
            liveUrl: "",
            highlight: "Sub-10ms query latency · 527 nodes KG",
            points: [
                "Designed and constructed a knowledge graph (527 nodes, 862 edges) using OOP-based graph abstractions for materials–disease–protein reasoning.",
                "Optimized dense vector retrieval with FAISS achieving sub-10ms query latency; exposed clean REST APIs enabling real-time querying.",
                "Applied algorithmic techniques (approximate nearest neighbor search, graph traversal) to solve complex retrieval at scale."
            ]
        },
        {
            id: 4,
            slug: "cognithreat-intrusion-detection",
            title: "CogniThreat: Hybrid Quantum CNN–LSTM IDS",
            shortTitle: "CogniThreat",
            category: "Quantum ML",
            featured: true,
            tech: "Python, TensorFlow, PennyLane, Bayesian Inference",
            oneLiner: "Hybrid quantum-classical intrusion detection with Bayesian false-positive reduction.",
            description: "Hybrid quantum–classical CNN–LSTM model for network intrusion detection with Bayesian inference for false positive reduction.",
            githubUrl: "https://github.com/abiruth29/CogniThreat",
            liveUrl: "",
            highlight: "2–5% accuracy over classical baselines",
            points: [
                "Developed a hybrid quantum–classical CNN–LSTM model; demonstrated complex algorithm design and OOP-based model architecture.",
                "Applied Bayesian inference to reduce false positives, achieving a 2–5% accuracy improvement over classical baselines.",
                "Deployed in distributed network environments for real-time threat detection."
            ]
        },
        {
            id: 5,
            slug: "ecg-arrhythmia-detection",
            title: "ECG Arrhythmia Detection",
            shortTitle: "ECG Detection",
            category: "Deep Learning",
            featured: false,
            tech: "Python, PyTorch, Signal Processing",
            oneLiner: "Deep learning pipeline for cardiac arrhythmia classification from ECG signals.",
            description: "Deep learning pipeline for classifying cardiac arrhythmias from ECG signals using convolutional and recurrent architectures.",
            githubUrl: "https://github.com/abiruth29/ecg-arrhythmia-detection",
            liveUrl: "",
            highlight: "",
            points: [
                "End-to-end preprocessing, feature extraction, CNN-based classifier and evaluation pipeline.",
                "Focus on explainability and clinical-grade metrics: sensitivity, specificity, F1.",
                "Achieved high accuracy on MIT-BIH benchmark dataset."
            ]
        },
        {
            id: 6,
            slug: "genomic-sequence-alignment",
            title: "Genomic Sequence Alignment",
            shortTitle: "Genomic Alignment",
            category: "Bioinformatics",
            featured: false,
            tech: "Python, Biopython, Dynamic Programming",
            oneLiner: "Tool for cross-species DNA sequence comparison and conserved region detection.",
            description: "Tool to compare DNA sequences across species for conserved region detection using dynamic programming alignment algorithms.",
            githubUrl: "https://github.com/abiruth29/genomic-sequence-alignment",
            liveUrl: "",
            highlight: "",
            points: [
                "Algorithms for pairwise & multiple alignment and visualization.",
                "Identifies conserved regions across species using dynamic programming.",
                "Efficient implementation of Needleman-Wunsch and Smith-Waterman algorithms."
            ]
        },
        {
            id: 7,
            slug: "epidemiology-simulation",
            title: "Epidemiology Simulation",
            shortTitle: "Epi Simulation",
            category: "Simulation",
            featured: false,
            tech: "Python, SIR/SEIR Models, Data Visualization",
            oneLiner: "Agent-based SIR simulation modeling disease spread and intervention impact.",
            description: "Agent-based simulation modeling disease spread dynamics using SIR/SEIR compartmental models with visualization.",
            githubUrl: "https://github.com/abiruth29/Epidemiology-Simulation",
            liveUrl: "",
            highlight: "",
            points: [
                "Implemented SIR/SEIR model on graph networks with parameter sensitivity analysis.",
                "Analyzed intervention strategies and visualized containment effectiveness.",
                "Explored parameter sensitivity and stochastic vs. deterministic spread dynamics."
            ]
        },
        {
            id: 8,
            slug: "dataview",
            title: "DataView: Enterprise Data Visualization",
            shortTitle: "DataView",
            category: "Web & Backend",
            featured: false,
            tech: "TypeScript, Node.js, SQL",
            oneLiner: "Microservice analytics dashboard for enterprise data visualization.",
            description: "Microservice-based analytics dashboard for real-time enterprise data visualization with secure auth and CI/CD.",
            githubUrl: "https://github.com/abiruth29/DataView",
            liveUrl: "",
            highlight: "",
            points: [
                "Architected microservices + optimized DB queries for concurrent query handling.",
                "Implemented secure authentication, role-based access, and SQL injection protection.",
                "Deployed via CI/CD with monitoring and alerting."
            ]
        }
    ],
    achievements: [
        {
            title: "Breakthrough Concept Award",
            event: "Google Agentic AI Hackathon",
            year: "2025",
            emoji: "🏆",
            description: "For Raseed — AI-Powered Financial Literacy Platform"
        },
        {
            title: "3rd Place",
            event: "Gen AI × Gender Technology Hackathon",
            year: "2024",
            emoji: "🥉",
            description: "Generative AI applied to gender tech solutions"
        }
    ],
    skills: {
        "Programming": ["Python", "C++", "Java", "JavaScript", "TypeScript", "SQL", "Dart"],
        "Systems & Architecture": ["OOP", "SOLID Principles", "Design Patterns", "REST APIs", "Microservices", "Distributed Systems"],
        "Cloud & Databases": ["AWS (S3, Glue, Athena)", "PostgreSQL", "Redis", "Firebase (NoSQL)", "Docker"],
        "AI & Data": ["LLMs", "RAG", "Deep Learning", "NLP", "PyTorch", "TensorFlow", "HuggingFace", "ETL Pipelines"],
        "DevOps & Tools": ["Git", "CI/CD", "Linux", "Bash", "Agile/Scrum"]
    },
    interests: [
        "Scalable Systems Design",
        "Cloud-Native Backends",
        "Applied AI & GenAI",
        "Open Source Engineering",
        "Distributed Computing"
    ]
};

export const projectCategories = [
    "All", "Systems & AI", "NLP & RAG", "Quantum ML",
    "Mobile & AI", "Deep Learning", "Web & Backend",
    "Bioinformatics", "Simulation"
];
