import React, { useEffect, useState } from "react";
import {
  Typography,
  Box,
  Button,
  FormControl,
  RadioGroup,
  Radio,
  FormControlLabel,
  InputLabel,
  Select,
  MenuItem,
  TextField,
} from "@mui/material";
import Logo from "../../assets/image/logo.svg";
import dropdownIcon from "../../assets/image/dropdown-icon.svg";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { routePath } from "../../constants/routePath";
import { getDistrict, getState, getCity, getMedicalSpeciality, getCollegeList, updateAddressDetail, loginAxios } from "../../utils/axios";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { setUserDetails } from "../../app/reducer";

const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.onmouseenter = Swal.stopTimer;
    toast.onmouseleave = Swal.resumeTimer;
  },
});

// Custom styled components
const CustomRadio = styled(Radio)({
  color: "rgba(0, 0, 0, 0.6)",
  "&.Mui-checked": {
    color: "rgba(112, 120, 122, 1)",
  },
});

const CustomSelectIcon = styled("img")({
  height: "15px",
  width: "15px",
  transition: "transform 0.3s ease",
  marginRight: "10px",
});

const MedicalStudents = () => {
  const dispatch = useDispatch()
  const userId = useSelector((state) => state.reducer.userId);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    state: "",
    city: "",
    district: "",
    medicalSpecialty: "",
    college: "",
  });

  console.log(formData,'formData')
  const [dropdownOpen, setDropdownOpen] = useState({
    state: false,
    city: false,
    district: false,
    medicalSpecialty: false,
    college: false,
  });

  const [selectedTab, setSelectedTab] = useState("tabIndia");
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [cities, setCities] = useState([]);
  const [medicalSpecialties, setMedicalSpecialties] = useState([]);
  const [collegeList, setCollegeList] = useState([]);

  // const handleInputChange = (event) => {
  //   const { name, value } = event.target;
  //   setFormData((prev) => ({ ...prev, [name]: value }));
  // };
  const handleInputChange = (event) => {
    const { name, value } = event.target;
  
    // Reset fields related to state when the state changes
    if (name === 'state') {
      setFormData(prev => ({
        ...prev,
        [name]: value,
        district: '', // Reset district
        city: '', // Reset city
        college: '', // Reset college
        medicalSpecialty: '' // Reset medical specialty
      }));
      setDistricts([]);
      setCities([]);
      setCollegeList([]);
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };
  

  const handleDropdownToggle = (name, isOpen) => {
    setDropdownOpen((prev) => ({ ...prev, [name]: isOpen }));
  };

  // useEffect(() => {
  //   const fetchStates = async () => {
  //     try {
  //       let res = await getState();
  //       setStates(res.data.data);
  //     } catch (error) {
  //       console.error("Failed to fetch states:", error);
  //     }
  //   };
  
  //   const fetchDistricts = async () => {
  //     if (!formData.state) return;
  //     try {
  //       let res = await getDistrict(formData.state);
  //       setDistricts(res.data.data);
  //     } catch (error) {
  //       console.error("Failed to fetch districts:", error);
  //     }
  //   };
  
  //   const fetchCities = async () => {
  //     if (!formData.district) return;
  //     try {
  //       let res = await getCity(formData.district);
  //       setCities(res.data.data);
  //     } catch (error) {
  //       console.error("Failed to fetch cities:", error);
  //     }
  //   };
  
  //   const fetchMedicalSpeciality = async () => {
  //     try {
  //       let res = await getMedicalSpeciality();
  //       setMedicalSpecialties(res.data.data);
  
  //       // Call fetchCollegeList after fetching medical specialties
  //       fetchCollegeList();
  //     } catch (error) {
  //       console.error("Failed to fetch medical specialties:", error);
  //     }
  //   };
  
  //   const fetchCollegeList = async () => {
  //     if (!formData.city || !formData.medicalSpecialty) return;
  //     try {
  //       let res = await getCollegeList(formData.city, formData.medicalSpecialty);
  //       setCollegeList(res.data.data);
  //     } catch (error) {
  //       console.error("Failed to fetch colleges:", error);
  //     }
  //   };
  
  //   fetchStates();
  //   fetchDistricts();
  //   fetchCities();
  //   fetchMedicalSpeciality();
  
  // }, [formData.state, formData.district, formData.city, formData.medicalSpecialty]);

  useEffect(() => {
  const fetchStates = async () => {
    try {
      let res = await getState();
      setStates(res.data.data);
    } catch (error) {
      console.error("Failed to fetch states:", error);
    }
  };

  const fetchDistricts = async () => {
    if (!formData.state) return;
    try {
      let res = await getDistrict(formData.state);
      setDistricts(res.data.data);
    } catch (error) {
      console.error("Failed to fetch districts:", error);
    }
  };

  const fetchCities = async () => {
    if (!formData.district) return;
    try {
      let res = await getCity(formData.district);
      setCities(res.data.data);
    } catch (error) {
      console.error("Failed to fetch cities:", error);
    }
  };

  const fetchMedicalSpeciality = async () => {
    try {
      let res = await getMedicalSpeciality();
      setMedicalSpecialties(res.data.data);
      fetchCollegeList();
    } catch (error) {
      console.error("Failed to fetch medical specialties:", error);
    }
  };

  const fetchCollegeList = async () => {
    if (!formData.city || !formData.medicalSpecialty) return;
    try {
      let res = await getCollegeList(formData.city, formData.medicalSpecialty);
      setCollegeList(res.data.data);
    } catch (error) {
      console.error("Failed to fetch colleges:", error);
    }
  };

  fetchStates();
  fetchDistricts();
  fetchCities();
  fetchMedicalSpeciality();

}, [formData.state, formData.district, formData.city, formData.medicalSpecialty]);

  

  const loginApi = async () => {
    const email = await localStorage.getItem("registrationEMail")
    const password = await localStorage.getItem("registrationPassword")
    await loginAxios({
        username: email,
        password: password,
    })
        .then(async (res) => {
            if (res.data.status === "success") {
                await localStorage.setItem(
                    "userDetails",
                    JSON.stringify(res.data.authorisation)
                );
                dispatch(setUserDetails(res?.data?.user));
                navigate(routePath.HOME);
            } else {
                alert()
                Toast.fire({
                    icon: "error",
                    title: "Try to Relogin",
                });
            }
        })
        .catch((err) => {
            console.log(err, "errorMessage");
            Toast.fire({
                icon: "error",
                title: err.response?.data?.message,
            });
        });
}
const handleSubmit = async (event) => {
  event.preventDefault();

  // Check if user selected "Other" and did not choose a medical specialty
  if (selectedTab === "tabOther" && !formData.medicalSpecialty) {
    Toast.fire({
      icon: "error",
      title: "Please select a medical speciality",
    });
    return; // Prevent submission if medical specialty is not selected
  }

  let data = {
    user_id: userId,
    user_type: "Medical Students",
    country_id: selectedTab === "tabIndia" ? 1 : 2,
  };

  if (data.country_id === 2) {
    data = {
      ...data,
      other_city_name: formData.city,
      other_college_name: formData.college
    };
  } else {
    data = {
      ...data,
      state_id: formData.state,
      district_id: formData.district,
      city_id: formData.city,
      medical_speciality_id: formData.medicalSpecialty,
      college_id: formData.college,
    };
  }

  try {
    const res = await updateAddressDetail(data);
    if (res.data.status === "success") {
      Toast.fire({
        icon: "success",
        title: res.data.message,
      });
      loginApi();
    } else {
      Toast.fire({
        icon: "error",
        title: res.data.message,
      });
    }
  } catch (error) {
    console.error("Failed to submit form:", error);
  }
};

  return (
    <Box sx={{ backgroundColor: "#E5F9FF", height: "100%", padding: "35px" }}>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Box component="img" src={Logo} alt="Logo" sx={{ height: "90px", width: "87px" }} />
      </Box>
      <Typography
        mt={4}
        sx={{
          fontSize: "33px",
          fontWeight: "700",
          textAlign: "center",
          color: "#F21F2E",
        }}
      >
        Registration
      </Typography>

      <Box sx={{ marginTop: "20px" }}>
        <Typography
          variant="h5"
          sx={{
            fontSize: "14px",
            fontWeight: "700",
            color: "rgba(34, 34, 34, 0.8)",
            marginLeft: "15px",
            marginBottom: "7px",
          }}
        >
          Address
        </Typography>
        <FormControl sx={{ width: "100%" }}>
          <RadioGroup
            value={selectedTab}
            onChange={(e) => setSelectedTab(e.target.value)}
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: 7,
            }}
          >
            <FormControlLabel
              value="tabIndia"
              control={<CustomRadio />}
              label="India"
              sx={{
                "& .MuiFormControlLabel-label": {
                  fontSize: "16px",
                  color: "rgba(34, 34, 34, 0.6)",
                  fontWeight: "700",
                },
              }}
            />
            <FormControlLabel
              value="tabOther"
              control={<CustomRadio />}
              label="Other"
              sx={{
                "& .MuiFormControlLabel-label": {
                  fontSize: "16px",
                  color: "rgba(34, 34, 34, 0.6)",
                  fontWeight: "700",
                },
              }}
            />
          </RadioGroup>

          {selectedTab === "tabIndia" && (
            <>
              <FormSection
                label="State"
                field="state"
                formData={formData}
                handleInputChange={handleInputChange}
                dropdownOpen={dropdownOpen}
                handleDropdownToggle={handleDropdownToggle}
                options={states}
                valueKey="state_id"
                displayKey="state_name"
              />
              <FormSection
                label="District"
                field="district"
                formData={formData}
                handleInputChange={handleInputChange}
                dropdownOpen={dropdownOpen}
                handleDropdownToggle={handleDropdownToggle}
                options={districts}
                valueKey="district_id"
                displayKey="district"
              />
              <FormSection
                label="City"
                field="city"
                formData={formData}
                handleInputChange={handleInputChange}
                dropdownOpen={dropdownOpen}
                handleDropdownToggle={handleDropdownToggle}
                options={cities}
                valueKey="city_id"
                displayKey="city_name"
              />
              {/* <FormSection
                label="Village"
                field="village"
                formData={formData}
                handleInputChange={handleInputChange}
                dropdownOpen={dropdownOpen}
                handleDropdownToggle={handleDropdownToggle}
                options={villages}
                valueKey="village_id"
                displayKey="village_name"
              /> */}
              <FormSection
                label="Medical Streams"
                field="medicalSpecialty"
                formData={formData}
                handleInputChange={handleInputChange}
                dropdownOpen={dropdownOpen}
                handleDropdownToggle={handleDropdownToggle}
                options={medicalSpecialties}
                valueKey="medical_speciality_id"
                displayKey="medical_speciality_name"
              />
              <FormSection
                label="College"
                field="college"
                formData={formData}
                handleInputChange={handleInputChange}
                dropdownOpen={dropdownOpen}
                handleDropdownToggle={handleDropdownToggle}
                options={collegeList}
                valueKey="college_id"
                displayKey="college_name"
              />
            </>
          )}

          {selectedTab === "tabOther" && (
            <>
              <Box>
              <TextField
        fullWidth
        label="Enter Your City Name"
        variant="outlined"
        name="city" 
        onChange={handleInputChange}
      />
              </Box>
              <FormSection
                label="Medical Specialty"
                field="medicalSpecialty"
                formData={formData}
                handleInputChange={handleInputChange}
                dropdownOpen={dropdownOpen}
                handleDropdownToggle={handleDropdownToggle}
                options={medicalSpecialties}
                valueKey="medical_speciality_id"
                displayKey="medical_speciality_name"
              />
              <Box>
                <Typography
                  variant='h5'
                  sx={{
                      fontSize: "14px",
                      fontWeight: "700",
                      color: "rgba(34, 34, 34, 0.8)",
                      marginLeft: '15px',
                      marginBlock: "7px"
                  }}
                >
                  College
                </Typography>
                <TextField
        fullWidth
        label="Enter Your College Name"
        variant="outlined"
        name="college" 
        onChange={handleInputChange}
      />
              </Box>
            </>
          )}
        </FormControl>
      </Box>

      <Box sx={{ marginTop: "20px" }}>
      <Button variant="contained" fullWidth sx={{ fontSize: "16px", fontWeight: "700" }} onClick={handleSubmit}>
          SUBMIT
        </Button>
      </Box>
    </Box>
  );
};

