<template>
  <div class="page-wrapper">
    <button @click="test()">test</button>
  </div>
</template>

<script lang="ts" setup>
import { useUsersStore } from "@/stores/users.store";

const usersStore = useUsersStore();

function test() {
  usersStore.readAll().then((response: any) => {
    console.log(response);
  });
}
</script>

<style lang="scss" scoped>
.page-wrapper {
  background-color: #181a21;
}
</style>
