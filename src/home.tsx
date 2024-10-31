import { useNavigate } from 'react-router-dom'

function Home() {
  const navigate = useNavigate()

  const handleNavigate = () => {
    navigate('/app')
  }

  return (
    <div>
      <button onClick={handleNavigate}>Navigate to a different page</button>
    </div>
  )
}

export default Home
