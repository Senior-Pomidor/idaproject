<template>
	<form action="" :class="formAdd['form-add']" ref="form-add">
		<div :class="{ [formAdd.group]: true, [formAdd.required]: true }">
			<label :class="formAdd.label" for="title">Наименование товара</label>
			<input
				:class="{ [formAdd.input]: true, [formAdd['validation-required']]: !$v.info.name.required && $v.info.name.$dirty }"
				type="text" id="name" name="name" placeholder="Введите наименование товара" v-model="info.name"
				autocomplete="off" @input="$v.info.name.$touch" />
			<small :class="formAdd['required-helper']">
				Поле является обязательным
			</small>
		</div>

		<div :class="formAdd.group">
			<label :class="formAdd.label" for="descripton">
				Описание товара
			</label>
			<textarea :class="{ [formAdd.input]: true, [formAdd.textarea]: true }" rows="5" id="descripton" name="descripton"
				placeholder="Введите описание товара" v-model="info.description" autocomplete="off"></textarea>
		</div>

		<div :class="{ [formAdd.group]: true, [formAdd.required]: true }">
			<label :class="formAdd.label" for="img">
				Ссылка на изображение товара
			</label>
			<input
				:class="{ [formAdd.input]: true, [formAdd['validation-required']]: (!$v.info.image.required || !$v.info.image.url) && $v.info.image.$dirty }"
				type="text" id="img" name="img" placeholder="Введите ссылку" v-model="info.image" autocomplete="off"
				@input="$v.info.image.$touch" />
			<small :class="formAdd['required-helper']">
				Поле является обязательным
			</small>
		</div>

		<div :class="{ [formAdd.group]: true, [formAdd.required]: true }">
			<label :class="formAdd.label" for="price"> Цена товара </label>
			<input
				:class="{ [formAdd.input]: true, [formAdd['validation-required']]: !$v.info.price.required && $v.info.price.$dirty }"
				type="text" id="price" name="price" placeholder="Введите цену" v-model="info.price" autocomplete="off"
				@input="$v.info.price.$touch(); formatPrice()" />
			<small :class="formAdd['required-helper']">
				Поле является обязательным
			</small>
		</div>

		<input :class="{
			[formAdd['submit-btn']]: true,
			[formAdd.input]: true
		}" type="submit" value="Добавить товар" :disabled="$v.info.$invalid"
			@click.prevent="sendForm()" />
	</form>
</template>

<script>
import { required, url } from 'vuelidate/lib/validators';
import { mapActions } from 'vuex'


export default {
	name: "form-add",
	data() {
		return {
			currency: 'руб.',
			info: {
				name: null,
				description: null,
				image: null,
				price: null
			}
		}
	},
	validations: {
		info: {
			name: { required },
			image: { required, url },
			price: { required }
		}
	},
	mounted() {
		this.resetTextFields();
		this.$v.$reset();
	},
	methods: {
		...mapActions(['CREATE_PRODUCT']),
		sendForm() {
			if (this.$v.info.$invalid) {
				alert('Заполните все обязательные поля соответствующими значениями');
				return
			}

			const formData = {}

			formData.currency = this.currency;
			formData.id = Date.now()
			for (let key in this.info) {
				formData[key] = this.info[key];
			}

			this.CREATE_PRODUCT(formData);
			alert('Товар успешно добавлен');

			this.resetTextFields();
			this.$v.$reset();
			
			this.$emit('submit')
		},
		resetTextFields() {
			for (let key in this.info) {
				this.info[key] = null;
			}
		},
		formatPrice() {
			this.info.price = this.info.price.replace(/[^0-9.]/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, " ");
		}
	}
};
</script>

<style lang="scss" module="formAdd">
// Дефолтные значения переменных, если не заданы глобальные
// $font-color: #3F3F3F !default;
$color-white: #fffefb !default;
$font-color-dafault: #49485e !default;
$color-black: #3f3f3f !default;
$color-grey: #b4b4b4 !default;
$font-family-default: Arial !default;
$color-grey-light: #eeeeee !default;
$color-red: #FF8484 !default;
$color-green: #7BAE73 !default;

