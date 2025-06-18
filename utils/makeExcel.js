// exceljs: https://blog.csdn.net/weixin_59246157/article/details/139693991
import ExcelJS from 'exceljs';
import { readFile } from './public';
import { ElMessage } from 'element-plus';

let datas = [];
export function makeExcel(dom) {
  datas = [];
  // 读取excel文件
  readFile().then(file => {
    if (/(?<=.+).xl.+/g.test(file.name)) {
      // 读取excel文件
      let fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file);
      fileReader.onload = () => {
        let workBook = new ExcelJS.Workbook();
        workBook.xlsx.load(fileReader.result).then(async res => {
          let fileSheet = res.getWorksheet();
          fileSheet.eachRow(row => {
            datas.push(row.values.filter(s => s));
          });
          makeTable(dom);
        });
      };
    } else {
      ElMessage.error('请选择excel文件');
    }
  });
}
function makeTable(dom) {
  dom.innerHTML = '';
  let table = document.createElement('table');
  let thead = document.createElement('thead');
  let tbody = document.createElement('tbody');
  table.setAttribute('style', 'border:1px solid #000;border-collapse:collapse');
  table.appendChild(thead);
  table.appendChild(tbody);
  datas.forEach((arr, i) => {
    let tr = document.createElement('tr');
    if (i === 0) {
      arr.forEach(t => {
        let th = document.createElement('th');
        th.setAttribute('style', 'border:1px solid #000;padding:2px 5px');
        th.innerText = t;
        tr.appendChild(th);
      });
      thead.appendChild(tr);
    } else {
      arr.forEach(t => {
        let td = document.createElement('td');
        td.setAttribute('style', 'border:1px solid #000;padding:2px 5px');
        td.innerText = t;
        tr.appendChild(td);
      });
      tbody.appendChild(tr);
    }
  });
  dom.appendChild(table);
}
export function downLoadExcel() {
  if (datas.length) {
    let workBook = new ExcelJS.Workbook();
    // 新建表格
    let worksheet = workBook.addWorksheet('Sheet1', {
      pageSetup: { paperSize: 9, orientation: 'landscape' }, // 纸张大小和方向
      views: [
        // { state: 'split', xSplit: 2000, ySplit: 3000, topLeftCell: 'G10', activeCell: 'A1' }, // 分隔工作表
        // { state: 'frozen', xSplit: 1, ySplit: 1 }， // 创建一个冻结了第一行和第一列的工作表
      ],
    });
    let table = {
      name: 'Sheet1',
      ref: 'A1', // 表格的左上方单元格
      headerRow: true, // 在表格顶部显示标题
      style: {
        theme: 'TableStyleDark1',
        // showRowStripes: true, // 显示行条纹
        // showFirstColumn: true, // 突出显示第一列（粗体）
      },
      columns: datas[0].map(t => ({ name: t })),
      rows: datas.slice(1),
    };
    // 以table的形式添加数据
    worksheet.addTable(table);
    // const table = worksheet.getTable(name)
    // // 删除第二列
    // table.removeColumns(1, 1)
    // // 在索引 1 处插入新列（包含数据）
    // table.addColumn({ name: 'Letter' }, ['a', 'b', 'c', 'd'], 2)
    // table.commit() // 将表更改提交到工作表中

    // 为整列变换值
    // const newCol3Values = [1, 2, 3, 4, 5]
    // const newCol4Values = ['one', 'two', 'three', 'four', 'five']
    // worksheet.spliceColumns(1, 2, newCol3Values, newCol4Values)

    // 为新建表格添加数据
    // worksheet.columns = [
    //   { header: 'Id', key: 'id', width: 10 },
    //   { header: 'Name', key: 'name', width: 32 },
    //   { header: 'D.O.B.', key: 'dob', width: 10, outlineLevel: 1 },
    // ]
    // let row = worksheet.getRow(2)
    // row.height = 42.5 // 设置行高
    // // 使用列键按对象分配行值
    // row.values = {
    //   id: 13,
    //   name: 'Thing 1',
    //   dob: new Date(),
    // }
    // 使用数组分配行值
    // row.values = [1, 2, 3]
    // // 遍历行
    // row.eachCell(function (cell, colNumber) {
    //   console.log('Cell ' + colNumber + ' = ' + cell.value)
    // })

    // 假设data为要导出的数据数组，添加行
    // const data = [
    //   ['姓名', '年龄'],
    //   ['Alice', 20],
    //   ['Bob', 25],
    //   ['Charlie', 30],
    // ]
    // data.forEach((item) => {
    //   worksheet.addRow(item)
    // })

    // const dobCol = worksheet.getColumn(2)
    // // 遍历此列中的所有当前单元格，包括空单元格
    // dobCol.eachCell({ includeEmpty: true }, function (cell, rowNumber) {
    //   const headerStyle = {
    //     font: {
    //       name: 'Arial',
    //       size: 12,
    //       bold: true,
    //       color: { argb: '90e7f4' }, // 只支持16进制色值
    //     },
    //     fill: {
    //       type: 'pattern',
    //       pattern: 'solid',
    //       fgColor: { argb: 'FFFF00' },
    //     },
    //     alignment: {
    //       vertical: 'middle',
    //       horizontal: 'center',
    //     },
    //     border: {
    //       top: { style: 'thin', color: { argb: '000000' } },
    //       left: { style: 'thin', color: { argb: '000000' } },
    //       bottom: { style: 'thin', color: { argb: '000000' } },
    //       right: { style: 'thin', color: { argb: '000000' } },
    //     },
    //   }
    //   cell.style = headerStyle
    // })
    // // 添加一列新值
    // worksheet.getColumn(6).values = [1, 2, 3, 4, 5]
    // 通过键值对在当前最后一行后添加几行，使用列键
    // worksheet.addRow({ id: 1, name: 'John Doe', dob: new Date(1970, 1, 1) })
    // worksheet.removeRows(0, 2);
    // 通过键值对在位置1插入几行，每次插入都会下移现有行
    // worksheet.insertRow(1, { id: 1, name: 'John Doe', dob: new Date(1970, 1, 1) })
    // const cell = worksheet.getCell('C3')
    // // 修改/添加单个单元格
    // cell.value = new Date(1968, 5, 1)
    // console.log(cell.text)
    // worksheet.removeColumns(1, 1);
    // 合并单元格
    // worksheet.mergeCells('A4:B5')

    // 下载表格
    workBook.xlsx.writeBuffer().then(buffer => {
      const blob = new Blob([buffer], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'data.xlsx'; // 下载文件名
      link.click();
    });
  } else {
    ElMessage.error('请先导入excel文件');
  }
}
