import { createUniver, defaultTheme, LocaleType, merge } from '@univerjs/presets';
import { UniverSheetsCorePreset } from '@univerjs/presets/preset-sheets-core';
import UniverPresetSheetsCoreZhCN from '@univerjs/presets/preset-sheets-core/locales/zh-CN';
import sheetsCoreZhCN from '@univerjs/presets/preset-sheets-core/locales/zh-CN';
import '@univerjs/presets/lib/styles/preset-sheets-core.css';
import { ContentCanvasDraw } from './canvas';
import { ICommandService, IPermissionService, IUniverInstanceService } from '@univerjs/core';
import {
  AddRangeProtectionMutation,
  getSheetCommandTarget,
  RangeProtectionPermissionEditPoint,
  DeleteRangeProtectionMutation,
} from '@univerjs/sheets';
import { UNIVER_SHEET_PERMISSION_BACKGROUND } from '@univerjs/sheets-ui';
// 图片
import { UniverSheetsDrawingPreset } from '@univerjs/presets/preset-sheets-drawing';
import UniverPresetSheetsDrawingZhCN from '@univerjs/presets/preset-sheets-drawing/locales/zh-CN';
import '@univerjs/presets/lib/styles/preset-sheets-drawing.css';
// 筛选
import { UniverSheetsFilterPreset } from '@univerjs/presets/preset-sheets-filter';
import UniverPresetSheetsFilterZhCN from '@univerjs/presets/preset-sheets-filter/locales/zh-CN';
import '@univerjs/presets/lib/styles/preset-sheets-filter.css';
// 排序
import { UniverSheetsSortPreset } from '@univerjs/presets/preset-sheets-sort';
import SheetsSortZhCN from '@univerjs/presets/preset-sheets-sort/locales/zh-CN';
import '@univerjs/presets/lib/styles/preset-sheets-sort.css';
// 数据验证
import { UniverSheetsDataValidationPreset } from '@univerjs/presets/preset-sheets-data-validation';
import UniverPresetSheetsDataValidationZhCN from '@univerjs/presets/preset-sheets-data-validation/locales/zh-CN';
import '@univerjs/presets/lib/styles/preset-sheets-data-validation.css';
// 水印
import { UniverWatermarkPlugin } from '@univerjs/watermark';
import '@univerjs/watermark/facade';
// 查找替换
import { UniverSheetsFindReplacePreset } from '@univerjs/presets/preset-sheets-find-replace';
import UniverPresetSheetsFindReplaceZhCN from '@univerjs/presets/preset-sheets-find-replace/locales/zh-CN';
import '@univerjs/presets/lib/styles/preset-sheets-find-replace.css';

import {
  UniverSheetsConditionalFormattingPreset,
  CFTextOperator,
} from '@univerjs/presets/preset-sheets-conditional-formatting';
import UniverPresetSheetsConditionalFormattingZhCN from '@univerjs/presets/preset-sheets-conditional-formatting/locales/zh-CN';
import '@univerjs/presets/lib/styles/preset-sheets-conditional-formatting.css';
// 批注
import { UniverSheetsNotePreset } from '@univerjs/presets/preset-sheets-note';
import UniverPresetSheetsNoteZhCN from '@univerjs/presets/preset-sheets-note/locales/zh-CN';
import '@univerjs/presets/lib/styles/preset-sheets-note.css';

