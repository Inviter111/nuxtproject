<template>
  <div id="container">
    <b-container class="bv-example-row">
      <b-form method="post" @submit="onSubmit">
        <b-form-group label="Логин">
          <b-form-input v-model="user.login" type="text" placeholder="Введите логин" required/>
        </b-form-group>
        <b-form-group label="Пароль">
          <b-form-input v-model="user.password" type="password" placeholder="Введите пароль" required/>
        </b-form-group>
        <b-button type="submit" variant="primary">Логин</b-button>
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
        password: ''
      }
    }
  },
  methods: {
    async onSubmit(evt) {
      await evt.preventDefault()
      try {
        await this.$auth.loginWith('local', {
          data: {
            login: this.user.login,
            password: this.user.password
          }
        })
        const token = localStorage.getItem('auth._token.local').split(' ')[1]
        const res = await this.$axios.get('/api/auth/user')
        const user = {
          login: res.data.login
        }
        this.$store.commit('setUser', user)
        this.$router.push('/')
        window.location.reload(true)
      }
      catch (e) {
        console.log(e)
      }
    }
  }
}
</script>
