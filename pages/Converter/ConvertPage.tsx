import React from 'react';
import { useState } from 'react';
import { useTheme } from '../../scripts/ThemeProvider';
import { handleConvert } from '../../scripts/imageConverter';

interface PaperSize {
  label: string;
  value: string;
}

const paperSizes: PaperSize[] = [
  { label: 'A4', value: 'a4' },
  { label: 'A5', value: 'a5' },
  { label: 'Letter', value: 'letter' },
  { label: 'Legal', value: 'legal' },
];

interface ConvertPageProps {
  darkMode: boolean;
}

const ConvertPage: React.FC<ConvertPageProps> = () => {
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
          className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-8"
          style={{ color: primaryColor }}
          >
          Convert Image to PDF
        </h2>

        <div className="form-control">
          <label className="label">
            <span className="label-text" style={{ color: textColor }}>
              Choose Images
            </span>
          </label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageChange}
            className="file-input file-input-bordered w-full"
            style={{ borderColor: primaryColor }}
            aria-label="Choose images to convert"
            title="Select one or more images to convert to PDF"
          />
              </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text" style={{ color: textColor }}>
              Paper Size
            </span>
          </label>
          <select
            className="select select-bordered w-full"
                style={{ borderColor: primaryColor, color: textColor }}
            value={paperSize}
            onChange={(e) => setPaperSize(e.target.value)}
            aria-label="Select paper size"
            title="Choose the output PDF paper size"
          >
            {paperSizes.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
            </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text" style={{ color: textColor }}>
              Orientation
            </span>
          </label>
          <select
            className="select select-bordered w-full"
            style={{ borderColor: primaryColor, color: textColor }}
            value={orientation}
            onChange={(e) => setOrientation(e.target.value as 'portrait' | 'landscape')}
            aria-label="Select page orientation"
            title="Choose between portrait or landscape orientation"
          >
            <option value="portrait">Portrait</option>
            <option value="landscape">Landscape</option>
          </select>
    </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text flex items-center" style={{ color: textColor }}>
              Dimension Reduction {pdfBlob && `(Current: ${pdfSize})`}
              <div
                className="tooltip tooltip-right ml-1"
                data-tip="Controls the actual size of images in pixels. Lower values create smaller files."
              >
                <span style={{ color: primaryColor, cursor: 'help' }}>ⓘ</span>
              </div>
            </span>
            <span className="label-text-alt" style={{ color: textColor }}>
              {Math.round(dimensionReduction * 100)}%
            </span>
          </label>
          <input
            type="range"
            min="0.3"
            max="1"
            step="0.05"
            value={dimensionReduction}
            onChange={(e) => setDimensionReduction(Number(e.target.value))}
            className="range"
            style={
              {
                '--range-shdw': primaryColor,
                accentColor: primaryColor,
              } as React.CSSProperties
            }
            aria-label="Set dimension reduction"
            title="Adjust image dimensions (higher value means larger images but better quality)"
          />
          <div className="flex justify-between text-xs px-2" style={{ color: textColor }}>
            <span className="flex items-center">
              Smaller Size
              <div
                className="tooltip tooltip-right"
                data-tip="Reduces actual image dimensions. Lower values create smaller files but may lose detail."
              >
                <span className="ml-1 cursor-help" style={{ color: primaryColor }}>
                  ⓘ
                </span>
              </div>
            </span>
            <span>Better Quality</span>
          </div>
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text flex items-center" style={{ color: textColor }}>
              Compression Quality
              <div
                className="tooltip tooltip-right ml-1"
                data-tip="Controls JPEG compression level. Lower values create smaller files but may reduce image clarity."
              >
                <span style={{ color: primaryColor, cursor: 'help' }}>ⓘ</span>
              </div>
            </span>
            <span className="label-text-alt" style={{ color: textColor }}>
              {Math.round(compressionQuality * 100)}%
            </span>
          </label>
          <input
            type="range"
            min="0.1"
            max="1"
            step="0.05"
            value={compressionQuality}
            onChange={(e) => setCompressionQuality(Number(e.target.value))}
            className="range"
            style={
              {
                '--range-shdw': primaryColor,
                accentColor: primaryColor,
              } as React.CSSProperties
            }
            aria-label="Set compression quality"
            title="Adjust JPEG compression (higher value means better quality but larger file size)"
          />
          <div className="flex justify-between text-xs px-2" style={{ color: textColor }}>
            <span className="flex items-center">
              More Compression
              <div
                className="tooltip tooltip-right"
                data-tip="Affects JPEG compression level. Lower values create smaller files but may introduce visible artifacts."
              >
                <span className="ml-1 cursor-help" style={{ color: primaryColor }}>
                  ⓘ
                </span>
              </div>
            </span>
            <span>Less Artifacts</span>
          </div>
        </div>

        <button
          className="btn w-full text-white"
          style={{
            backgroundColor: primaryColor,
            borderColor: primaryHoverColor,
          }}
          onClick={() =>
            handleConvert(
              images,
              paperSize,
              orientation,
              dimensionReduction,
              compressionQuality,
              setPdfBlob,
              setPdfSize,
              setShowModal,
              setIsConverting
            )
          }
          disabled={!images.length || isConverting}
        >
          {isConverting ? (
            <span className="loading loading-spinner"></span>
          ) : (
            'Convert & Download PDF'
          )}
        </button>
      </div>

      {showModal && (
        <div className="modal modal-open fixed inset-0 flex items-center justify-center p-4 bg-black bg-opacity-50">
          <div className="modal-box w-full max-w-md p-4 sm:p-6" style={{ backgroundColor: secondaryBgColor }}>
            <h3 className="font-bold text-lg mb-4" style={{ color: primaryColor }}>
              PDF Ready! ({pdfSize})
            </h3>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={fileName.replace(/\.pdf$/i, '')}
                onChange={(e) => setFileName(e.target.value.replace(/\.pdf$/i, ''))}
                className="input input-bordered flex-1"
                style={{ borderColor: primaryColor, color: textColor }}
                autoFocus
                aria-label="PDF file name"
                title="Enter name for your PDF file"
                placeholder="Enter file name"
              />
              <span className="text-base sm:text-lg font-semibold" style={{ color: textColor }}>
                .pdf
              </span>
            </div>
            <div className="modal-action mt-4 flex justify-end gap-2">
              <button
                className="btn text-white"
                style={{ backgroundColor: primaryColor }}
                onClick={handleDownload}
              >
                Download
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
