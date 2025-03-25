// Select the form, input, and weather section elements
const form = document.querySelector('form');
const weatherSection = document.querySelector('#weather');
const inputField = document.querySelector('input[name="search"]');

form.addEventListener('submit', (event) => {
    event.preventDefault();
    
    const location = inputField.value;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=be6ccdb952d3f470cf48e6994f68c6e7`;
    
    inputField.value = ''; // Reset input field value
    weatherSection.innerHTML = ''; // Reset weather section content
    weatherSection.style.display = 'none'; // Reset display property

  

  fetch(url)
  .then(response => response.json())
  .then(data => {
  if (data.cod === "404") {
  const weatherHTML = `<h2>Location not found</h2>`;
  weatherSection.innerHTML = weatherHTML;
  weatherSection.style.display = 'block';
  } else {
    const lat = data.coord.lat;
    const lon = data.coord.lon;
    const weatherHTML = `
      <h2>${data.name}, ${data.sys.country}</h2>
      <a href="https://www.google.com/maps/search/?api=1&query=${lat},${lon}" target="_blank">Click to view map</a>
      <img style="display: block; margin: 0 auto;" src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png">
      <p style="text-transform: capitalize;">${data.weather[0].description}</p>
      <br>
      <p>Current: ${data.main.temp}°F</p>
      <p>Feels like: ${data.main.feels_like}°F</p>
      <br>
      <p>Last updated: ${new Date(data.dt * 1000).toLocaleTimeString()}</p>
    `;
    weatherSection.innerHTML = weatherHTML;
    weatherSection.style.display = 'block';
  }})
  .catch(error => console.error('Error:', error));
});