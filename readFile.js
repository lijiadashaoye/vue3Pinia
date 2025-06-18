import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { readFileSync } from 'fs';
// https://www.tides.cn/p_node-fs-extra
import { ensureFile, outputFile, remove } from 'fs-extra/esm';

const __filename = fileURLToPath(import.meta.url); // 当前入口文件地址
const __dirname = path.dirname(__filename); // 当前入口文件文件夹
let viewsPath = `${__dirname}/test1.js`;
// 检查文件是否存在
ensureFile(viewsPath)
  .then(() => {
    let data = 'asdfasdfasdfasdfasdfasdfasdf';
    // 输出文件
    outputFile(viewsPath, data)
      .then(() => {
        console.log('文件已成功创建并写入数据!');
        let data = readFileSync(viewsPath).toString();
        console.log(data);
        setTimeout(() => {
          remove(viewsPath)
            .then(() => {
              console.log('文件或目录已成功删除!');
            })
            .catch(err => {
              console.error('删除文件或目录时出错:', err);
            });
        }, 2000);
      })
      .catch(err => {
        console.error('写入失败:', err);
      });
  })
  .catch(err => {
    console.error('确保文件存在失败:', err);
  });
