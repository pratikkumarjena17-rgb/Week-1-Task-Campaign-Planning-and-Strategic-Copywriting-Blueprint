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
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans selection:bg-blue-100 selection:text-blue-900">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-sm">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <h1 className="font-semibold text-lg tracking-tight">Campaign Strategist</h1>
          </div>
          
          <div className="flex bg-gray-100 p-1 rounded-lg">
            <button
              onClick={() => setActiveTab('demo')}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all duration-200 ${
                activeTab === 'demo' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Demo Task
            </button>
            <button
              onClick={() => setActiveTab('generator')}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all duration-200 ${
                activeTab === 'generator' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Custom Generator
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <AnimatePresence mode="wait">
          {activeTab === 'demo' ? (
            <motion.div
              key="demo"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              <div className="max-w-3xl">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                  Virtual Copywriting Apprentice Task
                </h2>
                <p className="mt-4 text-lg text-gray-600 leading-relaxed">
                  Here is the completed strategic campaign plan and blueprint for a hypothetical product (Lumina Smart Sleep Mask), ready for stakeholder review. You can download this as a DOC file.
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
              className="space-y-8"
            >
              <div className="max-w-3xl">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl flex items-center gap-3">
                  AI Blueprint Generator <Sparkles className="w-8 h-8 text-blue-500" />
                </h2>
                <p className="mt-4 text-lg text-gray-600 leading-relaxed">
                  Provide the details of your hypothetical product or service, and our AI will instantly generate a comprehensive, stakeholder-ready strategic blueprint.
                </p>
              </div>

              {!generatedContent ? (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 max-w-2xl">
                  <form onSubmit={handleGenerate} className="space-y-6">
                    <div>
                      <label htmlFor="productName" className="block text-sm font-medium text-gray-700">
                        Product or Service Name
                      </label>
                      <input
                        type="text"
                        id="productName"
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                        placeholder="e.g., EcoHydrate Smart Bottle"
                        className="mt-2 block w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 focus:border-blue-500 focus:ring-blue-500 sm:text-sm transition-colors"
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="productDescription" className="block text-sm font-medium text-gray-700">
                        Brief Description
                      </label>
                      <textarea
                        id="productDescription"
                        value={productDescription}
                        onChange={(e) => setProductDescription(e.target.value)}
                        placeholder="Describe what it does, the main features, and the problem it solves..."
                        rows={4}
                        className="mt-2 block w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 focus:border-blue-500 focus:ring-blue-500 sm:text-sm transition-colors resize-none"
                        required
                      />
                    </div>

                    {error && (
                      <div className="p-4 rounded-lg bg-red-50 text-red-600 text-sm">
                        {error}
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={isGenerating || !productName || !productDescription}
                      className="w-full flex justify-center items-center gap-2 py-3.5 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    >
                      {isGenerating ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Drafting Blueprint...
                        </>
                      ) : (
                        <>
                          Generate Blueprint
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </form>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="flex justify-end">
                    <button
                      onClick={() => setGeneratedContent('')}
                      className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors flex items-center gap-2 bg-white px-4 py-2 border border-gray-200 rounded-lg shadow-sm"
                    >
                      <LayoutTemplate className="w-4 h-4" />
                      Create Another
                    </button>
                  </div>
                  <BlueprintDocument content={generatedContent} productName={productName} />
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
