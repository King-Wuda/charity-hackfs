import {List,Typography,Button} from 'antd'

const {Title,Text} = Typography;

export default function ActivityList({dataSource, listTitle = ''}){
    return(
    <div style={{border:'1px solid #e5e5e5',width:'100%',padding: '1rem', borderRadius:'20px'}}>
        <Title level={2}>{listTitle}</Title>
        <List
        itemLayout="horizontal"
        dataSource={dataSource}
        renderItem={item => (
            <List.Item
            key={item.name}
            extra={<ListItemActionNode amountRequired={item.amountRequired}/> }
            >
            <List.Item.Meta
            title={<TitleNode name={item.name} address={item.address}/>}
            description={<DescriptionNode desc={item.desc}/>}
            />
        </List.Item>
         )}
         />
         </div>
    )
}


function DescriptionNode({desc}){
    return(
        <div style={{width:'80%'}}><Text type='secondary' >{desc}</Text></div>
    )
}


function ListItemActionNode({amountRequired}){
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
