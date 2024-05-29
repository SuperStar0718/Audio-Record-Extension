import React from 'react';
import logo from '@assets/img/logo.svg';
import '@pages/newtab/Newtab.css';
import { AudioRecorder, useAudioRecorder } from "react-audio-voice-recorder";
import { useEffect, useState } from "react";
import { useRef } from "react";

export default function Newtab(): JSX.Element {
  let combinedStream;
  const [recordedUrl, setRecordedUrl] = useState("");
  const mediaStream = useRef(null);
  const mediaRecorder = useRef(null);
  const chunks = useRef([]);
  let micInput, systemAudioInput;
  const startRecording = async () => {
    try {
      const audioContext = new AudioContext();
       micInput = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });
       systemAudioInput = await navigator.mediaDevices.getDisplayMedia({
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

        micInput.getTracks().forEach((track) => {
          track.stop();
        });
        
        systemAudioInput.getTracks().forEach((track) => {
          track.stop();
        });
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
  return (
    <div className="absolute top-0 left-0 right-0 bottom-0 text-center h-full p-3 bg-gray-800">
      <header className="flex flex-col items-center justify-center text-white">
        <img
          src={logo}
          className="h-36 pointer-events-none animate-spin-slow"
          alt="logo"
        />
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

        <div>
          <audio controls src={recordedUrl}  className=' pb-4' />
          <button className='text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700' onClick={startRecording}>Start Recording</button>
          <button className='text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700' onClick={stopRecording}>Stop Recording</button>
        </div>
      </header>
    </div>
  );
}
