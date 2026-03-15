export const skillCategories = [
    {
        id: "programming",
        name: "Programming Languages",
        color: "#ff4d5a",
        rgb: "255,77,90",
        icon: "Code2",
        skills: [
            { name: "Python", level: "EXPERT" },
            { name: "C", level: "PROFICIENT" },
            { name: "C++", level: "PROFICIENT" },
            { name: "OOP (Python/C++)", level: "EXPERT" }
        ]
    },
    {
        id: "ml-ai",
        name: "Machine Learning & AI",
        color: "#a855f7",
        rgb: "168,85,247",
        icon: "Brain",
        skills: [
            { name: "Supervised Learning", level: "EXPERT" },
            { name: "Unsupervised Learning", level: "ADVANCED" },
            { name: "Feature Engineering", level: "EXPERT" },
            { name: "Ensemble Methods", level: "EXPERT" },
            { name: "Model Evaluation", level: "EXPERT" },
            { name: "Predictive Analytics", level: "EXPERT" },
            { name: "Data Preprocessing", level: "EXPERT" },
            { name: "CRISP-DM", level: "ADVANCED" }
        ]
    },
    {
        id: "algorithms",
        name: "Algorithms & Models",
        color: "#3b82f6",
        rgb: "59,130,246",
        icon: "GitBranch",
        skills: [
            { name: "XGBoost", level: "EXPERT" },
            { name: "LightGBM", level: "EXPERT" },
            { name: "CatBoost", level: "EXPERT" },
            { name: "Random Forest", level: "EXPERT" },
            { name: "Decision Trees", level: "EXPERT" },
            { name: "SVM", level: "ADVANCED" },
            { name: "KNN", level: "ADVANCED" },
            { name: "Dimensionality Reduction", level: "ADVANCED" }
        ]
    },
    {
        id: "deep-learning",
        name: "Deep Learning",
        color: "#ec4899",
        rgb: "236,72,153",
        icon: "Cpu",
        skills: [
            { name: "Neural Networks (ANN)", level: "ADVANCED" },
            { name: "CNN", level: "ADVANCED" },
            { name: "LSTM", level: "ADVANCED" },
            { name: "PyTorch", level: "ADVANCED" },
            { name: "Diffusion Models", level: "INTERMEDIATE" },
            { name: "Generative AI", level: "INTERMEDIATE" },
            { name: "EEG Signal Processing", level: "EXPERT" },
            { name: "Biomedical Signal Processing", level: "ADVANCED" }
        ]
    },
    {
        id: "libraries",
        name: "Libraries & Frameworks",
        color: "#f59e0b",
        rgb: "245,158,11",
        icon: "Package",
        skills: [
            { name: "NumPy", level: "EXPERT" },
            { name: "Pandas", level: "EXPERT" },
            { name: "Scikit-learn", level: "EXPERT" },
            { name: "Matplotlib", level: "EXPERT" },
            { name: "Seaborn", level: "ADVANCED" },
            { name: "TensorFlow", level: "ADVANCED" },
            { name: "OpenCV", level: "ADVANCED" },
            { name: "Hugging Face", level: "INTERMEDIATE" }
        ]
    },
    {
        id: "web-backend",
        name: "Web & Backend",
        color: "#22c55e",
        rgb: "34,197,94",
        icon: "Globe",
        skills: [
            { name: "Django", level: "ADVANCED" },
            { name: "React.js", level: "ADVANCED" },
            { name: "Flask", level: "ADVANCED" },
            { name: "Angular", level: "ADVANCED" },
            { name: "REST APIs", level: "EXPERT" },
            { name: "JWT Auth", level: "EXPERT" },
            { name: "RBAC", level: "EXPERT" },
            { name: "Full-Stack Development", level: "ADVANCED" }
        ]
    },
    {
        id: "databases",
        name: "Databases",
        color: "#06b6d4",
        rgb: "6,182,212",
        icon: "Database",
        skills: [
            { name: "MySQL", level: "EXPERT" },
            { name: "SQLite", level: "EXPERT" },
            { name: "Microsoft SQL Server", level: "ADVANCED" },
            { name: "MongoDB", level: "INTERMEDIATE" },
            { name: "Database Design", level: "ADVANCED" },
            { name: "Data Querying", level: "EXPERT" }
        ]
    },
    {
        id: "data-analysis",
        name: "Data Analysis & Visualization",
        color: "#f97316",
        rgb: "249,115,22",
        icon: "BarChart2",
        skills: [
            { name: "Power BI", level: "ADVANCED" },
            { name: "Tableau", level: "ADVANCED" },
            { name: "Plotly / Dash", level: "ADVANCED" },
            { name: "EDA", level: "EXPERT" },
            { name: "Data Visualization", level: "EXPERT" },
            { name: "Business Analytics", level: "ADVANCED" },
            { name: "Data Cleaning", level: "EXPERT" },
            { name: "Data-Driven Decision Making", level: "EXPERT" }
        ]
    },
    {
        id: "dev-tools",
        name: "Development Tools",
        color: "#64748b",
        rgb: "100,116,139",
        icon: "Wrench",
        skills: [
            { name: "VS Code", level: "EXPERT" },
            { name: "Jupyter Notebook", level: "EXPERT" },
            { name: "Git / GitHub", level: "ADVANCED" },
            { name: "RStudio", level: "PROFICIENT" },
            { name: "IBM Watson Studio", level: "INTERMEDIATE" },
            { name: "Docker", level: "INTERMEDIATE" }
        ]
    },
    {
        id: "cloud",
        name: "Cloud & Deployment",
        color: "#38bdf8",
        rgb: "56,189,248",
        icon: "Cloud",
        skills: [
            { name: "AWS (EC2, S3, IAM)", level: "INTERMEDIATE" },
            { name: "Cloud Deployment", level: "INTERMEDIATE" },
            { name: "Serverless Basics", level: "INTERMEDIATE" },
            { name: "Model Deployment", level: "INTERMEDIATE" }
        ]
    },
    {
        id: "computer-vision",
        name: "Computer Vision",
        color: "#8b5cf6",
        rgb: "139,92,246",
        icon: "Eye",
        skills: [
            { name: "OpenCV", level: "ADVANCED" },
            { name: "Object Detection", level: "ADVANCED" },
            { name: "Image Processing", level: "ADVANCED" },
            { name: "torchvision", level: "ADVANCED" },
            { name: "Computer Vision", level: "ADVANCED" }
        ]
    },
    {
        id: "healthcare-ai",
        name: "Healthcare AI & Biomedical",
        color: "#f43f5e",
        rgb: "244,63,94",
        icon: "Heart",
        skills: [
            { name: "EEG Signal Processing", level: "EXPERT" },
            { name: "Biomedical Data Analysis", level: "EXPERT" },
            { name: "Clinical Risk Stratification", level: "EXPERT" },
            { name: "Medical Decision Support", level: "ADVANCED" },
            { name: "Clinical Decision Support Systems", level: "ADVANCED" },
            { name: "Healthcare Artificial Intelligence", level: "EXPERT" }
        ]
    },
    {
        id: "explainability",
        name: "Model Explainability",
        color: "#14b8a6",
        rgb: "20,184,166",
        icon: "Search",
        skills: [
            { name: "SHAP", level: "ADVANCED" },
            { name: "LIME", level: "ADVANCED" },
            { name: "Model Evaluation & Validation", level: "EXPERT" },
            { name: "Pattern Recognition", level: "ADVANCED" }
        ]
    },
    {
        id: "soft-skills",
        name: "Soft Skills",
        color: "#f59e0b",
        rgb: "245,158,11",
        icon: "Users",
        skills: [
            { name: "Leadership", level: "EXPERT" },
            { name: "Public Speaking", level: "ADVANCED" },
            { name: "Community Outreach", level: "ADVANCED" },
            { name: "Program Coordination", level: "ADVANCED" },
            { name: "Stakeholder Communication", level: "ADVANCED" },
            { name: "Problem Solving", level: "EXPERT" },
            { name: "Volunteer Management", level: "ADVANCED" },
            { name: "Event Planning", level: "ADVANCED" }
        ]
    }
];
