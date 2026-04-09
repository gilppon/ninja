import { Translations } from './types';

const es: Translations = {
  nav: { lobby: 'LOBBY', game: 'MISIÓN', shop: 'TIENDA', gear: 'EQUIPO' },
  lobby: {
    hotEvent: 'EVENTO HOT',
    premium: 'PREMIUM',
    unlock: 'DESBLOQUEAR {price}',
    individualUnlock: 'DESBLOQUEO INDIVIDUAL ($3.99)',
    tactics: 'TÁCTICA',
    passiveSkillTitle: 'HABILIDAD PASIVA',
    standardOperative: 'OPERATIVO ESTÁNDAR — SIN PASIVA',
    elementAura: 'AURA ELEMENTAL',
    enterDojo: 'ENTRAR AL DOJO',
    menuFund: 'FONDO',
    menuWelfare: 'BIENESTAR',
    menuExchange: 'CANJE',
    stats: {
      coin: 'MONEDA ×{val}',
      combo: 'COMBO {val}s',
      slow: 'LENTITUD -{val}%',
      shield: 'ESCUDO / {val}s'
    }
  },
  shop: {
    title: 'TIENDA CIBER',
    subtitle: 'MEJORA TU EQUIPO NINJA',
    gachaTitle: 'SORTEO DE SUERTE',
    gachaDesc: 'OBTÉN EQUIPO DE ALTO NIVEL',
    gachaButton: 'TIRAR 10000 🪙',
    gachaNoItems: 'AGOTADO',
    purchased: 'COMPRADO',
    features: 'CARACTERÍSTICAS',
    acquire: 'ADQUIRIR',
    newGearUnlocked: '¡NUEVO EQUIPO DESBLOQUEADO!',
    levelUpSuccess: '¡MEJORA EXITOSA!',
    maxLevel: 'NIVEL MÁXIMO ALCANZADO',
    continue: 'CONTINUAR',
    rarity: { COMMON: 'COMÚN', RARE: 'RARO', EPIC: 'ÉPICO', LEGENDARY: 'LEYENDARIO' },
    items: {
      aegis: {
        name: 'Égida del Alma',
        desc: 'Desafía la física para superar tu límite de PV y devora el daño fatal. Una armadura milagrosa.',
        features: ['PV máx. +50', 'Daño recibido -20%']
      },
      time_shuriken: {
        name: 'Shuriken Crono',
        desc: 'Fiebre infinita para todos. Evita la caída del combo al ser golpeado y sobrecarga tu indicador de definitiva.',
        features: ['Combo a la mitad al recibir golpe', 'Carga de definitiva x1.5']
      },
      dragon_slayer: {
        name: 'Matadragones',
        desc: 'Una espada colosal viciosa que corta la vida del jefe y vacía sus bolsillos de un solo golpe.',
        features: ['Rendimiento de monedas x1.5', 'Daño a jefes x1.5']
      },
      golden_jitte: {
        name: 'Jitte Dorado',
        desc: 'La verdadera arma de un ninja es el dinero. El pináculo del capitalismo que duplica tus monedas sin esfuerzo.',
        features: ['Rendimiento de monedas x2.0']
      },
      revival_scroll: {
        name: 'Pergamino de Resurrección',
        desc: 'Un pergamino misterioso que te saca del borde de la muerte.',
        features: ['Resurrección instantánea', 'Objeto consumible', 'Replay de batalla']
      }
    }
  },
  game: {
    score: 'PUNTAJE',
    combo: 'COMBO',
    fever: '¡¡FIEBRE!!',
    ultimate: 'DEFINITIVA',
    bossIncoming: 'JEFE ACERCÁNDOSE',
    killsUntilBoss: '{val} BAJAS HASTA EL JEFE',
    usePattern: '¡USA PATRÓN!',
    tracePath: 'SIGUE EL CAMINO BRILLANTE',
    swipeCheckpoints: 'DESLIZA POR {val} PUNTOS EN ORDEN',
    targetSkill: 'HABILIDAD OBJETIVO',
    patternStrike: '¡GOLPE DE PATRÓN!',
    counterAttack: '¡CONTRAATAQUE! -15 HP',
    patterns: {
      'LIGHTNING SLASH': 'CORTE RELÁMPAGO',
      'CROSS STRIKE': 'GOLPE CRUZADO',
      'V STRIKE': 'GOLPE EN V',
      'RISING DRAGON': 'DRAGÓN ASCENDENTE',
      'DEATH SPIRAL': 'ESPIRAL DE MUERTE',
      'Z-STRIKE': 'GOLPE EN Z',
      'PENTAGRAM': 'PENTAGRAMA',
      'HEXAGON SEAL': 'SELLO HEXAGONAL',
      'CROSS EXECUTION': 'EJECUCIÓN CRUZADA',
      'INFINITY SLASH': 'CORTE INFINITO'
    }
  },
  topBar: {
    player: 'JUGADOR_UNIDAD',
    title: 'SHINOBI_OS',
    assets: 'ACTIVOS'
  },
  login: {
    firewallAccess: 'Acceso Firewall',
    firebaseDeploy: 'Despliegue Firebase',
    newIdentity: 'Nueva Identidad Firebase',
    encryptedAuth: 'Autenticación Cifrada',
    email: 'Correo Seguro',
    password: 'Pase de Acceso',
    authorizing: 'Autorizando...',
    deployIdentity: 'Desplegar Identidad',
    overrideFirewall: 'Anular Firewall',
    signInPrompt: '¿Identificado antes? Iniciar sesión',
    signUpPrompt: '¿Nuevo recluta? Regístrate en Firebase',
    abortAuth: '[ ABORTAR AUTENTICACIÓN ]',
    googleSignIn: 'INICIAR CON GOOGLE',
    dividerOr: 'O',
  },
  menu: {
    daoFund: 'FONDO NIVEL DAO EN PROCESO...',
    dailyGift: 'REGALO DIARIO',
    claimed24h: 'Reclamado cada 24h',
    claim50: 'RECLAMAR 50 🪙',
    premiumPass: 'PASE TOTAL ($9.99)',
    doubleRewards: 'Desbloquea todos los agentes y 2x recompensas por 30d',
    activate: 'ACTIVAR ($9.99)',
    exchangePrompt: '10 GEMAS = 100 MONEDAS',
    exchangeBtn: 'CANJEAR RECURSOS',
    arsenalLogistics: 'ARSENAL Y LOGÍSTICA NINJA'
  },
  failModal: {
    header: 'MISIÓN FALLIDA',
    title: 'DERROTADO',
    desc: 'Tu viaje termina aquí... ¿o no?',
    lostIdentity: '¿IDENTIDAD PERDIDA?',
    revivePrompt: '¡Regístrate ahora para salvar tu alma y REVIVIR al instante! 🥷',
    exclusiveReward: 'RECOMPENSA EXCLUSIVA PARA NUEVOS NINJAS',
    syncRevive: 'SINCRO Y REVIVIR 🥷',
    buy: 'REVIVIR',
    cancel: 'RENDIRSE',
    legendary: 'LEYENDARIO',
    itemName: 'Espada del Dragón Dorado',
    itemDesc: 'Una espada que desafía a la muerte misma.'
  },
  characters: {
    MASTER: {
      role: 'NINJA',
      description: 'TÉCNICAS TRADICIONALES DE SHINOBI. MAESTRO DEL SIGILO Y ASESINATO RÁPIDO.',
      passiveDesc: 'NINGUNA'
    },
    JADE: {
      role: 'EXPLORADOR',
      description: 'ALTA MOVILIDAD Y RECONOCIMIENTO. EXCELENTE EN TÁCTICAS DE GOLPEAR Y CORRER.',
      passiveDesc: 'NINGUNA'
    },
    FLAME: {
      role: 'ASALTO',
      description: 'ESPECIALISTA EN POTENCIA DE FUEGO PESADA. UTILIZA ARMAS INCENDIARIAS.',
      passiveDesc: '[AVARICIA] RENDIMIENTO DE MONEDAS x1.5 / CORTES DE FUEGO'
    },
    ICE: {
      role: 'FRANCOTIRADOR',
      description: 'ENTRENAMIENTO ESPECIAL EN PRECISIÓN, CAMUFLAJE Y RECONOCIMIENTO.',
      passiveDesc: '[CONGELACIÓN] TIEMPO DE COMBO x2 / RALENTIZA ENEMIGOS'
    },
    THUNDER: {
      role: 'APOYO',
      description: 'OPERATIVO DE APOYO TÁCTICO. DESPLIEGA ESCUDOS PARA PROTEGER ALIADOS.',
      passiveDesc: '[ESCUDO ESTÁTICO] ESCUDO CADA 20s'
    }
  },
  gear: {
    title: 'ARSENAL',
    empty: 'Sin equipo todavía. ¡Visita la tienda!',
    equip: 'EQUIPAR',
    equipped: 'EQUIPADO',
    noWeapon: 'SIN ARMA',
    statusReady: 'Equipado y Listo',
    statusAwaiting: 'Esperando Selección',
    rarityLabel: 'Rareza',
    bonusLabel: 'Bono de Mejora'
  },
  quest: {
    selectMission: 'SELECCIONAR MISIÓN',
    availableContracts: 'CONTRATOS DISPONIBLES',
    back: 'ATRÁS',
    levelPrefix: 'ETAPA',
    briefing: 'INFORME DE MISIÓN',
    target: 'OBJETIVO',
    reward: 'RECOMPENSA',
    coins: 'MONEDAS',
    launch: 'LANZAR MISIÓN',
    difficulty: {
      Normal: 'Normal',
      Hard: 'Difícil',
      Extreme: 'Extremo',
      Elite: 'Élite'
    },
    missions: {
      q1: { title: 'Periferias Neón', description: 'Elimina los drones rebeldes que cruzan el sector neón exterior.' },
      q2: { title: 'Instalaciones Congeladas', description: 'Una ciber-instalación congelada en el tiempo. Derrota al Oni Neón que custodia el núcleo.' },
      q3: { title: 'Cima del Dragón', description: 'Asciende la cima y mata al Ciber Dragón que causa tormentas electrónicas.' },
      q4: { title: 'Anomalía del Vacío', description: 'Aventúrate en la anomalía del vacío y sobrevive al Ninja Vacío corrupto.' }
    }
  },
  achievements: {
    combo_10: { title: 'Novato de Combo', desc: 'Llega a 10 combos' },
    combo_50: { title: 'Maestro de Combo', desc: 'Llega a 50 combos' },
    rich_ninja: { title: 'Ninja Rico', desc: 'Ten 500 monedas' },
    collector: { title: 'Colector', desc: 'Posee 3 objetos' },
    unlocked: '¡Logro Desbloqueado!'
  },
  victory: {
    title: 'MISIÓN COMPLETADA',
    missionComplete: 'ÁREA ASEGURADA',
    reward: 'RECOMPENSA',
    score: 'PUNTAJE FINAL',
    coins: 'MONEDAS OBTENIDAS',
    next: 'SIGUIENTE OBJETIVO',
    lobby: 'VOLVER A BASE',
    season2: '¡TEMPORADA 1 COMPLETA. PREPÁRATE PARA LA TEMPORADA 2!'
  }
};

export default es;
