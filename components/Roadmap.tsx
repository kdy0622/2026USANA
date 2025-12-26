
import React, { useState } from 'react';
import { Calendar, CheckCircle2, Flag, ArrowRight, X, Sparkles, BookOpen } from 'lucide-react';

interface StrategyDetail {
  title: string;
  focus: string;
  action: string[];
  tip: string;
}

const Roadmap: React.FC = () => {
  const [selectedQuarter, setSelectedQuarter] = useState<number | null>(null);

  const quarters = [
    {
      month: '4월',
      event: '1분기 레커니션 서밋 (기초 성장의 달)',
      description: '초기 비즈니스 셋업과 기초 체력을 검증하는 시기입니다.',
      tasks: [
        '고게터 디스커버리 18주 유지의 절반(9주) 달성 확인',
        '신규 파트너 2명 승급 로드맵 확정 및 집중 후원',
        '개인 누적 성장 CP 2,000 이상 확보로 조기 달성 가시화',
        'UFI 필수 활동(브랜드 홍보 등) 30% 이상 완료',
      ],
      color: 'bg-rose-50 border-rose-100 text-rose-700',
      detail: {
        title: '1분기: 기초 시스템 구축 전략',
        focus: '페이스 세터 배출 및 150CP 유지 안정화',
        action: [
          '주간 활동 보고서를 통한 파트너 CP 추적 시스템 도입',
          '홈 파티 및 일대일 미팅을 통한 신규 가입자 5명 확보',
          '기존 고객 재구매 관리를 통한 자동주문 150CP 고정',
        ],
        tip: '이 시기에는 결과보다 습관을 만드는 것에 집중하세요. 매일 3명에게 유사나를 알리는 시스템을 구축해야 합니다.',
      }
    },
    {
      month: '7월',
      event: '상반기 그랜드 컨벤션 (도약의 시기)',
      description: '본격적인 조직 성장과 리더십을 발휘해야 하는 전환점입니다.',
      tasks: [
        '고게터 디스커버리 최종 자격 기간 마감 및 서류 검토',
        '리더십 리트릿 포인트 70점 이상 누적 (본인 승급 포함)',
        '직접 후원 파트너 디렉터 1인 이상 배출 완료',
        '상반기 실적 분석을 통한 하반기 리더십 그룹 재정비',
      ],
      color: 'bg-amber-50 border-amber-100 text-amber-700',
      detail: {
        title: '2분기: 조직 확장 및 리더십 강화',
        focus: '파트너 승급(디렉터 이상)을 통한 승급 점수 극대화',
        action: [
          '그랜드 컨벤션 동반 참가 파트너 10명 이상 확보',
          '조직 내 핵심 리더 3인 집중 트레이닝 (승급 로드맵)',
          '더블 점수 프로모션 기간에 맞춰 집중 성장 CP 확보',
        ],
        tip: '컨벤션의 에너지를 비즈니스로 연결하는 것이 핵심입니다. 행사 직후의 열기를 팔로우업 미팅으로 전환하세요.',
      }
    },
    {
      month: '10월',
      event: '3분기 리더십 어워즈 (결실의 달)',
      description: '목표 달성을 확정 짓고 내년 비즈니스를 준비하는 골든타임입니다.',
      tasks: [
        '리더십 리트릿 150점 조기 달성으로 2인 초청권 확보',
        '이그제큐티브 직급 갱신 및 신규 달성 최종 마무리',
        '내년도 인센티브 대상 파트너 선발 및 1:1 상담 진행',
        'UFI 최종 달성률 100% 확보 및 여행 준비',
      ],
      color: 'bg-emerald-50 border-emerald-100 text-emerald-700',
      detail: {
        title: '3분기: 인센티브 달성 확정 및 복제',
        focus: '최종 점수 마감 및 2인권 확보(150점 타겟)',
        action: [
          '부족한 점수(CVP 성장/승급)를 분석하여 주단위 마감 전략 수립',
          '이그제큐티브 유지 조건을 위한 리더십 포인트 최종 점검',
          '달성된 성과를 바탕으로 내년도 시스템 복제 준비',
        ],
        tip: '마지막 10%가 결과를 결정합니다. 포기하지 않고 끝까지 숫자를 챙기는 리더가 결국 여행 가방을 쌉니다.',
      }
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-slate-800 flex items-center justify-center gap-3">
          <Flag className="text-blue-600" /> 2026 유사나 성공 성장 로드맵
        </h2>
        <p className="text-slate-500 max-w-2xl mx-auto">
          체계적인 분기별 성장을 통해 인센티브의 주인공이 되십시오.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {quarters.map((q, idx) => (
          <div key={idx} className={`rounded-3xl border p-7 flex flex-col space-y-5 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 ${q.color}`}>
            <div className="flex items-center justify-between">
              <span className="text-4xl font-black opacity-20">{q.month}</span>
              <Calendar className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-xl mb-2 flex items-center gap-2">
                {q.event}
              </h3>
              <p className="text-sm opacity-90 leading-relaxed font-medium">
                {q.description}
              </p>
            </div>
            <div className="h-px bg-current opacity-20 w-full"></div>
            <ul className="space-y-4 flex-grow">
              {q.tasks.map((task, i) => (
                <li key={i} className="flex gap-3 items-start text-[13px] leading-snug">
                  <CheckCircle2 className="w-5 h-5 mt-0.5 flex-shrink-0" />
                  <span className="font-medium">{task}</span>
                </li>
              ))}
            </ul>
            <div className="pt-2">
              <button 
                onClick={() => setSelectedQuarter(idx)}
                className="w-full py-2 bg-white/40 rounded-xl text-xs font-bold hover:bg-white/60 transition-colors flex items-center justify-center gap-2"
              >
                <BookOpen className="w-3 h-3" /> 상세 전략 보기 <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* 상세 전략 모달 */}
      {selectedQuarter !== null && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-white rounded-[2.5rem] shadow-2xl max-w-lg w-full overflow-hidden animate-in zoom-in duration-300">
            <div className={`p-8 ${quarters[selectedQuarter].color} border-b`}>
              <div className="flex justify-between items-start mb-2">
                <span className="text-xs font-bold uppercase tracking-widest opacity-70">Detailed Strategy</span>
                <button onClick={() => setSelectedQuarter(null)} className="p-1 hover:bg-black/10 rounded-full transition-colors">
                  <X className="w-6 h-6" />
                </button>
              </div>
              <h3 className="text-2xl font-black">{quarters[selectedQuarter].detail.title}</h3>
            </div>
            <div className="p-8 space-y-6">
              <div className="space-y-2">
                <h4 className="text-sm font-bold text-slate-400 uppercase tracking-tighter">집중 목표</h4>
                <p className="text-lg font-bold text-slate-800">{quarters[selectedQuarter].detail.focus}</p>
              </div>
              <div className="space-y-3">
                <h4 className="text-sm font-bold text-slate-400 uppercase tracking-tighter">핵심 실행 계획</h4>
                <ul className="space-y-3">
                  {quarters[selectedQuarter].detail.action.map((a, i) => (
                    <li key={i} className="flex items-start gap-3 text-slate-600 leading-snug text-sm">
                      <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0 text-[10px] font-bold mt-0.5">
                        {i + 1}
                      </div>
                      <span>{a}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-blue-50 p-4 rounded-2xl border border-blue-100">
                <div className="flex items-center gap-2 mb-1">
                  <Sparkles className="w-4 h-4 text-blue-600" />
                  <span className="text-xs font-bold text-blue-700">멘토의 한마디</span>
                </div>
                <p className="text-sm text-blue-800 leading-relaxed italic">
                  "{quarters[selectedQuarter].detail.tip}"
                </p>
              </div>
              <button 
                onClick={() => setSelectedQuarter(null)}
                className="w-full py-4 bg-slate-800 text-white rounded-2xl font-bold hover:bg-slate-900 transition-all"
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="bg-gradient-to-r from-blue-700 to-indigo-800 rounded-3xl p-10 text-white shadow-2xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
          <div className="flex-grow text-center md:text-left">
            <h3 className="text-2xl font-bold mb-4">"성공은 명확한 로드맵에서 시작됩니다."</h3>
            <p className="text-blue-100 text-sm leading-relaxed max-w-2xl">
              로드맵의 각 단계를 달성하는 것은 단순한 실적 그 이상의 가치가 있습니다. 
              상세 전략을 기반으로 오늘 당장 실행할 수 있는 작은 액션부터 시작하십시오.
            </p>
          </div>
        </div>
        <div className="absolute top-[-20%] right-[-10%] w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
      </div>
    </div>
  );
};

export default Roadmap;
