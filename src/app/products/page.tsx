
"use client";

import { useState, useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { ProductCard } from '@/components/product-card';
import { products, categories } from '@/lib/data';
import { ListFilter, Search } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from '@/components/ui/sheet';

export default function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredProducts = useMemo(() => {
    return products
      .filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .filter(product => 
        selectedCategory === 'all' || product.category.toLowerCase() === categories.find(c => c.id === selectedCategory)?.name.toLowerCase()
      );
  }, [searchTerm, selectedCategory]);
  
  const FilterSidebarContent = () => (
    <div className="space-y-6">
      <div>
        <Label className="text-base font-semibold">Categoría</Label>
        <RadioGroup
          value={selectedCategory}
          onValueChange={setSelectedCategory}
          className="mt-2 space-y-1"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="all" id="cat-all" />
            <Label htmlFor="cat-all" className="font-normal cursor-pointer">Todas</Label>
          </div>
          {categories.map(category => (
            <div key={category.id} className="flex items-center space-x-2">
              <RadioGroupItem value={category.id} id={`cat-${category.id}`} />
              <Label htmlFor={`cat-${category.id}`} className="font-normal cursor-pointer">{category.name}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>
      {/* Potential future filters can be added here */}
    </div>
  );

  const FilterSidebar = () => (
    <Card className="h-full sticky top-24">
      <CardContent className="p-6">
        <h3 className="text-xl font-semibold mb-4">Filtros</h3>
        <FilterSidebarContent />
      </CardContent>
    </Card>
  );

  return (
    <div className="bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-black font-headline">Nuestro Catálogo de <span className="text-primary">Productos</span></h1>
          <p className="mt-4 text-lg text-muted-foreground">Encuentra <b className="text-foreground">todo lo que necesitas</b> para tu proyecto de construcción.</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters - Sidebar for desktop */}
          <aside className="hidden lg:block w-1/4 xl:w-1/5">
            <FilterSidebar />
          </aside>

          {/* Main Content */}
          <main className="w-full lg:w-3/4 xl:w-4/5">
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Buscar productos..."
                  className="pl-10 w-full h-12 text-base"
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                />
              </div>

              {/* Filters - Sheet for mobile */}
              <div className="lg:hidden">
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" className="w-full h-12">
                      <ListFilter className="mr-2 h-4 w-4" />
                      Filtros
                    </Button>
                  </SheetTrigger>
                  <SheetContent>
                    <SheetHeader>
                        <SheetTitle className="text-xl">Filtros</SheetTitle>
                    </SheetHeader>
                    <div className="p-4">
                      <FilterSidebarContent />
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            </div>
            
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-card rounded-lg">
                <p className="text-xl text-muted-foreground">No se encontraron productos.</p>
                <p className="text-muted-foreground mt-2">Intenta ajustar tu búsqueda o filtros.</p>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
