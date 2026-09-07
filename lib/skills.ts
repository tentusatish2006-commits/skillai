import type { Course, QuizQuestion, RoleRequirement } from '@/types';

export const ROLE_REQUIREMENTS: RoleRequirement[] = [
  {
    role: 'Frontend Developer',
    description: 'Builds user interfaces for web applications using modern JavaScript frameworks.',
    skills: ['JavaScript', 'React', 'TypeScript', 'CSS', 'HTML', 'Git', 'REST APIs', 'Testing', 'Accessibility', 'State Management'],
  },
  {
    role: 'Backend Developer',
    description: 'Builds server-side logic, APIs, and data infrastructure.',
    skills: ['Node.js', 'Python', 'SQL', 'PostgreSQL', 'REST APIs', 'Docker', 'Git', 'Authentication', 'Microservices', 'Caching'],
  },
  {
    role: 'Full-Stack Developer',
    description: 'Works across both frontend and backend to ship complete features.',
    skills: ['JavaScript', 'React', 'Node.js', 'TypeScript', 'SQL', 'PostgreSQL', 'Git', 'REST APIs', 'Docker', 'Testing'],
  },
  {
    role: 'Data Scientist',
    description: 'Analyzes data and builds predictive models to drive decisions.',
    skills: ['Python', 'Statistics', 'Machine Learning', 'Pandas', 'NumPy', 'SQL', 'Data Visualization', 'Scikit-learn', 'TensorFlow', 'Jupyter'],
  },
  {
    role: 'DevOps Engineer',
    description: 'Automates deployment, infrastructure, and observability pipelines.',
    skills: ['Docker', 'Kubernetes', 'AWS', 'CI/CD', 'Linux', 'Terraform', 'Bash', 'Monitoring', 'Git', 'Networking'],
  },
  {
    role: 'Mobile Developer',
    description: 'Builds native and cross-platform mobile applications.',
    skills: ['React Native', 'Swift', 'Kotlin', 'JavaScript', 'REST APIs', 'Git', 'State Management', 'Mobile UI', 'Firebase', 'Testing'],
  },
  {
    role: 'Product Manager',
    description: 'Defines product vision, prioritizes features, and drives delivery.',
    skills: ['Agile', 'User Research', 'Roadmapping', 'Analytics', 'SQL', 'Stakeholder Management', 'A/B Testing', 'Wireframing', 'Prioritization', 'Communication'],
  },
  {
    role: 'UI/UX Designer',
    description: 'Designs intuitive, accessible, and beautiful user experiences.',
    skills: ['Figma', 'User Research', 'Prototyping', 'Wireframing', 'Design Systems', 'Accessibility', 'Interaction Design', 'Typography', 'Color Theory', 'Usability Testing'],
  },
  {
    role: 'Cloud Engineer',
    description: 'Architects and manages cloud infrastructure and services.',
    skills: ['AWS', 'Azure', 'GCP', 'Docker', 'Kubernetes', 'Terraform', 'Networking', 'Security', 'Linux', 'CI/CD'],
  },
  {
    role: 'Machine Learning Engineer',
    description: 'Deploys and scales ML models into production systems.',
    skills: ['Python', 'TensorFlow', 'PyTorch', 'Docker', 'Kubernetes', 'MLOps', 'SQL', 'REST APIs', 'Statistics', 'AWS'],
  },
];

const SKILL_KEYWORDS: Record<string, string[]> = {
  JavaScript: ['javascript', 'js', 'es6', 'ecmascript', 'node.js', 'nodejs'],
  React: ['react', 'reactjs', 'react.js', 'jsx', 'hooks', 'redux'],
  TypeScript: ['typescript', 'ts', 'types'],
  CSS: ['css', 'sass', 'scss', 'tailwind', 'styled-components', 'bootstrap'],
  HTML: ['html', 'html5', 'semantic html'],
  Git: ['git', 'github', 'gitlab', 'version control'],
  'REST APIs': ['rest', 'restful', 'api', 'apis', 'endpoint', 'endpoints'],
  Testing: ['test', 'testing', 'jest', 'cypress', 'unit test', 'e2e', 'pytest', 'mocha'],
  Accessibility: ['accessibility', 'a11y', 'wcag', 'aria'],
  'State Management': ['state management', 'redux', 'zustand', 'context api', 'mobx'],
  'Node.js': ['node', 'nodejs', 'node.js', 'express', 'fastify'],
  Python: ['python', 'django', 'flask', 'fastapi'],
  SQL: ['sql', 'mysql', 'postgresql', 'postgres', 'sqlite', 'query'],
  PostgreSQL: ['postgresql', 'postgres', 'pg'],
  Docker: ['docker', 'container', 'containerization', 'dockerfile'],
  Authentication: ['authentication', 'auth', 'jwt', 'oauth', 'session'],
  Microservices: ['microservice', 'microservices', 'service-oriented'],
  Caching: ['caching', 'cache', 'redis', 'memcached'],
  Statistics: ['statistics', 'statistical', 'probability', 'hypothesis'],
  'Machine Learning': ['machine learning', 'ml', 'model', 'deep learning', 'neural network'],
  Pandas: ['pandas', 'dataframe'],
  NumPy: ['numpy', 'ndarray'],
  'Data Visualization': ['data visualization', 'matplotlib', 'seaborn', 'plotly', 'chart'],
  'Scikit-learn': ['scikit-learn', 'sklearn', 'scikit'],
  TensorFlow: ['tensorflow', 'tf.keras'],
  Jupyter: ['jupyter', 'notebook', 'colab'],
  Kubernetes: ['kubernetes', 'k8s', 'helm'],
  AWS: ['aws', 'ec2', 's3', 'lambda', 'amazon web services'],
  Azure: ['azure', 'microsoft azure'],
  GCP: ['gcp', 'google cloud', 'google cloud platform'],
  'CI/CD': ['ci/cd', 'ci cd', 'continuous integration', 'continuous deployment', 'jenkins', 'github actions', 'gitlab ci'],
  Linux: ['linux', 'ubuntu', 'debian', 'bash scripting'],
  Terraform: ['terraform', 'infrastructure as code', 'iac'],
  Bash: ['bash', 'shell', 'shell scripting'],
  Monitoring: ['monitoring', 'prometheus', 'grafana', 'datadog', 'observability'],
  Networking: ['networking', 'tcp/ip', 'dns', 'load balancing', 'vpn'],
  'React Native': ['react native', 'expo'],
  Swift: ['swift', 'swiftui', 'ios'],
  Kotlin: ['kotlin', 'android'],
  'Mobile UI': ['mobile ui', 'mobile design', 'responsive mobile'],
  Firebase: ['firebase', 'firestore'],
  Agile: ['agile', 'scrum', 'sprint', 'kanban'],
  'User Research': ['user research', 'interview', 'persona', 'journey map'],
  Roadmapping: ['roadmap', 'roadmapping', 'product roadmap'],
  Analytics: ['analytics', 'google analytics', 'mixpanel', 'amplitude'],
  'Stakeholder Management': ['stakeholder', 'cross-functional', 'alignment'],
  'A/B Testing': ['a/b test', 'ab test', 'experiment', 'experimentation'],
  Wireframing: ['wireframe', 'wireframing', 'low-fidelity'],
  Prioritization: ['prioritization', 'prioritize', 'rice', 'moSCoW'],
  Communication: ['communication', 'presentation', 'documentation'],
  Figma: ['figma', 'design tool'],
  Prototyping: ['prototype', 'prototyping', 'interactive prototype'],
  'Design Systems': ['design system', 'component library', 'design tokens'],
  'Interaction Design': ['interaction design', 'microinteraction', 'ux flow'],
  Typography: ['typography', 'type scale', 'font pairing'],
  'Color Theory': ['color theory', 'color palette', 'color scheme'],
  'Usability Testing': ['usability test', 'usability testing', 'user test'],
  Security: ['security', 'encryption', 'owasp', 'vulnerability'],
  PyTorch: ['pytorch', 'torch'],
  MLOps: ['mlops', 'model deployment', 'model serving'],
};

export function extractSkillsFromText(text: string): string[] {
  const lower = text.toLowerCase();
  const found = new Set<string>();
  for (const [skill, keywords] of Object.entries(SKILL_KEYWORDS)) {
    if (keywords.some((kw) => lower.includes(kw))) {
      found.add(skill);
    }
  }
  return Array.from(found);
}

export function getRoleRequirements(role: string): RoleRequirement | undefined {
  return ROLE_REQUIREMENTS.find((r) => r.role.toLowerCase() === role.toLowerCase());
}

