import axios, { AxiosResponse } from 'axios'
import { Endpoints } from '@octokit/types'
import { Params } from '@/data/types'

const getToken = (store: any): string => {
  return store.getters.getToken || process.env.VUE_APP_TOKEN
}

export const fetchRepositories = async (
  params: Params,
  store: any
): Promise<Endpoints['GET /users/{username}/repos']['response']['data']> => {
  const token = getToken(store)
  const allOrgs = [params.username, ...(params.organizations || [])]
  const repositories: Endpoints['GET /users/{username}/repos']['response']['data'] =
    []

  store.commit('setAllRequests', allOrgs.length)

  await Promise.all(
    allOrgs.map(async (org) => {
      const url =
        org === params.username
          ? `https://api.github.com/users/${org}/repos?per_page=300`
          : `https://api.github.com/orgs/${org}/repos?per_page=300`

      try {
        const res: AxiosResponse<
          Endpoints['GET /users/{username}/repos']['response']['data']
        > = await axios.get(url, {
          headers: { Authorization: `token ${token}` },
        })

        // Filtracja forków odbywa się już w serwisie
        repositories.push(...res.data.filter((repo) => !repo.fork))
      } catch (e) {
        console.error(`Błąd pobierania repozytoriów dla ${org}`, e)
      } finally {
        store.commit('pushRequest')
      }
    })
  )

  return repositories
}

export const fetchLanguages = async (
  repositories: Endpoints['GET /users/{username}/repos']['response']['data'],
  params: Params,
  store: any
) => {
  const token = getToken(store)
  const langs: { [key: string]: number } = {}
  const repolangs: { [key: string]: { [key: string]: number } } = {}
  const allRepos = repositories
    .map((repo) => repo.full_name)
    .concat(params.repositories || [])
  const done: string[] = []

  store.commit('setAllRequests', allRepos.length)

  await Promise.all(
    allRepos.map(async (repo) => {
      const url = `https://api.github.com/repos/${repo}/languages`
      try {
        const response: AxiosResponse<
          Endpoints['GET /repos/{owner}/{repo}/languages']['response']['data']
        > = await axios.get(url, {
          headers: { Authorization: `token ${token}` },
        })

        if (!done.includes(url)) {
          for (const lang of Object.keys(response.data)) {
            langs[lang] = (langs[lang] || 0) + response.data[lang]
            repolangs[repo] = response.data
          }
          done.push(url)
        }
      } catch (e) {
        console.error(`Błąd pobierania języków dla ${repo}`, e)
      } finally {
        store.commit('pushRequest')
      }
    })
  )

  return { langs, repolangs }
}
