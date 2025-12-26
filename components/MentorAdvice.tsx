
import React from 'react';
import { MessageSquareQuote, ShieldCheck, UserCheck, Share2 } from 'lucide-react';

interface Props {
  advice: string;
  isLoading: boolean;
}

const MentorAdvice: React.FC<Props> = ({ advice, isLoading }) => {
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-6">
        <div className="relative">
          <div className="w-24 h-24 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
             <UserCheck className="w-10 h-10 text-blue-600" />
          </div>
        </div>
        <div className="text-center space-y-2">
          <p className="text-slate-800 font-bold text-lg">데이터 분석 및 전략 수립 중...</p>
          <p className="text-slate-400 text-sm">당신의 다음 단계 성장을 위한 최적의 조언을 구성하고 있습니다.</p>
        </div>
      </div>
    );
  }

  if (!advice) {
    return (
      <div className="text-center p-16 bg-white rounded-3xl border-2 border-dashed border-slate-200 shadow-inner">
        <MessageSquareQuote className="w-16 h-16 text-slate-200 mx-auto mb-6" />
        <h3 className="text-xl font-bold text-slate-700 mb-2">당신의 비즈니스 멘토가 기다리고 있습니다.</h3>
        <p className="text-slate-400 max-w-sm mx-auto">실적 데이터를 입력하신 후 '멘토 조언 받기'를 클릭하시면 맞춤형 인센티브 달성 전략을 확인하실 수 있습니다.</p>
      </div>
    );
  }

  const renderAdvice = (text: string) => {
    return text.split('\n').map((line, i) => {
      if (line.startsWith('# ')) return <h1 key={i} className="text-3xl font-bold text-blue-900 mt-8 mb-6 border-b-2 border-blue-100 pb-2">{line.replace('# ', '')}</h1>;
      if (line.startsWith('## ')) return <h2 key={i} className="text-2xl font-bold text-blue-800 mt-6 mb-4">{line.replace('## ', '')}</h2>;
      if (line.startsWith('### ')) return <h3 key={i} className="text-xl font-bold text-blue-700 mt-5 mb-3">{line.replace('### ', '')}</h3>;
      if (line.startsWith('- ')) return <li key={i} className="ml-6 mb-3 text-slate-700 list-disc marker:text-blue-500 pl-2">{line.replace('- ', '')}</li>;
      if (line.trim() === '') return <div key={i} className="h-4" />;
      return <p key={i} className="mb-4 text-slate-700 leading-loose text-lg">{line}</p>;
    });
  };

  return (
    <div className="animate-in fade-in zoom-in duration-500 max-w-4xl mx-auto">
      <div className="bg-white rounded-[2rem] shadow-2xl overflow-hidden border border-blue-50">
        <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-900 p-10 text-white flex flex-col md:flex-row items-center gap-8 relative overflow-hidden">
          <div className="w-24 h-24 rounded-full bg-white/20 flex items-center justify-center border-4 border-white/30 backdrop-blur-xl shadow-inner relative z-10">
            <ShieldCheck className="w-12 h-12" />
          </div>
          <div className="text-center md:text-left relative z-10">
            <h2 className="text-3xl font-bold mb-2">비즈니스 성공 전략 리포트</h2>
            <p className="text-blue-100 text-lg opacity-90 font-medium">성공을 향한 당신의 걸음에 확신을 더해드립니다.</p>
          </div>
          {/* Decorative background shape */}
          <div className="absolute right-[-5%] top-[-20%] w-48 h-48 bg-white/10 rounded-full blur-2xl"></div>
        </div>
        <div className="p-10 md:p-16 prose max-w-none">
          {renderAdvice(advice)}
          
          <div className="mt-16 pt-10 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 rounded-full bg-slate-100 border border-slate-200 overflow-hidden">
                <img src="https://picsum.photos/id/1027/100/100" className="w-full h-full object-cover" alt="Mentor Profile" />
              </div>
              <div>
                <p className="text-lg font-bold text-slate-800">유사나 코리아 리더 그룹</p>
                <p className="text-sm text-slate-500 font-medium">비즈니스 성공 전략 자문팀</p>
              </div>
            </div>
            <div className="flex gap-4">
              <button className="bg-slate-50 text-slate-600 px-6 py-3 rounded-2xl text-sm font-bold hover:bg-slate-100 transition-all flex items-center gap-2 border border-slate-200">
                <Share2 className="w-4 h-4" /> 리포트 공유하기
              </button>
              <button className="bg-blue-600 text-white px-8 py-3 rounded-2xl text-sm font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-100">
                PDF로 저장
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentorAdvice;
