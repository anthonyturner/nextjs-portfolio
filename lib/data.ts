import React from "react";
import { CgWorkAlt } from "react-icons/cg";
import { FaReact } from "react-icons/fa";
import { LuGraduationCap } from "react-icons/lu";
import type { CaseStudy, JobCertification } from "./types";
 
// Project images - using Next.js public folder pattern
import agentSpeakImg from "@/public/images/agent-speak.svg";
import angularMasteryThumb from "@/public/images/certifications/angular-mastery-thumb.png";
import angularMasteryImg from "@/public/images/certifications/angular-mastery.png";
import mosThumb from "@/public/images/certifications/mos-thumb.svg";
import mosImg from "@/public/images/certifications/mos.svg";
import solidThumb from "@/public/images/certifications/solid-thumb.png";
import solidImg from "@/public/images/certifications/solid.png";
import marvelRivalsAppThumb from "@/public/images/marvel-rivals-site-thumb.png";
import marvelRivalsAppImg from "@/public/images/marvel-rivals-site.png";
import modernStackImg from "@/public/images/modern-stack-solutions.png";
import corpcommentImg from "@/public/images/navy-project-main.jpg";
import portfolioImg from "@/public/images/portfolio-website.png";
import reactMovieDatabaseAppImg from "@/public/images/react-movie-database.png";
import rivalsPulseVoiceDemoPoster from "@/public/images/rivals-pulse-voice-demo-poster.jpg";
import rivalsPulseThumb from "@/public/images/rivals-pulse-thumb.jpg";
import rivalsPulseImg from "@/public/images/rivals-pulse.png";

export const links = [
  {
    name: "Home",
    hash: "#home",
  },
  {
    name: "About",
    hash: "#about",
  },
  {
    name: "Projects",
    hash: "#projects",
  },
  {
    name: "Skills",
    hash: "#skills",
  },
  {
    name: "Certifications",
    hash: "#certifications",
  },
  {
    name: "Experience",
    hash: "#experience",
  },
  {
    name: "Contact",
    hash: "#contact",
  },
] as const;

export const experiencesData = [
  {
    title: "Applications Developer (Contract) - AppTech",
    location: "Norwalk, CT (Hybrid)",
    description:
      "Modernized Angular and .NET Framework applications to Angular 19 and .NET Core. Developed scalable ASP.NET Core APIs in C#, implemented reactive Angular features with RxJS and Signals, and integrated Azure DevOps CI/CD pipelines for automated delivery.",
    icon: React.createElement(FaReact),
    image: corpcommentImg,
    date: "Apr 2025 - Jun 2025",
  },
  {
    title: "Cloud Software Engineer - Constellation Software Engineering",
    location: "Remote",
    description:
      "Led architecture and modernization support for U.S. Navy reporting systems using .NET, SQL Server, and Azure. Delivered a public-facing Navy JAG platform with Django, Python, and Wagtail, while improving deployment reliability and database performance.",
    icon: React.createElement(FaReact),
    image: corpcommentImg,
    date: "Sep 2023 - Aug 2024",
  },
  {
    title: ".NET Software Developer - Ryan Specialties",
    location: "Rockhill, NY",
    description:
      "Modernized legacy .NET applications, improved maintainability and scalability, and collaborated with cross-functional teams to deliver robust enterprise software under aggressive timelines.",
    icon: React.createElement(CgWorkAlt),
    image: corpcommentImg,
    date: "Jan 2023 - Aug 2023",
  },
  {
    title: ".NET Software Developer - InfoEd Global",
    location: "Albany, NY",
    description:
      "Developed enterprise software with .NET Framework, Angular, JavaScript, SQL Server, Oracle, XML/XSD, and REST APIs. Optimized performance through refactoring and code reviews, and delivered integration features for enterprise data exchange.",
    icon: React.createElement(FaReact),
    image: corpcommentImg,
    date: "Nov 2018 - Nov 2022",
  },
  {
    title: "WordPress / PHP Developer - REV Design",
    location: "Remote",
    description:
      "Built and maintained custom WordPress websites and PHP applications, improving performance, security, and overall user experience for client-facing platforms.",
    icon: React.createElement(CgWorkAlt),
    image: corpcommentImg,
    date: "Dec 2017 - Nov 2018",
  },
  {
    title: ".NET Software Developer Intern - Precision Care Software",
    location: "New York",
    description:
      "Developed ASP.NET applications and SQL Server solutions, built responsive interfaces, and contributed to testing and code review workflows in a team environment.",
    icon: React.createElement(CgWorkAlt),
    image: corpcommentImg,
    date: "Apr 2015 - Apr 2016",
  },
  {
    title: "Bachelor's Degree in Computer Science",
    location: "SUNY New Paltz, NY",
    description:
      "Graduated with comprehensive foundation in algorithms, data structures, software engineering, database design, web applications, and design.",
    icon: React.createElement(LuGraduationCap),
    image: corpcommentImg,
    date: "2018",
  },
  {
    title: "Associate's Degree in Computer Science",
    location: "Ulster County Community College, NY",
    description:
      "Earned foundational knowledge in programming, computer systems, software development principles, web applications, and design.",
    icon: React.createElement(LuGraduationCap),
    image: corpcommentImg,
    date: "2014",
  },
] as const;

