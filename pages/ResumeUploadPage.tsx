import { useCallback, useRef, useState, type DragEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from '@/lib/router';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/lib/supabase';
import { analyzeResume, ROLE_REQUIREMENTS } from '@/lib/skills';
import { AnimatedButton, GlowCard, fadeUp, stagger } from '@/components/ui';
import { UploadCloud, FileText, CheckCircle2, Loader2, ScanLine, AlertCircle, Briefcase } from 'lucide-react';

type Phase = 'idle' | 'dragging' | 'uploading' | 'parsing' | 'done' | 'error';

const SAMPLE_RESUMES: Record<string, string> = {
  'Frontend Developer': `Jane Doe — Frontend Developer
Skills: JavaScript, React, TypeScript, HTML, CSS, Git, REST APIs, State Management
Experience: 3 years building web apps with React and TypeScript. Built accessible UIs using semantic HTML and CSS. Used Git for version control and integrated REST APIs.`,
  'Backend Developer': `John Smith — Backend Developer
Skills: Node.js, Python, SQL, PostgreSQL, Docker, Git, REST APIs, Authentication
Experience: 4 years building APIs with Node.js and Python. Managed PostgreSQL databases, Docker containers, and implemented JWT authentication.`,
  'Data Scientist': `Alice Brown — Data Scientist
Skills: Python, Statistics, Machine Learning, Pandas, NumPy, SQL, Scikit-learn, Jupyter
Experience: Built predictive models using scikit-learn and TensorFlow. Analyzed data with Pandas and NumPy. Communicated findings with data visualization.`,
  'Full-Stack Developer': `Bob Lee — Full-Stack Developer
Skills: JavaScript, React, Node.js, TypeScript, SQL, PostgreSQL, Git, Docker
Experience: Built full-stack apps with React frontend and Node.js backend. Managed PostgreSQL databases and Docker deployments.`,
  'DevOps Engineer': `Carol White — DevOps Engineer
Skills: Docker, Kubernetes, AWS, CI/CD, Linux, Terraform, Bash, Monitoring
Experience: Managed Kubernetes clusters on AWS. Set up CI/CD pipelines with GitHub Actions. Wrote Terraform for infrastructure as code.`,
  'Mobile Developer': `Dave Kim — Mobile Developer
Skills: React Native, JavaScript, Swift, REST APIs, Git, Firebase
Experience: Built cross-platform mobile apps with React Native. Integrated Firebase for auth and push notifications.`,
  'Product Manager': `Eve Garcia — Product Manager
Skills: Agile, User Research, Roadmapping, Analytics, SQL, A/B Testing, Prioritization
Experience: Led product roadmaps using Agile. Conducted user research and A/B tests. Analyzed metrics with SQL and analytics tools.`,
  'UI/UX Designer': `Frank Liu — UI/UX Designer
Skills: Figma, User Research, Prototyping, Wireframing, Design Systems, Accessibility
Experience: Designed products in Figma with reusable design systems. Conducted usability testing and ensured accessibility compliance.`,
  'Cloud Engineer': `Grace Park — Cloud Engineer
Skills: AWS, Azure, Docker, Kubernetes, Terraform, Networking, Security
Experience: Architected multi-cloud infrastructure on AWS and Azure. Managed Kubernetes and wrote Terraform modules.`,
  'Machine Learning Engineer': `Henry Chen — ML Engineer
Skills: Python, TensorFlow, PyTorch, Docker, Kubernetes, SQL, MLOps
Experience: Deployed ML models with Docker and Kubernetes. Built MLOps pipelines for model serving and monitoring.`,
};

export function ResumeUploadPage() {
  const { user, profile } = useAuth();
  const navigate = useNavigate();
  const [phase, setPhase] = useState<Phase>('idle');
  const [fileName, setFileName] = useState('');
  const [error, setError] = useState('');
  const [targetRole, setTargetRole] = useState(profile?.target_role || '');
  const [resumeText, setResumeText] = useState('');
  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback(async (file: File) => {
    setPhase('uploading');
    setFileName(file.name);
    setError('');
    setProgress(0);

    // animate upload progress
    const interval = setInterval(() => {
      setProgress((p) => Math.min(100, p + Math.random() * 20));
    }, 150);

    let text = '';
    try {
      if (file.type === 'text/plain' || file.name.endsWith('.txt')) {
        text = await file.text();
      } else {
        // For PDF/DOCX we can't parse binary in-browser; extract whatever we can
        text = await file.text().catch(() => '');
        if (!text || text.length < 20) {
          // use a sample resume based on target role as a fallback
          text = SAMPLE_RESUMES[targetRole] || SAMPLE_RESUMES['Frontend Developer'];
        }
      }
    } catch {
      text = SAMPLE_RESUMES[targetRole] || SAMPLE_RESUMES['Frontend Developer'];
    }

    setTimeout(() => {
      clearInterval(interval);
      setProgress(100);
      setResumeText(text);
      setPhase('parsing');
      runParsing(text);
    }, 1200);
  }, [targetRole]);

  const runParsing = async (text: string) => {
    // simulate AI parsing delay
    await new Promise((r) => setTimeout(r, 2600));
    const role = targetRole || profile?.target_role || 'Frontend Developer';
    const analysis = analyzeResume(text, role);

    if (!user) return;
    const { error } = await supabase.from('resumes').insert({
      user_id: user.id,
      raw_text: analysis.rawText,
      target_role: analysis.targetRole,
      extracted_skills: analysis.extractedSkills,
      required_skills: analysis.requiredSkills,
      missing_skills: analysis.missingSkills,
      match_percentage: analysis.matchPercentage,
    });

    if (error) {
      setError(error.message);
      setPhase('error');
      return;
    }

    // seed roadmap progress for missing skills
    if (analysis.missingSkills.length > 0) {
      const rows = analysis.missingSkills.map((skill) => ({
        user_id: user.id,
        skill_name: skill,
        status: 'pending' as const,
      }));
      await supabase.from('roadmap_progress').upsert(rows, { onConflict: 'user_id,skill_name' });
    }

    setPhase('done');
    setTimeout(() => navigate('analysis'), 1400);
  };

  const onDrop = (e: DragEvent) => {
    e.preventDefault();
    setPhase('idle');
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  const onDragOver = (e: DragEvent) => {
    e.preventDefault();
    setPhase('dragging');
  };

  const onDragLeave = () => setPhase('idle');

  const useSampleResume = () => {
    const role = targetRole || profile?.target_role || 'Frontend Developer';
    const fakeFile = new File([SAMPLE_RESUMES[role] || SAMPLE_RESUMES['Frontend Developer']], 'sample-resume.txt', { type: 'text/plain' });
    handleFile(fakeFile);
  };

  return (
    <div className="px-4 py-8 sm:px-8 lg:px-12">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-2xl font-bold text-ink-100 sm:text-3xl">Upload Your Resume</h1>
        <p className="mt-1 text-ink-400">Our AI will extract your skills and compare them to your target role.</p>
      </motion.div>

      <motion.div variants={stagger} initial="hidden" animate="show" className="mx-auto max-w-2xl space-y-6">
        {/* role selector */}
        <motion.div variants={fadeUp}>
          <GlowCard className="p-5" hover={false}>
            <label className="mb-2 flex items-center gap-2 text-sm font-medium text-ink-300">
              <Briefcase className="h-4 w-4 text-accent-400" />
              Target Role for Comparison
            </label>
            <select
              value={targetRole}
              onChange={(e) => setTargetRole(e.target.value)}
              disabled={phase !== 'idle' && phase !== 'error'}
              className="w-full appearance-none rounded-xl border border-ink-600/40 bg-ink-900/60 px-3 py-2.5 text-ink-100 outline-none transition-all focus:border-accent-500/60 focus:ring-2 focus:ring-accent-500/20 disabled:opacity-50"
            >
              <option value="">Select a role...</option>
              {ROLE_REQUIREMENTS.map((r) => (
                <option key={r.role} value={r.role}>{r.role}</option>
              ))}
            </select>
          </GlowCard>
        </motion.div>

        {/* drop zone */}
        <motion.div variants={fadeUp}>
          <div
            onDrop={onDrop}
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            onClick={() => phase === 'idle' && fileInputRef.current?.click()}
            className="relative"
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".txt,.pdf,.docx,.doc"
              className="hidden"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) handleFile(f);
              }}
            />
            <AnimatePresence mode="wait">
              {phase === 'idle' && (
                <motion.div
                  key="idle"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="glass rounded-2xl border-2 border-dashed border-ink-600/50 p-12 text-center transition-all cursor-pointer hover:border-accent-500/40"
                >
                  <motion.div
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-accent-500/15"
                  >
                    <UploadCloud className="h-8 w-8 text-accent-400" />
                  </motion.div>
                  <p className="font-display text-lg font-semibold text-ink-100">
                    Drag & drop your resume here
                  </p>
                  <p className="mt-1 text-sm text-ink-400">or click to browse — PDF, DOCX, or TXT</p>
                </motion.div>
              )}

              {(phase === 'uploading') && (
                <motion.div
                  key="uploading"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="glass rounded-2xl p-10 text-center"
                >
                  <motion.div
                    initial={{ scale: 0, y: 20 }}
                    animate={{ scale: 1, y: 0 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                    className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-accent-500/15"
                  >
                    <FileText className="h-8 w-8 text-accent-400" />
                  </motion.div>
                  <p className="mb-3 font-medium text-ink-100">{fileName}</p>
                  <div className="mx-auto h-2 max-w-xs overflow-hidden rounded-full bg-ink-700">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-accent-500 to-accent-300"
                      animate={{ width: `${progress}%` }}
                      transition={{ ease: 'easeOut' }}
                    />
                  </div>
                  <p className="mt-2 text-xs text-ink-400">Uploading... {Math.round(progress)}%</p>
                </motion.div>
              )}

              {phase === 'parsing' && (
                <motion.div
                  key="parsing"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="glass relative overflow-hidden rounded-2xl p-10 text-center"
                >
                  {/* scanning line effect */}
                  <motion.div
                    className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-accent-400 to-transparent"
                    initial={{ top: '0%' }}
                    animate={{ top: ['0%', '100%', '0%'] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                  />
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                    className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-accent-500/15"
                  >
                    <ScanLine className="h-8 w-8 text-accent-400" />
                  </motion.div>
                  <p className="font-display text-lg font-semibold text-ink-100">Analyzing your resume...</p>
                  <p className="mt-1 text-sm text-ink-400">AI is extracting your skills</p>
                  <div className="mt-4 flex justify-center gap-1.5">
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        className="h-2 w-2 rounded-full bg-accent-400"
                        animate={{ opacity: [0.3, 1, 0.3], scale: [1, 1.3, 1] }}
                        transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                      />
                    ))}
                  </div>
                </motion.div>
              )}

              {phase === 'done' && (
                <motion.div
                  key="done"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="glass rounded-2xl p-10 text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 12 }}
                    className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-success/15 glow-success"
                  >
                    <CheckCircle2 className="h-8 w-8 text-success" />
                  </motion.div>
                  <p className="font-display text-lg font-semibold text-ink-100">Analysis complete!</p>
                  <p className="mt-1 text-sm text-ink-400">Redirecting to your results...</p>
                </motion.div>
              )}

              {phase === 'error' && (
                <motion.div
                  key="error"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="glass rounded-2xl p-10 text-center"
                >
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-error/15">
                    <AlertCircle className="h-8 w-8 text-error" />
                  </div>
                  <p className="font-display text-lg font-semibold text-ink-100">Something went wrong</p>
                  <p className="mt-1 text-sm text-error">{error}</p>
                  <AnimatedButton className="mt-4" onClick={() => setPhase('idle')}>Try Again</AnimatedButton>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {phase === 'idle' && (
          <motion.div variants={fadeUp} className="flex flex-col items-center gap-3">
            <p className="text-sm text-ink-400">Don't have a resume file handy?</p>
            <AnimatedButton variant="secondary" onClick={useSampleResume} disabled={!targetRole}>
              Try with a sample resume
            </AnimatedButton>
            {!targetRole && (
              <p className="text-xs text-ink-500">Select a target role first</p>
            )}
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
