import React  from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const UserView = () => {
  const blogs = useSelector(({ blogs }) => blogs)

  const usersId = blogs.map(b => b.user.id).filter((user, idx, arr) => arr.indexOf(user) === idx)
  const usersBlog = usersId.map(user => blogs.filter(blog => blog.user.id === user))

  return (
    <section>
      <h3>Blogs by users</h3>
      <ul className='usersList'>
        {[...usersBlog].sort((a, b) => b.length - a.length).map(uBlogs =>
          <li key={uBlogs[0].user.id}>
            <Link to={`/users/${uBlogs[0].user.id}`}>{uBlogs[0].user.name}</Link> — {uBlogs.length}
          </li>
        )}
      </ul>
    </section>
  )
}

export default UserView