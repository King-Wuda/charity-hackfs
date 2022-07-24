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
    const [donationModal, setDonationModal] = useState(false);
    const [causeList, setCauseList] = useState([]);
    const [currentUser, setCurrentUser] = useState('');


    // function to toggle form cause creation
    const handleCauseFormToggle = () =>{
        setCauseForm(!causeForm);
    }  

    // funcition to toggle donation modal
    const handleDonationModalToggle = () =>{
        setDonationModal(!donationModal);
    }

    // function to handle submitting a donation
    const handleDonateToCause = (e)=>{
        console.log(e)

        //close modal
        handleDonationModalToggle()
    }

    // function to handle submission of a cause
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

    // function to handle deleting a cause
    const handleDeleteItem = (id)=>{
        const updatedList = causeList.filter((_,index)=>index!=id)
        setCauseList(updatedList)
    }

    return(

    <Layout>
        <CauseCard onCauseFormToggle = {handleCauseFormToggle}/>
        <ActivityList onDeleteItem={handleDeleteItem} onDonationToggle = {handleDonationModalToggle} dataSource={causeList} listTitle='Causes'/>

        <Modal title="Tell us about your cause" visible={causeForm} onCancel={handleCauseFormToggle} footer={null}>
         <CauseForm onFormSubmit={handleFormSubmit} />
        </Modal> 

        <Modal title="Donate to cause" visible={donationModal} onCancel={handleDonationModalToggle} footer={null}>
         <DonateForm onDonateToCause={handleDonateToCause} />
        </Modal>
    </Layout>
    )
}
 
function DonateForm({onDonateToCause}){
    return(
<Form
     layout='vertical'
      name="Cause form"
      onFinish={onDonateToCause}
      scrollToFirstError
    > 
      
      <Form.Item
        name="amountToDonate"
        rules={[{required:true,message: 'Please input amount required!'}]}
        label="Amount to donate"
      >
        <InputNumber addonAfter="MATIC" initialValues={100} />
      </Form.Item>

      
      <Form.Item>
        <Button width='100%' type="primary" htmlType="submit">
          Donate
        </Button>
      </Form.Item>

    </Form>

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

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Create Cause
        </Button>
      </Form.Item>

    </Form>

    )
}
