import React, { useState, useEffect } from 'react';
import { useTheme } from '../../scripts/ThemeProvider';

interface PDFViewerProps {
  pdfUrl: string;
  fileName: string;
  onClose: () => void;
}

const PDFViewer: React.FC<PDFViewerProps> = ({ pdfUrl, fileName, onClose }) => {
  const { theme } = useTheme();
  const darkMode = theme === 'dark';
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [scale, setScale] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, [pdfUrl]);

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePrint = () => {
    const printWindow = window.open(pdfUrl, '_blank');
    if (printWindow) {
      printWindow.onload = () => {
        setTimeout(() => {
          printWindow.print();
        }, 1000);
      };
    }
  };
  
  const handleView = () => {
    window.open(pdfUrl, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div 
        className="w-full h-full max-w-6xl max-h-[90vh] rounded-lg shadow-xl flex flex-col"
        style={{ backgroundColor: darkMode ? '#1a1a1a' : '#ffffff' }}
      >
        {/* Header */}
        <div 
          className="flex items-center justify-between p-4 border-b"
          style={{ 
            borderColor: darkMode ? '#333' : '#e5e7eb',
            backgroundColor: darkMode ? '#2a2a2a' : '#f9fafb'
          }}
        >
          <div className="flex items-center space-x-3">
            <h3 
              className="text-lg font-semibold truncate max-w-md"
              style={{ color: darkMode ? '#ffffff' : '#000000' }}
            >
              {fileName}
            </h3>
            <div className="badge badge-outline">
              PDF
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {/* Zoom Controls */}
            <div className="join">
              <button 
                className="btn btn-sm join-item"
                onClick={() => setScale(Math.max(0.5, scale - 0.25))}
                disabled={scale <= 0.5}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                </svg>
              </button>
              <button className="btn btn-sm join-item">
                {Math.round(scale * 100)}%
              </button>
              <button 
                className="btn btn-sm join-item"
                onClick={() => setScale(Math.min(3, scale + 0.25))}
                disabled={scale >= 3}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </button>
            </div>

            {/* Action Buttons */}
            <button 
              className="btn btn-sm btn-ghost"
              onClick={handleView}
              title="View in Browser"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </button>
            
            <button 
              className="btn btn-sm btn-ghost"
              onClick={handleDownload}
              title="Download"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </button>

            <button 
              className="btn btn-sm btn-ghost"
              onClick={handlePrint}
              title="Print"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
              </svg>
            </button>

            <button 
              className="btn btn-sm btn-circle btn-ghost"
              onClick={onClose}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* PDF Content */}
        <div className="flex-1 overflow-auto p-4">
          {isLoading ? (
            <div className="flex items-center justify-center h-full">
              <div className="loading loading-spinner loading-lg"></div>
            </div>
          ) : (
            <div className="flex justify-center">
              <iframe
                src={`${pdfUrl}#view=FitH&toolbar=1&navpanes=1&scrollbar=1&zoom=${scale * 100}`}
                className="w-full h-full min-h-[600px] border rounded"
                style={{ 
                  transformOrigin: 'top center',
                  borderColor: darkMode ? '#333' : '#e5e7eb'
                }}
                title={fileName}
                allow="fullscreen"
              />
            </div>
          )}
        </div>

        {/* Footer with pagination */}
        <div 
          className="flex items-center justify-between p-4 border-t"
          style={{ 
            borderColor: darkMode ? '#333' : '#e5e7eb',
            backgroundColor: darkMode ? '#2a2a2a' : '#f9fafb'
          }}
        >
          <div className="join">
            <button 
              className="btn btn-sm join-item"
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage <= 1}
            >
              Previous
            </button>
            <button className="btn btn-sm join-item">
              Page {currentPage} of {totalPages}
            </button>
            <button 
              className="btn btn-sm join-item"
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage >= totalPages}
            >
              Next
            </button>
          </div>

          <div className="text-sm opacity-70">
            Use Ctrl+Scroll to zoom
          </div>
        </div>
      </div>
    </div>
  );
};

export default PDFViewer;