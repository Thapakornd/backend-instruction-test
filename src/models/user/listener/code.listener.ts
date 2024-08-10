import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { CodeUsedEvent } from 'src/common/events/code-used.event';
import { UserRepository } from '../user.repository';

@Injectable()
export class CodeListener {
  constructor(private userRepository: UserRepository) {}

  @OnEvent('code.used')
  async userCodeBeingUsed(payload: CodeUsedEvent) {
    const { _id } = await this.userRepository.findOneByUsername(payload.username);
    
  }
}
