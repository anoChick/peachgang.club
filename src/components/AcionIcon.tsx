import { useEffect, useRef } from 'react'
import styled from 'styled-components'
import { Icon } from '@iconify/react'
import { motion } from 'framer-motion'

const Root = styled.div`
  position: absolute;
  display: none;
  vertical-align: top;
  cursor: pointer;
  &.svg {
    z-index: 10;
  }
`

interface Props {
  text: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: any
  onClick?: (text: string) => void
}

const ActionIcon: React.VFC<Props> = ({ text, icon, onClick }) => {
  const ref = useRef<HTMLDivElement>()
  const handleClick = () => {
    onClick && onClick(text)
  }

  useEffect(() => {
    let x = null
    let y = null
    let vX = Math.random() * 4 - 2
    let vY = Math.random() * 4 - 2
    let r = 0
    let vR = Math.random() * 4 - 2
    const size = Math.floor(Math.random() * 50 + 50)
    const timeout = setInterval(() => {
      const elem = ref.current
      if (x === null) x = elem.parentElement.clientWidth / 2 - size / 2
      if (y === null) y = 160

      if (!elem) return

      if (x < 0 || x + elem.clientWidth > elem.parentElement.clientWidth) {
        vX = -vX
      }
      if (y < 0 || y + elem.clientHeight > elem.parentElement.clientHeight) {
        vY = -vY
        vR = Math.random() * 4 - 2
      }
      x += vX
      y += vY
      r += vR
      elem.style.top = `${y}px`
      elem.style.left = `${x}px`
      elem.style.transform = `rotate(${r}deg)`
      elem.style.fontSize = `${size}px`
      elem.style.width = `${size}px`
      elem.style.height = `${size}px`
      elem.style.display = 'inline-block'
    }, 20)

    return () => {
      clearInterval(timeout)
    }
  }, [])

  return (
    <Root ref={ref} onClick={handleClick}>
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{
          type: 'spring',
          stiffness: 260,
          damping: 20,
        }}
      >
        <Icon icon={icon} />
      </motion.div>
    </Root>
  )
}

export default ActionIcon
