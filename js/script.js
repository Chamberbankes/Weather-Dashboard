const API = 'dff0a27cd396b222aa3381e956b1f9f4';
const searchInput = document.getElementById("searchInput")
const searchButton = document.getElementById("searchButton");
const storedCities = JSON.parse(localStorage.getItem('cities')) || [];
const container = document.getElementById('container');
const btnContainer = document.getElementById('buttons');

function getData(){
const city = searchInput.value.trim();
const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API}`;
console.log(apiUrl);
fetch(apiUrl)
.then(function(response) {
return response.json();
})
.then(function(data) {
renderCurrentWeather(city, data);
storeSearchHistory(city);
})
.catch(function(error) {
console.error(error);
});
}

function renderCurrentWeather(city, weather){
const temp = weather.list[0].main.temp;
const wind = weather.list[0].wind.speed;
const humid = weather.list[0].main.humidity;
const icon = weather.list[0].weather[0].icon;
const iconUrl = `https://openweathermap.org/img/wn/${icon}.png`;
const tempH2 = document.createElement('h2');
tempH2.textContent = `Temperature: ${temp} K`;
const windH2 = document.createElement('h2');
windH2.textContent = `Wind Speed: ${wind} m/s`;
const humidH2 = document.createElement('h2');
humidH2.textContent = `Humidity: ${humid}%`;
const iconImg = document.createElement('img');
iconImg.setAttribute('src', iconUrl);
container.innerHTML = ''; 
container.append(iconImg, tempH2, windH2, humidH2);
createHistoryButton();
}


function storeSearchHistory(city){
storedCities.push(city);
localStorage.setItem('cities', JSON.stringify(storedCities));
}

function createHistoryButton(){
const thisStoredCity = JSON.parse(localStorage.getItem('cities'));
if (thisStoredCity) {
for (let i = 0; i < thisStoredCity.length; i++) {
const newButton = document.createElement('button');
newButton.classList.add('historybtn')
newButton.textContent = thisStoredCity[i];
btnContainer.append(newButton);
}}
}

function handleSearchHistory(e){
if (!e.target.matches('.historybtn')) {
return;
}
const target = e.target;
const cityName = target.textContent;
getData(cityName);
}

createHistoryButton();
btnContainer.addEventListener('click', handleSearchHistory);
searchButton.addEventListener('click', getData);
