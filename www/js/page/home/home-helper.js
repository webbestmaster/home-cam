// https://developer.mozilla.org/ru/docs/Web/API/MediaRecorder

// @flow

let cameraStream = null;

// Start Streaming
export function startStreaming(video) {
    const mediaSupport = 'mediaDevices' in navigator;

    if (mediaSupport) {
        navigator.mediaDevices
            .getUserMedia({video: true})
            .then(function (mediaStream) {
                // cameraStream = mediaStream;
                var options = {
                    audioBitsPerSecond: 128000,
                    videoBitsPerSecond: 2500000,
                    mimeType: 'video/webm'
                }
                var mediaRecorder = new MediaRecorder(mediaStream, options);

                mediaRecorder.start();
                console.log(mediaRecorder.state);

                mediaRecorder.ondataavailable = function (e) {
                    console.log(e.data);
                    sendBlobToServer(e.data);
                    // chunks.push(e.data);
                }

                setInterval(() => {
                    // mediaRecorder.stop();
                    // console.log(mediaRecorder.state);

                    const rrr = mediaRecorder.requestData();
                    console.log(rrr)
                }, 10e3);

                // stream.srcObject = mediaStream;

                video.srcObject = mediaStream;

                video.play();
            })
            .catch(function (error) {
                console.log('Unable to access camera: ' + error);
            });
    } else {
        alert('Your browser does not support media devices.');

        return;
    }
}

function sendBlobToServer(blob) {
    const formData = new FormData();

    // var a = document.createElement("a");
    // document.body.appendChild(a);
    // a.style = "display: none";

    // formData.append('username', 'abc123');
    // formData.append('complete', false);
    // formData.append('description', 'abc123');
    formData.append('file[]', blob, Date.now() + 'file-name-here.webm');

    fetch('/file', {
        method: 'POST',
        body: formData,
    });
    fetch('/again', {
        method: 'GET',
        // mode: 'no-cors',
        // headers: {'Content-Type': 'application/json'},
        // body: JSON.stringify({
        //     description: '--String-',
        //     number: 32,
        // })
    });
    // return function (data, name) {
    // var blob = new Blob(data, {type: "octet/stream"}),
    // const url = window.URL.createObjectURL(blob);
    // a.href = url;
    // a.download = Date.now() + '.webm';
    // a.click();
    // window.URL.revokeObjectURL(url);
    // };
}
