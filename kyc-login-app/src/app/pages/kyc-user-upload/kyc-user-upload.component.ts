import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-kyc-admin-upload',
  standalone: true,
  imports: [CommonModule, FormsModule],
  styleUrl: './kyc-user-upload.component.css',
  templateUrl: './kyc-user-upload.component.html',
})
export class KycUserUploadComponent {
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

  submitted = false;
  constructor(private router: Router,
    private http: HttpClient
  ) {}

  handleFile(event: any, type: string) {
    const file = event.target.files[0];
    if (file) {
      this.form[type] = file;
    }
  }

  uploadVideo() {
    this.router.navigate(['/kyc-video']);
  }

  onImageSelected(event: any): void {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/jpeg')) this.imageFile = file;
    else alert('Only JPEG images are allowed');
  }

  onPdfSelected(event: any): void {
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') this.pdfFile = file;
    else alert('Only PDF files are allowed');
  }

  onVideoSelected(event: any): void {
    const file = event.target.files[0];
    if (file && file.type.startsWith('video/')) this.videoFile = file;
    else alert('Only video files are allowed');
  }

  submit() {
    const formData = new FormData();

    if (this.imageFile) formData.append('panCard', this.imageFile);

    // if (this.videoFile) formData.append('video', this.videoFile);
    formData.append('name', this.form.name);
    formData.append('rm', this.form.rm);
    const headers = new HttpHeaders({ 'Content-Type': 'multipart/form-data' });

    this.http.post('https://4gv6vfzcq4.execute-api.us-west-2.amazonaws.com/uploadKYCFiles', formData).subscribe({
      next: (res) => alert('panCard uploaded successfully!'),
      error: () => alert('Upload failed!'),
    });


    if (this.pdfFile) formData.append('aadharCard', this.pdfFile);
    // if (this.videoFile) formData.append('video', this.videoFile);
    formData.append('name', this.form.name);
    formData.append('rm', this.form.rm);

     this.http.post('https://4gv6vfzcq4.execute-api.us-west-2.amazonaws.com/uploadKYCFiles', formData).subscribe({
      next: (res) => alert('aadhar Files uploaded successfully!'),
      error: () => alert('Upload failed!'),
    });
    // Normally, here you'd send form data to the backend
  }
}
