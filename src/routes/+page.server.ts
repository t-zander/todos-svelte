import type { PageServerLoad } from './$types';

import { db } from '$lib/server/db';
import { eq, like } from 'drizzle-orm';
import { todos } from '../lib/server/db/schema';

export const load: PageServerLoad = async ({ depends, url }) => {
	depends('todos:all');
	const searchStr = url.searchParams.get('search') || '';

	const filteredTodos = await db.query.todos.findMany({
		where: like(todos.title, `%${searchStr}%`)
	});

	return { todos: filteredTodos };
};

export const actions = {
	markAsCompleted: async ({ request }) => {
		const data = await request.formData();
		const id = data.get('id') as string;

		return db.update(todos).set({ completed: 1 }).where(eq(todos.id, id)).returning();
	}
};
