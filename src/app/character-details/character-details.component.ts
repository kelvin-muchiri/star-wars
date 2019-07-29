import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CharacterService } from '../character.service';

@Component({
  selector: 'app-character-details',
  templateUrl: './character-details.component.html',
  styleUrls: ['./character-details.component.scss']
})
export class CharacterDetailsComponent implements OnInit {
  character;
  isFav: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private characterService: CharacterService
    ) {
    }

  getCharacter(): void {
    const id = this.route.snapshot.paramMap.get('characterId');
    this.characterService.getCharacter(id)
    .subscribe(character => {
      this.character = character
      this.isFav = this.isFavourite(this.character);
    });
  }

  addToFavourites() {
    this.characterService.addFavorite(this.character);
    this.isFav = this.isFavourite(this.character);

  }

  removeFromFavourites() {
    this.characterService.removeFavourite(this.character)
    this.isFav = this.isFavourite(this.character);
  }

  isFavourite(character) {
    return this.characterService.isFavourite(character);
  }

  ngOnInit() {
    this.getCharacter();

  }

}
