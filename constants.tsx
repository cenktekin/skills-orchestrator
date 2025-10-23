import { SkillManifest } from './types';

export const SKILL_MANIFEST_SCHEMA = `
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "Skill Manifest",
  "description": "Defines the structure and requirements of a skill for the orchestrator.",
  "type": "object",
  "properties": {
    "name": { "type": "string", "description": "Unique name of the skill." },
    "version": { "type": "string", "pattern": "^\\\\d+\\\\.\\\\d+\\\\.\\\\d+$", "description": "Semantic version of the skill." },
    "description": { "type": "string", "description": "Human-readable description of what the skill does." },
    "inputs": {
      "type": "array",
      "items": { "$ref": "#/definitions/SkillInputOutput" }
    },
    "outputs": {
      "type": "array",
      "items": { "$ref": "#/definitions/SkillInputOutput" }
    },
    "capabilities": {
      "type": "array",
      "items": { "enum": ["llm", "tool", "logic"] }
    },
    "permissions": {
      "type": "object",
      "properties": {
        "outboundHttp": { "type": "array", "items": { "type": "string", "format": "hostname" } }
      }
    },
    "runtime": { "enum": ["nodejs", "python", "wasm"] },
    "entrypoint": { "type": "string", "description": "The entrypoint file or function." },
    "resourceLimits": {
      "type": "object",
      "properties": {
        "memory": { "type": "string" },
        "cpu": { "type": "string" }
      }
    },
    "cachePolicy": {
      "type": "object",
      "properties": {
        "ttl": { "type": "integer", "description": "Time-to-live in seconds." }
      }
    }
  },
  "required": ["name", "version", "description", "inputs", "outputs", "capabilities", "runtime", "entrypoint"],
  "definitions": {
    "SkillInputOutput": {
      "type": "object",
      "properties": {
        "name": { "type": "string" },
        "type": { "enum": ["string", "number", "boolean", "object", "array"] },
        "description": { "type": "string" },
        "required": { "type": "boolean" }
      },
      "required": ["name", "type", "description", "required"]
    }
  }
}
`;

export const EXAMPLE_MANIFEST_1: SkillManifest = {
  name: "sentiment-analyzer",
  version: "1.0.0",
  description: "Analyzes the sentiment of a given text using an LLM.",
  inputs: [
    { name: "text", type: "string", description: "Text to analyze.", required: true }
  ],
  outputs: [
    { name: "sentiment", type: "string", description: "Either 'positive', 'negative', or 'neutral'.", required: true }
  ],
  capabilities: ["llm"],
  runtime: "python",
  entrypoint: "main.py:analyze",
  resourceLimits: { memory: "256Mi", cpu: "500m" }
};

export const EXAMPLE_MANIFEST_2: SkillManifest = {
  name: "get-weather",
  version: "1.2.0",
  description: "Retrieves the current weather for a specified location via an external API.",
  inputs: [
    { name: "city", type: "string", description: "The city to get the weather for.", required: true }
  ],
  outputs: [
    { name: "weather", type: "object", description: "An object containing temperature and conditions.", required: true }
  ],
  capabilities: ["tool"],
  permissions: {
    outboundHttp: ["api.weather.com"]
  },
  runtime: "nodejs",
  entrypoint: "index.js"
};

export const OPENAPI_SPEC = `
openapi: 3.0.0
info:
  title: Skills Orchestrator API
  version: 1.0.0
servers:
  - url: https://orchestrator.gcp.example.com/v1
paths:
  /workflows/{workflowId}/execute:
    post:
      summary: Execute a workflow
      parameters:
        - name: workflowId
          in: path
          required: true
          schema: { type: string }
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              properties:
                inputs:
                  type: object
                  additionalProperties: true
      responses:
        '202':
          description: Accepted for asynchronous execution.
        '400':
          description: Invalid input.
  /skills:
    get:
      summary: List all available skills
      responses:
        '200':
          description: A list of skills.
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/SkillManifest'
components:
  schemas:
    SkillManifest:
      type: object
      properties:
        name: { type: string }
        version: { type: string }
        description: { type: string }
`;

// FIX: Updated GeminiAdapter example to use process.env.API_KEY per SDK guidelines.
export const ADAPTER_INTERFACE_CODE = `
// Context object passed to every adapter invocation
export interface AdapterContext {
  tenantId: string;
  workflowExecutionId: string;
  secrets: Record<string, string>;
}

// Interface for a generic Language Model adapter
export interface LLMAdapter {
  type: 'llm';
  name: string; // e.g., 'openai-gpt4', 'gemini-2.5-pro'
  invoke(prompt: string, context: AdapterContext): Promise<{ result: string }>;
}

// Interface for an external tool or API adapter
export interface ToolAdapter {
  type: 'tool';
  name: string; // e.g., 'weather-api', 'google-search'
  invoke(params: Record<string, any>, context: AdapterContext): Promise<{ result: any }>;
}

export type Adapter = LLMAdapter | ToolAdapter;


// --- Example Implementation: Gemini Adapter ---
import { GoogleGenAI } from "@google/genai";

export class GeminiAdapter implements LLMAdapter {
  public readonly type = 'llm';
  public readonly name = 'gemini-2.5-flash';
  private ai: GoogleGenAI;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  }

  async invoke(prompt: string, context: AdapterContext): Promise<{ result: string }> {
    console.log(\`Invoking Gemini for tenant: \${context.tenantId}\`);
    
    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
      });
      return { result: response.text };
    } catch (error) {
      console.error("Error invoking Gemini:", error);
      throw new Error("Failed to get response from Gemini.");
    }
  }
}
`;

export const AVAILABLE_SKILLS: SkillManifest[] = [
    { name: 'intent-detection', version: '1.0.0', description: 'Detects user intent from text.', inputs: [{name: 'query', type: 'string', required: true, description: 'User input'}], outputs: [{name: 'intent', type: 'string', required: true, description: 'Detected intent'}], capabilities: ['llm'], runtime: 'python', entrypoint: 'main.py' },
    { name: 'product-lookup', version: '1.1.0', description: 'Looks up product details by ID.', inputs: [{name: 'productId', type: 'string', required: true, description: 'Product ID'}], outputs: [{name: 'product', type: 'object', required: true, description: 'Product details'}], capabilities: ['tool'], runtime: 'nodejs', entrypoint: 'index.js' },
    { name: 'summarize-text', version: '2.0.0', description: 'Summarizes a block of text.', inputs: [{name: 'text', type: 'string', required: true, description: 'Text to summarize'}], outputs: [{name: 'summary', type: 'string', required: true, description: 'The summary'}], capabilities: ['llm'], runtime: 'python', entrypoint: 'main.py' },
    { name: 'send-email', version: '1.0.0', description: 'Sends an email.', inputs: [{name: 'recipient', type: 'string', required: true, description: 'Email address'}, {name: 'body', type: 'string', required: true, description: 'Email content'}], outputs: [], capabilities: ['tool'], runtime: 'nodejs', entrypoint: 'index.js' }
];