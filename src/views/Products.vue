<template>
	<div :class="products.layout">
		<header :class="products.header">
			<div :class="products.container" class="container">
				<h1 :class="products.title">
					Добавление товара
				</h1>

				<div :class="products.sort">
					<button type="button" :class="products['btn-open-form']" @click="isShownForm = !isShownForm"></button>

					<Dropdown :options="sortOptions" :name="'sort'" :default="'По умолчанию'" />
				</div>
			</div>
		</header>

		<main :class="products.main">
			<div :class="products.container" class="container">
				<aside :class="products.aside">
					<FormAdd :class="{ [products.form]: true, [products.shown]: isShownForm }" @submit="isShownForm = false" />
					<div :class="products.overlay" @click="isShownForm = !isShownForm"></div>
				</aside>

				<article :class="products.content">
					<Preloader :class="products.preloader" v-if="preloader"></Preloader>

					<div :class="products.cards">
						<transition-group name="products__products-list" tag="div">
							<Product v-for="product in PRODUCTS" :key="product.id" :info="product" :class="products.product" />
						</transition-group>
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
import Preloader from '@/components/Preloader.vue';
import { onBeforeMount } from "vue";

export default {
	name: "products",
	components: {
		Product,
		FormAdd,
		Dropdown,
		Preloader
	},
	data() {
		return {
			isDropdownOpened: false,
			isShownForm: false,
			sortOptions: [{
				text: 'По названию',
				value: 'byName',
				handler: () => {
					// стрелочная функция
					// чтобы this указыал не на копонент дропдауна,
					// а на данный компонент (Products)
					this.SORT_PRODUCTS('byName')
				}
			}, {
				text: 'По возрастанию цены',
				value: 'byPriceUp',
				handler: () => {
					this.SORT_PRODUCTS('byPriceUp')
				}
			}, {
				text: 'По убыванию цены',
				value: 'byPriceDown',
				handler: () => {
					this.SORT_PRODUCTS('byPriceDown')
				}
			},],
			preloader: true
		}
	},
	methods: {
		...mapActions(['FETCH_PRODUCTS', 'SORT_PRODUCTS']),
	},
	computed: {
		...mapGetters(['PRODUCTS'])
	},
	created() {
		// данные из mockup.json (данные из макета)
		// this.FETCH_PRODUCTS_MOCKUP();

		// данные с API https://fakerapi.it
		this.FETCH_PRODUCTS()
			.then(resp => {
				if (resp.length) this.preloader = false
			})
	}
};
</script>

<style lang="scss" module="products">
// Дефолтные значения переменных, если не заданы глобальные
$font-color-default: #3F3F3F !default;
$container-padding: 2rem !default;
$container-padding--mobile: 1rem !default;
$font-family-default: Arial !default;
$color-white: #FFFEFB !default;
$color-grey: #B4B4B4 !default;
$color-green: #7BAE73 !default;
$color-black: #3F3F3F !default;

$header-pading: 1rem;
$grid-gap: 1rem;

.preloader {
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
}

// animations
:global(.products__products-list-enter-active) {
	animation: new-product-add 0.5s;
}

:global(.products__products-list-leave-active) {
	animation: new-product-add 0.5s reverse;
}

@keyframes new-product-add {
	0% {
		opacity: .2;
		transform: scale(.9);
	}

	100% {
		opacity: 1;
		transform: scale(1);
	}
}

.layout {
	position: relative;
	display: flex;
	flex-direction: column;
	height: 100vh;
	color: $font-color-default;
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
		position: sticky;
		top: 0;
		box-shadow: 0 0 19px 20px #fffefb;
		background-color: $color-white;
		padding-top: 1rem;
		padding-bottom: 0;
		margin-bottom: 1.5rem;
		z-index: 3;

		.title {
			width: 100%;
			flex-basis: 100%;
			font-size: 1.5rem;
			margin-bottom: 1rem;
		}
	}
}

.sort {
	display: flex;
	justify-content: flex-end;
	flex-grow: 1;

	.dropdown:not(:last-child) {
		margin-right: 1rem;
	}

	.btn-open-form {
		display: none;
		justify-content: center;
		align-items: center;
		border: none;
		border-radius: .25rem;
		background-color: $color-white;
		box-shadow: 0px 2px 5px rgb(0 0 0 / 10%);
		padding: 0.625rem 1rem calc(0.625rem + 1px);
		margin-right: auto;

		@include webfont-icon($webfont-icon--plus);

		&::before {
			color: $color-green;
		}
	}

	@include breakpoint($breakpoint-xs) {
		position: sticky;
		top: 1rem;

		.btn-open-form {
			display: flex;
		}
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
			color: $font-color-default;

			.dropdown-icon {
				border-color: $font-color-default;
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
			color: $font-color-default;
		}

		@media (hover: none) {
			color: $font-color-default;
		}
	}

	&.opened {
		.dropdown-btn {
			color: $font-color-default;
		}

		.dropdown-icon {
			top: initial;
			bottom: -1px;
			border-color: $font-color-default;
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
	flex: 1 0 auto;
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
		position: relative;
		grid-column: 2 / -1;
		min-height: 400px;
	}

	.sort {
		display: none;
		margin-bottom: 1rem;
	}

	.cards>div {
		display: grid;
		display: -ms-grid;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		gap: $grid-gap;
	}

	.product {
		margin: 0 auto;
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

		.cards>div {
			grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
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


		.form {
			position: fixed;
			top: 64px;
			z-index: 5;

			visibility: hidden;
			opacity: 0;
			transform: scale(.9);

			transition: all .3s ease;

			+.overlay {
				position: fixed;
				top: 0;
				left: 0;
				display: none;
				width: 1100vw;
				height: 100vh;
				background-color: $color-black;
				z-index: 3;

				// opacity: 0;
				// visibility: hidden;

				// transition: opacity .3s ease, visibility .3s ease;
			}

			&.shown {
				visibility: visible;
				opacity: 1;
				transform: scale(1);

				+.overlay {
					display: block;
					opacity: .8;
					// visibility: visible;
				}
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
