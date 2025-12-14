import React, { useEffect, useRef, useState } from 'react';
import Form from './components/layout/Form';
import RecommendationList from './components/layout/RecommendationList';

function App() {
  const [recommendations, setRecommendations] = useState([]);
  const recommendationSectionRef = useRef(null);

  const handleRecommendationsChange = (result) => {
    if (!result) {
      setRecommendations([]);
      return;
    }

    setRecommendations(Array.isArray(result) ? result : [result]);
  };

  useEffect(() => {
    if (!recommendations || recommendations.length === 0) return;
    const sectionEl = recommendationSectionRef.current;
    if (!sectionEl) return;
    sectionEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [recommendations]);

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-slate-50">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-20 -top-24 h-72 w-72 rounded-full bg-indigo-600/25 blur-3xl" />
        <div className="absolute right-0 top-10 h-64 w-64 rounded-full bg-sky-500/20 blur-3xl" />
        <div className="absolute bottom-[-8rem] left-1/2 h-80 w-80 -translate-x-1/2 transform rounded-full bg-emerald-400/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 py-12 lg:px-6 lg:py-16">
        <header className="space-y-3 text-center lg:text-left">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-indigo-200">
            RD Station
          </p>
          <h1 className="text-3xl font-bold text-white sm:text-4xl">
            Recomendador de Produtos RD Station
          </h1>
          <p className="mx-auto max-w-4xl text-base leading-relaxed text-slate-200 lg:mx-0">
            Bem-vindo! Explore a suíte RD Station e encontre a combinação ideal de
            soluções para o seu negócio. Ajuste preferências e funcionalidades e
            receba recomendações alinhadas às suas necessidades.
          </p>
        </header>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <section className="rounded-2xl border border-white/10 bg-white/90 p-6 shadow-2xl shadow-indigo-500/10 backdrop-blur-xl lg:p-8">
            <div className="mb-6 flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-slate-900">
                  Defina suas necessidades
                </p>
                <p className="text-sm text-slate-500">
                  Escolha preferências e funcionalidades relevantes
                </p>
              </div>
              <span className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-700">
                Formulário
              </span>
            </div>
            <Form onRecommendationsChange={handleRecommendationsChange} />
          </section>

          <section
            ref={recommendationSectionRef}
            className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 shadow-2xl shadow-black/40 lg:p-8"
          >
            <div className="mb-6 flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-slate-100">
                  Sugestões personalizadas
                </p>
                <p className="text-sm text-slate-400">
                  Ajuste suas escolhas para refinar os resultados
                </p>
              </div>
              <span className="rounded-full border border-slate-700 px-3 py-1 text-xs font-semibold text-slate-200">
                Recomendações
              </span>
            </div>
            <RecommendationList recommendations={recommendations} />
          </section>
        </div>
      </div>
    </div>
  );
}

export default App;
