import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { SignUp } from './Auth/SignUp';


const Home = () => {
  const [data, setData] = useState([]);
  const { id } = useParams();
  const [message, setMessage] = useState("");
  const [AllSU, setAllSU] = useState([]);
  const [Open, setOpen] = useState(false);
  const [OpenOrg, setOpenOrg] = useState(false);
  const [Org, setOrg] = useState([]);

  const api = `http://localhost:5001/api/contect/spanal/${id}`

  const userList = `http://localhost:5001/api/contect/AllSu`

  const OrgList_Api = "http://localhost:5001/api/contect/listorg"
  const createOrgApi="http://localhost:5001/api/contect/neworg"


 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(api, {
          headers: { "Authorization": `Bearer ${token}` }
        });
        const jsonData = await res.json();
        console.log(jsonData);
        setData(jsonData);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);



  useEffect(() => {
    const List = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(userList, {
          headers: { "Authorization": `Bearer ${token}` }
        });
        const data = await res.json()
        setAllSU(data)
        console.log(data)
      } catch (error) {
        console.log("Error:", error)
      }

    }
    List()

  }, [])

    
  const fetchOrgs = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(OrgList_Api, {
        headers: { "Authorization": `Bearer ${token}` }
      });
      const data = await res.json()
      setOrg(data)
    } catch (error) {
      console.log("Error:",error)
    }
  }

  useEffect(() => {
     fetchOrgs()
  }, [])

  const [OrgName, setOrgName] = useState("")
  const handleCreateOrg = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(createOrgApi, { 
        method: "POST", 
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }, 
        body: JSON.stringify({ Org_Name: OrgName }) 
      });
      const data = await res.json()

      if (res.ok) {
        setOrgName("")
        alert("Organization created successfully!")
        setOpenOrg(false)
        fetchOrgs()   
      } else {
        alert(data.message || data.error || "Failed to create organization")
      }
    } catch (error) {
      console.log("Error:", error)
      alert("Network Error!")
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-900 p-8 font-sans text-slate-100 flex items-center justify-center">

      <div className=" flex flex-col md:flex-row bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl w-full max-w-5xl p-10 border border-white/20 relative overflow-hidden">
        <div className="flex-1">

          
          <div className="absolute -top-32 -right-32 w-64 h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob"></div>
          <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>

          <div className="relative z-10">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
              <div className="space-y-4">
                <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400 tracking-tight">
                  Welcome, {data?.Name || 'User'}!
                </h1>
                <div className="space-y-2 text-slate-300 bg-white/5 p-6 rounded-2xl border border-white/10">
                  <p className="flex items-center gap-3"><span className="font-semibold text-white">Email:</span> {data?.Email}</p>
                  <p className="flex items-center gap-3"><span className="font-semibold text-white">Role:</span> <span className="px-3 py-1 bg-indigo-500/20 text-indigo-300 rounded-full text-sm font-medium border border-indigo-500/30">{data?.Roll}</span></p>
                </div>
              </div>

            </div>
          </div>

            
          <div className="flex justify-left gap-3 ">
            <button className='py-3 px-4 bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-bold rounded-xl hover:from-purple-600 hover:to-indigo-700 hover:shadow-[0_0_20px_rgba(168,85,247,0.4)] transition-all duration-300 transform hover:-translate-y-1 mt-6' onClick={() => setOpen(true)}>Create New Super Admin</button>
          </div>


          
          <div className=''>
            <button className='py-3 px-4 bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-bold rounded-xl hover:from-purple-600 hover:to-indigo-700 hover:shadow-[0_0_20px_rgba(168,85,247,0.4)] transition-all duration-300 transform hover:-translate-y-1 mt-6' onClick={() => setOpenOrg(true)}>Create New Organization</button>
          </div>

            
        </div>
        <div className="flex-1 mt-10 md:mt-0 md:ml-10 border-t md:border-t-0 md:border-l border-white/20 pt-10 md:pt-0 md:pl-10">
          <div className='text-center md:text-left'>
            <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400 tracking-tight mb-6">All Users</h2>
            <div className="flex flex-col gap-3 max-h-[350px] overflow-y-auto pr-2 custom-scrollbar">
              {AllSU.map((item, index) => (
                item._id !== id ? (
                  <div key={index} className="flex items-center gap-4 p-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all duration-300 group hover:shadow-[0_0_15px_rgba(168,85,247,0.2)]">
                    <div className="w-12 h-12 flex-shrink-0 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-xl font-bold text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
                      {item.Name ? item.Name.charAt(0).toUpperCase() : 'U'}
                    </div>
                    <div className="text-left flex-1 min-w-0">
                      <h3 className="text-lg font-bold text-white group-hover:text-purple-300 transition-colors truncate">{item.Name}</h3>
                      <p className="text-sm text-indigo-300 font-medium truncate">{item.Email}</p>
                    </div>
                  </div>
                ) : null
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className='w-full mt-10 bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl  max-w-5xl p-10 border border-white/20 relative overflow-hidden'>
        <div className='text-center md:text-left mb-8'>
          <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400 tracking-tight">Organizations</h2>
        </div>


        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
          {Org.map((item, key) => (
            <div key={key} className='flex items-center gap-5 bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 group hover:shadow-[0_0_20px_rgba(168,85,247,0.2)] hover:-translate-y-1 cursor-pointer'>
              <div className="w-14 h-14 flex-shrink-0 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <div className='flex flex-col min-w-0'>
                <h3 className='text-xl font-bold text-white group-hover:text-purple-300 transition-colors truncate'>{item.Org_Name}</h3>
                <p className='text-sm text-indigo-300/80 font-medium truncate mt-1'>ID: {item.Org_ID}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

  
      <SignUp
        isOpen={Open}
        onClose={() => setOpen(false)}
      />

    
      <AddOrg
        isOpen={OpenOrg}
        onClose={() => setOpenOrg(false)}
        OrgName={OrgName}
        setOrgName={setOrgName}
        handleCreateOrg={handleCreateOrg}
      />


    </div>
  );
}
export default Home;

export function AddOrg({ isOpen, onClose, OrgName, setOrgName, handleCreateOrg }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm">
      <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl w-full max-w-md p-8 border border-white/20 relative overflow-hidden">

   
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-50"></div>
        <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-50"></div>

   
        <button onClick={onClose} type="button" className="absolute top-4 right-4 text-slate-300 hover:text-white transition-colors z-20">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="relative z-10">
          <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg">
            <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <h2 className="text-3xl font-extrabold text-white text-center mb-2 tracking-tight">New Organization</h2>
          <p className="text-slate-400 text-center text-sm mb-8">Enter a name for the new organization</p>

          <div className="space-y-2">
            <label htmlFor="orgName" className="block text-sm font-medium text-slate-300">Organization Name</label>
            <input
              type="text"
              id="orgName"
              value={OrgName}
              onChange={(e) => setOrgName(e.target.value)}
              placeholder="e.g. Food Court, Mall..."
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 text-white placeholder-slate-400 transition-all"
            />
          </div>

          <button
            type="button"
            onClick={handleCreateOrg}
            className="w-full py-3 px-4 bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-bold rounded-xl hover:from-purple-600 hover:to-indigo-700 hover:shadow-[0_0_20px_rgba(168,85,247,0.4)] transition-all duration-300 transform hover:-translate-y-1 mt-6"
          >
            Create Organization
          </button>
        </div>
      </div>
    </div>
  );
}
