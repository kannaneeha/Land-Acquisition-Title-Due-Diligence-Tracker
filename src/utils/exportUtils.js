function escapeHtml(value) {
  return String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

export function exportRecordsToExcel(records, filename = 'land-records.xls') {
  const headers = [
    'Survey Number',
    'Parcel ID',
    'Owner',
    'Location',
    'Village',
    'District',
    'State',
    'Area',
    'Title Status',
    'Encumbrance Status',
    'Legal Clearance',
    'Remarks',
  ];
  const rows = records.map((record) => [
    record.surveyNumber,
    record.parcelId,
    record.ownerName,
    record.location,
    record.village,
    record.district,
    record.state,
    record.area,
    record.titleStatus,
    record.encumbranceStatus,
    record.legalClearanceStatus,
    record.remarks,
  ]);
  const table = `
    <table>
      <thead><tr>${headers.map((header) => `<th>${escapeHtml(header)}</th>`).join('')}</tr></thead>
      <tbody>
        ${rows.map((row) => `<tr>${row.map((cell) => `<td>${escapeHtml(cell)}</td>`).join('')}</tr>`).join('')}
      </tbody>
    </table>
  `;
  const workbookHtml = `
    <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel">
      <head><meta charset="UTF-8"></head>
      <body>${table}</body>
    </html>
  `;
  const blob = new Blob([workbookHtml], { type: 'application/vnd.ms-excel;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = filename.replace(/\.xlsx$/i, '.xls');
  link.click();
  URL.revokeObjectURL(link.href);
}

export function exportReportToPdf({ title, metrics, records }) {
  const reportWindow = window.open('', '_blank', 'noopener,noreferrer,width=900,height=700');
  if (!reportWindow) return;

  const metricMarkup = metrics.map((metric) => `<div><strong>${metric.label}</strong><span>${metric.value}</span></div>`).join('');
  const rows = records
    .map((record) => `
      <tr>
        <td>${record.surveyNumber}</td>
        <td>${record.ownerName}</td>
        <td>${record.location}</td>
        <td>${record.area}</td>
        <td>${record.legalClearanceStatus}</td>
      </tr>
    `)
    .join('');

  reportWindow.document.write(`
    <!doctype html>
    <html>
      <head>
        <title>${title}</title>
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
        <h1>${title}</h1>
        <div class="muted">Generated: ${new Date().toLocaleString()}</div>
        <section class="metrics">${metricMarkup}</section>
        <table>
          <thead>
            <tr><th>Survey Number</th><th>Owner</th><th>Location</th><th>Area</th><th>Legal Clearance</th></tr>
          </thead>
          <tbody>${rows}</tbody>
        </table>
        <script>window.print();</script>
      </body>
    </html>
  `);
  reportWindow.document.close();
}
