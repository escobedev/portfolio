import { Company, companies } from "./company.interface";
import { Badge, badges } from "./badge.interface";

export interface JobEntry {
    position: string,
    company: Company,
    location: string,
    startDate: Date,
    endDate: Date,
    hardSkills: Badge[],
    softSkills: Badge[],
    responsibilities: string[],
}

export const jobEntries: JobEntry[] = [
    {
        position: 'Project Assistant',
        company: companies.find(company => company.name === 'YOFC PERÚ S.A.C.') ?? {} as Company,
        location: 'San Isidro, Lima, Perú',
        startDate: new Date(2023, 8),
        endDate: new Date(2023, 1),
        hardSkills: badges.filter(badge => [
            'Excel',
            'Google Sheets',
            'Google Earth',
            'AppSheet',
            'CRM',
            'Fiber Optics',
            'Low Voltage Design',
            'Windows',
        ].includes(badge.name)),
        softSkills: badges.filter(badge => [
            'English',
            'Chinese',
            'Communication',
            'Collaboration',
            'Flexibility',
            'Adaptability',
            'Problem-Solving',
        ].includes(badge.name)),
        responsibilities: [
            'General support in management, supervision and coordination in PA, OSP and IT.',
        ],
    },
    {
        position: 'PA Assistant',
        company: companies.find(company => company.name === 'YOFC PERÚ S.A.C.') ?? {} as Company,
        location: 'San Isidro, Lima, Perú',
        startDate: new Date(2022, 12),
        endDate: new Date(2023, 8),
        hardSkills: badges.filter(badge => [
            'Excel',
            'Google Sheets',
            'Google Earth',
            'CRM',
            'Fiber Optics',
            'Low Voltage Design',
        ].includes(badge.name)),
        softSkills: badges.filter(badge => [
            'English',
            'Chinese',
            'Communication',
            'Collaboration',
            'Flexibility',
            'Adaptability',
        ].includes(badge.name)),
        responsibilities: [
            'Review of node energization deliverables.',
            'Low voltage network design.',
            'Monitoring the progress of the project.',
        ],
    },
    {
        position: 'OSP Assistant',
        company: companies.find(company => company.name === 'YOFC PERÚ S.A.C.') ?? {} as Company,
        location: 'San Isidro, Lima, Perú',
        startDate: new Date(2022, 9),
        endDate: new Date(2022, 11),
        hardSkills: badges.filter(badge => [
            'Excel',
            'Google Sheets',
            'CRM',
            'Fiber Optics',
        ].includes(badge.name)),
        softSkills: badges.filter(badge => [
            'English',
            'Chinese',
            'Communication',
            'Collaboration',
        ].includes(badge.name)),
        responsibilities: [
            'Logistical control of fiber optic network implementation materials for OSP and IT.',
        ],
    },
    {
        position: 'AI Community Surfer',
        company: companies.find(company => company.name === 'TELUS International') ?? {} as Company,
        location: 'Remote/Virtual',
        startDate: new Date(2023, 3),
        endDate: new Date(2023, 5),
        hardSkills: badges.filter(badge => [
            'Google Search',
            'Youtube',
            'Play Store',
        ].includes(badge.name)),
        softSkills: badges.filter(badge => [
            'English',
            'Critical Thinking',
            'Time Management',
        ].includes(badge.name)),
        responsibilities: [
            'Review online search results with the aim of improving internet search results (Google search, Play Store and YouTube).',
            'Provide feedback and analysis on content found in search engine results.',
            'Provide ratings on their relevance to the search terms used.',
        ],
    },
    {
        position: 'Personalized Internet Ads Asessor',
        company: companies.find(company => company.name === 'TELUS International') ?? {} as Company,
        location: 'Remote/Virtual',
        startDate: new Date(2023, 0),
        endDate: new Date(2023, 2),
        hardSkills: badges.filter(badge => [
            'Google Search',
            'Youtube',
            'Play Store',
        ].includes(badge.name)),
        softSkills: badges.filter(badge => [
            'English',
            'Critical Thinking',
            'Time Management',
        ].includes(badge.name)),
        responsibilities: [
            'Review online ads to improve their content, quality and design.',
            'Provide feedback and analysis on ads found in search engine results (Google Search, Play Store and YouTube).',
            'Provide ratings on their relevance to the search terms used.',
            'Review the Language used in advertisements by examining grammar, tone and cultural-relevance.',
        ],
    },
    {
        position: 'NOC Operator',
        company: companies.find(company => company.name === 'WOWTEL PERÚ S.A.C.') ?? {} as Company,
        location: 'Surco, Lima, Perú',
        startDate: new Date(2022, 0),
        endDate: new Date(2022, 6),
        hardSkills: badges.filter(badge => [
            'Excel',
            'Google Sheets',
            'Fiber Optics',
        ].includes(badge.name)),
        softSkills: badges.filter(badge => [
            'Problem-Solving',
            'Time Management',
            'Communication',
            'Collaboration',
        ].includes(badge.name)),
        responsibilities: [
            'Fiber Optic Network Monitoring and Control.',
            'ONT\'s devices and VoIP service instalation and configuration.',
        ],
    },
];