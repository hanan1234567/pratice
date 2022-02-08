import React, { useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {formularyAction} from "../../redux/actions"
import {Table} from 'antd'
const Home = (props) => {
   const {token}=useSelector(state => state.auth)
   const {formulary}=useSelector(state => state.formulary)
   console.log(formulary)
    const dispatch=useDispatch();
    useEffect(()=>{
        dispatch(formularyAction.get(token))
        .then(() => {
            
        })
        .catch((e) => {
            
        })
    },[])
    const columns = [
        {
          title: 'Drud ID',
          dataIndex: 'id',
        
        },
        {
          title: 'Name',
          dataIndex: 'name',
        
        },
        {
          title: 'Total Records',
          dataIndex: 'records'
        },
      ];
    return(

        <div>
            <p>Home Page</p>
            <Table columns={columns} dataSource={formulary} />
        </div>

        
    )
}


export default Home;