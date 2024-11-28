export function getBaseUrl() {
    const host = window.location.hostname
	const isLocalhost = host === 'localhost' || host === '127.0.0.1'
	const baseUrl = isLocalhost
		? 'http://localhost:5000'
		: 'https://art.playukraine.com'
    return baseUrl;
}

/**
 * Gets normalized path to the image.
 * @param {string} imagePath Path to the image.
 * @param {string} defaultImage Default image to display, if imagePath is empty.
 * @returns {string} The normalized path to the image which should be displayed in the browser.
 */
export function getImageUrl(imagePath, defaultImage) {
    const baseUrl = getBaseUrl();
    const featuredMediaUrl = imagePath
        ? `${baseUrl}${imagePath.replace('../../', '/')}`
        : defaultImage
    return featuredMediaUrl
}

export function getFormattedDate(date) {
    const formattedDate = new Date(date).toLocaleDateString(
        'uk-UA',
        {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        }
    )
    return formattedDate;
}

export function getFormattedTime(date) {
    const formattedDate = new Date(date).toLocaleDateString(
        'uk-UA',
        {
            hour: 'numeric',
            minute: 'numeric',
            // hour: '2-digit',
            // minute: '2-digit',
        }
    )
    return formattedDate;
}