<template>
  <div id="parentx">
    <b-navbar id="navbar" type="dark" toggleable="md" variant="dark" style="padding-left: 8px;">
      <b-navbar-brand href="#" style="margin-left: 16px;" @click="active = !active">
        <menu-icon title="Menu" style="color: lightblue;"/>
      </b-navbar-brand>
      <nuxt-link to="/" tag="a" class="navbar-brand" style="padding-top: 6px;">Home</nuxt-link>
      </b-navbar>
    <vs-sidebar v-model="active" parent="body" :default-index="currIndex" color="primary" class="sidebarx" spacer>
      <div v-if="isAuthenticated" slot="header" class="header-sidebar">
        <h4>
          {{ $store.state.user.login }}
          <vs-dropdown>
            <vs-button color="primary" icon="more_horiz" type="line"/>
            <vs-dropdown-menu>
              <vs-dropdown-item to="/user">
                Profile
              </vs-dropdown-item>
              <vs-dropdown-item @click="$auth.logout()">
                Logout
              </vs-dropdown-item>
            </vs-dropdown-menu>
          </vs-dropdown>
        </h4>
      </div>
      <div v-else slot="header" class="header-sidebar">
        Not logged in.
        <div>
          <b-button color="primary" to="/login">Log in</b-button>
          <b-button color="primary" to="/register">Register</b-button>
        </div>
      </div>  
      <vs-sidebar-item index="1" icon="home" to="/">
        Home
      </vs-sidebar-item>
      <vs-sidebar-item index="2" icon="dashboard" to="/products">
        Products
      </vs-sidebar-item>
    </vs-sidebar>
  </div>
</template>

<style lang="stylus" scoped>
.header-sidebar
  display flex
  align-items center
  justify-content center
  flex-direction column
  width 100%
  h4
    display flex
    align-items center
    justify-content center
    width 100%
    > button
      margin-left 10px
.footer-sidebar
  display flex
  align-items center
  justify-content space-between
  width 100%
  > button
      border 0px solid rgba(0,0,0,0) !important
      border-left 1px solid rgba(0,0,0,.07) !important
      border-radius 0px !important
</style>


<script>
import { mapGetters } from 'vuex'

import MenuIcon from 'vue-material-design-icons/Menu.vue'
import 'material-icons/iconfont/material-icons.css'

export default {
  components: {
    'menu-icon': MenuIcon
  },
  data() {
    return {
      active: false,
      currIndex: 1
    }
  },
  computed: {
    ...mapGetters(['isAuthenticated'])
  },
  async created() {
    switch (this.$route.name) {
      case 'index':
        this.currIndex = 1
        break
      case 'products':
        this.currIndex = 2
        break
      default:
        this.currIndex = 1
        break
    }
    const token = localStorage.getItem('auth._token.local').split(' ')[1]
    if (token) {
      const res = await this.$axios.get('/api/auth/user')
      const user = {
        login: res.data.login
      }
      this.$store.commit('setUser', user)
    }
  },
}
</script>
