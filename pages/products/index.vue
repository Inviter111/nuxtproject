<template>
  <b-container class="bv-example-row">
    <b-row align-h="start">
      <b-col v-for="product of products.data" :key="product._id" cols="4">
        <div>
          <b-card no-body>
            <b-card-body>
              <b-link :to="`/products/${product._id}`" style="color: #04b;">
                <h4 class="card-title" style="margin-bottom: 0;">{{ product.name }}</h4>
              </b-link>
            </b-card-body>
            <b-card-img src="https://picsum.photos/600/300/?image=25" alt="Image"/>
            <b-card-footer>
              <b-button v-if="isAuthenticated" size="sm" class="float-right" :to="`/products/${product._id}/edit`">Edit</b-button>
            </b-card-footer>
          </b-card>
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  async asyncData({ app }) {
    const products = await app.$axios.get('/api/products/')
    return { products }
  },
  computed: {
    ...mapGetters(['isAuthenticated'])
  }
}
</script>

