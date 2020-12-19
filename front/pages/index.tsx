import styled from 'styled-components'

import Layout from '../components/Layout'

const Title = styled.h1`
  font-size: 40px;
`

const IndexPage = () => (
  <Layout>
    <Title>Peach Gang Club</Title>
    <img src="/images/peachick.png" alt="pgc" width={200} height={200} />
  </Layout>
)

export default IndexPage
