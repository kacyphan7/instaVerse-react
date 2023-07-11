import Comment from "../comments/Comment";
import { faker } from "@faker-js/faker";

export default function Post({ post }) {
    const rows = [];
    if (post.comments.length) {
        post.comments.forEach((comment) => {
            rows.push(
                <Comment
                    comment={comment}
                    key={comment._id} />
            );
        });
    }
    return (
        <>

        </>
    );
}