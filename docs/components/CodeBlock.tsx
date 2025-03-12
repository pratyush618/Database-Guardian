"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

const CodeBlock: React.FC<{
  code: string;
  language?: string;
  title?: string;
}> = ({ code, language = "bash", title }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative mb-3  w-full rounded-lg bg-slate-950 text-slate-50">
      {title && (
        <div className="px-4 py-2 font-mono text-xs border-b border-slate-800 bg-slate-900 rounded-t-lg">
          {title}
        </div>
      )}

      <pre className="pl-4 py-2">
        <code lang={language}>{code}</code>
      </pre>

      <button
        onClick={copyToClipboard}
        className="absolute top-0 right-3 p-2 rounded-md bg-slate-800 hover:bg-slate-700 transition-colors"
      >
        {copied ? <Check size={16} /> : <Copy size={16} />}
      </button>
    </div>
  );
};

export default CodeBlock;
