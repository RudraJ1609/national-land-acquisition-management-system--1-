import React, { useState } from "react";
import { useApp } from "../../context/AppContext.jsx";
import {
  Users,
  ShieldCheck,
  UserPlus,
  Search,
  Filter,
  CheckCircle2,
  Lock,
  Mail,
  Phone,
  Building,
  Key,
  Edit2,
  Trash2,
  UserCheck
} from "lucide-react";
import { StatusBadge } from "../common/StatusBadge.jsx";

export const Page31UserRoleManagement = () => {
  const { currentUser } = useApp();
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");
  const [showAddModal, setShowAddModal] = useState(false);
  const [feedback, setFeedback] = useState("");

  const [userList, setUserList] = useState([
    {
      id: "USR-001",
      name: "Dr. Arvind Subramanian, IAS",
      email: "js-land@nic.in",
      role: "Central Authority",
      designation: "Joint Secretary (Land Resources)",
      agency: "Ministry of Rural Development",
      jurisdiction: "All India / National",
      status: "Active",
      lastLogin: "Today, 09:15 AM",
      twoFactorEnabled: true
    },
    {
      id: "USR-002",
      name: "Shri Rajesh M. Patel, IAS",
      email: "collector-anand@nic.in",
      role: "District Authority",
      designation: "District Collector & DM",
      agency: "Revenue Dept, Govt of Gujarat",
      jurisdiction: "District Anand",
      status: "Active",
      lastLogin: "Today, 10:45 AM",
      twoFactorEnabled: true
    },
    {
      id: "USR-003",
      name: "Smt. Sunita Rao, IAS",
      email: "secy-rev@gujarat.gov.in",
      role: "State Authority",
      designation: "Principal Secretary (Revenue)",
      agency: "Government of Gujarat",
      jurisdiction: "State of Gujarat",
      status: "Active",
      lastLogin: "Yesterday, 04:30 PM",
      twoFactorEnabled: true
    },
    {
      id: "USR-004",
      name: "Shri V. K. Sharma",
      email: "cpm-wdfc@dfcc.co.in",
      role: "Requiring Body",
      designation: "Chief Project Manager (Land)",
      agency: "DFCCIL / Ministry of Railways",
      jurisdiction: "Western Corridor (Gujarat Section)",
      status: "Active",
      lastLogin: "23-Aug-2026",
      twoFactorEnabled: true
    },
    {
      id: "USR-005",
      name: "Shri K. G. Vaghela, GAS",
      email: "sia-officer@gujarat.gov.in",
      role: "District Authority",
      designation: "Social Impact Assessment (SIA) Officer",
      agency: "SIA Unit Anand",
      jurisdiction: "Taluka Petlad & Anand",
      status: "Active",
      lastLogin: "Today, 08:30 AM",
      twoFactorEnabled: true
    },
    {
      id: "USR-006",
      name: "Smt. Priyadarshini Mehta",
      email: "rnr-administrator@nic.in",
      role: "District Authority",
      designation: "Administrator R&R (Sec 43)",
      agency: "Collectorate Anand",
      jurisdiction: "District Anand R&R Zones",
      status: "Active",
      lastLogin: "22-Aug-2026",
      twoFactorEnabled: true
    }
  ]);

  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    role: "District Authority",
    designation: "Special Land Acquisition Officer (SLAO)",
    agency: "Collectorate",
    jurisdiction: "District Anand"
  });

  const filteredUsers = userList.filter((u) => {
    const matchesSearch =
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.designation.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = roleFilter === "All" || u.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const handleAddUser = (e) => {
    e.preventDefault();
    const created = {
      id: `USR-00${userList.length + 1}`,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      designation: newUser.designation,
      agency: newUser.agency,
      jurisdiction: newUser.jurisdiction,
      status: "Active",
      lastLogin: "Never",
      twoFactorEnabled: true
    };
    setUserList([created, ...userList]);
    setFeedback(`New authorized officer account provisioned for ${newUser.name}. e-Gov credentials dispatched.`);
    setShowAddModal(false);
    setNewUser({
      name: "",
      email: "",
      role: "District Authority",
      designation: "Special Land Acquisition Officer (SLAO)",
      agency: "Collectorate",
      jurisdiction: "District Anand"
    });
    setTimeout(() => setFeedback(""), 3000);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Title & Actions */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-200 pb-3">
        <div>
          <div className="text-xs text-slate-500 font-medium">
            Central Authority • Access Control & Digital Governance (RBAC)
          </div>
          <h1 className="text-xl font-bold text-slate-900 leading-tight flex items-center gap-2">
            <Users className="w-5 h-5 text-[#1B365D]" />
            User & Role Management System
          </h1>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-[#1B365D] hover:bg-[#142946] text-white px-3.5 py-1.5 rounded text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-2xs cursor-pointer"
        >
          <UserPlus className="w-4 h-4 text-[#C5A059]" />
          <span>Provision New Officer Account</span>
        </button>
      </div>

      {feedback && (
        <div className="p-3 bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs rounded-md font-semibold flex items-center gap-2 shadow-2xs">
          <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
          <span>{feedback}</span>
        </div>
      )}

      {/* Role Hierarchy Matrix Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
        <div className="bg-white border border-[#D1D5DB] rounded-lg p-4 shadow-2xs">
          <div className="text-slate-500 font-semibold text-[10px] uppercase">Central Authority</div>
          <div className="text-xl font-bold text-[#1B365D] mt-1">12 Active Officers</div>
          <div className="text-[11px] text-slate-600 mt-1">National Policy, MIS Oversight</div>
        </div>

        <div className="bg-white border border-[#D1D5DB] rounded-lg p-4 shadow-2xs">
          <div className="text-slate-500 font-semibold text-[10px] uppercase">State Revenue Authorities</div>
          <div className="text-xl font-bold text-slate-900 mt-1">36 Nodal Officers</div>
          <div className="text-[11px] text-slate-600 mt-1">In-Principle Clearances, State Gazettes</div>
        </div>

        <div className="bg-white border border-[#D1D5DB] rounded-lg p-4 shadow-2xs">
          <div className="text-slate-500 font-semibold text-[10px] uppercase">District Collectors & SLAOs</div>
          <div className="text-xl font-bold text-emerald-800 mt-1">184 Collectors</div>
          <div className="text-[11px] text-emerald-700 mt-1">Valuation, Awards & PFMS Payouts</div>
        </div>

        <div className="bg-white border border-[#D1D5DB] rounded-lg p-4 shadow-2xs">
          <div className="text-slate-500 font-semibold text-[10px] uppercase">Requiring Bodies</div>
          <div className="text-xl font-bold text-[#C5A059] mt-1">42 Agencies</div>
          <div className="text-[11px] text-slate-600 mt-1">NHAI, DFCCIL, AAI, Metro Rail</div>
        </div>
      </div>

      {/* Filter and User Search Ribbon */}
      <div className="bg-white border border-[#D1D5DB] rounded-lg p-4 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <div className="flex-1 w-full relative">
          <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by Officer Name, Official Email, or Designation..."
            className="w-full pl-9 pr-3 py-2 border border-[#D1D5DB] rounded text-slate-900 focus:border-[#1B365D] focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <label className="font-semibold text-slate-700 shrink-0">Role Filter:</label>
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="p-2 border border-[#D1D5DB] rounded bg-white text-slate-900 font-medium focus:border-[#1B365D] focus:outline-none"
          >
            <option value="All">All Roles</option>
            <option value="Central Authority">Central Authority</option>
            <option value="State Authority">State Authority</option>
            <option value="District Authority">District Authority</option>
            <option value="Requiring Body">Requiring Body</option>
          </select>
        </div>
      </div>

      {/* Main Users Table */}
      <div className="bg-white border border-[#D1D5DB] rounded-lg shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border border-slate-200">
            <thead className="bg-[#e2e8f0] text-[#475569] font-semibold border-b border-[#cbd5e1] uppercase text-[11px]">
              <tr>
                <th className="py-2.5 px-3 border-r border-[#cbd5e1]">Officer Details</th>
                <th className="py-2.5 px-3 border-r border-[#cbd5e1]">Statutory Role</th>
                <th className="py-2.5 px-3 border-r border-[#cbd5e1]">Department / Agency</th>
                <th className="py-2.5 px-3 border-r border-[#cbd5e1]">Jurisdiction Area</th>
                <th className="py-2.5 px-3 border-r border-[#cbd5e1]">2FA & Security</th>
                <th className="py-2.5 px-3 border-r border-[#cbd5e1]">Last Activity</th>
                <th className="py-2.5 px-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredUsers.map((u) => (
                <tr key={u.id} className="hover:bg-slate-50">
                  <td className="py-2.5 px-3 border-r border-slate-200">
                    <div className="font-bold text-slate-900">{u.name}</div>
                    <div className="text-[11px] text-slate-500 font-mono flex items-center gap-1">
                      <Mail className="w-3 h-3" />
                      {u.email}
                    </div>
                  </td>
                  <td className="py-2.5 px-3 border-r border-slate-200">
                    <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-[#1B365D]/10 text-[#1B365D] border border-[#1B365D]/20">
                      {u.role}
                    </span>
                    <div className="text-[10px] text-slate-600 mt-0.5">{u.designation}</div>
                  </td>
                  <td className="py-2.5 px-3 border-r border-slate-200 text-slate-700">
                    {u.agency}
                  </td>
                  <td className="py-2.5 px-3 border-r border-slate-200 font-medium text-slate-800">
                    {u.jurisdiction}
                  </td>
                  <td className="py-2.5 px-3 border-r border-slate-200 text-center">
                    <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      <Lock className="w-3 h-3" />
                      e-Gov DSC / 2FA
                    </span>
                  </td>
                  <td className="py-2.5 px-3 border-r border-slate-200 text-slate-500 text-[11px]">
                    {u.lastLogin}
                  </td>
                  <td className="py-2.5 px-3 text-center">
                    <button
                      onClick={() => {
                        setFeedback(`DSC security credentials & access permissions updated for ${u.name}`);
                        setTimeout(() => setFeedback(""), 3500);
                      }}
                      className="text-xs text-[#1B365D] font-semibold hover:underline cursor-pointer"
                    >
                      Manage Access
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add User Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-lg border border-[#D1D5DB] shadow-2xl max-w-lg w-full p-6 space-y-4 text-xs">
            <div className="border-b border-slate-200 pb-3 flex items-center justify-between">
              <h3 className="text-base font-bold text-[#1B365D] flex items-center gap-2">
                <UserPlus className="w-4 h-4 text-[#C5A059]" />
                Provision Government Officer Account
              </h3>
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-slate-700 text-base font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddUser} className="space-y-3">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Full Name & Rank</label>
                <input
                  type="text"
                  required
                  value={newUser.name}
                  onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                  placeholder="e.g. Shri Alok Verma, IAS"
                  className="w-full p-2 border border-[#D1D5DB] rounded text-slate-900"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Official NIC / Govt Email</label>
                <input
                  type="email"
                  required
                  value={newUser.email}
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                  placeholder="e.g. alok.verma@nic.in"
                  className="w-full p-2 border border-[#D1D5DB] rounded text-slate-900 font-mono"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Statutory Role</label>
                  <select
                    value={newUser.role}
                    onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                    className="w-full p-2 border border-[#D1D5DB] rounded bg-white text-slate-900"
                  >
                    <option value="District Authority">District Authority (Collector/SLAO)</option>
                    <option value="State Authority">State Revenue Authority</option>
                    <option value="Requiring Body">Requiring Body Officer</option>
                    <option value="Central Authority">Central Authority</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Designation</label>
                  <input
                    type="text"
                    required
                    value={newUser.designation}
                    onChange={(e) => setNewUser({ ...newUser, designation: e.target.value })}
                    placeholder="e.g. District Collector"
                    className="w-full p-2 border border-[#D1D5DB] rounded text-slate-900"
                  >
                  </input>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Jurisdiction / District</label>
                <input
                  type="text"
                  required
                  value={newUser.jurisdiction}
                  onChange={(e) => setNewUser({ ...newUser, jurisdiction: e.target.value })}
                  placeholder="e.g. District Anand"
                  className="w-full p-2 border border-[#D1D5DB] rounded text-slate-900"
                />
              </div>

              <div className="pt-3 border-t border-slate-200 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 border border-[#D1D5DB] rounded font-semibold text-slate-700 hover:bg-slate-100 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#1B365D] hover:bg-[#142946] text-white rounded font-bold cursor-pointer"
                >
                  Provision & Send Credentials
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
