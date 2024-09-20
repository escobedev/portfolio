export interface Badge {
    name: string;
    image: string;
    type: string;
    level: string;
    link?: string;
}

export const badges: Badge[] = [
    /* Languages */
    {
        name: 'HTML',
        image: 'assets/html.svg',
        type: 'language',
        level: 'Advanced',
        link: 'html',
    },
    {
        name: 'CSS',
        image: 'assets/css.svg',
        type: 'language',
        level: 'Advanced',
        link: 'css',
    },
    {
        name: 'Sass',
        image: 'assets/sass.svg',
        type: 'language',
        level: 'Basic',
        link: 'sass',
    },
    {
        name: 'JavaScript',
        image: 'assets/js.png',
        type: 'language',
        level: 'Advanced',
        link: 'js',
    },
    {
        name: 'TypeScript',
        image: 'assets/ts.svg',
        type: 'language',
        level: 'Intermediate',
        link: 'ts',
    },
    {
        name: 'C',
        image: 'assets/c.png',
        type: 'language',
        level: 'Intermediate',
        link: 'c',
    },
    {
        name: 'C++',
        image: 'assets/cpp.svg',
        type: 'language',
        level: 'Intermediate',
        link: 'cpp',
    },
    {
        name: 'C#',
        image: 'assets/csharp.svg',
        type: 'language',
        level: 'Basic',
        link: 'csharp',
    },
    {
        name: 'Java',
        image: 'assets/java.png',
        type: 'language',
        level: 'Basic',
        link: 'java',
    },
    {
        name: 'Python',
        image: 'assets/python.png',
        type: 'language',
        level: 'Intermediate',
        link: 'python',
    },
    {
        name: 'SQL',
        image: 'assets/sql.png',
        type: 'language',
        level: 'Intermediate',
        link: 'sql',
    },
    {
        name: 'PHP',
        image: 'assets/php.png',
        type: 'language',
        level: '',
    },
    {
        name: 'Ruby',
        image: 'assets/ruby.png',
        type: 'language',
        level: '',
    },
    {
        name: 'Swift',
        image: 'assets/swift.png',
        type: 'language',
        level: '',
    },
    {
        name: 'Rust',
        image: 'assets/rust.png',
        type: 'language',
        level: '',
    },
    {
        name: 'Go',
        image: 'assets/go.png',
        type: 'language',
        level: '',
    },
    {
        name: 'Scala',
        image: 'assets/scala.png',
        type: 'language',
        level: '',
    },
    {
        name: 'Kotlin',
        image: 'assets/kotlin.png',
        type: 'language',
        level: '',
    },
    {
        name: 'R',
        image: 'assets/r.png',
        type: 'language',
        level: '',
    },

    /* Front-End Tools */
    {
        name: 'Bootstrap',
        image: 'https://getbootstrap.com/docs/5.0/assets/brand/bootstrap-logo.svg',
        type: 'frontend',
        level: '',
    },
    {
        name: 'Tailwind CSS',
        image: 'https://tailwindcss.com/img/logos/workflow-logo.svg',
        type: 'frontend',
        level: '',
    },
    {
        name: 'React',
        image: 'https://reactjs.org/logo-og.png',
        type: 'frontend',
        level: '',
    },
    {
        name: 'Angular',
        image: 'assets/angular.ico',
        type: 'frontend',
        level: 'Intermediate',
        link: 'angular',
    },
    {
        name: 'Angular Material',
        image: 'assets/angular_material.svg',
        type: 'frontend',
        level: 'Intermediate',
    },
    {
        name: 'Vue.js',
        image: 'https://vuejs.org/images/logo.png',
        type: 'frontend',
        level: '',
    },
    {
        name: 'Svelte',
        image: 'https://svelte.dev/img/svelte-logo.png',
        type: 'frontend',
        level: '',
    },
    {
        name: 'Nuxt.js',
        image: 'https://img.nuxtjs.org/icon.png',
        type: 'frontend',
        level: '',
    },
    {
        name: 'Next.js',
        image: 'https://nextjs.org/static/twitter-cards/card.png',
        type: 'frontend',
        level: '',
    },

    /* Back-End Frameworks */
    {
        name: 'Node.js',
        image: 'assets/nodejs.svg',
        type: 'backend',
        level: 'Basic',
        link: 'nodejs',
    },
    {
        name: 'Express',
        image: 'https://expressjs.com/images/express.png',
        type: 'backend',
        level: '',
    },
    {
        name: 'Nginx',
        image: 'assets/nginx.svg',
        type: 'backend',
        level: '',
    },
    {
        name: 'Apache',
        image: 'assets/apache.svg',
        type: 'backend',
        level: '',
    },
    {
        name: 'Tomcat',
        image: 'assets/tomcat.svg',
        type: 'backend',
        level: '',
    },
    {
        name: 'IIS',
        image: 'assets/iis.svg',
        type: 'backend',
        level: '',
    },
    {
        name: 'Flask',
        image: 'assets/flask.svg',
        type: 'backend',
        level: '',
    },
    {
        name: 'Django',
        image: 'assets/django.svg',
        type: 'backend',
        level: '',
    },
    {
        name: 'FastAPI',
        image: 'assets/fastapi.svg',
        type: 'backend',
        level: '',
    },
    {
        name: 'Laravel',
        image: 'assets/laravel.svg',
        type: 'backend',
        level: '',
    },
    {
        name: 'Spring Boot',
        image: 'assets/spring.svg',
        type: 'backend',
        level: '',
    },
    {
        name: 'Ruby on Rails',
        image: 'assets/rails.svg',
        type: 'backend',
        level: '',
    },
    {
        name: 'ASP.NET',
        image: 'assets/aspnet.svg',
        type: 'backend',
        level: '',
    },

    /* Databases */
    {
        name: 'MySQL',
        image: 'https://www.mysql.com/common/logos/logo-mysql-170x115.png',
        type: 'database',
        level: 'Intermediate',
    },
    {
        name: 'PostgreSQL',
        image: 'assets/postgresql.svg',
        type: 'database',
        level: '',
    },
    {
        name: 'MongoDB',
        image: 'assets/mongodb.png',
        type: 'database',
        level: '',
    },
    {
        name: 'Firebase',
        image: 'assets/firebase.png',
        type: 'database',
        level: 'Basic',
    },
    {
        name: 'Redis',
        image: 'assets/redis.svg',
        type: 'database',
        level: '',
    },
    {
        name: 'Oracle',
        image: 'assets/oracle.svg',
        type: 'database',
        level: '',
    },
    {
        name: 'SQLite',
        image: 'assets/sqlite.svg',
        type: 'database',
        level: 'Intermediate',
    },

    /* Data */
    {
        name: 'Excel',
        image: 'assets/excel.svg',
        type: 'data',
        level: 'Advanced',
    },
    {
        name: 'Tableau',
        image: 'assets/tableau.svg',
        type: 'data',
        level: '',
    },
    {
        name: 'Power BI',
        image: 'assets/power-bi.svg',
        type: 'data',
        level: 'Basic',
    },
    {
        name: 'Google Sheets',
        image: 'assets/google-sheets.svg',
        type: 'data',
        level: 'Advanced',
    },
    {
        name: 'Apps Script',
        image: 'assets/apps-script.svg',
        type: 'data',
        level: '',
    },
    {
        name: 'AppSheet',
        image: 'assets/appsheet.svg',
        type: 'data',
        level: 'Intermediate',
    },
    {
        name: 'Pandas',
        image: 'assets/pandas.svg',
        type: 'data',
        level: 'Intermediate',
    },
    {
        name: 'NumPy',
        image: 'assets/numpy.svg',
        type: 'data',
        level: 'Advanced',
    },
    {
        name: 'Matplotlib',
        image: 'assets/matplotlib.svg',
        type: 'data',
        level: 'Advanced',
    },
    {
        name: 'Seaborn',
        image: 'assets/seaborn.svg',
        type: 'data',
        level: '',
    },
    {
        name: 'Scikit-Learn',
        image: 'assets/scikit-learn.svg',
        type: 'data',
        level: '',
    },
    {
        name: 'TensorFlow',
        image: 'assets/tensorflow.svg',
        type: 'data',
        level: '',
    },
    {
        name: 'Keras',
        image: 'assets/keras.svg',
        type: 'data',
        level: '',
    },
    {
        name: 'PyTorch',
        image: 'assets/pytorch.svg',
        type: 'data',
        level: '',
    },
    {
        name: 'Spark',
        image: 'assets/spark.svg',
        type: 'data',
        level: '',
    },

    /* Version Control */
    {
        name: 'Git',
        image: 'https://git-scm.com/images/logos/downloads/Git-Icon-1788C.png',
        type: 'version-control',
        level: '',
    },
    {
        name: 'GitHub',
        image: 'assets/github.svg',
        type: 'version-control',
        level: 'Basic',
    },
    {
        name: 'GitLab',
        image: 'assets/gitlab.svg',
        type: 'version-control',
        level: '',
    },

    /* Package Managers */
    {
        name: 'NPM',
        image: 'https://static-production.npmjs.com/b0f1a8318363185cc2ea6a40ac23eeb2.png',
        type: 'package-manager',
        level: '',
    },
    {
        name: 'Yarn',
        image: 'https://classic.yarnpkg.com/favicon.ico',
        type: 'package-manager',
        level: '',
    },
    {
        name: 'NuGet',
        image: 'assets/nuget.svg',
        type: 'package-manager',
        level: '',
    },
    {
        name: 'Maven',
        image: 'assets/maven.svg',
        type: 'package-manager',
        level: '',
    },

    /* Cloud */
    {
        name: 'AWS',
        image: 'https://aws.amazon.com/favicon.ico',
        type: 'cloud',
        level: '',
    },
    {
        name: 'Azure',
        image: 'assets/azure.png',
        type: 'cloud',
        level: '',
    },
    {
        name: 'Google Cloud',
        image: 'assets/google-cloud.svg',
        type: 'cloud',
        level: '',
    },
    {
        name: 'Digital Ocean',
        image: 'assets/digital-ocean.svg',
        type: 'cloud',
        level: '',
    },
    {
        name: 'Heroku',
        image: 'assets/heroku.svg',
        type: 'cloud',
        level: '',
    },
    {
        name: 'Alibaba Cloud',
        image: 'assets/alibaba-cloud.svg',
        type: 'cloud',
        level: '',
    },
    {
        name: 'IBM Cloud',
        image: 'assets/ibm-cloud.svg',
        type: 'cloud',
        level: '',
    },
    {
        name: 'SAP Cloud',
        image: 'assets/sap-cloud.svg',
        type: 'cloud',
        level: '',
    },

    /* Operating Systems */
    {
        name: 'Linux',
        image: 'assets/linux.png',
        type: 'operating-system',
        level: 'Basic',
    },
    {
        name: 'Windows',
        image: 'assets/windows.svg',
        type: 'operating-system',
        level: 'Basic',
    },
    {
        name: 'MacOS',
        image: 'assets/macos.svg',
        type: 'operating-system',
        level: '',
    },
    {
        name: 'Ubuntu',
        image: 'assets/ubuntu.svg',
        type: 'operating-system',
        level: 'Basic',
    },
    {
        name: 'Debian',
        image: 'assets/debian.svg',
        type: 'operating-system',
        level: '',
    },
    {
        name: 'Red Hat',
        image: 'assets/redhat.svg',
        type: 'operating-system',
        level: '',
    },
    {
        name: 'Fedora',
        image: 'assets/fedora.svg',
        type: 'operating-system',
        level: '',
    },
    {
        name: 'CentOS',
        image: 'assets/centos.svg',
        type: 'operating-system',
        level: '',
    },
    {
        name: 'Kali Linux',
        image: 'assets/kali-linux.svg',
        type: 'operating-system',
        level: '',
    },
    {
        name: 'ParrotOS',
        image: 'https://www.parrotsec.org/favicon.png',
        type: 'operating-system',
        level: 'Basic',
    },

    /* VMs */
    {
        name: 'VirtualBox',
        image: 'assets/virtualbox.png',
        type: 'virtualization',
        level: 'Intermediate',
    },
    {
        name: 'VMware',
        image: 'assets/vmware.svg',
        type: 'virtualization',
        level: 'Basic',
    },

    /* Containers */
    {
        name: 'Docker',
        image: 'https://www.docker.com/favicon.ico',
        type: 'virtualization',
        level: '',
    },
    {
        name: 'Kubernetes',
        image: 'assets/kubernetes.svg',
        type: 'virtualization',
        level: '',
    },
    {
        name: 'Amazon ECS',
        image: 'assets/amazon-ecs.svg',
        type: 'virtualization',
        level: '',
    },
    {
        name: 'Azure Container Apps',
        image: 'assets/azure-container-apps.svg',
        type: 'virtualization',
        level: '',
    },
    {
        name: 'Google Container Engine',
        image: 'assets/google-container-engine.svg',
        type: 'virtualization',
        level: '',
    },
    {
        name: 'IBM Cloud Foundry',
        image: 'assets/ibm-cloud-foundry.svg',
        type: 'virtualization',
        level: '',
    },

    /* Cybersecurity */
    {
        name: 'Nmap',
        image: 'assets/nmap.png',
        type: 'cybersecurity',
        level: 'Intermediate',
    },
    {
        name: 'Wireshark',
        image: 'https://www.wireshark.org/favicon.ico',
        type: 'cybersecurity',
        level: 'Intermediate',
    },
    {
        name: 'BurpSuite',
        image: 'assets/burp-suite.svg',
        type: 'cybersecurity',
        level: '',
    },
    {
        name: 'Metasploit',
        image: 'assets/metasploit.svg',
        type: 'cybersecurity',
        level: '',
    },
    {
        name: 'EternalBlue',
        image: 'assets/eternalblue.svg',
        type: 'cybersecurity',
        level: '',
    },
    {
        name: 'Nessus',
        image: 'assets/nessus.svg',
        type: 'cybersecurity',
        level: '',
    },
    {
        name: 'Grafana',
        image: 'assets/grafana.svg',
        type: 'cybersecurity',
        level: '',
    },
    {
        name: 'Kibana',
        image: 'assets/kibana.svg',
        type: 'cybersecurity',
        level: '',
    },
    {
        name: 'Palo Alto Networks',
        image: 'assets/palo-alto-networks.svg',
        type: 'cybersecurity',
        level: '',
    },
    {
        name: 'Sophos',
        image: 'assets/sophos.svg',
        type: 'cybersecurity',
        level: '',
    },
    {
        name: 'Kaspersky',
        image: 'assets/kaspersky.svg',
        type: 'cybersecurity',
        level: '',
    },
    {
        name: 'Fortinet',
        image: 'assets/fortinet.svg',
        type: 'cybersecurity',
        level: '',
    },
    {
        name: 'Trend Micro',
        image: 'assets/trend-micro.svg',
        type: 'cybersecurity',
        level: '',
    },
    {
        name: 'Cisco',
        image: 'assets/cisco.svg',
        type: 'cybersecurity',
        level: 'Basic',
    },
    {
        name: 'Symantec',
        image: 'assets/symantec.svg',
        type: 'cybersecurity',
        level: '',
    },
    {
        name: 'OWASP TOP 10',
        image: 'assets/owasp-top-10.svg',
        type: 'cybersecurity',
        level: '',
    },
    {
        name: 'Cryptography',
        image: 'assets/cryptography.svg',
        type: 'cybersecurity',
        level: '',
    },
    {
        name: 'Hashing',
        image: 'assets/hashing.svg',
        type: 'cybersecurity',
        level: '',
    },
    {
        name: 'Encryption',
        image: 'assets/encryption.svg',
        type: 'cybersecurity',
        level: '',
    },
    {
        name: 'Digital Signature',
        image: 'assets/digital-signature.svg',
        type: 'cybersecurity',
        level: '',
    },
    {
        name: 'Key Management',
        image: 'assets/key-management.svg',
        type: 'cybersecurity',
        level: '',
    },
    {
        name: 'Network Security',
        image: 'assets/network-security.svg',
        type: 'cybersecurity',
        level: '',
    },
    {
        name: 'Vulnerability Assessment',
        image: 'assets/vulnerability-assessment.svg',
        type: 'cybersecurity',
        level: '',
    },

    /* Spoken Languages */
    {
        name: 'Spanish',
        image: 'assets/peru.png',
        type: 'spoken-language',
        level: 'Native',
    },
    {
        name: 'English',
        image: 'assets/english.png',
        type: 'spoken-language',
        level: 'B2',
    },
    {
        name: 'Portuguese',
        image: 'assets/brasil.png',
        type: 'spoken-language',
        level: 'A2',
    },
    {
        name: 'French',
        image: 'assets/french.png',
        type: 'spoken-language',
        level: 'A1',
    },
    {
        name: 'Italian',
        image: 'assets/italian.png',
        type: 'spoken-language',
        level: '',
    },
    {
        name: 'German',
        image: 'assets/german.png',
        type: 'spoken-language',
        level: 'A1',
    },
    {
        name: 'Chinese',
        image: 'assets/chinese.png',
        type: 'spoken-language',
        level: '',
    },

    /* Soft Skills */
    {
        name: 'Leadership',
        image: 'assets/leadership.png',
        type: 'soft-skill',
        level: '',
    },
    {
        name: 'Teamwork',
        image: 'assets/teamwork.png',
        type: 'soft-skill',
        level: '',
    },
    {
        name: 'Problem-Solving',
        image: 'assets/problem-solving.png',
        type: 'soft-skill',
        level: '4',
    },
    {
        name: 'Time Management',
        image: 'assets/time-management.png',
        type: 'soft-skill',
        level: '3',
    },
    {
        name: 'Communication',
        image: 'assets/communication.png',
        type: 'soft-skill',
        level: '',
    },
    {
        name: 'Critical Thinking',
        image: 'assets/critical-thinking.png',
        type: 'soft-skill',
        level: '4',
    },
    {
        name: 'Self-Esteem',
        image: 'assets/self-esteem.png',
        type: 'soft-skill',
        level: '5',
    },
    {
        name: 'Empathy',
        image: 'assets/empathy.png',
        type: 'soft-skill',
        level: '4',
    },
    {
        name: 'Collaboration',
        image: 'assets/collaboration.png',
        type: 'soft-skill',
        level: '4',
    },
    {
        name: 'Adaptability',
        image: 'assets/adaptability.png',
        type: 'soft-skill',
        level: '5',
    },
    {
        name: 'Flexibility',
        image: 'assets/flexibility.png',
        type: 'soft-skill',
        level: '5',
    },
    {
        name: 'Creativity',
        image: 'assets/creativity.png',
        type: 'soft-skill',
        level: '5',
    },

    /* Others */
    {
        name: 'Google Earth',
        image: 'assets/google-earth.svg',
        type: 'other',
        level: 'Intermediate',
    },
    {
        name: 'CRM',
        image: 'assets/crm.png',
        type: 'other',
        level: '',
    },
    {
        name: 'Fiber Optics',
        image: 'assets/optical-fiber.png',
        type: 'other',
        level: '',
    },
    {
        name: 'Low Voltage Design',
        image: 'assets/electric-pole.png',
        type: 'other',
        level: '',
    },
    {
        name: 'Google Search',
        image: 'assets/google.png',
        type: 'other',
        level: '',
    },
    {
        name: 'Youtube',
        image: 'assets/youtube.png',
        type: 'other',
        level: '',
    },
    {
        name: 'Play Store',
        image: 'assets/play-store.svg',
        type: 'other',
        level: '',
    },
    
];