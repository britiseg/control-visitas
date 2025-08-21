// prisma/seed.ts
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('Iniciando el proceso de seeding...');

  // Generar hash de la contraseña para seguridad
  const hashedPassword = await bcrypt.hash('123456', 10);

  // 1. Seeders para tablas de catálogo (sin dependencias)
  // -----------------------------------------------------------------
  // Seeder para ct_accesses_points
  await prisma.ct_accesses_points.createMany({
    data: [
      { id: 1, name: 'Caseta Principal', slug: 'gate-main' },
      { id: 2, name: 'Caseta Proveedores', slug: 'suppliers-gate' },
      { id: 3, name: 'Caseta Visitas', slug: 'visitors-gate' },
      { id: 4, name: 'Lobby', slug: 'lobby' },
    ],
    skipDuplicates: true,
  });
  console.log('Datos de ct_accesses_points insertados.');

  // Seeder para ct_status
  await prisma.ct_status.createMany({
    data: [
      { id: 1, name: 'Activo', slug: 'activo' },
      { id: 2, name: 'Inactivo', slug: 'inactivo' },
      { id: 3, name: 'Suspendido', slug: 'suspendido' },
      { id: 4, name: 'Cerrado', slug: 'cerrado' },
    ],
    skipDuplicates: true,
  });
  console.log('Datos de ct_status insertados.');

  // Seeder para ct_roles
  await prisma.ct_roles.createMany({
    data: [
      { id: 1, name: 'Administrador', slug: 'admin' },
      { id: 2, name: 'Guardia', slug: 'guard' },
      { id: 3, name: 'Supervisor', slug: 'supervisor' },
      { id: 4, name: 'Recepcionista', slug: 'receptionist' },
      { id: 5, name: 'Empleado', slug: 'employee' },
      { id: 6, name: 'Gerente', slug: 'manager' },
    ],
    skipDuplicates: true,
  });
  console.log('Datos de ct_roles insertados.');

  // Seeder para ct_type_visits
  await prisma.ct_type_visits.createMany({
    data: [
      { id: 1, name: 'Visita', slug: 'visita' },
      { id: 2, name: 'Proveedor', slug: 'proveedor' },
      { id: 3, name: 'Valores', slug: 'valores' },
    ],
    skipDuplicates: true,
  });
  console.log('Datos de ct_type_visits insertados.');

  // Seeder para ct_companies (ahora con el campo `level`)
  await prisma.ct_companies.createMany({
    data: [
      {
        id: 1,
        level: 1,
        company: 'Prepango S.A. de C.V.',
        phone: '+52 55 1234 5678',
        email: 'contacto@prepango.com',
        status_id: 1,
      },
      {
        id: 2,
        level: 1,
        company: 'TechCorp Solutions',
        phone: '+52 55 8765 4321',
        email: 'info@techcorp.com',
        status_id: 1,
      },
    ],
    skipDuplicates: true,
  });
  console.log('Datos de ct_companies insertados.');

  // Seeder para ct_cards
  await prisma.ct_cards.createMany({
    data: [
      { serial_number: 'CARD_12345', status_id: 1 },
      { serial_number: 'CARD_67890', status_id: 1 },
      { serial_number: 'CARD_11223', status_id: 1 },
    ],
    skipDuplicates: true,
  });
  console.log('Datos de ct_cards insertados.');

  // 2. Seeder para la tabla `users` (la cual depende de las anteriores)
  // -----------------------------------------------------------------
  // Crear usuario "admin"
  await prisma.users.upsert({
    where: { email: 'admin@example.com' }, // Usamos email ya que `username` no es @unique
    update: {
      password: hashedPassword,
    },
    create: {
      name: 'Administrador',
      username: 'admin',
      email: 'admin@example.com',
      password: hashedPassword,
      role_id: 1,
      company_id: 1,
      status_id: 1,
      access_id: 1,
      created_by: 1, // Si el `created_by` es el mismo usuario, se puede omitir o poner el ID
    },
  });
  console.log('Usuario "admin" insertado/actualizado.');

  // Aquí puedes agregar más usuarios, por ejemplo:
  await prisma.users.upsert({
    where: { email: 'proveedor@example.com' },
    update: { password: hashedPassword },
    create: {
      name: 'Proveedor',
      username: 'proveedor',
      email: 'proveedor@example.com',
      password: hashedPassword,
      role_id: 5,
      company_id: 2,
      status_id: 1,
      access_id: 2,
    },
  });
  console.log('Usuario "proveedor" insertado/actualizado.');

  await prisma.users.upsert({
    where: { email: 'supervisor@example.com' },
    update: { password: hashedPassword },
    create: {
      name: 'Supervisor',
      username: 'supervisor',
      email: 'supervisor@example.com',
      password: hashedPassword,
      role_id: 3,
      company_id: 1,
      status_id: 1,
      access_id: 3,
    },
  });
  console.log('Usuario "supervisor" insertado/actualizado.');

  console.log('Proceso de seeding completado.');
}

// 3. Ejecutar y manejar errores
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
