import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

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

test('Render Blog', () => {
  const component = render(
    <Blog blog={blog} user={user} />
  )
  // component.debug()

  expect(component.container).toHaveTextContent('Test Title')
  expect(component.container).not.toHaveTextContent('Test URL')
  expect(component.container).not.toHaveTextContent('Test author')
  // const hidenDiv = component.container.querySelector('div:last-child')
  // expect(hidenDiv).toHaveStyle('display: none')
  
})

test('Toggle blog short/long view', () => {
  const component = render(
    <Blog blog={blog} user={user} />
  )

  expect(component.container).toHaveTextContent('Test Title')
  expect(component.container).not.toHaveTextContent('Test URL')
  expect(component.container).not.toHaveTextContent('100')
  const buttonMore = component.getByText('Show more')
  fireEvent.click(buttonMore)
  expect(component.container).toHaveTextContent('Test URL')
  expect(component.container).toHaveTextContent('100')
  const buttonLess = component.getByText('Show less')
  fireEvent.click(buttonLess)
  expect(component.container).not.toHaveTextContent('Test URL')
  expect(component.container).not.toHaveTextContent('100')
  
  
})