import AsyncStorage from '@react-native-async-storage/async-storage';

class AuthStorage {
  constructor(namespace = 'auth') {
    this.namespace = namespace;
  }

  async getAccessToken() {
      return await AsyncStorage.getItem(`${this.namespace}:token`)
  }

  async setAccessToken(accessToken) {
      console.log('Set Access token')
      await AsyncStorage.setItem(`${this.namespace}:token`, accessToken)
  }

  async removeAccessToken() {
      await AsyncStorage.removeItem(`${this.namespace}:token`)
  }
}

export default AuthStorage;