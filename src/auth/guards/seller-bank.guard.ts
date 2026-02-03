/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SellerBankGuard implements CanActivate {
  constructor(private readonly prisma: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const user = await this.prisma.auth.findUnique({
      where: { id: request.user.id },
      include: { sellerProfile: true },
    });

    if (!user) throw new UnauthorizedException('Please login first');

    if (user.isVerified !== true) {
      throw new ForbiddenException('Your account is not verified yet.');
    }

    if (user.isSuspended === true) {
      throw new ForbiddenException('Your account is suspended.');
    }

    if (user.isSeller !== true) {
      throw new ForbiddenException('Only sellers can access this resource.');
    }

    if (!user || !user.sellerProfile || !user.sellerProfile.isStripeVerified) {
      throw new ForbiddenException(
        'Please complete your Stripe onboarding to access this feature.',
      );
    }

    return true;
  }
}
