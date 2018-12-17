<template>
  <b-container class="bv-exaple-row edit-container">
    <b-row align-h="start">
      <b-form class="w-100" id="productForm">
        <b-form-group id="nameGroup" label="Name:" label-for="nameInput">
          <b-form-input id="nameInput" type="text" v-model="productData.name"/>
        </b-form-group>
        <b-form-group id="descriptionGroup" label="Description:" label-for="descriptionInput">
          <b-form-textarea id="descriptionInput" rows="3" v-model="productData.description"/>
        </b-form-group>
        <b-button type="submit" variant="primary" @click.prevent="submit">Save</b-button>
        <b-button variant="danger" @click.prevent="deletePost" class="float-right">Delete</b-button>
      </b-form>
    </b-row>
  </b-container>    
</template>

<style lang="stylus" scoped>
.edit-container
  box-shadow 0 4px 15px 0 rgba(0,0,0,.08)
#productForm
  margin 1rem 1rem 1rem 1rem
</style>

<script>
export default {
  async asyncData({ app }) {
    const productData = await app.$axios.$get(`/api/products/${app.context.params.id}`)
    return { productData }
  },
  middleware: 'auth',
  methods: {
    async submit() {
      await this.$axios.put(`/api/products/${this.$route.params.id}`, this.productData)
    },
    async deletePost() {
      await this.$axios.delete(`/api/products/${this.$route.params.id}`)
      this.$router.go(-1)
    }
  }
}
</script>

