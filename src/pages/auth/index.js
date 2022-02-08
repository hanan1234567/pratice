import React, {useState} from 'react'
import { Row, Col, Form, Input, Button, Image, Typography, message,Space} from 'antd';
import "../../../node_modules/antd/dist/antd.css"
import { useAuth } from '../../hooks'
import {useDispatch} from 'react-redux'
import {authAction} from "../../redux/actions"
const {Title}=Typography

const Login = () => {
    const [state, setState] = useState({username:'',password:''})
    const [loading,setLoading]=useState(false)
    const auth = useAuth()
    const dispatch=useDispatch();

    const handleInputChange = (name, value) => {
        setState({
            ...state,
            [name]: value
        })
    }
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
        }
    const handleLogin = () => {
        setLoading(true)
      
        dispatch(  authAction.login(state))
            .then((res) => {
                console.log("res:",res)
               setLoading(false)
            })
            .catch((err) => {
               setLoading(false)
                message.error(
                    {
                        content: "Username/Password incorrect",
                    }
                )
            })

    }

    return(
        <Row justify="center" align='middle' style={{height:'100vh',backgroundColor:'rgb(140,114,172)'}}>
            <Col lg={{ span: 12 }} >
                <Row gutter={[64,64]} style={{ borderRadius: '25px 0px',overflow:'hidden'}}>
                    <Col span={12} style={{backgroundColor:'white'}}>
                        <Image src="/images/hospitalisation.png" alt='my-image' preview={false}/>
                    </Col>
                    <Col span={12} style={{display:'flex',justifyContent:'center',alignItems:'center',backgroundColor:"rgb(243,237,245)"}} >
                    <Form 
                        style={{width:'100%'}}
                        className='flex-col-center'
                        onFinish={handleLogin}
                        onFinishFailed={onFinishFailed}
                    >
                        <Space direction="vertical" style={{width:'100%'}}>
                            <Title level={2}>Login</Title>
                            <Form.Item
                                name="username"
                                rules={[
                                {
                                    required: true,
                                    message: 'Please enter your username**',
                                },
                                ]}
                            >
                                <Input placeholder="UserName" size='large' onChange={(e)=>{handleInputChange("username",e.target.value)}}/>
                            </Form.Item>
                            <Form.Item
                                name="password"
                                rules={[
                                {
                                    required: true,
                                    message: 'Please enter your password**',
                                },
                                ]}
                            >
                                <Input.Password placeholder='Password' size='large' onChange={(e)=>{handleInputChange("password",e.target.value)}}/>
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" htmlType="submit" size='large' block loading={loading} onClick={handleLogin}>Login</Button>
                            </Form.Item>
                        </Space>
                    </Form>
                    </Col>
                </Row>
            </Col>
        </Row>       
    )
}

export default Login


