<script lang="ts">
	import Button from './Button.svelte';
	import { enhance } from '$app/forms';

	let name = $state('');
</script>

<form method="POST" action="/todo?/create" use:enhance>
	<label for="name" class="block text-sm font-medium text-gray-700">Name</label>
	<input
		type="text"
		id="name"
		name="name"
		bind:value={name}
		class="mt-1 mb-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
	/>
	<Button type="submit">Submit</Button>
</form>
