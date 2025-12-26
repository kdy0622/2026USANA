
import React, { useState } from 'react';
import { Calendar, CheckCircle2, Flag, ArrowRight, X, Sparkles, BookOpen } from 'lucide-react';

const Roadmap: React.FC = () => {
  const [selectedQuarter, setSelectedQuarter] = useState<number | null>(null);

  const quarters = [
    {
      month: '1분기',
      event: '레커니션 서밋 & 기초 다지기',
      description: '홈미팅과 1:1 미팅을 통해 비즈니스 엔진을 가동하는 시기입니다.',
      tasks: [
        '홈미팅 및 2:1 미팅을 통한 신규 가입자 5명 확보',
        '고게터 디스커버리 150 CP 유지 습관화 (9주 완료)',
        '페이스 세터 달성 파트너 발굴 및 집중 후원',
        'UFI 필수 활동 계획 수립 및 브랜드 후원 1차 시작',
      ],
      color: 'bg-rose-50 border-rose-100 text-rose-700',
      detail: {
        title: '1분기 전략: 미팅의 양이 질을 결정한다',
        focus: '홈미팅 시스템 안착 및 150 CP 안정화',
        action: [
          '주간 3회 이상의 홈미팅 및 2:1 미팅 루틴 확립',
          '자동주문 150 CP 고정 고객 10명 이상 확보',
          '신규 가입자 5명에 대한 제품 경험 및 비즈니스 쉐어링',
        ],
        tip: '1분기에는 결과 수치보다 미팅 횟수에 집중하세요. 5명의 신규 가입자가 향후 키리더의 씨앗이 됩니다.',
      }
    },
    {
      month: '2분기',
      event: '그로잉업 비전세미나 & 도약',
      description: '세미나의 에너지를 키리더 육성으로 연결하는 핵심 전환점입니다.',
      tasks: [
        '그로잉업 비전세미나 동반 참가 파트너 확보',
        '조직 내 키리더 3인 집중 트레이닝 및 로드맵 설계',
        '리더십 리트릿 포인트 70 CP 이상 확보 (본인 승급 포함)',
        '고게터 디스커버리 18주 유지 최종 마감 확인',
      ],
      color: 'bg-amber-50 border-amber-100 text-amber-700',
      detail: {
        title: '2분기 전략: 비전을 공유하고 리더를 세워라',
        focus: '그로잉업 비전세미나 활용 및 키리더 직급 도전',
        action: [
          '그로잉업 비전세미나 이후 파트너별 맞춤형 애프터 미팅',
          '키리더 3인과 함께 주간 1,000 CP 성장 전략 수립',
          '파트너 디렉터 승급을 위한 12주 집중 코칭 프로그램 가동',
        ],
        tip: '비전세미나의 열기는 일주일을 넘기지 않아야 합니다. 행사 직후 키리더들과 명확한 승급 목표를 공유하세요.',
      }
    },
    {
      month: '3분기',
      event: '리더십 어워즈 & 최종 달성',
      description: '마지막 스퍼트를 통해 모든 인센티브 달성을 확정 짓는 시기입니다.',
      tasks: [
        '리더십 리트릿 150 CP 최종 달성 (2인권 확보)',
        'UFI 8,000 CP 및 브랜드 파트너 4인 후원 완료',
        '이그제큐티브 직급 갱신 및 신규 달성 마감',
        '달성 축하 및 내년도 파트너 인센티브 가이드',
      ],
      color: 'bg-emerald-50 border-emerald-100 text-emerald-700',
      detail: {
        title: '3분기 전략: 끝까지 CP 숫자를 챙기는 리더십',
        focus: '인센티브 점수 최종 마감 및 2인권 확보',
        action: [
          '부족한 CP 성장 수치를 주단위로 분석하여 집중 후원',
          '이그제큐티브 유지 조건 최종 점검 (승급 포인트 확인)',
          '인센티브 달성 노하우를 파트너들에게 복제 시스템으로 전수',
        ],
        tip: '마지막 10%의 노력이 인센티브 여행의 품격을 바꿉니다. 150 CP, 8,000 CP 등 정확한 숫자를 매일 체크하세요.',
      }
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-700">
      <div className="text-center space-y-3">
        <h2 className="text-3xl font-black text-slate-800 flex items-center justify-center gap-3 tracking-tighter">
          <Flag className="text-blue-600 w-8 h-8" /> 2026 성공 로드맵
        </h2>
        <p className="text-slate-500 max-w-2xl mx-auto font-semibold leading-relaxed">
          분기별 정밀 전략을 통해 2026 유사나 인센티브의 주인공이 되십시오.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-2">
        {quarters.map((q, idx) => (
          <div key={idx} className={`rounded-[2.5rem] border-2 p-8 flex flex-col space-y-6 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 relative overflow-hidden group ${q.color}`}>
            <div className="absolute top-[-10%] right-[-10%] w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:scale-125 transition-transform"></div>
            <div className="flex items-center justify-between relative z-10">
              <span className="text-5xl font-black opacity-10 italic">{q.month}</span>
              <Calendar className="w-7 h-7" />
            </div>
            <div className="relative z-10">
              <h3 className="font-black text-xl mb-2 flex items-center gap-2 tracking-tight">
                {q.event}
              </h3>
              <p className="text-sm opacity-80 leading-relaxed font-bold">
                {q.description}
              </p>
            </div>
            <div className="h-0.5 bg-current opacity-10 w-full relative z-10"></div>
            <ul className="space-y-4 flex-grow relative z-10">
              {q.tasks.map((task, i) => (
                <li key={i} className="flex gap-3 items-start text-[13px] leading-snug">
                  <CheckCircle2 className="w-5 h-5 mt-0.5 flex-shrink-0 text-current" />
                  <span className="font-bold">{task}</span>
                </li>
              ))}
            </ul>
            <div className="pt-2 relative z-10">
              <button 
                onClick={() => setSelectedQuarter(idx)}
                className="w-full py-3.5 bg-white/50 backdrop-blur-md rounded-2xl text-xs font-black hover:bg-white/80 transition-all flex items-center justify-center gap-2 shadow-sm uppercase tracking-widest"
              >
                <BookOpen className="w-4 h-4" /> 전략 리포트 <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedQuarter !== null && (
        <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-md z-[110] flex items-center justify-center p-4 animate-in fade-in duration-300" onClick={() => setSelectedQuarter(null)}>
          <div className="bg-white rounded-[3rem] shadow-2xl max-w-lg w-full overflow-hidden animate-in zoom-in duration-400" onClick={e => e.stopPropagation()}>
            <div className={`p-10 ${quarters[selectedQuarter].color} border-b relative overflow-hidden`}>
               <div className="absolute top-0 right-0 p-4 opacity-10">
                 <Sparkles className="w-24 h-24" />
               </div>
              <div className="flex justify-between items-start mb-2 relative z-10">
                <span className="text-[10px] font-black uppercase tracking-[0.3em] opacity-60">Strategic Deep Dive</span>
                <button onClick={() => setSelectedQuarter(null)} className="p-2 hover:bg-black/10 rounded-full transition-colors">
                  <X className="w-6 h-6" />
                </button>
              </div>
              <h3 className="text-2xl font-black relative z-10 tracking-tight">{quarters[selectedQuarter].detail.title}</h3>
            </div>
            <div className="p-10 space-y-8">
              <div className="space-y-3">
                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">분기별 핵심 가치</h4>
                <p className="text-xl font-black text-slate-800 leading-tight">{quarters[selectedQuarter].detail.focus}</p>
              </div>
              <div className="space-y-4">
                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">세부 액션 플랜</h4>
                <ul className="space-y-4">
                  {quarters[selectedQuarter].detail.action.map((a, i) => (
                    <li key={i} className="flex items-start gap-4 text-slate-600 leading-relaxed text-sm">
                      <div className="w-6 h-6 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center flex-shrink-0 text-[11px] font-black mt-0.5 shadow-sm">
                        {i + 1}
                      </div>
                      <span className="font-bold">{a}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-blue-50/50 p-6 rounded-3xl border border-blue-100 relative">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-5 h-5 text-blue-600" />
                  <span className="text-xs font-black text-blue-800 uppercase tracking-tighter">멘토의 시크릿 팁</span>
                </div>
                <p className="text-sm text-blue-900 leading-loose font-bold italic opacity-80">
                  "{quarters[selectedQuarter].detail.tip}"
                </p>
              </div>
              <button 
                onClick={() => setSelectedQuarter(null)}
                className="w-full py-5 bg-slate-900 text-white rounded-[1.5rem] font-black hover:bg-black transition-all shadow-2xl active:scale-[0.98]"
              >
                전략 승인 및 확인
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Roadmap;
