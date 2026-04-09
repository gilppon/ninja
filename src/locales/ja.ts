import { Translations } from './types';

const ja: Translations = {
  nav: { lobby: 'ロビー', game: 'クエスト', shop: 'ショップ', gear: '装備' },
  lobby: {
    hotEvent: 'ホットイベント',
    premium: 'プレミアム',
    unlock: '{price}で解除',
    individualUnlock: '個別にアンロック ($3.99)',
    tactics: '戦術',
    passiveSkillTitle: 'パッシブスキル',
    standardOperative: '標準エージェント — パッシブなし',
    elementAura: '属性オーラ',
    enterDojo: '道場に入る',
    menuFund: 'ファンド',
    menuWelfare: '福利厚生',
    menuExchange: '両替',
    stats: {
      coin: 'コイン ×{val}',
      combo: 'コンボ {val}秒',
      slow: '鈍足 -{val}%',
      shield: 'シールド / {val}秒'
    }
  },
  shop: {
    title: 'サイバーショップ',
    subtitle: '忍者の装備をアップグレード',
    gachaTitle: 'ラッキードロー',
    gachaDesc: 'ランダムで強力な装備を獲得',
    gachaButton: 'ガチャ 10000 🪙',
    gachaNoItems: '売り切れ',
    purchased: '購入済み',
    features: '特徴',
    acquire: '入手する',
    newGearUnlocked: '新しい装備を解除！',
    levelUpSuccess: '強化成功！',
    maxLevel: '最大レベル到達',
    continue: '次へ',
    rarity: { COMMON: 'ノーマル', RARE: 'レア', EPIC: 'エピック', LEGENDARY: 'レジェンダリー' },
    items: {
      aegis: {
        name: '魂のイージス',
        desc: '物理法則を無視してHP限界を突破し、致命的なダメージさえも無残に飲み込む奇跡の防具です。',
        features: ['最大体力 +50', '被ダメージ 20% 減少']
      },
      time_shuriken: {
        name: 'クロノ手裏剣',
        desc: '初心者でも無限フィーバーが可能に。被弾時のコンボ暴落を防御し、奥義ゲージを暴走させるチート級武器。',
        features: ['被弾時コンボ半分維持', '奥義ゲージ獲得量 1.5倍']
      },
      dragon_slayer: {
        name: 'ドラゴンスレイヤー',
        desc: '一振りでボスの命を絶ち、その懐まで容赦なく奪い尽くす凶悪な大剣です。',
        features: ['コイン獲得量 1.5倍', 'ボスダメージ 1.5倍']
      },
      golden_jitte: {
        name: '黄金の十手',
        desc: '忍の真の武器は刀ではなく金。何もしなくてもコインを2倍に膨らませる資本主義の頂点です。',
        features: ['コイン獲得量 2.0倍']
      },
      revival_scroll: {
        name: '復活の巻物',
        desc: '死の淵からあなたを引き戻す神秘的な巻物です。',
        features: ['即時復活', '消耗品', '戦闘継続']
      }
    }
  },
  game: {
    score: 'スコア',
    combo: 'コンボ',
    fever: 'フィーバー!!',
    ultimate: '奥義',
    bossIncoming: 'ボス接近中',
    killsUntilBoss: 'ボス出現まであと {val} 体',
    usePattern: 'パターン発動！',
    tracePath: '光る軌跡をなぞってください',
    swipeCheckpoints: '{val}個のチェックポイントを順に通過',
    targetSkill: '目標スキル',
    patternStrike: 'パターンスライク！',
    counterAttack: 'カウンター！ -15 HP',
    patterns: {
      'LIGHTNING SLASH': '雷光斬り',
      'CROSS STRIKE': 'クロスストライク',
      'V STRIKE': 'Vストライク',
      'RISING DRAGON': '昇竜斬り',
      'DEATH SPIRAL': '死の渦',
      'Z-STRIKE': 'Zストライク',
      'PENTAGRAM': 'ペンタグラム',
      'HEXAGON SEAL': 'ヘキサゴン封印',
      'CROSS EXECUTION': 'クロス処刑',
      'INFINITY SLASH': '無限斬り'
    }
  },
  topBar: {
    player: 'プレイヤー_ユニット',
    title: 'シノビ_OS',
    assets: '資産'
  },
  login: {
    firewallAccess: 'ファイアウォールアクセス',
    firebaseDeploy: 'Firebaseデプロイ',
    newIdentity: '新しいFirebaseアイデンティティ',
    encryptedAuth: '暗号化された認証',
    email: 'セキュアメール',
    password: 'アクセスパス',
    authorizing: '認証中...',
    deployIdentity: '身元をデプロイ',
    overrideFirewall: 'ファイアウォールを無効化',
    signInPrompt: '以前のユーザーですか？ログイン',
    signUpPrompt: '新規エージェントですか？登録',
    abortAuth: '[ 認証を中断 ]',
    googleSignIn: 'GOOGLEでサインイン',
    dividerOr: 'または',
  },
  menu: {
    daoFund: 'DAOレベルファンド進行中...',
    dailyGift: 'デイリーギフト',
    claimed24h: '24時間ごとに請求可能',
    claim50: '50 🪙 を受け取る',
    premiumPass: 'シーズンオールパス ($9.99)',
    doubleRewards: '全エージェント解放 & 30日間報酬2倍',
    activate: '有効化する ($9.99)',
    exchangePrompt: '10 ジェム = 100 コイン',
    exchangeBtn: 'リソースを交換',
    arsenalLogistics: '忍者兵器庫と補給'
  },
  failModal: {
    header: '任務失敗',
    title: '敗北',
    desc: 'あなたの旅はここで終わります... それとも？',
    lostIdentity: '身元を失いましたか？',
    revivePrompt: '今すぐ登録して魂を保存し、即座に復活しましょう！ 🥷',
    exclusiveReward: '新規忍者のための限定報酬',
    syncRevive: '同期して復活 🥷',
    buy: '復活する',
    cancel: 'あきらめる',
    legendary: 'レजेンダリー',
    itemName: '黄金龍の剣',
    itemDesc: '死をも超越する伝説の剣です。'
  },
  characters: {
    MASTER: {
      role: '忍者',
      description: '伝統的な忍術の使い手。隠密と迅速な近接暗殺に長けている。',
      passiveDesc: 'なし'
    },
    JADE: {
      role: '斥候',
      description: '高い機動力と偵察能力。情報収集と一撃離脱の戦術に優れる。',
      passiveDesc: 'なし'
    },
    FLAME: {
      role: '強襲兵',
      description: '重火力スペシャリスト。焼夷兵器を使用して敵の防衛線を突破する。',
      passiveDesc: '[強欲] コイン獲得 x1.5 / 火炎斬り'
    },
    ICE: {
      role: '狙撃手',
      description: '精密射撃、カモフラージュ、偵察技術を極めるための特別訓練を修了。',
      passiveDesc: '[凍傷] コンボ時間2倍 / 敵を減速'
    },
    THUNDER: {
      role: '支援兵',
      description: '戦術支援要員。シールドを展開して味方を守り、敵を撹乱する。',
      passiveDesc: '[静止の守り] 20秒ごとにダメージ無効化'
    }
  },
  gear: {
    title: '武器庫',
    empty: '装備がありません。ショップで入手してください！',
    equip: '装備する',
    equipped: '装備中',
    noWeapon: '武器なし',
    statusReady: '装備済み・戦闘準備完了',
    statusAwaiting: '装備選択待ち',
    rarityLabel: 'レアリティ',
    bonusLabel: '強化ボーナス'
  },
  quest: {
    selectMission: '任務選択',
    availableContracts: '受注可能な契約',
    back: '戻る',
    levelPrefix: 'ステージ',
    briefing: '任務ブリーフィング',
    target: 'ターゲット',
    reward: '報酬',
    coins: 'コイン',
    launch: '任務開始',
    difficulty: {
      Normal: 'ノーマル',
      Hard: 'ハード',
      Extreme: 'エクストリーム',
      Elite: 'エリート'
    },
    missions: {
      q1: { title: 'ネオン外縁部', description: 'ネオン外縁区を通過する不正ドローンを排除せよ。' },
      q2: { title: '凍結施設', description: '時間に凍りついたサイバー施設。コアを守るネオン鬼を倒せ。' },
      q3: { title: '竜の峰', description: '峰を登り、電子嵐を引き起こすサイバードラゴンを討伐せよ。' },
      q4: { title: '虚空の異変', description: '虚空の異変に飛び込み、堕落したヴォイド忍者から生き延びろ。' }
    },
    locked: 'ロック中',
    clearPrevious: '前のステージをクリアしてください'
  },
  achievements: {
    combo_10: { title: 'コンボ見習い', desc: '10コンボ達成' },
    combo_50: { title: 'コンボマスター', desc: '50コンボ達成' },
    rich_ninja: { title: '裕福な忍者', desc: '500コイン保有' },
    collector: { title: 'コレクター', desc: 'アイテム3個保有' },
    unlocked: '実績解除！'
  },
  victory: {
    title: '任務完遂',
    missionComplete: 'エリア確保',
    reward: '報奨',
    score: '最終スコア',
    coins: '獲得コイン',
    next: '次の戦場へ',
    lobby: 'ロビーに戻る',
    season2: 'シーズン1完了。シーズン2をお楽しみに！'
  },
  footer: {
    terms: '利用規約',
    privacy: 'プライバシーポリシー',
    refund: '返金ポリシー',
    legal: '特定商取引法に基づく表記'
  }
};


export default ja;
