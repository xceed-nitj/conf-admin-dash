import React, { useState, useEffect } from "react";
import axios from 'axios'
import LoadingIcon from "../components/LoadingIcon";

import { useParams } from "react-router-dom";
const Participants = () => {
    const params = useParams();
    const IdConf = params.confid;
    const initialData={
        "ConfId": IdConf,
        "authorName": "",
        "authorDesignation": "",
        "authorInstitute": "",
        "paperTitle": "",
        "paperId": "",
        
    }
    const [formData, setFormData] = useState(initialData);

    const [editID, setEditID] = useState()
    const [loading, setLoading] = useState(false);

    const [data, setData] = useState([]);
    const [refresh, setRefresh] = useState(0)

    const { ConfId, authorName, authorDesignation, authorInstitute, paperTitle, paperId } = formData;

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post(`${import.meta.env.VITE_API_URL}/participant`, formData, {
            headers: {
                Authorization: import.meta.env.VITE_API_KEY
            }
        })
            .then(res => {
                setData([...data, res.data]);
                setFormData(initialData); setRefresh(refresh + 1)

            })
            .catch(err => console.log(err));

    };

    const handleUpdate = () => {

        axios.put(`${import.meta.env.VITE_API_URL}/participant/${editID}`, formData, {
            headers: {
                Authorization: import.meta.env.VITE_API_KEY
            }
        })
            .then(res => {
                setFormData(initialData);
                setRefresh(refresh + 1)
            })
            .catch(err => console.log(err))


    };

    const handleDelete = (deleteID) => {

        axios.delete(`${import.meta.env.VITE_API_URL}/participant/${deleteID}`, {
            headers: {
                Authorization: import.meta.env.VITE_API_KEY
            }
        })
            .then(res => {
                console.log('DELETD RECORD::::', res)
                setRefresh(refresh + 1)


            })
            .catch(err => console.log(err))
    };

    const handleEdit = (editIDNotState) => {
        axios.get(`${import.meta.env.VITE_API_URL}/participant/${editIDNotState}`, {
            headers: {
                Authorization: import.meta.env.VITE_API_KEY
            }
        })

            .then(res => {
                setFormData(res.data)

            })
            .catch(err => console.log(err))
    };

    useEffect(() => {
setLoading(true)
        axios.get(`${import.meta.env.VITE_API_URL}/participant/conf/${IdConf}`, {
            headers: {
                Authorization: import.meta.env.VITE_API_KEY
            }
        })
            .then(res => {
                setData(res.data)
            })
            .catch(err => console.log(err))
            .finally(() => setLoading(false));

    }, [refresh]);

    return (
                <main className='py-10 bg-gray-100 lg:pl-72 min-h-screen'>
            <div className='px-4 sm:px-6 lg:px-8'>

                <div className="block box-border" >

                    <form className=" bg-blue-100 shadow-md rounded px-8 pt-6 pb-8 m-10 " autoComplete='off' onSubmit={handleSubmit}>
                        <div className="text-blue-700 text-[28px] font-serif mx-auto my-auto grid place-content-center" >Add a New Participant</div>
                        <label className="block text-gray-700 text-lg ml-1  font-bold " >Name</label>
                        <input type="text" name="authorName" required value={authorName} onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-1 mb-2 px-3 text-blue-500   leading-tight    focus:outline-none focus:shadow-outline" />

                        <label className="block text-gray-700 text-lg ml-1 font-bold ">Designation</label>
                        <input type="text" name="authorDesignation" required value={authorDesignation} onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-1 mb-2 px-3 text-blue-500   leading-tight    focus:outline-none focus:shadow-outline" />

                        <label className="block text-gray-700 text-lg ml-1 font-bold ">Institute</label>
                        <input type="text" name="authorInstitute" required value={authorInstitute} onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-1 mb-2 px-3 text-blue-500   leading-tight    focus:outline-none focus:shadow-outline" />

                        <label className="block text-gray-700 text-lg ml-1 font-bold ">Paper Title</label>
                        <input type="text" name="paperTitle" required value={paperTitle} onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-1 mb-2 px-3 text-blue-500   leading-tight    focus:outline-none focus:shadow-outline" />

                        <label className="block text-gray-700 text-lg ml-1 font-bold ">Paper Id</label>
                        <input type="text" name="paperId" required value={paperId} onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-1 mb-2 px-3 text-blue-500   leading-tight    focus:outline-none focus:shadow-outline" />

                       


                        <div className="flex justify-evenly">
                            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Add </button>
                            <button type="submit" onClick={() => {
                                handleUpdate()
                            }} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                                Update 
                            </button>
                        </div>

                    </form>

                    <hr />

                    <div className="shadow-md   m-10 ali">
                        <div className="text-black-700 text-[28px] font-serif mx-auto my-auto grid place-content-center" >Added Participants</div>
                        {loading ? (
                        <LoadingIcon />
                    ) : (
                        <table className="min-w-full border-collapse box-border " >
                            <thead>
                                <tr className="border-[2px] bg-blue-100  border-blue-500">
                                    <th className="p-1 text-center">Name of Participant</th>
                                    <th className="p-1 text-center">Designation</th>
                                    <th className="p-1 text-center">Institute</th>
                                    <th className="p-1 text-center">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.length>0?data.map((item, index) => (
                                    <tr key={index} className="border-[1px] font-serif border-blue-500">
                                        <td className="p-1 text-center">{item.authorName}</td>
                                        <td className="p-1 text-center">{item.authorDesignation}</td>
                                        <td className="p-1 text-center">{item.authorInstitute}</td>

                                        <td className="p-1 text-center  flex justify-evenly">
                                            <button onClick={() => {
                                                handleEdit(item.id)
                                                setEditID(item.id)
                                            }} className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold px-4 rounded focus:outline-none focus:shadow-outline"> Edit </button>{" "}
                                            <button onClick={() => handleDelete(item.id)} className="bg-red-500 hover:bg-red-700 text-white font-bold  px-4 rounded focus:outline-none focus:shadow-outline"> Delete </button>
                                        </td>
                                    </tr>)): (
                                    <tr>                                        
                                        <td colSpan="5" className="p-1 text-center">No data available</td>
                                    </tr>

                                )}
                            </tbody>
                        </table>
                        )}

                    </div>
                </div>
            </div>
        </main>

    );
};

export default Participants;