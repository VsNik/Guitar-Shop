import {ServeStaticModuleAsyncOptions} from "@nestjs/serve-static";
import {ConfigModule, ConfigService} from "@nestjs/config";

export const getServeConfig = (): ServeStaticModuleAsyncOptions => ({
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => {
    const rootPath = configService.get<string>('UPLOAD_DIRECTORY_PATH');
    const serveRoot = configService.get<string>('SERVE_ROOT');
    return [{
      rootPath,
      serveRoot,
      serveStaticOptions: {
        fallthrough: true,
      }
    }]
  }
})
