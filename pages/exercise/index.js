import Link from 'next/link'
import MainContent from '../../components/MainContent'
import { Card }from 'antd'

export async function getServerSideProps() {
  const res = await fetch(process.env.URL + '/api/exercise')
  const exercise = await res.json()
  return {
    props: {
      exercise
    }
  }
}

export default function Exercises({ exercise }) {
  return (
    <MainContent title="Learn">
      { exercise.map((i) => (
        <Link key={ i.id } href={ `/exercise/${i.id}` } passHref>
          <Card title={ i.title } key={ i.id } style={{ marginBottom: '10px', cursor: 'pointer' }}>
            { i.title }
          </Card>
        </Link>
      )) }
    </MainContent>

  )
}
