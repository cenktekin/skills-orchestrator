
export enum Section {
  OVERVIEW = 'Overview',
  ARCHITECTURE = 'Architecture',
  API_SPECS = 'API & Schemas',
  WORKFLOW_EDITOR = 'Workflow Editor',
  SECURITY = 'Security & Operations',
  POC_PLAN = 'Proof of Concept',
  DEPLOYMENT = 'Deployment Guide',
}

// --- Skill Manifest Interfaces ---
export interface SkillInputOutput {
  name: string;
  type: 'string' | 'number' | 'boolean' | 'object' | 'array';
  description: string;
  required: boolean;
}

export interface SkillManifest {
  name: string;
  version: string;
  description: string;
  inputs: SkillInputOutput[];
  outputs: SkillInputOutput[];
  capabilities: ('llm' | 'tool' | 'logic')[];
  permissions?: {
    outboundHttp?: string[]; // Allowed domains
  };
  runtime: 'nodejs' | 'python' | 'wasm';
  entrypoint: string;
  resourceLimits?: {
    memory: string; // e.g., "256Mi"
    cpu: string;    // e.g., "500m"
  };
  cachePolicy?: {
    ttl: number; // in seconds
  };
}


// --- Adapter Interfaces ---
export interface AdapterContext {
  tenantId: string;
  workflowExecutionId: string;
  secrets: Record<string, string>;
}

export interface LLMAdapter {
  type: 'llm';
  name: string;
  invoke(prompt: string, context: AdapterContext): Promise<{ result: string }>;
}

export interface ToolAdapter {
  type: 'tool';
  name: string;
  invoke(params: Record<string, any>, context: AdapterContext): Promise<{ result: any }>;
}

export type Adapter = LLMAdapter | ToolAdapter;


// --- Workflow Editor Interfaces ---
export interface WorkflowNode {
  id: string;
  type: 'skill' | 'start' | 'end';
  label: string;
  position: { x: number; y: number };
  skill?: SkillManifest;
}

export interface WorkflowEdge {
  id: string;
  source: string;
  target: string;
}
