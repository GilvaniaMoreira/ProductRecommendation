import recommendationService from './recommendation.service';
import mockProducts from '../mocks/mockProducts';

describe('recommendation.service.getRecommendations', () => {
  const products = [
    {
      id: 1,
      name: 'Produto A',
      preferences: ['P1', 'P2'],
      features: ['F1', 'F2'],
    },
    {
      id: 2,
      name: 'Produto B',
      preferences: ['P1', 'P3'],
      features: ['F2', 'F3'],
    },
    {
      id: 3,
      name: 'Produto C',
      preferences: ['P4'],
      features: ['F4'],
    },
  ];

  it('retorna [] quando não há produtos', () => {
    const result = recommendationService.getRecommendations(
      {
        selectedPreferences: ['P1'],
        selectedFeatures: [],
        selectedRecommendationType: 'MultipleProducts',
      },
      undefined
    );

    expect(result).toEqual([]);
  });

  it('retorna [] quando o tipo de recomendação não foi selecionado', () => {
    const result = recommendationService.getRecommendations(
      {
        selectedPreferences: ['P1'],
        selectedFeatures: ['F1'],
        selectedRecommendationType: '',
      },
      products
    );

    expect(result).toEqual([]);
  });

  it('SingleProduct: retorna o produto com maior score', () => {
    const result = recommendationService.getRecommendations(
      {
        selectedPreferences: ['P2'],
        selectedFeatures: ['F1'],
        selectedRecommendationType: 'SingleProduct',
      },
      products
    );

    expect(result?.name).toBe('Produto A'); // P2 + F1 = 2
  });

  it('SingleProduct: em caso de empate, retorna o ÚLTIMO produto válido', () => {
    // Produto A e B empatam com score 1 (P1)
    const result = recommendationService.getRecommendations(
      {
        selectedPreferences: ['P1'],
        selectedFeatures: [],
        selectedRecommendationType: 'SingleProduct',
      },
      products
    );

    expect(result?.name).toBe('Produto B'); // último entre os empatados
  });

  it('MultipleProducts: retorna lista ordenada por score desc e filtra score 0', () => {
    const result = recommendationService.getRecommendations(
      {
        selectedPreferences: ['P1'],
        selectedFeatures: ['F2'],
        selectedRecommendationType: 'MultipleProducts',
      },
      products
    );

    // Produto A: P1 + F2 = 2
    // Produto B: P1 + F2 = 2 (mantém ordem original no empate)
    // Produto C: 0 (filtrado)
    expect(result.map((p) => p.name)).toEqual(['Produto A', 'Produto B']);
  });

  it('aceita seleções com objetos (value/name/label) e remove duplicados', () => {
    const result = recommendationService.getRecommendations(
      {
        selectedPreferences: [{ value: 'P1' }, { name: 'P1' }, 'P1'],
        selectedFeatures: [{ label: 'F2' }, 'F2', '  F2  '],
        selectedRecommendationType: 'SingleProduct',
      },
      products
    );

    // Produto A e B empatam com score 2, deve retornar o último (B)
    expect(result?.name).toBe('Produto B');
  });

  it('SingleProduct: retorna recomendação correta com base em preferências/funcionalidades (mocks do projeto)', () => {
    const formData = {
      selectedPreferences: ['Integração com chatbots'],
      selectedFeatures: ['Chat ao vivo e mensagens automatizadas'],
      selectedRecommendationType: 'SingleProduct',
    };

    const recommendation = recommendationService.getRecommendations(
      formData,
      mockProducts
    );

    expect(recommendation?.name).toBe('RD Conversas');
  });

  it('MultipleProducts: retorna recomendações corretas com base em preferências (mocks do projeto)', () => {
    const formData = {
      selectedPreferences: [
        'Integração fácil com ferramentas de e-mail',
        'Personalização de funis de vendas',
        'Automação de marketing',
      ],
      selectedFeatures: [
        'Rastreamento de interações com clientes',
        'Rastreamento de comportamento do usuário',
      ],
      selectedRecommendationType: 'MultipleProducts',
    };

    const recommendations = recommendationService.getRecommendations(
      formData,
      mockProducts
    );

    expect(recommendations).toHaveLength(2);
    expect(recommendations.map((product) => product.name)).toEqual([
      'RD Station CRM',
      'RD Station Marketing',
    ]);
  });

  it('SingleProduct: quando mais de um produto empata, retorna o ÚLTIMO produto válido (mocks do projeto)', () => {
    const formData = {
      selectedPreferences: [
        'Integração fácil com ferramentas de e-mail',
        'Automação de marketing',
      ],
      selectedFeatures: [
        'Rastreamento de interações com clientes',
        'Rastreamento de comportamento do usuário',
      ],
      selectedRecommendationType: 'SingleProduct',
    };

    const recommendation = recommendationService.getRecommendations(
      formData,
      mockProducts
    );

    expect(recommendation?.name).toBe('RD Station Marketing');
  });

  it('SingleProduct: empate com 1 match em produtos diferentes retorna o ÚLTIMO (mocks do projeto)', () => {
    const formData = {
      selectedPreferences: ['Automação de marketing', 'Integração com chatbots'],
      selectedRecommendationType: 'SingleProduct',
    };

    const recommendation = recommendationService.getRecommendations(
      formData,
      mockProducts
    );

    expect(recommendation?.name).toBe('RD Conversas');
  });
});