// GitHub account whose public repos are listed after the curated projects below.
export const githubProjectsOwner = "anthonyturner";

// Fallback project content. Entries with a `repo` are overlaid at request time
// with that repo's `.github/portfolio.json` and GitHub metadata (see lib/github-projects.ts).
export const projectsData = [
  {
    title: "Observatory",
    description:
      "An Angular dashboard that charts open pull requests, projects and coding agents as an animated space scene.",
    tags: ["Angular", "TypeScript", "Three.js", "WebGL", "Node.js", "Vercel", "AI-Assisted Development"],
    github: "https://github.com/anthonyturner/observatory",
    website: "https://observatory-nu-ten.vercel.app",
    repo: "anthonyturner/observatory",
    caseStudyUrl: "/case-studies/observatory",
  },
   {
    title: "Rivals Pulse Coach",
    description:
      "An Angular companion platform for hero learning, matchup strategy, positioning concepts, and guided practice for Marvel Rivals. Built with an AI-assisted workflow to accelerate feature planning, refactoring, and content iteration while maintaining a scalable component architecture.",
    tags: ["Angular", "TypeScript", "API Integration", "AI-Assisted Development", "Gaming", "Component Architecture"],
    imageUrl: marvelRivalsAppImg,
    thumbnailUrl: marvelRivalsAppThumb,
    github: "https://github.com/anthonyturner/rivals-pulse-web",
    website: "https://www.rivalspulse.com/",
    repo: "anthonyturner/rivals-pulse-web",
  },
  {
    title: "Rivals Pulse - Marvel Rivals Overwolf App (available soon on appstore)",
    description:
      "Designed and developed an Overwolf companion application with Angular and TypeScript for real-time gameplay insights, hero recommendations, and performance analytics. Integrated a hands-free voice assistant built on the ElevenLabs conversational AI and text-to-speech APIs, so the app can be asked for matchup, positioning, and hero questions mid-match and answer out loud without the player ever leaving the game. Applied SOLID architecture, reusable services, and AI-assisted development workflows to accelerate delivery and maintain code quality.",
    tags: ["Angular", "TypeScript", "Overwolf API", "ElevenLabs API", "Conversational AI", "Voice Assistant", "Real-time Analytics", "RxJS", "SOLID Principles", "AI-Assisted Development"],
    imageUrl: rivalsPulseImg,
    thumbnailUrl: rivalsPulseThumb,
    videoUrl: "/videos/rivals-pulse-voice-demo.mp4",
    videoPosterUrl: rivalsPulseVoiceDemoPoster.src,
    videoCaption:
      "Unedited match capture of the voice assistant in use. Turn sound on - the assistant is heard rather than shown, so the spoken questions and its replies are the demo.",
    website: "https://www.overwolf.com/appstore",
    repo: "anthonyturner/rivals_pulse",
  },
  {
    title: "Agent Speak - Voice Plugin for AI Coding Agents",
    description:
      "A plugin I built that gives an AI coding agent a spoken handover: when a task finishes it says one short line naming what is done and what to do next, instead of narrating the whole response back at you. Built the speech pipeline on the ElevenLabs API with an offline Windows SAPI5 fallback, pausable playback, and a low-level keyboard hook that claims the media keys only while audio is actually playing. Prototyping this plugin is what shaped the ElevenLabs voice agent that now ships inside the Rivals Pulse app.",
    tags: ["Node.js", "ElevenLabs API", "Text-to-Speech", "Voice AI", "Windows APIs", "PowerShell", "Developer Tooling", "AI-Assisted Development"],
    imageUrl: agentSpeakImg,
    thumbnailUrl: agentSpeakImg,
    github: "https://github.com/anthonyturner/agent-speak",
    repo: "anthonyturner/agent-speak",
  }, 
  {
    title: "U.S. Navy Application Modernization",
    description:
      "Stabilized and modernized a mission-critical Navy application by resolving legacy issues, improving reliability, and delivering improvements under aggressive schedules. Combined .NET, SQL Server, and cloud deployment practices with AI-assisted engineering for faster investigation and execution.",
    tags: [".NET", "SQL Server", "Azure", "Modernization", "Federal"],
    imageUrl: corpcommentImg,
    thumbnailUrl: corpcommentImg,
  },
  {
    title: "Personal Portfolio Website (alternative)",
    description:
      "A production-focused portfolio experience built with Angular and TypeScript to showcase architecture, engineering depth, and AI-assisted delivery practices. Uses modular components, strict typing, and clean abstractions to keep the codebase maintainable while enabling rapid feature evolution.",
    tags: ["Angular", "TypeScript", "SCSS", "RxJS", "Angular Signals", "Vercel"],
    imageUrl: portfolioImg,
    thumbnailUrl: portfolioImg,
    github: "https://github.com/anthonybturner/software-dev-portfolio",
    website: "https://anthonybturner.vercel.app/",
  },
  {
    title: "Modern Stack Solutions",
    description:
      "A comprehensive business website showcasing modern web development services and solutions. Built with Angular and TypeScript for dynamic functionality and responsive design. Features service portfolios, client testimonials, project showcases, and contact integration. Demonstrates full-stack development capabilities with modern Angular architecture and component-based design.",
    tags: ["Angular", "TypeScript", "CSS3", "Business Website", "Professional Services", "Component Architecture"],
    imageUrl: modernStackImg,
    thumbnailUrl: modernStackImg,
    github: "https://github.com/anthonybturner/modern-stack-solutions",
    website: "https://modern-stack-solutions.vercel.app/",
  },
  {
    title: "React Movie Database",
    description:
      "A comprehensive movie discovery application built with React and integrated with The Movie Database (TMDb) API. Features include movie search, detailed information display, ratings, trailers, and user favorites. Implements responsive design, dynamic routing, and state management for seamless user experience.",
    tags: ["React", "JavaScript", "TMDb API", "CSS3", "REST APIs", "Responsive Design"],
    imageUrl: reactMovieDatabaseAppImg,
    thumbnailUrl: reactMovieDatabaseAppImg,
    github: "https://github.com/anthonybturner/ReactMovieDatabase",
    website: "https://react-movie-database-nine.vercel.app",
  }
] as const;

