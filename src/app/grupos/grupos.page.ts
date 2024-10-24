import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Group } from '../core/models/group.model';
import { GroupService } from '../core/services/impl/group.service';
import { Paginated } from '../core/models/paginated.model';
import { AlertController, InfiniteScrollCustomEvent, ModalController } from '@ionic/angular';
import { GroupModalComponent } from '../shared/components/group-modal/group-modal.component';

@Component({
  selector: 'app-grupos',
  templateUrl: './grupos.page.html',
  styleUrls: ['./grupos.page.scss'],
})
export class GruposPage implements OnInit {

  _group:BehaviorSubject<Group[]> = new BehaviorSubject<Group[]>([]);
  group$:Observable<Group[]> = this._group.asObservable();

  constructor(private groupSv:GroupService,private modalCtrl:ModalController,
    private alertCtrl: AlertController) { }

  ngOnInit() {
    this.getMoreGroup();
  }

  selectedGroup: any = null;

  page:number = 1;
  pageSize:number = 25;

  refresh(){
    this.page=1;
    this.groupSv.getAll(this.page, this.pageSize).subscribe({
      next:(response:Paginated<Group>)=>{
        this._group.next([...response.data]);
        this.page++;
      }
    });
  }

  getMoreGroup(notify:HTMLIonInfiniteScrollElement | null = null) {
    this.groupSv.getAll(this.page, this.pageSize).subscribe({
      next:(response:Paginated<Group>)=>{
        this._group.next([...this._group.value, ...response.data]);
        this.page++;
        notify?.complete();
      }
    });
  }

  async openGroupForm(group: any, index: number) {
    await this.presentModalGroup('edit', group);
    this.selectedGroup = group;
  }

  onIonInfinite(ev:InfiniteScrollCustomEvent) {
    this.getMoreGroup(ev.target);
    
  }

  private async presentModalGroup(mode:'new'|'edit', group:Group|undefined=undefined){
    const modal = await this.modalCtrl.create({
      component:GroupModalComponent,
      componentProps:(mode=='edit'?{
        group: group
      }:{})
    });
    modal.onDidDismiss().then((response:any)=>{
      switch (response.role) {
        case 'new':
          this.groupSv.add(response.data).subscribe({
            next:res=>{
              this.refresh();
            },
            error:err=>{}
          });
          break;
        case 'edit':
          this.groupSv.update(group!.id, response.data).subscribe({
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

  async onAddGroup(){
    await this.presentModalGroup('new');
  }

  async confirmDelete(id: string ) {
  
    const alert = await this.alertCtrl.create({
      header: '¿Estás seguro?',
      message: '¿Deseas eliminar este grupo?',
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
            this.deleteGroup(id);
          }
        }
      ]
    });
  
    await alert.present();
  }



  deleteGroup(id:string){
    this.groupSv.delete(id).subscribe({
      next:res=>{
        this.refresh();
      },
      error:err=>{}
    })
  }

}
