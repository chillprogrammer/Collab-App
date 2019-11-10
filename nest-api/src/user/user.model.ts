import { InMemoryDBEntity } from '@nestjs-addons/in-memory-db';

export interface UserEntity extends InMemoryDBEntity {
  username: string;
}
