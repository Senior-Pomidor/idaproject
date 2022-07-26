<template>
  <form action="" :class="formAdd['form-add']">
    <div :class="{ [formAdd.group]: true, [formAdd.required]: true }">
      <label :class="formAdd.name" for="title">Наименование товара</label>
      <input
        :class="formAdd.input"
        type="text"
        id="title"
        name="title"
        placeholder="Введите наименование товара"
      />
      <small :class="formAdd[required - text]">
        Поле является обязательным
      </small>
    </div>

    <div :class="formAdd.group">
      <label :class="formAdd.name" for="descripton"></label>
      <textarea
        :class="formAdd.input"
        id="descripton"
        name="descripton"
        placeholder="Введите описание товара"
      ></textarea>
    </div>

    <div :class="{ [formAdd.group]: true, [formAdd.required]: true }">
      <label :class="formAdd.name" for="img">
        Ссылка на изображение товара
      </label>
      <input
        :class="formAdd.input"
        type="text"
        id="img"
        name="img"
        placeholder="Введите ссылку"
      />
      <small :class="formAdd[required - text]">
        Поле является обязательным
      </small>
    </div>

    <div :class="{ [formAdd.group]: true, [formAdd.required]: true }">
      <label :class="formAdd.name" for="price"> Цена товара </label>
      <input
        :class="formAdd.input"
        type="text"
        id="price"
        name="price"
        placeholder="Введите цену"
      />
      <small :class="formAdd[required - text]">
        Поле является обязательным
      </small>
    </div>

    <input
      :class="formAdd['submit-btn']"
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
.form-add {
  .required {
    color: red;
  }
}
</style>
