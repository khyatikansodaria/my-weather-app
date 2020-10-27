let currentDateTime = new Date();

let h4 = document.querySelector("h4");

// Given target offset wrt UTC (in sec), returns target timestamp (in ms),
// where target is a specific city
function getTimestamp(targetTimestampInSec, targetOffsetInSec) {
  let now = new Date();
  if (targetTimestampInSec !== null) {
    now = new Date(targetTimestampInSec * 1000);
  }
  // now.getTimezoneOffset() returns local offset wrt UTC in minutes as UTC time - your local time
  let localOffsetInMs = now.getTimezoneOffset() * 60 * 1000;
  let targetOffsetInMs = targetOffsetInSec * 1000;
  let targetTimestamp = now.getTime() + localOffsetInMs + targetOffsetInMs;
  return targetTimestamp;
}

    
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


let btnc = document.querySelector("#tc");
btnc.addEventListener("click", tempftoc);
let btnf = document.querySelector("#tf");
btnf.addEventListener("click", tempctof);
let temp = document.querySelector("#tempCF span");
let tempu = document.querySelector("#tempCF span:nth-child(2)");
let tempf = document.querySelector("#feelslike");
let tempfu = document.querySelector("#feelslike + span");
let temp1 = document.querySelector("#pred1temp");
let temp1u = document.querySelector("#pred1temp + span");
let temp2 = document.querySelector("#pred2temp");
let temp2u = document.querySelector("#pred2temp + span");
let temp3 = document.querySelector("#pred3temp");
let temp3u = document.querySelector("#pred3temp + span");
let temp4 = document.querySelector("#pred4temp");
let temp4u = document.querySelector("#pred4temp + span");
let temp5 = document.querySelector("#pred5temp");
let temp5u = document.querySelector("#pred5temp + span");

function tempctof() {
  btnf.classList.add("disabled");
  btnf.disabled=true;
  btnc.classList.remove("disabled");
  btnc.disabled=false;
  function convert(t) { 
      let temp = t.innerHTML;
      temp = Math.round(temp);
      temp = Math.round(temp * 1.8 + 32);
      t.innerHTML = temp;
  }
    convert(temp);
    convert(tempf);
    convert(temp1);
    convert(temp2);
    convert(temp3);
    convert(temp4);
    convert(temp5);
  tempu.innerHTML = "°F";
  tempfu.innerHTML = "°F";
  temp1u.innerHTML = "°F";
  temp2u.innerHTML = "°F";
  temp3u.innerHTML = "°F";
  temp4u.innerHTML = "°F";
  temp5u.innerHTML = "°F";
}

function tempftoc() {
  btnc.classList.add("disabled");
  btnc.disabled=true;
  btnf.classList.remove("disabled");
  btnf.disabled=false;
  function convert(t){
    let temp = t.innerHTML;
    temp = Math.round(temp);
    temp = Math.round((temp - 32) / 1.8);
    t.innerHTML = temp;   
  }
    convert(temp);
    convert(tempf);
    convert(temp1);
    convert(temp2);
    convert(temp3);
    convert(temp4);
    convert(temp5);
  tempu.innerHTML = "°C";
  tempfu.innerHTML = "°C";
  temp1u.innerHTML = "°C";
  temp2u.innerHTML = "°C";
  temp3u.innerHTML = "°C";
  temp4u.innerHTML = "°C";
  temp5u.innerHTML = "°C";
}
// console.log(temperature.innerHTML);
// console.log(temperatureC.innerHTML);
let city = "";

// Greetings
function greet(timestamp) {
  let greetingElement = document.querySelector(".greet");
  let now = new Date(timestamp);
  let hours = now.getHours();
  if (hours >= 5 && hours < 12) {
    greetingElement.innerHTML = `Hello! Good Morning ${city}!`;
  } else if (hours >= 12 && hours < 18) {
    greetingElement.innerHTML = `Hello! Good Afternoon ${city}!`;
  } else if (hours >= 18 && hours < 22) {
    greetingElement.innerHTML = `Hello! Good Evening ${city}!`;
  } else {
    greetingElement.innerHTML = `Hello! Good Night ${city}!`;
  }
}

//Find lat and long
function findloc(event){
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

function showPosition(position) {
  //console.log(position);
  let latitude = position.coords.latitude;
  console.log(latitude);
  let longitude = position.coords.longitude;
  console.log(longitude);

  let apiKey = "82dadf9031c6bca3436ed3908ea2b7b5";
//call api for current weather
  let apiEndpoint2 = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl2 = `${apiEndpoint2}?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl2).then(showTemp);
//call api for forecast
  let apiEndpoint1 = "https://api.openweathermap.org/data/2.5/forecast";
  let apiUrl1 = `${apiEndpoint1}?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl1).then(showTemp1);
}

document.querySelector("#cntloc").addEventListener("click", findloc);
function showTemp(response) {
  console.log(response);
  date = response.data.dt;
  cntw = response.data;
  console.log(cntw.sys.country);

  document.querySelector("#city").innerHTML = cntw.name;
  document.querySelector("#country").innerHTML = cntw.sys.country;
  // let cntdate = cntdt.toUTCString().slice(0,16);
  // let cnttime =cntdt.toUTCString().slice(17,);
  let timestamp = getTimestamp(null, response.data.timezone);
  let now = new Date(timestamp);
  console.log(now);
  console.log(now.toLocaleString());
  let hours = now.getHours();
  let minutes = now.getMinutes();
  greet(timestamp);
    document.querySelector("#date-time").innerHTML = `${days[now.getDay()]}, ${months[now.getMonth()]} ${now.getDate()}, ${now.getFullYear()}<br/> ${now.getHours()}:${now.getMinutes()} GMT`;
 
  document.querySelector("#current-temp").innerHTML = Math.round(cntw.main.temp);
  document.querySelector("#wtypeicon").src = `http://openweathermap.org/img/wn/${cntw.weather[0].icon}@2x.png`;

  document.querySelector("#wtype").innerHTML = cntw.weather[0].description;
  document.querySelector("#feelslike").innerHTML = Math.round(cntw.main.feels_like);

  document.querySelector('#humidity').innerHTML = Math.round(cntw.main.humidity);
  document.querySelector('#wind').innerHTML = Math.round(cntw.wind.speed);
}
function showCity(event) {
  event.preventDefault();
  city = document.querySelector("#search-engine").value;
  console.log(city);

  let apiKey = "82dadf9031c6bca3436ed3908ea2b7b5";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${apiEndpoint}?q=${city}&appid=${apiKey}&units=metric&precipitation=yes`;
 axios.get(apiUrl).then(showTemp).catch(err => { alert(`The ${city} is not found Please check the city name and enter correct city name.`);});
  let apiEndpoint1 = "https://api.openweathermap.org/data/2.5/forecast";
  let apiUrl1 = `${apiEndpoint1}?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl1).then(showTemp1).catch(err => { console.log("No city found"); });

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

// error function if city doesn't exist
document.querySelector(".searchlocation").addEventListener("submit", showCity);
