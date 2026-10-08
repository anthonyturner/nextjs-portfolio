import { StaticImageData } from "next/image";
import { links } from "./data";

export type SectionName = (typeof links)[number]['name']
export type useSectionInViewProps= {sectionName: SectionName;}
export type JobCertification = {
  readonly title: string;
  readonly description: string;
  readonly tags: readonly string[];
  readonly imageUrl: StaticImageData | string;
  readonly thumbnailUrl: StaticImageData | string;
  readonly website: string;
  readonly pdfUrl?: string; // Optional with '?'
};
export type LearningVideo = {
  readonly title: string;
  readonly channel: string;
  readonly youtubeId: string;
  readonly startSeconds?: number;
  readonly description: string;
  readonly tags: readonly string[];
};
export type Project = {
  readonly title: string;
  readonly description: string;
  readonly tags: readonly string[];
  readonly imageUrl?: StaticImageData | string;
  readonly thumbnailUrl?: StaticImageData | string;
  readonly github?: string;
  readonly website?: string;
  readonly repo?: string; // "owner/name" - overlaid with GitHub data when set
  readonly videoUrl?: string;
  readonly videoPosterUrl?: string;
  readonly videoCaption?: string;
  readonly readmeSummary?: readonly ReadmeBlock[];
  readonly readmeUrl?: string;
  readonly caseStudyUrl?: string;
};
export type CaseStudyListItem = { readonly lead?: string; readonly text: string };
export type CaseStudyBlock =
  | { readonly kind: "paragraph"; readonly text: string }
  | { readonly kind: "list"; readonly ordered?: boolean; readonly items: readonly CaseStudyListItem[] }
  | { readonly kind: "table"; readonly columns: readonly [string, string]; readonly rows: readonly (readonly [string, string])[] };
export type CaseStudyLink = {
  readonly label: string;
  readonly href: string;
  readonly kind: "github" | "website";
};
export type CaseStudy = {
  readonly slug: string;
  readonly title: string;
  readonly byline: string;
  readonly summary: string;
  readonly metaDescription: string;
  readonly projectName: string;
  readonly links: readonly CaseStudyLink[];
  readonly socialImage: { readonly url: string; readonly width: number; readonly height: number; readonly alt: string };
  readonly builtWith: readonly string[];
  readonly stats: readonly { readonly value: string; readonly label: string }[];
  readonly video: { readonly src: string; readonly poster: string; readonly caption: string };
  readonly sections: readonly { readonly heading: string; readonly blocks: readonly CaseStudyBlock[] }[];
  readonly timeline: string;
};
export type ReadmeBlock =
  | { readonly kind: "paragraph"; readonly text: string }
  | { readonly kind: "list"; readonly items: readonly string[] };
/**
 * Type definition for the context value provided by ActiveSectionContextProvider.
 * Contains the current active section and a function to update it.
 * @interface ActiveSectionContextType
 * @property {SectionName} activeSection - Currently active/visible section name
 * @property {React.Dispatch<React.SetStateAction<SectionName>>} setActiveSection - Function to update the active section
 */
export type ActiveSectionContextType = {
  activeSection: SectionName
  setActiveSection: React.Dispatch<React.SetStateAction<SectionName>>
  timeOfLastClick: number
  setTimeOfLastClick: (time: number) => void;
}