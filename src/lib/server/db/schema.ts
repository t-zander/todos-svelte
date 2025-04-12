import type { InferSelectModel } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const todos = sqliteTable('todo', {
	id: text().primaryKey(),
	title: text('title').notNull(),
	completed: integer('completed')
});

export type Todo = InferSelectModel<typeof todos>;
