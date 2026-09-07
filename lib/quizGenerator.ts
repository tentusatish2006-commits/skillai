import type { QuizQuestion } from '@/types';

export interface SkillMeta {
  name: string;
  category: string;
  description: string;
  keywords: string[];
  related: string[];
  difficulty: 'Foundation' | 'Core' | 'Advanced';
}

const SKILL_META: Record<string, SkillMeta> = {
  JavaScript: {
    name: 'JavaScript',
    category: 'Programming Language',
    description: 'A high-level, interpreted programming language for building interactive web applications.',
    keywords: ['ES6', 'closures', 'prototypes', 'async/await', 'promise', 'event loop', 'hoisting', 'strict mode'],
    related: ['TypeScript', 'React', 'Node.js'],
    difficulty: 'Foundation',
  },
  React: {
    name: 'React',
    category: 'UI Framework',
    description: 'A JavaScript library for building user interfaces with reusable components.',
    keywords: ['hooks', 'state', 'props', 'virtual DOM', 'JSX', 'context', 'refs', 'suspense'],
    related: ['JavaScript', 'TypeScript', 'Redux'],
    difficulty: 'Core',
  },
  TypeScript: {
    name: 'TypeScript',
    category: 'Programming Language',
    description: 'A typed superset of JavaScript that compiles to plain JavaScript.',
    keywords: ['types', 'interfaces', 'generics', 'enums', 'type guards', 'utility types', 'decorators'],
    related: ['JavaScript', 'React', 'Node.js'],
    difficulty: 'Core',
  },
  CSS: {
    name: 'CSS',
    category: 'Styling',
    description: 'A stylesheet language used to describe the presentation of HTML documents.',
    keywords: ['flexbox', 'grid', 'animations', 'selectors', 'specificity', 'responsive', 'variables'],
    related: ['HTML', 'JavaScript', 'Tailwind'],
    difficulty: 'Foundation',
  },
  HTML: {
    name: 'HTML',
    category: 'Markup',
    description: 'The standard markup language for creating web pages.',
    keywords: ['semantic tags', 'forms', 'accessibility', 'DOM', 'attributes', 'canvas', 'video'],
    related: ['CSS', 'JavaScript'],
    difficulty: 'Foundation',
  },
  Git: {
    name: 'Git',
    category: 'Version Control',
    description: 'A distributed version control system for tracking changes in source code.',
    keywords: ['commit', 'branch', 'merge', 'rebase', 'pull request', 'stash', 'cherry-pick'],
    related: ['GitHub', 'CI/CD'],
    difficulty: 'Foundation',
  },
  'REST APIs': {
    name: 'REST APIs',
    category: 'API Design',
    description: 'An architectural style for designing networked applications using HTTP.',
    keywords: ['GET', 'POST', 'PUT', 'DELETE', 'status codes', 'endpoints', 'idempotent'],
    related: ['Node.js', 'Authentication', 'Microservices'],
    difficulty: 'Core',
  },
  Testing: {
    name: 'Testing',
    category: 'Quality Assurance',
    description: 'The practice of verifying that code works as expected through automated tests.',
    keywords: ['unit test', 'integration test', 'mock', 'coverage', 'Jest', 'Cypress', 'TDD'],
    related: ['JavaScript', 'React'],
    difficulty: 'Core',
  },
  Accessibility: {
    name: 'Accessibility',
    category: 'Web Standards',
    description: 'The practice of making web content usable by people with disabilities.',
    keywords: ['WCAG', 'ARIA', 'screen reader', 'keyboard', 'contrast', 'semantic HTML'],
    related: ['HTML', 'CSS'],
    difficulty: 'Advanced',
  },
  'State Management': {
    name: 'State Management',
    category: 'Architecture',
    description: 'Techniques for managing data that changes over time in an application.',
    keywords: ['Redux', 'Zustand', 'Context', 'reducer', 'action', 'store', 'dispatch'],
    related: ['React', 'JavaScript'],
    difficulty: 'Core',
  },
  'Node.js': {
    name: 'Node.js',
    category: 'Runtime',
    description: 'A JavaScript runtime built on Chrome\'s V8 engine for server-side development.',
    keywords: ['npm', 'Express', 'modules', 'event loop', 'streams', 'buffers', 'cluster'],
    related: ['JavaScript', 'REST APIs', 'Docker'],
    difficulty: 'Core',
  },
  Python: {
    name: 'Python',
    category: 'Programming Language',
    description: 'A high-level, general-purpose programming language known for readability.',
    keywords: ['list', 'dict', 'comprehension', 'decorator', 'generator', 'pip', 'venv'],
    related: ['Pandas', 'Machine Learning', 'Flask'],
    difficulty: 'Foundation',
  },
  SQL: {
    name: 'SQL',
    category: 'Database',
    description: 'A language for managing and querying relational databases.',
    keywords: ['SELECT', 'JOIN', 'GROUP BY', 'subquery', 'index', 'transaction', 'normalization'],
    related: ['PostgreSQL', 'MySQL', 'Data Visualization'],
    difficulty: 'Core',
  },
  PostgreSQL: {
    name: 'PostgreSQL',
    category: 'Database',
    description: 'A powerful, open-source relational database system.',
    keywords: ['SERIAL', 'JSONB', 'index', 'foreign key', 'CTE', 'window function', 'partition'],
    related: ['SQL', 'Node.js'],
    difficulty: 'Core',
  },
  Docker: {
    name: 'Docker',
    category: 'DevOps',
    description: 'A platform for developing, shipping, and running applications in containers.',
    keywords: ['container', 'image', 'Dockerfile', 'compose', 'volume', 'network', 'registry'],
    related: ['Kubernetes', 'CI/CD', 'AWS'],
    difficulty: 'Core',
  },
  Authentication: {
    name: 'Authentication',
    category: 'Security',
    description: 'The process of verifying a user\'s identity in an application.',
    keywords: ['JWT', 'OAuth', 'session', 'hashing', 'bcrypt', 'token', 'refresh token'],
    related: ['REST APIs', 'Node.js', 'Security'],
    difficulty: 'Core',
  },
  Microservices: {
    name: 'Microservices',
    category: 'Architecture',
    description: 'An architectural style that structures an application as a collection of small services.',
    keywords: ['API gateway', 'service mesh', 'event-driven', 'decoupling', 'scaling', 'communication'],
    related: ['Docker', 'Kubernetes', 'REST APIs'],
    difficulty: 'Advanced',
  },
  Caching: {
    name: 'Caching',
    category: 'Performance',
    description: 'The practice of storing frequently accessed data for faster retrieval.',
    keywords: ['Redis', 'TTL', 'cache miss', 'cache hit', 'invalidation', 'LRU', 'memcached'],
    related: ['Redis', 'Node.js', 'Microservices'],
    difficulty: 'Advanced',
  },
  Statistics: {
    name: 'Statistics',
    category: 'Mathematics',
    description: 'The science of collecting, analyzing, and interpreting data.',
    keywords: ['mean', 'median', 'variance', 'p-value', 'hypothesis', 'distribution', 'correlation'],
    related: ['Machine Learning', 'Data Visualization', 'Python'],
    difficulty: 'Core',
  },
  'Machine Learning': {
    name: 'Machine Learning',
    category: 'AI/ML',
    description: 'The study of algorithms that learn patterns from data to make predictions.',
    keywords: ['supervised', 'unsupervised', 'regression', 'classification', 'neural network', 'overfitting'],
    related: ['Python', 'TensorFlow', 'Scikit-learn'],
    difficulty: 'Advanced',
  },
  Pandas: {
    name: 'Pandas',
    category: 'Data Analysis',
    description: 'A Python library for data manipulation and analysis with DataFrames.',
    keywords: ['DataFrame', 'Series', 'groupby', 'merge', 'pivot', 'read_csv', 'dropna'],
    related: ['Python', 'NumPy', 'Data Visualization'],
    difficulty: 'Core',
  },
  NumPy: {
    name: 'NumPy',
    category: 'Computing',
    description: 'A Python library for numerical computing with multi-dimensional arrays.',
    keywords: ['ndarray', 'broadcasting', 'vectorized', 'linspace', 'zeros', 'reshape', 'dtype'],
    related: ['Python', 'Pandas', 'Machine Learning'],
    difficulty: 'Core',
  },
  'Data Visualization': {
    name: 'Data Visualization',
    category: 'Data Analysis',
    description: 'The graphical representation of data to communicate insights.',
    keywords: ['matplotlib', 'seaborn', 'plotly', 'bar chart', 'heatmap', 'scatter', 'histogram'],
    related: ['Pandas', 'Python', 'Statistics'],
    difficulty: 'Advanced',
  },
  'Scikit-learn': {
    name: 'Scikit-learn',
    category: 'AI/ML',
    description: 'A Python machine learning library with simple and efficient tools.',
    keywords: ['fit', 'predict', 'train_test_split', 'pipeline', 'cross-validation', 'transformer'],
    related: ['Python', 'Machine Learning', 'Pandas'],
    difficulty: 'Advanced',
  },
  TensorFlow: {
    name: 'TensorFlow',
    category: 'AI/ML',
    description: 'An open-source machine learning framework by Google.',
    keywords: ['tensor', 'Keras', 'model.fit', 'epoch', 'gradient', 'layer', 'loss function'],
    related: ['Machine Learning', 'Python', 'Keras'],
    difficulty: 'Advanced',
  },
  Jupyter: {
    name: 'Jupyter',
    category: 'Tools',
    description: 'An interactive computing environment for notebooks, code, and data.',
    keywords: ['notebook', 'cell', 'kernel', 'Colab', 'Shift+Enter', 'markdown', 'inline plot'],
    related: ['Python', 'Pandas', 'Data Visualization'],
    difficulty: 'Advanced',
  },
  Kubernetes: {
    name: 'Kubernetes',
    category: 'DevOps',
    description: 'A container orchestration platform for automating deployment and scaling.',
    keywords: ['Pod', 'Deployment', 'Service', 'kubectl', 'Namespace', 'Ingress', 'ConfigMap'],
    related: ['Docker', 'AWS', 'CI/CD'],
    difficulty: 'Advanced',
  },
  AWS: {
    name: 'AWS',
    category: 'Cloud',
    description: 'Amazon Web Services — a comprehensive cloud computing platform.',
    keywords: ['EC2', 'S3', 'Lambda', 'RDS', 'IAM', 'VPC', 'CloudFormation'],
    related: ['Docker', 'Kubernetes', 'Terraform'],
    difficulty: 'Advanced',
  },
  'CI/CD': {
    name: 'CI/CD',
    category: 'DevOps',
    description: 'Continuous Integration and Continuous Deployment for automated delivery.',
    keywords: ['pipeline', 'GitHub Actions', 'Jenkins', 'build', 'deploy', 'artifact', 'rollback'],
    related: ['Git', 'Docker', 'Kubernetes'],
    difficulty: 'Advanced',
  },
  Linux: {
    name: 'Linux',
    category: 'Operating System',
    description: 'An open-source operating system kernel used widely in servers.',
    keywords: ['shell', 'permissions', 'process', 'filesystem', 'ssh', 'cron', 'systemd'],
    related: ['Bash', 'Docker', 'Networking'],
    difficulty: 'Foundation',
  },
  Terraform: {
    name: 'Terraform',
    category: 'Infrastructure',
    description: 'An Infrastructure as Code tool by HashiCorp for provisioning cloud resources.',
    keywords: ['HCL', 'provider', 'resource', 'plan', 'apply', 'state', 'module'],
    related: ['AWS', 'Azure', 'GCP'],
    difficulty: 'Advanced',
  },
  Bash: {
    name: 'Bash',
    category: 'Shell',
    description: 'A Unix shell and command language for scripting and automation.',
    keywords: ['echo', 'variable', 'pipe', 'redirect', 'shebang', 'exit code', 'conditional'],
    related: ['Linux', 'Git', 'CI/CD'],
    difficulty: 'Foundation',
  },
  Monitoring: {
    name: 'Monitoring',
    category: 'Observability',
    description: 'The practice of tracking system health and performance with metrics.',
    keywords: ['Prometheus', 'Grafana', 'alert', 'log', 'metric', 'trace', 'dashboard'],
    related: ['Kubernetes', 'Docker', 'AWS'],
    difficulty: 'Advanced',
  },
  Networking: {
    name: 'Networking',
    category: 'Infrastructure',
    description: 'The protocols and systems that connect computers and services.',
    keywords: ['TCP/IP', 'DNS', 'load balancer', 'VPN', 'latency', 'firewall', 'routing'],
    related: ['Linux', 'AWS', 'Security'],
    difficulty: 'Core',
  },
  'React Native': {
    name: 'React Native',
    category: 'Mobile',
    description: 'A framework for building native mobile apps using React.',
    keywords: ['Expo', 'native components', 'navigation', 'Flexbox', 'bridge', 'platform'],
    related: ['React', 'JavaScript', 'Firebase'],
    difficulty: 'Core',
  },
  Swift: {
    name: 'Swift',
    category: 'Programming Language',
    description: 'A programming language by Apple for iOS and macOS development.',
    keywords: ['optional', 'let', 'var', 'protocol', 'struct', 'throws', 'SwiftUI'],
    related: ['React Native', 'Mobile UI'],
    difficulty: 'Core',
  },
  Kotlin: {
    name: 'Kotlin',
    category: 'Programming Language',
    description: 'A programming language for JVM and Android development.',
    keywords: ['val', 'coroutine', 'Jetpack Compose', 'null safety', 'data class', 'extension'],
    related: ['React Native', 'Mobile UI'],
    difficulty: 'Core',
  },
  'Mobile UI': {
    name: 'Mobile UI',
    category: 'Design',
    description: 'Design principles and patterns for mobile application interfaces.',
    keywords: ['touch target', 'safe area', 'bottom tab', 'gesture', 'responsive', 'accessibility'],
    related: ['React Native', 'Swift', 'Figma'],
    difficulty: 'Advanced',
  },
  Firebase: {
    name: 'Firebase',
    category: 'Backend',
    description: 'A Google platform for building mobile and web apps with managed services.',
    keywords: ['Firestore', 'Authentication', 'Cloud Messaging', 'Hosting', 'Realtime DB'],
    related: ['React Native', 'Mobile UI'],
    difficulty: 'Core',
  },
  Agile: {
    name: 'Agile',
    category: 'Methodology',
    description: 'An iterative approach to software delivery that emphasizes flexibility.',
    keywords: ['sprint', 'standup', 'backlog', 'Scrum', 'Kanban', 'retrospective', 'user story'],
    related: ['Roadmapping', 'Communication'],
    difficulty: 'Foundation',
  },
  'User Research': {
    name: 'User Research',
    category: 'Design',
    description: 'The practice of studying users to inform design and product decisions.',
    keywords: ['persona', 'interview', 'journey map', 'usability test', 'survey', 'observation'],
    related: ['Wireframing', 'Prototyping', 'Accessibility'],
    difficulty: 'Core',
  },
  Roadmapping: {
    name: 'Roadmapping',
    category: 'Product',
    description: 'The practice of creating a visual plan for product direction and priorities.',
    keywords: ['milestone', 'Now/Next/Later', 'stakeholder', 'priority', 'timeline', 'vision'],
    related: ['Agile', 'Prioritization', 'Analytics'],
    difficulty: 'Core',
  },
  Analytics: {
    name: 'Analytics',
    category: 'Product',
    description: 'Measuring how users interact with a product to drive decisions.',
    keywords: ['funnel', 'retention', 'DAU', 'Mixpanel', 'conversion', 'cohort', 'event'],
    related: ['A/B Testing', 'SQL', 'Roadmapping'],
    difficulty: 'Core',
  },
  'Stakeholder Management': {
    name: 'Stakeholder Management',
    category: 'Product',
    description: 'Managing relationships and expectations of people affected by a project.',
    keywords: ['alignment', 'communication', 'expectation', 'cross-functional', 'trust', 'update'],
    related: ['Roadmapping', 'Communication', 'Agile'],
    difficulty: 'Advanced',
  },
  'A/B Testing': {
    name: 'A/B Testing',
    category: 'Product',
    description: 'Comparing two versions to determine which performs better.',
    keywords: ['control', 'variant', 'statistical significance', 'experiment', 'hypothesis'],
    related: ['Analytics', 'Statistics'],
    difficulty: 'Advanced',
  },
  Wireframing: {
    name: 'Wireframing',
    category: 'Design',
    description: 'Creating low-fidelity visual guides for layout and structure.',
    keywords: ['low-fidelity', 'high-fidelity', 'layout', 'structure', 'sketch', 'fidelity'],
    related: ['User Research', 'Prototyping', 'Figma'],
    difficulty: 'Core',
  },
  Prioritization: {
    name: 'Prioritization',
    category: 'Product',
    description: 'Deciding the order of work based on value and effort.',
    keywords: ['RICE', 'MoSCoW', 'impact', 'effort', 'value', 'matrix'],
    related: ['Roadmapping', 'Agile'],
    difficulty: 'Advanced',
  },
  Communication: {
    name: 'Communication',
    category: 'Product',
    description: 'The practice of sharing information clearly and effectively.',
    keywords: ['spec', 'stakeholder update', 'active listening', 'documentation', 'presentation'],
    related: ['Stakeholder Management', 'Agile'],
    difficulty: 'Foundation',
  },
  Figma: {
    name: 'Figma',
    category: 'Design Tools',
    description: 'A collaborative interface design tool for creating and prototyping UIs.',
    keywords: ['component', 'auto layout', 'prototype', 'variables', 'design system', 'frame'],
    related: ['Wireframing', 'Prototyping', 'Design Systems'],
    difficulty: 'Core',
  },
  Prototyping: {
    name: 'Prototyping',
    category: 'Design',
    description: 'Building interactive models of a product to test ideas before development.',
    keywords: ['clickable', 'fidelity', 'interactive', 'mockup', 'wireframe', 'user flow'],
    related: ['Figma', 'Wireframing', 'User Research'],
    difficulty: 'Advanced',
  },
  'Design Systems': {
    name: 'Design Systems',
    category: 'Design',
    description: 'A collection of reusable components and guidelines for consistency.',
    keywords: ['tokens', 'component library', 'Storybook', 'guidelines', 'consistency', 'theme'],
    related: ['Figma', 'Accessibility', 'Typography'],
    difficulty: 'Advanced',
  },
  'Interaction Design': {
    name: 'Interaction Design',
    category: 'Design',
    description: 'Designing how users interact with a product through behavior and feedback.',
    keywords: ['microinteraction', 'feedback', 'affordance', 'UX flow', 'gesture', 'animation'],
    related: ['Prototyping', 'Accessibility', 'Mobile UI'],
    difficulty: 'Advanced',
  },
  Typography: {
    name: 'Typography',
    category: 'Design',
    description: 'The art and technique of arranging type for readability and aesthetics.',
    keywords: ['type scale', 'kerning', 'line height', 'font pairing', 'serif', 'sans-serif'],
    related: ['Color Theory', 'Design Systems', 'Accessibility'],
    difficulty: 'Advanced',
  },
  'Color Theory': {
    name: 'Color Theory',
    category: 'Design',
    description: 'Guidelines for combining colors to create visually appealing designs.',
    keywords: ['complementary', 'contrast', 'palette', 'hue', 'saturation', 'analogous', 'triadic'],
    related: ['Typography', 'Accessibility', 'Design Systems'],
    difficulty: 'Advanced',
  },
  'Usability Testing': {
    name: 'Usability Testing',
    category: 'Design',
    description: 'Evaluating a product by testing it with real users to find usability issues.',
    keywords: ['task', 'think-aloud', 'metric', 'success rate', 'moderator', 'scenario'],
    related: ['User Research', 'Prototyping', 'Accessibility'],
    difficulty: 'Advanced',
  },
  Security: {
    name: 'Security',
    category: 'Security',
    description: 'Practices for protecting applications and data from threats.',
    keywords: ['encryption', 'OWASP', 'vulnerability', 'HTTPS', 'least privilege', 'XSS', 'SQL injection'],
    related: ['Authentication', 'Networking', 'REST APIs'],
    difficulty: 'Core',
  },
  PyTorch: {
    name: 'PyTorch',
    category: 'AI/ML',
    description: 'An open-source machine learning library by Meta with dynamic computation graphs.',
    keywords: ['tensor', 'autograd', 'dynamic graph', 'loss.backward', 'optimizer', 'dataloader'],
    related: ['Machine Learning', 'TensorFlow', 'Python'],
    difficulty: 'Advanced',
  },
  MLOps: {
    name: 'MLOps',
    category: 'AI/ML',
    description: 'Practices for deploying and maintaining ML models in production.',
    keywords: ['model serving', 'drift', 'feature store', 'pipeline', 'monitoring', 'retraining'],
    related: ['Machine Learning', 'Docker', 'Kubernetes'],
    difficulty: 'Advanced',
  },
  Azure: {
    name: 'Azure',
    category: 'Cloud',
    description: 'A cloud computing platform by Microsoft for building and hosting applications.',
    keywords: ['App Service', 'Functions', 'DevOps', 'Storage', 'Active Directory', 'AKS'],
    related: ['AWS', 'GCP', 'Terraform'],
    difficulty: 'Core',
  },
  GCP: {
    name: 'GCP',
    category: 'Cloud',
    description: 'Google Cloud Platform — a suite of cloud computing services by Google.',
    keywords: ['Compute Engine', 'Cloud Functions', 'BigQuery', 'GKE', 'Cloud Storage', 'Pub/Sub'],
    related: ['AWS', 'Azure', 'Kubernetes'],
    difficulty: 'Core',
  },
};

