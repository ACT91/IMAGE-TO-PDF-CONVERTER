import React, { useState } from 'react';
import { useTheme } from "../../scripts/ThemeProvider";
import { handleConvert } from "../../scripts/imageConverter";

interface SavedPDF {
  id: string;
  fileName: string;
  url: string;
  createdAt: string;
  size: string;
  pageCount: number;
}

const ConvertPage: React.FC = () => {
  const { theme } = useTheme();
  const darkMode = theme === 'dark';
  
  const [images, setImages] = useState<File[]>([]);
  const [paperSize, setPaperSize] = useState<string>('a4');
  const [orientation, setOrientation] = useState<'portrait' | 'landscape'>('portrait');
  const [dimensionReduction, setDimensionReduction] = useState<number>(1.0);
  const [compressionQuality, setCompressionQuality] = useState<number>(0.8);
  const [pdfBlob, setPdfBlob] = useState<Blob | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [fileName, setFileName] = useState<string>('images.pdf');
  const [pdfSize, setPdfSize] = useState<string>('0 MB');
  const [isConverting, setIsConverting] = useState<boolean>(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages(Array.from(e.target.files));
      setPdfBlob(null);
      setPdfSize('0 MB');
    }
  };

  const handleDownload = () => {
    if (!pdfBlob) return;
    const url = URL.createObjectURL(pdfBlob);
    const cleanName = fileName.replace(/\.pdf$/i, '') || 'images';
    const a = document.createElement('a');
    a.href = url;
    a.download = cleanName + '.pdf';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setShowModal(false);
  };

  const handleSaveAndDownload = async () => {
    if (!pdfBlob) return;
    
    // Generate a unique ID for the PDF
    const id = Date.now().toString();
    
    // Create the PDF object to save
    const savedPDF: SavedPDF = {
      id,
      fileName: fileName.endsWith('.pdf') ? fileName : `${fileName}.pdf`,
      url: URL.createObjectURL(pdfBlob),
      createdAt: new Date().toISOString(),
      size: pdfSize,
      pageCount: images.length
    };
    
    // Save to local storage
    const existingPDFs = JSON.parse(localStorage.getItem('savedPDFs') || '[]');
    localStorage.setItem('savedPDFs', JSON.stringify([...existingPDFs, savedPDF]));
    
    // Trigger download
    handleDownload();
  };

  // Theme-specific styles
  const primaryColor = darkMode ? '#ff0000' : '#007bff';
  const primaryHoverColor = darkMode ? '#cc0000' : '#0056b3';
  const textColor = darkMode ? '#ffffff' : '#000000';
  const bgColor = darkMode ? '#000000' : '#ffffff';
  const secondaryBgColor = darkMode ? '#1a1a1a' : '#f8f9fa';

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6" style={{ backgroundColor: bgColor }}>
      <div
        className="w-full max-w-lg mx-auto space-y-6 p-6 sm:p-8 rounded-xl shadow-lg"
        style={{ backgroundColor: secondaryBgColor }}
      >
        <h2 
          className="text-2xl font-bold text-center"
          style={{ color: textColor }}
        >
          Convert Images to PDF
        </h2>

        {/* File Input */}
        <div className="space-y-2">
          <label className="block text-sm font-medium" style={{ color: textColor }}>
            Select Images
          </label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageChange}
            className="file-input file-input-bordered w-full"
            style={{
              backgroundColor: secondaryBgColor,
              borderColor: darkMode ? '#333' : '#e5e7eb',
              color: textColor
            }}
          />
          {images.length > 0 && (
            <p className="text-sm opacity-70" style={{ color: textColor }}>
              {images.length} image(s) selected
            </p>
          )}
        </div>

        {/* Paper Size */}
        <div className="space-y-2">
          <label className="block text-sm font-medium" style={{ color: textColor }}>
            Paper Size
          </label>
          <select
            value={paperSize}
            onChange={(e) => setPaperSize(e.target.value)}
            className="select select-bordered w-full"
            style={{
              backgroundColor: secondaryBgColor,
              borderColor: darkMode ? '#333' : '#e5e7eb',
              color: textColor
            }}
          >
            <option value="a4">A4</option>
            <option value="letter">Letter</option>
            <option value="legal">Legal</option>
          </select>
        </div>

        {/* Orientation */}
        <div className="space-y-2">
          <label className="block text-sm font-medium" style={{ color: textColor }}>
            Orientation
          </label>
          <div className="flex gap-4">
            <label className="flex items-center">
              <input
                type="radio"
                value="portrait"
                checked={orientation === 'portrait'}
                onChange={(e) => setOrientation(e.target.value as 'portrait' | 'landscape')}
                className="radio radio-primary mr-2"
              />
              <span style={{ color: textColor }}>Portrait</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                value="landscape"
                checked={orientation === 'landscape'}
                onChange={(e) => setOrientation(e.target.value as 'portrait' | 'landscape')}
                className="radio radio-primary mr-2"
              />
              <span style={{ color: textColor }}>Landscape</span>
            </label>
          </div>
        </div>

        {/* Dimension Reduction */}
        <div className="space-y-2">
          <label className="block text-sm font-medium" style={{ color: textColor }}>
            Dimension Reduction: {Math.round(dimensionReduction * 100)}%
          </label>
          <input
            type="range"
            min="0.3"
            max="1"
            step="0.05"
            value={dimensionReduction}
            onChange={(e) => setDimensionReduction(Number(e.target.value))}
            className="range range-primary"
          />
          <div className="flex justify-between text-xs px-2" style={{ color: textColor }}>
            <span>Smaller Size</span>
            <span>Better Quality</span>
          </div>
        </div>

        {/* Compression Quality */}
        <div className="space-y-2">
          <label className="block text-sm font-medium" style={{ color: textColor }}>
            Compression Quality: {Math.round(compressionQuality * 100)}%
          </label>
          <input
            type="range"
            min="0.1"
            max="1"
            step="0.05"
            value={compressionQuality}
            onChange={(e) => setCompressionQuality(Number(e.target.value))}
            className="range range-primary"
          />
          <div className="flex justify-between text-xs px-2" style={{ color: textColor }}>
            <span>More Compression</span>
            <span>Less Artifacts</span>
          </div>
        </div>

        {/* Convert Button */}
        <button
          onClick={() => handleConvert(
            images,
            paperSize,
            orientation,
            dimensionReduction,
            compressionQuality,
            setPdfBlob,
            setPdfSize,
            setShowModal,
            setIsConverting
          )}
          disabled={images.length === 0 || isConverting}
          className="btn w-full text-white"
          style={{
            backgroundColor: images.length === 0 || isConverting ? '#666' : primaryColor,
            borderColor: images.length === 0 || isConverting ? '#666' : primaryColor
          }}
        >
          {isConverting ? (
            <>
              <span className="loading loading-spinner loading-sm mr-2"></span>
              Converting...
            </>
          ) : (
            'Convert to PDF'
          )}
        </button>
      </div>

      {/* Success Modal */}
      {showModal && (
        <div className="modal modal-open">
          <div 
            className="modal-box"
            style={{ backgroundColor: secondaryBgColor }}
          >
            <h3 className="font-bold text-lg mb-4" style={{ color: textColor }}>
              PDF Created Successfully! ({pdfSize})
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: textColor }}>
                  File Name
                </label>
                <input
                  type="text"
                  value={fileName.replace(/\.pdf$/i, '')}
                  onChange={(e) => setFileName(e.target.value)}
                  className="input input-bordered w-full"
                  style={{
                    backgroundColor: secondaryBgColor,
                    borderColor: darkMode ? '#333' : '#e5e7eb',
                    color: textColor
                  }}
                  placeholder="Enter file name"
                />
              </div>
            </div>

            <div className="modal-action mt-4 flex justify-end gap-2">
              <button
                className="btn text-white"
                style={{ backgroundColor: primaryColor }}
                onClick={handleDownload}
              >
                Download Only
              </button>
              <button
                className="btn text-white"
                style={{ backgroundColor: darkMode ? '#4CAF50' : '#2E7D32' }}
                onClick={handleSaveAndDownload}
              >
                Save & Download
              </button>
              <button
                className="btn btn-ghost"
                style={{ color: textColor }}
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConvertPage;