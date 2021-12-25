import Link from 'next/link'
import MainContent from '../../components/MainContent'
import { Card }from 'antd'

export async function getStaticProps() {
  const res = await fetch('http://localhost:3000/api/exercise')
  const exercise = await res.json()
  return {
    props: {
      exercise
    }
  }
}

export default function Exercise({ exercise }) {
  return (
    <MainContent title="Learn">
      { exercise.map((i) => (
        <Link key={ i.id } href={ `/exercise/${i.id}` }>
          <Card title={ i.title } key={ i.id } style={{ marginBottom: '10px', cursor: 'pointer' }}>
            { i.title }
          </Card>
        </Link>
      )) }
    </MainContent>

  )
}
