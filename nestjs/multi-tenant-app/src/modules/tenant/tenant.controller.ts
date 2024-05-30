import { Controller, Get, Param } from '@nestjs/common';
import { TenantService } from './tenant.service';
import { Tenant } from '../../entities/tenant.entity';

@Controller('tenants')
export class TenantController {
  constructor(private readonly tenantService: TenantService) {}

  @Get(':domain')
  async getTenantByDomain(@Param('domain') domain: string): Promise<Tenant> {
    return this.tenantService.findTenantByDomain(domain);
  }
}
