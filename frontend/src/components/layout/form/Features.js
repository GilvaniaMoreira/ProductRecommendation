import React from 'react';
import Checkbox from '../../ui/Checkbox';
import SectionCard from '../../ui/SectionCard';

function Features({ features, selectedFeatures = [], onFeatureChange }) {
  const handleFeatureChange = (feature) => {
    const updatedFeatures = selectedFeatures.includes(feature)
      ? selectedFeatures.filter((pref) => pref !== feature)
      : [...selectedFeatures, feature];

    onFeatureChange(updatedFeatures);
  };

  return (
    <SectionCard
      title="Funcionalidades"
      description="Quais recursos você quer priorizar?"
      badgeLabel="Passo 2"
      badgeVariant="emerald"
    >
      <div className="space-y-2">
        {features.map((feature, index) => (
          <Checkbox
            key={index}
            value={feature}
            checked={selectedFeatures.includes(feature)}
            onChange={() => handleFeatureChange(feature)}
          >
            {feature}
          </Checkbox>
        ))}
      </div>
    </SectionCard>
  );
}

export default Features;

