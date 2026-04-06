import React, { createContext, useState, useContext } from 'react';

export const translations = {
  en: {
    nav: {
      lobby: 'DOJO',
      game: 'QUESTS',
      shop: 'SHOP',
      gear: 'GEAR',
      comingSoon: 'Coming Soon'
    },
    topBar: {
      title: 'NINJA BRICK',
      player: 'MASTER',
      assets: 'ASSETS'
    },
    lobby: {
      pwaTitle: 'Level Up Your Screen',
      pwaDesc: 'Install NINJA BRICK as a PWA for fast-load action!',
      install: 'INSTALL',
      season: 'SEASON 1: BRICK-OUT',
      play: 'PLAY',
      enterDojo: 'Enter the Dojo',
      activeQuest: 'Active Quest',
      questTitle: 'THE JADE DRAGON PAGODA',
      new: 'NEW',
      megaPacks: 'MEGA PACKS',
      limitedKits: 'Limited Edition Kits',
      viewAll: 'VIEW ALL',
      invite: 'Invite',
      welfareTitle: 'Welfare',
      menuRecharge: 'RECHARGE',
      menuFund: 'FUND',
      menuWelfare: 'WELFARE',
      menuExchange: 'EXCHANGE',
      sale50: '50% SALE',
      loser: 'LOSER!',
      sendGift: 'SEND A GIFT',
      dailyRecharge: 'DAILY RECHARGE',
      rechargedToday: 'Recharged today',
      rechargeBtn: 'RECHARGE',
      hotEvent: 'HOT EVENT',
      dailyRewardInfo: 'DAILY REWARD INFO',
      rewardClaimed: 'REWARD CLAIMED',
      introduce: 'INTRODUCE',
      tactics: 'TACTICS',
      elementAura: 'ELEMENT AURA',
      available: 'AVAILABLE',
      deploy: 'DEPLOY',
      coinsAdded: '+50 COINS ADDED! 🪙',
      descPhysical: 'FOCUSES ON CORE PHYSICAL ABILITIES OVER ELEMENTAL ATTACKS. HIGH VITALITY.',
      descElemental: 'UNLEASHES DEVASTATING {element} ENERGY.'
    },
    shop: {
      title: "NINJA ARSENAL",
      subtitle: "MASTER THE ELEMENTS WITH LEGENDARY GEAR",
      items: {
        flame: { name: 'FLAME KATANA', desc: 'Slices through blocks like butter.', features: ['Damage +20%', 'Burn Effect', 'Attack Speed +10%'] },
        ice: { name: 'ICE SHURIKEN', desc: 'Freezes opponents mid-air.', features: ['Freeze Chance 15%', 'Range +30%', 'Crit +5%'] },
        jade: { name: 'JADE NUNCHUCKS', desc: 'Fast strikes with a dragon spirit.', features: ['Combo Duration +2s', 'Move Speed +15%', 'Evasion +10%'] },
        thunder: { name: 'THUNDER STAFF', desc: 'Shocking range and speed.', features: ['Chain Lightning', 'Stun Chance 10%', 'Damage +15%'] },
        storm: { name: 'STORMBRINGER', desc: 'Summons the fury of heaven.', features: ['Chain Lightning', 'Atk Speed +25%', 'Critical +15%'] },
        void: { name: 'VOID KATANA', desc: 'Slices through dimensions.', features: ['Lifesteal 5%', 'Crit +20%', 'Shadow Strike'] },
        solar: { name: 'SOLAR GLAIVE', desc: 'Radiates the heat of the sun.', features: ['Area Burn', 'Damage +30%', 'Fire Resistance'] },
        midnight: { name: 'MIDNIGHT DAGGER', desc: 'Silence is your best friend.', features: ['Evasion +20%', 'Move Speed +10%', 'Backstab +50%'] },
        emerald_sai: { name: 'EMERALD SAI', desc: 'Coated in mystic venom.', features: ['Poison Damage', 'Combo Duration +3s', 'Evasion +10%'] },
        glacier: { name: 'GLACIER SCYTHE', desc: 'Reap the frozen souls.', features: ['Area Freeze', 'Defense +15%', 'Range +20%'] },
        starfall: { name: 'STARFALL SHURIKEN', desc: 'Guidance from the cosmos.', features: ['Homing Projectiles', 'Range +50%', 'Crit +10%'] },
        golden: { name: 'GOLDEN KUNAI', desc: 'True wealth is in the strike.', features: ['Coin Bonus +50%', 'Score +20%', 'Luck +10%'] },
        oni: { name: 'ONI SMASHER', desc: 'Heavy weight, heavy impact.', features: ['Super Armor', 'Stun Chance +20%', 'Block Break'] },
        phantom: { name: 'PHANTOM BLADE', desc: 'Be the ghost in the machine.', features: ['Invisibility', 'Dmg Reduction +20%', 'Speed +15%'] }
      },
      rarity: {
        COMMON: "COMMON",
        RARE: "RARE",
        EPIC: "EPIC",
        LEGENDARY: "LEGENDARY"
      },
      features: "SPECIAL ABILITIES",
      purchased: "OWNED",
      acquire: "PURCHASE GEAR",
      gachaTitle: "SECRET SCROLL",
      gachaDesc: "DRAW A RANDOM ELITE GEAR",
      gachaButton: "DRAW (100 🪙)",
      gachaNoItems: "ALL GEAR COLLECTED!"
    },
    game: {
      score: 'Score',
      combo: 'COMBO',
      warning: 'WARNING',
      boss: 'BOSS APPROACHING'
    },
    gear: {
      title: 'ARMORY',
      equip: 'EQUIP',
      equipped: 'EQUIPPED',
      empty: 'Your armory is empty. Visit the shop to acquire gear!'
    },
    failModal: {
      header: 'NEW HIGH SCORE IMMINENT',
      title: "DRAGON'S BREATH RESURGENCE",
      desc: "Don't let your quest end here, Ninja! Unleash the fire.",
      legendary: 'LEGENDARY ITEM',
      itemName: 'GOLDEN DRAGON BLADE',
      itemDesc: '+500% Score Multiplier & Infinite Revives',
      buy: 'BUY NOW — $3.99',
      cancel: 'Maybe Next Time...'
    },
    characters: {
      MASTER: { role: 'ASSASSIN', description: 'TRADITIONAL ASSASSINATION NINJUTSU. STRIKES FROM THE SHADOWS TO ELIMINATE TARGETS UNSEEN.' },
      JADE: { role: 'TAIJUTSU', description: 'EXTREME MOBILITY TAIJUTSU. EXCELS AT HIGH-SPEED INFILTRATION AND TWIN-BLADE COMBAT.' },
      FLAME: { role: 'KATON', description: 'KATON (FIRE) NINJUTSU SPECIALIST. UTILIZES EXPLOSIVE FLAMES TO REDUCE HEAVILY ARMORED LINES TO ASHES.' },
      ICE: { role: 'HYOTON', description: 'HYOTON (ICE) NINJUTSU MASTER. DELIVERS FATAL FROSTBITE FROM AFAR WITH PRECISION SHURIKENS.' },
      THUNDER: { role: 'RAITON', description: 'RAITON (LIGHTNING) AND GENJUTSU (ILLUSION) MASTER. DEPLOYS LIGHTNING ILLUSIONS TO BLIND ENEMIES AND PROTECT ALLIES.' }
    }
  },
  ko: {
    nav: {
      lobby: '도장',
      game: '퀘스트',
      shop: '상점',
      gear: '장비',
      comingSoon: '출시 예정'
    },
    topBar: {
      title: '닌자 브릭',
      player: '마스터',
      assets: '보유 자산'
    },
    lobby: {
      pwaTitle: '화면 레벨업',
      pwaDesc: 'NINJA BRICK을 PWA로 설치하고 빠르게 즐기세요!',
      install: '설치',
      season: '시즌 1: 브릭-아웃',
      play: '플레이',
      enterDojo: '도장 입장',
      activeQuest: '진행 중인 퀘스트',
      questTitle: '옥룡의 탑',
      new: '신규',
      megaPacks: '메가 팩',
      limitedKits: '한정판 키트',
      viewAll: '모두 보기',
      invite: '초대',
      welfareTitle: '혜택',
      menuRecharge: '충전',
      menuFund: '펀드',
      menuWelfare: '혜택',
      menuExchange: '교환',
      sale50: '50% 할인',
      loser: '루저!',
      sendGift: '선물 보내기',
      dailyRecharge: '일일 충전',
      rechargedToday: '오늘 충전 횟수',
      rechargeBtn: '충전',
      hotEvent: '핫 이벤트',
      dailyRewardInfo: '일일 보상 정보',
      rewardClaimed: '보상 수령 완료',
      introduce: '기체 특성',
      tactics: '주요 전술',
      elementAura: '속성 오라',
      available: '가용 자원',
      deploy: '출격',
      coinsAdded: '+50 코인 획득! 🪙',
      descPhysical: '원소 공격보다 물리적 능력에 집중합니다. 생존력이 뛰어납니다.',
      descElemental: '강력한 {element} 에너지를 방출합니다.'
    },
    shop: {
      title: "닌자 무기고",
      subtitle: "전설적인 장비로 원소를 마스터하십시오",
      items: {
        flame: { name: '화염 카타나', desc: '버터처럼 블록을 베어버립니다.', features: ['데미지 +20%', '화상 효과', '공격 속도 +10%'] },
        ice: { name: '빙결 수리검', desc: '공중에서 적을 얼려버립니다.', features: ['빙결 확률 15%', '사거리 +30%', '크리티컬 +5%'] },
        jade: { name: '옥색 쌍절곤', desc: '용의 기운을 담은 빠른 타격.', features: ['콤보 지속 시간 +2초', '이동 속도 +15%', '회피율 +10%'] },
        thunder: { name: '뇌전 지팡이', desc: '충격적인 사거리와 속도.', features: ['체인 라이트닝', '기절 확률 10%', '데미지 +15%'] },
        storm: { name: '스톰브링어', desc: '천상의 분노를 소환합니다.', features: ['연쇄 번개', '공속 +25%', '치명타 +15%'] },
        void: { name: '보이드 카타나', desc: '차원을 베어 넘기는 암흑의 검.', features: ['생명력 흡수 5%', '치명타 +20%', '그림자 공격'] },
        solar: { name: '솔라 글레이브', desc: '태양의 열기를 내뿜습니다.', features: ['광역 화상', '데미지 +30%', '화염 저항'] },
        midnight: { name: '미드나잇 대거', desc: '침묵은 당신의 최고의 친구입니다.', features: ['회피율 +20%', '이동 속도 +10%', '백스테브 +50%'] },
        emerald_sai: { name: '에메랄드 사이', desc: '신비로운 맹독이 발려 있습니다.', features: ['맹독 데미지', '콤보 유지 +3초', '회피율 +10%'] },
        glacier: { name: '글래시어 사이드', desc: '얼어붙은 영혼을 수확합니다.', features: ['광역 빙결', '방어력 +15%', '사거리 +20%'] },
        starfall: { name: '스타폴 수리검', desc: '우주의 인도를 받으세요.', features: ['유도 사출물', '사거리 +50%', '치명타 +10%'] },
        golden: { name: '골든 쿠나이', desc: '진정한 부는 타격에서 나옵니다.', features: ['코인 보너스 +50%', '점수 +20%', '행운 +10%'] },
        oni: { name: '오니 스매셔', desc: '묵직한 무게, 묵직한 충격.', features: ['슈퍼 아머', '기절 확률 +20%', '방어 무시'] },
        phantom: { name: '팬텀 블레이드', desc: '기계 속의 유령이 되세요.', features: ['투명화', '피해 감소 +20%', '속도 +15%'] }
      },
      rarity: {
        COMMON: "일반",
        RARE: "희귀",
        EPIC: "에픽",
        LEGENDARY: "전설"
      },
      features: "특수 능력",
      purchased: "보유 중",
      acquire: "장비 구매",
      gachaTitle: "비밀의 두루마리",
      gachaDesc: "무작위 정예 장비를 소환합니다",
      gachaButton: "소환 (100 🪙)",
      gachaNoItems: "모든 장비를 수집했습니다!"
    },
    game: {
      score: '점수',
      combo: '콤보',
      warning: '경고',
      boss: '보스 접근 중'
    },
    gear: {
      title: '무기고',
      equip: '장착',
      equipped: '장착됨',
      empty: '무기고가 비어있습니다. 상점에서 장비를 획득하세요!'
    },
    failModal: {
      header: '새로운 최고 점수 임박',
      title: "드래곤의 숨결 부활",
      desc: "여기서 퀘스트를 끝내지 마세요, 닌자! 불꽃을 해방하세요.",
      legendary: '전설 아이템',
      itemName: '황금 드래곤 블레이드',
      itemDesc: '+500% 점수 배수 & 무한 부활',
      buy: '지금 구매 — $3.99',
      cancel: '다음에 할게요...'
    },
    characters: {
      MASTER: { role: '암살', description: '전통적인 암살 인술. 어둠 속에서 은밀하게 접근하여 순식간에 표적을 제거합니다.' },
      JADE: { role: '체술', description: '극한의 기동성을 살린 체술. 쌍검을 활용한 고속 교란 공격으로 적진을 베어버립니다.' },
      FLAME: { role: '화둔', description: '화둔 인술의 대가. 폭발적인 화염을 두른 공격으로 적의 중장갑 방어선마저 잿더미로 만듭니다.' },
      ICE: { role: '빙둔', description: '원거리 빙결 인술과 정밀 수리검 투척. 적의 사각지대에서 치명적인 냉기를 꽂아넣습니다.' },
      THUNDER: { role: '뇌둔', description: '뇌둔 인술과 환술(환영)의 조화. 번개처럼 빠른 은신술과 환영으로 적을 교란하고 아군을 보호합니다.' }
    }
  },
  ja: {
    nav: {
      lobby: '道場',
      game: 'クエスト',
      shop: 'ショップ',
      gear: '装備',
      comingSoon: '近日公開'
    },
    topBar: {
      title: 'ニンジャブリック',
      player: 'マスター',
      assets: '資産'
    },
    lobby: {
      pwaTitle: '画面をレベルアップ',
      pwaDesc: 'NINJA BRICKをPWAとしてインストールして高速プレイ！',
      install: 'インストール',
      season: 'シーズン1: ブリックアウト',
      play: 'プレイ',
      enterDojo: '道場に入る',
      activeQuest: '進行中のクエスト',
      questTitle: '翡翠龍の塔',
      new: '新着',
      megaPacks: 'メガパック',
      limitedKits: '限定キット',
      viewAll: 'すべて見る',
      invite: '招待',
      welfareTitle: '特典',
      menuRecharge: 'チャージ',
      menuFund: 'ファンド',
      menuWelfare: '特典',
      menuExchange: '交換',
      sale50: '50% オフ',
      loser: '負け犬！',
      sendGift: 'ギフトを送る',
      dailyRecharge: 'デイリーチャージ',
      rechargedToday: '今日のチャージ',
      rechargeBtn: 'チャージ',
      hotEvent: '注目のイベント',
      dailyRewardInfo: 'デイリー報酬情報',
      rewardClaimed: '報酬受け取り済み',
      introduce: '機体特性',
      tactics: '主要戦術',
      elementAura: '属性オーラ',
      available: '利用可能',
      deploy: '出撃',
      coinsAdded: '+50 コイン獲得！ 🪙',
      descPhysical: '元素攻撃よりも物理的能力に焦点を当てています。生存力が高いです。',
      descElemental: '強力な{element}エネルギーを放出します。'
    },
    shop: {
      title: "ニンジャの武器庫",
      subtitle: "伝説の装備で元素をマスターせよ",
      items: {
        flame: { name: '炎の刀', desc: 'ブロックをバターのように切り裂く。', features: ['ダメージ +20%', '燃焼効果', '攻撃速度 +10%'] },
        ice: { name: '氷の手裏剣', desc: '空中で敵を凍らせる。', features: ['凍結確率 15%', '射程 +30%', 'クリティカル +5%'] },
        jade: { name: '翡翠のヌンチャク', desc: '龍の魂を宿した高速打撃。', features: ['コンボ継続時間 +2秒', '移動速度 +15%', '回避率 +10%'] },
        thunder: { name: '雷の杖', desc: '驚異的な射程と速度。', features: ['チェインライトニング', 'スタン確率 10%', 'ダメージ +15%'] },
        storm: { name: 'ストームブリンガー', desc: '天の怒りを召喚する。', features: ['連鎖稲妻', '攻撃速度 +25%', 'クリティカル +15%'] },
        void: { name: 'ヴォイド・カタナ', desc: '次元を切り裂く暗黒の剣。', features: ['ライフスティール 5%', 'クリティカル +20%', 'シャドウストライク'] },
        solar: { name: 'ソーラー・グレイブ', desc: '太陽の熱気を放つ。', features: ['範囲燃焼', 'ダメージ +30%', '火炎耐性'] },
        midnight: { name: 'ミッドナイト・ダガー', desc: '沈黙は最高の友。', features: ['回避率 +20%', '移動速度 +10%', 'バックスタブ +50%'] },
        emerald_sai: { name: 'エメラルド・サイ', desc: '神秘的な猛毒が塗られている。', features: ['猛毒ダメージ', 'コンボ維持 +3秒', '回避率 +10%'] },
        glacier: { name: 'グレイシア・サイズ', desc: '凍りついた魂を刈り取る。', features: ['範囲凍結', '防御力 +15%', '射程 +20%'] },
        starfall: { name: 'スターフォール手裏剣', desc: '宇宙からの導き。', features: ['誘導弾', '射程 +50%', 'クリティカル +10%'] },
        golden: { name: 'ゴールデン・クナイ', desc: '真の富は打撃から生まれる。', features: ['コインボーナス +50%', 'スコア +20%', '幸運 +10%'] },
        oni: { name: 'オニ・スマッシャー', desc: '重い重量、重い衝撃。', features: ['スーパーアーマー', 'スタン確率 +20%', '防御無視'] },
        phantom: { name: 'ファントム・ブレイド', desc: '機械の中の幽霊になれ。', features: ['透明化', 'ダメージ軽減 +20%', '速度 +15%'] }
      },
      rarity: {
        COMMON: "コモン",
        RARE: "レア",
        EPIC: "エピック",
        LEGENDARY: "レジェンダリー"
      },
      features: "特殊能力",
      purchased: "所有",
      acquire: "装備を購入",
      gachaTitle: "秘密の巻物",
      gachaDesc: "ランダムなエリート装備を召喚する",
      gachaButton: "召喚 (100 🪙)",
      gachaNoItems: "すべての装備を収集しました！"
    },
    game: {
      score: 'スコア',
      combo: 'コンボ',
      warning: '警告',
      boss: 'ボス接近中'
    },
    gear: {
      title: '武器庫',
      equip: '装備する',
      equipped: '装備中',
      empty: '武器庫は空です。ショップで装備を入手してください！'
    },
    failModal: {
      header: '新記録目前',
      title: "ドラゴンの息吹の復活",
      desc: "ここでクエストを終わらせるな、忍者よ！炎を解き放て。",
      legendary: 'レジェンダリーアイテム',
      itemName: '黄金の龍の刃',
      itemDesc: 'スコア倍率+500% & 無限復活',
      buy: '今すぐ購入 — $3.99',
      cancel: 'また今度...'
    },
    characters: {
      MASTER: { role: '暗殺', description: '伝統的な暗殺忍術。闇に潜み、瞬く間に標的を仕留める一撃必殺の技。' },
      JADE: { role: '体術', description: '極限の機動力を生かした体術。双剣を駆使し、高速で敵陣を切り裂き撹乱する。' },
      FLAME: { role: '火遁', description: '火遁忍術の達人。爆発的な炎の力で、重装甲の敵陣をも灰燼に帰す。' },
      ICE: { role: '氷遁', description: '遠距離からの氷結忍術と精密な手裏剣術。敵の死角から致命的な冷気を叩き込む。' },
      THUNDER: { role: '雷遁', description: '雷遁と幻術の融合。落雷のような隠密行動と幻影で敵を惑わし、味方を強固に守る。' }
    }
  },
  zh: {
    nav: {
      lobby: '道场',
      game: '任务',
      shop: '商店',
      gear: '装备',
      comingSoon: '敬请期待'
    },
    topBar: {
      title: '忍者积木',
      player: '大师',
      assets: '资产'
    },
    lobby: {
      pwaTitle: '升级你的屏幕',
      pwaDesc: '将NINJA BRICK安装为PWA以获得快速加载体验！',
      install: '安装',
      season: '第一赛季：积木突围',
      play: '开始',
      enterDojo: '进入道场',
      activeQuest: '当前任务',
      questTitle: '玉龙宝塔',
      new: '全新',
      megaPacks: '超级包',
      limitedKits: '限量版套件',
      viewAll: '查看全部',
      invite: '邀请',
      welfareTitle: '福利',
      menuRecharge: '充值',
      menuFund: '基金',
      menuWelfare: '福利',
      menuExchange: '兑换',
      sale50: '50% 特惠',
      loser: '失败者！',
      sendGift: '赠送礼物',
      dailyRecharge: '每日充值',
      rechargedToday: '今日已充值',
      rechargeBtn: '充值',
      hotEvent: '热门活动',
      dailyRewardInfo: '每日奖励信息',
      rewardClaimed: '奖励已领取',
      introduce: '机体特性',
      tactics: '主要战术',
      elementAura: '属性光环',
      available: '可用',
      deploy: '出击',
      coinsAdded: '+50 金币获取！ 🪙',
      descPhysical: '专注于核心物理能力而非元素攻击。生命力极高。',
      descElemental: '释放毁灭性的{element}能量。'
    },
    shop: {
      title: "忍者军械库",
      subtitle: "用传奇装备掌握元素",
      items: {
        flame: { name: '火焰武士刀', desc: '像切黄油一样切开积木。', features: ['伤害 +20%', '燃烧效果', '攻击速度 +10%'] },
        ice: { name: '寒冰手里剑', desc: '在半空中冻结敌人。', features: ['冰冻几率 15%', '射程 +30%', '暴击 +5%'] },
        jade: { name: '翡翠双截棍', desc: '蕴含龙之精神的快速打击。', features: ['连击持续时间 +2秒', '移动速度 +15%', '闪避率 +10%'] },
        thunder: { name: '雷霆法杖', desc: '惊人的射程和速度。', features: ['连锁闪电', '眩晕几率 10%', '伤害 +15%'] },
        storm: { name: '风暴使者', desc: '召唤上天的愤怒。', features: ['连锁闪电', '攻速 +25%', '暴击 +15%'] },
        void: { name: '虚空武士刀', desc: '斩断次元的黑暗之刃。', features: ['吸血 5%', '暴击 +20%', '暗影打击'] },
        solar: { name: '烈阳长柄刀', desc: '散发太阳的热气。', features: ['区域灼烧', '伤害 +30%', '火焰抗性'] },
        midnight: { name: '午夜短刀', desc: '寂静是你最好的朋友。', features: ['闪避率 +20%', '移速 +10%', '背刺 +50%'] },
        emerald_sai: { name: '翡翠铁尺', desc: '涂有神秘猛毒。', features: ['猛毒伤害', '连击维持 +3秒', '闪避率 +10%'] },
        glacier: { name: '冰川长镰', desc: '收割冻结的灵魂。', features: ['区域冻结', '防御 +15%', '射程 +20%'] },
        starfall: { name: '星陨手里剑', desc: '接受宇宙的引导。', features: ['追踪弹', '射程 +50%', '暴击 +10%'] },
        golden: { name: '黄金苦无', desc: '真正的财富来自打击。', features: ['金币奖励 +50%', '分数 +20%', '幸运 +10%'] },
        oni: { name: '鬼神大锤', desc: '沉重的重量，沉重的冲击。', features: ['霸体', '眩晕几率 +20%', '破甲'] },
        phantom: { name: '幻影之刃', desc: '成为机器中的幽灵。', features: ['透明化', '减伤 +20%', '速度 +15%'] }
      },
      rarity: {
        COMMON: "普通",
        RARE: "稀有",
        EPIC: "史诗",
        LEGENDARY: "传说"
      },
      features: "特殊能力",
      purchased: "已拥有",
      acquire: "购买装备",
      gachaTitle: "秘密卷轴",
      gachaDesc: "随机召唤精英装备",
      gachaButton: "召唤 (100 🪙)",
      gachaNoItems: "已收集所有装备！"
    },
    game: {
      score: '分数',
      combo: '连击',
      warning: '警告',
      boss: '首领接近中'
    },
    gear: {
      title: '军械库',
      equip: '装备',
      equipped: '已装备',
      empty: '你的军械库是空的。请前往商店获取装备！'
    },
    failModal: {
      header: '即将创造新纪录',
      title: "龙息复苏",
      desc: "忍者，不要让你的任务在这里结束！释放火焰吧。",
      legendary: '传说物品',
      itemName: '金龙之刃',
      itemDesc: '+500% 分数乘数 & 无限复活',
      buy: '立即购买 — $3.99',
      cancel: '下次再说...'
    },
    characters: {
      MASTER: { role: '暗杀', description: '传统暗杀忍术。潜行于黑暗中，以迅雷不及掩耳之势消灭目标。' },
      JADE: { role: '体术', description: '发挥极限机动性的体术。使用双刀进行高速袭扰，撕破敌方阵型。' },
      FLAME: { role: '火遁', description: '火遁忍术专家。利用爆炸性的火焰，将重装甲的敌军防线化为灰烬。' },
      ICE: { role: '冰遁', description: '擅长远程冰冻忍术与精准的手里剑投掷。在视觉死角给予致命的霜寒。' },
      THUNDER: { role: '雷遁', description: '雷遁与幻术的结合。运用如闪电般的隐身与幻影扰乱敌人并保护盟友。' }
    }
  },
  es: {
    nav: {
      lobby: 'DOJO',
      game: 'MISIONES',
      shop: 'TIENDA',
      gear: 'EQUIPO',
      comingSoon: 'Próximamente'
    },
    topBar: {
      title: 'NINJA BRICK',
      player: 'MAESTRO',
      assets: 'ACTIVOS'
    },
    lobby: {
      pwaTitle: 'Sube de Nivel tu Pantalla',
      pwaDesc: '¡Instala NINJA BRICK como PWA para una carga rápida!',
      install: 'INSTALAR',
      season: 'TEMPORADA 1: BRICK-OUT',
      play: 'JUGAR',
      enterDojo: 'Entrar al Dojo',
      activeQuest: 'Misión Activa',
      questTitle: 'LA PAGODA DEL DRAGÓN DE JADE',
      new: 'NUEVO',
      megaPacks: 'MEGA PACKS',
      limitedKits: 'Kits de Edición Limitada',
      viewAll: 'VER TODO',
      invite: 'Invitar',
      welfareTitle: 'BIENESTAR',
      menuRecharge: 'RECARGA',
      menuFund: 'FONDO',
      menuWelfare: 'BIENESTAR',
      menuExchange: 'INTERCAMBIO',
      sale50: '50% DESCUENTO',
      loser: '¡PERDEDOR!',
      sendGift: 'ENVIAR REGALO',
      dailyRecharge: 'RECARGA DIARIA',
      rechargedToday: 'Recargado hoy',
      rechargeBtn: 'RECARGAR',
      hotEvent: 'EVENTO DESTACADO',
      dailyRewardInfo: 'INFO RECOMPENSA DIARIA',
      rewardClaimed: 'RECOMPENSA RECLAMADA',
      introduce: 'INTRODUCCIÓN',
      tactics: 'TÁCTICAS',
      elementAura: 'AURA ELEMENTAL',
      available: 'DISPONIBLE',
      deploy: 'DESPLEGAR',
      coinsAdded: '¡+50 MONEDAS AÑADIDAS! 🪙',
      descPhysical: 'SE CENTRA EN HABILIDADES FÍSICAS SOBRE ATAQUES ELEMENTALES. ALTA VITALIDAD.',
      descElemental: 'DESATA UNA ENERGÍA DE {element} DEVASTADORA.'
    },
    shop: {
      title: "ARSENAL NINJA",
      subtitle: "DOMINA LOS ELEMENTOS CON EQUIPO LEGENDARIO",
      items: {
        flame: { name: 'Katana de Fuego', desc: 'Corta los bloques como mantequilla.', features: ['Daño +20%', 'Efecto de Quemadura', 'Velocidad de Ataque +10%'] },
        ice: { name: 'Shuriken de Hielo', desc: 'Congela a los oponentes en el aire.', features: ['Probabilidad de Congelar 15%', 'Alcance +30%', 'Golpe Crítico +5%'] },
        jade: { name: 'Nunchakus de Jade', desc: 'Golpes rápidos con espíritu de dragón.', features: ['Duración de Combo +2s', 'Velocidad de Movimiento +15%', 'Evasión +10%'] },
        thunder: { name: 'Bastón de Trueno', desc: 'Alcance y velocidad impactantes.', features: ['Relámpago en Cadena', 'Probabilidad de Aturdir 10%', 'Daño +15%'] },
        storm: { name: 'Portador de Tormentas', desc: 'Invoca la furia del cielo.', features: ['Relámpago en Cadena', 'Velo. Ataque +25%', 'Crítico +15%'] },
        void: { name: 'Katana del Vacío', desc: 'Corta a través de las dimensiones.', features: ['Robo de Vida 5%', 'Crítico +20%', 'Golpe Sombra'] },
        solar: { name: 'Cuchilla Solar', desc: 'Irradia el calor del sol.', features: ['Quemadura de Área', 'Daño +30%', 'Resistencia Fuego'] },
        midnight: { name: 'Daga de Medianoche', desc: 'El silencio es tu mejor amigo.', features: ['Evasión +20%', 'Velo. Movimiento +10%', 'Apuñalada +50%'] },
        emerald_sai: { name: 'Sai de Esmeralda', desc: 'Recubierto con veneno místico.', features: ['Daño Veneno', 'Dura. Combo +3s', 'Evasión +10%'] },
        glacier: { name: 'Guadaña Glacial', desc: 'Cosecha las almas congeladas.', features: ['Congelación Área', 'Defensa +15%', 'Alcance +20%'] },
        starfall: { name: 'Shuriken de Estrellas', desc: 'Guía desde el cosmos.', features: ['Proyectiles Telediri.', 'Alcance +50%', 'Crítico +10%'] },
        golden: { name: 'Kunai de Oro', desc: 'La verdadera riqueza está en el golpe.', features: ['Bono Monedas +50%', 'Puntuación +20%', 'Suerte +10%'] },
        oni: { name: 'Martillo Oni', desc: 'Peso pesado, impacto pesado.', features: ['Súper Armadura', 'Prob. Aturdir +20%', 'Rompe Bloques'] },
        phantom: { name: 'Sable Fantasma', desc: 'Sé el fantasma en la máquina.', features: ['Invisibilidad', 'Reduc. Daño +20%', 'Velocidad +15%'] }
      },
      rarity: {
        COMMON: "COMÚN",
        RARE: "RARO",
        EPIC: "ÉPICO",
        LEGENDARY: "LEGENDARIO"
      },
      features: "HABILIDADES ESPECIALES",
      purchased: "EN POSESIÓN",
      acquire: "COMPRAR EQUIPO",
      gachaTitle: "PERGAMINO SECRETO",
      gachaDesc: "INVOCA EQUIPAMIENTO DE ÉLITE",
      gachaButton: "INVOCAR (100 🪙)",
      gachaNoItems: "¡TODO EL EQUIPO OBTENIDO!"
    },
    game: {
      score: 'Puntuación',
      combo: 'COMBO',
      warning: 'ADVERTENCIA',
      boss: 'JEFE ACERCÁNDOSE'
    },
    gear: {
      title: 'ARMERÍA',
      equip: 'EQUIPAR',
      equipped: 'EQUIPADO',
      empty: 'Tu armería está vacía. ¡Visita la tienda para adquirir equipo!'
    },
    failModal: {
      header: 'NUEVO RÉCORD INMINENTE',
      title: "RESURGIMIENTO DEL ALIENTO DE DRAGÓN",
      desc: "¡No dejes que tu misión termine aquí, Ninja! Desata el fuego.",
      legendary: 'OBJETO LEGENDARIO',
      itemName: 'ESPADA DEL DRAGÓN DORADO',
      itemDesc: '+500% Multiplicador de Puntuación y Vidas Infinitas',
      buy: 'COMPRAR AHORA — $3.99',
      cancel: 'Tal vez la próxima vez...'
    },
    characters: {
      MASTER: { role: 'ASESINO', description: 'NINJUTSU DE ASESINATO TRADICIONAL. ATACA DESDE LAS SOMBRAS PARA ELIMINAR OBJETIVOS SIN SER VISTO.' },
      JADE: { role: 'TAIJUTSU', description: 'TAIJUTSU DE EXTREMA MOVILIDAD. SOBRESALE EN LA INFILTRACIÓN DE ALTA VELOCIDAD Y EL COMBATE CON ESPADAS GEMELAS.' },
      FLAME: { role: 'KATON', description: 'ESPECIALISTA EN NINJUTSU KATON (FUEGO). UTILIZA LLAMAS EXPLOSIVAS PARA REDUCIR A CENIZAS LÍNEAS FUERTEMENTE ARMADAS.' },
      ICE: { role: 'HYOTON', description: 'MAESTRO DE NINJUTSU HYOTON (HIELO). INFLIGE CONGELACIÓN LETAL DESDE LEJOS CON UN SHURIKEN DE PRECISIÓN.' },
      THUNDER: { role: 'RAITON', description: 'NINJUTSU RAITON (RAYO) Y GENJUTSU. DESPLIEGA ILUSIONES ELÉCTRICAS PARA CEGAR A LOS ENEMIGOS Y PROTEGER A LOS ALIADOS.' }
    }
  }
};

type Language = 'en' | 'ko' | 'ja' | 'zh' | 'es';
type Translations = typeof translations.en;

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLang] = useState<Language>('ko');
  const t = translations[lang];

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within LanguageProvider');
  return context;
};
