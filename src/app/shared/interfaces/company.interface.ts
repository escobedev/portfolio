export interface Company {
    name: string,
    logo: string,
    description: string,
    industry: string,
}

export const companies: Company[] = [
    {
        name: 'YOFC PERÚ S.A.C.',
        logo: 'icons/yofc.png',
        description: 'YOFC PERÚ S.A.C. is a leading telecommunications and optical fiber solutions provider based in Peru. Specializing in the development, production, and distribution of high-quality optical fiber and cable products, YOFC PERÚ S.A.C. serves a diverse range of clients across various industries, including telecommunications, internet service providers, and infrastructure projects.',
        industry: 'Telecommunications',
    },
    {
        name: 'TELUS International',
        logo: 'icons/telus-international.png',
        description: 'TELUS International is a leading provider of digital customer experience (CX) and IT services, with a global presence and a reputation for innovation and excellence. As a subsidiary of TELUS, a Canadian telecommunications company, TELUS International leverages its extensive expertise to deliver exceptional customer service and technology solutions to clients across various industries, including technology, healthcare, financial services, and e-commerce.',
        industry: 'Technology',
    },
    {
        name: 'WOWTEL PERÚ S.A.C.',
        logo: 'icons/wowtel.png',
        description: 'WOWTEL PERÚ S.A.C. is a dynamic and innovative telecommunications company based in Peru. Specializing in delivering cutting-edge communication solutions, WOWTEL PERÚ S.A.C. is committed to enhancing connectivity and providing high-quality services to individuals, businesses, and organizations across the country.',
        industry: 'Telecommunications',
    },
];