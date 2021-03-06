$(function() {
	
});

function soundNotifOptions() {
	if(!localStorage['sndDM']) localStorage['sndDM'] = false;
	if(!localStorage['sndMention']) localStorage['sndMention'] = false;
	$('#notifyForm select').each(function(){
		this.value = localStorage[this.id];
	});

	var player = $('#player');
	player[0].pause();
	$('#player').empty();


	$('form#notifyForm').on('change','select',function(){
		localStorage.setItem(this.id, this.value);

		if(this.value == false) {player[0].pause(); return;}
		if (player[0].canPlayType('audio/mpeg;')) {
		    player.attr('type', 'audio/mpeg');
		    player.attr('src', 'sound/'+this.value+'.mp3');
			} else {
		    player.attr('type', 'audio/ogg');
		    player.attr('src', 'sound/'+this.value+'.ogg');
		}
		
	player[0].play();
	});
}

function volumeControl () {
	var playerVol = $('#playerVol');
	playerVol[0].value = localStorage[playerVol[0].id] ? localStorage[playerVol[0].id] : 100;
	$('.volValue').text((localStorage[playerVol[0].id] * 100).toFixed());
	
	playerVol.on('change',function(){
		localStorage.setItem(this.id, this.value);
		$('#player')[0].volume = (this.value);
		$('.volValue').text((this.value * 100).toFixed());
	});
}

function DMsNotif() {
	if(localStorage['sndDM'] == "false") return;
	var player = $('#player');
	$('#player').empty();

	if (player[0].canPlayType('audio/mpeg;')) {
		    player.attr('type', 'audio/mpeg');
		    player.attr('src', 'sound/'+localStorage['sndDM']+'.mp3');
			} else {
		    player.attr('type', 'audio/ogg');
		    player.attr('src', 'sound/'+localStorage['sndDM']+'.ogg');
		}
	player[0].volume = localStorage['playerVol'];
	player[0].play();
}

function mensNotif() {
	if(localStorage['sndMention'] == "false") return;
	var player = $('#player');
	$('#playerSec').empty();

	if (player[0].canPlayType('audio/mpeg;')) {
		    player.attr('type', 'audio/mpeg');
		    player.attr('src', 'sound/'+localStorage['sndMention']+'.mp3');
			} else {
		    player.attr('type', 'audio/ogg');
		    player.attr('src', 'sound/'+localStorage['sndMention']+'.ogg');
		}
	player[0].volume = localStorage['playerVol'];
	player[0].play();
};

function keysSend() {
	if(!localStorage['keysSend']) localStorage['keysSend'] = 1;
	$('#keysOpt select')[0].value = localStorage['keysSend'];
	
	$('#keysOpt select').on('change', function(){
		localStorage[this.id] = this.value;
	
	})
}

function setLang() {

	$('#language').val(localStorage['locLang'] || 'auto')
	$('#language').on('change', function(){
		localStorage['locLang'] = $(this).val();
	})
}

function setTheme() {
	if(!localStorage['theme']) localStorage['theme'] = 'calm';
	$('#theme').val(localStorage['theme']).on('change', function(){
		localStorage['theme'] = $(this).val();
		location.reload();
	});

}

function InitOptions () {
	soundNotifOptions();
	volumeControl();
	keysSend();
	setLang();
	setTheme();
}