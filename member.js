const state = {
  isAuthed: localStorage.getItem("tiyAuthed") === "1",
  active: "dashboard",
  user: JSON.parse(localStorage.getItem("tiyUser") || "null") || {
    name: "คุณรูบ",
    email: "member@tubeiyen.com",
    phone: "081-234-5678"
  },
  wallet: {
    balance: 25680,
    transactions: [
      { date: "20/05/2024", amount: 5000 },
      { date: "18/05/2024", amount: 3000 },
      { date: "15/05/2024", amount: 10000 }
    ]
  },
  orders: [
    {
      id: "IC2405200001",
      shop: "Taobao",
      detail: "ธูปหอม กล่องเซรามิก สีขาว",
      date: "20/05/2024",
      status: "รอชำระเงิน",
      amount: 1880,
      weight: "รอชั่งน้ำหนัก",
      timeline: [
        ["รอชำระเงิน", "20/05/2024 10:30", true],
        ["กำลังสั่งซื้อ", "20/05/2024 14:20", false],
        ["ถึงโกดังจีน", "22/05/2024 09:15", false],
        ["กำลังจัดส่งจากจีน", "-", false],
        ["ถึงไทย", "-", false],
        ["นำส่งปลายทาง", "-", false]
      ]
    },
    {
      id: "IC2405180002",
      shop: "Taobao",
      detail: "ชุดถ้วยชา สีครีม",
      date: "18/05/2024",
      status: "ชำระเงินแล้ว",
      amount: 2450,
      weight: "12.30 kg",
      timeline: [
        ["รอชำระเงิน", "18/05/2024 09:00", true],
        ["กำลังสั่งซื้อ", "18/05/2024 12:30", true],
        ["ถึงโกดังจีน", "20/05/2024 16:10", true],
        ["กำลังจัดส่งจากจีน", "21/05/2024 08:45", false],
        ["ถึงไทย", "-", false],
        ["นำส่งปลายทาง", "-", false]
      ]
    },
    {
      id: "IC2405120003",
      shop: "1688",
      detail: "กล่องของขวัญ 20 ชิ้น",
      date: "15/05/2024",
      status: "สำเร็จแล้ว",
      amount: 5120,
      weight: "5.20 kg",
      timeline: [
        ["รอชำระเงิน", "15/05/2024 10:00", true],
        ["กำลังสั่งซื้อ", "15/05/2024 11:30", true],
        ["ถึงโกดังจีน", "17/05/2024 09:15", true],
        ["กำลังจัดส่งจากจีน", "18/05/2024 08:20", true],
        ["ถึงไทย", "21/05/2024 15:10", true],
        ["นำส่งปลายทาง", "22/05/2024 13:45", true]
      ]
    }
  ],
  invoices: [
    { id: "INV2024050001", date: "20/05/2024", amount: 5000 },
    { id: "INV2024050002", date: "18/05/2024", amount: 3800 },
    { id: "INV2024050003", date: "15/05/2024", amount: 7650 }
  ],
  addresses: [
    {
      title: "ที่อยู่สำหรับจัดส่งพัสดุในไทย",
      name: "คุณรูบ ไอเย็น",
      detail: "123/456 หมู่ 1 ถ.บางรักพัฒนา อ.บางบัวทอง จ.นนทบุรี 11110"
    },
    {
      title: "ที่อยู่สำหรับออกใบกำกับภาษี",
      name: "บริษัท Tube i Yen จำกัด",
      detail: "123 อาคาร A ชั้น 5 ถ.สุขุมวิท กรุงเทพฯ 10110 เลขภาษี 010556123456"
    }
  ]
};

const menu = [
  ["dashboard", "dashboard", "Dashboard"],
  ["create", "add_shopping_cart", "สร้างออเดอร์"],
  ["orders", "inventory_2", "คำสั่งซื้อ"],
  ["payment", "credit_card", "ชำระเงิน"],
  ["tracking", "local_shipping", "พัสดุของฉัน"],
  ["wallet", "account_balance_wallet", "เครดิต"],
  ["documents", "description", "เอกสาร / VAT"],
  ["addresses", "location_on", "ที่อยู่ของฉัน"],
  ["settings", "settings", "ตั้งค่าบัญชี"],
  ["help", "help", "ช่วยเหลือ"]
];

