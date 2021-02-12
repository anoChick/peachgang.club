import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import randomcolor from 'randomcolor'
const Root = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  z-index: 10;
  background-color: rgba(0, 0, 0, 0.1);
`
const Container = styled.div`
  position: absolute;
  font-size: 16px;
  top: 100px;
  left: 50%;
  margin-left: -20px;
`
const Pin = styled.div`
  position: absolute;
  top: -20px;
  left: 13.5px;
  border-right: 4px solid transparent;
  border-left: 4px solid transparent;
  border-top: 30px solid #d42727;
  z-index: 100;
`
const Result = styled.div`
  background-color: rgba(0, 0, 0, 0.6);
  padding: 16px 0;
  border-radius: 100px;
  line-height: 30px;
  font-size: 30px;
  position: absolute;
  top: 160px;
  left: -183px;
  width: 100%;
  text-align: center;
  z-index: 100;
  color: #fff;
  font-weight: bold;
  text-shadow: 1px 1px 0 #000, -1px 1px 0 #000, 1px -1px 0 #000, -1px -1px 0 #000;
`

const CirclePanel = styled.div`
  position: relative;
  width: 400px;
  height: 400px;
  transform-origin: 17.5px 200px;
`
const Panel = styled.div`
  position: absolute;
  border-right: 17.5px solid transparent;
  border-left: 17.5px solid transparent;
  transform-origin: 17.5px 200px;
`
const PGImage = styled.img`
  position: absolute;
  top: 160px;
  left: -20px;
  width: 80px;
  height: 80px;
`
const PanelText = styled.span`
  position: absolute;
  top: -190px;
  left: -8px;
  font-size: 12px;
  line-height: 16px;
  -ms-writing-mode: tb-rl;
  writing-mode: vertical-rl;
`

const generatePanelData = () => {
  const panelData = new Array(36).fill('').map((_, i) => {
    return { num: i, color: randomcolor({ luminosity: 'light' }), text: `やわ桃`, reward: 5 }
  })
  panelData[10].text = '硬桃'
  panelData[10].reward = 200
  panelData[20].text = '硬桃'
  panelData[20].reward = 200
  panelData[30].text = '硬桃'
  panelData[30].reward = 200
  panelData[15].text = 'ハピネス'
  panelData[15].reward = 2000
  panelData[25].text = 'ルブ'
  panelData[25].reward = 20
  panelData[17].text = 'ルブ'
  panelData[17].reward = 20
  panelData[4].text = 'ルブ'
  panelData[4].reward = 20
  panelData[9].text = 'ルブ'
  panelData[9].reward = 20
  panelData[7].text = 'かれいの煮付け'
  panelData[7].reward = 800
  panelData[12].text = 'ｖｏｉｄ'
  panelData[12].reward = 0
  panelData[32].text = 'ｋｙｏｍｕ'
  panelData[32].reward = 0
  panelData[22].text = 'きょむ'
  panelData[22].reward = 0
  panelData[27].text = '虚無'
  panelData[27].reward = 0
  return panelData
}

type Props = {
  onFinish?: (reward: number) => void
}
const Roulette: React.VFC<Props> = ({ onFinish }) => {
  const ref = useRef<HTMLDivElement>()
  const pgRef = useRef<HTMLImageElement>()
  const [panelData] = useState(generatePanelData())
  const [result, setResult] = useState<{
    num: number
    color: string
    text: string
    reward: number
  } | null>(null)

  useEffect(() => {
    let r = 0
    let a = Math.random() + 0.1
    let v = Math.random() * 3
    let finished = false
    const timeout = setInterval(() => {
      v = v + a
      if (v > 8) {
        a = 0
      }

      if (v > 0) {
        v -= 0.02
      }
      if (a === 0 && Math.abs(v) <= 0.01 && !finished) {
        v = 0
        finished = true
        let index = Math.floor((360 - (r - 5)) / 10)
        if (index >= 36) index = 0
        setResult(panelData[index])
        setTimeout(() => {
          onFinish && onFinish(panelData[index].reward)
        }, 3000)
      }
      // r += r + v
      if (r > 360) {
        r -= 360
      }

      r += v
      ref.current.style.transform = `rotate(${r}deg)`
    }, 20)

    return () => {
      clearInterval(timeout)
    }
  }, [])

  return (
    <Root>
      <Container>
        <Pin />
        <CirclePanel ref={ref}>
          {panelData.map((d) => {
            return (
              <Panel
                key={d.num}
                style={{
                  borderTop: `200px solid ${d.color}`,
                  transform: `rotate(${d.num * 10}deg)`,
                }}
              >
                <PanelText>
                  {d.text}
                  <br />
                </PanelText>
              </Panel>
            )
          })}
          <PGImage ref={pgRef} src="/images/peachick2.png" alt="pgc" />
        </CirclePanel>
        {result && (
          <Result>
            {result.text}
            <br />
            <small style={{ fontSize: 14 }}>+{result.reward}HYC</small>
          </Result>
        )}
      </Container>
    </Root>
  )
}
export default Roulette