export const skillsData = [
  "AI-Assisted Software Engineering",
  "AI Prompt Engineering",
  "GitHub Copilot",
  "OpenAI Codex",
  "ElevenLabs Voice AI",
  "Conversational AI Agents",
  "Text-to-Speech Integration",
  "CI/CD",
  "Azure",
  "Docker",
  "HTML",
  "CSS",
  "JavaScript",
  "TypeScript",
  "TypeScript Generics",
  "React",
  "Next.js",
  "Node.js",
  "Git",
  "GitHub",
  "Tailwind",
  "GraphQL",
  "Express",
  "SQL Server",
  "PostgreSQL",
  "Oracle",
  "Python",
  "Django",
  "Wagtail",
  "Framer Motion",
  "C#",
  "C# Generics",
  ".NET 8",
  ".NET Framework",
  "ASP.NET Core",
  "Legacy ASP.NET",
  "OAuth2",
  "JWT",
  "PHP",
  "WordPress",
  "RxJS",
  "Angular Signals",
  "Azure DevOps",
  "Angular",
  "Azure SQL",
] as const;

export const certificationsData:JobCertification[] = [
   {
    title: "Angular Mastery Certification",
    description:
      "Successfully completed the course Angular - The Complete Guide (2025 Edition) on 01/10/2026 as taught by Maximilian Schwarzmüller on Udemy.",
    tags: ["Angular", "TypeScript", "RxJS", "SOLID Principles"],
    imageUrl: angularMasteryImg,
    thumbnailUrl: angularMasteryThumb,
    website: "https://www.udemy.com/course/the-complete-guide-to-angular-2",
    pdfUrl: "/documents/certifications/angular-mastery.pdf",
  },
    {
    title: "SOLID (Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, Dependency Inversion Principles)",
    description:
      "Successfully completed the course SOLID Principles: Introducing Software Architecture & Design on 01/06/2026 as taught by George Sonora on Udemy.",
    tags: ["SOLID", "Java"],
    imageUrl: solidImg,
    thumbnailUrl: solidThumb,
    website: "https://www.udemy.com/course/solid-design",
    pdfUrl: "/documents/certifications/solid.pdf",
  },
  {
    title: "Microsoft Office Specialist",
    description:
      "Successfully completed the Microsoft Office Specialist certification to demonstrate proficiency in Microsoft Office applications including Word, Excel, Access, PowerPoint, and Outlook.",
    tags: ["Microsoft Office", "Excel", "Access", "Word", "PowerPoint"],
    imageUrl: mosImg,
    thumbnailUrl: mosThumb,
    website: "https://learn.microsoft.com/en-us/certifications/microsoft-office-specialist-master-certification/",
  },
] as const;

