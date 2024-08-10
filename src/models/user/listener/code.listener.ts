import { ConflictException, Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { CodeUsedEvent } from 'src/common/events/code-used.event';
import { UserRepository } from '../user.repository';
import { CommissionLevel } from '../enum/commission-level.enum';

@Injectable()
export class CodeListener {
  constructor(private userRepository: UserRepository) {}

  @OnEvent('code.used')
  async userCodeBeingUsed(payload: CodeUsedEvent) {
    const { _id } = await this.userRepository.findOneByUsername(
      payload.username,
    );

    const [{ lot, parents }] =
      await this.userRepository.findUserParentsById(_id);

    await Promise.all([
      parents.map(user => {
        this.userRepository.updateCommissionMoney(
          user._id,
          Number(lot * this.getLevel(user.level)),
        );
      }),
    ]);
  }

  private getLevel(descendentLevel: number) {
    switch (descendentLevel) {
      case 0:
        return CommissionLevel.LEVEL0;
      case 1:
        return CommissionLevel.LEVEL1;
      case 2:
        return CommissionLevel.LEVEL2;
      case 3:
        return CommissionLevel.LEVEL3;
      default:
        throw new ConflictException(
          'something went wrong about commission level',
        );
    }
  }
}
