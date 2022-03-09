import Nav from './nav'

export default function Layout({ children }) {
  return (
    <div className='site'>
      <Nav />
      <div className='site-content'>
        <section>
          {children}
        </section>
      </div>
      <footer className='site-footer'>
        <div style={{ textAlign: 'center' }}>
          Copyright © 2012 - 2021 AroundWire.com LLC. All rights reserved.
        </div>
      </footer>
    </div>
  )
}