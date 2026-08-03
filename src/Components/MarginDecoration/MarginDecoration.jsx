// import MarginDecoration css
import './MarginDecoration.css'

// Import all images from the PixelArt folder, using Vite's import.meta.glob to dynamically import them and set eager to true so that they are imported immediately
const images = import.meta.glob('/src/assets/PixelArt/*.png', { eager: true })

function MarginDecoration({ games }) {
    // use object.values to grab the module values from images
    const imageList = Object.values(images)
        .map(mod => mod.default) // use .map to unwrap each default module to get just the URL value string into an array 
        .sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' })) // use 'numeric: true' to sort the images into a numeric order, with 'sensitivity: base to do this via the filenames

    // use the .filter method to pass through each URL (use src as the item naming convention) in imageList, 
    // using .test to look through all src files affixed with the character a and saving the resulting array to a variable of aFiles
    const aFiles = imageList.filter(src => /a\.png/.test(src)) // use of regex test includes the . of the file path, rather than using a string comparison
    const bFiles = imageList.filter(src => /b\.png/.test(src)) // same logic as above, just looking for files affixed with the character b for saving to variable bFiles
    
    
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