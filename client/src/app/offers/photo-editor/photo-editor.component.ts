import { OfferService } from 'src/app/_services/offer.service';
import { HttpClient } from '@angular/common/http';
import { Photo } from './../../_models/Photo';
import { Component, Input, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { Offer } from 'src/app/_models/offer';

@Component({
  selector: 'app-photo-editor',
  templateUrl: './photo-editor.component.html',
  styleUrls: ['./photo-editor.component.css']
})
export class PhotoEditorComponent implements OnInit {
  @Input() offer: Offer;
  photos: Photo[];
  uploader: FileUploader;
  hasBaseDropZoneOver = false;
  baseUrl = "https://localhost:7076/api/";

  constructor(private offerService: OfferService) { }

  ngOnInit(): void {
    this.loadPhotos();
    this.initializeUploader();
  }

  fileOverBase(e: any) {
    this.hasBaseDropZoneOver = e;
  }

  initializeUploader() {
    this.uploader = new FileUploader({
      url: this.baseUrl + "offer/upload-photo",
      isHTML5: true,
      allowedFileType: ["image"],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10 * 1024 *1024
    });

    this.uploader.onAfterAddingAll = (file) => {
      file.withCredentials = false;
    }

    this.uploader.onSuccessItem = (item, response, status, headers) => {
      if (response) {
        const photo = JSON.parse(response);
        this.photos.push[photo];
      }
    }

    setMainPhoto(photo: Photo) {
      this.offerService.setMainPhoto(photo.id).subscribe(() => {
        this.photos.forEach(p=> {
          if (p.IsMain) p.IsMain = false;
          if (p.Id === photo.id) p.IsMain = true;
        })
      })
    }
  }

  loadPhotos() {
    this.offerService.getPhotos().subscribe(photos => {
      this.photos = photos
    })
  }

}