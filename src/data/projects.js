export const projects = [
    {
        title: "Roll Analytics System (RAS)",
        subtitle: "Industrial Performance & Cost Intelligence Platform",
        company: "Hitachi Automation India Pvt. Ltd.",
        duration: "Feb 2026 – Present",
        category: "Industrial AI",
        color: "#ff4d5a",
        badge: "🏭 Industry Project",
        status: "Live / Active",
        description: "Comprehensive Roll Analytics System for real-time monitoring, analysis, and optimization of rolling mill operations through data-driven insights.",
        keyFeatures: [
            "Real-time Monitoring",
            "Cost Analytics",
            "KPI Dashboards",
            "Alarm Management",
            "Supplier Benchmarking",
            "Report Generation"
        ],
        keyHighlights: [
            "Full-stack solution: Angular (Frontend) + Django (Backend) + SQL-based relational database",
            "Interactive dashboards visualizing roll performance, lifecycle trends, and operational KPIs",
            "Cost analytics module computing cost/km, cost/ton, campaign-level cost performance",
            "Automated report generation (CSV/Excel) for management-level decision-making"
        ],
        tech: [
            "Angular",
            "Django",
            "Python",
            "Microsoft SQL Server",
            "REST APIs",
            "JWT Auth",
            "Data Visualization",
            "Full-Stack Development"
        ]
    },
    {
        title: "Unified Gateway System",
        subtitle: "Industrial Data Integration & Flow Management",
        company: "Hitachi Automation India Pvt. Ltd.",
        duration: "Dec 2025 – Feb 2026",
        category: "IoT", // changed from "Industrial IoT" to match filter tabs "IoT"
        color: "#8b5cf6",
        badge: "🔗 Industry Project",
        status: "Completed",
        description: "Industrial-grade Unified Gateway platform enabling real-time communication between heterogeneous industrial systems and enterprise applications.",
        keyFeatures: [
            "Multi-Protocol Support",
            "Real-time Data Flow",
            "Alarm Management",
            "RBAC Security",
            "JWT Auth",
            "Flow Visualization"
        ],
        keyHighlights: [
            "Inbound/outbound modules using Modbus TCP/IP, OPC UA, OPC DA, PROFINET, and DBLINK protocols",
            "Flow Management System mapping real-time data pipelines with Start/Stop/Monitor controls",
            "User management with Role-Based Access Control (User/Admin/SuperAdmin)",
            "React.js interactive frontend for dynamic flow visualization and real-time monitoring"
        ],
        tech: [
            "Django",
            "React.js",
            "Industrial Protocols",
            "Modbus TCP/IP",
            "OPC UA",
            "PROFINET",
            "JWT Auth",
            "RBAC",
            "Microsoft SQL Server",
            "Distributed Systems"
        ]
    },
    {
        title: "Coil Sampling & Tracking System",
        subtitle: "Steel Manufacturing Digitization Platform",
        company: "Hitachi Automation India Pvt. Ltd.",
        duration: "Oct 2025 – Dec 2025",
        category: "Industrial AI",
        color: "#f59e0b",
        badge: "🏭 Industry Project",
        status: "Completed",
        description: "Secure industrial web application to digitize and monitor the complete coil sampling lifecycle in a steel manufacturing environment.",
        keyFeatures: [
            "Real-time Tracking",
            "KPI Dashboards",
            "PDI/PDO Modules",
            "OTP Verification",
            "Alarm Management",
            "Reports Module"
        ],
        keyHighlights: [
            "Real-time coil tracking across Entry, Band Cutter, Sampling, Weighing, and Delivery stations",
            "KPI dashboards monitoring Sample Rate, Scrap Weight, Yield Percentage, and Average Cycle Time",
            "JWT-based Authentication with RBAC, password hashing (PBKDF2/BCrypt), and OTP-based secondary verification",
            "Custom Reports Module with SQL-based filtering and downloadable report generation"
        ],
        tech: [
            "Angular",
            "ASP.NET Core",
            "Microsoft SQL Server",
            "JWT Auth",
            "RBAC",
            "REST APIs",
            "TCP/IP",
            "System Logging"
        ]
    },
    {
        title: "Barrett's Oesophagus Risk Prediction",
        subtitle: "Optimized Hybrid Ensemble ML Models",
        company: "St. Vincent Pallotti College of Engineering & Technology",
        duration: "Aug 2025 – Dec 2025",
        category: "Healthcare AI",
        color: "#ec4899",
        badge: "🔬 Research Project",
        status: "Published",
        description: "AI-driven clinical decision support system to improve risk stratification for Barrett's Oesophagus using quantitative Cytosponge-TFF3 biomarker data.",
        keyFeatures: [
            "Hybrid Ensemble",
            "8 ML Models",
            "SMOTE",
            "Clinical Deployment",
            "Risk Classification",
            "Threshold Optimization"
        ],
        keyHighlights: [
            "Implemented 8 ML models: XGBoost, LightGBM, CatBoost, Random Forest, SVM, Neural Networks, Logistic Regression",
            "Novel hybrid ensemble: XGBoost + LightGBM + CatBoost + Logistic Regression with optimized weighted averaging",
            "Achieved 82.36% accuracy, 0.833 precision, 0.822 recall, 0.831 F1-score",
            "Enabled ~40% reduction in unnecessary gastroscopies while maintaining high clinical sensitivity"
        ],
        tech: [
            "Python",
            "XGBoost",
            "LightGBM",
            "CatBoost",
            "Scikit-learn",
            "SMOTE",
            "Feature Engineering",
            "Clinical Data Analysis",
            "Ensemble Learning"
        ]
    },
    {
        title: "Energy Monitoring System (EMS)",
        subtitle: "Full-Stack Industrial Energy Dashboard",
        company: "Hitachi Automation India Pvt. Ltd.",
        duration: "Sep 2025 – Nov 2025",
        category: "Full-Stack",
        color: "#22c55e",
        badge: "⚡ Industry Project",
        status: "Completed",
        description: "Complete Full-Stack Energy Monitoring System for real-time energy consumption monitoring, interactive dashboards, and industrial data visualization.",
        keyFeatures: [
            "Real-time Dashboards",
            "Energy Tracking",
            "Billing Simulation",
            "REST APIs",
            "Responsive UI",
            "SQL Storage"
        ],
        keyHighlights: [
            "React.js frontend with interactive dashboards displaying energy trends, KPIs, and billing simulations",
            "Django backend with SQL-based database for structured energy data storage",
            "RESTful APIs for real-time data fetching and dynamic frontend updates",
            "Optimized database queries and frontend rendering for performance and efficient data visualization"
        ],
        tech: [
            "React.js",
            "Django",
            "Python",
            "Microsoft SQL Server",
            "REST APIs",
            "JWT Auth",
            "Data Visualization",
            "Full-Stack Development"
        ]
    },
    {
        title: "AutoML Platform",
        subtitle: "End-to-End Machine Learning System",
        company: "Hitachi Automation India Pvt. Ltd.",
        duration: "Aug 2025 – Oct 2025",
        category: "Machine Learning",
        color: "#3b82f6",
        badge: "🤖 Industry Project",
        status: "Completed",
        description: "Comprehensive AutoML platform automating the complete ML pipeline from data ingestion to model evaluation and optimization.",
        keyFeatures: [
            "Auto Data Ingestion",
            "Feature Engineering",
            "Model Training",
            "Evaluation",
            "Deep Learning Support",
            "AutoML Workflows"
        ],
        keyHighlights: [
            "Complete ML lifecycle automation: dataset upload, preprocessing, feature engineering, feature selection, dimensionality reduction, model training",
            "Multiple ML and deep learning models for benchmarking and performance comparison",
            "Strong focus on scalability, usability, and real-world applicability",
            "Enables actionable insights through streamlined automated workflows"
        ],
        tech: [
            "Python",
            "Django",
            "Machine Learning",
            "Deep Learning",
            "Feature Engineering",
            "MongoDB",
            "React.js",
            "REST APIs",
            "Data Visualization"
        ]
    },
    {
        title: "Epileptic Seizure Detection",
        subtitle: "EEG Signals Using Motif-Based Deep Learning",
        company: "St. Vincent Pallotti College of Engineering & Technology",
        duration: "Mar 2025 – Jul 2025",
        category: "Healthcare AI",
        color: "#ec4899",
        badge: "🧠 Research Project",
        status: "Published",
        description: "Intelligent automated epileptic seizure detection system using EEG signals with motif discovery, signal processing, and deep learning techniques.",
        keyFeatures: [
            "EEG Processing",
            "Motif Discovery",
            "Deep Learning",
            "97% Accuracy",
            "Clinical Deployment Ready",
            "Wearable Compatible"
        ],
        keyHighlights: [
            "Models implemented: CNN, CNN-LSTM, Transformer, XGBoost, LightGBM, CatBoost, TabNet, Graph Neural Networks",
            "Best performance using motif-based Transformer and CNN architectures",
            "Achieved ~97% accuracy, precision, recall, and F1-score",
            "Potential applications: wearable EEG devices, remote patient monitoring, clinical decision support"
        ],
        tech: [
            "Python",
            "Deep Learning",
            "CNN",
            "LSTM",
            "Transformer",
            "XGBoost",
            "Signal Processing",
            "Feature Engineering",
            "Biomedical Data Analysis"
        ]
    },
    {
        title: "SmartGoodsMatch",
        subtitle: "AI System to Avoid Empty Vehicle Returns",
        company: "Netfotech Solutions",
        duration: "Jun 2025 – Jul 2025",
        category: "Full-Stack",
        color: "#22c55e",
        badge: "🚛 AI Logistics",
        status: "Completed",
        description: "AI-powered logistics web application designed to reduce empty truck returns and optimize transport efficiency through intelligent load-matching.",
        keyFeatures: [
            "AI Load Matching",
            "Route Optimization",
            "Truck Management",
            "Booking System",
            "REST APIs",
            "Responsive UI"
        ],
        keyHighlights: [
            "Intelligent load-matching connecting empty vehicles with return goods based on location, route, and timing",
            "Flask + SQLite backend with structured database models for trucks, loads, bookings, and users",
            "RESTful APIs for seamless frontend-backend integration",
            "Designed for future ML integration for demand prediction and route optimization"
        ],
        tech: [
            "Python",
            "Flask",
            "SQLite",
            "HTML",
            "CSS",
            "JavaScript",
            "REST APIs",
            "Full-Stack Development"
        ]
    },
    {
        title: "Text-to-Image Diffusion Model Benchmarking",
        subtitle: "Domain-Aware Evaluation Framework",
        company: "St. Vincent Pallotti College of Engineering & Technology",
        duration: "Jul 2024 – Dec 2024",
        category: "Generative AI",
        color: "#a855f7",
        badge: "📊 Research Project",
        status: "Published",
        description: "Domain-aware benchmarking of state-of-the-art Text-to-Image diffusion models with structured and reproducible evaluation methodology.",
        keyFeatures: [
            "4 Diffusion Models",
            "Multi-metric Evaluation",
            "CLIPScore",
            "SSIM",
            "LPIPS",
            "GPU Accelerated",
            "Reproducible Pipeline"
        ],
        keyHighlights: [
            "Evaluated RealisticVision, OpenJourney, Stable Diffusion v1.5, DreamShaper",
            "Multi-metric framework: CLIPScore, SSIM, LPIPS, Aesthetic scoring",
            "Composite scoring formula: 0.4×CLIP + 0.2×SSIM − 0.1×LPIPS + 0.3×Aesthetic",
            "GPU-accelerated using PyTorch, HuggingFace Diffusers, and OpenAI CLIP"
        ],
        tech: [
            "Python",
            "PyTorch",
            "HuggingFace Diffusers",
            "OpenAI CLIP",
            "Deep Learning",
            "Computer Vision",
            "Generative AI",
            "Model Evaluation"
        ]
    }
];
