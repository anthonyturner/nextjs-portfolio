import React from "react";
import { CgWorkAlt } from "react-icons/cg";
import { FaReact } from "react-icons/fa";
import { LuGraduationCap } from "react-icons/lu";
import type { JobCertification } from "./types";
 
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

export const projectsData = [
   {
    title: "Rivals Pulse Coach",
    description:
      "An Angular companion platform for hero learning, matchup strategy, positioning concepts, and guided practice for Marvel Rivals. Built with an AI-assisted workflow to accelerate feature planning, refactoring, and content iteration while maintaining a scalable component architecture.",
    tags: ["Angular", "TypeScript", "API Integration", "AI-Assisted Development", "Gaming", "Component Architecture"],
    imageUrl: marvelRivalsAppImg,
    thumbnailUrl: marvelRivalsAppThumb,
    github: "https://github.com/anthonyturner/marvel-rivals-coach",
    website: "https://www.rivalspulse.com/",
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
  },
  {
    title: "Agent Speak - Voice Plugin for AI Coding Agents",
    description:
      "A plugin I built that gives an AI coding agent a spoken handover: when a task finishes it says one short line naming what is done and what to do next, instead of narrating the whole response back at you. Built the speech pipeline on the ElevenLabs API with an offline Windows SAPI5 fallback, pausable playback, and a low-level keyboard hook that claims the media keys only while audio is actually playing. Prototyping this plugin is what shaped the ElevenLabs voice agent that now ships inside the Rivals Pulse app.",
    tags: ["Node.js", "ElevenLabs API", "Text-to-Speech", "Voice AI", "Windows APIs", "PowerShell", "Developer Tooling", "AI-Assisted Development"],
    imageUrl: agentSpeakImg,
    thumbnailUrl: agentSpeakImg,
    github: "https://github.com/anthonyturner/agent-speak",
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
