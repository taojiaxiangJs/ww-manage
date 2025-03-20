// LocalStorage 管理类
class LocalStorageManager {
  constructor() {
      this.storage = window.localStorage;
  }

  // 设置项
  setItem(key, value) {
      try {
          const data = {
              value: value,
              timestamp: new Date().getTime(),
              type: typeof value
          };
          this.storage.setItem(key, JSON.stringify(data));
          return true;
      } catch (error) {
          console.error('存储失败:', error);
          return false;
      }
  }

  // 获取项
  getItem(key) {
      try {
          const data = this.storage.getItem(key);
          if (!data) return null;
          
          const parsedData = JSON.parse(data);
          return parsedData.value;
      } catch (error) {
          console.error('获取失败:', error);
          return null;
      }
  }

  // 删除项
  removeItem(key) {
      try {
          this.storage.removeItem(key);
          return true;
      } catch (error) {
          console.error('删除失败:', error);
          return false;
      }
  }

  // 清空所有存储
  clear() {
      try {
          this.storage.clear();
          return true;
      } catch (error) {
          console.error('清空失败:', error);
          return false;
      }
  }

  // 获取带时间戳的完整数据
  getItemWithTimestamp(key) {
      try {
          const data = this.storage.getItem(key);
          if (!data) return null;
          return JSON.parse(data);
      } catch (error) {
          console.error('获取失败:', error);
          return null;
      }
  }

  // 检查是否存在
  hasItem(key) {
      return this.storage.getItem(key) !== null;
  }

  // 设置带过期时间的数据（毫秒）
  setItemWithExpiry(key, value, expiryMs) {
      try {
          const data = {
              value: value,
              timestamp: new Date().getTime(),
              expiry: expiryMs,
              type: typeof value
          };
          this.storage.setItem(key, JSON.stringify(data));
          return true;
      } catch (error) {
          console.error('存储失败:', error);
          return false;
      }
  }

  // 获取带过期检查的数据
  getItemWithExpiry(key) {
      try {
          const data = this.storage.getItem(key);
          if (!data) return null;

          const parsedData = JSON.parse(data);
          const now = new Date().getTime();
          
          if (parsedData.expiry && (now - parsedData.timestamp > parsedData.expiry)) {
              this.removeItem(key); // 过期自动删除
              return null;
          }
          
          return parsedData.value;
      } catch (error) {
          console.error('获取失败:', error);
          return null;
      }
  }
}

const storage = new LocalStorageManager();
export default storage

// class SecureLocalStorageManager extends LocalStorageManager {
//   constructor(secretKey) {
//       super();
//       this.secretKey = secretKey;
//   }

//   // 简单加密
//   encrypt(data) {
//       return btoa(this.secretKey + JSON.stringify(data));
//   }

//   // 简单解密
//   decrypt(data) {
//       const decoded = atob(data);
//       return JSON.parse(decoded.slice(this.secretKey.length));
//   }

//   setItem(key, value) {
//       const data = {
//           value: value,
//           timestamp: new Date().getTime(),
//           type: typeof value
//       };
//       return super.setItem(key, this.encrypt(data));
//   }

//   getItem(key) {
//       const data = super.getItem(key);
//       if (!data) return null;
//       const decrypted = this.decrypt(data);
//       return decrypted.value;
//   }
// }

// 使用加密版本
// const secureStorage = new SecureLocalStorageManager('my-secret-key');
// export default secureStorage