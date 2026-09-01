import React, { useState } from "react";
import { useApp } from "../../context/AppContext.jsx";
import { UserCheck, Plus, Search, Phone, Mail, MapPin, CheckCircle, X } from "lucide-react";
import { StatusBadge } from "../common/StatusBadge.jsx";

export const Page11StateNodalOfficers = () => {
  const [officers, setOfficers] = useState([
    {
      id: "OFF-01",
      name: "Shri Rajesh M. Patel, IAS",
      designation: "District Collector & District Magistrate",
      district: "Anand",
      state: "Gujarat",
      mobile: "+91 98250 11223",
      email: "collector-anand@nic.in",
      activeProjects: 4,
      status: "Active"
    },
    {
      id: "OFF-02",
      name: "Smt. Meera Iyer, GAS",
      designation: "Special Land Acquisition Officer (SLAO)",
      district: "Vadodara",
      state: "Gujarat",
      mobile: "+91 98251 44556",
      email: "slao-vadodara@nic.in",
      activeProjects: 6,
      status: "Active"
    },
    {
      id: "OFF-03",
      name: "Dr. Vikram Deshmukh, IAS",
      designation: "District Collector & District Magistrate",
      district: "Kheda",
      state: "Gujarat",
      mobile: "+91 98252 77889",
      email: "collector-kheda@nic.in",
      activeProjects: 3,
      status: "Active"
    },
    {
      id: "OFF-04",
      name: "Shri Sanjay Solanki, GAS",
      designation: "Rehabilitation & Resettlement Officer",
      district: "Surat",
      state: "Gujarat",
      mobile: "+91 98253 99001",
      email: "rr-surat@nic.in",
      activeProjects: 5,
      status: "Active"
    }
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [newOfficer, setNewOfficer] = useState({
    name: "",
    designation: "District Collector",
    district: "Ahmedabad",
    mobile: "",
    email: ""
  });
  const [feedback, setFeedback] = useState("");

  const handleAddOfficer = (e) => {
    e.preventDefault();
    const created = {
      id: `OFF-0${officers.length + 1}`,
      name: newOfficer.name,
      designation: newOfficer.designation,
      district: newOfficer.district,
      state: "Gujarat",
      mobile: newOfficer.mobile || "+91 98000 00000",
      email: newOfficer.email || "officer@nic.in",
      activeProjects: 1,
      status: "Active"
    };
    setOfficers([...officers, created]);
    setFeedback("New Nodal Officer registered successfully.");
    setTimeout(() => {
      setShowAddModal(false);
      setFeedback("");
      setNewOfficer({ name: "", designation: "District Collector", district: "Ahmedabad", mobile: "", email: "" });
    }, 1000);
  };

  const filteredOfficers = officers.filter(
    (o) =>
      o.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.district.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.designation.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 pb-12">
      {/* Title & Actions */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-200 pb-3">
        <div>
          <div className="text-xs text-slate-500 font-medium">
            State Revenue Administration • Officer Directory
          </div>
          <h1 className="text-xl font-bold text-slate-900 leading-tight flex items-center gap-2">
            <UserCheck className="w-5 h-5 text-[#1e3a8a]" />
            District Land Acquisition Nodal Officers
          </h1>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-[#1e3a8a] hover:bg-[#172554] text-white px-3.5 py-1.5 rounded text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-2xs"
        >
          <Plus className="w-4 h-4" />
          <span>Add Nodal Officer</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="bg-white border border-slate-300 rounded p-4 shadow-2xs">
        <div className="relative">
          <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by Officer Name, Designation, or District..."
            className="w-full pl-9 pr-3 py-1.5 border border-slate-300 rounded text-xs text-slate-900 focus:ring-1 focus:ring-[#1e3a8a]"
          />
        </div>
      </div>

      {/* Officers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredOfficers.map((off) => (
          <div
            key={off.id}
            className="bg-white border border-slate-300 rounded p-4 shadow-xs space-y-3"
          >
            <div className="flex items-start justify-between border-b border-slate-100 pb-2.5">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-sm text-slate-900">{off.name}</h3>
                  <StatusBadge status={off.status} size="xs" />
                </div>
                <div className="text-xs text-slate-600 font-medium">{off.designation}</div>
              </div>
              <span className="text-xs font-mono font-bold bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
                {off.district}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs text-slate-600">
              <div className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-slate-400" />
                <span>{off.mobile}</span>
              </div>
              <div className="flex items-center gap-1.5 truncate">
                <Mail className="w-3.5 h-3.5 text-slate-400" />
                <span className="truncate">{off.email}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                <span>Jurisdiction: {off.district}, {off.state}</span>
              </div>
              <div>
                Active Projects: <strong className="text-slate-900">{off.activeProjects}</strong>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-400 font-mono text-[10px]">NIC Auth Clearance: Level 3</span>
              <button className="text-[#1e3a8a] font-semibold hover:underline">
                View District Projects →
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Nodal Officer Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded border border-slate-400 shadow-2xl max-w-md w-full p-6 space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-bold text-sm text-slate-900">
                Register New District Nodal Officer
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-1 hover:bg-slate-100 rounded text-slate-500"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {feedback && (
              <div className="p-2.5 bg-emerald-50 text-emerald-900 text-xs rounded border border-emerald-300 font-semibold">
                {feedback}
              </div>
            )}

            <form onSubmit={handleAddOfficer} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-800 mb-1">
                  Officer Full Name & Cadre <span className="text-rose-600">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={newOfficer.name}
                  onChange={(e) => setNewOfficer({ ...newOfficer, name: e.target.value })}
                  placeholder="e.g., Shri Amit V. Shah, IAS"
                  className="w-full p-2 border border-slate-300 rounded text-slate-900"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-800 mb-1">Designation</label>
                <select
                  value={newOfficer.designation}
                  onChange={(e) => setNewOfficer({ ...newOfficer, designation: e.target.value })}
                  className="w-full p-2 border border-slate-300 rounded bg-white text-slate-900"
                >
                  <option value="District Collector & District Magistrate">District Collector & DM</option>
                  <option value="Special Land Acquisition Officer (SLAO)">Special Land Acquisition Officer (SLAO)</option>
                  <option value="SIA Nodal Officer">SIA Nodal Officer</option>
                  <option value="Rehabilitation & Resettlement Officer">R&R Officer</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-800 mb-1">Revenue District</label>
                <select
                  value={newOfficer.district}
                  onChange={(e) => setNewOfficer({ ...newOfficer, district: e.target.value })}
                  className="w-full p-2 border border-slate-300 rounded bg-white text-slate-900"
                >
                  <option value="Ahmedabad">Ahmedabad</option>
                  <option value="Anand">Anand</option>
                  <option value="Vadodara">Vadodara</option>
                  <option value="Kheda">Kheda</option>
                  <option value="Surat">Surat</option>
                  <option value="Rajkot">Rajkot</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-800 mb-1">NIC Official Email</label>
                <input
                  type="email"
                  value={newOfficer.email}
                  onChange={(e) => setNewOfficer({ ...newOfficer, email: e.target.value })}
                  placeholder="collector-dist@nic.in"
                  className="w-full p-2 border border-slate-300 rounded text-slate-900"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-3 py-1.5 border rounded text-xs text-slate-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#1e3a8a] text-white px-4 py-1.5 rounded text-xs font-semibold hover:bg-blue-900"
                >
                  Register Officer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
