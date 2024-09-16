document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM fully loaded and parsed");

  if (!sessionStorage.getItem('oldRegime') && !sessionStorage.getItem('newRegime')) {
    function storeDataInSessionStorage() {
      const oldRegime = {
        "ITR": {
          "ITR1": {
            "CreationInfo": {
              "SWVersionNo": "24.1.0",
              "SWCreatedBy": "SW20000026",
              "JSONCreatedBy": "SW20000026",
              "JSONCreationDate": "",
              "IntermediaryCity": "JAIPUR",
              "Digest": "JdfGW3quO9VVa6O5qSNCOBV4eqG6Hc70ZBtZO3Tnnnc="
            },
            "Form_ITR1": {
              "FormName": "ITR-1",
              "Description": "For Indls having Income from Salary, Pension, family pension and Interest",
              "AssessmentYear": "",
              "SchemaVer": "Ver1.0",
              "FormVer": "Ver1.0"
            },
            "PersonalInfo": {
              "AssesseeName": {
                "FirstName": "",
                "MiddleName": "",
                "SurNameOrOrgName": ""
              },
              "PAN": "",
              "Address": {
                "ResidenceNo": "",
                "LocalityOrArea": "",
                "CityOrTownOrDistrict": "Gurgaon",
                "StateCode": "",
                "CountryCode": "91",
                "PinCode": '',
                "CountryCodeMobile": 91,
                "MobileNo": '',
                "EmailAddress": ""
              },
              "DOB": "",
              "EmployerCategory": "OTH",
              "AadhaarCardNo": ""
            },
            "FilingStatus": {
              "ReturnFileSec": 11,
              "SeventhProvisio139": "N",
              "NewTaxRegime": "N"
            },
            "ITR1_IncomeDeductions": {
              "GrossSalary": 0,
              "Salary": 0,
              "PerquisitesValue": 0,
              "ProfitsInSalary": 0,
              "AllwncExemptUs10": {
                "TotalAllwncExemptUs10": 0
              },
              "NetSalary": 0,
              "DeductionUs16": 50000,
              "DeductionUs16ia": 50000,
              "EntertainmentAlw16ii": 0,
              "ProfessionalTaxUs16iii": 0,
              "IncomeFromSal": 532163,
              "GrossRentReceived": 0,
              "TaxPaidlocalAuth": 0,
              "AnnualValue": 0,
              "StandardDeduction": 0,
              "InterestPayable": 0,
              "ArrearsUnrealizedRentRcvd": 0,
              "TotalIncomeOfHP": 0,
              "IncomeOthSrc": 487,
              "OthersInc": {
                "OthersIncDtlsOthSrc": [
                  {
                    "OthSrcNatureDesc": "SAV",
                    "OthSrcOthNatOfInc": "Interest from Saving Account",
                    "OthSrcOthAmount": 487
                  }
                ]
              },
              "DeductionUs57iia": 0,
              "GrossTotIncome": 532650,
              "UsrDeductUndChapVIA": {
                "Section80C": 67325,
                "Section80CCC": 0,
                "Section80CCDEmployeeOrSE": 0,
                "Section80CCD1B": 0,
                "Section80CCDEmployer": 0,
                "Section80D": 0,
                "Section80DD": 0,
                "Section80DDB": 0,
                "Section80E": 0,
                "Section80EE": 0,
                "Section80EEA": 0,
                "Section80EEB": 0,
                "Section80G": 0,
                "Section80GG": 0,
                "Section80GGA": 0,
                "Section80GGC": 0,
                "Section80U": 0,
                "Section80TTA": 487,
                "Section80TTB": 0,
                "TotalChapVIADeductions": 67812,
                "AnyOthSec80CCH": 0
              },
              "DeductUndChapVIA": {
                "Section80C": 67325,
                "Section80CCC": 0,
                "Section80CCDEmployeeOrSE": 0,
                "Section80CCD1B": 0,
                "Section80CCDEmployer": 0,
                "Section80D": 0,
                "Section80DD": 0,
                "Section80DDB": 0,
                "Section80E": 0,
                "Section80EE": 0,
                "Section80EEA": 0,
                "Section80EEB": 0,
                "Section80G": 0,
                "Section80GG": 0,
                "Section80GGA": 0,
                "Section80GGC": 0,
                "Section80U": 0,
                "Section80TTA": 487,
                "Section80TTB": 0,
                "TotalChapVIADeductions": 67812,
                "AnyOthSec80CCH": 0
              },
              "TotalIncome": 464840,
              "ExemptIncAgriOthUs10": {
                "ExemptIncAgriOthUs10Total": 0
              },
              "IncomeNotified89A": 0,
              "IncomeNotifiedOther89A": 0,
              "Increliefus89A": 0,
              "Increliefus89AOS": 0
            },
            "ITR1_TaxComputation": {
              "TotalTaxPayable": 10742,
              "Rebate87A": 10742,
              "TaxPayableOnRebate": 0,
              "EducationCess": 0,
              "GrossTaxLiability": 0,
              "Section89": 0,
              "NetTaxLiability": 0,
              "TotalIntrstPay": 0,
              "IntrstPay": {
                "IntrstPayUs234A": 0,
                "IntrstPayUs234B": 0,
                "IntrstPayUs234C": 0,
                "LateFilingFee234F": 0
              },
              "TotTaxPlusIntrstPay": 0
            },
            "TaxPaid": {
              "TaxesPaid": {
                "AdvanceTax": 0,
                "TDS": 25000,
                "TCS": 0,
                "SelfAssessmentTax": 0,
                "TotalTaxesPaid": 25000
              },
              "BalTaxPayable": 0
            },
            "Refund": {
              "RefundDue": 25000,
              "BankAccountDtls": {
                "AddtnlBankDetails": [
                  {
                    "IFSCCode": "KKBK0000298",
                    "BankName": "KOTAK MAHINDRA BANK LIMITED",
                    "BankAccountNo": "684010020794",
                    "UseForRefund": "true"
                  }
                ]
              }
            },
            "Schedule80G": {
              "TotalDonationsUs80GCash": 0,
              "TotalDonationsUs80GOtherMode": 0,
              "TotalDonationsUs80G": 0,
              "TotalEligibleDonationsUs80G": 0
            },
            "Schedule80D": {
              "Sec80DSelfFamSrCtznHealth": {
                "SeniorCitizenFlag": "S",
                "SelfAndFamily": 0,
                "HealthInsPremSlfFam": 0,
                "MediclaimPolNoSelfAndFam": 0,
                "SeniorCitizenHealthFlag": 0,
                "MedicalExpSeniorCitizenSelfAndFamily": 0,
                "Total80DSelfAndFamily": 0,
                "ParentsSeniorCitizenFlag": "S",
                "Parents": 0,
                "HealthInsPremParents": 0,
                "MediclaimPolNoParents": 0,
                "MedicalExpSeniorCitizenParents": 0,
                "Total80DParents": 0
              },
              "Total80D": 0
            }
          }
        }
      };

      const newRegime = {
        "ITR": {
          "ITR1": {
            "CreationInfo": {
              "SWVersionNo": "24.1.0",
              "SWCreatedBy": "SW20000026",
              "JSONCreatedBy": "SW20000026",
              "JSONCreationDate": "2024-06-04",
              "IntermediaryCity": "JAIPUR",
              "Digest": "JdfGW3quO9VVa6O5qSNCOBV4eqG6Hc70ZBtZO3Tnnnc="
            },
            "Form_ITR1": {
              "FormName": "ITR-1",
              "Description": "For Indls having Income from Salary, Pension, family pension and Interest",
              "AssessmentYear": "2023",
              "SchemaVer": "Ver1.0",
              "FormVer": "Ver1.0"
            },
            "PersonalInfo": {
              "AssesseeName": {
                "FirstName": "AARTI",
                "MiddleName": "",
                "SurNameOrOrgName": "MANN"
              },
              "PAN": "BSYPM5387H",
              "Address": {
                "ResidenceNo": "CIA016, 1 Floor DLF Cartlon Estate",
                "LocalityOrArea": "DLF City, Phase V",
                "CityOrTownOrDistrict": "Gurgaon",
                "StateCode": "12",
                "CountryCode": "91",
                "PinCode": 122002,
                "CountryCodeMobile": 91,
                "MobileNo": 9560761234,
                "EmailAddress": "vikas.mann@live.com"
              },
              "DOB": "1979-01-17",
              "EmployerCategory": "OTH",
              "AadhaarCardNo": "386359211816"
            },
            "FilingStatus": {
              "ReturnFileSec": 11,
              "SeventhProvisio139": "N",
              "NewTaxRegime": "N"
            },
            "ITR1_IncomeDeductions": {
              "GrossSalary": 582163,
              "Salary": 582163,
              "PerquisitesValue": 0,
              "ProfitsInSalary": 0,
              "AllwncExemptUs10": {
                "TotalAllwncExemptUs10": 0
              },
              "NetSalary": 582163,
              "DeductionUs16": 50000,
              "DeductionUs16ia": 50000,
              "EntertainmentAlw16ii": 0,
              "ProfessionalTaxUs16iii": 0,
              "IncomeFromSal": 532163,
              "GrossRentReceived": 0,
              "TaxPaidlocalAuth": 0,
              "AnnualValue": 0,
              "StandardDeduction": 0,
              "InterestPayable": 0,
              "ArrearsUnrealizedRentRcvd": 0,
              "TotalIncomeOfHP": 0,
              "IncomeOthSrc": 487,
              "OthersInc": {
                "OthersIncDtlsOthSrc": [
                  {
                    "OthSrcNatureDesc": "SAV",
                    "OthSrcOthNatOfInc": "Interest from Saving Account",
                    "OthSrcOthAmount": 487
                  }
                ]
              },
              "DeductionUs57iia": 0,
              "GrossTotIncome": 532650,
              "UsrDeductUndChapVIA": {
                "Section80C": 67325,
                "Section80CCC": 0,
                "Section80CCDEmployeeOrSE": 0,
                "Section80CCD1B": 0,
                "Section80CCDEmployer": 0,
                "Section80D": 0,
                "Section80DD": 0,
                "Section80DDB": 0,
                "Section80E": 0,
                "Section80EE": 0,
                "Section80EEA": 0,
                "Section80EEB": 0,
                "Section80G": 0,
                "Section80GG": 0,
                "Section80GGA": 0,
                "Section80GGC": 0,
                "Section80U": 0,
                "Section80TTA": 487,
                "Section80TTB": 0,
                "TotalChapVIADeductions": 67812,
                "AnyOthSec80CCH": 0
              },
              "DeductUndChapVIA": {
                "Section80C": 67325,
                "Section80CCC": 0,
                "Section80CCDEmployeeOrSE": 0,
                "Section80CCD1B": 0,
                "Section80CCDEmployer": 0,
                "Section80D": 0,
                "Section80DD": 0,
                "Section80DDB": 0,
                "Section80E": 0,
                "Section80EE": 0,
                "Section80EEA": 0,
                "Section80EEB": 0,
                "Section80G": 0,
                "Section80GG": 0,
                "Section80GGA": 0,
                "Section80GGC": 0,
                "Section80U": 0,
                "Section80TTA": 487,
                "Section80TTB": 0,
                "TotalChapVIADeductions": 67812,
                "AnyOthSec80CCH": 0
              },
              "TotalIncome": 464840,
              "ExemptIncAgriOthUs10": {
                "ExemptIncAgriOthUs10Total": 0
              },
              "IncomeNotified89A": 0,
              "IncomeNotifiedOther89A": 0,
              "Increliefus89A": 0,
              "Increliefus89AOS": 0
            },
            "ITR1_TaxComputation": {
              "TotalTaxPayable": 10742,
              "Rebate87A": 10742,
              "TaxPayableOnRebate": 0,
              "EducationCess": 0,
              "GrossTaxLiability": 0,
              "Section89": 0,
              "NetTaxLiability": 0,
              "TotalIntrstPay": 0,
              "IntrstPay": {
                "IntrstPayUs234A": 0,
                "IntrstPayUs234B": 0,
                "IntrstPayUs234C": 0,
                "LateFilingFee234F": 0
              },
              "TotTaxPlusIntrstPay": 0
            },
            "TaxPaid": {
              "TaxesPaid": {
                "AdvanceTax": 0,
                "TDS": 25000,
                "TCS": 0,
                "SelfAssessmentTax": 0,
                "TotalTaxesPaid": 25000
              },
              "BalTaxPayable": 0
            },
            "Refund": {
              "RefundDue": 25000,
              "BankAccountDtls": {
                "AddtnlBankDetails": [
                  {
                    "IFSCCode": "KKBK0000298",
                    "BankName": "KOTAK MAHINDRA BANK LIMITED",
                    "BankAccountNo": "684010020794",
                    "UseForRefund": "true"
                  }
                ]
              }
            },
            "Schedule80G": {
              "TotalDonationsUs80GCash": 0,
              "TotalDonationsUs80GOtherMode": 0,
              "TotalDonationsUs80G": 0,
              "TotalEligibleDonationsUs80G": 0
            },
            "Schedule80D": {
              "Sec80DSelfFamSrCtznHealth": {
                "SeniorCitizenFlag": "S",
                "SelfAndFamily": 0,
                "HealthInsPremSlfFam": 0,
                "MediclaimPolNoSelfAndFam": 0,
                "SeniorCitizenHealthFlag": 0,
                "MedicalExpSeniorCitizenSelfAndFamily": 0,
                "Total80DSelfAndFamily": 0,
                "ParentsSeniorCitizenFlag": "S",
                "Parents": 0,
                "HealthInsPremParents": 0,
                "MediclaimPolNoParents": 0,
                "MedicalExpSeniorCitizenParents": 0,
                "Total80DParents": 0
              },
              "Total80D": 0
            }
          }
        }
      };

      sessionStorage.setItem('oldRegime', JSON.stringify(oldRegime));
      sessionStorage.setItem('newRegime', JSON.stringify(newRegime));
      console.log('Data stored in sessionStorage');
    }

    storeDataInSessionStorage();
    console.log(sessionStorage.getItem('oldRegime'));
    console.log("there is some error in code");
  }
});