import { useState } from 'react'
import { Layout, Menu, Icon } from 'antd'
import { FontAwesomeIcon  } from '@fortawesome/react-fontawesome'
import { 
  faHome, faUser, faGamepad, faDumbbell, faGraduationCap, faSignOutAlt
} from '@fortawesome/free-solid-svg-icons'
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
          <Menu.Item key="1" icon={ <FontAwesomeIcon icon={ faUser } /> }>
            <Link href="/profile">Profile</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={ <FontAwesomeIcon icon={ faHome } /> }>
            <Link href="/">Dashboard</Link>
          </Menu.Item>
          <Menu.Item key="3" icon={ <FontAwesomeIcon icon={ faGamepad } /> }>
            <Link href="/story">Story</Link>
          </Menu.Item>
          <Menu.Item key="4" icon={ <FontAwesomeIcon icon={ faDumbbell } /> }>
            <Link href="/exercise">Exercise</Link>
          </Menu.Item>
          <Menu.Item key="5" icon={ <FontAwesomeIcon icon={ faGraduationCap } /> }>
            <Link href="/learn">Learn</Link>
          </Menu.Item>
          <Menu.Item key="6" icon={ <FontAwesomeIcon icon={ faSignOutAlt } /> }>
            Logout
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        { children }
      </Layout>
    </Layout>
  )
}