function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function pickN<T>(arr: T[], n: number): T[] {
  return shuffle(arr).slice(0, n);
}

function shuffleOptions(question: QuizQuestion): QuizQuestion {
  const indices = question.options.map((_, i) => i);
  const shuffled = shuffle(indices);
  const newOptions = shuffled.map((i) => question.options[i]);
  const newCorrect = shuffled.indexOf(question.correctIndex);
  return { ...question, options: newOptions, correctIndex: newCorrect };
}

function deduplicate(questions: QuizQuestion[]): QuizQuestion[] {
  const seen = new Set<string>();
  const result: QuizQuestion[] = [];
  for (const q of questions) {
    const key = q.question.toLowerCase().trim();
    if (!seen.has(key)) {
      seen.add(key);
      result.push(q);
    }
  }
  return result;
}

const MIN_QUESTIONS = 25;

function generateKeywordQuestions(meta: SkillMeta): QuizQuestion[] {
  const questions: QuizQuestion[] = [];
  const { name, keywords, related } = meta;

  for (const kw of keywords) {
    questions.push({
      question: `Which of the following is a key concept associated with ${name}?`,
      options: [kw, ...pickN(getDistractorKeywords(meta, 3), 3)],
      correctIndex: 0,
      type: 'single',
    });
  }

  for (const kw of keywords) {
    questions.push({
      question: `In ${name}, what does "${kw}" refer to?`,
      options: [
        `A core feature or concept within ${name}`,
        `A type of database query`,
        `A CSS layout property`,
        `A network routing protocol`,
      ],
      correctIndex: 0,
      type: 'single',
    });
  }

  for (const r of related) {
    questions.push({
      question: `Which technology is most closely related to ${name}?`,
      options: [r, ...pickN(getDistractorRelated(meta, 3), 3)],
      correctIndex: 0,
      type: 'single',
    });
  }

  return questions;
}

