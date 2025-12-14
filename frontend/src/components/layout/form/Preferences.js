// Preferences.js

import React, { useState } from 'react';
import Checkbox from '../../ui/Checkbox';
import SectionCard from '../../ui/SectionCard';

function Preferences({
  preferences,
  selectedPreferences = [],
  onPreferenceChange,
}) {
  const [currentPreferences, setCurrentPreferences] = useState(selectedPreferences);

  const handlePreferenceChange = (preference) => {
    const updatedPreferences = currentPreferences.includes(preference)
      ? currentPreferences.filter((pref) => pref !== preference)
      : [...currentPreferences, preference];

    setCurrentPreferences(updatedPreferences);
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
            checked={currentPreferences.includes(preference)}
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

