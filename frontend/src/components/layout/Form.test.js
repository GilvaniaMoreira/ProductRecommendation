import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Form from './Form';

const mockGetRecommendations = jest.fn();

let consoleErrorSpy;

jest.mock('../../hooks/useProducts', () => ({
  __esModule: true,
  default: () => ({
    preferences: ['Preferência A', 'Preferência B'],
    features: ['Feature A', 'Feature B'],
    products: [
      {
        name: 'Produto 1',
        preferences: ['Preferência A'],
        features: ['Feature A'],
      },
      {
        name: 'Produto 2',
        preferences: ['Preferência B'],
        features: ['Feature B'],
      },
    ],
  }),
}));

jest.mock('../../services/recommendation.service', () => ({
  __esModule: true,
  default: {
    getRecommendations: (...args) => mockGetRecommendations(...args),
  },
}));

const renderForm = (overrideProps = {}) => {
  const onRecommendationsChange = jest.fn();
  render(<Form onRecommendationsChange={onRecommendationsChange} {...overrideProps} />);
  return { onRecommendationsChange };
};

describe('Form (integração)', () => {
  beforeEach(() => {
    mockGetRecommendations.mockReset();
  });

  beforeAll(() => {
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterAll(() => {
    consoleErrorSpy.mockRestore();
  });

  test('mostra validação quando o tipo não está selecionado', async () => {
    renderForm();

    await userEvent.click(screen.getByRole('button', { name: /obter recomendação/i }));

    expect(
      screen.getByText(/selecione o tipo de recomendação para prosseguir/i)
    ).toBeInTheDocument();
  });

  test('mostra validação quando não há nenhuma preferência ou funcionalidade', async () => {
    renderForm();

    await userEvent.click(screen.getByLabelText(/produto único/i));
    await userEvent.click(screen.getByRole('button', { name: /obter recomendação/i }));

    expect(
      screen.getByText(/escolha pelo menos uma preferência ou funcionalidade/i)
    ).toBeInTheDocument();
  });

  test('submete, chama recomendação e propaga resultado', async () => {
    const recommendation = { name: 'Produto recomendado', category: 'Teste' };
    mockGetRecommendations.mockReturnValueOnce(recommendation);
    const { onRecommendationsChange } = renderForm();

    await userEvent.click(screen.getByLabelText('Preferência A'));
    await userEvent.click(screen.getByLabelText('Feature A'));
    await userEvent.click(screen.getByLabelText(/produto único/i));
    await userEvent.click(screen.getByRole('button', { name: /obter recomendação/i }));

    await waitFor(() => {
      expect(mockGetRecommendations).toHaveBeenCalledTimes(1);
      expect(onRecommendationsChange).toHaveBeenCalledWith([recommendation]);
    });
  });

  test('exibe erro de recomendação quando o serviço falha', async () => {
    mockGetRecommendations.mockImplementationOnce(() => {
      throw new Error('falha');
    });
    const { onRecommendationsChange } = renderForm();

    await userEvent.click(screen.getByLabelText('Preferência B'));
    await userEvent.click(screen.getByLabelText(/produto único/i));
    await userEvent.click(screen.getByRole('button', { name: /obter recomendação/i }));

    expect(
      await screen.findByText(/não foi possível obter recomendações/i)
    ).toBeInTheDocument();
   
    expect(onRecommendationsChange).toHaveBeenCalledTimes(2);
    expect(onRecommendationsChange).toHaveBeenNthCalledWith(1, []);
    expect(onRecommendationsChange).toHaveBeenNthCalledWith(2, []);
  });
});

