import { Typography, Button, Statistic } from 'antd'
import styles from './withdraw.module.css'

const {Text} = Typography;

export default function WithdrawCard({proceeds=0}){

    return(
        <div className={styles.container}>
            <Statistic title="Cause Proceeds" value={proceeds} precision={2} />
            <div className={styles.btnGrp}>
            <Button shape='round' disabled={proceeds==0?true:false} style={{ marginTop: 16, width: '50%' }} type="primary">
                Withdraw Proceeds
            </Button>
            <Button shape='round'  disabled={proceeds==0?false:true} style={{ marginTop: 16, width: '45%' }} type="primary">
                Check Proceeds
            </Button>
            </div>
      </div>
    )
}