import { Component , signal } from '@angular/core';
import { ThmBadgeComponent } from '../badges/thm-badge/thm-badge.component';
import { badges } from '../../interfaces/badge.interface';
import { SkillsBoxComponent } from './skills-box/skills-box.component';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [ ThmBadgeComponent, SkillsBoxComponent ],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.css'
})
export class SkillsComponent {
  isLoaded = false;

  protected readonly boxes = signal<Box[]>([]);

  constructor() {
    setTimeout(() => {
      this.isLoaded = true;
    }, 100);
    this.loadBoxes(0);
  }

  private loadBoxes(index: number) {
    if (index < this.Boxes.length)
      this.boxes.update(oldBoxes => {
        return [...oldBoxes, this.Boxes[index]];
      });
  }
  loaded(name: string) {
    if (name) this.loadBoxes(this.boxes().length);
  }

  badges = badges;

  getBadges(list: string[]) {
    return this.badges.filter(badge => list.includes(badge.name));
  }

  languages = [
    'HTML', 'CSS', 'JavaScript', 'TypeScript', 'C', 'C++', 'C#', 'Java', 'Python', 'SQL',
    //'PHP',
    //'Ruby',
    //'Swift',
    //'Rust',
    //'Go',
    //'Scala',
    //'Kotlin',
    //'R',
  ];

  frontends = [
    //'Bootstrap',
    //'Tailwind CSS',
    //'React',
    'Angular',
    //'Vue.js',
    //'Svelte',
    //'Nuxt.js',
    //'Next.js',
  ];

  backends = [
    'Node.js',
    //'Express.js',
    //'Nginx',
    //'Apache',
    //'Tomcat',
    //'IIS',
    //'Flask',
    //'Django',
    //'FastAPI',
    //'Express',
    //'Laravel',
    //'Spring',
    //'Ruby on Rails',
    //'ASP.NET',
  ];

  databases = [
    'MySQL',
    //'PostgreSQL',
    //'MongoDB',
    'Firebase',
    //'Redis',
    //'Oracle',
    'SQLite',
  ];

  data = [
    'Excel',
    //'Tableau',
    'Power BI',
    'Google Sheets',
    'AppScript',
    'AppSheet',
    'Pandas',
    'NumPy',
    'Matplotlib',
    //'Seaborn',
    //'Scikit-Learn',
    //'TensorFlow',
    //'Keras',
    //'PyTorch',
    //'Spark',
  ];

  versionControl = [
    //'Git',
    'GitHub',
    //'GitLab',
  ];

  packageManagers = [
    //'NPM',
    //'Yarn',
    //'NuGet',
    //'Maven',
  ];

  cloud = [
    //'AWS',
    //'Azure',
    //'Google Cloud',
    //'Digital Ocean',
    //'Heroku',
    //'Alibaba Cloud',
    //'IBM Cloud',
    //'SAP Cloud',
  ];

  operatingSystems = [
    'Linux',
    'Windows',
    //'MacOS',
    'Ubuntu',
    //'Debian',
    //'Red Hat',
    //'Fedora',
    //'CentOS',
    //'Kali Linux',
    'ParrotOS',
  ];

  virtualization = [
    'VirtualBox',
    'VMware',
    //'Docker',
    //'Kubernetes',
    //'Amazon ECS',
    //'Azure Container Apps',
    //'Google Container Engine',
    //'IBM Cloud Foundry',
  ];

  cybersecurity =  [
    'Nmap',
    'Wireshark',
    //'BurpSuite',
    //'Metasploit',
    //'EternalBlue',
    //'Nessus',
    //'Grafana',
    //'Kibana',
    //'Palo Alto Networks',
    //'Sophos',
    //'Kaspersky',
    //'Fortinet',
    //'Trend Micro',
    'Cisco',
    //'Symantec',
    //'OWASP TOP 10',
    //'Cryptography',
    //'Hashing',
    //'Encryption',
    //'Digital Signature',
    //'Key Management',
    //'Network Security',
    //'Vulnerability Assessment',
  ];

  spokenLanguages = [
    'Spanish',
    'English',
    'Portuguese',
    'French',
    //'Italian',
    'German',
    //'Chinese',
  ];

  softs = [
    //'Leadership',
    //'Teamwork',
    'Problem-Solving',
    'Time Management',
    //'Communication',
    'Critical Thinking',
    'Self-Esteem',
    'Empathy',
    'Collaboration',
    'Adaptability',
    'Flexibility',
    'Creativity',
  ];

  technicalSkills = [
    { name: 'Programming Languages', badges: this.getBadges(this.languages) },
    { name: 'Front-end', badges: this.getBadges(this.frontends)},
    { name: 'Back-end', badges: this.getBadges(this.backends) },
    { name: 'Databases', badges: this.getBadges(this.databases) },
    { name: 'Data Managers', badges: this.getBadges(this.data) },
    { name: 'Version Control', badges: this.getBadges(this.versionControl) },
    { name: 'Package Managers', badges: this.getBadges(this.packageManagers) },
    { name: 'Cloud', badges: this.getBadges(this.cloud) },
    { name: 'Operating Systems', badges: this.getBadges(this.operatingSystems) },
    { name: 'Virtualization', badges: this.getBadges(this.virtualization) },
    { name: 'Cybersecurity', badges: this.getBadges(this.cybersecurity) },
  ];

  softSkills = [
    { name: 'Spoken Languages', badges: this.getBadges(this.spokenLanguages) },
    { name: 'Soft Skills', badges: this.getBadges(this.softs) },
  ];

  Boxes = [
    { name: 'Technical Skills', skills: this.technicalSkills },
    { name: 'Soft Skills', skills: this.softSkills },
  ];
}

export interface Box {
  name: string;
  skills: Skill[];
}

export interface Skill {
  name: string;
  badges: Badge[];
}

export interface Badge {
  name: string;
  image: string;
  type: string;
  level: string;
}