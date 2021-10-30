import axios, { AxiosInstance } from 'axios'
import _ from 'lodash'

export class Api {

    static fromRandomUser(path: string): AxiosInstance {
      const options = {
        baseURL: 'https://randomuser.me/api/' + path,
        headers: {
          'Content-Type': 'application/json'
        }
      }
      return axios.create(options)
    }
  
    static getUsers(params: any = undefined): Promise<any> {
      const qs = !_.isNil(params) ? buildQueryParams(params) : ''
      return Api.fromRandomUser(`${qs}`).get('')
    }
}

function buildQueryParams(params: any) {
    const ret = [];
    for (let d in params)
        ret.push(encodeURIComponent(d) + '=' + encodeURIComponent(params[d]));
    return '?' + ret.join('&');
}
