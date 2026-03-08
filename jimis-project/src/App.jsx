import { useState, useEffect, useCallback, useRef } from "react";

/* ─── CONSTANTS ─────────────────────────────────────────────────────────────── */
const OWNER_WHATSAPP = "918408026942"; // owner's number with country code
const OWNER_NAME = "Jimis Burger";
const ADMIN_EMAIL = "admin@jimisburger.com";
const ADMIN_PASS = "jimis@admin2024";

/* ─── GLOBAL CSS ─────────────────────────────────────────────────────────────── */
const INJECT_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Oswald:wght@400;500;600;700&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,400&family=Bebas+Neue&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth}
body{background:#0a0a0a;overflow-x:hidden}
::-webkit-scrollbar{width:4px}
::-webkit-scrollbar-track{background:#0a0a0a}
::-webkit-scrollbar-thumb{background:#FF5500;border-radius:2px}
@keyframes fadeUp{from{opacity:0;transform:translateY(26px)}to{opacity:1;transform:translateY(0)}}
@keyframes fadeIn{from{opacity:0}to{opacity:1}}
@keyframes float{0%,100%{transform:translateY(0) rotate(-1deg)}50%{transform:translateY(-12px) rotate(1deg)}}
@keyframes slideRight{from{transform:translateX(110%);opacity:0}to{transform:translateX(0);opacity:1}}
@keyframes scaleIn{from{transform:scale(.92);opacity:0}to{transform:scale(1);opacity:1}}
@keyframes pulse{0%,100%{opacity:1}50%{opacity:.5}}
@keyframes timerPulse{0%,100%{box-shadow:0 0 0 0 rgba(255,85,0,.4)}70%{box-shadow:0 0 0 8px rgba(255,85,0,0)}}
@keyframes urgentPulse{0%,100%{background:rgba(244,67,54,.08)}50%{background:rgba(244,67,54,.18)}}
.fade-up{animation:fadeUp .6s cubic-bezier(.16,1,.3,1) forwards}
.fade-in{animation:fadeIn .35s ease forwards}
.float-anim{animation:float 4s ease-in-out infinite}
.scale-in{animation:scaleIn .4s cubic-bezier(.16,1,.3,1) forwards}
.btn-primary{background:linear-gradient(135deg,#FF5500,#FF7733);color:#fff;border:none;cursor:pointer;font-family:'Oswald',sans-serif;font-size:13.5px;font-weight:600;letter-spacing:1.8px;text-transform:uppercase;padding:13px 26px;position:relative;overflow:hidden;transition:all .28s;display:inline-flex;align-items:center;gap:6px;justify-content:center}
.btn-primary::after{content:'';position:absolute;top:0;left:-100%;width:100%;height:100%;background:linear-gradient(90deg,transparent,rgba(255,255,255,.15),transparent);transition:left .5s}
.btn-primary:hover::after{left:100%}
.btn-primary:hover{transform:translateY(-2px);box-shadow:0 10px 28px rgba(255,85,0,.4)}
.btn-primary:disabled{opacity:.6;cursor:not-allowed;transform:none}
.btn-outline{background:transparent;color:#FF5500;border:1.5px solid #FF5500;cursor:pointer;font-family:'Oswald',sans-serif;font-size:13.5px;font-weight:500;letter-spacing:1.8px;text-transform:uppercase;padding:12px 25px;transition:all .28s;display:inline-flex;align-items:center;gap:6px;justify-content:center}
.btn-outline:hover{background:#FF5500;color:#fff;transform:translateY(-2px);box-shadow:0 8px 20px rgba(255,85,0,.3)}
.btn-ghost{background:none;border:none;cursor:pointer;color:#888;font-family:'DM Sans',sans-serif;font-size:13px;padding:5px;transition:color .2s}
.btn-ghost:hover{color:#F8F3EC}
.nav-lnk{color:#666;font-family:'Oswald',sans-serif;font-size:12px;font-weight:500;letter-spacing:1.8px;text-transform:uppercase;cursor:pointer;transition:color .2s;background:none;border:none;padding:4px 0}
.nav-lnk:hover,.nav-lnk.act{color:#FF5500}
.inp{background:#181818;border:1px solid rgba(255,85,0,.16);color:#F8F3EC;padding:12px 15px;font-family:'DM Sans',sans-serif;font-size:13.5px;width:100%;outline:none;transition:border-color .22s;border-radius:0}
.inp:focus{border-color:#FF5500;box-shadow:0 0 0 2px rgba(255,85,0,.07)}
.inp::placeholder{color:#3a3a3a}
select.inp option{background:#181818}
textarea.inp{resize:vertical;min-height:78px}
.tab-btn{background:none;border:1px solid rgba(255,85,0,.14);color:#555;padding:8px 17px;font-family:'Oswald',sans-serif;font-size:11.5px;letter-spacing:1.2px;text-transform:uppercase;cursor:pointer;transition:all .2s;white-space:nowrap}
.tab-btn.act{background:#FF5500;border-color:#FF5500;color:#fff}
.tab-btn:hover:not(.act){border-color:#FF5500;color:#FF5500}
.mcard{background:#131313;border:1px solid rgba(255,85,0,.09);transition:all .3s;position:relative;overflow:hidden}
.mcard::before{content:'';position:absolute;inset:0;background:linear-gradient(135deg,rgba(255,85,0,.04),transparent);opacity:0;transition:opacity .3s}
.mcard:hover{border-color:rgba(255,85,0,.4);transform:translateY(-4px);box-shadow:0 14px 36px rgba(255,85,0,.11)}
.mcard:hover::before{opacity:1}
.mcard.unavail{opacity:.45;pointer-events:none}
.occ-card{background:#181818;border:2px solid rgba(255,85,0,.09);padding:18px 10px;text-align:center;cursor:pointer;transition:all .2s;font-family:'Oswald',sans-serif;font-size:11px;letter-spacing:1.2px;color:#666;text-transform:uppercase}
.occ-card:hover,.occ-card.sel{border-color:#FF5500;color:#FF5500;background:rgba(255,85,0,.06)}
.qty-btn{background:none;border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:16px;font-weight:700;transition:transform .15s}
.qty-btn:hover{transform:scale(1.25)}
.toast{position:fixed;bottom:22px;right:22px;background:#161616;border:1px solid rgba(255,85,0,.38);color:#F8F3EC;padding:12px 17px;font-family:'DM Sans',sans-serif;font-size:13px;z-index:9999;animation:slideRight .3s ease;max-width:300px;display:flex;align-items:center;gap:9px;box-shadow:0 6px 28px rgba(0,0,0,.55)}
.eyebrow{font-family:'DM Sans',sans-serif;font-size:10.5px;color:#FF5500;letter-spacing:4px;text-transform:uppercase;margin-bottom:9px;display:flex;align-items:center;gap:9px}
.eyebrow::before,.eyebrow::after{content:'';flex:1;max-width:36px;height:1px;background:#FF5500;opacity:.45}
.cart-badge{position:absolute;top:-6px;right:-6px;background:#FF5500;color:#fff;width:18px;height:18px;border-radius:50%;font-size:9.5px;font-family:'Oswald',sans-serif;font-weight:700;display:flex;align-items:center;justify-content:center}
.star{color:#FFB800}
.urgent-card{animation:urgentPulse 2s ease infinite;border-color:rgba(244,67,54,.4)!important}
.timer-badge{animation:timerPulse 2s infinite}
.pickup-opt{border:2px solid rgba(255,85,0,.12);background:#131313;padding:16px;cursor:pointer;transition:all .22s;text-align:center}
.pickup-opt:hover,.pickup-opt.sel{border-color:#FF5500;background:rgba(255,85,0,.07)}
.arrival-chip{border:1.5px solid rgba(255,85,0,.18);background:#1a1a1a;padding:9px 13px;cursor:pointer;transition:all .18s;font-family:'DM Sans',sans-serif;font-size:13px;color:#666}
.arrival-chip:hover,.arrival-chip.sel{border-color:#FF5500;background:rgba(255,85,0,.1);color:#FF5500}
.step-line{flex:1;height:1px;background:#1e1e1e;transition:background .3s}
.step-line.done{background:#4CAF50}
.adm-stat{background:#131313;border:1px solid rgba(255,85,0,.09);padding:22px;text-align:center}
.whatsapp-float{position:fixed;bottom:22px;left:22px;z-index:990;background:#25D366;border:none;cursor:pointer;width:52px;height:52px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:24px;box-shadow:0 4px 18px rgba(37,211,102,.45);transition:all .25s}
.whatsapp-float:hover{transform:scale(1.1);box-shadow:0 6px 24px rgba(37,211,102,.6)}
@media(max-width:768px){
  .d-only{display:none!important}
  .hero-g{grid-template-columns:1fr!important}
  .checkout-g{grid-template-columns:1fr!important}
  .occ-g{grid-template-columns:repeat(3,1fr)!important}
  .admin-g{grid-template-columns:repeat(2,1fr)!important}
  .footer-g{grid-template-columns:1fr 1fr!important}
  .why-g{grid-template-columns:repeat(2,1fr)!important}
  .two-col{grid-template-columns:1fr!important}
  .pickup-grid{grid-template-columns:1fr!important}
  .arrival-grid{grid-template-columns:repeat(3,1fr)!important}
}
@media(min-width:769px){.m-only{display:none!important}}
.mob-drawer{position:fixed;top:0;left:0;right:0;bottom:0;background:#0a0a0a;z-index:1000;padding:22px;display:flex;flex-direction:column;gap:4px;overflow-y:auto}
.mob-nav-btn{background:none;border:1px solid transparent;color:#666;padding:14px 16px;font-family:'Oswald',sans-serif;font-size:14.5px;letter-spacing:2px;text-transform:uppercase;cursor:pointer;display:flex;align-items:center;gap:13px;text-align:left;transition:all .18s;width:100%}
.mob-nav-btn:hover{color:#aaa}
.mob-nav-btn.act{border-color:rgba(255,85,0,.28);color:#FF5500;background:rgba(255,85,0,.04)}
`;

/* ─── DEFAULT MENU DATA ──────────────────────────────────────────────────────── */
const DEFAULT_MENU = [
  {id:1,name:'Aloo Aloo Burger',cat:'veg',price:139,desc:'Crispy fried potato patty, caramelized onion, spicy & garlic mayo',emoji:'🥔',hot:false,pop:false,available:true},
  {id:2,name:'Special Classic Veg',cat:'veg',price:189,desc:'Crispy veg patty, cucumber carrot mint salad, achari mayo',emoji:'🥗',hot:false,pop:false,available:true},
  {id:3,name:'Hottie Veggie',cat:'veg',price:179,desc:'Crispy veg patty, fiery hot sauce, pickled veggies, secret mayo',emoji:'🌶️',hot:true,pop:false,available:true},
  {id:4,name:'Peri Peri Paneer',cat:'veg',price:209,desc:'Grilled paneer, caramelized & pickled onion, potato sticks, peri peri mayo',emoji:'🧀',hot:true,pop:true,available:true},
  {id:5,name:'Smoky BBQ Paneer',cat:'veg',price:199,desc:'BBQ basted paneer, jalapeños, bell peppers, pickled cabbage, garlic mayo',emoji:'🔥',hot:true,pop:false,available:true},
  {id:6,name:'Super Cheesy Veggie',cat:'veg',price:219,desc:'Spiced potato patty with molten cheese center, special sauce',emoji:'🧀',hot:false,pop:true,available:true},
  {id:7,name:'Nacho BC Burger',cat:'veg',price:199,desc:'Veg burger with jalapeños, nacho chips, cheese sauce drizzle',emoji:'🌮',hot:true,pop:false,available:true},
  {id:8,name:'Jimis Super Grilled Chicken',cat:'non-veg',price:169,desc:'Spiced chicken patty, garlic mayo, secret sauce, hot sauce',emoji:'🍗',hot:true,pop:true,available:true},
  {id:9,name:'Peri Peri Chicken',cat:'non-veg',price:169,desc:'Grilled chicken fillet, signature peri peri sauce, fresh garden veggies',emoji:'🔥',hot:true,pop:true,available:true},
  {id:10,name:'Jimis Hottie Chicken',cat:'non-veg',price:189,desc:'Crispy fried chicken, fiery hot sauce, cool coleslaw crunch',emoji:'🌶️',hot:true,pop:false,available:true},
  {id:11,name:'Jimis Prime Chicken',cat:'non-veg',price:209,desc:'Juicy grilled chicken, honey mustard mayo, fresh lettuce',emoji:'🍯',hot:false,pop:false,available:true},
  {id:12,name:"Jimis Favourite",cat:'non-veg',price:249,desc:'Meat patty, chicken salami, fried egg, double cheese, special sauce',emoji:'⭐',hot:false,pop:true,available:true},
  {id:13,name:'Jumbo Fried Chicken',cat:'non-veg',price:219,desc:'Giant crispy chicken fillet, smoky BBQ sauce, crunchy pickles',emoji:'🍔',hot:false,pop:false,available:true},
  {id:14,name:'Classic Chicken Jawbreaker',cat:'non-veg',price:369,desc:'Double grilled chicken, salami, fried egg, double cheese, spicy mayo',emoji:'💥',hot:true,pop:true,available:true},
  {id:15,name:'7-Incher Jawbreaker',cat:'non-veg',price:499,desc:'The ULTIMATE tower — multi-layer beast, max cheese, max sauce, max glory',emoji:'🏆',hot:true,pop:true,available:true},
  {id:16,name:'Insanely Hot Wings',cat:'sides',price:199,desc:'Juicy fried wings tossed in proprietary high-heat sauce',emoji:'🔥',hot:true,pop:true,available:true},
  {id:17,name:'Classic Fries',cat:'sides',price:99,desc:'Crispy golden fries with signature dipping sauce',emoji:'🍟',hot:false,pop:false,available:true},
  {id:18,name:'Cheese Nachos',cat:'sides',price:149,desc:'Loaded nachos, jalapeños, molten cheese sauce drizzle',emoji:'🧀',hot:true,pop:false,available:true},
  {id:19,name:'Crispy Onion Rings',cat:'sides',price:119,desc:'Perfectly battered golden rings, garlic dipping mayo',emoji:'🍩',hot:false,pop:false,available:true},
  {id:20,name:'Cheese Balls',cat:'sides',price:129,desc:'Gooey molten cheese stuffed crispy balls — dangerously addictive',emoji:'⚽',hot:false,pop:true,available:true},
  {id:21,name:'Nutella Oreo Shake',cat:'drinks',price:219,desc:'Premium thick shake with rich Nutella and Oreo crumble',emoji:'🍫',hot:false,pop:true,available:true},
  {id:22,name:'Green Apple Cooler',cat:'drinks',price:149,desc:'Refreshing tart apple-mint cooler — the diner favourite',emoji:'🍏',hot:false,pop:true,available:true},
  {id:23,name:'Cold Coffee',cat:'drinks',price:129,desc:'Rich chilled coffee, perfect companion to any burger',emoji:'☕',hot:false,pop:false,available:true},
  {id:24,name:'Lemon Ice Tea',cat:'drinks',price:99,desc:'Freshly brewed iced tea with lemon zest',emoji:'🍋',hot:false,pop:false,available:true},
  {id:25,name:'Mango Shake',cat:'drinks',price:149,desc:'Fresh Alphonso mango thick shake',emoji:'🥭',hot:false,pop:false,available:true},
];

const OCCASIONS = [
  {id:'birthday',label:'Birthday',icon:'🎂'},
  {id:'anniversary',label:'Anniversary',icon:'💑'},
  {id:'corporate',label:'Corporate',icon:'💼'},
  {id:'wedding',label:'Wedding',icon:'💍'},
  {id:'graduation',label:'Graduation',icon:'🎓'},
  {id:'other',label:'Other Event',icon:'🎉'},
];

const ARRIVAL_OPTIONS = [
  {min:10,label:'10 min',urgency:'high'},
  {min:15,label:'15 min',urgency:'high'},
  {min:20,label:'20 min',urgency:'med'},
  {min:30,label:'30 min',urgency:'med'},
  {min:45,label:'45 min',urgency:'low'},
  {min:60,label:'1 hour',urgency:'low'},
];

/* ─── STORAGE ────────────────────────────────────────────────────────────────── */
const db = {
  async get(k){try{const r=await window.storage?.get(k);return r?JSON.parse(r.value):null;}catch{try{return JSON.parse(localStorage.getItem('jb_'+k));}catch{return null;}}},
  async set(k,v){try{await window.storage?.set(k,JSON.stringify(v));}catch{}try{localStorage.setItem('jb_'+k,JSON.stringify(v));}catch{}},
};

/* ─── HELPERS ─────────────────────────────────────────────────────────────────── */
const fmtCur = n => `₹${Number(n).toLocaleString('en-IN')}`;
const statusColor = s => s==='confirmed'||s==='approved'||s==='delivered'||s==='completed'?'#4CAF50':s==='pending'?'#FFB800':s==='preparing'||s==='ready'?'#FF5500':s==='out-for-delivery'?'#2196F3':'#888';
const urgencyColor = u => u==='high'?'#F44336':u==='med'?'#FFB800':'#4CAF50';

/* ─── WHATSAPP NOTIFICATION ──────────────────────────────────────────────────── */
function sendWhatsApp(order, menuItems) {
  const isEvent = order.id?.startsWith('EVT');
  let msg = '';
  if (isEvent) {
    msg = `🎉 *NEW EVENT ORDER — ${order.id}*\n\n`;
    msg += `📋 *Occasion:* ${order.occasion?.toUpperCase()}\n`;
    if (order.bPerson) msg += `🎂 *For:* ${order.bPerson}\n`;
    msg += `📅 *Date:* ${order.date}${order.time?' at '+order.time:''}\n`;
    msg += `👥 *Guests:* ${order.guests}\n`;
    msg += `📞 *Contact:* ${order.name} — ${order.phone}\n`;
    if (order.address) msg += `📍 *Address:* ${order.address}\n`;
    if (order.notes) msg += `📝 *Notes:* ${order.notes}\n`;
    const items = Object.entries(order.itemQtys||{}).filter(([,q])=>q>0);
    if (items.length) {
      msg += `\n🍔 *Menu Selected:*\n`;
      items.forEach(([id,q])=>{const it=menuItems.find(m=>m.id===+id);if(it)msg+=`  ${it.emoji} ${it.name} × ${q} = ${fmtCur(it.price*q)}\n`;});
    }
    if (order.estimatedTotal) msg += `\n💰 *Est. Total:* ${fmtCur(order.estimatedTotal)}\n`;
    msg += `\n⚡ Please call to confirm!`;
  } else {
    const orderTypeLabel = order.type==='dine-in'?`🪑 DINE-IN (arrive in ${order.arrivalMins} min)`:order.type==='pickup'?`🏪 PICKUP (arrive in ${order.arrivalMins} min)`:'🚴 DELIVERY';
    msg = `🍔 *NEW ORDER — ${order.id}*\n\n`;
    msg += `📦 *Type:* ${orderTypeLabel}\n`;
    if (order.type!=='delivery') {
      msg += `⏰ *Customer arrives in:* ${order.arrivalMins} MINUTES — Prepare by ${order.readyByTime}\n`;
      const urgLabel = order.arrivalMins<=15?'🔴 URGENT':order.arrivalMins<=30?'🟡 MODERATE':'🟢 RELAXED';
      msg += `🚦 *Priority:* ${urgLabel}\n`;
    }
    msg += `\n👤 *Customer:* ${order.userName||'Guest'}\n`;
    msg += `📞 *Phone:* ${order.phone||'Not provided'}\n`;
    if (order.type==='delivery') msg += `📍 *Deliver to:* ${order.address}\n`;
    msg += `\n🛒 *Items:*\n`;
    order.items?.forEach(i => { msg += `  ${i.emoji} ${i.name} × ${i.qty} = ${fmtCur(i.price*i.qty)}\n`; });
    msg += `\n💳 *Payment:* ${(order.pay||'').toUpperCase()}\n`;
    msg += `💰 *Total:* ${fmtCur(order.total)}\n`;
    if (order.note) msg += `📝 *Note:* ${order.note}\n`;
    msg += `\n🕒 *Ordered at:* ${order.date}`;
  }
  const url = `https://wa.me/${OWNER_WHATSAPP}?text=${encodeURIComponent(msg)}`;
  window.open(url, '_blank');
}

/* ─── COUNTDOWN TIMER COMPONENT ─────────────────────────────────────────────── */
function CountdownTimer({ arrivalMins, orderedAt }) {
  const [remaining, setRemaining] = useState(null);
  useEffect(() => {
    const calc = () => {
      const ordered = new Date(orderedAt).getTime();
      const deadline = ordered + arrivalMins * 60000;
      const diff = Math.max(0, Math.floor((deadline - Date.now()) / 1000));
      setRemaining(diff);
    };
    calc();
    const t = setInterval(calc, 1000);
    return () => clearInterval(t);
  }, [arrivalMins, orderedAt]);
  if (remaining === null) return null;
  const mins = Math.floor(remaining / 60);
  const secs = remaining % 60;
  const isUrgent = remaining < 300;
  const isDone = remaining === 0;
  return (
    <span className={isUrgent && !isDone ? 'timer-badge' : ''} style={{background:isDone?'rgba(244,67,54,.18)':isUrgent?'rgba(244,67,54,.14)':'rgba(255,85,0,.12)',color:isDone?'#F44336':isUrgent?'#FF6B6B':'#FF5500',padding:'3px 9px',fontFamily:"'Oswald',sans-serif",fontSize:13,letterSpacing:.8,display:'inline-flex',alignItems:'center',gap:5}}>
      ⏱ {isDone ? 'CUSTOMER HERE!' : `${mins}:${String(secs).padStart(2,'0')} left`}
    </span>
  );
}

/* ─── TOAST ──────────────────────────────────────────────────────────────────── */
function Toast({msg,onClose}){
  useEffect(()=>{const t=setTimeout(onClose,3500);return()=>clearTimeout(t);},[msg]);
  if(!msg)return null;
  return <div className="toast"><span style={{color:'#FF5500',fontSize:16}}>✓</span><span>{msg}</span></div>;
}

/* ─── NAVBAR ─────────────────────────────────────────────────────────────────── */
function Navbar({page,go,user,cart,mobileOpen,setMobileOpen}){
  const n=cart.reduce((s,i)=>s+i.qty,0);
  return(
    <nav style={{position:'fixed',top:0,left:0,right:0,zIndex:200,background:'rgba(10,10,10,.97)',backdropFilter:'blur(16px)',borderBottom:'1px solid rgba(255,85,0,.07)',height:60,display:'flex',alignItems:'center',justifyContent:'space-between',padding:'0 22px'}}>
      <button onClick={()=>go('home')} style={{background:'none',border:'none',cursor:'pointer',display:'flex',alignItems:'center',gap:9}}>
        <div style={{width:33,height:33,background:'linear-gradient(135deg,#FF5500,#FF8833)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:16}}>🍔</div>
        <div>
          <div style={{fontFamily:"'Oswald',sans-serif",fontSize:16,fontWeight:700,color:'#F8F3EC',letterSpacing:3,lineHeight:1.1}}>JIMIS</div>
          <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:7.5,color:'#FF5500',letterSpacing:3.5,textTransform:'uppercase'}}>BURGER · SANGLI</div>
        </div>
      </button>
      <div className="d-only" style={{display:'flex',alignItems:'center',gap:26}}>
        {[['home','Home'],['menu','Menu'],['special-order','Events'],['about','About']].map(([p,l])=>(
          <button key={p} className={`nav-lnk ${page===p?'act':''}`} onClick={()=>go(p)}>{l}</button>
        ))}
        {user?.isAdmin&&<button className={`nav-lnk ${page==='admin'?'act':''}`} onClick={()=>go('admin')}>⚡ Admin</button>}
      </div>
      <div style={{display:'flex',alignItems:'center',gap:13}}>
        <button onClick={()=>go('cart')} style={{background:'none',border:'none',cursor:'pointer',position:'relative',color:'#F8F3EC',fontSize:19,lineHeight:1,padding:2}}>
          🛒{n>0&&<span className="cart-badge">{n}</span>}
        </button>
        {user?(
          <button className="nav-lnk" onClick={()=>go('profile')} style={{display:'flex',alignItems:'center',gap:6}}>
            <span style={{background:'#FF5500',width:22,height:22,display:'inline-flex',alignItems:'center',justifyContent:'center',fontSize:10.5,fontWeight:700,color:'#fff',fontFamily:"'Oswald',sans-serif"}}>{(user.name||'?')[0].toUpperCase()}</span>
            <span className="d-only" style={{display:'inline'}}>{user.name?.split(' ')[0]}</span>
          </button>
        ):(
          <button className="btn-primary d-only" style={{padding:'7px 16px',fontSize:11.5}} onClick={()=>go('auth')}>Sign In</button>
        )}
        <button className="m-only" onClick={()=>setMobileOpen(!mobileOpen)} style={{background:'none',border:'none',cursor:'pointer',color:'#F8F3EC',fontSize:19,display:'none'}}>
          {mobileOpen?'✕':'☰'}
        </button>
      </div>
    </nav>
  );
}

/* ─── MOBILE DRAWER ──────────────────────────────────────────────────────────── */
function MobileDrawer({page,go,user,close}){
  const items=[['home','🏠','Home'],['menu','🍔','Menu'],['special-order','🎉','Events & Bulk Orders'],['about','ℹ️','About'],['cart','🛒','My Cart'],['profile','👤','Profile']];
  return(
    <div className="mob-drawer fade-in">
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:22}}>
        <div style={{fontFamily:"'Oswald',sans-serif",fontSize:19,fontWeight:700,color:'#F8F3EC',letterSpacing:2}}>JIMIS <span style={{color:'#FF5500'}}>BURGER</span></div>
        <button onClick={close} style={{background:'none',border:'none',cursor:'pointer',color:'#555',fontSize:21}}>✕</button>
      </div>
      {items.map(([p,icon,label])=>(
        <button key={p} className={`mob-nav-btn ${page===p?'act':''}`} onClick={()=>{go(p);close();}}>
          <span style={{fontSize:18}}>{icon}</span>{label}
        </button>
      ))}
      {user?.isAdmin&&<button className="mob-nav-btn" onClick={()=>{go('admin');close();}}><span style={{fontSize:18}}>⚡</span>Admin Panel</button>}
      <div style={{marginTop:'auto',paddingTop:22,borderTop:'1px solid rgba(255,85,0,.08)'}}>
        {!user&&<button className="btn-primary" style={{width:'100%',padding:14}} onClick={()=>{go('auth');close();}}>Sign In / Register</button>}
      </div>
    </div>
  );
}

/* ─── HOME PAGE ──────────────────────────────────────────────────────────────── */
function HomePage({go,menuItems}){
  const reviews=[
    {n:'Rahul M.',r:5,t:'Just mind-blowing place! The Peri Peri Chicken is an absolute must-try. Love it every time.',tag:'Peri Peri Chicken'},
    {n:'Priya S.',r:5,t:'Peri Peri Chicken with Green Apple Cooler — perfect meal for any food lover. Great vibes!',tag:'Green Apple Cooler'},
    {n:'Aditya K.',r:4,t:'Good quality burgers, great packing, delivery was on time. Friendly staff — will return!',tag:'Delivery'},
    {n:'Sneha P.',r:5,t:"Heaven for burger lovers. Crispy outside, soft inside — they haven't lost their edge since day one.",tag:'Jawbreaker'},
    {n:'Vishal R.',r:5,t:'Cosy atmosphere, great ambiance. Perfect spot to hang with friends. My go-to place in Sangli!',tag:'Dine-in'},
    {n:'Meena D.',r:4,t:'Tasty veg burgers, peri peri chicken, cold coffee — all great. Well sanitised. Highly recommended.',tag:'Veg Options'},
  ];
  return(
    <div>
      {/* HERO */}
      <section style={{minHeight:'100vh',display:'flex',alignItems:'center',paddingTop:60,position:'relative',overflow:'hidden',background:'radial-gradient(ellipse at 15% 55%,rgba(255,85,0,.1) 0%,transparent 55%),radial-gradient(ellipse at 85% 15%,rgba(255,150,0,.06) 0%,transparent 45%),#0a0a0a'}}>
        <div style={{position:'absolute',top:'10%',right:'-10%',width:600,height:600,borderRadius:'50%',background:'radial-gradient(circle,rgba(255,85,0,.06) 0%,transparent 68%)',pointerEvents:'none'}}/>
        <div style={{maxWidth:1180,margin:'0 auto',padding:'80px 22px',display:'grid',gridTemplateColumns:'1fr 1fr',gap:52,alignItems:'center',width:'100%'}} className="hero-g">
          <div className="fade-up">
            <div className="eyebrow" style={{justifyContent:'flex-start'}}>Sangli's Finest · Est. 2019</div>
            <h1 style={{fontFamily:"'Oswald',sans-serif",fontSize:'clamp(54px,8vw,98px)',fontWeight:700,lineHeight:.92,color:'#F8F3EC',textTransform:'uppercase',marginBottom:18}}>
              JIMIS<br/><span style={{color:'#FF5500'}}>BURGER</span>
            </h1>
            <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:15,color:'#7a7265',lineHeight:1.85,marginBottom:30,maxWidth:420}}>
              Handcrafted gourmet burgers built for maximum flavour. Walk in, pick up, or get it delivered — your way, every time.
            </p>
            <div style={{display:'flex',alignItems:'center',gap:22,marginBottom:34,flexWrap:'wrap'}}>
              {[['4.3★','1,500+ reviews'],['6,600+','Delivery reviews'],['#1','In Sangli']].map(([v,l])=>(
                <div key={l}>
                  <div style={{fontFamily:"'Oswald',sans-serif",fontSize:22,fontWeight:700,color:'#FF5500'}}>{v}</div>
                  <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:10.5,color:'#3e3e3e',marginTop:1}}>{l}</div>
                </div>
              ))}
            </div>
            <div style={{display:'flex',gap:11,flexWrap:'wrap'}}>
              <button className="btn-primary" onClick={()=>go('menu')}>Order Now →</button>
              <button className="btn-outline" onClick={()=>go('special-order')}>Book Event</button>
            </div>
          </div>
          <div className="float-anim d-only" style={{display:'flex',justifyContent:'center',alignItems:'center',position:'relative'}}>
            <div style={{position:'relative',textAlign:'center'}}>
              <div style={{fontSize:180,lineHeight:1,filter:'drop-shadow(0 22px 55px rgba(255,85,0,.3))'}}>🍔</div>
              {[{pos:{top:-18,left:-85},c:'#FF5500',bc:'rgba(255,85,0,.28)',txt:'🔥 INSANELY HOT'},
                {pos:{top:'44%',right:-88},c:'#FFB800',bc:'rgba(255,184,0,.25)',txt:'⭐ 4.3 RATED'},
                {pos:{bottom:28,left:-55},c:'#4CAF50',bc:'rgba(76,175,80,.25)',txt:'✓ Fresh Daily'}].map((b,i)=>(
                <div key={i} style={{position:'absolute',...b.pos,background:'#131313',border:`1px solid ${b.bc}`,padding:'7px 13px',fontFamily:"'Oswald',sans-serif",fontSize:11.5,color:b.c,letterSpacing:1.2,whiteSpace:'nowrap',boxShadow:'0 4px 14px rgba(0,0,0,.5)'}}>
                  {b.txt}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ORDER OPTIONS HIGHLIGHT */}
      <section style={{background:'#0d0d0d',padding:'64px 22px',borderTop:'1px solid rgba(255,85,0,.07)'}}>
        <div style={{maxWidth:1100,margin:'0 auto'}}>
          <div style={{textAlign:'center',marginBottom:44}}>
            <div className="eyebrow" style={{justifyContent:'center'}}>How It Works</div>
            <h2 style={{fontFamily:"'Oswald',sans-serif",fontSize:'clamp(26px,4vw,44px)',fontWeight:700,color:'#F8F3EC',textTransform:'uppercase',letterSpacing:2}}>ORDER YOUR WAY</h2>
          </div>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))',gap:16}}>
            {[
              {icon:'🚴',t:'Delivery',d:'Order online, we deliver hot to your door. Est. 30–45 min.',c:'#FF5500'},
              {icon:'🏪',t:'Pickup — Skip the Queue',d:"Tell us you're arriving in X minutes. We'll have it hot and ready when you walk in.",c:'#FFB800'},
              {icon:'🪑',t:'Dine-In Pre-Order',d:"Heading to the restaurant? Order ahead, walk in and eat — zero wait time.",c:'#4CAF50'},
              {icon:'🎉',t:'Bulk / Events',d:'Big party? Book in advance, we prepare fresh for your entire guest list.',c:'#2196F3'},
            ].map(f=>(
              <div key={f.t} style={{padding:24,background:'#111',border:`1px solid ${f.c}22`,cursor:'pointer',transition:'all .22s'}} onClick={()=>go(f.t==='Bulk / Events'?'special-order':'menu')} onMouseOver={e=>e.currentTarget.style.borderColor=f.c+'55'} onMouseOut={e=>e.currentTarget.style.borderColor=f.c+'22'}>
                <div style={{fontSize:36,marginBottom:13}}>{f.icon}</div>
                <h3 style={{fontFamily:"'Oswald',sans-serif",fontSize:15,fontWeight:600,color:'#F8F3EC',textTransform:'uppercase',letterSpacing:.8,marginBottom:8,color:f.c}}>{f.t}</h3>
                <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:13,color:'#525252',lineHeight:1.75}}>{f.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* POPULAR ITEMS */}
      <section style={{background:'#0a0a0a',padding:'86px 22px'}}>
        <div style={{maxWidth:1180,margin:'0 auto'}}>
          <div style={{textAlign:'center',marginBottom:50}}>
            <div className="eyebrow" style={{justifyContent:'center'}}>Fan Favourites</div>
            <h2 style={{fontFamily:"'Oswald',sans-serif",fontSize:'clamp(28px,4.5vw,50px)',fontWeight:700,color:'#F8F3EC',textTransform:'uppercase',letterSpacing:2}}>THE LEGENDS</h2>
          </div>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(248px,1fr))',gap:16}}>
            {menuItems.filter(i=>i.pop&&i.available).slice(0,4).map(item=>(
              <div key={item.id} className="mcard" style={{padding:20,cursor:'pointer'}} onClick={()=>go('menu')}>
                <div style={{fontSize:50,textAlign:'center',marginBottom:13}}>{item.emoji}</div>
                <div style={{display:'flex',justifyContent:'space-between',marginBottom:5}}>
                  <h3 style={{fontFamily:"'Oswald',sans-serif",fontSize:15.5,fontWeight:600,color:'#F8F3EC',textTransform:'uppercase',flex:1,lineHeight:1.25}}>{item.name}</h3>
                  {item.hot&&<span style={{fontSize:12,marginLeft:5}}>🔥</span>}
                </div>
                <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:12,color:'#525252',lineHeight:1.65,marginBottom:15}}>{item.desc}</p>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                  <span style={{fontFamily:"'Oswald',sans-serif",fontSize:21,fontWeight:700,color:'#FF5500'}}>{fmtCur(item.price)}</span>
                  <span style={{background:item.cat==='veg'?'rgba(76,175,80,.1)':'rgba(244,67,54,.09)',color:item.cat==='veg'?'#4CAF50':'#F44336',fontSize:9,padding:'2px 7px',fontFamily:"'DM Sans',sans-serif",textTransform:'uppercase'}}>
                    {item.cat==='veg'?'● VEG':'● NON-VEG'}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <div style={{textAlign:'center',marginTop:38}}>
            <button className="btn-outline" onClick={()=>go('menu')}>View Full Menu →</button>
          </div>
        </div>
      </section>

      {/* EVENT CTA */}
      <section style={{padding:'78px 22px',background:'linear-gradient(135deg,rgba(255,85,0,.07) 0%,rgba(255,184,0,.03) 100%)',borderTop:'1px solid rgba(255,85,0,.1)',borderBottom:'1px solid rgba(255,85,0,.1)'}}>
        <div style={{maxWidth:740,margin:'0 auto',textAlign:'center'}}>
          <div style={{fontSize:50,marginBottom:16}}>🎂</div>
          <h2 style={{fontFamily:"'Oswald',sans-serif",fontSize:'clamp(24px,4vw,46px)',fontWeight:700,color:'#F8F3EC',textTransform:'uppercase',letterSpacing:2,marginBottom:14}}>PLANNING A BIG EVENT?</h2>
          <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:14.5,color:'#7a7265',lineHeight:1.85,marginBottom:34,maxWidth:520,margin:'0 auto 34px'}}>
            Birthdays, weddings, graduations, corporate meetups — book in advance and let us handle the feast. Freshly prepared, delivered on time.
          </p>
          <button className="btn-primary" onClick={()=>go('special-order')} style={{fontSize:14,padding:'14px 30px'}}>Plan Your Event →</button>
        </div>
      </section>

      {/* REVIEWS */}
      <section style={{padding:'86px 22px',background:'#0a0a0a'}}>
        <div style={{maxWidth:1180,margin:'0 auto'}}>
          <div style={{textAlign:'center',marginBottom:48}}>
            <div className="eyebrow" style={{justifyContent:'center'}}>1500+ Reviews</div>
            <h2 style={{fontFamily:"'Oswald',sans-serif",fontSize:'clamp(26px,4vw,44px)',fontWeight:700,color:'#F8F3EC',textTransform:'uppercase',letterSpacing:2}}>WHAT THEY SAY</h2>
          </div>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(265px,1fr))',gap:16}}>
            {reviews.map((r,i)=>(
              <div key={i} style={{background:'#111',border:'1px solid rgba(255,85,0,.07)',padding:20}}>
                <div style={{display:'flex',marginBottom:10}}>{[...Array(r.r)].map((_,j)=><span key={j} className="star" style={{fontSize:13}}>★</span>)}{[...Array(5-r.r)].map((_,j)=><span key={j} style={{color:'#252525',fontSize:13}}>★</span>)}</div>
                <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:13,color:'#7a7265',lineHeight:1.75,marginBottom:16,fontStyle:'italic'}}>"{r.t}"</p>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                  <span style={{fontFamily:"'Oswald',sans-serif",fontSize:13,color:'#F8F3EC',fontWeight:600}}>{r.n}</span>
                  <span style={{background:'rgba(255,85,0,.08)',color:'#FF5500',fontSize:10,padding:'2px 8px',fontFamily:"'DM Sans',sans-serif"}}>{r.tag}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{background:'#060606',borderTop:'1px solid rgba(255,85,0,.07)',padding:'58px 22px 26px'}}>
        <div style={{maxWidth:1180,margin:'0 auto'}}>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(185px,1fr))',gap:34,marginBottom:40}} className="footer-g">
            <div>
              <div style={{fontFamily:"'Oswald',sans-serif",fontSize:20,fontWeight:700,color:'#F8F3EC',letterSpacing:3,marginBottom:13}}>JIMIS <span style={{color:'#FF5500'}}>BURGER</span></div>
              <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:12.5,color:'#3d3d3d',lineHeight:1.85}}>Sangli's gourmet burger destination since 2019. From street cart to iconic brand.</p>
            </div>
            <div>
              <div style={{fontFamily:"'Oswald',sans-serif",fontSize:11,color:'#FF5500',letterSpacing:2.5,marginBottom:13,textTransform:'uppercase'}}>Location</div>
              <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:12.5,color:'#3d3d3d',lineHeight:1.9}}>Shop 30/2B, Plot 3, Ground Floor<br/>Krishna Height Apartment<br/>Kuowad, Miraj-Sangli Road<br/>Sangli — 416416</p>
            </div>
            <div>
              <div style={{fontFamily:"'Oswald',sans-serif",fontSize:11,color:'#FF5500',letterSpacing:2.5,marginBottom:13,textTransform:'uppercase'}}>Hours & Contact</div>
              <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:12.5,color:'#3d3d3d',lineHeight:1.9}}>Mon – Sun: 11:00 AM – 10:45 PM<br/>📞 +91-84080 26942</p>
            </div>
            <div>
              <div style={{fontFamily:"'Oswald',sans-serif",fontSize:11,color:'#FF5500',letterSpacing:2.5,marginBottom:13,textTransform:'uppercase'}}>Order On</div>
              <div style={{display:'flex',flexDirection:'column',gap:9}}>
                {[['https://www.zomato.com/sangli/jimis-burger-sangli-locality','#E23744','Zomato'],['https://www.swiggy.com/city/sangli/jimis-burger-kuowad-miraj-sangli-rest415692','#FC8019','Swiggy']].map(([href,c,label])=>(
                  <a key={label} href={href} target="_blank" rel="noopener noreferrer" style={{fontFamily:"'DM Sans',sans-serif",fontSize:12.5,color:'#4a4a4a',textDecoration:'none',display:'flex',alignItems:'center',gap:7,transition:'color .2s'}} onMouseOver={e=>e.currentTarget.style.color=c} onMouseOut={e=>e.currentTarget.style.color='#4a4a4a'}>
                    <span style={{color:c,fontSize:9}}>●</span>{label}
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div style={{borderTop:'1px solid rgba(255,85,0,.05)',paddingTop:20,display:'flex',justifyContent:'space-between',flexWrap:'wrap',gap:8}}>
            <span style={{fontFamily:"'DM Sans',sans-serif",fontSize:11,color:'#252525'}}>© 2024 Jimis Burger. All rights reserved.</span>
            <span style={{fontFamily:"'DM Sans',sans-serif",fontSize:11,color:'#252525'}}>Vikas Nagar, Sangli, Maharashtra</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

/* ─── MENU PAGE ──────────────────────────────────────────────────────────────── */
function MenuPage({cart,setCart,addToast,menuItems}){
  const [filter,setFilter]=useState('all');
  const [search,setSearch]=useState('');
  const cats=[['all','All ✦'],['veg','🟢 Veg'],['non-veg','🔴 Non-Veg'],['sides','🍟 Sides'],['drinks','🥤 Drinks']];
  const list=menuItems.filter(i=>(filter==='all'||i.cat===filter)&&(!search||i.name.toLowerCase().includes(search.toLowerCase())));
  const add=(item)=>{setCart(p=>{const e=p.find(c=>c.id===item.id);return e?p.map(c=>c.id===item.id?{...c,qty:c.qty+1}:c):[...p,{...item,qty:1}];});addToast(`${item.name} added!`);};
  const upd=(item,d)=>setCart(p=>p.map(c=>c.id===item.id?{...c,qty:c.qty+d}:c).filter(c=>c.qty>0));
  const qty=(id)=>cart.find(c=>c.id===id)?.qty||0;
  return(
    <div style={{paddingTop:60,minHeight:'100vh',background:'#0a0a0a'}}>
      <div style={{background:'#0d0d0d',borderBottom:'1px solid rgba(255,85,0,.07)',padding:'38px 22px 26px'}}>
        <div style={{maxWidth:1180,margin:'0 auto'}}>
          <div className="eyebrow">Our Offerings</div>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-end',flexWrap:'wrap',gap:14}}>
            <h1 style={{fontFamily:"'Oswald',sans-serif",fontSize:'clamp(32px,5vw,56px)',fontWeight:700,color:'#F8F3EC',textTransform:'uppercase',letterSpacing:2}}>FULL MENU</h1>
            <input className="inp" placeholder="🔍  Search menu..." value={search} onChange={e=>setSearch(e.target.value)} style={{maxWidth:256}}/>
          </div>
        </div>
      </div>
      <div style={{borderBottom:'1px solid rgba(255,85,0,.06)',background:'#0a0a0a',padding:'13px 22px',overflowX:'auto'}}>
        <div style={{maxWidth:1180,margin:'0 auto',display:'flex',gap:7,width:'max-content'}}>
          {cats.map(([k,l])=><button key={k} className={`tab-btn ${filter===k?'act':''}`} onClick={()=>setFilter(k)}>{l}</button>)}
        </div>
      </div>
      <div style={{maxWidth:1180,margin:'0 auto',padding:'32px 22px'}}>
        {list.length===0?<div style={{textAlign:'center',padding:'60px 0',color:'#3a3a3a',fontFamily:"'DM Sans',sans-serif",fontSize:14}}>No items found.</div>:(
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(265px,1fr))',gap:15}}>
            {list.map(item=>{
              const q=qty(item.id);
              return(
                <div key={item.id} className={`mcard ${!item.available?'unavail':''}`} style={{padding:19}}>
                  {!item.available&&<div style={{position:'absolute',top:10,right:10,background:'rgba(244,67,54,.14)',color:'#F44336',fontSize:9,padding:'2px 7px',fontFamily:"'DM Sans',sans-serif",textTransform:'uppercase',zIndex:2}}>Unavailable</div>}
                  <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:11}}>
                    <span style={{fontSize:44}}>{item.emoji}</span>
                    <div style={{display:'flex',flexDirection:'column',alignItems:'flex-end',gap:4}}>
                      {item.pop&&<span style={{background:'rgba(255,184,0,.11)',color:'#FFB800',fontSize:8.5,padding:'2px 6px',fontFamily:"'Oswald',sans-serif",letterSpacing:.8}}>POPULAR</span>}
                      {item.hot&&<span style={{fontSize:12}}>🔥</span>}
                      <span style={{background:item.cat==='veg'?'rgba(76,175,80,.09)':item.cat==='non-veg'?'rgba(244,67,54,.09)':'rgba(255,85,0,.09)',color:item.cat==='veg'?'#4CAF50':item.cat==='non-veg'?'#F44336':'#FF5500',fontSize:8.5,padding:'2px 6px',fontFamily:"'DM Sans',sans-serif",textTransform:'uppercase'}}>
                        {item.cat==='veg'?'● VEG':item.cat==='non-veg'?'● NON-VEG':item.cat.toUpperCase()}
                      </span>
                    </div>
                  </div>
                  <h3 style={{fontFamily:"'Oswald',sans-serif",fontSize:15,fontWeight:600,color:'#F8F3EC',textTransform:'uppercase',letterSpacing:.4,marginBottom:5,lineHeight:1.3}}>{item.name}</h3>
                  <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:11.5,color:'#4a4a4a',lineHeight:1.65,marginBottom:15,minHeight:32}}>{item.desc}</p>
                  <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                    <span style={{fontFamily:"'Oswald',sans-serif",fontSize:21,fontWeight:700,color:'#FF5500'}}>{fmtCur(item.price)}</span>
                    {item.available&&(q===0?(
                      <button className="btn-primary" style={{padding:'7px 16px',fontSize:11.5}} onClick={()=>add(item)}>+ ADD</button>
                    ):(
                      <div style={{display:'flex',alignItems:'center',background:'#1a1a1a',border:'1px solid rgba(255,85,0,.28)'}}>
                        <button className="qty-btn" onClick={()=>upd(item,-1)} style={{width:30,height:30,color:'#FF5500'}}>−</button>
                        <span style={{fontFamily:"'Oswald',sans-serif",fontSize:14,fontWeight:700,color:'#F8F3EC',width:22,textAlign:'center'}}>{q}</span>
                        <button className="qty-btn" onClick={()=>upd(item,1)} style={{width:30,height:30,background:'#FF5500',color:'#fff'}}>+</button>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── CART / CHECKOUT PAGE ───────────────────────────────────────────────────── */
function CartPage({cart,setCart,user,go,addOrder,addToast,menuItems}){
  const [step,setStep]=useState(1);
  const [f,setF]=useState({address:user?.address||'',phone:user?.phone||'',type:'delivery',pay:'upi',note:'',arrivalMins:20,customArrival:''});
  const [done,setDone]=useState(null);
  const sf=(k,v)=>setF(p=>({...p,[k]:v}));
  const upd=(item,d)=>setCart(p=>p.map(c=>c.id===item.id?{...c,qty:c.qty+d}:c).filter(c=>c.qty>0));
  const sub=cart.reduce((s,i)=>s+i.price*i.qty,0);
  const del=f.type==='delivery'?30:0;
  const tax=Math.round(sub*.05);
  const grand=sub+del+tax;
  const arrMins=f.arrivalMins==='custom'?parseInt(f.customArrival)||20:f.arrivalMins;

  const getReadyByTime=()=>{
    const d=new Date();d.setMinutes(d.getMinutes()+arrMins);
    return d.toLocaleTimeString('en-IN',{hour:'2-digit',minute:'2-digit'});
  };

  const place=()=>{
    if(!user){go('auth');return;}
    if(f.type==='delivery'&&!f.address){addToast('Enter delivery address');return;}
    if(!f.phone){addToast('Enter your phone number');return;}
    const readyByTime=getReadyByTime();
    const o={
      id:'JB'+Date.now(),items:[...cart],total:grand,...f,
      arrivalMins:f.type!=='delivery'?arrMins:null,
      readyByTime:f.type!=='delivery'?readyByTime:null,
      orderedAtISO:new Date().toISOString(),
      status:'confirmed',date:new Date().toLocaleString('en-IN'),
      userId:user.id,userName:user.name
    };
    addOrder(o);
    setCart([]);
    sendWhatsApp(o,menuItems);
    setDone(o);
  };

  if(done) return(
    <div style={{paddingTop:60,minHeight:'100vh',background:'#0a0a0a',display:'flex',alignItems:'center',justifyContent:'center',padding:'80px 22px'}}>
      <div className="scale-in" style={{textAlign:'center',maxWidth:480,width:'100%'}}>
        <div style={{width:76,height:76,background:'rgba(76,175,80,.1)',border:'2px solid #4CAF50',borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',fontSize:32,margin:'0 auto 22px'}}>✓</div>
        <h2 style={{fontFamily:"'Oswald',sans-serif",fontSize:32,color:'#F8F3EC',textTransform:'uppercase',letterSpacing:2,marginBottom:9}}>Order Confirmed!</h2>
        <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:14,color:'#525252',marginBottom:14}}>Order <span style={{color:'#FF5500'}}>{done.id}</span> is placed.</p>
        {done.type!=='delivery'&&(
          <div style={{background:'rgba(255,85,0,.07)',border:'1px solid rgba(255,85,0,.25)',padding:'14px 18px',marginBottom:18}}>
            <div style={{fontFamily:"'Oswald',sans-serif",fontSize:13,color:'#FF5500',letterSpacing:1,marginBottom:6}}>
              {done.type==='dine-in'?'🪑 YOUR TABLE WILL BE READY':'🏪 YOUR ORDER WILL BE READY'}
            </div>
            <div style={{fontFamily:"'Oswald',sans-serif",fontSize:28,fontWeight:700,color:'#F8F3EC'}}>By {done.readyByTime}</div>
            <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:12.5,color:'#888070',marginTop:5}}>Just arrive in ~{arrMins} minutes, walk in and enjoy!</div>
          </div>
        )}
        {done.type==='delivery'&&<p style={{fontFamily:"'DM Sans',sans-serif",fontSize:13,color:'#4CAF50',marginBottom:18}}>Est. delivery: 30–45 min</p>}
        <div style={{background:'#111',border:'1px solid rgba(255,85,0,.11)',padding:18,marginBottom:22,textAlign:'left'}}>
          {[['Order ID',done.id],['Total',fmtCur(grand)],['Payment',f.pay.toUpperCase()],['Type',f.type]].map(([k,v])=>(
            <div key={k} style={{display:'flex',justifyContent:'space-between',fontFamily:"'DM Sans',sans-serif",fontSize:13,marginBottom:6}}>
              <span style={{color:'#484848'}}>{k}</span><span style={{color:'#F8F3EC'}}>{v}</span>
            </div>
          ))}
        </div>
        <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:12,color:'#3a3a3a',marginBottom:18}}>📱 WhatsApp notification sent to restaurant</p>
        <div style={{display:'flex',gap:11,justifyContent:'center',flexWrap:'wrap'}}>
          <button className="btn-outline" onClick={()=>go('profile')}>View Orders</button>
          <button className="btn-primary" onClick={()=>go('menu')}>Order More →</button>
        </div>
      </div>
    </div>
  );

  if(cart.length===0) return(
    <div style={{paddingTop:60,minHeight:'100vh',background:'#0a0a0a',display:'flex',alignItems:'center',justifyContent:'center'}}>
      <div style={{textAlign:'center',padding:40}}>
        <div style={{fontSize:68,marginBottom:18}}>🛒</div>
        <h2 style={{fontFamily:"'Oswald',sans-serif",fontSize:27,color:'#F8F3EC',textTransform:'uppercase',marginBottom:11}}>Your cart is empty</h2>
        <button className="btn-primary" onClick={()=>go('menu')}>Browse Menu →</button>
      </div>
    </div>
  );

  return(
    <div style={{paddingTop:60,minHeight:'100vh',background:'#0a0a0a'}}>
      <div style={{maxWidth:980,margin:'0 auto',padding:'38px 22px'}}>
        {/* Step indicator */}
        <div style={{display:'flex',alignItems:'center',gap:12,marginBottom:32}}>
          {[['1','Cart'],['2','Delivery Type'],['3','Checkout']].map(([s,l],i)=>(
            <div key={s} style={{display:'flex',alignItems:'center',gap:7}}>
              <div style={{width:27,height:27,borderRadius:'50%',background:step>=+s?'#FF5500':'#181818',border:`2px solid ${step>=+s?'#FF5500':'#2a2a2a'}`,display:'flex',alignItems:'center',justifyContent:'center',fontFamily:"'Oswald',sans-serif",fontSize:11,color:step>=+s?'#fff':'#3a3a3a'}}>{step>+s?'✓':s}</div>
              <span style={{fontFamily:"'Oswald',sans-serif",fontSize:10.5,color:step>=+s?'#FF5500':'#3a3a3a',letterSpacing:1,textTransform:'uppercase'}}>{l}</span>
              {i<2&&<div style={{width:28,height:1,background:step>i+1?'#FF5500':'#1e1e1e',marginLeft:4}}/>}
            </div>
          ))}
        </div>

        <div style={{display:'grid',gridTemplateColumns:'1fr 310px',gap:22,alignItems:'start'}} className="checkout-g">
          <div>
            {/* STEP 1 — Cart Items */}
            {step===1&&(
              <div>
                <h2 style={{fontFamily:"'Oswald',sans-serif",fontSize:20,color:'#F8F3EC',textTransform:'uppercase',letterSpacing:1,marginBottom:18}}>Your Cart</h2>
                {cart.map(item=>(
                  <div key={item.id} style={{background:'#111',border:'1px solid rgba(255,85,0,.07)',padding:15,marginBottom:9,display:'flex',alignItems:'center',gap:13}}>
                    <span style={{fontSize:32}}>{item.emoji}</span>
                    <div style={{flex:1}}>
                      <div style={{fontFamily:"'Oswald',sans-serif",fontSize:14,color:'#F8F3EC',fontWeight:600,textTransform:'uppercase'}}>{item.name}</div>
                      <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:11.5,color:'#484848',marginTop:2}}>{fmtCur(item.price)} each</div>
                    </div>
                    <div style={{display:'flex',alignItems:'center',background:'#1a1a1a',border:'1px solid rgba(255,85,0,.2)'}}>
                      <button className="qty-btn" onClick={()=>upd(item,-1)} style={{width:30,height:30,color:'#FF5500'}}>−</button>
                      <span style={{fontFamily:"'Oswald',sans-serif",fontSize:13,fontWeight:700,color:'#F8F3EC',width:22,textAlign:'center'}}>{item.qty}</span>
                      <button className="qty-btn" onClick={()=>upd(item,1)} style={{width:30,height:30,background:'#FF5500',color:'#fff'}}>+</button>
                    </div>
                    <div style={{fontFamily:"'Oswald',sans-serif",fontSize:16,fontWeight:700,color:'#FF5500',minWidth:54,textAlign:'right'}}>{fmtCur(item.price*item.qty)}</div>
                  </div>
                ))}
                <div style={{marginTop:16}}>
                  <div style={{fontFamily:"'Oswald',sans-serif",fontSize:11,color:'#555',letterSpacing:1.2,marginBottom:6,textTransform:'uppercase'}}>Special Instructions</div>
                  <textarea className="inp" value={f.note} onChange={e=>sf('note',e.target.value)} placeholder="Allergies or special requests..." style={{height:72,resize:'none'}}/>
                </div>
                <button className="btn-primary" style={{marginTop:18,width:'100%',padding:13}} onClick={()=>{if(!user){go('auth');return;}setStep(2);}}>
                  {user?'Choose Order Type →':'Sign in to Continue →'}
                </button>
              </div>
            )}

            {/* STEP 2 — ORDER TYPE (The key new feature) */}
            {step===2&&(
              <div>
                <h2 style={{fontFamily:"'Oswald',sans-serif",fontSize:20,color:'#F8F3EC',textTransform:'uppercase',letterSpacing:1,marginBottom:6}}>How Do You Want This?</h2>
                <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:13,color:'#484848',marginBottom:22}}>Choose your order type — we'll have it ready right when you need it</p>

                {/* 3 ORDER TYPE CARDS */}
                <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:12,marginBottom:26}} className="pickup-grid">
                  {[
                    {v:'delivery',icon:'🚴',t:'Delivery',d:'Hot to your door\n30–45 min'},
                    {v:'pickup',icon:'🏪',t:'Pickup',d:"Come & collect\nReady when you arrive"},
                    {v:'dine-in',icon:'🪑',t:'Dine-In',d:"Eat at Jimis\nOrder ahead, no wait"},
                  ].map(opt=>(
                    <div key={opt.v} className={`pickup-opt ${f.type===opt.v?'sel':''}`} onClick={()=>sf('type',opt.v)}>
                      <div style={{fontSize:30,marginBottom:8}}>{opt.icon}</div>
                      <div style={{fontFamily:"'Oswald',sans-serif",fontSize:13.5,fontWeight:600,color:f.type===opt.v?'#FF5500':'#F8F3EC',textTransform:'uppercase',letterSpacing:.8,marginBottom:5}}>{opt.t}</div>
                      <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:11.5,color:'#525252',lineHeight:1.6,whiteSpace:'pre-line'}}>{opt.d}</div>
                    </div>
                  ))}
                </div>

                {/* ARRIVAL TIME — for pickup and dine-in */}
                {(f.type==='pickup'||f.type==='dine-in')&&(
                  <div style={{background:'rgba(255,85,0,.05)',border:'1px solid rgba(255,85,0,.18)',padding:20,marginBottom:22}}>
                    <div style={{fontFamily:"'Oswald',sans-serif",fontSize:13,color:'#FF5500',letterSpacing:1.5,marginBottom:5,textTransform:'uppercase'}}>
                      ⏰ When Will You Arrive?
                    </div>
                    <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:12.5,color:'#555',marginBottom:16,lineHeight:1.65}}>
                      {f.type==='dine-in'
                        ?'Tell us your arrival time so your food is hot and ready on the table the moment you sit down — zero wait!'
                        :"Tell us when you're coming so we start preparing and hand it to you the moment you arrive — no queue, no wait!"}
                    </p>
                    <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:9,marginBottom:14}} className="arrival-grid">
                      {ARRIVAL_OPTIONS.map(opt=>(
                        <div key={opt.min} className={`arrival-chip ${f.arrivalMins===opt.min?'sel':''}`} onClick={()=>sf('arrivalMins',opt.min)} style={{textAlign:'center',borderRadius:0}}>
                          <div style={{fontFamily:"'Oswald',sans-serif",fontSize:16,fontWeight:700,color:f.arrivalMins===opt.min?'#FF5500':'inherit'}}>{opt.label}</div>
                          <div style={{fontSize:9.5,color:urgencyColor(opt.urgency),letterSpacing:.5,textTransform:'uppercase',marginTop:2}}>{opt.urgency==='high'?'⚡ urgent':opt.urgency==='med'?'⏱ moderate':'✓ relaxed'}</div>
                        </div>
                      ))}
                      <div className={`arrival-chip ${f.arrivalMins==='custom'?'sel':''}`} onClick={()=>sf('arrivalMins','custom')} style={{textAlign:'center',borderRadius:0,gridColumn:'span 1'}}>
                        <div style={{fontFamily:"'Oswald',sans-serif",fontSize:14,fontWeight:700,color:f.arrivalMins==='custom'?'#FF5500':'inherit'}}>Custom</div>
                        <div style={{fontSize:9.5,color:'#555',letterSpacing:.5,textTransform:'uppercase',marginTop:2}}>enter mins</div>
                      </div>
                    </div>
                    {f.arrivalMins==='custom'&&(
                      <div style={{marginBottom:14}}>
                        <input className="inp" type="number" min="5" max="120" value={f.customArrival} onChange={e=>sf('customArrival',e.target.value)} placeholder="Enter minutes (e.g. 25)" style={{maxWidth:220}}/>
                      </div>
                    )}
                    {/* READY BY ESTIMATE */}
                    <div style={{background:'#0a0a0a',border:'1px solid rgba(255,85,0,.2)',padding:'12px 16px',display:'flex',alignItems:'center',gap:12,flexWrap:'wrap'}}>
                      <span style={{fontSize:22}}>⚡</span>
                      <div>
                        <div style={{fontFamily:"'Oswald',sans-serif",fontSize:11,color:'#555',letterSpacing:1.2,textTransform:'uppercase'}}>Your order will be ready by</div>
                        <div style={{fontFamily:"'Oswald',sans-serif",fontSize:24,fontWeight:700,color:'#FF5500'}}>{getReadyByTime()}</div>
                      </div>
                      <div style={{marginLeft:'auto',fontFamily:"'DM Sans',sans-serif",fontSize:12,color:'#484848',textAlign:'right'}}>
                        Arriving in <strong style={{color:'#FF5500'}}>{arrMins} min</strong>
                      </div>
                    </div>
                  </div>
                )}

                {/* Phone */}
                <div style={{marginBottom:20}}>
                  <div style={{fontFamily:"'Oswald',sans-serif",fontSize:11,color:'#555',letterSpacing:1.2,marginBottom:6,textTransform:'uppercase'}}>Your Phone *</div>
                  <input className="inp" type="tel" value={f.phone} onChange={e=>sf('phone',e.target.value)} placeholder="+91 98765 43210"/>
                </div>

                <div style={{display:'flex',gap:11}}>
                  <button className="btn-outline" onClick={()=>setStep(1)} style={{flex:1,padding:12}}>← Back</button>
                  <button className="btn-primary" onClick={()=>setStep(3)} style={{flex:2,padding:12}}>Payment Details →</button>
                </div>
              </div>
            )}

            {/* STEP 3 — Payment */}
            {step===3&&(
              <div>
                <h2 style={{fontFamily:"'Oswald',sans-serif",fontSize:20,color:'#F8F3EC',textTransform:'uppercase',letterSpacing:1,marginBottom:18}}>Payment & Confirm</h2>
                {f.type==='delivery'&&(
                  <div style={{marginBottom:16}}>
                    <div style={{fontFamily:"'Oswald',sans-serif",fontSize:11,color:'#555',letterSpacing:1.2,marginBottom:6,textTransform:'uppercase'}}>Delivery Address *</div>
                    <textarea className="inp" value={f.address} onChange={e=>sf('address',e.target.value)} placeholder="Full delivery address..." style={{height:70,resize:'none'}}/>
                  </div>
                )}
                {(f.type==='pickup'||f.type==='dine-in')&&(
                  <div style={{background:'rgba(76,175,80,.06)',border:'1px solid rgba(76,175,80,.2)',padding:'13px 16px',marginBottom:18,display:'flex',gap:10,alignItems:'center'}}>
                    <span style={{fontSize:22}}>{f.type==='dine-in'?'🪑':'🏪'}</span>
                    <div>
                      <div style={{fontFamily:"'Oswald',sans-serif",fontSize:13,color:'#4CAF50',letterSpacing:1}}>JIMIS BURGER — Krishna Height, Vikas Nagar, Sangli</div>
                      <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:12.5,color:'#555',marginTop:3}}>
                        {f.type==='dine-in'?`Your food will be on the table by `:`Your order will be ready at `}
                        <strong style={{color:'#FF5500'}}>{getReadyByTime()}</strong>
                      </div>
                    </div>
                  </div>
                )}
                <div style={{marginBottom:22}}>
                  <div style={{fontFamily:"'Oswald',sans-serif",fontSize:11,color:'#555',letterSpacing:1.2,marginBottom:9,textTransform:'uppercase'}}>Payment Method</div>
                  <div style={{display:'grid',gridTemplateColumns:'repeat(2,1fr)',gap:9}}>
                    {[['upi','📱 UPI / GPay'],['cash','💵 Cash'],['card','💳 Card'],['netbanking','🏦 Net Banking']].map(([v,l])=>(
                      <button key={v} onClick={()=>sf('pay',v)} style={{padding:'12px 13px',background:f.pay===v?'rgba(255,85,0,.1)':'#111',border:`1.5px solid ${f.pay===v?'#FF5500':'rgba(255,85,0,.08)'}`,color:f.pay===v?'#FF5500':'#555',fontFamily:"'DM Sans',sans-serif",fontSize:13,cursor:'pointer',textAlign:'left',transition:'all .2s'}}>{l}</button>
                    ))}
                  </div>
                </div>
                <div style={{display:'flex',gap:11}}>
                  <button className="btn-outline" onClick={()=>setStep(2)} style={{flex:1,padding:12}}>← Back</button>
                  <button className="btn-primary" onClick={place} style={{flex:2,padding:12}}>Place Order & Notify →</button>
                </div>
              </div>
            )}
          </div>

          {/* Summary Sidebar */}
          <div style={{background:'#111',border:'1px solid rgba(255,85,0,.09)',padding:20,position:'sticky',top:76}}>
            <div style={{fontFamily:"'Oswald',sans-serif",fontSize:14.5,fontWeight:700,color:'#F8F3EC',textTransform:'uppercase',letterSpacing:1,marginBottom:16}}>Order Summary</div>
            {cart.map(item=>(
              <div key={item.id} style={{display:'flex',justifyContent:'space-between',marginBottom:8,fontFamily:"'DM Sans',sans-serif",fontSize:12.5}}>
                <span style={{color:'#555'}}>{item.emoji} {item.name} ×{item.qty}</span>
                <span style={{color:'#F8F3EC'}}>{fmtCur(item.price*item.qty)}</span>
              </div>
            ))}
            <div style={{borderTop:'1px solid rgba(255,85,0,.08)',marginTop:12,paddingTop:12}}>
              {[['Subtotal',fmtCur(sub)],f.type==='delivery'?['Delivery',fmtCur(del)]:['Delivery','Free'],['GST (5%)',fmtCur(tax)]].map(([k,v])=>(
                <div key={k} style={{display:'flex',justifyContent:'space-between',marginBottom:7,fontFamily:"'DM Sans',sans-serif",fontSize:12.5,color:'#484848'}}>
                  <span>{k}</span><span>{v}</span>
                </div>
              ))}
              <div style={{display:'flex',justifyContent:'space-between',fontFamily:"'Oswald',sans-serif",fontSize:21,fontWeight:700,borderTop:'1px solid rgba(255,85,0,.1)',paddingTop:12,marginTop:2}}>
                <span style={{color:'#F8F3EC'}}>Total</span>
                <span style={{color:'#FF5500'}}>{fmtCur(grand)}</span>
              </div>
            </div>
            {f.type!=='delivery'&&f.type&&(
              <div style={{marginTop:14,background:'rgba(255,85,0,.06)',border:'1px solid rgba(255,85,0,.18)',padding:'10px 12px'}}>
                <div style={{fontFamily:"'Oswald',sans-serif",fontSize:11,color:'#FF5500',letterSpacing:1,marginBottom:3}}>{f.type==='dine-in'?'🪑 DINE-IN':'🏪 PICKUP'}</div>
                <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:12.5,color:'#888070'}}>Ready by <strong style={{color:'#F8F3EC'}}>{getReadyByTime()}</strong> · {arrMins} min</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── SPECIAL ORDER PAGE ─────────────────────────────────────────────────────── */
function SpecialOrderPage({user,go,addSpecialOrder,addToast,menuItems}){
  const [step,setStep]=useState(1);
  const blank={occasion:'',date:'',time:'',guests:'',name:user?.name||'',phone:user?.phone||'',email:user?.email||'',address:'',itemQtys:{},notes:'',budget:'',bPerson:''};
  const [f,setF]=useState(blank);
  const [done,setDone]=useState(null);
  const sf=(k,v)=>setF(p=>({...p,[k]:v}));
  const tomorrow=new Date();tomorrow.setDate(tomorrow.getDate()+1);
  const minDate=tomorrow.toISOString().split('T')[0];
  const estTotal=Object.entries(f.itemQtys).reduce((s,[id,q])=>{const it=menuItems.find(m=>m.id===+id);return s+(it?it.price*q:0);},0);
  const selQty=(id)=>f.itemQtys[id]||0;
  const setItemQty=(id,q)=>setF(p=>({...p,itemQtys:{...p.itemQtys,[id]:Math.max(0,q)}}));
  const submit=()=>{
    if(!f.name||!f.phone){addToast('Enter your contact details');return;}
    const o={id:'EVT'+Date.now().toString().slice(-6),...f,estimatedTotal:estTotal,status:'pending',createdAt:new Date().toLocaleString('en-IN'),userId:user?.id||'guest',userName:user?.name||f.name};
    addSpecialOrder(o);
    sendWhatsApp(o,menuItems);
    setDone(o);
  };

  if(done) return(
    <div style={{paddingTop:60,minHeight:'100vh',background:'#0a0a0a',display:'flex',alignItems:'center',justifyContent:'center',padding:'80px 22px'}}>
      <div className="scale-in" style={{textAlign:'center',maxWidth:490,width:'100%'}}>
        <div style={{fontSize:66,marginBottom:18}}>{OCCASIONS.find(o=>o.id===done.occasion)?.icon||'🎉'}</div>
        <h2 style={{fontFamily:"'Oswald',sans-serif",fontSize:32,color:'#F8F3EC',textTransform:'uppercase',letterSpacing:2,marginBottom:11}}>Request Received!</h2>
        <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:14.5,color:'#7a7265',lineHeight:1.8,marginBottom:9}}>
          Your event for <strong style={{color:'#FF5500'}}>{done.guests} guests</strong> on <strong style={{color:'#FF5500'}}>{done.date}</strong> is submitted.
        </p>
        <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:12.5,color:'#484848',lineHeight:1.7,marginBottom:26}}>
          📱 WhatsApp sent to Jimis Burger. They'll call <strong style={{color:'#F8F3EC'}}>{done.phone}</strong> within 24 hrs.
        </p>
        <div style={{background:'#111',border:'1px solid rgba(255,85,0,.12)',padding:20,marginBottom:26}}>
          <div style={{fontFamily:"'Oswald',sans-serif",fontSize:11,color:'#FF5500',letterSpacing:1.5,marginBottom:8}}>REFERENCE ID</div>
          <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:32,color:'#FF5500',letterSpacing:3}}>{done.id}</div>
          {estTotal>0&&<div style={{fontFamily:"'DM Sans',sans-serif",fontSize:13,color:'#888070',marginTop:8}}>Est. total: <strong style={{color:'#FF5500'}}>{fmtCur(estTotal)}</strong></div>}
        </div>
        <div style={{display:'flex',gap:11,justifyContent:'center',flexWrap:'wrap'}}>
          <button className="btn-outline" onClick={()=>go('home')}>Back to Home</button>
          <button className="btn-primary" onClick={()=>{setDone(null);setStep(1);setF(blank);}}>New Request</button>
        </div>
      </div>
    </div>
  );

  const steps=['Occasion','Details','Menu','Contact'];
  return(
    <div style={{paddingTop:60,minHeight:'100vh',background:'#0a0a0a'}}>
      <div style={{background:'linear-gradient(135deg,rgba(255,85,0,.07) 0%,#0a0a0a 100%)',borderBottom:'1px solid rgba(255,85,0,.07)',padding:'38px 22px 26px'}}>
        <div style={{maxWidth:800,margin:'0 auto'}}>
          <div className="eyebrow">Plan Ahead</div>
          <h1 style={{fontFamily:"'Oswald',sans-serif",fontSize:'clamp(28px,5vw,52px)',fontWeight:700,color:'#F8F3EC',textTransform:'uppercase',letterSpacing:2}}>EVENT & BULK ORDERS</h1>
          <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:13.5,color:'#4a4a4a',marginTop:7}}>Advance orders help us prepare fresh, on time — for every guest.</p>
        </div>
      </div>
      <div style={{maxWidth:800,margin:'0 auto',padding:'32px 22px'}}>
        <div style={{display:'flex',alignItems:'center',marginBottom:30,overflowX:'auto',paddingBottom:4}}>
          {steps.map((l,i)=>(
            <div key={i} style={{display:'flex',alignItems:'center',flexShrink:0}}>
              <div style={{display:'flex',alignItems:'center',gap:6,color:step>i+1?'#4CAF50':step===i+1?'#FF5500':'#2a2a2a'}}>
                <div style={{width:24,height:24,borderRadius:'50%',border:'2px solid currentColor',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:"'Oswald',sans-serif",fontSize:10.5,background:step===i+1?'rgba(255,85,0,.12)':step>i+1?'rgba(76,175,80,.1)':'transparent'}}>
                  {step>i+1?'✓':i+1}
                </div>
                <span style={{fontFamily:"'Oswald',sans-serif",fontSize:10.5,letterSpacing:.9,whiteSpace:'nowrap',textTransform:'uppercase'}}>{l}</span>
              </div>
              {i<3&&<div className={`step-line ${step>i+1?'done':''}`} style={{width:26,margin:'0 7px'}}/>}
            </div>
          ))}
        </div>

        <div style={{background:'#0f0f0f',border:'1px solid rgba(255,85,0,.09)',padding:'clamp(18px,4vw,32px)'}}>
          {step===1&&(
            <div>
              <h2 style={{fontFamily:"'Oswald',sans-serif",fontSize:20,color:'#F8F3EC',textTransform:'uppercase',letterSpacing:1,marginBottom:20}}>What's the Occasion?</h2>
              <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:10,marginBottom:22}} className="occ-g">
                {OCCASIONS.map(o=>(
                  <div key={o.id} className={`occ-card ${f.occasion===o.id?'sel':''}`} onClick={()=>sf('occasion',o.id)}>
                    <span style={{fontSize:28,display:'block',marginBottom:7}}>{o.icon}</span>{o.label}
                  </div>
                ))}
              </div>
              {f.occasion==='birthday'&&(
                <div style={{marginBottom:16}}>
                  <div style={{fontFamily:"'Oswald',sans-serif",fontSize:11,color:'#555',letterSpacing:1.2,marginBottom:6,textTransform:'uppercase'}}>Birthday Person's Name</div>
                  <input className="inp" value={f.bPerson} onChange={e=>sf('bPerson',e.target.value)} placeholder="e.g. Happy Birthday Priya 🎂"/>
                </div>
              )}
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:13,marginBottom:16}} className="two-col">
                <div>
                  <div style={{fontFamily:"'Oswald',sans-serif",fontSize:11,color:'#555',letterSpacing:1.2,marginBottom:6,textTransform:'uppercase'}}>Event Date *</div>
                  <input className="inp" type="date" min={minDate} value={f.date} onChange={e=>sf('date',e.target.value)}/>
                </div>
                <div>
                  <div style={{fontFamily:"'Oswald',sans-serif",fontSize:11,color:'#555',letterSpacing:1.2,marginBottom:6,textTransform:'uppercase'}}>Time Needed By</div>
                  <input className="inp" type="time" value={f.time} onChange={e=>sf('time',e.target.value)}/>
                </div>
              </div>
              <div style={{marginBottom:22}}>
                <div style={{fontFamily:"'Oswald',sans-serif",fontSize:11,color:'#555',letterSpacing:1.2,marginBottom:6,textTransform:'uppercase'}}>Number of Guests *</div>
                <input className="inp" type="number" min="10" value={f.guests} onChange={e=>sf('guests',e.target.value)} placeholder="e.g. 50"/>
                <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:10.5,color:'#2e2e2e',marginTop:4}}>Minimum 10 guests for event orders</div>
              </div>
              <button className="btn-primary" style={{width:'100%',padding:13}} onClick={()=>{if(!f.occasion||!f.date||!f.guests){addToast('Fill all required fields');return;}setStep(2);}}>Continue →</button>
            </div>
          )}

          {step===2&&(
            <div>
              <h2 style={{fontFamily:"'Oswald',sans-serif",fontSize:20,color:'#F8F3EC',textTransform:'uppercase',letterSpacing:1,marginBottom:18}}>Event Details</h2>
              <div style={{marginBottom:14}}>
                <div style={{fontFamily:"'Oswald',sans-serif",fontSize:11,color:'#555',letterSpacing:1.2,marginBottom:6,textTransform:'uppercase'}}>Venue / Delivery Address</div>
                <textarea className="inp" value={f.address} onChange={e=>sf('address',e.target.value)} placeholder="Full venue or delivery address..." style={{height:70,resize:'none'}}/>
              </div>
              <div style={{marginBottom:14}}>
                <div style={{fontFamily:"'Oswald',sans-serif",fontSize:11,color:'#555',letterSpacing:1.2,marginBottom:6,textTransform:'uppercase'}}>Estimated Budget (Optional)</div>
                <input className="inp" type="number" value={f.budget} onChange={e=>sf('budget',e.target.value)} placeholder="e.g. 8000"/>
              </div>
              <div style={{marginBottom:22}}>
                <div style={{fontFamily:"'Oswald',sans-serif",fontSize:11,color:'#555',letterSpacing:1.2,marginBottom:6,textTransform:'uppercase'}}>Special Requirements / Notes</div>
                <textarea className="inp" value={f.notes} onChange={e=>sf('notes',e.target.value)} placeholder="Dietary restrictions, themes, allergies, custom arrangements..." style={{height:86,resize:'none'}}/>
              </div>
              <div style={{display:'flex',gap:11}}>
                <button className="btn-outline" onClick={()=>setStep(1)} style={{flex:1,padding:12}}>← Back</button>
                <button className="btn-primary" onClick={()=>setStep(3)} style={{flex:2,padding:12}}>Choose Menu →</button>
              </div>
            </div>
          )}

          {step===3&&(
            <div>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:18,flexWrap:'wrap',gap:9}}>
                <div>
                  <h2 style={{fontFamily:"'Oswald',sans-serif",fontSize:20,color:'#F8F3EC',textTransform:'uppercase',letterSpacing:1}}>Select Menu Items</h2>
                  <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:12.5,color:'#484848',marginTop:3}}>Estimated quantities for {f.guests} guests</p>
                </div>
                {estTotal>0&&<div style={{background:'rgba(255,85,0,.08)',border:'1px solid rgba(255,85,0,.22)',padding:'8px 13px',textAlign:'right'}}>
                  <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:10.5,color:'#FF5500',letterSpacing:1}}>EST. TOTAL</div>
                  <div style={{fontFamily:"'Oswald',sans-serif",fontSize:20,fontWeight:700,color:'#FF5500'}}>{fmtCur(estTotal)}</div>
                </div>}
              </div>
              {['veg','non-veg','sides','drinks'].map(cat=>(
                <div key={cat} style={{marginBottom:18}}>
                  <div style={{fontFamily:"'Oswald',sans-serif",fontSize:10.5,color:'#FF5500',letterSpacing:2,textTransform:'uppercase',marginBottom:9,paddingBottom:6,borderBottom:'1px solid rgba(255,85,0,.1)'}}>
                    {cat==='veg'?'🟢 Vegetarian':cat==='non-veg'?'🔴 Non-Vegetarian':cat==='sides'?'🍟 Sides':'🥤 Drinks'}
                  </div>
                  <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(220px,1fr))',gap:8}}>
                    {menuItems.filter(m=>m.cat===cat&&m.available).map(item=>{
                      const q=selQty(item.id);
                      return(
                        <div key={item.id} style={{background:q>0?'rgba(255,85,0,.06)':'#131313',border:`1px solid ${q>0?'rgba(255,85,0,.3)':'rgba(255,85,0,.07)'}`,padding:'10px 12px',display:'flex',alignItems:'center',gap:10,transition:'all .2s'}}>
                          <span style={{fontSize:22,flexShrink:0}}>{item.emoji}</span>
                          <div style={{flex:1,minWidth:0}}>
                            <div style={{fontFamily:"'Oswald',sans-serif",fontSize:12,color:'#F8F3EC',textTransform:'uppercase',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{item.name}</div>
                            <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:10.5,color:'#484848',marginTop:1}}>{fmtCur(item.price)} each</div>
                          </div>
                          <div style={{display:'flex',alignItems:'center',background:'#1a1a1a',border:`1px solid ${q>0?'rgba(255,85,0,.3)':'rgba(255,85,0,.1)'}`,flexShrink:0}}>
                            <button className="qty-btn" onClick={()=>setItemQty(item.id,q-1)} style={{width:26,height:26,color:'#FF5500',fontSize:14}}>−</button>
                            <span style={{fontFamily:"'Oswald',sans-serif",fontSize:12,fontWeight:700,color:'#F8F3EC',width:22,textAlign:'center'}}>{q}</span>
                            <button className="qty-btn" onClick={()=>setItemQty(item.id,q+1)} style={{width:26,height:26,background:'#FF5500',color:'#fff',fontSize:14}}>+</button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
              <div style={{display:'flex',gap:11}}>
                <button className="btn-outline" onClick={()=>setStep(2)} style={{flex:1,padding:12}}>← Back</button>
                <button className="btn-primary" onClick={()=>setStep(4)} style={{flex:2,padding:12}}>Contact Details →</button>
              </div>
            </div>
          )}

          {step===4&&(
            <div>
              <h2 style={{fontFamily:"'Oswald',sans-serif",fontSize:20,color:'#F8F3EC',textTransform:'uppercase',letterSpacing:1,marginBottom:18}}>Your Contact Details</h2>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:13,marginBottom:14}} className="two-col">
                <div>
                  <div style={{fontFamily:"'Oswald',sans-serif",fontSize:11,color:'#555',letterSpacing:1.2,marginBottom:6,textTransform:'uppercase'}}>Full Name *</div>
                  <input className="inp" value={f.name} onChange={e=>sf('name',e.target.value)} placeholder="Your name"/>
                </div>
                <div>
                  <div style={{fontFamily:"'Oswald',sans-serif",fontSize:11,color:'#555',letterSpacing:1.2,marginBottom:6,textTransform:'uppercase'}}>Phone *</div>
                  <input className="inp" type="tel" value={f.phone} onChange={e=>sf('phone',e.target.value)} placeholder="+91 98765 43210"/>
                </div>
              </div>
              <div style={{marginBottom:20}}>
                <div style={{fontFamily:"'Oswald',sans-serif",fontSize:11,color:'#555',letterSpacing:1.2,marginBottom:6,textTransform:'uppercase'}}>Email (Optional)</div>
                <input className="inp" type="email" value={f.email} onChange={e=>sf('email',e.target.value)} placeholder="your@email.com"/>
              </div>
              <div style={{background:'rgba(255,85,0,.04)',border:'1px solid rgba(255,85,0,.12)',padding:16,marginBottom:20}}>
                <div style={{fontFamily:"'Oswald',sans-serif",fontSize:11,color:'#FF5500',letterSpacing:1.5,marginBottom:10}}>SUMMARY</div>
                {[['Occasion',OCCASIONS.find(o=>o.id===f.occasion)?.label||'-'],['Date',f.date],['Guests',f.guests],['Est. Total',estTotal>0?fmtCur(estTotal):'TBD']].map(([k,v])=>(
                  <div key={k} style={{display:'flex',justifyContent:'space-between',fontFamily:"'DM Sans',sans-serif",fontSize:13,marginBottom:5}}>
                    <span style={{color:'#484848'}}>{k}</span><span style={{color:'#F8F3EC'}}>{v}</span>
                  </div>
                ))}
              </div>
              <div style={{background:'rgba(37,211,102,.05)',border:'1px solid rgba(37,211,102,.2)',padding:'11px 14px',marginBottom:20,fontFamily:"'DM Sans',sans-serif",fontSize:12.5,color:'#888070',lineHeight:1.7}}>
                📱 After you submit, a WhatsApp message will be sent to Jimis Burger with full order details. They'll call to confirm.
              </div>
              <div style={{display:'flex',gap:11}}>
                <button className="btn-outline" onClick={()=>setStep(3)} style={{flex:1,padding:12}}>← Back</button>
                <button className="btn-primary" onClick={submit} style={{flex:2,padding:12}}>Submit & Notify via WhatsApp →</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ─── AUTH PAGE ──────────────────────────────────────────────────────────────── */
function AuthPage({setUser,go,addToast}){
  const [mode,setMode]=useState('login');
  const [f,setF]=useState({name:'',email:'',phone:'',password:'',confirm:''});
  const [err,setErr]=useState('');
  const [loading,setLoading]=useState(false);
  const sf=(k,v)=>setF(p=>({...p,[k]:v}));

  const login=async()=>{
    setErr('');setLoading(true);
    if(f.email===ADMIN_EMAIL&&f.password===ADMIN_PASS){
      const admin={id:'admin',name:'Admin',email:ADMIN_EMAIL,isAdmin:true};
      await db.set('currentUser',admin);setUser(admin);addToast('Welcome back, Admin!');go('admin');
    }else{
      const users=await db.get('users')||[];
      const u=users.find(u=>u.email===f.email&&u.password===f.password);
      if(u){await db.set('currentUser',u);setUser(u);addToast(`Welcome back, ${u.name}!`);go('home');}
      else setErr('Invalid email or password');
    }
    setLoading(false);
  };

  const register=async()=>{
    setErr('');
    if(!f.name||!f.email||!f.password){setErr('Fill all required fields');return;}
    if(f.password!==f.confirm){setErr('Passwords do not match');return;}
    if(f.password.length<6){setErr('Password must be 6+ characters');return;}
    setLoading(true);
    const users=await db.get('users')||[];
    if(users.find(u=>u.email===f.email)){setErr('Email already registered');setLoading(false);return;}
    const nu={id:'u'+Date.now(),name:f.name,email:f.email,phone:f.phone,password:f.password,isAdmin:false,joinedAt:new Date().toLocaleDateString('en-IN')};
    await db.set('users',[...users,nu]);
    await db.set('currentUser',nu);
    setUser(nu);addToast(`Welcome to Jimis Burger, ${f.name}! 🍔`);go('home');
    setLoading(false);
  };

  return(
    <div style={{paddingTop:60,minHeight:'100vh',background:'#0a0a0a',display:'flex',alignItems:'center',justifyContent:'center',padding:'80px 22px'}}>
      <div className="scale-in" style={{width:'100%',maxWidth:420}}>
        <div style={{textAlign:'center',marginBottom:30}}>
          <div style={{fontSize:44,marginBottom:12}}>🍔</div>
          <h1 style={{fontFamily:"'Oswald',sans-serif",fontSize:28,fontWeight:700,color:'#F8F3EC',textTransform:'uppercase',letterSpacing:2,marginBottom:5}}>
            {mode==='login'?'SIGN IN':'CREATE ACCOUNT'}
          </h1>
        </div>
        <div style={{background:'#111',border:'1px solid rgba(255,85,0,.1)',padding:28}}>
          {mode==='register'&&<div style={{marginBottom:14}}><div style={{fontFamily:"'Oswald',sans-serif",fontSize:11,color:'#555',letterSpacing:1.2,marginBottom:6,textTransform:'uppercase'}}>Full Name *</div><input className="inp" value={f.name} onChange={e=>sf('name',e.target.value)} placeholder="Your full name"/></div>}
          <div style={{marginBottom:14}}><div style={{fontFamily:"'Oswald',sans-serif",fontSize:11,color:'#555',letterSpacing:1.2,marginBottom:6,textTransform:'uppercase'}}>Email *</div><input className="inp" type="email" value={f.email} onChange={e=>sf('email',e.target.value)} placeholder="your@email.com"/></div>
          {mode==='register'&&<div style={{marginBottom:14}}><div style={{fontFamily:"'Oswald',sans-serif",fontSize:11,color:'#555',letterSpacing:1.2,marginBottom:6,textTransform:'uppercase'}}>Phone</div><input className="inp" type="tel" value={f.phone} onChange={e=>sf('phone',e.target.value)} placeholder="+91 98765 43210"/></div>}
          <div style={{marginBottom:14}}><div style={{fontFamily:"'Oswald',sans-serif",fontSize:11,color:'#555',letterSpacing:1.2,marginBottom:6,textTransform:'uppercase'}}>Password *</div><input className="inp" type="password" value={f.password} onChange={e=>sf('password',e.target.value)} placeholder="Enter password"/></div>
          {mode==='register'&&<div style={{marginBottom:14}}><div style={{fontFamily:"'Oswald',sans-serif",fontSize:11,color:'#555',letterSpacing:1.2,marginBottom:6,textTransform:'uppercase'}}>Confirm Password *</div><input className="inp" type="password" value={f.confirm} onChange={e=>sf('confirm',e.target.value)} placeholder="Confirm password"/></div>}
          {err&&<div style={{background:'rgba(244,67,54,.08)',border:'1px solid rgba(244,67,54,.22)',padding:'9px 13px',fontFamily:"'DM Sans',sans-serif",fontSize:12.5,color:'#F44336',marginBottom:16}}>{err}</div>}
          <button className="btn-primary" disabled={loading} style={{width:'100%',padding:13}} onClick={mode==='login'?login:register}>
            {loading?'Please wait...':mode==='login'?'Sign In →':'Create Account →'}
          </button>
        </div>
        <div style={{textAlign:'center',marginTop:18,fontFamily:"'DM Sans',sans-serif",fontSize:13,color:'#484848'}}>
          {mode==='login'?<>No account? <button className="btn-ghost" style={{color:'#FF5500',fontWeight:500}} onClick={()=>{setMode('register');setErr('');}}>Create one →</button></>
          :<>Have an account? <button className="btn-ghost" style={{color:'#FF5500',fontWeight:500}} onClick={()=>{setMode('login');setErr('');}}>Sign In →</button></>}
        </div>
        {mode==='login'&&<div style={{textAlign:'center',marginTop:10,fontFamily:"'DM Sans',sans-serif",fontSize:11,color:'#2e2e2e'}}>Admin: admin@jimisburger.com / jimis@admin2024</div>}
      </div>
    </div>
  );
}

/* ─── PROFILE PAGE ───────────────────────────────────────────────────────────── */
function ProfilePage({user,setUser,orders,go,addToast}){
  const [tab,setTab]=useState('orders');
  const [editMode,setEditMode]=useState(false);
  const [f,setF]=useState({name:user?.name||'',phone:user?.phone||'',address:user?.address||''});
  const sf=(k,v)=>setF(p=>({...p,[k]:v}));
  const myOrders=orders.filter(o=>o.userId===user?.id&&!o.id?.startsWith('EVT'));
  const myEvents=orders.filter(o=>o.userId===user?.id&&o.id?.startsWith('EVT'));

  const logout=async()=>{await db.set('currentUser',null);setUser(null);go('home');addToast('Logged out');};
  const save=async()=>{
    const updated={...user,...f};
    const users=await db.get('users')||[];
    await db.set('users',users.map(u=>u.id===user.id?updated:u));
    await db.set('currentUser',updated);
    setUser(updated);setEditMode(false);addToast('Profile updated!');
  };

  return(
    <div style={{paddingTop:60,minHeight:'100vh',background:'#0a0a0a'}}>
      <div style={{maxWidth:860,margin:'0 auto',padding:'38px 22px'}}>
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:26,flexWrap:'wrap',gap:14}}>
          <div style={{display:'flex',alignItems:'center',gap:14}}>
            <div style={{width:52,height:52,background:'linear-gradient(135deg,#FF5500,#FF8833)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:22,fontWeight:700,color:'#fff',fontFamily:"'Oswald',sans-serif"}}>{(user?.name||'?')[0].toUpperCase()}</div>
            <div>
              <div style={{fontFamily:"'Oswald',sans-serif",fontSize:20,fontWeight:700,color:'#F8F3EC',textTransform:'uppercase',letterSpacing:1}}>{user?.name}</div>
              <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:12,color:'#484848',marginTop:2}}>{user?.email} · Member since {user?.joinedAt||'2024'}</div>
            </div>
          </div>
          <div style={{display:'flex',gap:9}}>
            <button className="btn-outline" style={{padding:'8px 15px',fontSize:12}} onClick={()=>setEditMode(!editMode)}>{editMode?'Cancel':'Edit Profile'}</button>
            <button style={{background:'none',border:'1px solid rgba(244,67,54,.2)',color:'#F44336',cursor:'pointer',padding:'8px 13px',fontSize:12,fontFamily:"'DM Sans',sans-serif"}} onClick={logout}>Logout</button>
          </div>
        </div>
        {editMode&&(
          <div style={{background:'#111',border:'1px solid rgba(255,85,0,.1)',padding:22,marginBottom:22}}>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:13,marginBottom:13}} className="two-col">
              <div><div style={{fontFamily:"'Oswald',sans-serif",fontSize:10.5,color:'#555',letterSpacing:1.2,marginBottom:5,textTransform:'uppercase'}}>Name</div><input className="inp" value={f.name} onChange={e=>sf('name',e.target.value)}/></div>
              <div><div style={{fontFamily:"'Oswald',sans-serif",fontSize:10.5,color:'#555',letterSpacing:1.2,marginBottom:5,textTransform:'uppercase'}}>Phone</div><input className="inp" type="tel" value={f.phone} onChange={e=>sf('phone',e.target.value)}/></div>
            </div>
            <div style={{marginBottom:16}}><div style={{fontFamily:"'Oswald',sans-serif",fontSize:10.5,color:'#555',letterSpacing:1.2,marginBottom:5,textTransform:'uppercase'}}>Default Address</div><textarea className="inp" value={f.address} onChange={e=>sf('address',e.target.value)} style={{height:62,resize:'none'}}/></div>
            <button className="btn-primary" style={{padding:'10px 22px',fontSize:12}} onClick={save}>Save Changes</button>
          </div>
        )}
        <div style={{display:'flex',gap:8,marginBottom:20}}>
          {[['orders',`My Orders (${myOrders.length})`],['events',`My Events (${myEvents.length})`]].map(([k,l])=>(
            <button key={k} className={`tab-btn ${tab===k?'act':''}`} onClick={()=>setTab(k)}>{l}</button>
          ))}
        </div>
        {tab==='orders'&&(
          <div>
            {myOrders.length===0?<div style={{textAlign:'center',padding:'50px 0',fontFamily:"'DM Sans',sans-serif",fontSize:14,color:'#3a3a3a'}}>No orders yet. <button className="btn-ghost" style={{color:'#FF5500'}} onClick={()=>go('menu')}>Start ordering →</button></div>
            :myOrders.slice().reverse().map(o=>(
              <div key={o.id} style={{background:'#111',border:'1px solid rgba(255,85,0,.08)',padding:18,marginBottom:10}}>
                <div style={{display:'flex',justifyContent:'space-between',flexWrap:'wrap',gap:8,marginBottom:9}}>
                  <div>
                    <div style={{fontFamily:"'Oswald',sans-serif",fontSize:14,color:'#F8F3EC',fontWeight:600}}>{o.id}</div>
                    <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:11.5,color:'#484848',marginTop:2}}>{o.date}</div>
                  </div>
                  <div style={{display:'flex',alignItems:'center',gap:10}}>
                    <span style={{background:`${statusColor(o.status)}18`,color:statusColor(o.status),padding:'3px 9px',fontFamily:"'DM Sans',sans-serif",fontSize:10,textTransform:'uppercase'}}>● {o.status}</span>
                    <span style={{fontFamily:"'Oswald',sans-serif",fontSize:17,fontWeight:700,color:'#FF5500'}}>{fmtCur(o.total)}</span>
                  </div>
                </div>
                <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:12,color:'#484848'}}>
                  {o.type==='dine-in'?'🪑 Dine-In':o.type==='pickup'?'🏪 Pickup':'🚴 Delivery'}
                  {o.arrivalMins&&<span style={{marginLeft:8,color:'#FF5500'}}>· Ready by {o.readyByTime}</span>}
                  {' · '}{o.items?.map(i=>`${i.name} ×${i.qty}`).join(', ')}
                </div>
              </div>
            ))}
          </div>
        )}
        {tab==='events'&&(
          <div>
            {myEvents.length===0?<div style={{textAlign:'center',padding:'50px 0',fontFamily:"'DM Sans',sans-serif",fontSize:14,color:'#3a3a3a'}}>No event orders. <button className="btn-ghost" style={{color:'#FF5500'}} onClick={()=>go('special-order')}>Book an event →</button></div>
            :myEvents.slice().reverse().map(o=>(
              <div key={o.id} style={{background:'#111',border:'1px solid rgba(255,85,0,.08)',padding:18,marginBottom:10}}>
                <div style={{display:'flex',justifyContent:'space-between',flexWrap:'wrap',gap:8,marginBottom:8}}>
                  <div><div style={{fontFamily:"'Oswald',sans-serif",fontSize:14,color:'#F8F3EC',fontWeight:600}}>{o.id}</div><div style={{fontFamily:"'DM Sans',sans-serif",fontSize:11.5,color:'#484848',marginTop:2}}>{o.createdAt}</div></div>
                  <span style={{background:`${statusColor(o.status)}18`,color:statusColor(o.status),padding:'3px 9px',fontFamily:"'DM Sans',sans-serif",fontSize:10,textTransform:'uppercase',alignSelf:'flex-start'}}>● {o.status}</span>
                </div>
                <div style={{display:'flex',gap:14,flexWrap:'wrap',fontFamily:"'DM Sans',sans-serif",fontSize:12.5,color:'#888070'}}>
                  {[[OCCASIONS.find(x=>x.id===o.occasion)?.icon||'🎉',o.occasion],['📅',o.date],['👥',o.guests+' guests'],['💰',o.estimatedTotal?fmtCur(o.estimatedTotal):'TBD']].map(([ic,v])=>(
                    <span key={v} style={{display:'flex',alignItems:'center',gap:4}}>{ic}{v}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── ABOUT PAGE (with Google Maps) ─────────────────────────────────────────── */
function AboutPage({go}){
  return(
    <div style={{paddingTop:60,minHeight:'100vh',background:'#0a0a0a'}}>
      <div style={{background:'linear-gradient(135deg,rgba(255,85,0,.08) 0%,#0a0a0a 100%)',borderBottom:'1px solid rgba(255,85,0,.07)',padding:'56px 22px 40px'}}>
        <div style={{maxWidth:900,margin:'0 auto'}}>
          <div className="eyebrow">Our Story</div>
          <h1 style={{fontFamily:"'Oswald',sans-serif",fontSize:'clamp(32px,5.5vw,60px)',fontWeight:700,color:'#F8F3EC',textTransform:'uppercase',letterSpacing:2}}>ABOUT JIMIS</h1>
        </div>
      </div>
      <div style={{maxWidth:900,margin:'0 auto',padding:'52px 22px'}}>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:38,marginBottom:52}} className="two-col">
          <div>
            <h2 style={{fontFamily:"'Oswald',sans-serif",fontSize:22,fontWeight:700,color:'#F8F3EC',textTransform:'uppercase',letterSpacing:1,marginBottom:14}}>From a Cart to a Legend</h2>
            <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:14,color:'#6a6060',lineHeight:1.9,marginBottom:14}}>
              Jimis Burger began as a humble street cart in Sangli — a simple idea driven by a passion for extraordinary burgers. Founder's vision was clear: bring gourmet quality to Sangli at street-food spirit.
            </p>
            <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:14,color:'#6a6060',lineHeight:1.9}}>
              In 2019, the cart evolved into a flagship outlet at Krishna Height, Vikas Nagar. Today, Jimis commands Sangli's burger scene with 4.3★ across 1,500+ reviews — and has expanded to Mumbai.
            </p>
          </div>
          <div style={{background:'#131313',border:'1px solid rgba(255,85,0,.1)',padding:24,display:'flex',flexDirection:'column',justifyContent:'center'}}>
            {[['2019','Opened Sangli flagship at Vikas Nagar'],['2021','Expanded delivery across Sangli-Miraj'],['2023','Launched in Mumbai — Andheri & Malad'],['2024','6,600+ Zomato delivery reviews achieved']].map(([yr,ev])=>(
              <div key={yr} style={{display:'flex',gap:13,marginBottom:12,alignItems:'flex-start'}}>
                <span style={{fontFamily:"'Oswald',sans-serif",fontSize:14,fontWeight:700,color:'#FF5500',minWidth:36,flexShrink:0}}>{yr}</span>
                <span style={{fontFamily:"'DM Sans',sans-serif",fontSize:13,color:'#5a5a5a',lineHeight:1.6}}>{ev}</span>
              </div>
            ))}
          </div>
        </div>

        {/* INFO CARDS */}
        <div style={{background:'#111',border:'1px solid rgba(255,85,0,.09)',padding:24,marginBottom:34}}>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(195px,1fr))',gap:22}}>
            {[{icon:'📍',t:'Address',d:'Shop 30/2B, Plot 3, Ground Floor\nKrishna Height Apartment\nKuowad, Miraj-Sangli Road\nSangli — 416416'},{icon:'🕐',t:'Hours',d:'Monday – Sunday\n11:00 AM – 10:45 PM'},{icon:'📞',t:'Contact',d:'+91-84080 26942\nFor bulk orders, call directly'},{icon:'⭐',t:'Ratings',d:'4.3★ Zomato & Google\n4.3★ on Justdial\nTop QSR in Sangli-Miraj'}].map(f=>(
              <div key={f.t}>
                <div style={{fontSize:22,marginBottom:8}}>{f.icon}</div>
                <div style={{fontFamily:"'Oswald',sans-serif",fontSize:11.5,color:'#FF5500',letterSpacing:1.5,textTransform:'uppercase',marginBottom:7}}>{f.t}</div>
                <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:13,color:'#525252',lineHeight:1.85,whiteSpace:'pre-line'}}>{f.d}</div>
              </div>
            ))}
          </div>
        </div>

        {/* GOOGLE MAPS EMBED */}
        <h2 style={{fontFamily:"'Oswald',sans-serif",fontSize:18,fontWeight:700,color:'#F8F3EC',textTransform:'uppercase',letterSpacing:1,marginBottom:16}}>📍 Find Us on the Map</h2>
        <div style={{border:'1px solid rgba(255,85,0,.16)',overflow:'hidden',marginBottom:36,position:'relative'}}>
          <iframe
            title="Jimis Burger Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3822.3123456789!2d74.5675!3d16.8524!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc0!2sKrishna%20Height%2C%20Vikas%20Nagar%2C%20Sangli!5e0!3m2!1sen!2sin!4v1234567890"
            width="100%"
            height="340"
            style={{border:0,display:'block',filter:'invert(.85) hue-rotate(170deg) saturate(0.9)'}}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
          <div style={{position:'absolute',top:12,left:12,background:'#131313',border:'1px solid rgba(255,85,0,.3)',padding:'8px 14px',fontFamily:"'Oswald',sans-serif",fontSize:12,color:'#FF5500',letterSpacing:1,pointerEvents:'none'}}>
            📍 JIMIS BURGER · VIKAS NAGAR, SANGLI
          </div>
          <a href="https://maps.google.com/?q=Jimis+Burger+Krishna+Height+Vikas+Nagar+Sangli" target="_blank" rel="noopener noreferrer" style={{position:'absolute',bottom:12,right:12,background:'#FF5500',color:'#fff',padding:'8px 14px',fontFamily:"'Oswald',sans-serif",fontSize:11.5,letterSpacing:1,textDecoration:'none',textTransform:'uppercase'}}>
            Open in Maps ↗
          </a>
        </div>

        <div style={{textAlign:'center'}}>
          <button className="btn-primary" onClick={()=>go('menu')} style={{marginRight:11}}>Order Now →</button>
          <button className="btn-outline" onClick={()=>go('special-order')}>Book Event</button>
        </div>
      </div>
    </div>
  );
}

