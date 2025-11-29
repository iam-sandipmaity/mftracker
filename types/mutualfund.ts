export interface MutualFundSearchResult {
    schemeCode: number;
    schemeName: string;
}

export interface NAVData {
    date: string;
    nav: string;
}

export interface MutualFundScheme {
    meta: {
        fund_house: string;
        scheme_type: string;
        scheme_category: string;
        scheme_code: number;
        scheme_name: string;
        isin_growth: string | null;
        isin_div_reinvestment: string | null;
    };
    data: NAVData[];
    status: string;
}
