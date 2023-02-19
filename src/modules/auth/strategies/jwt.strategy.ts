import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '../../config/config.service';
import { ConfigurationEnum } from '../../config/config.keys';
import { AuthModule } from '../auth.module';

export class JwtStrategy extends PassportStrategy(Strategy) {
  static readonly _configService = new ConfigService();
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: JwtStrategy._configService.get(ConfigurationEnum.JWT_SECRET),
    });
  }

  async validate(payload: any) {
    return { ...payload };
  }
}
