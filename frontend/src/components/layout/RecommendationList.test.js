import React from 'react';
import { render, screen } from '@testing-library/react';
import RecommendationList from './RecommendationList';

describe('RecommendationList', () => {
  const recommendationWithMeta = {
    name: 'Produto A',
    category: 'Categoria',
    _meta: {
      score: 3,
      rank: 2,
      matchedPreferences: ['P1', 'P2'],
      matchedFeatures: ['F1'],
    },
  };

  const recommendationWithoutMeta = {
    name: 'Produto B',
    category: 'Categoria',
    preferences: ['Pref X'],
    features: ['Feat X', 'Feat Y'],
  };

  test('exibe score, rank e itens que deram match', () => {
    render(<RecommendationList recommendations={[recommendationWithMeta]} />);

    expect(screen.getByText(/produto a/i)).toBeInTheDocument();
    expect(screen.getByText(/score:\s*3/i)).toBeInTheDocument();
    expect(screen.getByText('#2')).toBeInTheDocument();
    expect(screen.getByText('P1')).toBeInTheDocument();
    expect(screen.getByText('P2')).toBeInTheDocument();
    expect(screen.getByText('F1')).toBeInTheDocument();
  });

  test('usa fallback de features/preferences quando não há matches', () => {
    render(<RecommendationList recommendations={[recommendationWithoutMeta]} />);

    expect(screen.getByText(/produto b/i)).toBeInTheDocument();
    expect(screen.getByText('Feat X')).toBeInTheDocument();
    expect(screen.getByText('Pref X')).toBeInTheDocument();
  });

  test('mostra estado vazio quando não há recomendações', () => {
    render(<RecommendationList recommendations={[]} />);

    expect(screen.getByText(/nenhuma recomendação ainda/i)).toBeInTheDocument();
  });
});


