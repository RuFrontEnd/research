"use client"
import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'

export default function Home() {

  const $textArea = useRef<HTMLTextAreaElement | null>(null)
  const [height, setHeight] = useState<number | string>('auto'),
    [text, setText] = useState(''),
    [editing, setEditing] = useState(false)

  useEffect(() => {
    if ($textArea.current && editing) {
      $textArea.current.focus()
    }
  }, [editing])

  return (
    <main style={{ width: '100px', height: '100px' }}

      onClick={() => {
        setEditing(false)
      }}>

      <div className='fixed top-[50px] left-[50px] border border-black '
        onDoubleClick={() => {
          setEditing(true)
          if ($textArea.current) {
            $textArea.current.focus()
          }
        }}>
        <textarea style={{ height: height }}
          disabled={!editing}
          value={text}
          className='resize-none focus:outline-none overflow-hidden block'
          ref={$textArea}
          onClick={(e) => { e.stopPropagation() }}
          onInput={(e) => {
            const textarea = e.currentTarget;
            textarea.style.height = "auto";
            textarea.style.height = textarea.scrollHeight - 1 + "px";
            setText(textarea.value)
          }} />
      </div>
    </main >
  )
}
