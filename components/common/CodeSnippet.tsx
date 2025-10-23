
import React, { useState } from 'react';

interface CodeSnippetProps {
  code: string;
  language: string;
}

const CodeSnippet: React.FC<CodeSnippetProps> = ({ code, language }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code.trim());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-gray-900 rounded-lg overflow-hidden border border-gray-700 my-4 relative">
      <div className="flex justify-between items-center px-4 py-2 bg-gray-700/50">
        <span className="text-sm font-semibold text-gray-400">{language}</span>
        <button
          onClick={handleCopy}
          className="bg-gray-600 hover:bg-gray-500 text-white font-bold py-1 px-3 rounded text-sm transition-colors duration-200"
        >
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
      <pre className="p-4 text-sm overflow-x-auto text-gray-200">
        <code>{code.trim()}</code>
      </pre>
    </div>
  );
};

export default CodeSnippet;
