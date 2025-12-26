
import React, { useState, useEffect, useCallback } from 'react';
import { UserPerformance, DistributorMode, PromotionStatus } from './types';
import { getMentorAdvice } from './services/geminiService';
import PromotionCard from './components/PromotionCard';
import InputSection from './components/InputSection';
import Roadmap from './components/Roadmap';
import MentorAdvice from './components/MentorAdvice';
import { TrendingUp, Award, Map, Target, LayoutDashboard, MessageSquareQuote } from 'lucide-react';

const INITIAL_STATE: UserPerformance = {
  mode: 'EXISTING',
  isDoublePromotion: false,
  ggd: {
    weeklyMaintenanceWeeks: 0,
    growthCP: 0,
    partnerDirectorPromoCount: 0,
    newPaceSetters: 0,
  },
  lbr: {
    weeklyGrowthWeeks: 0,
    selfRankUpCount: 0,
    executiveStatus: 'NONE',
    partnerDirectorPromoCount: 0,
    partnerGoldPromoCount: 0,
  },
  ufi: {
    newPoints: 0,
    accumulatedPoints: 0,
    sponsoredBrandPartners: 0,
  },
};

const App: React.FC = () => {
  const [performance, setPerformance] = useState<UserPerformance>(INITIAL_STATE);
  const [status, setStatus] = useState<PromotionStatus>({
    ggd: { points: 0, percent: 0, qualified: false },
    lbr: { points: 0, percent: 0, qualified: false },
    ufi: { points: 0, percent: 0, qualified: false },
  });
  const [advice, setAdvice] = useState<string>('');
  const [isAdviceLoading, setIsAdviceLoading] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'roadmap' | 'mentor'>('dashboard');

  const calculateStatus = useCallback(() => {
    // 더블 점수는 사용자 요청에 따라 UFI에만 한정 적용
    const ufiMultiplier = performance.isDoublePromotion ? 2 : 1;

    // 1. 고게터 디스커버리 Logic (더블 적용 제외)
    let ggdPoints = 0;
    if (performance.ggd.growthCP >= 8000) ggdPoints += 40;
    else if (performance.ggd.growthCP >= 4000) ggdPoints += 20;
    ggdPoints += Math.min(1, performance.ggd.partnerDirectorPromoCount) * 10;
    ggdPoints += performance.ggd.newPaceSetters * 5;
    
    const ggdQualified = performance.ggd.weeklyMaintenanceWeeks >= 18;
    const ggdPercent = Math.min(100, (ggdPoints / 30) * 100);

    // 2. 리더십 비즈니스 리트릿 Logic (더블 적용 제외)
    let lbrPoints = 0;
    lbrPoints += Math.min(52, performance.lbr.weeklyGrowthWeeks);
    lbrPoints += Math.min(90, performance.lbr.selfRankUpCount * 30);
    if (performance.lbr.executiveStatus === 'NEW') lbrPoints += 80;
    if (performance.lbr.executiveStatus === 'RENEW') lbrPoints += 50;
    lbrPoints += Math.min(40, performance.lbr.partnerDirectorPromoCount * 10);
    lbrPoints += performance.lbr.partnerGoldPromoCount * 20;

    const lbrPercent = Math.min(100, (lbrPoints / 150) * 100);

    // 3. UFI (4000점당 1인, 브랜드 파트너 4인 후원 필수, 더블 적용 가능)
    const ufiTotalPoints = performance.ufi.accumulatedPoints + (performance.ufi.newPoints * ufiMultiplier);
    // 진행률은 첫 번째 1인 달성(4,000점) 기준
    const ufiPercent = Math.min(100, (ufiTotalPoints / 4000) * 100);
    const ufiQualified = ufiTotalPoints >= 4000 && performance.ufi.sponsoredBrandPartners >= 4;

    setStatus({
      ggd: { points: ggdPoints, percent: ggdPercent, qualified: ggdQualified },
      lbr: { points: lbrPoints, percent: lbrPercent, qualified: lbrPoints >= 150 },
      ufi: { points: ufiTotalPoints, percent: ufiPercent, qualified: ufiQualified },
    });
  }, [performance]);

  useEffect(() => {
    calculateStatus();
  }, [calculateStatus]);

  const handleUpdate = (newPerf: UserPerformance) => {
    setPerformance(newPerf);
  };

  const generateAdvice = async () => {
    setIsAdviceLoading(true);
    const result = await getMentorAdvice(performance);
    setAdvice(result);
    setIsAdviceLoading(false);
    setActiveTab('mentor');
  };

  const ufiQualifiedPeople = Math.floor(status.ufi.points / 4000);

  return (
    <div className="min-h-screen pb-24 md:pb-8 flex flex-col bg-slate-50">
      <header className="bg-gradient-to-r from-blue-700 to-indigo-800 text-white p-6 shadow-lg">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-2">
              <Award className="w-8 h-8" />
              2026 유사나 코리아 인센티브 전략가
            </h1>
            <p className="text-blue-100 mt-1 opacity-90 font-medium">
              실시간 데이터 분석 기반 성과 추적 시스템
            </p>
          </div>
          <div className="flex bg-white/10 p-1 rounded-lg backdrop-blur-sm self-start">
            <button 
              onClick={() => handleUpdate({ ...performance, mode: 'EXISTING' })}
              className={`px-4 py-1.5 rounded-md text-sm transition-all ${performance.mode === 'EXISTING' ? 'bg-white text-blue-800 shadow-md font-bold' : 'text-white'}`}
            >
              기존 사업자 모드
            </button>
            <button 
              onClick={() => handleUpdate({ ...performance, mode: 'NEW' })}
              className={`px-4 py-1.5 rounded-md text-sm transition-all ${performance.mode === 'NEW' ? 'bg-white text-blue-800 shadow-md font-bold' : 'text-white'}`}
            >
              신규 사업자 모드
            </button>
          </div>
        </div>
      </header>

      <main className="flex-grow max-w-6xl w-full mx-auto p-4 md:p-6 space-y-8">
        <div className="hidden md:flex gap-4 border-b border-slate-200 mb-6">
          <button onClick={() => setActiveTab('dashboard')} className={`pb-4 px-2 font-semibold transition-colors flex items-center gap-2 ${activeTab === 'dashboard' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-slate-500 hover:text-slate-700'}`}>
            <LayoutDashboard className="w-5 h-5" /> 실적 대시보드
          </button>
          <button onClick={() => setActiveTab('roadmap')} className={`pb-4 px-2 font-semibold transition-colors flex items-center gap-2 ${activeTab === 'roadmap' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-slate-500 hover:text-slate-700'}`}>
            <Target className="w-5 h-5" /> 성장 로드맵
          </button>
          <button onClick={() => setActiveTab('mentor')} className={`pb-4 px-2 font-semibold transition-colors flex items-center gap-2 ${activeTab === 'mentor' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-slate-500 hover:text-slate-700'}`}>
            <MessageSquareQuote className="w-5 h-5" /> 멘토의 조언
          </button>
        </div>

        {activeTab === 'dashboard' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <InputSection performance={performance} onUpdate={handleUpdate} onGetAdvice={generateAdvice} isAdviceLoading={isAdviceLoading} />
            </div>

            <div className="lg:col-span-2 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <PromotionCard 
                  title="고게터 디스커버리" 
                  icon={<Award className="text-yellow-500" />}
                  status={status.ggd}
                  subtitle="실버 디렉터 이상 | 18주 유지"
                  pointsLabel="획득 포인트"
                  requiredPoints={30}
                  isQualified={status.ggd.qualified}
                />
                <PromotionCard 
                  title="리더십 비즈니스 리트릿" 
                  icon={<TrendingUp className="text-indigo-600" />}
                  status={status.lbr}
                  subtitle="골드 디렉터 이상 | 150점 2인권"
                  pointsLabel="획득 포인트"
                  requiredPoints={150}
                  isQualified={status.lbr.qualified}
                />
              </div>
              <PromotionCard 
                  title="유사나 패밀리 인센티브 (UFI)" 
                  icon={<Map className="text-emerald-500" />}
                  status={status.ufi}
                  subtitle={`4000점당 1인 달성 | 파트너 4인 후원 필수 (${ufiQualifiedPeople}명 달성중)`}
                  pointsLabel="획득 점수"
                  requiredPoints={4000}
                  isQualified={status.ufi.qualified}
                  fullWidth
                />
            </div>
          </div>
        )}

        {activeTab === 'roadmap' && (
          <Roadmap />
        )}

        {activeTab === 'mentor' && (
          <MentorAdvice advice={advice} isLoading={isAdviceLoading} />
        )}
      </main>

      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 py-3 px-6 flex justify-around items-center md:hidden z-50">
        <button onClick={() => setActiveTab('dashboard')} className={`flex flex-col items-center gap-1 ${activeTab === 'dashboard' ? 'text-blue-600' : 'text-slate-400'}`}>
          <LayoutDashboard className="w-6 h-6" />
          <span className="text-[10px] font-medium">대시보드</span>
        </button>
        <button onClick={() => setActiveTab('roadmap')} className={`flex flex-col items-center gap-1 ${activeTab === 'roadmap' ? 'text-blue-600' : 'text-slate-400'}`}>
          <Target className="w-6 h-6" />
          <span className="text-[10px] font-medium">성장 로드맵</span>
        </button>
        <button onClick={() => setActiveTab('mentor')} className={`flex flex-col items-center gap-1 ${activeTab === 'mentor' ? 'text-blue-600' : 'text-slate-400'}`}>
          <MessageSquareQuote className="w-6 h-6" />
          <span className="text-[10px] font-medium">멘토 조언</span>
        </button>
      </nav>
    </div>
  );
};

export default App;
