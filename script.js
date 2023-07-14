const selectOption = document.querySelectorAll("select");
const setAlarmbtn = document.querySelector("#btn");
const timerBox = document.querySelector("#time"),
ctime = document.querySelector("#ctime");

let alarmRingTime;
let ringTone = new Audio("./Alarm 2.mp3");

let isAlarmSet = false;

// set hours in alarm clock in 12 hours format
for(let i=12; i>0; i--){
    i = i<10? "0" +i : i;
    let option =  `<option value="${i}">${i}</option>`;

    selectOption[0].firstElementChild.insertAdjacentHTML("afterend", option);
}
// set minutes in alarm clock 
for(let i=59; i>0; i--){
    i = i<10? "0" +i : i;
    let option =  `<option value="${i}">${i}</option>`;

    selectOption[1].firstElementChild.insertAdjacentHTML("afterend", option);
}
// set time zone in alarm clock
for(let i=2; i>0; i--){
    let zone = i==1? "AM" : "PM";
    let option =  `<option value="${zone}">${zone}</option>`;

    selectOption[2].firstElementChild.insertAdjacentHTML("afterend", option);
}


//function to set the current time in alarm clock
setInterval(function(){

     const time = document.querySelector("#ctime");
    let d = new Date();

    let hour = d.getHours();
    let minute = d.getMinutes();
    let second = d.getSeconds();

    let day = 'AM';
// to change AM to PM after 12 hrs
    if(hour>12){
        day = 'PM';
        hour = hour -12;
    }
    if(hour==0){
        hour = 12;
    }
//append zero in hour when hour is less than 10
    if(hour<10){
        hour = '0'+hour;
    }
//append zero in minute when minute is less than 59
    if(minute<10){
        minute = '0'+minute;
    }
//append zero in second when second is less than 59
    if(second<10){
        second = '0'+second;
    }

    time.textContent= hour +':'+minute +':'+second + " "+day;
//alarm rings when alarm time set become equal to the current time
    if (alarmRingTime == `${hour}:${minute} ${day}`){
        ringTone.play();
        ringTone.loop=true;
    }

},1000);

//function to set/clear alarm
function setAlarm() {
//to enable setting alarm after the alarm rings or past the alarm set time
    if(isAlarmSet){
        alarmRingTime = "";
        ringTone.pause();
        timerBox.classList.remove("greyed");
        setAlarmbtn.innerText= "Set Alarm";
       return isAlarmSet = false;
    }

    let alarmTime = `${selectOption[0].value}:${selectOption[1].value} ${selectOption[2].value}`;
//alerts user when the set time is invalid
    if( `${selectOption[0].value}`=="Hour" || `${selectOption[0].value}`=="Minute" || `${selectOption[0].value}`=="AM/PM" )
    {
       return alert('Please enter valid time');
    }
//to disable setting alarm while alarm is already set
    isAlarmSet = true;
    alarmRingTime=alarmTime;
    timerBox.classList.add("greyed");
    setAlarmbtn.innerText= "Clear Alarm";
}

setAlarmbtn.addEventListener("click", setAlarm);
