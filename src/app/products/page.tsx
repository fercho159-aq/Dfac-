
"use client";

import { useState, useMemo, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { ProductCard } from '@/components/product-card';
import { categories, Product, Category } from '@/lib/data';
import { ListFilter, Search, ChevronRight } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { cn } from '@/lib/utils';

export default function ProductsPage() {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch('/data/products.json');
      const data = await response.json();
      const productData = data.map((row: any) => ({
        id: String(row.id),
        name: row.name,
        slug: row.slug,
        price: (Number(row.prices?.price) || 0) / 100,
        description: row.description,
        image: row.images?.[0]?.src || 'https://placehold.co/400x300.png',
        images: row.images,
        category: row.categories?.[0]?.name.normalize("NFD").replace(/[\u0300-\u036f]/g, "") || 'Accesorios'
      }));
      setAllProducts(productData);
    };

    fetchProducts();
  }, []);

  const getCategoryNameById = (id: string, categoryList: Category[]): string | undefined => {
    for (const category of categoryList) {
      if (category.id === id) {
        return category.name;
      }
      if (category.children) {
        const found = getCategoryNameById(id, category.children);
        if (found) return found;
      }
    }
    return undefined;
  };

  const filteredProducts = useMemo(() => {
    return allProducts.filter(product => {
      const searchMatch = !searchTerm || 
                          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (product.description && product.description.toLowerCase().includes(searchTerm.toLowerCase()));

      if (selectedCategory === 'all') {
        return searchMatch;
      }

      if (selectedCategory === 'productos-quimicos') {
        const chemicalCategory = categories.find(c => c.id === 'productos-quimicos');
        const chemicalSubcategories = chemicalCategory?.children?.map(child => child.name.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()) || [];
        const categoryMatch = chemicalSubcategories.includes(product.category.toLowerCase());
        return categoryMatch && searchMatch;
      }
      
      const categoryName = getCategoryNameById(selectedCategory, categories);
      const normalizedCategoryName = categoryName?.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

      const categoryMatch = normalizedCategoryName && product.category.toLowerCase().includes(normalizedCategoryName.toLowerCase());

      return categoryMatch && searchMatch;
    });
  }, [searchTerm, selectedCategory, allProducts]);
  
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
            !category.children ? (
              <div key={category.id} className="flex items-center space-x-2">
                <RadioGroupItem value={category.id} id={`cat-${category.id}`} />
                <Label htmlFor={`cat-${category.id}`} className="font-normal cursor-pointer">{category.name}</Label>
              </div>
            ) : (
              <Collapsible key={category.id} className="space-y-2">
                <div className="flex items-center justify-between w-full">
                   <div className="flex items-center space-x-2">
                      <RadioGroupItem value={category.id} id={`cat-${category.id}`} />
                      <Label htmlFor={`cat-${category.id}`} className="font-semibold cursor-pointer">{category.name}</Label>
                   </div>
                   <CollapsibleTrigger asChild>
                     <Button variant="ghost" size="sm" className="w-9 p-0">
                       <ChevronRight className="h-4 w-4 transition-transform duration-200 [&[data-state=open]]:rotate-90" />
                       <span className="sr-only">Toggle</span>
                     </Button>
                   </CollapsibleTrigger>
                </div>
                <CollapsibleContent className="pl-6 space-y-2">
                   {category.children.map(child => (
                     <div key={child.id} className="flex items-center space-x-2">
                       <RadioGroupItem value={child.id} id={`cat-${child.id}`} />
                       <Label htmlFor={`cat-${child.id}`} className="font-normal cursor-pointer">{child.name}</Label>
                     </div>
                   ))}
                </CollapsibleContent>
              </Collapsible>
            )
          ))}
        </RadioGroup>
      </div>
    </div>
  );

  const FilterSidebar = () => (
    <Card className="h-full">
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
          <aside className="hidden lg:block w-1/4 xl:w-1/5 sticky top-24 h-fit">
            <FilterSidebar />
          </aside>

          {/* Main Content */}
          <main className="w-full lg:w-3/4 xl:w-4/5">
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Buscar por nombre o descripción..."
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
