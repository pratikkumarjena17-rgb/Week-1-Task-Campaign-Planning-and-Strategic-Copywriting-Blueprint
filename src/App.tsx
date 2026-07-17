import React, { useState } from 'react';
import BlueprintDocument from './components/BlueprintDocument';
import { Sparkles, FileText, LayoutTemplate, Loader2, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Default content for Lumina (hypothetical product) to satisfy immediate task requirements
const DEFAULT_LUMINA_CONTENT = `
# Campaign Planning & Strategic Copywriting Blueprint
## Product: Lumina AI-Powered Smart Sleep Mask

---

### 1. Research Findings
* **Market Landscape:** The global sleep technology market is projected to reach $45 billion by 2028. Consumers are shifting from passive tracking to active sleep enhancement.
* **Consumer Pain Points:** Over 35% of working adults report sleeping less than the recommended 7 hours per night. Key issues include difficulty falling asleep due to stress and blue light exposure.
* **Current Trends:** "Biohacking" and holistic wellness are mainstream. Consumers expect personalization powered by AI and data analytics.
* **Copywriting Best Practices:** Health-tech audiences respond best to a blend of scientific authority and empathetic, lifestyle-focused messaging.

### 2. Target Audience Profiles
* **Segment A: The "Always-On" Professional**
  * **Demographics:** Age 30-45, high-income earners, urban professionals (executives, founders, consultants).
  * **Psychographics:** Highly driven but chronically stressed. Values efficiency and considers sleep a performance multiplier.
  * **Pain Point:** Cannot "switch off" their brain at night.
* **Segment B: The Wellness Optimizer**
  * **Demographics:** Age 25-40, mid-to-high income, health conscious.
  * **Psychographics:** Proactive about longevity and mental health. Early adopters of wearables (Oura, Whoop).
  * **Pain Point:** Frustrated by passive sleep trackers that tell them they slept poorly without offering a solution.

### 3. Competitor Analysis
* **Competitor A (Premium Sleep Rings):** 
  * *Positioning:* Passive data tracking. 
  * *Weakness:* Tells you what is wrong but doesn't actively help you fall asleep.
* **Competitor B (Basic Blackout Masks):** 
  * *Positioning:* Affordable, physical light blocking. 
  * *Weakness:* No technological advantage, audio integration, or biometric adaptation.
* **Lumina's Strategic Advantage:** Lumina bridges the gap. It provides total blackout, tracks biometric data, AND actively induces sleep using personalized, AI-driven light dimming and binaural beats.

### 4. Creative Direction & Key Messaging
* **Campaign Objective:** Launch Lumina to the US market, generating pre-orders and establishing brand authority in the "active sleep tech" category.
* **Primary Core Message:** "Master Your Sleep. Master Your Day."
* **Secondary Messages:**
  * "Stop tracking your poor sleep. Start fixing it."
  * "Your personal sleep sanctuary, powered by AI."
* **Tone of Voice:**
  * *Authoritative yet Empathetic:* Grounded in sleep science, but understanding of the struggle.
  * *Premium and Minimalist:* Like a high-end wellness retreat in product form.
* **Brand Persona:** The wise, calm, and technologically advanced sleep specialist.

### 5. Content Channels & Formats
* **Top of Funnel (Awareness):**
  * **Instagram/TikTok:** Short-form, aesthetic ASMR-style videos showing the mask's sunset dimming feature. "POV: Unwinding after a 12-hour shift."
  * **LinkedIn:** Thought leadership articles targeting professionals on the ROI of deep sleep for cognitive performance and decision-making.
* **Middle of Funnel (Consideration):**
  * **Email Newsletter:** "The Sleep Science Weekly" featuring tips on circadian rhythms and highlighting Lumina's biometric adaptation.
  * **Influencer Partnerships:** Collaborations with productivity YouTubers and wellness podcasters for in-depth reviews.
* **Bottom of Funnel (Conversion):**
  * **Retargeting Ads:** Carousel ads highlighting specific features (washable fabric, battery life, app interface) with a strong call-to-action for early-bird pricing.
  * **Landing Page:** Long-form, conversion-optimized copy focusing on the transformation from exhausted to energized.
`;

export default function App() {
  const [activeTab, setActiveTab] = useState<'demo' | 'generator'>('demo');
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState('');
  const [error, setError] = useState('');

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!productName || !productDescription) return;

    setIsGenerating(true);
    setError('');
    
    try {
      const response = await fetch('/api/generate-blueprint', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productName, productDescription }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate content');
      }

      setGeneratedContent(data.markdown);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-100 selection:text-blue-900 flex flex-col">
      {/* Header */}
      <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 shrink-0 print:hidden">
        <div>
          <h1 className="text-sm font-semibold text-slate-500 uppercase tracking-widest">Campaign Strategist</h1>
          <h2 className="text-xl font-bold">Copywriting Blueprint Generator</h2>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setActiveTab('demo')}
            className={`px-4 py-2 rounded-md text-xs font-bold transition-all ${
              activeTab === 'demo'
                ? 'bg-blue-600 text-white shadow-sm shadow-blue-200 hover:bg-blue-700'
                : 'border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            DEMO TASK
          </button>
          <button
            onClick={() => setActiveTab('generator')}
            className={`px-4 py-2 rounded-md text-xs font-bold transition-all ${
              activeTab === 'generator'
                ? 'bg-blue-600 text-white shadow-sm shadow-blue-200 hover:bg-blue-700'
                : 'border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            CUSTOM GENERATOR
          </button>
        </div>
      </header>

      <main className="flex-1 flex flex-col bg-[#EDF2F7] p-6 overflow-y-auto print:bg-white print:p-0 print:overflow-visible">
        <div className="max-w-5xl mx-auto w-full">
          <AnimatePresence mode="wait">
            {activeTab === 'demo' ? (
            <motion.div
              key="demo"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div className="mb-6 print:hidden">
                <h2 className="text-xl font-bold tracking-tight text-slate-900">
                  Virtual Copywriting Apprentice Task
                </h2>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                  Here is the completed strategic campaign plan and blueprint for a hypothetical product (Lumina Smart Sleep Mask), ready for stakeholder review.
                </p>
              </div>
              
              <BlueprintDocument content={DEFAULT_LUMINA_CONTENT} productName="Lumina Smart Sleep Mask" />
            </motion.div>
          ) : (
            <motion.div
              key="generator"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div className="mb-6 print:hidden">
                <h2 className="text-xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
                  AI Blueprint Generator <Sparkles className="w-5 h-5 text-blue-500" />
                </h2>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                  Provide the details of your hypothetical product or service, and our AI will instantly generate a comprehensive, stakeholder-ready strategic blueprint.
                </p>
              </div>

              {!generatedContent ? (
                <div className="bg-white shadow-xl rounded-sm border border-slate-300 p-8 max-w-2xl print:hidden">
                  <form onSubmit={handleGenerate} className="space-y-6">
                    <div>
                      <label htmlFor="productName" className="block text-xs font-bold uppercase text-slate-500 tracking-wider mb-2">
                        Product or Service Name
                      </label>
                      <input
                        type="text"
                        id="productName"
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                        placeholder="e.g., EcoHydrate Smart Bottle"
                        className="mt-1 block w-full rounded-sm border border-slate-300 px-4 py-3 text-sm text-slate-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-colors"
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="productDescription" className="block text-xs font-bold uppercase text-slate-500 tracking-wider mb-2">
                        Brief Description
                      </label>
                      <textarea
                        id="productDescription"
                        value={productDescription}
                        onChange={(e) => setProductDescription(e.target.value)}
                        placeholder="Describe what it does, the main features, and the problem it solves..."
                        rows={5}
                        className="mt-1 block w-full rounded-sm border border-slate-300 px-4 py-3 text-sm text-slate-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-colors resize-none"
                        required
                      />
                    </div>

                    {error && (
                      <div className="p-4 rounded-sm bg-red-50 text-red-600 text-sm border border-red-200">
                        {error}
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={isGenerating || !productName || !productDescription}
                      className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-md shadow-sm shadow-blue-200 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    >
                      {isGenerating ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          DRAFTING BLUEPRINT...
                        </>
                      ) : (
                        <>
                          GENERATE BLUEPRINT
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </form>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="flex justify-end print:hidden">
                    <button
                      onClick={() => setGeneratedContent('')}
                      className="px-4 py-2 border border-slate-200 text-slate-600 rounded-md text-xs font-bold hover:bg-white shadow-sm transition-colors flex items-center gap-2"
                    >
                      <LayoutTemplate className="w-4 h-4" />
                      CREATE ANOTHER
                    </button>
                  </div>
                  <BlueprintDocument content={generatedContent} productName={productName} />
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
