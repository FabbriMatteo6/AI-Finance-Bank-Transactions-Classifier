
export const BATCH_SIZE = 100;

export const CATEGORIES = {

  // ------INFLOW-----------
    "Patient Revenue": {
        "POS Payments": "Direct payments from patients via credit or debit cards at the point of sale.",
        "Patient Bank Transfers": "Direct bank transfers from patients for services rendered.",
        "Patient Financing": "Payments received from third-party financing companies on behalf of patients.",
        "Cheque Deposits": "Revenue collected via paper cheques deposited into the account.",
    },
    "Owner & Intercompany Transfers": {
        "Owner's Capital Injection / Loan": "Direct capital contributions or loans from the owner to the business.",
        "Internal Account Transfer": "Transfers between the owner's various personal and business accounts, representing internal cash management.",
        "Inter-entity Transfers": "Transfers from other related legal entities (e.g., the SRL) for reimbursements or cash consolidation.",
      },
    "Non-Operating Income & Refunds": {
        "Supplier & Service Refunds": "Refunds or reversals from suppliers, labs, or service providers.",
        "Utility & Government Credits": "Credits or payments from utility providers or government agencies.",
        "Insurance Payouts": "Payments received from insurance companies for claims.",
        "Bank Related Income": "Interest earned on account balances or refunds of bank fees.",
         "Investment Income": "Income generated from financial investments, such as dividends.",
            "Erroneous Transactions / Reversals": "Inflows that correct a previous erroneous payment made by the company."
    },
    "To Be Excluded": {
        "Accounting Entries": "Entries made by the bank for reporting purposes, such as the opening balance.",
    }
    

    // ---------OUTFLOW-------------
    // "Business Operating Expenses": {
    //     "Rent": "Recurring payments for the clinic's physical office space.",
    //     "Utilities": "Essential services like electricity, gas, water, internet, and phone bills (e.g., IREN, Gas Sales, FASTWEB).",
    //     "Dental & Medical Suppliers": "Payments for materials, tools, and equipment used in dental treatments (e.g., Nobel Biocare, Orthodental Center).",
    //     "Professional Fees & Collaborators": "Payments to external specialists, consultants, or collaborating doctors.",
    //     "Salaries & Staffing": "Regular salary payments to employees ('EMOLUMENTI'), staffing agencies, or severance pay (TFR).",
    //     "Training & Association Fees": "Costs for professional development, courses, and membership fees for professional bodies (e.g., ANDI).",
    //     "Insurance": "Premiums for professional liability, property, or other business-related insurance (e.g., ORIS BROKER).",
    //     "Legal & Accounting": "Fees paid to lawyers, accountants, or financial consultants.",
    //     "Marketing & Advertising": "Costs related to promoting the clinic's services."
    // },
    // "Financial Costs": {
    //     "Bank Fees": "Charges from the bank for account maintenance, wire transfers, stamp duty ('IMPOSTA DI BOLLO'), commissions.",
    //     "Payment Processing Fees": "Fees for processing credit/debit card transactions from services like NEXI or Banca Sella."
    // },
    // "Taxes & Social Security": {
    //     "Taxes (F24)": "Payments to the tax authority ('Agenzia Entrate') via F24 forms.",
    //     "Pension Contributions (ENPAM)": "Mandatory social security and pension contributions for medical professionals."
    // },
    // "Personal & Non-Business": {
    //     "Owner's Withdrawals": "Direct transfers to the owner's personal accounts, cash withdrawals, or transactions labeled 'PRELEVAMENTO TITOLARE'.",
    //     "Personal Vehicle": "Expenses for a personal car: purchase, insurance, fuel, repairs, and auto club fees.",
    //     "Personal Financing / Loans": "Repayments for personal loans or financing (e.g., COFIDIS).",
    //     "Donations": "Charitable contributions (e.g., EMERGENCY LIFE SUPPORT)."
    // },
    // "Other": {
    //     "Intercompany Transactions": "Transfers of funds between the owner's related legal entities that are not for a standard service like rent.",
    //     "Needs Review": "Use this category ONLY if the transaction does not clearly fit into any other category or if essential information is missing."
    // }
    // "Operating Expenses (OPEX)": {
    //     "Employee Salaries & Bonuses": "Gross salaries, bonuses, and 13th/14th-month payments for employed staff (e.g., payments to Piras Francesca, Puratic Nehaj, Bianchi Marianna).",
    //     "Fees to Associate Dentists/Hygienists": "Payments to independent professional collaborators who are not on the payroll (e.g., payments to Amadasi Chiara, Dr. Lanfranco Davide).",
    //     "Payroll Taxes & Social Security": "The portion of 'Delega I24' payments attributable to social security and taxes on employee wages.",
    //     "General Dental Supplies": "Materials and consumables from broadline suppliers (e.g., Dentsply Sirona, Astidental, Grossi Dental Trade, Golmar Italia).",
    //     "Specialized Materials (Implants/Ortho)": "Specific materials for high-value procedures (e.g., Invisalign, Zimmer Dental, Nobel Biocare, Megagen).",
    //     "External Lab Fees": "Costs for crowns, bridges, prosthetics, and orthodontic appliances made by third-party labs (e.g., Mr Laboratorio Odontotecnico, Orthodental Center, Laboratorio Pozzi).",
    //     "Rent": "Payments made to 'Faberim Srl' for the clinic space. This should be noted as a related-party transaction.",
    //     "Utilities": "Electricity, gas, and water (e.g., Sorgenia, Iren).",
    //     "Condominium & Building Fees": "Payments for the upkeep of the shared building areas (e.g., Condominio le Tre Dame).",
    //     "Maintenance & Repairs": "Minor repairs and upkeep (e.g., purchases from Bricoman, payments to Busani Impianti).",
    //     "Professional & Legal Fees": "Accounting, consulting, and legal services (e.g., La Contabile Spa, Franchi Mauro).",
    //     "Insurance": "Professional liability and other business insurance policies (e.g., Oris Broker, Aimuw Spa).",
    //     "IT, Software & Telecommunications": "Practice management software, IT support, phone, and internet (e.g., Micromatica, Fastweb, Iliad, Chatgpt subscriptions).",
    //     "Office Supplies": "Stationery and other general office materials (e.g., Mondoffice).",
    //     "POS & Payment Processing": "Fees for handling credit/debit card transactions (e.g., Nexi Payments).",
    //     "Other Administrative": "Miscellaneous costs like the business TV license ('Rai - Abbonamenti Speciali').",
    //     "Training & Continuing Education": "Courses and memberships for professional development (e.g., Ekis S.r.l., Didafactory Srl)."
    // },
    // "Non-Operating, Financial & Non-Recurring Items": {
    //     "Bank Fees": "Monthly account fees, transaction commissions, and card fees.",
    //     "Bank-related Taxes": "Stamp duties on the bank account and investment portfolio ('Imposta di Bollo').",
    //     "Lease Payments": "Regular payments for leased equipment (e.g., BNP Paribas). In a formal analysis, this is often split between interest (below EBITDA) and principal.",
    //     "Purchase of Financial Assets": "All payments for subscriptions to investment funds ('Sottoscrizione: Sic,' 'Rata Pac'). These are applications of cash, not expenses.",
    //     "Purchase of Dental & Office Equipment (CAPEX)": "One-off purchases of long-term assets (e.g., payments to Fordent for Primescan, Dental Service for Autoclave).",
    //     "Corporate Taxes": "The portion of 'Delega I24' payments for corporate income taxes (IRES/IRAP).",
    //     "VAT Payments": "The net VAT paid to the tax authority, also part of 'Delega I24.'"
    // },
    // "Owner-Related & Inter-company Transactions (For Normalization)": {
    //     "Management & Director's Fees": "The large payments to 'Fabbri Paolo Ditta' for directorial duties. The key task is to replace this amount with a fair market salary for a qualified professional manager/dentist.",
    //     "Shareholder Loans & Advances": "All transactions labeled 'Finanziamento Soci Infruttifero' or 'Anticipo a Socio.' These are financing activities, not operational expenses.",
    //     "Expense Reimbursements": "Payments for 'Rimborsi Chilometrici e Trasferte' (Mileage/Travel) and 'Rimborso Welfare.' The business nature of these expenses must be verified.",
    //     "Items to Verify (Potentially Personal)": "All payments made to retailers with no clear business purpose (e.g., supermarkets, pharmacies, consumer electronics stores, travel websites, Temu) should be flagged and discussed with the seller. Unless a clear business purpose is established, these should be added back to profit."
    // }
}