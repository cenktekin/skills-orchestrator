
import React from 'react';
import Card from './common/Card';

interface Task {
  titleKey: string;
  descriptionKey: string;
  status: 'Todo' | 'In Progress' | 'Done';
}

const tasks: Task[] = [
  { titleKey: 'poc_task1_title', descriptionKey: 'poc_task1_desc', status: 'Todo' },
  { titleKey: 'poc_task2_title', descriptionKey: 'poc_task2_desc', status: 'Todo' },
  { titleKey: 'poc_task3_title', descriptionKey: 'poc_task3_desc', status: 'Todo' },
  { titleKey: 'poc_task4_title', descriptionKey: 'poc_task4_desc', status: 'Todo' },
  { titleKey: 'poc_task5_title', descriptionKey: 'poc_task5_desc', status: 'Todo' },
  { titleKey: 'poc_task6_title', descriptionKey: 'poc_task6_desc', status: 'Todo' },
  { titleKey: 'poc_task7_title', descriptionKey: 'poc_task7_desc', status: 'Todo' },
  { titleKey: 'poc_task8_title', descriptionKey: 'poc_task8_desc', status: 'In Progress' },
];

interface PocPlanProps {
  t: (key: string) => string;
}


const PocPlan: React.FC<PocPlanProps> = ({ t }) => {
  const getStatusInfo = (status: Task['status']): { color: string, text: string } => {
    switch (status) {
      case 'Done': return { color: 'bg-green-500/20 text-green-400', text: t('poc_status_done')};
      case 'In Progress': return { color: 'bg-yellow-500/20 text-yellow-400', text: t('poc_status_inprogress')};
      case 'Todo': return { color: 'bg-gray-600/20 text-gray-400', text: t('poc_status_todo') };
    }
  };

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-4xl font-bold text-white">{t('poc_title')}</h1>
        <p className="text-lg text-gray-400">{t('poc_subtitle')}</p>
      </header>
      
      <Card title={t('poc_acceptance_title')}>
        <p className="text-gray-300">
          {t('poc_acceptance_text')}
        </p>
      </Card>

      <div className="space-y-4">
        <h3 className="text-2xl font-bold">{t('poc_tasks_title')}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {tasks.map((task, index) => {
            const statusInfo = getStatusInfo(task.status);
            return (
              <div key={index} className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-bold text-white">{t(task.titleKey)}</h4>
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${statusInfo.color}`}>
                    {statusInfo.text}
                  </span>
                </div>
                <p className="text-sm text-gray-400">{t(task.descriptionKey)}</p>
              </div>
            )
          })}
        </div>
      </div>
      
       <div>
        <h3 className="text-2xl font-bold mb-4">{t('overview_next_steps_title')}</h3>
        <ul className="list-disc list-inside space-y-2 text-gray-300">
          <li dangerouslySetInnerHTML={{ __html: t('poc_next_step1') }} />
          <li dangerouslySetInnerHTML={{ __html: t('poc_next_step2') }} />
          <li dangerouslySetInnerHTML={{ __html: t('poc_next_step3') }} />
        </ul>
      </div>
    </div>
  );
};

export default PocPlan;