function getDistractorKeywords(meta: SkillMeta, count: number): string[] {
  const all: string[] = [];
  for (const [skill, m] of Object.entries(SKILL_META)) {
    if (skill !== meta.name) all.push(...m.keywords);
  }
  return pickN(all, count);
}

function getDistractorRelated(meta: SkillMeta, count: number): string[] {
  const all: string[] = [];
  for (const [skill, m] of Object.entries(SKILL_META)) {
    if (skill !== meta.name) all.push(m.name);
  }
  return pickN(all, count);
}

function generateConceptQuestions(meta: SkillMeta): QuizQuestion[] {
  const { name, category, description, difficulty } = meta;
  const questions: QuizQuestion[] = [];

  questions.push({
    question: `What category does ${name} belong to?`,
    options: [category, ...pickN(getDistractorCategories(3), 3)],
    correctIndex: 0,
    type: 'single',
  });

  questions.push({
    question: `What is ${name}?`,
    options: [
      description,
      'A type of database engine',
      'A CSS preprocessor',
      'A network monitoring tool',
    ],
    correctIndex: 0,
    type: 'single',
  });

  questions.push({
    question: `What is the primary difficulty level of ${name}?`,
    options: ['Foundation', 'Core', 'Advanced', 'Expert only'],
    correctIndex: ['Foundation', 'Core', 'Advanced'].indexOf(difficulty),
    type: 'single',
  });

  questions.push({
    question: `Which best describes the role of ${name} in a project?`,
    options: [
      description,
      'It manages database migrations',
      'It compiles CSS files',
      'It routes network traffic',
    ],
    correctIndex: 0,
    type: 'single',
  });

  questions.push({
    question: `${name} is primarily used for:`,
    options: [
      description,
      'Managing server hardware',
      'Designing print layouts',
      'Compressing images',
    ],
    correctIndex: 0,
    type: 'single',
  });

  return questions;
}

