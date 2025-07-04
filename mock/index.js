let types = ['待修复', '已修复待发版', '关闭', '需求如此'];
let num = Math.floor(Math.random() * types.length);
let arr = [
  {
    type: 'elementPlus',
    title: 'elementPlus',
  },
  {
    type: 'vueLearn',
    title: 'vue学习',
  },
  {
    type: 'other',
    title: '其他',
  },
  {
    type: 'indexDB',
    title: 'indexDB使用',
  },
  {
    type: 'g2plot',
    title: '场景',
  },
  {
    type: 'digital',
    title: '计算机图形学',
  },
];
export default [
  {
    url: '/seceneTwo',
    method: 'get',
    response: [
      {
        name: '曝光',
        count: 120000000,
        hints: [
          {
            message: '曝光率过低',
          },
        ],
      },
      {
        name: '点击',
        count: 80000000,
      },
      {
        name: '承接访问页',
        count: 60000000,
      },
      {
        name: '承接点击页',
        count: 40000000,
        hints: [
          {
            message: '最终转化率过低，请关注表单提交成功率',
          },
        ],
      },
      {
        name: '最终转化量',
        count: 2000000,
      },
    ],
  },
  {
    url: '/seceneOne',
    method: 'get',
    response: [
      {
        Date: '3/8/2020',
        series: 'USA',
        value: 0,
      },
      {
        Date: '3/8/2020',
        series: 'California',
        value: 0,
      },
      {
        Date: '3/8/2020',
        series: 'BA9C',
        value: 0,
      },
      {
        Date: '3/8/2020',
        series: 'Marin',
        value: 0,
      },
      {
        Date: '3/9/2020',
        series: 'USA',
        value: 0,
      },
      {
        Date: '3/9/2020',
        series: 'California',
        value: 0,
      },
      {
        Date: '3/9/2020',
        series: 'BA9C',
        value: 0,
      },
      {
        Date: '3/9/2020',
        series: 'Marin',
        value: 0,
      },
      {
        Date: '3/10/2020',
        series: 'USA',
        value: 0.1,
      },
      {
        Date: '3/10/2020',
        series: 'California',
        value: 0,
      },
      {
        Date: '3/10/2020',
        series: 'BA9C',
        value: 0.2,
      },
      {
        Date: '3/10/2020',
        series: 'Marin',
        value: 0.1,
      },
      {
        Date: '3/11/2020',
        series: 'USA',
        value: 0.1,
      },
      {
        Date: '3/11/2020',
        series: 'California',
        value: 0,
      },
      {
        Date: '3/11/2020',
        series: 'BA9C',
        value: 0.1,
      },
      {
        Date: '3/11/2020',
        series: 'Marin',
        value: 0.1,
      },
      {
        Date: '3/12/2020',
        series: 'USA',
        value: 0.1,
      },
      {
        Date: '3/12/2020',
        series: 'California',
        value: 0,
      },
      {
        Date: '3/12/2020',
        series: 'BA9C',
        value: 0.1,
      },
      {
        Date: '3/12/2020',
        series: 'Marin',
        value: 0.1,
      },
      {
        Date: '3/13/2020',
        series: 'USA',
        value: 0.1,
      },
      {
        Date: '3/13/2020',
        series: 'California',
        value: 0.1,
      },
      {
        Date: '3/13/2020',
        series: 'BA9C',
        value: 0.2,
      },
      {
        Date: '3/13/2020',
        series: 'Marin',
        value: 0.1,
      },
      {
        Date: '3/14/2020',
        series: 'USA',
        value: 0.2,
      },
      {
        Date: '3/14/2020',
        series: 'California',
        value: 0.1,
      },
      {
        Date: '3/14/2020',
        series: 'BA9C',
        value: 0.2,
      },
      {
        Date: '3/14/2020',
        series: 'Marin',
        value: 0.1,
      },
      {
        Date: '3/15/2020',
        series: 'USA',
        value: 0.2,
      },
      {
        Date: '3/15/2020',
        series: 'California',
        value: 0.1,
      },
      {
        Date: '3/15/2020',
        series: 'BA9C',
        value: 0.3,
      },
      {
        Date: '3/15/2020',
        series: 'Marin',
        value: 0.2,
      },
      {
        Date: '3/16/2020',
        series: 'USA',
        value: 0.3,
      },
      {
        Date: '3/16/2020',
        series: 'California',
        value: 0.1,
      },
      {
        Date: '3/16/2020',
        series: 'BA9C',
        value: 0.4,
      },
      {
        Date: '3/16/2020',
        series: 'Marin',
        value: 0.5,
      },
      {
        Date: '3/17/2020',
        series: 'USA',
        value: 0.4,
      },
      {
        Date: '3/17/2020',
        series: 'California',
        value: 0.1,
      },
      {
        Date: '3/17/2020',
        series: 'BA9C',
        value: 0.5,
      },
      {
        Date: '3/17/2020',
        series: 'Marin',
        value: 0.8,
      },
      {
        Date: '3/18/2020',
        series: 'USA',
        value: 0.5,
      },
      {
        Date: '3/18/2020',
        series: 'California',
        value: 0.1,
      },
      {
        Date: '3/18/2020',
        series: 'BA9C',
        value: 0.6,
      },
      {
        Date: '3/18/2020',
        series: 'Marin',
        value: 0.7,
      },
      {
        Date: '3/19/2020',
        series: 'USA',
        value: 0.6,
      },
      {
        Date: '3/19/2020',
        series: 'California',
        value: 0.2,
      },
      {
        Date: '3/19/2020',
        series: 'BA9C',
        value: 0.7,
      },
      {
        Date: '3/19/2020',
        series: 'Marin',
        value: 1.3,
      },
      {
        Date: '3/20/2020',
        series: 'USA',
        value: 0.8,
      },
      {
        Date: '3/20/2020',
        series: 'California',
        value: 0.3,
      },
      {
        Date: '3/20/2020',
        series: 'BA9C',
        value: 0.7,
      },
      {
        Date: '3/20/2020',
        series: 'Marin',
        value: 2,
      },
      {
        Date: '3/21/2020',
        series: 'USA',
        value: 1.1,
      },
      {
        Date: '3/21/2020',
        series: 'California',
        value: 0.3,
      },
      {
        Date: '3/21/2020',
        series: 'BA9C',
        value: 0.9,
      },
      {
        Date: '3/21/2020',
        series: 'Marin',
        value: 2,
      },
      {
        Date: '3/22/2020',
        series: 'USA',
        value: 1.4,
      },
      {
        Date: '3/22/2020',
        series: 'California',
        value: 0.4,
      },
      {
        Date: '3/22/2020',
        series: 'BA9C',
        value: 1.1,
      },
      {
        Date: '3/22/2020',
        series: 'Marin',
        value: 1.9,
      },
      {
        Date: '3/23/2020',
        series: 'USA',
        value: 1.8,
      },
      {
        Date: '3/23/2020',
        series: 'California',
        value: 0.5,
      },
      {
        Date: '3/23/2020',
        series: 'BA9C',
        value: 1.2,
      },
      {
        Date: '3/23/2020',
        series: 'Marin',
        value: 2.2,
      },
      {
        Date: '3/24/2020',
        series: 'USA',
        value: 2.1,
      },
      {
        Date: '3/24/2020',
        series: 'California',
        value: 0.6,
      },
      {
        Date: '3/24/2020',
        series: 'BA9C',
        value: 1.3,
      },
      {
        Date: '3/24/2020',
        series: 'Marin',
        value: 2.2,
      },
      {
        Date: '3/25/2020',
        series: 'USA',
        value: 2.5,
      },
      {
        Date: '3/25/2020',
        series: 'California',
        value: 0.7,
      },
      {
        Date: '3/25/2020',
        series: 'BA9C',
        value: 1.5,
      },
      {
        Date: '3/25/2020',
        series: 'Marin',
        value: 2.6,
      },
      {
        Date: '3/26/2020',
        series: 'USA',
        value: 3,
      },
      {
        Date: '3/26/2020',
        series: 'California',
        value: 0.7,
      },
      {
        Date: '3/26/2020',
        series: 'BA9C',
        value: 1.9,
      },
      {
        Date: '3/26/2020',
        series: 'Marin',
        value: 2,
      },
      {
        Date: '3/27/2020',
        series: 'USA',
        value: 3.5,
      },
      {
        Date: '3/27/2020',
        series: 'California',
        value: 1,
      },
      {
        Date: '3/27/2020',
        series: 'BA9C',
        value: 2.2,
      },
      {
        Date: '3/27/2020',
        series: 'Marin',
        value: 1.5,
      },
      {
        Date: '3/28/2020',
        series: 'USA',
        value: 4,
      },
      {
        Date: '3/28/2020',
        series: 'California',
        value: 1.2,
      },
      {
        Date: '3/28/2020',
        series: 'BA9C',
        value: 2.2,
      },
      {
        Date: '3/28/2020',
        series: 'Marin',
        value: 1.7,
      },
      {
        Date: '3/29/2020',
        series: 'USA',
        value: 4.3,
      },
      {
        Date: '3/29/2020',
        series: 'California',
        value: 1.1,
      },
      {
        Date: '3/29/2020',
        series: 'BA9C',
        value: 2.2,
      },
      {
        Date: '3/29/2020',
        series: 'Marin',
        value: 2,
      },
      {
        Date: '3/30/2020',
        series: 'USA',
        value: 4.8,
      },
      {
        Date: '3/30/2020',
        series: 'California',
        value: 1.4,
      },
      {
        Date: '3/30/2020',
        series: 'BA9C',
        value: 2.6,
      },
      {
        Date: '3/30/2020',
        series: 'Marin',
        value: 2.6,
      },
      {
        Date: '3/31/2020',
        series: 'USA',
        value: 5.3,
      },
      {
        Date: '3/31/2020',
        series: 'California',
        value: 1.6,
      },
      {
        Date: '3/31/2020',
        series: 'BA9C',
        value: 2.7,
      },
      {
        Date: '3/31/2020',
        series: 'Marin',
        value: 2.6,
      },
      {
        Date: '4/1/2020',
        series: 'USA',
        value: 5.7,
      },
      {
        Date: '4/1/2020',
        series: 'California',
        value: 1.9,
      },
      {
        Date: '4/1/2020',
        series: 'BA9C',
        value: 3,
      },
      {
        Date: '4/1/2020',
        series: 'Marin',
        value: 2.7,
      },
      {
        Date: '4/2/2020',
        series: 'USA',
        value: 6.1,
      },
      {
        Date: '4/2/2020',
        series: 'California',
        value: 2,
      },
      {
        Date: '4/2/2020',
        series: 'BA9C',
        value: 2.9,
      },
      {
        Date: '4/2/2020',
        series: 'Marin',
        value: 2.7,
      },
      {
        Date: '4/3/2020',
        series: 'USA',
        value: 6.6,
      },
      {
        Date: '4/3/2020',
        series: 'California',
        value: 2.2,
      },
      {
        Date: '4/3/2020',
        series: 'BA9C',
        value: 3,
      },
      {
        Date: '4/3/2020',
        series: 'Marin',
        value: 3,
      },
      {
        Date: '4/4/2020',
        series: 'USA',
        value: 7.2,
      },
      {
        Date: '4/4/2020',
        series: 'California',
        value: 2.7,
      },
      {
        Date: '4/4/2020',
        series: 'BA9C',
        value: 3.4,
      },
      {
        Date: '4/4/2020',
        series: 'Marin',
        value: 3.6,
      },
      {
        Date: '4/5/2020',
        series: 'USA',
        value: 7.4,
      },
      {
        Date: '4/5/2020',
        series: 'California',
        value: 2.8,
      },
      {
        Date: '4/5/2020',
        series: 'BA9C',
        value: 3.5,
      },
      {
        Date: '4/5/2020',
        series: 'Marin',
        value: 3.6,
      },
      {
        Date: '4/6/2020',
        series: 'USA',
        value: 7.5,
      },
      {
        Date: '4/6/2020',
        series: 'California',
        value: 2.7,
      },
      {
        Date: '4/6/2020',
        series: 'BA9C',
        value: 3.1,
      },
      {
        Date: '4/6/2020',
        series: 'Marin',
        value: 2.7,
      },
      {
        Date: '4/7/2020',
        series: 'USA',
        value: 7.7,
      },
      {
        Date: '4/7/2020',
        series: 'California',
        value: 2.9,
      },
      {
        Date: '4/7/2020',
        series: 'BA9C',
        value: 3.2,
      },
      {
        Date: '4/7/2020',
        series: 'Marin',
        value: 2.5,
      },
      {
        Date: '4/8/2020',
        series: 'USA',
        value: 7.9,
      },
      {
        Date: '4/8/2020',
        series: 'California',
        value: 2.9,
      },
      {
        Date: '4/8/2020',
        series: 'BA9C',
        value: 3.1,
      },
      {
        Date: '4/8/2020',
        series: 'Marin',
        value: 2.3,
      },
      {
        Date: '4/9/2020',
        series: 'USA',
        value: 8,
      },
      {
        Date: '4/9/2020',
        series: 'California',
        value: 2.8,
      },
      {
        Date: '4/9/2020',
        series: 'BA9C',
        value: 3.1,
      },
      {
        Date: '4/9/2020',
        series: 'Marin',
        value: 2.3,
      },
      {
        Date: '4/10/2020',
        series: 'USA',
        value: 8,
      },
      {
        Date: '4/10/2020',
        series: 'California',
        value: 2.8,
      },
      {
        Date: '4/10/2020',
        series: 'BA9C',
        value: 3,
      },
      {
        Date: '4/10/2020',
        series: 'Marin',
        value: 2,
      },
      {
        Date: '4/11/2020',
        series: 'USA',
        value: 8.3,
      },
      {
        Date: '4/11/2020',
        series: 'California',
        value: 2.7,
      },
      {
        Date: '4/11/2020',
        series: 'BA9C',
        value: 2.8,
      },
      {
        Date: '4/11/2020',
        series: 'Marin',
        value: 1.3,
      },
      {
        Date: '4/12/2020',
        series: 'USA',
        value: 8.2,
      },
      {
        Date: '4/12/2020',
        series: 'California',
        value: 2.8,
      },
      {
        Date: '4/12/2020',
        series: 'BA9C',
        value: 2.7,
      },
      {
        Date: '4/12/2020',
        series: 'Marin',
        value: 0.9,
      },
      {
        Date: '4/13/2020',
        series: 'USA',
        value: 8,
      },
      {
        Date: '4/13/2020',
        series: 'California',
        value: 2.4,
      },
      {
        Date: '4/13/2020',
        series: 'BA9C',
        value: 3,
      },
      {
        Date: '4/13/2020',
        series: 'Marin',
        value: 1.3,
      },
      {
        Date: '4/14/2020',
        series: 'USA',
        value: 7.8,
      },
      {
        Date: '4/14/2020',
        series: 'California',
        value: 2.4,
      },
      {
        Date: '4/14/2020',
        series: 'BA9C',
        value: 2.9,
      },
      {
        Date: '4/14/2020',
        series: 'Marin',
        value: 1.5,
      },
      {
        Date: '4/15/2020',
        series: 'USA',
        value: 7.5,
      },
      {
        Date: '4/15/2020',
        series: 'California',
        value: 2.3,
      },
      {
        Date: '4/15/2020',
        series: 'BA9C',
        value: 2.8,
      },
      {
        Date: '4/15/2020',
        series: 'Marin',
        value: 1.3,
      },
      {
        Date: '4/16/2020',
        series: 'USA',
        value: 7.4,
      },
      {
        Date: '4/16/2020',
        series: 'California',
        value: 2.5,
      },
      {
        Date: '4/16/2020',
        series: 'BA9C',
        value: 2.7,
      },
      {
        Date: '4/16/2020',
        series: 'Marin',
        value: 2,
      },
      {
        Date: '4/17/2020',
        series: 'USA',
        value: 7.5,
      },
      {
        Date: '4/17/2020',
        series: 'California',
        value: 2.6,
      },
      {
        Date: '4/17/2020',
        series: 'BA9C',
        value: 2.7,
      },
      {
        Date: '4/17/2020',
        series: 'Marin',
        value: 1.9,
      },
      {
        Date: '4/18/2020',
        series: 'USA',
        value: 7.5,
      },
      {
        Date: '4/18/2020',
        series: 'California',
        value: 2.7,
      },
      {
        Date: '4/18/2020',
        series: 'BA9C',
        value: 2.7,
      },
      {
        Date: '4/18/2020',
        series: 'Marin',
        value: 1.9,
      },
      {
        Date: '4/19/2020',
        series: 'USA',
        value: 7.6,
      },
      {
        Date: '4/19/2020',
        series: 'California',
        value: 3,
      },
      {
        Date: '4/19/2020',
        series: 'BA9C',
        value: 2.7,
      },
      {
        Date: '4/19/2020',
        series: 'Marin',
        value: 2,
      },
      {
        Date: '4/20/2020',
        series: 'USA',
        value: 7.6,
      },
      {
        Date: '4/20/2020',
        series: 'California',
        value: 2.8,
      },
      {
        Date: '4/20/2020',
        series: 'BA9C',
        value: 2.6,
      },
      {
        Date: '4/20/2020',
        series: 'Marin',
        value: 1.8,
      },
      {
        Date: '4/21/2020',
        series: 'USA',
        value: 7.4,
      },
      {
        Date: '4/21/2020',
        series: 'California',
        value: 3.3,
      },
      {
        Date: '4/21/2020',
        series: 'BA9C',
        value: 2.6,
      },
      {
        Date: '4/21/2020',
        series: 'Marin',
        value: 1.7,
      },
      {
        Date: '4/22/2020',
        series: 'USA',
        value: 7.3,
      },
      {
        Date: '4/22/2020',
        series: 'California',
        value: 3.4,
      },
      {
        Date: '4/22/2020',
        series: 'BA9C',
        value: 2.4,
      },
      {
        Date: '4/22/2020',
        series: 'Marin',
        value: 1.7,
      },
      {
        Date: '4/23/2020',
        series: 'USA',
        value: 7.3,
      },
      {
        Date: '4/23/2020',
        series: 'California',
        value: 3.7,
      },
      {
        Date: '4/23/2020',
        series: 'BA9C',
        value: 2.4,
      },
      {
        Date: '4/23/2020',
        series: 'Marin',
        value: 1.1,
      },
      {
        Date: '4/24/2020',
        series: 'USA',
        value: 7.6,
      },
      {
        Date: '4/24/2020',
        series: 'California',
        value: 3.8,
      },
      {
        Date: '4/24/2020',
        series: 'BA9C',
        value: 2.4,
      },
      {
        Date: '4/24/2020',
        series: 'Marin',
        value: 1.3,
      },
      {
        Date: '4/25/2020',
        series: 'USA',
        value: 8,
      },
      {
        Date: '4/25/2020',
        series: 'California',
        value: 4,
      },
      {
        Date: '4/25/2020',
        series: 'BA9C',
        value: 2.2,
      },
      {
        Date: '4/25/2020',
        series: 'Marin',
        value: 1.4,
      },
      {
        Date: '4/26/2020',
        series: 'USA',
        value: 8,
      },
      {
        Date: '4/26/2020',
        series: 'California',
        value: 4.1,
      },
      {
        Date: '4/26/2020',
        series: 'BA9C',
        value: 2.4,
      },
      {
        Date: '4/26/2020',
        series: 'Marin',
        value: 1.9,
      },
      {
        Date: '4/27/2020',
        series: 'USA',
        value: 7.9,
      },
      {
        Date: '4/27/2020',
        series: 'California',
        value: 3.8,
      },
      {
        Date: '4/27/2020',
        series: 'BA9C',
        value: 2.2,
      },
      {
        Date: '4/27/2020',
        series: 'Marin',
        value: 1.7,
      },
      {
        Date: '4/28/2020',
        series: 'USA',
        value: 7.7,
      },
      {
        Date: '4/28/2020',
        series: 'California',
        value: 3.6,
      },
      {
        Date: '4/28/2020',
        series: 'BA9C',
        value: 2.2,
      },
      {
        Date: '4/28/2020',
        series: 'Marin',
        value: 1.4,
      },
      {
        Date: '4/29/2020',
        series: 'USA',
        value: 7.4,
      },
      {
        Date: '4/29/2020',
        series: 'California',
        value: 3.4,
      },
      {
        Date: '4/29/2020',
        series: 'BA9C',
        value: 2.3,
      },
      {
        Date: '4/29/2020',
        series: 'Marin',
        value: 1.5,
      },
      {
        Date: '4/30/2020',
        series: 'USA',
        value: 7.3,
      },
      {
        Date: '4/30/2020',
        series: 'California',
        value: 3.6,
      },
      {
        Date: '4/30/2020',
        series: 'BA9C',
        value: 2.2,
      },
      {
        Date: '4/30/2020',
        series: 'Marin',
        value: 1.8,
      },
      {
        Date: '5/1/2020',
        series: 'USA',
        value: 7.2,
      },
      {
        Date: '5/1/2020',
        series: 'California',
        value: 3.5,
      },
      {
        Date: '5/1/2020',
        series: 'BA9C',
        value: 2.1,
      },
      {
        Date: '5/1/2020',
        series: 'Marin',
        value: 1.6,
      },
      {
        Date: '5/2/2020',
        series: 'USA',
        value: 7.2,
      },
      {
        Date: '5/2/2020',
        series: 'California',
        value: 3.7,
      },
      {
        Date: '5/2/2020',
        series: 'BA9C',
        value: 2.2,
      },
      {
        Date: '5/2/2020',
        series: 'Marin',
        value: 1.5,
      },
      {
        Date: '5/3/2020',
        series: 'USA',
        value: 7.4,
      },
      {
        Date: '5/3/2020',
        series: 'California',
        value: 3.8,
      },
      {
        Date: '5/3/2020',
        series: 'BA9C',
        value: 2.2,
      },
      {
        Date: '5/3/2020',
        series: 'Marin',
        value: 0.9,
      },
      {
        Date: '5/4/2020',
        series: 'USA',
        value: 7.2,
      },
      {
        Date: '5/4/2020',
        series: 'California',
        value: 3.7,
      },
      {
        Date: '5/4/2020',
        series: 'BA9C',
        value: 2.2,
      },
      {
        Date: '5/4/2020',
        series: 'Marin',
        value: 0.9,
      },
      {
        Date: '5/5/2020',
        series: 'USA',
        value: 7.1,
      },
      {
        Date: '5/5/2020',
        series: 'California',
        value: 3.6,
      },
      {
        Date: '5/5/2020',
        series: 'BA9C',
        value: 2.3,
      },
      {
        Date: '5/5/2020',
        series: 'Marin',
        value: 1,
      },
      {
        Date: '5/6/2020',
        series: 'USA',
        value: 6.9,
      },
      {
        Date: '5/6/2020',
        series: 'California',
        value: 3.7,
      },
      {
        Date: '5/6/2020',
        series: 'BA9C',
        value: 2.3,
      },
      {
        Date: '5/6/2020',
        series: 'Marin',
        value: 1,
      },
      {
        Date: '5/7/2020',
        series: 'USA',
        value: 6.6,
      },
      {
        Date: '5/7/2020',
        series: 'California',
        value: 3.8,
      },
      {
        Date: '5/7/2020',
        series: 'BA9C',
        value: 2.4,
      },
      {
        Date: '5/7/2020',
        series: 'Marin',
        value: 0.7,
      },
      {
        Date: '5/8/2020',
        series: 'USA',
        value: 6.5,
      },
      {
        Date: '5/8/2020',
        series: 'California',
        value: 3.8,
      },
      {
        Date: '5/8/2020',
        series: 'BA9C',
        value: 2.5,
      },
      {
        Date: '5/8/2020',
        series: 'Marin',
        value: 1,
      },
      {
        Date: '5/9/2020',
        series: 'USA',
        value: 6.5,
      },
      {
        Date: '5/9/2020',
        series: 'California',
        value: 4.1,
      },
      {
        Date: '5/9/2020',
        series: 'BA9C',
        value: 2.4,
      },
      {
        Date: '5/9/2020',
        series: 'Marin',
        value: 1,
      },
      {
        Date: '5/10/2020',
        series: 'USA',
        value: 6.4,
      },
      {
        Date: '5/10/2020',
        series: 'California',
        value: 4.4,
      },
      {
        Date: '5/10/2020',
        series: 'BA9C',
        value: 2.5,
      },
      {
        Date: '5/10/2020',
        series: 'Marin',
        value: 1.1,
      },
      {
        Date: '5/11/2020',
        series: 'USA',
        value: 6.3,
      },
      {
        Date: '5/11/2020',
        series: 'California',
        value: 4.4,
      },
      {
        Date: '5/11/2020',
        series: 'BA9C',
        value: 2.3,
      },
      {
        Date: '5/11/2020',
        series: 'Marin',
        value: 1.2,
      },
      {
        Date: '5/12/2020',
        series: 'USA',
        value: 6.2,
      },
      {
        Date: '5/12/2020',
        series: 'California',
        value: 3.9,
      },
      {
        Date: '5/12/2020',
        series: 'BA9C',
        value: 2.2,
      },
      {
        Date: '5/12/2020',
        series: 'Marin',
        value: 1.4,
      },
      {
        Date: '5/13/2020',
        series: 'USA',
        value: 5.9,
      },
      {
        Date: '5/13/2020',
        series: 'California',
        value: 3.9,
      },
      {
        Date: '5/13/2020',
        series: 'BA9C',
        value: 2.2,
      },
      {
        Date: '5/13/2020',
        series: 'Marin',
        value: 1.6,
      },
      {
        Date: '5/14/2020',
        series: 'USA',
        value: 5.9,
      },
      {
        Date: '5/14/2020',
        series: 'California',
        value: 4,
      },
      {
        Date: '5/14/2020',
        series: 'BA9C',
        value: 2,
      },
      {
        Date: '5/14/2020',
        series: 'Marin',
        value: 1.6,
      },
      {
        Date: '5/15/2020',
        series: 'USA',
        value: 5.9,
      },
      {
        Date: '5/15/2020',
        series: 'California',
        value: 3.8,
      },
      {
        Date: '5/15/2020',
        series: 'BA9C',
        value: 2.1,
      },
      {
        Date: '5/15/2020',
        series: 'Marin',
        value: 1.4,
      },
      {
        Date: '5/16/2020',
        series: 'USA',
        value: 6,
      },
      {
        Date: '5/16/2020',
        series: 'California',
        value: 3.8,
      },
      {
        Date: '5/16/2020',
        series: 'BA9C',
        value: 2.1,
      },
      {
        Date: '5/16/2020',
        series: 'Marin',
        value: 1.7,
      },
      {
        Date: '5/17/2020',
        series: 'USA',
        value: 6.1,
      },
      {
        Date: '5/17/2020',
        series: 'California',
        value: 4,
      },
      {
        Date: '5/17/2020',
        series: 'BA9C',
        value: 2.1,
      },
      {
        Date: '5/17/2020',
        series: 'Marin',
        value: 2.3,
      },
      {
        Date: '5/18/2020',
        series: 'USA',
        value: 6,
      },
      {
        Date: '5/18/2020',
        series: 'California',
        value: 4.1,
      },
      {
        Date: '5/18/2020',
        series: 'BA9C',
        value: 2.3,
      },
      {
        Date: '5/18/2020',
        series: 'Marin',
        value: 3.2,
      },
      {
        Date: '5/19/2020',
        series: 'USA',
        value: 6,
      },
      {
        Date: '5/19/2020',
        series: 'California',
        value: 4,
      },
      {
        Date: '5/19/2020',
        series: 'BA9C',
        value: 2.4,
      },
      {
        Date: '5/19/2020',
        series: 'Marin',
        value: 3.6,
      },
      {
        Date: '5/20/2020',
        series: 'USA',
        value: 5.8,
      },
      {
        Date: '5/20/2020',
        series: 'California',
        value: 4,
      },
      {
        Date: '5/20/2020',
        series: 'BA9C',
        value: 2.4,
      },
      {
        Date: '5/20/2020',
        series: 'Marin',
        value: 3.7,
      },
      {
        Date: '5/21/2020',
        series: 'USA',
        value: 5.8,
      },
      {
        Date: '5/21/2020',
        series: 'California',
        value: 4.2,
      },
      {
        Date: '5/21/2020',
        series: 'BA9C',
        value: 2.5,
      },
      {
        Date: '5/21/2020',
        series: 'Marin',
        value: 3.9,
      },
      {
        Date: '5/22/2020',
        series: 'USA',
        value: 5.8,
      },
      {
        Date: '5/22/2020',
        series: 'California',
        value: 4.3,
      },
      {
        Date: '5/22/2020',
        series: 'BA9C',
        value: 2.9,
      },
      {
        Date: '5/22/2020',
        series: 'Marin',
        value: 4.2,
      },
      {
        Date: '5/23/2020',
        series: 'USA',
        value: 5.9,
      },
      {
        Date: '5/23/2020',
        series: 'California',
        value: 4.4,
      },
      {
        Date: '5/23/2020',
        series: 'BA9C',
        value: 3,
      },
      {
        Date: '5/23/2020',
        series: 'Marin',
        value: 4.7,
      },
      {
        Date: '5/24/2020',
        series: 'USA',
        value: 5.8,
      },
      {
        Date: '5/24/2020',
        series: 'California',
        value: 4.6,
      },
      {
        Date: '5/24/2020',
        series: 'BA9C',
        value: 3.1,
      },
      {
        Date: '5/24/2020',
        series: 'Marin',
        value: 5.1,
      },
      {
        Date: '5/25/2020',
        series: 'USA',
        value: 5.8,
      },
      {
        Date: '5/25/2020',
        series: 'California',
        value: 4.7,
      },
      {
        Date: '5/25/2020',
        series: 'BA9C',
        value: 3,
      },
      {
        Date: '5/25/2020',
        series: 'Marin',
        value: 4.9,
      },
      {
        Date: '5/26/2020',
        series: 'USA',
        value: 5.6,
      },
      {
        Date: '5/26/2020',
        series: 'California',
        value: 4.7,
      },
      {
        Date: '5/26/2020',
        series: 'BA9C',
        value: 3.1,
      },
      {
        Date: '5/26/2020',
        series: 'Marin',
        value: 5,
      },
      {
        Date: '5/27/2020',
        series: 'USA',
        value: 5.2,
      },
      {
        Date: '5/27/2020',
        series: 'California',
        value: 4.7,
      },
      {
        Date: '5/27/2020',
        series: 'BA9C',
        value: 3.2,
      },
      {
        Date: '5/27/2020',
        series: 'Marin',
        value: 4.8,
      },
      {
        Date: '5/28/2020',
        series: 'USA',
        value: 5.2,
      },
      {
        Date: '5/28/2020',
        series: 'California',
        value: 4.9,
      },
      {
        Date: '5/28/2020',
        series: 'BA9C',
        value: 3.3,
      },
      {
        Date: '5/28/2020',
        series: 'Marin',
        value: 5,
      },
      {
        Date: '5/29/2020',
        series: 'USA',
        value: 5.2,
      },
      {
        Date: '5/29/2020',
        series: 'California',
        value: 4.9,
      },
      {
        Date: '5/29/2020',
        series: 'BA9C',
        value: 2.9,
      },
      {
        Date: '5/29/2020',
        series: 'Marin',
        value: 4.8,
      },
      {
        Date: '5/30/2020',
        series: 'USA',
        value: 5.4,
      },
      {
        Date: '5/30/2020',
        series: 'California',
        value: 5.3,
      },
      {
        Date: '5/30/2020',
        series: 'BA9C',
        value: 3,
      },
      {
        Date: '5/30/2020',
        series: 'Marin',
        value: 4.6,
      },
      {
        Date: '5/31/2020',
        series: 'USA',
        value: 5.5,
      },
      {
        Date: '5/31/2020',
        series: 'California',
        value: 5.9,
      },
      {
        Date: '5/31/2020',
        series: 'BA9C',
        value: 3,
      },
      {
        Date: '5/31/2020',
        series: 'Marin',
        value: 4.4,
      },
      {
        Date: '6/1/2020',
        series: 'USA',
        value: 5.7,
      },
      {
        Date: '6/1/2020',
        series: 'California',
        value: 6,
      },
      {
        Date: '6/1/2020',
        series: 'BA9C',
        value: 3.2,
      },
      {
        Date: '6/1/2020',
        series: 'Marin',
        value: 4.6,
      },
      {
        Date: '6/2/2020',
        series: 'USA',
        value: 5.7,
      },
      {
        Date: '6/2/2020',
        series: 'California',
        value: 6.1,
      },
      {
        Date: '6/2/2020',
        series: 'BA9C',
        value: 3,
      },
      {
        Date: '6/2/2020',
        series: 'Marin',
        value: 4.8,
      },
      {
        Date: '6/3/2020',
        series: 'USA',
        value: 5.6,
      },
      {
        Date: '6/3/2020',
        series: 'California',
        value: 5.9,
      },
      {
        Date: '6/3/2020',
        series: 'BA9C',
        value: 2.9,
      },
      {
        Date: '6/3/2020',
        series: 'Marin',
        value: 4.9,
      },
      {
        Date: '6/4/2020',
        series: 'USA',
        value: 5.5,
      },
      {
        Date: '6/4/2020',
        series: 'California',
        value: 5.9,
      },
      {
        Date: '6/4/2020',
        series: 'BA9C',
        value: 3,
      },
      {
        Date: '6/4/2020',
        series: 'Marin',
        value: 5.4,
      },
      {
        Date: '6/5/2020',
        series: 'USA',
        value: 5.5,
      },
      {
        Date: '6/5/2020',
        series: 'California',
        value: 5.9,
      },
      {
        Date: '6/5/2020',
        series: 'BA9C',
        value: 3.2,
      },
      {
        Date: '6/5/2020',
        series: 'Marin',
        value: 5.4,
      },
      {
        Date: '6/6/2020',
        series: 'USA',
        value: 5.5,
      },
      {
        Date: '6/6/2020',
        series: 'California',
        value: 5.7,
      },
      {
        Date: '6/6/2020',
        series: 'BA9C',
        value: 3.1,
      },
      {
        Date: '6/6/2020',
        series: 'Marin',
        value: 5.7,
      },
      {
        Date: '6/7/2020',
        series: 'USA',
        value: 5.4,
      },
      {
        Date: '6/7/2020',
        series: 'California',
        value: 5.9,
      },
      {
        Date: '6/7/2020',
        series: 'BA9C',
        value: 3.1,
      },
      {
        Date: '6/7/2020',
        series: 'Marin',
        value: 6,
      },
      {
        Date: '6/8/2020',
        series: 'USA',
        value: 5.3,
      },
      {
        Date: '6/8/2020',
        series: 'California',
        value: 5.9,
      },
      {
        Date: '6/8/2020',
        series: 'BA9C',
        value: 3.2,
      },
      {
        Date: '6/8/2020',
        series: 'Marin',
        value: 6,
      },
      {
        Date: '6/9/2020',
        series: 'USA',
        value: 5.2,
      },
      {
        Date: '6/9/2020',
        series: 'California',
        value: 5.9,
      },
      {
        Date: '6/9/2020',
        series: 'BA9C',
        value: 3.4,
      },
      {
        Date: '6/9/2020',
        series: 'Marin',
        value: 7.1,
      },
      {
        Date: '6/10/2020',
        series: 'USA',
        value: 5.2,
      },
      {
        Date: '6/10/2020',
        series: 'California',
        value: 6.1,
      },
      {
        Date: '6/10/2020',
        series: 'BA9C',
        value: 3.5,
      },
      {
        Date: '6/10/2020',
        series: 'Marin',
        value: 7.3,
      },
      {
        Date: '6/11/2020',
        series: 'USA',
        value: 5.2,
      },
      {
        Date: '6/11/2020',
        series: 'California',
        value: 6.1,
      },
      {
        Date: '6/11/2020',
        series: 'BA9C',
        value: 3.5,
      },
      {
        Date: '6/11/2020',
        series: 'Marin',
        value: 7.2,
      },
      {
        Date: '6/12/2020',
        series: 'USA',
        value: 5.2,
      },
      {
        Date: '6/12/2020',
        series: 'California',
        value: 5.9,
      },
      {
        Date: '6/12/2020',
        series: 'BA9C',
        value: 3.6,
      },
      {
        Date: '6/12/2020',
        series: 'Marin',
        value: 7.6,
      },
      {
        Date: '6/13/2020',
        series: 'USA',
        value: 5.5,
      },
      {
        Date: '6/13/2020',
        series: 'California',
        value: 6.2,
      },
      {
        Date: '6/13/2020',
        series: 'BA9C',
        value: 3.4,
      },
      {
        Date: '6/13/2020',
        series: 'Marin',
        value: 8,
      },
      {
        Date: '6/14/2020',
        series: 'USA',
        value: 5.6,
      },
      {
        Date: '6/14/2020',
        series: 'California',
        value: 6.5,
      },
      {
        Date: '6/14/2020',
        series: 'BA9C',
        value: 3.6,
      },
      {
        Date: '6/14/2020',
        series: 'Marin',
        value: 8.1,
      },
      {
        Date: '6/15/2020',
        series: 'USA',
        value: 5.7,
      },
      {
        Date: '6/15/2020',
        series: 'California',
        value: 6.7,
      },
      {
        Date: '6/15/2020',
        series: 'BA9C',
        value: 3.5,
      },
      {
        Date: '6/15/2020',
        series: 'Marin',
        value: 10.4,
      },
      {
        Date: '6/16/2020',
        series: 'USA',
        value: 5.8,
      },
      {
        Date: '6/16/2020',
        series: 'California',
        value: 6.4,
      },
      {
        Date: '6/16/2020',
        series: 'BA9C',
        value: 3.5,
      },
      {
        Date: '6/16/2020',
        series: 'Marin',
        value: 10.2,
      },
      {
        Date: '6/17/2020',
        series: 'USA',
        value: 5.9,
      },
      {
        Date: '6/17/2020',
        series: 'California',
        value: 6.6,
      },
      {
        Date: '6/17/2020',
        series: 'BA9C',
        value: 3.7,
      },
      {
        Date: '6/17/2020',
        series: 'Marin',
        value: 9.8,
      },
      {
        Date: '6/18/2020',
        series: 'USA',
        value: 6.1,
      },
      {
        Date: '6/18/2020',
        series: 'California',
        value: 7.1,
      },
      {
        Date: '6/18/2020',
        series: 'BA9C',
        value: 3.9,
      },
      {
        Date: '6/18/2020',
        series: 'Marin',
        value: 9.3,
      },
      {
        Date: '6/19/2020',
        series: 'USA',
        value: 6.3,
      },
      {
        Date: '6/19/2020',
        series: 'California',
        value: 7.3,
      },
      {
        Date: '6/19/2020',
        series: 'BA9C',
        value: 3.9,
      },
      {
        Date: '6/19/2020',
        series: 'Marin',
        value: 11.2,
      },
      {
        Date: '6/20/2020',
        series: 'USA',
        value: 6.8,
      },
      {
        Date: '6/20/2020',
        series: 'California',
        value: 7.6,
      },
      {
        Date: '6/20/2020',
        series: 'BA9C',
        value: 4.2,
      },
      {
        Date: '6/20/2020',
        series: 'Marin',
        value: 11.3,
      },
      {
        Date: '6/21/2020',
        series: 'USA',
        value: 7.2,
      },
      {
        Date: '6/21/2020',
        series: 'California',
        value: 8.3,
      },
      {
        Date: '6/21/2020',
        series: 'BA9C',
        value: 4,
      },
      {
        Date: '6/21/2020',
        series: 'Marin',
        value: 11.4,
      },
      {
        Date: '6/22/2020',
        series: 'USA',
        value: 7.4,
      },
      {
        Date: '6/22/2020',
        series: 'California',
        value: 9.1,
      },
      {
        Date: '6/22/2020',
        series: 'BA9C',
        value: 4.7,
      },
      {
        Date: '6/22/2020',
        series: 'Marin',
        value: 9.9,
      },
      {
        Date: '6/23/2020',
        series: 'USA',
        value: 7.8,
      },
      {
        Date: '6/23/2020',
        series: 'California',
        value: 9.7,
      },
      {
        Date: '6/23/2020',
        series: 'BA9C',
        value: 5.4,
      },
      {
        Date: '6/23/2020',
        series: 'Marin',
        value: 10.2,
      },
      {
        Date: '6/24/2020',
        series: 'USA',
        value: 8.3,
      },
      {
        Date: '6/24/2020',
        series: 'California',
        value: 10.8,
      },
      {
        Date: '6/24/2020',
        series: 'BA9C',
        value: 5.8,
      },
      {
        Date: '6/24/2020',
        series: 'Marin',
        value: 11.7,
      },
      {
        Date: '6/25/2020',
        series: 'USA',
        value: 8.7,
      },
      {
        Date: '6/25/2020',
        series: 'California',
        value: 11.2,
      },
      {
        Date: '6/25/2020',
        series: 'BA9C',
        value: 6.2,
      },
      {
        Date: '6/25/2020',
        series: 'Marin',
        value: 14.5,
      },
      {
        Date: '6/26/2020',
        series: 'USA',
        value: 9.3,
      },
      {
        Date: '6/26/2020',
        series: 'California',
        value: 11.6,
      },
      {
        Date: '6/26/2020',
        series: 'BA9C',
        value: 6.7,
      },
      {
        Date: '6/26/2020',
        series: 'Marin',
        value: 15.5,
      },
      {
        Date: '6/27/2020',
        series: 'USA',
        value: 9.9,
      },
      {
        Date: '6/27/2020',
        series: 'California',
        value: 12.1,
      },
      {
        Date: '6/27/2020',
        series: 'BA9C',
        value: 6.4,
      },
      {
        Date: '6/27/2020',
        series: 'Marin',
        value: 15.7,
      },
      {
        Date: '6/28/2020',
        series: 'USA',
        value: 10.5,
      },
      {
        Date: '6/28/2020',
        series: 'California',
        value: 12.3,
      },
      {
        Date: '6/28/2020',
        series: 'BA9C',
        value: 7.2,
      },
      {
        Date: '6/28/2020',
        series: 'Marin',
        value: 14.4,
      },
      {
        Date: '6/29/2020',
        series: 'USA',
        value: 10.8,
      },
      {
        Date: '6/29/2020',
        series: 'California',
        value: 12.4,
      },
      {
        Date: '6/29/2020',
        series: 'BA9C',
        value: 7.1,
      },
      {
        Date: '6/29/2020',
        series: 'Marin',
        value: 14.2,
      },
      {
        Date: '6/30/2020',
        series: 'USA',
        value: 11.1,
      },
      {
        Date: '6/30/2020',
        series: 'California',
        value: 12.1,
      },
      {
        Date: '6/30/2020',
        series: 'BA9C',
        value: 7.5,
      },
      {
        Date: '6/30/2020',
        series: 'Marin',
        value: 12.7,
      },
      {
        Date: '7/1/2020',
        series: 'USA',
        value: 11.6,
      },
      {
        Date: '7/1/2020',
        series: 'California',
        value: 13.8,
      },
      {
        Date: '7/1/2020',
        series: 'BA9C',
        value: 8.2,
      },
      {
        Date: '7/1/2020',
        series: 'Marin',
        value: 13.9,
      },
      {
        Date: '7/2/2020',
        series: 'USA',
        value: 12,
      },
      {
        Date: '7/2/2020',
        series: 'California',
        value: 14.7,
      },
      {
        Date: '7/2/2020',
        series: 'BA9C',
        value: 8.8,
      },
      {
        Date: '7/2/2020',
        series: 'Marin',
        value: 13.8,
      },
      {
        Date: '7/3/2020',
        series: 'USA',
        value: 12.5,
      },
      {
        Date: '7/3/2020',
        series: 'California',
        value: 15.5,
      },
      {
        Date: '7/3/2020',
        series: 'BA9C',
        value: 9.4,
      },
      {
        Date: '7/3/2020',
        series: 'Marin',
        value: 13.4,
      },
      {
        Date: '7/4/2020',
        series: 'USA',
        value: 13,
      },
      {
        Date: '7/4/2020',
        series: 'California',
        value: 16.1,
      },
      {
        Date: '7/4/2020',
        series: 'BA9C',
        value: 10.2,
      },
      {
        Date: '7/4/2020',
        series: 'Marin',
        value: 15.7,
      },
      {
        Date: '7/5/2020',
        series: 'USA',
        value: 13.3,
      },
      {
        Date: '7/5/2020',
        series: 'California',
        value: 16.2,
      },
      {
        Date: '7/5/2020',
        series: 'BA9C',
        value: 10.3,
      },
      {
        Date: '7/5/2020',
        series: 'Marin',
        value: 17,
      },
      {
        Date: '7/6/2020',
        series: 'USA',
        value: 13,
      },
      {
        Date: '7/6/2020',
        series: 'California',
        value: 18.1,
      },
      {
        Date: '7/6/2020',
        series: 'BA9C',
        value: 11.3,
      },
      {
        Date: '7/6/2020',
        series: 'Marin',
        value: 16.4,
      },
      {
        Date: '7/7/2020',
        series: 'USA',
        value: 13,
      },
      {
        Date: '7/7/2020',
        series: 'California',
        value: 16.7,
      },
      {
        Date: '7/7/2020',
        series: 'BA9C',
        value: 11,
      },
      {
        Date: '7/7/2020',
        series: 'Marin',
        value: 17.4,
      },
      {
        Date: '7/8/2020',
        series: 'USA',
        value: 13.4,
      },
      {
        Date: '7/8/2020',
        series: 'California',
        value: 18.3,
      },
      {
        Date: '7/8/2020',
        series: 'BA9C',
        value: 10.4,
      },
      {
        Date: '7/8/2020',
        series: 'Marin',
        value: 18.7,
      },
      {
        Date: '7/9/2020',
        series: 'USA',
        value: 13.7,
      },
      {
        Date: '7/9/2020',
        series: 'California',
        value: 17.9,
      },
      {
        Date: '7/9/2020',
        series: 'BA9C',
        value: 10.1,
      },
      {
        Date: '7/9/2020',
        series: 'Marin',
        value: 19.3,
      },
      {
        Date: '7/10/2020',
        series: 'USA',
        value: 14.2,
      },
      {
        Date: '7/10/2020',
        series: 'California',
        value: 18.4,
      },
      {
        Date: '7/10/2020',
        series: 'BA9C',
        value: 9.9,
      },
      {
        Date: '7/10/2020',
        series: 'Marin',
        value: 18.3,
      },
      {
        Date: '7/11/2020',
        series: 'USA',
        value: 15,
      },
      {
        Date: '7/11/2020',
        series: 'California',
        value: 19.4,
      },
      {
        Date: '7/11/2020',
        series: 'BA9C',
        value: 10.4,
      },
      {
        Date: '7/11/2020',
        series: 'Marin',
        value: 17.9,
      },
      {
        Date: '7/12/2020',
        series: 'USA',
        value: 15.8,
      },
      {
        Date: '7/12/2020',
        series: 'California',
        value: 18.2,
      },
      {
        Date: '7/12/2020',
        series: 'BA9C',
        value: 10.3,
      },
      {
        Date: '7/12/2020',
        series: 'Marin',
        value: 19.1,
      },
      {
        Date: '7/13/2020',
        series: 'USA',
        value: 16.1,
      },
      {
        Date: '7/13/2020',
        series: 'California',
        value: 19.1,
      },
      {
        Date: '7/13/2020',
        series: 'BA9C',
        value: 10.5,
      },
      {
        Date: '7/13/2020',
        series: 'Marin',
        value: 18.6,
      },
      {
        Date: '7/14/2020',
        series: 'USA',
        value: 16.1,
      },
      {
        Date: '7/14/2020',
        series: 'California',
        value: 17.5,
      },
      {
        Date: '7/14/2020',
        series: 'BA9C',
        value: 11.4,
      },
      {
        Date: '7/14/2020',
        series: 'Marin',
        value: 19.6,
      },
      {
        Date: '7/15/2020',
        series: 'USA',
        value: 16.4,
      },
      {
        Date: '7/15/2020',
        series: 'California',
        value: 19,
      },
      {
        Date: '7/15/2020',
        series: 'BA9C',
        value: 12.1,
      },
      {
        Date: '7/15/2020',
        series: 'Marin',
        value: 18.3,
      },
      {
        Date: '7/16/2020',
        series: 'USA',
        value: 16.5,
      },
      {
        Date: '7/16/2020',
        series: 'California',
        value: 19.2,
      },
      {
        Date: '7/16/2020',
        series: 'BA9C',
        value: 12.4,
      },
      {
        Date: '7/16/2020',
        series: 'Marin',
        value: 20.8,
      },
      {
        Date: '7/17/2020',
        series: 'USA',
        value: 17.1,
      },
      {
        Date: '7/17/2020',
        series: 'California',
        value: 20,
      },
      {
        Date: '7/17/2020',
        series: 'BA9C',
        value: 12.5,
      },
      {
        Date: '7/17/2020',
        series: 'Marin',
        value: 22.7,
      },
      {
        Date: '7/18/2020',
        series: 'USA',
        value: 17.3,
      },
      {
        Date: '7/18/2020',
        series: 'California',
        value: 20.2,
      },
      {
        Date: '7/18/2020',
        series: 'BA9C',
        value: 12.5,
      },
      {
        Date: '7/18/2020',
        series: 'Marin',
        value: 21.2,
      },
      {
        Date: '7/19/2020',
        series: 'USA',
        value: 17.6,
      },
      {
        Date: '7/19/2020',
        series: 'California',
        value: 20.6,
      },
      {
        Date: '7/19/2020',
        series: 'BA9C',
        value: 12.7,
      },
      {
        Date: '7/19/2020',
        series: 'Marin',
        value: 24.7,
      },
      {
        Date: '7/20/2020',
        series: 'USA',
        value: 17.3,
      },
      {
        Date: '7/20/2020',
        series: 'California',
        value: 20.4,
      },
      {
        Date: '7/20/2020',
        series: 'BA9C',
        value: 12.5,
      },
      {
        Date: '7/20/2020',
        series: 'Marin',
        value: 27.3,
      },
      {
        Date: '7/21/2020',
        series: 'USA',
        value: 17.2,
      },
      {
        Date: '7/21/2020',
        series: 'California',
        value: 19.7,
      },
      {
        Date: '7/21/2020',
        series: 'BA9C',
        value: 12.2,
      },
      {
        Date: '7/21/2020',
        series: 'Marin',
        value: 27.3,
      },
      {
        Date: '7/22/2020',
        series: 'USA',
        value: 17.2,
      },
      {
        Date: '7/22/2020',
        series: 'California',
        value: 21.3,
      },
      {
        Date: '7/22/2020',
        series: 'BA9C',
        value: 12.9,
      },
      {
        Date: '7/22/2020',
        series: 'Marin',
        value: 27.8,
      },
      {
        Date: '7/23/2020',
        series: 'USA',
        value: 16.9,
      },
      {
        Date: '7/23/2020',
        series: 'California',
        value: 22.1,
      },
      {
        Date: '7/23/2020',
        series: 'BA9C',
        value: 13.3,
      },
      {
        Date: '7/23/2020',
        series: 'Marin',
        value: 22.8,
      },
      {
        Date: '7/24/2020',
        series: 'USA',
        value: 17.4,
      },
      {
        Date: '7/24/2020',
        series: 'California',
        value: 22.2,
      },
      {
        Date: '7/24/2020',
        series: 'BA9C',
        value: 14.2,
      },
      {
        Date: '7/24/2020',
        series: 'Marin',
        value: 22.4,
      },
      {
        Date: '7/25/2020',
        series: 'USA',
        value: 17.4,
      },
      {
        Date: '7/25/2020',
        series: 'California',
        value: 22.5,
      },
      {
        Date: '7/25/2020',
        series: 'BA9C',
        value: 13.8,
      },
      {
        Date: '7/25/2020',
        series: 'Marin',
        value: 22.3,
      },
      {
        Date: '7/26/2020',
        series: 'USA',
        value: 17.6,
      },
      {
        Date: '7/26/2020',
        series: 'California',
        value: 23,
      },
      {
        Date: '7/26/2020',
        series: 'BA9C',
        value: 13.9,
      },
      {
        Date: '7/26/2020',
        series: 'Marin',
        value: 19.6,
      },
      {
        Date: '7/27/2020',
        series: 'USA',
        value: 17.2,
      },
      {
        Date: '7/27/2020',
        series: 'California',
        value: 22.2,
      },
      {
        Date: '7/27/2020',
        series: 'BA9C',
        value: 13.3,
      },
      {
        Date: '7/27/2020',
        series: 'Marin',
        value: 18.3,
      },
      {
        Date: '7/28/2020',
        series: 'USA',
        value: 16.7,
      },
      {
        Date: '7/28/2020',
        series: 'California',
        value: 19.7,
      },
      {
        Date: '7/28/2020',
        series: 'BA9C',
        value: 13.5,
      },
      {
        Date: '7/28/2020',
        series: 'Marin',
        value: 17.8,
      },
      {
        Date: '7/29/2020',
        series: 'USA',
        value: 16.4,
      },
      {
        Date: '7/29/2020',
        series: 'California',
        value: 18.4,
      },
      {
        Date: '7/29/2020',
        series: 'BA9C',
        value: 12.9,
      },
      {
        Date: '7/29/2020',
        series: 'Marin',
        value: 17.5,
      },
      {
        Date: '7/30/2020',
        series: 'USA',
        value: 16.2,
      },
      {
        Date: '7/30/2020',
        series: 'California',
        value: 18.6,
      },
      {
        Date: '7/30/2020',
        series: 'BA9C',
        value: 13.1,
      },
      {
        Date: '7/30/2020',
        series: 'Marin',
        value: 19.8,
      },
      {
        Date: '7/31/2020',
        series: 'USA',
        value: 16.3,
      },
      {
        Date: '7/31/2020',
        series: 'California',
        value: 17.9,
      },
      {
        Date: '7/31/2020',
        series: 'BA9C',
        value: 12.4,
      },
      {
        Date: '7/31/2020',
        series: 'Marin',
        value: 19.1,
      },
      {
        Date: '8/1/2020',
        series: 'USA',
        value: 16.3,
      },
      {
        Date: '8/1/2020',
        series: 'California',
        value: 17.2,
      },
      {
        Date: '8/1/2020',
        series: 'BA9C',
        value: 13.5,
      },
      {
        Date: '8/1/2020',
        series: 'Marin',
        value: 21.1,
      },
      {
        Date: '8/2/2020',
        series: 'USA',
        value: 15.9,
      },
      {
        Date: '8/2/2020',
        series: 'California',
        value: 18,
      },
      {
        Date: '8/2/2020',
        series: 'BA9C',
        value: 13.6,
      },
      {
        Date: '8/2/2020',
        series: 'Marin',
        value: 18.8,
      },
      {
        Date: '8/3/2020',
        series: 'USA',
        value: 15.5,
      },
      {
        Date: '8/3/2020',
        series: 'California',
        value: 17.9,
      },
      {
        Date: '8/3/2020',
        series: 'BA9C',
        value: 14,
      },
      {
        Date: '8/3/2020',
        series: 'Marin',
        value: 18.3,
      },
      {
        Date: '8/4/2020',
        series: 'USA',
        value: 15,
      },
      {
        Date: '8/4/2020',
        series: 'California',
        value: 16.4,
      },
      {
        Date: '8/4/2020',
        series: 'BA9C',
        value: 13.6,
      },
      {
        Date: '8/4/2020',
        series: 'Marin',
        value: 18.3,
      },
      {
        Date: '8/5/2020',
        series: 'USA',
        value: 14.3,
      },
      {
        Date: '8/5/2020',
        series: 'California',
        value: 14.5,
      },
      {
        Date: '8/5/2020',
        series: 'BA9C',
        value: 13.3,
      },
      {
        Date: '8/5/2020',
        series: 'Marin',
        value: 15.5,
      },
      {
        Date: '8/6/2020',
        series: 'USA',
        value: 13.7,
      },
      {
        Date: '8/6/2020',
        series: 'California',
        value: 13.5,
      },
      {
        Date: '8/6/2020',
        series: 'BA9C',
        value: 13.3,
      },
      {
        Date: '8/6/2020',
        series: 'Marin',
        value: 15.2,
      },
      {
        Date: '8/7/2020',
        series: 'USA',
        value: 13.7,
      },
      {
        Date: '8/7/2020',
        series: 'California',
        value: 14.2,
      },
      {
        Date: '8/7/2020',
        series: 'BA9C',
        value: 13.6,
      },
      {
        Date: '8/7/2020',
        series: 'Marin',
        value: 13.8,
      },
      {
        Date: '8/8/2020',
        series: 'USA',
        value: 14,
      },
      {
        Date: '8/8/2020',
        series: 'California',
        value: 13.6,
      },
      {
        Date: '8/8/2020',
        series: 'BA9C',
        value: 13.3,
      },
      {
        Date: '8/8/2020',
        series: 'Marin',
        value: 12.1,
      },
      {
        Date: '8/9/2020',
        series: 'USA',
        value: 14,
      },
      {
        Date: '8/9/2020',
        series: 'California',
        value: 14.6,
      },
      {
        Date: '8/9/2020',
        series: 'BA9C',
        value: 13.6,
      },
      {
        Date: '8/9/2020',
        series: 'Marin',
        value: 12.6,
      },
      {
        Date: '8/10/2020',
        series: 'USA',
        value: 13.6,
      },
      {
        Date: '8/10/2020',
        series: 'California',
        value: 15.8,
      },
      {
        Date: '8/10/2020',
        series: 'BA9C',
        value: 14.7,
      },
      {
        Date: '8/10/2020',
        series: 'Marin',
        value: 12.6,
      },
      {
        Date: '8/11/2020',
        series: 'USA',
        value: 13.7,
      },
      {
        Date: '8/11/2020',
        series: 'California',
        value: 18.4,
      },
      {
        Date: '8/11/2020',
        series: 'BA9C',
        value: 16.5,
      },
      {
        Date: '8/11/2020',
        series: 'Marin',
        value: 15.3,
      },
      {
        Date: '8/12/2020',
        series: 'USA',
        value: 13.8,
      },
      {
        Date: '8/12/2020',
        series: 'California',
        value: 20.8,
      },
      {
        Date: '8/12/2020',
        series: 'BA9C',
        value: 17.5,
      },
      {
        Date: '8/12/2020',
        series: 'Marin',
        value: 21.2,
      },
      {
        Date: '8/13/2020',
        series: 'USA',
        value: 13.4,
      },
      {
        Date: '8/13/2020',
        series: 'California',
        value: 20.3,
      },
      {
        Date: '8/13/2020',
        series: 'BA9C',
        value: 18,
      },
      {
        Date: '8/13/2020',
        series: 'Marin',
        value: 23.1,
      },
      {
        Date: '8/14/2020',
        series: 'USA',
        value: 13.6,
      },
      {
        Date: '8/14/2020',
        series: 'California',
        value: 20.5,
      },
      {
        Date: '8/14/2020',
        series: 'BA9C',
        value: 19.1,
      },
      {
        Date: '8/14/2020',
        series: 'Marin',
        value: 23.6,
      },
      {
        Date: '8/15/2020',
        series: 'USA',
        value: 13.8,
      },
      {
        Date: '8/15/2020',
        series: 'California',
        value: 22.1,
      },
      {
        Date: '8/15/2020',
        series: 'BA9C',
        value: 19.8,
      },
      {
        Date: '8/15/2020',
        series: 'Marin',
        value: 23.6,
      },
      {
        Date: '8/16/2020',
        series: 'USA',
        value: 13.9,
      },
      {
        Date: '8/16/2020',
        series: 'California',
        value: 22.1,
      },
      {
        Date: '8/16/2020',
        series: 'BA9C',
        value: 20,
      },
      {
        Date: '8/16/2020',
        series: 'Marin',
        value: 23.3,
      },
      {
        Date: '8/17/2020',
        series: 'USA',
        value: 13.1,
      },
      {
        Date: '8/17/2020',
        series: 'California',
        value: 19.9,
      },
      {
        Date: '8/17/2020',
        series: 'BA9C',
        value: 19,
      },
      {
        Date: '8/17/2020',
        series: 'Marin',
        value: 22.8,
      },
      {
        Date: '8/18/2020',
        series: 'USA',
        value: 12.4,
      },
      {
        Date: '8/18/2020',
        series: 'California',
        value: 17.3,
      },
      {
        Date: '8/18/2020',
        series: 'BA9C',
        value: 18.3,
      },
      {
        Date: '8/18/2020',
        series: 'Marin',
        value: 19.6,
      },
      {
        Date: '8/19/2020',
        series: 'USA',
        value: 12.1,
      },
      {
        Date: '8/19/2020',
        series: 'California',
        value: 16.9,
      },
      {
        Date: '8/19/2020',
        series: 'BA9C',
        value: 18,
      },
      {
        Date: '8/19/2020',
        series: 'Marin',
        value: 13.9,
      },
      {
        Date: '8/20/2020',
        series: 'USA',
        value: 11.5,
      },
      {
        Date: '8/20/2020',
        series: 'California',
        value: 16.2,
      },
      {
        Date: '8/20/2020',
        series: 'BA9C',
        value: 17.4,
      },
      {
        Date: '8/20/2020',
        series: 'Marin',
        value: 10.2,
      },
      {
        Date: '8/21/2020',
        series: 'USA',
        value: 11.1,
      },
      {
        Date: '8/21/2020',
        series: 'California',
        value: 13.6,
      },
      {
        Date: '8/21/2020',
        series: 'BA9C',
        value: 16.6,
      },
      {
        Date: '8/21/2020',
        series: 'Marin',
        value: 9.6,
      },
      {
        Date: '8/22/2020',
        series: 'USA',
        value: 11.2,
      },
      {
        Date: '8/22/2020',
        series: 'California',
        value: 13.1,
      },
      {
        Date: '8/22/2020',
        series: 'BA9C',
        value: 15.5,
      },
      {
        Date: '8/22/2020',
        series: 'Marin',
        value: 7.9,
      },
      {
        Date: '8/23/2020',
        series: 'USA',
        value: 11.2,
      },
      {
        Date: '8/23/2020',
        series: 'California',
        value: 13.2,
      },
      {
        Date: '8/23/2020',
        series: 'BA9C',
        value: 15.1,
      },
      {
        Date: '8/23/2020',
        series: 'Marin',
        value: 8.9,
      },
      {
        Date: '8/24/2020',
        series: 'USA',
        value: 11,
      },
      {
        Date: '8/24/2020',
        series: 'California',
        value: 13.3,
      },
      {
        Date: '8/24/2020',
        series: 'BA9C',
        value: 14.5,
      },
      {
        Date: '8/24/2020',
        series: 'Marin',
        value: 8.8,
      },
      {
        Date: '8/25/2020',
        series: 'USA',
        value: 10.6,
      },
      {
        Date: '8/25/2020',
        series: 'California',
        value: 12.7,
      },
      {
        Date: '8/25/2020',
        series: 'BA9C',
        value: 14.7,
      },
      {
        Date: '8/25/2020',
        series: 'Marin',
        value: 8.3,
      },
      {
        Date: '8/26/2020',
        series: 'USA',
        value: 10.6,
      },
      {
        Date: '8/26/2020',
        series: 'California',
        value: 12.7,
      },
      {
        Date: '8/26/2020',
        series: 'BA9C',
        value: 13.8,
      },
      {
        Date: '8/26/2020',
        series: 'Marin',
        value: 9.5,
      },
      {
        Date: '8/27/2020',
        series: 'USA',
        value: 10.5,
      },
      {
        Date: '8/27/2020',
        series: 'California',
        value: 12.3,
      },
      {
        Date: '8/27/2020',
        series: 'BA9C',
        value: 13.5,
      },
      {
        Date: '8/27/2020',
        series: 'Marin',
        value: 11.4,
      },
      {
        Date: '8/28/2020',
        series: 'USA',
        value: 10.5,
      },
      {
        Date: '8/28/2020',
        series: 'California',
        value: 11.9,
      },
      {
        Date: '8/28/2020',
        series: 'BA9C',
        value: 12.5,
      },
      {
        Date: '8/28/2020',
        series: 'Marin',
        value: 10.8,
      },
      {
        Date: '8/29/2020',
        series: 'USA',
        value: 10.8,
      },
      {
        Date: '8/29/2020',
        series: 'California',
        value: 11.2,
      },
      {
        Date: '8/29/2020',
        series: 'BA9C',
        value: 12.4,
      },
      {
        Date: '8/29/2020',
        series: 'Marin',
        value: 12.9,
      },
      {
        Date: '8/30/2020',
        series: 'USA',
        value: 11,
      },
      {
        Date: '8/30/2020',
        series: 'California',
        value: 11.6,
      },
      {
        Date: '8/30/2020',
        series: 'BA9C',
        value: 12,
      },
      {
        Date: '8/30/2020',
        series: 'Marin',
        value: 12,
      },
      {
        Date: '8/31/2020',
        series: 'USA',
        value: 10.8,
      },
      {
        Date: '8/31/2020',
        series: 'California',
        value: 11.5,
      },
      {
        Date: '8/31/2020',
        series: 'BA9C',
        value: 12.7,
      },
      {
        Date: '8/31/2020',
        series: 'Marin',
        value: 12.6,
      },
      {
        Date: '9/1/2020',
        series: 'USA',
        value: 10.7,
      },
      {
        Date: '9/1/2020',
        series: 'California',
        value: 10.6,
      },
      {
        Date: '9/1/2020',
        series: 'BA9C',
        value: 11.3,
      },
      {
        Date: '9/1/2020',
        series: 'Marin',
        value: 13.6,
      },
      {
        Date: '9/2/2020',
        series: 'USA',
        value: 10.2,
      },
      {
        Date: '9/2/2020',
        series: 'California',
        value: 10.6,
      },
      {
        Date: '9/2/2020',
        series: 'BA9C',
        value: 11.9,
      },
      {
        Date: '9/2/2020',
        series: 'Marin',
        value: 13.1,
      },
      {
        Date: '9/3/2020',
        series: 'USA',
        value: 10.1,
      },
      {
        Date: '9/3/2020',
        series: 'California',
        value: 10.7,
      },
      {
        Date: '9/3/2020',
        series: 'BA9C',
        value: 11.9,
      },
      {
        Date: '9/3/2020',
        series: 'Marin',
        value: 13.1,
      },
      {
        Date: '9/4/2020',
        series: 'USA',
        value: 10.4,
      },
      {
        Date: '9/4/2020',
        series: 'California',
        value: 10.6,
      },
      {
        Date: '9/4/2020',
        series: 'BA9C',
        value: 11.9,
      },
      {
        Date: '9/4/2020',
        series: 'Marin',
        value: 13,
      },
      {
        Date: '9/5/2020',
        series: 'USA',
        value: 10.6,
      },
      {
        Date: '9/5/2020',
        series: 'California',
        value: 10.1,
      },
      {
        Date: '9/5/2020',
        series: 'BA9C',
        value: 12.1,
      },
      {
        Date: '9/5/2020',
        series: 'Marin',
        value: 11,
      },
      {
        Date: '9/6/2020',
        series: 'USA',
        value: 10.7,
      },
      {
        Date: '9/6/2020',
        series: 'California',
        value: 10.4,
      },
      {
        Date: '9/6/2020',
        series: 'BA9C',
        value: 12.4,
      },
      {
        Date: '9/6/2020',
        series: 'Marin',
        value: 11.3,
      },
      {
        Date: '9/7/2020',
        series: 'USA',
        value: 10.1,
      },
      {
        Date: '9/7/2020',
        series: 'California',
        value: 10.2,
      },
      {
        Date: '9/7/2020',
        series: 'BA9C',
        value: 11.3,
      },
      {
        Date: '9/7/2020',
        series: 'Marin',
        value: 10.9,
      },
      {
        Date: '9/8/2020',
        series: 'USA',
        value: 9.8,
      },
      {
        Date: '9/8/2020',
        series: 'California',
        value: 9.6,
      },
      {
        Date: '9/8/2020',
        series: 'BA9C',
        value: 10.9,
      },
      {
        Date: '9/8/2020',
        series: 'Marin',
        value: 9.2,
      },
      {
        Date: '9/9/2020',
        series: 'USA',
        value: 9.2,
      },
      {
        Date: '9/9/2020',
        series: 'California',
        value: 8.1,
      },
      {
        Date: '9/9/2020',
        series: 'BA9C',
        value: 10.3,
      },
      {
        Date: '9/9/2020',
        series: 'Marin',
        value: 8.4,
      },
      {
        Date: '9/10/2020',
        series: 'USA',
        value: 8.6,
      },
      {
        Date: '9/10/2020',
        series: 'California',
        value: 7.6,
      },
      {
        Date: '9/10/2020',
        series: 'BA9C',
        value: 9.2,
      },
      {
        Date: '9/10/2020',
        series: 'Marin',
        value: 6.9,
      },
      {
        Date: '9/11/2020',
        series: 'USA',
        value: 8.5,
      },
      {
        Date: '9/11/2020',
        series: 'California',
        value: 7,
      },
      {
        Date: '9/11/2020',
        series: 'BA9C',
        value: 9.2,
      },
      {
        Date: '9/11/2020',
        series: 'Marin',
        value: 7.5,
      },
      {
        Date: '9/12/2020',
        series: 'USA',
        value: 8.9,
      },
      {
        Date: '9/12/2020',
        series: 'California',
        value: 6.7,
      },
      {
        Date: '9/12/2020',
        series: 'BA9C',
        value: 8.9,
      },
      {
        Date: '9/12/2020',
        series: 'Marin',
        value: 8,
      },
      {
        Date: '9/13/2020',
        series: 'USA',
        value: 9.2,
      },
      {
        Date: '9/13/2020',
        series: 'California',
        value: 7.3,
      },
      {
        Date: '9/13/2020',
        series: 'BA9C',
        value: 8.8,
      },
      {
        Date: '9/13/2020',
        series: 'Marin',
        value: 7.1,
      },
      {
        Date: '9/14/2020',
        series: 'USA',
        value: 9.7,
      },
      {
        Date: '9/14/2020',
        series: 'California',
        value: 7.4,
      },
      {
        Date: '9/14/2020',
        series: 'BA9C',
        value: 8.8,
      },
      {
        Date: '9/14/2020',
        series: 'Marin',
        value: 6.5,
      },
      {
        Date: '9/15/2020',
        series: 'USA',
        value: 9.9,
      },
      {
        Date: '9/15/2020',
        series: 'California',
        value: 7.6,
      },
      {
        Date: '9/15/2020',
        series: 'BA9C',
        value: 8.8,
      },
      {
        Date: '9/15/2020',
        series: 'Marin',
        value: 6.3,
      },
      {
        Date: '9/16/2020',
        series: 'USA',
        value: 10,
      },
      {
        Date: '9/16/2020',
        series: 'California',
        value: 7.5,
      },
      {
        Date: '9/16/2020',
        series: 'BA9C',
        value: 8.2,
      },
      {
        Date: '9/16/2020',
        series: 'Marin',
        value: 7.2,
      },
      {
        Date: '9/17/2020',
        series: 'USA',
        value: 9.9,
      },
      {
        Date: '9/17/2020',
        series: 'California',
        value: 7.4,
      },
      {
        Date: '9/17/2020',
        series: 'BA9C',
        value: 8.4,
      },
      {
        Date: '9/17/2020',
        series: 'Marin',
        value: 6.5,
      },
      {
        Date: '9/18/2020',
        series: 'USA',
        value: 10.2,
      },
      {
        Date: '9/18/2020',
        series: 'California',
        value: 7.2,
      },
      {
        Date: '9/18/2020',
        series: 'BA9C',
        value: 8.4,
      },
      {
        Date: '9/18/2020',
        series: 'Marin',
        value: 7.1,
      },
      {
        Date: '9/19/2020',
        series: 'USA',
        value: 10.6,
      },
      {
        Date: '9/19/2020',
        series: 'California',
        value: 7.1,
      },
      {
        Date: '9/19/2020',
        series: 'BA9C',
        value: 7.9,
      },
      {
        Date: '9/19/2020',
        series: 'Marin',
        value: 7,
      },
      {
        Date: '9/20/2020',
        series: 'USA',
        value: 10.7,
      },
      {
        Date: '9/20/2020',
        series: 'California',
        value: 7.6,
      },
      {
        Date: '9/20/2020',
        series: 'BA9C',
        value: 7.9,
      },
      {
        Date: '9/20/2020',
        series: 'Marin',
        value: 7.1,
      },
      {
        Date: '9/21/2020',
        series: 'USA',
        value: 10.9,
      },
      {
        Date: '9/21/2020',
        series: 'California',
        value: 8,
      },
      {
        Date: '9/21/2020',
        series: 'BA9C',
        value: 8.1,
      },
      {
        Date: '9/21/2020',
        series: 'Marin',
        value: 8,
      },
      {
        Date: '9/22/2020',
        series: 'USA',
        value: 11.3,
      },
      {
        Date: '9/22/2020',
        series: 'California',
        value: 7.9,
      },
      {
        Date: '9/22/2020',
        series: 'BA9C',
        value: 8,
      },
      {
        Date: '9/22/2020',
        series: 'Marin',
        value: 8,
      },
      {
        Date: '9/23/2020',
        series: 'USA',
        value: 11.1,
      },
      {
        Date: '9/23/2020',
        series: 'California',
        value: 7.9,
      },
      {
        Date: '9/23/2020',
        series: 'BA9C',
        value: 8.1,
      },
      {
        Date: '9/23/2020',
        series: 'Marin',
        value: 7.6,
      },
      {
        Date: '9/24/2020',
        series: 'USA',
        value: 10.9,
      },
      {
        Date: '9/24/2020',
        series: 'California',
        value: 7.7,
      },
      {
        Date: '9/24/2020',
        series: 'BA9C',
        value: 8.2,
      },
      {
        Date: '9/24/2020',
        series: 'Marin',
        value: 8.5,
      },
      {
        Date: '9/25/2020',
        series: 'USA',
        value: 11.4,
      },
      {
        Date: '9/25/2020',
        series: 'California',
        value: 7.4,
      },
      {
        Date: '9/25/2020',
        series: 'BA9C',
        value: 7.8,
      },
      {
        Date: '9/25/2020',
        series: 'Marin',
        value: 7.8,
      },
      {
        Date: '9/26/2020',
        series: 'USA',
        value: 11.9,
      },
      {
        Date: '9/26/2020',
        series: 'California',
        value: 7.4,
      },
      {
        Date: '9/26/2020',
        series: 'BA9C',
        value: 7.9,
      },
      {
        Date: '9/26/2020',
        series: 'Marin',
        value: 8,
      },
      {
        Date: '9/27/2020',
        series: 'USA',
        value: 11.7,
      },
      {
        Date: '9/27/2020',
        series: 'California',
        value: 7.6,
      },
      {
        Date: '9/27/2020',
        series: 'BA9C',
        value: 7.6,
      },
      {
        Date: '9/27/2020',
        series: 'Marin',
        value: 7.9,
      },
      {
        Date: '9/28/2020',
        series: 'USA',
        value: 11.1,
      },
      {
        Date: '9/28/2020',
        series: 'California',
        value: 7.8,
      },
      {
        Date: '9/28/2020',
        series: 'BA9C',
        value: 7.2,
      },
      {
        Date: '9/28/2020',
        series: 'Marin',
        value: 6.5,
      },
      {
        Date: '9/29/2020',
        series: 'USA',
        value: 11,
      },
      {
        Date: '9/29/2020',
        series: 'California',
        value: 7.4,
      },
      {
        Date: '9/29/2020',
        series: 'BA9C',
        value: 7.1,
      },
      {
        Date: '9/29/2020',
        series: 'Marin',
        value: 6.4,
      },
      {
        Date: '9/30/2020',
        series: 'USA',
        value: 11.1,
      },
      {
        Date: '9/30/2020',
        series: 'California',
        value: 7.4,
      },
      {
        Date: '9/30/2020',
        series: 'BA9C',
        value: 7.1,
      },
      {
        Date: '9/30/2020',
        series: 'Marin',
        value: 5.7,
      },
      {
        Date: '10/1/2020',
        series: 'USA',
        value: 10.7,
      },
      {
        Date: '10/1/2020',
        series: 'California',
        value: 7.3,
      },
      {
        Date: '10/1/2020',
        series: 'BA9C',
        value: 6.9,
      },
      {
        Date: '10/1/2020',
        series: 'Marin',
        value: 4.4,
      },
      {
        Date: '10/2/2020',
        series: 'USA',
        value: 10.7,
      },
      {
        Date: '10/2/2020',
        series: 'California',
        value: 7.1,
      },
      {
        Date: '10/2/2020',
        series: 'BA9C',
        value: 6.9,
      },
      {
        Date: '10/2/2020',
        series: 'Marin',
        value: 3.9,
      },
      {
        Date: '10/3/2020',
        series: 'USA',
        value: 11.4,
      },
      {
        Date: '10/3/2020',
        series: 'California',
        value: 6.4,
      },
      {
        Date: '10/3/2020',
        series: 'BA9C',
        value: 6.8,
      },
      {
        Date: '10/3/2020',
        series: 'Marin',
        value: 3.3,
      },
      {
        Date: '10/4/2020',
        series: 'USA',
        value: 11.5,
      },
      {
        Date: '10/4/2020',
        series: 'California',
        value: 6.9,
      },
      {
        Date: '10/4/2020',
        series: 'BA9C',
        value: 6.9,
      },
      {
        Date: '10/4/2020',
        series: 'Marin',
        value: 3,
      },
      {
        Date: '10/5/2020',
        series: 'USA',
        value: 11.6,
      },
      {
        Date: '10/5/2020',
        series: 'California',
        value: 7.2,
      },
      {
        Date: '10/5/2020',
        series: 'BA9C',
        value: 7,
      },
      {
        Date: '10/5/2020',
        series: 'Marin',
        value: 4,
      },
      {
        Date: '10/6/2020',
        series: 'USA',
        value: 11.3,
      },
      {
        Date: '10/6/2020',
        series: 'California',
        value: 6.6,
      },
      {
        Date: '10/6/2020',
        series: 'BA9C',
        value: 6.8,
      },
      {
        Date: '10/6/2020',
        series: 'Marin',
        value: 5.1,
      },
      {
        Date: '10/7/2020',
        series: 'USA',
        value: 11.5,
      },
      {
        Date: '10/7/2020',
        series: 'California',
        value: 6.5,
      },
      {
        Date: '10/7/2020',
        series: 'BA9C',
        value: 6.7,
      },
      {
        Date: '10/7/2020',
        series: 'Marin',
        value: 5.1,
      },
      {
        Date: '10/8/2020',
        series: 'USA',
        value: 11.8,
      },
      {
        Date: '10/8/2020',
        series: 'California',
        value: 6.5,
      },
      {
        Date: '10/8/2020',
        series: 'BA9C',
        value: 6.7,
      },
      {
        Date: '10/8/2020',
        series: 'Marin',
        value: 6,
      },
      {
        Date: '10/9/2020',
        series: 'USA',
        value: 12.1,
      },
      {
        Date: '10/9/2020',
        series: 'California',
        value: 7.1,
      },
      {
        Date: '10/9/2020',
        series: 'BA9C',
        value: 6.5,
      },
      {
        Date: '10/9/2020',
        series: 'Marin',
        value: 6.3,
      },
      {
        Date: '10/10/2020',
        series: 'USA',
        value: 12.9,
      },
      {
        Date: '10/10/2020',
        series: 'California',
        value: 7.1,
      },
      {
        Date: '10/10/2020',
        series: 'BA9C',
        value: 6.5,
      },
      {
        Date: '10/10/2020',
        series: 'Marin',
        value: 5.9,
      },
      {
        Date: '10/11/2020',
        series: 'USA',
        value: 13.3,
      },
      {
        Date: '10/11/2020',
        series: 'California',
        value: 7.3,
      },
      {
        Date: '10/11/2020',
        series: 'BA9C',
        value: 6.5,
      },
      {
        Date: '10/11/2020',
        series: 'Marin',
        value: 6.9,
      },
      {
        Date: '10/12/2020',
        series: 'USA',
        value: 13.5,
      },
      {
        Date: '10/12/2020',
        series: 'California',
        value: 8,
      },
      {
        Date: '10/12/2020',
        series: 'BA9C',
        value: 6.3,
      },
      {
        Date: '10/12/2020',
        series: 'Marin',
        value: 7.1,
      },
      {
        Date: '10/13/2020',
        series: 'USA',
        value: 13.3,
      },
      {
        Date: '10/13/2020',
        series: 'California',
        value: 7.9,
      },
      {
        Date: '10/13/2020',
        series: 'BA9C',
        value: 6.7,
      },
      {
        Date: '10/13/2020',
        series: 'Marin',
        value: 6.4,
      },
      {
        Date: '10/14/2020',
        series: 'USA',
        value: 13.4,
      },
      {
        Date: '10/14/2020',
        series: 'California',
        value: 7.5,
      },
      {
        Date: '10/14/2020',
        series: 'BA9C',
        value: 6.6,
      },
      {
        Date: '10/14/2020',
        series: 'Marin',
        value: 6.3,
      },
      {
        Date: '10/15/2020',
        series: 'USA',
        value: 13.7,
      },
      {
        Date: '10/15/2020',
        series: 'California',
        value: 7.3,
      },
      {
        Date: '10/15/2020',
        series: 'BA9C',
        value: 6.4,
      },
      {
        Date: '10/15/2020',
        series: 'Marin',
        value: 6.3,
      },
      {
        Date: '10/16/2020',
        series: 'USA',
        value: 14.1,
      },
      {
        Date: '10/16/2020',
        series: 'California',
        value: 6.9,
      },
      {
        Date: '10/16/2020',
        series: 'BA9C',
        value: 6.3,
      },
      {
        Date: '10/16/2020',
        series: 'Marin',
        value: 6.3,
      },
      {
        Date: '10/17/2020',
        series: 'USA',
        value: 14.6,
      },
      {
        Date: '10/17/2020',
        series: 'California',
        value: 6.6,
      },
      {
        Date: '10/17/2020',
        series: 'BA9C',
        value: 6,
      },
      {
        Date: '10/17/2020',
        series: 'Marin',
        value: 7.1,
      },
      {
        Date: '10/18/2020',
        series: 'USA',
        value: 14.9,
      },
      {
        Date: '10/18/2020',
        series: 'California',
        value: 6.4,
      },
      {
        Date: '10/18/2020',
        series: 'BA9C',
        value: 6.3,
      },
      {
        Date: '10/18/2020',
        series: 'Marin',
        value: 6.7,
      },
      {
        Date: '10/19/2020',
        series: 'USA',
        value: 15.2,
      },
      {
        Date: '10/19/2020',
        series: 'California',
        value: 6.8,
      },
      {
        Date: '10/19/2020',
        series: 'BA9C',
        value: 6.6,
      },
      {
        Date: '10/19/2020',
        series: 'Marin',
        value: 6.3,
      },
      {
        Date: '10/20/2020',
        series: 'USA',
        value: 15.4,
      },
      {
        Date: '10/20/2020',
        series: 'California',
        value: 7.1,
      },
      {
        Date: '10/20/2020',
        series: 'BA9C',
        value: 6.7,
      },
      {
        Date: '10/20/2020',
        series: 'Marin',
        value: 5.8,
      },
      {
        Date: '10/21/2020',
        series: 'USA',
        value: 15.3,
      },
      {
        Date: '10/21/2020',
        series: 'California',
        value: 7.2,
      },
      {
        Date: '10/21/2020',
        series: 'BA9C',
        value: 7.1,
      },
      {
        Date: '10/21/2020',
        series: 'Marin',
        value: 5.6,
      },
      {
        Date: '10/22/2020',
        series: 'USA',
        value: 15.5,
      },
      {
        Date: '10/22/2020',
        series: 'California',
        value: 7.1,
      },
      {
        Date: '10/22/2020',
        series: 'BA9C',
        value: 7.1,
      },
      {
        Date: '10/22/2020',
        series: 'Marin',
        value: 4.5,
      },
      {
        Date: '10/23/2020',
        series: 'USA',
        value: 16.6,
      },
      {
        Date: '10/23/2020',
        series: 'California',
        value: 8.3,
      },
      {
        Date: '10/23/2020',
        series: 'BA9C',
        value: 7.6,
      },
      {
        Date: '10/23/2020',
        series: 'Marin',
        value: 4.3,
      },
      {
        Date: '10/24/2020',
        series: 'USA',
        value: 18.1,
      },
      {
        Date: '10/24/2020',
        series: 'California',
        value: 9.5,
      },
      {
        Date: '10/24/2020',
        series: 'BA9C',
        value: 7.9,
      },
      {
        Date: '10/24/2020',
        series: 'Marin',
        value: 4.2,
      },
      {
        Date: '10/25/2020',
        series: 'USA',
        value: 18.5,
      },
      {
        Date: '10/25/2020',
        series: 'California',
        value: 10.1,
      },
      {
        Date: '10/25/2020',
        series: 'BA9C',
        value: 7.6,
      },
      {
        Date: '10/25/2020',
        series: 'Marin',
        value: 4,
      },
      {
        Date: '10/26/2020',
        series: 'USA',
        value: 18.5,
      },
      {
        Date: '10/26/2020',
        series: 'California',
        value: 10,
      },
      {
        Date: '10/26/2020',
        series: 'BA9C',
        value: 7.6,
      },
      {
        Date: '10/26/2020',
        series: 'Marin',
        value: 3.8,
      },
      {
        Date: '10/27/2020',
        series: 'USA',
        value: 19.1,
      },
      {
        Date: '10/27/2020',
        series: 'California',
        value: 9.8,
      },
      {
        Date: '10/27/2020',
        series: 'BA9C',
        value: 7.7,
      },
      {
        Date: '10/27/2020',
        series: 'Marin',
        value: 3.6,
      },
      {
        Date: '10/28/2020',
        series: 'USA',
        value: 19.3,
      },
      {
        Date: '10/28/2020',
        series: 'California',
        value: 10.4,
      },
      {
        Date: '10/28/2020',
        series: 'BA9C',
        value: 7.6,
      },
      {
        Date: '10/28/2020',
        series: 'Marin',
        value: 4,
      },
      {
        Date: '10/29/2020',
        series: 'USA',
        value: 19.6,
      },
      {
        Date: '10/29/2020',
        series: 'California',
        value: 9.7,
      },
      {
        Date: '10/29/2020',
        series: 'BA9C',
        value: 7.9,
      },
      {
        Date: '10/29/2020',
        series: 'Marin',
        value: 4.4,
      },
      {
        Date: '10/30/2020',
        series: 'USA',
        value: 20.2,
      },
      {
        Date: '10/30/2020',
        series: 'California',
        value: 8.9,
      },
      {
        Date: '10/30/2020',
        series: 'BA9C',
        value: 7.9,
      },
      {
        Date: '10/30/2020',
        series: 'Marin',
        value: 4.3,
      },
      {
        Date: '10/31/2020',
        series: 'USA',
        value: 21.3,
      },
      {
        Date: '10/31/2020',
        series: 'California',
        value: 8.9,
      },
      {
        Date: '10/31/2020',
        series: 'BA9C',
        value: 7.9,
      },
      {
        Date: '10/31/2020',
        series: 'Marin',
        value: 4,
      },
      {
        Date: '11/1/2020',
        series: 'USA',
        value: 21.8,
      },
      {
        Date: '11/1/2020',
        series: 'California',
        value: 9.5,
      },
      {
        Date: '11/1/2020',
        series: 'BA9C',
        value: 7.9,
      },
      {
        Date: '11/1/2020',
        series: 'Marin',
        value: 3.8,
      },
      {
        Date: '11/2/2020',
        series: 'USA',
        value: 22.2,
      },
      {
        Date: '11/2/2020',
        series: 'California',
        value: 9.8,
      },
      {
        Date: '11/2/2020',
        series: 'BA9C',
        value: 8.2,
      },
      {
        Date: '11/2/2020',
        series: 'Marin',
        value: 3.9,
      },
      {
        Date: '11/3/2020',
        series: 'USA',
        value: 22.5,
      },
      {
        Date: '11/3/2020',
        series: 'California',
        value: 9.6,
      },
      {
        Date: '11/3/2020',
        series: 'BA9C',
        value: 8.2,
      },
      {
        Date: '11/3/2020',
        series: 'Marin',
        value: 4.6,
      },
      {
        Date: '11/4/2020',
        series: 'USA',
        value: 23.2,
      },
      {
        Date: '11/4/2020',
        series: 'California',
        value: 10.1,
      },
      {
        Date: '11/4/2020',
        series: 'BA9C',
        value: 8.3,
      },
      {
        Date: '11/4/2020',
        series: 'Marin',
        value: 5,
      },
      {
        Date: '11/5/2020',
        series: 'USA',
        value: 24,
      },
      {
        Date: '11/5/2020',
        series: 'California',
        value: 10.3,
      },
      {
        Date: '11/5/2020',
        series: 'BA9C',
        value: 9,
      },
      {
        Date: '11/5/2020',
        series: 'Marin',
        value: 4.7,
      },
      {
        Date: '11/6/2020',
        series: 'USA',
        value: 25.5,
      },
      {
        Date: '11/6/2020',
        series: 'California',
        value: 10.8,
      },
      {
        Date: '11/6/2020',
        series: 'BA9C',
        value: 9.2,
      },
      {
        Date: '11/6/2020',
        series: 'Marin',
        value: 5.7,
      },
      {
        Date: '11/7/2020',
        series: 'USA',
        value: 27.9,
      },
      {
        Date: '11/7/2020',
        series: 'California',
        value: 11.3,
      },
      {
        Date: '11/7/2020',
        series: 'BA9C',
        value: 9.9,
      },
      {
        Date: '11/7/2020',
        series: 'Marin',
        value: 5.4,
      },
      {
        Date: '11/8/2020',
        series: 'USA',
        value: 29.2,
      },
      {
        Date: '11/8/2020',
        series: 'California',
        value: 12.6,
      },
      {
        Date: '11/8/2020',
        series: 'BA9C',
        value: 10.8,
      },
      {
        Date: '11/8/2020',
        series: 'Marin',
        value: 5.5,
      },
      {
        Date: '11/9/2020',
        series: 'USA',
        value: 30.6,
      },
      {
        Date: '11/9/2020',
        series: 'California',
        value: 13.8,
      },
      {
        Date: '11/9/2020',
        series: 'BA9C',
        value: 11.6,
      },
      {
        Date: '11/9/2020',
        series: 'Marin',
        value: 5.9,
      },
      {
        Date: '11/10/2020',
        series: 'USA',
        value: 31.8,
      },
      {
        Date: '11/10/2020',
        series: 'California',
        value: 13.8,
      },
      {
        Date: '11/10/2020',
        series: 'BA9C',
        value: 12.3,
      },
      {
        Date: '11/10/2020',
        series: 'Marin',
        value: 5.9,
      },
      {
        Date: '11/11/2020',
        series: 'USA',
        value: 33.1,
      },
      {
        Date: '11/11/2020',
        series: 'California',
        value: 14.9,
      },
      {
        Date: '11/11/2020',
        series: 'BA9C',
        value: 12.5,
      },
      {
        Date: '11/11/2020',
        series: 'Marin',
        value: 5.5,
      },
      {
        Date: '11/12/2020',
        series: 'USA',
        value: 34.2,
      },
      {
        Date: '11/12/2020',
        series: 'California',
        value: 12.5,
      },
      {
        Date: '11/12/2020',
        series: 'BA9C',
        value: 12.8,
      },
      {
        Date: '11/12/2020',
        series: 'Marin',
        value: 6.8,
      },
    ],
  },
  {
    url: '/getData',
    method: 'get',
    response: {},
  },
  {
    url: '/getNav',
    method: 'get',
    response: arr,
  },
];
