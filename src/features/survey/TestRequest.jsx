import React, { useEffect, useState } from 'react'
import { Box, Typography, Button } from '@mui/material'
import ClearIcon from '@mui/icons-material/Clear';
import CheckIcon from '@mui/icons-material/Check';
import profileIcon from "../../assets/image/account.svg";
import LocationIcon from "../../assets/image/location.svg";
import Divider from '@mui/material/Divider';
import { useDispatch, useSelector } from 'react-redux';
import { getUserRequest, updateUserTestRequestStatus } from '../../utils/axios';
import { db } from "../../utils/firebase";
import { onValue, ref, update } from "firebase/database";
import { setRequestData } from '../../app/reducer';
const TestRequest = () => {
    const selectedHeadCode = useSelector((state) => state.reducer.selectedHeadCode);
    const requestData = useSelector(
        (state) => state.reducer.requestData
      );

      const [requestEntries, setRequest] = useState([])
      const dispatch=useDispatch()
      
      const [requests, setRequests] = useState([]);
      
      const filteredData = requests.filter(item => item.surveyCode.trim() === selectedHeadCode);
      console.log(filteredData,'selectedHeadCode')
    useEffect(() => {
        const query = ref(db, 'examRequests');
        return onValue(query, (snapshot) => {
          const data = snapshot.val();
          const requestsList = [];
          if (data) {
            Object.values(data).forEach((request) => {
              if (request.status === 'pending') {
                requestsList.push(request);
              }
            });
            setRequests(requestsList);
          }
        });
      }, []);
    
    useEffect(() => {  
        const handleGetRequest =async()=>{
            try {
                const res = await getUserRequest({head_code: selectedHeadCode});
                console.log("responses :", res?.data);
               
                if (res.data.status === "success") {
                    setRequest(res?.data)
                //   navigate(routePath.TESTREQUEST)
                } else {
                  // Toast.fire({
                  //   icon: "error",
                  //   title: res.data.message,
                  // });
                }
              } catch (error) {
                console.error("Failed to get code:", error);
              }
        }  
        handleGetRequest()
    }, [requests,selectedHeadCode])
    
    const handleApproval = (userId, result_id, isApproved) => {
        const status = isApproved ? 'Accept' : 'Reject';
        console.log(status,'status123')
        update(ref(db, 'examRequests/' + userId), { status }).then(() => {
        //   alert(`Request ${status}!`);
          handleRequest(status, result_id)
          dispatch(setRequestData({ ...requestData, result_id : result_id}))
        }).catch((error) => {
          console.error(`Error updating status: ${error}`);
        });
      };

      const handleRequest=async(status,result_id)=>{
        console.log({result_id:result_id,status:status},'testtttttttt')
        try {
            let res = await updateUserTestRequestStatus({result_id:result_id,status:status});
            console.log(res.data,'ressssssss');
        } catch (error) {
            console.error("Failed to fetch states:", error);
        }
    }
    return (
        <>
            <Box sx={{ backgroundColor: "#E5F9FF", height: "100%", }}>
             

                <Box sx={{ padding: "10px 20px" }}>
                    <Divider sx={{ backgroundColor: '#F84D01', height: '2px', borderRadius: "4px" }} />
                </Box>

                <Box sx={{ padding: "10px 20px", }}>
                    <Box sx={{
                        borderRadius: "5px",
                        background: "rgba(255, 255, 255, 1)"
                    }}>
                        <Box sx={{ padding: "10px", }}>
                            <Box sx={{ display: "flex" }}>
                                <Typography variant="h6" sx={{ fontSize: "16px", fontWeight: "400", color: "rgba(34, 34, 34, 0.8)" }}>Test Title :</Typography>
                                <Typography variant="h6" sx={{ fontSize: "16px", fontWeight: "400", color: "#F84D01", pl:'3px' }}>{requestEntries?.testDetail?.test_title}</Typography>
                            </Box>
                            <Box sx={{ display: "flex" }}>
                                <Typography variant="h6" sx={{ fontSize: "16px", fontWeight: "400", color: "rgba(34, 34, 34, 0.8)" }}>Head Code :</Typography>
                                <Typography variant="h6" sx={{ fontSize: "16px", fontWeight: "400", color: "#F84D01", pl:'3px' }}>{requestEntries?.testDetail?.head_code}</Typography>
                            </Box>
                            <Box sx={{ display: "flex" }}>
                                <Typography variant="h6" sx={{ fontSize: "16px", fontWeight: "400", color: "rgba(34, 34, 34, 0.8)" }}>Location :</Typography>
                                <Typography variant="h6" sx={{ fontSize: "16px", fontWeight: "400", color: "#F84D01", pl:'3px' }}>{requestEntries?.testDetail?.location}</Typography>
                            </Box>
                            <Box sx={{ display: "flex" }}>
                                <Typography variant="h6" sx={{ fontSize: "16px", fontWeight: "400", color: "rgba(34, 34, 34, 0.8)" }}>Date :</Typography>
                                <Typography variant="h6" sx={{ fontSize: "16px", fontWeight: "400", color: "#F84D01", pl:'3px' }}>{requestEntries?.testDetail?.test_date}</Typography>
                            </Box>
                        </Box>
                    </Box>
                </Box>

                <Box
                    sx={{
                        display: 'flex',
                        gap: '16px',
                        overflowX: 'auto',
                        padding: '8px 0',
                        whiteSpace: 'nowrap',
                        marginLeft: '20px',
                    }}
                >
                    <Button
                        variant="outlined"
                        sx={{
                            maxWidth: '150px',
                            overflow: 'hidden',
                            fontWeight:'700',
                            lineHeight:1,
                            pt:0.8,
                            flexShrink: 0,
                            color:'#F84D01',
                            borderColor:'#F84D01',
                        }}
                    >
                        PENDING ({requestEntries?.pendingCount})
                    </Button>
                    <Button
                        variant="outlined"
                        sx={{
                            maxWidth: '150px',
                            overflow: 'hidden',
                            fontWeight:'700',
                            lineHeight:1,
                            pt:0.8,
                            flexShrink: 0,
                            color:'#38B544',
                            borderColor:'#38B544',
                        }}
                    >
                        ACCEPTED ({requestEntries?.acceptedCount})
                    </Button>
                    <Button
                        variant="outlined"
                        sx={{
                            maxWidth: '150px',
                            overflow: 'hidden',
                            fontWeight:'700',
                            lineHeight:1,
                            pt:0.8,
                            flexShrink: 0,
                            color:'#F21F2E',
                            borderColor:'#F21F2E',
                            
                        }}
                    >
                        REJECTED ({requestEntries?.rejectedCount})
                    </Button>
                </Box>

                {/* <Box sx={{ padding: "15px 20px", }}>
                    {requestEntries?.userRequestDetail?.map((item,index)=>(
                        <Box key={index} sx={{
                            borderRadius: "5px",
                            background: "rgba(255, 255, 255, 1)",
                            position: "relative"
                        }}>
                            <Box sx={{ padding: "10px", }}>
                                <Box sx={{ display: "flex" }}>
                                     <Box component="img" src={profileIcon} alt="Logo" style={{ height: '24px', width: '24px', marginRight: "11px" }} />
                                    <Typography variant="h6" sx={{ fontSize: "16px", fontWeight: "600", color: "#F84D01" }}>{item.first_name} {item.middle_name} {item.last_name}</Typography>
                                </Box>
                                <Box sx={{ display: "flex", marginTop:"7px" }}>
                                     <Box component="img" src={LocationIcon} alt="Logo" style={{ height: '24px', width: '24px', marginRight: "11px" }} />
                                    <Typography variant="h6" sx={{ fontSize: "16px", fontWeight: "400", color: "#F84D01" }}>{item.location}</Typography>
                                </Box>
                            </Box>
                            <Box>
                                <Button onClick={()=>handleRequest("Accept",item.result_id)} variant="contained" sx={{ width: "50%", fontSize: "16px", fontWeight: "600", borderRadius: "0px 0px 0px 5px", backgroundColor: "secondary.main" }} startIcon={<CheckIcon />}>  ACCEPT</Button>
                                <Button onClick={()=>handleRequest("Reject",item.result_id)} variant="contained" sx={{ width: "50%", fontSize: "16px", fontWeight: "600", borderRadius: "0px 0px 5px 0px", backgroundColor: "primary.dark2" }} startIcon={<ClearIcon />}>  REJECT</Button>
                            </Box>
                            <Box sx={{ position: "absolute", top: "0", right: "0", border: "1px solid #F84D01", width: "50px", borderRadius: "5px", padding: "5px 5px" }}>
                                <Typography sx={{ fontSize: "14px", fontWeight: "700", color: "#F84D01", textAlign: "center" }}>
                                    {item.test_type}
                                </Typography>
                            </Box>
                        </Box>
                    ))}

                </Box> */}

                
            
                <Box sx={{ padding: "15px 20px", }}>
                {filteredData?.map((item,index)=>(
                    <Box key={index} sx={{
                        borderRadius: "5px",
                        background: "rgba(255, 255, 255, 1)",
                        position: "relative"
                    }}>
                        <Box sx={{ padding: "10px", }}>
                            <Box sx={{ display: "flex" }}>
                                 <Box component="img" src={profileIcon} alt="Logo" style={{ height: '24px', width: '24px', marginRight: "11px" }} />
                                <Typography variant="h6" sx={{ fontSize: "16px", fontWeight: "600", color: "#F84D01" }}>{item.name}</Typography>
                            </Box>
                            <Box sx={{ display: "flex", marginTop:"7px" }}>
                                 <Box component="img" src={LocationIcon} alt="Logo" style={{ height: '24px', width: '24px', marginRight: "11px" }} />
                                <Typography variant="h6" sx={{ fontSize: "16px", fontWeight: "400", color: "#F84D01" }}>{item.location}</Typography>
                            </Box>
                        </Box>
                        <Box>
                        <Button variant="contained" sx={{ width: "50%", fontSize: "16px", fontWeight: "600", borderRadius: "0px 0px 0px 5px", backgroundColor: "secondary.main" }} startIcon={<CheckIcon />} onClick={() => handleApproval(item.userId, item.result_id, true)}>Approve</Button>
                        <Button variant="contained" sx={{ width: "50%", fontSize: "16px", fontWeight: "600", borderRadius: "0px 0px 5px 0px", backgroundColor: "primary.dark2" }} startIcon={<ClearIcon />} onClick={() => handleApproval(item.userId, item.result_id, false)}>Reject</Button>
                        </Box>
                        <Box sx={{ position: "absolute", top: "0", right: "0", border: "1px solid #F84D01", width: "50px", borderRadius: "5px", padding: "5px 5px" }}>
                            <Typography sx={{ fontSize: "14px", fontWeight: "700", color: "#F84D01", textAlign: "center" }}>
                                {item.test_type}
                            </Typography>
                        </Box>
                    </Box>
                ))}

            </Box>
              
               

            </Box>
        </>
    )
}

export default TestRequest