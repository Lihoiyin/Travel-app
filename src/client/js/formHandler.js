import { placeBuilder } from "./placeBuilder";
import { dateBuilder } from "./dateBuilder";

//global variable
const place = document.getElementById('place');
const day = document.getElementById('day');
const month = document.getElementById('month');
const year = document.getElementById('year');
const imageOutput = document.getElementById('image-output');
const placeOutput = document.getElementById('place-output');
const dateOutput = document.getElementById('date-output');
const weatherOutput = document.getElementById('weather-output');
const highTempOutput = document.getElementById('high-temp-output');
const lowTempOutput = document.getElementById('low-temp-output');



function handleSubmit(event) {
    event.preventDefault()
        console.log("::: Form Submitted :::");
        const myDate = dateBuilder(year.value, month.value, day.value);
        if (myDate <= 0){
            alert('enter a date after or today');
        }
        else if (myDate > 15){
            alert('We can just provide the expect weather maxium 15days after');
        }
        else{
            postData({myPlace: placeBuilder(place.value),
                daysAfterToday:myDate})
                //update ui
            .then((newData)=>{
                placeOutput.innerHTML = place.value;
                dateOutput.innerHTML = `${day.value} / ${month.value} / ${year.value}`;
                weatherOutput.innerHTML = newData.weather;
                highTempOutput.innerHTML = newData.highestTemp;
                lowTempOutput.innerHTML = newData.lowestTemp;
                imageOutput.setAttribute('src', newData.cityImage);
                console.log(newData.cityImage);         
        })
        }
            
    }
function handleRemove(e) {
    e.preventDefault();
    placeOutput.innerHTML = " ";
    dateOutput.innerHTML = " ";
    weatherOutput.innerHTML = " ";
    highTempOutput.innerHTML = " ";
    lowTempOutput.innerHTML = " ";
    imageOutput.setAttribute('src', "https://cdn.businesstraveller.com/wp-content/uploads/fly-images/989642/Aeroflot-916x516.jpg");

}




//post data to server
const postData = async(data = {}) => {
    const serverRes = await fetch('http://localhost:8000/addData', {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            myPlace: data.myPlace,
            daysAfterToday: data.daysAfterToday.toString()
        })
    });
    try {
        const newData = await serverRes.json();
        console.log(newData);
        return newData;
    } catch (error) {
        console.log(error);
    }
}



export { handleSubmit,handleRemove }




