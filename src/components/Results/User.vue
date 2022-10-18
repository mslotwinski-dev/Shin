<template>
  <header>
    <img :src="user.avatar_url" />
    <div class="userdata">
      <div class="name">{{ user.name }}</div>
      <div class="login">{{ user.login }}</div>
      <div class="bio">{{ user.bio }}</div>
    </div>
  </header>
  <div class="orgs">
    <div class="orgscontainer">
      <a
        class="org"
        v-for="org in orgs"
        :key="org"
        :style="{ backgroundImage: `url(${org.avatar_url})` }"
        :href="'//github.com/' + org.login"
      ></a>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Endpoints } from '@octokit/types'
import axios from 'axios'

export default defineComponent({
  props: {
    username: String,
  },
  data() {
    return {
      user: {} as Endpoints['GET /users/{username}']['response']['data'],
      orgs: {} as Endpoints['GET /users/{username}/orgs']['response'],
    }
  },
  async mounted() {
    let token: string
    this.$store.getters.getToken
      ? (token = this.$store.getters.getToken)
      : (token = process.env.VUE_APP_TOKEN)

    this.user = (
      await axios.get(`https://api.github.com/users/${this.username}`, {
        headers: {
          Authorization: `token ${token}`,
        },
      })
    ).data
    this.orgs = (
      await axios.get(`https://api.github.com/users/${this.username}/orgs`, {
        headers: {
          Authorization: `token ${token}`,
        },
      })
    ).data
  },
})
</script>

<style lang="scss" scoped>
header {
  display: flex;
  align-items: center;
  width: 100%;
  background-color: #e3e3e3;
  border-radius: 10px;
  img {
    width: 200px;
    height: 200px;
    border-radius: 50%;
    margin: 10px;
  }
  .name {
    font-weight: 500;
    font-size: 24px;
  }
  .login {
    font-size: 20px;
  }
  .bio {
    margin: 10px 0;
  }
}
.orgs {
  .orgtitle {
    font-size: 25px;
    margin: 10px 0;
  }
  .orgscontainer {
    display: flex;
    flex-wrap: wrap;
    margin: 10px 0;
    width: 100%;
    .org {
      display: block;
      width: 45px;
      height: 45px;
      margin-right: 10px;
      border-radius: 7px;
      background-size: cover;
      cursor: pointer;
    }
  }
}
</style>
