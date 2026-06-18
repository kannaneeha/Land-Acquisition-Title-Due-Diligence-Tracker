# API Specification

## Base URL

```http
/api
```

---

## 1. Create Land Parcel

### Endpoint

```http
POST /api/land_acquisition_title_due_diligence
```

### Request Body

```json
{
  "survey_number": "SY12345",
  "parcel_name": "Green Acres",
  "owner_name": "Ramesh Kumar",
  "district": "Hyderabad",
  "title_search_status": "Pending",
  "encumbrance_status": "Pending",
  "legal_clearance_stage": "Initiated"
}
```

### Response

```json
{
  "success": true,
  "message": "Land parcel created successfully",
  "parcel_id": 101
}
```

---

## 2. Get All Land Parcels

### Endpoint

```http
GET /api/land_acquisition_title_due_diligence
```

### Response

```json
[
  {
    "parcel_id": 101,
    "survey_number": "SY12345",
    "parcel_name": "Green Acres",
    "owner_name": "Ramesh Kumar",
    "district": "Hyderabad",
    "title_search_status": "Completed",
    "encumbrance_status": "Verified",
    "legal_clearance_stage": "Approved"
  }
]
```

---

## 3. Get Land Parcel By ID

### Endpoint

```http
GET /api/land_acquisition_title_due_diligence/:id
```

### Response

```json
{
  "parcel_id": 101,
  "survey_number": "SY12345",
  "parcel_name": "Green Acres",
  "owner_name": "Ramesh Kumar",
  "district": "Hyderabad",
  "title_search_status": "Completed",
  "encumbrance_status": "Verified",
  "legal_clearance_stage": "Approved"
}
```

---

## 4. Update Land Parcel

### Endpoint

```http
PUT /api/land_acquisition_title_due_diligence/:id
```

### Request Body

```json
{
  "title_search_status": "Completed",
  "encumbrance_status": "Verified",
  "legal_clearance_stage": "Approved"
}
```

### Response

```json
{
  "success": true,
  "message": "Parcel updated successfully"
}
```

---

# Workflow Stage Management Engine APIs

## 5. Get Workflow Status

### Endpoint

```http
GET /api/workflow/:parcel_id
```

### Response

```json
{
  "parcel_id": 101,
  "current_stage": "Title Search",
  "next_stage": "Encumbrance Verification",
  "status": "In Progress"
}
```

---

## 6. Move To Next Workflow Stage

### Endpoint

```http
POST /api/workflow/:parcel_id/next
```

### Request Body

```json
{
  "remarks": "Title verification completed"
}
```

### Response

```json
{
  "success": true,
  "current_stage": "Encumbrance Verification",
  "message": "Workflow advanced successfully"
}
```

---

## 7. Update Workflow Stage

### Endpoint

```http
PUT /api/workflow/:parcel_id/stage
```

### Request Body

```json
{
  "stage": "Legal Review",
  "remarks": "Encumbrance verification completed"
}
```

### Response

```json
{
  "success": true,
  "message": "Workflow stage updated successfully"
}
```

---

## 8. Get Workflow History

### Endpoint

```http
GET /api/workflow/:parcel_id/history
```

### Response

```json
[
  {
    "stage": "Parcel Registration",
    "updated_by": "Land Acquisition Officer",
    "updated_on": "2026-06-01"
  },
  {
    "stage": "Title Search",
    "updated_by": "Legal Officer",
    "updated_on": "2026-06-03"
  }
]
```