class ServiceBlog {
  constructor() {
    this.baseUrl = 'https://blog.kata.academy/api/'
  }
  getResource = async (url) => {
    const res = await fetch(`${this.baseUrl}${url}`)
    if (!res.ok) {
      throw new Error('could not fetch')
    }
    return res.json()
  }
  getArticles = async (page) => {
    let offset = 0
    for (let i = 1; i < page; i++) {
      offset += 20
    }
    return await this.getResource(`articles?offset=${offset}`)
  }
  getArticle = async (slug) => {
    return await this.getResource(`articles/${slug}`)
  }

  getCurrentUser = async (token) => {
    const res = await fetch(`${this.baseUrl}user`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`,
      },
    })
    return res.json()
  }

  registerUser = async ({ username, email, password }) => {
    const res = await fetch(`${this.baseUrl}users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        user: {
          username: username,
          email: email,
          password: password,
        },
      }),
    })
    if (!res.ok) {
      throw await res.json()
    }
    return res.json()
  }

  updateCurrentUser = async (data, token) => {
    const { username, email, password, image } = data
    const res = await fetch(`${this.baseUrl}user`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify({
        user: {
          email: email,
          password: password,
          username: username,
          bio: '',
          image: image,
        },
      }),
    })
    if (!res.ok) {
      throw await res.json()
    }
    return res.json()
  }

  authorizationUser = async ({ email, password }) => {
    const res = await fetch(`${this.baseUrl}users/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        user: {
          email: email,
          password: password,
        },
      }),
    })
    if (!res.ok) {
      throw await res.json()
    }
    return res.json()
  }
}
export default ServiceBlog
