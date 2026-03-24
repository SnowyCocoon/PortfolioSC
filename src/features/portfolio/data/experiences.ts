import type { Experience } from "../types";

export const EXPERIENCES: Experience[] = [
  {
    id: "3r-games",
    companyName: "3R GAMES S.A.",
    companyWebsite: "https://3r.games/",
    logo: "/images/companies/3rgames_logo.jpg",
    positions: [
      {
        title: "Unity Developer",
        employmentType: "Freelance",
        startDate: "11.2025",
        endDate: "Present",
        description: [
          "Working on the new game: Punch Lunch: Foodtruck Fighter",
          "Programming Players and Enemies Behavior trees",
          "Programming and Designing Combat system",
          "Improving overall experience with game from gameplay point of view",
        ],
        skills: ["Unity", "C#", "AI", "Combat Design"],
      },
    ],
    location: "Remote",
  },
  {
    id: "snowy-cocoon",
    companyName: "SnowyCocoon (Personal Brand)",
    companyWebsite: "https://snowycocoon.com/",
    logo: "/images/companies/snowycocoon_logo.png",
    positions: [
      {
        title: "Technical Artist, Game Developer",
        employmentType: "Self-employed",
        startDate: "01.2025",
        endDate: "Present",
        description: [
          "Creating materials and textures for sale on the Unity Asset Store and other marketplaces (FAB/Itch.io)",
          "Creating Substance Designer Tools for procedural materials creation and exporting them easily",
          "Working as a freelance developer for different clients, fixing code, building new features and checking the condition of the project",
          "Working on my own personal projects in my free time, including a new game project and a new asset packs",
        ],
        skills: ["Substance Designer", "Blender", "Aseprite", "UEFN", "Verse", "Affinity"],
      },
    ],
    location: "Poznan, Remote",
  },
  {
    id: "manic-pixel",
    companyName: "Manic Pixel Dream Games",
    companyWebsite: "https://manicpixeldream.games/",
    logo: "/images/companies/mpdgames_logo.jpg",
    positions: [
      {
        title: "Lead Godot Developer",
        employmentType: "Contract",
        startDate: "01.2025",
        endDate: "10.2025",
        description: [
          "Working as a Godot Developer for the upcoming Manic Pixel Dream Games game",
          "Creating integration systems between large .json files and Godot",
          "Shaders creation",
          "Managing and designing all technical aspects of the game",
        ],
        skills: ["Godot", "GDScript", "Shaders", "Game Architecture", "Technical Design"],
      },
    ],
    location: "Poznan, Remote",
  },
  {
    id: "hikari",
    companyName: "Hikari",
    companyWebsite: "https://hikari.pl/",
    logo: "/images/companies/hikari_logo.jpg",
    positions: [
      {
        title: "Event Organizer, Data Analyst, Creative department lead",
        employmentType: "Volunteer",
        startDate: "02.2023",
        endDate: "Present",
        description: [
          "Organizing the biggest anime convention in Poznań, and one of the biggest in Poland, with over 5000 attendees each year",
          "Analyzing data to improve event planning and attendee experience",
          "Leading the creative department to develop engaging content and marketing strategies, like advergames",
        ],
        skills: ["Game Development", "Event Organization", "Data Analysis", "Creative Direction", "Python", ],
      },
    ],
    location: "Poznan",
  },
  {
    id: "knoocker",
    companyName: "Knoocker/Knowla",
    companyWebsite: "https://knowla.eu/en/",
    logo: "/images/companies/knoocker_logo.jpg",
    positions: [
      {
        title: "Unity Developer",
        employmentType: "Contract",
        startDate: "09.2021",
        endDate: "12.2024",
        description: [
          'Creating games for the "Knoocker Box"',
          "Implementing Voice/Speech recognition in Unity Games",
          "Developing AI solutions to create a game suggestion system + Game Analytics",
          "Game and level design",
          "Unity/C# Programming",
          "2D Animations (including Skeletal Animations, Inverse Kinematic)",
        ],
        skills: ["Unity", "C#","UI", "Voice Recognition", "2D Skeletal Animation"],
      },
    ],
    location: "Poznan, Poland",
  },
  {
    id: "microtaur",
    companyName: "Sidestream Games (Microtaur/Intermission Games)",
    companyWebsite: "https://sidestream.games/",
    logo: "/images/companies/microtaur_logo.png",
    positions: [
      {
        title: "Co-founder, Godot Developer, Game Designer",
        employmentType: "Self-employed",
        startDate: "04.2020",
        endDate: "12.2024",
        description: [
          "Creating a marketing game for InStreamly and PepsiCo",
          "Creating our own projects and MVPs",
          "Creating MVPs and Demos for big clients from the marketing and streaming industry",
          "Working in both Godot and Unity Engines",
          "Working with Twitch Extensions and Twitch API",
        ],
        skills: ["Godot", "Unity", "Game Design", "Twitch API"],
      },
    ],
    location: "Krakow, Poland",
  },
  {
    id: "put-vr",
    companyName: "Poznan University of Economics And Business",
    companyWebsite: "https://ue.poznan.pl/",
    logo: "/images/companies/uepoznan_logo.jpg",
    positions: [
      {
        title: "VR Unity Developer",
        employmentType: "Internship",
        startDate: "09.2020",
        endDate: "12.2020",
        description: [
          'Internship at the "VR Lab" at the University',
          'Worked on a project for "Enea Operator", a Polish power industry company',
          "3D Art and programming fixes",
          "Testing the VR Software and Excel worksheets",
          "Managing the semantic web",
          "Presenting the product to the client",
        ],
        skills: ["Unity", "VR", "3D Art"],
      },
    ],
    location: "Poznan, Poland",
  },
];
