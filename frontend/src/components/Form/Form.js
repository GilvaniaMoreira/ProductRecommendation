// Form.js

import React, { useState } from 'react';
import { Preferences, Features, RecommendationType } from './Fields';
import { SubmitButton } from './SubmitButton';
import useProducts from '../../hooks/useProducts';
import useForm from '../../hooks/useForm';
import useRecommendations from '../../hooks/useRecommendations';

function Form({ onRecommendationsChange }) {
  const { preferences, features, products } = useProducts();
  const { formData, handleChange } = useForm({
    selectedPreferences: [],
    selectedFeatures: [],
    selectedRecommendationType: '',
  });

  const { getRecommendations } = useRecommendations(products);
  const [validationMessage, setValidationMessage] = useState('');

  const handleFieldChange = (field, value) => {
    if (validationMessage) {
      setValidationMessage('');
    }
    handleChange(field, value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const hasRecommendationType = Boolean(formData.selectedRecommendationType);
    const hasSelections =
      (Array.isArray(formData.selectedPreferences) &&
        formData.selectedPreferences.length > 0) ||
      (Array.isArray(formData.selectedFeatures) &&
        formData.selectedFeatures.length > 0);

    if (!hasRecommendationType) {
      setValidationMessage('Selecione o tipo de recomendação para prosseguir.');
      return;
    }

    if (!hasSelections) {
      setValidationMessage(
        'Escolha pelo menos uma preferência ou funcionalidade.'
      );
      return;
    }

    setValidationMessage('');
    const result = getRecommendations(formData);

    /**
     * Defina aqui a lógica para atualizar as recomendações e passar para a lista de recomendações
     */
    if (typeof onRecommendationsChange === 'function') {
      onRecommendationsChange(result);
    }
  };

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      <Preferences
        preferences={preferences}
        onPreferenceChange={(selected) =>
          handleFieldChange('selectedPreferences', selected)
        }
      />
      <Features
        features={features}
        onFeatureChange={(selected) =>
          handleFieldChange('selectedFeatures', selected)
        }
      />
      <RecommendationType
        selectedRecommendationType={formData.selectedRecommendationType}
        onRecommendationTypeChange={(selected) =>
          handleFieldChange('selectedRecommendationType', selected)
        }
      />
      {validationMessage && (
        <div
          className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-800"
          role="alert"
          aria-live="polite"
        >
          {validationMessage}
        </div>
      )}
      <SubmitButton text="Obter recomendação" />
    </form>
  );
}

export default Form;
