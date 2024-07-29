import axios from 'axios';

export const getCountries = async () => {
    const response = await axios.get('http://localhost:5000/api/Country/all');
    return response.data;
};

export const getProvinces = async (countryId) => {
    const response = await axios.get(`http://localhost:5000/api/ProvinCe/ShowProvinceByCountry?id=${countryId}`);
    return response.data;
};

export const getDistricts = async (provinceId) => {
    const response = await axios.get(`http://localhost:5000/api/District/ShowDistrictByProvince?id=${provinceId}`);
    return response.data;
};
export const getManager = async () => {
    const response = await axios.get(`http://localhost:5000/api/Manage/all`);
    return response.data;
};
export const getBraches = async () => {
    const response = await axios.get(`http://localhost:5000/api/Brach/all`);
    return response.data;
};
export const getEducation = async () => {
    const response = await axios.get(`http://localhost:5000/api/Education/all`);
    return response.data;
};