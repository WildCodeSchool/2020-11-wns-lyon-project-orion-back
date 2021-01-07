import { Field, InputType, Int } from "@nestjs/graphql";
import { PaginatedInput } from "@shared/models/paginated-input.model";

@InputType()
export class BlocksInput extends PaginatedInput {
    @Field(() => Int, {nullable: true})
    readonly receiverId?: number;

    @Field(() => Int, {nullable: true})
    readonly emitterId?: number;
}