import { db } from '$lib/server/db/index.js';
import { todos } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';

export async function PATCH({ params, request }) {
	const data = await request.json();

	try {
		await db
			.update(todos)
			.set({ completed: data.completed })
			.where(eq(todos.id, params.id))
			.execute();

		return new Response(JSON.stringify({ message: 'Todo updated successfully' }), { status: 201 });
	} catch (err) {
		console.log('err', err);

		return new Response(
			JSON.stringify({ message: `Error updating todo: ${(err as Error).message}` }),
			{
				status: 500
			}
		);
	}
}

export async function DELETE({ params }) {
	try {
		await db.delete(todos).where(eq(todos.id, params.id)).execute();

		return new Response(JSON.stringify({ message: 'Todo deleted successfully' }), { status: 201 });
	} catch (err) {
		return new Response(
			JSON.stringify({ message: `Error updating todo: ${(err as Error).message}` }),
			{
				status: 500
			}
		);
	}
}
