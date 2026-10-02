export interface BankInfo {
  id: string;
  name: string;
  code: string;
  shortName: string;
  category: "Public" | "Private" | "Small Finance" | "Payments" | "Foreign";
  logoColor: string;
  upiHandle: string;
}

export interface UpiAppInfo {
  id: string;
  name: string;
  code: string;
  defaultHandle: string;
  logoBg: string;
  textColor: string;
  iconSymbol: string;
}

export const ALL_INDIAN_BANKS: BankInfo[] = [
  { id: "sbi", name: "State Bank of India", code: "SBIN", shortName: "SBI", category: "Public", logoColor: "#0066b3", upiHandle: "sbi" },
  { id: "hdfc", name: "HDFC Bank", code: "HDFC", shortName: "HDFC", category: "Private", logoColor: "#004c8f", upiHandle: "hdfcbank" },
  { id: "icici", name: "ICICI Bank", code: "ICIC", shortName: "ICICI", category: "Private", logoColor: "#f37021", upiHandle: "icici" },
  { id: "axis", name: "Axis Bank", code: "UTIB", shortName: "Axis", category: "Private", logoColor: "#97144d", upiHandle: "axisbank" },
  { id: "pnb", name: "Punjab National Bank", code: "PUNB", shortName: "PNB", category: "Public", logoColor: "#a21942", upiHandle: "pnb" },
  { id: "bob", name: "Bank of Baroda", code: "BARB", shortName: "BoB", category: "Public", logoColor: "#f26522", upiHandle: "barodampay" },
  { id: "kotak", name: "Kotak Mahindra Bank", code: "KKBK", shortName: "Kotak", category: "Private", logoColor: "#ed1c24", upiHandle: "kotak" },
  { id: "canara", name: "Canara Bank", code: "CNRB", shortName: "Canara", category: "Public", logoColor: "#0091da", upiHandle: "canrabank" },
  { id: "union", name: "Union Bank of India", code: "UBIN", shortName: "Union", category: "Public", logoColor: "#00539b", upiHandle: "unionbank" },
  { id: "indusind", name: "IndusInd Bank", code: "INDB", shortName: "IndusInd", category: "Private", logoColor: "#84131a", upiHandle: "indus" },
  { id: "yesbank", name: "Yes Bank", code: "YESB", shortName: "Yes Bank", category: "Private", logoColor: "#005a9c", upiHandle: "yesbank" },
  { id: "idbi", name: "IDBI Bank", code: "IBKL", shortName: "IDBI", category: "Public", logoColor: "#006837", upiHandle: "idbi" },
  { id: "iob", name: "Indian Overseas Bank", code: "IOBA", shortName: "IOB", category: "Public", logoColor: "#00529c", upiHandle: "iob" },
  { id: "uco", name: "UCO Bank", code: "UCBA", shortName: "UCO", category: "Public", logoColor: "#0055a5", upiHandle: "uco" },
  { id: "centralbank", name: "Central Bank of India", code: "CBIN", shortName: "Central Bank", category: "Public", logoColor: "#1d3a77", upiHandle: "centralbank" },
  { id: "indianbank", name: "Indian Bank", code: "IDIB", shortName: "Indian Bank", category: "Public", logoColor: "#0062a8", upiHandle: "indianbank" },
  { id: "psb", name: "Punjab & Sind Bank", code: "PSIB", shortName: "P&S Bank", category: "Public", logoColor: "#e31837", upiHandle: "psb" },
  { id: "bom", name: "Bank of Maharashtra", code: "MAHB", shortName: "BoM", category: "Public", logoColor: "#00569e", upiHandle: "mahb" },
  { id: "federal", name: "Federal Bank", code: "FDRL", shortName: "Federal", category: "Private", logoColor: "#004b87", upiHandle: "federal" },
  { id: "idfcfirst", name: "IDFC FIRST Bank", code: "IDFB", shortName: "IDFC FIRST", category: "Private", logoColor: "#9e1b32", upiHandle: "idfcbank" },
  { id: "southindian", name: "South Indian Bank", code: "SIBL", shortName: "SIB", category: "Private", logoColor: "#003366", upiHandle: "sib" },
  { id: "kvb", name: "Karur Vysya Bank", code: "KVBL", shortName: "KVB", category: "Private", logoColor: "#00833e", upiHandle: "kvb" },
  { id: "bandhan", name: "Bandhan Bank", code: "BDBL", shortName: "Bandhan", category: "Private", logoColor: "#a3238e", upiHandle: "bandhan" },
  { id: "rbl", name: "RBL Bank", code: "RATN", shortName: "RBL", category: "Private", logoColor: "#003366", upiHandle: "rbl" },
  { id: "jkb", name: "Jammu & Kashmir Bank", code: "JAKA", shortName: "J&K Bank", category: "Private", logoColor: "#005fa3", upiHandle: "jkb" },
  { id: "dhanlaxmi", name: "Dhanlaxmi Bank", code: "DLXB", shortName: "Dhanlaxmi", category: "Private", logoColor: "#d2232a", upiHandle: "dhanbank" },
  { id: "karnataka", name: "Karnataka Bank", code: "KARB", shortName: "Karnataka", category: "Private", logoColor: "#1a3b70", upiHandle: "karnatakabank" },
  { id: "cub", name: "City Union Bank", code: "CIUB", shortName: "CUB", category: "Private", logoColor: "#004792", upiHandle: "cub" },
  { id: "au", name: "AU Small Finance Bank", code: "AUBL", shortName: "AU SFB", category: "Small Finance", logoColor: "#f37021", upiHandle: "aubank" },
  { id: "equitas", name: "Equitas Small Finance Bank", code: "EQSF", shortName: "Equitas SFB", category: "Small Finance", logoColor: "#004883", upiHandle: "equitas" },
  { id: "ujjivan", name: "Ujjivan Small Finance Bank", code: "UJVN", shortName: "Ujjivan SFB", category: "Small Finance", logoColor: "#f7941d", upiHandle: "ujjivan" },
  { id: "jana", name: "Jana Small Finance Bank", code: "JSFB", shortName: "Jana SFB", category: "Small Finance", logoColor: "#00a79d", upiHandle: "janabank" },
  { id: "suryoday", name: "Suryoday Small Finance Bank", code: "SSFB", shortName: "Suryoday", category: "Small Finance", logoColor: "#f58220", upiHandle: "suryoday" },
  { id: "capital", name: "Capital Small Finance Bank", code: "CLBL", shortName: "Capital SFB", category: "Small Finance", logoColor: "#005494", upiHandle: "capital" },
  { id: "paytm_bank", name: "Paytm Payments Bank", code: "PYTM", shortName: "Paytm Bank", category: "Payments", logoColor: "#002e6e", upiHandle: "paytm" },
  { id: "airtel_bank", name: "Airtel Payments Bank", code: "AIRP", shortName: "Airtel Bank", category: "Payments", logoColor: "#e40000", upiHandle: "airtel" },
  { id: "ippb", name: "India Post Payments Bank", code: "IPPB", shortName: "IPPB", category: "Payments", logoColor: "#da251d", upiHandle: "postbank" },
  { id: "fino", name: "Fino Payments Bank", code: "FINO", shortName: "Fino Bank", category: "Payments", logoColor: "#003b70", upiHandle: "finobank" },
  { id: "jio_bank", name: "Jio Payments Bank", code: "JIOP", shortName: "Jio Bank", category: "Payments", logoColor: "#0a2540", upiHandle: "jio" },
  { id: "dbs", name: "DBS Bank India", code: "DBSS", shortName: "DBS", category: "Foreign", logoColor: "#e31837", upiHandle: "dbs" },
  { id: "hsbc", name: "HSBC Bank India", code: "HSBC", shortName: "HSBC", category: "Foreign", logoColor: "#db0011", upiHandle: "hsbc" },
  { id: "stanchart", name: "Standard Chartered Bank", code: "SCBL", shortName: "StanChart", category: "Foreign", logoColor: "#00a859", upiHandle: "scb" },
  { id: "citi", name: "Citibank India", code: "CITI", shortName: "Citi", category: "Foreign", logoColor: "#003b70", upiHandle: "citi" },
  { id: "deutsche", name: "Deutsche Bank India", code: "DEUT", shortName: "Deutsche", category: "Foreign", logoColor: "#0018a8", upiHandle: "db" },
  { id: "csb", name: "CSB Bank", code: "CSBK", shortName: "CSB", category: "Private", logoColor: "#c8102e", upiHandle: "csb" },
  { id: "tmb", name: "Tamilnad Mercantile Bank", code: "TMBL", shortName: "TMB", category: "Private", logoColor: "#005494", upiHandle: "tmb" },
  { id: "nainital", name: "Nainital Bank", code: "NTBL", shortName: "Nainital", category: "Private", logoColor: "#006633", upiHandle: "nainital" },
  { id: "dcb", name: "DCB Bank", code: "DCBL", shortName: "DCB", category: "Private", logoColor: "#004a80", upiHandle: "dcb" },
  { id: "sbm", name: "SBM Bank India", code: "STCB", shortName: "SBM", category: "Foreign", logoColor: "#00833e", upiHandle: "sbm" },
  { id: "barclays", name: "Barclays Bank India", code: "BARC", shortName: "Barclays", category: "Foreign", logoColor: "#00aeef", upiHandle: "barclays" }
];

