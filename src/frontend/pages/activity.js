import {useState,useRef} from 'react'
import Layout from '../components/layout'
import { Typography, Modal, Form, Input, InputNumber,Upload,Button} from 'antd'
import CauseCard from '../components/causeCard'
const {Text,Title} = Typography;
import Web3 from 'web3'

const CONTRACT_ABI = '';
const CONTRACT_ADDRESS = '';

import ActivityList from '../components/list/component'


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

    const [causeForm, setCauseForm] = useState(false);
    const [causeList, setCauseList] = useState([]);
    const [currentUser, setCurrentUser] = useState('');


    // function to toggle form cause creation
    const handleCauseFormToggle = () =>{
        setCauseForm(!causeForm);
    }  

    const handleFormSubmit = async(e)=>{

        const newCause = {
            name: e.name,
            desc: e.description,
            amountRequired: e.amountRequired,
            // pass in current user address
            address: ''
        }

        // update local state
        const clonedList = causeList.slice();
        clonedList.push(newCause) 
        setCauseList(clonedList);

        // close down modal form
        handleCauseFormToggle()

    }  

    const handleDeleteItem = (id)=>{
        const updatedList = causeList.filter((_,index)=>index!=id)
        setCauseList(updatedList)
    }

    return(

    <Layout>
        <CauseCard onCauseFormToggle = {handleCauseFormToggle}/>
        <ActivityList onDeleteItem={handleDeleteItem} dataSource={causeList} listTitle='Causes'/>
        <Modal title="Tell us about your cause" visible={causeForm} onCancel={handleCauseFormToggle} footer={null}>
         <CauseForm onFormSubmit={handleFormSubmit} />
        </Modal> 
    </Layout>
    )
}

function CauseForm({onFormSubmit}){

    const normFile = (e) => {
        console.log('Upload event:', e);
      
        if (Array.isArray(e)) {
          return e;
        }

        return e?.fileList;
      };



    return (
    <Form
     layout='vertical'
      name="Cause form"
      onFinish={onFormSubmit}
      scrollToFirstError
    >
      <Form.Item
        name="name"
        rules={[{required:true,message: 'Please provide a name for your cause!'}]}
        label="Cause name"
      >
        <Input placeholder="Name of cause" />
      </Form.Item>

      <Form.Item
        name="description"
        rules={[{required:true,message: 'Please write your description!'}]}
        label="Descripton of cause"
      >
        <Input placeholder="Describe your cause" />
      </Form.Item>

      <Form.Item
        name="amountRequired"
        rules={[{required:true,message: 'Please input amount required!'}]}
        label="Amount required"
      >
        <InputNumber addonAfter="MATIC" initialValues={100} />
      </Form.Item>

      {/* <Form.Item
        name="upload"
        label="Upload"
        valuePropName="fileList"
        getValueFromEvent={normFile}
        extra="Upload images of your cause (.png, .jpeg, .jpg only)"
      >
        <Upload name="logo"  listType="picture-card">
          <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
          </div>
        </Upload>
      </Form.Item> */}

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>

    </Form>

    )
}
