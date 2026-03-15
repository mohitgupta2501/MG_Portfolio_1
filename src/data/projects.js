export const projects = [
    {
        title: "Roll Analytics System (RAS)",
        subtitle: "Industrial Performance & Cost Intelligence Platform",
        company: "Hitachi Automation India Pvt. Ltd.",
        duration: "Feb 2026 – Present",
        category: "Industrial",
        color: "#ff4d5a",
        badge: "Enterprise Project",
        status: "Live System",
        description: "Enterprise-grade Roll Analytics System enabling real-time monitoring, lifecycle analysis, and cost intelligence for rolling mill operations through data-driven industrial analytics.",
        doc: "/public/Projects/Roll Analytics System.pdf",
        keyFeatures: [
            "Real-time Roll Monitoring",
            "Roll Lifecycle Tracking",
            "Cost & Performance Analytics",
            "KPI Dashboards",
            "Supplier Benchmarking",
            "Alarm & Alert Management",
            "Automated Reporting",
            "Advanced Data Filtering"
        ],

        keyHighlights: [
            "Architected a scalable full-stack platform using Angular (Frontend), Django (Backend), and Microsoft SQL Server",
            "Developed enterprise dashboards visualizing roll performance, lifecycle trends, and operational KPIs",
            "Implemented roll lifecycle analytics including diameter consumption tracking, wear monitoring, and cycle history management",
            "Built cost intelligence modules computing cost/km, cost/ton, campaign-level performance, and lifecycle cost trends",
            "Engineered secure REST APIs enabling seamless communication between frontend, backend, and industrial data sources",
            "Designed supplier benchmarking framework analyzing utilization, productivity, breakdown frequency, and cost efficiency",
            "Integrated alarm management system with severity classification and parameter-based triggers",
            "Developed multi-parameter filtering across Mill, Stand, Roll, Supplier, Grade, and Date Range for deep analytics",
            "Enabled automated CSV/Excel reporting for operational reviews and management decision support",
            "Optimized SQL queries for efficient aggregation and reporting of high-volume industrial datasets",
            "Structured the system with modular architecture to support scalable industrial deployments"
        ],

        tech: [
            "Angular",
            "Django",
            "Python",
            "Microsoft SQL Server",
            "REST APIs",
            "JWT Authentication",
            "Data Visualization",
            "Industrial Analytics",
            "Full-Stack Development"
        ]
    },
    {
        title: "Unified Gateway System",
        subtitle: "Industrial Data Integration & Flow Orchestration Platform",
        company: "Hitachi Automation India Pvt. Ltd.",
        duration: "Dec 2025 – Feb 2026",
        category: "Industrial",
        color: "#8b5cf6",
        badge: "Enterprise Project",
        status: "Completed",
        description: "Industrial-grade middleware gateway enabling real-time integration and orchestration of heterogeneous industrial systems, PLCs, and enterprise applications through multi-protocol communication and secure data pipelines.",
        doc: "public/Projects/Unified Gateway Industrial Data Integration System.pdf",

        keyFeatures: [
            "Multi-Protocol Integration",
            "Real-time Data Pipelines",
            "Flow Management System",
            "Alarm & Failure Monitoring",
            "RBAC Security",
            "JWT Authentication",
            "Flow Visualization",
            "Structured System Logging"
        ],

        keyHighlights: [
            "Developed industrial middleware platform enabling seamless communication between PLCs, sensors, and enterprise systems",
            "Implemented inbound and outbound data modules supporting Modbus TCP/IP, OPC UA, OPC DA, PROFINET, and DBLINK protocols",
            "Engineered Flow Management System for creating and controlling real-time data pipelines with Start/Stop/Monitor execution controls",
            "Designed centralized dashboards to monitor inbound connections, outbound flows, and system execution statistics in real time",
            "Implemented structured logging modules including operation logs and telegram logs for industrial communication traceability",
            "Integrated alarm management system with severity classification and real-time failure detection",
            "Developed secure user management system with Role-Based Access Control (User/Admin/SuperAdmin)",
            "Implemented JWT-based authentication with encrypted token validation and secure API authorization",
            "Built scalable REST APIs using Django for protocol integration, authentication, and system orchestration",
            "Developed interactive React.js frontend for dynamic flow visualization and real-time monitoring of industrial data pipelines"
        ],

        tech: [
            "Django",
            "React.js",
            "OPC UA",
            "Industrial Protocols",
            "Modbus TCP/IP",
            "PROFINET",
            "Microsoft SQL Server",
            "REST APIs",
            "JWT Authentication",
            "RBAC",
            "Distributed Systems",
            "Industrial IoT"
        ]
    },
    {
        title: "Coil Sampling & Tracking System",
        subtitle: "Steel Manufacturing Process Digitization Platform",
        company: "Hitachi Automation India Pvt. Ltd.",
        duration: "Oct 2025 – Dec 2025",
        category: "Industrial",
        color: "#f59e0b",
        badge: "Enterprise Project",
        status: "Completed",
        description: "Industrial web platform designed to digitize, monitor, and manage the complete coil sampling lifecycle in steel manufacturing operations with real-time tracking, KPI analytics, and enterprise-grade security.",
        doc: "public/Projects/Coil Sampling Tracking Management System Report.pdf",


        keyFeatures: [
            "Real-time Coil Tracking",
            "Production KPI Dashboards",
            "PDI/PDO Data Modules",
            "OTP-based Verification",
            "Alarm Management",
            "Reports & Analytics",
            "RBAC Security",
            "System Logging"
        ],

        keyHighlights: [
            "Developed industrial web system to digitize coil sampling workflows across steel manufacturing operations",
            "Implemented real-time coil tracking across Entry, Band Cutter, Sampling, Weighing, and Delivery production stations",
            "Designed KPI-driven dashboards monitoring Sample Rate, Scrap Weight, Yield Percentage, and Average Cycle Time",
            "Built PDI (Primary Data Input) module storing coil specifications, dimensions, weights, and quality codes",
            "Developed PDO (Primary Data Output) module managing processed sampling records and operational reports",
            "Implemented real-time tracking dashboard with station-wise status monitoring and workflow visualization",
            "Designed structured logging system including Telegram Logs (TCP/IP communication) and Activity Logs (login, OTP verification, IP tracking)",
            "Integrated alarm management module with severity classification and timestamped event history",
            "Developed custom reports engine with SQL-based filtering, parameter selection, and downloadable reports",
            "Implemented enterprise security architecture using JWT authentication, RBAC authorization, password hashing (PBKDF2 / BCrypt), and secure API middleware",
            "Integrated OTP-based secondary verification and device/IP logging for enhanced access security",
            "Improved manufacturing traceability, reduced manual intervention, and enhanced operational decision-making"
        ],

        tech: [
            "Angular",
            "RBAC",
            "REST APIs",
            "Microsoft SQL Server",
            "JWT Authentication",
            "ASP.NET Core",
            "TCP/IP",
            "System Logging",
            "Industrial IoT",
            "Secure API Architecture"
        ]
    },
    {
        title: "Barrett's Oesophagus Risk Prediction",
        subtitle: "Hybrid Ensemble Machine Learning Framework",
        company: "St. Vincent Pallotti College of Engineering & Technology",
        duration: "Aug 2025 – Dec 2025",
        category: "Healthcare",
        color: "#ec4899",
        badge: "Research Project",
        status: "Published",
        description: "AI-driven clinical decision support system designed to improve risk stratification for Barrett's Oesophagus using quantitative Cytosponge-TFF3 biomarker data and optimized hybrid ensemble machine learning models.",
        doc: "public/Projects/Barretts Oesophagus.pdf",

        keyFeatures: [
            "Hybrid Ensemble Learning",
            "8 Machine Learning Models",
            "SMOTE Class Balancing",
            "Clinical Risk Classification",
            "Threshold Optimization",
            "Model Validation"
        ],

        keyHighlights: [
            "Developed AI-based clinical risk prediction system using Cytosponge-TFF3 biomarker dataset for early Barrett's Oesophagus detection",
            "Implemented and evaluated 8 ML models including XGBoost, LightGBM, CatBoost, Random Forest, SVM, Neural Networks, and Logistic Regression",
            "Designed novel hybrid ensemble combining XGBoost, LightGBM, CatBoost, and Logistic Regression using optimized weighted averaging",
            "Applied SMOTE to address class imbalance and improve minority class detection",
            "Used stratified cross-validation for reliable model evaluation and improved generalization",
            "Achieved performance metrics of 82.36% accuracy, 0.833 precision, 0.822 recall, and 0.831 F1-score",
            "Outperformed individual baseline models demonstrating strong ensemble robustness",
            "Implemented threshold optimization to enable flexible clinical deployment",
            "Enabled up to 40% reduction in unnecessary gastroscopy procedures while maintaining high sensitivity",
            "Demonstrated real-world application of ensemble learning for scalable clinical decision support"
        ],

        tech: [
            "Python",
            "XGBoost",
            "LightGBM",
            "CatBoost",
            "Scikit-learn",
            "SMOTE",
            "Feature Engineering",
            "Ensemble Learning",
            "Clinical Data Analysis",
            "Biomedical AI"
        ]
    },
    {
        title: "Energy Monitoring System (EMS)",
        subtitle: "Industrial Energy Analytics & Monitoring Platform",
        company: "Hitachi Automation India Pvt. Ltd.",
        duration: "Sep 2025 – Nov 2025",
        category: "Industrial",
        color: "#22c55e",
        badge: "Enterprise Project",
        status: "Completed",
        description: "Full-stack industrial energy monitoring platform designed to visualize real-time energy consumption, analyze operational trends, and provide interactive dashboards for data-driven energy management.",
        doc: "public/Projects/Energy Monitoring System.pdf",

        keyFeatures: [
            "Real-time Energy Dashboards",
            "Energy Consumption Tracking",
            "Billing Simulation",
            "KPI Monitoring",
            "REST API Integration",
            "Responsive UI",
            "SQL Data Storage",
            "Data Visualization"
        ],

        keyHighlights: [
            "Developed full-stack energy monitoring platform using React.js frontend and Django backend architecture",
            "Designed interactive dashboards visualizing energy consumption trends, operational KPIs, and billing simulations",
            "Built RESTful APIs enabling real-time data retrieval and dynamic dashboard updates",
            "Designed relational database schema using Microsoft SQL Server for structured storage of energy consumption data",
            "Implemented responsive UI components for cross-device compatibility and intuitive energy data visualization",
            "Optimized database queries and frontend rendering for efficient processing of large energy datasets",
            "Developed scalable system architecture supporting future expansion and higher data volumes",
            "Focused on usability and clear visual representation to support industrial energy monitoring and analysis"
        ],

        tech: [
            "React.js",
            "Django",
            "Python",
            "Microsoft SQL Server",
            "REST APIs",
            "JWT Authentication",
            "Data Visualization",
            "Full-Stack Development",
            "Industrial Analytics"
        ]
    },
    {
        title: "AutoML Platform",
        subtitle: "End-to-End Machine Learning Automation System",
        company: "Hitachi Automation India Pvt. Ltd.",
        duration: "Aug 2025 – Oct 2025",
        category: "Machine Learning",
        color: "#3b82f6",
        badge: "Enterprise Project",
        status: "Completed",
        description: "Full-stack AutoML platform designed to automate the complete machine learning lifecycle including data ingestion, preprocessing, feature engineering, model training, and evaluation through scalable automated workflows.",
        doc: "public/Projects/AutoML Platform.pdf",

        keyFeatures: [
            "Automated ML Pipelines",
            "Dataset Ingestion",
            "Feature Engineering",
            "Model Benchmarking",
            "Deep Learning Support",
            "Dimensionality Reduction",
            "Workflow Automation",
            "Model Evaluation"
        ],

        keyHighlights: [
            "Developed end-to-end AutoML system automating dataset upload, preprocessing, feature engineering, feature selection, and model training",
            "Implemented automated ML workflows supporting minimal manual intervention across the entire ML lifecycle",
            "Integrated multiple machine learning and deep learning models for benchmarking and comparative performance evaluation",
            "Applied feature engineering, dimensionality reduction, and exploratory data analysis to improve model performance",
            "Built scalable backend architecture using Django with REST APIs for ML workflow orchestration",
            "Developed React.js interface enabling intuitive dataset management, model execution, and result visualization",
            "Designed system architecture focused on scalability, usability, and real-world ML deployment scenarios",
            "Enabled generation of optimized predictive models and actionable insights through automated pipelines"
        ],

        tech: [
            "Python",
            "Django",
            "React.js",
            "Machine Learning",
            "Deep Learning",
            "Feature Engineering",
            "MongoDB",
            "REST APIs",
            "Data Visualization",
            "AutoML Systems"
        ]
    },
    {
        title: "Epileptic Seizure Detection",
        subtitle: "Motif-Based Deep Learning for EEG Analysis",
        company: "St. Vincent Pallotti College of Engineering & Technology",
        duration: "Mar 2025 – Jul 2025",
        category: "Healthcare",
        color: "#ec4899",
        badge: "Research Project",
        status: "Published",
        description: "AI-driven seizure detection system leveraging EEG signal processing, motif discovery, and deep learning architectures to accurately classify seizure and non-seizure brain activity.",
        doc: "public/Projects/Epileptic Seizure Detection.pdf",

        keyFeatures: [
            "EEG Signal Processing",
            "Motif Discovery",
            "Deep Learning Models",
            "Time-Series Classification",
            "97% Detection Accuracy",
            "Clinical Decision Support",
            "Wearable Device Compatibility",
            "Real-time Monitoring"
        ],

        keyHighlights: [
            "Developed automated seizure detection system using EEG signals and motif-based pattern recognition",
            "Preprocessed raw EEG data using filtering, normalization, and signal segmentation techniques",
            "Applied motif discovery to extract recurring signal patterns associated with seizure onset",
            "Utilized motif-based features for advanced time-series classification models",
            "Implemented and evaluated multiple architectures including CNN, CNN-LSTM, Transformer, XGBoost, LightGBM, CatBoost, TabNet, and Graph Neural Networks",
            "Achieved best performance using motif-based Transformer and CNN architectures",
            "Attained approximately 97% accuracy, precision, recall, and F1-score across evaluation metrics",
            "Significantly outperformed traditional machine learning approaches for seizure detection",
            "Designed system architecture suitable for real-time monitoring and scalable healthcare deployment",
            "Demonstrated potential applications in wearable EEG devices, remote patient monitoring, and clinical decision-support systems"
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
            "Time-Series Analysis",
            "Biomedical AI"
        ]
    },
    {
        title: "SmartGoodsMatch",
        subtitle: "Intelligent Logistics Load Matching Platform",
        company: "Netfotech Solutions",
        duration: "Jun 2025 – Jul 2025",
        category: "Logistics",
        color: "#22c55e",
        badge: "Industry Project",
        status: "Completed",
        description: "Logistics optimization platform designed to reduce empty truck returns by intelligently matching available vehicles with return loads based on location, route, and timing constraints.",
        doc: "public/Projects/SmartGoodsMatch.pdf",

        keyFeatures: [
            "Load-Vehicle Matching",
            "Route-Based Matching",
            "Truck & Load Management",
            "Booking System",
            "REST API Integration",
            "Responsive Web Interface",
            "Logistics Data Management"
        ],

        keyHighlights: [
            "Developed logistics optimization platform addressing empty vehicle return problem in goods transportation",
            "Implemented intelligent load-matching algorithm connecting available trucks with return shipments based on location, route, and timing constraints",
            "Designed backend architecture using Flask and SQLite with structured database models for trucks, loads, bookings, and users",
            "Built RESTful APIs enabling seamless communication between frontend interface and backend services",
            "Developed responsive frontend using HTML, CSS, and JavaScript for efficient booking and vehicle management workflows",
            "Designed modular system architecture supporting future integration of machine learning models for demand prediction and route optimization",
            "Applied clean code architecture and modular backend services for scalable logistics system development"
        ],

        tech: [
            "Python",
            "Flask",
            "SQLite",
            "HTML",
            "CSS",
            "JavaScript",
            "REST APIs",
            "Full-Stack Development",
            "Logistics Optimization"
        ]
    },
    {
        title: "Text-to-Image Diffusion Model Benchmarking",
        subtitle: "Domain-Aware Generative AI Evaluation Framework",
        company: "St. Vincent Pallotti College of Engineering & Technology",
        duration: "Jul 2024 – Dec 2024",
        category: "Generative AI",
        color: "#a855f7",
        badge: "Research Project",
        status: "Published",
        description: "Research framework for domain-aware benchmarking of text-to-image diffusion models using structured multi-metric evaluation and reproducible experimental pipelines.",
        doc: "public/Projects/Text to Image.pdf",

        keyFeatures: [
            "Diffusion Model Benchmarking",
            "Domain-Aware Evaluation",
            "Multi-Metric Scoring",
            "CLIPScore / SSIM / LPIPS",
            "GPU Accelerated Experiments",
            "Reproducible Evaluation Pipeline",
            "PartiPrompts Dataset"
        ],

        keyHighlights: [
            "Evaluated four diffusion models: RealisticVision, OpenJourney, Stable Diffusion v1.5, and DreamShaper",
            "Generated standardized image outputs using prompts derived from Google's PartiPrompts dataset",
            "Designed domain-aware evaluation comparing human-centric and non-human semantic prompt categories",
            "Developed multi-metric benchmarking framework using CLIPScore, SSIM, LPIPS, and Aesthetic scoring",
            "Proposed weighted composite evaluation formula (0.4×CLIP + 0.2×SSIM − 0.1×LPIPS + 0.3×Aesthetic)",
            "Built fully reproducible GPU-accelerated evaluation pipeline using PyTorch, HuggingFace Diffusers, and OpenAI CLIP",
            "Identified domain-specific strengths and performance variations across diffusion model architectures",
            "Developed scalable benchmarking framework adaptable for future generative AI and multimodal evaluation research"
        ],

        tech: [
            "Python",
            "PyTorch",
            "OpenAI CLIP",
            "HuggingFace Diffusers",
            "Generative AI",
            "Computer Vision",
            "Diffusion Models",
            "Model Evaluation",
            "GPU Computing"
        ]
    }
];
