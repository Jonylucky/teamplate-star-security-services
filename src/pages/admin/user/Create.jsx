import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from 'axios';

import { no_avatar } from "../../../assets/index";
import Loading from "../../../components/Loading";

import {
  getCountries,
  getProvinces,
  getDistricts,
  getManager,
  getBraches,
  getEducation
} from '../api/locationApi';

const Create = () => {
  const { pathname } = useLocation();
  const [image, setImage] = useState(null);
  const navigate = useNavigate();



  const [loading, setLoading] = useState(false);


  const [countries, setCountries] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [braches, setbraches] = useState([]);
  const [education, setEducation] = useState([]);


  const [manager, setmanager] = useState([]);

  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedProvince, setSelectedProvince] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedmanager, setSelectedmanager] = useState('');
  const [selectedbarch, setSelectedBarch] = useState('');
  const [selectedEducation, setSelectedEducation] = useState('');



  const [errors, setErrors] = useState({});
  const [values, setValues] = useState({

    name: "",
    gender: "",
    birthday: "",
    jobName: "",
    fileName: "",
    address: "",
    phoneNumber: "",
    photo: "ggggg", // Sửa "Photo" thành "photo"
    educationId: "",
    branchId: "",
    provinceId: "",
    countryId: "",
    districtId: "",
    isDirector: "",
    isHeadOfDepartment: "",
    managerId: "",
  });
  useEffect(() => {
    const fetchCountries = async () => {
      const data = await getCountries();
      setCountries(data.$values);
      console.log(data);
    };
    fetchCountries();
  }, []);

  useEffect(() => {
    if (selectedCountry) {
      console.log(selectedCountry)
      const fetchProvinces = async () => {
        const data = await getProvinces(selectedCountry);
        setProvinces(data);
        console.log(data)
        setDistricts([]);
        setSelectedProvince('');
        setSelectedDistrict('');
      };
      fetchProvinces();
    }
  }, [selectedCountry]);

  useEffect(() => {
    if (selectedProvince) {
      const fetchDistricts = async () => {
        const data = await getDistricts(selectedProvince);
        setDistricts(data);

        setSelectedDistrict('');
      };
      fetchDistricts();
    }
  }, [selectedProvince]);
  useEffect(() => {

    const fetchManager = async () => {
      const data = await getManager();
      setmanager(data.$values);


    };
    fetchManager();

  }, []);
  useEffect(() => {

    const fetchEducation = async () => {
      const data = await getEducation();
      setEducation(data.$values);


    };
    fetchEducation();

  }, []);

  useEffect(() => {

    const fetchBraches = async () => {
      const data = await getBraches();
      setbraches(data.$values);


    };
    fetchBraches();

  }, []);
  console.log(manager)
  const handleChangeInput = (e) => {
    const { name, value, files } = e.target;
    if (name === "file") {
      setValues({ ...values, [name]: files[0] });
      setImage(files[0]);
    } else {
      setValues({ ...values, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();



    let newErrors = {};

    // Thực hiện các kiểm tra dữ liệu

    // Các kiểm tra khác nếu cần

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setTimeout(() => setErrors({}), 5000);
      return;
    }

    setErrors({});
    setLoading(true);

    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjEiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoic3RyaW5nIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoidXNlckBleGFtcGxlLmNvbSIsIkVtcGxveWVlSWQiOiI0IiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiRW1wbG95ZWUiLCJleHAiOjE3MjE3OTM5NDUsImlzcyI6Imh0dHBzOi8vbG9jYWxob3N0OjUwMDAiLCJhdWQiOiJodHRwczovL2xvY2FsaG9zdDo1MDAwIn0.PpMrv4--eNar_B3vH9OJc2LkMzPDiAlUt9h6T8rYLnU'; // Thay thế bằng token thực tế
    const apiUrl = 'http://localhost:5000/api/Employee/api/insert';

    const formData = new FormData();
    formData.append('files', values.file); // Thêm tệp vào FormData
    formData.append('name', values.name);
    formData.append('gender', values.gender);
    formData.append('birthday', values.birthday);
    formData.append('jobName', values.jobName);
    formData.append('fileName', values.fileName);
    formData.append('address', values.address);
    formData.append('phoneNumber', values.phoneNumber);
    formData.append('photo', "llll");
    formData.append('educationId', selectedEducation);
    formData.append('branchId', selectedbarch);
    formData.append('provinceId', selectedCountry);
    formData.append('districtId', selectedDistrict);
    formData.append('isDirector', values.isDirector);
    formData.append('isHeadOfDepartment', values.isHeadOfDepartment);
    formData.append('managerId', selectedmanager);
    formData.append('countryId', selectedCountry);

    console.log(formData)

    try {
      const response = await axios.post(apiUrl, formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      setValues({
        file: "",
        Name: "",
        Gender: "",
        Birthday: "",
        JobName: "",
        FileName: "",
        Address: "",
        PhoneNumber: "",
        Photo: "gggggg",
        EducationId: "",
        BranchId: "",
        ProvinceId: "",
        DistrictId: "",
        IsDirector: "",
        IsHeadOfDepartment: "",
        ManagerId: "",
        countryId: "",
      });
      console.log(values)
      toast.success("Create user successfully.");
      navigate("/dashboard/users");
    } catch (error) {
      setErrors({
        apiError: error.response?.data || error.message,
      });
      setTimeout(() => setErrors({}), 5000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <Loading />}

      <div className="flex flex-col gap-5 mt-5">
        <div className="flex items-center justify-between">
          <div className="font-semibold text-xl capitalize">
            {pathname.split("/").pop()}
          </div>
          <Link to="/dashboard/users">
            <button className="px-3 py-2 bg-blue-950 text-white rounded-md">
              Back to List
            </button>
          </Link>
        </div>
        <div className="grid grid-cols-1 p-2 sm:p-5 bg-gray-100 rounded-md">
          {errors && errors.apiError && (
            <div className="p-4 my-2 text-sm text-red-700 rounded-lg bg-red-100" role="alert">
              <span className="font-bold">Error: </span>
              {errors.apiError}
            </div>
          )}
          <form className="grid grid-cols-1 sm:grid-cols-12 gap-4 p-3" onSubmit={handleSubmit}>
            <div className="sm:col-span-4 flex flex-col items-center justify-center">
              <label>
                <img
                  className="h-[10rem] w-[10rem] object-cover rounded-full"
                  src={image ? URL.createObjectURL(image) : no_avatar}
                  alt="Current profile photo"
                />
                <input
                  type="file"
                  name="file"

                  className="hidden"
                  onChange={handleChangeInput}
                />
              </label>
              {errors.file && (
                <span className="text-red-700">{errors.file}</span>
              )}
            </div>
            <div className="sm:col-span-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 mb-3 sm:mb-4">
                <label className="block">
                  <span className="block font-medium text-primary">Name:</span>
                  <input
                    type="text"
                    className="px-3 py-2 border shadow-sm border-primary placeholder-slate-400 focus:outline-none block w-full rounded-lg sm:text-sm"
                    placeholder="Enter name"
                    name="name"
                    value={values.name}
                    onChange={handleChangeInput}
                  />
                  {errors.name && (
                    <span className="text-red-700">{errors.name}</span>
                  )}
                </label>
                <label className="block">
                  <span className="block font-medium text-primary">Gender:</span>
                  <select
                    name="gender"
                    value={values.gender}
                    onChange={handleChangeInput}
                    className="px-3 py-2 border shadow-sm border-primary placeholder-slate-400 focus:outline-none block w-full rounded-lg sm:text-sm"
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                  {errors.gender && (
                    <span className="text-red-700">{errors.gender}</span>
                  )}
                </label>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 mb-3 sm:mb-4">
                <label className="block">
                  <span className="block font-medium text-primary">Birthday:</span>
                  <input
                    type="date"
                    className="px-3 py-2 border shadow-sm border-primary placeholder-slate-400 focus:outline-none block w-full rounded-lg sm:text-sm"
                    name="birthday"
                    value={values.birthday}
                    onChange={handleChangeInput}
                  />
                  {errors.birthday && (
                    <span className="text-red-700">{errors.birthday}</span>
                  )}
                </label>
                <label className="block">
                  <span className="block font-medium text-primary">Job Name:</span>
                  <input
                    type="text"
                    className="px-3 py-2 border shadow-sm border-primary placeholder-slate-400 focus:outline-none block w-full rounded-lg sm:text-sm"
                    placeholder="Enter job name"
                    name="jobName"
                    value={values.jobName}
                    onChange={handleChangeInput}
                  />
                  {errors.jobName && (
                    <span className="text-red-700">{errors.jobName}</span>
                  )}
                </label>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 mb-3 sm:mb-4">
                <label className="block">
                  <span className="block font-medium text-primary">File Name:</span>
                  <input
                    type="text"
                    className="px-3 py-2 border shadow-sm border-primary placeholder-slate-400 focus:outline-none block w-full rounded-lg sm:text-sm"
                    placeholder="Enter file name"
                    name="fileName"
                    value={values.fileName}
                    onChange={handleChangeInput}
                  />
                  {errors.fileName && (
                    <span className="text-red-700">{errors.fileName}</span>
                  )}
                </label>
                <label className="block">
                  <span className="block font-medium text-primary">Address:</span>
                  <input
                    type="text"
                    className="px-3 py-2 border shadow-sm border-primary placeholder-slate-400 focus:outline-none block w-full rounded-lg sm:text-sm"
                    placeholder="Enter address"
                    name="address"
                    value={values.address}
                    onChange={handleChangeInput}
                  />
                  {errors.address && (
                    <span className="text-red-700">{errors.address}</span>
                  )}
                </label>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 mb-3 sm:mb-4">
                <label className="block">
                  <span className="block font-medium text-primary">Phone Number:</span>
                  <input
                    type="text"
                    className="px-3 py-2 border shadow-sm border-primary placeholder-slate-400 focus:outline-none block w-full rounded-lg sm:text-sm"
                    placeholder="Enter phone number"
                    name="phoneNumber"
                    value={values.phoneNumber}
                    onChange={handleChangeInput}
                  />
                  {errors.phoneNumber && (
                    <span className="text-red-700">{errors.phoneNumber}</span>
                  )}
                </label>
                <label className="block">
                  <span className="block font-medium text-primary">Education ID:</span>

                  <select
                    className="px-3 py-2 border shadow-sm border-primary placeholder-slate-400 focus:outline-none block w-full rounded-lg sm:text-sm"

                    onChange={(e) => setSelectedEducation(e.target.value)}
                  >
                    <option value="">Select Country</option>
                    {education.map((ed, index) => (
                      <option key={index} value={ed.Id}>{ed.Name}</option>
                    ))}
                  </select>

                  {errors.educationId && (
                    <span className="text-red-700">{errors.educationId}</span>
                  )}
                </label>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 mb-3 sm:mb-4">
                <label className="block">
                  <span className="block font-medium text-primary">CountryId:</span>
                  <select
                    className="px-3 py-2 border shadow-sm border-primary placeholder-slate-400 focus:outline-none block w-full rounded-lg sm:text-sm"

                    onChange={(e) => setSelectedCountry(e.target.value)}
                  >
                    <option value="">Select Country</option>
                    {countries.map((country, index) => (
                      <option key={index} value={country.Id}>{country.Name}</option>
                    ))}
                  </select>
                  {errors.address && (
                    <span className="text-red-700">{errors.countryId}</span>
                  )}
                </label>

              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 mb-3 sm:mb-4">
                <label className="block">
                  <span className="block font-medium text-primary">Branch ID:</span>
                  <select
                    className="px-3 py-2 border shadow-sm border-primary placeholder-slate-400 focus:outline-none block w-full rounded-lg sm:text-sm"

                    onChange={(e) => setSelectedBarch(e.target.value)}

                  >
                    <option value="">Select Brache</option>
                    {braches.map(brach => (
                      <option key={brach.id} value={brach.Id}>{brach.Name}</option>
                    ))}
                  </select>
                  {errors.branchId && (
                    <span className="text-red-700">{errors.branchId}</span>
                  )}
                </label>
                <label className="block">
                  <span className="block font-medium text-primary">Province ID:</span>
                  <select
                    className="px-3 py-2 border shadow-sm border-primary placeholder-slate-400 focus:outline-none block w-full rounded-lg sm:text-sm"

                    onChange={(e) => setSelectedProvince(e.target.value)}
                    disabled={!selectedCountry}
                  >
                    <option value="">Select Province</option>
                    {provinces.map(province => (
                      <option key={province.id} value={province.id}>{province.nameCity}</option>
                    ))}
                  </select>
                  {errors.provinceId && (
                    <span className="text-red-700">{errors.provinceId}</span>
                  )}
                </label>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 mb-3 sm:mb-4">
                <label className="block">
                  <span className="block font-medium text-primary">District ID:</span>
                  <select
                    className="px-3 py-2 border shadow-sm border-primary placeholder-slate-400 focus:outline-none block w-full rounded-lg sm:text-sm"

                    onChange={(e) => setSelectedDistrict(e.target.value)}
                    disabled={!selectedProvince}
                  >
                    <option value="">Select District</option>
                    {districts.map(district => (
                      <option key={district.id} value={district.id}>{district.nameDistrict}</option>
                    ))}
                  </select>
                  {errors.districtId && (
                    <span className="text-red-700">{errors.districtId}</span>
                  )}
                </label>
                <label className="block">
                  <span className="block font-medium text-primary">Is Director:</span>
                  <select
                    name="isDirector"
                    value={values.isDirector}
                    onChange={handleChangeInput}
                    className="px-3 py-2 border shadow-sm border-primary placeholder-slate-400 focus:outline-none block w-full rounded-lg sm:text-sm"
                  >
                    <option value="">Select Option</option>
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                  </select>
                  {errors.isDirector && (
                    <span className="text-red-700">{errors.isDirector}</span>
                  )}
                </label>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 mb-3 sm:mb-4">
                <label className="block">
                  <span className="block font-medium text-primary">Is Head Of Department:</span>
                  <select
                    name="isHeadOfDepartment"
                    value={values.isHeadOfDepartment}
                    onChange={handleChangeInput}
                    className="px-3 py-2 border shadow-sm border-primary placeholder-slate-400 focus:outline-none block w-full rounded-lg sm:text-sm"
                  >
                    <option value="">Select Option</option>
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                  </select>
                  {errors.isHeadOfDepartment && (
                    <span className="text-red-700">{errors.isHeadOfDepartment}</span>
                  )}
                </label>
                <label className="block">
                  <span className="block font-medium text-primary">Manager ID:</span>
                  <select
                    className="px-3 py-2 border shadow-sm border-primary placeholder-slate-400 focus:outline-none block w-full rounded-lg sm:text-sm"

                    onChange={(e) => setSelectedmanager(e.target.value)}
                    disabled={!selectedProvince}
                  >
                    <option value="">Select Manager</option>
                    {manager.map(manager => (
                      <option key={manager.id} value={manager.Id}>{manager.Name}</option>
                    ))}
                  </select>
                  {errors.managerId && (
                    <span className="text-red-700">{errors.managerId}</span>
                  )}
                </label>
              </div>
              <button
                type="submit"
                className="px-3 py-2 bg-blue-950 text-white rounded-md"
              >
                Create
              </button>
            </div>
          </form>
        </div>
      </div>

    </>
  );
};

export default Create;
