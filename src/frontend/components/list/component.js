import {List,Typography,Button, IconText} from 'antd'
import {DeleteFilled, EditFilled} from '@ant-design/icons';
const {Title,Text} = Typography;

export default function ActivityList({ onUpdateCause, mode = 'editor', onDeleteItem,onDonationToggle, dataSource, listTitle = ''}){

     const editorControls= (index) =>  [
        <DeleteFilled onClick={()=>onDeleteItem(index)} />,
        <EditFilled onClick={()=>onUpdateCause(index)} />
      ]


    return(
    <div style={{border:'1px solid #e5e5e5',width:'100%',padding: '1rem', borderRadius:'20px'}}>
        <Title level={2}>{listTitle}</Title>
        <List
        itemLayout="vertical"
        dataSource={dataSource}
        renderItem={(item,index) => (
            <List.Item
            key={index}
            actions={mode=='editor'?editorControls(index):null}
            extra={<ListItemActionNode onDonationToggle={onDonationToggle} mode={mode} amountRequired={item.amountRequired}/> }
            >
            <List.Item.Meta
            title={<TitleNode name={item.name} address={''}/>}
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


function ListItemActionNode({currentId, updateCause, mode, amountRequired, onDonationToggle}){
    return(
        <div style={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
            {mode=='editor'? <Button onClick={onDonationToggle} shape='round' size='large' type='primary'>Donate</Button>: <Title level={5}>{amountRequired}MATIC</Title>}
            {mode == 'editor'? <Text type='secondary'>{amountRequired}MATIC</Text>:''}
        </div>
    ) 
}

function TitleNode({address, name}){
    return(
        <div style={{display:'flex'}}>
        <Title style={{margin:'0 .5rem 0 0'}} level={5}>{name}</Title>
        {/* <AddressPill address={address}/> */}
        </div>
    )
}

function AddressPill({address}){
    return(
        <Text style={{ padding:'0.2rem .5rem',background:'#f2f2f2', borderRadius:'50px'}}>{address.substring(0,4)}...{address.substring(38,42)}</Text>
    )
}
