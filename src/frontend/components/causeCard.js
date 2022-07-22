import { Typography, Button } from 'antd'
import styles from './causeCard.module.css'

const {Text} = Typography;

export default function CauseCard(){
    return(
        <div className={styles.container}>
            <Text>Get connected to the right donor</Text>
            <Button style={{width:'40%', padding:'.3rem',marginTop:'1rem'}}  type='primary' size='large' shape='round'>Create cause</Button>
        </div>
    )
}