import { NavLink } from 'react-router-dom'
import styled from 'styled-components'

export const TopNavBar = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 10px;
  background-color: #ddd;
`

export const TopNavigation = styled.nav`
  ul {
    display: flex;
    margin: 0;
    padding: 0;
    list-style: none;
    li {
      &:not(:last-child) {
        margin-right: 10px;
      }
    }
  }
`
export const StyledNavLink = styled(NavLink)`
  background-color: #ccc;
  padding: 10px 15px;
  color: inherit;
  text-decoration: none;
  &.active {
    background-color: #eee;
  }
`