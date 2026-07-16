import './MarginDecoration.css'
import React from 'react'

const images = import.meta.glob('/src/assets/PixelArt/*.png', { eager: true })

function MarginDecoration() {
    const imageList = Object.values(images)
        .map(mod => mod.default)
        .sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }))
        console.log('unmatched:', imageList.filter(src => !src.match(/[ab]\.png$/)))

    const aFiles = imageList.filter(src => /a\.png/.test(src))
    const bFiles = imageList.filter(src => /b\.png/.test(src))
    console.log('aFiles count:', aFiles.length)
    console.log('bFiles count:', bFiles.length)

    return (
        <div className="margin-decoration">
            <div className="margin-left">
{aFiles.map((src, i) => {
  const row = Math.floor(i / 6)
  const isEvenRow = row % 2 === 1
  return (
    <React.Fragment key={i}>
      {i % 6 === 0 && isEvenRow && <div className="margin-empty" />}
      <img src={src} className={`margin-icon ${isEvenRow ? 'wave-even' : 'wave-odd'}`} />
      {!(i % 6 === 5 && isEvenRow) && <div className="margin-empty" />}
    </React.Fragment>
  )
})}
            </div>
            <div className="margin-right">
{bFiles.map((src, i) => {
  const row = Math.floor(i / 6)
  const isEvenRow = row % 2 === 1
  return (
    <React.Fragment key={i}>
      {i % 6 === 0 && isEvenRow && <div className="margin-empty" />}
      <img src={src} className={`margin-icon ${isEvenRow ? 'wave-even' : 'wave-odd'}`} />
      {!(i % 6 === 5 && isEvenRow) && <div className="margin-empty" />}
    </React.Fragment>
  )
})}
            </div>
        </div>
    )
}

export default MarginDecoration