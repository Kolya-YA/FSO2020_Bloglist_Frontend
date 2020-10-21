import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from './Blog'

test('Render Blog', () => {
  const blog = {
    title: 'Test Title',
    url: 'Test URL',
    author: 'Test author',
    likes: 100,
    user: {
      name: 'qwerty'
    }
  }

  const user = { name: 'qwerty' }

  const component = render(
    <Blog blog={blog} user={user} />
  )

  // component.debug()

  expect(component.container).toHaveTextContent('Test Title')
  expect(component.container).toHaveTextContent('Test URL')
  expect(component.container).toHaveTextContent('Test author')
  const hidenDiv = component.container.querySelector('div:last-child')
  expect(hidenDiv).toHaveStyle('display: none')

})