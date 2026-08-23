import { http, HttpResponse } from 'msw'

export const handlers = [
  // Specific paths first: MSW matches handlers in order, so a
  // parameterized route declared above this one would swallow it
  http.get('https://api.example.com/articles/missing', () => {
    return new HttpResponse(null, { status: 404 })
  }),

  http.get('https://api.example.com/articles/:id', ({ params }) => {
    return HttpResponse.json({
      id: params.id,
      title: 'Healthy summer melon-carrot soup',
      body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      author: 'John Doe',
    })
  }),
]
