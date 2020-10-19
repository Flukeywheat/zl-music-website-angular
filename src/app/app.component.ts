import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Observable, observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'zl-music-website';
  
  fileSource;

  constructor(
    private httpClient: HttpClient,
    private domSanitizer: DomSanitizer
  ){
    this.getMusic();
  }

  private getMusic(){
    this.httpClient.get('http://localhost:5001/music', {responseType: 'blob'})
      .pipe(
        tap(
          res => {
            this.createImageFromBlob(res);
            console.log(res);
          }
        )
      ).subscribe();
  }

  private createImageFromBlob(image: Blob): void {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      const test = URL.createObjectURL(image);
      this.fileSource = this.domSanitizer.bypassSecurityTrustUrl(test);
    }, false);

    if (image) {
      reader.readAsDataURL(image);
    }
  }
}
