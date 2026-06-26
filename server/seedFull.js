import 'dotenv/config';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import ActivityLog from './src/models/ActivityLog.js';
import LandRecord from './src/models/LandRecord.js';
import User from './src/models/User.js';

const users = [
  { employeeId: 'ADM001', username: 'admin', password: 'admin123', role: 'ADMIN' },
  { employeeId: 'ADM002', username: 'neeha', password: 'neeha123', role: 'ADMIN' },
  { employeeId: 'OFF001', username: 'officer', password: 'officer123', role: 'OFFICER' },
  { employeeId: 'LEG001', username: 'legal', password: 'legal123', role: 'LEGAL' },
  { employeeId: 'PM001', username: 'pm', password: 'pm123', role: 'PM' },
  { employeeId: 'DIR001', username: 'director', password: 'director123', role: 'DIRECTOR' },
];

const landRecords = [
  {
    surveyNumber: 'SY-42/18',
    parcelId: 'CR-PCL-001',
    location: 'North Industrial Corridor',
    village: 'Madhavaram',
    district: 'Chennai',
    state: 'Tamil Nadu',
    area: 18.4,
    ownerName: 'Ramanathan Estates',
    contactNumber: '9840012345',
    address: '12 Lake View Road, Chennai',
    titleStatus: 'Pending',
    encumbranceStatus: 'Clear',
    legalClearanceStatus: 'In Review',
    remarks: 'Revenue record mutation pending.',
    workflowStage: 2,
    createdAt: new Date('2026-01-12'),
  },
  {
    surveyNumber: 'SY-75/03',
    parcelId: 'CR-PCL-002',
    location: 'Eastern Logistics Zone',
    village: 'Ponneri',
    district: 'Tiruvallur',
    state: 'Tamil Nadu',
    area: 26.7,
    ownerName: 'S. Meenakshi',
    contactNumber: '9876543210',
    address: '44 Market Street, Ponneri',
    titleStatus: 'Verified',
    encumbranceStatus: 'Issue Found',
    legalClearanceStatus: 'Pending',
    remarks: 'Historical mortgage entry requires release deed review.',
    workflowStage: 3,
    createdAt: new Date('2026-02-08'),
  },
  {
    surveyNumber: 'SY-19/11',
    parcelId: 'CR-PCL-003',
    location: 'Greenfield Assembly Cluster',
    village: 'Sriperumbudur',
    district: 'Kanchipuram',
    state: 'Tamil Nadu',
    area: 12.1,
    ownerName: 'Kaveri Agro Holdings',
    contactNumber: '9003123456',
    address: '8 Industrial Estate Road, Sriperumbudur',
    titleStatus: 'Verified',
    encumbranceStatus: 'Clear',
    legalClearanceStatus: 'Cleared',
    remarks: 'Ready for acquisition closure.',
    workflowStage: 6,
    createdAt: new Date('2026-03-19'),
  },
  {
    surveyNumber: 'SY-108/22',
    parcelId: 'CR-PCL-004',
    location: 'Southern Expansion Belt',
    village: 'Oragadam',
    district: 'Kanchipuram',
    state: 'Tamil Nadu',
    area: 31.5,
    ownerName: 'Vetrivel Family Trust',
    contactNumber: '9444412121',
    address: '102 GST Road, Chennai',
    titleStatus: 'Rejected',
    encumbranceStatus: 'Issue Found',
    legalClearanceStatus: 'Blocked',
    remarks: 'Boundary dispute noted in preliminary review.',
    workflowStage: 4,
    createdAt: new Date('2026-04-03'),
  },
  {
    surveyNumber: 'SY-63/09',
    parcelId: 'CR-PCL-005',
    location: 'Western Utility Corridor',
    village: 'Avadi',
    district: 'Tiruvallur',
    state: 'Tamil Nadu',
    area: 9.8,
    ownerName: 'Nila Infrastructure Pvt Ltd',
    contactNumber: '9888899990',
    address: '21 Corporate Avenue, Chennai',
    titleStatus: 'Pending',
    encumbranceStatus: 'Pending',
    legalClearanceStatus: 'Pending',
    remarks: 'Awaiting owner document bundle.',
    workflowStage: 1,
    createdAt: new Date('2026-05-14'),
  },
];

async function seed() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('Connected to MongoDB');

  // Seed users
  const existingUsers = await User.countDocuments();
  if (existingUsers === 0) {
    for (const u of users) {
      const hashed = await bcrypt.hash(u.password, 10);
      await User.create({ ...u, password: hashed, status: 'ACTIVE' });
      console.log(`  User created: ${u.employeeId} (${u.role})`);
    }
  } else {
    console.log(`  Users already seeded (${existingUsers} existing).`);
  }

  // Seed land records
  const existingLands = await LandRecord.countDocuments();
  if (existingLands === 0) {
    const admin = await User.findOne({ employeeId: 'ADM001' });
    const userId = admin?._id || null;
    for (const lr of landRecords) {
      await LandRecord.create({ ...lr, createdBy: userId, updatedBy: userId });
      console.log(`  Land record created: ${lr.surveyNumber}`);
    }
  } else {
    console.log(`  Land records already seeded (${existingLands} existing).`);
  }

  // Seed activity logs
  const existingActivities = await ActivityLog.countDocuments();
  if (existingActivities === 0) {
    const admin = await User.findOne({ employeeId: 'ADM001' });
    const seedActions = [
      { action: 'Parcel Added', role: 'ADMIN' },
      { action: 'Title Verified', role: 'LEGAL' },
      { action: 'Legal Clearance Approved', role: 'LEGAL' },
      { action: 'Encumbrance Issue Escalated', role: 'OFFICER' },
    ];
    for (const a of seedActions) {
      await ActivityLog.create({ userId: admin?._id || null, role: a.role, action: a.action });
      console.log(`  Activity log created: ${a.action}`);
    }
  } else {
    console.log(`  Activity logs already seeded (${existingActivities} existing).`);
  }

  console.log('\nSeed complete!');
  await mongoose.disconnect();
  process.exit(0);
}

seed();
