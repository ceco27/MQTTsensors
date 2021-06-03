var InputTopic1 = "Input/ESP8266_Todor";
var InputTopic2 = "Input/ESP32_Todor";
var state = 1;
function turnon() {
	state = 1;
	mr2("{\"Set\":\"@GreenLed\", \"V\":{\"state\": true}}", InputTopic1);
}
function turnoff() {
	state = 0;
	mr2("{\"Set\":\"@GreenLed\", \"V\":{\"state\": false}}", InputTopic1);
}
function check() {
	setTimeout(tempcheck, 1000);
	setInterval(tempcheck, 30000);
}
function tempcheck() {
	mr2("{\"Get\":\"@BME280_I2C\", \"V\":[\"tempC\"]}", InputTopic2);
}
function change() {
	if(state == -1){
		check();
	}
	else {
		if(state == 0) {
			turnon();
		}
		else {
			turnoff();
		}
	}
	//mr1();
}
function mr2(Message, Topic) {
  var httpRequestI;
      //var Topic = document.getElementById("itopic").value;
      //var oTopic = document.getElementById("otopic").value;
	  //var Message = document.getElementById("message").value;
	  //makeRequestO('http://localhost/subscribe1.php',oTopic);
	  console.log(Topic);
      makeRequestI('publish1.php',Topic, Message); 
  }
  function makeRequestI(url, topic, message) {
    httpRequestI = new XMLHttpRequest();

    if (!httpRequestI) {
      alert('Giving up :( Cannot create an XMLHTTP instance');
      return false;
    }
    httpRequestI.onreadystatechange = alertContents;
	httpRequestI.onerror = function () {
	console.log("** An error occurred during the transaction");
	};
    httpRequestI.open('POST', url, true);
    httpRequestI.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	//console.log(message);
	var res = "t=" + topic + "#m=" + message;
    httpRequestI.send(res);
  }

  function alertContents() {
  if (httpRequestI.readyState === XMLHttpRequest.DONE) {
    if (httpRequestI.status === 200) {
		console.log(httpRequestI.responseText);
      //var response = JSON.parse(httpRequestI.responseText);
	  //document.getElementById("responses").innerHTML += response + "<br>";
    } else {
      alert('There was a problem with the request.');
    }
	//mr1();
  }
  
}
