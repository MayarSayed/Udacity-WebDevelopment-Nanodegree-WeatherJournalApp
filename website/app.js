/* Global Variables */
const apiURL = 'https://api.openweathermap.org/data/2.5/weather';

const apiKey = '20006f9b361857a820f37faad31bfa36';

const inputZipCode  = document.getElementById("zip");

const inputFeeling  = document.getElementById("feelings");

const generateBtn   = document.getElementById("generate");

const outputDate    = document.getElementById("date");

const outputTemp    = document.getElementById("temp");

const outputFeeling = document.getElementById("content");
// Create a new date instance dynamically with JS
let d = new Date();
let newDate =  d.getDate()+'.'+ d.getMonth()+1 +'.'+ d.getFullYear();


/* Function to GET Web API Data*/
const getData = async () => {
	const request = await fetch(apiURL+`?zip=${inputZipCode.value}&appid=${apiKey}&units=metric`);
	console.log("the zip code = ");
	console.log(inputZipCode.value);
	try {
    const data = await request.json();
    console.log("the data from getData function : ");
    console.log(data);
    return data;
  	}  catch(error) {
    	console.log("error", error);
  		}
};
/* Function to POST data */
const postData = async ( url = '', data = {})=>{
    const response = await fetch(url, {
      method: 'POST', 
      credentials: 'same-origin',
      headers: {
          'Content-Type': 'application/json',
      },
     // convert body to JSON       
      body: JSON.stringify(data), 
    });

      try {
        return ;
      }catch(error) {
      console.log("error", error);
      }
  };

/* Function to GET Project Data and update the UI with given data*/
const updateUI = async () => {
	console.log("updateUI calleeed");
	const request = await fetch('/showData');
	try {
    const data = await request.json();
    console.log("update data in UI : ");
    console.log(data);
    outputDate.innerHTML = "Today's date : "+data.date;
    outputTemp.innerHTML = "Temperature : "+data.temp;
    outputFeeling.innerHTML = "Your Feeling : " +data.feeling
    //console.log(data);
    return ;
  	}  catch(error) {
    	console.log("error", error);
  		}
};

generateBtn.addEventListener('click',clickAction);

/* Function called by event listener */
function clickAction(){
	if(inputZipCode.value === ""){
		alert('Please enter a zip code');
	}
	else{
		getData().then((data)=> postData("/addData",{temp:data.main.temp,date:newDate,feeling:inputFeeling.value})).then(() => updateUI());
	}
}





