import MainContent from '../components/MainContent'
import { Carousel, Card, Row, Col } from 'antd'
import Image from 'next/image'
import Link from 'next/link'

export async function getServerSideProps() {
  const res1 = await fetch('http://localhost:3000/api/story')
  const story = await res1.json()
  const res2 = await fetch('http://localhost:3000/api/exercise')
  const exercise = await res2.json()

  return {
    props: {
      story,
      exercise
    }
  }
}

const carouselStyle = {
  position: 'relative',
  minHeight: '250px',
  height: '100%',
  // width: '100%',
}

export default function Home({ story, exercise }) {
  return (
    <>
    <MainContent title="Dashboard">
      <Card title="Story">
        { story.map((i) => (
          <Link key={ i.id } href={ `/story/${i.id}` }>
          <Row gutter={ 24 }>
            <Col span={ 10 }>
              <div style={ carouselStyle }>
                <Image
                  src={ i.thumbnail.path }
                  alt={ i.thumbnail.alt }
                  layout="fill"
                />
              </div>
            </Col>
            <Col>
              <h1>{ i.title }</h1>
              <p>{ i.desc }</p>
            </Col>
          </Row>
          </Link> 
        )) }
      </Card>
    </MainContent>

      <MainContent>
        <Card title="exercise">
          { exercise.map((i) => (
            <Link key={ i.id } href={ `/exercise/${i.id}` }>
              <Card title={ i.title } key={ i.id } style={{ marginBottom: '10px', cursor: 'pointer' }} />
            </Link>
          )) }
        </Card>
      </MainContent>
      </>
  )
}
