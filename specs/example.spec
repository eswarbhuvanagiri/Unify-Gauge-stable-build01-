# Unify_UAT Testcases

This specification covers user interaction categories from domain creation to bill generation functionalities in unify.

version : 3.8

* Unify quick Login to "http://35.154.247.136/unifyadmin" as 

  |Label |value|
  |---|-------|
  |Username|admin|
  |Password|admin|
  |Domain|admin|
## Unify Login
 This test ascertains that the login page is served whenever the user opens the login page URL. 
* Unify quick Login to "http://35.154.247.136/unifyadmin" as 

  |Label |value|
  |---|-------|
  |Username|admin|
  |Password|admin|
  |Domain|admin|

  ## Domain Creation
  * Add Domain "Demo_TestDomain01" under "Shaildhar Telecom Services Private Limited {SHAILDHAR}"

  ## Unify COA Creation From Master 
* Navigate to COA
* Add COA:"Demo_TestCOA01" under domain:"Demo_TestDomain01"
* COA currency as "Indian Rupee"
* Add FY start date
* Add externalID
 * Add Instruments Types
 * Add decimal accuracy
 * Add RoundOff
 * Add TimeZone
 * Tax jurisdiction
 * Enable FY Enforce and Skip zero value invoice
 * Save COA

 ## Unify Add COA Groups

 * Navigate to COA groups
 * Add "Demo_faizabad" group as Assets
 * Add "Demo_faizabad" group as Expenditure
 * Add "Demo_faizabad" group as Liabilities
 * Add "Demo_faizabad" group as Revenue

 ## Ledger Book Creation 

* navigate to ledgerbook
* Add ledgerbook:"Test_COA_LB01" for "Demo_faizabad"

## Fiscal Year Creation 
* navigate to Fiscal year
* Add Fiscal year"Fy_2020-2021" to "Demo_TestDomain01"
## CSLNo Config
* Navigate to CSL Config
* Add CSLNO config
## CSLNO Config Voucher Type Map List
* Navigate to CSLNO Config Voucher Type Map
* Add CSLNO Config Voucher Type Map for "Demo_faizabad","Demo_faizabad","Faizabad"

## Network ID
 * Navigate to networkID
 * Add NetworkID
## Device Type

 * Navigate to Device Type
 * Add Device Type

 ## Device Type NetworkId Type Map 

* Navigate to Device Type NetworkId Type Map
* Mapping  Device Type NetworkId Type

## FY Control GL Map

* Navigate FY Control GL Map
* Mapping FY Control GL Map coa:"Demo_faizabad" ledger:"Demo_Faizabad_ledger"