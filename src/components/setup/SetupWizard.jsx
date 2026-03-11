import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, ChevronLeft, CheckCircle2, Building2, Calendar, Users } from 'lucide-react';
import { useToolkit } from '../../context/ToolkitContext';

const STEPS = [
  {
    id: 1,
    title: 'Program Details',
    description: 'Set up the basics for your change program',
    icon: Building2,
  },
  {
    id: 2,
    title: 'Sprint Dates',
    description: 'Configure your program timeline',
    icon: Calendar,
  },
  {
    id: 3,
    title: 'Team & Population',
    description: 'Set employee numbers and executive sponsor',
    icon: Users,
  },
];

export default function SetupWizard() {
  const { dispatch } = useToolkit();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    programName: 'ABSA Workday Adoption Program',
    sponsor: '',
    startDate: '',
    totalEmployees: 40000,
    sprints: [
      { id: 'phase0', name: 'Phase 0 — Diagnostic', start: '', end: '' },
      { id: 'sprint1', name: 'Sprint 1 — Strategy & Pilot', start: '', end: '' },
      { id: 'sprint2', name: 'Sprint 2 — Wave 1 Rollout', start: '', end: '' },
      { id: 'sprint3', name: 'Sprint 3 — Full Rollout', start: '', end: '' },
    ],
  });

  function updateField(field, value) {
    setFormData(prev => ({ ...prev, [field]: value }));
  }

  function updateSprint(idx, field, value) {
    setFormData(prev => ({
      ...prev,
      sprints: prev.sprints.map((s, i) => i === idx ? { ...s, [field]: value } : s),
    }));
  }

  function handleComplete() {
    dispatch({
      type: 'COMPLETE_SETUP',
      payload: {
        programName: formData.programName,
        sponsor: formData.sponsor,
        startDate: formData.startDate || new Date().toISOString(),
        totalEmployees: Number(formData.totalEmployees),
        sprints: formData.sprints,
      },
    });
    navigate('/dashboard');
  }

  const isStep1Valid = formData.programName.trim().length > 0;
  const isStep2Valid = true; // Sprint dates are optional
  const isStep3Valid = formData.totalEmployees > 0;
  const canProceed = currentStep === 1 ? isStep1Valid : currentStep === 2 ? isStep2Valid : isStep3Valid;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1A1A2E] to-[#2d2d4e] flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-10 h-10 rounded-xl bg-[#CC0000] flex items-center justify-center">
              <span className="text-white font-bold text-lg">A</span>
            </div>
          </div>
          <h1 className="text-2xl font-bold text-white mb-1">Change Engagement Toolkit</h1>
          <p className="text-white/60 text-sm">Set up your program to get started</p>
        </div>

        {/* Step indicators */}
        <div className="flex items-center justify-center mb-8 gap-0">
          {STEPS.map((step, idx) => {
            const Icon = step.icon;
            const isComplete = currentStep > step.id;
            const isCurrent = currentStep === step.id;
            return (
              <div key={step.id} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                      isComplete
                        ? 'bg-green-500 text-white'
                        : isCurrent
                        ? 'bg-[#CC0000] text-white'
                        : 'bg-white/10 text-white/40'
                    }`}
                  >
                    {isComplete ? (
                      <CheckCircle2 className="w-5 h-5" />
                    ) : (
                      <Icon className="w-5 h-5" />
                    )}
                  </div>
                  <span className={`text-xs mt-1 font-medium ${isCurrent ? 'text-white' : 'text-white/40'}`}>
                    {step.title}
                  </span>
                </div>
                {idx < STEPS.length - 1 && (
                  <div className={`w-16 h-0.5 mx-2 mt-[-1rem] ${currentStep > step.id ? 'bg-green-500' : 'bg-white/10'}`} />
                )}
              </div>
            );
          })}
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Step content */}
          <div className="p-8">
            {currentStep === 1 && (
              <Step1 formData={formData} updateField={updateField} />
            )}
            {currentStep === 2 && (
              <Step2 formData={formData} updateSprint={updateSprint} />
            )}
            {currentStep === 3 && (
              <Step3 formData={formData} updateField={updateField} />
            )}
          </div>

          {/* Navigation */}
          <div className="px-8 pb-8 flex justify-between items-center">
            <button
              onClick={() => setCurrentStep(s => s - 1)}
              disabled={currentStep === 1}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400"
            >
              <ChevronLeft className="w-4 h-4" />
              Back
            </button>

            <span className="text-xs text-gray-400">Step {currentStep} of {STEPS.length}</span>

            {currentStep < STEPS.length ? (
              <button
                onClick={() => setCurrentStep(s => s + 1)}
                disabled={!canProceed}
                className="flex items-center gap-2 px-5 py-2 text-sm font-medium text-white bg-[#CC0000] rounded-lg hover:bg-[#b00000] disabled:opacity-40 disabled:cursor-not-allowed transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleComplete}
                disabled={!canProceed}
                className="flex items-center gap-2 px-5 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500"
              >
                <CheckCircle2 className="w-4 h-4" />
                Launch Toolkit
              </button>
            )}
          </div>
        </div>

        <p className="text-center text-white/30 text-xs mt-6">
          All data is saved locally in your browser. No server, no login required.
        </p>
      </div>
    </div>
  );
}

function Step1({ formData, updateField }) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-1">Program Details</h2>
        <p className="text-sm text-gray-500">Give your change program a name and set the start date.</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="programName">
          Program Name <span className="text-red-500">*</span>
        </label>
        <input
          id="programName"
          type="text"
          value={formData.programName}
          onChange={e => updateField('programName', e.target.value)}
          className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
          placeholder="e.g. ABSA Workday Adoption Program"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="startDate">
          Program Start Date
        </label>
        <input
          id="startDate"
          type="date"
          value={formData.startDate}
          onChange={e => updateField('startDate', e.target.value)}
          className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
        />
      </div>

      <div className="bg-red-50 border border-red-100 rounded-lg p-4">
        <p className="text-xs text-red-700">
          <strong>ABSA Workday Adoption:</strong> You're setting up the toolkit for ABSA's Workday + AI Assistant rollout across 40,000 employees. Stakeholder data, templates, and phase content are pre-loaded and ready.
        </p>
      </div>
    </div>
  );
}

function Step2({ formData, updateSprint }) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-1">Sprint Dates</h2>
        <p className="text-sm text-gray-500">Set the start and end dates for each program sprint. You can update these later.</p>
      </div>

      <div className="space-y-4">
        {formData.sprints.map((sprint, idx) => (
          <div key={sprint.id} className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm font-medium text-gray-800 mb-3">{sprint.name}</p>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-gray-500 mb-1">Start Date</label>
                <input
                  type="date"
                  value={sprint.start}
                  onChange={e => updateSprint(idx, 'start', e.target.value)}
                  className="w-full px-2.5 py-2 text-xs border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">End Date</label>
                <input
                  type="date"
                  value={sprint.end}
                  onChange={e => updateSprint(idx, 'end', e.target.value)}
                  className="w-full px-2.5 py-2 text-xs border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <p className="text-xs text-gray-400">
        Sprint dates are used to calculate timeline progress and flag overdue items. Skip this step if dates are not confirmed yet.
      </p>
    </div>
  );
}

function Step3({ formData, updateField }) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-1">Team & Population</h2>
        <p className="text-sm text-gray-500">Set your total employee headcount and executive sponsor.</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="totalEmployees">
          Total Employee Population <span className="text-red-500">*</span>
        </label>
        <input
          id="totalEmployees"
          type="number"
          min="1"
          value={formData.totalEmployees}
          onChange={e => updateField('totalEmployees', e.target.value)}
          className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
          placeholder="40000"
        />
        <p className="text-xs text-gray-400 mt-1">Used for champion ratio calculations and adoption % tracking.</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="sponsor">
          Executive Sponsor / CHRO Name
        </label>
        <input
          id="sponsor"
          type="text"
          value={formData.sponsor}
          onChange={e => updateField('sponsor', e.target.value)}
          className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
          placeholder="e.g. Jane Smith"
        />
        <p className="text-xs text-gray-400 mt-1">Displayed on the dashboard and in stakeholder data.</p>
      </div>

      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <p className="text-sm font-medium text-green-800 mb-1">You're ready to launch!</p>
        <p className="text-xs text-green-700">
          Your toolkit is pre-loaded with ABSA Workday content: 8 change phases, 11 default stakeholders, 8 communication plan items, and 8 comms templates. You can customise everything inside.
        </p>
      </div>
    </div>
  );
}
