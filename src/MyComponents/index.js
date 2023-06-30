import React, { useState } from "react";
import './mysearch.css'

// доступ к API сервиса погоды
const api = {
  key: 'bd5e378503939ddaee76f12ad7a97608',
  base: 'http://api.openweathermap.org/data/2.5/'
}
        

/*Отображение даты*/ 
function fDate(d) {
  {
    let days = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
    let months = ['01.', '02.', '03.', '04.', '05.', '06.', '07.', '08.', '09.', '10.', '11.', '12.'];

    let day = days[d.getDay()];
    let date = d.getDate() + '.';
    let month = months[d.getMonth()];
    let year = d.getFullYear();
    let hours = d.getHours();
    let minutes = d.getMinutes();

    return `${day} ${date}${month}${year}, ${hours}:${minutes}`
  }
}

function MySearchItog() {
  
  const [town, setTown] = useState('');
  const [weather, setWeather] = useState({});

  /*componentSearch = () => {
    if (evt.key === 'Enter') 
    {
      fetch(`${api.base}weather?q=${town}&lang=ru&units=metric&appid=${api.key}`) // стучимся на сайт
        .then(res => res.json())  // ответ преобразуем в json
        .then(data => {
          const dailyData = data.list.filter(reading => reading.dt_txt.includes("18:00:00"))
          this.setState({days: dailyData})
        })
    }*/


  // обработчик, который срабатывает когда нажата клавиша Enter
  const search = evt => {
    if (evt.key === 'Enter') {
      fetch(`${api.base}weather?q=${town}&lang=ru&units=metric&appid=${api.key}`) // стучимся на сайт
        .then(res => res.json())  // ответ преобразуем в json
        .then(result => {         // результат
          setWeather(result);
          setTown('');
        });
    }
  };

  return (
    <div className={'app'}>
      <main>
        <div className = {'searchbox'}> 
          <input
            type='text'
            className='search-bar'
            placeholder='Введите город и нажмите Enter...'
            onChange={e => setTown(e.target.value)}
            value={town}
            onKeyPress={search}
          />
        </div>  
        {(typeof weather.main != 'undefined') ? (
          <div>
            <div className = {'location-box'}>
             <div className = 'location'> {weather.name}, {weather.sys.country} </div>
             <div className = 'date'> {'Сегодня: ' + fDate(new Date())} </div>
           </div>
            <div className='weather-box'>
              <div className='temp'>
                {Math.round(weather.main.temp)}{'\u00b0'}c / {Math.round(weather.main.temp*1.8+32)}F
              </div>
              <div className='weather'>{weather.weather[0].main}</div>
            </div>
          </div>
        ) : ('')}
      {(typeof weather.main != 'undefined') ? (
          <div>
            <div className = 'date'> {fDate(new Date())} </div>
           <div className='weather-box'>
              <div className='temp2'>
                {Math.round(weather.main.temp)}{'\u00b0'}c / {Math.round(weather.main.temp*1.8+32)}F
              </div>
              <div className='weather2'>{weather.weather[0].main} 'это неудачная попытка выгрузить следующий день'</div>
            </div>
          </div>
        ) : ('')}

      </main>
    </div>
    )
  }



export default MySearchItog;