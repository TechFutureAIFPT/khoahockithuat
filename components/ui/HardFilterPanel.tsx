import React, { useMemo } from 'react';
import type { HardFilters } from '../../types';

interface HardFilterPanelProps {
    hardFilters: HardFilters;
    setHardFilters: React.Dispatch<React.SetStateAction<HardFilters>>;
}

type MandatoryKey = Extract<keyof HardFilters, `${string}Mandatory`>;
type ValueKey = Exclude<keyof HardFilters, MandatoryKey>;

const HardFilterPanel: React.FC<HardFilterPanelProps> = ({ hardFilters, setHardFilters }) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { id, value } = e.target;
        setHardFilters((prev) => ({
            ...prev,
            [id]: value,
        }));
    };

    const handleMandatoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, checked } = e.target;
        setHardFilters((prev) => ({
            ...prev,
            [id]: checked,
        }));
    };

    const hasValue = (val: unknown) => {
        if (typeof val === 'string') return val.trim().length > 0;
        return Boolean(val);
    };

    const inputClasses = (isMandatory: boolean, valuePresent: boolean) =>
        `w-full rounded-lg border bg-slate-900/50 px-3 py-2 text-xs text-slate-200 placeholder-slate-500 transition focus:outline-none focus:ring-1 ${
            isMandatory
                ? valuePresent
                    ? 'border-cyan-500/50 focus:ring-cyan-500/50'
                    : 'border-red-500/50 focus:ring-red-500/50'
                : 'border-slate-700 focus:ring-slate-600'
        }`;

    const selectFieldConfigs: Array<{
        id: ValueKey;
        label: string;
        placeholder: string;
        mandatoryKey: MandatoryKey;
        options: { value: string; label: string }[];
    }> = [
        {
            id: 'location',
            label: 'Địa điểm',
            placeholder: 'Chọn địa điểm',
            mandatoryKey: 'locationMandatory',
            options: [
                { value: '', label: 'Chọn địa điểm' },
                { value: 'Hà Nội', label: 'Hà Nội' },
                { value: 'Hải Phòng', label: 'Hải Phòng' },
                { value: 'Đà Nẵng', label: 'Đà Nẵng' },
                { value: 'Thành phố Hồ Chí Minh', label: 'TP. Hồ Chí Minh' },
                { value: 'Remote', label: 'Remote' },
            ],
        },
        {
            id: 'minExp',
            label: 'Kinh nghiệm',
            placeholder: 'Không yêu cầu',
            mandatoryKey: 'minExpMandatory',
            options: [
                { value: '', label: 'Không yêu cầu' },
                { value: '1', label: '≥ 1 năm' },
                { value: '2', label: '≥ 2 năm' },
                { value: '3', label: '≥ 3 năm' },
                { value: '5', label: '≥ 5 năm' },
            ],
        },
        {
            id: 'seniority',
            label: 'Cấp bậc',
            placeholder: 'Không yêu cầu',
            mandatoryKey: 'seniorityMandatory',
            options: [
                { value: '', label: 'Không yêu cầu' },
                { value: 'Intern', label: 'Intern' },
                { value: 'Junior', label: 'Junior' },
                { value: 'Mid-level', label: 'Mid-level' },
                { value: 'Senior', label: 'Senior' },
                { value: 'Lead', label: 'Lead' },
            ],
        },
        {
            id: 'workFormat',
            label: 'Hình thức',
            placeholder: 'Không yêu cầu',
            mandatoryKey: 'workFormatMandatory',
            options: [
                { value: '', label: 'Không yêu cầu' },
                { value: 'Onsite', label: 'Onsite' },
                { value: 'Hybrid', label: 'Hybrid' },
                { value: 'Remote', label: 'Remote' },
            ],
        },
        {
            id: 'contractType',
            label: 'Hợp đồng',
            placeholder: 'Không yêu cầu',
            mandatoryKey: 'contractTypeMandatory',
            options: [
                { value: '', label: 'Không yêu cầu' },
                { value: 'Full-time', label: 'Full-time' },
                { value: 'Part-time', label: 'Part-time' },
                { value: 'Intern', label: 'Intern' },
                { value: 'Contract', label: 'Contract' },
            ],
        },
    ];

    const renderCompactField = (config: (typeof selectFieldConfigs)[number]) => {
        const isMandatory = hardFilters[config.mandatoryKey];
        const hasCurrentValue = hasValue(hardFilters[config.id]);
        
        return (
            <div key={config.id} className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                    <label htmlFor={config.id} className="text-xs font-medium text-slate-300">
                        {config.label}
                    </label>
                    <div className="flex items-center gap-1.5">
                        <input
                            type="checkbox"
                            id={config.mandatoryKey}
                            checked={Boolean(isMandatory)}
                            onChange={handleMandatoryChange}
                            className="w-3 h-3 rounded border-slate-600 bg-slate-800 text-cyan-500 focus:ring-0"
                        />
                        <label htmlFor={config.mandatoryKey} className={`text-[10px] cursor-pointer ${isMandatory ? 'text-cyan-400 font-medium' : 'text-slate-500'}`}>
                            Bắt buộc
                        </label>
                    </div>
                </div>
                <select
                    id={config.id}
                    value={hardFilters[config.id]}
                    onChange={handleChange}
                    className={inputClasses(Boolean(isMandatory), hasCurrentValue)}
                >
                    {config.options.map((option) => (
                        <option key={option.value ?? option.label} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            </div>
        );
    };

    return (
        <div className="space-y-6">
            {/* Group 1: Basic Info */}
            <div className="bg-slate-900/30 rounded-xl p-4 border border-slate-800/50">
                <h5 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                    <i className="fa-solid fa-sliders text-cyan-500"></i> Điều kiện cơ bản
                </h5>
                <div className="grid grid-cols-2 gap-4">
                    {selectFieldConfigs.map(renderCompactField)}
                </div>
            </div>

            {/* Group 2: Context & Quality */}
            <div className="bg-slate-900/30 rounded-xl p-4 border border-slate-800/50">
                <h5 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                    <i className="fa-solid fa-layer-group text-purple-500"></i> Chuyên môn & Yêu cầu
                </h5>
                <div className="grid grid-cols-1 gap-4">
                    {/* Industry */}
                    <div className="flex flex-col gap-1.5">
                        <div className="flex items-center justify-between">
                            <label htmlFor="industry" className="text-xs font-medium text-slate-300">Ngành nghề</label>
                            <div className="flex items-center gap-1.5">
                                <input
                                    type="checkbox"
                                    id="industryMandatory"
                                    checked={hardFilters.industryMandatory}
                                    onChange={handleMandatoryChange}
                                    className="w-3 h-3 rounded border-slate-600 bg-slate-800 text-cyan-500 focus:ring-0"
                                />
                                <label htmlFor="industryMandatory" className={`text-[10px] cursor-pointer ${hardFilters.industryMandatory ? 'text-cyan-400 font-medium' : 'text-slate-500'}`}>Bắt buộc</label>
                            </div>
                        </div>
                        <input
                            type="text"
                            id="industry"
                            value={hardFilters.industry}
                            onChange={handleChange}
                            placeholder="Ví dụ: Fintech, SaaS..."
                            className={inputClasses(hardFilters.industryMandatory, hasValue(hardFilters.industry))}
                        />
                    </div>

                    {/* Language */}
                    <div className="flex flex-col gap-1.5">
                        <div className="flex items-center justify-between">
                            <label htmlFor="language" className="text-xs font-medium text-slate-300">Ngôn ngữ</label>
                            <div className="flex items-center gap-1.5">
                                <input
                                    type="checkbox"
                                    id="languageMandatory"
                                    checked={hardFilters.languageMandatory}
                                    onChange={handleMandatoryChange}
                                    className="w-3 h-3 rounded border-slate-600 bg-slate-800 text-cyan-500 focus:ring-0"
                                />
                                <label htmlFor="languageMandatory" className={`text-[10px] cursor-pointer ${hardFilters.languageMandatory ? 'text-cyan-400 font-medium' : 'text-slate-500'}`}>Bắt buộc</label>
                            </div>
                        </div>
                        <div className="grid grid-cols-[1.5fr_1fr] gap-2">
                            <input
                                type="text"
                                id="language"
                                value={hardFilters.language}
                                onChange={handleChange}
                                placeholder="Tên ngôn ngữ"
                                className={inputClasses(hardFilters.languageMandatory, hasValue(hardFilters.language))}
                            />
                            <select
                                id="languageLevel"
                                value={hardFilters.languageLevel}
                                onChange={handleChange}
                                className={inputClasses(false, hasValue(hardFilters.languageLevel))}
                            >
                                <option value="">Mức độ</option>
                                <option value="B1">B1</option>
                                <option value="B2">B2</option>
                                <option value="C1">C1</option>
                                <option value="C2">C2</option>
                            </select>
                        </div>
                    </div>

                    {/* Education */}
                    <div className="flex flex-col gap-1.5">
                        <div className="flex items-center justify-between">
                            <label htmlFor="education" className="text-xs font-medium text-slate-300">Học vấn</label>
                            <div className="flex items-center gap-1.5">
                                <input
                                    type="checkbox"
                                    id="educationMandatory"
                                    checked={hardFilters.educationMandatory}
                                    onChange={handleMandatoryChange}
                                    className="w-3 h-3 rounded border-slate-600 bg-slate-800 text-cyan-500 focus:ring-0"
                                />
                                <label htmlFor="educationMandatory" className={`text-[10px] cursor-pointer ${hardFilters.educationMandatory ? 'text-cyan-400 font-medium' : 'text-slate-500'}`}>Bắt buộc</label>
                            </div>
                        </div>
                        <select
                            id="education"
                            value={hardFilters.education}
                            onChange={handleChange}
                            className={inputClasses(hardFilters.educationMandatory, hasValue(hardFilters.education))}
                        >
                            <option value="">Không yêu cầu</option>
                            <option value="High School">Tốt nghiệp THPT</option>
                            <option value="Associate">Cao đẳng</option>
                            <option value="Bachelor">Cử nhân</option>
                            <option value="Master">Thạc sĩ</option>
                            <option value="PhD">Tiến sĩ</option>
                        </select>
                    </div>

                    {/* Certificates */}
                    <div className="flex flex-col gap-1.5">
                        <div className="flex items-center justify-between">
                            <label htmlFor="certificates" className="text-xs font-medium text-slate-300">Chứng chỉ</label>
                            <div className="flex items-center gap-1.5">
                                <input
                                    type="checkbox"
                                    id="certificatesMandatory"
                                    checked={hardFilters.certificatesMandatory}
                                    onChange={handleMandatoryChange}
                                    className="w-3 h-3 rounded border-slate-600 bg-slate-800 text-cyan-500 focus:ring-0"
                                />
                                <label htmlFor="certificatesMandatory" className={`text-[10px] cursor-pointer ${hardFilters.certificatesMandatory ? 'text-cyan-400 font-medium' : 'text-slate-500'}`}>Bắt buộc</label>
                            </div>
                        </div>
                        <input
                            type="text"
                            id="certificates"
                            value={hardFilters.certificates}
                            onChange={handleChange}
                            placeholder="Ví dụ: PMP, AWS..."
                            className={inputClasses(hardFilters.certificatesMandatory, hasValue(hardFilters.certificates))}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HardFilterPanel;