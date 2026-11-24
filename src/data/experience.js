// Accent colours (hex + rgb tint), defined once as the single source of truth.
// Same `color` / `rgb` shape used by the volunteering data entries.
export const fullTimeAccent = { color: '#06b6d4', rgb: '6, 182, 212' }; // cyan

export const experienceData = [
    {
        role: "Junior Data Scientist",
        company: "SS Infotech",
        companyLink: "", // TODO: add official company URL
        companyUrl: "https://ssinfotech.co.in/",
        location: "Nagpur, Maharashtra, India",
        duration: "Aug 2026 – Present",
        type: "Full-time · On-site",
        employmentType: "full-time",
        category: "Data Scientist",
        color: "#ff4d5a", // coral-red
        keySystemsLabel: "Key Focus",
        keySystems: [
            "ML Workflows",
            "Data Analysis",
            "Dashboards & Reporting"
        ],
        contributions: [
            "Transform raw, multi-source datasets into analysis-ready data using Python and SQL, performing data cleaning, preprocessing, exploratory data analysis, and statistical analysis to uncover underlying patterns and business-relevant insights.",
            "Design and implement end-to-end machine learning workflows, covering feature engineering, algorithm selection, model training, and performance evaluation across regression, classification, and clustering problems.",
            "Experiment with different modeling approaches, validation strategies, and hyperparameter optimization techniques to assess model reliability, improve predictive performance, and ensure generalization on unseen data.",
            "Develop data-driven analytical solutions by translating business requirements into measurable objectives, interpreting model outputs, and identifying actionable insights from complex datasets.",
            "Present analytical findings and model performance through clear visualizations, dashboards, and technical reports, while maintaining organized documentation of experiments, methodologies, and results for reproducibility."
        ],
        techStack: [
            "Python", "SQL", "Data Cleaning", "Data Preprocessing",
            "Exploratory Data Analysis (EDA)", "Statistical Analysis", "Feature Engineering",
            "Regression", "Classification", "Clustering",
            "Hyperparameter Optimization", "Model Evaluation",
            "Data Visualization", "Dashboards", "Technical Reporting"
        ]
    },
    {
        role: "Software Engineer & Data Scientist Intern",
        company: "Hitachi Automation India Pvt. Ltd.",
        companyLink: "https://www.hitachi.com/en-in/",
        location: "Nagpur, Maharashtra, India",
        duration: "Jul 2025 – Jul 2026",
        type: "Internship · On-site",
        employmentType: "internship",
        category: "Data Scientist",
        color: "#ff4d5a", // coral-red
        // badge: "★ Current Role",
        keySystems: [
            "AutoML Platform",
            "Unified Gateway System",
            "Roll Analytics System (RAS)",
            "Coil Sampling & Tracking System",
            "Energy Monitoring System (EMS)"
        ],
        contributions: [
           "Designed and developed an end-to-end Automated Machine Learning (AutoML) platform automating data ingestion, preprocessing, feature engineering, model selection, training, evaluation, and hyperparameter optimization; implemented and benchmarked diverse machine learning and deep learning architectures for scalable, production-oriented experimentation.",
"Developed a production-oriented Energy Monitoring System (EMS) using React.js, Django, and SQL for real-time industrial energy analytics; engineered KPI-driven dashboards, consumption trend analysis, and billing simulations with optimized data models, SQL aggregation pipelines, and RESTful APIs for high-volume data processing.",
"Engineered a secure Coil Sampling & Tracking Management System using Angular, ASP.NET Core, and MS SQL Server to digitize end-to-end coil lifecycle tracking across production stations; implemented KPI analytics, PDI/PDO management, SQL reporting, alarm management, industrial logging, JWT authentication, RBAC, OTP verification, and secure API authorization.",
"Architected and validated a centralized Unified Gateway System (UGS) for real-time industrial data integration across heterogeneous protocols including Modbus, OPC UA/DA, TCP/IP, PROFINET, and DBLINK; developed dynamic flow management, monitoring, telegram logging, alarm management, and secure REST APIs using React.js and Django.",
"Architected and developed a scalable Roll Analytics System (RAS) using Angular, Django, and SQL for real-time roll lifecycle monitoring and industrial performance intelligence; implemented roll wear and diameter-consumption analytics, cost/km and cost/ton analysis, campaign and lifecycle metrics, supplier benchmarking, alarm management, advanced filtering, and automated Excel/CSV reporting.",
"Collaborated with cross-functional engineering teams to translate complex industrial requirements into scalable technical solutions, applying machine learning, data analytics, database engineering, data processing, RESTful API development, industrial communication protocols, system testing, and secure enterprise architecture across production-oriented applications."
        ],
        techStack: [
            "Python", "Django", "React.js", "Angular",
            "Machine Learning", "Deep Learning", "AutoML",
            "Data Analysis", "Data Visualization", "Feature Engineering",
            "Exploratory Data Analysis (EDA)", "Dimensionality Reduction",
            "Ensemble Learning", "Data Preprocessing",
            "Full-Stack Development", "REST API Development",
            "JWT Authentication", "Role-Based Access Control (RBAC)",
            "Middleware Architecture", "Secure System Architecture",
            "System Logging & Monitoring", "Real-Time Systems",
            "Distributed Systems",
            "Database Design & Management", "Microsoft SQL Server", "MongoDB",
            "Industrial IoT (IIoT)", "Industrial Communication Protocols",
            "Modbus", "TCP/IP", "OPC UA", "PROFINET", "DBLink"
        ]
    },
    {
        role: "Research Intern",
        company: "BIntelligenD.com",
        companyLink: "", // TODO: add official company URL
        location: "Nagpur, Maharashtra, India",
        duration: "Jan 2025 – Jun 2025",
        type: "Internship · Hybrid",
        employmentType: "internship",
        category: "Research",
        color: "#3b82f6", // blue
        keySystemsLabel: "Key Research",
        keySystems: [
            "Visual Explainability in Lightweight CNNs for Acute Lymphoblastic Leukaemia Detection in Peripheral Blood Smears"
        ],
        contributions: [
            "Independently conducted research on \"Visual Explainability in Lightweight CNNs for Acute Lymphoblastic Leukaemia Detection in Peripheral Blood Smears,\" developing an explainable deep learning framework for multi-class medical image classification.",
            "Developed and comparatively evaluated MobileNetV3, EfficientNet-B0, and ResNet-50 using transfer learning, progressive fine-tuning, patient-wise data splitting, data augmentation, Focal Loss, and multi-seed evaluation on 3,242 peripheral blood smear images.",
            "Achieved 95.48% mean accuracy and 99.74% AUC with MobileNetV3, demonstrating an effective balance of predictive performance and computational efficiency across four diagnostic classes.",
            "Implemented Grad-CAM-based Explainable AI to visualize diagnostically relevant cellular regions, particularly cell nuclei and morphological features, enhancing model interpretability and transparency for healthcare applications."
        ],
        techStack: [
            "Deep Learning", "Computer Vision", "Medical Imaging",
            "MobileNetV3", "EfficientNet-B0", "ResNet-50",
            "Transfer Learning", "Fine-Tuning", "Data Augmentation",
            "Focal Loss", "Grad-CAM", "Explainable AI (XAI)"
        ]
    },
    {
        role: "Research Intern",
        company: "EZY Multiservices Pvt. Ltd.",
        companyLink: "", // TODO: add official company URL
        location: "Nagpur, Maharashtra, India",
        duration: "Jul 2024 – Dec 2024",
        type: "Internship · Hybrid",
        employmentType: "internship",
        category: "Research",
        color: "#3b82f6", // blue
        keySystemsLabel: "Key Research",
        keySystems: [
            "A Multi-Metric Domain-Aware Benchmarking Framework for Evaluating Text-to-Image Diffusion Models"
        ],
        contributions: [
            "Independently conducted research on \"A Multi-Metric Domain-Aware Benchmarking Framework for Evaluating Text-to-Image Diffusion Models,\" focusing on domain-aware evaluation of generative AI models across human-centric and non-human semantic domains.",
            "Designed and implemented a reproducible benchmarking pipeline to evaluate four Stable Diffusion-based models using standardized PartiPrompts, GPU-accelerated inference, PyTorch, and Hugging Face Diffusers.",
            "Integrated CLIPScore, SSIM, LPIPS, and Aesthetic Score into a weighted composite evaluation framework, enabling quantitative comparison of semantic alignment, structural fidelity, perceptual similarity, and visual quality.",
            "Analyzed experimental results to identify domain-specific model strengths and support informed model selection, contributing to a systematic and transparent evaluation framework for text-to-image generation."
        ],
        techStack: [
            "Generative AI", "Stable Diffusion", "PyTorch",
            "Hugging Face Diffusers", "PartiPrompts", "CLIPScore",
            "SSIM", "LPIPS", "Aesthetic Score",
            "Benchmarking", "GPU Inference"
        ]
    },
    {
        role: "Data Science Intern",
        company: "BIntelligenD.com",
        companyLink: "", // TODO: add official company URL
        location: "Nagpur, Maharashtra, India",
        duration: "Jan 2024 – Jun 2024",
        type: "Internship · Hybrid",
        employmentType: "internship",
        category: "Data Scientist",
        color: "#ff4d5a", // coral-red
        contributions: [
            "Applied Python-based data science techniques to real-world datasets, performing data collection, preprocessing, exploratory data analysis (EDA), data cleaning, and visualization to derive meaningful insights from structured data.",
            "Implemented fundamental machine learning algorithms and supported feature engineering, model evaluation, and performance analysis, gaining hands-on experience across the end-to-end data science workflow.",
            "Developed analytical visualizations and reports to identify patterns, trends, and relationships within datasets, while contributing to data interpretation and technical documentation.",
            "Strengthened practical proficiency in Python and data science libraries through hands-on assignments, applying systematic problem-solving, analytical thinking, and standard development practices to data-driven tasks."
        ],
        techStack: [
            "Python", "Data Collection", "Data Preprocessing",
            "Data Cleaning", "EDA", "Machine Learning",
            "Feature Engineering", "Model Evaluation", "Data Visualization"
        ]
    },
    {
        role: "Founder & CEO",
        company: "Eagle Wears",
        companyLink: "https://eaglewears.in/",
        location: "Nagpur, Maharashtra, India",
        duration: "Dec 2024 – Present",
        type: "Entrepreneurship",
        employmentType: "founder",
        category: "Startup Founded",
        color: "#f59e0b", // amber/gold
        badge: "Founder",
        contributions: [
            "Founded and led Eagle Wears, a custom apparel and sportswear venture delivering premium-quality customized printed T-shirts and activewear",
            "Secured ₹1,00,000+ bulk order within the first few months of launch through effective go-to-market execution and early market adoption",
            "Established the brand across both local distribution networks and digital marketing channels to build strong initial market presence",
            "Oversaw end-to-end business operations including product design, customization strategy, sourcing, vendor management, and order fulfillment",
            "Led product design and customization strategy to align offerings with customer preferences and evolving market trends",
            "Managed vendor sourcing and supplier relationships to ensure product quality, cost efficiency, and reliable production",
            "Developed and executed brand positioning strategies to differentiate the brand in a competitive apparel market",
            "Planned and implemented marketing initiatives to increase brand visibility, customer reach, and sales growth",
            "Handled customer engagement and relationship management to build trust, repeat orders, and long-term business relationships",
            "Managed order processing and fulfillment operations to ensure timely and accurate delivery of customized products",
            "Gained hands-on experience in business development, revenue generation, branding, and operational planning",
            "Demonstrated startup leadership by managing strategy, operations, and growth initiatives while driving sustainable business development"
        ],
        skills: [
            "Entrepreneurship", "Business Strategy", "Brand Development",
            "Operations Management", "Leadership"
        ]
    }
];
