import React, { useState, useEffect } from 'react';
import { useTranslation } from '../context/LanguageContext';
import { Course, CourseLesson } from '../types';
import { contentService } from '../services/contentApi';
import { 
  BookOpen, 
  CheckCircle2, 
  Clock, 
  Award, 
  PlayCircle, 
  HelpCircle, 
  ChevronRight, 
  ShieldCheck,
  Zap,
  Target,
  Sparkles,
  ArrowRight
} from 'lucide-react';

interface EducationPageProps {
  onNavigate: (path: string) => void;
  selectedCourseId?: string;
}

export const EducationPage: React.FC<EducationPageProps> = ({ onNavigate, selectedCourseId }) => {
  const { t, direction } = useTranslation();
  const [courses, setCourses] = useState<Course[]>([]);
  const [activeCourse, setActiveCourse] = useState<Course | null>(null);
  const [activeLesson, setActiveLesson] = useState<CourseLesson | null>(null);
  const [activeTab, setActiveTab] = useState<'courses' | 'glossary' | 'checklist' | 'quiz'>('courses');
  const [completedLessonIds, setCompletedLessonIds] = useState<string[]>([]);
  
  // Interactive Quiz State
  const [quizIndex, setQuizIndex] = useState(0);
  const [selectedQuizOption, setSelectedQuizOption] = useState<number | null>(null);
  const [quizScore, setQuizScore] = useState(0);
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  useEffect(() => {
    const load = async () => {
      const all = await contentService.getCourses();
      setCourses(all);
      if (selectedCourseId) {
        const found = all.find(c => c.id === selectedCourseId);
        if (found) {
          setActiveCourse(found);
          if (found.lessons && found.lessons.length > 0) {
            setActiveLesson(found.lessons[0]);
          }
        }
      } else if (all.length > 0) {
        setActiveCourse(all[0]);
        if (all[0].lessons && all[0].lessons.length > 0) {
          setActiveLesson(all[0].lessons[0]);
        }
      }
    };
    load();
  }, [selectedCourseId]);

  const handleSelectCourse = (course: Course) => {
    setActiveCourse(course);
    if (course.lessons && course.lessons.length > 0) {
      setActiveLesson(course.lessons[0]);
    }
  };

  const handleToggleLessonComplete = (lessonId: string) => {
    setCompletedLessonIds(prev => 
      prev.includes(lessonId) ? prev.filter(id => id !== lessonId) : [...prev, lessonId]
    );
  };

  // Sample Quiz Data
  const sampleQuiz = [
    {
      question: 'What is the institutional standard for maximum risk per trade for disciplined traders?',
      options: ['5% to 10% of total capital', '1% to 2% of total capital', '20% to maximize leverage', '0.05% without stops'],
      correct: 1,
      explanation: 'Institutional risk guidelines mandate risking no more than 1% to 2% of net liquidating value per single trade idea to ensure statistical survival over large trade samples.'
    },
    {
      question: 'Which trading session exhibits the highest liquidity and trading volume in the FX market?',
      options: ['Asian (Tokyo) Session', 'Sydney Session', 'London / New York Session Overlap', 'Weekend Interbank'],
      correct: 2,
      explanation: 'The London & New York session overlap (typically 12:00 PM – 4:00 PM UTC) accounts for the largest fraction of global FX and Gold daily turnover.'
    },
    {
      question: 'In Gold (XAU/USD) analysis, what is the typical historical correlation with US 10-Year Real Yields (TIPS)?',
      options: ['Strong Inverse (Negative) correlation', 'Strong Direct (Positive) correlation', 'No relationship', 'Random correlation'],
      correct: 0,
      explanation: 'Because physical Gold yields zero cash dividends, its opportunity cost falls when real yields decline, historically giving Gold a strong inverse relationship with TIPS yields.'
    }
  ];

  const glossaryTerms = [
    { term: 'Pip (Price Interest Point)', definition: 'The standardized unit of measure to express the change in value between two currencies. For most pairs, 1 pip = 0.0001.' },
    { term: 'Liquidity Pool', definition: 'Clusters of accumulated stop-loss and pending limit orders situated above swing highs and beneath swing lows targeted by institutional market makers.' },
    { term: 'Risk-to-Reward (R:R)', definition: 'The ratio of prospective profit compared to the defined stop-loss risk. Institutional minimum standard is generally 1:2 or better.' },
    { term: 'Economic Calendar Consensus', definition: 'The aggregated median forecast among institutional economists for upcoming macroeconomic metrics (e.g. CPI, NFP).' },
    { term: 'Real Yields (TIPS)', definition: 'Nominal bond interest rates minus expected inflation rates. A primary fundamental driver of physical gold demand and valuation.' },
    { term: 'Order Block (OB)', definition: 'A specific institutional price footprint created by large block transactions preceding significant market momentum.' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-purple-950/30 via-slate-900 to-slate-950 border border-purple-500/20 rounded-3xl p-6 sm:p-10 space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-mono">
          <BookOpen size={14} /> Vanguard Trading Academy
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-100 tracking-tight">
          {t('academy.title')} & Strategy Mastery
        </h1>
        <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
          Structured curriculum covering macro drivers, price delivery algorithms, multi-timeframe chart architecture, and mathematical risk management.
        </p>

        {/* Tab Navigation */}
        <div className="flex flex-wrap items-center gap-2 pt-2">
          <button
            onClick={() => setActiveTab('courses')}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-medium transition cursor-pointer flex items-center gap-2 ${
              activeTab === 'courses'
                ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/20 font-bold'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <BookOpen size={14} /> Course Curriculum
          </button>
          <button
            onClick={() => setActiveTab('checklist')}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-medium transition cursor-pointer flex items-center gap-2 ${
              activeTab === 'checklist'
                ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/20 font-bold'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <ShieldCheck size={14} /> Pre-Trade Checklist
          </button>
          <button
            onClick={() => setActiveTab('glossary')}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-medium transition cursor-pointer flex items-center gap-2 ${
              activeTab === 'glossary'
                ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/20 font-bold'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <Sparkles size={14} /> Institutional Glossary
          </button>
          <button
            onClick={() => setActiveTab('quiz')}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-medium transition cursor-pointer flex items-center gap-2 ${
              activeTab === 'quiz'
                ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/20 font-bold'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
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
                    className={`w-full p-3.5 rounded-xl border text-left transition cursor-pointer flex items-center justify-between ${
                      activeCourse.id === crs.id
                        ? 'bg-purple-950/30 border-purple-500/50 text-white'
                        : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:bg-slate-850'
                    }`}
                  >
                    <div>
                      <div className="text-[10px] font-mono text-purple-400 font-bold uppercase">
                        {crs.level}
                      </div>
                      <div className="font-bold text-sm text-slate-100">{crs.title}</div>
                    </div>
                    <span className="text-xs font-mono text-slate-400">{crs.lessonsCount} lessons</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Lessons Navigation for Active Course */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 space-y-3">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <h4 className="font-bold text-slate-100 text-sm">{activeCourse.title}</h4>
                <span className="text-xs font-mono text-purple-400">
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
                      className={`w-full p-2.5 rounded-lg text-left text-xs transition cursor-pointer flex items-center justify-between ${
                        isCurrent
                          ? 'bg-purple-600 text-white font-semibold'
                          : 'text-slate-300 hover:bg-slate-800/80'
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
              <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
                  <div>
                    <div className="text-xs font-mono text-purple-400 font-bold uppercase mb-1">
                      {activeCourse.level} Track • Module {activeLesson.order || 1}
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-100">
                      {activeLesson.title}
                    </h2>
                  </div>

                  <button
                    onClick={() => handleToggleLessonComplete(activeLesson.id)}
                    className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition flex items-center gap-2 cursor-pointer ${
                      completedLessonIds.includes(activeLesson.id)
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                        : 'bg-purple-600 hover:bg-purple-500 text-white shadow-md'
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
                  <div className="p-5 rounded-2xl bg-slate-950/60 border border-purple-500/30 space-y-3">
                    <h4 className="font-mono font-bold text-xs text-purple-400 uppercase tracking-wider flex items-center gap-2">
                      <Target size={15} /> Key Strategic Takeaways
                    </h4>
                    <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
                      {activeLesson.keyTakeaways.map((takeaway, i) => (
                        <li key={i} className="flex items-start gap-2.5">
                          <CheckCircle2 size={15} className="text-purple-400 shrink-0 mt-0.5" />
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
        <div className="max-w-4xl mx-auto bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-8">
          <div className="space-y-2">
            <h2 className="text-2xl font-extrabold text-slate-100 font-mono">
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
              <div key={idx} className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 flex items-start gap-3">
                <input
                  type="checkbox"
                  id={`chk-${idx}`}
                  className="w-5 h-5 rounded-md text-purple-600 bg-slate-900 border-slate-700 mt-0.5 cursor-pointer"
                />
                <label htmlFor={`chk-${idx}`} className="cursor-pointer space-y-0.5">
                  <div className="font-bold text-slate-100 text-sm">{item.title}</div>
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
          <div className="border-b border-slate-800 pb-4">
            <h2 className="text-2xl font-extrabold text-slate-100 font-mono">
              Institutional FX & Macro Glossary
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Authoritative definitions for institutional concepts and technical terminology.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {glossaryTerms.map((g, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
                <h4 className="font-mono font-bold text-purple-400 text-sm">{g.term}</h4>
                <p className="text-xs text-slate-300 leading-relaxed">{g.definition}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. QUIZ VIEW */}
      {activeTab === 'quiz' && (
        <div className="max-w-3xl mx-auto bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <span className="text-xs font-mono text-purple-400 font-bold uppercase">
              Question {quizIndex + 1} of {sampleQuiz.length}
            </span>
            <span className="text-xs font-mono text-slate-400">Score: {quizScore}</span>
          </div>

          <h3 className="text-lg sm:text-xl font-bold text-slate-100 leading-snug">
            {sampleQuiz[quizIndex].question}
          </h3>

          <div className="space-y-3">
            {sampleQuiz[quizIndex].options.map((opt, optIdx) => {
              const isSelected = selectedQuizOption === optIdx;
              const isCorrect = sampleQuiz[quizIndex].correct === optIdx;

              let btnStyle = 'bg-slate-950/60 border-slate-800 text-slate-300 hover:bg-slate-850';
              if (quizSubmitted) {
                if (isCorrect) {
                  btnStyle = 'bg-emerald-950/40 border-emerald-500 text-emerald-300 font-bold';
                } else if (isSelected) {
                  btnStyle = 'bg-rose-950/40 border-rose-500 text-rose-300';
                }
              } else if (isSelected) {
                btnStyle = 'bg-purple-950/40 border-purple-500 text-purple-300 font-bold';
              }

              return (
                <button
                  key={optIdx}
                  disabled={quizSubmitted}
                  onClick={() => setSelectedQuizOption(optIdx)}
                  className={`w-full p-4 rounded-xl border text-left text-xs sm:text-sm transition cursor-pointer flex items-center justify-between ${btnStyle}`}
                >
                  <span>{opt}</span>
                  {quizSubmitted && isCorrect && <CheckCircle2 size={16} className="text-emerald-400" />}
                </button>
              );
            })}
          </div>

          {quizSubmitted && (
            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-300 leading-relaxed space-y-1">
              <strong className="text-purple-400 block font-mono">Explanation:</strong>
              {sampleQuiz[quizIndex].explanation}
            </div>
          )}

          <div className="flex items-center justify-end pt-4 border-t border-slate-800">
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
                className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 disabled:opacity-50 text-white font-mono text-xs font-bold transition cursor-pointer"
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
                    alert(`Assessment Complete! Final Score: ${quizScore + (selectedQuizOption === sampleQuiz[quizIndex].correct ? 0 : 0)} / ${sampleQuiz.length}`);
                    setQuizIndex(0);
                    setSelectedQuizOption(null);
                    setQuizSubmitted(false);
                    setQuizScore(0);
                  }
                }}
                className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-mono text-xs font-bold transition cursor-pointer"
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
