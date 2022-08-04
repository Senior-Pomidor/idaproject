<template>
	<div :class="products.layout">
		<header :class="products.header">
			<div :class="products.container" class="container">
				<h1 :class="products.title">
					Добавление товара
				</h1>

				<div :class="products.sort">
					<Dropdown :options="sortOptions" :name="'sort'" :default="'По умолчанию'" />
				</div>
			</div>
		</header>

		<main :class="products.main">
			<div :class="products.container" class="container">
				<aside :class="products.aside">
					<FormAdd :class="products.form" />
				</aside>

				<article :class="products.content">
					<div :class="products.sort">
						<Dropdown :options="sortOptions" :name="'sort'" :default="'По умолчанию'" />
					</div>

					<div :class="products.cards">
						<Product v-for="product in PRODUCTS" :key="product.id" :info="product"
							:class="{ [products['new-product']]: product.id == $store.state.products.newId, [products.product]: true }" />
					</div>
				</article>
			</div>
		</main>
	</div>
</template>

<script>
import Product from "@/components/Product";
import FormAdd from "@/components/FormAdd";
import Dropdown from "@/components/Dropdown";
import { mapActions, mapGetters } from 'vuex';

export default {
	name: "products",
	components: {
		Product,
		FormAdd,
		Dropdown
	},
	data() {
		return {
			isDropdownOpened: false,
			sortOptions: [{
				text: 'По названию',
				value: 'byName',
				handler: () => {
					this.sortByName()
				}
			}, {
				text: 'По возрастанию цены',
				value: 'byPriceUp',
				handler: () => {
					this.sortByPriceUp()
				}
			}, {
				text: 'По убыванию цены',
				value: 'byPriceDown',
				handler: () => {
					this.sortByPriceDown()
				}
			},]
		}
	},
	methods: {
		...mapActions(['FETCH_PRODUCTS_MOCKUP']),
		sortByName() {
			return this.PRODUCTS.sort((a, b) => a.title.localeCompare(b.title));
		},
		sortByPriceUp() {
			return this.PRODUCTS.sort((a, b) => Number(a.price.replace(/ /g, '')) - Number(b.price.replace(/ /g, '')));
		},
		sortByPriceDown() {
			return this.PRODUCTS.sort((a, b) => Number(b.price.replace(/ /g, '')) - Number(a.price.replace(/ /g, '')));
		},
	},
	computed: {
		...mapGetters(['PRODUCTS'])
	},
	mounted() {
		this.FETCH_PRODUCTS_MOCKUP();
	}
};
</script>

<style lang="scss" module="products">
// Дефолтные значения переменных, если не заданы глобальные
$font-color-dafault: #3F3F3F !default;
// $container-padding: 2rem !default;
// $container-padding--mobile: 1rem !default;
$font-family-default: Arial !default;
$color-white: #FFFEFB !default;
$color-grey: #B4B4B4 !default;
$color-green: #7BAE73 !default;

$header-pading: 1rem;
$grid-gap: 1rem;

.layout {
	color: $font-color-dafault;
}

.header {
	padding: $container-padding 0 $header-pading;

	.container {
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
	}

	.title {
		font-size: 1.75rem;
		font-weight: 600;
		margin: 0;
	}


	@include breakpoint($breakpoint-xs) {
		.sort {
			display: none;
		}
	}
}

.sort {
	display: flex;

	.dropdown:not(:last-child) {
		margin-right: 1rem;
	}
}

.dropdown {
	position: relative;
	color: $color-grey;
	// margin-bottom: 1rem;

	.dropdown-btn {
		display: flex;
		align-items: center;
		align-self: flex-end;
		font-family: $font-family-default, sans-serif;
		font-size: 0.75rem;
		line-height: 1.25;
		color: inherit;
		background-color: $color-white;
		border: none;
		border-radius: 0.25rem;
		box-shadow: 0px 2px 5px rgb(0 0 0 / 10%);
		// margin-bottom: 1rem;
		padding: 0.625rem 1rem calc(0.625rem + 1px);
		font-weight: 400;
		cursor: pointer;
		transition: color .2s ease;

		@include hover() {
			color: $font-color-dafault;

			.dropdown-icon {
				border-color: $font-color-dafault;
			}
		}
	}

	.dropdown-icon {
		position: relative;
		top: -1px;
		display: inline-block;
		width: 5px;
		height: 5px;
		border-top: 1px solid $color-grey;
		border-left: 1px solid $color-grey;
		margin-left: 6px;
		transform-origin: 50% 50%;
		transform: rotate(225deg);

		transition: transform .2s ease, border-color .2s ease;
	}

	.options {
		position: absolute;
		top: 80%;
		right: 0;
		display: block;
		width: 100%;
		max-width: 510px;
		min-width: fit-content;
		list-style-type: none;
		border-radius: .25rem;
		background-color: $color-white;
		box-shadow: 0px 20px 30px rgb(0 0 0 / 4%), 0px 6px 10px rgb(0 0 0 / 2%);
		margin: 0;
		padding: 0;
		z-index: 2;

		visibility: hidden;
		opacity: 0;

		transition: top .2s ease, opacity .2s ease, visibility .2s ease;
	}

	.option {
		color: inherit;
		font-size: .825rem;
		padding: 0.625rem 1rem;
		cursor: pointer;
		transition: color .2s ease;

		@include hover() {
			color: $font-color-dafault;
		}

		@media (hover: none) {
			color: $font-color-dafault;
		}
	}

	&.opened {
		.dropdown-btn {
			color: $font-color-dafault;
		}

		.dropdown-icon {
			top: initial;
			bottom: -1px;
			border-color: $font-color-dafault;
			transform: rotate(45deg);
		}

		.options {
			top: calc(100% + $header-pading);
			opacity: 1;
			visibility: visible;
		}
	}

	@include breakpoint($breakpoint-xs) {
		.options {
			width: 100%;
		}
	}
}

.main {
	padding-bottom: $container-padding;

	.container {
		display: grid;
		display: -ms-grid;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		column-gap: $grid-gap;
		// padding: $container-padding;
	}

	.form {
		position: sticky;
		top: 1.5rem;
		margin-bottom: $grid-gap;
	}

	.content {
		grid-column: 2 / -1;
	}

	.sort {
		display: none;
		margin-bottom: 1rem;
	}

	.cards {
		display: grid;
		display: -ms-grid;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		gap: $grid-gap;
	}

	@keyframes newProduct {
		from {
			opacity: .2;
		}

		to {
			opacity: 1;
		}
	}

	.new-product {
		animation-name: newProduct;
		animation-duration: 1.5s;
	}

	@include breakpoint($breakpoint-md) {
		.container {
			grid-template-columns: 300px auto;
		}

		.cards {
			grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
		}

		.product {
			margin: 0 auto;
		}
	}

	@include breakpoint($breakpoint-sm) {
		.container {
			grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		}

		.aside {
			display: flex;
			justify-content: center;
			align-items: flex-start;
		}

		.content {
			grid-template-columns: repeat(auto-fit, min-max(300px, 1fr));
			grid-column: initial;
		}
	}

	@include breakpoint($breakpoint-xs) {
		.container {
			grid-template-columns: 1fr;
		}

		.aside {
			> :last-child {
				margin-bottom: 2rem;
			}
		}

		.content {
			grid-column: initial;
		}

		.sort {
			display: flex;
			justify-content: flex-end;
			position: sticky;
			top: 1.5rem;
			z-index: 2;
		}
	}
}
</style>
