<template>
  <div style="height: 100%" v-loading="loading">
    <ul class="mao">
      <li
        v-for="item in nav"
        :key="item.title"
        @click="toShow(item)"
        :class="{ beSelect: selectNav == item.page }"
      >
        <p>{{ item.title }}</p>
        <p>
          {{ item.page }}
        </p>
      </li>
    </ul>
    <ul class="filter">
      <li>
        模块：
        <el-cascader
          filterable
          :props="props"
          v-model="filter.program"
          style="width: 280px"
          :options="programList"
          @change="handleChange"
        />
      </li>
      <li>
        角色：
        <el-select filterable v-model="filter.role" style="width: 180px">
          <el-option v-for="item in roleMetaData" :key="item" :label="item" :value="item" />
        </el-select>
      </li>
      <li>
        姓名：
        <el-select filterable v-model="filter.name" style="width: 180px">
          <el-option
            v-for="item in nameList"
            :key="item.title"
            :label="item.title"
            :value="item.prop"
          />
        </el-select>
      </li>
      <li>
        <el-button type="success" @click="toFilter">筛选</el-button>
        <el-button type="primary" @click="reset">重置筛选</el-button>
      </li>
    </ul>
    <div class="scrollBar">
      <div
        v-for="item in nav"
        :key="item.title"
        class="firstLevel"
        :id="item.page"
        :class="{ firstLevelLine: !item.children && item.formData.length > 1 }"
      >
        <span class="title" :style="{ transform: item.children ? 'translateY(-9.4%)' : '' }">
          {{ item.title }}
          <el-popconfirm
            cancel-button-text="取消"
            confirm-button-text="确定"
            title="确定删除？"
            placement="top-start"
            @confirm="deleteData(item.page)"
          >
            <template #reference>
              <el-button size="small" type="primary">删除数据</el-button>
            </template>
          </el-popconfirm>
        </span>
        <ul
          v-if="item.children"
          class="secondLevel"
          :class="{
            hasLine: item.children.length > 1,
            hasLine2: seeHasLine2(item),
          }"
        >
          <li v-for="child in item.children" :key="child.title" class="twoLevel">
            <span class="title">{{ child.title }}</span>
            <ul
              class="wapTwo"
              :class="{ twoLevelLine: item.children.length > 1 && role.length > 1 }"
            >
              <template v-for="grandson in child.formData" :key="grandson.label">
                <li class="twoLevel" v-if="role.includes(grandson.label)">
                  <div class="title">
                    <p>{{ grandson.label }}</p>
                    负责人:&nbsp;
                    <el-input
                      :disabled="grandson.disabled"
                      style="width: 110px"
                      v-model="grandson.value"
                    />
                    <el-button
                      :type="grandson.disabled ? 'danger' : 'success'"
                      size="small"
                      @click="editRole(grandson, item)"
                    >
                      {{ grandson.disabled ? '编辑' : '保存' }}
                    </el-button>
                  </div>
                </li>
              </template>
              <el-button type="primary" @click="seeBug(child)">查看bug</el-button>
              <ul class="short">
                <li v-for="(k, i) in Object.entries(child.shortData)" :key="i">
                  {{
                    k[0] === 'total'
                      ? 'bug总数'
                      : k[0] === 'before'
                        ? '待修复'
                        : k[0] === 'close'
                          ? '关闭'
                          : k[0] === 'so'
                            ? '需求如此'
                            : '已修复待发版'
                  }}：{{ k[1] }}&nbsp;&nbsp;个
                </li>
              </ul>
            </ul>
          </li>
        </ul>
        <ul v-else class="wapTwo">
          <template v-for="grandson in item.formData" :key="grandson.label">
            <li v-if="role.includes(grandson.label)" class="twoLevel">
              <div class="title">
                <p>{{ grandson.label }}</p>
                负责人:&nbsp;
                <el-input
                  :disabled="grandson.disabled"
                  style="width: 110px"
                  v-model="grandson.value"
                />
                <el-button
                  :type="grandson.disabled ? 'danger' : 'success'"
                  size="small"
                  @click="editRole(grandson, item)"
                >
                  {{ grandson.disabled ? '编辑' : '保存' }}
                </el-button>
              </div>
            </li>
          </template>
          <el-button type="primary" @click="seeBug(item)">查看bug</el-button>
          <ul class="short">
            <li v-for="(k, i) in Object.entries(item.shortData)" :key="i">
              {{
                k[0] === 'total'
                  ? 'bug总数'
                  : k[0] === 'before'
                    ? '待修复'
                    : k[0] === 'close'
                      ? '关闭'
                      : k[0] === 'so'
                        ? '需求如此'
                        : '已修复待发版'
              }}：{{ k[1] }}&nbsp;&nbsp;个
            </li>
          </ul>
        </ul>
      </div>
    </div>

    <el-dialog
      :close-on-press-escape="false"
      v-model="dialogVisible"
      fullscreen
      center
      :title="dialogTitle"
      destroy-on-close
      :show-close="false"
    >
      <Xsheet
        ref="sheetRef"
        v-if="excelData"
        :datas="excelData.excelData"
        @saveData="saveData"
        @xsheetShowImgs="xsheetShowImgs"
        @closeLoading="loading = false"
        @selectChange="selectChange"
      />
      <template #footer>
        <p style="display: inline-block; font-size: 18px">
          当前：第 {{ now.row + 1 }} 行&nbsp;第 {{ now.col + 1 }} 列&nbsp;
        </p>
        <el-input v-model="rows" style="max-width: 110px; margin-left: 20px; font-size: 18px">
          <template #prepend>行</template>
        </el-input>
        <el-input v-model="cols" style="max-width: 220px; font-size: 16px">
          <template #prepend>列</template>
          <template #append>
            <el-button
              style="font-size: 16px; margin: 0; padding: 0"
              @click="rowOrColAction('add')"
            >
              新增
            </el-button>
            <el-button
              style="font-size: 16px; margin: 0 0 0 10px; padding: 0"
              @click="rowOrColAction('delete')"
            >
              删除
            </el-button>
          </template>
        </el-input>
        <el-button
          type="danger"
          style="font-size: 16px; margin-left: 10px; font-size: 18px"
          @click="beforeClose"
        >
          关闭
        </el-button>
      </template>
    </el-dialog>

    <el-dialog
      v-model="moreImg"
      title="附加图片"
      :width="700"
      :top="'20px'"
      :modal="false"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :destroy-on-close="true"
      draggable
      overflow
    >
      <el-anchor
        :container="containerRef"
        direction="horizontal"
        type="default"
        :marker="false"
        :select-scroll-top="true"
        @click="handleClick"
      >
        <el-button class="toAdd" size="small" type="primary" @click="imgAction('add')">
          添加图片
        </el-button>
        <el-anchor-link
          :title="j + 1"
          :href="`#moreImage_${j}`"
          v-for="(s, j) in srcList.length"
          :key="s"
        />
      </el-anchor>
      <ul class="moreImg" ref="containerRef">
        <li v-for="(item, i) in srcList" :key="i" :id="`moreImage_${i}`">
          <span title="点击删除" @click="imgAction('delete', i)">X</span>
          <img :src="item" alt="" />
        </li>
      </ul>
      <template #footer>
        <div>
          <el-button type="danger" @click="moreImg = false">关闭</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>
