import { Progress } from 'antd'

export default function Stat({ text, percent }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Progress percent={ percent } type="circle" />
      <h1>{ text }</h1>
    </div>
  )
}
