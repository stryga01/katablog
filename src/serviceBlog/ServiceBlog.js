class ServiceBlog {
  constructor() {
    this.baseUrl = 'https://blog.kata.academy/api/'
  }
  getResource = async (url, init) => {
    const res = await fetch(`${this.baseUrl}${url}`, init)
    if (!res.ok) {
      throw new Error('could not fetch')
    }
    return res.json()
  }
  getArticles = async (page, token) => {
    let offset = 0
    for (let i = 1; i < page; i++) {
      offset += 20
    }
    return await this.getResource(`articles?offset=${offset}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`,
      },
    })
  }
  getArticle = async (slug, token) => {
    return await this.getResource(`articles/${slug}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`,
      },
    })
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

  setFavorite = async (slug, token, method) => {
    const res = await fetch(`${this.baseUrl}articles/${slug}/favorite`, {
      method: method,
      headers: { 'Content-Type': 'application/json', Authorization: `Token ${token}` },
    })
    if (!res.ok) {
      throw await res.json()
    }
    return res.json()
  }

  createArticle = async (data, method, token, slug) => {
    const path = slug ? `articles/${slug}` : 'articles'
    const res = await fetch(`${this.baseUrl}${path}`, {
      method: method,
      headers: { 'Content-Type': 'application/json', Authorization: `Token ${token}` },
      body: JSON.stringify({ article: { ...data } }),
    })
    if (!res.ok) {
      throw await res.json()
    }
    return res.json()
  }
  deleteArticle = async (slug, token) => {
    const res = await fetch(`${this.baseUrl}articles/${slug}`, {
      method: 'DELETE',
      headers: { Authorization: `Token ${token}` },
    })
    if (!res.ok) {
      throw await res
    }
    return res
  }
}

export default ServiceBlog
