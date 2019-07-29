import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CharacterService } from '../character.service';
import { PlanetService } from './../planet.service'
import { FilmService } from './../film.service'
import { SpeciesService } from './../species.service'

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
    private characterService: CharacterService,
    private planetService: PlanetService,
    private filmService: FilmService,
    private speciesService: SpeciesService
    ) {
    }

  getCharacter(): void {
    const id = this.route.snapshot.paramMap.get('characterId');
    this.characterService.getCharacter(id)
    .subscribe(character => {
      this.character = character
      this.isFav = this.isFavourite(this.character);
      this.getPlanet(this.character['homeworld']);
      this.getFilms(this.character['films']);
      this.getSpecies(this.character['species'])
    });
  }

  getPlanet(url: string) {
    this.planetService.getPlanetByUrl(url).subscribe(planet => {
      this.character['planet'] = {
        name: planet['name']
      }
    });
  }

  getFilms(films: string[]) {
    this.character['films'] = []

    for (let url of films) {
      this.filmService.getFilmByUrl(url).subscribe(film => {
        this.character['films'].push({
          title: film['title']
        })
      })
    }
  }

  getSpecies(species: string[]) {
    this.character['species'] = []

    for (let url of species) {
      this.speciesService.getSingleSpeciesByUrl(url).subscribe(species => {
        this.character['species'].push({
          name: species['name']
        })
      })
    }

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
