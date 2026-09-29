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