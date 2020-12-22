import Head from 'next/head'
import { SITE_URL } from '../consts/general'
interface Props {
  title: string
  description: string
  keyword: string
  image: string
  url: string
}

const AppHead: React.VFC<Props> = ({ title, description, keyword, image, url }) => {
  const full_url = new URL(url, SITE_URL).toString()
  const full_image = new URL(image, SITE_URL).toString()

  return (
    <Head>
      <title>{title}</title>
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta name="keywords" content={keyword} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={full_url} />
      <meta property="og:image" content={full_image} />
      <meta property="og:site_name" content={title} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@peachgangclub" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={full_image} />
      <link rel="canonical" href={full_url} />
    </Head>
  )
}

export default AppHead
