// import React, { useCallback, useEffect, useRef, useState } from "react";
//
// /**
//  * ChatUploaderEnhanced.tsx
//  * - Improved ChatGPT-like uploader + chat UI
//  * - Proper colors (tailwind keys assumed kebab-case like `bg-slate-blue`)
//  * - Progressive staged mock loading, file validation, upload progress,
//  *   and a graceful mock-backend fallback.
//  *
//  * Usage:
//  *  - Place this file in `src/components/ChatUploaderEnhanced.tsx`
//  *  - Ensure tailwind.config.js includes the color keys used (see project files)
//  *  - Import normally: `import ChatUploaderEnhanced from '@/components/ChatUploaderEnhanced'`
//  */
//
// type Message = {
//   id: string;
//   role: "user" | "assistant" | "system";
//   text?: string;
//   fileName?: string;
//   fileSize?: number;
// };
//
// const MAX_FILES = 5;
// const MAX_FILE_SIZE = 25 * 1024 * 1024; // 25 MB
// const ALLOWED_MIMES = [
//   "application/pdf",
//   "text/plain",
//   "text/csv",
//   "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
//   "image/png",
//   "image/jpeg"
// ];
//
// // Default upload URL — replace with your real endpoint
// const DEFAULT_UPLOAD_URL = "/api/upload";
//
// export default function ChatUploaderEnhanced({ uploadUrl }: { uploadUrl?: string }) {
//   const [messages, setMessages] = useState<Message[]>(() => [
//     { id: `s-${Date.now()}`, role: "assistant", text: "Salom! Fayl yuklash yoki matn yuborishingiz mumkin — demo rejim." }
//   ]);
//   const [text, setText] = useState("");
//   const [files, setFiles] = useState<File[]>([]);
//   const [dragActive, setDragActive] = useState(false);
//   const [sending, setSending] = useState(false);
//   const [uploadPct, setUploadPct] = useState<number | null>(null);
//   const [staged, setStaged] = useState<number>(0); // 0=idle, 1..3 staged loading
//   const fileRef = useRef<HTMLInputElement | null>(null);
//   const scrollRef = useRef<HTMLDivElement | null>(null);
//
//   // Keep scroll to bottom
//   useEffect(() => {
//     if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
//   }, [messages, uploadPct]);
//
//   // small staged mock loader for the right-hand mock panel feel
//   useEffect(() => {
//     let t1: number | undefined;
//     let t2: number | undefined;
//     let t3: number | undefined;
//     setStaged(1);
//     t1 = window.setTimeout(() => setStaged(2), 700);
//     t2 = window.setTimeout(() => setStaged(3), 1400);
//     t3 = window.setTimeout(() => setStaged(0), 2200);
//     return () => {
//       if (t1) clearTimeout(t1);
//       if (t2) clearTimeout(t2);
//       if (t3) clearTimeout(t3);
//     };
//   }, []);
//
//   // validators
//   const validateFiles = useCallback((list: FileList | null) => {
//     if (!list) return [] as File[];
//     const arr = Array.from(list).slice(0, MAX_FILES);
//     const good: File[] = [];
//     arr.forEach((f) => {
//       if (!ALLOWED_MIMES.includes(f.type)) return; // skip disallowed
//       if (f.size > MAX_FILE_SIZE) return; // skip too large
//       good.push(f);
//     });
//     return good;
//   }, []);
//
//   const handleFiles = useCallback((incoming: FileList | null) => {
//     const good = validateFiles(incoming);
//     if (good.length === 0) return;
//     setFiles((s) => {
//       const merged = [...s, ...good].slice(0, MAX_FILES);
//       return merged;
//     });
//   }, [validateFiles]);
//
//   const onDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
//     e.preventDefault();
//     e.stopPropagation();
//     setDragActive(false);
//     handleFiles(e.dataTransfer.files);
//   }, [handleFiles]);
//
//   const onDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
//     e.preventDefault();
//     e.stopPropagation();
//     setDragActive(true);
//   }, []);
//
//   const onDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
//     e.preventDefault();
//     e.stopPropagation();
//     setDragActive(false);
//   }, []);
//
//   const removeFile = useCallback((i: number) => {
//     setFiles((s) => s.filter((_, idx) => idx !== i));
//   }, []);
//
//   function fmtSize(n = 0) {
//     if (n < 1024) return `${n} B`;
//     if (n < 1024 * 1024) return `${Math.round(n / 1024)} KB`;
//     return `${(n / (1024 * 1024)).toFixed(2)} MB`;
//   }
//
//   // upload helper with progress (XHR). Falls back to mock if no endpoint provided.
//   function uploadWithProgress(url: string | null, formData: FormData, onProgress?: (p: number) => void) {
//     return new Promise<{ ok: boolean; data?: any }>((resolve, reject) => {
//       if (!url) {
//         // Mock streaming-like behavior
//         let stage = 0;
//         const id = setInterval(() => {
//           stage += 1;
//           onProgress?.(Math.min(90, stage * 30));
//           if (stage >= 3) {
//             clearInterval(id);
//             onProgress?.(100);
//             resolve({ ok: true, data: { mock: true } });
//           }
//         }, 500);
//         return;
//       }
//
//       const xhr = new XMLHttpRequest();
//       xhr.open("POST", url);
//
//       xhr.upload.onprogress = (e) => {
//         if (e.lengthComputable && onProgress) {
//           const pct = Math.round((e.loaded / e.total) * 100);
//           onProgress(pct);
//         }
//       };
//
//       xhr.onreadystatechange = () => {
//         if (xhr.readyState === 4) {
//           if (xhr.status >= 200 && xhr.status < 300) {
//             try {
//               const json = JSON.parse(xhr.responseText);
//               resolve({ ok: true, data: json });
//             } catch {
//               resolve({ ok: true, data: xhr.responseText });
//             }
//           } else {
//             reject(new Error(`Upload failed: ${xhr.status}`));
//           }
//         }
//       };
//
//       xhr.onerror = () => reject(new Error("Network error"));
//       xhr.send(formData);
//     });
//   }
//
//   // send either text-only or files. Uses uploadWithProgress when files present.
//   const send = useCallback(async () => {
//     if (!text.trim() && files.length === 0) return;
//
//     // push user message
//     if (text.trim()) {
//       setMessages((s) => [...s, { id: `u-${Date.now()}`, role: "user", text: text.trim() }]);
//     }
//
//     // push file messages
//     if (files.length > 0) {
//       files.forEach((f) => {
//         setMessages((s) => [...s, { id: `f-${Date.now()}-${f.name}`, role: "user", fileName: f.name, fileSize: f.size }]);
//       });
//     }
//
//     // prepare payload
//     let payload: FormData | { text: string };
//     if (files.length > 0) {
//       const fd = new FormData();
//       files.forEach((f) => fd.append("files", f, f.name));
//       fd.append("meta", JSON.stringify({ source: "chat-uploader-enhanced-demo" }));
//       payload = fd;
//     } else {
//       payload = { text: text.trim() };
//     }
//
//     // clear inputs client-side
//     setText("");
//     setFiles([]);
//
//     setSending(true);
//     setUploadPct(0);
//
//     try {
//       if (payload instanceof FormData) {
//         const res = await uploadWithProgress(uploadUrl ?? DEFAULT_UPLOAD_URL, payload, (p) => setUploadPct(p));
//         // show assistant reply
//         setMessages((s) => [...s, { id: `a-${Date.now()}`, role: "assistant", text: res.data?.message ?? "Server fayllarni qabul qildi (demo)." }]);
//       } else {
//         // text only — simple fetch
//         if (uploadUrl) {
//           const r = await fetch(uploadUrl, {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify(payload)
//           });
//           const json = await r.json();
//           setMessages((s) => [...s, { id: `a-${Date.now()}`, role: "assistant", text: json?.message ?? "Text qabul qilindi (server)." }]);
//         } else {
//           // fallback mock
//           await new Promise((r) => setTimeout(r, 900));
//           setMessages((s) => [...s, { id: `a-${Date.now()}`, role: "assistant", text: "Mock server: matn qabul qilindi." }]);
//         }
//       }
//     } catch (err: any) {
//       setMessages((s) => [...s, { id: `err-${Date.now()}`, role: "assistant", text: `Xatolik: ${err.message || err}` }]);
//     } finally {
//       setSending(false);
//       setTimeout(() => setUploadPct(null), 600);
//     }
//   }, [text, files, uploadUrl]);
//
//   return (
//     <div className="max-w-6xl mx-auto p-6 font-onest">
//       <div className="grid grid-cols-12 gap-6">
//         {/* main chat area */}
//         <div className="col-span-12 lg:col-span-7">
//           <div className="rounded-2xl shadow-card overflow-hidden border" style={{ borderColor: "rgba(43,49,73,0.08)" }}>
//             <div className="flex items-center justify-between px-5 py-4 bg-slate-blue text-white">
//               <div className="flex items-center gap-3">
//                 <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
//                   <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//                     <path d="M12 2C6.48 2 2 6 2 11.5C2 14.6 3.5 17.34 5.9 19.01V22L9 20.1C10.05 20.38 11.17 20.5 12.33 20.5C17.84 20.5 22.33 16.5 22.33 11.5C22.33 6 17.84 2 12 2Z" fill="#2B3149" />
//                   </svg>
//                 </div>
//                 <div>
//                   <div className="font-semibold">Kogg — Chat & File Uploader</div>
//                   <div className="text-xs opacity-80">Demo: fayl yoki matn yuborish — mock/real endpoint</div>
//                 </div>
//               </div>
//               <div className="text-sm opacity-80">Secure · Mock · Creative UI</div>
//             </div>
//
//             <div ref={scrollRef} id="chat-scroll-area" className="h-[420px] overflow-auto p-5 bg-off-white">
//               {messages.map((m) => (
//                 <div key={m.id} className={`mb-4 flex ${m.role === 'assistant' ? 'justify-start' : 'justify-end'}`}>
//                   <div className={`max-w-[80%] rounded-xl p-3 ${m.role === 'assistant' ? 'bg-ghost-white' : 'bg-white'}`}>
//                     {m.text && <div className="whitespace-pre-wrap">{m.text}</div>}
//                     {m.fileName && (
//                       <div className="mt-2 flex items-center justify-between gap-3">
//                         <div className="truncate font-medium">{m.fileName}</div>
//                         <div className="text-xs opacity-70">{fmtSize(m.fileSize)}</div>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               ))}
//             </div>
//
//             <div className="p-5 border-t bg-white" style={{ borderTopColor: 'rgba(43,49,73,0.05)' }}>
//               <div
//                 onDragOver={onDragOver}
//                 onDragLeave={onDragLeave}
//                 onDrop={onDrop}
//                 className={`rounded-xl p-4 transition-all border-2 ${dragActive ? 'border-dashed border-sky-blue bg-white' : 'border-dashed border-white-gray bg-white'}`}
//               >
//                 <div className="flex items-center justify-between gap-4">
//                   <div className="flex items-center gap-3">
//                     <input ref={fileRef} type="file" multiple className="hidden" onChange={(e) => handleFiles(e.target.files)} />
//                     <button className="px-4 py-2 rounded-md border" onClick={() => fileRef.current?.click()}>Fayl tanlash</button>
//                     <div className="text-sm opacity-80">Drag & drop — maksimal {MAX_FILES} fayl</div>
//                   </div>
//                   <div className="flex gap-2 items-center">
//                     <button className="px-4 py-2 rounded-md" onClick={() => { setFiles([]); setText(''); }}>Tozalash</button>
//                     <button
//                       className="px-4 py-2 rounded-md font-medium"
//                       style={{ background: '#4A7CF1', color: 'white' }}
//                       onClick={send}
//                       disabled={sending}
//                     >
//                       {sending ? 'Yuborilmoqda...' : (files.length ? `Fayllarni yuborish (${files.length})` : 'Matnni yuborish')}
//                     </button>
//                   </div>
//                 </div>
//
//                 {files.length > 0 && (
//                   <div className="mt-3 grid gap-2">
//                     {files.map((f, i) => (
//                       <div key={`${f.name}-${i}`} className="flex items-center justify-between bg-white rounded-md p-2 shadow-sm">
//                         <div className="truncate">{f.name}</div>
//                         <div className="flex items-center gap-2">
//                           <div className="text-xs opacity-70">{fmtSize(f.size)}</div>
//                           <button className="text-xs underline" onClick={() => removeFile(i)}>O'chirish</button>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 )}
//
//                 {uploadPct !== null && (
//                   <div className="mt-3">
//                     <div className="w-full bg-white-gray rounded h-2 overflow-hidden">
//                       <div className="h-full rounded" style={{ width: `${uploadPct}%`, background: '#4A7CF1' }} />
//                     </div>
//                     <div className="text-xs mt-1 opacity-70">Yuklanmoqda: {uploadPct}%</div>
//                   </div>
//                 )}
//
//               </div>
//
//               <textarea value={text} onChange={(e) => setText(e.target.value)} rows={3} placeholder="Yozing yoki faylni yuklang..." className="w-full rounded-md p-3 mt-4 resize-none border" style={{ borderColor: '#2B3149' }} />
//             </div>
//           </div>
//         </div>
//
//         {/* right panel: mock stats / creative */}
//         <div className="col-span-12 lg:col-span-5">
//           <div className="rounded-2xl shadow-card p-5 bg-white">
//             <div className="flex items-center justify-between mb-4">
//               <div>
//                 <div className="font-semibold">Mock Data & Status</div>
//                 <div className="text-xs opacity-80">Progressive skeletons for nicer UX</div>
//               </div>
//               <div className="text-xs text-slate-500">{staged === 0 ? 'Ready' : 'Loading'}</div>
//             </div>
//
//             <div className="mb-4">
//               <div className="bg-slate-blue rounded-lg p-4 text-white">
//                 <div className="flex items-center justify-between">
//                   <div className="text-sm font-medium">Overview</div>
//                   <div className="text-xs opacity-90">{staged === 0 ? 'Updated' : 'Loading'}</div>
//                 </div>
//                 <div className="mt-3">
//                   <div className="grid grid-cols-3 gap-3">
//                     <div className="p-3 bg-off-white rounded">
//                       <div className="text-xs opacity-80">Entries</div>
//                       <div className="text-xl font-semibold">{staged === 0 ? '1,234' : (<div className="h-6 w-12 bg-white rounded animate-pulse" />)}</div>
//                     </div>
//                     <div className="p-3 bg-off-white rounded">
//                       <div className="text-xs opacity-80">Errors</div>
//                       <div className="text-xl font-semibold">{staged === 0 ? '4' : (<div className="h-6 w-6 bg-white rounded animate-pulse" />)}</div>
//                     </div>
//                     <div className="p-3 bg-off-white rounded">
//                       <div className="text-xs opacity-80">Avg time</div>
//                       <div className="text-xl font-semibold">{staged === 0 ? '320ms' : (<div className="h-6 w-14 bg-white rounded animate-pulse" />)}</div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//
//             <div className="space-y-3">
//               {staged !== 0 ? (
//                 <>
//                   <div className="p-3 bg-white rounded shadow-sm">
//                     <div className="h-3 bg-white rounded animate-pulse w-3/4" />
//                     <div className="mt-2 h-12 bg-white rounded animate-pulse" />
//                   </div>
//
//                   <div className="p-3 bg-white rounded shadow-sm">
//                     <div className="h-3 bg-white rounded animate-pulse w-1/2" />
//                     <div className="mt-2 h-8 bg-white rounded animate-pulse" />
//                   </div>
//
//                   <div className="p-3 bg-white rounded shadow-sm">
//                     <div className="h-3 bg-white rounded animate-pulse w-2/3" />
//                     <div className="mt-2 h-6 bg-white rounded animate-pulse" />
//                   </div>
//                 </>
//               ) : (
//                 <>
//                   <div className="p-3 bg-white rounded shadow-sm">
//                     <div className="flex items-center justify-between">
//                       <div className="font-medium">Demo entry 1</div>
//                       <div className="text-xs opacity-70">12:34</div>
//                     </div>
//                     <div className="text-sm opacity-80 mt-2">Qisqacha ma'lumot — bu demo ma'lumot.</div>
//                   </div>
//
//                   <div className="p-3 bg-white rounded shadow-sm">
//                     <div className="flex items-center justify-between">
//                       <div className="font-medium">Demo entry 2</div>
//                       <div className="text-xs opacity-70">11:12</div>
//                     </div>
//                     <div className="text-sm opacity-80 mt-2">Yana bir misol yozuv — natija.</div>
//                   </div>
//                 </>
//               )}
//             </div>
//
//             <div className="mt-4 text-xs opacity-80">Ishlab chiqarishda fayllarni serverda skan qiling, limit va autentifikatsiyani qo'shing.</div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
import React, { useCallback, useEffect, useRef, useState } from "react";
import Button from "@/shared/ui/Button.tsx";

