import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-kyc-admin-upload',
  standalone: true,
  imports: [CommonModule, FormsModule],
  styleUrl: './kyc-admin-upload.component.css',
  templateUrl: './kyc-admin-upload.component.html',
})
export class KycAdminUploadComponent {
  form: any = {
    name: '',
    rm: '',
    pan: null,
    aadhaar: null,
    audio: null,
    video: null,
  };

  imageFile: File | null = null;
  pdfFile: File | null = null;
  videoFile: File | null = null;
  audioFile: File | null = null;

  isPanCardSelected = false;
  isAadhardSelected = false;
  isAudioFileSelected = true;
  isVideoFileSelected = false;

  submitted = false;
  constructor(private router: Router, private http: HttpClient) {}

  handleFile(event: any, type: string) {
    const file = event.target.files[0];
    if (file) {
      this.form[type] = file;
    }
  }

  isFormValid(): boolean {
    return (
      this.form.name.trim() !== '' &&
      this.form.rm !== null &&
      this.isPanCardSelected &&
      this.isAadhardSelected &&
      this.isAudioFileSelected &&
      this.isVideoFileSelected
    );
  }

  onAudioFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];

      if (file.type !== 'audio/mpeg') {
        alert('Only MP3 files are allowed.');
        this.isAudioFileSelected = false;
        return;
      }

      this.audioFile = file;
    }
  }

  onVideoSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];

      if (!file.type.startsWith('video/')) {
        alert('Please select a valid video file (mp4/webm/ogg)');
        this.isVideoFileSelected = false;
        return;
      }

      this.isVideoFileSelected = true;

      this.videoFile = file;
    }
  }

  submit() {
    const formData = new FormData();

    if (this.imageFile) formData.append('panCard', this.imageFile);

    // if (this.videoFile) formData.append('video', this.videoFile);
    formData.append('name', this.form.name);
    formData.append('rm', this.form.rm);
    const headers = new HttpHeaders({ 'Content-Type': 'multipart/form-data' });

    this.http
      .post(
        'https://4gv6vfzcq4.execute-api.us-west-2.amazonaws.com/uploadKYCFiles',
        formData
      )
      .subscribe({
        next: (res) => alert('panCard uploaded successfully!'),
        error: () => alert('Upload failed!'),
      });

    if (this.pdfFile) formData.append('aadharCard', this.pdfFile);
    // if (this.videoFile) formData.append('video', this.videoFile);
    formData.append('name', this.form.name);
    formData.append('rm', this.form.rm);

    this.http
      .post(
        'https://4gv6vfzcq4.execute-api.us-west-2.amazonaws.com/uploadKYCFiles',
        formData
      )
      .subscribe({
        next: (res) => alert('aadhar Files uploaded successfully!'),
        error: () => alert('Upload failed!'),
      });

    if (this.audioFile) formData.append('audio', this.audioFile);
    // if (this.videoFile) formData.append('video', this.videoFile);
    formData.append('name', this.form.name);
    formData.append('rm', this.form.rm);

    this.http
      .post(
        'https://4gv6vfzcq4.execute-api.us-west-2.amazonaws.com/uploadKYCFiles',
        formData
      )
      .subscribe({
        next: (res) => alert('audio Files uploaded successfully!'),
        error: () => alert('Upload failed!'),
      });

    if (this.videoFile) formData.append('video', this.videoFile);
    // if (this.videoFile) formData.append('video', this.videoFile);
    formData.append('name', this.form.name);
    formData.append('rm', this.form.rm);

    this.http
      .post(
        'https://4gv6vfzcq4.execute-api.us-west-2.amazonaws.com/uploadKYCFiles',
        formData
      )
      .subscribe({
        next: (res) => alert('video Files uploaded successfully!'),
        error: () => alert('Upload failed!'),
      });

    // Normally, here you'd send form data to the backend
  }

  onImageSelected(event: any): void {
    const file = event.target.files[0];
    if (
      file &&
      (file.type.startsWith('image/jpeg') ||
        file.type.startsWith('image/jpg') ||
        file.type.startsWith('image/png'))
    ) {
      this.imageFile = file;
      this.isPanCardSelected = true;
      this.form.pan = file;
    } else {
      this.isPanCardSelected = false;
    }
  }

  onPdfSelected(event: any): void {
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
      this.pdfFile = file;
      this.isAadhardSelected = true;
    } else {
      this.isAadhardSelected = false;
      alert('Only PDF files are allowed');
    }
  }
}
