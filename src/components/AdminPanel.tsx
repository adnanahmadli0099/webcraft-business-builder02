import { useState, useEffect } from 'react';
import { 
  Lock, Unlock, Download, CheckCircle, Clock, MessageSquare, 
  Briefcase, Users, Phone, Mail, MapPin, Calendar, X, AlertCircle, RefreshCw 
} from 'lucide-react';
import { 
  getConsultations, updateConsultationStatus, ConsultationRequest,
  getMessages, updateMessageStatus, ContactMessage,
  getApplications, JobApplication
} from '../data/inquiryStore';
import { BUSINESS_INFO, OFFICE_LOCATIONS } from '../data/businessData';

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AdminPanel({ isOpen, onClose }: AdminPanelProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinCode, setPinCode] = useState('');
  const [pinError, setPinError] = useState('');
  const [activeTab, setActiveTab] = useState<'consultations' | 'messages' | 'careers' | 'settings'>('consultations');

  const [consultations, setConsultations] = useState<ConsultationRequest[]>([]);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [filterBorough, setFilterBorough] = useState('all');

  useEffect(() => {
    if (isOpen && isAuthenticated) {
      refreshData();
    }
  }, [isOpen, isAuthenticated]);

  const refreshData = () => {
    setConsultations(getConsultations());
    setMessages(getMessages());
    setApplications(getApplications());
  };

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Authorized default staff PIN
    if (pinCode === 'housecalls2026' || pinCode === '718922' || pinCode === 'admin') {
      setIsAuthenticated(true);
      setPinError('');
      refreshData();
    } else {
      setPinError('Invalid passcode. Use "housecalls2026" or "718922" for staff access.');
    }
  };

  const handleUpdateConsultationStatus = (id: string, status: ConsultationRequest['status']) => {
    updateConsultationStatus(id, status);
    refreshData();
  };

  const handleUpdateMessageStatus = (id: string, status: ContactMessage['status']) => {
    updateMessageStatus(id, status);
    refreshData();
  };

  const exportConsultationsCSV = () => {
    const headers = ['ID,Name,Phone,Email,Relationship,Service,Borough,Medicaid,Preferred Date,Status,Created At\n'];
    const rows = consultations.map(c => 
      `"${c.id}","${c.fullName}","${c.phone}","${c.email}","${c.relationship}","${c.serviceRequested}","${c.borough}","${c.hasMedicaid}","${c.preferredDate}","${c.status}","${c.createdAt}"`
    );
    const blob = new Blob([headers.concat(rows.join('\n')).join('')], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `housecalls_inquiries_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredConsultations = consultations.filter(c => {
    if (filterBorough === 'all') return true;
    return c.borough.toLowerCase().includes(filterBorough.toLowerCase());
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div 
        className="bg-white rounded-2xl max-w-5xl w-full shadow-2xl border border-slate-200 overflow-hidden relative max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="bg-[#0B1E36] text-white px-6 py-4 flex items-center justify-between border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold">
              HC
            </div>
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <span>HouseCalls Staff Portal</span>
                <span className="text-[10px] bg-cyan-900/60 text-cyan-300 px-2 py-0.5 rounded-full border border-cyan-700/50">
                  Intake & Lead Management
                </span>
              </h3>
              <p className="text-[11px] text-slate-400">
                Authorized LHCSA Personnel · Church Ave, Fulton St & 8th Ave Coordination
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isAuthenticated && (
              <button
                onClick={refreshData}
                className="p-1.5 rounded-md hover:bg-slate-800 text-slate-300 hover:text-white transition-colors text-xs flex items-center gap-1"
                title="Refresh Records"
              >
                <RefreshCw className="w-4 h-4" />
                <span className="hidden sm:inline">Sync</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 rounded-md hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6">
          {!isAuthenticated ? (
            <div className="max-w-md mx-auto my-12 text-center">
              <div className="w-14 h-14 bg-slate-100 text-[#00A3C4] rounded-2xl flex items-center justify-center mx-auto mb-4 border border-slate-200">
                <Lock className="w-7 h-7" />
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-2">Agency Staff Access</h4>
              <p className="text-xs text-slate-500 mb-6">
                Please enter your agency passkey to access patient intake requests, caregiver job applications, and contact inquiries.
              </p>

              <form onSubmit={handleLogin} className="space-y-4">
                {pinError && (
                  <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-lg flex items-center gap-2 text-left">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{pinError}</span>
                  </div>
                )}
                <div>
                  <input
                    type="password"
                    placeholder="Enter Staff Passkey (e.g. housecalls2026)"
                    value={pinCode}
                    onChange={(e) => setPinCode(e.target.value)}
                    className="w-full px-4 py-2.5 text-center text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00A3C4] font-mono"
                    autoFocus
                  />
                  <p className="text-[11px] text-slate-400 mt-1">
                    Demo Passkey: <code className="bg-slate-100 px-1.5 py-0.5 rounded text-slate-700">housecalls2026</code> or <code className="bg-slate-100 px-1.5 py-0.5 rounded text-slate-700">718922</code>
                  </p>
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 bg-[#00A3C4] hover:bg-[#008ba8] text-white font-semibold rounded-lg text-sm transition-colors shadow-xs flex items-center justify-center gap-2"
                >
                  <Unlock className="w-4 h-4" />
                  <span>Unlock Staff Dashboard</span>
                </button>
              </form>
            </div>
          ) : (
            <div>
              {/* Tab Navigation */}
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-4 mb-6">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setActiveTab('consultations')}
                    className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 ${
                      activeTab === 'consultations'
                        ? 'bg-[#00A3C4] text-white shadow-xs'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Care Requests ({consultations.length})</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('messages')}
                    className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 ${
                      activeTab === 'messages'
                        ? 'bg-[#00A3C4] text-white shadow-xs'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Contact Messages ({messages.length})</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('careers')}
                    className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 ${
                      activeTab === 'careers'
                        ? 'bg-[#00A3C4] text-white shadow-xs'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    <Briefcase className="w-3.5 h-3.5" />
                    <span>HHA / PCA Applicants ({applications.length})</span>
                  </button>
                </div>

                {activeTab === 'consultations' && (
                  <div className="flex items-center gap-2">
                    <select
                      value={filterBorough}
                      onChange={(e) => setFilterBorough(e.target.value)}
                      className="px-2.5 py-1.5 text-xs border border-slate-300 rounded-md bg-white focus:outline-none"
                    >
                      <option value="all">All Boroughs</option>
                      <option value="Brooklyn">Brooklyn</option>
                      <option value="Queens">Queens</option>
                      <option value="Manhattan">Manhattan</option>
                      <option value="Bronx">The Bronx</option>
                      <option value="Staten">Staten Island</option>
                    </select>

                    <button
                      onClick={exportConsultationsCSV}
                      className="px-3 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 rounded-md transition-colors flex items-center gap-1.5 shadow-xs"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Export CSV</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Tab 1: Care Consultations */}
              {activeTab === 'consultations' && (
                <div className="space-y-4">
                  {filteredConsultations.length === 0 ? (
                    <div className="text-center py-12 text-slate-400 text-xs">
                      No care assessment requests found for this filter.
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 gap-4">
                      {filteredConsultations.map((item) => (
                        <div 
                          key={item.id}
                          className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs hover:border-slate-300 transition-all flex flex-col md:flex-row justify-between gap-4"
                        >
                          <div className="space-y-2 flex-1">
                            <div className="flex items-center gap-2 flex-wrap">
                              <h5 className="font-bold text-slate-900 text-sm">{item.fullName}</h5>
                              <span className="text-xs text-slate-500">({item.relationship})</span>
                              <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                                item.status === 'new' 
                                  ? 'bg-amber-100 text-amber-800' 
                                  : item.status === 'contacted'
                                  ? 'bg-blue-100 text-blue-800'
                                  : 'bg-emerald-100 text-emerald-800'
                              }`}>
                                Status: {item.status.toUpperCase()}
                              </span>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600">
                              <p className="flex items-center gap-1.5">
                                <Phone className="w-3.5 h-3.5 text-[#00A3C4]" />
                                <a href={`tel:${item.phone}`} className="hover:underline font-medium text-slate-800">{item.phone}</a>
                              </p>
                              <p className="flex items-center gap-1.5">
                                <Mail className="w-3.5 h-3.5 text-[#00A3C4]" />
                                <a href={`mailto:${item.email}`} className="hover:underline">{item.email}</a>
                              </p>
                              <p className="flex items-center gap-1.5">
                                <MapPin className="w-3.5 h-3.5 text-[#00A3C4]" />
                                <span>{item.borough}</span>
                              </p>
                              <p className="flex items-center gap-1.5">
                                <Calendar className="w-3.5 h-3.5 text-[#00A3C4]" />
                                <span>Pref Date: {item.preferredDate || 'Earliest available'}</span>
                              </p>
                            </div>

                            <div className="bg-slate-50 p-2.5 rounded-lg text-xs text-slate-700">
                              <p><strong>Service:</strong> {item.serviceRequested} · <strong>Medicaid:</strong> {item.hasMedicaid.toUpperCase()}</p>
                              {item.notes && <p className="mt-1 text-slate-600 italic">"{item.notes}"</p>}
                            </div>
                          </div>

                          <div className="flex flex-row md:flex-col items-end justify-between md:justify-center gap-2 shrink-0 border-t md:border-t-0 md:border-l border-slate-100 pt-3 md:pt-0 md:pl-4">
                            <span className="text-[10px] text-slate-400">
                              {new Date(item.createdAt).toLocaleDateString()}
                            </span>
                            <div className="flex items-center gap-1.5">
                              {item.status !== 'contacted' && (
                                <button
                                  onClick={() => handleUpdateConsultationStatus(item.id, 'contacted')}
                                  className="px-2.5 py-1 text-[11px] font-medium bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-md border border-blue-200"
                                >
                                  Mark Contacted
                                </button>
                              )}
                              {item.status !== 'scheduled' && (
                                <button
                                  onClick={() => handleUpdateConsultationStatus(item.id, 'scheduled')}
                                  className="px-2.5 py-1 text-[11px] font-medium bg-emerald-50 text-emerald-700 hover:bg-emerald-100 rounded-md border border-emerald-200"
                                >
                                  Schedule Assessment
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Tab 2: Contact Messages */}
              {activeTab === 'messages' && (
                <div className="space-y-4">
                  {messages.map((msg) => (
                    <div key={msg.id} className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-2">
                            <h5 className="font-bold text-slate-900 text-sm">{msg.name}</h5>
                            <span className="text-xs text-slate-400">({msg.office})</span>
                            <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                              msg.status === 'unread' ? 'bg-rose-100 text-rose-800' : 'bg-slate-100 text-slate-600'
                            }`}>
                              {msg.status.toUpperCase()}
                            </span>
                          </div>
                          <p className="text-xs text-slate-500 mt-0.5">
                            {msg.email} · {msg.phone}
                          </p>
                        </div>
                        <span className="text-[11px] text-slate-400">
                          {new Date(msg.createdAt).toLocaleDateString()}
                        </span>
                      </div>

                      <div className="mt-3 bg-slate-50 p-3 rounded-lg">
                        <p className="text-xs font-semibold text-slate-800 mb-1">Subject: {msg.subject}</p>
                        <p className="text-xs text-slate-600 leading-relaxed">{msg.message}</p>
                      </div>

                      <div className="mt-3 flex justify-end gap-2">
                        {msg.status !== 'replied' && (
                          <button
                            onClick={() => handleUpdateMessageStatus(msg.id, 'replied')}
                            className="px-3 py-1 text-xs font-medium text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-md border border-emerald-200"
                          >
                            Mark Replied
                          </button>
                        )}
                        <a
                          href={`mailto:${msg.email}?subject=Re: ${encodeURIComponent(msg.subject)}`}
                          className="px-3 py-1 text-xs font-medium text-white bg-[#00A3C4] hover:bg-[#008ba8] rounded-md"
                        >
                          Send Email Reply
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Tab 3: Careers & Applicants */}
              {activeTab === 'careers' && (
                <div className="space-y-4">
                  {applications.map((app) => (
                    <div key={app.id} className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-2">
                            <h5 className="font-bold text-slate-900 text-sm">{app.fullName}</h5>
                            <span className="text-xs font-semibold bg-cyan-100 text-cyan-800 px-2 py-0.5 rounded-md">
                              Position: {app.position}
                            </span>
                          </div>
                          <p className="text-xs text-slate-500 mt-1">
                            {app.phone} · {app.email} · Experience: {app.experienceYears}
                          </p>
                        </div>
                        <span className="text-[11px] text-slate-400">
                          {new Date(app.createdAt).toLocaleDateString()}
                        </span>
                      </div>

                      <div className="mt-3 text-xs space-y-1 text-slate-700">
                        <p><strong>Languages Spoken:</strong> {app.languages.join(', ')}</p>
                        <p><strong>NYS Certificate:</strong> {app.hasCertificate ? 'Verified / Current' : 'Pending Verification'}</p>
                        {app.notes && <p className="text-slate-600 bg-slate-50 p-2.5 rounded-md mt-1 italic">{app.notes}</p>}
                      </div>

                      <div className="mt-3 flex justify-end gap-2">
                        <a
                          href={`tel:${app.phone}`}
                          className="px-3 py-1 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-md flex items-center gap-1"
                        >
                          <Phone className="w-3 h-3" />
                          <span>Call Candidate</span>
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
