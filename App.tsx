
import React, { useState, useCallback } from 'react';
import { Section } from './types';
import Sidebar from './components/Sidebar';
import Overview from './components/Overview';
import Architecture from './components/Architecture';
import ApiSpecs from './components/ApiSpecs';
import WorkflowEditor from './components/WorkflowEditor';
import Security from './components/Security';
import PocPlan from './components/PocPlan';
import DeploymentGuide from './components/DeploymentGuide';
import { translations } from './translations';

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<Section>(Section.OVERVIEW);
  const [language, setLanguage] = useState<'en' | 'tr'>('tr'); // Default to Turkish

  const t = useCallback((key: string): string => {
    const langDict = translations[language] as { [key: string]: string | undefined };
    const fallbackDict = translations['en'] as { [key: string]: string };
    return langDict[key] || fallbackDict[key] || key;
  }, [language]);

  const renderSection = () => {
    switch (activeSection) {
      case Section.OVERVIEW:
        return <Overview t={t} />;
      case Section.ARCHITECTURE:
        return <Architecture t={t} />;
      case Section.API_SPECS:
        return <ApiSpecs t={t} />;
      case Section.WORKFLOW_EDITOR:
        return <WorkflowEditor t={t} />;
      case Section.SECURITY:
        return <Security t={t} />;
      case Section.POC_PLAN:
        return <PocPlan t={t} />;
      case Section.DEPLOYMENT:
        return <DeploymentGuide t={t} />;
      default:
        return <Overview t={t}/>;
    }
  };

  return (
    <div className="flex h-screen bg-gray-900 text-gray-100 font-sans">
      <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} t={t} />
      <main className="flex-1 p-4 md:p-8 overflow-y-auto">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-end items-center mb-4">
            <span className="text-sm mr-2 text-gray-400">{t('language')}:</span>
            <button
              onClick={() => setLanguage('en')}
              className={`px-3 py-1 text-sm font-medium rounded-l-md transition-colors duration-200 ${
                language === 'en' ? 'bg-cyan-600 text-white' : 'bg-gray-700 hover:bg-gray-600 text-gray-300'
              }`}
            >
              EN
            </button>
            <button
              onClick={() => setLanguage('tr')}
              className={`px-3 py-1 text-sm font-medium rounded-r-md transition-colors duration-200 ${
                language === 'tr' ? 'bg-cyan-600 text-white' : 'bg-gray-700 hover:bg-gray-600 text-gray-300'
              }`}
            >
              TR
            </button>
          </div>
          {renderSection()}
        </div>
      </main>
    </div>
  );
};

export default App;
