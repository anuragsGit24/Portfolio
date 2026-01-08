import {
  Code,
  Paintbrush,
  Server,
  Database,
  Cloud,
  Terminal,
  BrainCircuit,
  type LucideIcon,
} from 'lucide-react';

export const PROJECTS = [
  {
    id: 'project-1',
    title: 'Distributed Task Scheduler',
    description: 'High-performance distributed task scheduling system built with Java & Spring Boot, supporting 10K+ concurrent tasks with Redis-backed queue management and PostgreSQL persistence.',
    imagePlaceholder: 'project-1',
    tags: ['Backend', 'Distributed Systems'],
    technologies: ['Java', 'Spring Boot', 'Redis', 'PostgreSQL', 'Docker'],
    metrics: { performance: '10K+ tasks/min', accuracy: '99.9% uptime' },
    live_url: '#',
    github_url: '#',
  },
  {
    id: 'project-2',
    title: 'AI-Powered Code Review System',
    description: 'Machine learning system that analyzes code quality, detects potential bugs, and suggests optimizations. Built with Spring Boot backend and React frontend, processing 100K+ lines daily.',
    imagePlaceholder: 'project-2',
    tags: ['AI/ML', 'Full-Stack'],
    technologies: ['Spring Boot', 'React', 'TensorFlow', 'MongoDB', 'REST API'],
    metrics: { accuracy: '94% bug detection', scale: '100K+ lines/day' },
    live_url: '#',
    github_url: '#',
  },
  {
    id: 'project-3',
    title: 'Real-Time Analytics Engine',
    description: 'Scalable real-time data processing engine handling millions of events per day. Features WebSocket streaming, custom aggregation pipelines, and interactive dashboards.',
    imagePlaceholder: 'project-3',
    tags: ['Backend', 'Data Engineering'],
    technologies: ['Node.js', 'Apache Kafka', 'PostgreSQL', 'WebSocket', 'React'],
    metrics: { throughput: '5M events/day', latency: '<100ms p99' },
    live_url: '#',
    github_url: '#',
  },
  {
    id: 'project-4',
    title: 'Microservices E-Commerce Platform',
    description: 'Cloud-native microservices architecture with service mesh, event-driven communication, and comprehensive observability. Handles 50K+ daily transactions.',
    imagePlaceholder: 'project-4',
    tags: ['Microservices', 'Cloud'],
    technologies: ['Spring Boot', 'Docker', 'Kubernetes', 'RabbitMQ', 'MySQL'],
    metrics: { scale: '50K+ txn/day', availability: '99.95% SLA' },
    live_url: '#',
    github_url: '#',
  },
  {
    id: 'project-5',
    title: 'Smart Contract Automation',
    description: 'Blockchain-based smart contract system for automated agreement execution. Full-stack DApp with secure backend validation and real-time monitoring.',
    imagePlaceholder: 'project-1',
    tags: ['Blockchain', 'Full-Stack'],
    technologies: ['Solidity', 'Node.js', 'React', 'Web3.js', 'MongoDB'],
    metrics: { contracts: '500+ deployed', security: 'Zero exploits' },
    live_url: '#',
    github_url: '#',
  },
  {
    id: 'project-6',
    title: 'Neural Style Transfer API',
    description: 'Production-ready REST API for neural style transfer with model optimization, caching layer, and CDN integration. Processes images with 85% faster inference.',
    imagePlaceholder: 'project-2',
    tags: ['AI/ML', 'API'],
    technologies: ['Python', 'FastAPI', 'PyTorch', 'Redis', 'AWS S3'],
    metrics: { speed: '85% faster', usage: '10K+ API calls/month' },
    live_url: '#',
    github_url: '#',
  },
];

type Skill = {
  name: string;
  icon: LucideIcon;
};

type SkillCategory = {
  name: string;
  icon: LucideIcon;
  skills: Skill[];
};

export const SKILLS: SkillCategory[] = [
  {
    name: 'Backend Engineering',
    icon: Server,
    skills: [
      { name: 'Java', icon: Code },
      { name: 'Spring Boot', icon: Server },
      { name: 'Node.js', icon: Server },
      { name: 'REST APIs', icon: Server },
      { name: 'GraphQL', icon: Server },
      { name: 'Microservices', icon: Server },
    ],
  },
  {
    name: 'Frontend Development',
    icon: Paintbrush,
    skills: [
      { name: 'React', icon: Code },
      { name: 'Next.js', icon: Code },
      { name: 'TypeScript', icon: Code },
      { name: 'Tailwind CSS', icon: Paintbrush },
    ],
  },
  {
    name: 'Databases & Caching',
    icon: Database,
    skills: [
      { name: 'PostgreSQL', icon: Database },
      { name: 'MySQL', icon: Database },
      { name: 'MongoDB', icon: Database },
      { name: 'Redis', icon: Database },
    ],
  },
  {
    name: 'DevOps & Cloud',
    icon: Cloud,
    skills: [
      { name: 'Docker', icon: Terminal },
      { name: 'Kubernetes', icon: Cloud },
      { name: 'AWS', icon: Cloud },
      { name: 'Google Cloud', icon: Cloud },
      { name: 'CI/CD', icon: Terminal },
      { name: 'Git', icon: Terminal },
    ],
  },
  {
    name: 'AI/ML & Data',
    icon: BrainCircuit,
    skills: [
      { name: 'TensorFlow', icon: BrainCircuit },
      { name: 'PyTorch', icon: BrainCircuit },
      { name: 'Google Gemini', icon: BrainCircuit },
      { name: 'Data Structures', icon: Code },
    ],
  },
];

export const EXPERIENCE = [
    {
        company: 'Innovate Inc.',
        role: 'Senior Frontend Developer',
        period: '2021 - Present',
        description: 'Leading the development of a new design system and migrating legacy applications to a modern Next.js stack, improving performance by 40%.'
    },
    {
        company: 'Creative Solutions',
        role: 'Full-Stack Developer',
        period: '2019 - 2021',
        description: 'Developed and maintained client websites and web applications using React, Node.js, and a variety of CMS platforms.'
    },
    {
        company: 'Tech Start',
        role: 'Software Engineer Intern',
        period: 'Summer 2018',
        description: 'Assisted in the development of a new mobile application, focusing on UI components and API integration.'
    }
];

export const TESTIMONIALS = [
    {
        name: 'Jane Doe',
        title: 'CEO, Innovate Inc.',
        quote: "Their work has been a game-changer for our platform. The new design system is not only beautiful but also incredibly efficient for our team.",
        imagePlaceholder: 'testimonial-1',
    },
    {
        name: 'John Smith',
        title: 'Project Manager, Creative Solutions',
        quote: "An exceptional developer with a keen eye for detail. They consistently delivered high-quality work on time and exceeded our expectations.",
        imagePlaceholder: 'testimonial-2',
    },
    {
        name: 'Emily White',
        title: 'Lead Designer, Innovate Inc.',
        quote: "A pleasure to collaborate with. They bridge the gap between design and development effortlessly, turning complex ideas into reality.",
        imagePlaceholder: 'testimonial-3',
    }
]
