import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../../services/gifs.service';

@Component({
  selector: 'gif-search-box',
  template: `
    <h5>Cerca: </h5>
    <input type="text"
      class="form-control"
      placeholder="Cerca gifs..."
      (keyup.enter)="searchTag()"
      #txtTagInput
    >
  `
})

export class SearchBoxComponent {

  @ViewChild('txtTagInput')
  public tagInput!: ElementRef<HTMLInputElement>

  constructor( private gifsService: GifsService) { }

  searchTag() {
    const newTag = this.tagInput.nativeElement.value
    this.gifsService.searchTag(newTag)
    this.tagInput.nativeElement.value = ''
  }
}
