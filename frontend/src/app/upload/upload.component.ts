import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  baseUrl = '';

  songFiles: FileList;
  // formData: FormData;

  onSongFilesChange(files?: FileList) {
    if (files) {
      this.songFiles = files;
    }

    // this.formData = new FormData();

    // for (let i = 0; i < this.songFiles.length; i++) {
    //   this.formData.append('songs', this.songFiles[i].name);
    // }

    // if (files) {
    //   for (let i = 0; i < files.length; i++) {
    //     this.formData.append('files', files[i], files[i].name);
    //   }
    // } else {
    //   for (let i = 0; i < this.songFiles.length; i++) {
    //     this.formData.append('files', this.songFiles[i], this.songFiles[i].name);
    //   }

      //this.padding = padding;
      //formData.append('padding', this.padding);
    //}

    // this.http.post<UploadResponseType>(this.baseUrl + '/upload', formData).subscribe(data => {
    //     let blob = new Blob([new Uint8Array(data['newImage']['data'])], {type: 'image/png'});
    //     this.url = this.sanitzer.bypassSecurityTrustUrl(window.URL.createObjectURL(blob));
    // });
  }

  uploadSongs() {
    let songFilesList = []

    for (let i = 0; i < this.songFiles.length; i++) {
      songFilesList.push(this.songFiles[i].name);
    }

    this.http.post(this.baseUrl + '/addSongs', {musician_name: "random musician", songs: songFilesList}).subscribe(data => {
      const result = data;
    });
  }

  constructor(private http: HttpClient) { }

  ngOnInit() {
    if (!environment.production) {
      this.baseUrl = 'http://localhost:3000';
    }
  }

}
