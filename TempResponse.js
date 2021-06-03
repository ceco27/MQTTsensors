var OutputTopic = "Output/ESP32_Todor";
function mr1() {
  var httpRequestO;
	  //document.getElementById("responses").innerHTML = "";
      //var Topic = document.getElementById("topic").value;
	  console.log(OutputTopic);
      makeRequestO('subscribe1.php',OutputTopic);
	  }

  function makeRequestO(url, Topic) {
    httpRequestO = new XMLHttpRequest();

    if (!httpRequestO) {
      alert('Giving up :( Cannot create an XMLHTTP instance');
      return false;
    }
    httpRequestO.onreadystatechange = alertContents;
	httpRequestO.onerror = function () {
	console.log("** An error occurred during the transaction");
	};
    httpRequestO.open('POST', url, true);
    httpRequestO.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    httpRequestO.send('Topic=' + Topic);
	
  }

  function alertContents() {
  if (httpRequestO.readyState === XMLHttpRequest.DONE) {
    if (httpRequestO.status === 200 && httpRequestO.responseText[0] != "<") {
		console.log(httpRequestO.responseText);
      var response = JSON.parse(httpRequestO.responseText);
	  //document.getElementById("temp").innerHTML = response.Result.tempC + " &deg;C";
	  document.getElementById("responses").innerHTML = response.Result.tempC + " &deg;C";
	  $(".tempGauge0").tempGauge({width:260, borderWidth:2, showLabel:true, showScale : true, defaultTemp: response.Result.tempC});
	  /*if(response.Result.state==1){
		document.getElementById("image").src = "bulbon.png";
	  }
	  else {
		document.getElementById("image").src = "bulboff.png";
	  }*/
	  //ReturnResult(response.Result.state);
	  mr1();
    } else {
		if(httpRequestO.status != 200)
      alert('There was a problem with the request.');
    }
	
  }
  
}

