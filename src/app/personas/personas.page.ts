import { Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { PeopleService } from '../core/services/impl/people.service';
import { BehaviorSubject, lastValueFrom, Observable } from 'rxjs';
import { AlertController, AnimationController, InfiniteScrollCustomEvent, ModalController } from '@ionic/angular';
import { Paginated } from '../core/models/paginated.model';
import { Person } from '../core/models/person.model';
import { PersonModalComponent } from '../shared/components/person-modal/person-modal.component';
import { GroupService } from '../core/services/impl/group.service';
import { Group } from '../core/models/group.model';

@Component({
  selector: 'app-personas',
  templateUrl: './personas.page.html',
  styleUrls: ['./personas.page.scss'],
})
export class PersonasPage implements OnInit {

  _people:BehaviorSubject<Person[]> = new BehaviorSubject<Person[]>([]);
  people$:Observable<Person[]> = this._people.asObservable();



  constructor(
    private animationCtrl: AnimationController,
    private peopleSv:PeopleService,
    private groupSv:GroupService,
    private modalCtrl:ModalController,
    private alertCtrl: AlertController
  ) {}

  ngOnInit(): void {
    this.getMorePeople();
  }


  @ViewChildren('avatar') avatars!: QueryList<ElementRef>;
  @ViewChild('animatedAvatar') animatedAvatar!: ElementRef;
  @ViewChild('animatedAvatarContainer') animatedAvatarContainer!: ElementRef;

  selectedPerson: any = null;
  isAnimating = false;
  page:number = 1;
  pageSize:number = 25;

  refresh(){
    this.page=1;
    this.peopleSv.getAll(this.page, this.pageSize).subscribe({
      next:(response:Paginated<Person>)=>{
        this._people.next([...response.data]);
        this.page++;
      }
    });
  }


  getMorePeople(notify:HTMLIonInfiniteScrollElement | null = null) {
    this.peopleSv.getAll(this.page, this.pageSize).subscribe({
      next:(response:Paginated<Person>)=>{
        this._people.next([...this._people.value, ...response.data]);
        this.page++;
        notify?.complete();
      }
    });
  }

  async openPersonDetail(person: any, index: number) {
    await this.presentModalPerson('edit', person);
    this.selectedPerson = person;
    /*const avatarElements = this.avatars.toArray();
    const clickedAvatar = avatarElements[index].nativeElement;

    // Obtener las coordenadas del avatar clicado
    const avatarRect = clickedAvatar.getBoundingClientRect();

    // Mostrar el contenedor animado
    this.isAnimating = true;
    

    // Configurar la posición inicial de la imagen animada
    const animatedAvatarElement = this.animatedAvatar.nativeElement as HTMLElement;
    animatedAvatarElement.style.position = 'absolute';
    animatedAvatarElement.style.top = `${avatarRect.top}px`;
    animatedAvatarElement.style.left = `${avatarRect.left}px`;
    animatedAvatarElement.style.width = `${avatarRect.width}px`;
    animatedAvatarElement.style.height = `${avatarRect.height}px`;

    // Crear la animación
    const animation = this.animationCtrl.create()
      .addElement(animatedAvatarElement)
      .duration(500)
      .easing('ease-out')
      .fromTo('transform', 'translate(0, 0) scale(1)', `translate(${window.innerWidth / 2 - avatarRect.left - avatarRect.width / 2}px, ${window.innerHeight / 2 - avatarRect.top - avatarRect.height / 2}px) scale(5)`);

    // Iniciar la animación
    await animation.play();

    // Opcional: Puedes agregar lógica adicional después de la animación
    // Por ejemplo, mostrar más información, navegar a otra página, etc.

    // Resetear la animación después de completarla
    //this.isAnimating = false;*/
  }

  onIonInfinite(ev:InfiniteScrollCustomEvent) {
    this.getMorePeople(ev.target);
    
  }

  private async presentModalPerson(mode:'new'|'edit', person:Person|undefined=undefined){
    let _groups:Group[] = await lastValueFrom(this.groupSv.getAll())
    const modal = await this.modalCtrl.create({
      component:PersonModalComponent,
      componentProps:(mode=='edit'?{
        person: person,
        groups: _groups
      }:{
        groups: _groups
      })
    });
    modal.onDidDismiss().then((response:any)=>{
      switch (response.role) {
        case 'new':
          this.peopleSv.add(response.data).subscribe({
            next:res=>{
              this.refresh();
            },
            error:err=>{}
          });
          break;
        case 'edit':
          this.peopleSv.update(person!.id, response.data).subscribe({
            next:res=>{
              this.refresh();
            },
            error:err=>{}
          });
          break;
        default:
          break;
      }
    });
    await modal.present();
  }

  async onAddPerson(){
    await this.presentModalPerson('new');
  }


  async confirmDelete(id: string ) {
  
    const alert = await this.alertCtrl.create({
      header: '¿Estás seguro?',
      message: '¿Deseas eliminar a esta persona?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'alert-button-cancel',
          handler: () => {
            // Al presionar No, simplemente se cierra la alerta
          }
        },
        {
          text: 'Sí',
          role: 'confirm',
          cssClass: 'alert-button-confirm',
          handler: () => {
            // Al presionar Sí, llama a la función de eliminar
            this.deletePerson(id);
          }
        }
      ]
    });
  
    await alert.present();
  }



  deletePerson(id:string){
    this.peopleSv.delete(id).subscribe({
      next:res=>{
        this.refresh();
      },
      error:err=>{}
    })
  }

}
