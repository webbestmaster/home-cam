// https://developer.mozilla.org/ru/docs/Web/API/MediaRecorder

// @flow

let cameraStream = null;

// Start Streaming
export function startStreaming(video) {
    const mediaSupport = 'mediaDevices' in navigator;

    if (mediaSupport) {
        navigator.mediaDevices
            .getUserMedia({video: true, audio: false})
            .then(async function (mediaStream) {

                video.srcObject = mediaStream;

                video.play();

                var options = {
                    audioBitsPerSecond: 128000,
                    videoBitsPerSecond: 2500000,
                    mimeType: 'video/webm; codecs=vp9'
                }

                var mediaRecorder = new MediaRecorder(mediaStream, options);
                mediaRecorder.start(3e3);

                // cat new-file.webm >> start-file.webm

                mediaRecorder.ondataavailable = function (e) {
                    console.log(e.data);
                    sendBlobToServer(e.data);
                    // chunks.push(e.data);
                }

                // setInterval(() => {
                //     mediaRecorder.stop();
                //     mediaRecorder.start();
                // }, 3e3);

                // while (1) {
                //     await recordForTime(5e3, mediaStream);
                // }
            })
            .catch(function (error) {
                console.log('Unable to access camera: ' + error);
            });
    } else {
        alert('Your browser does not support media devices.');

        return;
    }
}

function recordForTime(time, mediaStream) {
    return new Promise((resolve) => {
        var options = {
            audioBitsPerSecond: 128000,
            videoBitsPerSecond: 2500000,
            mimeType: 'video/webm'
        }

        var mediaRecorder = new MediaRecorder(mediaStream, options);

        mediaRecorder.start();

        mediaRecorder.ondataavailable = function (e) {
            console.log(e.data);
            // saveBlobSaFile(e.data);
            // chunks.push(e.data);
        }

        setTimeout(() => {
            resolve();
            mediaRecorder.stop();
        }, time);
    });
}

function saveBlobSaFile(blob) {
    var a = document.createElement("a");
    document.body.appendChild(a);
    a.style = "display: none";

    const url = window.URL.createObjectURL(blob);

    a.href = url;
    a.download = Date.now() + '.webm';
    a.click();
    window.URL.revokeObjectURL(url);
}

function sendBlobToServer(blob) {
    const formData = new FormData();

    // saveBlobSaFile(blob);

    // return;
    // formData.append('username', 'abc123');
    // formData.append('complete', false);
    // formData.append('description', 'abc123');
    formData.append('file', blob, Date.now() + 'file-name-here.webm');

    console.log(111)

    fetch('/post-file', {
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
