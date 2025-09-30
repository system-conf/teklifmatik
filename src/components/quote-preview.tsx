"use client";

import type { QuoteFormData } from '@/lib/schema';

interface QuotePreviewProps {
  watchedData: QuoteFormData;
}

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' }).format(amount);

export default function QuotePreview({ watchedData }: QuotePreviewProps) {
  const {
    logoUrl,
    companyName,
    companyAddress,
    companyPhone,
    companyEmail,
    billToName,
    billToAddress,
    quoteDate,
    quoteId,
    serviceItems,
    includeVat,
    vatRate,
  } = watchedData;

  const subtotal = serviceItems?.reduce((sum, item) => sum + (Number(item.quantity) || 0) * (Number(item.unitPrice) || 0), 0) || 0;
  const vatAmount = includeVat ? subtotal * (Number(vatRate) / 100) : 0;
  const total = subtotal + vatAmount;

  return (
    <div className="bg-white text-black p-4 sm:p-8 font-sans text-sm border border-gray-300">
       <header className="flex justify-between items-center mb-4 pb-4 border-b border-gray-300">
        <div className="flex items-center gap-4">
          {logoUrl && <img src={logoUrl} alt="Company Logo" className="w-32 sm:w-40 h-auto" />}
          <div>
            <p className="text-xs text-gray-600">{companyAddress}</p>
            <p className="text-xs text-gray-600">Telefon: {companyPhone}</p>
            <p className="text-xs text-gray-600">E-posta: {companyEmail}</p>
          </div>
        </div>
      </header>

      <div className="text-center mb-8">
        <h1 className="text-lg sm:text-2xl font-bold uppercase">Müşteri Teklif ve Sipariş Formu</h1>
      </div>


      <section className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8 pb-4 border-b border-gray-300 text-xs">
         <div className="border border-gray-300">
            <div className="flex">
                <div className="p-1 border-r border-gray-300 font-semibold bg-gray-100 w-24 sm:w-32">MÜŞTERİ ADI</div>
                <div className="p-1 flex-1">{billToName}</div>
            </div>
             <div className="flex border-t border-gray-300">
                <div className="p-1 border-r border-gray-300 font-semibold bg-gray-100 w-24 sm:w-32">ADRES</div>
                <div className="p-1 flex-1">{billToAddress}</div>
            </div>
        </div>
        <div className="border border-gray-300">
            <div className="flex">
                <div className="p-1 border-r border-gray-300 font-semibold bg-gray-100 w-24 sm:w-32">TEKLİF NO</div>
                <div className="p-1 flex-1">{quoteId}</div>
            </div>
             <div className="flex border-t border-gray-300">
                <div className="p-1 border-r border-gray-300 font-semibold bg-gray-100 w-24 sm:w-32">TEKLİF TARİHİ</div>
                <div className="p-1 flex-1">{quoteDate}</div>
            </div>
        </div>
      </section>

      <section className="mb-8">
        <div className="w-full overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse border border-gray-300 min-w-[600px]">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="p-2 border border-gray-300 font-semibold text-center w-10">NO</th>
                        <th className="p-2 border border-gray-300 font-semibold">İŞİN ADI</th>
                        <th className="p-2 border border-gray-300 font-semibold text-center w-20">MİKTARI</th>
                        <th className="p-2 border border-gray-300 font-semibold text-right w-32">BR. FİYATI</th>
                        <th className="p-2 border border-gray-300 font-semibold text-right w-32">TUTARI</th>
                    </tr>
                </thead>
                <tbody>
                    {serviceItems?.map((item, index) => {
                        const itemTotal = (Number(item.quantity) || 0) * (Number(item.unitPrice) || 0);
                        return (
                            <tr key={index}>
                                <td className="p-2 border border-gray-300 text-center">{index + 1}</td>
                                <td className="p-2 border border-gray-300">{item.description}</td>
                                <td className="p-2 border border-gray-300 text-center">{item.quantity}</td>
                                <td className="p-2 border border-gray-300 text-right">{formatCurrency(item.unitPrice || 0)}</td>
                                <td className="p-2 border border-gray-300 text-right">{formatCurrency(itemTotal)}</td>
                            </tr>
                        );
                    })}
                    {/* Fill empty rows */}
                    {Array.from({ length: Math.max(0, 10 - (serviceItems?.length || 0)) }).map((_, index) => (
                        <tr key={`empty-${index}`}>
                            <td className="p-2 border border-gray-300 text-center">{(serviceItems?.length || 0) + index + 1}</td>
                            <td className="p-2 border border-gray-300">&nbsp;</td>
                            <td className="p-2 border border-gray-300"></td>
                            <td className="p-2 border border-gray-300"></td>
                            <td className="p-2 border border-gray-300 text-right">{formatCurrency(0)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
      </section>

      <section className="flex flex-col sm:flex-row justify-between items-start text-xs gap-4">
        <div className="w-full sm:w-1/2">
            <div className="border border-gray-300">
                <div className="p-1 font-semibold bg-gray-100">AÇIKLAMALAR:</div>
                <div className="p-1 h-24">Teklifin geçerlilik süresi 15 gündür.</div>
            </div>
        </div>
        <div className="w-full sm:w-1/3">
            <table className="w-full border-collapse">
                <tbody>
                    <tr>
                        <td className="p-2 font-semibold">TOPLAM TUTAR</td>
                        <td className="p-2 text-right border border-gray-300">{formatCurrency(subtotal)}</td>
                    </tr>
                    {includeVat && (
                      <tr>
                          <td className="p-2 font-semibold">{`%${vatRate} KDV`}</td>
                          <td className="p-2 text-right border border-gray-300">{formatCurrency(vatAmount)}</td>
                      </tr>
                    )}
                    <tr>
                        <td className="p-2 font-bold bg-gray-100">GENEL TOPLAM</td>
                        <td className="p-2 text-right font-bold bg-gray-100 border border-gray-300">{formatCurrency(total)}</td>
                    </tr>
                </tbody>
            </table>
        </div>
      </section>

      <footer className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8 pt-4 border-t border-gray-300 text-xs">
        <div className="border border-gray-300 p-2">
            <p className="font-semibold">SİPARİŞİ ALAN / TEKLİF VEREN</p>
            <p className="mt-2">Adı-Soyadı: Şahin SOYSAL</p>
            <p className="mt-8">İmza:</p>
        </div>
        <div className="border border-gray-300 p-2">
            <p className="font-semibold">MÜŞTERİ ONAYI</p>
             <p className="mt-2">Adı-Soyadı:</p>
            <p className="mt-8">İmza:</p>
            <p className="text-center mt-4 text-gray-500">(LÜTFEN TEYİD EDİNİZ.)</p>
        </div>
      </footer>
    </div>
  );
}
