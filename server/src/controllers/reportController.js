import ActivityLog from '../models/ActivityLog.js';
import LandRecord from '../models/LandRecord.js';
import User from '../models/User.js';

export const getSummary = async (_req, res) => {
  try {
    const records = await LandRecord.find();
    const users = await User.find();
    const activities = await ActivityLog.find().sort({ timestamp: -1 }).limit(50);

    const total = records.length;
    const acquired = records.filter((r) => r.workflowStage === 6).length;
    const totalArea = records.reduce((sum, r) => sum + (r.area || 0), 0);
    const pendingCases = records.filter(
      (r) => r.legalClearanceStatus === 'Pending' || r.legalClearanceStatus === 'In Review' || r.legalClearanceStatus === 'Blocked',
    ).length;
    const pendingTitle = records.filter((r) => r.titleStatus === 'Pending').length;
    const completedLegal = records.filter((r) => r.legalClearanceStatus === 'Cleared').length;
    const encumbranceIssues = records.filter((r) => r.encumbranceStatus === 'Issue Found').length;
    const completion = total > 0 ? Math.round((completedLegal / total) * 100) : 0;

    res.status(200).json({
      total,
      acquired,
      totalArea: totalArea.toFixed(1),
      pendingCases,
      pendingTitle,
      completedLegal,
      encumbranceIssues,
      completion,
      totalUsers: users.length,
      totalActivities: activities.length,
    });
  } catch (error) {
    res.status(500).json({ message: error.message || 'Failed to fetch summary.' });
  }
};

export const getAnalytics = async (_req, res) => {
  try {
    const records = await LandRecord.find();

    const legalData = {};
    const titleData = {};
    const monthlyData = { Jan: 0, Feb: 0, Mar: 0, Apr: 0, May: 0, Jun: 0, Jul: 0, Aug: 0, Sep: 0, Oct: 0, Nov: 0, Dec: 0 };

    records.forEach((r) => {
      legalData[r.legalClearanceStatus] = (legalData[r.legalClearanceStatus] || 0) + 1;
      titleData[r.titleStatus] = (titleData[r.titleStatus] || 0) + 1;

      if (r.createdAt) {
        const month = new Date(r.createdAt).toLocaleString('en-US', { month: 'short' });
        if (monthlyData[month] !== undefined) monthlyData[month]++;
      }
    });

    const areaByVillage = {};
    records.forEach((r) => {
      const key = r.village || r.location;
      areaByVillage[key] = (areaByVillage[key] || 0) + (r.area || 0);
    });

    const progressByVillage = {};
    records.forEach((r) => {
      const key = r.village || r.location;
      progressByVillage[key] = Math.round(((r.workflowStage || 1) / 6) * 100);
    });

    res.status(200).json({
      legalStatus: Object.entries(legalData).map(([label, value]) => ({ label, value })),
      titleStatus: Object.entries(titleData).map(([label, value]) => ({ label, value })),
      monthly: Object.entries(monthlyData)
        .filter(([, v]) => v > 0)
        .map(([label, value]) => ({ label, value })),
      areaByVillage: Object.entries(areaByVillage).map(([label, value]) => ({ label, value: Number(value.toFixed(1)) })),
      progressByVillage: Object.entries(progressByVillage).map(([label, value]) => ({ label, value })),
    });
  } catch (error) {
    res.status(500).json({ message: error.message || 'Failed to fetch analytics.' });
  }
};

export const exportPdf = async (_req, res) => {
  try {
    const records = await LandRecord.find().sort({ createdAt: -1 }).limit(200);
    const html = records
      .map(
        (r) =>
          `<tr><td>${r.surveyNumber}</td><td>${r.ownerName}</td><td>${r.location}</td><td>${r.area}</td><td>${r.legalClearanceStatus}</td></tr>`,
      )
      .join('');

    const document = `
      <html>
        <head><meta charset="UTF-8"><title>Due Diligence Report</title></head>
        <body>
          <h1>Due Diligence Report</h1>
          <table border="1" cellpadding="6">
            <thead><tr><th>Survey#</th><th>Owner</th><th>Location</th><th>Area</th><th>Status</th></tr></thead>
            <tbody>${html}</tbody>
          </table>
        </body>
      </html>
    `;
    res.contentType('text/html');
    res.send(document);
  } catch (error) {
    res.status(500).json({ message: error.message || 'Failed to export report.' });
  }
};

export const exportExcel = async (_req, res) => {
  try {
    const records = await LandRecord.find().sort({ createdAt: -1 }).limit(200);
    const headings = ['Survey Number', 'Parcel ID', 'Owner', 'Location', 'Village', 'District', 'State', 'Area', 'Title Status', 'Encumbrance', 'Legal Clearance', 'Remarks'];
    const rows = records.map((r) =>
      [r.surveyNumber, r.parcelId, r.ownerName, r.location, r.village, r.district, r.state, r.area, r.titleStatus, r.encumbranceStatus, r.legalClearanceStatus, r.remarks]
        .map((v) => `<td>${String(v ?? '')}</td>`)
        .join(''),
    );

    const html = `
      <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel">
        <head><meta charset="UTF-8"></head>
        <body>
          <table>
            <thead><tr>${headings.map((h) => `<th>${h}</th>`).join('')}</tr></thead>
            <tbody>${rows.map((r) => `<tr>${r}</tr>`).join('')}</tbody>
          </table>
        </body>
      </html>
    `;
    res.setHeader('Content-Type', 'application/vnd.ms-excel;charset=utf-8');
    res.setHeader('Content-Disposition', 'attachment; filename=land-records.xls');
    res.send(html);
  } catch (error) {
    res.status(500).json({ message: error.message || 'Failed to export excel.' });
  }
};
