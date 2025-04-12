<script lang="ts">
	import { invalidate } from '$app/navigation';
	import Button from '../lib/components/Button.svelte';
	import TodoSearch from '../lib/components/TodoSearch.svelte';
	import type { Todo } from '../lib/server/db/schema';
	import type { PageProps } from './$types';
	import TodoCard from './TodoCard.svelte';

	let { data }: PageProps = $props();

	async function onDelete(todoId: Todo['id']) {
		const response = await fetch(`/todo/${todoId}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json'
			}
		});
		if (response.ok) {
			invalidate('todos:all');
		} else {
			console.error('Failed to delete a todo');
		}
	}

	async function markAsCompleted(todoId: Todo['id']) {
		const response = await fetch(`/todo/${todoId}`, {
			method: 'PATCH',
			body: JSON.stringify({ completed: 1 }),
			headers: {
				'Content-Type': 'application/json'
			}
		});
		if (response.ok) {
			invalidate('todos:all');
		} else {
			console.error('Failed to mark the todo as completed');
		}
	}
</script>

<div class="flex w-full flex-col items-center gap-2 p-6">
	<Button component="a" href="/todo" customClass="self-end">Add a todo</Button>

	<TodoSearch />

	{#if data.todos.length > 0}
		{#each data.todos as todo}
			<TodoCard {todo} {onDelete} {markAsCompleted} />
		{/each}
	{:else}
		<p class="text-center text-gray-500">No todos available</p>
	{/if}
</div>
