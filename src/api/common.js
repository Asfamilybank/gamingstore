const request = require('@/utils/request')

export function sendEmailCode(email) {
  return request({
    url: '/sendEmailCode',
    method: 'post',
    data: {
      email
    }
  })
}
