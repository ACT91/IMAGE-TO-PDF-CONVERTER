import { jsPDF } from 'jspdf';

export const reduceImageQuality = (file: File, dimensionReduction: number, compressionQuality: number): Promise<Blob> => {
  return new Promise((resolve) => {
    const img = new Image();
    const reader = new FileReader();

    reader.onload = (e: ProgressEvent<FileReader>) => {
      img.src = e.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d')!;
        
        // Apply dimension reduction
        canvas.width = img.width * dimensionReduction;
        canvas.height = img.height * dimensionReduction;
        
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        
        // Apply compression quality
        canvas.toBlob(
          (blob) => resolve(blob!),
          'image/jpeg',
          compressionQuality
        );
      };
    };
    reader.readAsDataURL(file);
  });
};

export const fileToDataUrl = (file: File | Blob): Promise<string> => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e: ProgressEvent<FileReader>) => {
      if (e.target?.result) {
        resolve(e.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  });
};

export const handleConvert = async (
  images: File[],
  paperSize: string,
  orientation: 'portrait' | 'landscape',
  dimensionReduction: number,
  compressionQuality: number,
  setPdfBlob: (blob: Blob | null) => void,
  setPdfSize: (size: string) => void,
  setShowModal: (show: boolean) => void,
  setIsConverting: (isConverting: boolean) => void
): Promise<void> => {
  if (!images.length) return;

  setIsConverting(true);
  setPdfBlob(null);
  setPdfSize('0 MB');

  try {
    const doc = new jsPDF({
      orientation,
      unit: 'pt',
      format: paperSize,
    });

    for (let i = 0; i < images.length; i++) {
      const imgFile = images[i];
      
      // Step 1: Reduce image quality before adding to PDF
      const reducedQualityImage = await reduceImageQuality(imgFile, dimensionReduction, compressionQuality);
      const imgData = await fileToDataUrl(reducedQualityImage);
      
      const img = new window.Image();
      img.src = imgData;
      await new Promise((res) => (img.onload = res));

      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();

      let imgWidth = img.width;
      let imgHeight = img.height;
      const ratio = Math.min(pageWidth / imgWidth, pageHeight / imgHeight);
      imgWidth *= ratio;
      imgHeight *= ratio;

      if (i > 0) doc.addPage();
      doc.addImage(
        img,
        'JPEG',
        (pageWidth - imgWidth) / 2,
        (pageHeight - imgHeight) / 2,
        imgWidth,
        imgHeight
      );
    }

    const blob = doc.output('blob');
    setPdfBlob(blob);
    setPdfSize(formatFileSize(blob.size));
    setShowModal(true);
  } catch (error) {
    console.error('Conversion error:', error);
  } finally {
    setIsConverting(false);
  }
};

const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};