const baht = amount => Number(amount).toLocaleString("th-TH", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " บาท";
const el = id => document.getElementById(id);

function setAuthed(value) {
  state.isAuthed = value;
  localStorage.setItem("tiyAuthed", value ? "1" : "0");
  render();
}

function setUser(user) {
  state.user = user;
  localStorage.setItem("tiyUser", JSON.stringify(user));
}

function setActive(section) {
  state.active = section;
  render();
}

function shell(content) {
  return `
    <div class="min-h-screen bg-stone-50">
      <header class="sticky top-0 z-30 border-b border-stone-200 bg-white/90 backdrop-blur">
        <div class="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
          <a href="index.html" class="flex items-center gap-3">
            <span class="material-symbols-outlined text-stone-700">spa</span>
            <div>
              <div class="text-lg font-bold">Tube i Yen</div>
              <div class="text-xs text-stone-500">Member Ordering</div>
            </div>
          </a>
          <button onclick="logout()" class="rounded-lg border border-stone-300 px-3 py-2 text-sm hover:bg-stone-100">ออกจากระบบ</button>
        </div>
      </header>
      <div class="mx-auto grid max-w-7xl gap-4 px-4 py-4 lg:grid-cols-[260px_1fr]">
        <aside class="rounded-xl border border-stone-200 bg-white p-3 lg:sticky lg:top-20 lg:h-[calc(100vh-6rem)]">
          <div class="mb-3 rounded-lg bg-stone-100 p-4">
            <div class="font-semibold">${state.user.name}</div>
            <div class="text-sm text-stone-500">${state.user.email}</div>
          </div>
          <nav class="grid gap-1">
            ${menu.map(item => `
              <button onclick="setActive('${item[0]}')" class="flex items-center gap-3 rounded-lg px-3 py-3 text-left ${state.active === item[0] ? "bg-stone-900 text-white" : "hover:bg-stone-100"}">
                <span class="material-symbols-outlined">${item[1]}</span>
                <span>${item[2]}</span>
              </button>
            `).join("")}
          </nav>
        </aside>
        <main class="min-w-0">${content}</main>
      </div>
    </div>
  `;
}

function page(title, subtitle, body) {
  return `
    <section class="space-y-4">
      <div>
        <h1 class="text-2xl font-bold">${title}</h1>
        <p class="text-stone-500">${subtitle}</p>
      </div>
      ${body}
    </section>
  `;
}

function card(body, extra = "") {
  return `<div class="rounded-xl border border-stone-200 bg-white p-5 ${extra}">${body}</div>`;
}

function statusPill(status) {
  const tone = status === "รอชำระเงิน" ? "bg-amber-100 text-amber-700" : status === "สำเร็จแล้ว" ? "bg-green-100 text-green-700" : "bg-stone-100 text-stone-700";
  return `<span class="rounded-full px-3 py-1 text-xs font-semibold ${tone}">${status}</span>`;
}

function authView(mode = "login") {
  const isSignup = mode === "signup";
  return `
    <div class="min-h-screen bg-stone-100 px-4 py-8">
      <div class="mx-auto max-w-md">
        <a href="index.html" class="mb-8 flex justify-center text-sm text-stone-500">กลับหน้าแรก</a>
        ${card(`
          <div class="mb-6 text-center">
            <div class="mb-2 text-3xl font-bold">Tube i Yen</div>
            <p class="text-stone-500">${isSignup ? "สมัครสมาชิกเพื่อเริ่มสั่งซื้อและติดตามพัสดุ" : "เข้าสู่ระบบสมาชิก"}</p>
          </div>
          <form id="authForm" class="space-y-4">
            ${isSignup ? `<input name="name" class="w-full rounded-lg border-stone-300" placeholder="ชื่อ-นามสกุล">` : ""}
            <input name="email" class="w-full rounded-lg border-stone-300" placeholder="อีเมล" value="${isSignup ? "" : "member@tubeiyen.com"}">
            ${isSignup ? `<input name="phone" class="w-full rounded-lg border-stone-300" placeholder="เบอร์โทรศัพท์">` : ""}
            <input name="password" type="password" class="w-full rounded-lg border-stone-300" placeholder="รหัสผ่าน" value="${isSignup ? "" : "password"}">
            ${isSignup ? `<input name="confirm" type="password" class="w-full rounded-lg border-stone-300" placeholder="ยืนยันรหัสผ่าน">` : ""}
            ${isSignup ? `<label class="flex items-center gap-2 text-sm"><input name="terms" type="checkbox" checked class="rounded border-stone-300"> ยอมรับเงื่อนไขการใช้บริการ</label>` : ""}
            <p id="authMessage" class="hidden text-sm text-red-600"></p>
            <button class="w-full rounded-lg bg-stone-900 px-4 py-3 font-semibold text-white">${isSignup ? "สมัครสมาชิก" : "เข้าสู่ระบบ"}</button>
          </form>
          <button onclick="renderAuth('${isSignup ? "login" : "signup"}')" class="mt-4 w-full text-sm font-medium text-stone-700 hover:underline">
            ${isSignup ? "มีบัญชีแล้ว เข้าสู่ระบบ" : "สมัครสมาชิกใหม่"}
          </button>
        `)}
      </div>
    </div>
  `;
}

function dashboard() {
  return page("สวัสดี, " + state.user.name, "ภาพรวมเครดิต คำสั่งซื้อ และสถานะล่าสุด", `
    <div class="grid gap-4 md:grid-cols-4">
      ${card(`<div class="text-sm text-stone-500">เครดิตคงเหลือ</div><div class="mt-2 text-2xl font-bold">${baht(state.wallet.balance)}</div>`, "md:col-span-2")}
      ${card(`<div class="text-sm text-stone-500">ออเดอร์ทั้งหมด</div><div class="mt-2 text-2xl font-bold">${state.orders.length}</div>`)}
      ${card(`<div class="text-sm text-stone-500">รอชำระเงิน</div><div class="mt-2 text-2xl font-bold">${state.orders.filter(o => o.status === "รอชำระเงิน").length}</div>`)}
    </div>
    ${card(`
      <div class="mb-3 flex items-center justify-between">
        <h2 class="text-lg font-semibold">ออเดอร์ล่าสุด</h2>
        <button onclick="setActive('orders')" class="text-sm font-medium text-stone-600">ดูทั้งหมด</button>
      </div>
      <div class="space-y-3">${state.orders.slice(0, 3).map(orderRow).join("")}</div>
    `)}
  `);
}

function createOrder() {
  return page("สร้างออเดอร์", "เพิ่มลิงก์สินค้าและรายละเอียดที่ต้องการสั่งซื้อ", card(`
    <form id="orderForm" class="space-y-4">
      <input name="url" class="w-full rounded-lg border-stone-300" placeholder="ลิงก์สินค้า เช่น https://item.taobao.com/...">
      <textarea name="detail" class="h-28 w-full rounded-lg border-stone-300" placeholder="รายละเอียดสินค้า สี ไซส์ จำนวน หมายเหตุ"></textarea>
      <input name="qty" type="number" min="1" value="1" class="w-full rounded-lg border-stone-300" placeholder="จำนวน">
      <button class="rounded-lg bg-stone-900 px-5 py-3 font-semibold text-white">บันทึกออเดอร์</button>
    </form>
  `));
}

function orderRow(order) {
  return `
    <div class="rounded-lg border border-stone-200 p-4">
      <div class="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div class="font-semibold">${order.id}</div>
          <div class="text-sm text-stone-500">${order.detail}</div>
          <div class="mt-1 text-xs text-stone-400">${order.shop} · ${order.date}</div>
        </div>
        <div class="text-right">
          ${statusPill(order.status)}
          <div class="mt-2 text-sm font-semibold">${baht(order.amount)}</div>
        </div>
      </div>
    </div>
  `;
}

function orders() {
  return page("คำสั่งซื้อ", "รายการออเดอร์ทั้งหมดของคุณ", `<div class="space-y-3">${state.orders.map(orderRow).join("")}</div>`);
}

function payment() {
  const order = state.orders.find(item => item.status === "รอชำระเงิน") || state.orders[0];
  return page("ชำระเงิน", "เลือกช่องทางและยืนยันการชำระเงิน", card(`
    <div class="mb-5">
      <div class="text-sm text-stone-500">${order.id}</div>
      <div class="text-3xl font-bold">${baht(order.amount)}</div>
    </div>
    <form id="paymentForm" class="space-y-3">
      ${["โอนเงินผ่านธนาคาร", "QR Code พร้อมเพย์", "บัตรเครดิต / Debit"].map((method, idx) => `
        <label class="flex cursor-pointer items-center gap-3 rounded-lg border border-stone-200 p-4">
          <input type="radio" name="method" value="${method}" ${idx === 0 ? "checked" : ""}>
          <span>${method}</span>
        </label>
      `).join("")}
      <button class="mt-3 rounded-lg bg-stone-900 px-5 py-3 font-semibold text-white">ยืนยันการชำระเงิน</button>
    </form>
  `));
}

function tracking() {
  return page("พัสดุของฉัน", "ติดตามสถานะตั้งแต่สั่งซื้อจนถึงปลายทาง", `
    <div class="grid gap-4 lg:grid-cols-2">
      ${state.orders.map(order => card(`
        <div class="mb-4 flex items-start justify-between gap-3">
          <div><div class="font-semibold">${order.id}</div><div class="text-sm text-stone-500">น้ำหนัก ${order.weight}</div></div>
          ${statusPill(order.status)}
        </div>
        <div class="space-y-3">
          ${order.timeline.map(step => `
            <div class="flex gap-3">
              <div class="mt-1 h-3 w-3 rounded-full ${step[2] ? "bg-green-500" : "bg-stone-300"}"></div>
              <div><div class="font-medium">${step[0]}</div><div class="text-sm text-stone-500">${step[1]}</div></div>
            </div>
          `).join("")}
        </div>
      `)).join("")}
    </div>
  `);
}

function wallet() {
  return page("เครดิต", "ยอดคงเหลือและประวัติการเติมเงิน", `
    ${card(`<div class="text-sm text-stone-500">เครดิตคงเหลือ</div><div class="mt-2 text-3xl font-bold">${baht(state.wallet.balance)}</div>`)}
    ${card(`
      <h2 class="mb-3 text-lg font-semibold">ประวัติการเติมเงิน</h2>
      <div class="divide-y divide-stone-200">
        ${state.wallet.transactions.map(item => `<div class="flex justify-between py-3"><span>${item.date}</span><span class="font-semibold text-green-700">+${baht(item.amount)}</span></div>`).join("")}
      </div>
    `)}
  `);
}

function documents() {
  return page("เอกสาร / VAT", "ใบกำกับภาษีและใบเสร็จรับเงิน", `<div class="space-y-3">${state.invoices.map(item => card(`<div class="flex items-center justify-between gap-3"><div><div class="font-semibold">${item.id}</div><div class="text-sm text-stone-500">${item.date} · ${baht(item.amount)}</div></div><button class="rounded-lg border border-stone-300 px-3 py-2 text-sm">PDF</button></div>`)).join("")}</div>`);
}

function addresses() {
  return page("ที่อยู่ของฉัน", "ที่อยู่จัดส่งและข้อมูลสำหรับออกเอกสาร", `<div class="grid gap-4 lg:grid-cols-2">${state.addresses.map(item => card(`<div class="mb-2 font-semibold">${item.title}</div><div>${item.name}</div><p class="mt-2 text-sm text-stone-500">${item.detail}</p><button class="mt-4 rounded-lg border border-stone-300 px-3 py-2 text-sm">แก้ไข</button>`)).join("")}</div>`);
}

function settings() {
  return page("ตั้งค่าบัญชี", "ข้อมูลบัญชีและการแจ้งเตือน", card(`
    ${settingsRow("ข้อมูลบัญชี", state.user.email)}
    ${settingsRow("เบอร์โทร", state.user.phone)}
    ${settingsRow("เปลี่ยนรหัสผ่าน", "ตั้งค่าแล้ว")}
    ${settingsRow("การแจ้งเตือน", "เปิดอยู่")}
    ${settingsRow("เชื่อมต่อ Line", "ยังไม่ได้เชื่อมต่อ")}
  `));
}

function settingsRow(label, value) {
  return `<div class="flex justify-between border-b border-stone-200 py-4 last:border-0"><span>${label}</span><span class="text-stone-500">${value}</span></div>`;
}

function help() {
  return page("ช่วยเหลือ", "คำถามที่พบบ่อยและช่องทางติดต่อ", card(`
    ${settingsRow("วิธีการสั่งซื้อ", "ดูรายละเอียด")}
    ${settingsRow("อัตราค่าบริการ", "ดูรายละเอียด")}
    ${settingsRow("ถาม-ตอบ (FAQ)", "ดูรายละเอียด")}
    ${settingsRow("ติดต่อเรา", "Line / Email")}
  `));
}

function renderContent() {
  const map = { dashboard, create: createOrder, orders, payment, tracking, wallet, documents, addresses, settings, help };
  return map[state.active]();
}

function renderAuth(mode) {
  document.body.innerHTML = authView(mode);
  bindAuth(mode);
}

function render() {
  if (!state.isAuthed) {
    renderAuth("login");
    return;
  }
  document.body.innerHTML = shell(renderContent());
  bindForms();
}

function bindAuth(mode) {
  el("authForm").addEventListener("submit", event => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.target));
    const message = el("authMessage");

    if (mode === "signup") {
      if (!data.name || !data.email || !data.phone || !data.password || !data.confirm) {
        message.textContent = "กรุณากรอกข้อมูลให้ครบ";
        message.classList.remove("hidden");
        return;
      }
      if (data.password !== data.confirm) {
        message.textContent = "รหัสผ่านไม่ตรงกัน";
        message.classList.remove("hidden");
        return;
      }
      setUser({ name: data.name, email: data.email, phone: data.phone });
    }

    if (mode === "login") {
      setUser({ ...state.user, email: data.email || state.user.email });
    }
    setAuthed(true);
  });
}

