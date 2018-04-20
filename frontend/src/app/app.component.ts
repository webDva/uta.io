import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  baseUrl = '';

  songFiles: FileList;
  formData: FormData;

  onSongFilesChange(files?: FileList) {
    if (files) {
      this.songFiles = files;
    }

    this.formData = new FormData();
    for (let i = 0; i < this.songFiles.length; i++) {
      this.formData.append('songs', this.songFiles[i], this.songFiles[i].name);
    }
    this.formData.append('musician_name', 'random mu mu');
  }

  uploadSongs() {
    this.http.post(this.baseUrl + '/addSongs', this.formData).subscribe(data => {
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
