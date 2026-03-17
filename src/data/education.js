export const educationData = [
    {
        id: "btech",
        type: "primary",
        institution: "St. Vincent Pallotti College of Engineering & Technology",
        board: "Bachelor of Technology (B.Tech.)",
        degree: "Computer Science Engineering (Data Science)",
        duration: "Aug 2022 – Jul 2026",
        location: "Nagpur, Maharashtra, India",
        color: "#ff4d5a",
        status: "Pursuing",
        badge: "🎓 Currently Pursuing",
        cgpa: {
            value: "9.60",
            outOf: "10.00",
            description: "Student of The Year Batch (2022-26)",
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
        institution: "Yashoda Higher Secondary School & Junior College",
        board: "Maharashtra State Board",
        degree: "Higher Secondary Certificate (HSC) — Class XII",
        duration: "Apr 2020 – Mar 2022",
        location: "Nagpur, Maharashtra, India",
        color: "#f59e0b",
        status: "Completed",
        percentage: "87.67%",
        achievementBadge: "College Second Topper",
        topAchievements: [
            "Secured 87.67% in Class 12 with strong academic consistency",
            "Maintained high academic performance with disciplined and focused approach",
            "Won multiple gold, silver and bronze medals and represented up to state level in sports"
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
        institution: "St. Joseph's Convent Primary & High School",
        board: "Maharashtra State Board",
        degree: "Secondary School Certificate (SSC) — Class X",
        duration: "Jun 2019 – Mar 2020",
        location: "Nagpur, Maharashtra, India",
        color: "#22c55e",
        status: "Completed",
        percentage: "89.40%",
        achievementBadge: "Student of The Year Batch (2009-20)",
        topAchievements: [
            "Secured 89.40% in Class 10 with strong academic foundation",
            "23 medals including 22 gold with 16 trophies across academics and sports",
            "4× National Gold Medalist and International Abacus Championship qualifier with global recognition"
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