function getDistractorCategories(count: number): string[] {
  const cats = new Set<string>();
  for (const m of Object.values(SKILL_META)) cats.add(m.category);
  return pickN(Array.from(cats), count);
}

function generateTrueFalseQuestions(meta: SkillMeta): QuizQuestion[] {
  const { name, description, category, keywords, related } = meta;
  const questions: QuizQuestion[] = [];

  questions.push({
    question: `True or False: ${name} is described as "${description}"`,
    options: ['True', 'False', 'Not enough info', 'Only in certain contexts'],
    correctIndex: 0,
    type: 'single',
  });

  questions.push({
    question: `True or False: ${name} belongs to the "${category}" category.`,
    options: ['True', 'False', 'Only when used with React', 'Only in production'],
    correctIndex: 0,
    type: 'single',
  });

  for (const kw of keywords.slice(0, 5)) {
    questions.push({
      question: `True or False: "${kw}" is a key concept in ${name}.`,
      options: ['True', 'False', 'Only in advanced usage', 'Only in legacy code'],
      correctIndex: 0,
      type: 'single',
    });
  }

  for (const r of related.slice(0, 3)) {
    questions.push({
      question: `True or False: ${r} is commonly used alongside ${name}.`,
      options: ['True', 'False', 'Only in mobile apps', 'Only in enterprise'],
      correctIndex: 0,
      type: 'single',
    });
  }

  const otherSkills = Object.keys(SKILL_META).filter((s) => s !== name);
  for (const s of pickN(otherSkills, 3)) {
    questions.push({
      question: `True or False: ${s} is another name for ${name}.`,
      options: ['True', 'False', 'In some frameworks', 'Only in Python'],
      correctIndex: 1,
      type: 'single',
    });
  }

  return questions;
}

