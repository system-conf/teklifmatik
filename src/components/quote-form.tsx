"use client";

import { useFormContext, useFieldArray } from 'react-hook-form';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Building2, Plus, Trash2, User, FileText } from 'lucide-react';
import type { QuoteFormData } from '@/lib/schema';
import ServiceAgreementModal from './service-agreement-modal';

export default function QuoteForm() {
  const form = useFormContext<QuoteFormData>();
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'serviceItems',
  });

  return (
    <Form {...form}>
      <form className="space-y-6">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <Building2 className="h-6 w-6" />
              <div>
                <CardTitle>Firma Bilgileri</CardTitle>
                <CardDescription>Teklifi hazırlayan firma.</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="companyName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Firma Adı</FormLabel>
                  <FormControl>
                    <Input placeholder="Şahin Tesisat" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="companyAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Adres</FormLabel>
                  <FormControl>
                    <Input placeholder="Firma adresi" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="companyPhone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Telefon</FormLabel>
                    <FormControl>
                      <Input placeholder="+90..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="companyEmail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>E-posta</FormLabel>
                    <FormControl>
                      <Input placeholder="iletisim@firma.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="logoUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Logo URL</FormLabel>
                  <FormControl>
                    <Input placeholder="https://..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <User className="h-6 w-6" />
              <div>
                <CardTitle>Müşteri Bilgileri</CardTitle>
                <CardDescription>Teklifin gönderileceği kişi/firma.</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="billToName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Müşteri Adı</FormLabel>
                  <FormControl>
                    <Input placeholder="Ahmet Yılmaz" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="billToAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Müşteri Adresi</FormLabel>
                  <FormControl>
                    <Input placeholder="Müşteri adresi" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
                <FileText className="h-6 w-6" />
                <div>
                    <CardTitle>Hizmet Kalemleri</CardTitle>
                    <CardDescription>Sunulan hizmetlerin listesi ve ücretleri.</CardDescription>
                </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Açıklama</TableHead>
                    <TableHead className="w-[80px]">Adet</TableHead>
                    <TableHead className="w-[120px] text-right">Birim Fiyatı (₺)</TableHead>
                    <TableHead className="w-[50px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {fields.map((field, index) => (
                    <TableRow key={field.id}>
                      <TableCell>
                        <FormField
                          control={form.control}
                          name={`serviceItems.${index}.description`}
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Input {...field} placeholder="Hizmet açıklaması" />
                              </FormControl>
                              <FormMessage/>
                            </FormItem>
                          )}
                        />
                      </TableCell>
                       <TableCell>
                         <FormField
                          control={form.control}
                          name={`serviceItems.${index}.quantity`}
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Input type="number" {...field} />
                              </FormControl>
                              <FormMessage/>
                            </FormItem>
                          )}
                        />
                      </TableCell>
                      <TableCell>
                         <FormField
                          control={form.control}
                          name={`serviceItems.${index}.unitPrice`}
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Input type="number" {...field} className="text-right" />
                              </FormControl>
                              <FormMessage/>
                            </FormItem>
                          )}
                        />
                      </TableCell>
                      <TableCell>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => remove(index)}
                          aria-label="Remove item"
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="mt-4"
              onClick={() => append({ description: '', quantity: 1, unitPrice: 0 })}
            >
              <Plus className="mr-2 h-4 w-4" />
              Kalem Ekle
            </Button>
            <div className='mt-6'>
                <ServiceAgreementModal />
            </div>
          </CardContent>
        </Card>
      </form>
    </Form>
  );
}
