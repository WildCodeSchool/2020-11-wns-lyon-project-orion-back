import { ObjectType } from "@nestjs/graphql";
import { PaginatedOutput } from "@shared/models/paginated-output.model";
import { Block } from "../block.entity";

@ObjectType()
export class BlocksOutput extends PaginatedOutput(Block) {

}