export const ALL_UPI_APPS: UpiAppInfo[] = [
  { id: "gpay", name: "Google Pay", code: "GPAY", defaultHandle: "okaxis", logoBg: "#ffffff", textColor: "#4285F4", iconSymbol: "G" },
  { id: "phonepe", name: "PhonePe", code: "PHONEPE", defaultHandle: "ybl", logoBg: "#5f259f", textColor: "#ffffff", iconSymbol: "P" },
  { id: "paytm", name: "Paytm UPI", code: "PAYTM", defaultHandle: "paytm", logoBg: "#002e6e", textColor: "#00baf2", iconSymbol: "Paytm" },
  { id: "bhim", name: "BHIM UPI", code: "BHIM", defaultHandle: "upi", logoBg: "#00529c", textColor: "#f7931e", iconSymbol: "BHIM" },
  { id: "cred", name: "CRED Pay", code: "CRED", defaultHandle: "cred", logoBg: "#000000", textColor: "#ffffff", iconSymbol: "C" },
  { id: "amazonpay", name: "Amazon Pay", code: "AMAZONPAY", defaultHandle: "apl", logoBg: "#232f3e", textColor: "#ff9900", iconSymbol: "Amzn" },
  { id: "whatsapp", name: "WhatsApp Pay", code: "WHATSAPP", defaultHandle: "waaxis", logoBg: "#25d366", textColor: "#ffffff", iconSymbol: "WA" },
  { id: "navi", name: "Navi UPI", code: "NAVI", defaultHandle: "navi", logoBg: "#0047ff", textColor: "#ffffff", iconSymbol: "N" },
  { id: "slice", name: "Slice UPI", code: "SLICE", defaultHandle: "slice", logoBg: "#8000ff", textColor: "#ffffff", iconSymbol: "S" },
  { id: "jupiter", name: "Jupiter Money", code: "JUPITER", defaultHandle: "jupiteraxis", logoBg: "#ff5252", textColor: "#ffffff", iconSymbol: "J" },
  { id: "fi", name: "Fi Money UPI", code: "FI", defaultHandle: "federal", logoBg: "#00d09c", textColor: "#000000", iconSymbol: "Fi" },
  { id: "mobikwik", name: "MobiKwik", code: "MOBIKWIK", defaultHandle: "ikwik", logoBg: "#0072bc", textColor: "#ffffff", iconSymbol: "M" },
  { id: "freecharge", name: "Freecharge UPI", code: "FREECHARGE", defaultHandle: "freecharge", logoBg: "#f26522", textColor: "#ffffff", iconSymbol: "FC" },
  { id: "bajajpay", name: "Bajaj Pay", code: "BAJAJPAY", defaultHandle: "bajaj", logoBg: "#00539b", textColor: "#ffffff", iconSymbol: "B" },
  { id: "imobile", name: "iMobile by ICICI", code: "IMOBILE", defaultHandle: "icici", logoBg: "#f37021", textColor: "#ffffff", iconSymbol: "i" },
  { id: "yono", name: "YONO SBI", code: "YONO", defaultHandle: "sbi", logoBg: "#0066b3", textColor: "#ffffff", iconSymbol: "Y" },
  { id: "kotak811", name: "Kotak 811 UPI", code: "KOTAK811", defaultHandle: "kotak", logoBg: "#ed1c24", textColor: "#ffffff", iconSymbol: "811" },
  { id: "payzapp", name: "PayZapp by HDFC", code: "PAYZAPP", defaultHandle: "hdfcbank", logoBg: "#004c8f", textColor: "#ffffff", iconSymbol: "PZ" },
  { id: "barodampay", name: "Baroda mPay", code: "BARODAMPAY", defaultHandle: "barodampay", logoBg: "#f26522", textColor: "#ffffff", iconSymbol: "mP" },
  { id: "unionvyapar", name: "Union Vyapar", code: "UNIONVYAPAR", defaultHandle: "unionbank", logoBg: "#00539b", textColor: "#ffffff", iconSymbol: "UV" },
  { id: "indoasis", name: "IndOASIS Indian Bank", code: "INDOASIS", defaultHandle: "indianbank", logoBg: "#0062a8", textColor: "#ffffff", iconSymbol: "Ind" },
  { id: "postinfo", name: "IPPB Mobile Banking", code: "POSTINFO", defaultHandle: "postbank", logoBg: "#da251d", textColor: "#ffffff", iconSymbol: "IPPB" },
  { id: "supermoney", name: "Super.money", code: "SUPERMONEY", defaultHandle: "super", logoBg: "#ff007f", textColor: "#ffffff", iconSymbol: "S." },
  { id: "tataneu", name: "Tata Neu Pay", code: "TATANEU", defaultHandle: "tataneu", logoBg: "#4a154b", textColor: "#ffffff", iconSymbol: "Neu" },
  { id: "canaraai1", name: "Canara ai1", code: "CANARAAI1", defaultHandle: "canrabank", logoBg: "#0091da", textColor: "#ffffff", iconSymbol: "ai1" },
  { id: "pnbone", name: "PNB ONE", code: "PNBONE", defaultHandle: "pnb", logoBg: "#a21942", textColor: "#ffffff", iconSymbol: "P1" },
  { id: "mahamobile", name: "MahaMobile BoM", code: "MAHAMOBILE", defaultHandle: "mahb", logoBg: "#00569e", textColor: "#ffffff", iconSymbol: "MM" },
  { id: "fedmobile", name: "FedMobile Federal", code: "FEDMOBILE", defaultHandle: "federal", logoBg: "#004b87", textColor: "#ffffff", iconSymbol: "FM" },
  { id: "idfcfirstmob", name: "IDFC FIRST Mobile", code: "IDFCFIRSTMOB", defaultHandle: "idfcbank", logoBg: "#9e1b32", textColor: "#ffffff", iconSymbol: "1st" },
  { id: "ausome", name: "Ausome AU SFB", code: "AUSOME", defaultHandle: "aubank", logoBg: "#f37021", textColor: "#ffffff", iconSymbol: "AU" },
  { id: "rblmobank", name: "RBL MoBank", code: "RBLMOBANK", defaultHandle: "rbl", logoBg: "#003366", textColor: "#ffffff", iconSymbol: "Mo" },
  { id: "bandhanmbank", name: "Bandhan mBank", code: "BANDHANMBANK", defaultHandle: "bandhan", logoBg: "#a3238e", textColor: "#ffffff", iconSymbol: "mB" },
  { id: "indusmobile", name: "IndusMobile", code: "INDUSMOBILE", defaultHandle: "indus", logoBg: "#84131a", textColor: "#ffffff", iconSymbol: "IM" },
  { id: "axismobile", name: "Axis Mobile", code: "AXISMOBILE", defaultHandle: "axisbank", logoBg: "#97144d", textColor: "#ffffff", iconSymbol: "AM" },
  { id: "yesmobile", name: "Yes Mobile", code: "YESMOBILE", defaultHandle: "yesbank", logoBg: "#005a9c", textColor: "#ffffff", iconSymbol: "YM" },
  { id: "sibmirror", name: "SIB Mirror+", code: "SIBMIRROR", defaultHandle: "sib", logoBg: "#003366", textColor: "#ffffff", iconSymbol: "M+" },
  { id: "kvbdlite", name: "KVB DLite", code: "KVBDLITE", defaultHandle: "kvb", logoBg: "#00833e", textColor: "#ffffff", iconSymbol: "DL" },
  { id: "cubmbank", name: "CUB mBank", code: "CUBMBANK", defaultHandle: "cub", logoBg: "#004792", textColor: "#ffffff", iconSymbol: "CU" },
  { id: "dhansmart", name: "DhanSmart", code: "DHANSMART", defaultHandle: "dhanbank", logoBg: "#d2232a", textColor: "#ffffff", iconSymbol: "DS" },
  { id: "kblmobile", name: "KBL Mobile Plus", code: "KBLMOBILE", defaultHandle: "karnatakabank", logoBg: "#1a3b70", textColor: "#ffffff", iconSymbol: "KBL" },
  { id: "tmbmobile", name: "TMB Mobile", code: "TMBMOBILE", defaultHandle: "tmb", logoBg: "#005494", textColor: "#ffffff", iconSymbol: "TMB" },
  { id: "ucombanking", name: "UCO mBanking Plus", code: "UCOMBANKING", defaultHandle: "uco", logoBg: "#0055a5", textColor: "#ffffff", iconSymbol: "UCO" },
  { id: "centralmobile", name: "Central Mobile", code: "CENTRALMOBILE", defaultHandle: "centralbank", logoBg: "#1d3a77", textColor: "#ffffff", iconSymbol: "CM" },
  { id: "pnbmpassbook", name: "PNB mPassbook", code: "PNBMPASSBOOK", defaultHandle: "pnb", logoBg: "#a21942", textColor: "#ffffff", iconSymbol: "mP" },
  { id: "abhyudaya", name: "Abhyudaya Bank UPI", code: "ABHYUDAYA", defaultHandle: "abhyudaya", logoBg: "#00509d", textColor: "#ffffff", iconSymbol: "AB" },
  { id: "saraswat", name: "Saraswat Bank UPI", code: "SARASWAT", defaultHandle: "saraswat", logoBg: "#b30000", textColor: "#ffffff", iconSymbol: "SB" },
  { id: "cosmos", name: "Cosmos Bank UPI", code: "COSMOS", defaultHandle: "cosmos", logoBg: "#004080", textColor: "#ffffff", iconSymbol: "CB" },
  { id: "svc", name: "SVC Bank UPI", code: "SVC", defaultHandle: "svc", logoBg: "#006600", textColor: "#ffffff", iconSymbol: "SVC" },
  { id: "nkgsb", name: "NKGSB Bank UPI", code: "NKGSB", defaultHandle: "nkgsb", logoBg: "#800000", textColor: "#ffffff", iconSymbol: "NK" },
  { id: "tjsb", name: "TJSB Bank UPI", code: "TJSB", defaultHandle: "tjsb", logoBg: "#002b49", textColor: "#ffffff", iconSymbol: "TJ" }
];
