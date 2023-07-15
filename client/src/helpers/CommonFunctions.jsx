export const dateMonthYearStringFormat = (createdDate) => {
    const options = { month: 'long', day: 'numeric', year: 'numeric' };
    const date = new Date(createdDate);
    return date.toLocaleDateString(undefined, options);
}

export const dateMonthYear = (createdDate) => {
    const date = new Date(createdDate);
    return date.toLocaleDateString('en-GB', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    }).split('/').reverse().join('-');
}

//Avereage rating
export const calculateAverageRating = (userRatings) => {
    const totalRatings = userRatings.reduce((sum, userRating) => sum + userRating.rating, 0);
    const averageRating = totalRatings / userRatings.length
    return averageRating.toFixed(1)
}