let header = [
    { title: '功能名称', width: 150 },
    { title: '所属环境', width: 110, permission: { permissionId: makeId(), ruleId: makeId() } },
    { title: '问题描述', width: 180 },
    { title: '问题截图', width: 110 },
    { title: '附加截图', width: 100, permission: { permissionId: makeId(), ruleId: makeId() } },
    { title: '优先级', width: 110, permission: { permissionId: makeId(), ruleId: makeId() } },
    { title: '阻断性', width: 110, permission: { permissionId: makeId(), ruleId: makeId() } },
    { title: '登记时间', width: 120 },
    { title: '复测时间', width: 120 },
    { title: '状态', width: 120, permission: { permissionId: makeId(), ruleId: makeId() } },
    { title: '备注', width: 150 },
  ],
  id = makeId(),
  cellData = [],
  columnData = [],
  workbookData = null,
  univer = null,
  highlight = null,
  alertDisposable = null,
  alertTime = null,
  disposeable = null,
  select = reactive({
    row: 0,
    col: 0,
    width: 0,
    height: 0,
  }),
  accessor = null,
  commandService = null,
  permissionService = null,
  unitId = null,
  subUnitId = null,
  richGrid = [],
  imgGrid = [],
  sheet = null,
  datas = null,
  events = [],
  univerAPI = null,
  gridHeight = 15.5;
