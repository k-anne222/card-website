 // Access the audio element
 const audio = document.getElementById('bg-audio');
 const volumeControl = document.getElementById('bg-volume');

 // Set initial volume to 50%
 audio.volume = volumeControl.value / 100;

 // Play audio after user clicks anywhere on the page
 document.body.addEventListener('click', function() {
     audio.play();
 }, { once: true }); // Ensure it only happens once

 // Set volume based on the range input value
 volumeControl.addEventListener('input', function() {
     audio.volume = this.value / 100;
 });

 function openSetting() {
     document.getElementById('setting-window').style.display = 'block';
 }

 function closeSetting() {
     document.getElementById('setting-window').style.display = 'none';
 }