const SKILL_CATEGORIES: Record<string, { category: string; phase: number }> = {
  // Phase 1 — Foundation
  HTML: { category: 'Foundation', phase: 1 },
  CSS: { category: 'Foundation', phase: 1 },
  JavaScript: { category: 'Foundation', phase: 1 },
  Python: { category: 'Foundation', phase: 1 },
  Git: { category: 'Foundation', phase: 1 },
  HTML5: { category: 'Foundation', phase: 1 },
  Linux: { category: 'Foundation', phase: 1 },
  Bash: { category: 'Foundation', phase: 1 },
  Agile: { category: 'Foundation', phase: 1 },
  Communication: { category: 'Foundation', phase: 1 },
  // Phase 2 — Core
  TypeScript: { category: 'Core', phase: 2 },
  React: { category: 'Core', phase: 2 },
  'Node.js': { category: 'Core', phase: 2 },
  SQL: { category: 'Core', phase: 2 },
  PostgreSQL: { category: 'Core', phase: 2 },
  'REST APIs': { category: 'Core', phase: 2 },
  Docker: { category: 'Core', phase: 2 },
  Testing: { category: 'Core', phase: 2 },
  'State Management': { category: 'Core', phase: 2 },
  Authentication: { category: 'Core', phase: 2 },
  Statistics: { category: 'Core', phase: 2 },
  Pandas: { category: 'Core', phase: 2 },
  NumPy: { category: 'Core', phase: 2 },
  Figma: { category: 'Core', phase: 2 },
  'User Research': { category: 'Core', phase: 2 },
  Wireframing: { category: 'Core', phase: 2 },
  Roadmapping: { category: 'Core', phase: 2 },
  Analytics: { category: 'Core', phase: 2 },
  Networking: { category: 'Core', phase: 2 },
  Security: { category: 'Core', phase: 2 },
  Swift: { category: 'Core', phase: 2 },
  Kotlin: { category: 'Core', phase: 2 },
  'React Native': { category: 'Core', phase: 2 },
  Firebase: { category: 'Core', phase: 2 },
  Azure: { category: 'Core', phase: 2 },
  GCP: { category: 'Core', phase: 2 },
  // Phase 3 — Advanced
  'Machine Learning': { category: 'Advanced', phase: 3 },
  TensorFlow: { category: 'Advanced', phase: 3 },
  PyTorch: { category: 'Advanced', phase: 3 },
  'Scikit-learn': { category: 'Advanced', phase: 3 },
  Kubernetes: { category: 'Advanced', phase: 3 },
  AWS: { category: 'Advanced', phase: 3 },
  'CI/CD': { category: 'Advanced', phase: 3 },
  Terraform: { category: 'Advanced', phase: 3 },
  Microservices: { category: 'Advanced', phase: 3 },
  Caching: { category: 'Advanced', phase: 3 },
  Monitoring: { category: 'Advanced', phase: 3 },
  MLOps: { category: 'Advanced', phase: 3 },
  'Data Visualization': { category: 'Advanced', phase: 3 },
  Jupyter: { category: 'Advanced', phase: 3 },
  Accessibility: { category: 'Advanced', phase: 3 },
  'Mobile UI': { category: 'Advanced', phase: 3 },
  'A/B Testing': { category: 'Advanced', phase: 3 },
  'Stakeholder Management': { category: 'Advanced', phase: 3 },
  Prioritization: { category: 'Advanced', phase: 3 },
  Prototyping: { category: 'Advanced', phase: 3 },
  'Design Systems': { category: 'Advanced', phase: 3 },
  'Interaction Design': { category: 'Advanced', phase: 3 },
  Typography: { category: 'Advanced', phase: 3 },
  'Color Theory': { category: 'Advanced', phase: 3 },
  'Usability Testing': { category: 'Advanced', phase: 3 },
};

export function getSkillCategory(skill: string): { category: string; phase: number } {
  return SKILL_CATEGORIES[skill] ?? { category: 'Core', phase: 2 };
}

export function getRoadmapForRole(role: string): { skill: string; category: string; phase: number }[] {
  const req = getRoleRequirements(role);
  if (!req) return [];
  return req.skills
    .map((skill) => ({ skill, ...getSkillCategory(skill) }))
    .sort((a, b) => a.phase - b.phase || a.skill.localeCompare(b.skill));
}

export function analyzeResume(rawText: string, targetRole: string) {
  const extracted = extractSkillsFromText(rawText);
  const role = getRoleRequirements(targetRole);
  const required = role?.skills ?? [];
  const missing = required.filter((s) => !extracted.includes(s));
  const matched = required.filter((s) => extracted.includes(s));
  const matchPercentage = required.length > 0
    ? Math.round((matched.length / required.length) * 100)
    : 0;
  return {
    extractedSkills: extracted,
    requiredSkills: required,
    missingSkills: missing,
    matchPercentage,
    rawText,
    targetRole,
  };
}

export const COURSE_CATALOG: Course[] = [
  // JavaScript
  { id: 'js1', title: 'Modern JavaScript From the Beginning', provider: 'Udemy', skill: 'JavaScript', type: 'paid', price: '$14.99', duration: '21h', rating: 4.8, url: 'https://www.udemy.com', level: 'Beginner' },
  { id: 'js2', title: 'JavaScript Essentials', provider: 'freeCodeCamp', skill: 'JavaScript', type: 'free', price: 'Free', duration: '4h', rating: 4.7, url: 'https://www.freecodecamp.org', level: 'Beginner' },
  // React
  { id: 'react1', title: 'React — The Complete Guide', provider: 'Udemy', skill: 'React', type: 'paid', price: '$19.99', duration: '48h', rating: 4.9, url: 'https://www.udemy.com', level: 'All Levels' },
  { id: 'react2', title: 'React Official Docs Tutorial', provider: 'React.dev', skill: 'React', type: 'free', price: 'Free', duration: '6h', rating: 4.8, url: 'https://react.dev', level: 'Beginner' },
  // TypeScript
  { id: 'ts1', title: 'Total TypeScript', provider: 'Matt Pocock', skill: 'TypeScript', type: 'paid', price: '$299', duration: '20h', rating: 4.9, url: 'https://www.totaltypescript.com', level: 'Intermediate' },
  { id: 'ts2', title: 'TypeScript Handbook', provider: 'TypeScriptLang', skill: 'TypeScript', type: 'free', price: 'Free', duration: '5h', rating: 4.7, url: 'https://www.typescriptlang.org', level: 'Beginner' },
  // CSS
  { id: 'css1', title: 'CSS for JavaScript Developers', provider: 'Josh Comeau', skill: 'CSS', type: 'paid', price: '$395', duration: '15h', rating: 4.9, url: 'https://css-for-js.dev', level: 'Intermediate' },
  { id: 'css2', title: 'Learn CSS', provider: 'web.dev', skill: 'CSS', type: 'free', price: 'Free', duration: '4h', rating: 4.6, url: 'https://web.dev/learn/css', level: 'Beginner' },
  // Node.js
  { id: 'node1', title: 'Node.js, Express, MongoDB & More', provider: 'Udemy', skill: 'Node.js', type: 'paid', price: '$17.99', duration: '42h', rating: 4.8, url: 'https://www.udemy.com', level: 'Intermediate' },
  { id: 'node2', title: 'Node.js Crash Course', provider: 'Traversy Media', skill: 'Node.js', type: 'free', price: 'Free', duration: '1.5h', rating: 4.5, url: 'https://youtube.com', level: 'Beginner' },
  // Python
  { id: 'py1', title: '100 Days of Code: Python Pro Bootcamp', provider: 'Udemy', skill: 'Python', type: 'paid', price: '$16.99', duration: '60h', rating: 4.8, url: 'https://www.udemy.com', level: 'All Levels' },
  { id: 'py2', title: 'Python for Everybody', provider: 'freeCodeCamp', skill: 'Python', type: 'free', price: 'Free', duration: '14h', rating: 4.7, url: 'https://www.freecodecamp.org', level: 'Beginner' },
  // SQL
  { id: 'sql1', title: 'The Complete SQL Bootcamp', provider: 'Udemy', skill: 'SQL', type: 'paid', price: '$13.99', duration: '9h', rating: 4.7, url: 'https://www.udemy.com', level: 'Beginner' },
  { id: 'sql2', title: 'SQLBolt Interactive SQL', provider: 'SQLBolt', skill: 'SQL', type: 'free', price: 'Free', duration: '3h', rating: 4.6, url: 'https://sqlbolt.com', level: 'Beginner' },
  // Docker
  { id: 'docker1', title: 'Docker & Kubernetes: The Practical Guide', provider: 'Udemy', skill: 'Docker', type: 'paid', price: '$18.99', duration: '22h', rating: 4.7, url: 'https://www.udemy.com', level: 'Intermediate' },
  { id: 'docker2', title: 'Docker Getting Started', provider: 'Docker Docs', skill: 'Docker', type: 'free', price: 'Free', duration: '2h', rating: 4.4, url: 'https://docs.docker.com', level: 'Beginner' },
  // AWS
  { id: 'aws1', title: 'AWS Certified Solutions Architect', provider: 'Udemy', skill: 'AWS', type: 'paid', price: '$19.99', duration: '25h', rating: 4.7, url: 'https://www.udemy.com', level: 'Intermediate' },
  { id: 'aws2', title: 'AWS Cloud Practitioner Essentials', provider: 'AWS Skill Builder', skill: 'AWS', type: 'free', price: 'Free', duration: '6h', rating: 4.5, url: 'https://aws.amazon.com/training', level: 'Beginner' },
  // Machine Learning
  { id: 'ml1', title: 'Machine Learning Specialization', provider: 'Coursera', skill: 'Machine Learning', type: 'paid', price: '$49/mo', duration: '60h', rating: 4.9, url: 'https://www.coursera.org', level: 'Intermediate' },
  { id: 'ml2', title: 'Practical Machine Learning', provider: 'Google', skill: 'Machine Learning', type: 'free', price: 'Free', duration: '20h', rating: 4.6, url: 'https://developers.google.com/machine-learning', level: 'Beginner' },
  // Git
  { id: 'git1', title: 'Git Complete: The definitive guide', provider: 'Udemy', skill: 'Git', type: 'paid', price: '$12.99', duration: '6h', rating: 4.6, url: 'https://www.udemy.com', level: 'Beginner' },
  { id: 'git2', title: 'Learn Git Branching', provider: 'learngitbranching', skill: 'Git', type: 'free', price: 'Free', duration: '2h', rating: 4.8, url: 'https://learngitbranching.js.org', level: 'Beginner' },
  // Testing
  { id: 'test1', title: 'Testing JavaScript with Jest', provider: 'Kent C. Dodds', skill: 'Testing', type: 'paid', price: '$299', duration: '12h', rating: 4.8, url: 'https://testingjavascript.com', level: 'Intermediate' },
  { id: 'test2', title: 'Jest Testing Tutorial', provider: 'YouTube', skill: 'Testing', type: 'free', price: 'Free', duration: '3h', rating: 4.4, url: 'https://youtube.com', level: 'Beginner' },
  // Figma
  { id: 'figma1', title: 'Figma for Beginners', provider: 'DesignCourse', skill: 'Figma', type: 'paid', price: '$9.99', duration: '5h', rating: 4.5, url: 'https://www.udemy.com', level: 'Beginner' },
  { id: 'figma2', title: 'Figma 101 Crash Course', provider: 'Figma', skill: 'Figma', type: 'free', price: 'Free', duration: '2h', rating: 4.7, url: 'https://figma.com/academy', level: 'Beginner' },
  // Kubernetes
  { id: 'k8s1', title: 'Kubernetes Certified Administrator (CKA)', provider: 'Udemy', skill: 'Kubernetes', type: 'paid', price: '$19.99', duration: '20h', rating: 4.7, url: 'https://www.udemy.com', level: 'Advanced' },
  { id: 'k8s2', title: 'Kubernetes Basics', provider: 'Kubernetes Docs', skill: 'Kubernetes', type: 'free', price: 'Free', duration: '4h', rating: 4.5, url: 'https://kubernetes.io/docs/tutorials', level: 'Beginner' },
  // CI/CD
  { id: 'cicd1', title: 'CI/CD with GitHub Actions', provider: 'Udemy', skill: 'CI/CD', type: 'paid', price: '$14.99', duration: '8h', rating: 4.6, url: 'https://www.udemy.com', level: 'Intermediate' },
  { id: 'cicd2', title: 'GitHub Actions Quickstart', provider: 'GitHub Docs', skill: 'CI/CD', type: 'free', price: 'Free', duration: '2h', rating: 4.5, url: 'https://docs.github.com/actions', level: 'Beginner' },
  // Statistics
  { id: 'stat1', title: 'Statistics for Data Science', provider: 'Coursera', skill: 'Statistics', type: 'paid', price: '$49/mo', duration: '30h', rating: 4.7, url: 'https://www.coursera.org', level: 'Intermediate' },
  { id: 'stat2', title: 'Intro to Statistics', provider: 'Khan Academy', skill: 'Statistics', type: 'free', price: 'Free', duration: '10h', rating: 4.6, url: 'https://www.khanacademy.org', level: 'Beginner' },
  // TensorFlow
  { id: 'tf1', title: 'TensorFlow Developer Certificate', provider: 'Coursera', skill: 'TensorFlow', type: 'paid', price: '$49/mo', duration: '40h', rating: 4.7, url: 'https://www.coursera.org', level: 'Intermediate' },
  { id: 'tf2', title: 'TensorFlow Tutorials', provider: 'TensorFlow', skill: 'TensorFlow', type: 'free', price: 'Free', duration: '8h', rating: 4.5, url: 'https://www.tensorflow.org/tutorials', level: 'Beginner' },
  // Terraform
  { id: 'tf_1', title: 'HashiCorp Terraform Associate', provider: 'Udemy', skill: 'Terraform', type: 'paid', price: '$17.99', duration: '12h', rating: 4.6, url: 'https://www.udemy.com', level: 'Intermediate' },
  { id: 'tf_2', title: 'Terraform Getting Started', provider: 'HashiCorp', skill: 'Terraform', type: 'free', price: 'Free', duration: '3h', rating: 4.4, url: 'https://developer.hashicorp.com/terraform', level: 'Beginner' },
];

