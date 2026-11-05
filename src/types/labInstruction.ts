export type LabInstructionTarget = 'sql' | 'kotlin' | 'both';

export interface LabInstructionScript {
  id: string;
  title: string;
  language: 'sql' | 'kotlin';
  code: string;
}

export interface LabInstructionLink {
  id: string;
  label: string;
  url: string;
}

export interface LabInstructionPost {
  id: string;
  labType: LabInstructionTarget;
  title: string;
  subtitle?: string;
  summary: string;
  content: string;
  images?: string[];
  scripts?: LabInstructionScript[];
  links?: LabInstructionLink[];
  authorName: string;
  createdAt: number;
  updatedAt?: number;
  pinned?: boolean;
}