// Reusable FormSection component for repeated select fields
const FormSection = ({
  label,
  field,
  formData,
  handleInputChange,
  dropdownOpen,
  handleDropdownToggle,
  options = [],
  valueKey,
  displayKey,
}) => (
  <>
    <Typography
      variant="h5"
      sx={{
        fontSize: "14px",
        fontWeight: "700",
        color: "rgba(34, 34, 34, 0.8)",
        marginLeft: "15px",
        marginBlock: "14px",
      }}
    >
      {label}
    </Typography>
    <FormControl fullWidth>
      <InputLabel >{`Select Your ${label}`}</InputLabel>
      <Select
        name={field}
        value={formData[field]}
        onOpen={() => handleDropdownToggle(field, true)}
        onClose={() => handleDropdownToggle(field, false)}
        label={`Select Your ${label}`}
        onChange={handleInputChange}
        IconComponent={(props) => (
          <CustomSelectIcon
            {...props}
            src={dropdownIcon}
            style={{
              transform: dropdownOpen[field] ? "rotate(180deg)" : "rotate(0deg)",
            }}
          />
        )}
      >
        {options.map((option) => (
          <MenuItem key={option[valueKey]} value={option[valueKey]}>
            {option[displayKey]}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  </>
);

export default MedicalStudents;
