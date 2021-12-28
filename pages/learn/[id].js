import { useRouter } from 'next/router'
import MainContentBreadcrumb from '../../components/MainContentBreadcrumb'
import { useState, useEffect } from 'react'
import { Layout, Menu, Breadcrumb } from 'antd'

export async function getServerSideProps({ params }) {
  const res = await fetch(`http://localhost:3000/api/learn/${params.id}`);
  const content = await res.json()
  console.log('getstaci', content)
  return {
    props: { content }
  }
}

const { Header, Sider, Content } = Layout

export default function Learn({ content }) {
  const [shownContent, setShownContent] = useState(getFirstContent(content))

  function getFirstContent(obj) {
    if (obj.type === 'subchapter') {
      return obj.content;
    }
    if (obj.nchild === 0) return obj.content
    for (const i of obj.children) {
      return getFirstContent(i);
    }
  }

  return (
    <MainContentBreadcrumb title="Learn" contentTitle={ content.title }>
      <Layout style={{ height: '100%' }}>
        <Sider theme="light">
          <Menu 
            defaultSelectedKeys={ [content.children[0].nchild === 0 ? '0' : '0.0'] }
            defaultOpenKeys={ ['0'] }
            mode="inline">
            { content.children.map((i, j) => {
              return i.nchild > 0 
                ? (
                <>
                  <Menu.SubMenu key={ j } title={ i.title }>
                    { i.children.map((k, l) => (
                      <>
                        <Menu.Item 
                          key={ `${j}.${l}` } 
                          title={ k.title }
                          onClick={ () => setShownContent(k.content) }
                        >
                          { k.title }
                        </Menu.Item>
                      </>
                    )) }
                  </Menu.SubMenu>
                </>
                )
                : (
                <>
                  <Menu.Item 
                    key={ j } 
                    title={ i.title }
                    onClick={ () => setShownContent(i.content) }
                  >
                    { i.title }
                  </Menu.Item>
                </>
                )
            }) }
          </Menu>
        </Sider>
        <Content style={{ height: '100%', padding: '5px' }}>
          { shownContent.split('\n').map((i, j) => (
            <p key={ j }>{ i }</p>
          )) }
        </Content>
      </Layout>
    </MainContentBreadcrumb>
  )
}
