// getRecommendations.js

const getRecommendations = (
  formData = { selectedPreferences: [], selectedFeatures: [] },
  products
) => {
  /**
   * Crie aqui a lógica para retornar os produtos recomendados.
   */

  const safeProducts = Array.isArray(products) ? products : [];
  const recommendationType = formData?.selectedRecommendationType;

  const normalizeValue = (value) => {
    if (value === null || value === undefined) return null;
    if (typeof value === 'string') {
      const trimmed = value.trim();
      return trimmed.length ? trimmed : null;
    }

    if (typeof value === 'object') {
      const candidate =
        value.value ?? value.name ?? value.label ?? value.title ?? null;
      return normalizeValue(candidate);
    }

    const stringified = String(value).trim();
    return stringified.length ? stringified : null;
  };

  const normalizeArray = (arr) => {
    if (!Array.isArray(arr)) return [];
    const out = [];
    const seen = new Set();
    for (const item of arr) {
      const normalized = normalizeValue(item);
      if (!normalized) continue;
      if (seen.has(normalized)) continue;
      seen.add(normalized);
      out.push(normalized);
    }
    return out;
  };

  const selectedPreferences = normalizeArray(formData?.selectedPreferences);
  const selectedFeatures = normalizeArray(formData?.selectedFeatures);

  
  if (
    !recommendationType ||
    (selectedPreferences.length === 0 && selectedFeatures.length === 0) ||
    safeProducts.length === 0
  ) {
    return [];
  }

  const selectedPreferenceSet = new Set(selectedPreferences);
  const selectedFeatureSet = new Set(selectedFeatures);

  const scoreProduct = (product) => {
    const productPreferences = Array.isArray(product?.preferences)
      ? product.preferences
      : [];
    const productFeatures = Array.isArray(product?.features)
      ? product.features
      : [];

    
    const prefSet = new Set(normalizeArray(productPreferences));
    const featSet = new Set(normalizeArray(productFeatures));

    let score = 0;
    for (const pref of selectedPreferenceSet) {
      if (prefSet.has(pref)) score += 1;
    }
    for (const feat of selectedFeatureSet) {
      if (featSet.has(feat)) score += 1;
    }
    return score;
  };

  const ranked = safeProducts
    .map((product, index) => {
      const productPreferences = Array.isArray(product?.preferences)
        ? product.preferences
        : [];
      const productFeatures = Array.isArray(product?.features) ? product.features : [];

      const matchedPreferences = productPreferences.filter((pref) =>
        selectedPreferenceSet.has(pref)
      );
      const matchedFeatures = productFeatures.filter((feat) =>
        selectedFeatureSet.has(feat)
      );

      return {
        product,
        index,
        score: scoreProduct(product),
        matchedPreferences,
        matchedFeatures,
      };
    })
    .filter((item) => item.score > 0);

  if (ranked.length === 0) return [];

  if (recommendationType === 'SingleProduct') {
    let best = ranked[0];
    for (let i = 1; i < ranked.length; i += 1) {
      const current = ranked[i];
      if (current.score > best.score) {
        best = current;
        continue;
      }
      if (current.score === best.score && current.index > best.index) {
        best = current;
      }
    }
    return {
      ...best.product,
      _meta: {
        score: best.score,
        matchedPreferences: best.matchedPreferences,
        matchedFeatures: best.matchedFeatures,
        rank: 1,
      },
    };
  }

  if (recommendationType === 'MultipleProducts') {
    return ranked
      .slice()
      .sort((a, b) => {
        if (b.score !== a.score) return b.score - a.score;
        return a.index - b.index;
      })
      .map((item, idx) => ({
        ...item.product,
        _meta: {
          score: item.score,
          matchedPreferences: item.matchedPreferences,
          matchedFeatures: item.matchedFeatures,
          rank: idx + 1,
        },
      }));
  }

  return [];
};

export default { getRecommendations };
