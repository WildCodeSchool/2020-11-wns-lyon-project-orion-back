import {User} from '@api/user/user.entity';
import {Post} from '@api/post/post.entity';

export class CreateLikeModel {
    readonly post: Post;
    readonly user: User;
}
