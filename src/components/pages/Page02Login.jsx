import React, { useState } from "react";
import { useApp } from "../../context/AppContext.jsx";
import { GovEmblem } from "../common/GovEmblem.jsx";
import { DEMO_USERS } from "../../data/mockData.js";
import { Lock, Mail, Key, ShieldCheck, RefreshCw, CheckCircle2, ArrowRight, UserCheck, Smartphone, AlertCircle, Info } from "lucide-react";

export const Page02Login = () => {
  const { loginUser, navigateTo } = useApp();

  const [selectedRole, setSelectedRole] = useState("Central Authority");
  const [selectedDesignation, setSelectedDesignation] = useState("");
  const [emailOrMobile, setEmailOrMobile] = useState("central@demo.gov.in");
  const [password, setPassword] = useState("demo123");
  const [captchaInput, setCaptchaInput] = useState("K9X4M");
  const [captchaCode, setCaptchaCode] = useState("K9X4M");
  const [showOtpSection, setShowOtpSection] = useState(false);
  const [otpDigits, setOtpDigits] = useState(["4", "8", "1", "9", "2", "0"]);
  const [loginMessage, setLoginMessage] = useState("");

  const refreshCaptcha = () => {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    let result = "";
    for (let i = 0; i < 5; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptchaCode(result);
    setCaptchaInput(result);
  };

  const handleRoleChange = (e) => {
    const role = e.target.value;
    setSelectedRole(role);
    const matchedUser = DEMO_USERS.find((u) => u.role === role);
    if (matchedUser) {
      setEmailOrMobile(matchedUser.email);
      setSelectedDesignation(matchedUser.designation || "");
    }
  };

  const handleSendOtp = (e) => {
    e.preventDefault();
    if (!emailOrMobile || !password) {
      setLoginMessage("Please enter valid credentials.");
      return;
    }
    setShowOtpSection(true);
    setLoginMessage("6-digit authentication OTP dispatched to registered NIC mobile & email.");
  };

  const handleDirectLogin = (e) => {
    e.preventDefault();
    let user = DEMO_USERS.find((u) => u.email.toLowerCase() === emailOrMobile.toLowerCase());
    if (!user) {
      user = DEMO_USERS.find((u) => u.role === selectedRole);
    }
    if (!user) {
      user = DEMO_USERS[0];
    }
    loginUser(user);
  };

  const handleVerifyOtpAndLogin = (e) => {
    e.preventDefault();
    let user = DEMO_USERS.find((u) => u.email.toLowerCase() === emailOrMobile.toLowerCase());
    if (!user) {
      user = DEMO_USERS.find((u) => u.role === selectedRole);
    }
    if (!user) {
      user = DEMO_USERS[0];
    }
    loginUser(user);
  };

  const handleQuickFill = (user) => {
    setSelectedRole(user.role);
    setSelectedDesignation(user.designation || "");
    setEmailOrMobile(user.email);
    setPassword(user.password);
    setShowOtpSection(true);
    setLoginMessage(`Auto-filled credentials for ${user.role} (${user.name})`);
  };

  return (
    <div className="min-h-[82vh] flex flex-col justify-center py-6 px-2 sm:px-4 max-w-6xl mx-auto">
      {/* Sleek 2-Column Interface Card */}
      <div className="bg-white border border-[#D1D5DB] rounded-lg shadow-sm overflow-hidden grid grid-cols-1 lg:grid-cols-12">
        {/* Left: Login Section (7 cols) */}
        <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-center bg-white space-y-6">
          <div className="space-y-1.5 border-b border-slate-100 pb-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-[#1B365D] border-2 border-[#C5A059] shadow-xs shrink-0">
                <GovEmblem className="w-6 h-7" color="text-[#1B365D]" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#C5A059] block">
                  National Informatics Centre • NIC GovNet
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-[#1B365D] tracking-tight">
                  Secure Departmental Login
                </h2>
              </div>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              Authorized personnel and khatedar access. Enter departmental credentials to authenticate against the national land acquisition ledger.
            </p>
          </div>

          {loginMessage && (
            <div className="bg-slate-50 border-l-4 border-[#1B365D] text-slate-800 text-xs p-3 rounded flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-[#1B365D] shrink-0" />
              <span className="font-medium">{loginMessage}</span>
            </div>
          )}

          <form onSubmit={handleDirectLogin} className="space-y-4 text-xs">
            {/* Role Dropdown */}
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
                Departmental Role & Scope <span className="text-rose-600">*</span>
              </label>
              <select
                value={selectedRole}
                onChange={handleRoleChange}
                className="w-full p-2.5 bg-[#fafafa] border border-[#D1D5DB] rounded text-slate-800 font-medium focus:bg-white focus:outline-none focus:border-[#1B365D] focus:ring-1 focus:ring-[#1B365D]"
              >
                <option value="Central Authority">1. Central Authority (Administrator / Joint Secretary)</option>
                <option value="State Authority">2. State Authority (State Nodal Officer / Revenue Sec)</option>
                <option value="Requiring Body">3. Requiring Body (Project Officer / CPM DFCCIL / NHAI)</option>
                <option value="District Authority">4. District Authority (Collector / SLAO / R&R)</option>
                <option value="Citizen">5. Citizen / Khatedar (Land Owner)</option>
              </select>
            </div>

            {/* Email / Mobile input */}
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
                Username / Official Email <span className="text-rose-600">*</span>
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                <input
                  type="text"
                  required
                  value={emailOrMobile}
                  onChange={(e) => setEmailOrMobile(e.target.value)}
                  placeholder="e.g. officer@dept.gov.in"
                  className="w-full pl-9 pr-3 py-2.5 bg-[#fafafa] border border-[#D1D5DB] rounded text-slate-800 focus:bg-white focus:outline-none focus:border-[#1B365D] focus:ring-1 focus:ring-[#1B365D]"
                />
              </div>
            </div>

            {/* Password input */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-[11px] font-semibold uppercase tracking-wider text-slate-600">
                  Password <span className="text-rose-600">*</span>
                </label>
                <a href="#" className="text-[11px] text-[#1B365D] font-semibold hover:underline">
                  Forgot Password?
                </a>
              </div>
              <div className="relative">
                <Key className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-3 py-2.5 bg-[#fafafa] border border-[#D1D5DB] rounded text-slate-800 focus:bg-white focus:outline-none focus:border-[#1B365D] focus:ring-1 focus:ring-[#1B365D]"
                />
              </div>
            </div>

            {/* CAPTCHA Row */}
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
                Security Code (CAPTCHA) <span className="text-rose-600">*</span>
              </label>
              <div className="flex items-center gap-2">
                <div className="bg-[#e2e8f0] border border-[#cbd5e1] px-3.5 py-2 rounded font-mono font-bold tracking-widest text-[#1B365D] select-none text-sm line-through">
                  {captchaCode}
                </div>
                <button
                  type="button"
                  onClick={refreshCaptcha}
                  className="p-2.5 border border-[#D1D5DB] rounded hover:bg-slate-100 text-slate-600"
                  title="Refresh CAPTCHA"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
                <input
                  type="text"
                  required
                  value={captchaInput}
                  onChange={(e) => setCaptchaInput(e.target.value)}
                  className="flex-1 p-2.5 bg-[#fafafa] border border-[#D1D5DB] rounded text-slate-800 focus:bg-white focus:outline-none focus:border-[#1B365D] focus:ring-1 focus:ring-[#1B365D]"
                  placeholder="Enter characters"
                />
              </div>
            </div>

            {/* Primary Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
              <button
                type="submit"
                className="flex-1 bg-[#1B365D] hover:bg-[#142946] text-white py-3 px-4 rounded font-semibold text-xs flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer"
              >
                <Lock className="w-4 h-4 text-[#C5A059]" />
                <span>Authenticate & Login</span>
              </button>

              <button
                type="button"
                onClick={handleSendOtp}
                className="bg-slate-100 hover:bg-slate-200 text-slate-800 border border-[#D1D5DB] py-3 px-4 rounded font-semibold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <Smartphone className="w-4 h-4 text-slate-600" />
                <span>Send OTP</span>
              </button>
            </div>

            {/* Inline OTP Step */}
            {showOtpSection && (
              <div className="mt-3 p-4 bg-slate-50 border-l-4 border-[#C5A059] border-t border-r border-b border-slate-200 rounded space-y-3">
                <div className="flex items-center justify-between">
                  <div className="font-bold text-[#1B365D] flex items-center gap-1.5">
                    <Smartphone className="w-4 h-4 text-[#C5A059]" />
                    Enter 6-Digit Verification OTP
                  </div>
                  <span className="text-[10px] text-slate-500 font-mono">Dispatched to registered device</span>
                </div>

                <div className="flex gap-2 justify-center">
                  {otpDigits.map((digit, idx) => (
                    <input
                      key={idx}
                      type="text"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => {
                        const newDigits = [...otpDigits];
                        newDigits[idx] = e.target.value;
                        setOtpDigits(newDigits);
                      }}
                      className="w-10 h-10 text-center font-mono font-bold text-base border border-[#D1D5DB] rounded bg-white focus:ring-1 focus:ring-[#1B365D] focus:border-[#1B365D]"
                    />
                  ))}
                </div>

                <div className="flex items-center justify-between pt-1">
                  <button
                    type="button"
                    onClick={() => setLoginMessage("New OTP sent via SMS gateway.")}
                    className="text-[11px] text-[#1B365D] hover:underline font-semibold"
                  >
                    Resend OTP
                  </button>

                  <button
                    type="button"
                    onClick={handleVerifyOtpAndLogin}
                    className="bg-[#C5A059] hover:bg-[#b08d48] text-white px-4 py-2 rounded font-semibold text-xs flex items-center gap-1.5 shadow-xs"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    Verify & Access
                  </button>
                </div>
              </div>
            )}
          </form>

          <p className="text-[11px] text-slate-400 text-center">
            Access is logged and monitored per Information Security Policy Section 4 & IT Act 2000.
          </p>
        </div>

        {/* Right: Info Sidebar & Role Access Credentials (5 cols) */}
        <div className="lg:col-span-5 bg-[#f0f2f5] p-6 sm:p-8 border-t lg:border-t-0 lg:border-l border-[#D1D5DB] flex flex-col gap-5 justify-between">
          <div className="space-y-4">
            {/* System Announcement Notice */}
            <div className="sleek-notice">
              <h3 className="text-xs font-bold text-[#1B365D] uppercase tracking-wider mb-1 flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5 text-[#1B365D]" />
                System Announcement
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Database synchronization scheduled for Sunday 02:00 AM IST. Real-time e-Dhara and PFMS disbursement integrations will remain active.
              </p>
            </div>

            {/* Compliance Alert Notice */}
            <div className="sleek-notice-gold">
              <h3 className="text-xs font-bold text-[#1B365D] uppercase tracking-wider mb-1 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#C5A059]" />
                Statutory Compliance Alert
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                All District Collectors and SLAO officers must complete pending Section 15 objection hearing dispositions before statutory 60-day deadlines.
              </p>
            </div>
          </div>

          {/* Role Access Credentials Table */}
          <div className="border-t border-[#D1D5DB] pt-4 space-y-2.5">
            <div className="flex items-center justify-between">
              <h3 className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                1-Click Role Access Credentials
              </h3>
              <span className="text-[10px] text-[#C5A059] font-bold">Auto Fill & Test</span>
            </div>

            <div className="overflow-hidden border border-[#D1D5DB] rounded bg-white">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-[#e2e8f0] text-[#475569] text-[10px] uppercase font-semibold">
                    <th className="p-2 border-b border-[#cbd5e1]">Role</th>
                    <th className="p-2 border-b border-[#cbd5e1]">User Email</th>
                    <th className="p-2 border-b border-[#cbd5e1] text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-[11px]">
                  {DEMO_USERS.map((u) => (
                    <tr
                      key={u.id}
                      onClick={() => handleQuickFill(u)}
                      className="hover:bg-slate-50 cursor-pointer transition-colors"
                    >
                      <td className="p-2 font-bold text-[#1B365D]">
                        <span className="role-tag">{u.role.replace(" Authority", "").replace(" Body", "")}</span>
                      </td>
                      <td className="p-2 text-slate-600 font-mono text-[10px]">
                        {u.email}
                      </td>
                      <td className="p-2 text-right">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            loginUser(u);
                          }}
                          className="bg-[#1B365D] hover:bg-[#142946] text-white text-[10px] font-semibold px-2 py-0.5 rounded shadow-2xs"
                        >
                          Login →
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <button
              onClick={() => {
                const citizenUser = DEMO_USERS.find((u) => u.role === "Citizen");
                loginUser(citizenUser);
              }}
              className="w-full bg-[#C5A059] hover:bg-[#b08d48] text-white text-xs font-semibold py-2 px-3 rounded flex items-center justify-center gap-1.5 transition-colors shadow-xs"
            >
              <span>Instant Citizen / Landowner Portal Login</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

