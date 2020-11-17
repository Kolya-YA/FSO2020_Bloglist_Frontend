import styled from 'styled-components'

export const BlogLI = styled.li`
&:not(:last-child) {
  margin-bottom: .4em
}
padding: .5em 1em;
background-color: #eee;

.blog-list-item__top {
  display: flex;
  justify-content: space-between;
}
`