import request from '@/utils/request'

export function login(type, data) {
  return request({
    url: `/${type}/login`,
    method: 'post',
    data
  })
}

export function getInfo(type) {
  return request({
    url: `/${type}/info`,
    method: 'get'
  })
}

// export function logout() {
//   return request({
//     url: '/vue-admin-template/user/logout',
//     method: 'post'
//   })
// }
