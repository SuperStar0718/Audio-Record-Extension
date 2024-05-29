import React from "react";
import logo from "@assets/img/logo.svg";
import { AudioRecorder, useAudioRecorder } from "react-audio-voice-recorder";
import { useEffect, useState } from "react";
import { useRef } from "react";

export default function Popup(): JSX.Element {
  let combinedStream;
  const [recordedUrl, setRecordedUrl] = useState("");
  const mediaStream = useRef(null);
  const mediaRecorder = useRef(null);
  const chunks = useRef([]);
  const startRecording = async () => {
    try {
      const audioContext = new AudioContext();
      const micInput = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });
      const systemAudioInput = await navigator.mediaDevices.getDisplayMedia({
        video: {
          displaySurface: "browser",
        },
        systemAudio: "include",
        audio: true,
        preferCurrentTab: false,
        selfBrowserSurface: "exclude",
        surfaceSwitching: "include",
        monitorTypeSurfaces: "include",
      });

      const userStream = new MediaStream(micInput.getAudioTracks());
      const systemStream = new MediaStream(systemAudioInput.getAudioTracks());

      const userAudio = audioContext.createMediaStreamSource(userStream);
      const systemAudio = audioContext.createMediaStreamSource(systemStream);
      // combinedStream = new MediaStream([
      //   ...systemAudioStream.getAudioTracks(),
      //   ...micStream.getAudioTracks(),
      // ]);
      const dest = audioContext.createMediaStreamDestination();
      userAudio.connect(dest);
      systemAudio.connect(dest);

      const mediaRecorder = new MediaRecorder(dest.stream);
      mediaStream.current = dest.stream;
      mediaRecorder.current = new MediaRecorder(dest.stream);
      mediaRecorder.current.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunks.current.push(e.data);
        }
      };
      mediaRecorder.current.onstop = () => {
        const recordedBlob = new Blob(chunks.current, { type: "audio/webm" });
        const url = URL.createObjectURL(recordedBlob);
        setRecordedUrl(url);
        chunks.current = [];

        // Create a hidden download link
        const link = document.createElement("a");
        link.href = url;
        link.download = "recorded_audio.mp3"; // Name of the downloaded file
        link.style.display = "none";

        // Append the link to the body
        document.body.appendChild(link);

        // Programmatically click the link to start the download
        link.click();

        // Remove the link from the body
        document.body.removeChild(link);
      };
      mediaRecorder.current.start();
    } catch (error) {
      console.error("Error accessing microphone:", error);
    }
  };
  const stopRecording = () => {
    if (mediaRecorder.current && mediaRecorder.current.state === "recording") {
      mediaRecorder.current.stop();
    }
    if (mediaStream.current) {
      mediaStream.current.getTracks().forEach((track) => {
        track.stop();
      });
    }
  };

  // const [mediaRecorder, setMediaRecorder] = useState<any>(null);
  // const [chunks, setChunks] = useState<any>([]);
  // const [audioURL, setAudioURL] = useState('');
  // let combinedStream;
  // const requestMicrophonePermission = async () => {
  //   try {
  //     // const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  //     const micStream = await navigator.mediaDevices.getUserMedia({ audio: true });
  //     const systemAudioStream = await navigator.mediaDevices.getDisplayMedia({
  //       video: {
  //         displaySurface: "browser",
  //       },
  //       audio: {
  //         suppressLocalAudioPlayback: false,
  //       },
  //       preferCurrentTab: false,
  //       selfBrowserSurface: "exclude",
  //       systemAudio: "include",
  //       surfaceSwitching: "include",
  //       monitorTypeSurfaces: "include",
  //     });

  //     combinedStream = new MediaStream([
  //       ...micStream.getAudioTracks(),
  //       ...systemAudioStream.getAudioTracks(),
  //     ]);

  //     const mediaRecorder = new MediaRecorder(combinedStream);
  //     return mediaRecorder;
  //     // You now have access to the user's microphone.
  //     // You can create a new MediaRecorder object using this stream.
  //     // const mediaRecorder = new MediaRecorder(stream);
  //   } catch (err) {
  //     console.error('Could not get microphone access:', err);
  //     // Handle the error appropriately.
  //   }
  // };

  // useEffect(() => {
  //   const getMicrophoneAccess = async () => {
  //     const recorder = await requestMicrophonePermission();
  //     setMediaRecorder(recorder);
  //   };

  //   getMicrophoneAccess();
  // }, []);

  // const startRecording = () => {
  //   setChunks([]);
  //   mediaRecorder.start();
  // };

  // const stopRecording = () => {
  //   mediaRecorder.stop();
  // };

  // const handleDataAvailable = (e:any) => {
  //   if (e.data.size > 0) {
  //     console.log('Data available');
  //     setChunks((prev:any) => [...prev, e.data]);
  //   }
  // };
  // const handleStop = () => {
  //   console.log('Stop recording');

  //   const blob = new Blob(chunks, { type: 'audio/webm' });
  //   const url = URL.createObjectURL(blob);
  //   setAudioURL(url);
  // };

  // useEffect(() => {
  //   if (mediaRecorder) {
  //     console.log('mediaRcorder')
  //     mediaRecorder.ondataavailable = handleDataAvailable;
  //     mediaRecorder.onstop = handleStop;
  //   }
  // }, [mediaRecorder, chunks]);
  // const recorderControls = useAudioRecorder();
  // const addAudioElement = (blob: any) => {
  //   const url = URL.createObjectURL(blob);
  //   const audio = document.createElement("audio");
  //   audio.src = url;
  //   audio.controls = true;
  //   document.body.appendChild(audio);
  // };

  // useEffect(() => {
  //   const getMicrophoneAccess = async () => {
  //     const recorder = await requestMicrophonePermission();
  //     setMediaRecorder(recorder);
  //   };

  //   getMicrophoneAccess();
  // }, []);

  return (
    <div className="absolute top-0 left-0 right-0 bottom-0 text-center h-full p-3 bg-gray-800">
      <header className="flex flex-col items-center justify-center text-white">
        <img
          src={logo}
          className="h-36 pointer-events-none animate-spin-slow"
          alt="logo"
        />
        <button
        className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          onClick={() => {
            chrome.tabs.create({
              url: chrome.runtime.getURL("src/pages/newtab/index.html"),
            });
          }}
        >
          Start Record
        </button>
        {/* <AudioRecorder
          onRecordingComplete={addAudioElement}
          audioTrackConstraints={{
            noiseSuppression: true,
            echoCancellation: true,
            // autoGainControl,
            // channelCount,
            // deviceId,
            // groupId,
            // sampleRate,
            // sampleSize,
          }}
          onNotAllowedOrFound={(err) => console.table(err)}
          downloadOnSavePress={true}
          downloadFileExtension="webm"
          mediaRecorderOptions={{
            audioBitsPerSecond: 128000,
          }}
        /> */}

        {/* <div>
          <audio controls src={recordedUrl} />
          <button onClick={startRecording}>Start Recording</button>
          <button onClick={stopRecording}>Stop Recording</button>
        </div> */}
      </header>
    </div>
  );
}
