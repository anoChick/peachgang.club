import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import CommandInput from '../components/CommandInput'
import { motion } from 'framer-motion'

import Layout from '../components/Layout'
import AppHead from '../components/AppHead'
import nightWithStars from '@iconify/icons-twemoji/night-with-stars'
import cityscapeIcon from '@iconify/icons-twemoji/cityscape'
import tornadoIcon from '@iconify/icons-twemoji/tornado'
import twitterIcon from '@iconify/icons-logos/twitter'
import radioactiveIcon from '@iconify/icons-twemoji/radioactive'
import ActionIcon from '../components/AcionIcon'
import Roulette from '../components/Roulette'

type StyledProps = {
  isNight: boolean
}
const ActionHeader = styled.div`
  position: fixed;
  font-size: 16px;
  top: 0;
  right: 0;
  padding: 4px 8px;
  z-index: 10;
  font-weight: 100;
  text-align: right;
`
const Title = styled.h1<StyledProps>`
  font-size: 40px;
  font-weight: 100;
  transition: color 1s;
  color: ${({ isNight }) => (isNight ? '#fff' : '#000')};
`
const PGButton = styled.button`
  font-size: 40px;
  font-weight: 100;
  background: none;
  border-width: 0;
  outline: 0;
  cursor: help;
`

const ActionContainer = styled.div<StyledProps>`
  transition: background-color 1s;

  background-color: ${({ isNight }) => (isNight ? '#222' : '#fff')};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`
const CommandInputWrap = styled.div`
  padding-top: 16px;
`
const IndexPage: React.FC = () => {
  const [commandInputIsOpen, setCommandInputIsOpen] = useState<boolean>(false)
  const [isNight, setIsNight] = useState<boolean>(false)
  const [isOpenRoulette, setIsOpenRoulette] = useState<boolean>(false)

  const [rotate, setRotate] = useState<number>(0)
  const [commandText, setCommandText] = useState<string>('')
  const [hyc, setHyc] = useState<number>(0)
  useEffect(() => {
    if (!hyc) return
    window.localStorage.setItem('club.peachgung.hyc', `${hyc}`)
  }, [hyc])
  useEffect(() => {
    const h = +(window.localStorage.getItem('club.peachgung.hyc') ?? 0)
    window.localStorage.setItem('club.peachgung.hyc', `${h}`)
    setHyc(h)
  }, [])
  const handleClickPeachGang = () => {
    setCommandInputIsOpen(true)
  }
  const handleSubmit = () => {
    switch (commandText) {
      case 'night-mode':
        setIsNight(true)
        break
      case 'day-mode':
        setIsNight(false)
        break
      case 'spin':
        setRotate(rotate + 360 * 20)
        break
      case 'roulette':
        setIsOpenRoulette(true)
        setHyc(hyc - 10)
        break
      case 'twitter':
        window.open('https://twitter.com/peachgangclub', '_blank')
        break
    }

    setCommandText('')
  }
  const handleClickActionIcon = (text: string) => {
    setCommandText(text)
  }
  return (
    <Layout>
      <AppHead
        title={'Peach Gang Club'}
        description={''}
        keyword={'peach gang club 桃'}
        image={'images/og_image.png'}
        url={'/'}
      />
      <div>
        <ActionHeader>{hyc} HYC</ActionHeader>
        <ActionContainer isNight={isNight}>
          {commandInputIsOpen && (
            <>
              <ActionIcon text="twitter" icon={twitterIcon} onClick={handleClickActionIcon} />
              <ActionIcon text="night-mode" icon={nightWithStars} onClick={handleClickActionIcon} />
              <ActionIcon text="day-mode" icon={cityscapeIcon} onClick={handleClickActionIcon} />
              <ActionIcon text="spin" icon={tornadoIcon} onClick={handleClickActionIcon} />
              <ActionIcon text="roulette" icon={radioactiveIcon} onClick={handleClickActionIcon} />
            </>
          )}

          <div>
            <Title isNight={isNight}>Peach Gang Club</Title>
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
          </div>
          <CommandInputWrap>
            {commandInputIsOpen && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  type: 'spring',
                  stiffness: 260,
                  damping: 20,
                }}
              >
                <CommandInput
                  value={commandText}
                  onChange={handleClickActionIcon}
                  onSubmit={handleSubmit}
                />
              </motion.div>
            )}
          </CommandInputWrap>
        </ActionContainer>
      </div>
      {isOpenRoulette && (
        <Roulette
          onFinish={(reward) => {
            setHyc(hyc + reward)
            setIsOpenRoulette(false)
          }}
        />
      )}
    </Layout>
  )
}

export default IndexPage
