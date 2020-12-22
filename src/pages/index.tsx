import React, { useState } from 'react'
import styled from 'styled-components'
import CommandInput from '../components/CommandInput'
import { motion } from 'framer-motion'

import Layout from '../components/Layout'
import AppHead from '../components/AppHead'

const Title = styled.h1`
  font-size: 40px;
  font-weight: 100;
`
const PGButton = styled.button`
  font-size: 40px;
  font-weight: 100;
  background: #fff;
  border-width: 0;
  outline: 0;
  cursor: help;
`

const CommandInputWrap = styled.div`
  padding-top: 16px;
`
const IndexPage: React.FC = () => {
  const [commandInputIsOpen, setCommandInputIsOpen] = useState<boolean>(false)
  const [rotate, setRotate] = useState<number>(0)

  const handleClickPeachGang = () => {
    setCommandInputIsOpen(true)
  }
  const handleSubmit = (command: string) => {
    setRotate(isNaN(+command) ? 0 : +command)
  }

  return (
    <Layout>
      <AppHead
        title={'Peach Gang Club'}
        description={''}
        keyword={'peach gang club 桃'}
        image={'/images/og_image.png'}
        url={'/'}
      />
      <div>
        <Title>Peach Gang Club</Title>
        <PGButton onClick={handleClickPeachGang}>
          <motion.img
            src="/images/peachick.png"
            alt="pgc"
            width={200}
            height={200}
            initial={{ scale: 0 }}
            animate={{ rotate: rotate, scale: 1 }}
            transition={{
              type: 'spring',
              stiffness: 260,
              damping: 20,
            }}
          />
        </PGButton>
        <CommandInputWrap>
          {commandInputIsOpen && <CommandInput onSubmit={handleSubmit} />}
        </CommandInputWrap>
      </div>
    </Layout>
  )
}

export default IndexPage
