// const requestor = require('../../Utils/requestor')
import { Jwt } from "jsonwebtoken"

requestor(
  JSON.stringify({
        "requestedId": "requestingPatientsList",
        "filter": {},
        "projection": {
          "_id": 0
        }
      }),
      'POST',
      'http://localhost:5000/api/manager/get-patient-details'
)
