
import React from 'react';
import Card from './common/Card';

interface SecurityProps {
  t: (key: string) => string;
}

const Security: React.FC<SecurityProps> = ({ t }) => {
  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-4xl font-bold text-white">{t('security_title')}</h1>
        <p className="text-lg text-gray-400">{t('security_subtitle')}</p>
      </header>

      <div className="grid md:grid-cols-2 gap-6">
        <Card title={t('security_secrets_title')}>
          <p className="text-gray-300" dangerouslySetInnerHTML={{ __html: t('security_secrets_text') }} />
          <ul className="list-disc list-inside mt-4 space-y-2 text-gray-300">
            <li>{t('security_secrets_item1')}</li>
            <li>{t('security_secrets_item2')}</li>
            <li>{t('security_secrets_item3')}</li>
          </ul>
        </Card>

        <Card title={t('security_isolation_title')}>
          <p className="text-gray-300">
            {t('security_isolation_text')}
          </p>
          <ul className="list-disc list-inside mt-4 space-y-2 text-gray-300">
            <li>{t('security_isolation_item1')}</li>
            <li>{t('security_isolation_item2')}</li>
            <li>{t('security_isolation_item3')}</li>
          </ul>
        </Card>

        <Card title={t('security_sandbox_title')}>
          <p className="text-gray-300">
            {t('security_sandbox_text')}
          </p>
          <ul className="list-disc list-inside mt-4 space-y-2 text-gray-300">
            <li dangerouslySetInnerHTML={{ __html: t('security_sandbox_item1') }} />
            <li dangerouslySetInnerHTML={{ __html: t('security_sandbox_item2') }} />
            <li>{t('security_sandbox_item3')}</li>
          </ul>
        </Card>
        
        <Card title={t('security_monitoring_title')}>
          <p className="text-gray-300">
            {t('security_monitoring_text')}
          </p>
           <ul className="list-disc list-inside mt-4 space-y-2 text-gray-300">
            <li dangerouslySetInnerHTML={{ __html: t('security_monitoring_item1') }} />
            <li dangerouslySetInnerHTML={{ __html: t('security_monitoring_item2') }} />
            <li dangerouslySetInnerHTML={{ __html: t('security_monitoring_item3') }} />
          </ul>
        </Card>
      </div>
      
      <div>
        <h3 className="text-2xl font-bold mb-4">{t('overview_next_steps_title')}</h3>
        <ul className="list-disc list-inside space-y-2 text-gray-300">
          <li dangerouslySetInnerHTML={{ __html: t('security_next_step1') }} />
          <li dangerouslySetInnerHTML={{ __html: t('security_next_step2') }} />
          <li dangerouslySetInnerHTML={{ __html: t('security_next_step3') }} />
        </ul>
      </div>

    </div>
  );
};

export default Security;
