import { db } from '$lib/server/db';
import { todos } from '$lib/server/db/schema.js';
import { redirect } from '@sveltejs/kit';

export const actions = {
	create: async ({ request }) => {
		const data = await request.formData();

		await db
			.insert(todos)
			.values({
				id: crypto.randomUUID(),
				title: data.get('name') as string,
				completed: 0
			})
			.execute();

		redirect(303, '/');
	}
};
