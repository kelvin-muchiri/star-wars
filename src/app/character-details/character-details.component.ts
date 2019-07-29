import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CharacterService } from '../character.service';
import { PlanetService } from './../planet.service'
import { FilmService } from './../film.service'
import { SpeciesService } from './../species.service'
import { VehicleService } from './../vehicle.service';

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
    private speciesService: SpeciesService,
    private vehicleService: VehicleService,
    ) {
    }

  getCharacter(): void {
    const id = this.route.snapshot.paramMap.get('characterId');
    this.characterService.getCharacter(id)
    .subscribe(character => {
      this.character = {
        name: character['name'],
        height: character['height'],
        mass: character['mass'],
        hairColor: character['hair_color'],
        skinColor: character['skin_color'],
        eyeColor: character['eye_color'],
        birthYear: character['birth_year'],
        gender: character['gender']
      }
      this.isFav = this.isFavourite(this.character);
      this.getPlanet(character['homeworld']);
      this.getFilms(character['films']);
      this.getSpecies(character['species']);
      this.getVehicles(character['vehicles']);
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

  getVehicles(vehicles: string[]) {
    this.character['vehicles'] = []

    for (let url of vehicles) {
      this.vehicleService.getVehicleByUrl(url).subscribe(vehicle => {
        this.character['vehicles'].push({
          name: vehicle['name']
        })
        console.log(this.character.vehicles)
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
