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

                var mediaRecorder = new MediaRecorder(mediaStream);


                mediaRecorder.start();
                console.log(mediaRecorder.state);

                mediaRecorder.ondataavailable = function(e) {
                    console.log(e.data);
                    // chunks.push(e.data);
                }

                setInterval(() => {
                    // mediaRecorder.stop();
                    // console.log(mediaRecorder.state);

                    const rrr = mediaRecorder.requestData();
                    console.log(rrr)
                }, 1e3);

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
