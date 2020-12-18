import {User} from '@api/user/user.entity';
import {Post} from '@api/post/post.entity';

export class CreateStarModel {
    readonly post: Post;
    readonly user: User;
}
