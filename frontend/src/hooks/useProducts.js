import { useEffect, useMemo, useState } from 'react';
import getProducts from '../services/product.service';

const useProducts = () => {
  const [preferences, setPreferences] = useState([]);
  const [features, setFeatures] = useState([]);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const dedupe = (arr) => {
    const seen = new Set();
    const out = [];
    for (const item of arr) {
      if (seen.has(item)) continue;
      seen.add(item);
      out.push(item);
    }
    return out;
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const productsResponse = await getProducts();
        const safeProducts = Array.isArray(productsResponse) ? productsResponse : [];
        setProducts(safeProducts);

        const allPreferences = [];
        const allFeatures = [];

        safeProducts.forEach((product) => {
          const productPreferences = Array.isArray(product.preferences)
            ? product.preferences
            : [];
          allPreferences.push(...productPreferences);

          const productFeatures = Array.isArray(product.features) ? product.features : [];
          allFeatures.push(...productFeatures);
        });

        setPreferences(dedupe(allPreferences));
        setFeatures(dedupe(allFeatures));
      } catch (err) {
        console.error('Erro ao obter os produtos:', err);
        setError('Não foi possível carregar os produtos. Tente novamente.');
        setProducts([]);
        setPreferences([]);
        setFeatures([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const hasData = useMemo(
    () => Array.isArray(products) && products.length > 0,
    [products]
  );

  return { preferences, features, products, isLoading, error, hasData };
};

export default useProducts;
