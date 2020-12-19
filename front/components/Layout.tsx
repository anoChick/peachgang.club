import React, { ReactNode } from 'react'
import Head from 'next/head'
import styled from 'styled-components'

type Props = {
  children?: ReactNode
  title?: string
}
const Root = styled.h1`
  text-align: center;
`
const Layout = ({ children, title = 'Peach Gang Club' }: Props) => (
  <Root>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    {children}
  </Root>
)

export default Layout
