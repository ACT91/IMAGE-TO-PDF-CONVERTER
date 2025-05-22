import './ConvertPage.css'
import { useState } from 'react'
import { jsPDF } from 'jspdf'

const paperSizes = [
  { label: 'A4', value: 'a4' },
  { label: 'A5', value: 'a5' },
  { label: 'Letter', value: 'letter' },
  { label: 'Legal', value: 'legal' },
]

function ConvertPage() {
  const [images, setImages] = useState([])
  const [paperSize, setPaperSize] = useState('a4')
  const [orientation, setOrientation] = useState('portrait')
  const [quality, setQuality] = useState(0.95)
  const [pdfBlob, setPdfBlob] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [fileName, setFileName] = useState('images.pdf')

  const handleImageChange = (e) => {
    setImages([...e.target.files])
    setPdfBlob(null)
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

      // Calculate image size to fit page
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

  function fileToDataUrl(file) {
    return new Promise((resolve) => {
      const reader = new FileReader()
      reader.onload = (e) => resolve(e.target.result)
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
    <div className="container">
      <h2>Convert Image to PDF</h2>
      <div className="input-group">
        <label className="input-label file-label">
          <span>Choose Images</span>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageChange}
            className="file-input"
            id="file-upload"
          />
        </label>
      </div>
      <div className="input-group">
        <label>
          Paper Size:&nbsp;
          <select value={paperSize} onChange={e => setPaperSize(e.target.value)}>
            {paperSizes.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </label>
      </div>
      <div className="input-group">
        <label>
          Orientation:&nbsp;
          <select value={orientation} onChange={e => setOrientation(e.target.value)}>
            <option value="portrait">Portrait</option>
            <option value="landscape">Landscape</option>
          </select>
        </label>
      </div>
      <div className="input-group">
        <label className="input-label">
          Image Quality
          <div className="range-wrapper">
            <input
              type="range"
              min="0.1"
              max="1"
              step="0.05"
              value={quality}
              onChange={e => setQuality(Number(e.target.value))}
              className="quality-range"
            />
            <span className="quality-value">{Math.round(quality * 100)}%</span>
          </div>
        </label>
      </div>
      <button
        className="convert-btn"
        onClick={handleConvert}
        disabled={!images.length}
      >
        Convert & Download PDF
      </button>

      {showModal && (
        <div className="modal-backdrop">
          <div className="modal">
            <h3>Name your PDF</h3>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
              <input
                type="text"
                value={fileName.replace(/\.pdf$/i, '')}
                onChange={e => setFileName(e.target.value.replace(/\.pdf$/i, ''))}
                className="modal-input"
                autoFocus
              />
              <span style={{ fontWeight: 600, fontSize: '1.1rem' }}>.pdf</span>
            </div>
            <div className="modal-actions">
              <button className="convert-btn" onClick={handleDownload}>Download</button>
              <button className="convert-btn" style={{ background: '#aaa' }} onClick={() => setShowModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ConvertPage