function generateScenarioQuestions(meta: SkillMeta): QuizQuestion[] {
  const { name, keywords, related } = meta;
  const questions: QuizQuestion[] = [];

  questions.push({
    question: `A team is starting a new project that requires ${name}. What should they learn first?`,
    options: [
      `The core concepts and fundamentals of ${name}`,
      'Advanced deployment strategies',
      'Database optimization techniques',
      'Network security protocols',
    ],
    correctIndex: 0,
    type: 'single',
  });

  questions.push({
    question: `When working with ${name}, which approach is best for beginners?`,
    options: [
      'Start with official documentation and tutorials',
      'Jump straight into production code',
      'Read the entire source code',
      'Memorize all API endpoints',
    ],
    correctIndex: 0,
    type: 'single',
  });

  questions.push({
    question: `If you encounter an error while using ${name}, what is the best first step?`,
    options: [
      'Read the error message and check the documentation',
      'Immediately rewrite all code',
      'Delete the project and start over',
      'Ignore it and hope it goes away',
    ],
    correctIndex: 0,
    type: 'single',
  });

  questions.push({
    question: `Which project would most likely use ${name}?`,
    options: [
      `A project requiring ${meta.category.toLowerCase()} capabilities`,
      'A project that only needs image editing',
      'A project focused on print media design',
      'A project about hardware repair',
    ],
    correctIndex: 0,
    type: 'single',
  });

  for (const kw of keywords.slice(0, 4)) {
    questions.push({
      question: `In a ${name} project, you need to work with "${kw}". What should you study?`,
      options: [
        `How ${kw} works within ${name}`,
        'Database indexing strategies',
        'CSS animation timing functions',
        'Server rack cooling systems',
      ],
      correctIndex: 0,
      type: 'single',
    });
  }

  return questions;
}

