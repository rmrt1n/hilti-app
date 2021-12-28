import MainContentBreadcrumb from '../../components/MainContentBreadcrumb'
import { Button, Form } from 'antd'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import styles from '../../styles/Story.module.css'
import Router from 'next/router'

export async function getServerSideProps({ params }) {
  const res = await fetch(`http://localhost:3000/api/story/${params.id}`)
  const story = await res.json()
  return {
    props: { story }
  }
}

const choiceStyle = {
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-end',
  alignItems: 'center',
  zIndex: 999,
  paddingBottom: '20px',
}

export default function Story({ story }) {

  const [curSlide, setCurSlide] = useState(story.scenes[0])
  const [curSlideImg, setCurSlideImg] = useState(story.thumbnail)
  const [curSceneId, setCurSceneId] = useState(-1)
  const [hasPrevious, setHasPrevious] = useState(false)
  const [hasNext, setHasNext] = useState(true)
  const [status, setStatus] = useState('pre') // pre | game | post
  const [isQuestion, setIsQuestion] = useState(false)
  const [isWrong, setIsWrong] = useState(false)

  const startGame = () => {
    setStatus('game')
    setCurSceneId(0)
    setCurSlideImg(curSlide.img)
  }

  const nextSlide = () => {
    setHasPrevious(true)
    const next = curSceneId + 1
    if (next === story.scenes.length) {
      setHasNext(false)
      setStatus('post')
      setCurSlideImg(story.winImg)
      setIsQuestion(false)
      return
    }
    setCurSceneId(next)
    setCurSlide(story.scenes[next])
    setCurSlideImg(story.scenes[next].img)
    setIsQuestion(story.scenes[next].type === 'question')
    setHasNext(true)
    setHasPrevious(true)
    if (story.scenes[next].type === 'question') {
      setHasNext(false)
      setHasPrevious(false)
    }
  }

  const prevSlide = () => {
    setHasNext(true)
    const prev = curSceneId - 1
    if (prev === 0) setHasPrevious(false)
    setCurSceneId(prev)
    setCurSlide(story.scenes[prev])
    setCurSlideImg(story.scenes[prev].img)
    setIsQuestion(story.scenes[prev].type === 'question')
    if (story.scenes[prev].type === 'question') {
      setHasNext(false)
      setHasPrevious(false)
    }
  }

  const answer = (choice) => {
    if (choice !== curSlide.answer) {
      setStatus('post')
      setCurSlideImg(curSlide.wrongImg)
      setIsWrong(true)
      setIsQuestion(false)
      return
    }
    nextSlide()
  }

  const newGame = () => {
    Router.reload()
  }

  return (
    <MainContentBreadcrumb title="Story" contentTitle={ story.title }>
      <div id={ styles.storyContainer }>
      <h1>{ story.title }</h1>
      <div id={ styles.slide }>
        <Image 
          src={ curSlideImg.path }
          alt={ curSlideImg.alt }
          layout="fill"
          objectFit="contain"
        />
        { isQuestion && 
          <div style={ choiceStyle }>
            <p>{ curSlide.question }</p>
            <div>
              <Button onClick={ () => answer(1) }>
                { curSlide.choices[0].text }
              </Button>
              <Button onClick={ () => answer(2) }>
                { curSlide.choices[1].text }
              </Button>
            </div>
          </div>
        }
      </div>
      <p>
        { status === 'pre'
            ? story.desc
            : status === 'game'
              ? curSlide.text
              : isWrong 
                ? curSlide.wrongText
                : story.winText
        }
      </p>
      { status === 'pre' && 
      <Button onClick={ startGame }>Start</Button>
      }
      { status === 'game' &&
        <div style={{ display: 'flex' }}>
          { hasPrevious &&
          <Button onClick={ prevSlide }>Back</Button>
          }
          { hasNext &&
          <Button onClick={ nextSlide }>Next</Button>
          }
        </div>
      }
      { status === 'post' &&
      <Button onClick={ newGame }>Play Again</Button>
      }
      </div>
    </MainContentBreadcrumb>
  )
}
