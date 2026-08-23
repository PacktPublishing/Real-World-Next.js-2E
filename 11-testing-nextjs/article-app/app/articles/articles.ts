// Repository scaffolding, not printed in the chapter.
//
// The list the /articles route renders. The first entry's id and title are
// what the e2e navigation test clicks through, and its slug is the one the
// ArticleCard unit test asserts against.
export const articles = [
  {
    id: 'u12w3o0d',
    title: 'Healthy summer melon-carrot soup',
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi iaculis, felis quis sagittis molestie, mi sem lobortis dui, a sollicitudin nibh erat id ex.',
    author: { id: '93ksj19s', name: 'John Doe' },
  },
  {
    id: 'k82hd7as',
    title: 'Understanding React Server Components',
    body: 'Server Components run only on the server, and their JavaScript never reaches the browser.',
    author: { id: '11jd93kw', name: 'Jane Roe' },
  },
]
