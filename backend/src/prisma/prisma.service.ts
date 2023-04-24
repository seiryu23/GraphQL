import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit{
    // データベースとのコネクション確立
    async onModuleInit() {
        await this.$connect();
    }

    // データベースとの接続を切る際にNESTJSもクローズする
    async enableShutdownHooks(app: INestApplication) {
        this.$on('beforeExit', async () => {
            await app.close();
        })
    }
}
