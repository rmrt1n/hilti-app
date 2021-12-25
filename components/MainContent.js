import { Layout } from 'antd'

const { Header, Content } = Layout

export default function MainContent({ title, children }) {
  return (
    <>
      { title && (
        <Header style={{ background: '#fff' }}>
          <h1>{ title }</h1>
        </Header>
      ) }
      <Content style={{ padding: '30px' }}>
        <div style={{ background: '#fff', minHeight: '280px', padding: '20px', height: '100%' }}>
          { children }
        </div>
      </Content>
    </>
  )
}
