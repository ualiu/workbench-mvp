let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

if (time >= '18:00:00' && time <= "23:59:00") {
  document.querySelector('#displayMessage').innerText = "Good evening "
}