<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import debounce from 'lodash.debounce';

	const currentSearch = $derived(page.url.searchParams.get('search') || '');

	// Debounced function to update the URL
	const updateUrl = debounce((value: string) => {
		const params = new URLSearchParams(window.location.search);
		if (value) {
			params.set('search', value);
		} else {
			params.delete('search');
		}

		goto(`?${params.toString()}`, { keepFocus: true });
	}, 300);
</script>

<div class="flex w-1/3 flex-col gap-2">
	<label for="search" class="block text-sm font-medium text-gray-700">Search Todos</label>
	<input
		type="text"
		id="search"
		defaultValue={currentSearch}
		oninput={(event) => {
			const value = event.currentTarget.value;
			updateUrl(value);
		}}
		placeholder="Search..."
		class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
	/>
</div>
