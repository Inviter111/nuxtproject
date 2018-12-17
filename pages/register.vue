<template>
  <div id="container">
    <b-container class="bv-example-row">
      <b-form @submit="onSubmit">
        <b-form-group label="Логин">
          <b-form-input v-model="user.login" type="text" placeholder="Введите желаемый логин" required/>
        </b-form-group>
        <b-form-group label="E-mail адрес">
          <b-form-input v-model="user.email" type="email" placeholder="Введите корректный адрес электронной почты" required/>
        </b-form-group>
        <b-form-group label="Пароль">
          <b-form-input v-model="user.password" :state="checkPass" type="password" placeholder="Введите пароль" required/>
        </b-form-group>
        <b-form-group label="Подтверждение пароля">
          <b-form-input v-model="confirmPass" :state="checkPass" type="password" placeholder="Введите корректный адрес электронной почты" required/>
        </b-form-group>
        <b-button type="submit" variant="primary">Добавить</b-button>
      </b-form>
    </b-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        login: '',
        email: '',
        password: '',
      },
      confirmPass: ''
    }
  },
  computed: {
    checkPass() {
      return this.user.password === this.confirmPass && this.user.password !== '' ? true : false
    }
  },
  methods: {
    async onSubmit(evt) {
      await evt.preventDefault()
      await this.$axios.post('/api/auth/register', this.user)
      await this.$router.push('/')
    }
  }
}
</script>

