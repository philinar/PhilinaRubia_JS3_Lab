let inputElement = document.getElementById('city'); // storing the input element

// adding listener for enter key
inputElement.addEventListener("keypress", (e) => {
    if (e.keyCode == 13) {
        getWeatherData(e.target.value);
    }
})

// fetching the api data
function getWeatherData(val) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${val}&units=metric&appid=7e3f21edee540e6110af347b55eb1ab2`)
        .then(res => res.json())
        .then(res => {
            console.log(res);
            showData(res);
        })
        // condition to show an error if input left blank or entered city is invalid
        .catch(err => alert('Please Enter A Valid City Name'))
}

//  displaying the data
function showData(res) {
    let city = document.querySelector('.city-name')
    city.innerText = `${res.name}, ${res.sys.country}`
    showDate();

    let temp = document.querySelector('.temp')
    temp.innerHTML = `${Math.round(res.main.temp)}` + '&#x2103;'

    let weather = document.querySelector('.weather')
    weather.innerText = `${res.weather[0].main}`

    let highLow = document.querySelector('.high-low-temp')
    highLow.innerHTML = `${Math.round(res.main.temp_min)}/${Math.round(res.main.temp_max)}` + '&#x2103;'
}

// storing the date and month
function showDate() {
    let date = new Date()
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

    let dateElement = document.querySelector('.city-date');
    dateElement.innerText = `${days[date.getDay()]} ${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`
}