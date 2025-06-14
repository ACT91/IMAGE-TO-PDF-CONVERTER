import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from "../scripts/ThemeProvider";
import PDFViewer from './components/PDFViewer';

interface SavedPDF {
  id: string;
  fileName: string;
  url: string;
  createdAt: string;
  size: string;
  pageCount: number;
}

const SavedPage: React.FC = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const darkMode = theme === 'dark';
  const [savedPDFs, setSavedPDFs] = useState<SavedPDF[]>([]);
  const [selectedPDF, setSelectedPDF] = useState<SavedPDF | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'date' | 'size'>('date');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadSavedPDFs();
  }, []);

  const loadSavedPDFs = () => {
    const stored = localStorage.getItem('savedPDFs');
    if (stored) {
      const parsed = JSON.parse(stored);
      // Filter out any invalid entries and add missing properties
      const validPDFs = parsed.filter((pdf: any) => pdf.id && pdf.url).map((pdf: any) => ({
        id: pdf.id,
        fileName: pdf.fileName || 'document.pdf',
        url: pdf.url,
        createdAt: pdf.createdAt || new Date().toISOString(),
        size: pdf.size || 'Unknown',
        pageCount: pdf.pageCount || 1
      }));
      setSavedPDFs(validPDFs);
    } else {
      setSavedPDFs([]);
    }
    setIsLoading(false);
  };

  const filteredAndSortedPDFs = savedPDFs
    .filter(pdf => pdf.fileName.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.fileName.localeCompare(b.fileName);
        case 'date':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case 'size':
          return parseFloat(b.size) - parseFloat(a.size);
        default:
          return 0;
      }
    });

  const handleDeletePDF = (id: string) => {
    const updatedPDFs = savedPDFs.filter(pdf => pdf.id !== id);
    setSavedPDFs(updatedPDFs);
    localStorage.setItem('savedPDFs', JSON.stringify(updatedPDFs));
    
    // Revoke the object URL to free memory
    const pdfToDelete = savedPDFs.find(pdf => pdf.id === id);
    if (pdfToDelete) {
      URL.revokeObjectURL(pdfToDelete.url);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div 
      className="min-h-screen p-6"
      style={{ backgroundColor: darkMode ? '#000000' : '#ffffff' }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 
              className="text-3xl font-bold mb-2"
              style={{ color: darkMode ? '#ffffff' : '#000000' }}
            >
              Saved PDFs
            </h1>
            <p 
              className="opacity-70"
              style={{ color: darkMode ? '#ffffff' : '#000000' }}
            >
              {savedPDFs.length} documents saved
            </p>
          </div>

          <button
            className="btn btn-primary"
            onClick={() => navigate('/')}
            style={{
              backgroundColor: darkMode ? '#ff0000' : '#007bff',
              borderColor: darkMode ? '#ff0000' : '#007bff'
            }}
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Create New PDF
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1">
            <div className="form-control">
              <div className="input-group">
                <input
                  type="text"
                  placeholder="Search PDFs..."
                  className="input input-bordered flex-1"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{
                    backgroundColor: darkMode ? '#1a1a1a' : '#ffffff',
                    borderColor: darkMode ? '#333' : '#e5e7eb',
                    color: darkMode ? '#ffffff' : '#000000'
                  }}
                />
                <button className="btn btn-square">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <select
            className="select select-bordered"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'name' | 'date' | 'size')}
            style={{
              backgroundColor: darkMode ? '#1a1a1a' : '#ffffff',
              borderColor: darkMode ? '#333' : '#e5e7eb',
              color: darkMode ? '#ffffff' : '#000000'
            }}
          >
            <option value="date">Sort by Date</option>
            <option value="name">Sort by Name</option>
            <option value="size">Sort by Size</option>
          </select>

          <div className="join">
            <button
              className={`btn join-item ${viewMode === 'grid' ? 'btn-active' : ''}`}
              onClick={() => setViewMode('grid')}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
            </button>
            <button
              className={`btn join-item ${viewMode === 'list' ? 'btn-active' : ''}`}
              onClick={() => setViewMode('list')}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="loading loading-spinner loading-lg"></div>
          </div>
        ) : (
          <div>
            {filteredAndSortedPDFs.length === 0 ? (
              <div className="text-center py-16">
                <div className="mb-4">
                  <svg 
                    className="w-24 h-24 mx-auto opacity-50" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                    style={{ color: darkMode ? '#ffffff' : '#000000' }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 
                  className="text-xl font-semibold mb-2"
                  style={{ color: darkMode ? '#ffffff' : '#000000' }}
                >
                  {searchTerm ? 'No PDFs found' : 'No saved PDFs yet'}
                </h3>
                <p 
                  className="opacity-70 mb-6"
                  style={{ color: darkMode ? '#ffffff' : '#000000' }}
                >
                  {searchTerm 
                    ? `No PDFs match "${searchTerm}"`
                    : 'Start by converting some images to PDF'
                  }
                </p>
                {!searchTerm && (
                  <button
                    className="btn btn-primary"
                    onClick={() => navigate('/')}
                    style={{
                      backgroundColor: darkMode ? '#ff0000' : '#007bff',
                      borderColor: darkMode ? '#ff0000' : '#007bff'
                    }}
                  >
                    Convert Images to PDF
                  </button>
                )}
              </div>
            ) : (
              <div>
                {viewMode === 'grid' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredAndSortedPDFs.map((pdf) => (
                      <div
                        key={pdf.id}
                        className="card shadow-lg hover:shadow-xl transition-shadow duration-200"
                        style={{
                          backgroundColor: darkMode ? '#1a1a1a' : '#ffffff',
                          borderColor: darkMode ? '#333' : '#e5e7eb'
                        }}
                      >
                        <div className="card-body p-4">
                          <div className="flex justify-center mb-4">
                            <div 
                              className="w-16 h-20 rounded flex items-center justify-center"
                              style={{ backgroundColor: darkMode ? '#ff0000' : '#007bff' }}
                            >
                              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
                              </svg>
                            </div>
                          </div>

                          <h3 
                            className="font-semibold text-sm mb-2 truncate"
                            style={{ color: darkMode ? '#ffffff' : '#000000' }}
                            title={pdf.fileName}
                          >
                            {pdf.fileName}
                          </h3>

                          <div className="space-y-1 text-xs opacity-70 mb-4">
                            <div style={{ color: darkMode ? '#ffffff' : '#000000' }}>
                              {formatDate(pdf.createdAt)}
                            </div>
                            <div style={{ color: darkMode ? '#ffffff' : '#000000' }}>
                              {pdf.size} • {pdf.pageCount} pages
                            </div>
                          </div>

                          <div className="flex gap-2">
                            <div className="flex gap-2 w-full">
                              <button
                                className="btn btn-sm btn-primary flex-1"
                                onClick={() => setSelectedPDF(pdf)}
                                style={{
                                  backgroundColor: darkMode ? '#ff0000' : '#007bff',
                                  borderColor: darkMode ? '#ff0000' : '#007bff'
                                }}
                              >
                                View
                              </button>
                              <button
                                className="btn btn-sm btn-outline"
                                onClick={() => window.open(pdf.url, '_blank')}
                              >
                                Browser
                              </button>
                            </div>
                            <button
                              className="btn btn-sm btn-ghost text-error"
                              onClick={() => handleDeletePDF(pdf.id)}
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {viewMode === 'list' && (
                  <div className="overflow-x-auto">
                    <table className="table w-full">
                      <thead>
                        <tr style={{ borderColor: darkMode ? '#333' : '#e5e7eb' }}>
                          <th style={{ color: darkMode ? '#ffffff' : '#000000' }}>Name</th>
                          <th style={{ color: darkMode ? '#ffffff' : '#000000' }}>Created</th>
                          <th style={{ color: darkMode ? '#ffffff' : '#000000' }}>Size</th>
                          <th style={{ color: darkMode ? '#ffffff' : '#000000' }}>Pages</th>
                          <th style={{ color: darkMode ? '#ffffff' : '#000000' }}>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredAndSortedPDFs.map((pdf) => (
                          <tr 
                            key={pdf.id}
                            className="hover"
                            style={{ borderColor: darkMode ? '#333' : '#e5e7eb' }}
                          >
                            <td>
                              <div className="flex items-center space-x-3">
                                <div 
                                  className="w-8 h-10 rounded flex items-center justify-center flex-shrink-0"
                                  style={{ backgroundColor: darkMode ? '#ff0000' : '#007bff' }}
                                >
                                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
                                  </svg>
                                </div>
                                <div>
                                  <div 
                                    className="font-medium"
                                    style={{ color: darkMode ? '#ffffff' : '#000000' }}
                                  >
                                    {pdf.fileName}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td style={{ color: darkMode ? '#ffffff' : '#000000' }}>
                              {formatDate(pdf.createdAt)}
                            </td>
                            <td style={{ color: darkMode ? '#ffffff' : '#000000' }}>
                              {pdf.size}
                            </td>
                            <td style={{ color: darkMode ? '#ffffff' : '#000000' }}>
                              {pdf.pageCount}
                            </td>
                            <td>
                              <div className="flex gap-2">
                                <div className="flex gap-2">
                                  <button
                                    className="btn btn-sm btn-primary"
                                    onClick={() => setSelectedPDF(pdf)}
                                    style={{
                                      backgroundColor: darkMode ? '#ff0000' : '#007bff',
                                      borderColor: darkMode ? '#ff0000' : '#007bff'
                                    }}
                                  >
                                    View
                                  </button>
                                  <button
                                    className="btn btn-sm btn-outline"
                                    onClick={() => window.open(pdf.url, '_blank')}
                                  >
                                    Browser
                                  </button>
                                </div>
                                <a
                                  href={pdf.url}
                                  download={pdf.fileName}
                                  className="btn btn-sm btn-ghost"
                                >
                                  Download
                                </a>
                                <button
                                  className="btn btn-sm btn-ghost text-error"
                                  onClick={() => handleDeletePDF(pdf.id)}
                                >
                                  Delete
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {selectedPDF && (
        <PDFViewer
          pdfUrl={selectedPDF.url}
          fileName={selectedPDF.fileName}
          onClose={() => setSelectedPDF(null)}
        />
      )}
    </div>
  );
};

export default SavedPage;