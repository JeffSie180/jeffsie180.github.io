(function () {
  var week = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

  function zeroPadding(num, digit) {
    var zero = '';
    for (var i = 0; i < digit; i++) zero += '0';
    return (zero + num).slice(-digit);
  }

  function updateTime() {
    var cd = new Date();
    var timeStr = zeroPadding(cd.getHours(), 2) + ':' + zeroPadding(cd.getMinutes(), 2) + ':' + zeroPadding(cd.getSeconds(), 2);
    var dateStr = zeroPadding(cd.getFullYear(), 4) + '-' + zeroPadding(cd.getMonth() + 1, 2) + '-' + zeroPadding(cd.getDate(), 2) + ' ' + week[cd.getDay()];
    var ampm = cd.getHours() >= 12 ? ' PM' : ' AM';

    var timeDom = document.getElementById('card-clock-time');
    var dateDom = document.getElementById('card-clock-clockdate');
    var ampmDom = document.getElementById('card-clock-dackorlight');
    if (timeDom) timeDom.innerHTML = timeStr;
    if (dateDom) dateDom.innerHTML = dateStr;
    if (ampmDom) ampmDom.innerHTML = ampm;
  }

  function initClock(weatherHtml) {
    var clockBox = document.getElementById('hexo_electric_clock');
    if (!clockBox) return;

    clockBox.innerHTML =
      '<div class="clock-row">' +
        '<span id="card-clock-clockdate" class="card-clock-clockdate"></span>' +
        weatherHtml +
      '</div>' +
      '<div class="clock-row"><span id="card-clock-time" class="card-clock-time"></span></div>' +
      '<div class="clock-row">' +
        '<span id="card-clock-dackorlight" class="card-clock-dackorlight"></span>' +
      '</div>';

    updateTime();
    setInterval(updateTime, 1000);
  }

  function loadWeather() {
    var ip = '';
    try {
      if (typeof returnCitySN !== 'undefined' && returnCitySN.cip) {
        ip = returnCitySN.cip;
      }
    } catch (e) {}

    if (!ip) {
      initClock('');
      return;
    }

    fetch('https://wttr.in/' + ip + '?format="%l+\\+%c+\\+%t+\\+%h"')
      .then(function (res) { return res.text(); })
      .then(function (data) {
        var res_text = data.replace(/"/g, '').replace(/\+/g, '').replace(/,/g, '\\').replace(/ /g, '').replace(/°C/g, '');
        var res_list = res_text.split('\\');
        var weatherHtml = '<span class="card-clock-weather">' + (res_list[2] || '') + ' ' + (res_list[3] || '') + ' °C</span>' +
          '<span class="card-clock-humidity">💧 ' + (res_list[4] || '') + '</span>';
        initClock(weatherHtml);
      })
      .catch(function () {
        initClock('');
      });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadWeather);
  } else {
    loadWeather();
  }
})();
