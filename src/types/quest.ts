export type QuestType = 'xp_gain' | 'streak_keep' | 'lesson_complete' | 'flawless_lesson' | 'review_practice';

export interface DailyQuest {
  id: string;
  title: string;
  description: string;
  type: QuestType;
  target: number;
  current: number;
  rewardXp: number;
  rewardBytes: number;
  claimed: boolean;
}

export interface LeagueMember {
  uid: string;
  displayName: string;
  avatarId: string;
  weeklyXp: number;
  rank: number;
  isCurrentUser: boolean;
}
