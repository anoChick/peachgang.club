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

const LinkButton = styled.a`
  display: inline-block;
  color: white;
  text-decoration: none;
  background-color: #43a047;
  background-image: linear-gradient(to right, #0ba360, #3cb085, #2bb673);
  text-shadow: none;
  padding: 8px 16px;
  font-size: 16px;
  border-radius: 10px;
`
const FlavorText = styled.div`
  color: white;
  font-size: 14px;
  margin: 8px 32px;
  line-height: 18px;
`

const Result = styled.div`
  background-color: rgba(0, 0, 0, 0.6);
  padding: 16px 0;
  border-radius: 16px;
  line-height: 30px;
  font-size: 30px;
  position: absolute;
  top: 40px;
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
  font-size: 16px;
  line-height: 18px;
  -ms-writing-mode: tb-rl;
  writing-mode: vertical-rl;
`

const generatePanelData = () => {
  const panelData = new Array(36).fill('').map((_, i) => {
    return {
      num: i,
      color: randomcolor({ luminosity: 'light' }),
      text: `やわらかい桃`,
      reward: 5,
      center: true,
      link: null,
      image: null,
      flavorText: '',
    }
  })

  panelData[20].text = '硬桃'
  panelData[20].reward = 200

  panelData[22].text = 'ハピネス'
  panelData[22].reward = 2000
  panelData[28].text = '小吉'
  panelData[28].reward = 20
  panelData[1].text = 'かれいの煮付け'
  panelData[1].reward = 800

  const tflist = [2, 3, 4, 5, 6]
  const tfColor = randomcolor({ luminosity: 'light' })
  tflist.forEach((i) => {
    panelData[i].text = '🤔キーキャップ'
    panelData[i].center = i === 4
    panelData[i].reward = 11
    panelData[i].color = tfColor
    panelData[i].link = 'https://booth.pm/ja/items/1765414'

    panelData[i].image =
      'https://booth.pximg.net/d56dfefc-5ad8-4bd1-9fb8-4e98c6c30828/i/1765414/ca1df9e9-149c-4740-8a5a-01ef5a16683c_base_resized.jpg'
  })
  const rublist = [7, 8, 9]
  const rubColor = randomcolor({ luminosity: 'light' })
  rublist.forEach((i) => {
    panelData[i].text = 'ルブ'
    panelData[i].center = i === 8
    panelData[i].reward = 2
    panelData[i].color = rubColor
    panelData[i].flavorText = 'ルブおいしい！！'
    panelData[i].image = '/images/rub.jpeg'

    panelData[i].link = 'https://yushakobo.jp/shop/lubricants/'
  })
  const kyomlist = [10, 11, 12, 13, 14, 15, 16]
  kyomlist.forEach((i) => {
    panelData[i].text = '虚無'
    panelData[i].center = i === 13
    panelData[i].reward = 0
    panelData[i].color = '#aaa'
  })
  panelData[17].text = '硬桃'
  panelData[17].reward = 200
  const hiyopisList = [19, 20, 21]
  const hiyopisColor = randomcolor({ luminosity: 'light' })
  hiyopisList.forEach((i) => {
    panelData[i].text = 'ひよピス'
    panelData[i].center = i === 20
    panelData[i].reward = 20
    panelData[i].image = '/images/hiyopis.jpg'
    panelData[i].flavorText = 'ひよこにピース！ひよピス'
    panelData[i].color = hiyopisColor
  })

  const uhmwpeList = [23, 24, 25, 26, 27]
  const uhmwpeColor = randomcolor({ luminosity: 'light' })
  uhmwpeList.forEach((i) => {
    panelData[i].text = 'UHMWPE'
    panelData[i].center = i === 25
    panelData[i].reward = 20
    panelData[i].flavorText = 'ｩﾑｩﾋﾟｪ〜'
    panelData[i].image =
      'https://booth.pximg.net/6cc8f587-fe7f-4a8d-8156-edc44b3d58c5/i/2344548/5a8aebcf-ab8d-4673-94fb-8d48dc961da8_base_resized.jpg'
    panelData[i].link = 'https://booth.pm/ja/items/2344548'
    panelData[i].color = uhmwpeColor
  })
  const tthList = [29, 30, 31]
  const tthColor = randomcolor({ luminosity: 'light' })
  tthList.forEach((i) => {
    panelData[i].text = '戸田広'
    panelData[i].center = i === 30
    panelData[i].reward = -5
    panelData[i].color = tthColor
  })
  const tjList = [33, 34, 35]
  const tjColor = randomcolor({ luminosity: 'light' })
  tjList.forEach((i) => {
    panelData[i].text = 'たのしい人生'
    panelData[i].center = i === 34
    panelData[i].reward = 50
    panelData[i].color = tjColor
  })

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
    center: boolean
    link: string | null
    image: string | null
    flavorText: string
  } | null>(null)

  useEffect(() => {
    let r = 0
    let a = Math.random() + 0.2
    let v = Math.random() * 3
    let finished = false
    const timeout = setInterval(() => {
      v = v + a
      if (v > 15) {
        a = 0
      }

      if (v > 0) {
        v -= 0.1
      }
      if (a === 0 && Math.abs(v) <= 0.1 && !finished) {
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
    }, 25)

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
                  {d.center ? d.text : ''}
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
            <div>
              <small style={{ fontSize: 14 }}>+{result.reward}HYC</small>
            </div>
            {result.image && (
              <div>
                <img
                  src={result.image}
                  alt={result.text}
                  height={140}
                  style={{ borderRadius: 10, display: 'inline-block', margin: 16 }}
                />
              </div>
            )}
            <div>
              <FlavorText>{result.flavorText}</FlavorText>
            </div>
            {result.link && (
              <div>
                <LinkButton href={result.link} target="_blank" rel="noreferrer">
                  今すぐ購入
                </LinkButton>
              </div>
            )}
          </Result>
        )}
      </Container>
    </Root>
  )
}
export default Roulette