// Figures come from the Observatory and pr-starmap repos (gh and git); keep them as written.
// pr-starmap is private and archived, so it is named but never linked.
export const observatoryCaseStudy: CaseStudy = {
  title: "Migrating an AI-built prototype into a production Angular app, with AI",
  byline: "Anthony Turner · September 2026",
  projectName: "Observatory",
  repoUrl: "https://github.com/anthonyturner/observatory",
  liveUrl: "https://observatory-nu-ten.vercel.app",
  summary:
    "I built a developer dashboard, pr-starmap, fast with AI coding agents. In three days it worked, but it had become three single-file HTML pages of 2,300 to 7,100 lines each: hard to test, hard to change, and impossible to hand to anyone. Rather than keep patching it, I planned a rebuild in Angular and directed AI agents (Claude Code) through it under an engineering process I set up: every change started as a GitHub issue, went through a pull request with tests and a written review, and was merged only once verified. In five days the new app, Observatory, replaced every feature of the old one. It ended with 105 merged pull requests, about 1,500 automated tests, and a clean shutdown of the original.",
  builtWith: [
    "Angular 22",
    "Strict TypeScript",
    "Angular CDK",
    "Three.js (WebGL)",
    "Node.js API",
    "Vitest",
    "Vercel",
    "Upstash Redis",
    "GitHub OAuth",
    "Claude Code",
  ],
  stats: [
    { value: "16,288", label: "lines of single-file HTML replaced" },
    { value: "105", label: "merged pull requests" },
    { value: "~1,500", label: "automated tests" },
    { value: "5 days", label: "to replace every feature of the old app" },
  ],
  video: {
    src: "https://observatory-nu-ten.vercel.app/portfolio/observatory-demo.mp4",
    poster: "https://observatory-nu-ten.vercel.app/portfolio/observatory-poster.jpg",
    caption:
      "A silent walkthrough of the live preview: sound and motion toggles, the star trails, the news feed, the orrery and one project's star map views.",
  },
  sections: [
    {
      heading: "The problem",
      blocks: [
        {
          kind: "paragraph",
          text: "pr-starmap ranks a developer's open pull requests \"blocked first\" and draws them as an animated star map, with a 3D \"orrery\" of every project and a voice assistant on the home page. Built quickly with AI, it grew into:",
        },
        {
          kind: "list",
          items: [
            {
              lead: "16,288 lines in three HTML files:",
              text: "7,091 (star map), 6,860 (home) and 2,337 (orrery), with the logic, styles and 3D code all in one file each.",
            },
            {
              lead: "No build, no types and no unit tests",
              text: "on the pages. Every change risked breaking something unrelated.",
            },
            {
              lead: "A delivery model that capped it:",
              text: "a Claude Code plugin that published snapshots as static pages, which couldn't reach GitHub live.",
            },
          ],
        },
        {
          kind: "paragraph",
          text: "It proved the idea. It was not something I would show an employer or keep extending.",
        },
      ],
    },
    {
      heading: "The decision: rebuild alongside, don't rewrite in place",
      blocks: [
        { kind: "paragraph", text: "I chose a strangler-style migration:" },
        {
          kind: "list",
          items: [
            {
              lead: "Keep the old app running.",
              text: "pr-starmap kept working while Observatory replaced it piece by piece.",
            },
            { lead: "Small pieces.", text: "Each step was sized at 30 to 90 minutes of work, one pull request each." },
            {
              lead: "A fixed order.",
              text: "Theme and shell first, then the home page's panels, the 3D core, live data, the orrery, the star map, and finally the voice assistant.",
            },
            {
              lead: "A hard independence rule.",
              text: "Observatory could never depend on pr-starmap at runtime, so the old one could be deleted at the end.",
            },
          ],
        },
      ],
    },
    {
      heading: "How I directed the AI: process over prompts",
      blocks: [
        {
          kind: "paragraph",
          text: "The work was done by AI agents. The speed and quality came from the rules I set around them.",
        },
        {
          kind: "list",
          ordered: true,
          items: [
            {
              lead: "Every change was tracked.",
              text: "Each change started as a GitHub issue with acceptance criteria, got its own branch and pull request, and was merged with a merge commit. That's 102 issues and 105 pull requests, all readable in the repo.",
            },
            {
              lead: "Written standards the agents follow.",
              text: "An AGENTS.md routes each agent to the rules it needs: SOLID and Clean Code, comment style, how to verify a change, and six Architecture Decision Records. One ADR keeps the AI assistant local-only for security; another records which tasks may run on the machine at all.",
            },
            {
              lead: "An honest review on every pull request.",
              text: "Each PR description has a Verified section and a Not verified section, and each gets a posted review before merge. When the evidence was weak, the PR said so.",
            },
            {
              lead: "Parallel agents without collisions.",
              text: "Several AI sessions worked on the repo at once, each in its own git worktree, so no two ever shared a checkout.",
            },
            {
              lead: "Faithful ports.",
              text: "For the visuals I required function-for-function ports of the original drawing code, including matching random seeds, so the new app looks the same rather than \"inspired by\".",
            },
          ],
        },
      ],
    },
    {
      heading: "How the work was verified",
      blocks: [
        {
          kind: "list",
          items: [
            {
              lead: "Automated tests:",
              text: "936 front-end tests (Vitest) and 583 API tests (Node's test runner), across 197 and 102 test files. Lint, strict type-checking and formatting ran on every change.",
            },
            {
              lead: "Real screenshots:",
              text: "for visual work the agent ran the app and captured headless-Chrome screenshots, including WebGL through a software renderer. Two real bugs surfaced this way: an overlay hidden behind the 3D canvas, and a toolbar running off narrow screens.",
            },
            {
              lead: "A final gap audit:",
              text: "before calling the migration done, a separate AI agent compared both codebases feature by feature. It found about 45 features fully ported and a short list missing. It also showed that several of my own progress notes were wrong: some things I'd noted as missing were already built. Lesson: verify against the code, not the notes.",
            },
          ],
        },
      ],
    },
    {
      heading: "What got built",
      blocks: [
        {
          kind: "table",
          columns: ["Area", "In Observatory"],
          rows: [
            [
              "Architecture",
              "104 Angular components, about 34,500 lines of app TypeScript, plus a 13,000-line Node API of its own",
            ],
            [
              "Live data",
              "GitHub through gh locally, or a server token when hosted. Refresh forces a fresh read instead of a cached one.",
            ],
            [
              "3D",
              "A WebGL core and a Three.js orrery with custom shaders (lit planets, ring shadows, a ray-marched corona, bloom). Both load lazily, and a 2D fallback takes over if WebGL fails.",
            ],
            [
              "Voice assistant",
              "Speech-to-text (ElevenLabs Scribe, with in-browser Whisper as fallback) and replies read aloud. The assistant runs on Claude Code and can look up projects, pull requests and usage.",
            ],
            [
              "Hosting",
              "Deployed on Vercel with GitHub sign-in, an allowlist, a read-only public preview, and Upstash Redis for stored data",
            ],
            ["Terminal", "A command-line review queue sharing triage with the web app"],
          ],
        },
      ],
    },
    {
      heading: "Retiring the old app",
      blocks: [
        { kind: "paragraph", text: "Finishing a migration means turning the old thing off cleanly:" },
        {
          kind: "list",
          items: [
            {
              lead: "Data carried over:",
              text: "usage history and 128 recorded agent handoffs were imported into Observatory.",
            },
            {
              lead: "Unhooked:",
              text: "the old plugin was uninstalled and its status-line hook removed, after checking that Observatory's replacements were already live.",
            },
            {
              lead: "Archived, not deleted:",
              text: "the old repository was archived on GitHub, read-only with its history kept.",
            },
            {
              lead: "Nothing lost locally:",
              text: "before the local copies were removed, every folder was checked for uncommitted work. Two unsaved files and two old experiments were saved first.",
            },
          ],
        },
      ],
    },
    {
      heading: "Mistakes, and what I took from them",
      blocks: [
        {
          kind: "list",
          items: [
            {
              lead: "A PR merged with a formatting warning.",
              text: "I fixed it in a follow-up and corrected the original PR's record instead of hiding it.",
            },
            {
              lead: "Documentation drift.",
              text: "The README still described the assistant's old AI provider after it had changed. The fix was a deliberate \"is the README still true?\" pass.",
            },
            {
              lead: "Notes aren't the source of truth.",
              text: "The gap audit showed several progress notes were wrong. Checking against the code is what made the final list trustworthy.",
            },
          ],
        },
      ],
    },
    {
      heading: "What this shows",
      blocks: [
        {
          kind: "list",
          items: [
            {
              lead: "Directing AI as an engineer.",
              text: "The agents wrote the code; I set the architecture, the order of work, the standards and the definition of done, and they held across 105 pull requests.",
            },
            {
              lead: "Modernising legacy code safely.",
              text: "Old and new ran side by side, the move happened in small verified steps, the data was migrated, and the old system was shut down cleanly.",
            },
            {
              lead: "Frontend depth:",
              text: "Angular with strict TypeScript, component architecture, WebGL and Three.js, accessibility (keyboard paths, screen-reader labels, reduced-motion support), and responsive layout.",
            },
            { lead: "Honest delivery:", text: "every change says what was verified and what wasn't." },
          ],
        },
      ],
    },
  ],
  timeline:
    "pr-starmap started 22 Sep 2026. Observatory's first PR merged 25 Sep, feature parity arrived 29 Sep, and pr-starmap was archived 29 Sep.",
};
