import { Component, OnInit, Input } from '@angular/core';
import { CharacterService } from '../character.service'

@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.scss']
})
export class CharacterListComponent implements OnInit {
  characters: any = []
  page: number;
  totalItems: number;

  constructor(private characterService: CharacterService) {
    this.page = characterService.getPage();
  }

  getCharacters(): void {
    this.characterService.getCharacters().subscribe(data => {
      this.totalItems = data['count'];
      this.characters = data['results'].map(character => {
        let isFav = false;
        if (this.characterService.isFavourite(character)) {
            isFav = true
        }
        return {...character, isFav: isFav}
      });
    })
  }

  nextPage() {
    this.page += 1
    this.characterService.setPage(this.page)
    this.getCharacters()
  }

  previousPage() {
    if (this.page > 1) {
      this.page -= 1
      this.characterService.setPage(this.page)
      this.getCharacters();
    }
  }

  ngOnInit() {
    this.getCharacters()
  }

}
