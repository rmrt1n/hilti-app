import { useState } from 'react'
import { Layout, Menu } from 'antd'
import UserOutlined from '@ant-design/icons/UserOutlined'
import HomeOutlined from '@ant-design/icons/HomeOutlined'
import LogoutOutlined from '@ant-design/icons/LogoutOutlined'
import BookOutlined from '@ant-design/icons/BookOutlined'
import Link from 'next/link'

const { Header, Content, Footer, Sider } = Layout;

export default function SideNav({ children }) {
  const [collapsed, setCollapsed] = useState(true);

  const onCollapse = (collapsed) => setCollapsed(collapsed);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider 
        theme="light"
        collapsible 
        collapsed={ collapsed } 
        onCollapse={ onCollapse }
      >
        <Menu defaultSelectedKey={ ['2'] } mode="inline">
          <Menu.Item key="1" icon={ <UserOutlined /> }>
            <Link href="/profile">Profile</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={ <HomeOutlined /> }>
            <Link href="/">Dashboard</Link>
          </Menu.Item>
          <Menu.Item key="3" icon={ <HomeOutlined /> }>
            <Link href="/story">Story</Link>
          </Menu.Item>
          <Menu.Item key="4" icon={ <HomeOutlined /> }>
            <Link href="/exercise">Exercise</Link>
          </Menu.Item>
          <Menu.Item key="5" icon={ <BookOutlined /> }>
            <Link href="/learn">Learn</Link>
          </Menu.Item>
          <Menu.Item key="6" icon={ <LogoutOutlined /> }>
            Logout
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        { children }
        <Footer />
      </Layout>
    </Layout>
  )
}
