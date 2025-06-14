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
  if (!images.length) {
    console.log("No images to convert");
    return;
  }

  console.log("Starting conversion process");
  setIsConverting(true);
  setPdfBlob(null);
  setPdfSize('0 MB');

  try {
    console.log("Creating jsPDF instance");
    const doc = new jsPDF({
      orientation,
      unit: 'pt',
      format: paperSize,
    });

    for (let i = 0; i < images.length; i++) {
      console.log(`Processing image ${i+1} of ${images.length}`);
      const imgFile = images[i];
      
      // Step 1: Reduce image quality before adding to PDF
      console.log("Reducing image quality");
      const reducedQualityImage = await reduceImageQuality(imgFile, dimensionReduction, compressionQuality);
      console.log("Converting to data URL");
      const imgData = await fileToDataUrl(reducedQualityImage);
      
      console.log("Loading image");
      const img = new Image();
      img.src = imgData;
      await new Promise<void>((res) => {
        img.onload = () => res();
      });

      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();

      let imgWidth = img.width;
      let imgHeight = img.height;
      const ratio = Math.min(pageWidth / imgWidth, pageHeight / imgHeight);
      imgWidth *= ratio;
      imgHeight *= ratio;

      if (i > 0) doc.addPage();
      console.log("Adding image to PDF");
      doc.addImage(
        img,
        'JPEG',
        (pageWidth - imgWidth) / 2,
        (pageHeight - imgHeight) / 2,
        imgWidth,
        imgHeight
      );
    }

    console.log("Generating PDF blob");
    const blob = doc.output('blob');
    console.log("PDF created successfully, size:", blob.size);
    setPdfBlob(blob);
    setPdfSize(formatFileSize(blob.size));
    
    console.log("Setting show modal to true");
    setShowModal(true);
  } catch (error) {
    console.error('Conversion error:', error);
  } finally {
    console.log("Conversion process completed");
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