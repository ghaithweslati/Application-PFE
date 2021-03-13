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
            alert('Quelqu\'un a connecté', userId)
        })

        peer.on('call', (call) => {
            call.answer(stream)
            const video = document.createElement('video')
            call.on('stream', (userVideoStream) => {
                addVideoStream(video, userVideoStream)
            })
        })

        let text = $('input')

        $('html').keydown(function (e) {
            if (e.which == 13 && text.val().length !== 0) {
                socket.emit('message', text.val())
                text.val('')
            }
        })

        socket.on('createMessage', (message, userId) => {
            $('ul').append(`<li >
								<span class="messageHeader">
									<span>
										From 
										<span class="messageSender">Someone</span> 
										to 
										<span class="messageReceiver">Everyone:</span>
									</span>
									${new Date().toLocaleString('en-US', {
                hour: 'numeric',
                minute: 'numeric',
                hour12: true,
            })}
								</span>
								<span class="message">${message}</span>
							
							</li>`)
            scrollToBottom()
        })
    })

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
        video.parentNode.remove()
    })

    peers[userId] = call
}

const addVideoStream = (video, stream) => {
    video.srcObject = stream
    video.addEventListener('loadedmetadata', () => {
        video.play()
    })
    var section = document.createElement('section')
    section.append(video)

    videoGrid.append(section)

    if (videoGrid.childNodes.length > 2) {
        videoGrid.childNodes[1].remove();
    }




}

const scrollToBottom = () => {
    var d = $('.mainChatWindow')
    d.scrollTop(d.prop('scrollHeight'))
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
    const html = `
	  <i class="fas fa-microphone"></i>
	`
    document.querySelector('.mainMuteButton').innerHTML = html
}

const setUnmuteButton = () => {
    const html = `
	  <i class="unmute fas fa-microphone-slash"></i>
	`
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
    const html = `
	  <i class="fas fa-video"></i>
	`
    document.querySelector('.mainVideoButton').innerHTML = html
}

const setPlayVideo = () => {
    const html = `
	<i class="stop fas fa-video-slash"></i>
	`
    document.querySelector('.mainVideoButton').innerHTML = html
}

const leave = () => {
    if (confirm("Voulez vous vraiment quitter ?")) {
        window.history.back();
    }
}