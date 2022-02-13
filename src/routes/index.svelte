<script context="module">
	export const prerender = true;
</script>

<script>
	// let uid = 0;
	let uid = 5;

	let data = [
		
	];

	/**
	 *
	 * @param {string} name - name of the user to add the dish to
	 */
	const addDish = (name) => {
		let idx = data.findIndex((el) => el.name === name);

		data[idx].dishes = data[idx].dishes.concat({
			amount: 0,
			uid: uid++
		});
	};

	const addPerson = () => {
		const name = window.prompt("Enter person's name");
		if (name) {

			data = data.concat({
				name,
				dishes: []
			})
		}
	}

	/**
	 *
	 * @param name - name of the user to add the dish to
	 * @param {number} uid - id of the dish to
	 */
	const removeDish = (name, uid) => {
		let userIdx = data.findIndex((el) => el.name === name);
		let dishIdx = data[userIdx].dishes.findIndex((el) => el.uid === uid);

		data[userIdx].dishes.splice(dishIdx, 1);

		data[userIdx].dishes = data[userIdx].dishes;
	};

	/** @type {MyData} */
	let tip = 20,
		/** @type {Users[]} */
		users = [];

	$: myObj = data.reduce(
		(acc, curr) => {
			const subTotal = curr.dishes.reduce((acc1, curr1) => {
				return acc1 + curr1.amount * 100;
			}, 0);
			acc.total += subTotal;
			acc.users[curr.name] = subTotal;
			return acc;
		},
		{ total: 0, users: {} }
	);

	$: users = Object.entries(myObj.users).map((el) => {
		const [user, amount] = el;
		const userTipAmount = ((amount / 100) * tip) / 100;
		el.push(userTipAmount);
		return el;
	});
</script>

<section>
	<table id="displayTable">
		<thead>
			<tr>
				<th>Name</th>
				<th>Order Cost</th>
				<th>Tip</th>
				<th>Total</th>
			</tr>
		</thead>
		<tbody>
			{#each users as [user, amount, tipAmount]}
				<tr>
					<td>{user}</td>
					<td>${(amount / 100).toFixed(2)}</td>
					<td>${tipAmount.toFixed(2)}</td>
					<td>${(tipAmount + (amount / 100)).toFixed(2)}</td>
				</tr>
			{/each}
		</tbody>
	</table>
</section>
<div style="margin-block-end: 1em;">
	Tip: <input type="number" min="0" step="1" bind:value={tip} style="inline-size: 2em;" />%
</div>

<div>
	<button on:click={addPerson}>Add Person</button>
</div>

{#each data as item}
	<details open>
		<summary>
			{item.name}:
		</summary>
		<div class="dishList">
			{#if item.dishes.length === 0}
				 <p>No dishes</p>
			{/if}
			{#each item.dishes as dish (dish.uid)}
				<input type="text" bind:value={dish.name} placeholder="Unnamed Dish" />
				<input type="number" bind:value={dish.amount} step="0.01" min="0" />
				<button on:click={removeDish(item.name, dish.uid)}> - </button>
			{/each}
			<button on:click={addDish(item.name)}>Add dish</button>
		</div>
	</details>
{/each}

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 1;
	}

	.dishList {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 1em;
		margin-block: 1em;
	}
	.dishList input {
		margin: 0;
		padding: 0;
		inline-size: 100%;
	}

	details {
		border: 1px solid;
		margin-block: 1em;
		padding: 1em;

	}

	#displayTable {
		inline-size: 100%;
		text-align: start;
		margin-block-end: 1em;
	}
</style>
