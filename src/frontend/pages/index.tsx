import { ConnectButton } from '@rainbow-me/rainbowkit';
import type { NextPage } from 'next';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { Typography, Button } from 'antd';

const { Title, Text } = Typography;

import 'antd/dist/antd.css';


const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Razemoney</title>
        <meta
          name="description"
          content="A decentralized fund raising application on the polygon network"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        

        <Title style={{marginBottom:'1.5rem'}}>
          Razemoney
        </Title>
        <Title level={3} style={{margin:'0',marginBottom:'.6rem'}}>Get funding for your cause</Title>
        <Text style={{textAlign:'center', width:'70%'}}>We are on a mission to connect life-changing causes seeking funding with the right group of donors in a decentralized way</Text>
        <div className={styles.btnGroup}>
        <Button shape='round' size='large'>Get funding for a cause</Button>
        <Button shape='round' size='large'>Donate to a cause</Button>
        </div>

      </main>
    </div>
  );
};

function Header(){
  return(
    <header>
      <div>Razemoney</div>
      <div><ConnectButton /></div>
    </header>
  )
}

export default Home;
