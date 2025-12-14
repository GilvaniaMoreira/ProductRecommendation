// Preferences.js

import React, { useState } from 'react';
import Checkbox from '../../shared/Checkbox';

function Preferences({
  preferences,
  selectedPreferences = [],
  onPreferenceChange,
}) {
  const [currentPreferences, setCurrentPreferences] =
    useState(selectedPreferences);

  const handlePreferenceChange = (preference) => {
    const updatedPreferences = currentPreferences.includes(preference)
      ? currentPreferences.filter((pref) => pref !== preference)
      : [...currentPreferences, preference];

    setCurrentPreferences(updatedPreferences);
    onPreferenceChange(updatedPreferences);
  };

  return (
    <div className="rounded-xl border border-slate-200 bg-white/80 p-4 shadow-sm backdrop-blur">
      <div className="mb-3 flex items-start justify-between gap-2">
        <div>
          <h2 className="text-base font-semibold text-slate-900">
            Preferências
          </h2>
          <p className="text-sm text-slate-500">
            O que é mais importante para sua operação?
          </p>
        </div>
        <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700">
          Passo 1
        </span>
      </div>

      <div className="space-y-2">
        {preferences.map((preference, index) => (
          <Checkbox
            key={index}
            value={preference}
            checked={currentPreferences.includes(preference)}
            onChange={() => handlePreferenceChange(preference)}
          >
            {preference}
          </Checkbox>
        ))}
      </div>
    </div>
  );
}

export default Preferences;
