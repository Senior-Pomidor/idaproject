<template>
	<main :class="products.products">
			<div :class="products.container" class="container">
				<aside :class="products.aside">
					<h2 :class="products.title">
						Добавление товара
					</h2>
					<FormAdd :class="products.form" />
				</aside>
				
				<article :class="products.content">
					<div :class="products.filters">
						<div :class="products.dropdown" name="sort" id="sort">
							<button :class="products['dropdown-btn']">
								По умолчанию
							</button>
							<ul :class="products['dropdown-options']">
								<li :class="products['dropdown-option']">
									по умолчанию
								</li>
								<li :class="products['dropdown-option']">
									по ввозрастанию цены
								</li>
								<li :class="products['dropdown-option']">
									по убыванию цены
								</li>
								<li :class="products['dropdown-option']">
									по названию
								</li>
							</ul>
							
							<input type="hidden">
						</div>
					</div>
					<div :class="products.cards">
						<Card
								v-for="product in PRODUCTS"
								:key="product.id"
								:info="product" />
					</div>
				</article>
			</div>
	</main>
</template>

<script>
import Card from "@/components/Card";
import FormAdd from "@/components/FormAdd";
import {mapActions, mapGetters} from 'vuex';

export default {
	name: "products",
	components: {
		Card,
		FormAdd
	},
	methods: {
		...mapActions(['FETCH_PRODUCTS_MOCKUP'])
	},
	computed: {
		...mapGetters(['PRODUCTS'])
	},
	mounted() {
		this.FETCH_PRODUCTS_MOCKUP()
	}
};
</script>

<style lang="scss" module="products">
// Дефолтные значения переменных, если не заданы глобальные
$font-color-dafault: #3F3F3F !default;
$container-padding: 2rem !default;

$header-margin-bottom: 1rem;
$grid-gap: 1rem;
.products {
	color: $font-color-dafault;

	.container {
		display: grid;
		display: -ms-grid;
		grid-template-columns: repeat(4, 1fr);
		column-gap: $grid-gap;
		padding: $container-padding;
	}
	
	.title {
		font-size: 1.75rem;
		font-weight: 600;
		line-height: 1.25;
		margin: 0;
		margin-bottom: $header-margin-bottom;
	}
	
	.form {
		position: sticky;
		top: $grid-gap;
	}
	
	.content {
		grid-column: 2 / 5;
	}
	
	.filters {
		grid-column: 1 / 4;
	}
	
	.dropdown-btn {
		align-self: flex-end;
		font-size: .75rem;
		line-height: 1.25;
		color: #B4B4B4;
		background-color: #fff;
		border: none;
		border-radius: .25rem;
		box-shadow:  0px 2px 5px rgba(0, 0, 0, 0.1);
		margin-bottom: $header-margin-bottom;
		padding: .625rem 1rem calc(.625rem + 1px);
	}
	
	.dropdown {
		display: flex;
		flex-direction: column;
	}
	
	.dropdown-options {
		display: none;
	}
	

	.cards {
		display: grid;
		display: -ms-grid;
		grid-template-columns: repeat(3, 1fr);
		gap: $grid-gap $grid-gap;
	}
	
	@include breakpoint($breakpoint-md) {
		.container {
			grid-template-columns: repeat(3, 1fr);
		}
		
		.cards {
			grid-template-columns: repeat(2, 1fr);
		}
	}
	
	@include breakpoint($breakpoint-sm) {
		.container {
			grid-template-columns: repeat(2, 1fr);
			padding: 1rem;
		}
		
		.content {
			grid-columns: initial;
		}
		
		.cards {
			grid-template-columns: repeat(1, 1fr);
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
	}
}
</style>
