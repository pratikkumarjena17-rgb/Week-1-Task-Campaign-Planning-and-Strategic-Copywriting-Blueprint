import React, { useState } from 'react';
import Markdown from 'react-markdown';
import { Download, Printer, Copy, Check } from 'lucide-react';

interface BlueprintDocumentProps {
  content: string;
  productName: string;
}

export default function BlueprintDocument({ content, productName }: BlueprintDocumentProps) {
  const [isCopied, setIsCopied] = useState(false);

  const downloadDoc = () => {
    // Basic HTML wrapper for MS Word compatibility
    const header = `<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
<head><meta charset='utf-8'><title>Campaign Blueprint</title>
<style>
  body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 800px; margin: 0 auto; padding: 20px; }
  h1 { color: #111; border-bottom: 1px solid #ccc; padding-bottom: 10px; }
  h2 { color: #222; margin-top: 30px; }
  h3 { color: #444; }
  p { margin-bottom: 15px; }
  ul { margin-bottom: 15px; }
  li { margin-bottom: 5px; }
</style>
</head><body>`;
    const footer = "</body></html>";
    
    // Convert basic Markdown to HTML for the doc export
    let htmlContent = content;
    htmlContent = htmlContent.replace(/^### (.*$)/gim, '<h3>$1</h3>');
    htmlContent = htmlContent.replace(/^## (.*$)/gim, '<h2>$1</h2>');
    htmlContent = htmlContent.replace(/^# (.*$)/gim, '<h1>$1</h1>');
    htmlContent = htmlContent.replace(/^\> (.*$)/gim, '<blockquote>$1</blockquote>');
    htmlContent = htmlContent.replace(/\*\*(.*)\*\*/gim, '<b>$1</b>');
    htmlContent = htmlContent.replace(/\*(.*)\*/gim, '<i>$1</i>');
    htmlContent = htmlContent.replace(/^\* (.*$)/gim, '<ul><li>$1</li></ul>');
    htmlContent = htmlContent.replace(/<\/ul>\n<ul>/gim, '');
    htmlContent = htmlContent.replace(/^\- (.*$)/gim, '<ul><li>$1</li></ul>');
    htmlContent = htmlContent.replace(/<\/ul>\n<ul>/gim, '');
    htmlContent = htmlContent.replace(/\n\n/gim, '<p></p>');

    const sourceHTML = header + htmlContent + footer;
    
    const source = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(sourceHTML);
    const fileDownload = document.createElement("a");
    document.body.appendChild(fileDownload);
    fileDownload.href = source;
    fileDownload.download = `${productName.replace(/\s+/g, '_')}_Blueprint.doc`;
    fileDownload.click();
    document.body.removeChild(fileDownload);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="flex-1 bg-white shadow-xl rounded-sm border border-slate-300 flex flex-col print:shadow-none print:border-none">
      <div className="p-8 md:p-12 h-full flex flex-col">
        <div className="flex justify-between items-start mb-4">
          <p className="text-xs font-bold text-slate-400 tracking-[0.2em] print:hidden">STRATEGIC DOCUMENT v1.0</p>
          <div className="flex gap-2 print:hidden">
            <button
              onClick={copyToClipboard}
              className="px-4 py-2 border border-slate-200 text-slate-600 rounded-md text-xs font-bold hover:bg-slate-50 flex items-center gap-2 transition-colors"
              title="Copy to clipboard"
            >
              {isCopied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              {isCopied ? 'COPIED' : 'COPY'}
            </button>
            <button
              onClick={handlePrint}
              className="px-4 py-2 border border-slate-200 text-slate-600 rounded-md text-xs font-bold hover:bg-slate-50 flex items-center gap-2 transition-colors"
              title="Print document"
            >
              <Printer className="w-4 h-4" />
              PRINT
            </button>
            <button
              onClick={downloadDoc}
              className="px-4 py-2 border border-slate-200 text-slate-600 rounded-md text-xs font-bold hover:bg-slate-50 flex items-center gap-2 transition-colors"
            >
              <Download className="w-4 h-4" />
              EXPORT .DOC
            </button>
          </div>
        </div>
        
        <div className="prose prose-slate max-w-none w-full prose-headings:font-bold prose-h1:text-3xl prose-h1:font-serif prose-h1:font-black prose-h1:border-b-2 prose-h1:border-slate-800 prose-h1:pb-2 prose-h1:mb-6 prose-h2:text-xl prose-h2:mb-8 prose-h3:text-xs prose-h3:font-bold prose-h3:uppercase prose-h3:text-blue-600 prose-h3:tracking-wider prose-h3:mt-6 prose-h3:mb-2 prose-p:text-sm prose-p:text-slate-700 prose-li:text-sm prose-li:text-slate-700 leading-relaxed print:text-black">
          <Markdown>{content}</Markdown>
        </div>
        
        <div className="mt-12 pt-8 border-t border-slate-100">
          <div className="flex justify-between items-end">
            <div className="text-[10px] text-slate-400 font-mono">
              COPYRIGHT &copy; {new Date().getFullYear()} VIRTUAL APPRENTICE PROGRAM<br/>
              STRATEGIC CONFIDENTIALITY AGREEMENT APPLIES
            </div>
            <div className="w-12 h-12 bg-slate-100 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
