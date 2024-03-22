import { Link } from 'react-router-dom';
const NotFoundPage = () => {
  return (
    <div>
      <h2>404 - Сторінку не знайдено</h2>
      <p>Перейти на <Link to="/">Home</Link></p>
    </div>
  )
}

export default NotFoundPage
