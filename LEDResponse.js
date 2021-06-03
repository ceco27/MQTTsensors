var OutputTopic = "Output/ESP8266_Todor";
function mr1() {
  var httpRequestO;
	  //document.getElementById("responses").innerHTML = "";
      //var Topic = document.getElementById("topic").value;
	  //console.log(OutputTopic);
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
	  //document.getElementById("responses").innerHTML += response.Result.state + "<br>";
	  if(response.Result.state==1){
		document.getElementById("image").src = "bulbon.png";
	  }
	  else {
		document.getElementById("image").src = "bulboff.png";
	  }
	  mr1();
	  //ReturnResult(response.Result.state);
    } else {
		if(httpRequestO.status != 200)
      alert('There was a problem with the request.');
    }
	
  }
  
}

