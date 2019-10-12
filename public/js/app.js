console.log('Client side JS');


const weather = document.querySelector('form');
const address = document.querySelector('input');

const message_1 = document.querySelector('#message-1');
const message_2 = document.querySelector('#message-2');

weather.addEventListener('submit', ( event) =>{
    event.preventDefault();

    const tempAdd = address.value;

    if(!tempAdd){
        return message_1.textContent = "Please enter the location";
    }

    fetch(`http://localhost:3000/weather?address=${tempAdd}`).then((response) =>{
        response.json().then((data) =>{

            if(data.error){
               message_1.textContent = data.error;
               message_2.textContent = "";
               return ;
            }
            message_1.textContent = data.location;
            message_2.textContent = data.forcast;
        });
})
});