import { Injectable } from '@angular/core';
import { IBaseMapping } from '../intefaces/base-mapping.interface';
import { Group } from '../../models/group.model';
import { Paginated } from '../../models/paginated.model';

export interface GroupRaw {
  id?: string
  nombre: string
}

@Injectable({
  providedIn: 'root'
})
export class GroupMappingJsonServerService implements IBaseMapping<Group>{

    setAdd(data: Group):GroupRaw {
        return {
            nombre:data.name
        };
    }
    setUpdate(data: Group):GroupRaw {
        let toReturn:any = {};
        Object.keys(data).forEach(key=>{
            switch(key){
                case 'name': toReturn['nombre']=data[key];
                break;
                default:
            }
        });
        return toReturn;
    }
    getPaginated(page:number, pageSize: number, pages:number, data:GroupRaw[]): Paginated<Group> {
        return {page:page, pageSize:pageSize, pages:pages, data:data.map<Group>((d:GroupRaw)=>{
            return this.getOne(d);
        })};
    }
    getOne(data: GroupRaw):Group {
        return {
            id:data.id!, 
            name:data.nombre, 
        };
    }
    getAdded(data: any):Group {
        return this.getOne(data);
    }
    getUpdated(data: any):Group {
        return this.getOne(data);
    }
    getDeleted(data: any):Group {
        return this.getOne(data);
    }


}
