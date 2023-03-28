import axios from 'axios';
import { updateUI } from './updateUI';
import dayjs from 'dayjs';


// the form handler handle user inputs and send the data  to the api to get the results then update the UI
export async function handleSubmit(event) {
	event.preventDefault();
	let city = document.getElementById('city').value;
	let startDate = document.getElementById('start_date').value;
	let endDate = document.getElementById('end_date').value;
	const isLoading = document.getElementsByClassName('loader')[0];


	const diff = dayjs(endDate).diff(dayjs(startDate),'d');
  isLoading.style.display = 'block';
	const { destination, image, app_max_temp, app_min_temp } = await getData(city);
  isLoading.style.display = 'none';
	updateUI(destination, image, app_max_temp, app_min_temp, diff);
}

export async function getData(city) {
	const { data: location } = await axios.get('http://localhost:3000/location', { params: { city } });
	console.log(location);
	const { data: weather } = await axios.get('http://localhost:3000/weather', { params: location });
	console.log(weather);
	const { data: images } = await axios.get('http://localhost:3000/image', { params: { city } });
	console.log(images);

	const { app_max_temp, app_min_temp } = weather.data[0];
	const destination = weather.city_name + ', ' + weather.country_code;
	const image = images.hits[0].largeImageURL;

	return { destination, image, app_max_temp, app_min_temp }
}
