import Dexie from 'dexie';

class DbHelper extends Dexie {
  constructor() {
    super('MyDB');
    this.version(1).stores({
      movies: '++id,id,logo,info,order,sources,page,origin',
    });
  }
}

const db: any = new DbHelper();
export default db;
