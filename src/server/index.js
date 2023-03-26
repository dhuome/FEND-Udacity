const express = require('express');
const axios = require('axios');
const { z } = require('zod');
const cors = require('cors');
const { validateCity } = require('./validator')

require('dotenv').config();

const port = 3000;
const app = express();
app.use(express.static('dist'));
app.use(express.json());
app.use(cors());



app.get('/location', async (req, res) => {
  const validated = validateCity(req.query);

  if (!validated.success) {
    return res.status(400).json(validated.error.issues);
  }
  const { data } = await axios.get(`http://api.geonames.org/searchJSON?q=${validated.data.city}&maxRows=1&username=${process.env.GEOCODES_NAME}`);


  const { lng, lat } = data.geonames[0];

  res.status(200).json({ lat, lng });

});

app.get('/weather', async (req, res) => {

  const schema = z.object({
    lat: z.coerce.number(),
    lng: z.coerce.number()
  });
  const validated = schema.safeParse(req.query);

  if (!validated.success) {
    return res.status(400).json(validated.error.issues);
  }

  const { data } = await axios.get(`https://api.weatherbit.io/v2.0/forecast/daily?lat=${validated.data.lat}&lon=${validated.data.lng}&key=${process.env.WEATHERBIT_KEY}`)

  res.status(200).json(data);

});


app.get('/image', async (req, res) => {

  const validated = validateCity(req.query);


  if (!validated.success) {
    return res.status(400).json(validated.error.issues);
  }

  const { data } = await axios.get(`https://pixabay.com/api/?key=${process.env.PIXABAY_KEY}&q=${validated.data.city}&image_type=photo`);

  res.status(200).json(data);

});

app.listen(port, () => console.log(`server is running on port ${port}`));