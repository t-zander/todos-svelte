<script lang="ts">
	type Props = {
		color?: 'delete';
		component?: 'button' | 'a';
		onClick?: () => void;
		href?: string;
		children: any;
		type?: 'button' | 'submit';
		customClass?: string;
	};

	const {
		type = 'button',
		color,
		component = 'button',
		onClick,
		href = undefined,
		children,
		customClass = ''
	}: Props = $props();

	const baseClasses = `cursor-pointer rounded px-2 py-1 text-sm font-bold border bg-transparent ${customClass}`;
	const classes =
		color === 'delete'
			? `${baseClasses} border-red-500 text-red-500 hover:text-red-700`
			: `${baseClasses} border-purple-200 text-purple-500 hover:text-purple-700`;
</script>

{#if component === 'a'}
	<a {href} class={classes}>
		{@render children()}
	</a>
{:else}
	<button class={classes} onclick={onClick} {type}>
		{@render children()}
	</button>
{/if}
