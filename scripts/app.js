const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');
const weather = new Weather();


if (localStorage.getItem('city')) {
    weather.updateCity(localStorage.getItem('city'))
        .then(data => updateUI(data))
        .catch(err => console.log(`We have error: ${err.message}`));
}

const updateUI = data => {

    const { cityDetails, weather } = data;

    // update details template
    details.innerHTML = `
    <h5 class="my-3">${cityDetails.EnglishName}</h5>
    <div class="my-3">${weather.WeatherText}</div>
    <div class="display-4 my-4">
        <span>${weather.Temperature.Metric.Value}</span>
        <span>&deg;C</span>
    </div>
    `;

    // update the night/day & icon images
    const iconSrc = `./img/icons/${weather.WeatherIcon}.svg`;
    icon.setAttribute('src', iconSrc);

    let timeSrc = (weather.IsDayTime) ? './img/day_image.svg' : './img/night_image.svg';

    time.setAttribute('src', timeSrc);

    // remove the d-none class
    if (card.classList.contains('d-none')) {
        card.classList.remove('d-none');
    }

};

cityForm.addEventListener('submit', e => {
    // prevent default action
    e.preventDefault();

    // get city value
    const city = cityForm.city.value.trim();
    cityForm.reset();

    // update the ui with new city
    weather.updateCity(city)
        .then(data => updateUI(data))
        .catch(err => errorBox(err.message));

    // set local storage
    localStorage.setItem('city', city);

});

// error box
const box = document.createElement('div');
box.classList.add('boxErr');
document.body.appendChild(box);

const errorBox = (err) => {
    box.innerHTML = (err == 'Failed to fetch') ? `Message: No connection<br>Please turn on your VPN!` : `Message: Not found!<br>Please try again`;
    box.classList.add('active');
    setTimeout(() => {
        box.classList.remove('active');
    }, 8000);
};
