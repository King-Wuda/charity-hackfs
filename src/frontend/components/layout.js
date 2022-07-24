import { ConnectButton } from '@rainbow-me/rainbowkit';
import styles from './layout.module.css'
import Link from 'next/link'

import {Segmented}from 'antd'


const Layout = (props) =>{
    return(
        <div>
            <Header/>
            <div className={styles.mainWrapper}>
            {props.children}
            </div>
        </div>
    )
}

function Header(){
    return(
      <header className={styles.header}>
        <Link href='/'>Razemoney</Link>
          <div>
            <Link href='/activity'>Activity | </Link>
            <Link href='/dashboard'>Dashboard</Link>
          </div>
          {/* <Segmented options={['activity','dashboard']}/> */}
        
        <div><ConnectButton /></div>
      </header>
    )
}

export default Layout