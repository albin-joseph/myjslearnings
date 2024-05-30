import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { TenantService } from '../modules/tenant/tenant.service';
import { DataSource } from 'typeorm';
import { createTenantOrmConfig } from '../config/tenant-ormconfig';

@Injectable()
export class TenantMiddleware implements NestMiddleware {
  private connectionMap: Map<string, DataSource> = new Map();

  constructor(private readonly tenantService: TenantService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const host = req.hostname;
    const tenant = await this.tenantService.findTenantByDomain(host);

    console.log(tenant)

    console.log('.........................')

    console.log( req.params, host)

    if(tenant) {
      console.log(`FOUND, ${JSON.stringify(tenant)}`)
    }

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
}
