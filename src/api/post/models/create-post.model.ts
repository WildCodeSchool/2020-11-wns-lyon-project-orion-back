import {User} from '@api/user/user.entity';
import {Post} from '@api/post/post.entity';
import {PostTypes} from '../enums/post-type.enum';
import {Star} from '@api/star/star.entity';

export class CreatePostModel {
    /* readonly type: PostTypes; */
    readonly content: string;
    readonly author: User;
    readonly parent?: Post;

    /*   a completer 
    readonly children;
    readonly parent;
    readonly star;
    readonly likes;
    */
}
