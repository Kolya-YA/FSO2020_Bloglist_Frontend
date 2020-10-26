import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import NewBlog from './NewBlog'

test('Adding new blog', () => {
  const mockHandler = jest.fn()

  const component = render(
    <NewBlog createNewBlog={mockHandler} />
  )
  const btnAddNewBlog = component.getByText('Add new blog')
  fireEvent.click(btnAddNewBlog)

  const inputTitle = component.getByLabelText('Title:')
  expect(inputTitle.value).toBe('')
  fireEvent.change(inputTitle, { target: { value: 'testTitle' } })
  expect(inputTitle.value).toBe('testTitle')

  const inputAuthor = component.getByLabelText('Author:')
  expect(inputAuthor.value).toBe('')
  fireEvent.change(inputAuthor, { target: { value: 'testAuthor' } })
  expect(inputAuthor.value).toBe('testAuthor')

  const inputUrl = component.getByLabelText('URL:')
  expect(inputUrl.value).toBe('')
  fireEvent.change(inputUrl, { target: { value: 'testURL' } })
  expect(inputUrl.value).toBe('testURL')

  const formCreateNewBlog = component.container.querySelector('form')
  fireEvent.submit(formCreateNewBlog)
  expect(mockHandler.mock.calls[0][0]).toEqual({ title: 'testTitle', author: 'testAuthor', url: 'testURL' })
})