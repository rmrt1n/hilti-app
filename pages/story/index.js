import MainContent from '../../components/MainContent'
import Link from 'next/link'
import { Card }from 'antd'

export async function getServerSideProps() {
  const res = await fetch(process.env.URL + '/api/story')
  const story = await res.json()
  return {
    props: {
      story
    }
  }
}

export default function Stories({ story }) {
  return (
    <MainContent title="Story">
      { story.map((i) => (
        <Link key={ i.id } href={ `/story/${i.id}` } passHref>
          <Card title={ i.title } key={ i.id } style={{ marginBottom: '10px', cursor: 'pointer' }}>
            { i.title }
          </Card>
        </Link>
      )) }
    </MainContent>

  )
}