function generateComparisonQuestions(meta: SkillMeta): QuizQuestion[] {
  const { name } = meta;
  const others = Object.keys(SKILL_META).filter((s) => s !== name);
  const questions: QuizQuestion[] = [];

  for (const other of pickN(others, 5)) {
    const otherMeta = SKILL_META[other];
    questions.push({
      question: `Which statement correctly distinguishes ${name} from ${other}?`,
      options: [
        `${name}: ${meta.description.slice(0, 60)}... | ${other}: ${otherMeta.description.slice(0, 60)}...`,
        `${name} is newer than ${other}`,
        `${name} is always faster than ${other}`,
        `${name} and ${other} are the same thing`,
      ],
      correctIndex: 0,
      type: 'single',
    });
  }

  return questions;
}

function generateBestPracticeQuestions(meta: SkillMeta): QuizQuestion[] {
  const { name } = meta;
  const questions: QuizQuestion[] = [];

  questions.push({
    question: `What is a best practice when learning ${name}?`,
    options: [
      'Build small projects to practice real-world usage',
      'Memorize every function signature',
      'Avoid reading documentation',
      'Only watch videos without coding',
    ],
    correctIndex: 0,
    type: 'single',
  });

  questions.push({
    question: `When using ${name} in production, what is important?`,
    options: [
      'Testing, monitoring, and following community conventions',
      'Using as many features as possible',
      'Avoiding all third-party libraries',
      'Never updating dependencies',
    ],
    correctIndex: 0,
    type: 'single',
  });

  questions.push({
    question: `How should you stay current with ${name} best practices?`,
    options: [
      'Follow official blogs, changelogs, and community discussions',
      'Never look at updates after learning the basics',
      'Only rely on a single outdated tutorial',
      'Avoid community resources entirely',
    ],
    correctIndex: 0,
    type: 'single',
  });

  questions.push({
    question: `What is a common mistake beginners make with ${name}?`,
    options: [
      'Not understanding the fundamentals before advanced topics',
      'Reading too much documentation',
      'Writing too many tests',
      'Using version control too often',
    ],
    correctIndex: 0,
    type: 'single',
  });

  questions.push({
    question: `Which approach helps master ${name} most effectively?`,
    options: [
      'Consistent practice with progressively challenging projects',
      'Cramming all features in one session',
      'Only reading without coding',
      'Copying code without understanding it',
    ],
    correctIndex: 0,
    type: 'single',
  });

  return questions;
}

export function generateQuiz(skill: string, baseQuestions: QuizQuestion[]): QuizQuestion[] {
  const meta = SKILL_META[skill];
  if (!meta) return baseQuestions;

  const generated = [
    ...generateConceptQuestions(meta),
    ...generateKeywordQuestions(meta),
    ...generateTrueFalseQuestions(meta),
    ...generateScenarioQuestions(meta),
    ...generateComparisonQuestions(meta),
    ...generateBestPracticeQuestions(meta),
  ];

  const combined = deduplicate([...baseQuestions, ...generated]);

  const selected = combined.slice(0, Math.max(MIN_QUESTIONS, Math.min(combined.length, 30)));

  return selected.map(shuffleOptions);
}
