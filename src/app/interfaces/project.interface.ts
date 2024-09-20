import { Badge, badges } from "./badge.interface";

export interface Project {
    name: string;
    details: string[];
    technologies: Badge[];
    link: string;
    github: string;
    icon: string;
}

export const web_projects: Project[] = [
    {
        name: 'Portfolio Website',
        details: [
            'Designed and developed a modern portfolio website to showcase skills and projects.',
            'Implemented responsive design principles and SEO best practices for enhanced visibility.',
            'Received positive feedback from peers and potential clients on user experience and design.',
        ],
        technologies: badges.filter(badge => [
            'Angular',
            'Angular Material',
            'TypeScript',
            'HTML',
            'CSS',
            'Sass',
            'Firebase',
        ].includes(badge.name)),
        link: 'https://escobedev.com',
        github: 'https://github.com/escobedev/portfolio',
        icon: 'web',
    },
];

export const mobile_projects: Project[] = [
];

export const desktop_projects: Project[] = [
];

export const multiplatform_projects: Project[] = [
];

export const data_analytics_projects: Project[] = [
];

export const cyber_security_projects: Project[] = [
];

export const blockchain_projects: Project[] = [
];

export const game_dev_projects: Project[] = [
];

export const projects = [...web_projects, ...mobile_projects, ...desktop_projects, ...multiplatform_projects, ...data_analytics_projects, ...cyber_security_projects, ...blockchain_projects, ...game_dev_projects];
