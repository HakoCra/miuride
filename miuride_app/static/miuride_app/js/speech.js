speechFlag = true;
if (!'SpeechSynthesisUtterance' in window) {
	alert('Web Speech API には未対応です。');
	speechFlag = false;
}

var speecher = new webkitSpeechRecognition();

speecher.addEventListener('result', function(e) {
	var text = e.results[0][0].transcript;
	console.log(text);
});


function tweet() {
	var tweetMsg = document.getElementById('tweetMsg');
	if(tweetMsg.value !== "") {
		socketio.emit("chat", {value:tweetMsg.value, lat:lat, lng:lng});
		tweetMsg.value = "";
	} else {
		speecher.lang = "ja";
		speecher.start();
	}
}


function addTweet(chat) {
	if(speechFlag) {
		var msg = new SpeechSynthesisUtterance();
    msg.volume = 1;
    msg.rate = 1;
    msg.pitch = 2;
		var regex = /<(.|\n)*?>/ig;
		msg.text = chat.replace(regex, "");
    msg.lang = 'ja-JP'; // en-US or ja-UP
		speechSynthesis.speak(msg);
	}

	/*
	var tweetArea = document.getElementById('tweetArea');
	var tweet = document.createElement('p');
	tweet.innerHTML = chat;
	tweetArea.appendChild(tweet);
	*/

}

addTweet('こんばんはー');