/* ─── ADMIN PAGE ─────────────────────────────────────────────────────────────── */
function AdminPage({orders,specialOrders,setOrders,setSpecialOrders,go,menuItems,setMenuItems}){
  const [tab,setTab]=useState('dashboard');
  const [users,setUsers]=useState([]);
  const [editItem,setEditItem]=useState(null);
  const [newItem,setNewItem]=useState(null);
  const [menuFilter,setMenuFilter]=useState('all');

  useEffect(()=>{db.get('users').then(u=>setUsers(u||[]));}, []);

  const regOrders=orders.filter(o=>!o.id?.startsWith('EVT'));
  const revenue=regOrders.reduce((s,o)=>s+(o.total||0),0);
  const today=new Date().toLocaleDateString('en-IN');
  const todayOrders=regOrders.filter(o=>o.date?.includes(today));
  const pendingEvents=specialOrders.filter(o=>o.status==='pending');
  const pickupDineIn=regOrders.filter(o=>(o.type==='pickup'||o.type==='dine-in')&&o.status==='confirmed');

  const updOrder=(id,status)=>{
    const updated=orders.map(o=>o.id===id?{...o,status}:o);
    setOrders(updated);db.set('orders',updated);
  };
  const updEvent=(id,status)=>{
    const updated=specialOrders.map(o=>o.id===id?{...o,status}:o);
    setSpecialOrders(updated);db.set('specialOrders',updated);
  };

  // Menu management helpers
  const saveMenuItem=(item)=>{
    const updated=menuItems.map(m=>m.id===item.id?item:m);
    setMenuItems(updated);db.set('menuItems',updated);setEditItem(null);
  };
  const toggleAvail=(id)=>{
    const updated=menuItems.map(m=>m.id===id?{...m,available:!m.available}:m);
    setMenuItems(updated);db.set('menuItems',updated);
  };
  const addNewItem=()=>{
    if(!newItem?.name||!newItem?.price){return;}
    const item={...newItem,id:Date.now(),available:true,pop:false,hot:false};
    const updated=[...menuItems,item];
    setMenuItems(updated);db.set('menuItems',updated);setNewItem(null);
  };
  const deleteItem=(id)=>{
    if(!window.confirm('Remove this item?'))return;
    const updated=menuItems.filter(m=>m.id!==id);
    setMenuItems(updated);db.set('menuItems',updated);
  };

  const statCards=[
    {icon:'🛒',label:'Total Orders',value:regOrders.length,color:'#FF5500'},
    {icon:'💰',label:'Total Revenue',value:fmtCur(revenue),color:'#FFB800'},
    {icon:'📅',label:"Today's Orders",value:todayOrders.length,color:'#4CAF50'},
    {icon:'🎉',label:'Pending Events',value:pendingEvents.length,color:'#2196F3'},
    {icon:'🏪',label:'Pickup/Dine-In',value:pickupDineIn.length,color:'#FF5500'},
    {icon:'👤',label:'Users',value:users.length,color:'#9C27B0'},
  ];

  return(
    <div style={{paddingTop:60,minHeight:'100vh',background:'#0a0a0a'}}>
      <div style={{background:'#0d0d0d',borderBottom:'1px solid rgba(255,85,0,.07)',padding:'20px 22px'}}>
        <div style={{maxWidth:1200,margin:'0 auto',display:'flex',alignItems:'center',justifyContent:'space-between',flexWrap:'wrap',gap:12}}>
          <div>
            <h1 style={{fontFamily:"'Oswald',sans-serif",fontSize:24,fontWeight:700,color:'#F8F3EC',textTransform:'uppercase',letterSpacing:2}}>⚡ ADMIN PANEL</h1>
            <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:12,color:'#484848',marginTop:2}}>Jimis Burger · Sangli Operations</p>
          </div>
          <div style={{display:'flex',gap:9}}>
            <a href={`https://wa.me/${OWNER_WHATSAPP}`} target="_blank" rel="noopener noreferrer" style={{background:'#25D366',color:'#fff',padding:'8px 16px',fontFamily:"'Oswald',sans-serif",fontSize:11.5,letterSpacing:1.2,textDecoration:'none',textTransform:'uppercase',display:'flex',alignItems:'center',gap:6}}>
              📱 WhatsApp
            </a>
            <button className="btn-outline" style={{padding:'8px 16px',fontSize:11.5}} onClick={()=>go('home')}>← Back to Site</button>
          </div>
        </div>
      </div>

      <div style={{maxWidth:1200,margin:'0 auto',padding:'24px 22px'}}>
        <div style={{display:'flex',gap:7,marginBottom:22,overflowX:'auto',paddingBottom:4}}>
          {[['dashboard','📊 Dashboard'],['live','🔴 Live Orders'],['orders','🛒 All Orders'],['events','🎉 Events'],['menu','🍔 Menu Mgmt'],['users','👤 Users']].map(([k,l])=>(
            <button key={k} className={`tab-btn ${tab===k?'act':''}`} onClick={()=>setTab(k)}>{l}{k==='live'&&pickupDineIn.length>0?<span style={{background:'#F44336',color:'#fff',borderRadius:'50%',width:16,height:16,fontSize:9,display:'inline-flex',alignItems:'center',justifyContent:'center',marginLeft:5,fontFamily:"'Oswald',sans-serif"}}>{pickupDineIn.length}</span>:null}</button>
          ))}
        </div>

        {/* DASHBOARD */}
        {tab==='dashboard'&&(
          <div>
            <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(170px,1fr))',gap:13,marginBottom:26}} className="admin-g">
              {statCards.map(s=>(
                <div key={s.label} className="adm-stat">
                  <div style={{fontSize:26,marginBottom:7}}>{s.icon}</div>
                  <div style={{fontFamily:"'Oswald',sans-serif",fontSize:20,fontWeight:700,color:s.color,marginBottom:4}}>{s.value}</div>
                  <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:11,color:'#484848',textTransform:'uppercase',letterSpacing:.7}}>{s.label}</div>
                </div>
              ))}
            </div>
            {pendingEvents.length>0&&(
              <div style={{background:'rgba(255,184,0,.05)',border:'1px solid rgba(255,184,0,.22)',padding:18,marginBottom:20}}>
                <div style={{fontFamily:"'Oswald',sans-serif",fontSize:13,color:'#FFB800',letterSpacing:1.5,marginBottom:12,textTransform:'uppercase'}}>⚡ Pending Events ({pendingEvents.length})</div>
                {pendingEvents.map(o=>(
                  <div key={o.id} style={{background:'#0d0d0d',border:'1px solid rgba(255,184,0,.12)',padding:13,marginBottom:8,display:'flex',justifyContent:'space-between',flexWrap:'wrap',gap:9}}>
                    <div>
                      <div style={{fontFamily:"'Oswald',sans-serif",fontSize:13.5,color:'#F8F3EC'}}>{o.id} — {o.userName||o.name}</div>
                      <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:12,color:'#484848',marginTop:3}}>{OCCASIONS.find(x=>x.id===o.occasion)?.label} · {o.date} · {o.guests} guests · {o.phone}</div>
                    </div>
                    <div style={{display:'flex',gap:8}}>
                      <button className="btn-primary" style={{padding:'7px 14px',fontSize:11}} onClick={()=>updEvent(o.id,'approved')}>Approve</button>
                      <button style={{background:'none',border:'1px solid rgba(244,67,54,.25)',color:'#F44336',padding:'7px 14px',fontFamily:"'DM Sans',sans-serif",fontSize:11,cursor:'pointer'}} onClick={()=>updEvent(o.id,'cancelled')}>Decline</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* LIVE ORDERS (Pickup/Dine-In with countdowns) */}
        {tab==='live'&&(
          <div>
            <h2 style={{fontFamily:"'Oswald',sans-serif",fontSize:18,color:'#F8F3EC',textTransform:'uppercase',letterSpacing:1,marginBottom:6}}>Live Pickup & Dine-In Orders</h2>
            <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:13,color:'#484848',marginBottom:18}}>These customers told you when they arrive — prepare accordingly!</p>
            {pickupDineIn.length===0?(
              <div style={{textAlign:'center',padding:'50px 0',fontFamily:"'DM Sans',sans-serif",fontSize:14,color:'#3a3a3a'}}>No active pickup / dine-in orders right now.</div>
            ):pickupDineIn.sort((a,b)=>(a.arrivalMins||99)-(b.arrivalMins||99)).map(o=>{
              const urgency=o.arrivalMins<=15?'high':o.arrivalMins<=30?'med':'low';
              return(
                <div key={o.id} className={urgency==='high'?'urgent-card':''} style={{background:'#111',border:`1px solid ${urgency==='high'?'rgba(244,67,54,.4)':urgency==='med'?'rgba(255,184,0,.3)':'rgba(76,175,80,.2)'}`,padding:18,marginBottom:12}}>
                  <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',flexWrap:'wrap',gap:10,marginBottom:10}}>
                    <div>
                      <div style={{display:'flex',alignItems:'center',gap:10,flexWrap:'wrap',marginBottom:5}}>
                        <span style={{fontFamily:"'Oswald',sans-serif",fontSize:16,color:'#F8F3EC',fontWeight:600}}>{o.id}</span>
                        <span style={{fontFamily:"'Oswald',sans-serif",fontSize:13,color:o.type==='dine-in'?'#4CAF50':'#2196F3'}}>{o.type==='dine-in'?'🪑 DINE-IN':'🏪 PICKUP'}</span>
                        <CountdownTimer arrivalMins={o.arrivalMins} orderedAt={o.orderedAtISO||new Date().toISOString()}/>
                      </div>
                      <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:12.5,color:'#888070'}}>
                        <strong style={{color:'#F8F3EC'}}>{o.userName||'Guest'}</strong> · {o.phone} · Arriving in <strong style={{color:'#FF5500'}}>{o.arrivalMins} min</strong> · Ready by <strong style={{color:'#FF5500'}}>{o.readyByTime}</strong>
                      </div>
                    </div>
                    <div style={{display:'flex',gap:8,alignItems:'center'}}>
                      <span style={{fontFamily:"'Oswald',sans-serif",fontSize:18,color:'#FF5500',fontWeight:700}}>{fmtCur(o.total)}</span>
                      <select className="inp" style={{padding:'5px 9px',fontSize:11.5,width:'auto'}} value={o.status} onChange={e=>updOrder(o.id,e.target.value)}>
                        {['confirmed','preparing','ready','delivered','cancelled'].map(s=><option key={s} value={s}>{s.charAt(0).toUpperCase()+s.slice(1)}</option>)}
                      </select>
                    </div>
                  </div>
                  <div style={{background:'#0a0a0a',padding:'10px 13px',fontFamily:"'DM Sans',sans-serif",fontSize:12,color:'#484848'}}>
                    🛒 {o.items?.map(i=>`${i.emoji} ${i.name} ×${i.qty}`).join(' · ')}
                  </div>
                  {o.note&&<div style={{fontFamily:"'DM Sans',sans-serif",fontSize:12,color:'#5a5a5a',marginTop:6,fontStyle:'italic'}}>Note: {o.note}</div>}
                </div>
              );
            })}
          </div>
        )}

        {/* ALL ORDERS */}
        {tab==='orders'&&(
          <div>
            <h2 style={{fontFamily:"'Oswald',sans-serif",fontSize:18,color:'#F8F3EC',textTransform:'uppercase',letterSpacing:1,marginBottom:18}}>All Orders ({regOrders.length})</h2>
            {regOrders.length===0?<div style={{textAlign:'center',padding:'50px 0',color:'#3a3a3a',fontFamily:"'DM Sans',sans-serif"}}>No orders yet.</div>
            :regOrders.slice().reverse().map(o=>(
              <div key={o.id} style={{background:'#111',border:'1px solid rgba(255,85,0,.07)',padding:18,marginBottom:10}}>
                <div style={{display:'flex',justifyContent:'space-between',flexWrap:'wrap',gap:9,marginBottom:9}}>
                  <div>
                    <div style={{fontFamily:"'Oswald',sans-serif",fontSize:14,color:'#F8F3EC',fontWeight:600,display:'flex',alignItems:'center',gap:9}}>
                      {o.id}
                      <span style={{fontSize:12,color:o.type==='dine-in'?'#4CAF50':o.type==='pickup'?'#2196F3':'#FF5500',fontWeight:400}}>
                        {o.type==='dine-in'?'🪑 Dine-In':o.type==='pickup'?'🏪 Pickup':'🚴 Delivery'}
                      </span>
                    </div>
                    <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:11.5,color:'#484848',marginTop:2}}>{o.date} · {o.userName||'Guest'} · {o.phone||'-'}</div>
                  </div>
                  <div style={{display:'flex',alignItems:'center',gap:11}}>
                    <span style={{fontFamily:"'Oswald',sans-serif",fontSize:16,fontWeight:700,color:'#FF5500'}}>{fmtCur(o.total||0)}</span>
                    <select className="inp" style={{padding:'5px 9px',fontSize:11.5,width:'auto'}} value={o.status} onChange={e=>updOrder(o.id,e.target.value)}>
                      {['confirmed','preparing','ready','out-for-delivery','delivered','cancelled'].map(s=><option key={s} value={s}>{s.charAt(0).toUpperCase()+s.slice(1)}</option>)}
                    </select>
                  </div>
                </div>
                <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:12,color:'#484848'}}>{o.items?.map(i=>`${i.emoji} ${i.name} ×${i.qty}`).join(' · ')}</div>
              </div>
            ))}
          </div>
        )}

        {/* EVENTS */}
        {tab==='events'&&(
          <div>
            <h2 style={{fontFamily:"'Oswald',sans-serif",fontSize:18,color:'#F8F3EC',textTransform:'uppercase',letterSpacing:1,marginBottom:18}}>Event Orders ({specialOrders.length})</h2>
            {specialOrders.length===0?<div style={{textAlign:'center',padding:'50px 0',color:'#3a3a3a',fontFamily:"'DM Sans',sans-serif"}}>No event orders.</div>
            :specialOrders.slice().reverse().map(o=>(
              <div key={o.id} style={{background:'#111',border:`1px solid ${o.status==='pending'?'rgba(255,184,0,.25)':'rgba(255,85,0,.07)'}`,padding:18,marginBottom:10}}>
                <div style={{display:'flex',justifyContent:'space-between',flexWrap:'wrap',gap:9,marginBottom:10}}>
                  <div>
                    <div style={{fontFamily:"'Oswald',sans-serif",fontSize:14,color:'#F8F3EC',fontWeight:600}}>{o.id} — {OCCASIONS.find(x=>x.id===o.occasion)?.icon} {OCCASIONS.find(x=>x.id===o.occasion)?.label}</div>
                    <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:11.5,color:'#484848',marginTop:2}}>{o.createdAt} · {o.userName||o.name}</div>
                  </div>
                  <div style={{display:'flex',gap:9,alignItems:'center'}}>
                    {o.estimatedTotal>0&&<span style={{fontFamily:"'Oswald',sans-serif",fontSize:16,color:'#FF5500'}}>{fmtCur(o.estimatedTotal)}</span>}
                    <select className="inp" style={{padding:'5px 9px',fontSize:11.5,width:'auto'}} value={o.status} onChange={e=>updEvent(o.id,e.target.value)}>
                      {['pending','approved','confirmed','preparing','completed','cancelled'].map(s=><option key={s} value={s}>{s.charAt(0).toUpperCase()+s.slice(1)}</option>)}
                    </select>
                  </div>
                </div>
                <div style={{display:'flex',gap:14,flexWrap:'wrap',fontFamily:"'DM Sans',sans-serif",fontSize:12.5,color:'#888070',marginBottom:o.notes?8:0}}>
                  {[['📅',o.date],['🕐',o.time||'TBD'],['👥',o.guests+' guests'],['📞',o.phone]].map(([ic,v])=>(
                    <span key={v} style={{display:'flex',alignItems:'center',gap:4}}>{ic}{v}</span>
                  ))}
                </div>
                {o.address&&<div style={{fontFamily:"'DM Sans',sans-serif",fontSize:12,color:'#484848'}}>📍 {o.address}</div>}
                {o.notes&&<div style={{fontFamily:"'DM Sans',sans-serif",fontSize:12,color:'#5a5a5a',marginTop:4,fontStyle:'italic'}}>Notes: {o.notes}</div>}
                {o.bPerson&&<div style={{fontFamily:"'DM Sans',sans-serif",fontSize:12,color:'#FF5500',marginTop:4}}>🎂 {o.bPerson}</div>}
              </div>
            ))}
          </div>
        )}

        {/* MENU MANAGEMENT */}
        {tab==='menu'&&(
          <div>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:18,flexWrap:'wrap',gap:11}}>
              <h2 style={{fontFamily:"'Oswald',sans-serif",fontSize:18,color:'#F8F3EC',textTransform:'uppercase',letterSpacing:1}}>Menu Management ({menuItems.length} items)</h2>
              <button className="btn-primary" style={{padding:'8px 18px',fontSize:12}} onClick={()=>setNewItem({name:'',cat:'veg',price:0,desc:'',emoji:'🍔',hot:false,pop:false})}>+ Add Item</button>
            </div>
            {/* New item form */}
            {newItem&&(
              <div style={{background:'rgba(255,85,0,.05)',border:'1px solid rgba(255,85,0,.22)',padding:20,marginBottom:20}}>
                <div style={{fontFamily:"'Oswald',sans-serif",fontSize:13,color:'#FF5500',letterSpacing:1.5,marginBottom:14,textTransform:'uppercase'}}>Add New Menu Item</div>
                <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(180px,1fr))',gap:12,marginBottom:12}}>
                  {[['Name','name','text','Item name'],['Price','price','number','e.g. 199'],['Emoji','emoji','text','e.g. 🍔'],['Description','desc','text','Short description']].map(([l,k,t,ph])=>(
                    <div key={k}>
                      <div style={{fontFamily:"'Oswald',sans-serif",fontSize:10.5,color:'#555',letterSpacing:1.2,marginBottom:5,textTransform:'uppercase'}}>{l}</div>
                      <input className="inp" type={t} value={newItem[k]||''} onChange={e=>setNewItem(p=>({...p,[k]:t==='number'?+e.target.value:e.target.value}))} placeholder={ph}/>
                    </div>
                  ))}
                  <div>
                    <div style={{fontFamily:"'Oswald',sans-serif",fontSize:10.5,color:'#555',letterSpacing:1.2,marginBottom:5,textTransform:'uppercase'}}>Category</div>
                    <select className="inp" value={newItem.cat||'veg'} onChange={e=>setNewItem(p=>({...p,cat:e.target.value}))}>
                      {['veg','non-veg','sides','drinks'].map(c=><option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                </div>
                <div style={{display:'flex',gap:9}}>
                  <button className="btn-primary" style={{padding:'9px 20px',fontSize:12}} onClick={addNewItem}>Add to Menu</button>
                  <button className="btn-outline" style={{padding:'9px 20px',fontSize:12}} onClick={()=>setNewItem(null)}>Cancel</button>
                </div>
              </div>
            )}
            {/* Filter */}
            <div style={{display:'flex',gap:7,marginBottom:16,overflowX:'auto'}}>
              {[['all','All'],['veg','Veg'],['non-veg','Non-Veg'],['sides','Sides'],['drinks','Drinks']].map(([k,l])=>(
                <button key={k} className={`tab-btn ${menuFilter===k?'act':''}`} onClick={()=>setMenuFilter(k)}>{l}</button>
              ))}
            </div>
            <div>
              {menuItems.filter(m=>menuFilter==='all'||m.cat===menuFilter).map(item=>(
                <div key={item.id} style={{background:'#111',border:`1px solid ${item.available?'rgba(255,85,0,.08)':'rgba(244,67,54,.12)'}`,padding:16,marginBottom:8}}>
                  {editItem?.id===item.id?(
                    <div>
                      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(160px,1fr))',gap:10,marginBottom:12}}>
                        {[['Name','name','text'],['Price','price','number'],['Emoji','emoji','text']].map(([l,k,t])=>(
                          <div key={k}>
                            <div style={{fontFamily:"'Oswald',sans-serif",fontSize:10,color:'#555',letterSpacing:1.2,marginBottom:4,textTransform:'uppercase'}}>{l}</div>
                            <input className="inp" type={t} value={editItem[k]||''} onChange={e=>setEditItem(p=>({...p,[k]:t==='number'?+e.target.value:e.target.value}))} style={{padding:'8px 11px',fontSize:13}}/>
                          </div>
                        ))}
                        <div>
                          <div style={{fontFamily:"'Oswald',sans-serif",fontSize:10,color:'#555',letterSpacing:1.2,marginBottom:4,textTransform:'uppercase'}}>Category</div>
                          <select className="inp" value={editItem.cat} onChange={e=>setEditItem(p=>({...p,cat:e.target.value}))} style={{padding:'8px 11px',fontSize:13}}>
                            {['veg','non-veg','sides','drinks'].map(c=><option key={c} value={c}>{c}</option>)}
                          </select>
                        </div>
                      </div>
                      <div style={{marginBottom:12}}>
                        <div style={{fontFamily:"'Oswald',sans-serif",fontSize:10,color:'#555',letterSpacing:1.2,marginBottom:4,textTransform:'uppercase'}}>Description</div>
                        <input className="inp" value={editItem.desc||''} onChange={e=>setEditItem(p=>({...p,desc:e.target.value}))} style={{padding:'8px 11px',fontSize:13}}/>
                      </div>
                      <div style={{display:'flex',gap:9,flexWrap:'wrap',marginBottom:8}}>
                        {[['hot','🔥 Hot/Spicy'],['pop','⭐ Popular']].map(([k,l])=>(
                          <label key={k} style={{display:'flex',alignItems:'center',gap:6,cursor:'pointer',fontFamily:"'DM Sans',sans-serif",fontSize:13,color:'#888070'}}>
                            <input type="checkbox" checked={!!editItem[k]} onChange={e=>setEditItem(p=>({...p,[k]:e.target.checked}))} style={{accentColor:'#FF5500'}}/>{l}
                          </label>
                        ))}
                      </div>
                      <div style={{display:'flex',gap:9}}>
                        <button className="btn-primary" style={{padding:'9px 18px',fontSize:12}} onClick={()=>saveMenuItem(editItem)}>Save</button>
                        <button className="btn-outline" style={{padding:'9px 18px',fontSize:12}} onClick={()=>setEditItem(null)}>Cancel</button>
                      </div>
                    </div>
                  ):(
                    <div style={{display:'flex',alignItems:'center',gap:13,flexWrap:'wrap'}}>
                      <span style={{fontSize:28,flexShrink:0}}>{item.emoji}</span>
                      <div style={{flex:1,minWidth:0}}>
                        <div style={{display:'flex',alignItems:'center',gap:8,flexWrap:'wrap'}}>
                          <span style={{fontFamily:"'Oswald',sans-serif",fontSize:14,color:'#F8F3EC',fontWeight:600,textTransform:'uppercase'}}>{item.name}</span>
                          <span style={{fontFamily:"'Oswald',sans-serif",fontSize:13,color:'#FF5500'}}>{fmtCur(item.price)}</span>
                          <span style={{background:item.cat==='veg'?'rgba(76,175,80,.1)':item.cat==='non-veg'?'rgba(244,67,54,.09)':'rgba(255,85,0,.09)',color:item.cat==='veg'?'#4CAF50':item.cat==='non-veg'?'#F44336':'#FF5500',fontSize:9,padding:'2px 6px',fontFamily:"'DM Sans',sans-serif",textTransform:'uppercase'}}>{item.cat}</span>
                          {item.hot&&<span style={{fontSize:11}}>🔥</span>}
                          {item.pop&&<span style={{background:'rgba(255,184,0,.1)',color:'#FFB800',fontSize:9,padding:'2px 6px',fontFamily:"'Oswald',sans-serif",letterSpacing:.5}}>POPULAR</span>}
                          {!item.available&&<span style={{background:'rgba(244,67,54,.1)',color:'#F44336',fontSize:9,padding:'2px 6px',fontFamily:"'DM Sans',sans-serif",textTransform:'uppercase'}}>UNAVAILABLE</span>}
                        </div>
                        <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:11.5,color:'#484848',marginTop:3}}>{item.desc}</div>
                      </div>
                      <div style={{display:'flex',gap:8,flexShrink:0}}>
                        <button onClick={()=>toggleAvail(item.id)} style={{background:'none',border:`1px solid ${item.available?'rgba(244,67,54,.25)':'rgba(76,175,80,.25)'}`,color:item.available?'#F44336':'#4CAF50',padding:'6px 12px',fontFamily:"'DM Sans',sans-serif",fontSize:11.5,cursor:'pointer'}}>
                          {item.available?'Disable':'Enable'}
                        </button>
                        <button onClick={()=>setEditItem({...item})} style={{background:'none',border:'1px solid rgba(255,85,0,.22)',color:'#FF5500',padding:'6px 12px',fontFamily:"'DM Sans',sans-serif",fontSize:11.5,cursor:'pointer'}}>Edit</button>
                        <button onClick={()=>deleteItem(item.id)} style={{background:'none',border:'1px solid rgba(244,67,54,.16)',color:'#F44336',padding:'6px 12px',fontFamily:"'DM Sans',sans-serif",fontSize:11.5,cursor:'pointer'}}>✕</button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* USERS */}
        {tab==='users'&&(
          <div>
            <h2 style={{fontFamily:"'Oswald',sans-serif",fontSize:18,color:'#F8F3EC',textTransform:'uppercase',letterSpacing:1,marginBottom:18}}>Registered Users ({users.length})</h2>
            {users.length===0?<div style={{textAlign:'center',padding:'50px 0',color:'#3a3a3a',fontFamily:"'DM Sans',sans-serif"}}>No registered users yet.</div>
            :users.map(u=>(
              <div key={u.id} style={{background:'#111',border:'1px solid rgba(255,85,0,.07)',padding:15,marginBottom:8,display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:8}}>
                <div style={{display:'flex',alignItems:'center',gap:11}}>
                  <div style={{width:36,height:36,background:'rgba(255,85,0,.14)',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:"'Oswald',sans-serif",fontSize:14,fontWeight:700,color:'#FF5500'}}>{(u.name||'?')[0].toUpperCase()}</div>
                  <div>
                    <div style={{fontFamily:"'Oswald',sans-serif",fontSize:13.5,color:'#F8F3EC',fontWeight:600}}>{u.name}</div>
                    <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:11.5,color:'#484848',marginTop:2}}>{u.email} · {u.phone||'No phone'}</div>
                  </div>
                </div>
                <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:11.5,color:'#3a3a3a'}}>Joined: {u.joinedAt||'-'} · Orders: {orders.filter(o=>o.userId===u.id).length}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── ROOT APP ───────────────────────────────────────────────────────────────── */
export default function App(){
  const [page,setPage]=useState('home');
  const [user,setUser]=useState(null);
  const [cart,setCart]=useState([]);
  const [orders,setOrders]=useState([]);
  const [specialOrders,setSpecialOrders]=useState([]);
  const [menuItems,setMenuItems]=useState(DEFAULT_MENU);
  const [toastMsg,setToastMsg]=useState('');
  const [mobileOpen,setMobileOpen]=useState(false);
  const [loading,setLoading]=useState(true);

  const addToast=useCallback(msg=>setToastMsg(msg),[]);
  const go=useCallback(p=>{setPage(p);setMobileOpen(false);window.scrollTo(0,0);},[]);

  useEffect(()=>{
    const init=async()=>{
      const [cu,dbO,dbS,dbM]=await Promise.all([db.get('currentUser'),db.get('orders'),db.get('specialOrders'),db.get('menuItems')]);
      if(cu)setUser(cu);
      if(dbO)setOrders(dbO);
      if(dbS)setSpecialOrders(dbS);
      if(dbM)setMenuItems(dbM);
      setLoading(false);
    };
    init();
  },[]);

  const addOrder=async o=>{const u=[...orders,o];setOrders(u);await db.set('orders',u);};
  const addSpecialOrder=async o=>{const u=[...specialOrders,o];setSpecialOrders(u);await db.set('specialOrders',u);};

  if(loading) return(
    <div style={{minHeight:'100vh',background:'#0a0a0a',display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column',gap:16}}>
      <style>{INJECT_CSS}</style>
      <div style={{fontSize:48}}>🍔</div>
      <div style={{fontFamily:"'Oswald',sans-serif",fontSize:14,color:'#FF5500',letterSpacing:3,textTransform:'uppercase',animation:'pulse 1.2s ease infinite'}}>Loading...</div>
    </div>
  );

  return(
    <div style={{background:'#0a0a0a',minHeight:'100vh',color:'#F8F3EC'}}>
      <style>{INJECT_CSS}</style>
      <Navbar page={page} go={go} user={user} cart={cart} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen}/>
      {mobileOpen&&<MobileDrawer page={page} go={go} user={user} close={()=>setMobileOpen(false)}/>}
      {!mobileOpen&&(
        <>
          {page==='home'&&<HomePage go={go} menuItems={menuItems}/>}
          {page==='menu'&&<MenuPage cart={cart} setCart={setCart} addToast={addToast} menuItems={menuItems}/>}
          {page==='cart'&&<CartPage cart={cart} setCart={setCart} user={user} go={go} addOrder={addOrder} addToast={addToast} menuItems={menuItems}/>}
          {page==='special-order'&&<SpecialOrderPage user={user} go={go} addSpecialOrder={addSpecialOrder} addToast={addToast} menuItems={menuItems}/>}
          {page==='auth'&&<AuthPage setUser={setUser} go={go} addToast={addToast}/>}
          {page==='profile'&&(user?<ProfilePage user={user} setUser={setUser} orders={[...orders,...specialOrders]} go={go} addToast={addToast}/>:go('auth'))}
          {page==='about'&&<AboutPage go={go}/>}
          {page==='admin'&&(user?.isAdmin?<AdminPage orders={orders} specialOrders={specialOrders} setOrders={setOrders} setSpecialOrders={setSpecialOrders} go={go} menuItems={menuItems} setMenuItems={setMenuItems}/>:go('home'))}
        </>
      )}
      {/* WhatsApp floating button */}
      <a href={`https://wa.me/${OWNER_WHATSAPP}`} target="_blank" rel="noopener noreferrer" className="whatsapp-float" title="Chat with Jimis Burger">
        📱
      </a>
      {toastMsg&&<Toast msg={toastMsg} onClose={()=>setToastMsg('')}/>}
    </div>
  );
}
