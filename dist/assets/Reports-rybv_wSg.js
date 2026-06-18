import{f as e,mt as t,r as n}from"./CardContent-D3ln_i3t.js";import{n as r,t as i}from"./SectionHeader-C4XUARpd.js";import{c as a,u as o}from"./index-DF7AynFJ.js";import{a as s,i as c,n as l,r as u,t as d}from"./KpiCard-jTB29o1K.js";import{n as f}from"./storage-YFWncYbM.js";var p=t(),m=e((0,p.jsx)(`path`,{d:`M5 20h14v-2H5zM19 9h-4V3H9v6H5l7 7z`}),`Download`),h=e((0,p.jsx)(`path`,{d:`M20 2H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2m-8.5 7.5c0 .83-.67 1.5-1.5 1.5H9v2H7.5V7H10c.83 0 1.5.67 1.5 1.5zm5 2c0 .83-.67 1.5-1.5 1.5h-2.5V7H15c.83 0 1.5.67 1.5 1.5zm4-3H19v1h1.5V11H19v2h-1.5V7h3zM9 9.5h1v-1H9zM4 6H2v14c0 1.1.9 2 2 2h14v-2H4zm10 5.5h1v-3h-1z`}),`PictureAsPdf`),g=e((0,p.jsx)(`path`,{d:`M10 10.02h5V21h-5zM17 21h3c1.1 0 2-.9 2-2v-9h-5zm3-18H5c-1.1 0-2 .9-2 2v3h19V5c0-1.1-.9-2-2-2M3 19c0 1.1.9 2 2 2h3V10H3z`}),`TableChart`);function _(e){return String(e??``).replaceAll(`&`,`&amp;`).replaceAll(`<`,`&lt;`).replaceAll(`>`,`&gt;`).replaceAll(`"`,`&quot;`).replaceAll(`'`,`&#039;`)}function v(e,t=`land-records.xls`){let n=[`Survey Number`,`Parcel ID`,`Owner`,`Location`,`Village`,`District`,`State`,`Area`,`Title Status`,`Encumbrance Status`,`Legal Clearance`,`Remarks`],r=e.map(e=>[e.surveyNumber,e.parcelId,e.ownerName,e.location,e.village,e.district,e.state,e.area,e.titleStatus,e.encumbranceStatus,e.legalClearanceStatus,e.remarks]),i=`
    <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel">
      <head><meta charset="UTF-8"></head>
      <body>${`
    <table>
      <thead><tr>${n.map(e=>`<th>${_(e)}</th>`).join(``)}</tr></thead>
      <tbody>
        ${r.map(e=>`<tr>${e.map(e=>`<td>${_(e)}</td>`).join(``)}</tr>`).join(``)}
      </tbody>
    </table>
  `}</body>
    </html>
  `,a=new Blob([i],{type:`application/vnd.ms-excel;charset=utf-8;`}),o=document.createElement(`a`);o.href=URL.createObjectURL(a),o.download=t.replace(/\.xlsx$/i,`.xls`),o.click(),URL.revokeObjectURL(o.href)}function y({title:e,metrics:t,records:n}){let r=window.open(``,`_blank`,`noopener,noreferrer,width=900,height=700`);if(!r)return;let i=t.map(e=>`<div><strong>${e.label}</strong><span>${e.value}</span></div>`).join(``),a=n.map(e=>`
      <tr>
        <td>${e.surveyNumber}</td>
        <td>${e.ownerName}</td>
        <td>${e.location}</td>
        <td>${e.area}</td>
        <td>${e.legalClearanceStatus}</td>
      </tr>
    `).join(``);r.document.write(`
    <!doctype html>
    <html>
      <head>
        <title>${e}</title>
        <style>
          body { font-family: Arial, sans-serif; color: #14213d; margin: 32px; }
          h1 { font-size: 22px; margin-bottom: 6px; }
          .muted { color: #5f6b7a; margin-bottom: 24px; }
          .metrics { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; margin-bottom: 24px; }
          .metrics div { border: 1px solid #d8e2ee; padding: 12px; border-radius: 8px; }
          .metrics strong { display: block; color: #5f6b7a; font-size: 12px; margin-bottom: 6px; }
          .metrics span { font-weight: 700; font-size: 18px; }
          table { width: 100%; border-collapse: collapse; }
          th, td { border: 1px solid #d8e2ee; padding: 8px; font-size: 12px; text-align: left; }
          th { background: #f4f7fb; }
        </style>
      </head>
      <body>
        <h1>${e}</h1>
        <div class="muted">Generated: ${new Date().toLocaleString()}</div>
        <section class="metrics">${i}</section>
        <table>
          <thead>
            <tr><th>Survey Number</th><th>Owner</th><th>Location</th><th>Area</th><th>Legal Clearance</th></tr>
          </thead>
          <tbody>${a}</tbody>
        </table>
        <script>window.print();<\/script>
      </body>
    </html>
  `),r.document.close()}function b(e,t){return e.reduce((e,n)=>(e[n[t]]=(e[n[t]]||0)+1,e),{})}function x(){let e=f(),t=e.filter(e=>[`Pending`,`In Review`,`Blocked`].includes(e.legalClearanceStatus)).length,_=e.filter(e=>e.workflowStage===6).length,x=e.reduce((e,t)=>e+Number(t.area),0).toFixed(1),S=Object.entries(b(e,`legalClearanceStatus`)).map(([e,t])=>({label:e,value:t})),C=Object.entries(b(e,`titleStatus`)).map(([e,t])=>({label:e,value:t})),w=[`Jan`,`Feb`,`Mar`,`Apr`,`May`,`Jun`].map((t,n)=>({label:t,value:e.filter(e=>new Date(e.createdAt).getMonth()===n).length})),T=e.map(e=>({label:e.village,value:Math.round(e.workflowStage/6*100)})),E=[{label:`Total parcels`,value:e.length},{label:`Total area`,value:`${x} acres`},{label:`Acquisition completed`,value:_},{label:`Pending cases`,value:t}];return(0,p.jsxs)(n,{children:[(0,p.jsx)(i,{title:`Reports & Analytics`,subtitle:`Executive analytics for acquisition progress, land status, legal clearance, and pending cases.`,action:(0,p.jsxs)(a,{direction:`row`,spacing:1,children:[(0,p.jsx)(o,{startIcon:(0,p.jsx)(h,{}),variant:`outlined`,onClick:()=>y({title:`Crownridge LLP Due Diligence Report`,metrics:E,records:e}),children:`Export PDF`}),(0,p.jsx)(o,{startIcon:(0,p.jsx)(g,{}),variant:`contained`,onClick:()=>v(e),children:`Export Excel`})]})}),(0,p.jsxs)(r,{container:!0,spacing:2.5,children:[(0,p.jsx)(r,{item:!0,xs:12,sm:6,lg:3,children:(0,p.jsx)(d,{title:`Acquisition Progress`,value:`${Math.round(_/Math.max(e.length,1)*100)}%`,helper:`${_} completed parcels`,icon:(0,p.jsx)(m,{}),progress:_/Math.max(e.length,1)*100})}),(0,p.jsx)(r,{item:!0,xs:12,sm:6,lg:3,children:(0,p.jsx)(d,{title:`Total Area`,value:x,helper:`Acres under diligence`,icon:(0,p.jsx)(g,{}),progress:90})}),(0,p.jsx)(r,{item:!0,xs:12,sm:6,lg:3,children:(0,p.jsx)(d,{title:`Pending Cases`,value:t,helper:`Awaiting clearance or review`,icon:(0,p.jsx)(h,{}),color:`warning.main`,progress:t/Math.max(e.length,1)*100})}),(0,p.jsx)(r,{item:!0,xs:12,sm:6,lg:3,children:(0,p.jsx)(d,{title:`Legal Clearances`,value:S.find(e=>e.label===`Cleared`)?.value||0,helper:`Cleared for closure`,icon:(0,p.jsx)(g,{}),color:`success.main`,progress:70})}),(0,p.jsx)(r,{item:!0,xs:12,lg:5,children:(0,p.jsx)(u,{title:`Legal Clearance Statistics`,children:(0,p.jsx)(s,{data:S})})}),(0,p.jsx)(r,{item:!0,xs:12,lg:7,children:(0,p.jsx)(u,{title:`Monthly Acquisitions`,children:(0,p.jsx)(c,{data:w})})}),(0,p.jsx)(r,{item:!0,xs:12,lg:6,children:(0,p.jsx)(u,{title:`Acquisition Progress by Village`,children:(0,p.jsx)(l,{data:T})})}),(0,p.jsx)(r,{item:!0,xs:12,lg:6,children:(0,p.jsx)(u,{title:`Land Status Distribution`,children:(0,p.jsx)(s,{data:C})})})]})]})}export{x as default};