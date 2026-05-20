import { useState, useRef } from "react";

const Icon = ({ name, size = 20, className = "" }) => {
  const icons = {
    menu: <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"/>,
    x: <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>,
    mapPin: <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"/>,
    zap: <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"/>,
    shield: <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"/>,
    star: <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.562.562 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"/>,
    check: <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5"/>,
    phone: <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 6.75z"/>,
    download: <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"/>,
    chevronDown: <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5"/>,
    arrow: <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"/>,
    users: <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"/>,
    chart: <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"/>,
    clock: <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"/>,
    wallet: <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a2.25 2.25 0 00-2.25-2.25H15a3 3 0 11-6 0H5.25A2.25 2.25 0 003 12m18 0v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6m18 0V9M3 12V9m18-3a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v3"/>,
    close: <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>,
    car: <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"/>,
    logout: <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"/>,
    edit: <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"/>,
    trash: <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"/>,
  };
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className={className}>
      {icons[name]}
    </svg>
  );
};

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&family=DM+Sans:wght@400;500;600&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'DM Sans', sans-serif; background: #0A0A0A; color: #FFFFFF; overflow-x: hidden; }
  ::-webkit-scrollbar { width: 6px; } ::-webkit-scrollbar-track { background: #1A1A1A; } ::-webkit-scrollbar-thumb { background: #FFCC00; border-radius: 3px; }
  .sora { font-family: 'Sora', sans-serif; }
  @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-16px)} }
  @keyframes float2 { 0%,100%{transform:translateY(-8px) rotate(-3deg)} 50%{transform:translateY(8px) rotate(3deg)} }
  @keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
  @keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.6;transform:scale(1.15)} }
  @keyframes fadeInUp { from{opacity:0;transform:translateY(30px)} to{opacity:1;transform:translateY(0)} }
  .animate-float { animation: float 4s ease-in-out infinite; }
  .animate-float2 { animation: float2 5s ease-in-out infinite; }
  .animate-spin { animation: spin 1s linear infinite; }
  .animate-pulse { animation: pulse 1.5s ease-in-out infinite; }
  .fade-in { animation: fadeInUp 0.6s ease forwards; }
  .btn-yellow { background: #FFCC00; color: #0A0A0A; border: none; border-radius: 12px; font-family: 'Sora', sans-serif; font-weight: 700; cursor: pointer; transition: all 0.2s; }
  .btn-yellow:hover { background: #E6B800; transform: translateY(-2px); box-shadow: 0 8px 24px rgba(255,204,0,0.35); }
  .btn-outline { background: transparent; color: #FFCC00; border: 1.5px solid #FFCC00; border-radius: 12px; font-family: 'Sora', sans-serif; font-weight: 600; cursor: pointer; transition: all 0.2s; }
  .btn-outline:hover { background: #FFCC00; color: #0A0A0A; }
  .card-dark { background: #1A1A1A; border: 1px solid #2A2A2A; border-radius: 20px; transition: all 0.3s; }
  .card-dark:hover { border-color: #FFCC00; transform: translateY(-4px); box-shadow: 0 12px 40px rgba(255,204,0,0.1); }
  .glass { background: rgba(255,255,255,0.05); backdrop-filter: blur(12px); border: 1px solid rgba(255,255,255,0.1); }
  .input-field { background: #1A1A1A; border: 1px solid #2A2A2A; border-radius: 12px; color: #FFF; font-family: 'DM Sans', sans-serif; font-size: 15px; outline: none; transition: border 0.2s; width: 100%; padding: 14px 14px 14px 42px; }
  .input-field:focus { border-color: #FFCC00; }
  .input-field::placeholder { color: #555; }
  .modal-input { background: #1A1A1A; border: 1px solid #2A2A2A; border-radius: 12px; color: #FFF; font-family: 'DM Sans', sans-serif; font-size: 15px; outline: none; transition: border 0.2s; width: 100%; padding: 12px 16px; }
  .modal-input:focus { border-color: #FFCC00; }
  .modal-input::placeholder { color: #555; }
  .nav-link { color: #AAA; text-decoration: none; font-size: 15px; font-weight: 500; transition: color 0.2s; cursor: pointer; }
  .nav-link:hover { color: #FFCC00; }
  .section-tag { display: inline-block; background: rgba(255,204,0,0.15); color: #FFCC00; font-size: 12px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; padding: 6px 14px; border-radius: 50px; margin-bottom: 16px; }
  .gradient-text { background: linear-gradient(135deg, #FFCC00, #FF9900); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
  .overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.8); z-index: 1000; display: flex; align-items: center; justify-content: center; backdrop-filter: blur(4px); }
  .modal { background: #1A1A1A; border: 1px solid #2A2A2A; border-radius: 24px; padding: 32px; width: 90%; max-width: 520px; max-height: 90vh; overflow-y: auto; }
  .badge { display: inline-flex; align-items: center; gap: 4px; font-size: 12px; font-weight: 600; padding: 4px 10px; border-radius: 50px; }
  .badge-yellow { background: rgba(255,204,0,0.15); color: #FFCC00; }
  .badge-green { background: rgba(34,197,94,0.15); color: #22c55e; }
  .table-row { border-bottom: 1px solid #2A2A2A; transition: background 0.15s; }
  .table-row:hover { background: rgba(255,204,0,0.04); }
  .sidebar-item { display: flex; align-items: center; gap: 12px; padding: 12px 16px; border-radius: 12px; cursor: pointer; transition: all 0.2s; color: #888; font-size: 14px; font-weight: 500; }
  .sidebar-item:hover { background: rgba(255,204,0,0.08); color: #FFF; }
  .sidebar-item.active { background: rgba(255,204,0,0.15); color: #FFCC00; }
  @media(max-width:768px){ .hide-mobile{display:none!important} .stack-mobile{flex-direction:column!important} .admin-content{margin-left:0!important} }
`;

const BikeIllustration = () => (
  <svg viewBox="0 0 200 120" fill="none" xmlns="http://www.w3.org/2000/svg" style={{width:"100%",maxWidth:200}}>
    <circle cx="50" cy="90" r="22" stroke="#FFCC00" strokeWidth="4"/>
    <circle cx="50" cy="90" r="10" fill="#FFCC00" fillOpacity="0.3"/>
    <circle cx="150" cy="90" r="22" stroke="#FFCC00" strokeWidth="4"/>
    <circle cx="150" cy="90" r="10" fill="#FFCC00" fillOpacity="0.3"/>
    <path d="M50 90 L80 45 L120 45 L150 90" stroke="#FFF" strokeWidth="3" strokeLinecap="round"/>
    <path d="M95 45 L105 20 M105 20 L125 20" stroke="#FFF" strokeWidth="3" strokeLinecap="round"/>
    <ellipse cx="115" cy="30" rx="18" ry="10" fill="#FFCC00" fillOpacity="0.7"/>
    <circle cx="115" cy="30" r="5" fill="#0A0A0A"/>
    <path d="M80 45 L100 45" stroke="#FFCC00" strokeWidth="4" strokeLinecap="round"/>
  </svg>
);

const RikshawIllustration = () => (
  <svg viewBox="0 0 220 140" fill="none" xmlns="http://www.w3.org/2000/svg" style={{width:"100%",maxWidth:220}}>
    <rect x="20" y="30" width="160" height="80" rx="16" fill="#1A1A1A" stroke="#FFCC00" strokeWidth="2.5"/>
    <rect x="30" y="20" width="140" height="55" rx="12" fill="#222" stroke="#FFCC00" strokeWidth="2"/>
    <rect x="40" y="28" width="40" height="35" rx="6" fill="#FFCC00" fillOpacity="0.15" stroke="#FFCC00" strokeWidth="1.5"/>
    <rect x="100" y="28" width="40" height="35" rx="6" fill="#FFCC00" fillOpacity="0.15" stroke="#FFCC00" strokeWidth="1.5"/>
    <circle cx="55" cy="115" r="20" stroke="#FFCC00" strokeWidth="3.5"/>
    <circle cx="55" cy="115" r="8" fill="#FFCC00" fillOpacity="0.4"/>
    <circle cx="165" cy="115" r="20" stroke="#FFCC00" strokeWidth="3.5"/>
    <circle cx="165" cy="115" r="8" fill="#FFCC00" fillOpacity="0.4"/>
    <text x="110" y="65" textAnchor="middle" fill="#FFCC00" fontSize="11" fontWeight="700">E-RIKSHAW</text>
  </svg>
);

const CabIllustration = () => (
  <svg viewBox="0 0 240 130" fill="none" xmlns="http://www.w3.org/2000/svg" style={{width:"100%",maxWidth:240}}>
    <rect x="10" y="55" width="220" height="55" rx="12" fill="#1A1A1A" stroke="#FFCC00" strokeWidth="2"/>
    <path d="M40 55 L65 20 L175 20 L200 55Z" fill="#222" stroke="#FFCC00" strokeWidth="2"/>
    <rect x="70" y="25" width="45" height="28" rx="5" fill="#FFCC00" fillOpacity="0.2" stroke="#FFCC00" strokeWidth="1.5"/>
    <rect x="125" y="25" width="45" height="28" rx="5" fill="#FFCC00" fillOpacity="0.2" stroke="#FFCC00" strokeWidth="1.5"/>
    <circle cx="60" cy="108" r="22" stroke="#FFCC00" strokeWidth="3.5"/>
    <circle cx="60" cy="108" r="9" fill="#FFCC00" fillOpacity="0.4"/>
    <circle cx="180" cy="108" r="22" stroke="#FFCC00" strokeWidth="3.5"/>
    <circle cx="180" cy="108" r="9" fill="#FFCC00" fillOpacity="0.4"/>
    <text x="120" y="85" textAnchor="middle" fill="#FFCC00" fontSize="10" fontWeight="700">BALLIARIDE CAB</text>
  </svg>
);

const Spinner = ({ text = "Finding your ride..." }) => (
  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 24, padding: 40 }}>
    <div style={{ position: "relative", width: 80, height: 80 }}>
      <div style={{ position: "absolute", inset: 0, borderRadius: "50%", border: "3px solid #2A2A2A" }}/>
      <div style={{ position: "absolute", inset: 0, borderRadius: "50%", border: "3px solid transparent", borderTopColor: "#FFCC00" }} className="animate-spin"/>
      <div style={{ position: "absolute", inset: 8, borderRadius: "50%", border: "2px solid transparent", borderTopColor: "#FF9900" }} className="animate-spin"/>
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 12, height: 12, background: "#FFCC00", borderRadius: "50%" }} className="animate-pulse"/>
    </div>
    <p style={{ color: "#888", fontFamily: "'Sora',sans-serif", fontSize: 14 }}>{text}</p>
    <div style={{ display: "flex", gap: 6 }}>
      {[0,1,2].map(i => (
        <div key={i} style={{ width: 8, height: 8, borderRadius: "50%", background: "#FFCC00", animation: `pulse 1.2s ease-in-out ${i*0.2}s infinite` }}/>
      ))}
    </div>
  </div>
);

const FAQItem = ({ q, a }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="card-dark" style={{ padding: "20px 24px", marginBottom: 12 }}>
      <button onClick={() => setOpen(!open)} style={{ background: "none", border: "none", color: "#FFF", width: "100%", textAlign: "left", display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer", fontFamily: "'DM Sans',sans-serif", fontSize: 15, fontWeight: 500 }}>
        {q}
        <span style={{ color: "#FFCC00", fontSize: 20, transition: "transform 0.3s", display: "inline-block", transform: open ? "rotate(180deg)" : "rotate(0)" }}>›</span>
      </button>
      {open && <p style={{ marginTop: 12, color: "#888", fontSize: 14, lineHeight: 1.7 }}>{a}</p>}
    </div>
  );
};

export default function Balliaride() {
  const [page, setPage] = useState("home");
  const [showAuth, setShowAuth] = useState(null);
  const [authStep, setAuthStep] = useState(1);
  const [user, setUser] = useState(null);
  const [bookingModal, setBookingModal] = useState(false);
  const [bookingStep, setBookingStep] = useState(1);
  const [pickup, setPickup] = useState("");
  const [drop, setDrop] = useState("");
  const [selectedService, setSelectedService] = useState(null);
  const [bookingId, setBookingId] = useState("");
  const [otp, setOtp] = useState(["","","","","",""]);
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [fakeOtp, setFakeOtp] = useState("");
  const [adminTab, setAdminTab] = useState("dashboard");
  const [driverOnline, setDriverOnline] = useState(true);
  const [payMethod, setPayMethod] = useState("Cash");

  // Refs for ALL uncontrolled inputs — fixes typing lag everywhere
  const heroPickupRef = useRef(null);
  const heroDropRef = useRef(null);
  const authPhoneRef = useRef(null);
  const authNameRef = useRef(null);

  const services = [
    { id: "bike", label: "Bike Taxi", fare: "₹15–40", eta: "2–4 min", icon: <BikeIllustration/>, desc: "Fastest way to beat traffic" },
    { id: "rikshaw", label: "E-Rikshaw", fare: "₹25–60", eta: "4–7 min", icon: <RikshawIllustration/>, desc: "Eco-friendly & comfortable" },
    { id: "cab", label: "Cab", fare: "₹80–200", eta: "5–10 min", icon: <CabIllustration/>, desc: "Premium air-conditioned ride" },
  ];

  const fakeBookings = [
    { id: "BR2026001", user: "Rahul S.", from: "Civil Lines", to: "Railway Station", service: "Cab", status: "Completed", fare: "₹120", driver: "Ajay K.", time: "10:30 AM" },
    { id: "BR2026002", user: "Priya M.", from: "Bus Stand", to: "Sector 3", service: "E-Rikshaw", status: "Active", fare: "₹45", driver: "Ramesh D.", time: "11:15 AM" },
    { id: "BR2026003", user: "Amit T.", from: "Hospital Road", to: "Market", service: "Bike", status: "Pending", fare: "₹30", driver: "—", time: "11:40 AM" },
    { id: "BR2026004", user: "Sunita P.", from: "College Road", to: "Bank", service: "Cab", status: "Cancelled", fare: "₹95", driver: "Vijay S.", time: "09:45 AM" },
    { id: "BR2026005", user: "Deepak R.", from: "Nagar Palika", to: "Airport", service: "Cab", status: "Completed", fare: "₹180", driver: "Ajay K.", time: "08:20 AM" },
  ];

  const fakeDrivers = [
    { id: "D001", name: "Ajay Kumar", phone: "9876543210", service: "Cab", rating: 4.8, rides: 234, status: "Online" },
    { id: "D002", name: "Ramesh Das", phone: "9812345678", service: "E-Rikshaw", rating: 4.6, rides: 189, status: "Online" },
    { id: "D003", name: "Vijay Singh", phone: "9834567890", service: "Cab", rating: 4.9, rides: 312, status: "Offline" },
    { id: "D004", name: "Manoj Yadav", phone: "9867234510", service: "Bike", rating: 4.7, rides: 156, status: "Busy" },
  ];

  const reviews = [
    { name: "Rahul S.", rating: 5, text: "Super quick pickup! Driver was very professional. Best ride service in Ballia.", location: "Civil Lines" },
    { name: "Priya M.", rating: 5, text: "E-Rikshaw was so comfortable and affordable. Love this app! Will use daily.", location: "Sector 3" },
    { name: "Amit T.", rating: 4, text: "Bike taxi saved me from missing my train. Lightning fast service!", location: "Railway Station" },
  ];

  const handleSendOtp = () => {
    const p = authPhoneRef.current?.value?.trim() || "";
    const n = authNameRef.current?.value?.trim() || "";
    if (!p || p.length < 10) { alert("Please enter a valid 10-digit mobile number"); return; }
    setPhone(p);
    setName(n || "User");
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setFakeOtp(code);
    setAuthStep(2);
    alert(`[Demo] Your OTP is: ${code}`);
  };

  const handleVerifyOtp = () => {
    if (otp.join("") === fakeOtp) {
      setUser({ name: name || "User", phone });
      setShowAuth(null);
      setAuthStep(1);
      setOtp(["","","","","",""]);
    } else {
      alert("Incorrect OTP. Please try again.");
    }
  };

  // Read from refs (uncontrolled) before opening modal
  const handleBookRide = () => {
    if (!user) { setShowAuth("login"); return; }
    const p = heroPickupRef.current?.value || "";
    const d = heroDropRef.current?.value || "";
    setPickup(p);
    setDrop(d);
    setBookingModal(true);
    setBookingStep(1);
  };

  const handleConfirmBooking = () => {
    setBookingStep(4);
    setTimeout(() => {
      const id = "BR" + Date.now().toString().slice(-7);
      setBookingId(id);
      setBookingStep(5);
    }, 3000);
  };

  const resetBooking = () => {
    setBookingModal(false);
    setBookingStep(1);
    setSelectedService(null);
    setPickup("");
    setDrop("");
    if (heroPickupRef.current) heroPickupRef.current.value = "";
    if (heroDropRef.current) heroDropRef.current.value = "";
  };

  const statusColor = (s) => s === "Completed" ? "#22c55e" : s === "Active" ? "#FFCC00" : s === "Pending" ? "#888" : "#ef4444";

  // ── NAVBAR ────────────────────────────────────────────────────────────────
  const Navbar = () => (
    <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, padding: "0 24px", height: 70, display: "flex", alignItems: "center", justifyContent: "space-between", background: "rgba(10,10,10,0.92)", borderBottom: "1px solid #1A1A1A", backdropFilter: "blur(16px)" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }} onClick={() => setPage("home")}>
        <div style={{ width: 36, height: 36, background: "#FFCC00", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Icon name="zap" size={20} style={{ color: "#0A0A0A" }}/>
        </div>
        <span className="sora" style={{ fontSize: 20, fontWeight: 800, color: "#FFF" }}>Ballia<span style={{ color: "#FFCC00" }}>ride</span></span>
      </div>
      <div className="hide-mobile" style={{ display: "flex", gap: 28 }}>
        {["Home","About Us","Safety","Careers","Blog","Contact Us"].map(item => (
          <span key={item} className="nav-link" onClick={() => setPage("home")}>{item}</span>
        ))}
      </div>
      <div className="hide-mobile" style={{ display: "flex", gap: 10, alignItems: "center" }}>
        {user ? (
          <>
            <span style={{ color: "#888", fontSize: 14 }}>Hi, <strong style={{ color: "#FFCC00" }}>{user.name}</strong></span>
            <button className="btn-outline" style={{ padding: "8px 18px", fontSize: 14 }} onClick={() => setPage("profile")}>Profile</button>
            <button style={{ padding: "8px 18px", fontSize: 14, background: "transparent", border: "1px solid #333", borderRadius: 12, color: "#888", cursor: "pointer" }} onClick={() => { setUser(null); setPage("home"); }}>Logout</button>
          </>
        ) : (
          <>
            <button className="btn-outline" style={{ padding: "9px 20px", fontSize: 14 }} onClick={() => setShowAuth("login")}>Login</button>
            <button className="btn-yellow" style={{ padding: "9px 20px", fontSize: 14 }} onClick={() => setShowAuth("signup")}>Sign Up</button>
          </>
        )}
        <button style={{ padding: "8px 14px", fontSize: 12, background: "transparent", border: "1px solid #333", borderRadius: 10, color: "#666", cursor: "pointer" }} onClick={() => setPage("admin")}>Admin</button>
        <button style={{ padding: "8px 14px", fontSize: 12, background: "transparent", border: "1px solid #333", borderRadius: 10, color: "#666", cursor: "pointer" }} onClick={() => setPage("driver")}>Driver</button>
      </div>
    </nav>
  );

  // ── AUTH MODAL ────────────────────────────────────────────────────────────
  const AuthModal = () => (
    <div className="overlay" onClick={() => { setShowAuth(null); setAuthStep(1); }}>
      <div className="modal fade-in" onClick={e => e.stopPropagation()}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 28 }}>
          <div>
            <h2 className="sora" style={{ fontSize: 24, fontWeight: 800 }}>{showAuth === "login" ? "Welcome back" : "Join Balliaride"}</h2>
            <p style={{ color: "#888", fontSize: 14, marginTop: 4 }}>Enter your details to continue</p>
          </div>
          <button onClick={() => { setShowAuth(null); setAuthStep(1); }} style={{ background: "#2A2A2A", border: "none", borderRadius: 10, width: 36, height: 36, cursor: "pointer", color: "#888", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Icon name="close" size={16}/>
          </button>
        </div>
        {authStep === 1 ? (
          <>
            {showAuth === "signup" && (
              <div style={{ marginBottom: 16 }}>
                <label style={{ fontSize: 13, color: "#888", marginBottom: 8, display: "block" }}>Full Name</label>
                <input
                  ref={authNameRef}
                  className="modal-input"
                  placeholder="Enter your name"
                />
              </div>
            )}
            <div style={{ marginBottom: 24 }}>
              <label style={{ fontSize: 13, color: "#888", marginBottom: 8, display: "block" }}>Mobile Number</label>
              <div style={{ display: "flex", gap: 8 }}>
                <div style={{ background: "#2A2A2A", border: "1px solid #333", borderRadius: 12, padding: "12px 14px", color: "#888", fontSize: 15, minWidth: 60, display: "flex", alignItems: "center" }}>+91</div>
                <input
                  ref={authPhoneRef}
                  className="modal-input"
                  placeholder="10-digit mobile"
                  maxLength={10}
                  style={{ flex: 1 }}
                />
              </div>
            </div>
            <button className="btn-yellow" style={{ width: "100%", padding: "14px", fontSize: 15 }} onClick={handleSendOtp}>Send OTP →</button>
            <p style={{ textAlign: "center", marginTop: 16, color: "#555", fontSize: 13 }}>
              {showAuth === "login" ? "New here? " : "Have an account? "}
              <span style={{ color: "#FFCC00", cursor: "pointer" }} onClick={() => setShowAuth(showAuth === "login" ? "signup" : "login")}>
                {showAuth === "login" ? "Sign Up" : "Login"}
              </span>
            </p>
          </>
        ) : (
          <>
            <p style={{ color: "#888", fontSize: 14, marginBottom: 24 }}>OTP sent to +91 {phone}</p>
            <div style={{ display: "flex", gap: 10, justifyContent: "center", marginBottom: 28 }}>
              {otp.map((v, i) => (
                <input key={i} id={`otp-${i}`} maxLength={1} value={v}
                  onChange={e => {
                    const val = e.target.value.replace(/\D/,"");
                    const newOtp = [...otp];
                    newOtp[i] = val;
                    setOtp(newOtp);
                    if (val && i < 5) document.getElementById(`otp-${i+1}`)?.focus();
                  }}
                  onKeyDown={e => { if (e.key === "Backspace" && !otp[i] && i > 0) document.getElementById(`otp-${i-1}`)?.focus(); }}
                  style={{ width: 44, height: 52, textAlign: "center", fontSize: 20, fontWeight: 700, background: "#2A2A2A", border: "1px solid #333", borderRadius: 12, color: "#FFF", outline: "none" }}
                />
              ))}
            </div>
            <button className="btn-yellow" style={{ width: "100%", padding: "14px", fontSize: 15 }} onClick={handleVerifyOtp}>Verify & Continue</button>
            <p style={{ textAlign: "center", marginTop: 12, color: "#555", fontSize: 13 }}>
              <span style={{ color: "#FFCC00", cursor: "pointer" }} onClick={() => setAuthStep(1)}>← Change number</span>
            </p>
          </>
        )}
      </div>
    </div>
  );

  // ── BOOKING MODAL ─────────────────────────────────────────────────────────
  const BookingModal = () => {
    const modalPickupRef = useRef(null);
    const modalDropRef = useRef(null);

    return (
      <div className="overlay">
        <div className="modal fade-in" style={{ maxWidth: 560 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 24, alignItems: "center" }}>
            <h3 className="sora" style={{ fontSize: 20, fontWeight: 700 }}>
              {bookingStep === 1 && "Where are you going?"}
              {bookingStep === 2 && "Choose your ride"}
              {bookingStep === 3 && "Confirm booking"}
              {bookingStep === 4 && "Finding your driver..."}
              {bookingStep === 5 && "Ride confirmed! 🎉"}
            </h3>
            {bookingStep < 4 && (
              <button onClick={resetBooking} style={{ background: "#2A2A2A", border: "none", borderRadius: 10, width: 36, height: 36, cursor: "pointer", color: "#888", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Icon name="close" size={16}/>
              </button>
            )}
          </div>

          {bookingStep === 1 && (
            <>
              <div style={{ position: "relative", marginBottom: 12 }}>
                <div style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "#22c55e", zIndex: 1 }}><Icon name="mapPin" size={18}/></div>
                <input
                  ref={modalPickupRef}
                  className="input-field"
                  placeholder="Pickup location (e.g. Civil Lines)"
                  defaultValue={pickup}
                />
              </div>
              <div style={{ position: "relative", marginBottom: 28 }}>
                <div style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "#FFCC00", zIndex: 1 }}><Icon name="mapPin" size={18}/></div>
                <input
                  ref={modalDropRef}
                  className="input-field"
                  placeholder="Drop location (e.g. Railway Station)"
                  defaultValue={drop}
                />
              </div>
              <div style={{ background: "#111", borderRadius: 12, height: 150, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 24, border: "1px solid #222" }}>
                <div style={{ textAlign: "center", color: "#555" }}>
                  <Icon name="mapPin" size={28} style={{ color: "#FFCC00", margin: "0 auto 8px" }}/>
                  <p style={{ fontSize: 13 }}>Map — Ballia, UP</p>
                </div>
              </div>
              <button className="btn-yellow" style={{ width: "100%", padding: 14, fontSize: 15 }} onClick={() => {
                const p = modalPickupRef.current?.value || "";
                const d = modalDropRef.current?.value || "";
                if (!p || !d) { alert("Please enter both pickup and drop location"); return; }
                setPickup(p);
                setDrop(d);
                setBookingStep(2);
              }}>
                Find Rides →
              </button>
            </>
          )}

          {bookingStep === 2 && (
            <>
              <p style={{ color: "#888", fontSize: 13, marginBottom: 20 }}>
                <span style={{ color: "#22c55e" }}>●</span> {pickup} &nbsp;→&nbsp; <span style={{ color: "#FFCC00" }}>●</span> {drop}
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {services.map(s => (
                  <div key={s.id} onClick={() => setSelectedService(s)} style={{ padding: 20, borderRadius: 16, border: `2px solid ${selectedService?.id === s.id ? "#FFCC00" : "#2A2A2A"}`, background: selectedService?.id === s.id ? "rgba(255,204,0,0.06)" : "#111", cursor: "pointer", display: "flex", alignItems: "center", gap: 16, transition: "all 0.2s" }}>
                    <div style={{ width: 80, flexShrink: 0 }}>{s.icon}</div>
                    <div style={{ flex: 1 }}>
                      <div className="sora" style={{ fontWeight: 700, fontSize: 16, marginBottom: 4 }}>{s.label}</div>
                      <div style={{ color: "#888", fontSize: 13 }}>{s.desc}</div>
                    </div>
                    <div style={{ textAlign: "right", flexShrink: 0 }}>
                      <div style={{ color: "#FFCC00", fontWeight: 700, fontFamily: "'Sora',sans-serif", fontSize: 16 }}>{s.fare}</div>
                      <div style={{ color: "#888", fontSize: 12 }}>{s.eta}</div>
                    </div>
                  </div>
                ))}
              </div>
              <button className="btn-yellow" style={{ width: "100%", padding: 14, fontSize: 15, marginTop: 24 }} onClick={() => selectedService ? setBookingStep(3) : alert("Please select a ride type")}>
                Continue →
              </button>
            </>
          )}

          {bookingStep === 3 && (
            <>
              <div style={{ background: "#111", borderRadius: 16, padding: 20, marginBottom: 20 }}>
                <div style={{ display: "flex", justifyContent: "space-between", paddingBottom: 16, borderBottom: "1px solid #222", marginBottom: 16 }}>
                  <div><div style={{ color: "#888", fontSize: 11, marginBottom: 4 }}>FROM</div><div style={{ fontWeight: 600 }}>{pickup}</div></div>
                  <div style={{ textAlign: "right" }}><div style={{ color: "#888", fontSize: 11, marginBottom: 4 }}>TO</div><div style={{ fontWeight: 600 }}>{drop}</div></div>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div><div style={{ color: "#888", fontSize: 11, marginBottom: 4 }}>SERVICE</div><div style={{ fontWeight: 600 }}>{selectedService?.label}</div></div>
                  <div style={{ textAlign: "right" }}><div style={{ color: "#888", fontSize: 11, marginBottom: 4 }}>EST. FARE</div><div style={{ color: "#FFCC00", fontWeight: 800, fontFamily: "'Sora',sans-serif", fontSize: 20 }}>{selectedService?.fare}</div></div>
                </div>
              </div>
              <div style={{ marginBottom: 20 }}>
                <div style={{ color: "#888", fontSize: 13, marginBottom: 12 }}>Payment Method</div>
                {["Cash","UPI","Wallet"].map(pm => (
                  <div key={pm} onClick={() => setPayMethod(pm)} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 16px", borderRadius: 12, border: `1px solid ${payMethod === pm ? "#FFCC00" : "#2A2A2A"}`, marginBottom: 8, cursor: "pointer", background: payMethod === pm ? "rgba(255,204,0,0.05)" : "transparent", transition: "all 0.2s" }}>
                    <Icon name={pm === "Wallet" ? "wallet" : "check"} size={18} style={{ color: payMethod === pm ? "#FFCC00" : "#555" }}/>
                    <span style={{ fontSize: 15, fontWeight: 500 }}>{pm}</span>
                    {pm === "Cash" && <span className="badge badge-green" style={{ marginLeft: "auto" }}>Recommended</span>}
                  </div>
                ))}
              </div>
              <button className="btn-yellow" style={{ width: "100%", padding: 14, fontSize: 15 }} onClick={handleConfirmBooking}>
                Confirm Booking
              </button>
            </>
          )}

          {bookingStep === 4 && <Spinner text="Finding nearby drivers..."/>}

          {bookingStep === 5 && (
            <div style={{ textAlign: "center", padding: "20px 0" }}>
              <div style={{ width: 80, height: 80, background: "rgba(34,197,94,0.15)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
                <Icon name="check" size={36} style={{ color: "#22c55e" }}/>
              </div>
              <h3 className="sora" style={{ fontSize: 22, fontWeight: 800, marginBottom: 8 }}>Ride Booked!</h3>
              <p style={{ color: "#888", marginBottom: 20, fontSize: 14 }}>Your driver is on the way</p>
              <div style={{ background: "#111", borderRadius: 12, padding: 16, marginBottom: 20 }}>
                <div style={{ color: "#888", fontSize: 11, marginBottom: 4 }}>BOOKING ID</div>
                <div className="sora" style={{ color: "#FFCC00", fontSize: 22, fontWeight: 800 }}>{bookingId}</div>
              </div>
              <div style={{ background: "#1A1A1A", borderRadius: 16, padding: 16, textAlign: "left", marginBottom: 24 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ width: 44, height: 44, background: "#FFCC00", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "#0A0A0A", fontWeight: 700, fontSize: 16 }}>AK</div>
                  <div>
                    <div style={{ fontWeight: 600 }}>Ajay Kumar</div>
                    <div style={{ color: "#888", fontSize: 13 }}>★ 4.8 · {selectedService?.label}</div>
                  </div>
                  <button style={{ marginLeft: "auto", background: "#FFCC00", border: "none", borderRadius: 10, padding: "8px 16px", fontWeight: 700, fontSize: 13, cursor: "pointer" }}>Call</button>
                </div>
              </div>
              <button className="btn-yellow" style={{ width: "100%", padding: 14, fontSize: 15 }} onClick={resetBooking}>Done</button>
            </div>
          )}
        </div>
      </div>
    );
  };

  // ── HOME PAGE ─────────────────────────────────────────────────────────────
  const HomePage = () => (
    <div style={{ paddingTop: 70 }}>

      {/* Hero */}
      <section style={{ minHeight: "92vh", display: "flex", alignItems: "center", padding: "60px 24px", maxWidth: 1200, margin: "0 auto", gap: 60, flexWrap: "wrap" }}>
        <div style={{ flex: 1, minWidth: 280 }} className="fade-in">
          <span className="section-tag">🏆 Ballia's #1 Ride App</span>
          <h1 className="sora" style={{ fontSize: "clamp(38px,5vw,72px)", fontWeight: 900, lineHeight: 1.05, marginBottom: 20 }}>
            India's <span className="gradient-text">#1</span><br/>Ride-hailing<br/>App
          </h1>
          <p style={{ fontSize: 18, color: "#888", marginBottom: 36, lineHeight: 1.7, maxWidth: 440 }}>
            Quick, affordable rides at your doorstep. Serving Ballia & surrounding areas with pride.
          </p>

          {/* ✅ FIXED: Uncontrolled inputs with refs — no lag! */}
          <div className="glass" style={{ borderRadius: 20, padding: 24, maxWidth: 480 }}>
            <div style={{ position: "relative", marginBottom: 14 }}>
              <div style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "#22c55e", zIndex: 1 }}><Icon name="mapPin" size={18}/></div>
              <input
                ref={heroPickupRef}
                className="input-field"
                placeholder="Pickup location in Ballia"
              />
            </div>
            <div style={{ position: "relative", marginBottom: 20 }}>
              <div style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "#FFCC00", zIndex: 1 }}><Icon name="mapPin" size={18}/></div>
              <input
                ref={heroDropRef}
                className="input-field"
                placeholder="Drop location"
              />
            </div>
            <button className="btn-yellow" style={{ width: "100%", padding: "15px", fontSize: 16 }} onClick={handleBookRide}>
              Book Ride →
            </button>
          </div>

          <div style={{ display: "flex", gap: 28, marginTop: 28, flexWrap: "wrap" }}>
            {[["2 min","Avg pickup"],["4.9★","Rating"],["50k+","Rides done"]].map(([n, l]) => (
              <div key={l}>
                <div className="sora" style={{ fontSize: 22, fontWeight: 800, color: "#FFCC00" }}>{n}</div>
                <div style={{ color: "#888", fontSize: 13 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ flex: 1, minWidth: 280, display: "flex", flexDirection: "column", gap: 20, alignItems: "center" }}>
          <div className="animate-float" style={{ background: "#1A1A1A", border: "1px solid #2A2A2A", borderRadius: 20, padding: "20px 30px", textAlign: "center", width: "100%", maxWidth: 240 }}>
            <BikeIllustration/>
            <div className="sora" style={{ color: "#FFCC00", fontWeight: 700, marginTop: 8 }}>Bike Taxi</div>
          </div>
          <div style={{ display: "flex", gap: 16, width: "100%", maxWidth: 340 }}>
            <div className="animate-float2" style={{ background: "#1A1A1A", border: "1px solid #2A2A2A", borderRadius: 20, padding: "16px", textAlign: "center", flex: 1 }}>
              <RikshawIllustration/>
              <div className="sora" style={{ color: "#FFCC00", fontWeight: 700, marginTop: 6, fontSize: 13 }}>E-Rikshaw</div>
            </div>
            <div style={{ background: "#1A1A1A", border: "1px solid #2A2A2A", borderRadius: 20, padding: "16px", textAlign: "center", flex: 1, animation: "float 6s ease-in-out infinite" }}>
              <CabIllustration/>
              <div className="sora" style={{ color: "#FFCC00", fontWeight: 700, marginTop: 6, fontSize: 13 }}>Cab</div>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section style={{ padding: "80px 24px", background: "#0D0D0D" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <span className="section-tag">Our Services</span>
            <h2 className="sora" style={{ fontSize: 40, fontWeight: 800 }}>Rides for every need</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 24 }}>
            {services.map(s => (
              <div key={s.id} className="card-dark" style={{ padding: 28, textAlign: "center" }}>
                <div style={{ margin: "0 auto 16px", maxWidth: 180 }}>{s.icon}</div>
                <h3 className="sora" style={{ fontSize: 20, fontWeight: 700, marginBottom: 10 }}>{s.label}</h3>
                <p style={{ color: "#888", fontSize: 14, lineHeight: 1.6, marginBottom: 20 }}>{s.desc}</p>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 20, background: "#111", borderRadius: 10, padding: "10px 16px" }}>
                  <span style={{ color: "#888", fontSize: 13 }}>Fare: <strong style={{ color: "#FFCC00" }}>{s.fare}</strong></span>
                  <span style={{ color: "#888", fontSize: 13 }}>ETA: <strong style={{ color: "#FFF" }}>{s.eta}</strong></span>
                </div>
                <button className="btn-yellow" style={{ width: "100%", padding: "12px" }} onClick={handleBookRide}>Book Now</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What we offer */}
      <section style={{ padding: "80px 24px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <span className="section-tag">Why Balliaride</span>
            <h2 className="sora" style={{ fontSize: 40, fontWeight: 800 }}>What we offer</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 24 }}>
            {[
              { icon: "zap", title: "Quick Pickup", text: "Pickups within minutes that help you save time on every ride. A Balliaride is always nearby when you need to get moving." },
              { icon: "wallet", title: "Best Fares", text: "Affordable prices designed for everyday rides. Travel more, spend less without compromising on comfort." },
              { icon: "mapPin", title: "Never Too Far", text: "Present across Ballia and nearby towns. Wherever you go, find a Balliaride close by." },
            ].map(f => (
              <div key={f.title} className="card-dark" style={{ padding: 32 }}>
                <div style={{ width: 56, height: 56, background: "rgba(255,204,0,0.12)", borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20 }}>
                  <Icon name={f.icon} size={26} style={{ color: "#FFCC00" }}/>
                </div>
                <h3 className="sora" style={{ fontSize: 20, fontWeight: 700, marginBottom: 12 }}>{f.title}</h3>
                <p style={{ color: "#888", fontSize: 14, lineHeight: 1.8 }}>{f.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section style={{ padding: "80px 24px", background: "#0D0D0D" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <span className="section-tag">Testimonials</span>
            <h2 className="sora" style={{ fontSize: 40, fontWeight: 800 }}>What our riders say</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 24 }}>
            {reviews.map(r => (
              <div key={r.name} className="card-dark" style={{ padding: 28 }}>
                <div style={{ display: "flex", gap: 2, marginBottom: 16 }}>
                  {[...Array(r.rating)].map((_, i) => <span key={i} style={{ color: "#FFCC00", fontSize: 16 }}>★</span>)}
                </div>
                <p style={{ color: "#CCC", fontSize: 15, lineHeight: 1.7, marginBottom: 20, fontStyle: "italic" }}>"{r.text}"</p>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ width: 40, height: 40, background: "#FFCC00", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "#0A0A0A", fontWeight: 700, fontSize: 14 }}>{r.name[0]}</div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 14 }}>{r.name}</div>
                    <div style={{ color: "#666", fontSize: 12 }}>{r.location}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Download App */}
      <section style={{ padding: "80px 24px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", background: "linear-gradient(135deg, #1A1500 0%, #1A1A1A 100%)", border: "1px solid #FFCC00", borderRadius: 28, padding: "60px 40px", textAlign: "center" }}>
          <span className="section-tag">Get the App</span>
          <h2 className="sora" style={{ fontSize: 38, fontWeight: 800, marginBottom: 12 }}>Download Balliaride</h2>
          <p style={{ color: "#888", fontSize: 16, marginBottom: 36, maxWidth: 500, margin: "12px auto 36px" }}>Book rides faster, track in real-time, and earn rewards. Available on Android & iOS.</p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <button className="btn-yellow" style={{ padding: "14px 28px", fontSize: 15, display: "flex", alignItems: "center", gap: 8 }}>
              <Icon name="download" size={18}/> App Store
            </button>
            <button className="btn-outline" style={{ padding: "14px 28px", fontSize: 15, display: "flex", alignItems: "center", gap: 8 }}>
              <Icon name="download" size={18}/> Play Store
            </button>
          </div>
        </div>
      </section>

      {/* Safety */}
      <section style={{ padding: "80px 24px", background: "#0D0D0D" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <span className="section-tag">Safety First</span>
            <h2 className="sora" style={{ fontSize: 40, fontWeight: 800 }}>Your safety, our priority</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 20 }}>
            {[
              { icon: "shield", title: "Verified Drivers", desc: "All drivers undergo background checks and document verification" },
              { icon: "phone", title: "SOS Button", desc: "One-tap emergency support available 24/7 for all riders" },
              { icon: "star", title: "Ride Tracking", desc: "Share your live location with family & friends in one tap" },
              { icon: "check", title: "Rated Rides", desc: "Rate every ride to maintain quality standards on our platform" },
            ].map(s => (
              <div key={s.title} className="card-dark" style={{ padding: 24 }}>
                <div style={{ width: 48, height: 48, background: "rgba(255,204,0,0.1)", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
                  <Icon name={s.icon} size={22} style={{ color: "#FFCC00" }}/>
                </div>
                <h4 className="sora" style={{ fontSize: 16, fontWeight: 700, marginBottom: 8 }}>{s.title}</h4>
                <p style={{ color: "#888", fontSize: 13, lineHeight: 1.6 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Driver Partner */}
      <section style={{ padding: "80px 24px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "flex", alignItems: "center", gap: 48, flexWrap: "wrap" }}>
          <div style={{ flex: 1, minWidth: 260 }}>
            <span className="section-tag">Earn With Us</span>
            <h2 className="sora" style={{ fontSize: 38, fontWeight: 800, marginBottom: 16 }}>Become a driver partner</h2>
            <p style={{ color: "#888", fontSize: 16, lineHeight: 1.7, marginBottom: 28 }}>Drive on your schedule. Earn weekly. Join 500+ drivers already making great income with Balliaride in Ballia.</p>
            {["Weekly payouts directly to your account","Flexible hours — drive when you want","Full support & training provided"].map(b => (
              <div key={b} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                <div style={{ width: 22, height: 22, background: "rgba(255,204,0,0.15)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <Icon name="check" size={12} style={{ color: "#FFCC00" }}/>
                </div>
                <span style={{ color: "#CCC", fontSize: 14 }}>{b}</span>
              </div>
            ))}
            <button className="btn-yellow" style={{ padding: "14px 28px", fontSize: 15, marginTop: 16 }} onClick={() => setPage("driver")}>
              Register as Driver →
            </button>
          </div>
          <div style={{ flex: 1, minWidth: 260, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            {[["₹18k+","Avg Monthly"],["500+","Active Drivers"],["4.8★","Avg Rating"],["24/7","Support"]].map(([n, l]) => (
              <div key={l} style={{ background: "#1A1A1A", border: "1px solid #2A2A2A", borderRadius: 16, padding: 20, textAlign: "center" }}>
                <div className="sora" style={{ fontSize: 24, fontWeight: 800, color: "#FFCC00", marginBottom: 4 }}>{n}</div>
                <div style={{ color: "#888", fontSize: 12 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding: "80px 24px", background: "#0D0D0D" }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <span className="section-tag">FAQ</span>
            <h2 className="sora" style={{ fontSize: 40, fontWeight: 800 }}>Common questions</h2>
          </div>
          {[
            { q: "How do I book a ride on Balliaride?", a: "Enter your pickup and drop location, click 'Book Ride', choose your service type, confirm your booking, and your driver will arrive shortly." },
            { q: "What payment methods are accepted?", a: "We accept Cash, UPI payments (Google Pay, PhonePe, Paytm), and our in-app Wallet. Choose at the time of booking." },
            { q: "How are fares calculated?", a: "Fares are based on distance, service type, and time. Bike Taxi from ₹15, E-Rikshaw from ₹25, and Cab from ₹80. You'll see the estimated fare before confirming." },
            { q: "Is Balliaride available 24/7?", a: "Yes! Balliaride operates 24 hours a day, 7 days a week across Ballia and nearby areas." },
            { q: "How do I become a driver partner?", a: "Click 'Register as Driver', fill in your details, upload documents (DL, RC, Aadhaar), and our team will verify and onboard you within 48 hours." },
          ].map(f => <FAQItem key={f.q} {...f}/>)}
        </div>
      </section>

      {/* Blog */}
      <section style={{ padding: "80px 24px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <span className="section-tag">Blog</span>
            <h2 className="sora" style={{ fontSize: 40, fontWeight: 800 }}>Latest from Balliaride</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 24 }}>
            {[
              { tag: "News", title: "Balliaride launches E-Rikshaw service in Ballia", date: "Jan 15, 2026", desc: "We're excited to announce our eco-friendly E-Rikshaw fleet now covers all major routes in Ballia city." },
              { tag: "Safety", title: "5 tips to stay safe while booking a ride", date: "Jan 10, 2026", desc: "Your safety is our top priority. Here are our best practices for a safe and comfortable ride experience." },
              { tag: "Careers", title: "Balliaride is hiring! Join our growing team", date: "Jan 5, 2026", desc: "We're looking for passionate individuals to join us as drivers, support agents, and tech staff." },
            ].map(b => (
              <div key={b.title} className="card-dark" style={{ padding: 0, overflow: "hidden" }}>
                <div style={{ height: 120, background: "linear-gradient(135deg, #1A1200, #2A2A1A)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span className="badge badge-yellow">{b.tag}</span>
                </div>
                <div style={{ padding: 24 }}>
                  <div style={{ color: "#555", fontSize: 12, marginBottom: 8 }}>{b.date}</div>
                  <h4 className="sora" style={{ fontSize: 16, fontWeight: 700, marginBottom: 10, lineHeight: 1.4 }}>{b.title}</h4>
                  <p style={{ color: "#888", fontSize: 13, lineHeight: 1.6, marginBottom: 16 }}>{b.desc}</p>
                  <span style={{ color: "#FFCC00", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>Read more →</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background: "#050505", borderTop: "1px solid #1A1A1A", padding: "60px 24px 30px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: 40, marginBottom: 48 }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                <div style={{ width: 32, height: 32, background: "#FFCC00", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Icon name="zap" size={16} style={{ color: "#0A0A0A" }}/>
                </div>
                <span className="sora" style={{ fontSize: 18, fontWeight: 800 }}>Ballia<span style={{ color: "#FFCC00" }}>ride</span></span>
              </div>
              <p style={{ color: "#444", fontSize: 13, lineHeight: 1.7 }}>Ballia's most trusted ride-hailing platform.</p>
            </div>
            <div>
              <h5 className="sora" style={{ fontSize: 13, fontWeight: 700, marginBottom: 16, color: "#FFCC00" }}>Company</h5>
              {["Home","About Us","Careers","Safety","Blog","Press"].map(l => (
                <div key={l} style={{ color: "#444", fontSize: 13, marginBottom: 10, cursor: "pointer" }}>{l}</div>
              ))}
            </div>
            <div>
              <h5 className="sora" style={{ fontSize: 13, fontWeight: 700, marginBottom: 16, color: "#FFCC00" }}>Legal</h5>
              {["Privacy Policy","Customer Terms – Bike Taxi","Customer Terms – Cabs","Corporate Affairs","Captain Terms – Bike Taxi","Captain Terms – Cabs"].map(l => (
                <div key={l} style={{ color: "#444", fontSize: 13, marginBottom: 10, cursor: "pointer" }}>{l}</div>
              ))}
            </div>
            <div>
              <h5 className="sora" style={{ fontSize: 13, fontWeight: 700, marginBottom: 16, color: "#FFCC00" }}>Contact</h5>
              <p style={{ color: "#444", fontSize: 13, lineHeight: 1.9 }}>Ballia, Uttar Pradesh 277001<br/>support@balliaride.in<br/>+91 98765 43210</p>
            </div>
          </div>
          <div style={{ borderTop: "1px solid #1A1A1A", paddingTop: 24, textAlign: "center", color: "#333", fontSize: 13 }}>
            © 2026 Balliaride Transportation. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );

  // ── ADMIN PANEL ───────────────────────────────────────────────────────────
  const AdminPanel = () => (
    <div style={{ display: "flex", minHeight: "100vh", paddingTop: 70 }}>
      <div style={{ width: 220, background: "#0D0D0D", borderRight: "1px solid #1A1A1A", padding: "24px 12px", position: "fixed", top: 70, bottom: 0, overflowY: "auto" }} className="hide-mobile">
        {["dashboard","bookings","drivers","users","analytics","blogs","complaints"].map(t => (
          <div key={t} className={`sidebar-item ${adminTab === t ? "active" : ""}`} onClick={() => setAdminTab(t)}>
            <Icon name={t === "dashboard" || t === "analytics" ? "chart" : t === "bookings" ? "car" : t === "complaints" ? "phone" : t === "blogs" ? "edit" : "users"} size={18}/>
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </div>
        ))}
        <div style={{ borderTop: "1px solid #1A1A1A", marginTop: 16, paddingTop: 16 }}>
          <div className="sidebar-item" onClick={() => setPage("home")}><Icon name="logout" size={18}/>Exit Admin</div>
        </div>
      </div>
      <div style={{ flex: 1, marginLeft: 220, padding: "28px 24px" }} className="admin-content">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 28 }}>
          <div>
            <h1 className="sora" style={{ fontSize: 26, fontWeight: 800 }}>Admin Dashboard</h1>
            <p style={{ color: "#555", fontSize: 13 }}>Balliaride · May 2026</p>
          </div>
          <button className="btn-yellow" style={{ padding: "10px 20px", fontSize: 14 }}>+ Add Driver</button>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(190px,1fr))", gap: 16, marginBottom: 28 }}>
          {[
            { label: "Total Rides Today", value: "247", icon: "car", change: "+12%" },
            { label: "Active Drivers", value: "38", icon: "users", change: "+3" },
            { label: "Revenue Today", value: "₹18,420", icon: "wallet", change: "+8%" },
            { label: "Pending Rides", value: "5", icon: "clock", change: "-2" },
          ].map(s => (
            <div key={s.label} style={{ background: "#1A1A1A", border: "1px solid #2A2A2A", borderRadius: 16, padding: 20 }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div style={{ width: 42, height: 42, background: "rgba(255,204,0,0.1)", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Icon name={s.icon} size={20} style={{ color: "#FFCC00" }}/>
                </div>
                <span style={{ fontSize: 12, color: s.change.startsWith("+") ? "#22c55e" : "#ef4444", fontWeight: 600 }}>{s.change}</span>
              </div>
              <div className="sora" style={{ fontSize: 26, fontWeight: 800, marginTop: 12 }}>{s.value}</div>
              <div style={{ color: "#666", fontSize: 13, marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </div>
        <div style={{ background: "#1A1A1A", border: "1px solid #2A2A2A", borderRadius: 16, padding: 24, marginBottom: 24 }}>
          <h3 className="sora" style={{ fontSize: 16, fontWeight: 700, marginBottom: 20 }}>Weekly Ride Activity</h3>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 10, height: 100 }}>
            {[65,88,72,95,110,84,247].map((v, i) => (
              <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                <div style={{ width: "100%", height: `${(v/247)*100}%`, background: i === 6 ? "#FFCC00" : "rgba(255,204,0,0.25)", borderRadius: "4px 4px 0 0", minHeight: 6 }}/>
                <span style={{ color: "#555", fontSize: 11 }}>{["M","T","W","T","F","S","Su"][i]}</span>
              </div>
            ))}
          </div>
        </div>
        <div style={{ background: "#1A1A1A", border: "1px solid #2A2A2A", borderRadius: 16, overflow: "hidden", marginBottom: 24 }}>
          <div style={{ padding: "20px 24px", borderBottom: "1px solid #2A2A2A", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h3 className="sora" style={{ fontSize: 16, fontWeight: 700 }}>Recent Bookings</h3>
            <span className="badge badge-yellow">Live</span>
          </div>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
              <thead>
                <tr style={{ borderBottom: "1px solid #2A2A2A" }}>
                  {["Booking ID","User","Route","Service","Fare","Status","Time"].map(h => (
                    <th key={h} style={{ padding: "12px 16px", textAlign: "left", color: "#555", fontWeight: 600, whiteSpace: "nowrap" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {fakeBookings.map(b => (
                  <tr key={b.id} className="table-row">
                    <td style={{ padding: "14px 16px", color: "#FFCC00", fontFamily: "'Sora',sans-serif", fontWeight: 600, whiteSpace: "nowrap" }}>{b.id}</td>
                    <td style={{ padding: "14px 16px", whiteSpace: "nowrap" }}>{b.user}</td>
                    <td style={{ padding: "14px 16px", color: "#888", whiteSpace: "nowrap" }}>{b.from} → {b.to}</td>
                    <td style={{ padding: "14px 16px", whiteSpace: "nowrap" }}>{b.service}</td>
                    <td style={{ padding: "14px 16px", fontWeight: 600 }}>{b.fare}</td>
                    <td style={{ padding: "14px 16px", whiteSpace: "nowrap" }}>
                      <span className="badge" style={{ background: `rgba(${b.status==="Completed"?"34,197,94":b.status==="Active"?"255,204,0":b.status==="Pending"?"120,120,120":"239,68,68"},0.15)`, color: statusColor(b.status) }}>{b.status}</span>
                    </td>
                    <td style={{ padding: "14px 16px", color: "#555", whiteSpace: "nowrap" }}>{b.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div style={{ background: "#1A1A1A", border: "1px solid #2A2A2A", borderRadius: 16, overflow: "hidden" }}>
          <div style={{ padding: "20px 24px", borderBottom: "1px solid #2A2A2A", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h3 className="sora" style={{ fontSize: 16, fontWeight: 700 }}>Driver Management</h3>
            <button className="btn-yellow" style={{ padding: "8px 16px", fontSize: 13 }}>+ Add Driver</button>
          </div>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
              <thead>
                <tr style={{ borderBottom: "1px solid #2A2A2A" }}>
                  {["Name","Phone","Service","Rating","Rides","Status","Actions"].map(h => (
                    <th key={h} style={{ padding: "12px 16px", textAlign: "left", color: "#555", fontWeight: 600 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {fakeDrivers.map(d => (
                  <tr key={d.id} className="table-row">
                    <td style={{ padding: "14px 16px", fontWeight: 500 }}>{d.name}</td>
                    <td style={{ padding: "14px 16px", color: "#888" }}>{d.phone}</td>
                    <td style={{ padding: "14px 16px" }}>{d.service}</td>
                    <td style={{ padding: "14px 16px", color: "#FFCC00", fontWeight: 600 }}>★ {d.rating}</td>
                    <td style={{ padding: "14px 16px" }}>{d.rides}</td>
                    <td style={{ padding: "14px 16px" }}>
                      <span className="badge" style={{ background: `rgba(${d.status==="Online"?"34,197,94":d.status==="Busy"?"255,204,0":"100,100,100"},0.15)`, color: d.status==="Online"?"#22c55e":d.status==="Busy"?"#FFCC00":"#888" }}>{d.status}</span>
                    </td>
                    <td style={{ padding: "14px 16px" }}>
                      <div style={{ display: "flex", gap: 8 }}>
                        <button style={{ background: "rgba(255,204,0,0.1)", border: "none", borderRadius: 8, padding: "6px 12px", color: "#FFCC00", cursor: "pointer", fontSize: 12 }}>Edit</button>
                        <button style={{ background: "rgba(239,68,68,0.1)", border: "none", borderRadius: 8, padding: "6px 12px", color: "#ef4444", cursor: "pointer", fontSize: 12 }}>Remove</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );

  // ── DRIVER PANEL ──────────────────────────────────────────────────────────
  const DriverPanel = () => (
    <div style={{ paddingTop: 90, padding: "90px 24px 40px", maxWidth: 900, margin: "0 auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 28, flexWrap: "wrap", gap: 16 }}>
        <div>
          <h1 className="sora" style={{ fontSize: 26, fontWeight: 800 }}>Driver Dashboard</h1>
          <p style={{ color: "#555", fontSize: 13 }}>Welcome back, Ajay Kumar</p>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ color: driverOnline ? "#22c55e" : "#888", fontSize: 14, fontWeight: 600 }}>{driverOnline ? "● Online" : "○ Offline"}</span>
          <button onClick={() => setDriverOnline(!driverOnline)} style={{ background: driverOnline ? "#22c55e" : "#333", border: "none", borderRadius: 50, width: 52, height: 28, cursor: "pointer", position: "relative", transition: "background 0.3s" }}>
            <div style={{ position: "absolute", top: 4, left: driverOnline ? 26 : 4, width: 20, height: 20, background: "#FFF", borderRadius: "50%", transition: "left 0.3s" }}/>
          </button>
          <button className="btn-outline" style={{ padding: "8px 14px", fontSize: 13 }} onClick={() => setPage("home")}>← Back</button>
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(170px,1fr))", gap: 16, marginBottom: 28 }}>
        {[["₹1,240","Today's Earnings","wallet"],["8","Rides Today","car"],["4.8 ★","Rating","star"],["5h 20m","Hours Online","clock"]].map(([v,l,ic]) => (
          <div key={l} style={{ background: "#1A1A1A", border: "1px solid #2A2A2A", borderRadius: 16, padding: 20 }}>
            <div style={{ width: 40, height: 40, background: "rgba(255,204,0,0.1)", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 12 }}>
              <Icon name={ic} size={20} style={{ color: "#FFCC00" }}/>
            </div>
            <div className="sora" style={{ fontSize: 22, fontWeight: 800, marginBottom: 4 }}>{v}</div>
            <div style={{ color: "#666", fontSize: 12 }}>{l}</div>
          </div>
        ))}
      </div>
      {driverOnline && (
        <div style={{ background: "#1A1A1A", border: "1px solid #2A2A2A", borderRadius: 16, padding: 24, marginBottom: 24 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
            <h3 className="sora" style={{ fontSize: 16, fontWeight: 700 }}>Incoming Requests</h3>
            <span className="badge badge-yellow animate-pulse">LIVE</span>
          </div>
          {[
            { from: "Civil Lines", to: "Railway Station", fare: "₹95", dist: "3.2 km" },
            { from: "Bus Stand", to: "Nagar Palika", fare: "₹60", dist: "2.1 km" },
          ].map((r, i) => (
            <div key={i} style={{ background: "#111", borderRadius: 12, padding: 20, marginBottom: 12, border: "1px solid #2A2A2A" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 14 }}>
                <div>
                  <div style={{ fontWeight: 600, marginBottom: 4 }}>{r.from} → {r.to}</div>
                  <div style={{ color: "#888", fontSize: 13 }}>Cab · {r.dist}</div>
                </div>
                <div className="sora" style={{ color: "#FFCC00", fontSize: 20, fontWeight: 800 }}>{r.fare}</div>
              </div>
              <div style={{ display: "flex", gap: 10 }}>
                <button className="btn-yellow" style={{ flex: 1, padding: "10px" }}>Accept</button>
                <button className="btn-outline" style={{ flex: 1, padding: "10px", borderColor: "#333", color: "#888" }}>Decline</button>
              </div>
            </div>
          ))}
        </div>
      )}
      <div style={{ background: "#111", border: "1px solid #1A1A1A", borderRadius: 16, height: 180, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 24 }}>
        <div style={{ textAlign: "center", color: "#555" }}>
          <Icon name="mapPin" size={28} style={{ color: "#FFCC00", margin: "0 auto 8px" }}/>
          <p style={{ fontSize: 13 }}>Live Navigation Map — Ballia, UP</p>
        </div>
      </div>
      <div style={{ background: "#1A1A1A", border: "1px solid #2A2A2A", borderRadius: 16, overflow: "hidden" }}>
        <div style={{ padding: "16px 24px", borderBottom: "1px solid #2A2A2A" }}>
          <h3 className="sora" style={{ fontSize: 15, fontWeight: 700 }}>Today's Ride History</h3>
        </div>
        {[
          { from: "Hospital Road", to: "Market", fare: "₹45", time: "10:30 AM", rating: "5 ★" },
          { from: "College Road", to: "Bank", fare: "₹70", time: "9:00 AM", rating: "4 ★" },
          { from: "Bus Stand", to: "Sector 3", fare: "₹55", time: "8:15 AM", rating: "5 ★" },
        ].map((r, i) => (
          <div key={i} className="table-row" style={{ padding: "16px 24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div style={{ fontWeight: 500, fontSize: 14, marginBottom: 2 }}>{r.from} → {r.to}</div>
              <div style={{ color: "#555", fontSize: 12 }}>{r.time}</div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ color: "#FFCC00", fontWeight: 700 }}>{r.fare}</div>
              <div style={{ color: "#888", fontSize: 12 }}>{r.rating}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // ── PROFILE PAGE ──────────────────────────────────────────────────────────
  const ProfilePage = () => (
    <div style={{ paddingTop: 90, padding: "90px 24px 40px", maxWidth: 700, margin: "0 auto" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 32 }}>
        <div style={{ width: 72, height: 72, background: "#FFCC00", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "#0A0A0A", fontFamily: "'Sora',sans-serif", fontSize: 28, fontWeight: 800, flexShrink: 0 }}>
          {user?.name?.[0] || "U"}
        </div>
        <div>
          <h1 className="sora" style={{ fontSize: 24, fontWeight: 800 }}>{user?.name}</h1>
          <p style={{ color: "#888", fontSize: 14 }}>+91 {user?.phone}</p>
          <span className="badge badge-green" style={{ marginTop: 6 }}>Verified</span>
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 24 }}>
        {[["8","Total Rides"],["₹640","Wallet"],["4.9★","Rating"],["2","Saved Places"]].map(([n,l]) => (
          <div key={l} style={{ background: "#1A1A1A", border: "1px solid #2A2A2A", borderRadius: 14, padding: 20 }}>
            <div className="sora" style={{ fontSize: 22, fontWeight: 800, color: "#FFCC00", marginBottom: 4 }}>{n}</div>
            <div style={{ color: "#666", fontSize: 13 }}>{l}</div>
          </div>
        ))}
      </div>
      <div style={{ background: "#1A1A1A", border: "1px solid #2A2A2A", borderRadius: 16, overflow: "hidden", marginBottom: 20 }}>
        <div style={{ padding: "16px 24px", borderBottom: "1px solid #2A2A2A" }}>
          <h3 className="sora" style={{ fontSize: 15, fontWeight: 700 }}>Recent Rides</h3>
        </div>
        {[
          { from: "Civil Lines", to: "Railway Station", fare: "₹95", date: "Today 10:30 AM", service: "Cab" },
          { from: "Hospital Road", to: "Market", fare: "₹45", date: "Yesterday 2:15 PM", service: "E-Rikshaw" },
          { from: "Bus Stand", to: "College Road", fare: "₹30", date: "Jan 15, 9:00 AM", service: "Bike" },
        ].map((r, i) => (
          <div key={i} className="table-row" style={{ padding: "16px 24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div style={{ fontWeight: 500, fontSize: 14, marginBottom: 2 }}>{r.from} → {r.to}</div>
              <div style={{ color: "#555", fontSize: 12 }}>{r.date} · {r.service}</div>
            </div>
            <div style={{ color: "#FFCC00", fontWeight: 700 }}>{r.fare}</div>
          </div>
        ))}
      </div>
      <button className="btn-outline" style={{ padding: "12px 24px", fontSize: 14 }} onClick={() => setPage("home")}>← Back to Home</button>
    </div>
  );

  return (
    <>
      <style>{css}</style>
      <Navbar/>
      {page === "home" && <HomePage/>}
      {page === "admin" && <AdminPanel/>}
      {page === "driver" && <DriverPanel/>}
      {page === "profile" && user && <ProfilePage/>}
      {showAuth && <AuthModal/>}
      {bookingModal && <BookingModal/>}
    </>
  );
}
