import Head from 'next/head'
import styles from '../styles/map.module.css'
import dynamic from 'next/dynamic'
import React from 'react'
import Layout from "../components/common/layout";

export default function Home() {
  const Map = React.useMemo(() => dynamic(
    () => import('../components/map/mapLocation.js'),
    {
      loading: () => <h4>Loading...</h4>,
      ssr: false
    }
  ), [])

  return (
    <Layout>
      <Head>
        <title>AroundWire Maps</title>
        <link rel="icon" href="/favicon.ico"/>
      </Head>
      <div className='container'>
        <h4>Map controls</h4>
        <br/>
        <div className={styles.map}>
          <Map/>
        </div>
      </div>
    </Layout>
  )
}
