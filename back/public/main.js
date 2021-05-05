var url_string = window.location.href;
var url = new URL(url_string);
var sujet = url.searchParams.get("sujet");
const nom = url.searchParams.get("nom");
var duree = url.searchParams.get("duree");
var id = url.searchParams.get("id");

document.getElementById("sujet").innerText = sujet;

/*
document.getElementById('backbutton').addEventListener('click', function () {
    window.location = document.referrer + '?index=1';
}, false); */


const chatInputBox = document.getElementById("chat_message");

const list = document.getElementById("list");
list.style.display = "none";




const socket = io('/')
const videoGrid = document.getElementById('videoGrid')
const myVideo = document.createElement('video')
myVideo.muted = true


const peer = new Peer(undefined, {
    path: '/peerjs',
    secure: true,
    host: 'ghaith-weslati.herokuapp.com',
    port: 443,
})

const peers = {}

let myVideoStream
navigator.mediaDevices
    .getUserMedia({
        video: true,
        audio: true,
    })
    .then((stream) => {
        myVideoStream = stream
        addVideoStream(myVideo, stream)

        socket.on('user-connected', (userId) => {
            connectToNewUser(userId, stream)
        })

        peer.on('call', (call) => {
            call.answer(stream)
            const video = document.createElement('video')
            call.on('stream', (userVideoStream) => {
                addVideoStream(video, userVideoStream)
            })
        })

        document.addEventListener("keydown", (e) => {
            if (e.which === 13 && chatInputBox.value != "") {

                const text = chatInputBox.value;
                chatInputBox.value = "<b>" + nom + " : </b>" + text;
                socket.emit("message", chatInputBox.value);
                chatInputBox.value = "";
            }
        });

        socket.on("createMessage", (msg) => {
            all_messages.innerHTML += "<p>" + msg + "</p>";
            main__chat__window.scrollTop = main__chat__window.scrollHeight;
            document.getElementById('footer').scrollTop = document.getElementById('footer').scrollHeight

        });
    });


socket.on('user-disconnected', (userId) => {
    if (peers[userId]) peers[userId].close()
})

peer.on('open', (id) => {
    socket.emit('join-room', ROOM_ID, id)
})

const connectToNewUser = (userId, stream) => {
    const call = peer.call(userId, stream)
    const video = document.createElement('video')
    call.on('stream', (userVideoStream) => {
        addVideoStream(video, userVideoStream)
    })
    call.on('close', () => {

        if (video && video.nextSibling) {
            video.parentNode.parentNode.removeChild(video.parentNode.nextSibling)
        }

        video.parentNode.innerHTML = "";




    })

    peers[userId] = call
    /*
        if (videoGrid.childNodes.length >= 2) {
    
    
    
            var d = new Date();
            d = new Date(d.getTime() + duree * 60 * 1000);
            var countDownDate = d;
    
            var x = setInterval(function () {
    
                var now = new Date().getTime();
                var distance = countDownDate - now;
                var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                var seconds = Math.floor((distance % (1000 * 60)) / 1000);
                document.getElementById('sujet').innerText = sujet + " - " + hours + ":" + minutes + ":" + seconds;
            }, 1000);
    
        }*/

}


const afficherMessages = () => {
    const html = `<i class="fas fa-video"></i>`
    document.querySelector('.mainVideoButton').innerHTML = html
}

const addVideoStream = (video, stream) => {
    video.srcObject = stream
    video.addEventListener('loadedmetadata', () => {
        video.play()
    })
    var section = document.createElement('section')
    section.append(video)

    section.className = "MyClass";


    if (videoGrid.childNodes.length >= 2) {
        if (videoGrid.childNodes.length % 2 == 0)
            section.style.display = "none";
    }

    videoGrid.append(section)



    var n = videoGrid.childNodes.length / 2;
    var elements = document.getElementsByClassName("MyClass");
    if (n == 1) {
        if (id.includes("Consultation")) {
            var x = document.getElementById("snackbar");
            x.innerText = "Merci de patienter jusqu'à l'autre utilisateur rejoint la salle de réunion virtuelle";
            x.className = "show";
            setTimeout(function () { x.className = x.className.replace("show", ""); }, 10000);
        }

        for (var i = 0; i < elements.length; i++) {
            elements[i].style.width = "100%";
            elements[i].style.height = "100%";
        }
    }
    else if (n == 2) {
        if (id.includes("Consultation")) {
            var x = document.getElementById("snackbar");
            x.innerText = "Séance commencée !";
            x.className = "show";
            setTimeout(function () { x.className = x.className.replace("show", ""); }, 10000);
        }
        for (var i = 0; i < elements.length; i++) {
            elements[i].style.width = "100%";
            elements[i].style.height = "50%";
        }
    }
    else if (n == 3 || n == 4) {
        for (var i = 0; i < elements.length; i++) {
            elements[i].style.width = "50%";
            elements[i].style.height = "50%";
        }
    }
    else if (n == 5 || n == 6) {
        for (var i = 0; i < elements.length; i++) {
            elements[i].style.width = "50%";
            elements[i].style.height = "33%";
        }
    }

}

const scrollToBottom = () => {
    var d = $('.mainChatWindow')
    d.scrollTop(d.prop('scrollHeight'))
}

const displayMessages = () => {

    if (list.style.display == "none")
        list.style.display = "block";
    else
        list.style.display = "none";
}

const muteUnmute = () => {
    const enabled = myVideoStream.getAudioTracks()[0].enabled
    if (enabled) {
        myVideoStream.getAudioTracks()[0].enabled = false
        setUnmuteButton()
    } else {
        setMuteButton()
        myVideoStream.getAudioTracks()[0].enabled = true
    }
}

const setMuteButton = () => {
    const html = `<i class="fas fa-microphone"></i>`
    document.querySelector('.mainMuteButton').innerHTML = html
}

const setUnmuteButton = () => {
    const html = `<i class="unmute fas fa-microphone-slash" ></i>`
    document.querySelector('.mainMuteButton').innerHTML = html
}

const playStop = () => {
    console.log('object')
    let enabled = myVideoStream.getVideoTracks()[0].enabled
    if (enabled) {
        myVideoStream.getVideoTracks()[0].enabled = false
        setPlayVideo()
    } else {
        setStopVideo()
        myVideoStream.getVideoTracks()[0].enabled = true
    }
}

const setStopVideo = () => {
    const html = `<i class="fas fa-video"></i>`
    document.querySelector('.mainVideoButton').innerHTML = html
}

const setPlayVideo = () => {
    const html = `<i class="stop fas fa-video-slash"></i>`
    document.querySelector('.mainVideoButton').innerHTML = html
}

const leave = () => {
    if (confirm("Voulez vous vraiment quitter ?")) {
        //   document.cookie = name + "=index%3d1; expires=whenever;path=/";
        window.history.back();
    }
}

