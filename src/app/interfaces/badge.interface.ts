export interface Badge {
    name: string;
    image: string;
    type: string;
}

export const badges: Badge[] = [
    /* Languages */
    {
        name: 'HTML',
        image: 'assets/html.svg',
        type: 'language',
    },
    {
        name: 'CSS',
        image: 'assets/css.svg',
        type: 'language',
    },
    {
        name: 'JavaScript',
        image: 'assets/js.png',
        type: 'language',
    },
    {
        name: 'TypeScript',
        image: 'assets/ts.svg',
        type: 'language',
    },
    {
        name: 'C',
        image: 'assets/c.png',
        type: 'language',
    },
    {
        name: 'C++',
        image: 'assets/cpp.svg',
        type: 'language',
    },
    {
        name: 'C#',
        image: 'assets/csharp.svg',
        type: 'language',
    },
    {
        name: 'Java',
        image: 'assets/java.png',
        type: 'language',
    },
    {
        name: 'Python',
        image: 'assets/python.png',
        type: 'language',
    },
    {
        name: 'SQL',
        image: 'assets/sql.png',
        type: 'language',
    },
    {
        name: 'PHP',
        image: 'assets/php.png',
        type: 'language',
    },
    {
        name: 'Ruby',
        image: 'assets/ruby.png',
        type: 'language',
    },
    {
        name: 'Swift',
        image: 'assets/swift.png',
        type: 'language',
    },
    {
        name: 'Rust',
        image: 'assets/rust.png',
        type: 'language',
    },
    {
        name: 'Go',
        image: 'assets/go.png',
        type: 'language',
    },
    {
        name: 'Scala',
        image: 'assets/scala.png',
        type: 'language',
    },
    {
        name: 'Kotlin',
        image: 'assets/kotlin.png',
        type: 'language',
    },
    {
        name: 'R',
        image: 'assets/r.png',
        type: 'language',
    },

    /* Front-End Tools */
    {
        name: 'Bootstrap',
        image: 'https://getbootstrap.com/docs/5.0/assets/brand/bootstrap-logo.svg',
        type: 'frontend',
    },
    {
        name: 'Tailwind CSS',
        image: 'https://tailwindcss.com/img/logos/workflow-logo.svg',
        type: 'frontend',
    },
    {
        name: 'React',
        image: 'https://reactjs.org/logo-og.png',
        type: 'frontend',
    },
    {
        name: 'Angular',
        image: 'assets/angular.ico',
        type: 'frontend',
    },
    {
        name: 'Vue.js',
        image: 'https://vuejs.org/images/logo.png',
        type: 'frontend',
    },
    {
        name: 'Svelte',
        image: 'https://svelte.dev/img/svelte-logo.png',
        type: 'frontend',
    },
    {
        name: 'Nuxt.js',
        image: 'https://img.nuxtjs.org/icon.png',
        type: 'frontend',
    },
    {
        name: 'Next.js',
        image: 'https://nextjs.org/static/twitter-cards/card.png',
        type: 'frontend',
    },

    /* Back-End Frameworks */
    {
        name: 'Node.js',
        image: 'https://nodejs.org/static/images/logo.svg',
        type: 'backend',
    },
    {
        name: 'Express.js',
        image: 'https://expressjs.com/images/express.png',
        type: 'backend',
    },
    {
        name: 'Nginx',
        image: 'assets/nginx.svg',
        type: 'backend',
    },
    {
        name: 'Apache',
        image: 'assets/apache.svg',
        type: 'backend',
    },
    {
        name: 'Tomcat',
        image: 'assets/tomcat.svg',
        type: 'backend',
    },
    {
        name: 'IIS',
        image: 'assets/iis.svg',
        type: 'backend',
    },
    {
        name: 'Flask',
        image: 'assets/flask.svg',
        type: 'backend',
    },
    {
        name: 'Django',
        image: 'assets/django.svg',
        type: 'backend',
    },
    {
        name: 'FastAPI',
        image: 'assets/fastapi.svg',
        type: 'backend',
    },
    {
        name: 'Express',
        image: 'assets/express.svg',
        type: 'backend',
    },
    {
        name: 'Laravel',
        image: 'assets/laravel.svg',
        type: 'backend',
    },
    {
        name: 'Spring',
        image: 'assets/spring.svg',
        type: 'backend',
    },
    {
        name: 'Ruby on Rails',
        image: 'assets/rails.svg',
        type: 'backend',
    },
    {
        name: 'ASP.NET',
        image: 'assets/aspnet.svg',
        type: 'backend',
    },

    /* Databases */
    {
        name: 'MySQL',
        image: 'https://www.mysql.com/common/logos/logo-mysql-170x115.png',
        type: 'database',
    },
    {
        name: 'PostgreSQL',
        image: 'assets/postgresql.svg',
        type: 'database',
    },
    {
        name: 'MongoDB',
        image: 'assets/mongodb.png',
        type: 'database',
    },
    {
        name: 'Firebase',
        image: 'assets/firebase.png',
        type: 'database',
    },
    {
        name: 'Redis',
        image: 'assets/redis.svg',
        type: 'database',
    },
    {
        name: 'Oracle',
        image: 'assets/oracle.svg',
        type: 'database',
    },
    {
        name: 'SQLite',
        image: 'assets/sqlite.svg',
        type: 'database',
    },

    /* Data */
    {
        name: 'Excel',
        image: 'assets/excel.svg',
        type: 'data'
    },
    {
        name: 'Tableau',
        image: 'assets/tableau.svg',
        type: 'data'
    },
    {
        name: 'Power BI',
        image: 'assets/powerbi.svg',
        type: 'data'
    },
    {
        name: 'Google Sheets',
        image: 'assets/google-sheets.svg',
        type: 'data'
    },
    {
        name: 'AppScript',
        image: 'assets/app-script.svg',
        type: 'data'
    },
    {
        name: 'AppSheet',
        image: 'assets/app-sheet.svg',
        type: 'data'
    },
    {
        name: 'Pandas',
        image: 'assets/pandas.svg',
        type: 'data'
    },
    {
        name: 'NumPy',
        image: 'assets/numpy.svg',
        type: 'data'
    },
    {
        name: 'Matplotlib',
        image: 'assets/matplotlib.svg',
        type: 'data'
    },
    {
        name: 'Seaborn',
        image: 'assets/seaborn.svg',
        type: 'data'
    },
    {
        name: 'Scikit-Learn',
        image: 'assets/scikit-learn.svg',
        type: 'data'
    },
    {
        name: 'TensorFlow',
        image: 'assets/tensorflow.svg',
        type: 'data'
    },
    {
        name: 'Keras',
        image: 'assets/keras.svg',
        type: 'data'
    },
    {
        name: 'PyTorch',
        image: 'assets/pytorch.svg',
        type: 'data'
    },
    {
        name: 'Spark',
        image: 'assets/spark.svg',
        type: 'data'
    },

    /* Version Control */
    {
        name: 'Git',
        image: 'https://git-scm.com/images/logos/downloads/Git-Icon-1788C.png',
        type: 'version-control',
    },
    {
        name: 'GitHub',
        image: 'assets/github.svg',
        type: 'version-control',
    },
    {
        name: 'GitLab',
        image: 'assets/gitlab.svg',
        type: 'version-control',
    },

    /* Package Managers */
    {
        name: 'NPM',
        image: 'https://static-production.npmjs.com/b0f1a8318363185cc2ea6a40ac23eeb2.png',
        type: 'package-manager',
    },
    {
        name: 'Yarn',
        image: 'https://classic.yarnpkg.com/favicon.ico',
        type: 'package-manager',
    },
    {
        name: 'NuGet',
        image: 'assets/nuget.svg',
        type: 'package-manager',
    },
    {
        name: 'Maven',
        image: 'assets/maven.svg',
        type: 'package-manager',
    },

    /* Cloud */
    {
        name: 'AWS',
        image: 'https://aws.amazon.com/favicon.ico',
        type: 'cloud',
    },
    {
        name: 'Azure',
        image: 'assets/azure.png',
        type: 'cloud',
    },
    {
        name: 'Google Cloud',
        image: 'assets/google-cloud.svg',
        type: 'cloud',
    },
    {
        name: 'Digital Ocean',
        image: 'assets/digital-ocean.svg',
        type: 'cloud',
    },
    {
        name: 'Heroku',
        image: 'assets/heroku.svg',
        type: 'cloud',
    },
    {
        name: 'Alibaba Cloud',
        image: 'assets/alibaba-cloud.svg',
        type: 'cloud',
    },
    {
        name: 'IBM Cloud',
        image: 'assets/ibm-cloud.svg',
        type: 'cloud',
    },
    {
        name: 'SAP Cloud',
        image: 'assets/sap-cloud.svg',
        type: 'cloud',
    },

    /* Operating Systems */
    {
        name: 'Linux',
        image: 'assets/linux.svg',
        type: 'operating-system',
    },
    {
        name: 'Windows',
        image: 'assets/windows.svg',
        type: 'operating-system',
    },
    {
        name: 'MacOS',
        image: 'assets/macos.svg',
        type: 'operating-system',
    },
    {
        name: 'Ubuntu',
        image: 'assets/ubuntu.svg',
        type: 'operating-system',
    },
    {
        name: 'Debian',
        image: 'assets/debian.svg',
        type: 'operating-system',
    },
    {
        name: 'Red Hat',
        image: 'assets/redhat.svg',
        type: 'operating-system'
    },
    {
        name: 'Fedora',
        image: 'assets/fedora.svg',
        type: 'operating-system'
    },
    {
        name: 'CentOS',
        image: 'assets/centos.svg',
        type: 'operating-system'
    },
    {
        name: 'Kali Linux',
        image: 'assets/kali-linux.svg',
        type: 'operating-system',
    },
    {
        name: 'ParrotOS',
        image: 'assets/parrotos.svg',
        type: 'operating-system',
    },

    /* VMs */
    {
        name: 'VirtualBox',
        image: 'assets/virtualbox.svg',
        type: 'vm-platform',
    },
    {
        name: 'VMware',
        image: 'assets/vmware.svg',
        type: 'vm-platform',
    },

    /* Containers */
    {
        name: 'Docker',
        image: 'https://www.docker.com/favicon.ico',
        type: 'container-platform',
    },
    {
        name: 'Kubernetes',
        image: 'assets/kubernetes.svg',
        type: 'container-platform',
    },
    {
        name: 'Amazon ECS',
        image: 'assets/amazon-ecs.svg',
        type: 'container-platform',
    },
    {
        name: 'Azure Container Apps',
        image: 'assets/azure-container-apps.svg',
        type: 'container-platform',
    },
    {
        name: 'Google Container Engine',
        image: 'assets/google-container-engine.svg',
        type: 'container-platform',
    },
    {
        name: 'IBM Cloud Foundry',
        image: 'assets/ibm-cloud-foundry.svg',
        type: 'container-platform',
    },

    /* Cybersecurity */
    {
        name: 'Nmap',
        image: 'assets/nmap.svg',
        type: 'cybersecurity',
    },
    {
        name: 'Wireshark',
        image: 'assets/wireshark.svg',
        type: 'cybersecurity'
    },
    {
        name: 'BurpSuite',
        image: 'assets/burp-suite.svg',
        type: 'cybersecurity',
    },
    {
        name: 'Metasploit',
        image: 'assets/metasploit.svg',
        type: 'cybersecurity',
    },
    {
        name: 'EternalBlue',
        image: 'assets/eternalblue.svg',
        type: 'cybersecurity'
    },
    {
        name: 'Nessus',
        image: 'assets/nessus.svg',
        type: 'cybersecurity',
    },
    {
        name: 'Grafana',
        image: 'assets/grafana.svg',
        type: 'cybersecurity',
    },
    {
        name: 'Kibana',
        image: 'assets/kibana.svg',
        type: 'cybersecurity',
    },
    {
        name: 'Palo Alto Networks',
        image: 'assets/palo-alto-networks.svg',
        type: 'cybersecurity',
    },
    {
        name: 'Sophos',
        image: 'assets/sophos.svg',
        type: 'cybersecurity',
    },
    {
        name: 'Kaspersky',
        image: 'assets/kaspersky.svg',
        type: 'cybersecurity',
    },
    {
        name: 'Fortinet',
        image: 'assets/fortinet.svg',
        type: 'cybersecurity',
    },
    {
        name: 'Trend Micro',
        image: 'assets/trend-micro.svg',
        type: 'cybersecurity',
    },
    {
        name: 'Cisco',
        image: 'assets/cisco.svg',
        type: 'cybersecurity',
    },
    {
        name: 'Symantec',
        image: 'assets/symantec.svg',
        type: 'cybersecurity',
    },
    {
        name: 'OWASP TOP 10',
        image: 'assets/owasp-top-10.svg',
        type: 'cybersecurity',
    },
    {
        name: 'Cryptography',
        image: 'assets/cryptography.svg',
        type: 'cybersecurity',
    },
    {
        name: 'Hashing',
        image: 'assets/hashing.svg',
        type: 'cybersecurity',
    },
    {
        name: 'Encryption',
        image: 'assets/encryption.svg',
        type: 'cybersecurity',
    },
    {
        name: 'Digital Signature',
        image: 'assets/digital-signature.svg',
        type: 'cybersecurity',
    },
    {
        name: 'Key Management',
        image: 'assets/key-management.svg',
        type: 'cybersecurity',
    },
    {
        name: 'Network Security',
        image: 'assets/network-security.svg',
        type: 'cybersecurity',
    },
    {
        name: 'Vulnerability Assessment',
        image: 'assets/vulnerability-assessment.svg',
        type: 'cybersecurity',
    },

    /* Spoken Languages */
    {
        name: 'Spanish',
        image: 'assets/spain.svg',
        type: 'spoken-language',
    },
    {
        name: 'English',
        image: 'assets/united-kingdom.svg',
        type: 'spoken-language',
    },
    {
        name: 'Portuguese',
        image: 'assets/portugal.svg',
        type: 'spoken-language',
    },
    {
        name: 'French',
        image: 'assets/france.svg',
        type: 'spoken-language',
    },
    {
        name: 'Italian',
        image: 'assets/italy.svg',
        type: 'spoken-language',
    },
    {
        name: 'German',
        image: 'assets/germany.svg',
        type: 'spoken-language',
    },
    {
        name: 'Chinese',
        image: 'assets/china.svg',
        type: 'spoken-language',
    },

    /* Soft Skills */
    {
        name: 'Leadership',
        image: 'assets/leadership.svg',
        type: 'soft-skill',
    },
    {
        name: 'Teamwork',
        image: 'assets/teamwork.svg',
        type: 'soft-skill',
    },
    {
        name: 'Problem-Solving',
        image: 'assets/problem-solving.svg',
        type: 'soft-skill',
    },
    {
        name: 'Time Management',
        image: 'assets/time-management.svg',
        type: 'soft-skill',
    },
    {
        name: 'Communication',
        image: 'assets/communication.svg',
        type: 'soft-skill',
    },
    {
        name: 'Critical Thinking',
        image: 'assets/critical-thinking.svg',
        type: 'soft-skill',
    },
    {
        name: 'Self-Esteem',
        image: 'assets/self-esteem.svg',
        type: 'soft-skill',
    },
    {
        name: 'Empathy',
        image: 'assets/empathy.svg',
        type: 'soft-skill',
    },
    {
        name: 'Collaboration',
        image: 'assets/collaboration.svg',
        type: 'soft-skill',
    },
    {
        name: 'Adaptability',
        image: 'assets/adaptability.svg',
        type: 'soft-skill',
    },
    {
        name: 'Flexibility',
        image: 'assets/flexibility.svg',
        type: 'soft-skill',
    },
    {
        name: 'Creativity',
        image: 'assets/creativity.svg',
        type: 'soft-skill',
    },
];