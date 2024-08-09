import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { CodeUsedEvent } from 'src/common/events/code-used.event';
import { UserService } from '../user.service';

@Injectable()
export class CodeListener {
  constructor(private userService: UserService) {}

  @OnEvent('code.used')
  async userCodeBeingUsed(payload: CodeUsedEvent) {
    await this.userService.updateCommissionUser(
      payload.ownCodeUsername,
      payload.username,
    );
  }
}
