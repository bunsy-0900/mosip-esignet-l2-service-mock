# MOSIP Esignet L2 Service - MOCK

## Sample Responses

<details>
  <summary>Sample KYC Provider List - <strong>/identity-verification/initiate</strong></summary>

  ### http://localhost:8088/v1/signup/identity-verification/initiate

  ```json
  {
  "responseTime": "2022-09-22T08:03:50.287Z",
  "response": {
    "identityVerifiers": [
      {
        "id": "Kyc_Provider_1",
        "logoUrl": "https://avatars.githubusercontent.com/u/39733477?s=200&v=4",
        "displayName": {
          "eng": "Veridonia",
          "khm": "Mock អត្តសញ្ញាណប័ណ្ណ Verifier",
          "@none": "Default Kyc Provider 1"
        },
        "active": true,
        "processType": "VIDEO",
        "retryOnFailure": true,
        "resumeOnSuccess": true
      },
      {
        "id": "Kyc_Provider_2",
        "logoUrl": "https://avatars.githubusercontent.com/u/39733477?s=200&v=4",
        "displayName": {
          "eng": "Eldoria",
          "khm": "សត្វល្ងង់",
          "@none": "Default Kyc Provider 2"
        },
        "active": true,
        "processType": "VIDEO",
        "retryOnFailure": true,
        "resumeOnSuccess": true
      },
      {
        "id": "Kyc_Provider_3",
        "logoUrl": "https://avatars.githubusercontent.com/u/39733477?s=200&v=4",
        "displayName": {
          "eng": "Aadhar",
          "khm": "ម្តាយគោរព",
          "@none": "Default Kyc Provider 3"
        },
        "active": true,
        "processType": "VIDEO",
        "retryOnFailure": true,
        "resumeOnSuccess": true
      },
      {
        "id": "Kyc_Provider_4",
        "logoUrl": "https://avatars.githubusercontent.com/u/39733477?s=200&v=4",
        "displayName": {
          "eng": "Income Tax",
          "khm": "អណ្តាតនៃហោប៉ៅ",
          "@none": "Default Kyc Provider 4"
        },
        "active": true,
        "processType": "VIDEO",
        "retryOnFailure": true,
        "resumeOnSuccess": true
      },
      {
        "id": "mock-identity-verifier",
        "displayName": {
          "eng": "Mock Identity Verifier",
          "fra": "Vérificateur d'identité fictif",
          "ara": "التحقق من الهوية الوهمية",
          "khm": "Mock អត្តសញ្ញាណប័ណ្ណ Verifier"
        },
        "logoUrl": "https://avatars.githubusercontent.com/u/39733477?s=200&v=4",
        "processType": "VIDEO",
        "active": true,
        "retryOnFailure": true,
        "retryAttempt": 2
      },
      {
        "id": "kyc-provider",
        "displayName": {
          "eng": "Kyc Provider",
          "fra": "Vérificateur d'identité fictif",
          "ara": "التحقق من الهوية الوهمية",
          "khm": "អ្នកផ្គត់ផ្គង់ Kyc"
        },
        "logoUrl": "https://avatars.githubusercontent.com/u/39733477?s=200&v=4",
        "processType": "VIDEO",
        "active": true,
        "retryOnFailure": true,
        "retryAttempt": 2
      },
      {
        "id": "identity-verifier",
        "displayName": {
          "eng": "Identity Verifier",
          "fra": "Vérificateur d'identité fictif",
          "ara": "التحقق من الهوية الوهمية",
          "khm": "អត្តសញ្ញាណប័ណ្ណ Verifier"
        },
        "logoUrl": "https://avatars.githubusercontent.com/u/39733477?s=200&v=4",
        "processType": "VIDEO",
        "active": true,
        "retryOnFailure": true,
        "retryAttempt": 2
      },
      {
        "id": "mock-kyc-provider",
        "displayName": {
          "eng": "Mock Kyc Provider",
          "fra": "Vérificateur d'identité fictif",
          "ara": "التحقق من الهوية الوهمية",
          "khm": "អ្នកផ្តល់សេវា Mock Kyc"
        },
        "logoUrl": "https://avatars.githubusercontent.com/u/39733477?s=200&v=4",
        "processType": "VIDEO",
        "active": true,
        "retryOnFailure": true,
        "retryAttempt": 2
      },
      {
        "id": "identity-company-limited",
        "displayName": {
          "eng": "Identity Company Limited",
          "fra": "Vérificateur d'identité fictif",
          "ara": "التحقق من الهوية الوهمية",
          "khm": "ក្រុមហ៊ុន Identity Limited"
        },
        "logoUrl": "https://avatars.githubusercontent.com/u/39733477?s=200&v=4",
        "processType": "VIDEO",
        "active": true,
        "retryOnFailure": true,
        "retryAttempt": 2
      },
      {
        "id": "veridonia-identity-verifier",
        "displayName": {
          "eng": "Veridonia Identity Verifier",
          "fra": "Vérificateur d'identité fictif",
          "ara": "التحقق من الهوية الوهمية",
          "khm": "Veridonia អត្តសញ្ញាណប័ណ្ណ Verifier"
        },
        "logoUrl": "https://avatars.githubusercontent.com/u/39733477?s=200&v=4",
        "processType": "VIDEO",
        "active": true,
        "retryOnFailure": true,
        "retryAttempt": 2
      }
    ]
  },
  "errors": null
}

  ```
</details>
