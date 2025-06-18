<template>
  <div class="toGrid">
    <div class="page">
      <ul class="toolTip1">
        <h3>趋势图</h3>
        <li v-for="t in tooltipItems" :key="t.series">{{ t.series }}-{{ t.value }}</li>
      </ul>
      <div ref="container1"></div>
    </div>
    <div class="page">
      <div ref="container2"></div>
    </div>
    <div class="page">
      <div ref="container3"></div>
    </div>
    <div class="page">
      <div ref="container4"></div>
    </div>
    <div class="page">
      <div ref="container5"></div>
    </div>
    <div class="page">
      <div ref="container6"></div>
    </div>
    <div class="page">
      <div ref="container7"></div>
    </div>
  </div>
</template>
<script setup>
  import { Line, Bar, Funnel, Column, G2, addWaterWave, P, Pie } from '@antv/g2plot';
  

  let container1 = useTemplateRef('container1');
  let data = ref([]);
  let tooltipItems = ref([]);
  api.getMethod('/seceneOne').then(data => {
    let options = {
      // color: ['#d62728', '#2ca02c', '#000000', '#ff7f0e'],
      data: data,
      padding: [10, 5, 20, 25], // 图表的内边距，可以设置两边留白
      xField: 'Date', // x轴的字段
      yField: 'value', // y轴的字段
      seriesField: 'series', // 分组字段
      xAxis: {
        /*
          度量类型
          连续度量：linear: 线性度量  time：连续的时间度量
          分类度量：cat：分类度量  timeCat：时间分类度量
          */
        type: 'cat',
        range: [0, 1], // 表示在绘图范围内可用于绘制的范围，画布为0-1之间
        label: {
          autoRotate: false, // 是否自动旋转，默认为: true
          formatter: v => {
            return v.split('/').reverse().join('-');
          },
        },
        grid: {
          line: {
            style: {
              stroke: 'black', // 线的颜色
              lineWidth: 0, // 线宽
              lineDash: [0, 0], // 虚线配置，第一个值为虚线每个分段的长度，第二个值为分段间隔的距离。lineDash 设为[0,0]的效果为没有描边。
              strokeOpacity: 1, // 透明度
              shadowColor: 'black', // 阴影颜色
              shadowBlur: 0, // 高斯模糊系数
              shadowOffsetX: 0, // 阴影距图形的水平距离
              shadowOffsetY: 0, // 阴影距图形的垂直距离
              cursor: 'pointer', // 鼠标样式。同 css 的鼠标样式，默认 'default'。
            },
          },
        },
      },
      yAxis: {
        grid: {
          line: {
            style: {
              stroke: 'black', // 线的颜色
              lineWidth: 0.3, // 线宽
              lineDash: [0, 0], // 虚线配置，第一个值为虚线每个分段的长度，第二个值为分段间隔的距离。lineDash 设为[0,0]的效果为没有描边。
              strokeOpacity: 0.3, // 透明度
              shadowColor: 'black', // 阴影颜色
              shadowBlur: 0, // 高斯模糊系数
              shadowOffsetX: 0, // 阴影距图形的水平距离
              shadowOffsetY: 0, // 阴影距图形的垂直距离
              cursor: 'pointer', // 鼠标样式。同 css 的鼠标样式，默认 'default'。
            },
          },
        },
      },
      lineStyle: {
        // 设置绘图线的样式
        lineWidth: 1,
        lineDash: [4, 4], // 虚线配置，第一个值为虚线每个分段的长度，第二个值为分段间隔的距离。lineDash 设为[0,0]的效果为没有描边。
      },
      // area:{},
      // state: {
      //   // 设置 active 激活状态的样式
      //   active: {
      //     animate: { duration: 100, easing: 'easeLinear' },
      //     style: {
      //       lineWidth: 20,
      //       stroke: '#000',
      //     },
      //   },
      // },
      point: {
        // 折线数据点图形样式
        shape: 'circle',
        size: 2,
        style: () => {
          return {
            fillOpacity: 0, // 图形的填充透明度
            stroke: 'transparent', // 图形的描边
          };
        },
      },
      legend: false,
      smooth: true,
      tooltip: {
        showMarkers: false,
        follow: false,
        customContent: () => null,
      },
      theme: {
        geometries: {
          point: {
            circle: {
              active: {
                style: {
                  r: 4,
                  fillOpacity: 1,
                  stroke: '#f23333', // 描边颜色
                  lineWidth: 1,
                },
              },
            },
          },
        },
      },
      interactions: [{ type: 'marker-active' }, { type: 'brush' }], // 设置框选时的交互效果，brush：数据的范围过滤
    };
    let chart = new Line(container1.value, options);
    chart.render();
    // 初始化，默认激活
    const lastData = data[data.length - 1];
    const point = chart.chart.getXY(lastData);
    chart.chart.showTooltip(point); // 显示 point 坐标点对应的 tooltip
    tooltipItems.value = data.filter(d => d.Date === lastData.Date);
    chart.setState('active', tar => {
      // 判断节点或路径是否需要高亮
      // 返回 true 表示需要高亮，false 表示不需要高亮
      return tar.Date === lastData.Date;
    });

    // chart.on('plot:mouseleave', () => {
    //   chart.chart.hideTooltip();
    // });
    chart.on('tooltip:change', evt => {
      tooltipItems.value = evt.data.items.map(s => s.data);
      let elements = evt.view.geometries.find(s => s.type === 'point').elements; // 获取所有的图形元素
      elements.forEach(e => {
        // e.getModel() // 获取图形的上图渲染数据
        let model = e.getData(); // 获取图形的原始数据
        if (model.Date === tooltipItems.value[0].Date) {
          e.setState('active', true);
        } else {
          e.setState('active', false);
        }
      });
    });
    // chart.on('tooltip:show', ev => {})
    // chart.on('tooltip:hide', ev => {})
    /*
      element：所有的 geometry 的 element 都支持的事件前缀
      line: 折线图支持的前缀
      interval: 柱状图、直方图、饼图 等支持的事件前缀
      point：点图、气泡图等支持的前缀
      schema：k 线图、箱型图支持的事件前缀
      edeg: 边支持的前缀
      */
  });

  let container2 = useTemplateRef('container2');
  api.getMethod('/seceneTwo').then(data => {
    const bar = new Bar(container2.value, {
      data: data,
      autoFit: true,
      xField: 'count',
      yField: 'name',
      yAxis: false,
      xAxis: false,
      conversionTag: {
        /* 转化标签（一个单独的图表组件），适用于基础柱形图和基础条形图，转化率组件可以让用户关注到数据的变化比例
         size	number	-	转化率组件尺寸(柱形图为高，条形图为宽)
         spacing	number	-	组件和柱子间距
         offset	number	-	组件和轴线间距
         arrow	ArrowCfg | false	-	箭头形状配置，false 时不显示箭头
         text	TextCfg | false	-	文本配置、false 时不显示文本

         */
        spacing: 10,
        size: 80,
        arrow: {
          // 箭头样式
          headSize: 10, // 数值越大，箭头越尖
          style: { fill: '#a1F1FB' },
        },
        text: {
          // 箭头文字
          style: {
            fontSize: 12,
            fontWeight: 700,
          },
          formatter: (
            prev,
            next, // 自定义转化率计算
          ) => (data[0]?.count === 0 ? '0.00%' : `${((next / data[0]?.count) * 100)?.toFixed(2)}%`),
        },
      },
      tooltip: {
        showTitle: false,
        formatter: item => ({ name: item.name, value: format(item.count) }),
      },
      label: {
        content: item => {
          return `${item.name}：${format(item?.count)}`;
        },
        layout: [
          {
            type: 'adjust-color',
          },
        ],
      },
    });
    bar.render();
    const coord = bar.chart.getCoordinate(); // 获取坐标系，坐标系，Coordinate 是一个二维坐标系，用于将数据映射到画布上
    const xScale = bar.chart.getXScale(); // 获取 x 轴的度量
    /*
       cartesian / rect	笛卡尔坐标系，G2 默认的坐标系。	chart.coordinate('rect') 或 chart.coordinate('cartesian')
       polar	极坐标系。	chart.coordinate('polar')
       helix	螺旋坐标系，基于阿基米德螺旋线。	chart.coordinate('helix')
       theta	一种特殊的极坐标系，半径长度固定，仅仅将数据映射到角度，常用于饼图的绘制。
      */

    // 计算出每个bar左上角之间的间距
    // 归一化的坐标点，返回进行矩阵变换后的画布坐标
    /*
      度量 (Scale) 是一个非常重要的概念，用于定义数据的类型和展示方式，在下列方面起到重要的作用：
      生成坐标轴刻度值
      显示图例项
      格式化数据展示的文本
      */
    let firstMargin = coord.convert({ x: xScale.scale(data[0].name), y: 0 }).y;
    let barMargin =
      coord.convert({ x: xScale?.scale(data[1]?.name), y: 0 })?.y -
      coord.convert({ x: xScale?.scale(data[0]?.name), y: 0 })?.y;

    bar.on('conversion-tag-group:mouseenter', evt => {
      // console.log(evt.target?.get('origin'));
    });

    function format(number) {
      if (number >= 1e8) {
        return `${(number / 1e8).toFixed(2)}亿`;
      } else if (number >= 1e4 && number < 1e8) {
        return `${(number / 1e4).toFixed(2)}万`;
      }
      return number;
    }
  });

  let container3 = useTemplateRef('container3');
  setTimeout(() => {
    const data = [
      { stage: '简历投递数', count: 3511 },
      { stage: '简历评估通过数', count: 1024 },
      { stage: '终面通过数', count: 148 },
      { stage: 'offer 数', count: 119 },
      { stage: '入职数', count: 70 },
    ].map(d => ({ ...d, _count: 1 }));

    const plot = new Funnel(container3.value, {
      data: data,
      xField: 'stage',
      yField: '_count',
      legend: false,
      conversionTag: false, // 是否显示转化率标签
      dynamicHeight: true, // 动态高度
      label: {
        formatter: (text, item) => {
          return `${item._origin.stage} ${item._origin.count}`;
        },
      },
      tooltip: {
        customItems: items => {
          return items.map(d => ({ ...d, value: d.data.count }));
        },
      },
      funnelStyle: {
        stroke: '#fff',
        lineWidth: 3,
      },
    });

    // Step 3: 渲染图表
    plot.render();
    renderAnntations(plot, data);
    plot.chart.on('afterchangesize', () => {
      renderAnntations(plot, data);
    });
  });
  // 画线
  function renderAnntations(plot, data) {
    const coord = plot.chart.getCoordinate(); // 获取坐标系
    const elements = plot.chart.geometries.find(s => s.type === 'polygon').elements;
    const parsePoints = [];
    elements.forEach((ele, idx) => {
      const { points, nextPoints } = ele.shape.get('origin');
      if (nextPoints) {
        let start = { y: (points[1].y + points[2].y) / 2 }; // 计算第一个漏斗的中点y
        if (idx > 0) {
          start.x = parsePoints[idx - 1][1].x; // 取上一个漏斗的终点x
        } else {
          start.x = (points[2].x + points[1].x) / 2;
        }
        let end = {
          x: (nextPoints[2].x + nextPoints[1].x) / 2,
          y: (nextPoints[2].y + nextPoints[1].y) / 2,
        };
        parsePoints.push([start, end]); // 线的起点、终点
      }
    });
    let container = plot.chart.getLayer('fore').findById('annotation-group');

    if (!container) {
      container = plot.chart.getLayer('fore').addGroup({ id: 'annotation-group' });
    } else {
      container.clear();
    }
    parsePoints.forEach((point, idx) => {
      const p0 = coord.convert(point[0]);
      const p3 = coord.convert(point[1]);
      const path = [
        ['M', p0.x, p0.y],
        ['L', p0.x + 15, p0.y],
        ['L', p3.x + 15, p3.y - 2],
        ['L', p3.x, p3.y - 2],
      ];
      container.addShape('path', {
        attrs: {
          path,
          stroke: '#d3d3d3',
          lineWidth: 1,
        },
      });
      const fontSize = 10;
      const offset = 5;
      container.addShape('text', {
        attrs: {
          x: (path[0][1] + path[1][1]) / 2 + offset,
          y: (path[1][2] + path[2][2] + fontSize) / 2,
          text: `转化率：${formatter(data[idx + 1].count / data[idx].count)}`,
          fontSize: 10,
          fill: '#333',
        },
      });
    });
    plot.chart.render(true);
    function formatter(v) {
      return `${(v * 100).toFixed(2)}%`;
    }
  }

  let container4 = useTemplateRef('container4');
  setTimeout(() => {
    const CONVERSTION_RATE = 'conversion-rate';
    const data = [
      { stage: '简历投递数', count: 556834 },
      { stage: '简历评估通过数', count: 500000 },
      { stage: '终面通过数', count: 400000 },
      { stage: 'offer 数', count: 320000 },
      { stage: '入职数', count: 114000 },
    ];
    const columnPlot = new Column(container4.value, {
      data: transformData(data),
      xField: 'stage',
      yField: 'count',
      seriesField: 'stage',
      columnBackground: {},
      xAxis: false,
      yAxis: false,
      meta: {
        type: {
          alias: '类别',
          range: [0.07, 0.93],
        },
        sales: {
          alias: '销售额',
        },
      },
      label: false,
      legend: false,
      tooltip: {
        showTitle: false,
      },
      shape: 'link-funnel',
      padding: [25, 0, 0, 0],
      annotations: data.map(d => {
        return {
          type: 'text',
          position: [d['stage'], 'max'],
          content: d['count'],
          offsetY: -5,
          style: {
            textAlign: 'center',
            textBaseline: 'bottom',
            fontSize: 18,
          },
        };
      }),
      interactions: [
        {
          type: 'tooltip',
          cfg: {
            // 重新定义 tooltip 的触发时机，只有hover到 name='column'(实际柱子)的时候，才展示 tooltip
            start: [
              {
                trigger: 'column:mousemove',
                action: 'tooltip:show',
                throttle: { wait: 50, leading: true, trailing: false },
              },
              {
                trigger: 'column:touchmove',
                action: 'tooltip:show',
                throttle: { wait: 50, leading: true, trailing: false },
              },
            ],
            end: [
              { trigger: 'column:mouseleave', action: 'tooltip:hide' },
              { trigger: 'column:touchend', action: 'tooltip:hide' },
              { trigger: 'plot:leave', action: 'tooltip:hide' },
            ],
          },
        },
      ],
    });

    // 自定义 Shape
    G2.registerShape('interval', 'link-funnel', {
      draw(shapeInfo, container) {
        const attrs = {
          lineWidth: 0,
          fill: shapeInfo.color,
          stroke: shapeInfo.color,
          fillOpacity: 0.8,
        };

        const { points, nextPoints } = shapeInfo;
        let rectPath = getRectPath(points);
        rectPath = this.parsePath(rectPath);

        const group = container.addGroup();

        // 灰色背景
        group.addShape('path', {
          capture: false,
          attrs: {
            ...attrs,
            fill: '#fff',
            lineWidth: 1,
            path: this.parsePath([
              ['M', points[0].x, 0],
              ['L', points[0].x, 1],
              ['L', points[2].x, 1],
              ['L', points[2].x, 0],
            ]),
          },
        });
        const boxPath = this.parsePath([
          ['M', points[0].x, 0],
          ['L', points[0].x, 1],
          ['L', points[2].x, 1],
          ['L', points[2].x, 0],
          ['L', points[0].x, 0],
        ]);

        // 存在下一节点, 添加连接带
        if (nextPoints) {
          const linkPath = this.parsePath([
            ['M', points[2].x, points[2].y],
            ['L', points[3].x, points[3].y],
            ['L', nextPoints[0].x, nextPoints[0].y],
            ['L', nextPoints[1].x, nextPoints[1].y],
          ]);
          group.addShape('path', {
            capture: false,
            attrs: {
              ...attrs,
              // 设置透明度
              fillOpacity: 0.25,
              path: linkPath,
            },
          });
          const rate = shapeInfo.data[CONVERSTION_RATE];
          const point = this.parsePoint({
            x: points[3].x + (nextPoints[0].x - points[3].x) / 2,
            y: (nextPoints[1].y - nextPoints[0].y) / 2,
          });
          group.addShape('text', {
            attrs: {
              ...point,
              text: `${(rate * 100).toFixed(0)}%`,
              // 字体颜色
              fill: '#666',
              textAlign: 'center',
            },
          });
        }

        /** 水波 ---- */
        const centerX = (rectPath[0][1] + rectPath[2][1]) / 2;
        const centerY = (boxPath[0][2] + boxPath[1][2]) / 2;
        const height = boxPath[0][2] - boxPath[1][2];
        const r = 1 - (rectPath[0][2] - rectPath[1][2]) / height;
        // 1. 绘制一个波
        const waves = group.addGroup({
          name: 'waves',
        });
        const waveLength = 30; // 波的长度
        // 3. 波对应的 clip 裁剪形状
        const clipPath = waves.setClip({
          type: 'path',
          attrs: {
            path: boxPath,
          },
        });

        // 4. 绘制波形
        addWaterWave(
          centerX,
          centerY,
          r,
          2,
          { fill: attrs.fill, opacity: 0.8 },
          waves,
          clipPath,
          height,
          waveLength,
          undefined,
        );

        return group;
      },
    });
    columnPlot.render();
    // 添加转化率
    function transformData(datas) {
      return datas.reduce((result, d, idx) => {
        if (idx > 0) {
          result[idx - 1][CONVERSTION_RATE] =
            result[idx - 1]['count'] !== 0 ? d['count'] / result[idx - 1]['count'] : '∞';
        }
        result.push(d);
        return result;
      }, []);
    }
    function getRectPath(points) {
      const path = [];
      for (let i = 0; i < points.length; i++) {
        const point = points[i];
        if (point) {
          const action = i === 0 ? 'M' : 'L';
          path.push([action, point.x, point.y]);
        }
      }

      const first = points[0];
      path.push(['L', first.x, first.y]);
      path.push(['z']);
      return path;
    }
  });

  // 引入自定义扩展图表入口
  let container5 = useTemplateRef('container5');
  setTimeout(() => {
    const name = ['本期', '对比期'];
    const tooltipItemsName = ['本期留存', '本期流失', '对比期留存', '对比期流失'];
    const columnColor = [
      {
        transformed: '#3b89ff',
        'non-transformed': '#e1eeff',
        increased: '#e1eeff',
      },
      {
        transformed: '#4ccaa1',
        'non-transformed': '#defbf1',
        increased: '#defbf1',
      },
    ];
    const rawData = [
      { date: '2020-08-01', index: '投放点击用户数', type: '本期', value: 46893 },
      { date: '2020-08-01', index: '会场曝光用户数', type: '本期', value: 37896 },
      { date: '2020-08-01', index: '会场点击用户数', type: '本期', value: 34896 },
      { date: '2020-08-01', index: '权益领取用户数', type: '本期', value: 28896 },
      { date: '2020-08-01', index: '引导IUV', type: '本期', value: 14896 },
      { date: '2020-08-01', index: '引导成交用户数', type: '本期', value: 4755 },
      { date: '2020-07-06', index: '投放点击用户数', type: '对比期', value: 46893 },
      { date: '2020-07-06', index: '会场曝光用户数', type: '对比期', value: 37896 },
      { date: '2020-07-06', index: '会场点击用户数', type: '对比期', value: 34896 },
      { date: '2020-07-06', index: '权益领取用户数', type: '对比期', value: 28896 },
      { date: '2020-07-06', index: '引导IUV', type: '对比期', value: 36896 },
      { date: '2020-07-06', index: '引导成交用户数', type: '对比期', value: 34896 },
    ];
    function processData(rawData) {
      const res = [];
      [
        rawData.filter(({ type }) => type === '本期'),
        rawData.filter(({ type }) => type === '对比期'),
      ].forEach(data => {
        const len = data.length - 1;
        for (let idx = 0; idx < data.length; idx += 1) {
          const prevVal = data[idx === 0 ? 0 : idx - 1].value;
          const nextVal = data[idx === len ? len : idx + 1].value;
          const { date, index, value, type } = data[idx];
          res.push({
            index,
            value,
            type,
            date,
            flag: 'transformed',
          });
          const incFlag = value < nextVal;
          res.push({
            index,
            type,
            date,
            value: Math.max(prevVal - value, 0),
            flag: incFlag ? 'increased' : 'non-transformed',
            rate: incFlag ? (nextVal - value) / value : nextVal / value,
          });
        }
      });
      return res;
    }

    function getRectPath(points) {
      const path = [];
      for (let i = 0; i < points.length; i++) {
        const point = points[i];
        if (point) {
          const action = i === 0 ? 'M' : 'L';
          path.push([action, point.x, point.y]);
        }
      }

      const first = points[0];
      path.push(['L', first.x, first.y]);
      path.push(['z']);
      return path;
    }

    function getFillAttrs(cfg) {
      const defaultAttrs = {
        lineWidth: 0,
        fill: '#1890FF',
        fillOpacity: 0.85,
      };

      return {
        ...defaultAttrs,
        ...cfg.style,
        fill: cfg.color,
        stroke: cfg.color,
        fillOpacity: cfg.opacity,
      };
    }

    // 自定义 Shape
    G2.registerShape('interval', 'contrast-funnel', {
      draw(cfg, container) {
        const attrs = getFillAttrs(cfg);
        let rectPath = getRectPath(cfg.points);
        rectPath = this.parsePath(rectPath);

        const group = container.addGroup();
        group.addShape('path', {
          attrs: {
            ...attrs,
            path: rectPath,
          },
        });
        const { flag } = cfg.data;
        if (cfg.nextPoints && flag !== 'transformed') {
          let linkPath = [
            ['M', cfg.points[2].x, cfg.points[3].y],
            ['L', cfg.nextPoints[0].x, cfg.nextPoints[0].y],
          ];

          if (cfg.nextPoints[0].y === 0) {
            linkPath[1] = ['L', cfg.nextPoints[1].x, cfg.nextPoints[1].y];
          }
          linkPath = this.parsePath(linkPath);

          const [[, x1, y1], [, x2, y2]] = linkPath;
          group.addShape('path', {
            attrs: {
              path: linkPath,
              stroke: '#c5d0d9',
            },
          });
          const text = group.addShape('text', {
            attrs: {
              x: (x1 + x2) / 2,
              y: (y1 + y2) / 2,
              text: `${{ 'non-transformed': '▼转化率', increased: '▲增长率' }[flag]}${(cfg.data.rate * 100).toFixed(0)}%`,
              fill: { 'non-transformed': '#009f86', increased: '#ff4737' }[flag],
              textAlign: 'center',
              textBaseline: 'middle',
              fontSize: 14,
            },
            zIndex: 2,
          });
          const { x, y, width, height } = text.getBBox();
          group.addShape('rect', {
            attrs: {
              x,
              y,
              width,
              height,
              fill: 'white',
            },
            zIndex: 1,
          });
          text.toFront();
        }
        return group;
      },
    });

    function adaptor(params) {
      const { chart, options } = params;
      const { data, theme } = options;

      chart.data(data);
      chart.legend(false);
      chart.theme(Object.assign({}, theme || G2.getTheme(theme)));
      chart.scale('value', { nice: true });

      chart.facet('mirror', {
        fields: ['type'],
        spacing: ['12%', 0],
        transpose: true, // 镜像分面翻转
        showTitle: false,
        eachView: (view, facet) => {
          const idx = facet.columnIndex;
          // 关闭所有 axis
          view.axis(false);
          view.legend({
            custom: true,
            position: ['top-right', 'top-left'][idx],
            items: [
              {
                name: name[idx],
                marker: {
                  symbol: 'hyphen',
                  style: {
                    stroke: columnColor.map(c => c.transformed)[idx],
                  },
                },
              },
            ],
          });
          view
            .coordinate()
            .transpose()
            .scale(...(idx === 0 ? [-1, -1] : [1, -1]));
          view
            .interval()
            .adjust('stack')
            .position('index*value')
            .color('index*flag', (index, flag) => columnColor[idx][flag])
            .label('value*flag', (value, flag) => {
              if (flag !== 'transformed') return { content: '' };
              return {
                position: 'left',
                content: value.toLocaleString(),
                style: {
                  textAlign: ['end', 'start'][idx],
                  fill: '#fff',
                  shadowColor: '#212121',
                  shadowBlur: 5,
                },
              };
            })
            .shape('contrast-funnel');
        },
      });

      chart.tooltip({
        shared: true,
        title: item => {
          return `${item}`;
        },
        customItems: ([currSurplus, currLoss, compareSurplus, compareLoss]) => {
          const [currColor, completeColor] = columnColor;
          const [n1, n2, n3, n4] = tooltipItemsName;
          return [
            {
              marker: true,
              color: currColor.transformed,
              name: `${n1}(${currSurplus.data.date})`,
              value: Number(currSurplus.value).toLocaleString(),
            },
            {
              marker: true,
              color: currColor['non-transformed'],
              name: `${n2}(${currLoss.data.date})`,
              value: Number(currLoss.value).toLocaleString(),
            },
            {
              marker: true,
              color: completeColor.transformed,
              name: `${n3}(${compareSurplus.data.date})`,
              value: Number(compareSurplus.value).toLocaleString(),
            },
            {
              marker: true,
              color: completeColor['non-transformed'],
              name: `${n4}(${compareLoss.data.date})`,
              value: Number(compareLoss.value).toLocaleString(),
            },
          ];
        },
      });

      rawData
        .filter(({ type }) => type === '本期')
        .forEach(({ index }) => {
          chart.annotation().text({
            content: index,
            style: { textAlign: 'center', textBaseline: 'middle' },
            position: () => {
              const { y: cY, height: cHeight } = chart.coordinateBBox;
              const { y: vY, height: vHeight } = chart.views[0].coordinateBBox;
              const yScale = chart.views[0].getScaleByField('index');
              return ['50%', `${((vY - cY + vHeight * yScale.scale(index)) / cHeight) * 100}%`];
            },
          });
        });
      chart.removeInteraction('legend-filter'); // 移除图例过滤交互
    }
    const funnel = new P(container5.value, {}, adaptor, { data: processData(rawData) });
    funnel.render();
  });

  let container6 = useTemplateRef('container6');
  setTimeout(() => {
    const data = [
      { stage: '触达次数', times: 789, uv: 1000, conversionUV: 0 },
      { stage: '响应次数', times: 453, uv: 800, conversionUV: 600 },
      { stage: '分享次数', times: 193, uv: 600, conversionUV: 200 },
    ];

    const funnelPlot = new Funnel(container6.value, {
      data: data,
      xField: 'stage',
      yField: 'times',
      legend: false,
      conversionTag: false,
      interactions: [
        {
          type: 'element-active',
        },
      ],
      tooltip: {
        follow: true,
        enterable: true,
        offset: 5,
        customContent: (value, items) => {
          if (!items || items.length <= 0) return;
          const { data: itemData } = items[0];

          return (
            `<div class='container'>` +
            `<div class='box' style='border-right: 1px solid #c2c2c2'>` +
            `<div class='title'>转化</div>` +
            `<div class='tooltip-item'><span>转化人数</span><span>${itemData.conversionUV}</span></div>` +
            `<div class='tooltip-item'><span>转化率</span><span>${(
              (itemData.conversionUV / itemData.uv) *
              100
            ).toFixed(0)}%</span></div>` +
            `<a class='link'>查看转化详情</a>` +
            `</div>` +
            `<div class='box'>` +
            `<div class='title'>未转化</div>` +
            `<div class='tooltip-item'><span>未转化人数</span><span>${itemData.uv - itemData.conversionUV}</span></div>` +
            `<div class='tooltip-item'><span>未转化率</span><span>${(
              (1 - itemData.conversionUV / itemData.uv) *
              100
            ).toFixed(0)}%</span></div>` +
            `<a class='link'>查看未转化详情</a>` +
            `</div>` +
            `</div>`
          );
        },
      },
    });
    funnelPlot.render();
  });

  let container7 = useTemplateRef('container7');
  setTimeout(() => {
    const data = [
      { type: '分类一', value: 27 },
      { type: '分类二', value: 25 },
      { type: '分类三', value: 18 },
      { type: '分类四', value: 15 },
      { type: '分类五', value: 10 },
      { type: '其他', value: 5 },
    ];

    const piePlot = new Pie(container7.value, {
      appendPadding: 10,
      data,
      angleField: 'value',
      colorField: 'type',
      radius: 1,
      innerRadius: 0.64,
      meta: {
        value: {
          formatter: v => `¥ ${v}`,
        },
      },
      label: {
        type: 'inner',
        offset: '-50%',
        autoRotate: false,
        style: { textAlign: 'center' },
        formatter: ({ percent }) => `${(percent * 100).toFixed(0)}%`,
      },
      statistic: {
        title: {
          offsetY: -8,
        },
        content: {
          offsetY: -4,
        },
      },
      // 添加 中心统计文本 交互
      interactions: [
        { type: 'element-selected' },
        { type: 'element-active' },
        {
          type: 'pie-statistic-active',
          cfg: {
            start: [
              { trigger: 'element:mouseenter', action: 'pie-statistic:change' },
              { trigger: 'legend-item:mouseenter', action: 'pie-statistic:change' },
            ],
            end: [
              { trigger: 'element:mouseleave', action: 'pie-statistic:reset' },
              { trigger: 'legend-item:mouseleave', action: 'pie-statistic:reset' },
            ],
          },
        },
      ],
    });

    piePlot.render();
  });
</script>
<style lang="scss" scoped>
  .page {
    position: relative;
    .toolTip1 {
      display: inline-block;
      background: white;
      list-style-type: none;
      z-index: 2;
      position: absolute;
      top: 0;
      right: 0;
      display: flex;
      li {
        margin-left: 10px;
        width: 100px;
      }
    }
  }
  :global(.container) {
    margin: 16px -8px;
    display: flex;
  }

  :global(.box) {
    padding: 0px 16px;
  }
  :global(.title) {
    font-weight: bold;
  }
  :global(.tooltip-item) {
    margin-top: 12px;
    display: flex;
    width: 120px;
    justify-content: space-between;
  }
  :global(.link) {
    display: inline-block;
    margin-top: 12px;
    color: #5b8ff9;
    text-decoration: none;
    cursor: pointer;
  }
  :global(.link:hover) {
    color: #5d7092;
  }
</style>
