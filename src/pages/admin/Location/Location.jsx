// Location.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Location = () => {
    const [countries, setCountries] = useState([]);
    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);

    const [newCountryName, setNewCountryName] = useState('');

    const [newProvinceName, setNewProvinceName] = useState('');
    const [newProvinceType, setNewProvinceType] = useState('');


    const [newDistrictName, setNewDistrictName] = useState('');
    const [newDistrictType, setNewDistrictType] = useState('');



    const [selectedCountryId, setSelectedCountryId] = useState(null);
    const [selectedProvinceId, setSelectedProvinceId] = useState(null);

    console.log(selectedProvinceId);
    console.log(selectedCountryId)
    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/Country/all');
                setCountries(response.data.$values || []);
            } catch (error) {
                console.error('Error fetching countries:', error);
            }
        };

        const fetchProvinces = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/ProvinCe/all');
                setProvinces(response.data.$values || []);
                console.log(response.data.$values)
            } catch (error) {
                console.error('Error fetching provinces:', error);
            }
        };

        const fetchDistricts = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/District/all');
                setDistricts(response.data.$values || []);
            } catch (error) {
                console.error('Error fetching districts:', error);
            }
        };

        fetchCountries();
        fetchProvinces();
        fetchDistricts();
    }, []);

    useEffect(() => {
        if (selectedCountryId) {
            const fetchProvinces = async () => {
                try {
                    const response = await fetch(`http://localhost:5000/api/ProvinCe/ShowProvinceByCountry?id=${selectedCountryId}`);
                    const data = await response.json();
                    console.log(data)
                    setProvinces(data || []);
                } catch (error) {
                    console.error('Error fetching provinces:', error);
                }
            };

            fetchProvinces();
        }
    }, [selectedCountryId]);
    const handleAddCountry = async () => {
        try {
            const response = await axios.post('http://localhost:5000/api/Country/add', { name: newCountryName });
            setCountries([...countries, response.data]);
            setNewCountryName('');
        } catch (error) {
            console.error('Error adding country:', error);
        }
    };

    const handleAddProvince = async () => {
        if (selectedCountryId) {
            try {
                const response = await axios.post('http://localhost:5000/api/ProvinCe/add', {
                    nameCity: newProvinceName,
                    type: newProvinceType,

                    countryId: selectedCountryId
                });
                const updatedCountries = countries.map(country => {
                    if (country.Id === selectedCountryId) {
                        return { ...country, provinces: [...(country.provinces || []), response.data] };
                    }
                    return country;
                });
                setCountries(updatedCountries);
                setNewProvinceName('');
                setNewProvinceType('');

            } catch (error) {
                console.error('Error adding province:', error);
            }
        }
    };
    const handleAddDistrict = async () => {
        if (selectedCountryId && selectedProvinceId) {
            try {
                const response = await axios.post('http://localhost:5000/api/District/add', {
                    NameDistrict: newDistrictName,
                    type: newDistrictType,
                    provinceId: selectedProvinceId
                });


                setNewDistrictName('');
                setNewDistrictType('');


            } catch (error) {
                console.error('Error adding district:', error);
            }
        }
    };

    return (
        <div className="p-6 bg-gray-100 rounded-lg shadow-md">
            <h1 className="text-2xl font-semibold mb-4">Location Manager</h1>

            {/* Add Country */}
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Add Country"
                    value={newCountryName}
                    onChange={(e) => setNewCountryName(e.target.value)}
                    className="px-3 py-2 border border-primary shadow-sm rounded-lg focus:outline-none block w-full sm:text-sm placeholder-slate-400"
                />
                <button
                    onClick={handleAddCountry}
                    className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none"
                >
                    Add Country
                </button>
            </div>

            {/* Select Country */}
            <div className="mb-4">
                <h2 className="text-xl font-semibold mb-2">Select Country</h2>
                <select
                    onChange={(e) => {
                        const selectedId = e.target.value;
                        setSelectedCountryId(selectedId ? parseInt(selectedId, 10) : null);
                    }}
                    className="px-3 py-2 border border-primary shadow-sm rounded-lg focus:outline-none block w-full sm:text-sm"
                >
                    <option value="">Select a country</option>
                    {countries.map((country, index) => (
                        <option key={index} value={country.Id}>{country.Name}</option>
                    ))}
                </select>
            </div>

            {/* Add Province */}
            {selectedCountryId && (
                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Add Province Name"
                        value={newProvinceName}
                        onChange={(e) => setNewProvinceName(e.target.value)}
                        className="px-3 py-2 border border-primary shadow-sm rounded-lg focus:outline-none block w-full sm:text-sm placeholder-slate-400"
                    />
                    <input
                        type="text"
                        placeholder="Add Province Type"
                        value={newProvinceType}
                        onChange={(e) => setNewProvinceType(e.target.value)}
                        className="mt-2 px-3 py-2 border border-primary shadow-sm rounded-lg focus:outline-none block w-full sm:text-sm placeholder-slate-400"
                    />

                    <button
                        onClick={handleAddProvince}
                        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none"
                    >
                        Add Province
                    </button>
                </div>
            )}

            {/* Select Province */}
            {selectedCountryId && provinces.length > 0 && (
                <div className="mb-4">
                    <h2 className="text-xl font-semibold mb-2">Select Province</h2>
                    <select
                        onChange={(e) => setSelectedProvinceId(e.target.value)}
                        className="px-3 py-2 border border-primary shadow-sm rounded-lg focus:outline-none block w-full sm:text-sm"
                    >
                        <option value="">Select a province</option>
                        {provinces.map((province, index) => (
                            <option key={index} value={province.id}>{province.nameCity}</option>
                        ))}
                    </select>
                </div>
            )}

            {/* Add District */}
            {selectedCountryId && selectedProvinceId && (
                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Add District Name"
                        value={newDistrictName}
                        onChange={(e) => setNewDistrictName(e.target.value)}
                        className="px-3 py-2 border border-primary shadow-sm rounded-lg focus:outline-none block w-full sm:text-sm placeholder-slate-400"
                    />
                    <input
                        type="text"
                        placeholder="Add District Type"
                        value={newDistrictType}
                        onChange={(e) => setNewDistrictType(e.target.value)}
                        className="mt-2 px-3 py-2 border border-primary shadow-sm rounded-lg focus:outline-none block w-full sm:text-sm placeholder-slate-400"
                    />

                    <button
                        onClick={handleAddDistrict}
                        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none"
                    >
                        Add District
                    </button>
                </div>
            )}

            {/* Display Data */}
            <div className="mt-6">
                <h2 className="text-xl font-semibold mb-2">Data Overview</h2>
                {countries.map((country, countryIndex) => (
                    <div key={countryIndex} className="mb-4 p-4 bg-white rounded-lg shadow-md">
                        <h3 className="text-lg font-semibold mb-2">{country.Name}</h3>
                        {country.provinces?.map((province, provinceIndex) => (
                            <div key={provinceIndex} className="pl-4 mb-2">
                                <h4 className="text-md font-semibold mb-1">{province.nameCity}</h4>
                                <p className="text-sm">Type: {province.type}</p>
                                <p className="text-sm">Matp: {province.matp}</p>
                                <ul className="list-disc pl-5">
                                    {province.districts?.map((district, districtIndex) => (
                                        <li key={districtIndex} className="text-sm">
                                            <p>Name: {district.name}</p>
                                            <p>Type: {district.type}</p>
                                            <p>Matp: {district.matp}</p>
                                            <p>Maqh: {district.maqh}</p>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Location;
