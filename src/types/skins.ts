export type SkinRarity = 'common' | 'rare' | 'epic' | 'legendary' | 'mythic';

export interface ByteSkin {
  id: string;
  name: string;
  subtitle: string;
  rarity: SkinRarity;
  costBytes: number;
  requiredStars?: number;
  requiredStreak?: number;
  requiredBosses?: number;
  requirementText: string;
  description: string;
  primaryColor: string;
  accentColor: string;
  badgeText: string;
}

export interface ProgrammerRank {
  id: string;
  name: string;
  tier: number; // 1 a 5
  minXp: number;
  minStars: number;
  color: string;
  borderDark: string;
  description: string;
}

export const PROGRAMMER_RANKS: ProgrammerRank[] = [
  {
    id: 'rank_novice',
    name: 'Iniciado del Código',
    tier: 1,
    minXp: 0,
    minStars: 0,
    color: '#94A3B8',
    borderDark: '#64748B',
    description: 'Comenzando a entender la lógica de programación y primeros programas.'
  },
  {
    id: 'rank_junior',
    name: 'Desarrollador Junior',
    tier: 2,
    minXp: 300,
    minStars: 15,
    color: '#0EA5E9',
    borderDark: '#0284C7',
    description: 'Escribe variables limpias, condicionales y resuelve ejercicios con agilidad.'
  },
  {
    id: 'rank_mid',
    name: 'Ingeniero Mid-Level',
    tier: 3,
    minXp: 800,
    minStars: 40,
    color: '#22C55E',
    borderDark: '#16A34A',
    description: 'Domina bucles, arreglos y optimización sin depender de pistas.'
  },
  {
    id: 'rank_senior',
    name: 'Arquitecto Senior',
    tier: 4,
    minXp: 1800,
    minStars: 80,
    color: '#F59E0B',
    borderDark: '#D97706',
    description: 'Lidera la resolución de problemas complejos, consultas avanzadas y combates de jefe.'
  },
  {
    id: 'rank_master',
    name: 'Maestro de Algoritmos',
    tier: 5,
    minXp: 3000,
    minStars: 120,
    color: '#A855F7',
    borderDark: '#7E22CE',
    description: 'Maestría total certificada en la plataforma, máxima precisión y velocidad.'
  }
];

