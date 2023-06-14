const api = "https://reactnd-books-api.udacity.com";

class BooksApi {
  constructor() {
    this.token = localStorage.token;
    if (!this.token)
      this.token = localStorage.token = Math.random().toString(36).substr(-8);
    this.headers = {
      Accept: "application/json",
      Authorization: this.token,
    };
  }

  async get(bookId) {
    const res = await fetch(`${api}/books/${bookId}`, {
      headers: this.headers,
    });
    const data = await res.json();
    return data.book;
  }

  async getAll() {
    const res = await fetch(`${api}/books`, { headers: this.headers });
    const data = await res.json();
    return data.books;
  }

  async update(book, shelf) {
    const res = await fetch(`${api}/books/${book.id}`, {
      method: "PUT",
      headers: {
        ...this.headers,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ shelf }),
    });
    return await res.json();
  }

  async search(query, maxResults) {
    const res = await fetch(`${api}/search`, {
      method: "POST",
      headers: {
        ...this.headers,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query, maxResults }),
    });
    const data = await res.json();
    return data.books;
  }
}

export default BooksApi;
