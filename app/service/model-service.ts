import { AbstractApplicationService, IApplicationService } from '../model/service';
import { ISshIdentity } from '../model/identity';
import { ISshHostServer } from '../model/host-server';
import { IModelStorageOption, storageService } from './storage-service';
import { getStorageConfig, defaultStorageOption } from '../config/storage-config';
import { getLogger } from '../util/logger';

interface IStateEvent {
  identityList: ISshIdentity[];
  hostList: ISshHostServer[];
}

class ModelService extends AbstractApplicationService<IStateEvent> implements IApplicationService<IStateEvent> {
  private identityList: ISshIdentity[] = [];
  private hostList: ISshHostServer[] = [];
  private syncing: boolean = false;
  private initialized: boolean = false;

  public initialize(): Promise<void> {
    if (this.syncing || this.initialized) {
      return Promise.resolve();
    }
    this.syncing = true;
    const option = this.getStorageOption();
    return Promise.all([
      storageService.loadModel<ISshIdentity>(getStorageConfig('IDENTITY_FILE'), option)
        .then((v) => this.identityList = v),
      storageService.loadModel<ISshHostServer>(getStorageConfig('HOST_FILE'), option)
        .then((v) => this.hostList = v),
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

  public getState(): IStateEvent {
    return {
      identityList: this.identityList,
      hostList: this.hostList,
    };
  }

  private getStorageOption(): IModelStorageOption {
    return defaultStorageOption;
  }
}

const logger = getLogger(ModelService.name);

export const modelService = new ModelService();
