import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
  ) {}

  async login(email: string, password: string) {
    // identifier puede ser email o username
    const user = await this.prisma.users.findFirst({
      where: { email }, // ahora sí es whereUniqueInput
      include: {
        ct_roles: true,
        ct_status: true,
        ct_companies: true,
        ct_accesses_points: true,
      },
    });

    if (!user) throw new UnauthorizedException('Credenciales inválidas');

    // Si todavía tienes passwords en texto plano, descomenta la línea inferior y comenta bcrypt.compare:
    // const ok = user.password === password;
    const ok = user.password?.startsWith('$2')
      ? await bcrypt.compare(password, user.password)
      : user.password === password;

    if (!ok) throw new UnauthorizedException('Credenciales inválidas');

    const roleSlugOrName =
      user.ct_roles?.slug ?? user.ct_roles?.name ?? 'guest';

    const payload = { sub: user.id, role: roleSlugOrName };
    const token = this.jwt.sign(payload);

    return {
      access_token: token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: roleSlugOrName,
        status: user.ct_status?.name ?? null,
        company: user.ct_companies?.company ?? null,
        access_point: user.ct_accesses_points?.name ?? null,
      },
    };
  }
}
