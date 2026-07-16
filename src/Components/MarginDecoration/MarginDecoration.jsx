import './MarginDecoration.css'
import React from 'react'

const images = import.meta.glob('/src/assets/PixelArt/*.png', { eager: true })

function MarginDecoration({ games }) {
    const imageList = Object.values(images)
        .map(mod => mod.default)
        .sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }))

    const aFiles = imageList.filter(src => /a\.png/.test(src))
    const bFiles = imageList.filter(src => /b\.png/.test(src))
    
    const repeatCount = Math.ceil((games * 64) / (48 * 16)) + 6
    const leftIcons = Array.from({length: repeatCount}, (_, i) => 
        i % 2 === 0 ? aFiles : bFiles
    ).flat()

    const rightIcons = Array.from({length: repeatCount}, (_, i) => 
        i % 2 === 0 ? bFiles : aFiles
    ).flat()

    return (
        <div className="margin-decoration">
            <div className="margin-left">
            {leftIcons.map((src, i) => {
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
                {rightIcons.map((src, i) => {
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