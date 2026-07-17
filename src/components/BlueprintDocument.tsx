import React from 'react';
import Markdown from 'react-markdown';
import { Download } from 'lucide-react';

interface BlueprintDocumentProps {
  content: string;
  productName: string;
}

export default function BlueprintDocument({ content, productName }: BlueprintDocumentProps) {
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
    fileDownload.download = `${productName.replace(/\\s+/g, '_')}_Blueprint.doc`;
    fileDownload.click();
    document.body.removeChild(fileDownload);
  };

  return (
    <div className="relative bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="flex items-center justify-between px-8 py-4 border-b border-gray-100 bg-gray-50/50">
        <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wider">Stakeholder Ready Document</h2>
        <button
          onClick={downloadDoc}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors shadow-sm"
        >
          <Download className="w-4 h-4" />
          Download as .DOC
        </button>
      </div>
      <div className="p-8 md:p-12 max-w-4xl mx-auto prose prose-blue prose-headings:font-medium prose-h1:text-3xl prose-h2:text-2xl text-gray-800">
        <Markdown>{content}</Markdown>
      </div>
    </div>
  );
}
