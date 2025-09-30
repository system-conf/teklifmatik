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
import { Building2, Plus, Trash2, User, FileText, Percent } from 'lucide-react';
import type { QuoteFormData } from '@/lib/schema';
import { Switch } from '@/components/ui/switch';

export default function QuoteForm() {
  const form = useFormContext<QuoteFormData>();
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'serviceItems',
  });

  const includeVat = form.watch('includeVat');

  return (
    <Form {...form}>
      <form className="flex flex-col space-y-6">
        <Card className="order-2 md:order-1">
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
          </CardContent>
        </Card>

        <Card className="order-3 md:order-2">
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

        <Card className="order-1 md:order-3">
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
            {/* Mobile View */}
            <div className="space-y-4 md:hidden">
              {fields.map((field, index) => (
                <div key={field.id} className="rounded-lg border p-4 space-y-3 relative">
                   <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => remove(index)}
                      aria-label="Remove item"
                      className="absolute top-2 right-2 h-7 w-7"
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  <FormField
                    control={form.control}
                    name={`serviceItems.${index}.description`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Açıklama</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Hizmet açıklaması" />
                        </FormControl>
                        <FormMessage/>
                      </FormItem>
                    )}
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name={`serviceItems.${index}.quantity`}
                      render={({ field }) => (
                        <FormItem>
                           <FormLabel>Adet</FormLabel>
                          <FormControl>
                            <Input type="number" {...field} />
                          </FormControl>
                          <FormMessage/>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`serviceItems.${index}.unitPrice`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Birim Fiyatı (₺)</FormLabel>
                          <FormControl>
                            <Input type="number" {...field} />
                          </FormControl>
                          <FormMessage/>
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop View */}
            <div className="hidden md:block overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Açıklama</TableHead>
                    <TableHead className="w-[100px]">Adet</TableHead>
                    <TableHead className="w-[140px]">Birim Fiyatı (₺)</TableHead>
                    <TableHead className="w-[50px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {fields.map((field, index) => (
                    <TableRow key={field.id}>
                      <TableCell className="p-1">
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
                       <TableCell className="p-1">
                         <FormField
                          control={form.control}
                          name={`serviceItems.${index}.quantity`}
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Input type="number" {...field} className="text-center" />
                              </FormControl>
                              <FormMessage/>
                            </FormItem>
                          )}
                        />
                      </TableCell>
                      <TableCell className="p-1">
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
                      <TableCell className="p-1">
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
          </CardContent>
        </Card>

        <Card className="order-4">
          <CardHeader>
             <div className="flex items-center gap-3">
                <Percent className="h-6 w-6" />
                <div>
                    <CardTitle>Vergi</CardTitle>
                    <CardDescription>Hesaplamalara KDV ekleyin.</CardDescription>
                </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="includeVat"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                  <div className="space-y-0.5">
                    <FormLabel>KDV Dahil</FormLabel>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            {includeVat && (
              <FormField
                control={form.control}
                name="vatRate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>KDV Oranı (%)</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
          </CardContent>
        </Card>
      </form>
    </Form>
  );
}

    