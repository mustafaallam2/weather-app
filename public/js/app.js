

const weatherForm =document.querySelector('form');
const messageOne  =document.querySelector('#message-1');
const messageTow = document.querySelector('#message-2');
const searchTerm=document.querySelector('input');

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    messageOne.textContent='loading...';
    messageTow.textContent='';
    
  fetch('http://localhost:3000/weather?address=' + searchTerm.value).then((response) => {
      response.json().then((data) => {
          if (data.error) {
              messageOne.textContent = '';
              messageTow.textContent=data.error;
               
          } else {
               messageOne.textContent = '';
               messageTow.textContent = data.weather_data.summary + " temperature " + data.weather_data.temperature;
          }
      })
  });
})