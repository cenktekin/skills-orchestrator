
import React, { useState, MouseEvent, useRef, useMemo } from 'react';
import { WorkflowNode, WorkflowEdge, SkillManifest } from '../types';
import { AVAILABLE_SKILLS } from '../constants';
import Card from './common/Card';

const getNextId = (() => {
  let count = 0;
  return () => `el_${++count}_${Date.now()}`;
})();

interface WorkflowEditorProps {
    t: (key: string) => string;
}

const WorkflowEditor: React.FC<WorkflowEditorProps> = ({ t }) => {
  const initialNodes: WorkflowNode[] = useMemo(() => [
    { id: 'start', type: 'start', label: t('workflow_node_start'), position: { x: 50, y: 200 } },
    { id: 'end', type: 'end', label: t('workflow_node_end'), position: { x: 750, y: 200 } },
  ], [t]);

  const [nodes, setNodes] = useState<WorkflowNode[]>(initialNodes);
  const [edges, setEdges] = useState<WorkflowEdge[]>([]);
  const [connecting, setConnecting] = useState<{ sourceId: string; x: number; y: number } | null>(null);
  
  const editorRef = useRef<HTMLDivElement>(null);

  const addNode = (skill: SkillManifest) => {
    const newNode: WorkflowNode = {
      id: getNextId(),
      type: 'skill',
      label: skill.name,
      skill: skill,
      position: { x: 200, y: Math.random() * 400 + 50 },
    };
    setNodes(prev => [...prev, newNode]);
  };

  const handleLoadTemplate = () => {
    const intentSkill = AVAILABLE_SKILLS.find(s => s.name === 'intent-detection');
    const lookupSkill = AVAILABLE_SKILLS.find(s => s.name === 'product-lookup');

    if (!intentSkill || !lookupSkill) return;

    const templateNodes: WorkflowNode[] = [
      ...initialNodes,
      { id: 'template-node-1', type: 'skill', label: intentSkill.name, skill: intentSkill, position: { x: 250, y: 100 } },
      { id: 'template-node-2', type: 'skill', label: lookupSkill.name, skill: lookupSkill, position: { x: 500, y: 300 } },
    ];
    
    const templateEdges: WorkflowEdge[] = [
      { id: 'template-edge-1', source: 'start', target: 'template-node-1' },
      { id: 'template-edge-2', source: 'template-node-1', target: 'template-node-2' },
      { id: 'template-edge-3', source: 'template-node-2', target: 'end' },
    ];
    
    setNodes(templateNodes);
    setEdges(templateEdges);
  };

  const handleReset = () => {
    setNodes(initialNodes);
    setEdges([]);
  };
  
  const onNodeMouseDown = (e: MouseEvent<HTMLDivElement>, nodeId: string) => {
    e.preventDefault();
    const editorBounds = editorRef.current?.getBoundingClientRect();
    if (!editorBounds) return;

    const startPos = { x: e.clientX, y: e.clientY };
    const startNodePos = nodes.find(n => n.id === nodeId)?.position || { x: 0, y: 0 };

    const onMouseMove = (moveEvent: globalThis.MouseEvent) => {
      const dx = moveEvent.clientX - startPos.x;
      const dy = moveEvent.clientY - startPos.y;
      setNodes(prevNodes =>
        prevNodes.map(n =>
          n.id === nodeId
            ? { ...n, position: { x: startNodePos.x + dx, y: startNodePos.y + dy } }
            : n
        )
      );
    };

    const onMouseUp = () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };
  
  const startConnection = (e: MouseEvent, sourceId: string) => {
    e.stopPropagation();
    const editorBounds = editorRef.current?.getBoundingClientRect();
    if(!editorBounds) return;

    const sourceNode = nodes.find(n => n.id === sourceId);
    if (!sourceNode) return;

    setConnecting({ 
        sourceId, 
        x: sourceNode.position.x + 160, 
        y: sourceNode.position.y + 32,
    });
  };
  
  const onCanvasMouseMove = (e: MouseEvent) => {
    if (connecting) {
      const editorBounds = editorRef.current?.getBoundingClientRect();
      if(!editorBounds) return;
      setConnecting(prev => prev ? { ...prev, x: e.clientX - editorBounds.left, y: e.clientY - editorBounds.top } : null);
    }
  };

  const endConnection = (targetId: string) => {
    if (connecting && connecting.sourceId !== targetId) {
      if (!edges.some(e => e.source === connecting.sourceId && e.target === targetId)) {
        const newEdge: WorkflowEdge = { id: getNextId(), source: connecting.sourceId, target: targetId };
        setEdges(prev => [...prev, newEdge]);
      }
    }
    setConnecting(null);
  };
  
  const getNodePosition = (nodeId: string) => nodes.find(n => n.id === nodeId)?.position || { x: 0, y: 0 };

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-4xl font-bold text-white">{t('workflow_title')}</h1>
        <p className="text-lg text-gray-400">{t('workflow_subtitle')}</p>
      </header>
      <div className="flex flex-col md:flex-row gap-6 h-[70vh]">
        <Card title={t('workflow_skills_title')} className="w-full md:w-1/4 overflow-y-auto">
          <div className="space-y-2">
            {AVAILABLE_SKILLS.map(skill => (
              <div key={skill.name} onClick={() => addNode(skill)} className="p-3 bg-gray-700 rounded-md cursor-pointer hover:bg-cyan-600/50 transition-colors">
                <p className="font-bold">{skill.name}</p>
                <p className="text-sm text-gray-400">{skill.description}</p>
              </div>
            ))}
          </div>
        </Card>
        <div className="flex-1 flex flex-col">
          <div className="flex-1">
            <Card className="h-full w-full p-0 overflow-hidden flex flex-col">
               <div className="p-4 border-b border-gray-700 flex items-center gap-4">
                  <button onClick={handleLoadTemplate} className="px-3 py-1 text-sm bg-cyan-600 hover:bg-cyan-700 rounded-md transition-colors">{t('workflow_load_template')}</button>
                  <button onClick={handleReset} className="px-3 py-1 text-sm bg-gray-600 hover:bg-gray-500 rounded-md transition-colors">{t('workflow_reset')}</button>
               </div>
              <div 
                ref={editorRef} 
                className="relative w-full h-full bg-gray-800/50 rounded-b-md overflow-hidden" 
                onMouseMove={onCanvasMouseMove}
                onMouseUp={() => setConnecting(null)}
              >
                <svg className="absolute w-full h-full" style={{ pointerEvents: 'none' }}>
                  {edges.map(edge => {
                    const sourcePos = getNodePosition(edge.source);
                    const targetPos = getNodePosition(edge.target);
                    const isStartOrEndSource = nodes.find(n => n.id === edge.source)?.type !== 'skill';
                    const isStartOrEndTarget = nodes.find(n => n.id === edge.target)?.type !== 'skill';

                    const x1 = sourcePos.x + (isStartOrEndSource ? 80 : 160);
                    const y1 = sourcePos.y + 32;
                    const x2 = targetPos.x + (isStartOrEndTarget ? 80 : 0);
                    const y2 = targetPos.y + 32;

                    return <line key={edge.id} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#0891b2" strokeWidth="2" />;
                  })}
                  {connecting && <line x1={getNodePosition(connecting.sourceId).x + (nodes.find(n => n.id === connecting.sourceId)?.type !== 'skill' ? 80 : 160)} y1={getNodePosition(connecting.sourceId).y + 32} x2={connecting.x} y2={connecting.y} stroke="#67e8f9" strokeWidth="2" strokeDasharray="5,5" />}
                </svg>
                {nodes.map(node => (
                  <div 
                    key={node.id} 
                    className={`absolute p-4 bg-gray-700 rounded-lg shadow-xl border border-gray-600 h-16 flex items-center justify-center cursor-move ${node.type === 'skill' ? 'w-40' : 'w-24'}`}
                    style={{ left: node.position.x, top: node.position.y }}
                    onMouseDown={(e) => onNodeMouseDown(e, node.id)}
                  >
                     {node.type !== 'start' && <div onMouseUp={() => endConnection(node.id)} className="absolute w-4 h-4 bg-gray-500 rounded-full -left-2 top-1/2 -translate-y-1/2 cursor-pointer hover:ring-2 ring-cyan-400" />}
                     <p className="text-center font-semibold select-none">{node.label}</p>
                     {node.type !== 'end' && <div onMouseDown={(e) => startConnection(e, node.id)} className="absolute w-4 h-4 bg-cyan-500 rounded-full -right-2 top-1/2 -translate-y-1/2 cursor-crosshair" />}
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkflowEditor;
