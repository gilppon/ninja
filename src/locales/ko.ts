import { Translations } from './types';

const ko: Translations = {
  nav: { lobby: '로비', game: '퀘스트', shop: '상점', gear: '장비' },
  lobby: {
    hotEvent: '핫 이벤트',
    premium: '프리미엄',
    unlock: '{price} 해제',
    individualUnlock: '개별 잠금 해제 ($3.99)',
    tactics: '전술',
    passiveSkillTitle: '패시브 스킬',
    standardOperative: '표준 요원 — 패시브 스킬 없음',
    elementAura: '속성 아우라',
    enterDojo: '도장 입장',
    menuFund: '펀드',
    menuWelfare: '복지',
    menuExchange: '환전',
    stats: {
      coin: '코인 ×{val}',
      combo: '콤보 {val}초',
      slow: '감속 -{val}%',
      shield: '보호막 / {val}초'
    }
  },
  shop: {
    title: '사이버 상점',
    subtitle: '닌자 장비를 업그레이드하세요',
    gachaTitle: '럭키 드로우',
    gachaDesc: '무작위 고등급 장비를 획득하세요',
    gachaButton: '뽑기 10000 🪙',
    gachaNoItems: '품절',
    purchased: '보유함',
    features: '특징',
    acquire: '획득하기',
    newGearUnlocked: '새로운 장비 해제!',
    levelUpSuccess: '강화 성공!',
    maxLevel: '최대 레벨 도달',
    continue: '계속하기',
    rarity: { COMMON: '일반', RARE: '희귀', EPIC: '영웅', LEGENDARY: '전설' },
    items: {
      aegis: {
        name: '영혼의 이지스',
        desc: '물리 법칙을 거스르고 체력 한도를 초과시키며, 치명적인 피해마저 무참히 씹어 삼키는 기적의 방어구입니다.',
        features: ['최대 체력 +50', '피격 데미지 20% 감소']
      },
      time_shuriken: {
        name: '크로노 수리검',
        desc: '초보자도 무한 피버가 가능해집니다. 맞을 땐 콤보 폭락을 방어하고 궁극기 게이지는 폭주시키는 불법 개조 무기입니다.',
        features: ['피격 시 콤보 절반만 감소', '궁극기 게이지 획득량 1.5배']
      },
      dragon_slayer: {
        name: '드래곤 슬레이어',
        desc: '단 한 번의 스와이프로 보스의 명줄을 끊고 호주머니까지 남김없이 털어내는 악랄한 대검입니다.',
        features: ['코인 획득량 1.5배', '보스 데미지 1.5배']
      },
      golden_jitte: {
        name: '황금 짓테',
        desc: '진정한 닌자의 무기는 칼이 아니라 돈입니다. 가만히 있어도 쏟아지는 코인을 2배로 뻥튀기하는 자본주의의 정점입니다.',
        features: ['코인 획득량 2.0배']
      },
      revival_scroll: {
        name: '부활서',
        desc: '죽음의 문턱에서 당신을 끌어올려 줄 신비로운 주문서입니다.',
        features: ['즉시 부활 가능', '소모성 아이템', '전장 복귀']
      }
    }
  },
  game: {
    score: '점수',
    combo: '콤보',
    fever: '피버!!',
    ultimate: '궁극기',
    bossIncoming: '보스 접근 중',
    killsUntilBoss: '보스 출현까지 {val} 처치 남음',
    usePattern: '패턴 사용!',
    tracePath: '빛나는 경로를 따라가세요',
    swipeCheckpoints: '{val}개의 체크포인트를 순서대로 통과하세요',
    targetSkill: '목표 스킬',
    patternStrike: '패턴 스트라이크!',
    counterAttack: '반격당함! -15 HP',
    patterns: {
      'LIGHTNING SLASH': '번개 베기',
      'CROSS STRIKE': '크로스 스트라이크',
      'V STRIKE': 'V 스트라이크',
      'RISING DRAGON': '승룡 베기',
      'DEATH SPIRAL': '죽음의 소용돌이',
      'Z-STRIKE': 'Z 스트라이크',
      'PENTAGRAM': '펜타그램',
      'HEXAGON SEAL': '헥사곤 봉인',
      'CROSS EXECUTION': '크로스 처형',
      'INFINITY SLASH': '무한 베기'
    }
  },
  topBar: {
    player: '플레이어_유닛',
    title: '시노비_OS',
    assets: '자산'
  },
  login: {
    firewallAccess: '방화벽 액세스',
    firebaseDeploy: '파이어베이스 배포',
    newIdentity: '새로운 파이어베이스 정체성',
    encryptedAuth: '암호화된 인증',
    email: '보안 이메일',
    password: '액세스 패스',
    authorizing: '인증 중...',
    deployIdentity: '정체성 배포',
    overrideFirewall: '방화벽 무력화',
    signInPrompt: '이전 사용자입니까? 로그인',
    signUpPrompt: '신규 요원입니까? 등록',
    abortAuth: '[ 인증 중단 ]',
    googleSignIn: 'GOOGLE 계정으로 로그인',
    dividerOr: '또는',
  },
  menu: {
    daoFund: 'DAO 레벨 펀드 진행 중...',
    dailyGift: '일일 선물',
    claimed24h: '24시간마다 수령 가능',
    claim50: '50 🪙 수령',
    premiumPass: '시즌 올 패스 ($9.99)',
    doubleRewards: '모든 요원 잠금 해제 & 30일간 보상 2배',
    activate: '활성화 ($9.99)',
    exchangePrompt: '10 젬 = 100 코인',
    exchangeBtn: '자원 환전',
    arsenalLogistics: '닌자 병기창 및 보급'
  },
  failModal: {
    header: '임무 실패',
    title: '패배함',
    desc: '당신의 여정이 여기서 끝납니다... 과연 그럴까요?',
    lostIdentity: '정체성을 잃었습니까?',
    revivePrompt: '지금 등록하여 영혼을 보존하고 즉시 부활하세요! 🥷',
    exclusiveReward: '신규 닌자를 위한 전용 보상',
    syncRevive: '동기화 및 부활 🥷',
    buy: '부활하기',
    cancel: '포기하기',
    legendary: '전설',
    itemName: '황금 용의 검',
    itemDesc: '죽음마저 거스르는 전설의 검입니다.'
  },
  characters: {
    MASTER: {
      role: '닌자',
      description: '전통적인 시노비 기술. 은신과 신속한 근접 암살의 대가.',
      passiveDesc: '없음'
    },
    JADE: {
      role: '정찰병',
      description: '높은 기동성과 정찰 능력. 정보 수집과 치고 빠지기 전술에 능함.',
      passiveDesc: '없음'
    },
    FLAME: {
      role: '돌격병',
      description: '중화력 전문가. 소태도와 폭발물을 사용하여 적의 방어선을 돌파함.',
      passiveDesc: '[탐욕] 코인 획득 x1.5 / 화염 베기'
    },
    ICE: {
      role: '저격수',
      description: '정밀 사격, 위장 및 정찰 기술을 마스터하기 위한 특별 훈련 이수.',
      passiveDesc: '[동상] 콤보 유지 2배 / 적 감속'
    },
    THUNDER: {
      role: '지원병',
      description: '전술 지원 요원. 보호막과 EMP 장치를 배치하여 아군을 보호함.',
      passiveDesc: '[정적 보호막] 20초마다 피해 무효화'
    }
  },
  gear: {
    title: '병기창',
    empty: '보유한 장비가 없습니다. 상점에서 획득하세요!',
    equip: '장착하기',
    equipped: '장착 중',
    noWeapon: '무기 없음',
    statusReady: '장착 완료 & 전투 준비',
    statusAwaiting: '장비 선택 대기 중',
    rarityLabel: '등급',
    bonusLabel: '강화 보너스'
  },
  quest: {
    selectMission: '임무 선택',
    availableContracts: '수주 가능한 계약',
    back: '뒤로',
    levelPrefix: '스테이지',
    briefing: '임무 브리핑',
    target: '타겟',
    reward: '보상',
    coins: '코인',
    launch: '임무 개시',
    difficulty: {
      Normal: '보통',
      Hard: '어려움',
      Extreme: '극한',
      Elite: '엘리트'
    },
    missions: {
      q1: { title: '네온 변두리', description: '네온 외곽 구역을 통과하는 변절 드론들을 제거하라.' },
      q2: { title: '냉동 시설', description: '시간 속에 얼어붙은 사이버 시설. 핵심부를 지키는 네온 오니를 처치하라.' },
      q3: { title: '용의 봉우리', description: '봉우리를 올라 전자 폭풍을 일으키는 사이버 드래곤을 쓰러뜨려라.' },
      q4: { title: '공허의 이상', description: '공허의 이상 현상 속으로 뛰어들어 타락한 보이드 닌자에게서 생존하라.' }
    }
  },
  achievements: {
    combo_10: { title: '콤보 입문자', desc: '10 콤보 달성' },
    combo_50: { title: '콤보 마스터', desc: '50 콤보 달성' },
    rich_ninja: { title: '부유한 닌자', desc: '500 코인 보유' },
    collector: { title: '수집가', desc: '아이템 3개 보유' },
    unlocked: '업적 달성!'
  },
  victory: {
    title: '임무 완수',
    missionComplete: '미션 클리어',
    reward: '전용 포상',
    score: '최종 점수',
    coins: '획득 코인',
    next: '다음 전장으로',
    lobby: '로비로',
    season2: '시즌 1 종료. 시즌 2를 기대해 주세요!'
  }
};

export default ko;
