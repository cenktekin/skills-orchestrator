
import React from 'react';
import Card from './common/Card';
import CodeSnippet from './common/CodeSnippet';

const TERRAFORM_SKELETON = `
# main.tf
provider "google" {
  project = var.gcp_project_id
  region  = var.gcp_region
}

# GKE Cluster for Sandboxed Execution
resource "google_container_cluster" "skill_execution_cluster" {
  name               = "skill-execution-cluster"
  location           = var.gcp_region
  initial_node_count = 1

  # Enable gVisor for sandboxing
  workload_identity_config {
    workload_pool = "\${var.gcp_project_id}.svc.id.goog"
  }
  
  addons_config {
    gke_backup_agent_config {
      enabled = true
    }
  }
}

# Cloud Run for Orchestrator API
resource "google_cloud_run_v2_service" "orchestrator_api" {
  name     = "orchestrator-api"
  location = var.gcp_region
  
  template {
    containers {
      image = "gcr.io/\${var.gcp_project_id}/orchestrator-api:latest"
    }
  }
}

# Secret Manager for API Keys
resource "google_secret_manager_secret" "gemini_api_key" {
  secret_id = "gemini-api-key"
}
`;

const IAM_ROLES = `
- **Cloud Run Invoker:** Allows users/services to invoke the Orchestrator API.
- **Kubernetes Engine Developer:** Allows the CI/CD pipeline to deploy skill containers to GKE.
- **Secret Manager Secret Accessor:** Allows execution runtimes to access necessary API keys.
- **Pub/Sub Publisher/Subscriber:** For async task management.
- **Storage Object Admin:** For managing skill manifests if stored in GCS.
`;

interface DeploymentGuideProps {
  t: (key: string) => string;
}

const DeploymentGuide: React.FC<DeploymentGuideProps> = ({ t }) => {
  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-4xl font-bold text-white">{t('deployment_title')}</h1>
        <p className="text-lg text-gray-400">{t('deployment_subtitle')}</p>
      </header>

      <Card title={t('deployment_steps_title')}>
        <ol className="list-decimal list-inside space-y-4 text-gray-300">
          <li dangerouslySetInnerHTML={{ __html: t('deployment_step1')}} />
          <li dangerouslySetInnerHTML={{ __html: t('deployment_step2')}} />
          <li>
            <span dangerouslySetInnerHTML={{ __html: t('deployment_step3')}} />
            <CodeSnippet code="terraform init && terraform apply" language="bash" />
          </li>
          <li dangerouslySetInnerHTML={{ __html: t('deployment_step4')}} />
          <li dangerouslySetInnerHTML={{ __html: t('deployment_step5')}} />
          <li dangerouslySetInnerHTML={{ __html: t('deployment_step6')}} />
        </ol>
      </Card>
      
      <div className="grid md:grid-cols-2 gap-6">
        <Card title={t('deployment_iam_title')}>
          <div dangerouslySetInnerHTML={{ __html: IAM_ROLES.replace(/- \*\*(.*?)\*\*:/g, '<li class="mt-2"><strong class="text-cyan-400">$1:</strong>') }} className="text-gray-300 space-y-2 list-none" />
        </Card>

        <Card title={t('deployment_terraform_title')}>
          <p className="text-sm mb-4 text-gray-400">{t('deployment_terraform_desc')}</p>
           <CodeSnippet code={TERRAFORM_SKELETON} language="hcl" />
        </Card>
      </div>
      
       <div>
        <h3 className="text-2xl font-bold mb-4">{t('overview_next_steps_title')}</h3>
        <ul className="list-disc list-inside space-y-2 text-gray-300">
          <li dangerouslySetInnerHTML={{ __html: t('deployment_next_step1')}} />
          <li dangerouslySetInnerHTML={{ __html: t('deployment_next_step2')}} />
          <li dangerouslySetInnerHTML={{ __html: t('deployment_next_step3')}} />
        </ul>
      </div>

    </div>
  );
};

export default DeploymentGuide;