/**
 * ChatUploaderCards.tsx
 * - File + text uploader with upload progress
 * - Backend response shown as creative cards (title, summary, tags, actions)
 * - Replace `uploadUrl` prop with your real endpoint
 */

type Message = {
  id: string;
  role: "user" | "assistant" | "system";
  text?: string;
  fileName?: string;
  fileSize?: number;
};

type ResponseCard = {
  id: string;
  title: string;
  summary: string;
  tags?: string[];
  fileName?: string;
  fileSize?: number;
  status?: "ok" | "warning" | "danger";
  confidence?: number; // 0-100
  createdAt?: string;
  // any additional meta...
};

const MAX_FILES = 5;
const MAX_FILE_SIZE = 25 * 1024 * 1024; // 25MB
const ALLOWED_MIMES = [
  "application/pdf",
  "text/plain",
  "text/csv",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "image/png",
  "image/jpeg",
];

const DEFAULT_UPLOAD_URL = "/api/upload";

export default function ChatUploaderCards({ uploadUrl }: { uploadUrl?: string }) {
  const [messages, setMessages] = useState<Message[]>([
    { id: `s-${Date.now()}`, role: "assistant", text: "Salom! Fayl yoki matn yuboring — demo." },
  ]);
  const [text, setText] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const [sending, setSending] = useState(false);
  const [uploadPct, setUploadPct] = useState<number | null>(null);
  const [cards, setCards] = useState<ResponseCard[]>([]);
  const fileRef = useRef<HTMLInputElement | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, cards, uploadPct]);

  const validateFiles = useCallback((list: FileList | null) => {
    if (!list) return [] as File[];
    const arr = Array.from(list).slice(0, MAX_FILES);
    const good: File[] = [];
    arr.forEach((f) => {
      if (!ALLOWED_MIMES.includes(f.type)) return;
      if (f.size > MAX_FILE_SIZE) return;
      good.push(f);
    });
    return good;
  }, []);

  const handleFiles = useCallback((list: FileList | null) => {
    const good = validateFiles(list);
    if (good.length === 0) return;
    setFiles((s) => {
      const merged = [...s, ...good].slice(0, MAX_FILES);
      return merged;
    });
  }, [validateFiles]);

  const onDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault(); e.stopPropagation();
    setDragActive(false);
    handleFiles(e.dataTransfer.files);
  }, [handleFiles]);

  const onDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault(); e.stopPropagation(); setDragActive(true);
  }, []);
  const onDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault(); e.stopPropagation(); setDragActive(false);
  }, []);
  const removeFile = useCallback((i:number)=> setFiles(s => s.filter((_, idx)=> idx!==i)), []);

  function fmtSize(n=0){
    if(n<1024) return `${n} B`;
    if(n<1024*1024) return `${Math.round(n/1024)} KB`;
    return `${(n/(1024*1024)).toFixed(2)} MB`;
  }

  function uploadWithProgress(url: string | null, formData: FormData, onProgress?: (p:number)=>void) {
    return new Promise<{ ok: boolean; data?: any }>( (resolve, reject) => {
      if (!url) {
        // Mock: staged progress then return fake cards
        let p = 0;
        const tid = setInterval(() => {
          p += 25; onProgress?.(Math.min(100,p));
          if (p >= 100) {
            clearInterval(tid);
            // fake server "cards"
            resolve({
              ok: true,
              data: {
                cards: [
                  { id: "c1", title: "Fayl tahlili", summary: "Yuklangan fayldan muhim ma'lumotlar ajratildi.", tags:["pdf","pii"], fileName: formData.get("files") ? ( (formData.get("files") as File).name ?? "file" ) : undefined, status: "ok", confidence: 92, createdAt: new Date().toISOString() }
                ],
                message: "Mock server faylni qabul qildi (demo)."
              }
            });
          }
        }, 300);
        return;
      }

      const xhr = new XMLHttpRequest();
      xhr.open("POST", url);
      xhr.upload.onprogress = (e) => { if(e.lengthComputable && onProgress) onProgress(Math.round((e.loaded/e.total)*100)); };
      xhr.onreadystatechange = () => {
        if(xhr.readyState === 4){
          if(xhr.status >=200 && xhr.status <300){
            try { resolve({ ok: true, data: JSON.parse(xhr.responseText) }); } catch { resolve({ ok:true, data: xhr.responseText }); }
          } else {
            reject(new Error(`Upload failed ${xhr.status}`));
          }
        }
      };
      xhr.onerror = () => reject(new Error("Network error"));
      xhr.send(formData);
    });
  }

  const send = useCallback(async ()=>{
    if(!text.trim() && files.length === 0) return;

    if(text.trim()){
      setMessages(s => [...s, { id:`u-${Date.now()}`, role:"user", text: text.trim()}]);
    }
    if(files.length > 0){
      files.forEach(f => setMessages(s => [...s, { id:`f-${Date.now()}-${f.name}`, role:"user", fileName: f.name, fileSize: f.size }]));
    }

    // prepare payload
    let payload: FormData | { text: string };
    if(files.length > 0){
      const fd = new FormData();
      files.forEach(f => fd.append("files", f, f.name));
      fd.append("meta", JSON.stringify({source:"uploader-cards-demo"}));
      payload = fd;
    } else {
      payload = { text: text.trim() };
    }

    setText(""); setFiles([]);
    setSending(true); setUploadPct(0);

    try {
      if(payload instanceof FormData){
        const res = await uploadWithProgress(uploadUrl ?? DEFAULT_UPLOAD_URL, payload, (p)=> setUploadPct(p));
        if(res.ok){
          const data = res.data;
          // Expect server to return { cards: ResponseCard[], message?: string }
          if(data?.cards && Array.isArray(data.cards)){
            setCards((prev)=> [...data.cards, ...prev]); // newest on top
            setMessages((s)=> [...s, { id:`a-${Date.now()}`, role:"assistant", text: data.message ?? "Server fayllarni qabul qildi." }]);
          } else {
            setMessages((s)=> [...s, { id:`a-${Date.now()}`, role:"assistant", text: data?.message ?? "Upload tugadi." }]);
          }
        }
      } else {
        // text-only path
        if(uploadUrl){
          const r = await fetch(uploadUrl, { method:"POST", headers:{"Content-Type":"application/json"}, body: JSON.stringify(payload) });
          const json = await r.json();
          if(json?.cards) setCards(prev => [...json.cards, ...prev]);
          setMessages(s => [...s, { id:`a-${Date.now()}`, role:"assistant", text: json?.message ?? "Matn qabul qilindi." }]);
        } else {
          await new Promise(r => setTimeout(r, 800));
          setMessages(s => [...s, { id:`a-${Date.now()}`, role:"assistant", text: "Mock server: matn qabul qilindi." }]);
        }
      }
    } catch(err:any){
      setMessages(s => [...s, { id:`err-${Date.now()}`, role:"assistant", text:`Xatolik: ${err.message || err}` }]);
    } finally {
      setSending(false);
      setTimeout(()=> setUploadPct(null), 600);
    }
  }, [text, files, uploadUrl]);

  // Card UI helpers
  const statusColor = (status?: ResponseCard["status"]) => {
    if(status === "ok") return "bg-emerald-100 text-emerald-800";
    if(status === "warning") return "bg-yellow-100 text-yellow-800";
    if(status === "danger") return "bg-red-100 text-red-800";
    return "bg-slate-100 text-slate-800";
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="grid grid-cols-12 gap-6">
        {/* Left: chat/uploader */}
        <div className="col-span-12 lg:col-span-7">
          <div className="rounded-2xl shadow-card my-border dark:border-dborder overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 bg-slate-blue text-white">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
                  <svg width="20" height="20" viewBox="0 0 24 24">
                    <path
                      d="M12 2C6.48 2 2 6 2 11.5C2 14.6 3.5 17.34 5.9 19.01V22L9 20.1C10.05 20.38 11.17 20.5 12.33 20.5C17.84 20.5 22.33 16.5 22.33 11.5C22.33 6 17.84 2 12 2Z"
                      fill="#2B3149"
                    />
                  </svg>
                </div>
                <div>
                  <div className="font-semibold text-primary dark:text-dvalue">CVED — Upload & Cards</div>
                  <div className="text-xs opacity-80 text-primary dark:text-dvalue">
                    Backend javoblari cardlarda — demo/real endpoint moslashuv
                  </div>
                </div>
              </div>
              <div className="text-sm opacity-80 text-primary dark:text-dvalue">Secure · Creative</div>
            </div>

            <div
              ref={scrollRef}
              className="h-[420px] overflow-auto p-5 bg-off-white"
            >
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`mb-4 flex ${m.role === "assistant" ? "justify-start" : "justify-end"}`}
                >
                  <div
                    className={`max-w-[80%] rounded-xl p-3 text-primary dark:text-dvalue dark:bg-dcontent ${m.role === "assistant" ? "bg-ghost-white" : "bg-white"}`}
                  >
                    {m.text && (
                      <div className="whitespace-pre-wrap">{m.text}</div>
                    )}
                    {m.fileName && (
                      <div className="mt-2 text-sm">
                        <strong>Fayl:</strong> {m.fileName} —{" "}
                        <span className="opacity-80">
                          {fmtSize(m.fileSize)}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="p-5 border-t dark:border-t-dborder bg-white dark:bg-dcontent">
              <div
                onDragOver={onDragOver}
                onDragLeave={onDragLeave}
                onDrop={onDrop}
                className={`rounded-xl p-4 transition-all border-2 dark:border-dborder ${dragActive ? "border-dashed border-sky-blue bg-white dark:bg-dbody" : "border-dashed border-white-gray dark:bg-dbody bg-white"}`}
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <input
                      ref={fileRef}
                      type="file"
                      multiple
                      className="hidden"
                      onChange={(e) => handleFiles(e.target.files)}
                    />
                    <Button variant={'phantom'}
                      className="px-4 py-2 rounded-md border dark:border-dborder"
                      onClick={() => fileRef.current?.click()}
                    >
                      Fayl tanlash
                    </Button>
                    <div className="text-sm opacity-80">
                      Drag & drop — maksimal {MAX_FILES} fayl (max{" "}
                      {Math.round(MAX_FILE_SIZE / 1024 / 1024)}MB)
                    </div>
                  </div>

                  <div className="flex gap-2 items-center">
                    {!files.length &&
                      <Button
                        variant={"phantom"}
                        onClick={() => {
                          setFiles([]);
                          setText("");
                        }}
                      >
                        Tozalash
                      </Button>
                    }
                    <Button
                      variant={"primary"}
                      onClick={send}
                      disabled={sending}
                    >
                      {sending
                        ? "Yuborilmoqda..."
                        : files.length
                          ? `Fayllarni yuborish (${files.length})`
                          : "Yuborish"}
                    </Button>
                  </div>
                </div>

                {files.length > 0 && (
                  <div className="mt-3 grid gap-2">
                    {files.map((f, i) => (
                      <div
                        key={`${f.name}-${i}`}
                        className="flex items-center justify-between bg-white dark:bg-dcontent rounded-md p-2 shadow-sm"
                      >
                        <div className="truncate">{f.name}</div>
                        <div className="flex items-center gap-2">
                          <div className="text-xs opacity-70">
                            {fmtSize(f.size)}
                          </div>
                          <button
                            className="text-xs underline"
                            onClick={() => removeFile(i)}
                          >
                            O'chirish
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {uploadPct !== null && (
                  <div className="mt-3">
                    <div className="w-full bg-white-gray rounded h-2 overflow-hidden">
                      <div
                        className="h-full rounded"
                        style={{
                          width: `${uploadPct}%`,
                          background: "#4A7CF1",
                        }}
                      />
                    </div>
                    <div className="text-xs mt-1 opacity-70">
                      Yuklanmoqda: {uploadPct}%
                    </div>
                  </div>
                )}
              </div>

              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                rows={3}
                placeholder="Yozing yoki faylni yuklang..."
                className="w-full rounded-md p-3 mt-4 resize-none border dark:bg-dbody"
                style={{ borderColor: "#2B3149" }}
              />
            </div>
          </div>
        </div>

        {/* Right: Cards */}
        <div className="col-span-12 lg:col-span-5">
          <div className="rounded-2xl shadow-card p-5 bg-white dark:bg-dcontent">
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="font-semibold">Natijalar (Cards)</div>
                <div className="text-xs opacity-80">
                  Backenddan kelgan tahlil natijalari
                </div>
              </div>
              <div className="text-xs text-slate-500">{cards.length} ta</div>
            </div>

            <div className="space-y-3">
              {cards.length === 0 ? (
                <div className="p-4 rounded bg-off-white text-sm opacity-80 dark:text-dvalue">
                  Hozircha natija yo‘q — fayl yoki matn yuboring.
                </div>
              ) : (
                cards.map((c) => (
                  <div
                    key={c.id}
                    className="p-4 bg-white border rounded shadow-sm dark:bg-dcontent"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-sm">{c.title}</h3>
                          <span
                            className={`text-xs px-2 py-0.5 rounded ${statusColor(c.status)}`}
                          >
                            {c.status ?? "unknown"}
                          </span>
                        </div>
                        <div className="text-xs opacity-80 mt-2">
                          {c.summary}
                        </div>
                        {c.tags && (
                          <div className="mt-2 flex flex-wrap gap-2">
                            {c.tags.map((t) => (
                              <span
                                key={t}
                                className="text-xs bg-white-gray px-2 py-0.5 rounded"
                              >
                                {t}
                              </span>
                            ))}
                          </div>
                        )}
                        {c.fileName && (
                          <div className="text-xs mt-2 opacity-70">
                            Fayl: {c.fileName} • {fmtSize(c.fileSize)}
                          </div>
                        )}
                      </div>

                      <div className="flex flex-col items-end gap-2 dark:text-dvalue">
                        <div className="text-xs opacity-70">
                          {c.createdAt
                            ? new Date(c.createdAt).toLocaleString()
                            : ""}
                        </div>
                        <div className="flex items-center gap-2">
                          <a
                            className="text-xs underline"
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              alert("Download demo");
                            }}
                          >
                            Download
                          </a>
                          <button
                            className="text-xs px-2 py-1 rounded border"
                            onClick={() => alert("Preview demo")}
                          >
                            Preview
                          </button>
                        </div>
                        {typeof c.confidence === "number" && (
                          <div className="text-xs opacity-80">
                            Confidence: {c.confidence}%
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="mt-4 text-xs opacity-80 dark:text-dvalue">
              Serverdan kelgan natijalarni shu yerda avtomatik show qilamiz.
              Backenddan kabi strukturani qaytarishni kutamiz.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