export const BYTE_SKINS: ByteSkin[] = [
  // --- NIVEL 1: COMÚN / BÁSICO ---
  {
    id: 'byte_classic',
    name: 'Byte Estándar',
    subtitle: 'Chasis Original de Aprendizaje',
    rarity: 'common',
    costBytes: 0,
    requirementText: 'Desbloqueado por defecto',
    description: 'El fiel compañero androide de Prograpp con chasis azul celeste, antena con orbe dorado y botas 3D.',
    primaryColor: '#0EA5E9',
    accentColor: '#38BDF8',
    badgeText: 'BÁSICO'
  },
  {
    id: 'byte_student',
    name: 'Byte Estudiante',
    subtitle: 'Aspirante con Gorra y Mochila',
    rarity: 'common',
    costBytes: 350,
    requirementText: 'Cuesta 350 Bytes',
    description: 'Equipado con gorra escolar 3D hacia atrás, mochila dorsal de libros y libreta de notas de programación.',
    primaryColor: '#0284C7',
    accentColor: '#F59E0B',
    badgeText: 'NOVATO'
  },
  {
    id: 'byte_pixel',
    name: 'Byte Retro Pixel',
    subtitle: 'Homenaje a la Época de 8-Bits',
    rarity: 'common',
    costBytes: 650,
    requirementText: 'Cuesta 650 Bytes',
    description: 'Chasis verde esmeralda arcade, visor pixelado y ranura dorsal para cartuchos clásicos de programación.',
    primaryColor: '#059669',
    accentColor: '#34D399',
    badgeText: 'ARCADE'
  },

  // --- NIVEL 2: RARO / DEDICACIÓN ---
  {
    id: 'byte_athlete',
    name: 'Byte Atleta Veloz',
    subtitle: 'Racha Imparable de Velocidad',
    rarity: 'rare',
    costBytes: 1200,
    requiredStreak: 3,
    requirementText: 'Cuesta 1,200 Bytes y Racha activa de 3 días',
    description: 'Cinta deportiva de entrenamiento, dorsal número 01, porta-botellas y tenis aerodinámicos listos para maratones de código.',
    primaryColor: '#EF4444',
    accentColor: '#F59E0B',
    badgeText: 'VELOCISTA'
  },
  {
    id: 'byte_cyberpunk',
    name: 'Byte Cyber-Hacker',
    subtitle: 'Especialista en Scripts y Redes',
    rarity: 'rare',
    costBytes: 1800,
    requiredStars: 25,
    requirementText: 'Cuesta 1,800 Bytes y 25 Estrellas acumuladas',
    description: 'Sudadera con capucha morada Duolingo 3D, visor con código binario verde y placa dorsal con procesador microchip.',
    primaryColor: '#8B5CF6',
    accentColor: '#10B981',
    badgeText: 'HACKER'
  },
  {
    id: 'byte_steampunk',
    name: 'Byte Steampunk',
    subtitle: 'Mecánica de Precisión y Engranajes',
    rarity: 'rare',
    costBytes: 2500,
    requiredStars: 45,
    requirementText: 'Cuesta 2,500 Bytes y 45 Estrellas acumuladas',
    description: 'Monóculo de cobre bruñido, caldera dorsal de bronce con chimeneas de vapor a presión y manómetro analógico.',
    primaryColor: '#B45309',
    accentColor: '#FBBF24',
    badgeText: 'STEAMPUNK'
  },
  {
    id: 'byte_ninja',
    name: 'Byte Ninja Shinobi',
    subtitle: 'Sombra Silenciosa de Depuración',
    rarity: 'rare',
    costBytes: 3400,
    requiredStreak: 5,
    requirementText: 'Cuesta 3,400 Bytes y Racha de 5 días',
    description: 'Traje de sigilo azul noche y carbón, máscara protectora, espadín ninjato dorsal y shurikens de precisión.',
    primaryColor: '#1E293B',
    accentColor: '#38BDF8',
    badgeText: 'SHINOBI'
  },

  // --- NIVEL 3: ÉPICO / ESPECIALISTA ---
  {
    id: 'byte_senior',
    name: 'Byte Arquitecto Senior',
    subtitle: 'Líder de Sistemas & Clean Code',
    rarity: 'epic',
    costBytes: 4800,
    requiredStars: 75,
    requirementText: 'Cuesta 4,800 Bytes y 75 Estrellas acumuladas',
    description: 'Casco de obra industrial naranja 3D con reflector, chaleco reflectante y cartuchera dorsal con herramientas de ingeniería.',
    primaryColor: '#EA580C',
    accentColor: '#FACC15',
    badgeText: 'ARQUITECTO'
  },
  {
    id: 'byte_wizard',
    name: 'Byte Mago Algorítmico',
    subtitle: 'Dominio de Estructuras Complejas',
    rarity: 'epic',
    costBytes: 6500,
    requiredStars: 100,
    requirementText: 'Cuesta 6,500 Bytes y 100 Estrellas acumuladas',
    description: 'Sombrero puntiagudo azul noche con estrellas doradas 3D, túnica arcana y capa dorsal con constelaciones de datos.',
    primaryColor: '#2563EB',
    accentColor: '#FBBF24',
    badgeText: 'MAGO'
  },
  {
    id: 'byte_samurai',
    name: 'Byte Samurái del Bug',
    subtitle: 'Filo Implacable contra Errores',
    rarity: 'epic',
    costBytes: 8500,
    requiredStreak: 10,
    requiredBosses: 1,
    requirementText: 'Cuesta 8,500 Bytes, Racha de 10 días y 1 Jefe derrotado',
    description: 'Armadura feudal carmesí pulida, hombreras laminadas y dos katanas gemelas cruzadas a la espalda con vainas lacadas.',
    primaryColor: '#DC2626',
    accentColor: '#F59E0B',
    badgeText: 'SAMURÁI'
  },
  {
    id: 'byte_dragon',
    name: 'Byte Furia del Dragón',
    subtitle: 'Poder Ancestral del Fuego Binario',
    rarity: 'epic',
    costBytes: 11000,
    requiredStars: 130,
    requiredBosses: 1,
    requirementText: 'Cuesta 11,000 Bytes, 130 Estrellas y 1 Jefe derrotado',
    description: 'Coraza escamada de obsidiana y carmesí ígneo, cuernos dorados y alas de dragón plegadas a la espalda.',
    primaryColor: '#7F1D1D',
    accentColor: '#F97316',
    badgeText: 'DRAGÓN'
  },

  // --- NIVEL 4: LEGENDARIO / PRESTIGIO ---
  {
    id: 'byte_astronaut',
    name: 'Byte Astronauta Cósmico',
    subtitle: 'Explorador de Arquitecturas Espaciales',
    rarity: 'legendary',
    costBytes: 15000,
    requiredStars: 160,
    requiredBosses: 2,
    requirementText: 'Cuesta 15,000 Bytes, 160 Estrellas y 2 Jefes derrotados',
    description: 'Traje presurizado blanco lunar pulido, visera dorada reflectante y jetpack dorsal con propulsores de plasma activo.',
    primaryColor: '#F8FAFC',
    accentColor: '#38BDF8',
    badgeText: 'ASTRONAUTA'
  },
  {
    id: 'byte_mecha_valkyrie',
    name: 'Byte Meca-Valkiria',
    subtitle: 'Guardián Blindado de Servidores',
    rarity: 'legendary',
    costBytes: 20000,
    requiredStreak: 20,
    requiredBosses: 2,
    requirementText: 'Cuesta 20,000 Bytes, Racha de 20 días y 2 Jefes derrotados',
    description: 'Armadura biomecánica blanca y rosa titanio, visor cibernético y alas propulsoras laterales con estelas de energía.',
    primaryColor: '#E11D48',
    accentColor: '#FB7185',
    badgeText: 'VALKIRIA'
  },

  // --- NIVEL 5: MÍTICO / EXCLUSIVÍSIMO (SANTO GRIAL) ---
  {
    id: 'byte_titan_gold',
    name: 'Byte Meca-Titán Dorado',
    subtitle: 'El Trofeo Definitivo de Maestría Cósmica',
    rarity: 'mythic',
    costBytes: 30000,
    requiredStars: 200,
    requiredStreak: 30,
    requiredBosses: 3,
    requirementText: 'Exclusivísimo: Cuesta 30,000 Bytes, 200 Estrellas, Racha de 30 días y 3 Jefes',
    description: 'Forjado en oro puro de 24 kilates y platino astral. Ostenta alas de energía cuántica, corona de diamantes y halo holográfico continuo.',
    primaryColor: '#F59E0B',
    accentColor: '#FEF08A',
    badgeText: 'MÍTICO'
  }
];

export function getRankByUser(totalXp: number, totalStars: number): ProgrammerRank {
  for (let i = PROGRAMMER_RANKS.length - 1; i >= 0; i--) {
    const rank = PROGRAMMER_RANKS[i];
    if (totalXp >= rank.minXp && totalStars >= rank.minStars) {
      return rank;
    }
  }
  return PROGRAMMER_RANKS[0];
}
