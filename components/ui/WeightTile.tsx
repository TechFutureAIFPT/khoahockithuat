import React, { useMemo, useRef, useState, useEffect } from 'react';
import type { MainCriterion, WeightCriteria } from '../../types';

interface WeightTileProps {
  criterion: MainCriterion;
  setWeights: React.Dispatch<React.SetStateAction<WeightCriteria>>;
  isExpanded: boolean;
  onToggle: () => void;
}

const clampWeight = (value: number) => Math.max(0, Math.min(100, Number.isNaN(value) ? 0 : value));

const WeightTile: React.FC<WeightTileProps> = ({ criterion, setWeights, isExpanded, onToggle }) => {
  const [measuredHeight, setMeasuredHeight] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);

  const total = useMemo(() => {
    return criterion.children?.reduce((sum, child) => sum + child.weight, 0) || 0;
  }, [criterion.children]);

  useEffect(() => {
    if (contentRef.current) {
      setMeasuredHeight(contentRef.current.scrollHeight);
    }
  }, [criterion.children]);

  useEffect(() => {
    if (isExpanded && contentRef.current) {
      setMeasuredHeight(contentRef.current.scrollHeight);
    }
  }, [isExpanded]);

  const handleSubChange = (childKey: string, newValue: number) => {
    const safeValue = clampWeight(newValue);
    setWeights((prev) => {
      const newCriterion = { ...prev[criterion.key] };
      if (newCriterion.children) {
        newCriterion.children = newCriterion.children.map((child) =>
          child.key === childKey ? { ...child, weight: safeValue } : child
        );
      }
      return { ...prev, [criterion.key]: newCriterion };
    });
  };

  const getProgressColor = () => {
    if (total >= 35) return 'from-emerald-400 via-emerald-300 to-cyan-300';
    if (total >= 15) return 'from-blue-400 via-cyan-300 to-sky-300';
    return 'from-amber-400 via-orange-300 to-yellow-300';
  };

  return (
    <div
      className={`rounded-xl border bg-slate-900/40 transition-all duration-300 hover:border-cyan-500/40 ${
        isExpanded ? 'border-cyan-500/50' : 'border-slate-800'
      }`}
    >
      <button
        type="button"
        className="w-full text-left p-3 flex items-center justify-between gap-3"
        onClick={onToggle}
        aria-expanded={isExpanded}
      >
        <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-slate-800/70 flex items-center justify-center text-lg text-cyan-200">
              <i className={`${criterion.icon} ${criterion.color}`}></i>
            </div>
            <div>
              <p className="text-sm font-semibold text-white">{criterion.name}</p>
              <div className="flex items-center gap-2 mt-0.5">
                 <div className="h-1.5 w-24 rounded-full bg-slate-800 overflow-hidden">
                    <div
                        className={`h-full rounded-full bg-gradient-to-r ${getProgressColor()}`}
                        style={{ width: `${Math.min(total, 100)}%` }}
                    ></div>
                 </div>
                 <span className="text-[10px] text-slate-400">{total}%</span>
              </div>
            </div>
        </div>
        
        <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-bold text-white">{total}%</p>
            </div>
            <i className={`fa-solid fa-chevron-down text-xs text-slate-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`}></i>
        </div>
      </button>

      <div
        className="overflow-hidden transition-[height,opacity] duration-250 ease-out"
        style={{ height: isExpanded ? measuredHeight : 0, opacity: isExpanded ? 1 : 0 }}
      >
        <div ref={contentRef} className="border-t border-slate-800 p-3 space-y-3 bg-slate-900/20">
          {criterion.children?.map((child) => {
            const sliderMax = Math.max(60, child.weight);
            const sliderPercent = (child.weight / sliderMax) * 100;
            return (
              <div key={child.key} className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-800/40 transition-colors">
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center mb-1">
                        <p className="text-xs font-medium text-slate-200 truncate">{child.name}</p>
                        <span className="text-[10px] text-slate-500">{child.weight}%</span>
                    </div>
                    <input
                        type="range"
                        min={0}
                        max={sliderMax}
                        value={child.weight}
                        onChange={(e) => handleSubChange(child.key, parseInt(e.target.value, 10))}
                        className="w-full h-1.5 rounded-full appearance-none cursor-pointer bg-slate-700"
                        style={{
                        background: `linear-gradient(90deg, rgba(14,165,233,1) ${sliderPercent}%, rgba(51,65,85,1) ${sliderPercent}%)`,
                        }}
                    />
                  </div>
                  <input
                      type="number"
                      min={0}
                      max={100}
                      value={child.weight}
                      onChange={(e) => handleSubChange(child.key, parseInt(e.target.value, 10))}
                      className="w-12 rounded-md border border-slate-700 bg-slate-950 px-1.5 py-1 text-xs text-white text-center focus:outline-none focus:ring-1 focus:ring-cyan-400"
                  />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default WeightTile;
