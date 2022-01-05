<template>
  <form @submit.prevent="onSubmit">
    <input placeholder="Your Github account" v-model="username" required />
    <button>Summary</button>
    <div class="header flex">
      Organizations
      <div class="add" @click="addItem(organizations)">
        <ic icon="times"></ic>
      </div>
    </div>
    <div class="input" v-for="(org, index) in organizations" :key="index">
      <input
        type="text"
        :placeholder="'Organisation#' + (index + 1)"
        v-model="organizations[index]"
      />
      <div class="delete" @click="removeItem(organizations, index)">
        <ic icon="times"></ic>
      </div>
    </div>
    <div class="header flex">
      Repositories
      <div class="add" @click="addItem(repositories)">
        <ic icon="times"></ic>
      </div>
    </div>
    <div class="input" v-for="(repo, index) in repositories" :key="index">
      <input
        type="text"
        placeholder="owner/repository"
        v-model="repositories[index]"
      />
      <div class="delete" @click="removeItem(repositories, index)">
        <ic icon="times"></ic>
      </div>
    </div>
    <label>Show only chart</label>
    <input type="checkbox" v-model="chart" />
  </form>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  data() {
    return {
      username: '',
      organizations: [],
      repositories: [],
      chart: false,
    }
  },
  methods: {
    onSubmit() {
      this.$router.push({
        name: 'Summary',
        query: {
          username: this.username,
          orgs: this.organizations,
          repos: this.repositories,
          chart: this.chart ? 'true' : 'false',
        },
      })
    },
    addItem(items: string[]) {
      items.unshift('')
    },
    removeItem(items: string[], index: number) {
      index > -1 && items.splice(index, 1)
    },
  },
})
</script>

<style lang="scss" scoped>
form {
  text-align: center;
}
input {
  font-family: Rubik;
  padding: 5px 10px;
  border-radius: 7px;
  font-size: 18px;
  border: 3px solid gray;
  display: block;
  margin: 5px auto;
  width: 330px;
}
button {
  font-family: Rubik;
  background-color: var(--main);
  border-radius: 5px;
  border: none !important;
  outline: none !important;
  padding: 8px 12px;
  margin: 5px;
  font-size: 18px;
  color: #e3e3e3;
  cursor: pointer;
  transition: 0.2s all;
  &:hover {
    filter: brightness(1.1);
  }
}
.header {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  margin: 15px;
}
.input {
  display: flex;
  justify-content: center;
  align-items: center;
  input {
    margin: 5px;
  }
}
.delete,
.add {
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  background-color: var(--main);
  border-radius: 50%;
  cursor: pointer;
  color: #e3e3e3;
  transition: 0.2s all;
  &:hover {
    filter: brightness(1.1);
  }
}
.add {
  margin: 0 10px;
  background-color: rgb(221, 170, 0);
  font-size: 17px;
  transform: rotate(45deg);
}
input[type='checkbox'] {
  display: inline-block;
  margin-bottom: 10px;
  padding: 0;
  width: 40px;
}
</style>
