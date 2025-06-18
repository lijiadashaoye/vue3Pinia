// https://cloud.tencent.com/developer/article/1627222
let time = 0;
let db = null,
  dbName = '',
  storeName = '',
  key = '',
  version = '';
export default {
  // indexedDB 是 key-value 数据库，具体体现就是 objectStore。
  // objectStore 是 indexedDB 的数据存储机制，每一条记录包含了 key 和 value
  // 我们通过 key 得到 indexedDB 中存储的对应值。要获得 value，必须通过 key 来获得
  openDB(name, v, store, label) {
    return new Promise(resolve => {
      // 打开数据库，若没有则会创建
      let request = window.indexedDB.open(name, v);
      request.onupgradeneeded = event => {
        db = event.target.result;
        // 如果没有该对象仓库，则创建该对象仓库
        if (!db.objectStoreNames.contains(store)) {
          // keyPath 是存在于数据中的一个键名
          db.createObjectStore(store, { keyPath: label })
            // 创建索引，在后面查询数据的时候可以根据索引查
            // 索引名称、索引所在的属性、配置对象（false 说明该属性是否包含重复的值）
            .createIndex(label, label, { unique: true });
        }
      };
      request.onsuccess = event => {
        db = event.target.result;
        dbName = name;
        version = version;
        storeName = store;
        key = label;
        console.log('数据库打开成功');
        resolve(true);
      };
      // 数据库打开失败的回调
      request.onerror = () => {
        time++;
        if (time < 3) {
          this.openDB();
        }
      };
    });
  },
  initData(nav) {
    return new Promise(resolve => {
      let objectStore = db.transaction([storeName], 'readwrite').objectStore(storeName); // 仓库对象
      // 将数据保存到新创建的对象存储中
      nav.forEach((val, index) => {
        let request = objectStore.get(val[key]);
        request.onsuccess = () => {
          if (!request.result) {
            let addRequest = objectStore.add(toRaw(val));
            addRequest.onsuccess = () => {
              if (index === nav.length - 1) {
                resolve(true);
              }
            };
          }
        };
      });
    });
  },
  readDataAll() {
    return new Promise(resolve => {
      let cursor = db.transaction([storeName], 'readonly').objectStore(storeName).getAll();
      cursor.onsuccess = event => {
        resolve(event.target.result.sort((a, b) => a.order - b.order));
      };
    });
  },
  // 查询数据
  readData(target) {
    return new Promise(resolve => {
      let request = db
        .transaction([storeName], 'readwrite')
        .objectStore(storeName)
        .index(key)
        .openCursor(IDBKeyRange.only(target)); // 索引对象键名对应的值
      request.onsuccess = e => {
        let type = Object.prototype.toString.call(target).slice(8, -1).toLowerCase();
        if (type === 'string') {
          if (e.target.result) {
            resolve(e.target.result.value);
          } else {
            resolve(false);
          }
        } else if (type === 'array') {
          let list = [],
            cursor = e.target.result;
          if (cursor) {
            // 必须要检查
            list.push(cursor.value);
            cursor.continue(); // 遍历了存储对象中的所有内容
          } else {
            if (list.length === 0) {
              resolve(false);
            } else {
              resolve(list);
            }
          }
        }
      };
    });
  },
  // 更新数据
  updateData(data) {
    let type = Object.prototype.toString.call(data).slice(8, -1).toLowerCase();
    return new Promise(resolve => {
      let reader = db.transaction([storeName], 'readwrite').objectStore(storeName);
      if (type === 'object') {
        reader.get(data.title).onsuccess = () => {
          reader.put(toRaw(data)).onsuccess = () => {
            resolve(true);
          };
        };
      } else if (type === 'array') {
        data.forEach((val, index) => {
          reader.put(toRaw(val)).onsuccess = () => {
            if (index === data.length - 1) {
              resolve(true);
            }
          };
        });
      }
    });
  },
  // 删除数据
  deleteData(target) {
    return new Promise(resolve => {
      let request = db
        .transaction([storeName], 'readwrite')
        .objectStore(storeName)
        .index(key) // 索引对象
        .openCursor(IDBKeyRange.only(target)); // 指针对象
      request.onsuccess = e => {
        var cursor = e.target.result;
        var deleteRequest;
        if (cursor) {
          deleteRequest = cursor.delete(target); // 请求删除当前项
          deleteRequest.onsuccess = () => {
            resolve(true);
          };
        }
      };
    });
  },
  // 关闭数据库
  closeDB() {
    return new Promise(resolve => {
      db.close();
      resolve(true);
    });
  },
  // 删除数据库
  deleteDBAll() {
    return new Promise(resolve => {
      // 删除整个数据库
      window.indexedDB.deleteDatabase(dbName).onsuccess = () => {
        resolve(true);
      };
    });
  },
};
