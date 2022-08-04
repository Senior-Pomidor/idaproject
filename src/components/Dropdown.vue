<template>
	<div :class="{ [dropdown.dropdown]: true, [dropdown.opened]: isDropdownOpened }" v-click-outside="closeDropdown">
		<button :class="dropdown['dropdown-btn']" @click="isDropdownOpened = !isDropdownOpened">
			<span>{{ value }}</span>
			<i :class="dropdown['dropdown-icon']"></i>
		</button>
		<ul :class="dropdown['options']">
			<li :class="dropdown['option']" v-for="(option, index) in options"
					:data-value="option.value"
					@click="option.handler(); value = option.text; isDropdownOpened = !isDropdownOpened">
						{{ option.text }}
			</li>
		</ul>

		<!-- <input type="hidden" :name="{ name }" :value="{ value }"> -->
	</div>
</template>

<script>
import vClickOutside from 'v-click-outside';

export default {
	name: 'dropdown',
	props: {
		name: {
			type: String,
			required: true,
			default: () => null
		},
		options: {
			type: Array,
			required: true,
			default() {
				return [
					{
						text: 'По названию',
						value: 'byName',
						handler: () => {
							console.log(this);
						}
					}
				]
			}
		},
		default: {
			type: String,
			default: () => null
		}
	},
	data() {
		return {
			isDropdownOpened: false,
			value: this.default
		}
	},
	directives: {
		clickOutside: vClickOutside.directive
	},
	methods: {
		closeDropdown() {
			this.isDropdownOpened = false;
		}
	}
}
</script>

<style lang="scss" module="dropdown">
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
		white-space: nowrap;

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
			top: calc(100% + 1rem);
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
</style>