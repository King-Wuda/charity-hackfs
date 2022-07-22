import Layout from '../components/layout'
import { Typography, Button, List} from 'antd'
import CauseCard from '../components/causeCard'
const {Text,Title} = Typography;


const listData = [
    {
        name: 'Save the children international',
        desc: 'We are on a mission to save the lifes of 50,000 chidlren in poverty by providing them with basic life amenities',
        amountRequired: 2,
        address: '0xf707B1f534C19ac47Cb1Ea1265b7BdfDd4665def'
    },
    {
        name: 'Heart transaplant',
        desc: 'We are on a mission to save the lifes of 50,000 chidlren in poverty by providing them with basic life amenities',
        amountRequired: 1.4,
        address: '0xf707B1f534C19ac47Cb1Ea1265b7BdfDd4665def'
    },
    {
        name: 'Borehole drilling',
        desc: 'We are on a mission to save the lifes of 50,000 chidlren in poverty by providing them with basic life amenities',
        amountRequired: 7,
        address: '0xf707B1f534C19ac47Cb1Ea1265b7BdfDd4665def'
    },
    {
        name: 'Green energy development',
        desc: 'We are on a mission to save the lifes of 50,000 chidlren in poverty by providing them with basic life amenities',
        amountRequired: 19,
        address: '0xf707B1f534C19ac47Cb1Ea1265b7BdfDd4665def'
    },
    {
        name: 'Kidney donor for asian kid',
        desc: 'We are on a mission to save the lifes of 50,000 chidlren in poverty by providing them with basic life amenities',
        amountRequired: 24,
        address: '0xf707B1f534C19ac47Cb1Ea1265b7BdfDd4665def'
    },
]


export default function Activity(){
    return(
    <Layout>
            <CauseCard/>
        <div style={{border:'1px solid #e5e5e5',width:'100%',padding: '1rem', borderRadius:'20px'}}>
            <Title level={2}>Causes</Title>
            <List
            itemLayout="horizontal"
            dataSource={listData}
            renderItem={item => (
                <List.Item
                key={item.name}
                extra={<ListItemAction amountRequired={item.amountRequired}/> }
                >
                <List.Item.Meta
                title={<TitleNode name={item.name} address={item.address}/>}
                description={<div style={{width:'80%'}}><Text type='secondary' >{item.desc}</Text></div>}
                />
            </List.Item>
             )}
             />
        </div>
     </Layout>
    )
}


function ListItemAction({amountRequired}){
    return(
        <div style={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
            <Button shape='round' size='large' type='primary'>Donate</Button>
            <Text type='secondary'>{amountRequired}ETH</Text>
        </div>
    )
}

function TitleNode({address, name}){
    return(
        <div style={{display:'flex'}}>
        <Title style={{margin:'0 .5rem 0 0'}} level={5}>{name}</Title>
        <AddressPill address={address}/>
        </div>
    )
}

function AddressPill({address}){
    return(
        <Text style={{ padding:'0.2rem .5rem',background:'#f2f2f2', borderRadius:'50px'}}>{address.substring(0,4)}...{address.substring(38,42)}</Text>
    )
}
