import MainContent from '../../components/MainContent'
import { Layout, Menu, Card } from 'antd'
import { useState } from 'react'
import Link from 'next/link'

const { Sider, Header } = Layout

export async function getServerSideProps() {
  const res = await fetch('http://localhost:3000/api/learn');
  const content = await res.json();
  return {
    props: {
      content
    }
  }
}

export default function Learns({ content }) {
  return (
    <MainContent title="Learn">
      { content.map((i) => (
        <Link key={ i.id } href={ `/learn/${i.id}` } passHref>
          <Card title={ i.title } key={ i.id } style={{ marginBottom: '10px', cursor: 'pointer' }}>
            { i.desc }
          </Card>
        </Link>
      )) }
    </MainContent>
  )
}
