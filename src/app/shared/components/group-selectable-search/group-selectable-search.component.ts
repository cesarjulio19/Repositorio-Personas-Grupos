import { Component, forwardRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { InfiniteScrollCustomEvent, IonInput, IonPopover } from '@ionic/angular';
import { BehaviorSubject, lastValueFrom } from 'rxjs';
import { Group } from 'src/app/core/models/group.model';
import { Paginated } from 'src/app/core/models/paginated.model';
import { GroupService } from 'src/app/core/services/impl/group.service';

@Component({
  selector: 'app-group-selectable-search',
  templateUrl: './group-selectable-search.component.html',
  styleUrls: ['./group-selectable-search.component.scss'],
  providers:[{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => GroupSelectableSearchComponent),
    multi: true
  }]
})
export class GroupSelectableSearchComponent  implements OnInit, ControlValueAccessor, OnDestroy {

  groupSelected:Group | null = null;
  disabled:boolean = true;
  private _groups:BehaviorSubject<Group[]> = new BehaviorSubject<Group[]>([]);
  public groups$ = this._groups.asObservable();
  pagination!:Paginated<Group>;
  page:number = 1;
  pageSize:number = 25;
  activeFilter = "";
  propagateChange = (obj: any) => {}

  @ViewChild('popover', { read: IonPopover }) popover: IonPopover | undefined;
  onTouched: any;

  constructor(
    public gropsSvc:GroupService
  ) { }

  ngOnDestroy(): void {
    this.popover?.dismiss();
  }
  
  onLoadGroups(){
    this.loadGroups("");
  }

  private async loadGroups(filter:string,notify:HTMLIonInfiniteScrollElement | null = null){
    this.activeFilter = filter;
    this.gropsSvc.getByName(this.page, this.pageSize,filter).subscribe({
      next:(response:Paginated<Group>)=>{
        this._groups.next([...this._groups.value, ...response.data]);
        this.page++;
        notify?.complete();
      }
    });
  }

  private async selectGroup(id:string|undefined, propagate:boolean=false){
    if(id){
      this.groupSelected  = await lastValueFrom(this.gropsSvc.getById(id));
    }
    else
      this.groupSelected = null;
    if(propagate && this.groupSelected)
      this.propagateChange(this.groupSelected.id);
  }
  
  writeValue(obj: any): void {
    this.selectGroup(obj);
      
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  ngOnInit() {}

  private async filter(filtering:string){
    this.loadGroups(filtering);
  }

  onFilter(evt:any){
    this.filter(evt.detail.value);
  }

  onGroupClicked(popover:IonPopover, group:Group){
    this.selectGroup(group.id, true);
    popover.dismiss();
  }

  clearSearch(input:IonInput){
    input.value = "";
    this.filter("");
  }

  deselect(popover:IonPopover|null=null){
    this.selectGroup(undefined, true);
    if(popover)
      popover.dismiss();
  }

  onIonInfinite(ev:InfiniteScrollCustomEvent) {
    this.loadGroups(this.activeFilter,ev.target);
    
  }

}
