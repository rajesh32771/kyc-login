import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-kyc-video-recorder',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './kyc-video-recorder.component.html',
  styleUrl: './kyc-video-recorder.component.css'
  
})
export class KycVideoRecorderComponent {
  mediaRecorder!: MediaRecorder;
  chunks: Blob[] = [];
  videoURL: string | null = null;
  cameraStarted = false;
  recording = false;

  startCamera() {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(stream => {
      const video: HTMLVideoElement = document.querySelector('video#video')!;
      video.srcObject = stream;
      this.mediaRecorder = new MediaRecorder(stream);

      this.mediaRecorder.ondataavailable = (e) => this.chunks.push(e.data);
      this.mediaRecorder.onstop = () => {
        const blob = new Blob(this.chunks, { type: 'video/webm' });
        this.videoURL = URL.createObjectURL(blob);
        this.chunks = [];

        const playback = document.querySelector('video#playback') as HTMLVideoElement;
        if (playback) playback.src = this.videoURL;
      };

      this.cameraStarted = true;
    }).catch(err => console.error('Camera error:', err));
  }

  startRecording() {
    if (this.mediaRecorder) {
      this.chunks = [];
      this.mediaRecorder.start();
      this.recording = true;
    }
  }

  stopRecording() {
    if (this.mediaRecorder && this.recording) {
      this.mediaRecorder.stop();
      this.recording = false;
    }
  }
}
