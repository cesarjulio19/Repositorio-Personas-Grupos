import { Inject, Injectable } from '@angular/core';
import { BaseService } from './base-service.service';
import { Group } from '../../models/group.model';
import { IGroupService } from '../interfaces/group-service.interface';
import { IGroupRepository } from '../../repositories/intefaces/group-repository.interface';
import { GROUP_REPOSITORY_TOKEN } from '../../repositories/repository.tokens';

@Injectable({
  providedIn: 'root'
})
export class GroupService extends BaseService<Group> implements IGroupService{

  constructor(
    @Inject(GROUP_REPOSITORY_TOKEN) repository: IGroupRepository
  ) {
    super(repository);
  }
}
