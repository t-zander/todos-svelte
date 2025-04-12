<script lang="ts">
	import { Check } from 'lucide-svelte';
	import Button from '../lib/components/Button.svelte';
	import type { Todo } from '../lib/server/db/schema';

	let {
		todo,
		markAsCompleted,
		onDelete
	}: {
		todo: Todo;
		markAsCompleted: (todoId: Todo['id']) => void;
		onDelete: (todoId: Todo['id']) => void;
	} = $props();
</script>

<div class="min-h-12 w-1/2 items-center space-y-6 rounded-xl p-2 shadow-md">
	<div class="flex justify-between">
		<h3 class="font-bold">{todo.title}</h3>
		{#if todo.completed === 1}
			<Check class="text-green-500" />
		{/if}
	</div>

	<div class="flex w-full justify-end space-x-2">
		{#if todo.completed === 0}
			<Button
				onClick={() => {
					markAsCompleted(todo.id);
				}}>Mark as completed</Button
			>
		{/if}
		<Button
			color="delete"
			onClick={() => {
				onDelete(todo.id);
			}}>Delete</Button
		>
	</div>
</div>
