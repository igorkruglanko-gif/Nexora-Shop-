import { PrismaClient } from "@prisma/client";
const prisma=new PrismaClient();
const data=[
 {name:"Наушники",slug:"headphones"},{name:"Умные часы",slug:"smartwatches"},{name:"Худи",slug:"hoodies"},{name:"Футболки",slug:"t-shirts"},{name:"Аксессуары",slug:"accessories"},{name:"Зарядные устройства",slug:"chargers"}
];
async function main(){
 for(const c of data)await prisma.category.upsert({where:{slug:c.slug},update:{name:c.name},create:c});
 const cats=await prisma.category.findMany();
 const seed=[
 ["Nexa Pro Wireless","nexa-pro-headphones","NEXA","Наушники",12990,15990,"https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=85","ХИТ ПРОДАЖ",24],
 ["Arc Smartwatch","smartwatch-arc","ARC","Умные часы",8990,10990,"https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=85","СКИДКА",17],
 ["Studio Headphones","studio-headphones","NEXA","Наушники",7490,null,"https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=800&q=85","НОВИНКА",30],
 ["Essential Hoodie","minimal-hoodie","NXR STUDIO","Худи",5990,7490,"https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=800&q=85","СКИДКА",42],
 ["Core Oversized Tee","streetwear-tee","NXR STUDIO","Футболки",2490,null,"https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=85","НОВИНКА",55],
 ["Pulse Mini Speaker","portable-speaker","PULSE","Аксессуары",4290,null,"https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=800&q=85",null,21],
 ["Everyday Backpack","everyday-backpack","NXR","Аксессуары",3890,4490,"https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=85","СКИДКА",19],
 ["Magnetic Charger","wireless-charger","NEXA","Зарядные устройства",1990,null,"https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=800&q=85",null,38]
 ] as const;
 for(const [name,slug,brand,cat,price,oldPrice,image,badge,stock] of seed){const category=cats.find(c=>c.name===cat)!;await prisma.product.upsert({where:{slug},update:{},create:{name,slug,brand,categoryId:category.id,price,oldPrice:oldPrice??undefined,image,images:[image],colors:cat==="Худи"?["Чёрный","Серый","Молочный"]:["Чёрный"],sizes:cat==="Худи"||cat==="Футболки"?["S","M","L","XL"]:[],stock,badge:badge??undefined,featured:true,description:`${name} — товар из каталога NexoraShop. Перед публикацией уточните точные характеристики, комплектацию и гарантийные условия.`}})}
 await prisma.promoCode.upsert({where:{code:"NEXORA10"},update:{percentOff:10,active:true},create:{code:"NEXORA10",percentOff:10,active:true}});
 console.log("Seed complete.");
}
main().finally(()=>prisma.$disconnect());
