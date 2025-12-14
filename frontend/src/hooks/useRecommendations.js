// useRecommendations.js

import { useState } from 'react';
import recommendationService from '../services/recommendation.service';

function useRecommendations(products) {
  const [recommendations, setRecommendations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchRecommendations = async (formData) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = recommendationService.getRecommendations(formData, products);
      const normalized = Array.isArray(result) ? result : result ? [result] : [];
      setRecommendations(normalized);
      return normalized;
    } catch (err) {
      console.error('Erro ao obter recomendações:', err);
      setRecommendations([]);
      setError('Não foi possível obter recomendações. Tente novamente.');
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  return { recommendations, fetchRecommendations, isLoading, error, setRecommendations };
}

export default useRecommendations;
