<template>
  <component :is="($attrs.tag)?$attrs.tag:'router-link'" :to="$attrs.to" class="link"><slot></slot></component>
</template>

<script>
export default {
  name: 'UiLink',
};
</script>

<style scoped>
.link {
  color: var(--blue);
  text-decoration: none;
}

.link:hover {
  text-decoration: underline;
}
</style>
