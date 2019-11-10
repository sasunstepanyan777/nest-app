// Packages
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Providers
import { UsersService } from './users.service';

// Controllers
import { UsersController } from './users.controller';

// Entities
import { UserEntity } from './entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity])
  ],
  providers: [
    UsersService
  ],
  controllers: [
    UsersController
  ],
  exports: [
    UsersService
  ]
})
export class UsersModule {}
