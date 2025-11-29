import Papa from 'papaparse';
import { createWorker } from 'tesseract.js';
import { ParsedSIP, SIP } from '@/types/portfolio';
import { categorizeFund, getRiskForCategory } from './categories';

export async function parseCSV(file: File): Promise<ParsedSIP[]> {
    return new Promise((resolve, reject) => {
        Papa.parse(file, {
            header: true,
            skipEmptyLines: true,
            complete: (results) => {
                try {
                    const sips: ParsedSIP[] = results.data.map((row: any, index: number) => {
                        const fundName = row.fund_name || row.Fund || row['Fund Name'] || '';
                        const amount = parseFloat(row.amount || row.Amount || row.SIP || row['SIP Amount'] || '0');
                        const category = row.category || row.Category || categorizeFund(fundName);

                        return {
                            id: `csv-${index}`,
                            fund_name: fundName,
                            amount: amount,
                            category: category,
                            amc: row.amc || row.AMC || undefined,
                            folio_id: row.folio_id || row['Folio ID'] || undefined,
                            start_date: row.start_date || row['Start Date'] || undefined,
                            nav: row.nav ? parseFloat(row.nav) : undefined,
                            aum: row.aum ? parseFloat(row.aum) : undefined,
                            expense_ratio: row.expense_ratio ? parseFloat(row.expense_ratio) : undefined,
                            confidence: 1.0,
                            notes: '',
                        };
                    });

                    resolve(sips.filter(s => s.fund_name && s.amount > 0));
                } catch (error) {
                    reject(new Error('Failed to parse CSV: ' + (error as Error).message));
                }
            },
            error: (error) => {
                reject(new Error('CSV parsing error: ' + error.message));
            }
        });
    });
}

export async function parseJSON(file: File): Promise<ParsedSIP[]> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = (e) => {
            try {
                const content = e.target?.result as string;
                const data = JSON.parse(content);

                // Handle both array and object with sips array
                const sipsArray = Array.isArray(data) ? data : (data.sips || []);

                const sips: ParsedSIP[] = sipsArray.map((item: any, index: number) => {
                    const fundName = item.fund_name || item.name || '';
                    const category = item.category || categorizeFund(fundName);

                    return {
                        id: item.id || `json-${index}`,
                        fund_name: fundName,
                        amount: parseFloat(item.amount || item.sip_amount || '0'),
                        category: category,
                        amc: item.amc,
                        folio_id: item.folio_id,
                        start_date: item.start_date,
                        nav: item.nav,
                        aum: item.aum,
                        expense_ratio: item.expense_ratio,
                        confidence: 1.0,
                        notes: '',
                    };
                });

                resolve(sips.filter(s => s.fund_name && s.amount > 0));
            } catch (error) {
                reject(new Error('Failed to parse JSON: ' + (error as Error).message));
            }
        };

        reader.onerror = () => reject(new Error('Failed to read file'));
        reader.readAsText(file);
    });
}

export async function parseOCR(imageFile: File): Promise<ParsedSIP[]> {
    try {
        const worker = await createWorker('eng');

        const imageUrl = URL.createObjectURL(imageFile);
        const { data: { text, confidence } } = await worker.recognize(imageUrl);

        await worker.terminate();
        URL.revokeObjectURL(imageUrl);

        // Parse the OCR text
        const sips = extractSIPData(text, confidence / 100);

        return sips;
    } catch (error) {
        throw new Error('OCR processing failed: ' + (error as Error).message);
    }
}

export function extractSIPData(text: string, overallConfidence: number): ParsedSIP[] {
    const sips: ParsedSIP[] = [];
    const lines = text.split('\n').filter(line => line.trim().length > 0);

    // Patterns to match fund names and amounts
    const amountPattern = /₹?\s*(\d+(?:,\d+)*(?:\.\d+)?)/;

    let currentFund: Partial<ParsedSIP> = {};

    lines.forEach((line, index) => {
        const trimmedLine = line.trim();

        // Try to extract amount
        const amountMatch = trimmedLine.match(amountPattern);

        // If line contains common fund keywords, it's likely a fund name
        const isFundName = /fund|cap|index|etf|sip|mutual|equity|debt|hybrid/i.test(trimmedLine);

        if (isFundName && trimmedLine.length > 10) {
            // Start new fund entry
            if (currentFund.fund_name && currentFund.amount) {
                sips.push(currentFund as ParsedSIP);
            }

            currentFund = {
                id: `ocr-${index}`,
                fund_name: trimmedLine.replace(amountPattern, '').trim(),
                category: '',
                confidence: overallConfidence,
                notes: overallConfidence < 0.85 ? 'Low OCR confidence - please verify' : '',
            };

            // Check if amount is on the same line
            if (amountMatch) {
                currentFund.amount = parseFloat(amountMatch[1].replace(/,/g, ''));
            }
        } else if (amountMatch && !currentFund.amount) {
            // Amount on separate line
            currentFund.amount = parseFloat(amountMatch[1].replace(/,/g, ''));
        }
    });

    // Add last fund
    if (currentFund.fund_name && currentFund.amount) {
        sips.push(currentFund as ParsedSIP);
    }

    // Categorize all funds
    return sips.map(sip => ({
        ...sip,
        category: sip.category || categorizeFund(sip.fund_name),
    }));
}

export function convertParsedToSIP(parsed: ParsedSIP[]): SIP[] {
    return parsed.map(p => ({
        ...p,
        risk: getRiskForCategory(p.category),
    }));
}
