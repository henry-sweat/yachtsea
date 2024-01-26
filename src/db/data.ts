import { StatsModel } from '@/db/db';

interface IStats {
  gamesPlayed: Number;
}

export async function getStats(emailFromSession) {
  try {
    const { gamesPlayed }: IStats = await StatsModel.findOne({ email: emailFromSession });
    return { gamesPlayed: gamesPlayed };
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch stats data.');
  }
}
