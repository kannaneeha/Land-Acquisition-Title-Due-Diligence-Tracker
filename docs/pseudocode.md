# Workflow Stage Management Engine - Business Rules (Pseudocode)

## Workflow Stages

```text
1. Parcel Registration
2. Title Search
3. Encumbrance Verification
4. Legal Review
5. Legal Clearance
6. Acquisition Complete
```

---

## Business Rules

```text
START

WHEN a new land parcel is created
    SET current_stage = "Parcel Registration"
    SET title_search_status = "Pending"
    SET encumbrance_status = "Pending"
    SET legal_clearance_stage = "Initiated"

IF parcel registration is completed THEN
    MOVE current_stage TO "Title Search"

IF title_search_status = "Completed" THEN
    MOVE current_stage TO "Encumbrance Verification"

ELSE IF title_search_status = "Rejected" THEN
    SET parcel_status = "On Hold"
    STOP workflow

IF encumbrance_status = "Verified" THEN
    MOVE current_stage TO "Legal Review"

ELSE IF encumbrance_status = "Issue Found" THEN
    SET parcel_status = "Under Investigation"
    STOP workflow

IF legal_review_result = "Approved" THEN
    MOVE current_stage TO "Legal Clearance"

ELSE IF legal_review_result = "Rejected" THEN
    RETURN parcel TO Legal Officer
    STOP workflow

IF legal_clearance_stage = "Approved" THEN
    MOVE current_stage TO "Acquisition Complete"

ELSE IF legal_clearance_stage = "Rejected" THEN
    RETURN current_stage TO "Legal Review"

IF current_stage = "Acquisition Complete" THEN
    SET parcel_status = "Completed"
    CLOSE workflow

END
```

---

## Validation Rules

```text
RULE 1:
A parcel cannot move to Encumbrance Verification
until Title Search Status = Completed.

RULE 2:
A parcel cannot move to Legal Review
until Encumbrance Status = Verified.

RULE 3:
A parcel cannot move to Acquisition Complete
until Legal Clearance Stage = Approved.

RULE 4:
Rejected parcels must be reviewed before
re-entering the workflow.

RULE 5:
Every workflow transition must be logged with:
    - Parcel ID
    - Previous Stage
    - New Stage
    - Updated By
    - Updated Date & Time
```