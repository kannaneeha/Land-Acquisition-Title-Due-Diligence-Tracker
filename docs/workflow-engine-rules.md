# Workflow Stage Management Engine

## Workflow Stages

1. Parcel Registration
2. Title Search
3. Encumbrance Verification
4. Legal Review
5. Legal Clearance
6. Acquisition Complete

---

## Validation Rules

### Survey Number Validation

- Survey Number is mandatory.
- Survey Number must be unique.
- Survey Number cannot be empty.

### Title Search Status Validation

Allowed Values:

- Pending
- In Progress
- Completed
- Rejected

Rules:

- A parcel cannot move to Encumbrance Verification unless Title Search Status is Completed.
- Rejected parcels are placed On Hold.

### Encumbrance Status Validation

Allowed Values:

- Pending
- Verified
- Issue Found
- Rejected

Rules:

- A parcel cannot move to Legal Review unless Encumbrance Status is Verified.
- Parcels with Issue Found status are moved to Under Investigation.

### Legal Clearance Validation

Allowed Values:

- Initiated
- Legal Review
- Approval Pending
- Approved
- Rejected

Rules:

- Acquisition cannot be completed unless Legal Clearance Stage is Approved.

---

## Workflow Engine Logic

### Parcel Creation

When a new parcel is created:

- Status = Parcel Registration
- Title Search Status = Pending
- Encumbrance Status = Pending

### Parcel Registration

If parcel registration is completed:

- Move to Title Search stage.

### Title Search

If Title Search Status = Completed:

- Move to Encumbrance Verification.

If Title Search Status = Rejected:

- Mark parcel as On Hold.
- Stop workflow.

### Encumbrance Verification

If Encumbrance Status = Verified:

- Move to Legal Review.

If Encumbrance Status = Issue Found:

- Mark parcel as Under Investigation.
- Stop workflow.

### Legal Review

If Legal Review is Approved:

- Move to Legal Clearance.

If Legal Review is Rejected:

- Return parcel for review.
- Stop workflow.

### Legal Clearance

If Legal Clearance Stage = Approved:

- Move to Acquisition Complete.

If Legal Clearance Stage = Rejected:

- Return parcel to Legal Review.

### Acquisition Complete

When all stages are completed:

- Mark parcel status as Completed.
- Close workflow.

---

## Threshold Rules

### Delay Thresholds

| Stage | Threshold |
|---------|------------|
| Title Search | 30 Days |
| Encumbrance Verification | 15 Days |
| Legal Review | 20 Days |
| Legal Clearance | 10 Days |

Rules:

- If a stage exceeds its threshold, mark the parcel as Delayed.
- Delayed parcels should appear in dashboard alerts.

---

## Edge Cases

### Duplicate Survey Number

If a Survey Number already exists:

- Reject record creation.

### Missing Status Information

If any mandatory status field is empty:

- Prevent workflow transition.

### Rejected Title Search

If Title Search Status is Rejected:

- Lock workflow progression.
- Mark parcel as On Hold.

### Encumbrance Issue Found

If Encumbrance Status is Issue Found:

- Mark parcel as Under Investigation.
- Require manual review.

### Audit Logging

For every Create, Update, or Delete operation:

Store:

- Parcel ID
- Survey Number
- Title Search Status
- Encumbrance Status
- Status
- Action Performed
- Timestamp