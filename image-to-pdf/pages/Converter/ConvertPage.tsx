import { useState } from 'react'
import { jsPDF } from 'jspdf'

interface PaperSize {
  label: string;
  value: string;
}

const paperSizes: PaperSize[] = [
  { label: 'A4', value: 'a4' },
  { label: 'A5', value: 'a5' },
  { label: 'Letter', value: 'letter' },
  { label: 'Legal', value: 'legal' },
]

const ConvertPage: React.FC = () => {
  const [images, setImages] = useState<File[]>([])
  const [paperSize, setPaperSize] = useState<string>('a4')
  const [orientation, setOrientation] = useState<'portrait' | 'landscape'>('portrait')
  const [quality, setQuality] = useState<number>(0.95)
  const [pdfBlob, setPdfBlob] = useState<Blob | null>(null)
  const [showModal, setShowModal] = useState<boolean>(false)
  const [fileName, setFileName] = useState<string>('images.pdf')

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages(Array.from(e.target.files))
      setPdfBlob(null)
    }
  }

  const handleConvert = async () => {
    if (!images.length) return

    const doc = new jsPDF({
      orientation,
      unit: 'pt',
      format: paperSize,
    })

    for (let i = 0; i < images.length; i++) {
      const imgFile = images[i]
      const imgData = await fileToDataUrl(imgFile)
      const img = new window.Image()
      img.src = imgData
      await new Promise((res) => (img.onload = res))

      const pageWidth = doc.internal.pageSize.getWidth()
      const pageHeight = doc.internal.pageSize.getHeight()

      let imgWidth = img.width
      let imgHeight = img.height
      const ratio = Math.min(pageWidth / imgWidth, pageHeight / imgHeight)
      imgWidth *= ratio
      imgHeight *= ratio

      if (i > 0) doc.addPage()
      doc.addImage(
        img,
        'JPEG',
        (pageWidth - imgWidth) / 2,
        (pageHeight - imgHeight) / 2,
        imgWidth,
        imgHeight,
        undefined,
        'FAST',
        quality
      )
    }

    const blob = doc.output('blob')
    setPdfBlob(blob)
    setShowModal(true)
  }

  const fileToDataUrl = (file: File): Promise<string> => {
    return new Promise((resolve) => {
      const reader = new FileReader()
      reader.onload = (e) => {
        if (e.target?.result) {
          resolve(e.target.result as string)
        }
      }
      reader.readAsDataURL(file)
    })
  }

  const handleDownload = () => {
    if (!pdfBlob) return
    const url = URL.createObjectURL(pdfBlob)
    const cleanName = fileName.replace(/\.pdf$/i, '') || 'images'
    const a = document.createElement('a')
    a.href = url
    a.download = cleanName + '.pdf'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    setShowModal(false)
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold text-center mb-8">Convert Image to PDF</h2>
      
      <div className="max-w-xl mx-auto space-y-6">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Choose Images</span>
          </label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageChange}
            className="file-input file-input-bordered w-full"
            aria-label="Choose images to convert"
            title="Select one or more images to convert to PDF"
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Paper Size</span>
          </label>
          <select 
            className="select select-bordered w-full"
            value={paperSize} 
            onChange={e => setPaperSize(e.target.value)}
            aria-label="Select paper size"
            title="Choose the output PDF paper size"
          >
            {paperSizes.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Orientation</span>
          </label>
          <select 
            className="select select-bordered w-full"
            value={orientation} 
            onChange={e => setOrientation(e.target.value as 'portrait' | 'landscape')}
            aria-label="Select page orientation"
            title="Choose between portrait or landscape orientation"
          >
            <option value="portrait">Portrait</option>
            <option value="landscape">Landscape</option>
          </select>
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Image Quality</span>
            <span className="label-text-alt">{Math.round(quality * 100)}%</span>
          </label>
          <input
            type="range"
            min="0.1"
            max="1"
            step="0.05"
            value={quality}
            onChange={e => setQuality(Number(e.target.value))}
            className="range range-primary"
            aria-label="Set image quality"
            title="Adjust image quality (higher value means better quality but larger file size)"
          />
        </div>

        <button
          className="btn btn-primary w-full"
          onClick={handleConvert}
          disabled={!images.length}
        >
          Convert & Download PDF
        </button>
      </div>

      {showModal && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-4">Name your PDF</h3>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={fileName.replace(/\.pdf$/i, '')}
                onChange={e => setFileName(e.target.value.replace(/\.pdf$/i, ''))}
                className="input input-bordered flex-1"
                autoFocus
                aria-label="PDF file name"
                title="Enter name for your PDF file"
                placeholder="Enter file name"
              />
              <span className="text-lg font-semibold">.pdf</span>
            </div>
            <div className="modal-action">
              <button className="btn btn-primary" onClick={handleDownload}>
                Download
              </button>
              <button 
                className="btn btn-ghost" 
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ConvertPage