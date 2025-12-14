// Preferences.js

import React from 'react';
import Checkbox from '../../ui/Checkbox';
import SectionCard from '../../ui/SectionCard';

function Preferences({
  preferences,
  selectedPreferences = [],
  onPreferenceChange,
}) {
  const handlePreferenceChange = (preference) => {
    const updatedPreferences = selectedPreferences.includes(preference)
      ? selectedPreferences.filter((pref) => pref !== preference)
      : [...selectedPreferences, preference];

    onPreferenceChange(updatedPreferences);
  };

  return (
    <SectionCard
      title="Preferências"
      description="O que é mais importante para sua operação?"
      badgeLabel="Passo 1"
      badgeVariant="indigo"
    >
      <div className="space-y-2">
        {preferences.map((preference, index) => (
          <Checkbox
            key={index}
            value={preference}
            checked={selectedPreferences.includes(preference)}
            onChange={() => handlePreferenceChange(preference)}
          >
            {preference}
          </Checkbox>
        ))}
      </div>
    </SectionCard>
  );
}

export default Preferences;

