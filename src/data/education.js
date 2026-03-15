export const educationData = [
    {
        id: "btech",
        type: "primary",
        institution: "St. Vincent Pallotti College of Engineering & Technology",
        degree: "Bachelor of Technology (B.Tech.)",
        field: "Computer Science Engineering (Data Science)",
        duration: "Aug 2022 – Jul 2026",
        location: "Nagpur, Maharashtra",
        color: "#ff4d5a",
        status: "Pursuing",
        badge: "🎓 Currently Pursuing",
        cgpa: {
            value: "9.60",
            outOf: "10.00",
            description: "First Rank | All 4 Years",
            semesters: [
                { sem: "Sem 1", value: null },
                { sem: "Sem 2", value: "10.0", perfect: true },
                { sem: "Sem 3", value: null },
                { sem: "Sem 4", value: "10.0", perfect: true },
            ],
        },
    },
    {
        id: "hsc",
        type: "secondary",
        category: "HSC",
        institution: "Yashoda Higher Secondary School",
        board: "Maharashtra State Board",
        degree: "Higher Secondary Certificate (HSC) — Class XII",
        duration: "2020 – 2022",
        location: "Nagpur, Maharashtra",
        color: "#f59e0b",
        status: "Completed",
        percentage: "87.67%",
        achievementBadge: "College Second Topper",
        topAchievements: [
            "College Second Topper",
            "Won multiple Gold, Silver, Bronze medals in sports",
            "Represented at Taluka, District, Vidarbha, State levels"
        ],
        modalDetails: {
            sports: [
                "Participated in competitive sports alongside academics",
                "Won multiple Gold, Silver, Bronze medals in sports",
                "Represented at Taluka, District, Vidarbha, State levels"
            ]
        }
    },
    {
        id: "ssc",
        type: "secondary",
        category: "SSC",
        institution: "St. Joseph's Convent High School",
        board: "Maharashtra State Board",
        degree: "Secondary School Certificate (SSC) — Class X",
        duration: "2009 – 2020",
        location: "Nagpur, Maharashtra",
        color: "#22c55e",
        status: "Completed",
        percentage: "89.40%",
        achievementBadge: "National Level Champion",
        topAchievements: [
            "4× National Gold Medalist in Abacus",
            "International Mathematics Olympiad Gold",
            "Completed 8 levels Abacus + 2 levels Vedic Maths"
        ],
        modalDetails: {
            abacus: {
                trophy: "Champion of Champions — National Level (2 consecutive yrs)",
                medals: "23 Medals (22 Gold, 1 Bronze) + 16 Trophies",
                highlights: [
                    "4× National Gold Medalist",
                    "Qualified 3× for International Championship",
                    "Completed 8 levels Abacus + 2 levels Vedic Maths (A++ grade)"
                ]
            },
            mathematics: [
                "International Mathematics Olympiad — Gold Medalist (3 years)",
                "Gold Medalist — Maharashtra Speed Mathematics Test",
                "UNSW Global Examination (Australia) — 3 consecutive participations"
            ],
            leadership: [
                "Red House Captain (Class 10)",
                "NCC Cadet — Lance Corporal (LCPL) rank",
                "Environmental Minister (Class 4)"
            ]
        }
    }
];
