import { login, getInfo } from '@/api/user'
import {
  getToken,
  setToken,
  removeToken,
  getType,
  setType,
  removeType
} from '@/utils/auth'
import { resetRouter } from '@/router'
const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    type: getType(),
    img: '',
    dis_name: '',
    power: ''
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_TYPE: (state, type) => {
    state.type = type
  },
  SET_HEAD_IMG: (state, img) => {
    state.img = img
  },
  SET_DIS_NAME: (state, dis_name) => {
    state.dis_name = dis_name
  },
  SET_POWER: (state, power) => {
    state.power = power
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password, type } = userInfo
    return new Promise((resolve, reject) => {
      login(type, { username, password }).then(response => {
        const { data } = response
        commit('SET_TOKEN', data.token)
        commit('SET_TYPE', type)
        setToken(data.token)
        setType(type)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.type).then(response => {
        const { data } = response
        if (!data) {
          return reject('登录信息失效，请再次登录')
        }
        const {
          name,
          img,
          dis_name,
          power
        } = data
        commit('SET_NAME', name)
        commit('SET_HEAD_IMG', img)
        commit('SET_DIS_NAME', dis_name)
        commit('SET_POWER', power)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      // logout(state.token).then(() => {
      removeToken() // must remove  token  first
      removeType()
      resetRouter()
      commit('RESET_STATE')
      resolve()
      // }).catch(error => {
      // reject(error)
      // })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      removeType()
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

