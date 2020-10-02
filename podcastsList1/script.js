const container = document.getElementById('container');
const canales = document.getElementById('canales');
const canalInfo = document.getElementById('canal-info')


getPodCasts();
async function getPodCasts(){
    const canalesResponse = await fetch('https://api.audioboom.com/channels/recommended');
    const podData = await canalesResponse.json();
    
    addDataToDOM(podData.body)
    
}

function addDataToDOM(data){
    data.forEach(element => {
        const podElemento = document.createElement('div');
        podElemento.id="audio-podcasts"
        podElemento.classList.add('audio-podcasts');
        
        podElemento.innerHTML=`
            <span id="${element.id}"></span>
            <img src="${element.urls.logo_image.original}" />
        `
        canales.appendChild(podElemento);

        podElemento.addEventListener('click',()=>{
            reproductor(element.id);
        })
        
    });//dataForEach

}

async function reproductor(idCanal){
    const audioClips = await fetch(`https://api.audioboom.com/channels/${idCanal}/audio_clips`)
    const audioData = await audioClips.json();
    
    const dataArray = audioData.body.audio_clips;
    
    dataArray.forEach((element,index) =>{
       console.log(element)
       canalInfo.classList.add('active');
       if(index==0){ 
           canalInfo.innerHTML=`
            <div class="logo">
                <img src="${element.urls.image===undefined? element.channel.urls.logo_image.original:element.urls.image}">
                <span>${element.title}</span>
            </div>
            <div class="playback">
                <button id="retroceder"><span class="glyphicon glyphicon-step-backward" ></span></button>
                <button onclick="play()" id="btnPlayPause">
                    <audio id="audio" src="${element.urls.high_mp3}"></audio>
               
                <button id="avanzar"><span class="glyphicon glyphicon-step-forward"></span></button>
            </div>
            <div class="volumen">
                <span class="glyphicon glyphicon-volume-off"></span><button id="avanzar">
            </div>
            
            `
            container.appendChild(canalInfo);
            
       }
    })
    
}


function play(){
    var btn_playPause = document.getElementById("btnPlayPause");
    var isPaused = audio.paused;
    audio[isPaused ? "play" : "pause"]();
    btn_playPause.style.backgroundPosition= "0 "+ (isPaused ? "-32px":"0px");
}
