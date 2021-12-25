import { useRouter } from 'next/router'
import MainContentBreadcrumb from '../../components/MainContentBreadcrumb'
import { Card, Radio, Button, Form } from 'antd'
import { useState, useRef } from 'react'

export async function getStaticProps({ params }) {
  const res = await fetch(`http://localhost:3000/api/exercise/${params.id}`)
  const content = await res.json()
  return {
    props: { content }
  }
}

export async function getStaticPaths() {
  return {
    paths: [], //indicates that no page needs be created at build time
    fallback: 'blocking' //indicates the type of fallback
  }
}

export default function Question({ content }) {
  const [answered, setAnswered] = useState(false);
  const [nCorrect, setNCorrect] = useState(0);
  const bottomRef = useRef(null);

  const checkAnswers = (values) => {
    let count = content.questions.length;
    for (let i = 1; i <= content.questions.length; i++) {
      if (values[i] !== content.questions[i-1].correct) {
        count--;
      }
    }
    setAnswered(true);
    setNCorrect(count);
    bottomRef.current.scrollIntoView({
      behavior: 'smooth'
    })
  }

  return (
      <MainContentBreadcrumb title="Exercise" contentTitle={ content.title }>
        <Form onFinish={ checkAnswers }>
          {content.questions.map((i) => (
            <Card title={ i.title } key={ i.id } style={{ marginBottom: '10px' }}>
              <Form.Item 
                name={ i.id } 
                rules={[
                  {
                    required: true,
                    message: 'Please answer this question'
                  }
                ]}
              >
                <Radio.Group style={{ display: 'flex', flexDirection: 'column' }}>
                  { i.answers.map((j) => (
                    <Radio.Button key={ j.id } value={ j.id }>
                      { j.id }.  { j.text }
                    </Radio.Button>
                  )) }
                </Radio.Group>
              </Form.Item>
            </Card>
          ))}
          <Form.Item>
            <Button type="primary" htmlType="submit">Submit</Button>
          </Form.Item>
        </Form>
        <div ref={ bottomRef }>
        { answered && (
          <Card title="Your Score:">
            <h1>{ nCorrect }</h1>
          </Card>
        ) }
        </div>
      </MainContentBreadcrumb>
  )
}
