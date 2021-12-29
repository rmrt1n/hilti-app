import MainContent from '../components/MainContent'
import { Avatar, Button, Input, Card, Row, Col, Progress } from 'antd'
import UserOutlined from '@ant-design/icons/UserOutlined'
import Stat from '../components/Stat'
import { useState } from 'react'

export default function Profile() {
  const [details, setDetails] = useState({ name: '', email: '' });

  const onChange = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value })
  }

  return (
    <>
      <MainContent title="Profile">
        <Card title="Profile">
          <Row gutter={ 24 }>
            <Col>
              <Avatar
                icon={ <UserOutlined /> }
                size={{ xs: 32, sm: 40, md: 64, lg: 100, xl: 120, xxl: 140  }}
              />
            </Col>
            <Col>
              <label htmlFor="name"><h3>Name</h3></label>
              <Input 
                id="name"
                value={ details.name } 
                onChange={ onChange }/>
              <label htmlFor="email"><h3>Email</h3></label>
              <Input 
                id="email"
                value={ details.email } 
                onChange={ onChange }/>
            </Col>
          </Row>
        </Card>
      </MainContent>

      <MainContent>
        <Card title="Statistics">
          <Row gutter={ 24 }>
            <Col span={ 8 }>
              <Stat percent={ 80 } text="Security"/>
            </Col>
            <Col span={ 8 }>
              <Stat percent={ 100 } text="Phishing"/>
            </Col>
            <Col span={ 8 }>
              <Stat percent={ 60 } text="Malware"/>
            </Col>
          </Row>
        </Card>
      </MainContent>
    </>
  )
}
