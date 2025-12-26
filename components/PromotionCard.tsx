
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

interface Props {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  status: { points: number; percent: number };
  pointsLabel: string;
  requiredPoints: number;
  isQualified: boolean;
  fullWidth?: boolean;
}

const PromotionCard: React.FC<Props> = ({ title, subtitle, icon, status, pointsLabel, requiredPoints, isQualified, fullWidth }) => {
  const chartData = [
    { name: 'Progress', value: status.percent },
    { name: 'Remaining', value: Math.max(0, 100 - status.percent) },
  ];

  const COLORS = ['#3b82f6', '#e2e8f0'];

  return (
    <div className={`bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col ${fullWidth ? 'w-full' : ''}`}>
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-slate-50 rounded-xl">
            {icon}
          </div>
          <div>
            <h3 className="font-bold text-lg text-slate-800">{title}</h3>
            <p className="text-xs text-slate-500">{subtitle}</p>
          </div>
        </div>
        <div className={`px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase ${isQualified ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-500'}`}>
          {isQualified ? 'Qualified' : 'Pending'}
        </div>
      </div>

      <div className="flex items-center gap-8 flex-grow">
        <div className="w-24 h-24 relative flex-shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                innerRadius={30}
                outerRadius={45}
                paddingAngle={0}
                dataKey="value"
                startAngle={90}
                endAngle={-270}
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="none" />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-lg font-bold text-blue-600">{Math.round(status.percent)}%</span>
          </div>
        </div>

        <div className="space-y-2 flex-grow">
          <div className="flex justify-between text-sm">
            <span className="text-slate-500">{pointsLabel}</span>
            <span className="font-bold text-slate-800">{status.points} / {requiredPoints}</span>
          </div>
          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
            <div 
              className="bg-blue-500 h-full rounded-full transition-all duration-700"
              style={{ width: `${status.percent}%` }}
            ></div>
          </div>
          <p className="text-[11px] text-slate-400 italic">
            * {requiredPoints}점 달성 시 2026 {title} 자격 획득
          </p>
        </div>
      </div>
    </div>
  );
};

export default PromotionCard;
