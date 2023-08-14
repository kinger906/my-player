import Dexie from 'dexie';

class DbHelper extends Dexie {
  constructor() {
    super('MyDB');
    this.version(1).stores({
      movie: '++id,id,name,info,sources,logo,page,origin,order,create_time',
    });
  }
}

const db: any = new DbHelper();
export default db;
