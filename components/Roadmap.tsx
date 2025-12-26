
import React, { useState } from 'react';
import { Calendar, CheckCircle2, Flag, ArrowRight, X, Sparkles, BookOpen } from 'lucide-react';

const Roadmap: React.FC = () => {
  const [selectedQuarter, setSelectedQuarter] = useState<number | null>(null);

  const quarters = [
    {
      month: '1분기',
      event: '기초 엔진 가동 및 미팅 시스템',
      description: '비즈니스의 기초 체력을 다지고 활동량을 극대화하는 시기입니다.',
      tasks: [
        '홈미팅 및 2:1 미팅을 통한 신규 가입자 5명 확보',
        '고게터 디스커버리 150 CP 유지 시스템 정착 (9주 마감)',
        '페이스 세터 달성 파트너 발굴 및 1:1 집중 코칭',
        'UFI 8,000 CP 달성을 위한 브랜드 파트너 후원 1차 시작',
      ],
      color: 'bg-rose-50 border-rose-100 text-rose-700',
      detail: {
        title: '1분기 전략: 미팅의 횟수가 결과를 만든다',
        focus: '홈미팅 및 2:1 미팅 루틴화 (신규 5인 타겟)',
        action: [
          '주간 3회 이상의 홈미팅/외부 미팅 일정 고정',
          '기존 고객 및 가망고객 명단 리셋 및 150 CP 자동주문 관리',
          '신규 가입자 5인에 대한 제품 가이드 및 비전 공유',
        ],
        tip: '1분기에는 결과 수치보다 미팅 횟수에 집중하세요. 5명의 신규 가입자가 비즈니스의 씨앗이 됩니다.',
      }
    },
    {
      month: '2분기',
      event: '그로잉업 비전세미나 & 키리더 육성',
      description: '세미나의 에너지를 조직 성장으로 연결하는 도약의 시기입니다.',
      tasks: [
        '그로잉업 비전세미나 동반 참가 파트너 리스트업',
        '조직 내 키리더 3인 선발 및 승급 로드맵 확정',
        '리더십 리트릿 포인트 70 CP 이상 확보',
        '고게터 디스커버리 18주 유지 최종 완료 점검',
      ],
      color: 'bg-amber-50 border-amber-100 text-amber-700',
      detail: {
        title: '2분기 전략: 비전을 공유하고 시스템에 플러그인',
        focus: '그로잉업 비전세미나 활용 및 키리더 집중 후원',
        action: [
          '그로잉업 비전세미나 참가 파트너 10인 이상 목표',
          '키리더 3인에 대한 직급 승급(디렉터 이상) 집중 지원',
          'CP 성장 프로모션 기간에 맞춘 팀 볼륨 극대화',
        ],
        tip: '비전세미나는 가장 강력한 도구입니다. 세미나 현장의 열기를 팀 미팅으로 신속히 연결하세요.',
      }
    },
    {
      month: '3분기',
      event: '인센티브 달성 확정 및 복제',
      description: '모든 점수를 마감하고 내년의 성공을 미리 준비하는 시기입니다.',
      tasks: [
        '리더십 리트릿 150 CP 최종 달성 (2인권 확보)',
        'UFI 8,000 CP 및 브랜드 파트너 4인 후원 최종 마감',
        '이그제큐티브 직급 갱신 및 신규 승급 포인트 확인',
        '인센티브 달성 노하우 팀 전체 복제 교육 가동',
      ],
      color: 'bg-emerald-50 border-emerald-100 text-emerald-700',
      detail: {
        title: '3분기 전략: 디테일한 수치 마감이 성공을 결정한다',
        focus: '최종 CP 점수 마감 및 150 CP/8,000 CP 타겟 확보',
        action: [
          '부족한 CP 성장 수치를 주단위로 쪼개어 집중 마감',
          '이그제큐티브 유지 조건을 위한 리더십 포인트 최종 점검',
          '달성 성과를 공유하고 내년도 챌린저 명단 구성',
        ],
        tip: '마지막 10%의 노력이 여행의 품격을 바꿉니다. 8,000 CP 등 구체적인 숫자를 매일 체크하세요.',
      }
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-700">
      <div className="text-center space-y-3">
        <h2 className="text-3xl font-black text-slate-800 flex items-center justify-center gap-3 tracking-tighter">
          <Flag className="text-blue-600 w-8 h-8" /> 2026 유사나 성공 로드맵
        </h2>
        <p className="text-slate-500 max-w-2xl mx-auto font-bold">
          분기별 정밀 전략을 통해 인센티브의 주인공이 되십시오.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-2">
        {quarters.map((q, idx) => (
          <div key={idx} className={`rounded-[2.5rem] border-2 p-8 flex flex-col space-y-6 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 group ${q.color}`}>
            <div className="flex items-center justify-between">
              <span className="text-5xl font-black opacity-10 italic uppercase">{q.month}</span>
              <Calendar className="w-7 h-7" />
            </div>
            <div>
              <h3 className="font-black text-xl mb-2 tracking-tight">{q.event}</h3>
              <p className="text-sm opacity-80 leading-relaxed font-bold">{q.description}</p>
            </div>
            <div className="h-0.5 bg-current opacity-10 w-full"></div>
            <ul className="space-y-4 flex-grow">
              {q.tasks.map((task, i) => (
                <li key={i} className="flex gap-3 items-start text-[13px] leading-snug">
                  <CheckCircle2 className="w-5 h-5 mt-0.5 flex-shrink-0" />
                  <span className="font-bold">{task}</span>
                </li>
              ))}
            </ul>
            <div className="pt-2">
              <button 
                onClick={() => setSelectedQuarter(idx)}
                className="w-full py-3.5 bg-white/60 backdrop-blur-md rounded-2xl text-xs font-black hover:bg-white/80 transition-all flex items-center justify-center gap-2 shadow-sm"
              >
                <BookOpen className="w-4 h-4" /> 전략 리포트 확인 <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedQuarter !== null && (
        <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-md z-[110] flex items-center justify-center p-4" onClick={() => setSelectedQuarter(null)}>
          <div className="bg-white rounded-[2.5rem] shadow-2xl max-w-lg w-full overflow-hidden animate-in zoom-in" onClick={e => e.stopPropagation()}>
            <div className={`p-8 ${quarters[selectedQuarter].color} border-b`}>
              <div className="flex justify-between items-start mb-2">
                <span className="text-[10px] font-black uppercase tracking-widest opacity-60">Strategic Action Plan</span>
                <button onClick={() => setSelectedQuarter(null)} className="p-1 hover:bg-black/10 rounded-full transition-colors">
                  <X className="w-6 h-6" />
                </button>
              </div>
              <h3 className="text-2xl font-black tracking-tight">{quarters[selectedQuarter].detail.title}</h3>
            </div>
            <div className="p-8 space-y-6">
              <div className="space-y-2">
                <h4 className="text-[10px] font-black text-slate-400 uppercase">분기별 핵심 목표</h4>
                <p className="text-xl font-bold text-slate-800 leading-tight">{quarters[selectedQuarter].detail.focus}</p>
              </div>
              <div className="space-y-3">
                <h4 className="text-[10px] font-black text-slate-400 uppercase">실행 가이드</h4>
                <ul className="space-y-3">
                  {quarters[selectedQuarter].detail.action.map((a, i) => (
                    <li key={i} className="flex items-start gap-4 text-slate-600 text-sm font-semibold leading-relaxed">
                      <div className="w-6 h-6 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center flex-shrink-0 text-[11px] font-black mt-0.5">
                        {i + 1}
                      </div>
                      <span>{a}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-5 h-5 text-blue-600" />
                  <span className="text-xs font-black text-blue-800 uppercase">멘토 시크릿</span>
                </div>
                <p className="text-sm text-blue-900 leading-loose font-bold italic opacity-80">
                  "{quarters[selectedQuarter].detail.tip}"
                </p>
              </div>
              <button onClick={() => setSelectedQuarter(null)} className="w-full py-4 bg-slate-800 text-white rounded-2xl font-black shadow-lg">
                로드맵 확인 완료
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Roadmap;