function bindForms() {
  const orderForm = el("orderForm");
  if (orderForm) {
    orderForm.addEventListener("submit", event => {
      event.preventDefault();
      const data = Object.fromEntries(new FormData(event.target));
      const qty = Math.max(Number(data.qty || 1), 1);
      state.orders.unshift({
        id: "IC" + Math.floor(2406000000 + Math.random() * 99999),
        shop: "Taobao",
        detail: data.detail || "รอทีมงานตรวจสอบรายละเอียดสินค้า",
        date: "06/06/2026",
        status: "รอชำระเงิน",
        amount: qty * 1680 + 200,
        weight: "รอชั่งน้ำหนัก",
        timeline: [
          ["รอชำระเงิน", "06/06/2026 10:30", true],
          ["กำลังสั่งซื้อ", "-", false],
          ["ถึงโกดังจีน", "-", false],
          ["กำลังจัดส่งจากจีน", "-", false],
          ["ถึงไทย", "-", false],
          ["นำส่งปลายทาง", "-", false]
        ]
      });
      setActive("orders");
    });
  }

  const paymentForm = el("paymentForm");
  if (paymentForm) {
    paymentForm.addEventListener("submit", event => {
      event.preventDefault();
      const target = state.orders.find(item => item.status === "รอชำระเงิน");
      if (target) {
        target.status = "ชำระเงินแล้ว";
        target.timeline[1][2] = true;
        target.timeline[1][1] = "06/06/2026 11:20";
      }
      setActive("tracking");
    });
  }
}

function logout() {
  localStorage.removeItem("tiyAuthed");
  state.isAuthed = false;
  state.active = "dashboard";
  render();
}

window.setActive = setActive;
window.renderAuth = renderAuth;
window.logout = logout;

render();
