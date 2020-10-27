let currentDateTime = new Date();

let h4 = document.querySelector("h4");
console.log(currentDateTime);
let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let currentMonth = months[currentDateTime.getMonth()];
let currentYear = currentDateTime.getFullYear();
let currentDate = currentDateTime.getDate();

let days = [
  "Sunday",
  "Monday",
  "Tueday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let currentDay = days[currentDateTime.getDay()];
let currentHour = currentDateTime.getHours();
let currentMinute = currentDateTime.getMinutes();
//let currentSecond = currentDateTime.getSeconds();
//let currentMillisecond = currentDateTime.getMilliseconds();
document.querySelector(
  "#date-time"
).innerHTML = `${currentDay}, ${currentMonth} ${currentDate}, ${currentYear}<br /> ${currentHour}:${currentMinute} GMT`;

let btnc = document.querySelector("#tc");
btnc.addEventListener("click", tempftoc);
let btnf = document.querySelector("#tf");
btnf.addEventListener("click", tempctof);
let temperature = document.querySelector("#tempCF span");
let temperatureC = document.querySelector("#tempCF span:nth-child(2)");

function tempctof() {
  let temp = temperature.innerHTML;
  temp = Math.round(temp);
  temp = Math.round(temp * 1.8 + 32);
  temperature.innerHTML = temp;
  temperatureC.innerHTML = "°F";
  btnf.classList.add("active");
  btnc.classList.remove("active");
}

function tempftoc() {
  let temp = temperature.innerHTML;
  temp = Math.round(temp);
  temp = Math.round((temp - 32) / 1.8);
  temperature.innerHTML = temp;
  temperatureC.innerHTML = "°C";
  btnc.classList.add("active");
  btnf.classList.remove("active");
}
// console.log(temperature.innerHTML);
// console.log(temperatureC.innerHTML);
let city = "";


function showPosition(position) {
  //console.log(position);
  let latitude = position.coords.latitude;
  console.log(latitude);
  let longitude = position.coords.longitude;
  console.log(longitude);

  let apiKey = "82dadf9031c6bca3436ed3908ea2b7b5";
  let apiEndpoint2 = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl2 = `${apiEndpoint2}?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl2).then(showlocTemp);
}
function findloc(event){
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

document.querySelector("#cntloc").addEventListener("click", findloc);
function showlocTemp(response) {
  console.log(response);
  date = response.data.dt;
  cntw = response.data;
    let cntdt = new Date(date * 1000);
  console.log(cntdt.toUTCString());
   document.querySelector("h2").innerHTML = cntw.name;
  // let cntdate = cntdt.toUTCString().slice(0,16);
  // let cnttime =cntdt.toUTCString().slice(17,);
    document.querySelector("#date-time").innerHTML = `${days[cntdt.getDay()]}, ${months[cntdt.getMonth()]} ${cntdt.getDate()}, ${cntdt.getFullYear()}<br /> ${cntdt.getHours()}:${cntdt.getMinutes()} GMT`;
  // document.querySelector("#cntdate").innerHTML = cntdate;
  // document.querySelector("#cnttime").innerHTML = cnttime;

  document.querySelector("#current-temp").innerHTML = Math.round(cntw.main.temp);
  document.querySelector("#wtypeicon").src = `http://openweathermap.org/img/wn/${cntw.weather[0].icon}@2x.png`;

  document.querySelector("#wtype").innerHTML = cntw.weather[0].description;
  document.querySelector("#feelslike").innerHTML = Math.round(cntw.main.feels_like);

  // document.querySelector('#prcpt').innerHTML = Math.round(cntw.pop)
  document.querySelector('#humidity').innerHTML = Math.round(cntw.main.humidity);
  document.querySelector('#wind').innerHTML = Math.round(cntw.wind.speed);
}
function showCity(event) {
  event.preventDefault();
  city = document.querySelector("#search-engine").value;
  console.log(city);
  document.querySelector("h2").innerHTML = `${city}`;

  let apiKey = "82dadf9031c6bca3436ed3908ea2b7b5";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${apiEndpoint}?q=${city}&appid=${apiKey}&units=metric&precipitation=yes`;
  axios.get(apiUrl).then(showTemp);
  let apiEndpoint1 = "https://api.openweathermap.org/data/2.5/forecast";
  let apiUrl1 = `${apiEndpoint1}?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl1).then(showTemp1);
}


