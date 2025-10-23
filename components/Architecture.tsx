
import React from 'react';
import Card from './common/Card';

const DiagramBox: React.FC<{ title: string; subtitle: string; color: string; gridArea: string; }> = ({ title, subtitle, color, gridArea }) => (
  <div style={{ gridArea }} className={`flex flex-col items-center justify-center p-4 rounded-lg border ${color} shadow-md`}>
    <h4 className="font-bold text-center text-sm md:text-base">{title}</h4>
    <p className="text-xs text-center text-gray-400">{subtitle}</p>
  </div>
);

interface ArchitectureProps {
  t: (key: string) => string;
}

const Architecture: React.FC<ArchitectureProps> = ({ t }) => {
  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-4xl font-bold text-white">{t('architecture_title')}</h1>
        <p className="text-lg text-gray-400">{t('architecture_subtitle')}</p>
      </header>

      <Card title={t('architecture_component_diagram_title')}>
        <div className="p-4 bg-gray-900/50 rounded-lg">
          <div className="grid gap-4" style={{
              gridTemplateAreas: `
                "ui ui api api"
                "ui ui api api"
                ". orchestrator orchestrator ."
                ". orchestrator orchestrator ."
                "registry execution adapters adapters"
                "registry execution adapters adapters"`,
              gridTemplateColumns: '1fr 1fr 1fr 1fr',
              gridTemplateRows: 'auto'
            }}>
            <DiagramBox title={t('architecture_component_ui')} subtitle={t('architecture_component_ui_sub')} color="border-blue-400" gridArea="ui" />
            <DiagramBox title={t('architecture_component_api')} subtitle={t('architecture_component_api_sub')} color="border-blue-400" gridArea="api" />
            <DiagramBox title={t('architecture_component_orchestrator')} subtitle={t('architecture_component_orchestrator_sub')} color="border-cyan-400" gridArea="orchestrator" />
            <DiagramBox title={t('architecture_component_registry')} subtitle={t('architecture_component_registry_sub')} color="border-purple-400" gridArea="registry" />
            <DiagramBox title={t('architecture_component_execution')} subtitle={t('architecture_component_execution_sub')} color="border-red-400" gridArea="execution" />
            <DiagramBox title={t('architecture_component_adapters')} subtitle={t('architecture_component_adapters_sub')} color="border-green-400" gridArea="adapters" />
          </div>
          <p className="mt-4 text-center text-gray-400 text-sm">{t('architecture_component_diagram_caption')}</p>
        </div>
      </Card>
      
      <Card title={t('architecture_deployment_diagram_title')}>
         <div className="p-4 bg-gray-900/50 rounded-lg">
          <div className="grid gap-4" style={{
              gridTemplateAreas: `
                "loadbalancer loadbalancer"
                "frontend backend"
                "workflows pubsub"
                "gke gke"
                "secrets iam"
                "logging monitoring"`,
              gridTemplateColumns: '1fr 1fr',
              gridTemplateRows: 'auto'
            }}>
            <DiagramBox title={t('architecture_deployment_lb')} subtitle={t('architecture_deployment_lb_sub')} color="border-gray-500" gridArea="loadbalancer" />
            <DiagramBox title={t('architecture_deployment_frontend')} subtitle={t('architecture_deployment_frontend_sub')} color="border-blue-400" gridArea="frontend" />
            <DiagramBox title={t('architecture_deployment_backend')} subtitle={t('architecture_deployment_backend_sub')} color="border-blue-400" gridArea="backend" />
            <DiagramBox title={t('architecture_deployment_workflows')} subtitle={t('architecture_deployment_workflows_sub')} color="border-cyan-400" gridArea="workflows" />
            <DiagramBox title={t('architecture_deployment_pubsub')} subtitle={t('architecture_deployment_pubsub_sub')} color="border-cyan-400" gridArea="pubsub" />
            <DiagramBox title={t('architecture_deployment_gke')} subtitle={t('architecture_deployment_gke_sub')} color="border-red-400" gridArea="gke" />
            <DiagramBox title={t('architecture_deployment_secrets')} subtitle={t('architecture_deployment_secrets_sub')} color="border-yellow-400" gridArea="secrets" />
            <DiagramBox title={t('architecture_deployment_iam')} subtitle={t('architecture_deployment_iam_sub')} color="border-yellow-400" gridArea="iam" />
            <DiagramBox title={t('architecture_deployment_logging')} subtitle={t('architecture_deployment_logging_sub')} color="border-green-400" gridArea="logging" />
            <DiagramBox title={t('architecture_deployment_monitoring')} subtitle={t('architecture_deployment_monitoring_sub')} color="border-green-400" gridArea="monitoring" />
          </div>
          <p className="mt-4 text-center text-gray-400 text-sm">{t('architecture_deployment_diagram_caption')}</p>
        </div>
      </Card>

       <div>
        <h3 className="text-2xl font-bold mb-4">{t('overview_next_steps_title')}</h3>
        <ul className="list-disc list-inside space-y-2 text-gray-300">
          <li dangerouslySetInnerHTML={{ __html: t('architecture_next_step1') }} />
          <li dangerouslySetInnerHTML={{ __html: t('architecture_next_step2') }} />
          <li dangerouslySetInnerHTML={{ __html: t('architecture_next_step3') }} />
        </ul>
      </div>
    </div>
  );
};

export default Architecture;