export function initSheet(dom, d, emit) {
  return new Promise(resolve => {
    if (disposeable) {
      disposeable.dispose();
    }
    datas = d;
    ({ univer, univerAPI } = createUniver({
      locale: LocaleType.ZH_CN,
      locales: {
        [LocaleType.ZH_CN]: merge(
          UniverPresetSheetsCoreZhCN,
          UniverPresetSheetsDrawingZhCN,
          UniverPresetSheetsFilterZhCN,
          SheetsSortZhCN,
          UniverPresetSheetsDataValidationZhCN,
          UniverPresetSheetsFindReplaceZhCN,
          sheetsCoreZhCN,
          UniverPresetSheetsConditionalFormattingZhCN,
          UniverPresetSheetsNoteZhCN,
        ),
      },
      theme: defaultTheme,
      presets: [
        UniverSheetsCorePreset({
          footer: false,
          disableAutoFocus: false,
          container: dom,
          customComponents: new Set([UNIVER_SHEET_PERMISSION_BACKGROUND]),
          menu: {
            'sheet.command.numfmt.add.decimal.command': { hidden: true },
            'sheet.command.numfmt.subtract.decimal.command': { hidden: true },
            'sheet.menu.data-validation': { hidden: true },
            'sheet.command.add-range-protection-from-toolbar': { hidden: true },
            'sheet.command.numfmt.set.currency': { hidden: true },
            'sheet.command.numfmt.set.percent': { hidden: true },
            'sheet.command.smart-toggle-filter': { hidden: true },
            'sheet.contextMenu.permission': { hidden: true },
            'base-ui.operation.toggle-shortcut-panel': { hidden: true },
            'sheet.command.insert-float-image': { hidden: true },
            'slide.command.insert-float-image': { hidden: true },
            'sheet.command.paste-besides-border': { hidden: true },
            'sheet.command.paste-formula': { hidden: true },
            'sheet.command.paste-col-width': { hidden: true },
            'sheet.menu.cell-insert': { hidden: true },
            'sheet.menu.sheet-frozen': { hidden: true },
            'sheet.contextMenu.permission': { hidden: true },
            'sheet.menu.sheets-sort-ctx': { hidden: true },
            'sheet.menu.delete': { hidden: true },
            'sheet.operation.open.conditional.formatting.panel': { hidden: true },
          },
        }),
        UniverSheetsDrawingPreset(),
        UniverSheetsFilterPreset(),
        UniverSheetsSortPreset(),
        UniverSheetsDataValidationPreset(),
        UniverSheetsFindReplacePreset(),
        UniverSheetsConditionalFormattingPreset(),
        UniverSheetsNotePreset(),
      ],
      plugins: [
        [
          UniverWatermarkPlugin,
          {
            // 文本水印配置
            textWatermarkSettings: {
              content: 'bug',
              fontSize: 16,
              color: 'rgb(0,0,0)',
              bold: false,
              italic: false,
              direction: 'ltr',
              x: 60,
              y: 50,
              repeat: true,
              spacingX: 200,
              spacingY: 100,
              rotate: 30,
              opacity: 0.05,
            },
          },
        ],
      ],
    }));
    events.push(univer, univerAPI);

    workbookData = {
      id: makeId(),
      sheetOrder: [id],
      locale: 'zhCN',
      styles: {
        headerStyle: {
          fs: 14, // 字体大小
          bg: { rgb: '#f3f7ff78' }, // 背景颜色
          cl: { rgb: '#000' }, // 字体颜色
          ff: 'selfFont',
        },
        contentStyle: {
          fs: 12, // 字体大小
          cl: { rgb: '#000' }, // 字体颜色
        },
        contentStyleLeft: {
          fs: 12, // 字体大小
          cl: { rgb: 'rgb(9,92,211)' }, // 字体颜色
          ht: 1,
        },
        imgColStyle: {
          fs: 12,
        },
      },
      sheets: {
        [id]: {
          id: id,
          name: 'Sheet1',
          rowCount: 0, // 总行数，从 0 开始
          columnCount: 0, // 总列数，从 0 开始
          freeze: {
            startRow: 1,
            startColumn: 0,
            ySplit: 1,
            xSplit: 0,
          },
          rowHeader: {
            width: 0,
            hidden: 0,
          },
          columnHeader: {
            height: 20,
            hidden: 1,
          },
          mergeData: [],
          cellData: [], // 单元格内容
          // 行数据对象的数组
          rowData: [],
          columnData: [],
          gridlinesColor: '#a2a2a221',
        },
      },
      resources: [],
    };
    cellData = workbookData.sheets[id].cellData;
    columnData = workbookData.sheets[id].columnData;
    cellData[0] = header.reduce((all, now, i) => {
      columnData[i] = { w: now.width, s: { vt: 2, ht: 2, tb: 3 } };
      all[i] = {
        v: now.title,
        s: 'headerStyle',
      };
      return all;
    }, {});
    let row = datas.length,
      col = datas.length
        ? datas.reduce((all, now) => {
            all = now.length > header.length ? now.length : header.length;
            return all;
          }, 0)
        : header.length;
    updateData()
      .then(() => {
        workbookData.sheets[id].rowCount = row + 5;
        workbookData.sheets[id].columnCount = col;
        univerAPI.createWorkbook(workbookData);
        sheet = univerAPI.getActiveWorkbook().getActiveSheet();
        header.forEach((item, index) => {
          if (
            item.title === '优先级' ||
            item.title === '阻断性' ||
            item.title === '状态' ||
            item.title === '所属环境' ||
            item.title === '附加截图'
          ) {
            sheet
              .getRange(1, index, workbookData.sheets[id].rowCount, 1)
              .setBackground('#f3f7ff78');
          }
        });
        setFormate();
      })
      .then(() => {
        accessor = univer.__getInjector();
        commandService = accessor.get(ICommandService);
        ({ unitId, subUnitId } = getSheetCommandTarget(accessor.get(IUniverInstanceService)));
        toFreezeHeader();
        toFreezeImgColumn();
        makeAddEvent(emit, row, col);
      })
      .then(() => {
        resolve({ univerAPI, select });
      });
  });
}
// 更新数据
function updateData() {
  return new Promise(resolve => {
    datas.forEach((tar, index) => {
      let key = index + 1;
      cellData[key] = {};
      tar.forEach((item, i) => {
        switch (item.type) {
          case 'text':
            cellData[key][i] = {
              v: item.value,
              s: i == 2 ? 'contentStyleLeft' : 'contentStyle',
            };
            break;
          case 'img':
            imgGrid.push({
              src: item.value,
              row: key,
              col: i,
            });
            break;
          case 'rich':
            cellData[key][i] = {
              p: {
                body: {
                  dataStream: item.value, // 文档的文本内容，其中 \b 表示换行符，\r 表示回车符，\n 表示换行符
                  textRuns: [
                    {
                      st: 0,
                      ed: 1000,
                      ts: {
                        fs: 12,
                        cl: {
                          rgb: 'rgb(9,92,211)',
                        },
                      },
                    },
                  ],
                  paragraphs: item.value.split('').reduce((all, now, i) => {
                    if (now === '\r') {
                      all.push({
                        startIndex: i,
                        paragraphStyle: {
                          spaceAbove: { v: 0 },
                          lineSpacing: 0.5,
                          spaceBelow: { v: 0 },
                        },
                      });
                    }
                    return all;
                  }, []),
                },
              },
              s: i == 2 ? 'contentStyleLeft' : 'contentStyle',
            };
            richGrid.push({
              line: item.value.split('\r').length - 1,
              row: key,
              col: i,
            });
            break;
          case 'moreImg':
            cellData[key][i] = {
              v: item.value.length ? `${item.value.length}张图片` : '',
              custom: item.value,
              s: 'imgColStyle',
            };
            break;
        }
      });
    });
    resolve();
  });
}
// 冻结表头
function toFreezeHeader() {
  const ranges = [
    {
      startRow: 0,
      startColumn: 0,
      endRow: 0,
      endColumn: header.length - 1,
    },
  ];
  commandService.executeCommand(AddRangeProtectionMutation.id, {
    unitId,
    subUnitId,
    rules: [
      {
        permissionId: 'headerArea',
        unitType: 3,
        unitId,
        subUnitId,
        ranges,
        id: 'headerAreaId',
      },
    ],
  });
  permissionService = accessor.get(IPermissionService);
  permissionService.updatePermissionPoint(
    new RangeProtectionPermissionEditPoint(unitId, subUnitId, 'headerArea').id,
    false,
  );
  univerAPI.getPermission().setPermissionDialogVisible(false);
}
// 冻结列
function toFreezeImgColumn(col) {
  if (col) {
    tofreeze(header[col], col);
  } else {
    header.forEach((item, index) => {
      if (
        item.title === '优先级' ||
        item.title === '阻断性' ||
        item.title === '状态' ||
        item.title === '附加截图' ||
        item.title === '所属环境'
      ) {
        tofreeze(item, index);
      }
    });
  }

  function tofreeze(item, index) {
    const ranges = [
      {
        startRow: 1,
        startColumn: index,
        endRow: workbookData.sheets[id].rowCount,
        endColumn: index,
      },
    ];
    commandService.executeCommand(AddRangeProtectionMutation.id, {
      unitId,
      subUnitId,
      rules: [
        {
          permissionId: item.permission.permissionId,
          name: item.title,
          unitType: 3,
          unitId,
          subUnitId,
          ranges,
          id: item.permission.ruleId,
        },
      ],
    });
    permissionService.updatePermissionPoint(
      new RangeProtectionPermissionEditPoint(unitId, subUnitId, item.permission.permissionId).id,
      false,
    );
  }
}
// 设置监听
function makeAddEvent(emit, row, col) {
  resetAllListener();
  // 单元格被点击
  let a = univerAPI.addEvent(univerAPI.Event.CellClicked, params => {
    resetAllListener();
    let target = sheet.getRange(params.row, params.column, 1, 1);
    highlight = target.highlight();
    events.push(highlight);
    nextTick(() => {
      let val = header[params.column]?.title;
      if (select.row != params.row || select.col != params.column) {
        ({ width: select.width, height: select.height } = target.getCellRect());
        ({ row: select.row, column: select.col } = params);
        if (val && params.row) {
          if (val === '附加截图') {
            let list = cellData[params.row]?.[params.column]?.custom || [];
            alertDisposable = target.attachAlertPopup({
              title: '提示',
              message: list.length ? '再次点击查看列表' : '再次点击添加图片',
              type: 1,
            });
            alertTime = setTimeout(() => {
              // 稍后移除警告
              alertDisposable.dispose();
              clearTimeout(alertTime);
              alertDisposable = null;
              alertTime = null;
            }, 2000);
          } else if (val === '优先级' || val === '阻断性' || val === '状态' || val === '所属环境') {
            alertDisposable = target.attachAlertPopup({
              title: '提示',
              message: '再次点击展开下拉框',
              type: 1,
            });
            alertTime = setTimeout(() => {
              // 稍后移除警告
              alertDisposable.dispose();
              clearTimeout(alertTime);
              alertDisposable = null;
              alertTime = null;
            }, 2000);
          } else if (val === '问题描述') {
            let text = target.getDisplayValue();
            if (text) {
              target.createOrUpdateNote({
                note: text,
                width: 160,
                height: 100,
                show: true,
              });
            }
          }
        }
      } else {
        if (val && params.row) {
          if (val === '附加截图') {
            emit('xsheetShowImgs', select);
          } else if (val === '优先级' || val === '阻断性' || val === '状态' || val === '所属环境') {
            let dropList = [];
            switch (val) {
              case '所属环境':
                dropList = ['测试环境', '预发环境', '生产环境'];
                break;
              case '优先级':
              case '阻断性':
                dropList = ['高', '中', '低'];
                break;
              case '状态':
                dropList = ['待修复', '已修复待发版', '关闭', '需求如此'];
                break;
            }
            addDropDown(dropList, target);
          }
        }
      }
    });
  });
  // 单元格编辑时触发的事件
  let b = univerAPI.addEvent(univerAPI.Event.SheetValueChanged, params => {
    if (select.row) {
      let newData = Object.values(Object.values(params.payload.params.cellValue)[0])[0];
      if (newData.t && newData.t === 1) {
        let img = new Image();
        img.src = Object.values(newData.p.drawings)[0].source;
        img.onload = () => {
          if (img.width > img.height) {
            sheet.setRowHeight(select.row, (img.height / img.width) * 108); // 设置图片单元格所在行的行高
          } else {
            sheet.setColumnWidths(select.row, select.col, select.width); // 设置列宽
            sheet.setRowHeight(select.row, (img.width / img.height) * 108); // 设置图片单元格所在行的行高
          }
          toEmitData(emit);
        };
      } else if (newData.p?.body?.dataStream) {
        newData.p.body.textRuns = [
          {
            st: 0,
            ed: 1000,
            ts: {
              fs: 12,
              cl: {
                rgb: 'rgb(9,92,211)',
              },
            },
          },
        ];
        newData.p.body.paragraphs = newData.p?.body?.dataStream.split('').reduce((all, now, i) => {
          if (now === '\r') {
            all.push({
              startIndex: i,
              paragraphStyle: {
                spaceAbove: { v: 0 },
                lineSpacing: 0.5,
                spaceBelow: { v: 0 },
              },
            });
          }
          return all;
        }, []);
        newData.s = select.col == 2 ? 'contentStyleLeft' : 'contentStyle';
        let textArr = newData.p?.body?.dataStream.match(/\r/g);
        let height = gridHeight * textArr.length + 10;
        sheet.setRowHeight(select.row, height ? height : 30); // 设置行高
      } else {
        newData.s =
          select.col == 2
            ? {
                fs: 12, // 字体大小
                cl: { rgb: 'rgb(9,92,211)' }, // 字体颜色
                ht: 1,
              }
            : {
                fs: 12, // 字体大小
                cl: { rgb: '#000' }, // 字体颜色
                ht: 2,
              };
      }
    }
  });
  // 单元格编辑结束后触发的事件
  let c = univerAPI.addEvent(univerAPI.Event.SheetEditEnded, () => {
    toEmitData(emit);
  });
  // 生命周期变化时触发的事件
  let d = univerAPI.addEvent(univerAPI.Event.LifeCycleChanged, params => {
    if (params.stage === 3) {
      // 如果工作表已经有筛选器，则移除它并创建一个新的筛选器。
      let fRange = sheet.getRange(0, 0, row, col);
      let fFilter;
      if (fFilter) {
        sheet.getFilter().remove();
      }
      fFilter = fRange.createFilter();
      richGrid.forEach(item => {
        sheet.setRowHeight(item.row, gridHeight * item.line + 10); // 设置富文本单元格所在行的行高
      });
      imgGrid.forEach(item => {
        sheet
          .getRange(item.row, item.col, 1, 1)
          .insertCellImageAsync(item.src)
          .then(() => {
            let img = new Image();
            img.src = item.src;
            img.onload = () => {
              if (img.width > img.height) {
                sheet.setRowHeight(item.row, (img.height / img.width) * 109); // 设置图片单元格所在行的行高
              } else {
                sheet.setRowHeight(item.row, (img.width / img.height) * 107); // 设置图片单元格所在行的行高
              }
            };
          });
      });

      setTimeout(() => {
        emit('closeLoading');
      }, 300);
    }
  });
  let e = univerAPI.addEvent(univerAPI.Event.SheetNoteUpdate, params => {
    params.worksheet.getRange(params.row, params.col, 1, 1).setValue({
      v: params.note.note,
      s: 'contentStyleLeft',
    });
  });
  events.push(a, b, c, d, e);
}
export function resetAllListener() {
  if (highlight) {
    highlight.dispose();
    highlight = null;
  }
  if (disposeable) {
    disposeable.dispose();
    disposeable = null;
  }
  if (alertTime) {
    clearTimeout(alertTime);
    alertTime = null;
  }
  if (alertDisposable) {
    alertDisposable.dispose();
    alertDisposable = null;
  }
  sheet.getNotes().forEach(s => {
    const { row, col } = s;
    sheet.getRange(row, col).deleteNote();
  });
}
// 添加下拉框
function addDropDown(list, target) {
  univerAPI.registerComponent(
    'myPopup',
    h(
      defineAsyncComponent(() => import('./select.vue')),
      {
        list,
        onLiclick(tar) {
          toDeleteImgColumnFreeze(select.col).then(() => {
            target.setValue(tar);
            nextTick(() => {
              disposeable.dispose();
              toFreezeImgColumn(select.col);
            });
          });
        },
      },
    ),
    {
      framework: 'vue3',
    },
  );
  disposeable = target.attachPopup({
    componentKey: 'myPopup',
  });
  events.push(disposeable);
}
// 保存数据
function toEmitData(emit) {
  let end = Object.values(sheet.getSheet().getSnapshot().cellData)
    .slice(1)
    .reduce((all, now, i) => {
      let obj = undefined;
      Object.entries(now).forEach(tar => {
        if (tar[1].p || tar[1].v) {
          if (!obj) {
            obj = [];
          }
          if (tar[1].p) {
            if (tar[1].p?.drawingsOrder?.length) {
              obj[tar[0]] = {
                type: 'img',
                value: Object.values(tar[1].p.drawings)[0].source,
              };
            } else {
              obj[tar[0]] = { type: 'rich', value: tar[1].p.body.dataStream };
            }
          } else if (tar[1].v) {
            if (tar[1].custom) {
              obj[tar[0]] = { type: 'moreImg', value: toRaw(tar[1].custom) };
            } else {
              obj[tar[0]] = { type: 'text', value: tar[1].v };
            }
          }
        }
      });
      if (obj) {
        all[i] = obj;
      }
      return all;
    }, []);
  emit('saveData', toRaw(end));
}
// 生成随机id
function makeId() {
  let str = '1234567890qwertyuioplkjhgfdsazxcvbnmQWERTYUIOPLKJHGFDSAZXCVBNM';
  return Array.from({ length: Math.trunc(Math.random() * 5) + 5 }).reduce((all, now) => {
    let number = Math.floor(Math.random() * str.length);
    all += str[number];
    return all;
  }, '');
}
// 更改图片数量文字
export function changeText() {
  let length = datas[select.row - 1]?.[select.col].value.length;
  toDeleteImgColumnFreeze(select.col).then(() => {
    sheet.getRange(select.row, select.col, 1, 1).setValue(length ? `${length}张图片` : '');
    nextTick(() => {
      toFreezeImgColumn(select.col);
    });
  });
}
// 删除冻结
function toDeleteImgColumnFreeze(col) {
  return commandService.executeCommand(DeleteRangeProtectionMutation.id, {
    unitId,
    subUnitId,
    ruleIds: [header[col].permission.ruleId],
  });
}

