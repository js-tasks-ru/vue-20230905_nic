<template>
  <div class="page-auth">
    <UiContainer>
      <h2 class="title page-auth__title">Вход</h2>
      <form class="form" @submit.prevent="handleSubmit">
        <UiFormGroup label="Email">
          <div class="input-group">
            <input v-model="email" type="email" placeholder="demo@email" class="form-control" />
          </div>
        </UiFormGroup>
        <UiFormGroup label="Пароль">
          <div class="input-group">
            <input v-model="password" type="password" placeholder="password" class="form-control" />
          </div>
        </UiFormGroup>
        <div class="form__buttons">
          <button type="submit" class="button button_primary button_block">Войти</button>
        </div>
        <div class="form__append">Нет аккаунта? <RouterLink to="/register" class="link">Зарегистрируйтесь</RouterLink></div>
      </form>
    </UiContainer>
  </div>
</template>

<script>
import UiFormGroup from '../components/UiFormGroup.vue';
import UiContainer from '../components/UiContainer.vue';

export default {
  name: 'PageLogin',

  components: {
    UiFormGroup,
    UiContainer,
  },
  data() {
    return {
      email: '',
      password: ''
    }
  },

  computed: {
    query() {
      return this.$route.query;
    }
  },

  methods: {
    handleSubmit() {
      console.log(this.query.from);
      this.$router.push((this.query.from) ? this.query.from : '/');
      // Требуется обработать сабмит формы
    },
  },
};
</script>

<style></style>
