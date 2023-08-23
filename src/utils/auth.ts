import Cookies from 'js-cookie'

const TokenKey = 'EDT-Token'
const ProjectId = 'EDT-ProjectId'
const UserInfoKey = 'EDT-Users'
const UserLocation = 'EDT-Location'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token: string) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function getUserInfo() {
  return JSON.parse(localStorage.getItem(UserInfoKey) || '')
}

export function setUserInfo(obj: any) {
  return localStorage.setItem(UserInfoKey, JSON.stringify(obj))
}

export function removeUserInfo() {
  return localStorage.removeItem(UserInfoKey)
}

export function getLocation() {
  if (localStorage.getItem(UserLocation)) {
    return JSON.parse(localStorage.getItem(UserLocation) || '')
  }
  return {}
}

export function setLocation(obj: any) {
  return localStorage.setItem(UserLocation, JSON.stringify(obj))
}

export function removeLocation() {
  return localStorage.removeItem(UserLocation)
}

export function getProjectInfo() {
  if (localStorage.getItem(ProjectId)) {
    return JSON.parse(localStorage.getItem(ProjectId) || '')
  }
  return {}
}

export function setProjectInfo(obj: any) {
  return localStorage.setItem(ProjectId, JSON.stringify(obj))
}

export function removeProjectInfo() {
  return localStorage.removeItem(ProjectId)
}