export function disposeAll() {
  events.forEach(s => {
    s.dispose();
    s = null;
  });
  events = [];
}

// 添加下拉菜单形式的验证规则
function addDropSelect() {
  // const rule = univerAPI
  //   .newDataValidation()
  //   .requireValueInList(['Yes', 'No'], true, true)
  //   .build();
  // sheet.getRange('C7').setDataValidation(rule);
}
// 添加、删除行、列
export function OtherFn(type, row, col) {
  if (type === 'add') {
    sheet.insertRows(select.row, row);
    sheet.insertColumns(select.col, col);
  } else {
    if (row) {
      sheet.deleteRows(select.row, row);
    }
    if (col) {
      sheet.deleteColumns(select.col, col);
    }
  }
}

function setFormate() {
  // univerAPI.registerSheetMainExtension(unitId, new ContentCanvasDraw(sheet, datas));
  let rowCount = workbookData.sheets[id].rowCount;
  let range;
  header.forEach((item, index) => {
    switch (item.title) {
      case '优先级':
        range = sheet.getRange(1, index, rowCount, 1);
        [
          sheet
            .newConditionalFormattingRule()
            .whenTextEqualTo('低')
            .setBackground('#00FF0035')
            .setRanges([range.getRange()])
            .build(),
          sheet
            .newConditionalFormattingRule()
            .whenTextEqualTo('中')
            .setBackground('#FFFF0035')
            .setRanges([range.getRange()])
            .build(),
          sheet
            .newConditionalFormattingRule()
            .whenTextEqualTo('高')
            .setBackground('#FF000035')
            .setRanges([range.getRange()])
            .build(),
        ].forEach(rule => {
          sheet.addConditionalFormattingRule(rule);
        });
        break;
      case '阻断性':
        range = sheet.getRange(1, index, rowCount, 1);
        range.setFontWeight('bold');
        [
          sheet
            .newConditionalFormattingRule()
            .whenTextEqualTo('低')
            .setFontColor('#3aff00')
            .setRanges([range.getRange()])
            .build(),
          sheet
            .newConditionalFormattingRule()
            .whenTextEqualTo('中')
            .setFontColor('#9d00f0')
            .setRanges([range.getRange()])
            .build(),
          sheet
            .newConditionalFormattingRule()
            .whenTextEqualTo('高')
            .setFontColor('#FF0000')
            .setRanges([range.getRange()])
            .build(),
        ].forEach(rule => {
          sheet.addConditionalFormattingRule(rule);
        });
        break;
      case '状态':
        range = sheet.getRange(1, index, rowCount, 1);
        range.setFontWeight('bold');
        [
          sheet
            .newConditionalFormattingRule()
            .whenTextEqualTo('关闭')
            .setBackground('#00FF0035')
            .setRanges([range.getRange()])
            .build(),
          sheet
            .newConditionalFormattingRule()
            .whenTextEqualTo('已修复待发版')
            .setBackground('#FFFF0035')
            .setRanges([range.getRange()])
            .build(),
          sheet
            .newConditionalFormattingRule()
            .whenTextEqualTo('待修复')
            .setBackground('#FF000035')
            .setRanges([range.getRange()])
            .build(),
          sheet
            .newConditionalFormattingRule()
            .whenTextEqualTo('需求如此')
            .setBackground('#Fa900035')
            .setRanges([range.getRange()])
            .build(),
        ].forEach(rule => {
          sheet.addConditionalFormattingRule(rule);
        });
        break;
    }
  });
}
