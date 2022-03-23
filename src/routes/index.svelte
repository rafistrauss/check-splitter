<script context="module">
	export const prerender = true;
</script>

<script>
	let uid = 0;

	/** @type {MyData} */
	let data = [
		// {
		// 	name: "John",
		// 	dishes: [
		// 		{
		// 			amount: 24,
		// 			uid: uid++,
		// 		}
		// 	]
		// }
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
			});
		}
	};

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

	let tip = 20,
	tax = 8.875
		/** @type {Users[]} */
		users = [];

	$: myObj = data.reduce(
		(acc, curr) => {
			const subTotal = curr.dishes.reduce((acc1, curr1) => {
				return acc1 + curr1.amount * 100;
			}, 0);
			acc.totalPreTax += subTotal;
			acc.users[curr.name] = subTotal;
			return acc;
		},
		{ totalPreTax: 0, users: {} }
	);
	
	$: users = Object.entries(myObj.users).map((el) => {
		const [user, amount] = el;
		const userTaxAmount = ((amount / 100) * tax) / 100;
		const userTipAmount = ((amount / 100) * tip) / 100;
		el.push(userTipAmount);
		el.push(userTaxAmount);
		return el;
	});

</script>

	<details open>
		<summary style="cursor: pointer;">
			Instructions
		</summary>
		<p>
			This (basic) webapp lets you calculate how much each member of your party should pay, tax & tip included, based on what they ordered.
		</p>
		<ul>
			<li>Add each member of your party</li>
			<li>Add what dishes each member ordered</li>
			<li>Choose a tip amount</li>
		</ul>
	</details>

<section>
	<table id="displayTable">
		<thead>
			<tr>
				<th>Name</th>
				<th>Order Cost</th>
				<th>Tip</th>
				<th>Tax</th>
				<th>Total</th>
			</tr>
		</thead>
		<tbody>
			{#each users as [user, amount, tipAmount, taxAmount]}
				<tr>
					<td>{user}</td>
					<td>${(amount / 100).toFixed(2)}</td>
					<td>${tipAmount.toFixed(2)}</td>
					<td>${taxAmount.toFixed(2)}</td>
					<td>${(tipAmount + taxAmount + amount / 100).toFixed(2)}</td>
				</tr>
			{/each}
		</tbody>
	</table>
</section>
<div style="margin-block-end: 1em;">
	Tip: <input type="number" min="0" step="1" bind:value={tip} style="inline-size: 2em;" />%
</div>
<div style="margin-block-end: 1em;">
	Tax: <input type="number" min="0" step="0.01" bind:value={tax} style="inline-size: 4em;" />%
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
				<label>
					Dish Name
					<input type="text" bind:value={dish.name} placeholder="Unnamed Dish" />
				</label>
				<label>
					Dish Price
					<input type="number" bind:value={dish.amount} step="0.01" min="0" />
				</label>
				<button on:click={removeDish(item.name, dish.uid)}> Remove </button>
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
		text-align: center;
		margin-block-end: 1em;
	}
</style>
