import React from "react";
import { CgWorkAlt } from "react-icons/cg";
import { FaReact } from "react-icons/fa";
import { LuGraduationCap } from "react-icons/lu";
import type { JobCertification } from "./types";
 
// Project images - using Next.js public folder pattern
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
      "Modernizing legacy Angular applications to Angular 19 and working with .NET Framework systems. Working with existing APIs using ASP.NET Core, RxJS, and TypeScript; managing and implementing efficient DTO/entity mapping. Contributing to CI/CD pipeline integration in Azure DevOps for automated testing and deployments. Participating in daily standups in an agile environment.",
    icon: React.createElement(FaReact),
    image: corpcommentImg,
    date: "Apr 2025 - Jun 2025",
  },
  {
    title: "Cloud Software Engineer - Constellation Software Engineering",
    location: "Remote",
    description:
      "Migrated, managed, and built secure cloud applications using Python/Django for federal Navy projects. Managed reporting systems with .NET Core and SQL Server, handling data management and report generation. Worked on OAuth authentication systems. Participated in Agile development with code reviews and automated deployments.",
    icon: React.createElement(FaReact),
    image: corpcommentImg,
    date: "Sept 2023 - Aug 2024",
  },
  {
    title: ".NET Software Developer - Ryan Specialties",
    location: "Rockhill, NY",
    description:
      "Worked on legacy system modernization, migrating VB.NET applications to C#/.NET 4, improving maintainability and execution speed by 60%. Created bulk email applications for automating email processes and modernized a Weather API application from legacy VB code, reducing manual processes and operational errors.",
    icon: React.createElement(CgWorkAlt),
    image: corpcommentImg,
    date: "Jan 2023 - Aug 2023",
  },
  {
    title: ".NET Full-Stack Developer - InfoEd Global",
    location: "Albany, NY",
    description:
      "Developed and maintained enterprise solutions for government and educational sectors using full-stack .NET technologies (C#, ASP.NET MVC, WebForms, legacy ASP), JavaScript, and jQuery. Enhanced user interfaces with Telerik component libraries and implemented robust data processing through XML/XSD integrations and REST API development.",
    icon: React.createElement(FaReact),
    image: corpcommentImg,
    date: "Nov 2018 - Nov 2022",
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
    title: "Marvel Rivals Coach",
    description:
      "Marvel Rivals Coach is an Angular companion site for learning heroes, matchups, positioning concepts, media guides, and practice habits for Marvel Rivals. The app is built as a coaching reference instead of a static wiki clone: it combines hero data, ability details, glossary terms, video resources, guide-based lessons, and guided learning paths into one searchable site.",
    tags: ["Angular", "TypeScript", "CSS3", "API Integration", "Data Visualization", "Gaming", "Angular Services"],
    imageUrl: marvelRivalsAppImg,
    thumbnailUrl: marvelRivalsAppThumb,
    github: "https://github.com/anthonyturner/marvel-rivals-coach",
    website: "https://marvel-rivals-coach-six.vercel.app/",
  },
  {
    title: "Rivals Pulse - Marvel Rivals Overwolf App (available soon on appstore)",
    description:
      "A powerful Overwolf application for Marvel Rivals that provides real-time in-game insights and statistics. Built with Angular and TypeScript to deliver seamless integration with the game client. Features live player tracking, match analytics, character performance metrics, and interactive overlays for competitive gaming. Applies SOLID principles through modular component architecture, dependency injection, and reusable services for data management. Demonstrates advanced Angular development for desktop gaming applications.",
    tags: ["Angular", "TypeScript", "Overwolf API", "Gaming", "Real-time Analytics", "Desktop Application", "RxJS", "SOLID Principles"],
    imageUrl: rivalsPulseImg,
    thumbnailUrl: rivalsPulseThumb,
    website: "https://www.overwolf.com/appstore",
  }, 
  {
    title: "Personal Portfolio Website (alternative)",
    description:
      "This portfolio exemplifies these principles: built entirely by me using Angular 19 for a component-driven SPA architecture, TypeScript for type safety, and SCSS for modular styling. I applied SOLID patterns throughout—extracting components by responsibility, using services for data management, configuring behavior through dependency injection, and organizing shared models in a models folder for reusability. The application demonstrates advanced Angular routing, RxJS reactive patterns, Angular Signals for fine-grained reactivity, computed properties for derived state management, API integration, accessibility best practices, and automated CI/CD deployment on Vercel—all while maintaining clean, refactorable code.",
    tags: ["Angular", "TypeScript", "SCSS", "RxJS", "Angular Signals", "Vercel", "SOLID Principles"],
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
  "HTML",
  "CSS",
  "JavaScript",
  "TypeScript",
  "TypeScript Generics", // ✅ Added TypeScript Generics
  "React",
  "Next.js",
  "Node.js",
  "Git",
  "Tailwind",
  "GraphQL",
  "Express",
  "SQL Server",
  "PostgreSQL",
  "Python",
  "Django",
  "Framer Motion",
  "C#",
  "C# Generics", // ✅ Added C# Generics
  ".NET 8",
  "ASP.NET Core",
  "Legacy ASP.NET",
  "OAuth2",
  "JWT",
  "PHP",
  "WordPress",
  "RxJS",
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
