<template>
  <div id="container">
    <b-container class="bv-example-row">
      <b-form @submit="onSubmit">
        <b-form-group label="Название товара">
          <b-form-input v-model="form.name" type="text" placeholder="Введите название товара" required/>
        </b-form-group>
        <b-form-group label="Введите описание товара">
          <b-form-textarea v-model="form.description" type="text" placeholder="Введите описание товара" rows="3" required/>
        </b-form-group>
        <input type="file" accept="image/*" style="display: none;">
        <b-button type="submit" variant="primary">Добавить</b-button>
      </b-form>
    </b-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: '',
        description: ''
      }
    }
  },
  middleware: 'auth',
  methods: {
    async onSubmit(evt) {
      await evt.preventDefault()
      await this.$axios.post('/api/products/create', this.form)
      await this.$router.push('/products')
    }
  }
}
</script>

<style scoped>
#container {
  padding-top: 1em;
}
</style>

