import { Controller, Get } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Controller('db')
export class DbController {
  constructor(private prisma: PrismaService) {}

  @Get('health')
  async health() {
    const now = await this.prisma.$queryRaw<
      Array<{ now: Date }>
    >`SELECT NOW() as now`;
    return { ok: true, now: now[0]?.now };
  }

  @Get('tables')
  async tables() {
    // Lista conteos por tabla para validar relaciones rápidamente
    const [users, roles, status, companies, accessPoints] = await Promise.all([
      this.prisma.users.count().catch(() => 0),
      this.prisma.ct_roles.count().catch(() => 0),
      this.prisma.ct_status.count().catch(() => 0),
      this.prisma.ct_companies.count().catch(() => 0),
      this.prisma.ct_accesses_points.count().catch(() => 0),
    ]);
    return { users, roles, status, companies, accessPoints };
  }
}