// $font-color: red;
$bg-color: $color-white;
$border-radius: 0.25rem;
$label-font-color: $font-color-dafault;
$input-font-color: $color-black;
$input-bg-color: $color-white;
$input-placeholder-color: $color-grey;
$input-border-width: 1px;


$btn-color: #fff;
$btn-bg-color: $color-green;
$btn-font-family: Inter;

$btn-color--disabled: $input-placeholder-color;
$btn-bg-color--disabled: $color-grey-light;

$required-helper-color: $color-red;

.form-add {
	width: 100%;
	max-width: 400px;
	background-color: $bg-color;
	border-radius: $border-radius;
	box-shadow: 0px 20px 30px rgba(0, 0, 0, 0.04), 0px 6px 10px rgba(0, 0, 0, 0.02);
	padding: 1.5rem;
	box-sizing: border-box;

	.group {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		width: 100%;
		position: relative;
		margin-bottom: 1rem;
	}

	.label {
		display: inline-block;
		color: $label-font-color;
		font-size: 0.625rem;
		font-weight: 400;
		line-height: 1.3;
		letter-spacing: -0.02em;
		margin-bottom: 0.25rem;
	}

	.input {
		position: relative;
		width: 100%;

		font-family: $font-family-default;
		color: $input-font-color;
		font-size: 0.75rem;
		line-height: 1.25;

		background-color: $input-bg-color;
		border: none;
		box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
		border: 1px solid transparent;
		border-radius: $border-radius;
		-webkit-border-radius: $border-radius;
		-moz-border-radius: $border-radius;
		-ms-border-radius: $border-radius;
		-o-border-radius: $border-radius;
		-webkit-appearance: none;
		padding: calc(0.625rem - $input-border-width) calc(1rem - $input-border-width) calc(0.625rem + 1px - $input-border-width);
		box-sizing: border-box;

		transition: border .2s ease;

		&::-webkit-input-placeholder {
			color: $input-placeholder-color;
			font-family: $font-family-default, sans-serif;
		}

		&::-moz-placeholder,
		&:-moz-placeholder {
			color: $input-placeholder-color;
			font-family: $font-family-default, sans-serif;
		}

		// &[type="number"] {
		// 	-moz-appearance: textfield;

		// 	&::-webkit-outer-spin-button,
		// 	&::-webkit-inner-spin-button {
		// 			-webkit-appearance: none;
		// 	}
		// }

		@include hover() {
			border-color: #e5e5e5;
		}

		&:focus {
			border: 1px solid $color-green;
			outline: none;
		}

		+.required-helper {
			position: absolute;
			left: 0;
			top: calc(100% + .25rem);
			font-size: .5rem;
			line-height: 1.25;
			color: $required-helper-color;
			pointer-events: none;

			visibility: hidden;
			opacity: 0;
			transition: visibility .2s ease, opacity .2s ease;
		}

		&.validation-required {
			&:focus {
				border-color: $color-red;

				+.required-helper {
					visibility: visible;
					opacity: 1;
				}
			}
		}
	}

	.textarea {
		min-height: 6.75rem;
		resize: none;
	}

	.submit-btn {
		display: block;
		width: 100%;

		text-align: center;
		color: $btn-color;
		font-weight: 600;
		font-family: $btn-font-family, sans-serif;
		letter-spacing: -0.02em;

		background-color: $btn-bg-color;
		border-radius: .625rem;
		margin-top: 1.5rem;
		cursor: pointer;

		transition: color .2s ease,
			background-color .2s ease;

		&:disabled {
			color: $btn-color--disabled;
			background-color: $btn-bg-color--disabled;
			cursor: not-allowed;
		}
	}

	.required {
		.label {
			position: relative;

			&::before {
				position: absolute;
				top: 0;
				left: 101%;
				display: block;
				width: .25rem;
				height: .25rem;
				background-color: $required-helper-color;
				border-radius: 50%;
				content: "";
			}
		}
	}
}
</style>
