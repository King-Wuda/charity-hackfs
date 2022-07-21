import { ConnectButton } from '@rainbow-me/rainbowkit';
import styles from './layout.module.css'
import Link from 'next/link'

const Layout = (props) =>{
    return(
        <div>
            <Header/>
            {props.children}
        </div>
    )
}

function Header(){
    return(
      <header className={styles.header}>
        <Link href='/'>Razemoney</Link>
        <Link href='/dashboard'>Dashboard</Link>
        <div><ConnectButton /></div>
      </header>
    )
}

export default Layout