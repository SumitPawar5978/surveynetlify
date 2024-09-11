import React, { useEffect, useState } from 'react'

import { db } from "../../utils/firebase";
import { onValue, ref,set,remove } from "firebase/database";
import { Box, Button, TextField } from '@mui/material';

export default function FirebaseDatabase() {
const [formData, setFormData] = useState(null);
const [list,setList]=useState([]);
const [selectedItem,setSelectedItem]=useState(null);

  useEffect(() => {
    const query = ref(db, "users");
    return onValue(query, (snapshot) => {
      console.log(snapshot);
      
      const data = snapshot.val();
      setList([])
      if (snapshot.exists()) {
        console.log(data);
        
        Object.values(data).map((user) => {
        return   setList((users) => [...users, user]);
        });
      }
    });
  }, []);

  function writeUserData(userId) {
    const {name,age}=formData
    set(ref(db, 'users/' +userId), {
      username: name,
      age: age,
      userId:userId
    }).then(()=>{
      alert("data added successfully")
    }).catch((e)=>{

    });
  }

  const Delete=(userId)=>{
    remove(ref(db, 'users/' +userId)).then(()=>{
      // alert("data deleted successfully")
    });
  }


  return (
    <>
    {/* <StudentForm/>
    <ExaminerPanel/> */}
     <Box display={'felx'} gap={1} flexWrap={'nowrap'}>
      <TextField type='text' value={formData?.name} onChange={(e)=>{
        setFormData({
          ...formData && formData,
          name:e.target.value
        })
      }} placeholder='enter name'/>
      <TextField value={formData?.age} onChange={(e)=>{
        setFormData({
          ...formData && formData,
          age:e.target.value
        })
      }} type='text' placeholder='enter age' />
      
      <Button variant='outlined' onClick={()=>{
        let userId=new Date().getTime();
        if(selectedItem){
          userId=selectedItem.userId
        }
        writeUserData(userId)
      }}>Save</Button>
 </Box>
      <Box>
        {list.map((item)=>{
          return <Box>
            <p>User ID :: {item.userId}</p>
            <p>Name :: {item.headCode}</p>
            <p>Age :: {item.age}</p>
            <Button variant='outlined' onClick={()=>{setSelectedItem(item); setFormData({name:item.username,age:item.age})}}>Edit</Button>
            <Button variant='outlined' onClick={()=>{Delete(item.userId)}}>Delete</Button>
            <br/><br/><br/>
          </Box>
        })}
      </Box>
    
      </>
  )
}
