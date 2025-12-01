import React, { useMemo, useState, useCallback, memo } from 'react';
import type { HardFilters, WeightCriteria, MainCriterion } from '../../types';
import HardFilterPanel from '../ui/HardFilterPanel';
import WeightTile from '../ui/WeightTile';
import TotalWeightDisplay from '../ui/TotalWeightDisplay';

interface WeightsConfigProps {
  weights: WeightCriteria;
  setWeights: React.Dispatch<React.SetStateAction<WeightCriteria>>;
  hardFilters: HardFilters;
  setHardFilters: React.Dispatch<React.SetStateAction<HardFilters>>;
  onComplete: () => void;
}

const WeightsConfig: React.FC<WeightsConfigProps> = memo(({ weights, setWeights, hardFilters, setHardFilters, onComplete }) => {
  const [expandedCriterion, setExpandedCriterion] = useState<string | null>(null);
  const [validationErrorFilters, setValidationErrorFilters] = useState<string | null>(null);
  const [validationErrorWeights, setValidationErrorWeights] = useState<string | null>(null);
  const [step, setStep] = useState<1 | 2>(1); // 1: Tiêu chí Lọc, 2: Phân bổ Trọng số

  const totalWeight = useMemo(() => {
    return Object.values(weights).reduce((total: number, criterion: MainCriterion) => {
      if (criterion.children) {
        return total + criterion.children.reduce((subTotal, child) => subTotal + child.weight, 0);
      }
      return total + (criterion.weight || 0);
    }, 0);
  }, [weights]);

  const remainingWeight = 100 - totalWeight;

  const weightStatus = useMemo(() => {
    if (totalWeight === 100) {
      return { label: 'Đầy đủ', desc: 'Tổng trọng số đạt 100%', tone: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/30' };
    }
    if (totalWeight > 100) {
      return { label: 'Vượt ngưỡng', desc: `Thừa ${Math.abs(remainingWeight)}%`, tone: 'text-red-400', bg: 'bg-red-500/10 border-red-500/30' };
    }
    return { label: 'Chưa đủ', desc: `Thiếu ${Math.abs(remainingWeight)}%`, tone: 'text-amber-400', bg: 'bg-amber-500/10 border-amber-500/30' };
  }, [remainingWeight, totalWeight]);

  const primaryCriteria = useMemo(() => {
    return Object.values(weights).filter((c: MainCriterion) => c.children) as MainCriterion[];
  }, [weights]);

  const validateFilters = useCallback((): boolean => {
    setValidationErrorFilters(null);
    const mandatoryFieldsForValidation = [
      { key: 'location', label: 'Địa điểm làm việc' },
      { key: 'minExp', label: 'Kinh nghiệm tối thiểu' },
      { key: 'seniority', label: 'Cấp độ' },
      { key: 'education', label: 'Học vấn' },
      { key: 'industry', label: 'Ngành nghề' },
      { key: 'language', label: 'Ngôn ngữ' },
      { key: 'certificates', label: 'Chứng chỉ' },
      { key: 'salary', label: 'Lương' },
      { key: 'workFormat', label: 'Hình thức làm việc' },
      { key: 'contractType', label: 'Hợp đồng' },
    ];
    const invalidField = mandatoryFieldsForValidation.find(field => {
      const mandatoryKey = `${field.key}Mandatory` as keyof HardFilters;
      if (!hardFilters[mandatoryKey]) return false;
      if (field.key === 'salary') return !hardFilters.salaryMin && !hardFilters.salaryMax;
      const valueKey = field.key as keyof HardFilters;
      return !hardFilters[valueKey];
    });
    if (invalidField) {
      setValidationErrorFilters(`Vui lòng điền giá trị cho tiêu chí bắt buộc: ${invalidField.label}.`);
      return false;
    }
    return true;
  }, [hardFilters]);

  const handleFiltersComplete = useCallback(() => {
    if (!validateFilters()) return;
    setStep(2);
  }, [validateFilters]);

  const handleWeightsComplete = useCallback(() => {
    setValidationErrorWeights(null);
    if (totalWeight !== 100) {
      setValidationErrorWeights('Tổng trọng số phải bằng 100% trước khi tiếp tục.');
      return;
    }
    onComplete();
  }, [totalWeight, onComplete]);

  // Calculate mandatory filter progress
  const mandatoryProgress = useMemo(() => {
    const keys = Object.keys(hardFilters).filter(k => k.endsWith('Mandatory')) as Array<keyof HardFilters>;
    const active = keys.filter(k => hardFilters[k]).length;
    const fulfilled = keys.filter(k => {
        if (!hardFilters[k]) return false;
        const valKey = k.replace('Mandatory', '') as keyof HardFilters;
        const val = hardFilters[valKey];
        return typeof val === 'string' ? val.trim().length > 0 : Boolean(val);
    }).length;
    return { active, fulfilled, percent: active ? Math.round((fulfilled / active) * 100) : 0 };
  }, [hardFilters]);

  return (
    <section id="module-weights" className="module-pane active w-full">
      <div className="relative overflow-hidden bg-slate-950/50 border border-slate-800 rounded-2xl shadow-xl backdrop-blur-sm">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl"></div>

        <div className="relative z-10 p-6 space-y-6">
          {/* Compact Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800/50 pb-4">
            <div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
                  <span className="font-bold text-lg">2</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Cấu hình Tiêu chí</h3>
                  <p className="text-xs text-slate-400">Thiết lập bộ lọc và trọng số đánh giá</p>
                </div>
              </div>
            </div>
            
            {/* Step Indicator */}
            <div className="flex items-center bg-slate-900/50 rounded-lg p-1 border border-slate-800">
               <button 
                 onClick={() => setStep(1)}
                 className={`px-4 py-1.5 rounded-md text-xs font-medium transition-all ${step === 1 ? 'bg-slate-800 text-white shadow-sm' : 'text-slate-500 hover:text-slate-300'}`}
               >
                 1. Bộ lọc
               </button>
               <div className="w-px h-4 bg-slate-800 mx-1"></div>
               <button 
                 onClick={() => { if(validateFilters()) setStep(2); }}
                 className={`px-4 py-1.5 rounded-md text-xs font-medium transition-all ${step === 2 ? 'bg-slate-800 text-white shadow-sm' : 'text-slate-500 hover:text-slate-300'}`}
               >
                 2. Trọng số
               </button>
            </div>
          </div>

          <div className="grid lg:grid-cols-12 gap-6 items-stretch">
            {/* Left Column: Content Area (7 cols) */}
            <div className="lg:col-span-7 flex flex-col bg-slate-900/30 rounded-xl border border-slate-800/50 overflow-hidden min-h-[550px]">
               <div className="p-4 border-b border-slate-800/50 bg-slate-900/50">
                  <h4 className="font-medium text-slate-200 text-sm">
                      {step === 1 ? 'Cấu hình bộ lọc' : 'Danh sách tiêu chí'}
                  </h4>
               </div>
               
               <div className="overflow-y-auto p-4 custom-scrollbar flex-1">
                  {step === 1 ? (
                      <HardFilterPanel hardFilters={hardFilters} setHardFilters={setHardFilters} />
                  ) : (
                      <div className="space-y-4">
                        {primaryCriteria.map((criterion) => (
                          <WeightTile
                            key={criterion.key}
                            criterion={criterion}
                            setWeights={setWeights}
                            isExpanded={expandedCriterion === criterion.key}
                            onToggle={() =>
                              setExpandedCriterion((prev) => (prev === criterion.key ? null : criterion.key))
                            }
                          />
                        ))}
                      </div>
                  )}
               </div>
            </div>

            {/* Right Column: Controls & Info (5 cols) */}
            <div className="lg:col-span-5 flex flex-col bg-slate-900/30 rounded-xl border border-slate-800/50 overflow-hidden min-h-[550px]">
               <div className="p-4 border-b border-slate-800/50 bg-slate-900/50">
                  <h4 className="font-medium text-slate-200 text-sm">
                      Tổng quan & Thao tác
                  </h4>
               </div>
               
               <div className="p-6 flex flex-col flex-1">
                  {step === 1 ? (
                    <>
                      <div className="flex-1">
                        <div className="bg-slate-900/50 rounded-xl p-5 border border-slate-800 mb-4">
                            <h4 className="text-lg font-medium text-white mb-2">Tiêu chí Lọc (Hard Filters)</h4>
                            <p className="text-sm text-slate-400 mb-4">
                            Các tiêu chí này dùng để loại bỏ nhanh các ứng viên không đạt yêu cầu tối thiểu.
                            </p>
                            
                            <div className="space-y-3">
                                <div className="flex justify-between text-xs">
                                    <span className="text-slate-400">Tiêu chí bắt buộc</span>
                                    <span className="text-white font-medium">{mandatoryProgress.active}</span>
                                </div>
                                <div className="flex justify-between text-xs">
                                    <span className="text-slate-400">Đã điền hợp lệ</span>
                                    <span className="text-emerald-400 font-medium">{mandatoryProgress.fulfilled}</span>
                                </div>
                                <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                                    <div className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 transition-all duration-500" style={{ width: `${mandatoryProgress.percent}%` }}></div>
                                </div>
                            </div>
                        </div>
                      </div>

                      <div className="mt-auto space-y-4">
                          <button
                            onClick={handleFiltersComplete}
                            className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium shadow-lg shadow-blue-500/20 transition-all flex items-center justify-center gap-2"
                          >
                            Tiếp tục: Trọng số <i className="fa-solid fa-arrow-right"></i>
                          </button>

                          {validationErrorFilters && (
                            <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg flex items-start gap-3">
                            <i className="fa-solid fa-circle-exclamation text-red-400 mt-0.5"></i>
                            <p className="text-xs text-red-200">{validationErrorFilters}</p>
                            </div>
                          )}
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex-1">
                          <div className="bg-slate-900/50 rounded-xl p-5 border border-slate-800 mb-4">
                            <h4 className="text-lg font-medium text-white mb-2">Phân bổ Trọng số</h4>
                            <p className="text-sm text-slate-400 mb-4">
                            Quyết định mức độ quan trọng của từng nhóm tiêu chí trong điểm số cuối cùng.
                            </p>
                            
                            <div className={`p-4 rounded-lg border ${weightStatus.bg} mb-4`}>
                                <div className="flex items-center justify-between mb-2">
                                    <span className={`text-sm font-bold ${weightStatus.tone}`}>{weightStatus.label}</span>
                                    <span className="text-xs text-slate-400">{totalWeight}/100%</span>
                                </div>
                                <p className="text-xs text-slate-300">{weightStatus.desc}</p>
                            </div>

                            <TotalWeightDisplay totalWeight={totalWeight} />
                          </div>
                      </div>

                      <div className="mt-auto space-y-4">
                          <div className="grid grid-cols-2 gap-3">
                            <button
                                onClick={() => setStep(1)}
                                className="py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium border border-slate-700 transition-all"
                            >
                                <i className="fa-solid fa-arrow-left mr-2"></i> Quay lại
                            </button>
                            <button
                                onClick={handleWeightsComplete}
                                disabled={totalWeight !== 100}
                                className={`py-3 rounded-xl font-medium shadow-lg transition-all flex items-center justify-center gap-2 ${
                                    totalWeight === 100
                                    ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-500/20'
                                    : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
                                }`}
                            >
                                Hoàn tất <i className="fa-solid fa-check"></i>
                            </button>
                          </div>

                          {validationErrorWeights && (
                            <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg flex items-start gap-3">
                            <i className="fa-solid fa-circle-exclamation text-red-400 mt-0.5"></i>
                            <p className="text-xs text-red-200">{validationErrorWeights}</p>
                            </div>
                          )}
                      </div>
                    </>
                  )}
               </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

WeightsConfig.displayName = 'WeightsConfig';

export default WeightsConfig;