<script setup>
  import DB from '@utils/indexdb';
  import Xsheet from './indexDB/xsheet.vue';
  let containerRef = ref(null);
  let loading = ref(false);

  // 角色下拉列表数据
  let roleMetaData = ['需求', '前端', '后端', '测试'];
  let role = ref([]);
  let roleNum = computed(() => `${(role.value.length * 66.5) / 2}px`);
  let roleNum1 = computed(() => {
    if (role.value.length === 1) {
      return `${role.value.length * 10 + 63.3 / 2}px`;
    } else {
      return `${role.value.length * 10 + ((66.3 * role.value.length) / 2 - 63.3 / 2)}px`;
    }
  });
  let roleNum2 = computed(() => `${63.5 / 2}px`);
  let firstLevelTop = computed(() => `${65.4 / 2}px`);
  let firstLevelBottom = computed(() => `${63.5 / 2}px`);
  let seeHasLine2 = computed(() => item => {
    return item.children.length == 1 && item.children[0].formData.length > 1;
  });
  let nav = ref([]);
  let navMetaData = ref([]);
  let filter = reactive({
    role: '', // 角色
    program: [], // 项目
    name: '', // 负责人
  });
  let props = {
    checkStrictly: true,
  };
  let programList = ref([]); // 项目下拉列表数据
  let nameList = ref([]); // 姓名下拉列表数据
  let selectNav = ref('');
  // 获取数据
  let dbName = 'excelDB',
    storeName = 'storeName',
    key = 'page',
    version = 1,
    page = 1,
    size = 5;
  let rows = ref(0),
    cols = ref(0),
    now = reactive({ row: 0, col: 0 });
  init();
  let imgs = useTemplateRef('imgs');
  function getImgUrl() {
    let canvas = document.createElement('canvas');
    let ctx = canvas.getContext('2d');
    let img = new Image();
    img.src = new URL('@/assets/imgs/1.png', import.meta.url).href;
    canvas.width = img.width = 130;
    canvas.height = img.height = 75;
    img.onload = function () {
      ctx.drawImage(img, 0, 0, img.width, img.height);
      let url = canvas.toDataURL('image/png');
      console.log(url);
    };
  }
  // getImgUrl();

  function init() {
    loading.value = true;
    role.value = roleMetaData;
    DB.openDB(dbName, version, storeName, key).then(isOk => {
      if (isOk) {
        DB.readData('myBill').then(res => {
          if (!res) {
            navMetaData.value = [
              {
                title: '我的单据',
                page: 'myBill',
                order: 1,
              },
              {
                title: '销售合同管理',
                page: 'xsIndex',
                order: 2,
                children: [
                  {
                    title: '销售合同管理',
                    page: 'xs_xiaoshou',
                  },
                  {
                    title: '合同模版映射查询',
                    page: 'xs_muban',
                  },
                  {
                    title: '合同映射管理',
                    page: 'xs_yingshe',
                  },
                  {
                    title: '价格公式查询',
                    page: 'xs_gongshi',
                  },
                ],
              },
              {
                title: '采购合同管理',
                page: 'cgIndex',
                order: 3,
                children: [
                  {
                    title: '采购合同管理',
                    page: 'cg_caigou',
                  },
                ],
              },
              {
                title: '交易合同管理',
                page: 'jyIndex',
                order: 4,
                children: [
                  {
                    title: '交易合同模板查询',
                    page: 'jy_muban',
                  },
                  {
                    title: '交易合同文本查询',
                    page: 'jy_wenben',
                  },
                  {
                    title: '交易合同文本审核查询',
                    page: 'jy_shenhe',
                  },
                  {
                    title: '交易合同签署查询',
                    page: 'jy_qianshu',
                  },
                  {
                    title: '销售合同管理查询',
                    page: 'jy_xiaoshou',
                  },
                  {
                    title: '采购合同管理查询',
                    page: 'jy_caigou',
                  },
                ],
              },
              {
                title: '订单管理',
                page: 'ddIndex',
                order: 5,
                children: [
                  {
                    title: '销售订单',
                    page: 'dd_xiaoshou',
                  },
                  {
                    title: '销售订单',
                    page: 'dd_caigou',
                  },
                ],
              },
              {
                title: '物流管理',
                page: 'wlIndex',
                order: 6,
                children: [
                  {
                    title: '汽运拉运通知单',
                    page: 'wl_qiyunlayun',
                  },
                  {
                    title: '汽运派车单及运力填报',
                    page: 'wl_qiyunpaiche',
                  },
                  {
                    title: '汽运运单',
                    page: 'wl_qiyunyundan',
                  },
                  {
                    title: '铁运拉运通知单',
                    page: 'wl_tieyunlayun',
                  },
                  {
                    title: '铁运派车单及运力填报',
                    page: 'wl_tieyunpaiche',
                  },
                  {
                    title: '铁运运单',
                    page: 'wl_tieunyundan',
                  },
                  {
                    title: '铁运下水装车',
                    page: 'wl_tieyunxiashui',
                  },
                  {
                    title: '铁运下水接卸',
                    page: 'wl_tieyunxiashuijiexie',
                  },
                  {
                    title: '装船通知单',
                    page: 'wl_zhuangchuan',
                  },
                  {
                    title: '装船通知单审核',
                    page: 'wl_zhuangchuanshenhe',
                  },
                  {
                    title: '船运运单',
                    page: 'wl_chuanyunyundan',
                  },
                ],
              },
              {
                title: '仓储管理',
                page: 'ccIndex',
                order: 7,
                children: [
                  {
                    title: '汽运入库查询',
                    page: 'cc_qiyunruku',
                  },
                  {
                    title: '铁运入库查询',
                    page: 'cc_tieyunruku',
                  },
                  {
                    title: '船运入库查询',
                    page: 'cc_chuanyunruku',
                  },
                  {
                    title: '库存查询',
                    page: 'cc_kuncun',
                  },
                  {
                    title: '汽运出库查询',
                    page: 'cc_qiyunchuku',
                  },
                  {
                    title: '铁运出库查询',
                    page: 'cc_tieyunchuku',
                  },
                  {
                    title: '船运出库查询',
                    page: 'cc_tieyunchuku',
                  },
                ],
              },
              {
                title: '数质量管理',
                page: 'zlIndex',
                order: 8,
                children: [
                  {
                    title: '车辆质量管理',
                    page: 'zl_cheliang',
                  },
                  {
                    title: '船舶质量管理',
                    page: 'zl_chuanbo',
                  },
                  {
                    title: '水尺管理',
                    page: 'zl_shuichi',
                  },
                  {
                    title: '磅单管理',
                    page: 'zl_bangdan',
                  },
                  {
                    title: '铁运过衡管理',
                    page: 'zl_guoheng',
                  },
                ],
              },
              {
                title: '价格目录管理',
                page: 'jgIndex',
                order: 9,
                children: [
                  {
                    title: '价差方案',
                    page: 'jg_chajia',
                  },
                  {
                    title: '采购价格目录',
                    page: 'jg_caigou',
                  },
                  {
                    title: '销售价格目录',
                    page: 'jg_xiaoshou',
                  },
                ],
              },
              {
                title: '收付款管理',
                page: 'sfIndex',
                order: 10,
                children: [
                  {
                    title: '收款管理',
                    page: 'sf_shoukuan',
                  },
                  {
                    title: '流水发布与认领',
                    page: 'sf_liushui',
                  },
                  {
                    title: '销售退款管理',
                    page: 'sf_xiaoshou',
                  },
                  {
                    title: '货款预付款申请',
                    page: 'sf_daikuanyufu',
                  },
                  {
                    title: '客户资金台账',
                    page: 'sf_kehuzijin',
                  },
                  {
                    title: '货款付款管理',
                    page: 'sf_daikuanfukuan',
                  },
                  {
                    title: '费用付款申请',
                    page: 'sf_feiyong',
                  },
                ],
              },
              {
                title: '结算管理',
                page: 'jsIndex',
                order: 11,
                children: [
                  {
                    title: '销售结算管理',
                    page: 'js_xiaoshou',
                  },
                  {
                    title: '采购结算管理',
                    page: 'js_caigou',
                  },
                  {
                    title: '采购截止性',
                    page: 'js_caigoujiezhi',
                  },
                  {
                    title: '销售截止性',
                    page: 'js_xiaoshoujiezhi',
                  },
                ],
              },
              {
                title: '主数据管理',
                page: 'zsIndex',
                order: 12,
                children: [
                  {
                    title: '组织机构管理',
                    page: 'zs_zuzhijiegou',
                  },
                  {
                    title: '人员主数据管理',
                    page: 'zs_renyuan',
                  },
                  {
                    title: '商品信息管理',
                    page: 'zs_shangpin',
                  },
                  {
                    title: '客户信息管理',
                    page: 'zs_kehu',
                  },
                  {
                    title: '供应商信息管理',
                    page: 'zs_gongyingshang',
                  },
                  {
                    title: '化工商品信息管理',
                    page: 'zs_huagong',
                  },
                ],
              },
              {
                title: '基础数据',
                page: 'jcIndex',
                order: 13,
                children: [
                  {
                    title: '港口数据管理',
                    page: 'jc_gangkou',
                  },
                  {
                    title: '港务公司数据管理',
                    page: 'jc_gangwu',
                  },
                  {
                    title: '铁路站点管理',
                    page: 'jc_tieluzhandian',
                  },
                  {
                    title: '铁路线路管理',
                    page: 'jc_tieluxianlu',
                  },
                  {
                    title: '资源数据管理',
                    page: 'jc_ziyuan',
                  },
                  {
                    title: '区域市场数据管理',
                    page: 'jc_quyushichang',
                  },
                  {
                    title: '生产单位数据管理',
                    page: 'jc_shengchan',
                  },
                  {
                    title: '编码规则数据管理（单据）',
                    page: 'jc_bianma',
                  },
                  {
                    title: '垛位数据管理',
                    page: 'jc_duowei',
                  },
                  {
                    title: '泊位数据管理',
                    page: 'jc_bowei',
                  },
                  {
                    title: '币种数据管理',
                    page: 'jc_bizhong',
                  },
                  {
                    title: '单位数据管理',
                    page: 'jc_danwei',
                  },
                  {
                    title: '行业数据管理',
                    page: 'jc_hangye',
                  },
                  {
                    title: '煤炭品种数据管理',
                    page: 'jc_meitan',
                  },
                  {
                    title: '煤种数据管理',
                    page: 'jc_meizhong',
                  },
                  {
                    title: '地理位置数据管理',
                    page: 'jc_dili',
                  },
                  {
                    title: '煤化品分类数据管理',
                    page: 'jc_fenlei',
                  },
                  {
                    title: '煤化品牌号数据管理',
                    page: 'jc_paihao',
                  },
                  {
                    title: '煤化品商品数据管理',
                    page: 'jc_shangpin',
                  },
                  {
                    title: '库存组织管理',
                    page: 'jc_kucun',
                  },
                  {
                    title: '组织机构管理',
                    page: 'jc_zuzhi',
                  },
                ],
              },
              {
                title: '客商管理',
                page: 'ksIndex',
                order: 14,
                children: [
                  {
                    title: '评估模板',
                    page: 'ks_pinggu',
                  },
                  {
                    title: '客商注册申请查询',
                    page: 'ks_keshangzhuce',
                  },
                  {
                    title: '客户准入申请查询',
                    page: 'ks_kehuzhunru',
                  },
                  {
                    title: '客户年度评估申请查询',
                    page: 'ks_niandupinggu',
                  },
                  {
                    title: '客户定级评估申请查询',
                    page: 'ks_kehudingji',
                  },
                  {
                    title: '客户档案管理',
                    page: 'ks_kehudangan',
                  },
                  {
                    title: '客户退出申请查询',
                    page: 'ks_tuichu',
                  },
                  {
                    title: '客商风险管理查询',
                    page: 'ks_keshang',
                  },
                  {
                    title: '客户档案信息变更',
                    page: 'ks_dangan',
                  },
                  {
                    title: '客户黑白名单申请查询',
                    page: 'ks_heibai',
                  },
                  {
                    title: '禁入客商查询',
                    page: 'ks_jinru',
                  },
                ],
              },
              {
                title: '供应商管理',
                page: 'gyIndex',
                order: 15,
                children: [
                  {
                    title: '供应商档案管理',
                    page: 'gy_dangan',
                  },
                  {
                    title: '供应商档案信息变更',
                    page: 'gy_biangeng',
                  },
                  {
                    title: '供应商年度评估申请',
                    page: 'gy_pinggu',
                  },
                  {
                    title: '供应商风险管理',
                    page: 'gy_fengxian',
                  },
                ],
              },
              {
                title: '计划管理',
                page: 'jhIndex',
                order: 16,
                children: [
                  {
                    title: '煤炭月度销售计划管理',
                    page: 'jh_xiaoshou',
                  },
                ],
              },
              {
                title: '数据直采',
                page: 'sjIndex',
                order: 17,
                children: [
                  {
                    title: '行驶里程信息',
                    page: 'sj_licheng',
                  },
                  {
                    title: '运输规划信息',
                    page: 'sj_yunshu',
                  },
                  {
                    title: '中途停车信息',
                    page: 'sj_zhongtu',
                  },
                  {
                    title: '轨迹位置信息',
                    page: 'sj_guiji',
                  },
                  {
                    title: '船舶信息',
                    page: 'sj_chuanbo',
                  },
                  {
                    title: '船舶事件信息',
                    page: 'sj_chuanboshijian',
                  },
                  {
                    title: '历史轨迹信息',
                    page: 'sj_lishiguiji',
                  },
                  {
                    title: '进出港信息',
                    page: 'sj_jinchugang',
                  },
                  {
                    title: '实时追踪信息',
                    page: 'sj_shishi',
                  },
                  {
                    title: '天气预报',
                    page: 'sj_tianqi',
                  },
                  {
                    title: '企业基本信息',
                    page: 'sj_jiben',
                  },
                  {
                    title: '风险查询结果',
                    page: 'sj_fengxian',
                  },
                  {
                    title: '风险分类',
                    page: 'sj_fenlei',
                  },
                  {
                    title: '风险详情',
                    page: 'sj_xiangqing',
                  },
                  {
                    title: '风险项',
                    page: 'sj_fengxianxiang',
                  },
                  {
                    title: '风险详情信息',
                    page: 'sj_xiangqingxinxi',
                  },
                ],
              },
            ];
            api.getMethod('/getData').then(data => {
              navMetaData.value.forEach(t => {
                if (!t.children) {
                  initData(t, data);
                } else {
                  t.children.forEach(tar => {
                    initData(tar, data);
                  });
                }
              });
              // 获取负责人姓名列表
              DB.updateData(navMetaData.value).then(res => {
                nav.value = navMetaData.value;
                makeFilterList();
                nextTick(() => {
                  loading.value = false;
                });
              });
            });
          } else {
            reset();
          }
        });
      }
    });
    function initData(t, data) {
      t.formData = [
        { label: '需求', value: '', disabled: true },
        { label: '前端', value: '', disabled: true },
        { label: '后端', value: '', disabled: true },
        { label: '测试', value: '', disabled: true },
      ];
      t.shortData = {
        total: 0,
        before: 0,
        colse: 0,
        so: 0,
        handle: 0,
      };
      t.excelData = [];
      if (t.page in data) {
        t.excelData = data[t.page];
        t.shortData.total = t.excelData.length; // bug总数
        t.excelData.forEach(s => {
          let state = s[s.length - 2];
          switch (state) {
            case '待修复':
              t.shortData.before++;
              break;
            case '关闭':
              t.shortData.close++;
              break;
            case '需求如此':
              t.shortData.so++;
              break;
            case '已修复待发版':
              t.shortData.handle++;
              break;
          }
        });
      }
    }
  }
  function makeFilterList() {
    let arr = [];
    navMetaData.value.forEach(t => {
      if (!t.children) {
        programList.value.push({ label: t.title, value: t.page });
        arr.push(...t.formData.map(s => s.value.trim()));
      } else {
        let obj = {
          label: t.title,
          value: t.page,
          children: [],
        };
        programList.value.push(obj);
        t.children.forEach(tar => {
          obj.children.push({ label: tar.title, value: tar.page });
          arr.push(...tar.formData.map(s => s.value.trim()));
        });
      }
    });
    // 获取负责人姓名列表
    nameList.value = [...new Set(arr)].filter(s => s);
    selectNav.value = navMetaData.value[0].page;
  }
  // 重置筛选
  function reset() {
    loading.value = false;
    filter.role = '';
    filter.program = [];
    filter.name = '';
    role.value = roleMetaData;
    DB.readDataAll().then(res => {
      navMetaData.value = res;
      nav.value = navMetaData.value;
      makeFilterList();
      nextTick(() => {
        loading.value = false;
      });
    });
  }
  // 筛选
  function toFilter() {
    if (filter.role || filter.program.length || filter.name) {
      let arr = [];
      if (filter.program.length) {
        navMetaData.value.forEach(tar => {
          if (filter.program.includes(tar.page)) {
            if (!tar.children || filter.program.length == 1) {
              arr.push(tar);
            } else {
              let obj = {
                children: [],
              };
              tar.children.forEach(item => {
                if (filter.program.includes(item.page)) {
                  obj.children.push(item);
                }
              });
              if (obj.children.length) {
                Object.keys(tar).forEach(str => {
                  if (str !== 'children') {
                    obj[str] = tar[str];
                  }
                });
                arr.push(obj);
              }
            }
          }
        });
      }
      if (filter.role) {
        if (!arr.length) {
          arr = deepClone(nav.value);
        }
        role.value = roleMetaData.filter(tar => tar == filter.role);
      }
      if (filter.name) {
        let list;
        role.value = [];
        if (arr.length) {
          list = arr;
        } else {
          list = navMetaData.value;
        }
        list.forEach(tar => {
          if (!tar.children) {
            let result = nameFilter(tar);
            if (result) {
              arr.push(result);
            }
          } else {
            let obj = {
              children: [],
            };
            tar.children.forEach(item => {
              let result = nameFilter(item);
              if (result) {
                obj.children.push(result);
              }
            });
            if (obj.children.length) {
              Object.keys(tar).forEach(str => {
                if (str !== 'children') {
                  obj[str] = tar[str];
                }
              });
              arr.push(obj);
            }
          }
        });
      }
      nav.value = arr;
      selectNav.value = arr[0].page;
    } else {
      ElMessage({
        message: '请选择筛选条件',
        type: 'warning',
      });
    }
    function nameFilter(tar) {
      let names = tar.formData.map(s => s.value);
      if (names.includes(filter.name)) {
        let zz = deepClone(tar);
        zz.formData = [];
        tar.formData.forEach(v => {
          if (v.value == filter.name) {
            zz.formData.push(v);
            if (!role.value.length) {
              role.value = roleMetaData.filter(t => t == v.label);
            } else {
              role.value = role.value.concat(roleMetaData.filter(t => t == v.label));
            }
          }
        });
        return zz.formData.length ? zz : null;
      }
    }
  }
  // 保存负责人
  function editRole(tar, item) {
    if (!tar.disabled) {
      if (tar.value) {
        tar.disabled = true;
        DB.updateData(item).then(res => {
          if (res) {
            ElMessage({
              message: '保存成功',
              type: 'success',
            });
            makeFilterList();
          }
        });
      } else {
        ElMessage({
          message: '请输入负责人',
          type: 'warning',
        });
      }
    } else {
      tar.disabled = false;
    }
  }
  // 删除模块
  function deleteData(title) {
    DB.deleteData(title).then(res => {
      if (res) {
        ElMessage({
          message: '删除成功',
          type: 'success',
        });
        reset();
      }
    });
  }

  let moreImg = ref(false);
  let srcList = ref([]);
  let select = ref(null);
  function xsheetShowImgs(e) {
    select.value = e;
    let tar = excelData.value.excelData[e.row - 1]?.[e.col];
    if (!tar) {
      excelData.value.excelData[e.row - 1] = [];
      excelData.value.excelData[e.row - 1][e.col] = {
        type: 'moreImg',
        value: [],
      };
      tar = excelData.value.excelData[e.row - 1][e.col];
    }
    srcList.value = tar.value;
    moreImg.value = true;
  }

  let excelData = ref(null);
  let dialogVisible = ref(false);
  let dialogTitle = ref('');
  let sheetRef = useTemplateRef('sheetRef');
  function seeBug(item) {
    loading.value = true;
    excelData.value = item;
    dialogTitle.value = `项目分模块管理 — ${item.title}`;
    dialogVisible.value = true;
  }
  function selectChange(data) {
    now.row = data.row;
    now.col = data.col;
  }

  // 接收excell数据
  function saveData(e) {
    excelData.value.excelData = e;
    DB.updateData(excelData.value);
  }
  function imgAction(type, index) {
    loading.value = false;
    if (type === 'add') {
      let input = document.createElement('input');
      input.type = 'file';
      input.multiple = true;
      input.onchange = function (e) {
        let files = [...e.target.files];
        files.forEach((file, i) => {
          let reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = e => {
            let url = e.target.result;
            if (!excelData.value.excelData[select.value.row - 1]) {
              excelData.value.excelData[select.value.row - 1] = [];
              excelData.value.excelData[select.value.row - 1][[select.value.col]] = {
                type: 'moreImg',
                value: [],
              };
            }
            srcList.value.push(url);
            if (i === files.length - 1) {
              resetImg(type);
            }
          };
        });
      };
      input.click();
    } else {
      srcList.value.splice(index, 1);
      resetImg(type);
    }
    function resetImg(type) {
      DB.updateData(excelData.value).then(() => {
        sheetRef.value.changeText();
        loading.value = false;
        ElMessage({
          message: `${type === 'add' ? '添加' : '删除'}成功！`,
          type: 'success',
        });
      });
    }
  }
  function toShow(tar) {
    selectNav.value = tar.page;
    document.getElementById(`${tar.page}`).scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
  function beforeClose() {
    sheetRef.value.resolveData.univerAPI.getActiveWorkbook().endEditingAsync(true);
     sheetRef.value.resetAllListener();
    nextTick(() => {
      DB.updateData(excelData.value).then(() => {
        dialogVisible.value = false;
        excelData.value = null;
      });
    });
  }
  function rowOrColAction(type) {
    if (rows.value || cols.value) {
      sheetRef.value.OtherFn(type, +rows.value, +cols.value);
      nextTick(() => {
        rows.value = 0;
        cols.value = 0;
      });
    } else {
      ElMessage({
        message: '请输入行列数！',
        type: 'warning',
      });
    }
  }
  // onUnmounted(deleteDBAll);
  // function deleteDBAll() {
  //   DB.closeDB().then(() => {
  //     DB.deleteDBAll();
  //   });
  // }
</script>
<style lang="scss" scoped>
  .scrollBar {
    height: calc(100% - 172px);
    padding: 10px 30px;
    padding-bottom: 0;
    overflow-y: auto;
  }
  .filter {
    display: flex;
    margin: 5px 0;
    & > li {
      margin-left: 30px;
    }
    color: #00a4e0;
  }
  ul {
    list-style-type: none;
  }
  .title {
    position: relative;
    display: inline-block;
    padding: 5px 5px 8px 5px;
    text-align: center;
    background-color: rgb(220, 230, 255);
    width: 90px;
    font-size: 14px;
    &::after {
      content: '';
      display: inline-block;
      position: absolute;
      top: 50%;
      right: -16px;
      width: 16px;
      height: 1px;
      background-color: #747474;
    }
  }
  .wapTwo {
    position: relative;
    .twoLevel {
      margin-left: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
      .title {
        text-align: left;
        > p {
          font-size: 16px;
          color: crimson;
          text-align: center;
        }
        &::before {
          content: '';
          display: inline-block;
          position: absolute;
          top: 50%;
          left: -15px;
          width: 15px;
          height: 1px;
          background-color: #747474;
        }
      }
    }
    .el-button {
      padding: 5px 10px;
      position: absolute;
      transform: translateY(-50%);
      margin: 0;
    }
    & > .el-button {
      top: 50%;
      right: -40%;
      &::before {
        content: '';
        display: inline-block;
        position: absolute;
        top: 50%;
        left: -15px;
        width: 15px;
        height: 1px;
        background-color: #747474;
      }
    }
    & > li .el-button {
      top: 65%;
      right: 5%;
    }
    .short {
      position: absolute;
      top: 50%;
      left: 150%;
      width: 280px;
      background-color: rgb(214, 249, 237);
      padding: 3px 10px;
      transform: translateY(-50%);
      display: grid;
      grid-template-columns: 58% 42%;
      justify-content: space-between;
    }
  }
  .firstLevel {
    display: flex;
    align-items: center;
    position: relative;
    margin-bottom: 20px;
    & > .wapTwo .title {
      width: 220px;
    }
  }
  .firstLevelLine {
    &::before {
      content: '';
      display: inline-block;
      position: absolute;
      top: v-bind(firstLevelTop);
      left: 115px;
      width: 1px;
      bottom: v-bind(firstLevelBottom);
      background-color: #747474;
    }
    &::after {
      content: '';
      display: inline-block;
      position: absolute;
      top: v-bind(firstLevelTop);
      left: 376px;
      width: 1px;
      bottom: v-bind(firstLevelBottom);
      background-color: #747474;
    }
  }
  .secondLevel {
    > li {
      margin: 0 0 10px 30px;
      display: flex;
      align-items: center;
      & > .title {
        width: 140px;
        &::before {
          content: '';
          display: inline-block;
          position: absolute;
          top: 50%;
          left: -15px;
          width: 15px;
          height: 1px;
          background-color: #747474;
        }
      }
      .wapTwo .title {
        width: 220px;
      }
    }
  }
  .hasLine {
    &::before {
      content: '';
      display: inline-block;
      position: absolute;
      top: v-bind(roleNum);
      left: 115px;
      width: 1px;
      bottom: v-bind(roleNum1);
      background-color: #747474;
    }
    .twoLevelLine {
      &::before {
        content: '';
        display: inline-block;
        position: absolute;
        top: 12.5%;
        left: 15px;
        width: 1px;
        bottom: 12.5%;
        background-color: #747474;
      }
      &::after {
        content: '';
        display: inline-block;
        position: absolute;
        top: 12.5%;
        right: -17px;
        width: 1px;
        bottom: 12.5%;
        background-color: #747474;
      }
    }
  }
  .hasLine2 {
    & .wapTwo {
      &::before {
        content: '';
        display: inline-block;
        position: absolute;
        top: v-bind(roleNum2);
        left: 15px;
        width: 1px;
        bottom: 12.5%;
        background-color: #747474;
      }
      &::after {
        content: '';
        display: inline-block;
        position: absolute;
        top: 12.5%;
        right: -17px;
        width: 1px;
        bottom: 12.5%;
        background-color: #747474;
      }
    }
  }
  .mao {
    padding: 10px;
    display: grid;
    // repeat() 的括号内做很多事情。它接收两个参数，中间用逗号隔开。
    // 第一个参数代表"计数"，第二个参数代表"轨道"，轨道是一列或一行的通用名称
    grid-template-columns: repeat(auto-fit, min(100px)); // 1fr，即可用空间的几分之一
    grid-gap: 10px 2px;
    justify-content: space-between;
    text-align: center;
    li {
      cursor: pointer;
      &:hover {
        color: #2f6cf9;
      }
    }
    .beSelect {
      color: #00a4e0;
    }
  }
  .moreImg {
    width: calc(100% + 16px);
    max-height: 70vh;
    min-height: 20vh;
    overflow-y: auto;
    li {
      position: relative;
      > span {
        display: inline-block;
        position: absolute;
        top: 0;
        left: 0px;
        width: 20px;
        height: 20px;
        background-color: rgb(231, 229, 229);
        border-radius: 0 0 10px 0;
        font-size: 18px;
        text-align: center;
        z-index: 2;
        line-height: 18px;
        color: #000;
        cursor: pointer;
        &:hover {
          background-color: rgb(186, 220, 249);
        }
      }
    }
    li:not(:last-child) {
      margin-bottom: 10px;
    }
    img {
      width: 100%;
      aspect-ratio: 1.45;
    }
  }
  :global(.el-dialog__body) {
    overflow: hidden;
  }
  :global(.el-overlay-dialog) {
    overflow: hidden;
  }
  :global(.el-dialog__header) {
    padding-bottom: 0;
  }
  :global(.el-dialog__footer) {
    padding: 0;
  }
  :global(.el-anchor__list) {
    padding-bottom: 0px;
  }
</style>
