import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Status } from '@prisma/client'

// ▼設定
// nullable     :   nullの許容
// name         :   GQL上での名前
// description  :   説明
// defaultValue :   デフォルト値
@ObjectType()
export class Task {
    @Field(() => Int)
    id: number;

    @Field()
    name: string;

    @Field()
    dueDate: string;

    @Field()
    status: Status;

    @Field({ nullable: true })
    description: string;

    @Field()
    createdAt: Date;

    @Field()
    updatedAt: Date;
}