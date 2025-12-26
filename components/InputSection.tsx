
import React from 'react';
import { UserPerformance } from '../types';
import { Sparkles, Info, Star, Users } from 'lucide-react';

interface Props {
  performance: UserPerformance;
  onUpdate: (perf: UserPerformance) => void;
  onGetAdvice: () => void;
  isAdviceLoading: boolean;
}

const InputSection: React.FC<Props> = ({ performance, onUpdate, onGetAdvice, isAdviceLoading }) => {
  const handleChange = (category: 'ggd' | 'lbr' | 'ufi' | 'root', field: string, value: any) => {
    if (category === 'root') {
      onUpdate({ ...performance, [field]: value });
    } else {
      onUpdate({
        ...performance,
        [category]: {
          ...(performance as any)[category],
          [field]: value
        }
      });
    }
  };

  return (
    <div className="bg-white rounded-[2rem] shadow-sm border border-slate-200 p-6 md:p-8 space-y-6 animate-in slide-in-from-left duration-500">
      <div className="flex items-center justify-between border-b border-slate-100 pb-5">
        <h2 className="text-xl font-black text-slate-800 tracking-tight">실적 데이터 입력</h2>
        <div className="group relative">
          <Info className="w-5 h-5 text-slate-300 cursor-help hover:text-blue-500 transition-colors" />
          <div className="absolute right-0 top-8 w-64 p-4 bg-slate-900 text-white text-[11px] rounded-2xl opacity-0 group-hover:opacity-100 transition-all z-[60] pointer-events-none shadow-2xl leading-relaxed">
            <p className="font-bold mb-1 text-blue-400">💡 도움말</p>
            * 자격 기간 내 확보한 실적을 정확히 입력하세요.<br/>
            * UFI 더블 프로모션 체크 시 신규 점수가 2배로 자동 산출됩니다.
          </div>
        </div>
      </div>

      {/* 더블 점수 토글 (UFI 한정) */}
      <div className="bg-amber-50 border border-amber-100 p-4 rounded-2xl flex items-center justify-between shadow-sm">
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
            <span className="text-sm font-black text-amber-900 uppercase tracking-tighter">UFI 더블 점수 적용</span>
          </div>
          <p className="text-[10px] text-amber-600 font-bold mt-1">* 기간 내 획득한 신규 점수 200% 인정</p>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input 
            type="checkbox"
            className="sr-only peer"
            checked={performance.isDoublePromotion}
            onChange={(e) => handleChange('root', 'isDoublePromotion', e.target.checked)}
          />
          <div className="w-12 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-500"></div>
        </label>
      </div>
      
      {/* 고게터 디스커버리 Inputs */}
      <div className="space-y-4">
        <h3 className="font-black text-blue-700 text-xs uppercase tracking-widest flex items-center gap-2">
          고게터 디스커버리
        </h3>
        <div className="space-y-3">
          <label className="block space-y-1">
            <span className="text-xs font-bold text-slate-500 ml-1">150 CP 유지 주수 (18주 이상)</span>
            <input 
              type="number" min="0" max="26"
              value={performance.ggd.weeklyMaintenanceWeeks}
              onChange={(e) => handleChange('ggd', 'weeklyMaintenanceWeeks', parseInt(e.target.value) || 0)}
              className="w-full rounded-xl border-slate-200 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-slate-50 px-4 py-3 text-sm font-bold border transition-all"
            />
          </label>
          <label className="block space-y-1">
            <span className="text-xs font-bold text-slate-500 ml-1">신규 성장 CP</span>
            <input 
              type="number" min="0"
              value={performance.ggd.growthCP}
              onChange={(e) => handleChange('ggd', 'growthCP', parseInt(e.target.value) || 0)}
              className="w-full rounded-xl border-slate-200 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-slate-50 px-4 py-3 text-sm font-bold border transition-all"
            />
          </label>
        </div>
      </div>

      {/* 리더십 비즈니스 리트릿 Inputs */}
      <div className="space-y-4 pt-2">
        <h3 className="font-black text-indigo-700 text-xs uppercase tracking-widest flex items-center gap-2">
          리더십 리트릿
        </h3>
        <label className="block space-y-1">
          <span className="text-xs font-bold text-slate-500 ml-1">주별 성장 주수 (1,000 CP+)</span>
          <input 
            type="number" min="0" max="52"
            value={performance.lbr.weeklyGrowthWeeks}
            onChange={(e) => handleChange('lbr', 'weeklyGrowthWeeks', parseInt(e.target.value) || 0)}
            className="w-full rounded-xl border-slate-200 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 bg-slate-50 px-4 py-3 text-sm font-bold border transition-all"
          />
        </label>
      </div>

      {/* UFI 수기 입력 */}
      <div className="space-y-4 pt-4 border-t border-slate-100">
        <h3 className="font-black text-emerald-700 text-xs uppercase tracking-widest flex items-center gap-2">
          UFI 최종 마무리
        </h3>
        <div className="grid grid-cols-2 gap-3">
          <label className="block space-y-1">
            <span className="text-[10px] font-bold text-slate-500 ml-1 uppercase">기존 누계 CP</span>
            <input 
              type="number" min="0"
              value={performance.ufi.accumulatedPoints}
              onChange={(e) => handleChange('ufi', 'accumulatedPoints', parseInt(e.target.value) || 0)}
              className="w-full rounded-xl border-slate-200 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 bg-slate-50 px-4 py-3 text-sm font-bold border transition-all"
            />
          </label>
          <label className="block space-y-1">
            <span className="text-[10px] font-bold text-slate-500 ml-1 uppercase">신규 획득 CP</span>
            <input 
              type="number" min="0"
              value={performance.ufi.newPoints}
              onChange={(e) => handleChange('ufi', 'newPoints', parseInt(e.target.value) || 0)}
              className="w-full rounded-xl border-slate-200 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 bg-slate-50 px-4 py-3 text-sm font-bold border transition-all"
            />
          </label>
        </div>
        <label className="block space-y-1">
          <div className="flex items-center gap-1 mb-1">
            <Users className="w-3 h-3 text-slate-400" />
            <span className="text-xs font-bold text-slate-500">브랜드 파트너 후원 (필수 4명)</span>
          </div>
          <input 
            type="number" min="0"
            value={performance.ufi.sponsoredBrandPartners}
            onChange={(e) => handleChange('ufi', 'sponsoredBrandPartners', parseInt(e.target.value) || 0)}
            className="w-full rounded-xl border-slate-200 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 bg-slate-50 px-4 py-3 text-sm font-bold border transition-all"
            placeholder="현재 후원 인원수"
          />
        </label>
      </div>

      <div className="pt-4">
        <button 
          onClick={onGetAdvice}
          disabled={isAdviceLoading}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-black py-4 px-6 rounded-2xl shadow-xl shadow-indigo-100 transition-all flex items-center justify-center gap-3 disabled:opacity-50 active:scale-95"
        >
          {isAdviceLoading ? (
            <div className="flex items-center gap-2">
              <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
              <span>전략 분석 중...</span>
            </div>
          ) : (
            <><Sparkles className="w-5 h-5 text-yellow-300" /> 30년 경력 멘토 전략 리포트</>
          )}
        </button>
      </div>
    </div>
  );
};

export default InputSection;
