<template>
  <b-container class="bv-example-row">
    <b-row align-h="center">
      <b-col cols="12">
        <div>
          <b-card no-body>
            <b-card-body>
              <b-row>
                <b-col>
                  <h4 class="card-title">{{ productData.name }}</h4>
                </b-col>
                <b-col cols="8" lg="5" md="auto">
                  <div>
                    <h4 class="card-title">Описание</h4>
                    <p>{{ productData.description }}</p>
                  </div>
                </b-col>
              </b-row>
            </b-card-body>
          </b-card>
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  async asyncData({ app }) {
    const productData = await app.$axios.$get(`/api/products/${app.context.params.id}`)
    return { productData }
  }
}
</script>

