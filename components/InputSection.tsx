
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
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 space-y-6">
      <div className="flex items-center justify-between border-b pb-4">
        <h2 className="text-xl font-bold text-slate-800">실적 데이터 입력</h2>
        <div className="group relative">
          <Info className="w-5 h-5 text-slate-400 cursor-help" />
          <div className="absolute right-0 top-6 w-64 p-3 bg-slate-800 text-white text-[11px] rounded-lg opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none shadow-xl leading-relaxed">
            * 자격 기간 내 실적을 입력하세요.<br/>
            * 더블 프로모션 체크 시 UFI 신규 획득 점수가 2배로 계산됩니다.
          </div>
        </div>
      </div>

      {/* 더블 점수 체크박스 (UFI 한정) */}
      <div className="bg-amber-50 border border-amber-100 p-3 rounded-xl flex items-center justify-between">
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
            <span className="text-sm font-bold text-amber-800 tracking-tight">UFI 더블 점수 기간</span>
          </div>
          <span className="text-[10px] text-amber-600 ml-6">* 신규 점수 2배 적용</span>
        </div>
        <input 
          type="checkbox"
          checked={performance.isDoublePromotion}
          onChange={(e) => handleChange('root', 'isDoublePromotion', e.target.checked)}
          className="w-5 h-5 text-amber-600 border-amber-300 rounded focus:ring-amber-500 cursor-pointer"
        />
      </div>
      
      {/* 고게터 디스커버리 Inputs */}
      <div className="space-y-4">
        <h3 className="font-semibold text-blue-700 flex items-center gap-2">고게터 디스커버리</h3>
        <div className="grid grid-cols-1 gap-3">
          <label className="text-sm text-slate-600">
            150 CP 이상 유지 주수
            <input 
              type="number" min="0" max="26"
              value={performance.ggd.weeklyMaintenanceWeeks}
              onChange={(e) => handleChange('ggd', 'weeklyMaintenanceWeeks', parseInt(e.target.value) || 0)}
              className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-slate-50 px-3 py-2 text-sm border"
            />
          </label>
          <label className="text-sm text-slate-600">
            신규 성장 CP
            <input 
              type="number" min="0"
              value={performance.ggd.growthCP}
              onChange={(e) => handleChange('ggd', 'growthCP', parseInt(e.target.value) || 0)}
              className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-slate-50 px-3 py-2 text-sm border"
            />
          </label>
        </div>
      </div>

      {/* 리더십 비즈니스 리트릿 Inputs */}
      <div className="space-y-4 pt-2">
        <h3 className="font-semibold text-indigo-700 flex items-center gap-2">리더십 리트릿</h3>
        <div className="grid grid-cols-1 gap-3">
          <label className="text-sm text-slate-600">
            주별 성장 주수 (1,000 CP+)
            <input 
              type="number" min="0" max="52"
              value={performance.lbr.weeklyGrowthWeeks}
              onChange={(e) => handleChange('lbr', 'weeklyGrowthWeeks', parseInt(e.target.value) || 0)}
              className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-slate-50 px-3 py-2 text-sm border"
            />
          </label>
        </div>
      </div>

      {/* UFI 수기 입력 */}
      <div className="space-y-4 pt-2 border-t border-slate-100">
        <h3 className="font-semibold text-emerald-700 flex items-center gap-2 pt-2">UFI 점수 및 필수조건</h3>
        <div className="grid grid-cols-2 gap-3">
          <label className="text-xs text-slate-600">
            기존 누계 점수
            <input 
              type="number" min="0"
              value={performance.ufi.accumulatedPoints}
              onChange={(e) => handleChange('ufi', 'accumulatedPoints', parseInt(e.target.value) || 0)}
              className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-slate-50 px-3 py-2 text-sm border"
            />
          </label>
          <label className="text-xs text-slate-600">
            신규 점수
            <input 
              type="number" min="0"
              value={performance.ufi.newPoints}
              onChange={(e) => handleChange('ufi', 'newPoints', parseInt(e.target.value) || 0)}
              className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-slate-50 px-3 py-2 text-sm border"
            />
          </label>
        </div>
        <label className="text-xs text-slate-600 flex flex-col gap-1">
          <div className="flex items-center gap-1">
            <Users className="w-3 h-3" />
            <span>브랜드 파트너 후원 (필수 4명)</span>
          </div>
          <input 
            type="number" min="0"
            value={performance.ufi.sponsoredBrandPartners}
            onChange={(e) => handleChange('ufi', 'sponsoredBrandPartners', parseInt(e.target.value) || 0)}
            className="block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-slate-50 px-3 py-2 text-sm border"
            placeholder="후원 인원수 입력"
          />
        </label>
      </div>

      <div className="pt-4">
        <button 
          onClick={onGetAdvice}
          disabled={isAdviceLoading}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-xl shadow-lg shadow-indigo-200 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {isAdviceLoading ? (
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
          ) : (
            <><Sparkles className="w-5 h-5" /> 전문 멘토 전략 리포트 받기</>
          )}
        </button>
      </div>
    </div>
  );
};

export default InputSection;
