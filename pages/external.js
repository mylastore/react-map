import Layout from '../components/common/layout'
import dynamic from 'next/dynamic'
import React from 'react'

export default function External() {

  const Map = React.useMemo(() => dynamic(
    () => import('../components/map/mapExternalControl.js'),
    { loading: () => <h4>LOADING MAP...</h4> },
  ), [])

  return (
    <Layout>
      <div className='container'>
        <h4>External controls</h4>
        <Map />
      </div>
    </Layout>
  )

}