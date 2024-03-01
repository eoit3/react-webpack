import React, { version, useState, useRef, KeyboardEvent, ChangeEvent } from 'react'
import FixTabPanel from '@stateless/FixTabPanel'
import TypedText from '@stateless/TypedText'
import ReMarkdown from '@stateless/ReMarkdown'
import { Input, Flex, Button } from 'antd'
import { SendOutlined } from '@ant-design/icons'

// import { oneApiChat, prettyObject } from '@utils/aidFn'

const Home = () => {
  const [aiText, setAiText] = useState('')
  const aiTextRef = useRef(null)
  // const [loading, setLoading] = useState(false)
  const [isStream, setIsStream] = useState(false)
  const [dateTime, setDateTime] = useState('')
  const curController = useRef<AbortController | null>(null)

  const [apiKey, setApiKey] = useState(() => '')
  const [chatText, setChatText] = useState('')
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const changeApiKey = (event: ChangeEvent<HTMLInputElement>) => {
    setApiKey(event.target.value)
  }

  const changeChatText = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setChatText(event.target.value)
  }

  const onInputKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.metaKey && event.key === 'Enter') {
      onSubmit()
      event.preventDefault()
    }
  }

  const onSubmit = () => {
    if (chatText.trim() === '') {
      return
    }
    const controller = new AbortController()
    curController.current = controller
  }

  const onStop = () => {
    curController?.current?.abort()
    // setLoading(false)
    setIsStream(false)
  }

  return (
    <FixTabPanel>
      <h2>
        <TypedText>Cool! Hi, React & Ant Design!</TypedText>
      </h2>
      <h2>React version: {version}</h2>

      <section style={{ width: 600, margin: '30px 0' }}>
        <Input
          defaultValue={apiKey}
          placeholder='api key'
          onChange={changeApiKey}
          style={{ marginBottom: 20 }}
        />
        <Flex align='center'>
          <Input.TextArea
            ref={textareaRef}
            defaultValue={chatText}
            placeholder='来，说点什么呗...Meta + Enter发送'
            onChange={changeChatText}
            onKeyDown={onInputKeyDown}
            autoSize
          />
          <Button
            style={{ margin: '0 10px' }}
            icon={<SendOutlined rotate={-60} />}
            type='primary'
            disabled={isStream}
            onClick={onSubmit}
          >
            发送
          </Button>
          <Button
            icon={<SendOutlined rotate={-60} />}
            type='primary'
            disabled={!isStream}
            onClick={onStop}
          >
            停止
          </Button>
        </Flex>
      </section>
      <section>
        {isStream && <div>正在输入...</div>}
        <section style={{ textAlign: 'right', color: '#666' }}>{dateTime}</section>
        <ReMarkdown markdownText={aiText} isLoading={isStream} />
      </section>
    </FixTabPanel>
  )
}

export default Home
