import React, { useState } from 'react';
import { useAuction } from '../context/AuctionContext';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const { registerTeam, teams } = useAuction();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    department: '',
    members: ['', '', '', '']
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    registerTeam({
        name: formData.name,
        email: formData.email,
        department: formData.department,
        members: formData.members.filter(m => m !== '')
    });
    setSubmitted(true);
    setTimeout(() => {
        setSubmitted(false);
        setFormData({ name: '', email: '', department: '', members: ['', '', '', ''] });
    }, 3000);
  };

  const handleMemberChange = (index: number, value: string) => {
      const newMembers = [...formData.members];
      newMembers[index] = value;
      setFormData({...formData, members: newMembers});
  };

  return (
    <div className="grid md:grid-cols-2 gap-12 items-center">
      <div className="space-y-6">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight">
          BUILD YOUR <br />
          <span className="text-transparent bg-clip-text gold-gradient">DREAM TEAM</span>
        </h1>
        <p className="text-xl text-gray-300">
          The ultimate college cricket auction experience. Register your team, strategize your budget, and bid for the best players to win the championship.
        </p>
        <div className="flex space-x-4">
            <div className="bg-slate-800 p-4 rounded-lg border border-white/10 text-center">
                <span className="block text-3xl font-bold text-white">{teams.length}</span>
                <span className="text-sm text-gray-400">Teams Registered</span>
            </div>
            <div className="bg-slate-800 p-4 rounded-lg border border-white/10 text-center">
                <span className="block text-3xl font-bold text-white">₹100Cr</span>
                <span className="text-sm text-gray-400">Virtual Budget</span>
            </div>
        </div>
      </div>

      <div className="glass-panel p-8 rounded-2xl shadow-2xl">
        {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
            <h2 className="text-2xl font-bold mb-6 border-b border-white/10 pb-2">Team Registration</h2>
            
            <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Team Name</label>
                <input 
                    required
                    type="text" 
                    className="w-full bg-slate-900 border border-slate-700 rounded p-3 focus:border-iplGold focus:outline-none"
                    placeholder="e.g. Royal Challengers CSE"
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Department / Year</label>
                    <input 
                        required
                        type="text" 
                        className="w-full bg-slate-900 border border-slate-700 rounded p-3 focus:border-iplGold focus:outline-none"
                        placeholder="CSE - 3rd Year"
                        value={formData.department}
                        onChange={e => setFormData({...formData, department: e.target.value})}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Contact Email</label>
                    <input 
                        required
                        type="email" 
                        className="w-full bg-slate-900 border border-slate-700 rounded p-3 focus:border-iplGold focus:outline-none"
                        placeholder="team@college.edu"
                        value={formData.email}
                        onChange={e => setFormData({...formData, email: e.target.value})}
                    />
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Team Members (Max 4)</label>
                <div className="grid grid-cols-2 gap-3">
                    {formData.members.map((member, idx) => (
                        <input 
                            key={idx}
                            required={idx === 0}
                            type="text" 
                            className="bg-slate-900 border border-slate-700 rounded p-2 text-sm focus:border-iplGold focus:outline-none"
                            placeholder={`Member ${idx + 1}`}
                            value={member}
                            onChange={e => handleMemberChange(idx, e.target.value)}
                        />
                    ))}
                </div>
            </div>

            <button type="submit" className="w-full gold-gradient text-black font-bold py-4 rounded-lg hover:brightness-110 transition-all transform hover:scale-[1.01] mt-4">
                REGISTER TEAM
            </button>
            </form>
        ) : (
            <div className="text-center py-12">
                <i className="fas fa-check-circle text-6xl text-green-500 mb-4"></i>
                <h2 className="text-2xl font-bold text-white mb-2">Registration Successful!</h2>
                <p className="text-gray-400">Your team has been submitted for approval by the admin.</p>
                <button onClick={() => setSubmitted(false)} className="mt-6 text-iplGold hover:underline">Register another team</button>
            </div>
        )}
      </div>
    </div>
  );
};

export default Home;