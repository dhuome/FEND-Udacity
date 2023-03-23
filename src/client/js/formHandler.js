import axios from 'axios';
import { updateUI } from './updateUI';

export async function handleSubmit(event) {
	event.preventDefault();
	console.log('first')
	let city = document.getElementById('city').value;
	const {destination, image, app_max_temp, app_min_temp} = await getData(city);
	updateUI(destination,image,app_max_temp,app_min_temp);
}

export async function getData(city) {
	const { data: location } = await axios.get('http://localhost:3000/location', { params: { city } });
	const { data: weather } = await axios.get('http://localhost:3000/weather', { params: location });
	const { data: images } = await axios.get('http://localhost:3000/image', { params: { city } });

	const { app_max_temp, app_min_temp } = weather.data[0];
	const destination = weather.city_name + ', ' + weather.country_code;
	const image = images.hits[0].largeImageURL;

	return {destination, image, app_max_temp, app_min_temp}
}
