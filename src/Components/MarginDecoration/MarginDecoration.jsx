// import MarginDecoration css
import React from 'react'
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
    
    // calculate the repeat count by:
    // calculating the estimated height of 1 game row (64) and multiply it by the
    // number of ALL game rows (games * 64) to get the game row height.
    // diving the calculate game row height (above ^) by the calulated icon row height (below v).
    // calculating the height of 1 icon row and multiplying that by
    // the number of icons per row, to get the icon row height.
    // Add 6 to cover the full height of the viewport page size on PC, without any games in the current filter
    const repeatCount = Math.ceil((games * 64) / (48 * 16)) + 6

    // take an array from the property length of repeatCount, call this using the _ convention is discard the parameter and i for the index number
    const leftIcons = Array.from({length: repeatCount}, (_, i) =>
        // use a ternary operator to check if the even index remainder is equal to zero, returning aFiles if true else returning bFiles
        i % 2 === 0 ? aFiles : bFiles
    ).flat() // used to flatten the 2 arrays created with the Array.from into a single array, making it useable for the return render part of of our code

    const rightIcons = Array.from({length: repeatCount}, (_, i) => 
        i % 2 === 0 ? bFiles : aFiles
    ).flat() // see explaination above in leftIcons

    return (
        <div className="margin-decoration">
            <div className="margin-left">
                {/* use .map to get each src value and index number */}
                {leftIcons.map((src, i) => {
                    // calculate the row number by dividing the index number by 6 (the number of icons we want for each row) and using Math.floor to round down
                    const row = Math.floor(i / 6)
                    // if our indexed row number that is an even remainder (% 2) is equal to 1, set to variable named 'isEvenRow' (used to calculate to even row icons)
                    const isEvenRow = row % 2 === 1
                    return (
                        <React.Fragment key={i}>
                            {i % 6 === 0 && isEvenRow && <div className="empty-grid-spacer" />}
                            <img src={src} className={`margin-icon ${isEvenRow ? 'wave-even' : 'wave-odd'}`} />
                            {!(i % 6 === 5 && isEvenRow) && <div className="empty-grid-spacer" />}
                        </React.Fragment>
                    )
                })}
            </div>
            <div className="margin-right">
                {/* see div above for rightIcons.map code logic */}
                {rightIcons.map((src, i) => {
                    const row = Math.floor(i / 6)
                    const isEvenRow = row % 2 === 1
                    return (
                        // wrap all icons and empty spacers with React.Fragment, with key={i} for React tracking
                        <React.Fragment key={i}>
                            {/* check the index remainder of the icon is equal to zero and is an even row and that is has an empty grid spacer to achieve a staggered pattern of empty spaces before each icon in the row */}
                            {i % 6 === 0 && isEvenRow && <div className="empty-grid-spacer" />}
                            {/* render the image of icon using it src and set a object ternary to append the css 'wave-even' to 'margin-icon' if isEvenRow is true, else append 'wave odd' */}
                            <img src={src} className={`margin-icon ${isEvenRow ? 'wave-even' : 'wave-odd'}`} />
                            {/* check the index remainder of the icon is not equal to 5 so that empty spaces are added after each icon (still also checking isEvenRow is true), except the last icon in the row  */}
                            {!(i % 6 === 5 && isEvenRow) && <div className="empty-grid-spacer" />}
                        </React.Fragment>
                    )
                })}
            </div>
        </div>
    )
}

export default MarginDecoration