'use client';

export default function Hero() {
  return (
    <section className="pt-32 pb-16 lg:pt-40 lg:pb-24">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-slate-900 border border-slate-800 rounded-full mb-6">
            <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
            <span className="text-sm text-slate-400">Free • Fast • Simple</span>
          </div>

          <h1 className="text-5xl lg:text-6xl font-bold mb-6 text-white">
            Convert Anything
          </h1>

          <p className="text-lg text-slate-400 mb-8 max-w-2xl mx-auto">
            Transform images, audio, and video files instantly. Simple, fast, and free.
          </p>

          <a
            href="#converter"
            className="inline-flex items-center space-x-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium transition-colors"
          >
            <span>Get Started</span>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
