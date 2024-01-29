'use server';

import { IStatsProps } from '@/types';
import { sql } from '@vercel/postgres';

export async function startGame(user_id: string) {
  try {
    const game = await sql`INSERT INTO games (user_id, total_score, game_is_finished)
    VALUES (${user_id}, ${0}, ${false})
    ON CONFLICT (id) DO NOTHING;`;
    return game;
  } catch (error) {
    console.error('Failed to start game:', error);
    throw new Error('Failed to start game.');
  }
}

export async function endGame(user_id: string, total_score: number) {
  try {
    const game = await sql`UPDATE games
    SET total_score = ${total_score},
    game_is_finished = ${true}
    WHERE id = (
        SELECT id
        FROM games
        WHERE user_id = ${user_id}
        ORDER BY start_date DESC
        LIMIT 1
    );
    `;
    return game;
  } catch (error) {
    console.error('Failed to end game:', error);
    throw new Error('Failed to end game.');
  }
}

export async function getStats(user_id: string) {
  try {
    const game = await sql`SELECT
        MAX(total_score) FILTER (WHERE game_is_finished = TRUE) AS high_score,
        COUNT(*) AS total_games_started,
        COUNT(*) FILTER (WHERE game_is_finished = TRUE) AS total_games_finished,
        AVG(total_score) FILTER (WHERE game_is_finished = TRUE) AS average_score
    FROM games
    WHERE user_id = ${user_id}
    ;
    `;
    const stats: IStatsProps = {
      highScore: game.rows[0].high_score,
      averageScore: Math.round(game.rows[0].average_score),
      totalGamesStarted: game.rows[0].total_games_started,
      totalGamesFinished: game.rows[0].total_games_finished,
    };
    return stats;
  } catch (error) {
    console.error('Failed to fetch stats:', error);
    throw new Error('Failed to fetch stats.');
  }
}
