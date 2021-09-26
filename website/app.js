const ENDPOINT = 'http://api.openweathermap.org/data/2.5/weather';
const API_KEY = 'f5a935940637eb238d07594832d2a11c';
const COUNTRY = 'us';
const HOST = 'http://127.0.0.1:8080';

document.getElementById('generate').addEventListener('click', e => {
  const zip = document.getElementById('zip').value;
  const feelings = document.getElementById('feelings').value;
  fetchWeather(zip, feelings);
});

const fetchWeather = async (zip, feelings) => {
    try{
      const res = await fetch(`${ENDPOINT}?appid=${API_KEY}&zip=${zip}&units=metric`);
      data = await res.json();
      console.log(data)
    } catch (err) {
      console.log(err)
    }

    const date = new Date();
    const newDate = date.toDateString();

    const {
      main: {temp},
      name: city,
      weather: [{description}]
    } = data;

    const finalData = {
      newDate,
      city,
      temp: Math.round(temp),
      description,
      feelings
    };
    
    postData(`${HOST}/add`, finalData);
    
    populateUI();
    
}

const postData = async (url = '', data = {}) => {
  const res = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  try{
    const processedData = await res.json();
    return processedData;
  } catch (err) {
    console.log(err)
  }
}

const populateUI = async () => {
  const res = await fetch(`${HOST}/all`);
  data = await res.json();
  console.log(data);
  document.getElementById('date').innerHTML = data.newDate;
  document.getElementById('temp').innerHTML = data.temp;
  document.getElementById('content').innerHTML = data.feelings;
}