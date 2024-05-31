import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { TenantService } from '../modules/tenant/tenant.service';
import { DataSource } from 'typeorm';
import { createTenantOrmConfig } from '../config/tenant-ormconfig';
import { Tenant } from 'src/entities/tenant.entity';

@Injectable()
export class TenantMiddleware implements NestMiddleware {
  private connectionMap: Map<string, DataSource> = new Map();

  constructor(private readonly tenantService: TenantService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const tenant = await this.resolveTenant(req)

    if (!tenant) {
      return res.status(404).json({ message: 'Tenant not found' });
    }

    if (!this.connectionMap.has(tenant.database)) {
      const dataSource = new DataSource(createTenantOrmConfig(tenant.database));
      await dataSource.initialize();
      this.connectionMap.set(tenant.database, dataSource);
    }
    req['tenantConnection'] = this.connectionMap.get(tenant.database);
    next();
  }

  async resolveTenant(request: Request): Promise<Tenant | null> {
    const domain = request.hostname;

    return await this.tenantService.findTenantByDomain(domain);
  }
}
