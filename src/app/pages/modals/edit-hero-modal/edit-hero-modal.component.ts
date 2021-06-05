import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SuperHero } from '../../../core/models/superhero/superhero.model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SuperHeroInput } from '../../../core/models/superhero/superhero.input';
import { UpdateHeroInput } from '../../../core/models/superhero/updateHero.input';
import { SuperHeroesService } from '../../../core/services/super-heroes.service';
import { ToastrService } from 'ngx-toastr';
import { CreateHeroInput } from '../../../core/models/superhero/createHero.input';
import { Powers } from '../../../core/models/superhero/powers.model';
import { timeout } from 'rxjs/operators';

@Component({
  selector: 'app-edit-hero-modal',
  templateUrl: './edit-hero-modal.component.html',
  styleUrls: ['./edit-hero-modal.component.scss']
})
export class EditHeroModalComponent implements OnInit {

  @Output() reloadHeroes: EventEmitter<any> = new EventEmitter();
  @Input() hero: SuperHero;
  @Input() totalHeroesForId: number;
  loading = false;
  heroInput = new SuperHeroInput();
  powers;

  constructor(
    readonly activeModal: NgbActiveModal,
    private readonly superHeroesService: SuperHeroesService,
    private readonly toast: ToastrService
  ) {
    this.heroInput.id = 0;
    this.heroInput.name = '';
    this.heroInput.images = 'https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/no-portrait.jpg';
    this.heroInput.powerstats = new Powers(0, 0, 0, 0, 0, 0);
    this.powers = Object.entries(this.heroInput.powerstats);
  }

  ngOnInit(): void {
    if (this.hero) {
      this.heroInput.id = this.hero.id;
      this.heroInput.name = this.hero.name;
      this.heroInput.images = this.hero.images;
      this.heroInput.powerstats = this.hero.powerstats;
      this.powers = Object.entries(this.hero.powerstats);
    }
  }

  save() {
    if (this.hero) {
      this.loading = true;
      const updateinput = new UpdateHeroInput()
      updateinput.superHeroInput = this.heroInput;
      this.mapPowersRawToPowersEntity();
      this.superHeroesService.updateHero$(updateinput).subscribe(result => {
        this.activeModal.close();
        this.showToast(result, 'Hero edited ok', 'Failed to edit hero');
      })
    } else {
      this.loading = true;
      const createinput = new CreateHeroInput()
      createinput.superHeroInput = new SuperHeroInput()
      createinput.superHeroInput.id = this.totalHeroesForId + 1;
      createinput.superHeroInput = this.heroInput;
      this.mapPowersRawToPowersEntity();

      this.superHeroesService.createHero$(createinput).subscribe(result => {
        this.activeModal.close();
        this.showToast(result, 'Hero created ok', 'Failed to create hero');
      })
    }
  }

  private showToast(result: boolean, success: string, error: string) {
    if (result) {
      this.toast.success(success);
      this.reloadHeroes.emit();
      this.loading = false;
    } else {
      this.loading = false;
      this.toast.error(error);
    }
  }

  private mapPowersRawToPowersEntity() {
    const powersRaw = (Object.fromEntries(this.powers));

    this.heroInput.powerstats.intelligence = powersRaw.intelligence;
    this.heroInput.powerstats.strength = powersRaw.strength;
    this.heroInput.powerstats.speed = powersRaw.speed;
    this.heroInput.powerstats.durability = powersRaw.durability;
    this.heroInput.powerstats.power = powersRaw.power;
    this.heroInput.powerstats.combat = powersRaw.combat;
  }

  isString(val): boolean { return typeof val === 'string'; }

}
