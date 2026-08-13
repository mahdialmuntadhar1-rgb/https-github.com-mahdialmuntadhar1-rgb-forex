import React, { useState, useEffect } from 'react';
import { useTranslation } from '../context/LanguageContext';
import { contentService } from '../services/contentApi';
import { Course, CourseLesson } from '../types';
import { 
  BookOpen, 
  CheckCircle2, 
  Play, 
  ShieldCheck, 
  Sparkles, 
  Target, 
  Award, 
  ChevronRight,
  ArrowRight,
  Clock,
  HelpCircle
} from 'lucide-react';

export const EducationPage: React.FC = () => {
  const { t, direction } = useTranslation();
  const [courses, setCourses] = useState<Course[]>([]);
  const [activeCourse, setActiveCourse] = useState<Course | null>(null);
  const [activeLesson, setActiveLesson] = useState<CourseLesson | null>(null);
  const [completedLessonIds, setCompletedLessonIds] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<'courses' | 'checklist' | 'glossary' | 'quiz'>('courses');

  // Quiz state
  const [quizIndex, setQuizIndex] = useState(0);
  const [selectedQuizOption, setSelectedQuizOption] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState(0);

  useEffect(() => {
    const loadCourses = async () => {
      const data = await contentService.getCourses();
      setCourses(data);
      if (data.length > 0) {
        setActiveCourse(data[0]);
        if (data[0].lessons && data[0].lessons.length > 0) {
          setActiveLesson(data[0].lessons[0]);
        }
      }
    };
    loadCourses();
  }, []);

  const handleSelectCourse = (course: Course) => {
    setActiveCourse(course);
    if (course.lessons && course.lessons.length > 0) {
      setActiveLesson(course.lessons[0]);
    }
  };

  const handleToggleLessonComplete = (lessonId: string) => {
    if (completedLessonIds.includes(lessonId)) {
      setCompletedLessonIds(completedLessonIds.filter(id => id !== lessonId));
    } else {
      setCompletedLessonIds([...completedLessonIds, lessonId]);
    }
  };

  const sampleQuiz = [
    {
      question: 'What is the primary driver of institutional Gold (XAU/USD) trends over medium-to-long horizons?',
      options: [
        'Short-term technical candlestick wicks on 5-minute charts',
        'US Real Yields (10-Year TIPS) and broader central bank reserve diversification',
        'Crypto market volume and retail sentiment meters',
        'Social media momentum indicators'
      ],
      correct: 1,
      explanation: 'Gold is fundamentally non-yielding. When US Real Yields fall, the opportunity cost of holding physical gold decreases, driving institutional capital allocation into precious metals.'
    },
    {
      question: 'When trading London / New York market session overlaps, why is liquidity highest?',
      options: [
        'Retail day traders are all awake at the same time',
        'Interbank market-makers in both London and New York are actively quoting bid-ask spreads',
        'Central banks issue interest rate decisions every hour',
        'Spreads are fixed by international financial treaties'
      ],
      correct: 1,
      explanation: 'The 12:00 to 16:00 UTC window represents the intersection of the worlds two largest foreign exchange dealing hubs, concentrating global commercial and institutional flow.'
    },
    {
      question: 'What constitutes a disciplined risk management model on any single setup?',
      options: [
        'Risking 10% to 20% of account balance to achieve fast compounding',
        'Never using stop losses because price always returns eventually',
        'Strictly capping capital at risk between 1.0% to 2.0% with predefined invalidation price levels',
        'Doubling lot size every time a loss occurs (Martingale)'
      ],
      correct: 2,
      explanation: 'Institutional longevity is rooted in asymmetric mathematics. Risking 1-2% prevents catastrophic drawdowns and ensures survivability across hundreds of trade iterations.'
    }
  ];

  const glossaryTerms = [
    { term: 'Liquidity Pool', definition: 'Clusters of accumulated stop-loss and pending limit orders above key highs and below key swing lows where institutional orders find matching volume.' },
    { term: 'Fair Value Gap (FVG)', definition: 'A 3-candle price imbalance created by aggressive one-sided institutional buying or selling where one price tier was skipped.' },
    { term: 'COT Report (Commitments of Traders)', definition: 'Weekly regulatory filing by the CFTC disclosing aggregate long/short positioning of commercial vs. non-commercial institutional speculators.' },
    { term: 'Economic Calendar Consensus', definition: 'The aggregated median forecast among institutional economists for upcoming macroeconomic metrics (e.g. CPI, NFP).' },
    { term: 'Real Yields (TIPS)', definition: 'Nominal bond interest rates minus expected inflation rates. A primary fundamental driver of physical gold demand and valuation.' },
    { term: 'Order Block (OB)', definition: 'A specific institutional price footprint created by large block transactions preceding significant market momentum.' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header Banner */}
      <div className="bg-[#0F2236] border border-[#1E3A57] rounded-3xl p-6 sm:p-10 space-y-4 shadow-xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2163CC]/15 border border-[#2163CC]/30 text-[#2163CC] text-xs font-mono font-bold">
          <BookOpen size={14} /> Profit Point Academy
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
          {t('academy.title')} & Strategy Mastery
        </h1>
        <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
          Structured curriculum covering macro drivers, price delivery mechanics, multi-timeframe chart architecture, and mathematical risk management.
        </p>

        {/* Tab Navigation */}
        <div className="flex flex-wrap items-center gap-2 pt-2">
          <button
            onClick={() => setActiveTab('courses')}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-medium transition cursor-pointer flex items-center gap-2 ${
              activeTab === 'courses'
                ? 'bg-[#2163CC] text-white shadow-md shadow-[#2163CC]/20 font-bold'
                : 'bg-[#0B1C2D] text-slate-300 hover:text-white border border-[#1E3A57]'
            }`}
          >
            <BookOpen size={14} /> Course Curriculum
          </button>
          <button
            onClick={() => setActiveTab('checklist')}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-medium transition cursor-pointer flex items-center gap-2 ${
              activeTab === 'checklist'
                ? 'bg-[#2163CC] text-white shadow-md shadow-[#2163CC]/20 font-bold'
                : 'bg-[#0B1C2D] text-slate-300 hover:text-white border border-[#1E3A57]'
            }`}
          >
            <ShieldCheck size={14} /> Pre-Trade Checklist
          </button>
          <button
            onClick={() => setActiveTab('glossary')}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-medium transition cursor-pointer flex items-center gap-2 ${
              activeTab === 'glossary'
                ? 'bg-[#2163CC] text-white shadow-md shadow-[#2163CC]/20 font-bold'
                : 'bg-[#0B1C2D] text-slate-300 hover:text-white border border-[#1E3A57]'
            }`}
          >
            <Sparkles size={14} /> Institutional Glossary
          </button>
          <button
            onClick={() => setActiveTab('quiz')}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-medium transition cursor-pointer flex items-center gap-2 ${
              activeTab === 'quiz'
                ? 'bg-[#2163CC] text-white shadow-md shadow-[#2163CC]/20 font-bold'
                : 'bg-[#0B1C2D] text-slate-300 hover:text-white border border-[#1E3A57]'
            }`}
          >
            <Award size={14} /> Knowledge Assessment
          </button>
        </div>
      </div>

      {/* 1. COURSES CURRICULUM VIEW */}
      {activeTab === 'courses' && activeCourse && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Course Selector & Lessons List */}
          <div className="lg:col-span-4 space-y-6">
            {/* Courses Selector */}
            <div className="space-y-2">
              <h3 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
                Select Track
              </h3>
              <div className="space-y-2">
                {courses.map(crs => (
                  <button
                    key={crs.id}
                    onClick={() => handleSelectCourse(crs)}
                    className={`w-full p-3.5 rounded-xl border text-start transition cursor-pointer flex items-center justify-between ${
                      activeCourse.id === crs.id
                        ? 'bg-[#132A42] border-[#2163CC] text-white shadow-sm'
                        : 'bg-[#0F2236] border-[#1E3A57] text-slate-300 hover:bg-[#132A42]'
                    }`}
                  >
                    <div>
                      <div className="text-[10px] font-mono text-[#2163CC] font-bold uppercase">
                        {crs.level}
                      </div>
                      <div className="font-bold text-sm text-white">{crs.title}</div>
                    </div>
                    <span className="text-xs font-mono text-slate-400">{crs.lessonsCount} lessons</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Lessons Navigation for Active Course */}
            <div className="bg-[#0F2236] border border-[#1E3A57] rounded-2xl p-4 space-y-3">
              <div className="flex items-center justify-between border-b border-[#1E3A57] pb-2">
                <h4 className="font-bold text-white text-sm">{activeCourse.title}</h4>
                <span className="text-xs font-mono text-[#2163CC] font-bold">
                  {completedLessonIds.length} completed
                </span>
              </div>

              <div className="space-y-1.5">
                {activeCourse.lessons?.map((lesson, idx) => {
                  const isCurrent = activeLesson?.id === lesson.id;
                  const isDone = completedLessonIds.includes(lesson.id);

                  return (
                    <button
                      key={lesson.id}
                      onClick={() => setActiveLesson(lesson)}
                      className={`w-full p-2.5 rounded-lg text-start text-xs transition cursor-pointer flex items-center justify-between ${
                        isCurrent
                          ? 'bg-[#2163CC] text-white font-semibold'
                          : 'text-slate-300 hover:bg-[#132A42]'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[11px] opacity-70">
                          0{idx + 1}.
                        </span>
                        <span className="truncate max-w-[180px]">{lesson.title}</span>
                      </div>
                      <div className="flex items-center gap-2 font-mono text-[10px]">
                        <span>{lesson.duration}</span>
                        {isDone && <CheckCircle2 size={13} className="text-emerald-400" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Lesson Viewer */}
          <div className="lg:col-span-8 space-y-6">
            {activeLesson ? (
              <div className="bg-[#0F2236] border border-[#1E3A57] rounded-2xl p-6 sm:p-8 shadow-xl space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#1E3A57] pb-4">
                  <div>
                    <div className="text-xs font-mono text-[#2163CC] font-bold uppercase mb-1">
                      {activeCourse.level} Track • Module {activeLesson.order || 1}
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                      {activeLesson.title}
                    </h2>
                  </div>

                  <button
                    onClick={() => handleToggleLessonComplete(activeLesson.id)}
                    className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition flex items-center gap-2 cursor-pointer ${
                      completedLessonIds.includes(activeLesson.id)
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                        : 'bg-[#2163CC] hover:bg-[#1855B5] text-white shadow-md'
                    }`}
                  >
                    <CheckCircle2 size={15} />
                    <span>{completedLessonIds.includes(activeLesson.id) ? 'Completed' : 'Mark as Completed'}</span>
                  </button>
                </div>

                {/* Lesson Body */}
                <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed">
                  {activeLesson.content.split('\n\n').map((p, idx) => (
                    <p key={idx}>{p}</p>
                  ))}
                </div>

                {/* Key Takeaways */}
                {activeLesson.keyTakeaways && (
                  <div className="p-5 rounded-2xl bg-[#0B1C2D] border border-[#1E3A57] space-y-3">
                    <h4 className="font-mono font-bold text-xs text-[#2163CC] uppercase tracking-wider flex items-center gap-2">
                      <Target size={15} /> Key Strategic Takeaways
                    </h4>
                    <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
                      {activeLesson.keyTakeaways.map((takeaway, i) => (
                        <li key={i} className="flex items-start gap-2.5">
                          <CheckCircle2 size={15} className="text-[#2163CC] shrink-0 mt-0.5" />
                          <span>{takeaway}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ) : (
              <div className="p-12 text-center text-slate-500">
                Select a lesson to begin learning.
              </div>
            )}
          </div>
        </div>
      )}

      {/* 2. PRE-TRADE CHECKLIST VIEW */}
      {activeTab === 'checklist' && (
        <div className="max-w-4xl mx-auto bg-[#0F2236] border border-[#1E3A57] rounded-3xl p-6 sm:p-10 shadow-2xl space-y-8">
          <div className="space-y-2">
            <h2 className="text-2xl font-extrabold text-white font-mono">
              Institutional Pre-Execution Protocol
            </h2>
            <p className="text-sm text-slate-400 leading-relaxed">
              Never enter a position unless every criteria is strictly checked. Professional trading is a game of probability and discipline.
            </p>
          </div>

          <div className="space-y-4">
            {[
              { title: 'Higher Timeframe Trend Confluence', desc: 'Is the trade aligned with the Daily and 4-Hour structural momentum?' },
              { title: 'Liquidity Pool Sweep', desc: 'Has the market recently cleared buy-side or sell-side retail liquidity?' },
              { title: 'Session Timing Filter', desc: 'Is the current time within London Open (07:00-10:00 UTC) or New York Open (12:00-16:00 UTC)?' },
              { title: 'Economic Release Proximity', desc: 'Are there any High-Impact Tier-1 news releases scheduled in the next 30 minutes?' },
              { title: 'Mathematical Risk Assessment', desc: 'Is total risk capped at strictly 1% - 2% of equity with an explicit stop-loss orders in place?' },
              { title: 'Risk-to-Reward Verification', desc: 'Does the primary target offer at least 1:2 risk-to-reward to the first structural barrier?' }
            ].map((item, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-[#0B1C2D] border border-[#1E3A57] flex items-start gap-3">
                <input
                  type="checkbox"
                  id={`chk-${idx}`}
                  className="w-5 h-5 rounded-md text-[#2163CC] bg-[#0B1C2D] border-[#1E3A57] mt-0.5 cursor-pointer accent-[#2163CC]"
                />
                <label htmlFor={`chk-${idx}`} className="cursor-pointer space-y-0.5">
                  <div className="font-bold text-white text-sm">{item.title}</div>
                  <div className="text-xs text-slate-400">{item.desc}</div>
                </label>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. GLOSSARY VIEW */}
      {activeTab === 'glossary' && (
        <div className="space-y-6">
          <div className="border-b border-[#1E3A57] pb-4">
            <h2 className="text-2xl font-extrabold text-white font-mono">
              Institutional FX & Macro Glossary
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Authoritative definitions for institutional concepts and technical terminology.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {glossaryTerms.map((g, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-[#0F2236] border border-[#1E3A57] space-y-2">
                <h4 className="font-mono font-bold text-[#2163CC] text-sm">{g.term}</h4>
                <p className="text-xs text-slate-300 leading-relaxed">{g.definition}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. QUIZ VIEW */}
      {activeTab === 'quiz' && (
        <div className="max-w-3xl mx-auto bg-[#0F2236] border border-[#1E3A57] rounded-3xl p-6 sm:p-10 shadow-2xl space-y-6">
          <div className="flex items-center justify-between border-b border-[#1E3A57] pb-4">
            <span className="text-xs font-mono text-[#2163CC] font-bold uppercase">
              Question {quizIndex + 1} of {sampleQuiz.length}
            </span>
            <span className="text-xs font-mono text-slate-400">Score: {quizScore}</span>
          </div>

          <h3 className="text-lg sm:text-xl font-bold text-white leading-snug">
            {sampleQuiz[quizIndex].question}
          </h3>

          <div className="space-y-3">
            {sampleQuiz[quizIndex].options.map((opt, optIdx) => {
              const isSelected = selectedQuizOption === optIdx;
              const isCorrect = sampleQuiz[quizIndex].correct === optIdx;

              let btnStyle = 'bg-[#0B1C2D] border-[#1E3A57] text-slate-300 hover:bg-[#132A42]';
              if (quizSubmitted) {
                if (isCorrect) {
                  btnStyle = 'bg-emerald-950/40 border-emerald-500 text-emerald-300 font-bold';
                } else if (isSelected) {
                  btnStyle = 'bg-rose-950/40 border-rose-500 text-rose-300';
                }
              } else if (isSelected) {
                btnStyle = 'bg-[#2163CC]/20 border-[#2163CC] text-white font-bold';
              }

              return (
                <button
                  key={optIdx}
                  disabled={quizSubmitted}
                  onClick={() => setSelectedQuizOption(optIdx)}
                  className={`w-full p-4 rounded-xl border text-start text-xs sm:text-sm transition cursor-pointer flex items-center justify-between ${btnStyle}`}
                >
                  <span>{opt}</span>
                  {quizSubmitted && isCorrect && <CheckCircle2 size={16} className="text-emerald-400" />}
                </button>
              );
            })}
          </div>

          {quizSubmitted && (
            <div className="p-4 rounded-xl bg-[#0B1C2D] border border-[#1E3A57] text-xs text-slate-300 leading-relaxed space-y-1">
              <strong className="text-[#2163CC] block font-mono">Explanation:</strong>
              {sampleQuiz[quizIndex].explanation}
            </div>
          )}

          <div className="flex items-center justify-end pt-4 border-t border-[#1E3A57]">
            {!quizSubmitted ? (
              <button
                disabled={selectedQuizOption === null}
                onClick={() => {
                  if (selectedQuizOption !== null) {
                    setQuizSubmitted(true);
                    if (selectedQuizOption === sampleQuiz[quizIndex].correct) {
                      setQuizScore(s => s + 1);
                    }
                  }
                }}
                className="px-5 py-2.5 rounded-xl bg-[#2163CC] hover:bg-[#1855B5] disabled:opacity-50 text-white font-mono text-xs font-bold transition cursor-pointer"
              >
                Submit Answer
              </button>
            ) : (
              <button
                onClick={() => {
                  if (quizIndex < sampleQuiz.length - 1) {
                    setQuizIndex(i => i + 1);
                    setSelectedQuizOption(null);
                    setQuizSubmitted(false);
                  } else {
                    setQuizIndex(0);
                    setSelectedQuizOption(null);
                    setQuizSubmitted(false);
                    setQuizScore(0);
                  }
                }}
                className="px-5 py-2.5 rounded-xl bg-[#2163CC] hover:bg-[#1855B5] text-white font-mono text-xs font-bold transition cursor-pointer"
              >
                {quizIndex < sampleQuiz.length - 1 ? 'Next Question →' : 'Restart Quiz'}
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