export function getCoursesForSkill(skill: string): Course[] {
  return COURSE_CATALOG.filter((c) => c.skill.toLowerCase() === skill.toLowerCase());
}

const QUIZ_BANK: Record<string, QuizQuestion[]> = {
  JavaScript: [
    { question: 'What does `===` check in JavaScript?', options: ['Value only', 'Value and type', 'Reference only', 'Type only'], correctIndex: 1, type: 'single' },
    { question: 'Which method creates a new array with the results of calling a function on every element?', options: ['map()', 'forEach()', 'filter()', 'reduce()'], correctIndex: 0, type: 'single' },
    { question: 'What is a closure?', options: ['A function with no name', 'A function that has access to its outer scope', 'A way to lock variables', 'A type of loop'], correctIndex: 1, type: 'single' },
    { question: 'Which keyword declares a block-scoped variable?', options: ['var', 'let', 'function', 'return'], correctIndex: 1, type: 'single' },
    { question: 'What does `async/await` help with?', options: ['Type checking', 'Asynchronous operations', 'DOM manipulation', 'Memory management'], correctIndex: 1, type: 'single' },
  ],
  React: [
    { question: 'What is a component in React?', options: ['A CSS module', 'A reusable UI piece returning JSX', 'A database table', 'A build tool'], correctIndex: 1, type: 'single' },
    { question: 'Which hook manages state in a function component?', options: ['useEffect', 'useState', 'useRef', 'useMemo'], correctIndex: 1, type: 'single' },
    { question: 'What does `useEffect` do?', options: ['Manages state', 'Handles side effects', 'Creates context', 'Memoizes values'], correctIndex: 1, type: 'single' },
    { question: 'What is JSX?', options: ['A JavaScript library', 'A syntax extension for JavaScript', 'A CSS framework', 'A database query language'], correctIndex: 1, type: 'single' },
    { question: 'How do you pass data from parent to child?', options: ['Via props', 'Via state', 'Via context only', 'Via refs'], correctIndex: 0, type: 'single' },
  ],
  TypeScript: [
    { question: 'What does TypeScript add to JavaScript?', options: ['Static typing', 'New DOM APIs', 'A different runtime', 'Built-in styling'], correctIndex: 0, type: 'single' },
    { question: 'How do you define an optional property in an interface?', options: ['prop: string', 'prop?: string', 'prop?: string | null', 'prop: string?'], correctIndex: 1, type: 'single' },
    { question: 'What is a generic in TypeScript?', options: ['A type variable that allows reusable components', 'A global variable', 'A type that cannot be changed', 'A deprecated feature'], correctIndex: 0, type: 'single' },
    { question: 'Which keyword defines a custom type?', options: ['class', 'type', 'def', 'struct'], correctIndex: 1, type: 'single' },
    { question: 'What does `interface` do?', options: ['Defines a class', 'Defines a contract for objects', 'Creates a module', 'Runs a function'], correctIndex: 1, type: 'single' },
  ],
  Python: [
    { question: 'How do you create a list in Python?', options: ['list = {}', 'list = []', 'list = ()', 'list = <>'], correctIndex: 1, type: 'single' },
    { question: 'What does `len()` return?', options: ['The last element', 'The number of items', 'The type', 'The memory address'], correctIndex: 1, type: 'single' },
    { question: 'Which keyword defines a function?', options: ['func', 'def', 'function', 'fn'], correctIndex: 1, type: 'single' },
    { question: 'What is a dictionary in Python?', options: ['An ordered list', 'A key-value data structure', 'A type of loop', 'A file format'], correctIndex: 1, type: 'single' },
    { question: 'What does `pip` do?', options: ['Runs Python scripts', 'Installs Python packages', 'Compiles Python', 'Debugs code'], correctIndex: 1, type: 'single' },
  ],
  SQL: [
    { question: 'Which keyword retrieves data from a database?', options: ['GET', 'SELECT', 'FETCH', 'RETRIEVE'], correctIndex: 1, type: 'single' },
    { question: 'What does `WHERE` do?', options: ['Filters rows', 'Sorts results', 'Groups data', 'Joins tables'], correctIndex: 0, type: 'single' },
    { question: 'Which command adds new rows?', options: ['ADD', 'INSERT INTO', 'CREATE', 'APPEND'], correctIndex: 1, type: 'single' },
    { question: 'What does `JOIN` do?', options: ['Combines rows from two tables', 'Sorts data', 'Deletes rows', 'Creates indexes'], correctIndex: 0, type: 'single' },
    { question: 'Which function counts rows?', options: ['TOTAL()', 'COUNT()', 'SUM()', 'ROWS()'], correctIndex: 1, type: 'single' },
  ],
  Docker: [
    { question: 'What is a Docker container?', options: ['A virtual machine', 'A lightweight, standalone executable package', 'A database', 'A code editor'], correctIndex: 1, type: 'single' },
    { question: 'What does a Dockerfile do?', options: ['Stores data', 'Defines how to build an image', 'Runs tests', 'Manages networks'], correctIndex: 1, type: 'single' },
    { question: 'Which command builds an image?', options: ['docker make', 'docker build', 'docker create', 'docker compile'], correctIndex: 1, type: 'single' },
    { question: 'What is Docker Hub?', options: ['A local registry', 'A cloud registry for images', 'A CI tool', 'A monitoring tool'], correctIndex: 1, type: 'single' },
    { question: 'Which command runs a container?', options: ['docker start', 'docker run', 'docker execute', 'docker launch'], correctIndex: 1, type: 'single' },
  ],
  AWS: [
    { question: 'What is Amazon S3?', options: ['A compute service', 'An object storage service', 'A database', 'A CDN'], correctIndex: 1, type: 'single' },
    { question: 'What does EC2 provide?', options: ['Scalable virtual servers', 'Email service', 'DNS management', 'Data warehousing'], correctIndex: 0, type: 'single' },
    { question: 'Which service runs code without managing servers?', options: ['EC2', 'Lambda', 'S3', 'RDS'], correctIndex: 1, type: 'single' },
    { question: 'What is an AWS Region?', options: ['A data center', 'A geographic area with multiple availability Zones', 'A billing tier', 'A type of instance'], correctIndex: 1, type: 'single' },
    { question: 'Which service is a managed relational database?', options: ['DynamoDB', 'RDS', 'S3', 'Lambda'], correctIndex: 1, type: 'single' },
  ],
  Git: [
    { question: 'What does `git commit` do?', options: ['Saves changes to remote', 'Saves a snapshot to local history', 'Deletes changes', 'Creates a branch'], correctIndex: 1, type: 'single' },
    { question: 'What does `git push` do?', options: ['Saves local changes', 'Uploads local commits to remote', 'Downloads changes', 'Merges branches'], correctIndex: 1, type: 'single' },
    { question: 'How do you create a new branch?', options: ['git branch new', 'git checkout -b new', 'git create new', 'git switch new'], correctIndex: 1, type: 'single' },
    { question: 'What does `git merge` do?', options: ['Combines branch histories', 'Deletes a branch', 'Pushes to remote', 'Clones a repo'], correctIndex: 0, type: 'single' },
    { question: 'What is a pull request?', options: ['A request to pull code', 'A proposal to merge changes', 'A backup command', 'A type of branch'], correctIndex: 1, type: 'single' },
  ],
  CSS: [
    { question: 'What does CSS stand for?', options: ['Computer Style Sheets', 'Cascading Style Sheets', 'Creative Style System', 'Colorful Style Sheets'], correctIndex: 1, type: 'single' },
    { question: 'Which property controls text size?', options: ['text-style', 'font-size', 'text-size', 'font-style'], correctIndex: 1, type: 'single' },
    { question: 'What does Flexbox help with?', options: ['Database queries', 'One-dimensional layouts', 'Image editing', 'Routing'], correctIndex: 1, type: 'single' },
    { question: 'How do you center a block element horizontally?', options: ['margin: auto', 'text-align: center', 'align: center', 'float: center'], correctIndex: 0, type: 'single' },
    { question: 'What is a media query used for?', options: ['Responsive design', 'Animations', 'Form validation', 'API calls'], correctIndex: 0, type: 'single' },
  ],
  HTML: [
    { question: 'What does HTML stand for?', options: ['HyperText Markup Language', 'High Tech Modern Language', 'Home Tool Markup Language', 'Hyperlink Text Management Language'], correctIndex: 0, type: 'single' },
    { question: 'Which tag creates a hyperlink?', options: ['<link>', '<a>', '<href>', '<url>'], correctIndex: 1, type: 'single' },
    { question: 'What is the purpose of the <head> tag?', options: ['Contains visible content', 'Contains metadata', 'Creates headers', 'Defines headings'], correctIndex: 1, type: 'single' },
    { question: 'Which tag creates a list with bullets?', options: ['<ol>', '<ul>', '<dl>', '<list>'], correctIndex: 1, type: 'single' },
    { question: 'What does the alt attribute on <img> do?', options: ['Aligns the image', 'Provides alternative text', 'Sets the image source', 'Changes the image size'], correctIndex: 1, type: 'single' },
  ],
  'Node.js': [
    { question: 'What is Node.js?', options: ['A frontend framework', 'A JavaScript runtime built on V8', 'A database', 'A CSS tool'], correctIndex: 1, type: 'single' },
    { question: 'Which package manager is most common with Node.js?', options: ['pip', 'npm', 'gem', 'composer'], correctIndex: 1, type: 'single' },
    { question: 'What is Express?', options: ['A database', 'A web framework for Node.js', 'A testing tool', 'A bundler'], correctIndex: 1, type: 'single' },
    { question: 'How does Node.js handle I/O?', options: ['Synchronously', 'Asynchronously with an event loop', 'Via threads only', 'Via batch processing'], correctIndex: 1, type: 'single' },
    { question: 'What is `module.exports` used for?', options: ['Exporting functionality from a module', 'Importing CSS', 'Compiling TypeScript', 'Running tests'], correctIndex: 0, type: 'single' },
  ],
  'Machine Learning': [
    { question: 'What is supervised learning?', options: ['Learning without data', 'Learning from labeled data', 'Learning without rules', 'Learning via clustering only'], correctIndex: 1, type: 'single' },
    { question: 'What is overfitting?', options: ['A model too simple', 'A model that memorizes training data and generalizes poorly', 'A model with no parameters', 'A training technique'], correctIndex: 1, type: 'single' },
    { question: 'What is a neural network?', options: ['A type of database', 'Layers of interconnected nodes inspired by the brain', 'A network protocol', 'A CSS grid'], correctIndex: 1, type: 'single' },
    { question: 'What does "training" a model mean?', options: ['Writing the code', 'Adjusting parameters to minimize error', 'Deploying to production', 'Testing the UI'], correctIndex: 1, type: 'single' },
    { question: 'What is a common ML library in Python?', options: ['Express', 'Scikit-learn', 'React', 'Tailwind'], correctIndex: 1, type: 'single' },
  ],
  Kubernetes: [
    { question: 'What is a Pod in Kubernetes?', options: ['A container image', 'The smallest deployable unit containing one or more containers', 'A network policy', 'A storage volume'], correctIndex: 1, type: 'single' },
    { question: 'What does a Deployment manage?', options: ['Database schemas', 'ReplicaSets and rolling updates', 'Network routes', 'User accounts'], correctIndex: 1, type: 'single' },
    { question: 'What is kubectl?', options: ['A container runtime', 'The CLI to interact with clusters', 'A monitoring tool', 'A package manager'], correctIndex: 1, type: 'single' },
    { question: 'What does a Service do?', options: ['Stores data', 'Exposes Pods as a network service', 'Builds images', 'Runs tests'], correctIndex: 1, type: 'single' },
    { question: 'What is a Namespace used for?', options: ['Organizing and isolating resources', 'Compiling code', 'Storing secrets only', 'Managing nodes'], correctIndex: 0, type: 'single' },
  ],
  'CI/CD': [
    { question: 'What does CI stand for?', options: ['Continuous Integration', 'Code Inspection', 'Compiled Interface', 'Central Index'], correctIndex: 0, type: 'single' },
    { question: 'What does CD stand for?', options: ['Code Deployment', 'Continuous Delivery/Deployment', 'Container Definition', 'Central Data'], correctIndex: 1, type: 'single' },
    { question: 'What is a pipeline?', options: ['A data storage', 'A sequence of automated steps from build to deploy', 'A network protocol', 'A type of container'], correctIndex: 1, type: 'single' },
    { question: 'What triggers a CI/CD pipeline?', options: ['Only manual runs', 'Events like pushes or PRs', 'Server restarts', 'Database backups'], correctIndex: 1, type: 'single' },
    { question: 'What is a common CI/CD tool?', options: ['Figma', 'GitHub Actions', 'Photoshop', 'MySQL'], correctIndex: 1, type: 'single' },
  ],
  Statistics: [
    { question: 'What is the mean?', options: ['The most frequent value', 'The average of values', 'The middle value', 'The range'], correctIndex: 1, type: 'single' },
    { question: 'What is standard deviation?', options: ['A type of chart', 'A measure of data spread', 'The median', 'A probability test'], correctIndex: 1, type: 'single' },
    { question: 'What is a p-value?', options: ['A password value', 'A measure of statistical significance', 'A type of variable', 'A data point'], correctIndex: 1, type: 'single' },
    { question: 'What does correlation measure?', options: ['Causation', 'The relationship between two variables', 'Data accuracy', 'Sample size'], correctIndex: 1, type: 'single' },
    { question: 'What is a normal distribution?', options: ['A random spread', 'A bell-shaped symmetric distribution', 'A linear trend', 'A categorical variable'], correctIndex: 1, type: 'single' },
  ],
  TensorFlow: [
    { question: 'What is TensorFlow?', options: ['A frontend framework', 'An open-source ML library', 'A database', 'A CSS tool'], correctIndex: 1, type: 'single' },
    { question: 'What is a tensor?', options: ['A type of variable', 'A multi-dimensional array', 'A network protocol', 'A model name'], correctIndex: 1, type: 'single' },
    { question: 'What is Keras?', options: ['A database', 'A high-level API for TensorFlow', 'A testing tool', 'A bundler'], correctIndex: 1, type: 'single' },
    { question: 'What does `model.fit()` do?', options: ['Saves the model', 'Trains the model on data', 'Evaluates the model', 'Exports the model'], correctIndex: 1, type: 'single' },
    { question: 'What is an epoch?', options: ['A type of layer', 'One complete pass through the training data', 'A model architecture', 'A loss function'], correctIndex: 1, type: 'single' },
  ],
  Terraform: [
    { question: 'What is Terraform?', options: ['A frontend tool', 'An Infrastructure as Code tool by HashiCorp', 'A database', 'A monitoring tool'], correctIndex: 1, type: 'single' },
    { question: 'What language does Terraform use?', options: ['Python', 'HCL (HashiCorp Configuration Language)', 'YAML only', 'JSON only'], correctIndex: 1, type: 'single' },
    { question: 'What does `terraform plan` do?', options: ['Applies changes', 'Shows a preview of changes', 'Destroys infrastructure', 'Initializes the project'], correctIndex: 1, type: 'single' },
    { question: 'What is a provider in Terraform?', options: ['A cloud service API plugin', 'A variable', 'A resource type', 'A module'], correctIndex: 0, type: 'single' },
    { question: 'What does `terraform apply` do?', options: ['Plans changes', 'Executes the planned changes', 'Formats code', 'Validates syntax'], correctIndex: 1, type: 'single' },
  ],
  Figma: [
    { question: 'What is Figma?', options: ['A code editor', 'A collaborative design tool', 'A database', 'A CI tool'], correctIndex: 1, type: 'single' },
    { question: 'What is a component in Figma?', options: ['A code module', 'A reusable design element', 'A type of layer mask', 'A plugin'], correctIndex: 1, type: 'single' },
    { question: 'What are auto layouts?', options: ['A CSS grid', 'Figma\'s flexible layout system', 'A type of font', 'A color palette'], correctIndex: 1, type: 'single' },
    { question: 'What is a prototype in Figma?', options: ['A production app', 'An interactive clickable mockup', 'A code export', 'A database schema'], correctIndex: 1, type: 'single' },
    { question: 'What does Figma Variables do?', options: ['Store design tokens and dynamic values', 'Compile code', 'Run tests', 'Manage servers'], correctIndex: 0, type: 'single' },
  ],
  Testing: [
    { question: 'What is a unit test?', options: ['A test of the whole app', 'A test of an individual function or component', 'A performance test', 'A manual test'], correctIndex: 1, type: 'single' },
    { question: 'What is Jest?', options: ['A CSS framework', 'A JavaScript testing framework', 'A database', 'A bundler'], correctIndex: 1, type: 'single' },
    { question: 'What is a mock?', options: ['A real API call', 'A simulated object for testing', 'A type of test', 'A deployment tool'], correctIndex: 1, type: 'single' },
    { question: 'What does TDD stand for?', options: ['Test-Driven Development', 'Type-Defined Design', 'Total Data Delivery', 'Test Debug Deploy'], correctIndex: 0, type: 'single' },
    { question: 'What is code coverage?', options: ['The number of lines of code', 'The percentage of code executed by tests', 'The number of bugs', 'The app size'], correctIndex: 1, type: 'single' },
  ],
  'REST APIs': [
    { question: 'What does REST stand for?', options: ['Remote API Style', 'Representational State Transfer', 'Reliable Endpoint System', 'Request Evaluation Standard'], correctIndex: 1, type: 'single' },
    { question: 'Which HTTP method creates a new resource?', options: ['GET', 'POST', 'DELETE', 'PATCH'], correctIndex: 1, type: 'single' },
    { question: 'What does HTTP status 404 mean?', options: ['Success', 'Not Found', 'Server Error', 'Unauthorized'], correctIndex: 1, type: 'single' },
    { question: 'What is JSON commonly used for?', options: ['Styling', 'Data interchange', 'Database management', 'Routing'], correctIndex: 1, type: 'single' },
    { question: 'Which method is idempotent?', options: ['POST', 'PUT', 'CONNECT', 'PATCH'], correctIndex: 1, type: 'single' },
  ],
  'State Management': [
    { question: 'What is state management?', options: ['Managing CSS states', 'Managing data that changes over time in an app', 'Managing server hardware', 'Managing git branches'], correctIndex: 1, type: 'single' },
    { question: 'What is Redux?', options: ['A database', 'A predictable state container for JS apps', 'A CSS tool', 'A testing framework'], correctIndex: 1, type: 'single' },
    { question: 'What is a reducer?', options: ['A type of hook', 'A function that takes state and an action, returns new state', 'A database query', 'A UI component'], correctIndex: 1, type: 'single' },
    { question: 'What is Context API used for?', options: ['Passing data through the component tree without prop drilling', 'Styling components', 'Making API calls', 'Routing'], correctIndex: 0, type: 'single' },
    { question: 'What is Zustand?', options: ['A CSS framework', 'A small, fast state-management library', 'A database', 'A build tool'], correctIndex: 1, type: 'single' },
  ],
  'Accessibility': [
    { question: 'What does WCAG stand for?', options: ['Web Content Accessibility Guidelines', 'Web Coding Agreement', 'Web Component API Group', 'Wireframe Content Application Guide'], correctIndex: 0, type: 'single' },
    { question: 'What is a screen reader?', options: ['A design tool', 'Software that reads screen content aloud', 'A type of monitor', 'A code formatter'], correctIndex: 1, type: 'single' },
    { question: 'What does `aria-label` do?', options: ['Styles an element', 'Provides an accessible label', 'Creates a link', 'Hides content'], correctIndex: 1, type: 'single' },
    { question: 'What is keyboard navigation?', options: ['Using only a mouse', 'Navigating with keyboard keys', 'A type of shortcut', 'A testing library'], correctIndex: 1, type: 'single' },
    { question: 'Why use semantic HTML?', options: ['It loads faster', 'It conveys meaning to assistive technologies', 'It is shorter', 'It replaces CSS'], correctIndex: 1, type: 'single' },
  ],
  PostgreSQL: [
    { question: 'What type of database is PostgreSQL?', options: ['NoSQL', 'Relational (SQL)', 'Graph', 'Key-value only'], correctIndex: 1, type: 'single' },
    { question: 'What is an index in PostgreSQL?', options: ['A table of contents', 'A structure that speeds up queries', 'A backup file', 'A type of join'], correctIndex: 1, type: 'single' },
    { question: 'What does `SERIAL` do?', options: ['Creates a text field', 'Auto-increments an integer column', 'Sorts results', 'Creates a table'], correctIndex: 1, type: 'single' },
    { question: 'What is a foreign key?', options: ['A primary key', 'A reference to another table\'s primary key', 'A type of index', 'A SQL keyword for sorting'], correctIndex: 1, type: 'single' },
    { question: 'What does `JSONB` store?', options: ['Binary images', 'JSON data in a binary format', 'Plain text only', 'Numbers only'], correctIndex: 1, type: 'single' },
  ],
  Authentication: [
    { question: 'What is JWT?', options: ['A JavaScript framework', 'JSON Web Token for secure information transfer', 'A database type', 'A CSS preprocessor'], correctIndex: 1, type: 'single' },
    { question: 'What is OAuth?', options: ['A database', 'An authorization framework', 'A testing tool', 'A build tool'], correctIndex: 1, type: 'single' },
    { question: 'What is hashing?', options: ['Sorting data', 'Converting data to a fixed-size value', 'A type of join', 'A UI pattern'], correctIndex: 1, type: 'single' },
    { question: 'Why should you never store passwords in plain text?', options: ['It uses too much space', 'They are easily stolen if the database leaks', 'It is slower', 'It is not allowed in SQL'], correctIndex: 1, type: 'single' },
    { question: 'What is a session?', options: ['A type of database', 'A server-side record of a user\'s authenticated state', 'A CSS property', 'A build step'], correctIndex: 1, type: 'single' },
  ],
  'Microservices': [
    { question: 'What is a microservice?', options: ['A small frontend component', 'A small, independent service that does one thing', 'A type of database', 'A CSS module'], correctIndex: 1, type: 'single' },
    { question: 'What is the opposite of microservices?', options: ['Monolith', 'Serverless', 'Static site', 'CDN'], correctIndex: 0, type: 'single' },
    { question: 'How do microservices communicate?', options: ['Via CSS', 'Via APIs or message queues', 'Via shared databases only', 'Via global variables'], correctIndex: 1, type: 'single' },
    { question: 'What is a benefit of microservices?', options: ['Simpler code', 'Independent scaling and deployment', 'Fewer servers', 'No testing needed'], correctIndex: 1, type: 'single' },
    { question: 'What is a challenge of microservices?', options: ['No challenges', 'Increased complexity in networking and data consistency', 'They cannot scale', 'They require no code'], correctIndex: 1, type: 'single' },
  ],
  'Caching': [
    { question: 'What is caching?', options: ['Storing all data permanently', 'Storing frequently used data for faster access', 'Deleting old data', 'Compressing files'], correctIndex: 1, type: 'single' },
    { question: 'What is Redis?', options: ['A SQL database', 'An in-memory data store often used for caching', 'A frontend framework', 'A testing tool'], correctIndex: 1, type: 'single' },
    { question: 'Why use caching?', options: ['To use more memory', 'To reduce latency and database load', 'To increase costs', 'To simplify code'], correctIndex: 1, type: 'single' },
    { question: 'What is a cache miss?', options: ['A successful cache hit', 'When requested data is not in the cache', 'A type of database', 'A network error'], correctIndex: 1, type: 'single' },
    { question: 'What is TTL in caching?', options: ['A type of database', 'Time To Live — how long data stays in cache', 'A testing library', 'A CSS property'], correctIndex: 1, type: 'single' },
  ],
  'Pandas': [
    { question: 'What is Pandas?', options: ['A frontend framework', 'A Python data analysis library', 'A database', 'A testing tool'], correctIndex: 1, type: 'single' },
    { question: 'What is a DataFrame?', options: ['A type of chart', 'A 2D labeled data structure', 'A CSS grid', 'A network protocol'], correctIndex: 1, type: 'single' },
    { question: 'How do you read a CSV in Pandas?', options: ['pd.read_csv()', 'pd.load_csv()', 'pd.open_csv()', 'pd.import_csv()'], correctIndex: 0, type: 'single' },
    { question: 'What does `groupby()` do?', options: ['Sorts data', 'Groups data for aggregation', 'Deletes rows', 'Plots data'], correctIndex: 1, type: 'single' },
    { question: 'What does `dropna()` do?', options: ['Drops the table', 'Removes missing values', 'Drops duplicates', 'Drops a column'], correctIndex: 1, type: 'single' },
  ],
  'NumPy': [
    { question: 'What is NumPy?', options: ['A frontend framework', 'A Python library for numerical computing', 'A database', 'A testing tool'], correctIndex: 1, type: 'single' },
    { question: 'What is an ndarray?', options: ['A type of chart', 'An N-dimensional array', 'A CSS grid', 'A network protocol'], correctIndex: 1, type: 'single' },
    { question: 'Why is NumPy faster than plain Python lists?', options: ['It uses CSS', 'It uses optimized C and vectorized operations', 'It skips validation', 'It uses less memory only'], correctIndex: 1, type: 'single' },
    { question: 'What does `np.zeros()` create?', options: ['An array of ones', 'An array of zeros', 'A random array', 'An empty array'], correctIndex: 1, type: 'single' },
    { question: 'What is broadcasting?', options: ['A type of join', 'Operating on arrays of different shapes', 'A network protocol', 'A testing method'], correctIndex: 1, type: 'single' },
  ],
  'Data Visualization': [
    { question: 'What is data visualization?', options: ['Storing data', 'Representing data in visual formats', 'Deleting data', 'Querying data'], correctIndex: 1, type: 'single' },
    { question: 'What is Matplotlib?', options: ['A database', 'A Python plotting library', 'A frontend framework', 'A testing tool'], correctIndex: 1, type: 'single' },
    { question: 'What is a bar chart used for?', options: ['Showing proportions', 'Comparing categories', 'Showing trends over time', 'Showing distribution'], correctIndex: 1, type: 'single' },
    { question: 'What does Plotly do well?', options: ['Static plots', 'Interactive plots', 'Database queries', 'CSS styling'], correctIndex: 1, type: 'single' },
    { question: 'What is a heatmap?', options: ['A type of map', 'A grid of colored cells showing magnitude', 'A CSS property', 'A network tool'], correctIndex: 1, type: 'single' },
  ],
  'Scikit-learn': [
    { question: 'What is Scikit-learn?', options: ['A frontend framework', 'A Python ML library', 'A database', 'A testing tool'], correctIndex: 1, type: 'single' },
    { question: 'What does `fit()` do?', options: ['Saves a model', 'Trains a model on data', 'Evaluates a model', 'Plots data'], correctIndex: 1, type: 'single' },
    { question: 'What is `train_test_split`?', options: ['A type of join', 'Splits data into training and test sets', 'A database query', 'A CSS property'], correctIndex: 1, type: 'single' },
    { question: 'What does `predict()` do?', options: ['Trains a model', 'Makes predictions with a trained model', 'Splits data', 'Plots data'], correctIndex: 1, type: 'single' },
    { question: 'Which module contains classification algorithms?', options: ['sklearn.css', 'sklearn.linear_model', 'sklearn.react', 'sklearn.dom'], correctIndex: 1, type: 'single' },
  ],
  'Jupyter': [
    { question: 'What is a Jupyter Notebook?', options: ['A database', 'An interactive document for code and output', 'A frontend framework', 'A testing tool'], correctIndex: 1, type: 'single' },
    { question: 'What is a cell in Jupyter?', options: ['A type of database', 'A block of code or text', 'A CSS property', 'A network protocol'], correctIndex: 1, type: 'single' },
    { question: 'What kernel does Jupyter run?', options: ['A CSS engine', 'A language-specific runtime (e.g., IPython)', 'A database engine', 'A build tool'], correctIndex: 1, type: 'single' },
    { question: 'What does Shift+Enter do?', options: ['Saves the file', 'Runs the current cell and moves to the next', 'Deletes the cell', 'Merges cells'], correctIndex: 1, type: 'single' },
    { question: 'What is Google Colab?', options: ['A database', 'A hosted Jupyter environment', 'A CSS tool', 'A testing framework'], correctIndex: 1, type: 'single' },
  ],
  'Linux': [
    { question: 'What is Linux?', options: ['A database', 'An open-source operating system kernel', 'A frontend framework', 'A testing tool'], correctIndex: 1, type: 'single' },
    { question: 'What does `ls` do?', options: ['Lists files', 'Lists servers', 'Logs in', 'Links files'], correctIndex: 0, type: 'single' },
    { question: 'What does `cd` do?', options: ['Copies data', 'Changes the current directory', 'Compiles code', 'Creates a directory'], correctIndex: 1, type: 'single' },
    { question: 'What does `chmod` do?', options: ['Changes file permissions', 'Changes the monitor', 'Compiles modules', 'Checks memory'], correctIndex: 0, type: 'single' },
    { question: 'What is `grep` used for?', options: ['Searching text patterns', 'Grouping files', 'Graphing data', 'Generating keys'], correctIndex: 0, type: 'single' },
  ],
  Bash: [
    { question: 'What is Bash?', options: ['A database', 'A Unix shell and command language', 'A frontend framework', 'A testing tool'], correctIndex: 1, type: 'single' },
    { question: 'What does `echo` do?', options: ['Deletes text', 'Prints text to the terminal', 'Edits files', 'Encrypts data'], correctIndex: 1, type: 'single' },
    { question: 'What does `#!/bin/bash` do?', options: ['A comment', 'A shebang that tells the system to use Bash', 'A variable', 'A function'], correctIndex: 1, type: 'single' },
    { question: 'What does `$?` hold?', options: ['The current directory', 'The exit status of the last command', 'The user name', 'The script name'], correctIndex: 1, type: 'single' },
    { question: 'What does `&&` do?', options: ['Logical OR', 'Run the next command only if the previous succeeds', 'Background a process', 'Redirect output'], correctIndex: 1, type: 'single' },
  ],
  Monitoring: [
    { question: 'What is Prometheus?', options: ['A database', 'A monitoring and alerting toolkit', 'A frontend framework', 'A testing tool'], correctIndex: 1, type: 'single' },
    { question: 'What is Grafana?', options: ['A database', 'A visualization and dashboarding tool', 'A CSS framework', 'A build tool'], correctIndex: 1, type: 'single' },
    { question: 'What is observability?', options: ['Only logging', 'The ability to understand system internals from external signals', 'A type of database', 'A network protocol'], correctIndex: 1, type: 'single' },
    { question: 'What are the three pillars of observability?', options: ['HTML, CSS, JS', 'Logs, metrics, traces', 'Frontend, backend, database', 'Build, test, deploy'], correctIndex: 1, type: 'single' },
    { question: 'What is an alert?', options: ['A type of query', 'A notification triggered when a condition is met', 'A CSS property', 'A build step'], correctIndex: 1, type: 'single' },
  ],
  Networking: [
    { question: 'What does DNS do?', options: ['Stores data', 'Translates domain names to IP addresses', 'Routes containers', 'Builds images'], correctIndex: 1, type: 'single' },
    { question: 'What is a load balancer?', options: ['A database', 'Distributes traffic across multiple servers', 'A CSS tool', 'A testing framework'], correctIndex: 1, type: 'single' },
    { question: 'What does TCP/IP stand for?', options: ['Transmission Control Protocol / Internet Protocol', 'Text Copy Protocol', 'Type Check Pipeline', 'Transfer Command Process'], correctIndex: 0, type: 'single' },
    { question: 'What is a VPN?', options: ['A database', 'A Virtual Private Network', 'A CSS preprocessor', 'A build tool'], correctIndex: 1, type: 'single' },
    { question: 'What is latency?', options: ['Storage size', 'The delay before a transfer begins', 'A type of index', 'A query language'], correctIndex: 1, type: 'single' },
  ],
  'React Native': [
    { question: 'What is React Native?', options: ['A database', 'A framework for building native mobile apps with React', 'A CSS tool', 'A testing framework'], correctIndex: 1, type: 'single' },
    { question: 'What does Expo do?', options: ['A database', 'Simplifies React Native development and tooling', 'A CSS preprocessor', 'A build tool'], correctIndex: 1, type: 'single' },
    { question: 'How does React Native render UI?', options: ['Via HTML', 'Via native components', 'Via CSS only', 'Via SVG only'], correctIndex: 1, type: 'single' },
    { question: 'What is a common navigation library?', options: ['React Navigation', 'React Router Native', 'Express Nav', 'Navify'], correctIndex: 0, type: 'single' },
    { question: 'Can you reuse React web code in React Native?', options: ['No, never', 'Yes, much logic can be shared', 'Only CSS', 'Only HTML'], correctIndex: 1, type: 'single' },
  ],
  Swift: [
    { question: 'What is Swift?', options: ['A database', 'A programming language by Apple', 'A CSS framework', 'A testing tool'], correctIndex: 1, type: 'single' },
    { question: 'What is SwiftUI?', options: ['A database', 'A declarative UI framework for Apple platforms', 'A CSS tool', 'A build tool'], correctIndex: 1, type: 'single' },
    { question: 'What are optionals in Swift?', options: ['A type of loop', 'A type that can hold a value or nil', 'A CSS property', 'A network protocol'], correctIndex: 1, type: 'single' },
    { question: 'What does `let` declare in Swift?', options: ['A variable', 'A constant', 'A function', 'A class'], correctIndex: 1, type: 'single' },
    { question: 'What is a common Swift pattern for error handling?', options: ['try/catch with throws', 'console.log', 'alert()', 'echo'], correctIndex: 0, type: 'single' },
  ],
  Kotlin: [
    { question: 'What is Kotlin?', options: ['A database', 'A programming language for JVM and Android', 'A CSS framework', 'A testing tool'], correctIndex: 1, type: 'single' },
    { question: 'Is Kotlin interoperable with Java?', options: ['No', 'Yes, fully', 'Only for UI', 'Only for testing'], correctIndex: 1, type: 'single' },
    { question: 'What does `val` declare in Kotlin?', options: ['A variable', 'A read-only (immutable) value', 'A function', 'A class'], correctIndex: 1, type: 'single' },
    { question: 'What is a coroutine in Kotlin?', options: ['A database', 'A lightweight concurrency mechanism', 'A CSS property', 'A build tool'], correctIndex: 1, type: 'single' },
    { question: 'What is Jetpack Compose?', options: ['A database', 'A declarative UI toolkit for Android', 'A CSS tool', 'A testing framework'], correctIndex: 1, type: 'single' },
  ],
  'Mobile UI': [
    { question: 'What is responsive mobile design?', options: ['Designing only for desktop', 'Designing layouts that adapt to mobile screens', 'A database query', 'A build step'], correctIndex: 1, type: 'single' },
    { question: 'What is a touch target?', options: ['A type of database', 'The tappable area of an interactive element', 'A CSS property', 'A network protocol'], correctIndex: 1, type: 'single' },
    { question: 'Why are tap targets important?', options: ['They look nice', 'They ensure usability on small screens', 'They reduce code size', 'They speed up the app'], correctIndex: 1, type: 'single' },
    { question: 'What is a bottom tab bar?', options: ['A database', 'A common mobile navigation pattern', 'A CSS grid', 'A build tool'], correctIndex: 1, type: 'single' },
    { question: 'What is a safe area in mobile UI?', options: ['A type of database', 'The area not covered by notches or system bars', 'A CSS property', 'A network tool'], correctIndex: 1, type: 'single' },
  ],
  Firebase: [
    { question: 'What is Firebase?', options: ['A database only', 'A Google platform for mobile and web apps', 'A CSS framework', 'A testing tool'], correctIndex: 1, type: 'single' },
    { question: 'What is Firestore?', options: ['A CSS tool', 'A flexible, scalable NoSQL database', 'A build tool', 'A testing framework'], correctIndex: 1, type: 'single' },
    { question: 'What does Firebase Authentication provide?', options: ['Only email login', 'Ready-made auth with providers like Google and Apple', 'A CSS property', 'A build step'], correctIndex: 1, type: 'single' },
    { question: 'What is Firebase Cloud Messaging?', options: ['A database', 'A push notification service', 'A CSS tool', 'A build tool'], correctIndex: 1, type: 'single' },
    { question: 'What is Firebase Hosting?', options: ['A database', 'Hosting for web apps and static content', 'A CSS framework', 'A testing tool'], correctIndex: 1, type: 'single' },
  ],
  Agile: [
    { question: 'What is Agile?', options: ['A database', 'An iterative approach to software delivery', 'A CSS framework', 'A testing tool'], correctIndex: 1, type: 'single' },
    { question: 'What is a sprint?', options: ['A type of database', 'A time-boxed iteration (usually 1-4 weeks)', 'A CSS property', 'A network protocol'], correctIndex: 1, type: 'single' },
    { question: 'What is a standup?', options: ['A database query', 'A short daily sync meeting', 'A CSS grid', 'A build tool'], correctIndex: 1, type: 'single' },
    { question: 'What is a backlog?', options: ['A type of database', 'A prioritized list of work items', 'A CSS property', 'A network tool'], correctIndex: 1, type: 'single' },
    { question: 'What is Scrum?', options: ['A database', 'A popular Agile framework with defined roles and ceremonies', 'A CSS tool', 'A build step'], correctIndex: 1, type: 'single' },
  ],
  'User Research': [
    { question: 'What is user research?', options: ['A database', 'Studying users to inform design decisions', 'A CSS framework', 'A testing tool'], correctIndex: 1, type: 'single' },
    { question: 'What is a persona?', options: ['A type of database', 'A fictional user representing a target group', 'A CSS property', 'A network protocol'], correctIndex: 1, type: 'single' },
    { question: 'What is a journey map?', options: ['A database', 'A visualization of a user\'s experience over time', 'A CSS grid', 'A build tool'], correctIndex: 1, type: 'single' },
    { question: 'What is a usability test?', options: ['A type of database', 'Evaluating a product by testing it with real users', 'A CSS property', 'A network tool'], correctIndex: 1, type: 'single' },
    { question: 'What is an interview in research?', options: ['A database query', 'A structured conversation to gather insights', 'A CSS grid', 'A build step'], correctIndex: 1, type: 'single' },
  ],
  Roadmapping: [
    { question: 'What is a product roadmap?', options: ['A database', 'A visual summary mapping out the vision and direction', 'A CSS framework', 'A testing tool'], correctIndex: 1, type: 'single' },
    { question: 'Why use a roadmap?', options: ['To store data', 'To align stakeholders on priorities and timeline', 'To style components', 'To run tests'], correctIndex: 1, type: 'single' },
    { question: 'What should a roadmap NOT be?', options: ['A flexible guide', 'A rigid, unchangeable plan', 'A communication tool', 'A priority list'], correctIndex: 1, type: 'single' },
    { question: 'What is a milestone?', options: ['A type of database', 'A significant checkpoint or event', 'A CSS property', 'A network tool'], correctIndex: 1, type: 'single' },
    { question: 'What is Now/Next/Later?', options: ['A database', 'A simple horizon-based roadmap format', 'A CSS grid', 'A build tool'], correctIndex: 1, type: 'single' },
  ],
  Analytics: [
    { question: 'What is product analytics?', options: ['A database', 'Measuring how users interact with a product', 'A CSS framework', 'A testing tool'], correctIndex: 1, type: 'single' },
    { question: 'What is a funnel?', options: ['A type of database', 'A series of steps a user takes toward a goal', 'A CSS property', 'A network protocol'], correctIndex: 1, type: 'single' },
    { question: 'What is retention?', options: ['A database query', 'The percentage of users who return over time', 'A CSS grid', 'A build tool'], correctIndex: 1, type: 'single' },
    { question: 'What is DAU?', options: ['A database', 'Daily Active Users', 'A CSS property', 'A network tool'], correctIndex: 1, type: 'single' },
    { question: 'What is Mixpanel?', options: ['A database', 'A product analytics platform', 'A CSS framework', 'A testing tool'], correctIndex: 1, type: 'single' },
  ],
  'Stakeholder Management': [
    { question: 'What is stakeholder management?', options: ['A database', 'Managing relationships and expectations of people affected by a project', 'A CSS framework', 'A testing tool'], correctIndex: 1, type: 'single' },
    { question: 'Who is a stakeholder?', options: ['A type of database', 'Anyone affected by or interested in the project', 'A CSS property', 'A network protocol'], correctIndex: 1, type: 'single' },
    { question: 'What is alignment?', options: ['A database query', 'Getting stakeholders to agree on goals and direction', 'A CSS grid', 'A build tool'], correctIndex: 1, type: 'single' },
    { question: 'What is cross-functional collaboration?', options: ['A database', 'Working across different teams or departments', 'A CSS property', 'A network tool'], correctIndex: 1, type: 'single' },
    { question: 'Why communicate updates regularly?', options: ['To use more time', 'To keep stakeholders informed and build trust', 'To increase costs', 'To replace documentation'], correctIndex: 1, type: 'single' },
  ],
  'A/B Testing': [
    { question: 'What is A/B testing?', options: ['A database', 'Comparing two versions to see which performs better', 'A CSS framework', 'A testing tool'], correctIndex: 1, type: 'single' },
    { question: 'What is a control in A/B testing?', options: ['A database query', 'The original version (baseline)', 'A CSS grid', 'A build tool'], correctIndex: 1, type: 'single' },
    { question: 'What is statistical significance?', options: ['A database', 'The likelihood that a result is not due to chance', 'A CSS property', 'A network tool'], correctIndex: 1, type: 'single' },
    { question: 'What is a variant?', options: ['A type of database', 'The modified version being tested', 'A CSS property', 'A network protocol'], correctIndex: 1, type: 'single' },
    { question: 'Why run A/B tests?', options: ['To use more storage', 'To make data-driven decisions', 'To increase code size', 'To replace analytics'], correctIndex: 1, type: 'single' },
  ],
  Wireframing: [
    { question: 'What is a wireframe?', options: ['A database', 'A low-fidelity visual guide of a layout', 'A CSS framework', 'A testing tool'], correctIndex: 1, type: 'single' },
    { question: 'Why use wireframes?', options: ['To store data', 'To explore layout and structure before visual design', 'To style components', 'To run tests'], correctIndex: 1, type: 'single' },
    { question: 'What is fidelity in design?', options: ['A database query', 'The level of detail in a design mockup', 'A CSS grid', 'A build tool'], correctIndex: 1, type: 'single' },
    { question: 'What is a low-fidelity wireframe?', options: ['A database', 'A rough, simple sketch of the layout', 'A CSS property', 'A network tool'], correctIndex: 1, type: 'single' },
    { question: 'What is a high-fidelity mockup?', options: ['A type of database', 'A detailed, polished design close to the final product', 'A CSS property', 'A network protocol'], correctIndex: 1, type: 'single' },
  ],
  Prioritization: [
    { question: 'What is prioritization?', options: ['A database', 'Deciding the order of work based on value and effort', 'A CSS framework', 'A testing tool'], correctIndex: 1, type: 'single' },
    { question: 'What is the MoSCoW method?', options: ['A database query', 'Must, Should, Could, Won\'t prioritization', 'A CSS grid', 'A build tool'], correctIndex: 1, type: 'single' },
    { question: 'What is the RICE framework?', options: ['A database', 'Reach, Impact, Confidence, Effort scoring', 'A CSS property', 'A network tool'], correctIndex: 1, type: 'single' },
    { question: 'Why prioritize?', options: ['To use more time', 'To focus on the most valuable work first', 'To increase costs', 'To replace planning'], correctIndex: 1, type: 'single' },
    { question: 'What is impact vs effort?', options: ['A type of database', 'A matrix to evaluate tasks by value and cost', 'A CSS property', 'A network protocol'], correctIndex: 1, type: 'single' },
  ],
  Communication: [
    { question: 'Why is communication important in product?', options: ['It is not', 'To align teams and stakeholders', 'To reduce code', 'To replace testing'], correctIndex: 1, type: 'single' },
    { question: 'What is a product spec?', options: ['A database', 'A document describing what to build and why', 'A CSS framework', 'A testing tool'], correctIndex: 1, type: 'single' },
    { question: 'What is a stakeholder update?', options: ['A database query', 'A regular communication about progress', 'A CSS grid', 'A build tool'], correctIndex: 1, type: 'single' },
    { question: 'What is active listening?', options: ['A database', 'Fully focusing and responding thoughtfully', 'A CSS property', 'A network tool'], correctIndex: 1, type: 'single' },
    { question: 'What is documentation?', options: ['A type of database', 'Written records of decisions and processes', 'A CSS property', 'A network protocol'], correctIndex: 1, type: 'single' },
  ],
  Prototyping: [
    { question: 'What is prototyping?', options: ['A database', 'Building interactive models of a product', 'A CSS framework', 'A testing tool'], correctIndex: 1, type: 'single' },
    { question: 'Why prototype?', options: ['To store data', 'To test ideas quickly before building', 'To style components', 'To run tests'], correctIndex: 1, type: 'single' },
    { question: 'What is a clickable prototype?', options: ['A database query', 'A prototype with interactive, tappable elements', 'A CSS grid', 'A build tool'], correctIndex: 1, type: 'single' },
    { question: 'What is fidelity in prototyping?', options: ['A database', 'The level of detail and interactivity', 'A CSS property', 'A network tool'], correctIndex: 1, type: 'single' },
    { question: 'What tool is common for prototyping?', options: ['MySQL', 'Figma', 'Docker', 'Jest'], correctIndex: 1, type: 'single' },
  ],
  'Design Systems': [
    { question: 'What is a design system?', options: ['A database', 'A collection of reusable components and guidelines', 'A CSS framework', 'A testing tool'], correctIndex: 1, type: 'single' },
    { question: 'What are design tokens?', options: ['A database query', 'Variables that store design decisions (colors, spacing)', 'A CSS grid', 'A build tool'], correctIndex: 1, type: 'single' },
    { question: 'Why use a design system?', options: ['To store data', 'To ensure consistency and speed up design', 'To replace code', 'To run tests'], correctIndex: 1, type: 'single' },
    { question: 'What is a component library?', options: ['A database', 'A set of pre-built UI components', 'A CSS property', 'A network tool'], correctIndex: 1, type: 'single' },
    { question: 'What is Storybook?', options: ['A type of database', 'A tool for developing and showcasing components', 'A CSS property', 'A network protocol'], correctIndex: 1, type: 'single' },
  ],
  'Interaction Design': [
    { question: 'What is interaction design?', options: ['A database', 'Designing how users interact with a product', 'A CSS framework', 'A testing tool'], correctIndex: 1, type: 'single' },
    { question: 'What is a microinteraction?', options: ['A database query', 'A small, focused interaction like a button hover', 'A CSS grid', 'A build tool'], correctIndex: 1, type: 'single' },
    { question: 'What is feedback in UX?', options: ['A database', 'A response to user action confirming it was received', 'A CSS property', 'A network tool'], correctIndex: 1, type: 'single' },
    { question: 'What is affordance?', options: ['A type of database', 'A visual cue suggesting how to interact', 'A CSS property', 'A network protocol'], correctIndex: 1, type: 'single' },
    { question: 'What is a UX flow?', options: ['A database', 'The path a user takes to complete a task', 'A CSS grid', 'A build tool'], correctIndex: 1, type: 'single' },
  ],
  Typography: [
    { question: 'What is typography?', options: ['A database', 'The art and technique of arranging type', 'A CSS framework', 'A testing tool'], correctIndex: 1, type: 'single' },
    { question: 'What is a type scale?', options: ['A database query', 'A set of font sizes with consistent ratios', 'A CSS grid', 'A build tool'], correctIndex: 1, type: 'single' },
    { question: 'What is kerning?', options: ['A database', 'The space between specific letter pairs', 'A CSS property', 'A network tool'], correctIndex: 1, type: 'single' },
    { question: 'What is line height?', options: ['A type of database', 'The vertical space between lines of text', 'A CSS property', 'A network protocol'], correctIndex: 1, type: 'single' },
    { question: 'What is font pairing?', options: ['A database', 'Choosing complementary fonts for headings and body', 'A CSS grid', 'A build tool'], correctIndex: 1, type: 'single' },
  ],
  'Color Theory': [
    { question: 'What is color theory?', options: ['A database', 'Guidelines for combining colors visually', 'A CSS framework', 'A testing tool'], correctIndex: 1, type: 'single' },
    { question: 'What is a complementary color scheme?', options: ['A database query', 'Colors opposite each other on the wheel', 'A CSS grid', 'A build tool'], correctIndex: 1, type: 'single' },
    { question: 'What is contrast?', options: ['A database', 'The difference in luminance between colors', 'A CSS property', 'A network tool'], correctIndex: 1, type: 'single' },
    { question: 'What is a color palette?', options: ['A type of database', 'A chosen set of colors for a design', 'A CSS property', 'A network protocol'], correctIndex: 1, type: 'single' },
    { question: 'Why does color contrast matter?', options: ['To use more storage', 'For readability and accessibility', 'To increase code size', 'To replace analytics'], correctIndex: 1, type: 'single' },
  ],
  'Usability Testing': [
    { question: 'What is usability testing?', options: ['A database', 'Testing a product with real users to find issues', 'A CSS framework', 'A testing tool'], correctIndex: 1, type: 'single' },
    { question: 'When should you usability test?', options: ['Only after launch', 'Throughout the design process', 'Only before launch', 'Never'], correctIndex: 1, type: 'single' },
    { question: 'What is a task in usability testing?', options: ['A database query', 'A specific action the user is asked to complete', 'A CSS grid', 'A build tool'], correctIndex: 1, type: 'single' },
    { question: 'What is think-aloud protocol?', options: ['A database', 'Users narrate their thoughts while using the product', 'A CSS property', 'A network tool'], correctIndex: 1, type: 'single' },
    { question: 'What is a usability metric?', options: ['A type of database', 'A measurable indicator like task success rate', 'A CSS property', 'A network protocol'], correctIndex: 1, type: 'single' },
  ],
  Security: [
    { question: 'What is encryption?', options: ['A database', 'Converting data into a code to prevent unauthorized access', 'A CSS framework', 'A testing tool'], correctIndex: 1, type: 'single' },
    { question: 'What is OWASP?', options: ['A database query', 'The Open Worldwide Application Security Project', 'A CSS grid', 'A build tool'], correctIndex: 1, type: 'single' },
    { question: 'What is a vulnerability?', options: ['A database', 'A weakness that can be exploited', 'A CSS property', 'A network tool'], correctIndex: 1, type: 'single' },
    { question: 'What is HTTPS?', options: ['A type of database', 'HTTP secured with encryption (TLS)', 'A CSS property', 'A network protocol'], correctIndex: 1, type: 'single' },
    { question: 'What is the principle of least privilege?', options: ['A database', 'Giving only the minimum access needed', 'A CSS grid', 'A build tool'], correctIndex: 1, type: 'single' },
  ],
  PyTorch: [
    { question: 'What is PyTorch?', options: ['A database', 'An open-source ML library by Meta', 'A CSS framework', 'A testing tool'], correctIndex: 1, type: 'single' },
    { question: 'What is a tensor in PyTorch?', options: ['A database query', 'A multi-dimensional array', 'A CSS grid', 'A build tool'], correctIndex: 1, type: 'single' },
    { question: 'What is autograd?', options: ['A database', 'PyTorch\'s automatic differentiation engine', 'A CSS property', 'A network tool'], correctIndex: 1, type: 'single' },
    { question: 'What is a dynamic computation graph?', options: ['A type of database', 'A graph built on the fly during execution', 'A CSS property', 'A network protocol'], correctIndex: 1, type: 'single' },
    { question: 'What does `loss.backward()` do?', options: ['A database', 'Computes gradients of the loss', 'A CSS grid', 'A build tool'], correctIndex: 1, type: 'single' },
  ],
  MLOps: [
    { question: 'What is MLOps?', options: ['A database', 'Practices for deploying and maintaining ML models', 'A CSS framework', 'A testing tool'], correctIndex: 1, type: 'single' },
    { question: 'What is model serving?', options: ['A database query', 'Making a trained model available for predictions', 'A CSS grid', 'A build tool'], correctIndex: 1, type: 'single' },
    { question: 'What is model drift?', options: ['A database', 'When a model\'s performance degrades over time', 'A CSS property', 'A network tool'], correctIndex: 1, type: 'single' },
    { question: 'What is a feature store?', options: ['A type of database', 'A centralized store for ML features', 'A CSS property', 'A network protocol'], correctIndex: 1, type: 'single' },
    { question: 'Why monitor ML models?', options: ['To use more storage', 'To detect drift and performance issues', 'To increase code size', 'To replace analytics'], correctIndex: 1, type: 'single' },
  ],
  Azure: [
    { question: 'What is Microsoft Azure?', options: ['A database', 'A cloud computing platform by Microsoft', 'A CSS framework', 'A testing tool'], correctIndex: 1, type: 'single' },
    { question: 'What is Azure App Service?', options: ['A database query', 'A managed platform for hosting web apps', 'A CSS grid', 'A build tool'], correctIndex: 1, type: 'single' },
    { question: 'What is Azure Functions?', options: ['A database', 'A serverless compute service', 'A CSS property', 'A network tool'], correctIndex: 1, type: 'single' },
    { question: 'What is Azure DevOps?', options: ['A type of database', 'A suite for CI/CD and project management', 'A CSS property', 'A network protocol'], correctIndex: 1, type: 'single' },
    { question: 'What is Azure Storage?', options: ['A database', 'Scalable cloud storage (Blob, Queue, Table, File)', 'A CSS grid', 'A build tool'], correctIndex: 1, type: 'single' },
  ],
  GCP: [
    { question: 'What is Google Cloud Platform?', options: ['A database', 'A cloud computing platform by Google', 'A CSS framework', 'A testing tool'], correctIndex: 1, type: 'single' },
    { question: 'What is Google Compute Engine?', options: ['A database query', 'A service to run virtual machines', 'A CSS grid', 'A build tool'], correctIndex: 1, type: 'single' },
    { question: 'What is Google Cloud Functions?', options: ['A database', 'A serverless compute service', 'A CSS property', 'A network tool'], correctIndex: 1, type: 'single' },
    { question: 'What is BigQuery?', options: ['A type of database', 'A serverless data warehouse for analytics', 'A CSS property', 'A network protocol'], correctIndex: 1, type: 'single' },
    { question: 'What is Google Kubernetes Engine (GKE)?', options: ['A database', 'A managed Kubernetes service', 'A CSS grid', 'A build tool'], correctIndex: 1, type: 'single' },
  ],
};

import { generateQuiz } from '@/lib/quizGenerator';

export function getQuizForSkill(skill: string): QuizQuestion[] {
  const base = QUIZ_BANK[skill] ?? QUIZ_BANK.JavaScript;
  return generateQuiz(skill, base);
}
