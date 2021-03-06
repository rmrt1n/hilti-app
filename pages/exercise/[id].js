import { useRouter } from 'next/router'
import MainContentBreadcrumb from '../../components/MainContentBreadcrumb'
import { Card, Radio, Button, Form } from 'antd'
import { useState, useRef } from 'react'
import Router from 'next/router'

export async function getServerSideProps({ params }) {
  const res = await fetch(`${process.env.URL}/api/exercise/${params.id}`)
  const content = await res.json()
  return {
    props: { content }
  }
}

export default function Exercise({ content }) {
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
            <Button type="primary" onClick={ () => Router.push('#') }>Play Again?</Button>
          </Card>
        ) }
        </div>
      </MainContentBreadcrumb>
  )
}
