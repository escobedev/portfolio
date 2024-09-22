export interface SoftSkills {
    name: string;
    image: string;
    skills: (string | SoftSkillTag)[];
}

export interface SoftSkillTag {
    name: string;
    description: string;
    path: string;
    level: number;
}