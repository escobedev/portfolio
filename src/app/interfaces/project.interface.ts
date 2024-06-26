import { Badge, badges } from "./badge.interface";

export interface Project {
    name: string;
    details: string[];
    technologies: Badge[];
    link: string;
    github: string;
}

export const projects: Project[] = [
    {
        name: 'Portfolio Website',
        details: [
            'Designed and developed a modern portfolio website to showcase skills and projects.',
            'Implemented responsive design principles and SEO best practices for enhanced visibility.',
            'Received positive feedback from peers and potential clients on user experience and design.',
        ],
        technologies: badges.filter(badge => [
            'Angular',
            'TypeScript',
            'HTML',
            'CSS',
            'Firebase',
        ].includes(badge.name)),
        link: 'https://brunoescobedoa.web.app',
        github: 'https://github.com/CallistoScope/portfolio',
    },
]