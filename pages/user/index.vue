<template>
  <div id="container">
    <b-container class="bv-exaple-row">
      <b-row align-h="start">
        <vs-tabs id="tabs">
          <vs-tab vs-label="User">
            <b-form @submit="submit">
              <b-form-group label="Login">
                <b-form-input v-model="user.login" required/>
              </b-form-group>
              <b-form-group label="Email">
                <b-form-input type="email" v-model="user.email" required/>
              </b-form-group>
              <b-form-group label="Password">
                <b-form-input type="password" placeholder="Enter new password" v-model="user.password"/>
              </b-form-group>
              <b-button type="submit" variant="primary">Save</b-button>
            </b-form>
          </vs-tab>
          <vs-tab vs-label="Products">
            <b-table :items="products.data" :fields="['name', 'description', 'edit']">
              <template slot="edit" slot-scope="row">
                <b-button size="sm" class="mr-1" :to="`/products/${row.item._id}/edit`">Edit</b-button>
                <b-button size="sm" class="mr-0" variant="danger" @click.prevent="deletePost(row.item._id)">Delete</b-button>
              </template>
            </b-table>
          </vs-tab>
        </vs-tabs>
      </b-row>
    </b-container>
  </div>
</template>

<style lang="stylus" scoped>
#container
  margin 1rem 1rem 0 1rem
#tabs
  box-shadow 0 4px 15px 0 rgba(0,0,0,.08)
#submit
  margin-top 0.5em
</style>

<script>
export default {
  async asyncData({ app }) {
    const fetchedUser = await app.$axios.get('/api/auth/user')
    const products = await app.$axios.get('/api/products/')
    return {
      user: {
        login: fetchedUser.data.login,
        email: fetchedUser.data.email,
        password: ''
      },
      products
    }
  },
  middleware: 'auth',
  methods: {
    async submit(evt) {
      await evt.preventDefault()
      await this.$axios.put('/api/auth/user', this.user)
    },
    async deletePost(id) {
      await this.$axios.delete(`/api/products/${id}`)
      this.products.data.splice(this.products.data.map((item) => { return item._id }).indexOf(id), 1)
    }
  }
}
</script>


