<template>
  <form action="" :class="formAdd['form-add']">
    <div :class="{ [formAdd.group]: true, [formAdd.required]: true }">
      <label :class="formAdd.label" for="title">Наименование товара</label>
      <input
        :class="formAdd.input"
        type="text"
        id="title"
        name="title"
        placeholder="Введите наименование товара"
      />
      <small :class="formAdd['required-helper']">
        Поле является обязательным
      </small>
    </div>

    <div :class="formAdd.group">
      <label :class="formAdd.label" for="descripton">
        Описание товара
      </label>
      <textarea
        :class="{ [formAdd.input]: true, [formAdd.textarea]: true }"
        id="descripton"
        name="descripton"
        placeholder="Введите описание товара"
      ></textarea>
    </div>

    <div :class="{ [formAdd.group]: true, [formAdd.required]: true }">
      <label :class="formAdd.label" for="img">
        Ссылка на изображение товара
      </label>
      <input
        :class="formAdd.input"
        type="text"
        id="img"
        name="img"
        placeholder="Введите ссылку"
      />
      <small :class="formAdd['required-helper']">
        Поле является обязательным
      </small>
    </div>

    <div :class="{ [formAdd.group]: true, [formAdd.required]: true }">
      <label :class="formAdd.label" for="price"> Цена товара </label>
      <input
        :class="formAdd.input"
        type="text"
        id="price"
        name="price"
        placeholder="Введите цену"
      />
      <small :class="formAdd['required-helper']">
        Поле является обязательным
      </small>
    </div>

    <input
      :class="{ [formAdd['submit-btn']]: true, [formAdd.input]: true }"
      type="submit"
      value="Добавить товар"
      @click.prevent
    />
  </form>
</template>

<script>
export default {
  name: "form-add",
};
</script>

<style lang="scss" module="formAdd">
// Дефолтные значения переменных, если не заданы глобальные
// $font-color: #3F3F3F !default;
$color-white: #fffefb !default;
$font-color-dafault: #49485e !default;
$color-black: #3f3f3f !default;
$color-white: #fffefb !default;
$color-grey: #b4b4b4 !default;
$color-green: #7bae73 !default;
$font-family-dafault: Arial !default;
$color-grey-light: #eeeeee !default;
$color-red: #FF8484 !default;

// $font-color: red;
$bg-color: $color-white;
$border-radius: 0.25rem;
$label-font-color: $font-color-dafault;
$input-font-color: $color-black;
$input-bg-color: $color-white;
$input-placeholder-color: $color-grey;

$btn-color: $input-placeholder-color;
$btn-bg-color: $color-grey-light;

$btn-color--active: #fff;
$btn-bg-color--active: $color-green;
$required-helper-color: $color-red;

.form-add {
  width: 100%;
  max-width: 332px;
  margin: 0 auto; //dev
  // color: $font-color;
  background-color: $bg-color;
  border-radius: $border-radius;
  padding: 1.5rem;
  box-sizing: border-box;

  .group {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
		position: relative;
    margin-bottom: 1rem;
    // display: flex;
    // flex-wrap: wrap;
		&:last-of-type {
			margin-bottom: 1.5rem;
		}
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
    width: 100%;

    color: $input-font-color;
    font-size: 0.75rem;
    line-height: 1.25;

    background-color: $input-bg-color;
    border: none;
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
    border-radius: $border-radius;
    padding: 0.625rem 1rem calc(0.625rem + 1px);
    box-sizing: border-box;

    &::-webkit-input-placeholder {
      color: $input-placeholder-color;
      font-family: $font-family-dafault, sans-serif;
    }

    &::-moz-placeholder,
    &:-moz-placeholder {
      color: $input-placeholder-color;
      font-family: $font-family-dafault, sans-serif;
    }
    
    &:focus {
      border: none;
      outline: none;
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
    letter-spacing: -0.02em;

    background-color: $btn-bg-color;
  }
	
  .required-helper {
		position: absolute;
		left: 0;
		top: calc(100% + .25rem);
		font-size: .5rem;
		line-height: 1.25;
		color: $required-helper-color;
		// visibility: hidden;
		pointer-events: none;
  }
	
	.required {
		.label {
			position: relative;
			
			&::before {
				position: absolute;
				top: 0;
				left: 100%;
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
