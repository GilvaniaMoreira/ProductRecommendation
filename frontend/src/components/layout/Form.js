// Form.js

import React, { useEffect, useState } from 'react';
import { Preferences, Features, RecommendationType } from './form';
import SubmitButton from '../ui/SubmitButton';
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

  const { recommendations, fetchRecommendations, isLoading, error: recommendationError } =
    useRecommendations(products);
  const [validationMessage, setValidationMessage] = useState('');

  useEffect(() => {
    if (typeof onRecommendationsChange === 'function') {
      onRecommendationsChange(recommendations);
    }
  }, [recommendations, onRecommendationsChange]);

  const handleFieldChange = (field, value) => {
    if (validationMessage) {
      setValidationMessage('');
    }
    handleChange(field, value);
  };

  const handleSubmit = async (e) => {
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
      setValidationMessage('Escolha pelo menos uma preferência ou funcionalidade.');
      return;
    }

    setValidationMessage('');
    await fetchRecommendations(formData);
  };

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      <Preferences
        preferences={preferences}
        selectedPreferences={formData.selectedPreferences}
        onPreferenceChange={(selected) =>
          handleFieldChange('selectedPreferences', selected)
        }
      />
      <Features
        features={features}
        selectedFeatures={formData.selectedFeatures}
        onFeatureChange={(selected) => handleFieldChange('selectedFeatures', selected)}
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
      {recommendationError && (
        <div
          className="rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-800"
          role="alert"
          aria-live="polite"
        >
          {recommendationError}
        </div>
      )}
      <SubmitButton text="Obter recomendação" disabled={isLoading} loading={isLoading} />
    </form>
  );
}

export default Form;

