console.log('This is java script file...');

const getWeatherInfoFromClient = (city) => {
    if (!city) 
        return console.log('client : Please enter the name of the city!')

    const url = '/weather?city=' + city;

    var messageone = document.querySelector('#msg-1');
    var messagetwo = document.querySelector('#msg-2');

    messageone.textContent = "Loading ...";
    messagetwo.textContent = "";

    fetch(url, {
        headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
        }
    }).then((response) => {

        response.json().then((data) =>{
            if (data.error){
                console.log("error : ", data.error);
                messageone.textContent = "client received error from server : " +  data.error.info;
                
            } else {
                messageone.textContent = "City: " + data.city;
                messagetwo.textContent = "Tempreture: " + data.tempreture;
                console.log(data);
            }
        })
}).catch((error) => {
    console.log("url error : " , error);
})

}

const weatherform = document.querySelector('form');
const input = document.querySelector('input');

weatherform.addEventListener('submit', (event)=>{
    event.preventDefault(); 

    const location = input.value;

    console.log('location:', location);

    getWeatherInfoFromClient(location);


})