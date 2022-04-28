import { Injectable } from '@angular/core';

@Injectable()
export class StorageService {

  constructor(private localStorage: Storage) {}

  public get(id: string) {
    return localStorage.getItem(id);
  }

  public set(id: string, data: any) {
    return localStorage.setItem(id, data);
  }

  public remove(id: string) {
    return localStorage.removeItem(id);
  }

  public clear() {
    return localStorage.clear();
  }

}

}
