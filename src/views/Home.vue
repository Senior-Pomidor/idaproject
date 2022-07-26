<template>
  <div :class="home.home">
    <div :class="home.container" class="container">
      <h1>home</h1>
      <Card></Card>
    </div>
  </div>
</template>

<script>
import Card from "@/components/Card";
// import FormAdd from "@/components/FormAdd";

export default {
  name: "home",
  components: {
    Card,
    // FormAdd,
  },
};
</script>

<style lang="scss" module="home">
.home {
  color: $color-white;

  .container {
    // background-color: $color-green;
  }
}
</style>
