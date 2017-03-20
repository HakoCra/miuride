speechFlag = true;
if (!'SpeechSynthesisUtterance' in window) {
	alert('Web Speech API には未対応です。');
	speechFlag = false;
}

var speecher = new webkitSpeechRecognition();

speecher.addEventListener('result', function(e) {
	var text = e.results[0][0].transcript;
	addTweet(text);
});

function tweet() {
		speecher.start();
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
