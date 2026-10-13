import React, { useState, useEffect, useCallback, useRef } from 'react';
import { ArrowRight, Check, X, ShieldCheck, Zap, Trophy, Timer, Flame } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { QUIZ_BANK } from '../../data/mockQuizData';

const GAME_TIME = 15; // 15 seconds per question

export const QuizWidget = () => {
  const { showToast } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  
  // Game State
  const [screen, setScreen] = useState('config'); // 'config', 'playing', 'results'
  const [questions, setQuestions] = useState([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  
  // Gameplay metrics
  const [score, setScore] = useState(0);
  const [points, setPoints] = useState(0);
  const [streak, setStreak] = useState(0);
  const [timeLeft, setTimeLeft] = useState(GAME_TIME);
  const [selectedOpt, setSelectedOpt] = useState(null);
  const [totalTime, setTotalTime] = useState(0);
  const [skipped, setSkipped] = useState(0);

  // Config parameters
  const [config, setConfig] = useState({
    category: 'all',
    difficulty: 'adaptive',
    length: 5
  });

  const modalRef = useRef(null);

  // Load saved state on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('flash_quiz_in_progress');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.screen === 'playing') {
          setScreen(parsed.screen);
          setQuestions(parsed.questions || []);
          setCurrentIdx(parsed.currentIdx || 0);
          setScore(parsed.score || 0);
          setPoints(parsed.points || 0);
          setStreak(parsed.streak || 0);
          setTimeLeft(parsed.timeLeft || GAME_TIME);
          setSelectedOpt(parsed.selectedOpt);
          setTotalTime(parsed.totalTime || 0);
          setSkipped(parsed.skipped || 0);
          setConfig(parsed.config || { category: 'all', difficulty: 'adaptive', length: 5 });
          // setIsOpen(true); // Commented out to prevent the quiz from aggressively opening on page load
        }
      }
    } catch (e) {
      console.error("Could not load quiz state", e);
    }

    const handleOpenQuiz = () => setIsOpen(true);
    window.addEventListener('open-quiz', handleOpenQuiz);
    return () => window.removeEventListener('open-quiz', handleOpenQuiz);
  }, []);

  // Save state on change
  useEffect(() => {
    if (screen === 'playing') {
      const stateToSave = {
        screen, questions, currentIdx, score, points, streak, timeLeft, selectedOpt, totalTime, skipped, config
      };
      localStorage.setItem('flash_quiz_in_progress', JSON.stringify(stateToSave));
    } else if (screen === 'results') {
      localStorage.removeItem('flash_quiz_in_progress');
    }
  }, [screen, questions, currentIdx, score, points, streak, timeLeft, selectedOpt, totalTime, skipped, config]);

  // Timer logic
  useEffect(() => {
    if (screen !== 'playing' || selectedOpt !== null || !isOpen) return;
    
    if (timeLeft <= 0) {
      handleTimeout();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(t => t - 1);
      setTotalTime(t => t + 1);
    }, 1000);
    
    return () => clearInterval(timer);
  }, [screen, timeLeft, selectedOpt, isOpen]);

  const handleTimeout = useCallback(() => {
    setSelectedOpt(-1); // -1 indicates timeout
    setStreak(0);
  }, []);

  const startGame = () => {
    let filtered = [...QUIZ_BANK];

    // Category mapping
    if (config.category === 'acoustics') {
      filtered = filtered.filter(q => q.category === 'Audio');
    } else if (config.category === 'gaming-gpu') {
      filtered = filtered.filter(q => q.category === 'Gaming');
    } else if (config.category === 'silicon') {
      filtered = filtered.filter(q => q.category === 'Laptops' || q.category === 'Smartphones');
    } else if (config.category === 'display') {
      filtered = filtered.filter(q => q.category === 'Smartphones' || q.category === 'Tech Facts');
    }

    // Difficulty mapping
    if (config.difficulty === 'level-1') {
      filtered = filtered.filter(q => q.difficulty === 'Easy');
    } else if (config.difficulty === 'level-2') {
      filtered = filtered.filter(q => q.difficulty === 'Medium');
    } else if (config.difficulty === 'level-3') {
      filtered = filtered.filter(q => q.difficulty === 'Hard');
    }

    // Fallback to all if filtered pool is too small
    if (filtered.length < config.length) {
      filtered = [...QUIZ_BANK];
    }

    // Shuffle and slice
    const shuffled = filtered.sort(() => 0.5 - Math.random()).slice(0, config.length);
    
    setQuestions(shuffled);
    setCurrentIdx(0);
    setScore(0);
    setPoints(0);
    setStreak(0);
    setTimeLeft(GAME_TIME);
    setSelectedOpt(null);
    setTotalTime(0);
    setSkipped(0);
    setScreen('playing');
  };

  const handleSelect = (idx) => {
    if (selectedOpt !== null) return;
    setSelectedOpt(idx);
    
    const q = questions[currentIdx];
    if (idx === q.a) {
      setScore(s => s + 1);
      const timeBonus = Math.floor(timeLeft / 2);
      const streakMultiplier = 1 + (streak * 0.1);
      setPoints(p => p + Math.floor(((q.points || 20) + timeBonus) * streakMultiplier));
      setStreak(s => s + 1);
    } else {
      setStreak(0);
    }
  };

  const nextQuestion = () => {
    if (currentIdx + 1 < questions.length) {
      setCurrentIdx(c => c + 1);
      setSelectedOpt(null);
      setTimeLeft(GAME_TIME);
      if (modalRef.current) {
        modalRef.current.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else {
      setScreen('results');
      if (score === questions.length) {
        showToast('Autonomous Verification Cleared: Perfect Score reward unlocked!');
      }
      if (modalRef.current) {
        modalRef.current.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  const prevQuestion = () => {
    if (currentIdx > 0) {
      setCurrentIdx(c => c - 1);
      setSelectedOpt(-2);
    }
  };

  const handleSkip = () => {
    if (selectedOpt !== null) return;
    setSkipped(s => s + 1);
    setStreak(0);
    setSelectedOpt(-3);
  };

  const quitGame = () => {
    localStorage.removeItem('flash_quiz_in_progress');
    setScreen('config');
    setIsOpen(false);
  };

  // Dynamic pot display based on question count
  const potAmount = config.length === 20 ? '$25.00' : config.length === 10 ? '$10.00' : '$5.00';

  const renderConfig = () => (
    <div className="px-6 sm:px-7 py-6 sm:py-7 space-y-6" ref={modalRef}>
      {/* Title Block */}
      <div className="space-y-1.5">
        <h2 className="text-[28px] sm:text-[32px] leading-tight font-bold text-primary dark:text-white tracking-tight">
          Configure Your Quiz
        </h2>
        <p className="text-[13px] sm:text-[14px] leading-relaxed text-secondary dark:text-gray-400">
          Select your metrology benchmark category, difficulty tier, and question volume to initialize autonomous hardware verification.
        </p>
      </div>

      <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); startGame(); }}>
        {/* Field 1: Category */}
        <div className="space-y-1.5">
          <label className="block text-[11px] font-semibold text-secondary dark:text-gray-400 uppercase tracking-wider" htmlFor="quiz-category">
            Category
          </label>
          <div className="relative">
            <select
              id="quiz-category"
              className="w-full appearance-none rounded-2xl bg-canvas dark:bg-[#161617] border border-hairline/60 dark:border-white/10 text-primary dark:text-white text-[14px] sm:text-[15px] font-medium px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-electric-blue transition-colors cursor-pointer"
              value={config.category}
              onChange={e => setConfig({ ...config, category: e.target.value })}
            >
              <option value="all">All Hardware Categories</option>
              <option value="silicon">Silicon &amp; Micro-architecture (A17 Pro, M3, Snapdragon)</option>
              <option value="acoustics">Acoustics &amp; Active Noise Cancellation</option>
              <option value="gaming-gpu">Gaming SoCs &amp; GPU Thermal Dissipation</option>
              <option value="display">Display Metrology &amp; Peak Luminance</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-secondary dark:text-gray-400">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>
        </div>

        {/* Field 2: Difficulty */}
        <div className="space-y-1.5">
          <label className="block text-[11px] font-semibold text-secondary dark:text-gray-400 uppercase tracking-wider" htmlFor="quiz-difficulty">
            Difficulty
          </label>
          <div className="relative">
            <select
              id="quiz-difficulty"
              className="w-full appearance-none rounded-2xl bg-canvas dark:bg-[#161617] border border-hairline/60 dark:border-white/10 text-primary dark:text-white text-[14px] sm:text-[15px] font-medium px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-electric-blue transition-colors cursor-pointer"
              value={config.difficulty}
              onChange={e => setConfig({ ...config, difficulty: e.target.value })}
            >
              <option value="adaptive">All Tiers (Adaptive Dynamic Mode)</option>
              <option value="level-1">Level 01: Consumer Hardware Specs</option>
              <option value="level-2">Level 02: Silicon Architecture &amp; Benchmarks</option>
              <option value="level-3">Level 03: Die-Level Metrology &amp; Nanometer EUV</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-secondary dark:text-gray-400">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>
        </div>

        {/* Field 3: Number of Questions Segmented Picker */}
        <div className="space-y-1.5">
          <div className="flex justify-between items-baseline">
            <label className="block text-[11px] font-semibold text-secondary dark:text-gray-400 uppercase tracking-wider">
              Number of Questions
            </label>
            <span className="text-[12px] text-secondary dark:text-gray-400">
              Adaptive Pot Allocation
            </span>
          </div>
          <div className="grid grid-cols-3 gap-3" role="radiogroup">
            {/* 5 Questions */}
            <button
              type="button"
              role="radio"
              aria-checked={config.length === 5}
              className={`flex flex-col items-center justify-center py-3.5 px-3 rounded-2xl transition-all cursor-pointer ${
                config.length === 5
                  ? 'bg-electric-blue text-white shadow-sm ring-2 ring-electric-blue ring-offset-1 dark:ring-offset-[#1c1c1e]'
                  : 'bg-canvas dark:bg-white/5 hover:bg-cool-wash dark:hover:bg-white/10 border border-hairline/60 dark:border-white/10 text-primary dark:text-white active:scale-[0.98]'
              }`}
              onClick={() => setConfig({ ...config, length: 5 })}
            >
              <span className="text-[17px] font-semibold leading-tight">5</span>
              <span className={`text-[11px] font-medium mt-0.5 ${config.length === 5 ? 'text-white/90' : 'text-secondary dark:text-gray-400'}`}>
                +$5.00 Pot
              </span>
            </button>

            {/* 10 Questions */}
            <button
              type="button"
              role="radio"
              aria-checked={config.length === 10}
              className={`flex flex-col items-center justify-center py-3.5 px-3 rounded-2xl transition-all cursor-pointer ${
                config.length === 10
                  ? 'bg-electric-blue text-white shadow-sm ring-2 ring-electric-blue ring-offset-1 dark:ring-offset-[#1c1c1e]'
                  : 'bg-canvas dark:bg-white/5 hover:bg-cool-wash dark:hover:bg-white/10 border border-hairline/60 dark:border-white/10 text-primary dark:text-white active:scale-[0.98]'
              }`}
              onClick={() => setConfig({ ...config, length: 10 })}
            >
              <span className="text-[17px] font-semibold leading-tight">10</span>
              <span className={`text-[11px] font-medium mt-0.5 ${config.length === 10 ? 'text-white/90' : 'text-secondary dark:text-gray-400'}`}>
                +$10.00 Pot
              </span>
            </button>

            {/* 20 Questions */}
            <button
              type="button"
              role="radio"
              aria-checked={config.length === 20}
              className={`flex flex-col items-center justify-center py-3.5 px-3 rounded-2xl transition-all cursor-pointer ${
                config.length === 20
                  ? 'bg-electric-blue text-white shadow-sm ring-2 ring-electric-blue ring-offset-1 dark:ring-offset-[#1c1c1e]'
                  : 'bg-canvas dark:bg-white/5 hover:bg-cool-wash dark:hover:bg-white/10 border border-hairline/60 dark:border-white/10 text-primary dark:text-white active:scale-[0.98]'
              }`}
              onClick={() => setConfig({ ...config, length: 20 })}
            >
              <span className="text-[17px] font-semibold leading-tight">20</span>
              <span className={`text-[11px] font-medium mt-0.5 ${config.length === 20 ? 'text-white/90' : 'text-secondary dark:text-gray-400'}`}>
                +$25.00 Pot
              </span>
            </button>
          </div>
        </div>

        {/* Live Reward Estimate Status Pill */}
        <div className="px-4 py-3 rounded-2xl bg-canvas dark:bg-[#161617] border border-hairline/40 dark:border-white/10 flex items-center justify-between text-xs">
          <div className="flex items-center space-x-2 text-primary dark:text-white font-medium">
            <span className="w-2 h-2 rounded-full bg-electric-blue animate-pulse"></span>
            <span>FedNow Instant Cashback</span>
          </div>
          <span className="font-semibold font-mono text-primary dark:text-white tracking-tight">
            {potAmount} Escrow Reserved
          </span>
        </div>

        {/* Primary CTA Button */}
        <div className="pt-2">
          <button
            type="submit"
            className="w-full py-3.5 sm:py-4 px-6 rounded-full bg-electric-blue hover:bg-[#0077ed] active:bg-[#0062c4] active:scale-[0.99] text-white text-[16px] sm:text-[17px] font-semibold shadow-sm transition-all duration-150 flex items-center justify-center space-x-2 cursor-pointer"
          >
            <span>Start Challenge</span>
            <ArrowRight size={18} className="text-white" />
          </button>
        </div>

        {/* Subtle Verification Micro-copy */}
        <p className="text-center text-[12px] leading-tight text-secondary dark:text-gray-400 pt-0.5">
          Questions verified by independent silicon metrology &amp; TechInsights teardown data.
        </p>
      </form>
    </div>
  );

  const renderPlaying = () => {
    if (!questions.length) return null;
    const q = questions[currentIdx];

    return (
      <div className="p-6 flex flex-col gap-4 max-h-[80vh] overflow-y-auto" ref={modalRef}>
        <div className="flex items-center justify-between gap-4 pb-3 border-b border-hairline/40 dark:border-white/10">
          <div className="flex items-center gap-3">
            <span className="text-sm font-bold text-primary dark:text-white">Score: {score}</span>
            <span
              className="text-xs font-semibold text-orange-500 inline-flex items-center gap-1 transition-opacity"
              style={{ opacity: streak > 1 ? 1 : 0.4 }}
            >
              <Flame size={14} className="text-orange-500" /> x{streak}
            </span>
          </div>
          <div className={`px-2.5 py-1 rounded-full text-xs font-bold flex items-center gap-1 ${timeLeft <= 5 && selectedOpt === null ? 'bg-red-500/15 text-red-500 animate-pulse' : 'bg-canvas dark:bg-white/10 text-secondary dark:text-gray-300'}`}>
            <Timer size={13} /> {timeLeft}s
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between text-xs text-secondary dark:text-gray-400 mb-1.5">
            <span>Question {currentIdx + 1} of {questions.length}</span>
            <span className="font-bold text-primary dark:text-white">{points} pts</span>
          </div>
          <div className="w-full h-1.5 bg-canvas dark:bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-electric-blue transition-all duration-300 rounded-full"
              style={{ width: `${((currentIdx) / questions.length) * 100}%` }}
            />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-canvas dark:bg-white/10 border border-hairline/40 dark:border-white/10 text-secondary dark:text-gray-300">
            {q.category}
          </span>
          <span
            className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
              q.difficulty === 'Hard'
                ? 'bg-red-500/15 text-red-600 dark:text-red-400 border border-red-500/20'
                : q.difficulty === 'Medium'
                ? 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/20'
                : 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
            }`}
          >
            {q.difficulty}
          </span>
        </div>

        <p className="text-base sm:text-lg font-semibold text-primary dark:text-white leading-relaxed my-1">
          {q.q}
        </p>

        <div className="flex flex-col gap-2.5">
          {q.options.map((opt, idx) => {
            let cls = 'bg-canvas/60 dark:bg-white/5 border-hairline/60 dark:border-white/10 text-primary dark:text-white hover:border-electric-blue hover:bg-canvas dark:hover:bg-white/10';
            if (selectedOpt !== null && selectedOpt >= 0) {
              if (idx === q.a) cls = '!bg-emerald-500/15 !border-emerald-500 !text-emerald-600 dark:!text-emerald-400 font-bold';
              else if (idx === selectedOpt) cls = '!bg-red-500/15 !border-red-500 !text-red-600 dark:!text-red-400 font-bold';
            }
            return (
              <button 
                key={idx} 
                className={`w-full text-left p-3.5 rounded-xl text-sm border font-medium transition-all cursor-pointer disabled:cursor-not-allowed ${cls}`} 
                onClick={() => handleSelect(idx)}
                disabled={selectedOpt !== null}
              >
                {opt}
              </button>
            );
          })}
        </div>

        {selectedOpt !== null && (
          <div className="p-4 rounded-xl bg-canvas dark:bg-[#161617] border border-hairline/60 dark:border-white/10 text-xs text-secondary dark:text-gray-300 leading-relaxed mt-1">
            <strong className="block text-sm font-bold text-primary dark:text-white mb-1">
              {selectedOpt === q.a ? '✅ Excellent!' : 
               selectedOpt === -1 ? '⏱ Time is up!' : 
               selectedOpt === -3 ? '⏭ Skipped' : '❌ Incorrect.'}
            </strong>
            <p>{q.explain}</p>
            <div className="flex gap-2 mt-4">
              <button
                className="w-full py-2.5 px-4 rounded-full font-semibold text-xs bg-electric-blue hover:bg-[#0077ed] text-white shadow-sm transition-colors cursor-pointer"
                onClick={nextQuestion}
              >
                {currentIdx + 1 === questions.length ? 'Finish Quiz →' : 'Next Question →'}
              </button>
            </div>
          </div>
        )}

        {selectedOpt === null && (
          <div className="flex gap-2 mt-4 justify-center">
            <button
              className="py-1.5 px-4 rounded-full text-xs font-medium border border-hairline/60 dark:border-white/10 text-secondary dark:text-gray-400 hover:text-primary dark:hover:text-white hover:bg-canvas dark:hover:bg-white/5 transition-colors cursor-pointer"
              onClick={handleSkip}
            >
              Skip
            </button>
            <button
              className="py-1.5 px-4 rounded-full text-xs font-medium border border-red-500/30 text-red-600 dark:text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer"
              onClick={quitGame}
            >
              Quit
            </button>
          </div>
        )}
      </div>
    );
  };

  const renderResults = () => {
    const accuracy = Math.round((score / questions.length) * 100) || 0;
    
    return (
      <div className="p-6 sm:p-7 flex flex-col text-center" ref={modalRef}>
        <div className="w-12 h-12 rounded-full bg-electric-blue/10 text-electric-blue flex items-center justify-center mx-auto mb-3">
          <Trophy size={24} />
        </div>
        <h2 className="text-2xl font-bold text-primary dark:text-white mb-1">Quiz Complete!</h2>
        <p className="text-sm text-secondary dark:text-gray-400 mb-6">Autonomous hardware verification performance report</p>
        
        <div className="bg-canvas dark:bg-[#161617] border border-hairline/60 dark:border-white/10 p-6 rounded-2xl mb-6">
          <div className="text-4xl font-extrabold text-electric-blue mb-1">
            {points} <span className="text-sm text-secondary dark:text-gray-400 font-normal">pts</span>
          </div>
          <div className="grid grid-cols-2 gap-3 text-left text-xs mt-4 pt-4 border-t border-hairline/40 dark:border-white/10">
            <div><span className="text-secondary dark:text-gray-400">Score:</span> <strong>{score} / {questions.length}</strong></div>
            <div><span className="text-secondary dark:text-gray-400">Accuracy:</span> <strong>{accuracy}%</strong></div>
            <div><span className="text-secondary dark:text-gray-400">Skipped:</span> <strong>{skipped}</strong></div>
            <div><span className="text-secondary dark:text-gray-400">Time:</span> <strong>{totalTime}s</strong></div>
          </div>
        </div>

        <div className="text-left text-xs mb-6 p-4 rounded-xl bg-paper dark:bg-white/5 border border-hairline/60 dark:border-white/10">
          <p className="font-bold text-primary dark:text-white mb-1">🏆 Instant Cashback Pot Status</p>
          {accuracy >= 80 ? (
            <>
              <p className="text-secondary dark:text-gray-400">Verification Passed! You qualified for the {potAmount} reward escrow tier.</p>
              <p className="mt-2 font-mono text-xs px-2.5 py-1 bg-electric-blue/10 text-electric-blue rounded-full border border-electric-blue/20 inline-block font-bold">
                ESCROW-VERIFIED-{accuracy}%
              </p>
            </>
          ) : (
            <p className="text-secondary dark:text-gray-400">Score 80% or higher to unlock FedNow escrow cashback rewards.</p>
          )}
        </div>

        <div className="flex gap-3">
          <button
            className="flex-1 py-2.5 px-4 rounded-full text-xs font-semibold border border-hairline/60 dark:border-white/10 text-secondary dark:text-gray-300 hover:text-primary dark:hover:text-white hover:bg-canvas dark:hover:bg-white/5 transition-colors cursor-pointer"
            onClick={() => setScreen('config')}
          >
            Configure Again
          </button>
          <button
            className="flex-1 py-2.5 px-4 rounded-full text-xs font-semibold bg-electric-blue hover:bg-[#0077ed] text-white shadow-sm transition-colors cursor-pointer"
            onClick={() => setIsOpen(false)}
          >
            Done
          </button>
        </div>
      </div>
    );
  };

  if (!isOpen) {
    return (
      <button
        className="fixed bottom-6 left-6 z-40 px-4 py-2.5 rounded-full bg-paper/90 dark:bg-[#1c1c1e]/90 backdrop-blur-md border border-hairline/60 dark:border-white/10 shadow-apple-card hover:shadow-apple-float font-semibold text-xs text-primary dark:text-white hover:text-electric-blue flex items-center gap-2 cursor-pointer transition-all hover:scale-105"
        onClick={() => setIsOpen(true)}
        title="Open Hardware IQ Quiz"
      >
        <span className="w-2 h-2 rounded-full bg-electric-blue animate-pulse"></span>
        <span>Flash Tech Quiz</span>
      </button>
    );
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/25 dark:bg-black/70 backdrop-blur-[20px] animate-fade-in"
      onClick={() => setIsOpen(false)}
    >
      <div
        className="w-full max-w-[580px] bg-paper dark:bg-[#1c1c1e] text-primary dark:text-white rounded-[28px] border border-hairline/60 dark:border-white/10 shadow-[0_24px_60px_-12px_rgba(0,0,0,0.14)] overflow-hidden flex flex-col transition-all duration-300 animate-scale-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Bar */}
        <header className="px-6 sm:px-7 pt-5 sm:pt-6 pb-4 flex items-center justify-between border-b border-hairline/40 dark:border-white/10 bg-canvas/40 dark:bg-white/[0.02]">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 rounded-full bg-electric-blue"></div>
            <span className="text-[16px] sm:text-[17px] font-semibold text-primary dark:text-white">Flash Tech Quiz</span>
          </div>
          <button
            aria-label="Close dialog"
            className="w-8 h-8 rounded-full bg-cool-wash dark:bg-white/10 hover:bg-[#e4e4e7] dark:hover:bg-white/20 active:scale-95 flex items-center justify-center text-secondary dark:text-gray-300 hover:text-primary dark:hover:text-white transition-all cursor-pointer"
            onClick={() => setIsOpen(false)}
            type="button"
          >
            <X size={15} />
          </button>
        </header>

        {screen === 'config' && renderConfig()}
        {screen === 'playing' && renderPlaying()}
        {screen === 'results' && renderResults()}
      </div>
    </div>
  );
};