function showTemp(response) {
  console.log(response);
  date = response.data.dt;
  cntw = response.data;
    let cntdt = new Date(date * 1000);
  console.log(cntdt.toUTCString());
  // let cntdate = cntdt.toUTCString().slice(0,16);
  // let cnttime =cntdt.toUTCString().slice(17,);
    document.querySelector("#date-time").innerHTML = `${days[cntdt.getDay()]}, ${months[cntdt.getMonth()]} ${cntdt.getDate()}, ${cntdt.getFullYear()}<br /> ${cntdt.getHours()}:${cntdt.getMinutes()} GMT`;
  // document.querySelector("#cntdate").innerHTML = cntdate;
  // document.querySelector("#cnttime").innerHTML = cnttime;

  document.querySelector("#current-temp").innerHTML = Math.round(cntw.main.temp);
  document.querySelector("#wtypeicon").src = `http://openweathermap.org/img/wn/${cntw.weather[0].icon}@2x.png`;

  document.querySelector("#wtype").innerHTML = cntw.weather[0].description;
  document.querySelector("#feelslike").innerHTML = Math.round(cntw.main.feels_like);

  // document.querySelector('#prcpt').innerHTML = Math.round(cntw.pop)
  document.querySelector('#humidity').innerHTML = Math.round(cntw.main.humidity);
  document.querySelector('#wind').innerHTML = Math.round(cntw.wind.speed);
}

function showTemp1(response) {
  // console.log(response);
  console.log(response.data.list);

  pred1 = response.data.list[1]
  date1 = pred1.dt
  pred2 = response.data.list[9]
  date2 = pred2.dt
  pred3 = response.data.list[17]
  date3 = pred3.dt
  pred4 = response.data.list[25]
  date4 = pred4.dt
  pred5 = response.data.list[33]
  date5 = pred5.dt
  // let temp = Math.round(response.data.);
  // console.log(temp);
  // console.log(cntdt.toUTCString());
  // let cntdate = cntdt.toUTCString().slice(0,16);
  // let cnttime =cntdt.toUTCString().slice(17,);
// console.log(cntdate);
// console.log(typeof(cntdate));
// console.log(cnttime);

  // pred1 logic
  let dt1 = new Date(date1 * 1000);
  document.querySelector("#pred1day").innerHTML = days[dt1.getDay()];
  document.querySelector("#pred1img").src =  `http://openweathermap.org/img/wn/${pred1.weather[0].icon}@2x.png`;
  document.querySelector("#pred1temp").innerHTML =  Math.round(pred1.main.temp);

//pred 2 logic
  let dt2 = new Date(date2 * 1000);
  document.querySelector("#pred2day").innerHTML = days[dt2.getDay()];
  document.querySelector("#pred2img").src =  `http://openweathermap.org/img/wn/${pred2.weather[0].icon}@2x.png`;
  document.querySelector("#pred2temp").innerHTML =  Math.round(pred2.main.temp);

//pred 3 logic
  let dt3 = new Date(date3 * 1000);
  document.querySelector("#pred3day").innerHTML = days[dt3.getDay()];
  document.querySelector("#pred3img").src =  `http://openweathermap.org/img/wn/${pred3.weather[0].icon}@2x.png`;
  document.querySelector("#pred3temp").innerHTML =  Math.round(pred3.main.temp);

  //pred 4 logic
  let dt4 = new Date(date4 * 1000);
  document.querySelector("#pred4day").innerHTML = days[dt4.getDay()];
  document.querySelector("#pred4img").src =  `http://openweathermap.org/img/wn/${pred4.weather[0].icon}@2x.png`;
  document.querySelector("#pred4temp").innerHTML =  Math.round(pred4.main.temp);

  //pred 5 logic
  let dt5 = new Date(date5 * 1000);
  document.querySelector("#pred5day").innerHTML = days[dt5.getDay()];
  document.querySelector("#pred5img").src =  `http://openweathermap.org/img/wn/${pred5.weather[0].icon}@2x.png`;
  document.querySelector("#pred5temp").innerHTML =  Math.round(pred5.main.temp);
}
document.querySelector(".searchlocation").addEventListener("submit", showCity);
