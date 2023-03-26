const cityHolder = document.getElementById('cityHolder');
const image = document.getElementById('destinationImageHolder');
const highDegree = document.getElementById('highestDegreeHolder');
const lowestDegree = document.getElementById('lowestDegreeHolder');
const tripDuration = document.getElementById('tripDurationHolder');


export function validateData(city, imageSrc, hDegree, lDegree) {
	if (!city|| !imageSrc || !hDegree || !lDegree) {
		return false;
	}
	return true;
}

export function updateUI(city, imageSrc, hDegree, lDegree, duration) {

  cityHolder.textContent = 'My Destination: ' + city;
  image.src = imageSrc;
  highDegree.textContent = 'Highest Degree: ' + hDegree;
  lowestDegree.textContent = 'Lowest Degree: ' + lDegree;
  tripDuration.textContent = 'Your Trip is : ' + duration + ' Days.';

}