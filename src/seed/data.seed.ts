/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SeedService implements OnModuleInit {
  private readonly logger = new Logger(SeedService.name);

  constructor(private prisma: PrismaService) {}

  async onModuleInit() {
    await this.seedAdmin();
    await this.seedCategories();
  }

  async seedAdmin() {
    const adminEmail = 'admin@gmail.com';
    try {
      const existingAdmin = await this.prisma.auth.findUnique({
        where: { email: adminEmail },
      });

      if (!existingAdmin) {
        const hashedPassword = await bcrypt.hash('admin123', 10);
        await this.prisma.auth.create({
          data: {
            firstName: 'Super',
            lastName: 'Admin',
            nickName: 'admin',
            email: adminEmail,
            phone: '01700000000',
            password: hashedPassword,
            role: 'ADMIN',
            isVerified: true,
          },
        });
        this.logger.log('✅ Admin user seeded successfully!');
      }
    } catch (error) {
      this.logger.error('❌ Error seeding admin:', error.message);
    }
  }

  async seedCategories() {
    const categories = [
      {
        name: 'Vehicle',
        slug: 'vehicle',
        subCategories: [
          {
            name: 'Cars',
            slug: 'vehicle-cars',
            specFields: [
              { label: 'Brand', key: 'brand', type: 'text', required: true },
              {
                label: 'Model Year',
                key: 'year',
                type: 'number',
                required: true,
              },
              {
                label: 'Fuel Type',
                key: 'fuel',
                type: 'select',
                options: [
                  'Octane',
                  'Petrol',
                  'Diesel',
                  'CNG',
                  'Hybrid',
                  'Electric',
                ],
                required: true,
              },
              {
                label: 'Transmission',
                key: 'transmission',
                type: 'select',
                options: ['Automatic', 'Manual'],
                required: true,
              },
              {
                label: 'Condition',
                key: 'condition',
                type: 'select',
                options: ['New', 'Used', 'Reconditioned'],
                required: true,
              },
            ],
          },
          {
            name: 'Motorcycles',
            slug: 'vehicle-motorcycles',
            specFields: [
              { label: 'Brand', key: 'brand', type: 'text', required: true },
              {
                label: 'Engine Capacity (CC)',
                key: 'cc',
                type: 'number',
                required: true,
              },
              {
                label: 'Bike Type',
                key: 'bike_type',
                type: 'select',
                options: ['Sports', 'Cruiser', 'Scooter', 'Commuter'],
                required: true,
              },
            ],
          },
          {
            name: 'Heavy Duty',
            slug: 'vehicle-heavy-duty',
            specFields: [
              {
                label: 'Weight Capacity',
                key: 'capacity',
                type: 'text',
                required: true,
              },
            ],
          },
          {
            name: 'Spare Parts',
            slug: 'vehicle-spare-parts',
            specFields: [
              {
                label: 'Part Type',
                key: 'part_type',
                type: 'text',
                required: true,
              },
            ],
          },
          {
            name: 'Boats',
            slug: 'vehicle-boats',
            specFields: [
              { label: 'Length', key: 'length', type: 'text', required: false },
            ],
          },
        ],
      },
      {
        name: 'Real Estate',
        slug: 'real-estate',
        subCategories: [
          {
            name: 'Apartment',
            slug: 'real-estate-apartment',
            specFields: [
              {
                label: 'Bedrooms',
                key: 'beds',
                type: 'number',
                required: true,
              },
              {
                label: 'Bathrooms',
                key: 'baths',
                type: 'number',
                required: true,
              },
              {
                label: 'Size (sqft)',
                key: 'size',
                type: 'number',
                required: true,
              },
              {
                label: 'Floor level',
                key: 'floor',
                type: 'text',
                required: false,
              },
            ],
          },
          {
            name: 'Land',
            slug: 'real-estate-land',
            specFields: [
              {
                label: 'Plot Size (Katha)',
                key: 'plot_size',
                type: 'number',
                required: true,
              },
            ],
          },
          {
            name: 'Commercial',
            slug: 'real-estate-commercial',
            specFields: [
              {
                label: 'Property Type',
                key: 'prop_type',
                type: 'select',
                options: ['Office', 'Shop', 'Warehouse'],
                required: true,
              },
            ],
          },
          {
            name: 'Rent',
            slug: 'real-estate-rent',
            specFields: [
              {
                label: 'Monthly Rent',
                key: 'monthly_rent',
                type: 'number',
                required: true,
              },
            ],
          },
          {
            name: 'Villa',
            slug: 'real-estate-villa',
            specFields: [
              {
                label: 'Total Area',
                key: 'area',
                type: 'text',
                required: true,
              },
            ],
          },
        ],
      },
      {
        name: 'Electronics',
        slug: 'electronics',
        subCategories: [
          {
            name: 'Mobiles',
            slug: 'electronics-mobiles',
            specFields: [
              { label: 'Brand', key: 'brand', type: 'text', required: true },
              {
                label: 'RAM',
                key: 'ram',
                type: 'select',
                options: ['4GB', '6GB', '8GB', '12GB', '16GB'],
                required: true,
              },
              {
                label: 'Storage',
                key: 'storage',
                type: 'select',
                options: ['64GB', '128GB', '256GB', '512GB'],
                required: true,
              },
            ],
          },
          {
            name: 'Laptops',
            slug: 'electronics-laptops',
            specFields: [
              { label: 'Brand', key: 'brand', type: 'text', required: true },
              {
                label: 'Processor',
                key: 'processor',
                type: 'text',
                required: true,
              },
              {
                label: 'RAM',
                key: 'ram',
                type: 'select',
                options: ['8GB', '16GB', '32GB', '64GB'],
                required: true,
              },
            ],
          },
          {
            name: 'Cameras',
            slug: 'electronics-cameras',
            specFields: [
              { label: 'MegaPixel', key: 'mp', type: 'number', required: true },
            ],
          },
          {
            name: 'Home Appliances',
            slug: 'electronics-home-appliances',
            specFields: [
              {
                label: 'Warranty',
                key: 'warranty',
                type: 'text',
                required: false,
              },
            ],
          },
          {
            name: 'TV',
            slug: 'electronics-tv',
            specFields: [
              {
                label: 'Display Type',
                key: 'display',
                type: 'select',
                options: ['LED', 'OLED', 'QLED', 'LCD'],
                required: true,
              },
            ],
          },
        ],
      },
      {
        name: 'Jobs',
        slug: 'jobs',
        subCategories: [
          {
            name: 'IT & Software',
            slug: 'jobs-it-software',
            specFields: [
              {
                label: 'Experience (Years)',
                key: 'exp',
                type: 'number',
                required: true,
              },
            ],
          },
          {
            name: 'Sales',
            slug: 'jobs-sales',
            specFields: [
              {
                label: 'Designation',
                key: 'rank',
                type: 'text',
                required: true,
              },
            ],
          },
          { name: 'Accounting', slug: 'jobs-accounting', specFields: [] },
          { name: 'Delivery', slug: 'jobs-delivery', specFields: [] },
          { name: 'Marketing', slug: 'jobs-marketing', specFields: [] },
        ],
      },
      {
        name: 'For Sale',
        slug: 'for-sale',
        subCategories: [
          {
            name: 'Furniture',
            slug: 'for-sale-furniture',
            specFields: [
              {
                label: 'Material',
                key: 'material',
                type: 'text',
                required: true,
              },
            ],
          },
          {
            name: 'Clothing',
            slug: 'for-sale-clothing',
            specFields: [
              {
                label: 'Size',
                key: 'size',
                type: 'select',
                options: ['S', 'M', 'L', 'XL', 'XXL'],
                required: true,
              },
            ],
          },
          {
            name: 'Books',
            slug: 'for-sale-books',
            specFields: [
              { label: 'Author', key: 'author', type: 'text', required: true },
            ],
          },
          { name: 'Sports', slug: 'for-sale-sports', specFields: [] },
          { name: 'Instruments', slug: 'for-sale-instruments', specFields: [] },
        ],
      },
      {
        name: 'Services',
        slug: 'services',
        subCategories: [
          { name: 'Cleaning', slug: 'services-cleaning', specFields: [] },
          { name: 'Web Design', slug: 'services-web-design', specFields: [] },
          { name: 'Education', slug: 'services-education', specFields: [] },
          { name: 'Health', slug: 'services-health', specFields: [] },
          { name: 'Legal', slug: 'services-legal', specFields: [] },
        ],
      },
      {
        name: 'Pets',
        slug: 'pets',
        subCategories: [
          {
            name: 'Dogs',
            slug: 'pets-dogs',
            specFields: [
              { label: 'Breed', key: 'breed', type: 'text', required: true },
            ],
          },
          { name: 'Cats', slug: 'pets-cats', specFields: [] },
          { name: 'Birds', slug: 'pets-birds', specFields: [] },
          { name: 'Fish', slug: 'pets-fish', specFields: [] },
          { name: 'Accessories', slug: 'pets-accessories', specFields: [] },
        ],
      },
      {
        name: 'Events',
        slug: 'events',
        subCategories: [
          { name: 'Weddings', slug: 'events-weddings', specFields: [] },
          { name: 'Parties', slug: 'events-parties', specFields: [] },
          { name: 'Concerts', slug: 'events-concerts', specFields: [] },
          { name: 'Workshops', slug: 'events-workshops', specFields: [] },
          { name: 'Conferences', slug: 'events-conferences', specFields: [] },
        ],
      },
    ];

    try {
      for (const cat of categories) {
        const savedCategory = await this.prisma.category.upsert({
          where: { slug: cat.slug },
          update: { name: cat.name },
          create: {
            name: cat.name,
            slug: cat.slug,
          },
        });

        for (const sub of cat.subCategories) {
          await this.prisma.subCategory.upsert({
            where: { slug: sub.slug },
            update: {
              name: sub.name,
              specFields: sub.specFields
                ? JSON.parse(JSON.stringify(sub.specFields))
                : [],
            },
            create: {
              name: sub.name,
              slug: sub.slug,
              categoryId: savedCategory.id,
              specFields: sub.specFields
                ? JSON.parse(JSON.stringify(sub.specFields))
                : [],
            },
          });
        }
      }
      this.logger.log('Large Category Seed with Specs Success!');
    } catch (error) {
      this.logger.error('Seeding Error:', error.message);
    }
  }
}
