import CryptoJS from 'crypto-js';

// 密钥和数据
let secretKey = ''; // 密钥
let iv = CryptoJS.enc.Utf8.parse('1234567890123456'); // 16 字节 IV

// 使用 AES-CBC 加密（指定模式和 IV）
const Encrypt = word => {
  secretKey = makeSecretKey();
  return CryptoJS.AES.encrypt(word, secretKey, { iv: iv }).toString();
};

// 解密
const Decrypt = word => {
  return CryptoJS.AES.decrypt(word, secretKey, { iv: iv }).toString(CryptoJS.enc.Utf8);
};

function makeSecretKey() {
  let str = '0123456789zxcvbnmasdfghjklqwertyuiopZXCVBNMASDFGHJKLQWERTYUIOP!@#$%^&*';
  return Array.from({ length: Math.trunc(Math.floor(Math.random() * 31 + 10)) }).reduce(
    (all, now) => {
      all += str[Math.trunc(Math.random() * str.length)];
      return all;
    },
    '',
  );
}

export { Encrypt, Decrypt };
