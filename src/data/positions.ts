/**
 * 专业大类 → 细分岗位的两级联动数据
 * 数据抽离到独立文件，方便后续扩充或后台驱动
 *
 * 结构：Category { id, name, positions: string[] }
 * 每个大类包含若干细分岗位，前端选择大类后联动刷新细分岗位下拉框
 */
export interface PositionCategory {
  /** 大类唯一标识 */
  id: string
  /** 大类显示名称 */
  name: string
  /** 该大类下的细分岗位列表 */
  positions: string[]
}

/** 完整的岗位分类数据 */
export const positionCategories: PositionCategory[] = [
  {
    id: 'tech',
    name: '计算机与互联网类',
    positions: [
      '前端开发',
      '后端开发',
      '全栈开发',
      '算法工程师',
      '产品经理',
      'UI/UX设计师',
      '数据分析师',
      '数据工程师',
      'DevOps 工程师',
      'AI/机器学习工程师',
    ],
  },
  {
    id: 'finance',
    name: '经济与金融类',
    positions: [
      '金融分析师',
      '投资顾问',
      '审计员',
      '量化交易员',
      '银行客户经理',
      '市场营销',
      '风险控制专员',
      '保险精算师',
    ],
  },
  {
    id: 'media',
    name: '传媒与文科类',
    positions: [
      '新媒体运营',
      '内容编辑',
      '公关策划',
      '文案策划',
      '英语翻译',
      '教师',
      '记者/编导',
      '广告创意',
      '自媒体博主',
    ],
  },
  {
    id: 'business',
    name: '管理与商科类',
    positions: [
      '人力资源 HR',
      '项目管理',
      '供应链管理',
      '咨询顾问',
      '行政主管',
      '市场营销经理',
      '电商运营',
      '商业分析师',
    ],
  },
]

/** 默认选中的大类（第一个） */
export const DEFAULT_CATEGORY_ID = positionCategories[0].id

/**
 * 根据大类 ID 获取该分类的细分岗位列表
 * 找不到时返回空数组，UI 层据此禁用第二级下拉框
 */
export function getPositionsByCategory(categoryId: string): string[] {
  return positionCategories.find((c) => c.id === categoryId)?.positions ?? []
}

/** 根据大类 ID 获取大类完整信息（用于 Prompt 拼接时的名称展示） */
export function getCategoryById(categoryId: string): PositionCategory | undefined {
  return positionCategories.find((c) => c.id === categoryId)
}
