import { Layout, Breadcrumb } from 'antd'

const { Header, Content } = Layout

export default function MainContent({ title, children, contentTitle }) {
  return (
    <>
      { title && (
        <Header style={{ background: '#fff' }}>
          <h1>{ title }</h1>
        </Header>
      ) }
      <Content style={{ padding: '15px 30px' }}>
        <Breadcrumb style={{ paddingBottom: '15px' }}>
          <Breadcrumb.Item href={ `/${title.toLowerCase()}` }>{ title }</Breadcrumb.Item>
          <Breadcrumb.Item>{ contentTitle }</Breadcrumb.Item>
        </Breadcrumb>
        <div style={{ background: '#fff', minHeight: '280px', padding: '20px', height: '100%' }}>
          { children }
        </div>
      </Content>
    </>
  )
}
