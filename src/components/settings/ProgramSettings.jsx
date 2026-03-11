import { useState } from 'react';
import { Save, Download, Upload, Trash2, AlertTriangle } from 'lucide-react';
import { useToolkit } from '../../context/ToolkitContext';
import { exportAllData, importAllData } from '../../utils/storageHelpers';
import { PHASES } from '../../data/phases';
import ConfirmModal from '../shared/ConfirmModal';

export default function ProgramSettings() {
  const { state, dispatch } = useToolkit();
  const [config, setConfig] = useState(state.config);
  const [resetModal, setResetModal] = useState(false);
  const [saved, setSaved] = useState(false);

  function handleSave() {
    dispatch({ type: 'UPDATE_CONFIG', payload: config });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  function handleExportJSON() {
    const data = exportAllData();
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `absa-change-toolkit-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  function handleImportJSON(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const data = JSON.parse(ev.target.result);
        importAllData(data);
        dispatch({ type: 'IMPORT_DATA', payload: {
          ...state,
          config: data.config || state.config,
          phases: data.phases || state.phases,
          checklists: data.checklists || state.checklists,
          steps: data.steps || state.steps,
          stakeholders: data.stakeholders || state.stakeholders,
          commsPlan: data.commsPlan || state.commsPlan,
          impactMatrix: data.impactMatrix || state.impactMatrix,
          adoption: data.adoption || state.adoption,
          champions: data.champions || state.champions,
          setupComplete: data.setupComplete ?? state.setupComplete,
        }});
      } catch {
        alert('Invalid JSON file. Please check the file and try again.');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  }

  function handleReset() {
    dispatch({ type: 'RESET_ALL' });
    setResetModal(false);
    window.location.href = '/';
  }

  function updatePhaseOwner(phaseId, value) {
    setConfig(prev => ({
      ...prev,
      phaseOwners: { ...prev.phaseOwners, [phaseId]: value },
    }));
  }

  function updateSprint(idx, field, value) {
    setConfig(prev => ({
      ...prev,
      sprints: prev.sprints.map((s, i) => i === idx ? { ...s, [field]: value } : s),
    }));
  }

  return (
    <div className="p-6 max-w-3xl space-y-8">
      <div>
        <h2 className="text-xl font-bold text-gray-900">Program Settings</h2>
        <p className="text-sm text-gray-500 mt-1">Configure your toolkit for ABSA's Workday adoption program.</p>
      </div>

      {/* Program config */}
      <Section title="Program Configuration">
        <div className="space-y-4">
          <Field label="Program Name">
            <input
              type="text"
              value={config.programName || ''}
              onChange={e => setConfig(p => ({ ...p, programName: e.target.value }))}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </Field>
          <Field label="Executive Sponsor / CHRO">
            <input
              type="text"
              value={config.sponsor || ''}
              onChange={e => setConfig(p => ({ ...p, sponsor: e.target.value }))}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </Field>
          <Field label="Total Employee Population">
            <input
              type="number"
              min="1"
              value={config.totalEmployees || ''}
              onChange={e => setConfig(p => ({ ...p, totalEmployees: Number(e.target.value) }))}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </Field>
        </div>
      </Section>

      {/* Sprint dates */}
      <Section title="Sprint Dates">
        <div className="space-y-3">
          {(config.sprints || []).map((sprint, idx) => (
            <div key={sprint.id} className="p-3 bg-gray-50 rounded-lg">
              <p className="text-xs font-medium text-gray-700 mb-2">{sprint.name}</p>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Start</label>
                  <input type="date" value={sprint.start || ''} onChange={e => updateSprint(idx, 'start', e.target.value)}
                    className="w-full px-2 py-1.5 text-xs border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-red-400" />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">End</label>
                  <input type="date" value={sprint.end || ''} onChange={e => updateSprint(idx, 'end', e.target.value)}
                    className="w-full px-2 py-1.5 text-xs border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-red-400" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Phase owners */}
      <Section title="Phase Owners">
        <div className="space-y-2">
          {PHASES.map(phase => (
            <div key={phase.id} className="flex items-center gap-3">
              <div
                className="w-6 h-6 rounded flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                style={{ backgroundColor: phase.color }}
              >
                {phase.number}
              </div>
              <span className="text-xs text-gray-700 w-40 truncate flex-shrink-0">{phase.name}</span>
              <input
                type="text"
                value={config.phaseOwners?.[phase.id] || ''}
                onChange={e => updatePhaseOwner(phase.id, e.target.value)}
                placeholder="Assign owner..."
                className="flex-1 px-2 py-1.5 text-xs border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-red-400"
              />
            </div>
          ))}
        </div>
      </Section>

      {/* Notifications */}
      <Section title="Notification Preferences">
        <div className="space-y-3">
          <Toggle
            label="Show overdue alerts on dashboard"
            value={config.notifications?.showOverdueAlerts ?? true}
            onChange={v => setConfig(p => ({ ...p, notifications: { ...p.notifications, showOverdueAlerts: v } }))}
          />
          <Toggle
            label="Show days-since-update badges"
            value={config.notifications?.showDaysSinceUpdate ?? true}
            onChange={v => setConfig(p => ({ ...p, notifications: { ...p.notifications, showDaysSinceUpdate: v } }))}
          />
        </div>
      </Section>

      {/* Save button */}
      <div className="flex items-center gap-2">
        <button
          onClick={handleSave}
          className="flex items-center gap-2 px-5 py-2 text-sm font-medium text-white bg-[#CC0000] rounded-lg hover:bg-[#b00000] transition-colors"
        >
          <Save className="w-4 h-4" />
          {saved ? 'Saved!' : 'Save Settings'}
        </button>
      </div>

      {/* Data management */}
      <Section title="Data Management">
        <div className="space-y-3">
          <div className="flex items-center gap-3 flex-wrap">
            <button
              onClick={handleExportJSON}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Download className="w-4 h-4" />
              Export All Data (JSON)
            </button>
            <label className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
              <Upload className="w-4 h-4" />
              Import JSON Backup
              <input type="file" accept=".json" onChange={handleImportJSON} className="hidden" />
            </label>
          </div>
          <p className="text-xs text-gray-400">Export creates a backup of all program data. Import restores from a previous backup — this will overwrite current data.</p>

          <div className="border-t border-gray-100 pt-3">
            <button
              onClick={() => setResetModal(true)}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              Reset All Progress
            </button>
            <p className="text-xs text-gray-400 mt-1">Clears all data and returns to the setup wizard. This cannot be undone.</p>
          </div>
        </div>
      </Section>

      <ConfirmModal
        open={resetModal}
        title="Reset All Program Data?"
        message="This will permanently delete all checklists, stakeholders, comms plans, and settings. Export a backup first if you want to save your progress."
        confirmLabel="Yes, Reset Everything"
        cancelLabel="Cancel"
        variant="danger"
        onConfirm={handleReset}
        onCancel={() => setResetModal(false)}
      />
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div>
      <h3 className="text-sm font-semibold text-gray-800 mb-3 pb-2 border-b border-gray-100">{title}</h3>
      {children}
    </div>
  );
}

function Field({ label, children }) {
  return (
    <div>
      <label className="block text-xs font-medium text-gray-600 mb-1">{label}</label>
      {children}
    </div>
  );
}

function Toggle({ label, value, onChange }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-gray-700">{label}</span>
      <button
        onClick={() => onChange(!value)}
        className={`relative w-10 h-6 rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 ${
          value ? 'bg-green-500' : 'bg-gray-300'
        }`}
        role="switch"
        aria-checked={value}
      >
        <span
          className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white shadow transition-transform ${
            value ? 'translate-x-4' : 'translate-x-0'
          }`}
        />
      </button>
    </div>
  );
}
