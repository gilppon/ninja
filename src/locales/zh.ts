import { Translations } from './types';

const zh: Translations = {
  nav: { lobby: '大厅', game: '任务', shop: '商店', gear: '装备' },
  lobby: {
    hotEvent: '热门活动',
    premium: '高级',
    unlock: '解锁 {price}',
    individualUnlock: '单独解锁 ($3.99)',
    tactics: '战术',
    passiveSkillTitle: '被动技能',
    standardOperative: '标准特工 — 无被动技能',
    elementAura: '元素光环',
    enterDojo: '进入道场',
    menuFund: '基金',
    menuWelfare: '福利',
    menuExchange: '兑换',
    stats: {
      coin: '金币 ×{val}',
      combo: '连击 {val}秒',
      slow: '减速 -{val}%',
      shield: '护盾 / {val}秒'
    }
  },
  shop: {
    title: '赛博商店',
    subtitle: '升级您的忍者装备',
    gachaTitle: '幸运抽奖',
    gachaDesc: '随机获得高级装备',
    gachaButton: '抽取 10000 🪙',
    gachaNoItems: '售罄',
    purchased: '已购买',
    features: '特性',
    acquire: '获取',
    newGearUnlocked: '新装备解锁！',
    levelUpSuccess: '强化成功！',
    maxLevel: '已达到最高等级',
    continue: '继续',
    rarity: { COMMON: '普通', RARE: '稀有', EPIC: '史诗', LEGENDARY: '传说' },
    items: {
      aegis: {
        name: '灵魂之盾',
        desc: '无视物理法则突破生命极限，连致命伤害都能无情吞噬的奇迹防具。',
        features: ['最大生命值 +50', '受到伤害减少 20%']
      },
      time_shuriken: {
        name: '时空手里剑',
        desc: '让新手也能实现无限热潮。防御被击时的连击暴跌，并令奥义槽进入暴走状态的神级武器。',
        features: ['被击时连击减半', '奥义槽获得量 1.5倍']
      },
      dragon_slayer: {
        name: '屠龙者',
        desc: '仅需一次挥砍即可斩断首领命脉并掏空其口袋的凶残大剑。',
        features: ['金币获得量 1.5倍', '首领伤害 1.5倍']
      },
      golden_jitte: {
        name: '黄金十手',
        desc: '忍者真正的武器不是刀而是钱。坐收渔利将金币翻倍，资本主义的巅峰之作。',
        features: ['金币获得量 2.0倍']
      },
      revival_scroll: {
        name: '复活卷轴',
        desc: '能将你从死亡边缘拉回来的神秘卷轴。',
        features: ['瞬间复活', '消耗品', '重返战场']
      }
    }
  },
  game: {
    score: '得分',
    combo: '连击',
    fever: '狂热!!',
    ultimate: '终极技能',
    bossIncoming: '首领即将来袭',
    killsUntilBoss: '距离首领出现还需击杀 {val} 名敌人',
    usePattern: '使用图案！',
    tracePath: '跟随发光路径',
    swipeCheckpoints: '按顺序滑动通过 {val} 个检查点',
    targetSkill: '目标技能',
    patternStrike: '图案打击！',
    counterAttack: '遭到反击！-15 HP',
    patterns: {
      'LIGHTNING SLASH': '闪电斩击',
      'CROSS STRIKE': '十字打击',
      'V STRIKE': 'V字打击',
      'RISING DRAGON': '升龙斩击',
      'DEATH SPIRAL': '死亡螺旋',
      'Z-STRIKE': 'Z字打击',
      'PENTAGRAM': '五角星',
      'HEXAGON SEAL': '六角封印',
      'CROSS EXECUTION': '十字处决',
      'INFINITY SLASH': '无限斩击'
    }
  },
  topBar: {
    player: '玩家_单位',
    title: '忍者_OS',
    assets: '资产'
  },
  login: {
    firewallAccess: '防火墙访问',
    firebaseDeploy: 'Firebase部署',
    newIdentity: '新Firebase身份',
    encryptedAuth: '加密身份验证',
    email: '安全电子邮件',
    password: '访问令牌',
    authorizing: '授权中...',
    deployIdentity: '部署身份',
    overrideFirewall: '破解防火墙',
    signInPrompt: '以前登录过？登录',
    signUpPrompt: '新成员？在Firebase注册',
    abortAuth: '[ 中止身份验证 ]',
    googleSignIn: '使用GOOGLE登录',
    dividerOr: '或者',
  },
  menu: {
    daoFund: 'DAO等级基金进行中...',
    dailyGift: '每日礼包',
    claimed24h: '每24小时领取一次',
    claim50: '领取 50 🪙',
    premiumPass: '赛季全通证 ($9.99)',
    doubleRewards: '解锁所有特工 & 30天内奖励翻倍',
    activate: '激活 ($9.99)',
    exchangePrompt: '10 钻石 = 100 金币',
    exchangeBtn: '兑换资源',
    arsenalLogistics: '忍者武库与后勤'
  },
  failModal: {
    header: '任务失败',
    title: '战败',
    desc: '你的旅程到此结束了吗...？',
    lostIdentity: '身份丢失？',
    revivePrompt: '立即注册以保存灵魂并重返战场！ 🥷',
    exclusiveReward: '新忍者的专属奖励',
    syncRevive: '同步并复活 🥷',
    buy: '复活',
    cancel: '放弃',
    legendary: '传说',
    itemName: '金龙之刃',
    itemDesc: '一把能违抗死亡本身的刀刃。'
  },
  characters: {
    MASTER: {
      role: '忍者',
      description: '传统的忍者技术。精通潜行和快速近距离暗杀。',
      passiveDesc: '无'
    },
    JADE: {
      role: '侦察兵',
      description: '高机动性和侦察能力。擅长收集情报和游击战术。',
      passiveDesc: '无'
    },
    FLAME: {
      role: '突击兵',
      description: '重火力专家。利用纵火武器突破敌方防线。',
      passiveDesc: '[贪婪] 金币收益 x1.5 / 火焰斩击'
    },
    ICE: {
      role: '狙击手',
      description: '经过专门训练，精通精准射击、伪装和侦察技能。',
      passiveDesc: '[冻伤] 连击时间2倍 / 减速敌人'
    },
    THUNDER: {
      role: '支援兵',
      description: '战术支援人员。部署护盾以保护队友并干扰敌人。',
      passiveDesc: '[静电护甲] 每20秒获得1层减伤护盾'
    }
  },
  gear: {
    title: '武器库',
    empty: '暂无装备。前往商店获取吧！',
    equip: '装备',
    equipped: '已装备',
    noWeapon: '无武器',
    statusReady: '已装备・战斗就绪',
    statusAwaiting: '等待选择装备',
    rarityLabel: '稀有度',
    bonusLabel: '强化加成'
  },
  quest: {
    selectMission: '选择任务',
    availableContracts: '可接受的合同',
    back: '返回',
    levelPrefix: '关卡',
    briefing: '任务简报',
    target: '目标',
    reward: '奖励',
    coins: '金币',
    launch: '开始任务',
    difficulty: {
      Normal: '普通',
      Hard: '困难',
      Extreme: '极限',
      Elite: '精英'
    },
    missions: {
      q1: { title: '霓虹郊区', description: '消灭穿越霓虹外围区域的失控无人机。' },
      q2: { title: '冰封设施', description: '被时间冻结的赛博设施。击败守护核心的霓虹鬼。' },
      q3: { title: '龙之巅峰', description: '登上巅峰，击杀引发电子风暴的赛博巨龙。' },
      q4: { title: '虚空异变', description: '深入虚空异变区域，在堕落的虚空忍者手下求存。' }
    }
  },
  achievements: {
    combo_10: { title: '连击入门', desc: '达到10连击' },
    combo_50: { title: '连击大师', desc: '达到50连击' },
    rich_ninja: { title: '富有忍者', desc: '持有500金币' },
    collector: { title: '收藏家', desc: '拥有3件物品' },
    unlocked: '成就解锁！'
  },
  victory: {
    title: '任务完成',
    missionComplete: '区域已确保',
    reward: '嘉奖',
    score: '最终得分',
    coins: '获得金币',
    next: '下一战场',
    lobby: '返回大厅',
    season2: '第一赛季完结。敬请期待第二赛季！'
  }
};

export default zh;
