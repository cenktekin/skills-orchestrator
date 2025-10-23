
import React, { useState } from 'react';
import Card from './common/Card';
import CodeSnippet from './common/CodeSnippet';
import { SKILL_MANIFEST_SCHEMA, EXAMPLE_MANIFEST_1, EXAMPLE_MANIFEST_2, OPENAPI_SPEC, ADAPTER_INTERFACE_CODE } from '../constants';

type Tab = 'ManifestSchema' | 'ManifestExamples' | 'OpenAPI' | 'AdapterInterface';

interface ApiSpecsProps {
  t: (key: string) => string;
}

const ApiSpecs: React.FC<ApiSpecsProps> = ({ t }) => {
  const [activeTab, setActiveTab] = useState<Tab>('ManifestSchema');

  const TabButton: React.FC<{ tabName: Tab; label: string }> = ({ tabName, label }) => (
    <button
      onClick={() => setActiveTab(tabName)}
      className={`px-4 py-2 text-sm font-medium rounded-md ${
        activeTab === tabName ? 'bg-cyan-600 text-white' : 'text-gray-300 hover:bg-gray-700'
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-4xl font-bold text-white">{t('api_title')}</h1>
        <p className="text-lg text-gray-400">{t('api_subtitle')}</p>
      </header>

      <Card>
        <div className="flex flex-wrap gap-2 border-b border-gray-700 mb-4 pb-2">
          <TabButton tabName="ManifestSchema" label={t('api_tab_schema')} />
          <TabButton tabName="ManifestExamples" label={t('api_tab_examples')} />
          <TabButton tabName="OpenAPI" label={t('api_tab_openapi')} />
          <TabButton tabName="AdapterInterface" label={t('api_tab_adapter')} />
        </div>

        <div>
          {activeTab === 'ManifestSchema' && (
            <div>
              <p className="mb-4 text-gray-300" dangerouslySetInnerHTML={{ __html: t('api_schema_desc') }} />
              <CodeSnippet code={SKILL_MANIFEST_SCHEMA} language="json" />
            </div>
          )}
          {activeTab === 'ManifestExamples' && (
            <div>
              <p className="mb-4 text-gray-300">{t('api_examples_desc')}</p>
              <h3 className="text-lg font-semibold mt-6 mb-2 text-cyan-400">{t('api_example1_title')}</h3>
              <CodeSnippet code={JSON.stringify(EXAMPLE_MANIFEST_1, null, 2)} language="json" />
              <h3 className="text-lg font-semibold mt-6 mb-2 text-cyan-400">{t('api_example2_title')}</h3>
              <CodeSnippet code={JSON.stringify(EXAMPLE_MANIFEST_2, null, 2)} language="json" />
            </div>
          )}
          {activeTab === 'OpenAPI' && (
            <div>
               <p className="mb-4 text-gray-300">{t('api_openapi_desc')}</p>
              <CodeSnippet code={OPENAPI_SPEC} language="yaml" />
            </div>
          )}
          {activeTab === 'AdapterInterface' && (
            <div>
               <p className="mb-4 text-gray-300" dangerouslySetInnerHTML={{ __html: t('api_adapter_desc') }} />
              <CodeSnippet code={ADAPTER_INTERFACE_CODE} language="typescript" />
            </div>
          )}
        </div>
      </Card>
       <div>
        <h3 className="text-2xl font-bold mb-4">{t('overview_next_steps_title')}</h3>
        <ul className="list-disc list-inside space-y-2 text-gray-300">
          <li dangerouslySetInnerHTML={{ __html: t('api_next_step1') }} />
          <li dangerouslySetInnerHTML={{ __html: t('api_next_step2') }} />
          <li dangerouslySetInnerHTML={{ __html: t('api_next_step3') }} />
        </ul>
      </div>
    </div>
  );
};

export default ApiSpecs;
