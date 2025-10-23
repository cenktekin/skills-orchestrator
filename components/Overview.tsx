
import React from 'react';
import Card from './common/Card';

interface OverviewProps {
  t: (key: string) => string;
}

const Overview: React.FC<OverviewProps> = ({ t }) => {
  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-4xl font-bold text-white mb-2">{t('overview_title')}</h1>
        <p className="text-lg text-gray-400">{t('overview_subtitle')}</p>
      </header>
      
      <Card title={t('overview_goal_title')}>
        <p className="text-gray-300">
          {t('overview_goal_text')}
        </p>
      </Card>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <h4 className="text-lg font-semibold text-cyan-400 mb-2">{t('overview_feature1_title')}</h4>
          <p className="text-sm text-gray-300">{t('overview_feature1_text')}</p>
        </Card>
        <Card>
          <h4 className="text-lg font-semibold text-cyan-400 mb-2">{t('overview_feature2_title')}</h4>
          <p className="text-sm text-gray-300">{t('overview_feature2_text')}</p>
        </Card>
        <Card>
          <h4 className="text-lg font-semibold text-cyan-400 mb-2">{t('overview_feature3_title')}</h4>
          <p className="text-sm text-gray-300">{t('overview_feature3_text')}</p>
        </Card>
        <Card>
          <h4 className="text-lg font-semibold text-cyan-400 mb-2">{t('overview_feature4_title')}</h4>
          <p className="text-sm text-gray-300">{t('overview_feature4_text')}</p>
        </Card>
        <Card>
          <h4 className="text-lg font-semibold text-cyan-400 mb-2">{t('overview_feature5_title')}</h4>
          <p className="text-sm text-gray-300">{t('overview_feature5_text')}</p>
        </Card>
         <Card>
          <h4 className="text-lg font-semibold text-cyan-400 mb-2">{t('overview_feature6_title')}</h4>
          <p className="text-sm text-gray-300">{t('overview_feature6_text')}</p>
        </Card>
      </div>

      <div>
        <h3 className="text-2xl font-bold mb-4">{t('overview_next_steps_title')}</h3>
        <ul className="list-disc list-inside space-y-2 text-gray-300">
          <li dangerouslySetInnerHTML={{ __html: t('overview_next_step1') }} />
          <li dangerouslySetInnerHTML={{ __html: t('overview_next_step2') }} />
          <li dangerouslySetInnerHTML={{ __html: t('overview_next_step3') }} />
        </ul>
      </div>
    </div>
  );
};

export default Overview;
