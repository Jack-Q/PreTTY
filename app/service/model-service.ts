import { AbstractApplicationService, IApplicationService } from '../model/service';
import { ISshIdentity } from '../model/identity';
import { ISshHostServer } from '../model/host-server';
import { IModelStorageOption, storageService } from './storage-service';
import { getStorageConfig, defaultStorageOption } from '../config/storage-config';
import { getLogger } from '../util/logger';
import { getServiceConnector } from '../util/connect-to-service';
import { ISshProfile } from '../model/profile';

interface IStateEvent {
  initialized: boolean;
  profileList: ISshProfile[];
  identityList: ISshIdentity[];
  hostList: ISshHostServer[];
}

class ModelService extends AbstractApplicationService<IStateEvent> implements IApplicationService<IStateEvent> {
  private identityList: ISshIdentity[] = [];
  private hostList: ISshHostServer[] = [];
  private profileList: ISshProfile[] = [];
  private syncing: boolean = false;
  private initialized: boolean = false;

  public initialize(): Promise<void> {
    if (this.syncing || this.initialized) {
      return Promise.resolve();
    }
    this.syncing = true;
    const option = this.getStorageOption();
    return Promise.all([
      storageService.loadOrCreateModel<ISshIdentity>(getStorageConfig('IDENTITY_FILE'), option)
        .then((v) => this.identityList = v),
      storageService.loadOrCreateModel<ISshHostServer>(getStorageConfig('HOST_FILE'), option)
        .then((v) => this.hostList = v),
      storageService.loadOrCreateModel<ISshProfile>(getStorageConfig('PROFILE_FILE'), option)
        .then((v) => this.profileList = v),
    ]).then(() => {
      this.initialized = true;
      this.syncing = false;
    }).catch((e) => {
      // TODO: generate temporary session profile or request user intervention
      logger.error('failed to initialize model service', e);
      this.initialized = true;
      this.syncing = false;
    });
  }

  public syncStorage(): Promise<void> {
    if (this.syncing) {
      logger.warn('model sync requested while synching in progress');
      return Promise.reject(new Error('syncing in progress'));
    }
    if (!this.initialized) {
      logger.error('cannot sync model before model initialization finished');
      return Promise.reject(new Error('sync before initialization'));
    }
    this.syncing = true;
    const option = this.getStorageOption();
    return Promise.all([
      storageService.saveModel(getStorageConfig('IDENTITY_FILE'), this.identityList, option),
      storageService.saveModel(getStorageConfig('HOST_FILE'), this.hostList, option),
      storageService.saveModel(getStorageConfig('PROFILE_FILE'), this.profileList, option),
    ]).then(() => {
      this.initialized = true;
      this.syncing = false;
    }).catch((e) => {
      // TODO: generate temporary session profile or request user intervention
      logger.error('failed to initialize model service', e);
      this.initialized = true;
      this.syncing = false;
    });
  }

  public saveIdentity(i: ISshIdentity) {
    const index = this.identityList.findIndex((ind) => ind.id === i.id);
    if (index >= 0) {
      this.identityList.splice(index, 1, i);
    } else {
      this.identityList.push(i);
    }
    this.updateState();
    this.syncStorageBackground();
  }

  public removeIdentity(i: ISshIdentity) {
    const index = this.identityList.findIndex((ind) => ind.id === i.id);
    this.identityList.splice(index, 1);
    this.updateState();
    this.syncStorageBackground();
  }

  public getState(): IStateEvent {
    return {
      initialized: this.initialized,
      identityList: this.identityList,
      profileList: this.profileList,
      hostList: this.hostList,
    };
  }

  private getStorageOption(): IModelStorageOption {
    return defaultStorageOption;
  }

  private syncStorageBackground() {
    this.syncStorage().catch((e) => logger.warn('background sync error', e));
  }
}

const logger = getLogger(ModelService.name);

export const modelService = new ModelService();
export const modelServiceConnector = getServiceConnector<IStateEvent, ModelService>(modelService);
