
import React, { useState, useEffect, useCallback } from 'react';
import { UserPerformance, PromotionStatus } from './types';
import { getMentorAdvice } from './services/geminiService';
import PromotionCard from './components/PromotionCard';
import InputSection from './components/InputSection';
import Roadmap from './components/Roadmap';
import MentorAdvice from './components/MentorAdvice';
import { TrendingUp, Award, Map, Target, LayoutDashboard, MessageSquareQuote, X, AlertCircle, CheckCircle2 } from 'lucide-react';

const INITIAL_STATE: UserPerformance = {
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
    ggd: { points: 0, percent: 0, qualified: false, missing: [] },
    lbr: { points: 0, percent: 0, qualified: false, missing: [] },
    ufi: { points: 0, percent: 0, qualified: false, missing: [] },
  });
  const [advice, setAdvice] = useState<string>('');
  const [isAdviceLoading, setIsAdviceLoading] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'roadmap' | 'mentor'>('dashboard');
  const [selectedPromo, setSelectedPromo] = useState<'ggd' | 'lbr' | 'ufi' | null>(null);

  const calculateStatus = useCallback(() => {
    const ufiMultiplier = performance.isDoublePromotion ? 2 : 1;

    // 1. 고게터 디스커버리 (30점 목표)
    let ggdPoints = 0;
    const ggdMissing: string[] = [];
    if (performance.ggd.growthCP >= 8000) ggdPoints += 40;
    else if (performance.ggd.growthCP >= 4000) ggdPoints += 20;
    
    ggdPoints += Math.min(1, performance.ggd.partnerDirectorPromoCount) * 10;
    ggdPoints += performance.ggd.newPaceSetters * 5;
    
    if (performance.ggd.weeklyMaintenanceWeeks < 18) {
      ggdMissing.push(`150 CP 유지 주수 부족: ${18 - performance.ggd.weeklyMaintenanceWeeks}주 더 유지 필요 (최소 18주)`);
    }
    if (ggdPoints < 30) {
      ggdMissing.push(`점수 부족: ${30 - ggdPoints} CP 더 필요 (최소 30점)`);
    }

    const ggdQualified = performance.ggd.weeklyMaintenanceWeeks >= 18 && ggdPoints >= 30;
    const ggdPercent = Math.min(100, (ggdPoints / 30) * 100);

    // 2. 리더십 비즈니스 리트릿 (150점 목표)
    let lbrPoints = 0;
    const lbrMissing: string[] = [];
    lbrPoints += Math.min(52, performance.lbr.weeklyGrowthWeeks);
    lbrPoints += Math.min(90, performance.lbr.selfRankUpCount * 30);
    if (performance.lbr.executiveStatus === 'NEW') lbrPoints += 80;
    if (performance.lbr.executiveStatus === 'RENEW') lbrPoints += 50;
    lbrPoints += Math.min(40, performance.lbr.partnerDirectorPromoCount * 10);
    lbrPoints += performance.lbr.partnerGoldPromoCount * 20;

    if (lbrPoints < 150) {
      lbrMissing.push(`점수 부족: ${150 - lbrPoints} CP 더 필요 (최소 150점)`);
    }

    const lbrPercent = Math.min(100, (lbrPoints / 150) * 100);

    // 3. UFI (최소 2인 달성 - 8,000점 기준 및 브랜드 파트너 4인 후원 필수)
    const ufiTotalPoints = performance.ufi.accumulatedPoints + (performance.ufi.newPoints * ufiMultiplier);
    const ufiMissing: string[] = [];
    
    if (ufiTotalPoints < 8000) {
      ufiMissing.push(`점수 부족: ${8000 - ufiTotalPoints} CP 더 확보 필요 (최소 8,000점 달성 시 인정)`);
    }
    if (performance.ufi.sponsoredBrandPartners < 4) {
      ufiMissing.push(`브랜드 파트너 후원 부족: ${4 - performance.ufi.sponsoredBrandPartners}명 더 후원 필요 (필수 4명)`);
    }

    const ufiQualified = ufiTotalPoints >= 8000 && performance.ufi.sponsoredBrandPartners >= 4;
    const ufiPercent = Math.min(100, (ufiTotalPoints / 8000) * 100);

    setStatus({
      ggd: { points: ggdPoints, percent: ggdPercent, qualified: ggdQualified, missing: ggdMissing },
      lbr: { points: lbrPoints, percent: lbrPercent, qualified: lbrPoints >= 150, missing: lbrMissing },
      ufi: { points: ufiTotalPoints, percent: ufiPercent, qualified: ufiQualified, missing: ufiMissing },
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
    try {
      const result = await getMentorAdvice(performance);
      setAdvice(result);
      setActiveTab('mentor');
    } catch (err) {
      console.error(err);
    } finally {
      setIsAdviceLoading(false);
    }
  };

  return (
    <div className="min-h-screen pb-24 md:pb-8 flex flex-col bg-slate-50 animate-fade-in">
      <header className="bg-gradient-to-r from-blue-700 to-indigo-800 text-white p-6 shadow-xl sticky top-0 z-40">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Award className="w-10 h-10 text-yellow-400" />
            <div>
              <h1 className="text-xl md:text-2xl font-black tracking-tight">2026 유사나 인센티브 달성 로드맵</h1>
              <p className="text-blue-100 text-sm font-semibold opacity-90">실시간 성과추적 시스템</p>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-grow max-w-6xl w-full mx-auto p-4 md:p-6 space-y-8">
        {/* 네비게이션 */}
        <div className="hidden md:flex gap-8 border-b border-slate-200 mb-6">
          <button onClick={() => setActiveTab('dashboard')} className={`pb-4 px-2 font-bold transition-all flex items-center gap-2 ${activeTab === 'dashboard' ? 'text-blue-600 border-b-4 border-blue-600' : 'text-slate-400'}`}>
            <LayoutDashboard className="w-5 h-5" /> 실적 대시보드
          </button>
          <button onClick={() => setActiveTab('roadmap')} className={`pb-4 px-2 font-bold transition-all flex items-center gap-2 ${activeTab === 'roadmap' ? 'text-blue-600 border-b-4 border-blue-600' : 'text-slate-400'}`}>
            <Target className="w-5 h-5" /> 성장 로드맵
          </button>
          <button onClick={() => setActiveTab('mentor')} className={`pb-4 px-2 font-bold transition-all flex items-center gap-2 ${activeTab === 'mentor' ? 'text-blue-600 border-b-4 border-blue-600' : 'text-slate-400'}`}>
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
                <div onClick={() => setSelectedPromo('ggd')} className="cursor-pointer group">
                  <PromotionCard 
                    title="고게터 디스커버리" 
                    icon={<Award className="text-yellow-500 group-hover:scale-110 transition-transform" />}
                    status={status.ggd}
                    subtitle="실버 디렉터 이상 | 18주 유지"
                    pointsLabel="누적 포인트"
                    requiredPoints={30}
                    isQualified={status.ggd.qualified}
                  />
                </div>
                <div onClick={() => setSelectedPromo('lbr')} className="cursor-pointer group">
                  <PromotionCard 
                    title="리더십 비즈니스 리트릿" 
                    icon={<TrendingUp className="text-indigo-600 group-hover:scale-110 transition-transform" />}
                    status={status.lbr}
                    subtitle="골드 디렉터 이상 | 150점 2인"
                    pointsLabel="누적 포인트"
                    requiredPoints={150}
                    isQualified={status.lbr.qualified}
                  />
                </div>
              </div>
              <div onClick={() => setSelectedPromo('ufi')} className="cursor-pointer group">
                <PromotionCard 
                    title="유사나 패밀리 인센티브 (UFI)" 
                    icon={<Map className="text-emerald-500 group-hover:scale-110 transition-transform" />}
                    status={status.ufi}
                    subtitle={`최소 2인 달성(8,000 CP) | 브랜드 파트너 4인 후원 필수`}
                    pointsLabel="누적 점수"
                    requiredPoints={8000}
                    isQualified={status.ufi.qualified}
                    fullWidth
                  />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'roadmap' && <Roadmap />}
        {activeTab === 'mentor' && <MentorAdvice advice={advice} isLoading={isAdviceLoading} />}
      </main>

      {/* 상세 달성 기준 모달 */}
      {selectedPromo && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4" onClick={() => setSelectedPromo(null)}>
          <div className="bg-white rounded-[2rem] shadow-2xl max-w-md w-full overflow-hidden animate-in zoom-in duration-300" onClick={e => e.stopPropagation()}>
            <div className="p-6 border-b flex justify-between items-center bg-slate-50">
              <h3 className="text-xl font-bold text-slate-800 uppercase tracking-tighter">
                {selectedPromo === 'ggd' ? '고게터 디스커버리 상세' : 
                 selectedPromo === 'lbr' ? '리더십 리트릿 상세' : 'UFI 상세 기준'}
              </h3>
              <button onClick={() => setSelectedPromo(null)} className="p-2 hover:bg-slate-200 rounded-full transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-8 space-y-6">
              <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100 flex justify-between items-center">
                <div className="space-y-1">
                  <p className="text-xs font-bold text-blue-600 uppercase">현재 점수</p>
                  <p className="text-2xl font-black text-blue-900">{status[selectedPromo].points.toLocaleString()} CP</p>
                </div>
                <div className="text-right space-y-1">
                  <p className="text-xs font-bold text-slate-400 uppercase">목표 점수</p>
                  <p className="text-2xl font-black text-slate-800">
                    {selectedPromo === 'ggd' ? '30' : selectedPromo === 'lbr' ? '150' : '8,000'} CP
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="text-sm font-black text-slate-800 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-red-500" /> 부족한 항목 및 체크리스트
                </h4>
                <div className="space-y-2">
                  {status[selectedPromo].missing.length > 0 ? (
                    status[selectedPromo].missing.map((msg, i) => (
                      <div key={i} className="p-4 bg-red-50 text-red-800 rounded-2xl text-sm font-bold border border-red-100">
                        • {msg}
                      </div>
                    ))
                  ) : (
                    <div className="p-4 bg-green-50 text-green-800 rounded-2xl text-sm font-bold border border-green-100">
                      축하합니다! 인센티브 자격 조건을 모두 충족했습니다.
                    </div>
                  )}
                </div>
              </div>

              <button onClick={() => setSelectedPromo(null)} className="w-full py-4 bg-slate-800 text-white rounded-2xl font-black hover:bg-slate-900 transition-all">
                확인
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 모바일 하단 네비게이션 */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t border-slate-200 py-3 px-6 flex justify-around items-center md:hidden z-50">
        <button onClick={() => setActiveTab('dashboard')} className={`flex flex-col items-center gap-1 ${activeTab === 'dashboard' ? 'text-blue-600' : 'text-slate-400'}`}>
          <LayoutDashboard className="w-6 h-6" />
          <span className="text-[10px] font-bold">대시보드</span>
        </button>
        <button onClick={() => setActiveTab('roadmap')} className={`flex flex-col items-center gap-1 ${activeTab === 'roadmap' ? 'text-blue-600' : 'text-slate-400'}`}>
          <Target className="w-6 h-6" />
          <span className="text-[10px] font-bold">로드맵</span>
        </button>
        <button onClick={() => setActiveTab('mentor')} className={`flex flex-col items-center gap-1 ${activeTab === 'mentor' ? 'text-blue-600' : 'text-slate-400'}`}>
          <MessageSquareQuote className="w-6 h-6" />
          <span className="text-[10px] font-bold">멘토링</span>
        </button>
      </nav>
    </div>
  );
};

export default App;
