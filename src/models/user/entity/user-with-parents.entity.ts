import { User } from "src/schemas/user.schema";

export class UserWithParentEntity extends User {
    
    parents: UserInParent[];
}

class UserInParent extends User {
    _id: string;
    
    level: number;
}