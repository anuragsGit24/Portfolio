import { Description } from '@radix-ui/react-toast';
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
    title: 'Appointment Booking System',
    description:
      'Production-oriented full-stack scheduling system designed to handle concurrent booking requests reliably. Implemented backend validation, row-level locking, and secure payment workflows to ensure consistency, correctness, and fault tolerance.',
    imagePlaceholder: 'appointment-booking',
    tags: ['Full-Stack', 'Backend'],
    technologies: [
      'React',
      'Node.js',
      'TypeScript',
      'Prisma ORM',
      'Clerk',
      'Razorpay',
      'Cloudinary',
    ],
    metrics: {
      reliability: 'Zero double bookings',
      optimization: 'Reduced redundant API calls',
    },
    live_url: '#https://github.com/anuragsGit24/BookEase',
    github_url: '#https://github.com/anuragsGit24/BookEase',
  },

  {
    id: 'project-2',
    title: 'AI-Powered Resume Optimization Platform',
    description:
      'Scalable AI-powered document analysis platform focused on structured data extraction and automated evaluation. Designed with low-latency inference, serverless execution, and clean separation between processing, logic, and presentation layers.',
    imagePlaceholder: 'resume-ai',
    tags: ['AI', 'Full-Stack'],
    technologies: ['React', 'JavaScript', 'Puter.js', 'AI Integration'],
    metrics: {
      latency: '<10s processing time',
      impact: '40%+ improvement in resume relevance',
    },
    live_url: '#https://ai-resume-analyzer-three-tau.vercel.app/',
    github_url: '#https://github.com/anuragsGit24/ai-resume-analyzer',
  },

  {
    id: 'project-3',
    title: 'Car Crash Detection System',
    description:
      'Computer vision–based real-time detection system for identifying vehicle crashes from video streams. Built with a focus on accuracy, throughput, and real-time decision making for safety-critical and surveillance-oriented applications.',
    imagePlaceholder: 'crash-detection',
    tags: ['AI/ML', 'Computer Vision'],
    technologies: ['Python', 'CNN', 'YOLO', 'OpenCV'],
    metrics: {
      accuracy: '≈92%',
      throughput: '30 FPS real-time processing',
    },
    live_url: '#https://github.com/anuragsGit24/CrashVision',
    github_url: '#https://github.com/anuragsGit24/CrashVision',
  },

  {
    id: 'project-4',
    title: 'Bank Database Management System',
    description:
      'Backend-centric banking system implementing secure and consistent REST APIs for core financial operations. Designed with transactional integrity, access control, and reliability in mind, aligned with enterprise and BFSI system requirements.',
    imagePlaceholder: 'bank-dbms',
    tags: ['Backend', 'Fintech'],
    technologies: ['Java', 'Spring Boot', 'MySQL', 'JPA'],
    metrics: {
      coverage: 'Accounts, transactions, loans',
      focus: 'Data integrity & security',
    },
    live_url: '#https://github.com/anuragsGit24/DBMS',
    github_url: '#https://github.com/anuragsGit24/DBMS',
  },

  {
    id: 'project-5',
    title: 'Donation Management System',
    description:
      'End-to-end donation management platform emphasizing secure transactions, role-based access, and operational transparency. Built with modular services and clean APIs to support scalability and real-world organizational workflows.',
    imagePlaceholder: 'donation-system',
    tags: ['Full-Stack', 'Software Engineering'],
    technologies: [
      'MongoDB',
      'Express.js',
      'React',
      'Node.js',
      'TypeScript',
      'JWT',
    ],
    metrics: {
      features: 'Campaign & donor lifecycle management',
      security: 'JWT-based authentication',
    },
    live_url: '#https://github.com/anuragsGit24/KindHeart',
    github_url: '#https://github.com/anuragsGit24/KindHeart',
  },

  {
    id: 'project-6',
    title: 'Stock Market Analysis & Prediction Platform',
    description:
      'Data-driven market analysis platform applying statistical modeling and machine learning to interpret historical trends. Focused on explainability, data pipelines, and analytical rigor rather than black-box predictions.',
    imagePlaceholder: 'stock-market',
    tags: ['AI/ML', 'Data Analysis', 'Fintech'],
    technologies: [
      'Python',
      'Pandas',
      'NumPy',
      'Matplotlib',
      'Machine Learning',
    ],
    metrics: {
      improvement: '30%+ trend interpretation accuracy',
      scale: '10K+ market data points',
    },
    live_url: '#https://github.com/SumitWadekar/miniproj',
    github_url: '#https://github.com/SumitWadekar/miniproj',
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
        company: 'NES High School',
        role: 'Student',
        period: '2021',
        description: 'Secured Top 5 rank at the school level, reflecting consistent academic excellence. Developed discipline, curiosity, and early interest in problem-solving and technical subjects.'
    },
    {
        company: 'IDUBS Junior College',
        role: 'Student',
        period: '2021 - 2023',
        description: 'Ranked in the top 1% with two-time Maharashtra Merit Rank, demonstrating strong analytical and academic performance. Built a solid foundation in mathematics and science, shaping my interest in engineering and technology.'
    },
    {
        company: 'SPIT, Mumbai',
        role: 'Computer Engineering',
        period: '2023-2027',
        description: 'Pursuing Computer Engineering with a strong focus on software engineering, backend systems, and CS fundamentals such as DSA, OS, DBMS, and Networks.Actively building real-world projects and strengthening problem-solving through competitive programming.'
    },
    {
      company: 'Barclays',
      role: 'Minors Student',
      period: '2025-2027',
      description: 'Industry-oriented program covering BFSI, risk management, data analytics, and enterprise systems used in modern banking.Provides practical exposure to how large-scale financial and technology systems operate in real-world environments.'
    },
    {
      company: 'JPMC',
      role: 'Student',
      period: '2025-Present',
      description: 'Selected among the top 60 students for J.P. Morgan’s SCOPE program, focused on financial technology, analytics, and real-world business problem solving.Gained exposure to industry practices, data-driven decision making, and enterprise-scale systems through structured learning and mentorship.'
    }

];

// export const TESTIMONIALS = [
//     {
//         name: 'Jane Doe',
//         title: 'CEO, Innovate Inc.',
//         quote: "Their work has been a game-changer for our platform. The new design system is not only beautiful but also incredibly efficient for our team.",
//         imagePlaceholder: 'testimonial-1',
//     },
//     {
//         name: 'John Smith',
//         title: 'Project Manager, Creative Solutions',
//         quote: "An exceptional developer with a keen eye for detail. They consistently delivered high-quality work on time and exceeded our expectations.",
//         imagePlaceholder: 'testimonial-2',
//     },
//     {
//         name: 'Emily White',
//         title: 'Lead Designer, Innovate Inc.',
//         quote: "A pleasure to collaborate with. They bridge the gap between design and development effortlessly, turning complex ideas into reality.",
//         imagePlaceholder: 'testimonial-3',
//     }
// ]
